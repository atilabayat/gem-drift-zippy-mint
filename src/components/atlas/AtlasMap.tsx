import { useEffect, useMemo, useRef, useState } from "react";
import { frame, graticulePath, landPath, PLATE, points, scaleBar, ticks } from "@/data/plate-geometry";
import { places, placesById, plateLabels } from "@/data/places";
import { schoolById } from "@/data/schools";
import type { Thinker } from "@/data/types";

type Camera = { k: number; tx: number; ty: number };

const MIN_K = 1;
const MAX_K = 6;

function clampCamera(v: Camera): Camera {
  const k = Math.min(MAX_K, Math.max(MIN_K, v.k));
  if (k <= 1.001) return { k: 1, tx: 0, ty: 0 };
  return {
    k,
    tx: Math.min(0, Math.max(PLATE.width * (1 - k), v.tx)),
    ty: Math.min(0, Math.max(PLATE.height * (1 - k), v.ty)),
  };
}

export function AtlasMap({
  thinkers,
  selectedId,
  dimmed,
  onSelect,
}: {
  thinkers: Thinker[];
  selectedId?: string;
  dimmed: Set<string>;
  onSelect: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [camera, setCamera] = useState<Camera>({ k: 1, tx: 0, ty: 0 });
  const [unit, setUnit] = useState(1.4);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ moved: boolean; last: { x: number; y: number } | null; pinch: number | null }>({
    moved: false,
    last: null,
    pinch: null,
  });

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setUnit(PLATE.width / w);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomAt(event.clientX, event.clientY, factor);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // zoomAt closes over camera via setState functional update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const thinker = thinkers.find((t) => t.id === selectedId);
    if (!thinker) return;
    const point = points[thinker.originId];
    if (!point) return;
    setCamera((v) => {
      const sx = v.tx + v.k * point[0];
      const sy = v.ty + v.k * point[1];
      const margin = 70;
      const inside =
        sx > margin && sx < PLATE.width - margin && sy > margin && sy < PLATE.height - margin;
      if (inside) return v;
      const k = Math.max(v.k, 1.7);
      return clampCamera({
        k,
        tx: PLATE.width / 2 - k * point[0],
        ty: PLATE.height / 2 - k * point[1],
      });
    });
  }, [selectedId, thinkers]);

  function clientToViewBox(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const mapped = point.matrixTransform(matrix.inverse());
    return { x: mapped.x, y: mapped.y };
  }

  function zoomAt(clientX: number, clientY: number, factor: number) {
    const pointer = clientToViewBox(clientX, clientY);
    setCamera((v) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const worldX = (pointer.x - v.tx) / v.k;
      const worldY = (pointer.y - v.ty) / v.k;
      return clampCamera({ k, tx: pointer.x - worldX * k, ty: pointer.y - worldY * k });
    });
  }

  function zoomFromCenter(factor: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  }

  const laid = useMemo(() => {
    const groups = new Map<string, Thinker[]>();
    for (const thinker of thinkers) {
      const list = groups.get(thinker.originId) ?? [];
      list.push(thinker);
      groups.set(thinker.originId, list);
    }
    return [...groups.entries()].map(([cityId, list]) => ({
      cityId,
      list: [...list].sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, [thinkers]);

  const selected = thinkers.find((t) => t.id === selectedId);
  const hover = thinkers.find((t) => t.id === hoverId);

  function screenOf(x: number, y: number) {
    return { x: camera.tx + camera.k * x, y: camera.ty + camera.k * y };
  }

  return (
    <div className="relative h-full min-h-0 w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${PLATE.width} ${PLATE.height}`}
        className="plate-surface h-full w-full bg-folio font-sans"
        role="img"
        aria-label="Map of the Greek world around 450 BCE"
        onPointerDown={(event) => {
          if ((event.target as Element).closest("[data-marker]")) return;
          (event.currentTarget as SVGSVGElement).setPointerCapture(event.pointerId);
          pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          drag.current.moved = false;
          drag.current.last = { x: event.clientX, y: event.clientY };
        }}
        onPointerMove={(event) => {
          const store = pointers.current;
          if (!store.has(event.pointerId)) return;
          store.set(event.pointerId, { x: event.clientX, y: event.clientY });
          if (store.size === 2) {
            const [a, b] = [...store.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (drag.current.pinch != null && drag.current.pinch > 0) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              zoomAt(midX, midY, dist / drag.current.pinch);
            }
            drag.current.pinch = dist;
            drag.current.moved = true;
            return;
          }
          const last = drag.current.last;
          if (!last) return;
          const from = clientToViewBox(last.x, last.y);
          const to = clientToViewBox(event.clientX, event.clientY);
          if (Math.hypot(event.clientX - last.x, event.clientY - last.y) > 3) drag.current.moved = true;
          setCamera((v) =>
            clampCamera({ ...v, tx: v.tx + (to.x - from.x), ty: v.ty + (to.y - from.y) }),
          );
          drag.current.last = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          pointers.current.delete(event.pointerId);
          if (pointers.current.size < 2) drag.current.pinch = null;
          drag.current.last = null;
        }}
        onDoubleClick={() => setCamera({ k: 1, tx: 0, ty: 0 })}
      >
        <g transform={`translate(${camera.tx} ${camera.ty}) scale(${camera.k})`}>
          <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} className="fill-wash" />
          <path d={landPath} className="fill-land stroke-ink plate-stroke" />
          <path d={graticulePath} className="plate-graticule plate-stroke" />
          <rect
            x={frame.x}
            y={frame.y}
            width={frame.w}
            height={frame.h}
            className="plate-neatline plate-stroke"
          />
          {selected?.seats.map((seatId) => {
            const from = points[selected.originId];
            const to = points[seatId];
            if (!from || !to) return null;
            const midX = (from[0] + to[0]) / 2;
            const midY = (from[1] + to[1]) / 2 - 28;
            return (
              <path
                key={seatId}
                d={`M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`}
                className="plate-arc plate-stroke"
              />
            );
          })}
          <g className="fill-ink">
            <line
              x1={scaleBar.x1}
              x2={scaleBar.x2}
              y1={scaleBar.y}
              y2={scaleBar.y}
              className="stroke-ink plate-stroke"
            />
            <line
              x1={scaleBar.x1}
              x2={scaleBar.x1}
              y1={scaleBar.y - 4}
              y2={scaleBar.y + 4}
              className="stroke-ink plate-stroke"
            />
            <line
              x1={scaleBar.x2}
              x2={scaleBar.x2}
              y1={scaleBar.y - 4}
              y2={scaleBar.y + 4}
              className="stroke-ink plate-stroke"
            />
          </g>
        </g>

        {ticks.map((tick) => {
          const at = screenOf(tick.x, tick.y);
          return (
            <text
              key={tick.text + tick.x}
              x={at.x}
              y={at.y}
              textAnchor={tick.anchor === "end" ? "end" : "middle"}
              className="fill-muted"
              style={{ fontSize: 11 * unit }}
            >
              {tick.text}
            </text>
          );
        })}

        <text
          x={screenOf(scaleBar.x1, scaleBar.y).x}
          y={screenOf(scaleBar.x1, scaleBar.y).y + 14 * unit}
          className="fill-ink"
          style={{ fontSize: 11 * unit }}
        >
          {scaleBar.km} km
        </text>

        {plateLabels.map((label) => {
          const point = points[label.id];
          if (!point) return null;
          if (camera.k < 1.15 && label.kind === "island") return null;
          const at = screenOf(point[0], point[1]);
          const sea = label.kind === "sea";
          return (
            <text
              key={label.id}
              x={at.x}
              y={at.y}
              textAnchor="middle"
              className={sea ? "fill-sea font-display italic" : "fill-muted font-display"}
              style={{ fontSize: (sea ? 18 : 14) * unit, letterSpacing: sea ? "0.08em" : "0.04em" }}
            >
              {label.text}
            </text>
          );
        })}

        {places.map((place) => {
          const point = points[place.id];
          if (!point) return null;
          const at = screenOf(point[0], point[1]);
          const selectedHere =
            selected?.originId === place.id || selected?.seats.includes(place.id);
          const showName =
            selectedHere ||
            hover?.originId === place.id ||
            camera.k >= place.nameAt ||
            (place.kind === "origin" && camera.k >= 2.1);
          return (
            <g key={place.id}>
              <circle
                cx={at.x}
                cy={at.y}
                r={2.2 * unit}
                className={place.uncertain ? "fill-none stroke-cinnabar" : "fill-ink"}
                style={place.uncertain ? { strokeWidth: 1.25 * unit } : undefined}
              />
              {showName ? (
                <text
                  x={at.x + place.dx * unit}
                  y={at.y + place.dy * unit}
                  textAnchor={place.anchor}
                  className={
                    place.kind === "landmark" || place.kind === "seat"
                      ? "fill-muted"
                      : "fill-ink font-medium"
                  }
                  style={{ fontSize: (place.kind === "origin" ? 13 : 11) * unit }}
                >
                  {place.name}
                  {place.uncertain ? "*" : ""}
                </text>
              ) : null}
            </g>
          );
        })}

        {laid.map(({ cityId, list }) => {
          const center = points[cityId];
          if (!center) return null;
          const origin = screenOf(center[0], center[1]);
          const radius = list.length === 1 ? 0 : (16 + list.length * 4) * unit;
          return list.map((thinker, index) => {
            const angle = -Math.PI / 2 + (index * 2 * Math.PI) / list.length;
            const x = origin.x + Math.cos(angle) * radius;
            const y = origin.y + Math.sin(angle) * radius;
            const school = schoolById[thinker.schools[0]];
            const isSelected = thinker.id === selectedId;
            const isDim = dimmed.has(thinker.id) && !isSelected;
            const wide = school.mark.length > 2;
            return (
              <g
                key={thinker.id}
                data-marker
                className={isDim ? "opacity-30" : undefined}
                transform={`translate(${x} ${y})`}
                onPointerEnter={() => setHoverId(thinker.id)}
                onPointerLeave={() => setHoverId((current) => (current === thinker.id ? null : current))}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(thinker.id);
                }}
                onDoubleClick={(event) => event.stopPropagation()}
              >
                {list.length > 1 ? (
                  <line
                    x1={origin.x - x}
                    y1={origin.y - y}
                    x2={0}
                    y2={0}
                    className="stroke-line plate-stroke"
                  />
                ) : null}
                <circle
                  r={(wide ? 15 : 13) * unit}
                  className={
                    isSelected
                      ? "cursor-pointer fill-cinnabar stroke-ink"
                      : "cursor-pointer fill-folio stroke-ink"
                  }
                  style={{ strokeWidth: 1.25 * unit }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${thinker.name}, ${placesById[thinker.originId]?.name ?? ""}`}
                  aria-pressed={isSelected}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(thinker.id);
                    }
                  }}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`pointer-events-none font-semibold ${isSelected ? "fill-folio" : "fill-ink"}`}
                  style={{ fontSize: (wide ? 9 : 11) * unit }}
                >
                  {school.mark}
                </text>
              </g>
            );
          });
        })}

        {hover && points[hover.originId] ? (
          <HoverCard
            thinker={hover}
            x={screenOf(points[hover.originId][0], points[hover.originId][1]).x}
            y={screenOf(points[hover.originId][0], points[hover.originId][1]).y}
            unit={unit}
          />
        ) : null}
      </svg>

      <div className="pointer-events-none absolute top-3 left-3 hidden max-w-56 border border-line bg-folio/95 px-3 py-2 shadow-sm lg:block lg:top-4 lg:left-4">
        <p className="font-display text-2xl leading-none text-ink">The Greek world</p>
        <p className="mt-1 text-xs tracking-wide text-muted uppercase">c. 450 BCE</p>
        <p className="mt-1 text-xs leading-snug text-pretty text-muted">
          Pins are cities of origin. A line, on selection, runs to a seat the sources actually attest.
        </p>
      </div>

      <div className="absolute right-3 bottom-3 flex flex-col gap-2">
        <MapButton label="Zoom in" onClick={() => zoomFromCenter(1.25)}>
          +
        </MapButton>
        <MapButton label="Zoom out" onClick={() => zoomFromCenter(1 / 1.25)}>
          −
        </MapButton>
        <MapButton label="Fit the whole plate" onClick={() => setCamera({ k: 1, tx: 0, ty: 0 })}>
          Fit
        </MapButton>
      </div>

      <p className="pointer-events-none absolute bottom-3 left-3 hidden text-xs text-muted sm:block">
        North at the top · coast is the modern shore · * site disputed
      </p>
    </div>
  );
}

function HoverCard({
  thinker,
  x,
  y,
  unit,
}: {
  thinker: Thinker;
  x: number;
  y: number;
  unit: number;
}) {
  const place = placesById[thinker.originId];
  const width = 168 * unit;
  const height = 46 * unit;
  const left = x + 16 * unit + width > PLATE.width - 20 ? x - width - 16 * unit : x + 16 * unit;
  return (
    <g className="pointer-events-none" transform={`translate(${left} ${y - height / 2})`}>
      <rect width={width} height={height} className="fill-folio stroke-line" />
      <text x={8 * unit} y={18 * unit} className="fill-ink font-semibold" style={{ fontSize: 12 * unit }}>
        {thinker.name}
      </text>
      <text x={8 * unit} y={34 * unit} className="fill-muted" style={{ fontSize: 11 * unit }}>
        {place?.name}
        {thinker.seats.length ? ` · also ${thinker.seats.map((id) => placesById[id]?.name).join(", ")}` : ""}
      </text>
    </g>
  );
}

function MapButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center border border-line bg-folio text-sm font-semibold text-ink shadow-sm hover:border-sea hover:text-sea"
    >
      {children}
    </button>
  );
}
