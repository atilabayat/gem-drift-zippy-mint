import { readFileSync, writeFileSync } from "node:fs";
import { geoGraticule, geoMercator, geoPath } from "d3-geo";

const FRAME = { minLon: 12.15, maxLon: 30.55, minLat: 34.45, maxLat: 43.25 };
const W = 1200;
const H = 840;
const PAD_X = 52;
const PAD_TOP = 36;
const PAD_BOT = 48;

const src = readFileSync(new URL("../src/data/places.ts", import.meta.url), "utf8");

function grab(exportName) {
  const re = new RegExp(`export const ${exportName}[\\s\\S]*?=\\s*\\[([\\s\\S]*?)\\n\\];`);
  const m = src.match(re);
  if (!m) throw new Error(`missing ${exportName}`);
  const body = m[1];
  const objs = [];
  const chunk = body.split(/\n  \{/).slice(1);
  for (const raw0 of chunk) {
    const raw = "{" + raw0;
    const id = /id:\s*"([^"]+)"/.exec(raw)?.[1];
    const lat = /lat:\s*([-0-9.]+)/.exec(raw)?.[1];
    const lon = /lon:\s*([-0-9.]+)/.exec(raw)?.[1];
    const text = /text:\s*"([^"]+)"/.exec(raw)?.[1];
    if (!id || lat == null || lon == null) throw new Error(`bad record ${raw.slice(0, 80)}`);
    objs.push({ id, lat: Number(lat), lon: Number(lon), text });
  }
  return objs;
}

const cities = grab("places");
const labels = grab("plateLabels");

function inside(p, box) {
  return p[0] >= box.minLon && p[0] <= box.maxLon && p[1] >= box.minLat && p[1] <= box.maxLat;
}

function clipRing(ring, box) {
  const open =
    ring.length > 1 && ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]
      ? ring.slice(0, -1)
      : ring.slice();
  const edges = [
    { ok: (p) => p[0] >= box.minLon, hit: (a, b) => [box.minLon, a[1] + ((b[1] - a[1]) * (box.minLon - a[0])) / (b[0] - a[0])] },
    { ok: (p) => p[0] <= box.maxLon, hit: (a, b) => [box.maxLon, a[1] + ((b[1] - a[1]) * (box.maxLon - a[0])) / (b[0] - a[0])] },
    { ok: (p) => p[1] >= box.minLat, hit: (a, b) => [a[0] + ((b[0] - a[0]) * (box.minLat - a[1])) / (b[1] - a[1]), box.minLat] },
    { ok: (p) => p[1] <= box.maxLat, hit: (a, b) => [a[0] + ((b[0] - a[0]) * (box.maxLat - a[1])) / (b[1] - a[1]), box.maxLat] },
  ];
  let output = open;
  for (const edge of edges) {
    if (output.length === 0) break;
    const input = output;
    output = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      const cin = edge.ok(cur);
      const pin = edge.ok(prev);
      if (cin) {
        if (!pin) output.push(edge.hit(prev, cur));
        output.push(cur);
      } else if (pin) output.push(edge.hit(prev, cur));
    }
  }
  if (output.length < 3) return null;
  const first = output[0];
  const last = output[output.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) output.push([first[0], first[1]]);
  return output;
}

function intersectsBox(ring, box) {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const p of ring) {
    if (p[0] < minLon) minLon = p[0];
    if (p[0] > maxLon) maxLon = p[0];
    if (p[1] < minLat) minLat = p[1];
    if (p[1] > maxLat) maxLat = p[1];
  }
  return !(maxLon < box.minLon || minLon > box.maxLon || maxLat < box.minLat || minLat > box.maxLat);
}

const land = JSON.parse(readFileSync("/tmp/geo/land.geojson", "utf8"));
const features = [];
for (const f of land.features) {
  const g = f.geometry;
  if (!g) continue;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
  for (const poly of polys) {
    if (!poly[0] || !intersectsBox(poly[0], FRAME)) continue;
    const rings = [];
    for (const ring of poly) {
      if (!intersectsBox(ring, FRAME) && !ring.some((p) => inside(p, FRAME))) continue;
      const clipped = clipRing(ring, FRAME);
      if (clipped) rings.push(clipped);
    }
    if (rings.length) features.push({ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: rings } });
  }
}

const framePoly = {
  type: "Polygon",
  coordinates: [[
    [FRAME.minLon, FRAME.minLat],
    [FRAME.minLon, FRAME.maxLat],
    [FRAME.maxLon, FRAME.maxLat],
    [FRAME.maxLon, FRAME.minLat],
    [FRAME.minLon, FRAME.minLat],
  ]],
};

const projection = geoMercator().fitExtent(
  [[PAD_X, PAD_TOP], [W - PAD_X, H - PAD_BOT]],
  framePoly,
);
const path = geoPath(projection);
path.digits(1);

const landPath = path({ type: "FeatureCollection", features });
const graticule = geoGraticule().extent([[FRAME.minLon, FRAME.minLat], [FRAME.maxLon, FRAME.maxLat]]).step([2, 2]);
const graticulePath = path(graticule());

function xy(lon, lat) {
  const p = projection([lon, lat]);
  return [round(p[0]), round(p[1])];
}
function round(n) {
  return Math.round(n * 10) / 10;
}

const points = {};
for (const c of [...cities, ...labels]) points[c.id] = xy(c.lon, c.lat);

const sw = projection([FRAME.minLon, FRAME.minLat]);
const ne = projection([FRAME.maxLon, FRAME.maxLat]);
const frame = {
  x: round(Math.min(sw[0], ne[0])),
  y: round(Math.min(sw[1], ne[1])),
  w: round(Math.abs(ne[0] - sw[0])),
  h: round(Math.abs(ne[1] - sw[1])),
};

const ticks = [];
for (let lon = 14; lon <= 30; lon += 2) {
  const [x, y] = xy(lon, FRAME.minLat);
  ticks.push({ x, y: round(y + 16), text: `${lon}°` });
}
for (let lat = 36; lat <= 42; lat += 2) {
  const [x, y] = xy(FRAME.minLon, lat);
  ticks.push({ x: round(x - 8), y, text: `${lat}°`, anchor: "end" });
}

const [sx1, sy] = xy(16.2, 35.05);
const km = 200;
const deg = km / (111.32 * Math.cos((35.05 * Math.PI) / 180));
const [sx2] = xy(16.2 + deg, 35.05);

const out = `/* Generated by scripts/bake-plate.mjs — do not edit by hand. */
export const PLATE = { width: ${W}, height: ${H} } as const;

export const frame = ${JSON.stringify(frame)} as { x: number; y: number; w: number; h: number };

export const landPath = ${JSON.stringify(landPath)};

export const graticulePath = ${JSON.stringify(graticulePath)};

export const points: Record<string, [number, number]> = ${JSON.stringify(points, null, 2)};

export const ticks: { x: number; y: number; text: string; anchor?: "end" }[] = ${JSON.stringify(ticks)};

export const scaleBar = { x1: ${round(sx1)}, x2: ${round(sx2)}, y: ${round(sy)}, km: ${km} };
`;

writeFileSync(new URL("../src/data/plate-geometry.ts", import.meta.url), out);
console.log(`features ${features.length} land chars ${landPath.length} points ${Object.keys(points).length}`);
