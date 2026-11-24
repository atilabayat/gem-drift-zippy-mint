import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as createFileRoute, b as useSearch, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronLeft, i as ExternalLink, n as Search, o as Bookmark, r as Info, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_xQj0Z-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-D00Tn9Oy.css";
var APP_NAME = "Oikoumenē — Greek thinkers, c. 450 BCE";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "An interactive atlas of the Greek world around 450 BCE: thinkers, cities of origin, schools, doctrines, and the texts."
			},
			{
				name: "theme-color",
				content: "#fbf7f0"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var PLATE = {
	width: 1200,
	height: 840
};
var frame = {
	"x": 52,
	"y": 91.9,
	"w": 1096,
	"h": 674.6
};
var landPath = "M749,687.6L753.1,688.1L758.6,688L759.9,687.6L763.4,683.3L767.7,683.2L769.6,687.4L765.2,689.4L764.3,690.5L765.2,691.4L768.5,693.1L773.1,692.5L773.2,695.8L774.2,698.5L776.5,700.1L778.9,700.4L784.3,699.9L789.7,698.9L795.2,696.7L800.8,695.7L817.6,696.7L823.6,701.3L835.1,701.9L845.7,704.3L851.3,702.7L860.9,701.2L862.4,702.8L861.2,713.2L861.8,716.2L864.5,717.7L867.3,717L870.6,713.6L878.6,710.9L887,711L894,704.1L896.1,703.7L894.8,707.1L893.7,715L892.2,719.7L891.5,723.4L886.8,725.3L879.8,725.6L866.8,724.8L853.8,726.1L829.7,729.6L805.5,731.4L802.2,730.2L802.2,725.6L801.6,722.4L800.1,720.1L792.6,718.2L785.5,715L757.5,710.5L750.9,708.7L740.2,709.6L736.3,709.5L733.6,707.9L731.7,705.1L730.9,696.3L732.2,687.6L734.5,685.3L735.6,687.9L738.3,689.1L740.9,686.5L740.9,682.5L742.2,678.8L744.2,680.3L745.5,686ZM723,431.3L726.4,439.6L729.6,442.4L736.2,445.7L739.3,446.2L750.6,452.1L763.7,453.3L765.4,455L767.1,459.6L769.7,463.2L770.4,466L769,469.1L771,478.6L774.3,487.6L779.3,492L785.5,493.3L791.4,493.1L792.9,494.9L792.3,502.7L789.8,505.8L787.8,506.5L786,505.7L784.4,503.9L782.7,503L779.3,502.9L776.8,499.7L770.5,495.4L769.3,492.8L769.1,488.8L766.4,485.9L764,480.3L761.6,478.7L760.3,475.9L760.2,474.7L751.1,473.9L743.5,473.9L737,470.7L735.1,462.3L731.2,460.1L728.4,457.7L726,454.5L720,448.4L713.3,443.4L706.9,440L700,437.9L694.5,440.4L691.2,439.8L690.6,438.1L697.5,434.6L707,428L713.7,425.8L716.9,425.5ZM256.1,487.6L252.1,496.2L250.1,499.5L235.7,520.5L234.1,525.4L233.1,530.6L231.6,535.2L229.6,539.5L227.7,545L228.1,551.3L228.7,554.3L230.5,556.3L233.3,558.2L235.5,561.1L232.1,563.7L235.8,569L239,572.1L239.4,575.2L239.3,578.4L232.8,584.2L230.2,587.4L228.7,591.3L228,595.3L228.7,599L228.5,602.6L221.9,602.1L215.2,599.9L208.4,600.9L198.8,596.7L195.3,596L192.1,594.3L184.1,581.4L177.6,575.9L170.7,571.6L163.6,571.4L156.6,571.8L150.3,569.2L137.6,560.4L124.1,553.3L118.4,548.7L115.8,545.6L112.8,543.5L105,541.4L98.1,536.6L95,536.3L88.2,536.9L84.7,536.5L81.2,534.9L74.4,529.2L70.1,521.3L69,517.9L72.1,508.9L75.7,500.3L78.9,497.8L82.6,496.1L84.9,493.6L86.8,490.4L93.7,499.5L96.8,501.6L100,501.1L105.6,497.9L106,494.4L112.2,489.9L120,489.8L123.6,490.6L125.5,494.7L128.5,495.9L131.9,496.5L143.2,504.2L146.4,505.5L149.6,505.7L158.4,502.4L165.2,501.2L179.3,503L187,501.1L192.3,500.8L200.1,497.8L206.1,492.9L209.2,491.6L212.6,491.3L220.7,491.6L228.8,492.7L232.2,491.6L235.1,488.3L238.4,486.8L242.1,487.8L251.5,482.2L255.6,481.9L259.6,484ZM180.9,651.4L177.3,652.6L173.8,650.3L172.9,649L177.9,647.9L180.3,648.9L181.3,650.8ZM158.5,295.8L155.9,296.5L154.3,295.6L153.5,294.4L154.5,291.4L159.9,293.2L159.9,294.8ZM320.1,112.6L331.1,114.9L339.2,113.8L346.5,115.2L351,117.8L352.1,119.1L346.2,119.2L339.6,118.2L332,120.8L325.3,119.4L322.8,117.7L321,115.6ZM352.4,102L348.3,102.9L321.8,102.3L314.1,100.6L305.5,96.2L303.8,94.9L312.4,93.6L320.4,94.9L322.9,98L344.5,100.6ZM986.7,658.7L982.4,660.2L981,660L979.2,656.6L981.7,648.4L979.4,643.1L979.2,640.8L982.7,637.7L985.1,633L991,628L1006.3,622L1009.9,621.4L1009.8,626.1L1004.7,638L1000.1,643.9L1001.3,648.6L994.1,650ZM947,692.7L944.8,696.8L942.4,693.3L943.4,689.3L940.8,683L945.8,673.6L946,669L949.8,666.7L948.9,674.4L945.9,680.7L949,685.8L950.5,691.7ZM987.8,612.5L986.5,613.7L983.5,610.3L983.3,608.6L986.4,606.5L987.9,606.1L988.4,607.4L988.3,610.4ZM937.7,582.4L931.8,583.4L932.8,577.5L929.9,572.8L934.6,575.5L937.5,578.6L938.9,579.2L938.6,581.1ZM933.5,599.7L931.7,599.8L933.9,596.2L940.2,591.2L949.3,586.9L952.4,586.4L957.5,589.1L948,593.6L945.5,595.9L938.5,596.4ZM849.9,581.8L844.6,584.6L841,580.5L839,574.1L848.7,564.7L851,565.5L852.4,568L852.2,576.4ZM834,574.3L829.3,580L825.4,579.4L823.7,576.7L826.1,571.3L831.4,568.3L833.8,569.1L833.6,573.1ZM846.1,624.5L843.4,628.4L839.5,627L841.1,625.5L842,623.6L842.1,620.8L841.1,619.1L841.8,618.5L845.3,621.3ZM840.2,603.6L839.1,604.8L834.6,600.1L832.9,597.3L835,595.1L841.7,600.4ZM926.1,518.5L933.4,521L935.4,520.7L938.9,521.6L939.8,526.2L935.2,526.9L927.3,531.1L923.9,530.1L919.9,526.5L913.5,526.1L911.6,525.1L915,520.8L921.3,518.6ZM878.7,539.7L875.9,540L876.8,537L882.1,531.8L889.6,531.5L896.4,528.9L897.9,528.8L894.7,533L889.2,536.8ZM868.6,595L863.3,595.6L861.7,595L864.9,593.7L867.1,592.4L868.2,590.7L873.5,587.8L877,584L880.8,586.6L876.1,588.3ZM904.4,610.2L899.7,612L896.7,615.7L893.1,613L893.1,609.5L897.1,610.6L899.9,608.5L899,606.2L902.1,607.3ZM779.1,536.2L775.1,539.8L774.4,534.3L776.9,528.6L780.4,528.2L781.7,530.7ZM783.8,553.6L780.4,555.9L781.5,550.7L779.9,548L781.4,545.7L783.5,543.8L784.6,545.7L786.5,548.8ZM789.8,596.9L789.9,601.3L789.5,602.9L777.3,605L778.4,600L779.1,598.4L783.2,600.7L784.7,599.5L785.3,598.2ZM814,542.4L813.7,550.2L812.1,550.1L811.2,548.9L811.2,546L811.8,541.3ZM816.9,522.4L815.2,527.5L810.5,521.6L805.4,517.6L803.5,514L800.4,511.9L799.6,507.2L803.3,505.2L804.9,505L808.8,510.8L814.8,511.5L814.3,515L816.2,519.6ZM832.7,534.5L830.4,539.3L826.7,538.6L820.5,533.3L818.4,531L817.2,528.6L819.8,528.4L822.9,530.8L830.8,532.1ZM800.8,585.2L799.7,585.5L798.1,582.4L797.8,579.5L798.4,577.7L800.5,577.6L803.3,583.1ZM882.6,487.8L876.9,492L870.5,485.8L869.5,483.9L874.2,481.3L876.5,477.5L874.6,472.7L868.1,465.7L867.8,460.7L877.7,458.6L883.6,462.9L886.5,463.2L885.4,467.4L885.9,468.7L886.3,481.3L883.6,483.1L883.1,486.5ZM901.4,402.8L900.4,407.4L908.6,415L911.4,419.8L912.5,424.4L911.8,425.7L908.6,423.2L906.1,422.4L906.9,425.7L909.6,428.6L904.9,430.2L900.2,430.2L886.6,426.2L883.4,421.9L891.6,415.6L893.2,413L887.5,413.2L881.3,420.8L871.4,417.5L868.4,414.4L867.7,412.8L871.6,406.1L878.6,406.3L882.2,404.8L886.8,402.7L886.8,399.5L897.7,398.7ZM744.7,419.4L742.1,422L738,420.8L733.7,412.1ZM751.2,416L748.4,416.9L751.2,410.8L756.1,407.6L754.3,412.8ZM798,442.8L791.7,444.6L790.1,444.3L791.5,442L791.6,441L785.3,436.7L786,431.1L786.8,429.7L791.4,432.6L792.5,437.4ZM858.3,317.7L851.5,319.7L844.1,313.3L851.3,310.7L854.6,312.6L857,314.8ZM843.5,352.3L841.2,354.9L839.6,359.4L838.7,365.9L835.2,366L833.1,364.7L832.4,362.3L832.3,359.2L830.7,359.3L829.5,362.7L828.4,364.2L824.9,364.5L821.1,362.4L821.3,358L820.5,352.8L820.9,351L831.4,350.5L834.4,354.4L838.1,352.1L839.7,349.8L844.2,348.3ZM804,302.9L796.3,305.7L788.6,300.4L788.6,297.3L792.7,290.8L795,288.9L800.7,289.5L803.9,293.9L804.7,295.9L803.6,299.5ZM875.2,340.4L861.5,342.8L857.3,340.4L861.5,335.7L869.5,332.8L872.1,332.4L875.6,337.1ZM195.9,664.3L193.9,666.7L188.2,666.6L183.2,662.9L183.1,655L188.9,656.6L194.2,661.8ZM377.1,131.1L385.2,136.6L361.4,129.3L364.1,128.7L366.6,128.5ZM556.1,475.2L556.8,484L561,485.6L566.6,493.5L566.1,497.6L564.9,498.9L555.7,495.2L553.5,496.9L550.8,496.2L549.1,491.8L549.3,490.3L547.8,487.7L546.5,486.5L542.9,490L540.6,490.7L540.6,487.5L543.9,478.8L545.5,477.3L548.3,480.2L550.5,479.1L552.2,474.4L552.4,469.7L553.1,468.3ZM572.5,519L578.8,526.3L573.7,524.5L568.3,529.6L561.5,523.6L557.4,517.6L556.5,515.2L560.8,509.6L564.8,515.4L569.6,516.3ZM560.5,458.1L558.2,458.7L556.2,458.3L554.4,458.6L552.6,460.1L552.8,454L554.9,446.5L557.4,442.1L560.9,440.1L562.5,443.5L562.2,455.8ZM564.8,479.3L561.8,480.1L558.1,472.9L556.7,467.8L558.3,467.6L559.8,468.1L561.4,470L561.3,472L562,474.1L563.6,476.6ZM524.2,394.9L525.5,399.2L518.1,396.5L512.7,392.7L508.2,383.1L498.7,372.2L498.5,369L502.2,366.6L510,364.9L513.1,366.7L515.2,368.5L515.8,370.6L511.4,374.8L510.5,376.7L513.9,380.5L513.8,382L515.3,389.2L516.9,392L521.2,394.2ZM731.1,509.9L728.7,511.7L726.1,511.6L724.2,511L723.3,509.5L724.4,508.8L725.8,505.8L727.1,504.9L729,505.3L730.1,506.5ZM701.5,639.5L700.8,642.7L694.7,640.5L693,637.2L692.7,629.8L694.3,626.2L695.3,625.1L698.2,629.2L704.1,635.3ZM841.4,548L835.7,548.5L836,542.7L838.2,541.2L845,544.1L844.7,545.9ZM789,570L786.8,571.1L783.2,569.5L784.1,565.4L786.7,563.7L789.4,565L789.8,566.8ZM1148,91.9L1148,766.5L1148,766.5L1148,615.5L1145.4,620.1L1144,630.6L1141.8,633.6L1138.3,635.5L1132.8,632.2L1129,630.8L1120.2,635.1L1102.7,641.1L1096.7,641.9L1076.4,634.4L1069,629.5L1064.2,624.1L1062.6,615L1059.6,609.8L1059.1,606.3L1058,602.2L1053.9,600.5L1049.5,603.6L1044.8,603.5L1038.9,601.6L1024.9,594L1014.2,593.4L1007.8,602.7L1002.8,605.7L997.3,606.6L997,603.9L1001.1,597.9L984.4,599L975.6,603.6L968.7,602.9L963.6,600.8L964.4,598.2L969.6,597.3L974.1,595.2L992.2,593.6L996.4,591.9L1001.1,585.3L1009.5,579.6L1010.5,577.2L1004.1,577.2L976.4,578.8L957.3,577.9L955.1,580.7L952.2,581.1L951.4,573.4L954.4,569.9L958.5,570.2L968.4,567.1L967.5,560.7L960.4,556.4L959,553.9L953.8,553.3L949.6,550.3L948.7,542.6L945.4,534.2L940.6,530.1L941.2,527.8L949.9,525L951.7,513.2L950.4,505.9L946,505.3L933.2,499.5L929.3,500.1L925.1,493.8L917.7,489.3L914,490.9L911.7,493L908.2,492L902.5,488L896.8,485.9L894.3,483.3L897.4,476.2L901.8,476.4L902.6,470.9L899.2,461.6L899.5,456.9L903.3,455.6L907.6,456.5L911.9,462L913.3,467.3L912.4,472.5L915.2,477.6L917.1,478.8L918.5,473.5L920.3,472.5L922.8,474.9L928.3,476L942.4,472.8L945.1,470L934.8,470.3L931,467.7L926.9,462L924.4,456.7L923.9,454.1L922.5,450.4L924,448.3L931.1,445.3L937.4,436.8L934.8,434.4L931.8,433.2L928.6,434.1L925.5,431.1L925.1,427.1L927.6,423.8L927.8,419.3L919.8,408.1L917.6,405.7L919.3,402.1L925.4,395.9L931.2,388.4L930.5,385.9L926.2,384.8L905.8,388.1L897.9,390.9L883.7,392.2L882.7,388.1L883,384.4L886.2,377.6L885.9,360.8L887.8,351.7L895.6,349L905.3,335.6L920.9,319.7L937.3,320.1L943.8,315.7L953.5,315.4L955.3,318.6L956.4,321.7L964.9,326L979.9,325.3L983.6,323.6L987.1,321.2L980.1,313.4L982.4,311.2L988.7,310.9L995.5,312.8L995.8,314.6L994,317L991.9,321.3L993.9,322.1L1013.3,319.5L1033.7,321.6L1040.1,320.5L1056.1,320.6L1059,317.9L1054.1,314.5L1049.4,313.3L1046.2,311.7L1043,309.3L1053.2,301.7L1058.9,300.2L1085.9,295.6L1106,293.3L1106.3,291.5L1103.4,291.5L1077.4,287.7L1071.1,284.7L1062.5,277.5L1060.6,275.5L1058.4,272L1059.7,264.6L1061.3,258.6L1064.5,255.2L1074.9,254.6L1110.4,260.7L1135.8,257.1L1148,261L1148,91.9L996.6,91.9L994.9,93.5L991.9,97.1L989.9,110.6L989.5,132.6L985.3,135.3L981.4,136.1L965.4,155.4L974.6,160.9L978.7,165L985.5,176.4L995.1,189.3L997,195.6L995.4,204.7L999.1,214.8L1007.9,228.7L1016.7,235.7L1052.5,253L1059.1,254.5L1057.6,261.5L1055.4,267.8L1053.1,272L1042.6,274.7L1013.7,267L1006.4,266.3L1001.2,267.8L991.7,273.4L981.1,271.6L966.3,274.7L962.2,285.2L951.9,297.2L935,306.9L923,312.1L904.9,330.6L896.6,341.4L893.2,343.4L889.1,345.1L890.4,339.9L892.5,335.2L892,331.6L892.1,326.4L898.1,320.5L903.6,316.2L919.9,308.5L924.2,302L911.4,302.2L898.5,303.6L890.3,302.7L883.3,303.2L881,297.6L879.3,294.1L877.6,290.8L868.4,284.9L847,281.5L836.8,277.1L832.3,277.9L823.6,273L817.7,275.2L805.1,283.9L798.3,282.9L791,277.7L786.3,276.7L780.7,279.5L771.8,289.5L762.8,294.4L754.6,292.5L743.7,292.5L742.6,298.1L744.7,301.9L750.6,308.5L747.8,313.4L749.9,318.3L753.8,319.3L759.7,319L770.5,325.4L775.3,332.1L778.3,339.5L771.7,334.2L767.3,329.1L761.2,327.3L752.7,323L747.3,322.3L741.6,325.3L741.2,328.7L747.3,335L752.9,338.9L755.9,342L757.9,349L756.8,351.4L754.7,353.6L748,349.2L737.9,333.5L723.7,330.4L721.3,333.7L724.1,342L726.1,345.2L738.4,354.2L737.4,356.1L735.7,356.9L721.8,351.8L717.8,344L716.9,334.1L704.1,327.2L692.1,319.8L689.4,312.7L691.9,310L693.7,304.8L687.1,305.8L682.9,309.1L676.2,312.3L675.9,317.5L677,322.4L674.8,329.4L672.6,341.7L674,348.1L688.5,366.4L693.5,379.7L697,384.8L704.4,390.3L712.2,400.6L715.5,406L717.8,414.7L711.3,420.2L707.5,420.4L705.4,418L708.3,412L707.9,408.4L697.9,402.7L693.6,404.6L688.7,408.3L691.5,415.1L694.6,419.6L696.2,425.8L702.3,425.3L694.1,432.2L686.5,435.7L679,435.9L674.3,436.5L672.6,438.3L676.5,439.6L679.7,439.7L684.8,443.4L699.5,447.9L706.5,453.5L713.3,454.1L720.3,464.4L732.2,467.2L739,477.6L748.1,479.6L755.9,483.4L758.2,487.1L759.3,493.7L759.8,507.6L761.5,518L761.6,521.3L761.1,526.2L759,528.6L756.2,528.7L750.5,521L741.9,513L732.9,503.5L730.3,501.8L728.2,501.6L723.3,504.9L709.8,507.4L703.5,510.9L701.1,511.6L700.4,513.5L703.4,515.4L707,519.7L707,525.7L710.1,532.9L713.9,534.8L719,534.6L721.9,535.9L722.6,538.8L725.6,542.2L727.5,544.7L727.4,546.4L713.3,551.1L710.4,553.3L707.9,554.4L704.2,552.2L704,546.4L699.2,543.3L694.7,540.7L689.4,539.5L684.9,535.5L681.9,538.8L684.3,549.9L689.4,557.6L698,578.2L701.9,590.3L702.7,596.1L700.7,605.8L704.9,613L707.8,620.4L704.6,620.1L701.9,617.5L697.3,614.4L688.3,602.6L685.2,595.3L681.4,594.7L675,595.8L667.8,611.5L667.9,620.5L664.2,618.3L661,615.5L661.4,605.7L661.1,601.5L652.5,588.1L648.5,586.6L646.7,582L643.5,577.2L639.4,578.1L636.1,580.1L635.1,587.4L634.8,594L632.3,598.9L623.1,589.5L613.9,573.3L613.6,564.4L620.4,556.2L619.6,550.4L613.2,538.9L603.9,531.4L598.8,529.2L596.3,521.3L591.4,517.2L587.4,515.3L586.6,512.5L587.8,510.4L597.5,502.2L603.2,489.4L606,488.8L611.8,491.8L618.4,491L623.7,483.5L628.3,479.4L635.9,479.9L653.2,490L671.8,495.7L681.1,500.7L686.3,505.7L689.1,506.7L693.5,507.4L693.3,503.7L691.9,500.4L695.6,498.6L705.6,498.7L707.4,497L709.2,494.2L707.2,490.9L703.9,489.4L700.3,489L698,488L694.3,489L688.4,486.5L685.4,484.5L683.6,482.3L673.5,478.1L663.8,471L661.7,475.1L657.8,477.2L652.2,477.5L636.7,473L627.1,476.5L621.9,477.4L617.9,477.4L613,479L607.3,479.9L602.4,473.4L600.3,468.3L598.9,467.3L598.8,472.1L597.2,475.9L590,478.1L585.9,475.1L582.7,466.1L578.7,454.6L571.6,445.3L565.9,442.9L565.4,437.8L565.9,433.7L572.8,432.7L583.6,437L585.8,436.1L588.2,434.1L587.8,429.8L586.2,425.9L583.2,425.7L581.2,426.1L574.6,425.3L566,427.5L562.1,425.5L560.8,423L553.6,416.8L547.5,408.6L537.5,403L531,386.2L525.5,378.8L519.7,373.5L519.3,366.4L517.5,360.9L510.8,347.6L488.9,334.6L483.7,328.8L481.5,323.9L479.2,319.2L481.4,319.1L483.5,320.3L486.3,321.7L487.4,319.3L486.2,314.3L480.5,302.4L480.1,299.1L482.9,289.1L487.5,277.9L487.2,264.2L488.6,253.9L487,247.2L486.3,239L489.6,228L492.5,225.3L494.3,221.8L494.4,210.1L487.9,204.6L480.4,203.6L471.1,197.2L467.3,188.2L453.7,173.1L438.2,162.7L437.3,161.1L438.2,159.1L438.9,157.5L435.7,157.4L433.4,158.6L431.3,158.3L420.3,150.6L410,142L390,128.8L375.7,125.5L356.3,114.9L343.6,111.1L348.4,110.2L354,110.2L384,124.4L380.7,120.7L375.7,117.3L372.9,115.4L360.5,102.9L348.6,95.1L345.7,91.9L247,90.9L148.4,91.9L150.6,97.6L157.7,124.4L162.8,137.5L173.1,152.3L194.4,173.5L213.8,188.9L231.8,198.4L245.9,200L279.2,197.9L285,198.9L291.1,201.4L292.6,208L290.3,212.4L283.3,217L276.2,223.4L275.4,232.1L282.1,238.1L314.2,254.3L347.1,267.7L357.3,274.6L369.1,285.2L397.8,299.8L402.6,306.9L420,322L427.9,333.7L429.4,342.8L425.6,352L423.9,358.5L420.9,364.8L413.5,362.4L405.1,355.9L392.4,329.1L369.3,326.4L364.5,324.4L356.2,319.8L355.7,316.8L353.7,313L351.6,311.7L342.8,310.9L336.6,315.2L329.4,325.5L321.2,340.3L312.9,361.9L312.4,370.6L316.9,379L330.4,383.6L340.8,391.1L347.7,398.9L348.2,417.7L351.3,428.3L346.8,434.3L338,432.8L326.3,436.6L318.1,443.5L314.6,450L315.5,466.8L313.8,473.3L298.1,485.4L289.9,497.7L287.9,502.9L284.7,508.7L264.9,508.9L260.2,501.7L260.1,491L263.5,484.4L270.7,481.3L275.7,467.6L274.1,457.7L277,453.3L279.7,450.1L285.2,448.3L293,446.6L293.8,432.7L287.7,426.3L285.6,417.5L282.7,401L272.7,379.9L267.2,361.1L263,351.7L256.6,346.9L245,346.9L239.3,345.5L218.8,332.3L217.4,330.3L217.5,326.8L220.9,321.5L218.6,314.3L216.2,307.5L212.2,301.7L207.8,298.7L198.6,300.6L195.4,302L189.6,301.5L185,304.1L182.4,304.2L189.6,294L187.7,291.6L180.6,287.4L171,286.8L168.3,286.3L166.7,288.9L164.8,287.4L165,282.9L153.8,262.4L146.3,254L142.5,252.5L135.7,254.3L124.2,250.6L117.3,249.8L113.6,250.7L107.9,253.3L105.1,251.6L104.1,248.8L93.6,240.3L80.6,235.4L55.3,208.1L52,203.7L52,91.9L188.3,78.7L325.2,69.2L462.5,63.4L600,61.5L737.5,63.4L874.8,69.2L1011.7,78.7Z";
var graticulePath = "M162.2,766.5L162.2,91.9M281.3,766.5L281.3,91.9M400.5,766.5L400.5,91.9M519.6,766.5L519.6,91.9M638.7,766.5L638.7,91.9M757.8,766.5L757.8,91.9M877,766.5L877,91.9M996.1,766.5L996.1,91.9M1115.2,766.5L1115.2,91.9M52,653.5L200.9,653.5L349.8,653.5L498.7,653.5L647.7,653.5L796.6,653.5L945.5,653.5L1094.4,653.5L1148,653.5M52,504.3L200.9,504.3L349.8,504.3L498.7,504.3L647.7,504.3L796.6,504.3L945.5,504.3L1094.4,504.3L1148,504.3M52,351L200.9,351L349.8,351L498.7,351L647.7,351L796.6,351L945.5,351L1094.4,351L1148,351M52,193.1L200.9,193.1L349.8,193.1L498.7,193.1L647.7,193.1L796.6,193.1L945.5,193.1L1094.4,193.1L1148,193.1";
var points = {
	"athens": [741.6, 506.4],
	"elea": [231, 338.5],
	"acragas": [137, 556.1],
	"abdera": [815.8, 277.9],
	"clazomenae": [922.8, 477],
	"ephesus": [956.9, 508.8],
	"miletus": [953.1, 539.6],
	"samos": [933.2, 527.6],
	"croton": [348.5, 422],
	"leontini": [221.9, 558.1],
	"cos": [953.7, 587.4],
	"halicarnassus": [961.8, 576.5],
	"ceos": [778.3, 529.8],
	"elis": [601.4, 512.4],
	"apollonia": [977.9, 159],
	"colophon": [944.8, 495.6],
	"chios": [885.1, 476.4],
	"lampsacus": [917.6, 324.1],
	"tarentum": [354.6, 313.8],
	"thurii": [310.8, 372.4],
	"sparta": [663.9, 573.2],
	"corinth": [691.1, 511.4],
	"thebes": [717.2, 480.1],
	"syracuse": [239.2, 574.6],
	"delphi": [668.6, 467.7],
	"byzantion": [1054.4, 272],
	"olympia": [616.7, 531.6],
	"aegean": [826.3, 538.2],
	"ionian-sea": [442.2, 526.9],
	"crete-sea": [793.6, 686.5],
	"libyan": [424.3, 715.7],
	"propontis": [1008, 288.4],
	"pontus": [1073.5, 148.8],
	"sicily": [171.1, 538.2],
	"magna": [290.3, 308],
	"pelop": [647.7, 549.4],
	"thrace": [826.3, 252.9],
	"ionia": [1017, 492.9],
	"crete": [808.5, 710.6],
	"rhodes": [993.1, 640.9],
	"lesbos": [893.7, 415.1],
	"euboea": [757.8, 464.8]
};
var ticks = [
	{
		"x": 162.2,
		"y": 782.5,
		"text": "14°"
	},
	{
		"x": 281.3,
		"y": 782.5,
		"text": "16°"
	},
	{
		"x": 400.5,
		"y": 782.5,
		"text": "18°"
	},
	{
		"x": 519.6,
		"y": 782.5,
		"text": "20°"
	},
	{
		"x": 638.7,
		"y": 782.5,
		"text": "22°"
	},
	{
		"x": 757.8,
		"y": 782.5,
		"text": "24°"
	},
	{
		"x": 877,
		"y": 782.5,
		"text": "26°"
	},
	{
		"x": 996.1,
		"y": 782.5,
		"text": "28°"
	},
	{
		"x": 1115.2,
		"y": 782.5,
		"text": "30°"
	},
	{
		"x": 44,
		"y": 653.5,
		"text": "36°",
		"anchor": "end"
	},
	{
		"x": 44,
		"y": 504.3,
		"text": "38°",
		"anchor": "end"
	},
	{
		"x": 44,
		"y": 351,
		"text": "40°",
		"anchor": "end"
	},
	{
		"x": 44,
		"y": 193.1,
		"text": "42°",
		"anchor": "end"
	}
];
var scaleBar = {
	x1: 293.2,
	x2: 424,
	y: 723,
	km: 200
};
/** Ancient sites. Coordinates are the archaeological centers, WGS84. */
var places = [
	{
		id: "athens",
		name: "Athens",
		greek: "Ἀθῆναι",
		region: "Attica",
		lat: 37.9715,
		lon: 23.7267,
		kind: "origin",
		nameAt: 1,
		dx: -10,
		dy: -12,
		anchor: "end"
	},
	{
		id: "elea",
		name: "Elea",
		greek: "Ἐλέα",
		region: "Magna Graecia",
		lat: 40.1597,
		lon: 15.155,
		kind: "origin",
		nameAt: 1,
		dx: -8,
		dy: 4,
		anchor: "end"
	},
	{
		id: "acragas",
		name: "Acragas",
		greek: "Ἀκράγας",
		region: "Sicily",
		lat: 37.311,
		lon: 13.577,
		kind: "origin",
		nameAt: 1,
		dx: 0,
		dy: 16,
		anchor: "middle"
	},
	{
		id: "abdera",
		name: "Abdera",
		greek: "Ἄβδηρα",
		region: "Thrace",
		lat: 40.933,
		lon: 24.973,
		kind: "origin",
		nameAt: 1,
		dx: 0,
		dy: -14,
		anchor: "middle"
	},
	{
		id: "clazomenae",
		name: "Clazomenae",
		greek: "Κλαζομεναί",
		region: "Ionia",
		lat: 38.36,
		lon: 26.77,
		kind: "origin",
		nameAt: 1.65,
		dx: -8,
		dy: -12,
		anchor: "end"
	},
	{
		id: "ephesus",
		name: "Ephesus",
		greek: "Ἔφεσος",
		region: "Ionia",
		lat: 37.9397,
		lon: 27.341,
		kind: "origin",
		nameAt: 1.7,
		dx: 8,
		dy: -8,
		anchor: "start"
	},
	{
		id: "miletus",
		name: "Miletus",
		greek: "Μίλητος",
		region: "Ionia",
		lat: 37.5306,
		lon: 27.278,
		kind: "origin",
		nameAt: 1.55,
		dx: 8,
		dy: 12,
		anchor: "start"
	},
	{
		id: "samos",
		name: "Samos",
		greek: "Σάμος",
		region: "Ionia",
		lat: 37.6905,
		lon: 26.9436,
		kind: "origin",
		nameAt: 1.35,
		dx: -8,
		dy: 14,
		anchor: "end"
	},
	{
		id: "croton",
		name: "Croton",
		greek: "Κρότων",
		region: "Magna Graecia",
		lat: 39.08,
		lon: 17.127,
		kind: "origin",
		nameAt: 1,
		dx: 8,
		dy: 4,
		anchor: "start"
	},
	{
		id: "leontini",
		name: "Leontini",
		greek: "Λεοντῖνοι",
		region: "Sicily",
		lat: 37.284,
		lon: 15.003,
		kind: "origin",
		nameAt: 1.45,
		dx: 8,
		dy: -10,
		anchor: "start"
	},
	{
		id: "cos",
		name: "Cos",
		greek: "Κῶς",
		region: "Aegean",
		lat: 36.892,
		lon: 27.288,
		kind: "origin",
		nameAt: 1.7,
		dx: 8,
		dy: 4,
		anchor: "start"
	},
	{
		id: "halicarnassus",
		name: "Halicarnassus",
		greek: "Ἁλικαρνασσός",
		region: "Caria",
		lat: 37.0379,
		lon: 27.4241,
		kind: "origin",
		nameAt: 1.55,
		dx: 8,
		dy: 14,
		anchor: "start"
	},
	{
		id: "ceos",
		name: "Ceos",
		greek: "Κέως",
		region: "Cyclades",
		lat: 37.661,
		lon: 24.343,
		kind: "origin",
		nameAt: 1.4,
		dx: -8,
		dy: 12,
		anchor: "end"
	},
	{
		id: "elis",
		name: "Elis",
		greek: "Ἦλις",
		region: "Peloponnesus",
		lat: 37.893,
		lon: 21.374,
		kind: "origin",
		nameAt: 1.15,
		dx: -8,
		dy: -12,
		anchor: "end"
	},
	{
		id: "apollonia",
		name: "Apollonia",
		greek: "Ἀπολλωνία",
		region: "Pontus",
		lat: 42.424,
		lon: 27.695,
		kind: "origin",
		nameAt: 1,
		dx: -8,
		dy: -12,
		anchor: "end",
		uncertain: true
	},
	{
		id: "colophon",
		name: "Colophon",
		greek: "Κολοφών",
		region: "Ionia",
		lat: 38.114,
		lon: 27.139,
		kind: "origin",
		nameAt: 1.85,
		dx: 8,
		dy: -4,
		anchor: "start"
	},
	{
		id: "chios",
		name: "Chios",
		greek: "Χίος",
		region: "Ionia",
		lat: 38.368,
		lon: 26.136,
		kind: "origin",
		nameAt: 1.45,
		dx: -8,
		dy: -4,
		anchor: "end"
	},
	{
		id: "lampsacus",
		name: "Lampsacus",
		greek: "Λάμψακος",
		region: "Hellespont",
		lat: 40.345,
		lon: 26.682,
		kind: "seat",
		nameAt: 1.7,
		dx: 8,
		dy: -10,
		anchor: "start"
	},
	{
		id: "tarentum",
		name: "Tarentum",
		greek: "Τάρας",
		region: "Magna Graecia",
		lat: 40.476,
		lon: 17.23,
		kind: "seat",
		nameAt: 1.35,
		dx: 8,
		dy: -8,
		anchor: "start"
	},
	{
		id: "thurii",
		name: "Thurii",
		greek: "Θούριοι",
		region: "Magna Graecia",
		lat: 39.724,
		lon: 16.495,
		kind: "seat",
		nameAt: 1.5,
		dx: -8,
		dy: 14,
		anchor: "end"
	},
	{
		id: "sparta",
		name: "Sparta",
		greek: "Σπάρτη",
		region: "Peloponnesus",
		lat: 37.082,
		lon: 22.423,
		kind: "landmark",
		nameAt: 1.5,
		dx: 0,
		dy: 14,
		anchor: "middle"
	},
	{
		id: "corinth",
		name: "Corinth",
		greek: "Κόρινθος",
		region: "Hellas",
		lat: 37.906,
		lon: 22.879,
		kind: "landmark",
		nameAt: 1.6,
		dx: -8,
		dy: 12,
		anchor: "end"
	},
	{
		id: "thebes",
		name: "Thebes",
		greek: "Θῆβαι",
		region: "Boeotia",
		lat: 38.319,
		lon: 23.318,
		kind: "landmark",
		nameAt: 1.7,
		dx: 8,
		dy: -10,
		anchor: "start"
	},
	{
		id: "syracuse",
		name: "Syracuse",
		greek: "Συράκουσαι",
		region: "Sicily",
		lat: 37.064,
		lon: 15.293,
		kind: "landmark",
		nameAt: 1.45,
		dx: 8,
		dy: 4,
		anchor: "start"
	},
	{
		id: "delphi",
		name: "Delphi",
		greek: "Δελφοί",
		region: "Phocis",
		lat: 38.482,
		lon: 22.501,
		kind: "landmark",
		nameAt: 1.6,
		dx: -8,
		dy: -10,
		anchor: "end"
	},
	{
		id: "byzantion",
		name: "Byzantion",
		greek: "Βυζάντιον",
		region: "Propontis",
		lat: 41.008,
		lon: 28.978,
		kind: "landmark",
		nameAt: 1.4,
		dx: 8,
		dy: 4,
		anchor: "start"
	},
	{
		id: "olympia",
		name: "Olympia",
		greek: "Ὀλυμπία",
		region: "Peloponnesus",
		lat: 37.638,
		lon: 21.63,
		kind: "landmark",
		nameAt: 1.7,
		dx: 0,
		dy: 14,
		anchor: "middle"
	}
];
var plateLabels = [
	{
		id: "aegean",
		text: "Aegean Sea",
		lat: 37.55,
		lon: 25.15,
		kind: "sea"
	},
	{
		id: "ionian-sea",
		text: "Ionian Sea",
		lat: 37.7,
		lon: 18.7,
		kind: "sea"
	},
	{
		id: "crete-sea",
		text: "Sea of Crete",
		lat: 35.55,
		lon: 24.6,
		kind: "sea"
	},
	{
		id: "libyan",
		text: "Libyan Sea",
		lat: 35.15,
		lon: 18.4,
		kind: "sea"
	},
	{
		id: "propontis",
		text: "Propontis",
		lat: 40.8,
		lon: 28.2,
		kind: "sea"
	},
	{
		id: "pontus",
		text: "Pontus Euxinus",
		lat: 42.55,
		lon: 29.3,
		kind: "sea"
	},
	{
		id: "sicily",
		text: "Sicily",
		lat: 37.55,
		lon: 14.15,
		kind: "region"
	},
	{
		id: "magna",
		text: "Magna Graecia",
		lat: 40.55,
		lon: 16.15,
		kind: "region"
	},
	{
		id: "pelop",
		text: "Peloponnesus",
		lat: 37.4,
		lon: 22.15,
		kind: "region"
	},
	{
		id: "thrace",
		text: "Thrace",
		lat: 41.25,
		lon: 25.15,
		kind: "region"
	},
	{
		id: "ionia",
		text: "Ionia",
		lat: 38.15,
		lon: 28.35,
		kind: "region"
	},
	{
		id: "crete",
		text: "Crete",
		lat: 35.22,
		lon: 24.85,
		kind: "island"
	},
	{
		id: "rhodes",
		text: "Rhodes",
		lat: 36.17,
		lon: 27.95,
		kind: "island"
	},
	{
		id: "lesbos",
		text: "Lesbos",
		lat: 39.17,
		lon: 26.28,
		kind: "island"
	},
	{
		id: "euboea",
		text: "Euboea",
		lat: 38.52,
		lon: 24,
		kind: "island"
	}
];
var placesById = Object.fromEntries(places.map((p) => [p.id, p]));
var REGION_ORDER = [
	"Sicily",
	"Magna Graecia",
	"Attica",
	"Peloponnesus",
	"Hellas",
	"Boeotia",
	"Phocis",
	"Cyclades",
	"Aegean",
	"Ionia",
	"Caria",
	"Hellespont",
	"Thrace",
	"Propontis",
	"Pontus"
];
var schools = [
	{
		id: "ionian",
		mark: "Io",
		name: "Ionian",
		line: "Inquiry into nature, and the critique of what the poets had said the gods were."
	},
	{
		id: "eleatic",
		mark: "El",
		name: "Eleatic",
		line: "What-is does not come to be. Motion and plurality have to answer for themselves."
	},
	{
		id: "pluralist",
		mark: "Pl",
		name: "Pluralist",
		line: "The cosmos is more than one stuff, arranged by mind or by Love and Strife."
	},
	{
		id: "atomist",
		mark: "At",
		name: "Atomist",
		line: "Indivisible bodies, and a void for them to move in."
	},
	{
		id: "pythagorean",
		mark: "Py",
		name: "Pythagorean",
		line: "A way of life first. Number and harmonia come to us mostly through later members."
	},
	{
		id: "sophist",
		mark: "So",
		name: "Sophistic",
		line: "Logos as a craft: argument, the correctness of names, teaching for a fee."
	},
	{
		id: "medical",
		mark: "Md",
		name: "Medical",
		line: "The body observed. Regimen, prognosis, and a cause that is not a story about a god."
	},
	{
		id: "historia",
		mark: "Hi",
		name: "Historia",
		line: "Inquiry into what was done, and into custom — nomos — as a cause in its own right."
	},
	{
		id: "athenian",
		mark: "Ath",
		name: "Athenian circle",
		line: "Several of these streams are in one city. The next generation will be taught here."
	}
];
var schoolById = Object.fromEntries(schools.map((s) => [s.id, s]));
var generations = [
	{
		id: "prior",
		label: "Earlier",
		hint: "A preceding generation. Dead, or at the edge of living memory, by 450. Plotted because the arguments of 450 are replies."
	},
	{
		id: "prime",
		label: "c. 450",
		hint: "Active in the decades around the middle of the century."
	},
	{
		id: "rising",
		label: "Rising",
		hint: "Young in 450. The books we read under these names come later."
	}
];
var generationById = Object.fromEntries(generations.map((g) => [g.id, g]));
var MIN_K = 1;
var MAX_K = 6;
function clampCamera(v) {
	const k = Math.min(MAX_K, Math.max(MIN_K, v.k));
	if (k <= 1.001) return {
		k: 1,
		tx: 0,
		ty: 0
	};
	return {
		k,
		tx: Math.min(0, Math.max(PLATE.width * (1 - k), v.tx)),
		ty: Math.min(0, Math.max(PLATE.height * (1 - k), v.ty))
	};
}
function AtlasMap({ thinkers, selectedId, dimmed, onSelect }) {
	const svgRef = (0, import_react.useRef)(null);
	const [camera, setCamera] = (0, import_react.useState)({
		k: 1,
		tx: 0,
		ty: 0
	});
	const [unit, setUnit] = (0, import_react.useState)(1.4);
	const [hoverId, setHoverId] = (0, import_react.useState)(null);
	const pointers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const drag = (0, import_react.useRef)({
		moved: false,
		last: null,
		pinch: null
	});
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		const el = svgRef.current;
		if (!el) return;
		const onWheel = (event) => {
			event.preventDefault();
			const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
			zoomAt(event.clientX, event.clientY, factor);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!selectedId) return;
		const thinker = thinkers.find((t) => t.id === selectedId);
		if (!thinker) return;
		const point = points[thinker.originId];
		if (!point) return;
		setCamera((v) => {
			const sx = v.tx + v.k * point[0];
			const sy = v.ty + v.k * point[1];
			const margin = 70;
			if (sx > margin && sx < PLATE.width - margin && sy > margin && sy < PLATE.height - margin) return v;
			const k = Math.max(v.k, 1.7);
			return clampCamera({
				k,
				tx: PLATE.width / 2 - k * point[0],
				ty: PLATE.height / 2 - k * point[1]
			});
		});
	}, [selectedId, thinkers]);
	function clientToViewBox(clientX, clientY) {
		const svg = svgRef.current;
		if (!svg) return {
			x: 0,
			y: 0
		};
		const point = svg.createSVGPoint();
		point.x = clientX;
		point.y = clientY;
		const matrix = svg.getScreenCTM();
		if (!matrix) return {
			x: 0,
			y: 0
		};
		const mapped = point.matrixTransform(matrix.inverse());
		return {
			x: mapped.x,
			y: mapped.y
		};
	}
	function zoomAt(clientX, clientY, factor) {
		const pointer = clientToViewBox(clientX, clientY);
		setCamera((v) => {
			const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
			const worldX = (pointer.x - v.tx) / v.k;
			const worldY = (pointer.y - v.ty) / v.k;
			return clampCamera({
				k,
				tx: pointer.x - worldX * k,
				ty: pointer.y - worldY * k
			});
		});
	}
	function zoomFromCenter(factor) {
		const svg = svgRef.current;
		if (!svg) return;
		const rect = svg.getBoundingClientRect();
		zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
	}
	const laid = (0, import_react.useMemo)(() => {
		const groups = /* @__PURE__ */ new Map();
		for (const thinker of thinkers) {
			const list = groups.get(thinker.originId) ?? [];
			list.push(thinker);
			groups.set(thinker.originId, list);
		}
		return [...groups.entries()].map(([cityId, list]) => ({
			cityId,
			list: [...list].sort((a, b) => a.name.localeCompare(b.name))
		}));
	}, [thinkers]);
	const selected = thinkers.find((t) => t.id === selectedId);
	const hover = thinkers.find((t) => t.id === hoverId);
	function screenOf(x, y) {
		return {
			x: camera.tx + camera.k * x,
			y: camera.ty + camera.k * y
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-0 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				ref: svgRef,
				viewBox: `0 0 ${PLATE.width} ${PLATE.height}`,
				className: "plate-surface h-full w-full bg-folio font-sans",
				role: "img",
				"aria-label": "Map of the Greek world around 450 BCE",
				onPointerDown: (event) => {
					if (event.target.closest("[data-marker]")) return;
					event.currentTarget.setPointerCapture(event.pointerId);
					pointers.current.set(event.pointerId, {
						x: event.clientX,
						y: event.clientY
					});
					drag.current.moved = false;
					drag.current.last = {
						x: event.clientX,
						y: event.clientY
					};
				},
				onPointerMove: (event) => {
					const store = pointers.current;
					if (!store.has(event.pointerId)) return;
					store.set(event.pointerId, {
						x: event.clientX,
						y: event.clientY
					});
					if (store.size === 2) {
						const [a, b] = [...store.values()];
						const dist = Math.hypot(a.x - b.x, a.y - b.y);
						if (drag.current.pinch != null && drag.current.pinch > 0) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, dist / drag.current.pinch);
						drag.current.pinch = dist;
						drag.current.moved = true;
						return;
					}
					const last = drag.current.last;
					if (!last) return;
					const from = clientToViewBox(last.x, last.y);
					const to = clientToViewBox(event.clientX, event.clientY);
					if (Math.hypot(event.clientX - last.x, event.clientY - last.y) > 3) drag.current.moved = true;
					setCamera((v) => clampCamera({
						...v,
						tx: v.tx + (to.x - from.x),
						ty: v.ty + (to.y - from.y)
					}));
					drag.current.last = {
						x: event.clientX,
						y: event.clientY
					};
				},
				onPointerUp: (event) => {
					pointers.current.delete(event.pointerId);
					if (pointers.current.size < 2) drag.current.pinch = null;
					drag.current.last = null;
				},
				onDoubleClick: () => setCamera({
					k: 1,
					tx: 0,
					ty: 0
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: `translate(${camera.tx} ${camera.ty}) scale(${camera.k})`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: frame.x,
								y: frame.y,
								width: frame.w,
								height: frame.h,
								className: "fill-wash"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: landPath,
								className: "fill-land stroke-ink plate-stroke"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: graticulePath,
								className: "plate-graticule plate-stroke"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: frame.x,
								y: frame.y,
								width: frame.w,
								height: frame.h,
								className: "plate-neatline plate-stroke"
							}),
							selected?.seats.map((seatId) => {
								const from = points[selected.originId];
								const to = points[seatId];
								if (!from || !to) return null;
								const midX = (from[0] + to[0]) / 2;
								const midY = (from[1] + to[1]) / 2 - 28;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: `M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`,
									className: "plate-arc plate-stroke"
								}, seatId);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "fill-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: scaleBar.x1,
										x2: scaleBar.x2,
										y1: scaleBar.y,
										y2: scaleBar.y,
										className: "stroke-ink plate-stroke"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: scaleBar.x1,
										x2: scaleBar.x1,
										y1: scaleBar.y - 4,
										y2: scaleBar.y + 4,
										className: "stroke-ink plate-stroke"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: scaleBar.x2,
										x2: scaleBar.x2,
										y1: scaleBar.y - 4,
										y2: scaleBar.y + 4,
										className: "stroke-ink plate-stroke"
									})
								]
							})
						]
					}),
					ticks.map((tick) => {
						const at = screenOf(tick.x, tick.y);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: at.x,
							y: at.y,
							textAnchor: tick.anchor === "end" ? "end" : "middle",
							className: "fill-muted",
							style: { fontSize: 11 * unit },
							children: tick.text
						}, tick.text + tick.x);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: screenOf(scaleBar.x1, scaleBar.y).x,
						y: screenOf(scaleBar.x1, scaleBar.y).y + 14 * unit,
						className: "fill-ink",
						style: { fontSize: 11 * unit },
						children: [scaleBar.km, " km"]
					}),
					plateLabels.map((label) => {
						const point = points[label.id];
						if (!point) return null;
						if (camera.k < 1.15 && label.kind === "island") return null;
						const at = screenOf(point[0], point[1]);
						const sea = label.kind === "sea";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: at.x,
							y: at.y,
							textAnchor: "middle",
							className: sea ? "fill-sea font-display italic" : "fill-muted font-display",
							style: {
								fontSize: (sea ? 18 : 14) * unit,
								letterSpacing: sea ? "0.08em" : "0.04em"
							},
							children: label.text
						}, label.id);
					}),
					places.map((place) => {
						const point = points[place.id];
						if (!point) return null;
						const at = screenOf(point[0], point[1]);
						const showName = selected?.originId === place.id || selected?.seats.includes(place.id) || hover?.originId === place.id || camera.k >= place.nameAt || place.kind === "origin" && camera.k >= 2.1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: at.x,
							cy: at.y,
							r: 2.2 * unit,
							className: place.uncertain ? "fill-none stroke-cinnabar" : "fill-ink",
							style: place.uncertain ? { strokeWidth: 1.25 * unit } : void 0
						}), showName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: at.x + place.dx * unit,
							y: at.y + place.dy * unit,
							textAnchor: place.anchor,
							className: place.kind === "landmark" || place.kind === "seat" ? "fill-muted" : "fill-ink font-medium",
							style: { fontSize: (place.kind === "origin" ? 13 : 11) * unit },
							children: [place.name, place.uncertain ? "*" : ""]
						}) : null] }, place.id);
					}),
					laid.map(({ cityId, list }) => {
						const center = points[cityId];
						if (!center) return null;
						const origin = screenOf(center[0], center[1]);
						const radius = list.length === 1 ? 0 : (16 + list.length * 4) * unit;
						return list.map((thinker, index) => {
							const angle = -Math.PI / 2 + index * 2 * Math.PI / list.length;
							const x = origin.x + Math.cos(angle) * radius;
							const y = origin.y + Math.sin(angle) * radius;
							const school = schoolById[thinker.schools[0]];
							const isSelected = thinker.id === selectedId;
							const isDim = dimmed.has(thinker.id) && !isSelected;
							const wide = school.mark.length > 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								"data-marker": true,
								className: isDim ? "opacity-30" : void 0,
								transform: `translate(${x} ${y})`,
								onPointerEnter: () => setHoverId(thinker.id),
								onPointerLeave: () => setHoverId((current) => current === thinker.id ? null : current),
								onClick: (event) => {
									event.stopPropagation();
									onSelect(thinker.id);
								},
								onDoubleClick: (event) => event.stopPropagation(),
								children: [
									list.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: origin.x - x,
										y1: origin.y - y,
										x2: 0,
										y2: 0,
										className: "stroke-line plate-stroke"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: (wide ? 15 : 13) * unit,
										className: isSelected ? "cursor-pointer fill-cinnabar stroke-ink" : "cursor-pointer fill-folio stroke-ink",
										style: { strokeWidth: 1.25 * unit },
										role: "button",
										tabIndex: 0,
										"aria-label": `${thinker.name}, ${placesById[thinker.originId]?.name ?? ""}`,
										"aria-pressed": isSelected,
										onKeyDown: (event) => {
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												onSelect(thinker.id);
											}
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										textAnchor: "middle",
										dominantBaseline: "central",
										className: `pointer-events-none font-semibold ${isSelected ? "fill-folio" : "fill-ink"}`,
										style: { fontSize: (wide ? 9 : 11) * unit },
										children: school.mark
									})
								]
							}, thinker.id);
						});
					}),
					hover && points[hover.originId] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCard, {
						thinker: hover,
						x: screenOf(points[hover.originId][0], points[hover.originId][1]).x,
						y: screenOf(points[hover.originId][0], points[hover.originId][1]).y,
						unit
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-3 left-3 hidden max-w-56 border border-line bg-folio/95 px-3 py-2 shadow-sm lg:block lg:top-4 lg:left-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl leading-none text-ink",
						children: "The Greek world"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs tracking-wide text-muted uppercase",
						children: "c. 450 BCE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-snug text-pretty text-muted",
						children: "Pins are cities of origin. A line, on selection, runs to a seat the sources actually attest."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-3 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapButton, {
						label: "Zoom in",
						onClick: () => zoomFromCenter(1.25),
						children: "+"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapButton, {
						label: "Zoom out",
						onClick: () => zoomFromCenter(1 / 1.25),
						children: "−"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapButton, {
						label: "Fit the whole plate",
						onClick: () => setCamera({
							k: 1,
							tx: 0,
							ty: 0
						}),
						children: "Fit"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-3 left-3 hidden text-xs text-muted sm:block",
				children: "North at the top · coast is the modern shore · * site disputed"
			})
		]
	});
}
function HoverCard({ thinker, x, y, unit }) {
	const place = placesById[thinker.originId];
	const width = 168 * unit;
	const height = 46 * unit;
	const left = x + 16 * unit + width > PLATE.width - 20 ? x - width - 16 * unit : x + 16 * unit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: "pointer-events-none",
		transform: `translate(${left} ${y - height / 2})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width,
				height,
				className: "fill-folio stroke-line"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 8 * unit,
				y: 18 * unit,
				className: "fill-ink font-semibold",
				style: { fontSize: 12 * unit },
				children: thinker.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: 8 * unit,
				y: 34 * unit,
				className: "fill-muted",
				style: { fontSize: 11 * unit },
				children: [place?.name, thinker.seats.length ? ` · also ${thinker.seats.map((id) => placesById[id]?.name).join(", ")}` : ""]
			})
		]
	});
}
function MapButton({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: "grid h-11 w-11 place-items-center border border-line bg-folio text-sm font-semibold text-ink shadow-sm hover:border-sea hover:text-sea",
		children
	});
}
var P = "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:";
var SEP = "https://plato.stanford.edu/entries/";
var IEP = "https://iep.utm.edu/";
var MIT = "http://classics.mit.edu/";
var thinkers = [
	{
		id: "thales",
		name: "Thales",
		greek: "Θαλῆς",
		generation: "prior",
		originId: "miletus",
		seats: [],
		schools: ["ionian"],
		dates: "fl. c. 585 BCE",
		stance: "Of Miletus. Aristotle starts the succession of archai with him. By 450 he has been dead for a century. The arguments have not.",
		caution: "No book is securely his, and the tradition that he wrote none may be right. Aristotle is reporting a view, not quoting a text. The eclipse, the olive presses, and the well are stories about a sage.",
		doctrines: [{
			title: "Water",
			text: "Water is the archē: the starting-point of the things that are, and what they resolve back into. That is Aristotle’s sentence, in Metaphysics A. He also reports that the earth rests on water. Neither claim comes to us in Thales’ own words.",
			cite: "Aristotle, Metaphysics A.3, 983b6–27"
		}, {
			title: "Soul in the magnet",
			text: "Soul, he is said to have held, is mixed through the universe. The evidence he gave was the magnet, which moves iron, and amber. The same reports have him say that all things are full of gods. Treat both as Aristotle’s summary of a reputation.",
			cite: "Aristotle, De anima 1.2, 405a19"
		}],
		sources: [
			{
				label: "Aristotle, Metaphysics A",
				note: "Where the water thesis enters the philosophical tradition. Aristotle is building his own history of causes.",
				href: `${P}1999.01.0052`
			},
			{
				label: "Herodotus 1.74",
				note: "The eclipse that ended a battle between Lydians and Medes. A witness for the prediction, not for a cosmology.",
				href: `${P}1999.01.0126:book=1:chapter=74`
			},
			{
				label: "Stanford Encyclopedia — Presocratics",
				note: "The Milesians, treated together, which is how the evidence actually comes.",
				href: `${SEP}presocratics/`
			}
		]
	},
	{
		id: "anaximander",
		name: "Anaximander",
		greek: "Ἀναξίμανδρος",
		generation: "prior",
		originId: "miletus",
		seats: [],
		schools: ["ionian"],
		dates: "c. 610–c. 546 BCE",
		stance: "Of Miletus, in the generation after Thales. His one fragment is the earliest piece of Greek philosophical prose we still have. He is also credited with the first Greek map of the inhabited world.",
		caution: "How much of the ‘justice’ sentence is his wording, and how much is Theophrastus’ paraphrase as Simplicius copied it, is still argued. Do not print the whole of Simplicius’ paragraph as a fragment.",
		doctrines: [
			{
				title: "The boundless",
				text: "The archē is the apeiron: not one of the familiar elements, ageless and deathless, and what steers all things. It surrounds the world. Naming it is the move that gets Ionian inquiry out of ‘which familiar stuff is first.’",
				cite: "DK 12 A9, B1"
			},
			{
				title: "Justice and time",
				text: "The things that are perish back into the things they came from, paying penalty and recompense to one another for their injustice, according to the assessment of time. That is the fragment. It is about a cosmic order, not about a city.",
				quote: "according to the assessment of time",
				cite: "DK 12 B1"
			},
			{
				title: "An earth that hangs free",
				text: "The earth stays at rest because it is equally related to the extremes — there is no reason it should drift one way rather than another. Aristotle reports the shape as a column-drum. This is the first Greek argument for a free-floating earth.",
				cite: "Aristotle, On the Heavens 2.13, 295b10"
			}
		],
		sources: [{
			label: "Stanford Encyclopedia — Presocratics",
			note: "The fragment, the apeiron, and the problem of how much Simplicius is quoting.",
			href: `${SEP}presocratics/`
		}, {
			label: "Diogenes Laertius 2.1",
			note: "The short life: the gnomon, and an outline of earth and sea. Late, and brief.",
			href: `${P}1999.01.0258`
		}]
	},
	{
		id: "anaximenes",
		name: "Anaximenes",
		greek: "Ἀναξιμένης",
		generation: "prior",
		originId: "miletus",
		seats: [],
		schools: ["ionian"],
		dates: "fl. c. 546–525 BCE",
		stance: "Of Miletus, the third of the succession Aristotle tells. Dead long before 450. Diogenes of Apollonia, on this same plate, will put air back to work and give it a mind.",
		caution: "The sentence ‘as our soul, being air, holds us together, so breath and air surround the whole cosmos’ is a late report. Do not treat the wording as a recovered book.",
		doctrines: [{
			title: "Air, thinned and thickened",
			text: "Air is the archē. Rarefied, it becomes fire. Condensed, it becomes wind, then cloud, water, earth, and stone. The mechanism matters as much as the element: a process you can watch in breath and in felt, instead of a boundless that is not an ordinary body.",
			cite: "DK 13 A5"
		}, {
			title: "The earth rides on air",
			text: "The earth is flat and rides on air, and the heavenly bodies too. Aristotle files him after Anaximander in the list of people who named a material archē. That filing is why he is on this plate: the Milesian sequence is the argument the fifth century inherits.",
			cite: "Aristotle, Metaphysics A.3, 984a5"
		}],
		sources: [
			{
				label: "Aristotle, Metaphysics A",
				note: "Air, placed in the succession after the boundless.",
				href: `${P}1999.01.0052`
			},
			{
				label: "Stanford Encyclopedia — Presocratics",
				note: "Rarefaction and condensation, and what Theophrastus actually says.",
				href: `${SEP}presocratics/`
			},
			{
				label: "Diogenes Laertius 2.3",
				note: "The life is a few lines. Read it as a notice, not a biography.",
				href: `${P}1999.01.0258`
			}
		]
	},
	{
		id: "xenophanes",
		name: "Xenophanes",
		greek: "Ξενοφάνης",
		generation: "prior",
		originId: "colophon",
		seats: [],
		schools: ["ionian"],
		dates: "c. 570–c. 478 BCE",
		stance: "A poet from Colophon who spent a long life on the road, attacking the gods of Homer and the honors paid to athletes.",
		caution: "He is not an Eleatic. Later writers, Aristotle among them, treat him as a forerunner of Parmenides. That is a schoolmaster’s genealogy, not a membership.",
		doctrines: [{
			title: "Gods made in our image",
			text: "Ethiopians, he says, make their gods dark and snub-nosed; Thracians make them pale and red-haired. Horses, if they could draw, would draw horse-gods. The attack is on anthropomorphic cult, not on the existence of the divine.",
			cite: "DK 21 B15–B16"
		}, {
			title: "One god, and a limit on knowledge",
			text: "One god, greatest among gods and men, unlike mortals in body and in thought, who shakes all things by the thought of his mind. Beside that, a hard epistemic line: no man has seen what is clear, and even if he happened to say the complete truth he would not know it. What Xenophanes offers of earth and water and of the sun is put forward as opinion of that kind.",
			cite: "DK 21 B23–B26, B34"
		}],
		sources: [{
			label: "Stanford Encyclopedia — Xenophanes",
			note: "The best short scholarly account, with the fragments in translation and the Eleatic question handled carefully.",
			href: `${SEP}xenophanes/`
		}, {
			label: "Diogenes Laertius, Lives 9",
			note: "A late biography. Useful for what antiquity repeated; not a witness.",
			href: `${P}1999.01.0258`
		}]
	},
	{
		id: "pythagoras",
		name: "Pythagoras",
		greek: "Πυθαγόρας",
		generation: "prior",
		originId: "samos",
		seats: ["croton"],
		schools: ["pythagorean"],
		dates: "c. 570–c. 490 BCE",
		stance: "Born on Samos, founder of a community at Croton. By 450 the man is gone and the houses of the school have been broken up. The way of life has not.",
		caution: "He wrote nothing that we can read. ‘All things are number’ is Aristotle’s description of later Pythagoreans, not a sentence from Pythagoras. The theorem that carries his name is not a signed result.",
		doctrines: [{
			title: "A life, not a treatise",
			text: "What is early and reasonably secure is a community with rules, silence toward outsiders, and a political role in the cities of southern Italy that ended in violence. The dietary lore and the taboos multiply in later centuries. Treat them as school tradition unless a near-contemporary is speaking."
		}, {
			title: "The soul returns",
			text: "Transmigration is the doctrine most securely tied to his name, because Xenophanes — a near-contemporary — already mocks it: Pythagoras recognizing a friend’s voice in a dog being beaten. That joke is worth more than the later golden biographies.",
			cite: "Xenophanes DK 21 B7"
		}],
		sources: [{
			label: "Stanford Encyclopedia — Pythagoras",
			note: "Separates the man, the early community, and the legend.",
			href: `${SEP}pythagoras/`
		}, {
			label: "Stanford Encyclopedia — Pythagoreanism",
			note: "The tradition after him, which is what 450 actually inherits. Alcmaeon, Parmenides, and Empedocles are not thereby made Pythagoreans.",
			href: `${SEP}pythagoreanism/`
		}]
	},
	{
		id: "heraclitus",
		name: "Heraclitus",
		greek: "Ἡράκλειτος",
		generation: "prior",
		originId: "ephesus",
		seats: [],
		schools: ["ionian"],
		dates: "active c. 500 BCE",
		stance: "Of Ephesus. Not a voice of 450, but the voice 450 is still answering: a kosmos that is process, held in measure, and a logos most people live beside without hearing.",
		caution: "‘Everything flows’ is not a fragment. It is a later summary. The river sentence we actually have is stricter than the slogan.",
		doctrines: [
			{
				title: "The river, correctly quoted",
				text: "On those who step into the same rivers, different and different waters flow. The rivers stay; the waters do not. Stability and change are not an either-or.",
				quote: "On those who step into the same rivers, different and again different waters flow.",
				cite: "DK 22 B12"
			},
			{
				title: "Fire in measures",
				text: "The world-order was not made by a god or a man. It always was and is and will be an ever-living fire, kindling in measures and going out in measures. Fire here is not a stuff chosen from a list of elements so much as the name of a regulated process. The unity of opposites — road up and road down, one and the same — belongs with this, not with a doctrine of chaos.",
				cite: "DK 22 B30, B60"
			},
			{
				title: "Listen to the logos",
				text: "He tells his readers not to listen to him but to the logos, and that it is wise to agree that all things are one. People are at odds with the logos that governs the things they deal with every day.",
				quote: "Listening not to me but to the logos, it is wise to agree that all things are one.",
				cite: "DK 22 B50"
			}
		],
		sources: [{
			label: "Stanford Encyclopedia — Heraclitus",
			note: "Fragments, the flux slogan, and the later reception, kept apart.",
			href: `${SEP}heraclitus/`
		}, {
			label: "Internet Encyclopedia of Philosophy — Heraclitus",
			note: "A second scholarly overview, useful beside the Stanford entry.",
			href: `${IEP}heraclit/`
		}]
	},
	{
		id: "alcmaeon",
		name: "Alcmaeon",
		greek: "Ἀλκμαίων",
		generation: "prior",
		originId: "croton",
		seats: [],
		schools: ["medical"],
		dates: "early 5th century BCE",
		stance: "Of Croton, son of Peirithous. A book on nature that begins by naming three hearers — a rare first person on this plate. Physician or physiologos: the sources do not agree, and both labels are modern.",
		caution: "Aristotle distinguishes him from the Pythagoreans. The catalogue that files him with them is not decisive. Croton’s medical fame is real — Herodotus says its physicians were the best in the Greek world — and Alcmaeon belongs in that city, not automatically in that sect.",
		doctrines: [{
			title: "Health is equality",
			text: "Health is an isonomia, an equal balance, of powers: wet and dry, cold and hot, and the rest. Disease is monarchia, one of them ruling alone. The political metaphor is the argument. Cause is a relation among bodily powers, not a god’s anger and not a single arche.",
			cite: "DK 24 B4"
		}, {
			title: "The brain",
			text: "Sensation and thought are seated in the brain. This is the earliest clear Greek statement of that claim, if the reports are his. Channels run from the eyes and ears to it. He also argues that the soul’s immortality is inferred from its being like the heavenly bodies in eternal motion — a step beyond the medical book, and more exposed to doxographical smoothing.",
			cite: "DK 24 A5, A8, A12"
		}],
		sources: [{
			label: "Stanford Encyclopedia — Alcmaeon",
			note: "The controversy over whether he was a doctor at all is the right place to start.",
			href: `${SEP}alcmaeon/`
		}, {
			label: "Herodotus 3.131",
			note: "Croton’s physicians, and Democedes. The civic background, not Alcmaeon’s own words.",
			href: `${P}1999.01.0126:book=3:chapter=131`
		}]
	},
	{
		id: "parmenides",
		name: "Parmenides",
		greek: "Παρμενίδης",
		generation: "prior",
		originId: "elea",
		seats: [],
		schools: ["eleatic"],
		dates: "early 5th century BCE",
		stance: "Of Elea. A poem in hexameters, spoken by a goddess to a young man on a chariot. The book of the generation before this plate, and the book the plate cannot get out from under.",
		caution: "Plato’s Parmenides stages him in Athens, about sixty-five, talking to a very young Socrates. The dialogue is not a report of a visit. Do not date his life from it.",
		doctrines: [
			{
				title: "Two paths",
				text: "The goddess marks two roads of inquiry. One, that it is and that it cannot not be, is the path of persuasion. The other, that it is not, cannot be known or pointed out: you cannot know what is not, nor declare it. A third way, the way mortals wander — it is and it is not — she treats as a trap.",
				cite: "DK 28 B2, B6"
			},
			{
				title: "What-is",
				text: "What-is is ungenerated and imperishable, whole, unmoving, and complete. It did not come from what-is-not, and it will not perish into it. Coming-to-be is the thing the argument is built to refuse. The sign ‘like the bulk of a well-rounded sphere’ is in the poem; Melissus will deny the limit.",
				cite: "DK 28 B8"
			},
			{
				title: "The deceptive order",
				text: "The poem does not stop at the signs of what-is. A second part sets out a cosmology of Light and Night which the goddess calls deceptive, and then develops in detail. He is not a thinker who refused to speak about the world. He is a thinker who marked that speech as mortal.",
				cite: "DK 28 B8.50 ff., B9–B19"
			}
		],
		sources: [
			{
				label: "Stanford Encyclopedia — Parmenides",
				note: "Text, argument, and the status of the second half of the poem.",
				href: `${SEP}parmenides/`
			},
			{
				label: "Internet Encyclopedia of Philosophy — Parmenides",
				note: "A second pass over the same fragments.",
				href: `${IEP}parmenid/`
			},
			{
				label: "Plato, Parmenides",
				note: "A philosophical drama, not minutes of a meeting. Greek and English on Perseus.",
				href: `${P}1999.01.0174`
			}
		]
	},
	{
		id: "zeno",
		name: "Zeno",
		greek: "Ζήνων",
		generation: "prime",
		originId: "elea",
		seats: [],
		schools: ["eleatic"],
		dates: "mid-5th century BCE",
		stance: "Of Elea, the associate of Parmenides. His book, now lost, put paradoxes in the way of anyone who wanted to keep plurality and motion after the poem.",
		caution: "We do not have the book. The arguments come through Aristotle’s Physics, and through Simplicius quoting him in order to explain Aristotle. What Zeno himself thought the arguments proved is partly Aristotle’s framing.",
		doctrines: [{
			title: "Against plurality",
			text: "If there are many things, they are both so small as to have no size and so large as to be unlimited. The argument is a trap for the claim that the world is made of parts. It is the sister of the motion paradoxes, not a separate hobby.",
			cite: "DK 29 B1–B2, via Simplicius"
		}, {
			title: "The motion paradoxes",
			text: "Achilles will not catch the tortoise. The arrow, occupying a place equal to itself at each now, is at rest. You cannot finish crossing the stadium, because you must first reach the halfway point, and the halfway of that. Aristotle takes these as puzzles about the continuous, and answers them as such. Read his answers as answers, not as Zeno’s own last page.",
			cite: "Aristotle, Physics 6"
		}],
		sources: [{
			label: "Stanford Encyclopedia — Zeno of Elea",
			note: "The paradoxes, and what is quotation rather than report.",
			href: `${SEP}zeno-elea/`
		}, {
			label: "Aristotle, Physics",
			note: "Public-domain English. Book 6 is the motion paradoxes. This is a report and a reply, not Zeno’s text.",
			href: `${MIT}Aristotle/physics.html`
		}]
	},
	{
		id: "melissus",
		name: "Melissus",
		greek: "Μέλισσος",
		generation: "prime",
		originId: "samos",
		seats: [],
		schools: ["eleatic"],
		dates: "active c. 440 BCE",
		stance: "Of Samos. The one person on this plate with a date you can almost touch: the tradition has him command the Samian fleet against Pericles in 441/0.",
		caution: "That he commanded the fleet is Plutarch’s report (Pericles 26), in a campaign Thucydides describes without naming the philosopher. Hold the identification as probable, not as an inscription.",
		doctrines: [{
			title: "Unlimited, where Parmenides said complete",
			text: "What-is did not come to be and will not perish, so it has no temporal beginning or end. From that everlastingness Melissus argues that it is also unlimited in magnitude. Parmenides’ ‘well-rounded sphere’ is refused. The Eleatic school is already a disagreement, not a catechism.",
			cite: "DK 30 B1–B4"
		}, {
			title: "No void, no motion, no pain",
			text: "There is no void, so there is no motion: a body would need somewhere to move into. What-is feels no pain and no grief; those would be additions, and what-is does not acquire. He also says, more bluntly than the poem, that the many things we see and hear are not real.",
			cite: "DK 30 B7, B8"
		}],
		sources: [
			{
				label: "Internet Encyclopedia of Philosophy — Presocratics",
				note: "The Melissus section states the differences from Parmenides without inventing a lost biography.",
				href: `${IEP}presocra/`
			},
			{
				label: "Thucydides 1.115–117",
				note: "The Samian revolt. The campaign, not the philosophy. English on Perseus.",
				href: `${P}1999.01.0200:book=1:chapter=115`
			},
			{
				label: "Stanford Encyclopedia — Parmenides",
				note: "Melissus is discussed here as the prose restatement, and the revision, of the poem.",
				href: `${SEP}parmenides/`
			}
		]
	},
	{
		id: "empedocles",
		name: "Empedocles",
		greek: "Ἐμπεδοκλῆς",
		generation: "prime",
		originId: "acragas",
		seats: [],
		schools: ["pluralist"],
		dates: "c. 492–c. 432 BCE",
		stance: "Of Acragas. Two poems come down in fragments: On Nature, and the Purifications. A democrat in a rich Sicilian city, a writer of oracles about the elements, and a voice that claims more than a physicist’s brief.",
		caution: "The story that he leapt into Etna is a late legend. Nothing contemporary supports it. Gorgias is sometimes called his student; that too is doxography.",
		doctrines: [
			{
				title: "Four roots",
				text: "Fire, air, water, and earth — he calls them roots, and he names them as gods: Zeus, Hera, Aidoneus, Nestis. Which name is which element was already disputed in antiquity. The roots do not come to be and do not perish. What comes to be is their mixture.",
				cite: "DK 31 B6, B17"
			},
			{
				title: "Love and Strife",
				text: "Two forces, Philotēs and Neikos, mix the roots and pull them apart. The cosmos runs a cycle between a condition in which Love has made them one and a condition in which Strife has sorted them out. Mortal things, including ourselves, are temporary mixtures, borrowed from the roots and given back.",
				cite: "DK 31 B17, B26, B35"
			},
			{
				title: "The fallen daimōn",
				text: "The Purifications speak of a daimōn exiled from the company of the blessed for shedding blood, clothed in alien garments of flesh, passing from plant to animal to human. How this fits the physics of the roots is not settled by the fragments we have. Do not force a harmony the poems may not have wanted.",
				cite: "DK 31 B115, B117"
			}
		],
		sources: [{
			label: "Stanford Encyclopedia — Empedocles",
			note: "Fragments, the two poems, and the cycle.",
			href: `${SEP}empedocles/`
		}, {
			label: "Internet Encyclopedia of Philosophy — Empedocles",
			note: "A clear second account of roots, Love, and Strife.",
			href: `${IEP}empedocl/`
		}]
	},
	{
		id: "anaxagoras",
		name: "Anaxagoras",
		greek: "Ἀναξαγόρας",
		generation: "prime",
		originId: "clazomenae",
		seats: ["athens", "lampsacus"],
		schools: ["pluralist", "athenian"],
		dates: "c. 500–428 BCE",
		stance: "Of Clazomenae. He came to Athens, was close to Pericles, and left under a charge of impiety. He died at Lampsacus. In 450 this is the natural philosopher of the imperial city.",
		caution: "The reports of the trial do not agree on the procedure, the date, or the penalty. What is firm is that he left, and that the charge had to do with the sun and the moon.",
		doctrines: [
			{
				title: "All things were together",
				text: "In the beginning everything was together, unlimited in amount and in smallness. In everything there is a portion of everything. What we call a thing by one name — gold, flesh, hair — is that in which those portions predominate. Coming-to-be is separation, not the birth of the new from nothing.",
				quote: "All things were together.",
				cite: "DK 59 B1"
			},
			{
				title: "Nous",
				text: "Mind is unlimited, self-ruled, and mixed with nothing. If it were mixed it would be hindered. It knows all things, and it set the mixture into rotation. It is not a creator out of nothing, and it is not, in the fragments, a moral providence. Socrates, in Plato’s Phaedo, says he hoped Nous would explain why the world is arranged for the best, and was disappointed to find only mechanical causes. That disappointment is Plato’s scene. It is also a fair reading of how little the fragments moralize.",
				cite: "DK 59 B12"
			},
			{
				title: "The sun is a stone",
				text: "The sun is a red-hot stone and the moon an earth. That is the sentence Athens could prosecute. Plato’s Apology has Meletus confuse Socrates with the man who says these things. The confusion is the joke, and the historical point: in Athens the doctrines had a public name, and the name was Anaxagoras.",
				cite: "Plato, Apology 26d; DK 59 A42"
			}
		],
		sources: [
			{
				label: "Stanford Encyclopedia — Anaxagoras",
				note: "Nous, the mixture, and the Athenian years.",
				href: `${SEP}anaxagoras/`
			},
			{
				label: "Plato, Apology",
				note: "Jowett’s public-domain English. 26d is the Meletus passage. Not a transcript of the historical speech.",
				href: `${MIT}Plato/apology.html`
			},
			{
				label: "Diogenes Laertius 2",
				note: "The late life, including the trial stories you should not take at face value. Read them as the tradition.",
				href: `${P}1999.01.0258`
			}
		]
	},
	{
		id: "archelaus",
		name: "Archelaus",
		greek: "Ἀρχέλαος",
		generation: "prime",
		originId: "athens",
		seats: [],
		schools: ["athenian", "pluralist"],
		dates: "mid-5th century BCE",
		stance: "Called Athenian, and also Milesian. Pupil of Anaxagoras, and — this is the tradition, not a document — the teacher of Socrates. The hinge between the Ionian book and the man who wrote nothing.",
		caution: "Diogenes Laertius is the source for the succession Anaxagoras–Archelaus–Socrates. Successions are a genre. They are often too neat. No sentence of Archelaus survives that we can separate cleanly from the handbook that reports him.",
		doctrines: [{
			title: "A cosmogony with a moral tail",
			text: "The reports give him a cosmogony in the manner of Anaxagoras: mind, separation, hot and cold. They also have him say something the older physiologoi are not usually credited with — that the just and the shameful exist by convention, not by nature. If that clause is his, he is already on the sophistic side of the street, inside a physical book.",
			cite: "DK 60 A1–A4"
		}, {
			title: "Why he is on this plate",
			text: "Not for a system you can reconstruct. For the geography of a classroom. Anaxagoras’s Nous, in Athens, has a local heir, and the tradition runs that heir into Socrates. The map would lie if it showed the Ionian and the Athenian as adjacent cities only."
		}],
		sources: [{
			label: "Diogenes Laertius, Lives",
			note: "Book 2.16 is the short life. Late, schematic, and the reason the succession exists in the tradition at all.",
			href: `${P}1999.01.0258`
		}, {
			label: "Stanford Encyclopedia — Presocratics",
			note: "Where to put a figure who left no book, in the larger map of the century.",
			href: `${SEP}presocratics/`
		}]
	},
	{
		id: "leucippus",
		name: "Leucippus",
		greek: "Λεύκιππος",
		generation: "prime",
		originId: "miletus",
		seats: [],
		schools: ["atomist"],
		dates: "mid-5th century BCE",
		stance: "The founder of atomism, if anyone was. The pin sits at Miletus because that is the affiliation most often repeated. Elea and Abdera are also claimed. None of the three is secure.",
		caution: "Epicurus is reported to have denied that Leucippus ever existed. That denial is not believed, but it measures how thoroughly Democritus absorbed him. Many ‘atomist’ sentences cannot be given to one of them rather than the other.",
		doctrines: [{
			title: "Atoms and the void",
			text: "The Eleatic ban on what-is-not is the problem. Leucippus’ answer, as Aristotle and Theophrastus report it, is that what-is (the full, the atom) is no more real than what-is-not (the empty). Atoms are indivisible, solid, and infinite in number. Worlds form where many of them, moving in the void, fall into a vortex.",
			cite: "DK 67 A6–A8; Aristotle, Metaphysics A.4"
		}, {
			title: "The lost book",
			text: "A Great World-System (Megas diakosmos) is attributed to him, and sometimes to Democritus. We do not have it. ‘Nothing happens in vain, but everything from a logos and by necessity’ is given as his by a late source. Treat the wording as a report of the school’s determinism, not as a recovered sentence you can parse in Greek.",
			cite: "DK 67 B2"
		}],
		sources: [
			{
				label: "Stanford Encyclopedia — Leucippus",
				note: "Existence, city, and what can be separated from Democritus.",
				href: `${SEP}leucippus/`
			},
			{
				label: "Stanford Encyclopedia — Ancient atomism",
				note: "The school as a single argument, which is how Aristotle read it.",
				href: `${SEP}atomism-ancient/`
			},
			{
				label: "Aristotle, Metaphysics A",
				note: "English on Perseus. Chapter 4 is his account of the atomists, inside an argument of his own.",
				href: `${P}1999.01.0052`
			}
		]
	},
	{
		id: "protagoras",
		name: "Protagoras",
		greek: "Πρωταγόρας",
		generation: "prime",
		originId: "abdera",
		seats: ["athens", "thurii"],
		schools: ["sophist"],
		dates: "c. 490–c. 420 BCE",
		stance: "Of Abdera. The first man we hear of who took pay to teach excellence at speaking and judging, and who said so in public. In Athens in the 440s, and connected with the foundation of Thurii.",
		caution: "Stories of a trial for impiety and of a public burning of his book are late and not secure. Do not repeat them as events.",
		doctrines: [
			{
				title: "The measure",
				text: "The sentence is quoted by Plato as the opening of a book called Truth. Chrēmata is broader than ‘objects’: things one deals with, matters. Plato reads it as: whatever appears to a person is true for that person. Whether Protagoras meant something that narrow is the argument of the Theaetetus, not a fact underneath it. He also held that on every matter there are two logoi, opposed to each other.",
				quote: "Of all things the measure is man: of the things that are, that they are, and of the things that are not, that they are not.",
				cite: "Plato, Theaetetus 152a; DK 80 B1"
			},
			{
				title: "The gods",
				text: "About the gods he said he could not know that they are, or that they are not, or what they are like. The obstacles he names are the obscurity of the subject and the shortness of a human life. It is a suspension, not a denial. Later antiquity turned it into a martyrdom. The fragment itself is quieter.",
				cite: "DK 80 B4"
			},
			{
				title: "Teachable excellence",
				text: "Plato’s Protagoras gives him a great speech: justice and aidōs were distributed to all, because a city cannot exist if only a few have them, and yet they can be taught — that is why punishment and education exist. The speech is Plato’s composition. It is also the clearest ancient statement of what a sophist of this generation claimed to be selling, and why a democracy might buy it.",
				cite: "Plato, Protagoras 320c–328d"
			}
		],
		sources: [
			{
				label: "Stanford Encyclopedia — Protagoras",
				note: "Measure, gods, and the two-logoi fragment, with the sources graded.",
				href: `${SEP}protagoras/`
			},
			{
				label: "Plato, Theaetetus",
				note: "Jowett’s public-domain English. The measure doctrine is examined, and rewritten, here.",
				href: `${MIT}Plato/theatu.html`
			},
			{
				label: "Plato, Protagoras",
				note: "The great speech and the question whether excellence can be taught. A dialogue, not a biography.",
				href: `${MIT}Plato/protagoras.html`
			}
		]
	},
	{
		id: "gorgias",
		name: "Gorgias",
		greek: "Γοργίας",
		generation: "prime",
		originId: "leontini",
		seats: ["athens"],
		schools: ["sophist"],
		dates: "c. 485–c. 380 BCE",
		stance: "Of Leontini. A rhetor. His embassy to Athens in 427 falls just after this plate’s year; the style, and the argument of On Non-Being, belong to the same generation.",
		caution: "On Non-Being survives only as two later summaries, Sextus Empiricus and the pseudo-Aristotelian On Melissus, Xenophanes, and Gorgias. They do not match in every step. Do not stitch them into one speech and call it his wording.",
		doctrines: [{
			title: "Three theses",
			text: "Nothing is. If it is, it cannot be known. If it can be known, it cannot be communicated to another. The argument is aimed at Eleatic confidence that thinking and being are locked together. A chariot racing on the sea can be thought and spoken; it does not follow that it is. Logos is not a window. It is a power.",
			cite: "DK 82 B3; Sextus, Against the Mathematicians 7.65 ff."
		}, {
			title: "Helen and the force of speech",
			text: "The Encomium of Helen, which we do have, defends Helen by arguing that speech is a great dynast: it can drug the soul, and a person persuaded is not to blame. Palamedes is the companion piece, a defense speech. These are display works. They are also a theory of logos, written as oratory rather than as a treatise.",
			cite: "DK 82 B11, B11a"
		}],
		sources: [
			{
				label: "Internet Encyclopedia of Philosophy — Gorgias",
				note: "On Non-Being, Helen, and the two summarizing sources, kept distinct.",
				href: `${IEP}gorgias/`
			},
			{
				label: "Stanford Encyclopedia — Intentionality in ancient philosophy",
				note: "A careful account of the second thesis: thought does not drag being with it.",
				href: `${SEP}intentionality-ancient/`
			},
			{
				label: "Plato, Gorgias",
				note: "A generation later, Plato’s argument with what rhetoric is. Not a portrait you can treat as minutes.",
				href: `${MIT}Plato/gorgias.html`
			}
		]
	},
	{
		id: "philolaus",
		name: "Philolaus",
		greek: "Φιλόλαος",
		generation: "prime",
		originId: "croton",
		seats: ["tarentum"],
		schools: ["pythagorean"],
		dates: "c. 470–c. 385 BCE",
		stance: "Of Croton, later at Tarentum. The first Pythagorean of whom we have book-fragments. In 450 he is a young man. The written form of the school starts with his generation.",
		caution: "‘Things are numbers’ is Aristotle’s report about Pythagoreans, and Aristotle does not always say which ones. Philolaus’ own opening is about limiters and unlimiteds, not about integers as the substance of things. Some fragments printed under his name in older collections are forged. Huffman’s edition is the sieve.",
		doctrines: [{
			title: "Limiters and unlimiteds",
			text: "Nature in the cosmos was fitted together from unlimiteds and limiters, both of them required. A harmony holds them. Without number, he says, nothing could be known — number is the condition of knowledge of the fitting-together, which is not the same claim as ‘a horse is the number four.’",
			cite: "DK 44 B1, B2, B4, B6"
		}, {
			title: "The hearth is not the earth",
			text: "The system credited to him puts fire at the center, a hearth, and makes the earth one of the bodies that move around it. There is also a counter-earth in the reports. How much of this is his wording and how much is Aristotle’s ‘the Pythagoreans’ is exactly the scholarly argument. What is safe: this astronomy is not geocentric, and it is not yet the astronomy of Plato’s Timaeus.",
			cite: "DK 44 A16–A17; Aristotle, On the Heavens"
		}],
		sources: [{
			label: "Stanford Encyclopedia — Philolaus",
			note: "Carl Huffman’s entry. Use it before any older collection of the fragments.",
			href: `${SEP}philolaus/`
		}, {
			label: "Stanford Encyclopedia — Pythagoreanism",
			note: "Where he sits in the school that Pythagoras himself did not write down.",
			href: `${SEP}pythagoreanism/`
		}]
	},
	{
		id: "diogenes",
		name: "Diogenes of Apollonia",
		greek: "Διογένης",
		generation: "prime",
		originId: "apollonia",
		seats: [],
		schools: ["ionian"],
		dates: "active c. 440–430 BCE",
		stance: "Air is the arche, and air is intelligent. An Ionian book written late enough to have heard Anaxagoras, and simple enough that Aristophanes can put a version of it on the comic stage.",
		caution: "Which Apollonia is not known. The pin marks Apollonia on the Pontus, modern Sozopol, one candidate. Crete and a Phrygian Apollonia have also been argued. Do not treat the dot as a birth certificate. He was read in Athens; that part is the point of the Clouds parody.",
		doctrines: [{
			title: "One arche, or else no mixture",
			text: "If the things that are now in this cosmos — earth, air, fire — were different in their own nature, they could not mix and affect one another. So they are forms of one underlying thing. The argument is explicit about why a monism is required. It is a reply to pluralists, not an ignorance of them.",
			cite: "DK 64 B2"
		}, {
			title: "Air that knows",
			text: "That one thing is air. Air differs in heat, in density, and in intelligence: the warmer and the finer knows more. Humans and other animals live by breathing a portion of it. God is air, and air steers all things. The steering is what he takes from Anaxagoras, relocated into the arche itself rather than into a Mind that is mixed with nothing.",
			cite: "DK 64 B4, B5"
		}],
		sources: [{
			label: "Internet Encyclopedia of Philosophy — Diogenes of Apollonia",
			note: "Fragments B1–B5 and the relation to Anaximenes and Anaxagoras.",
			href: `${IEP}diogenes-of-apollonia/`
		}, {
			label: "Aristophanes, Clouds",
			note: "English on Perseus. Produced in 423. The phrontistērion’s air-doctrine is a caricature aimed at this kind of book, and at Socrates, who did not write it.",
			href: `${P}1999.01.0241`
		}]
	},
	{
		id: "antiphon-sophist",
		name: "Antiphon the Sophist",
		greek: "Ἀντιφῶν",
		generation: "prime",
		originId: "athens",
		seats: [],
		schools: ["sophist", "athenian"],
		dates: "later 5th century BCE",
		stance: "An Athenian book, On Truth, recovered in part from a papyrus. Justice, in those columns, is a convention. Nature is what you follow when no one is watching.",
		caution: "Whether this Antiphon is Antiphon of Rhamnus — the logographer executed in 411 — is a real dispute, not a footnote. This plate keeps them apart, because the evidence does not force them together. Pendrick’s commentary is the sober case for separation; unitarians remain. If you merge them, merge them on purpose.",
		doctrines: [{
			title: "Nature and the law",
			text: "Justice is not violating the laws of the city you live in. The laws are imposed; the dictates of nature are necessary. Most of what the law calls just is hostile to nature. A man gets more if he follows nature when there are no witnesses, and the law when there are. The fragment does not blush about this. It is an analysis of what a conventional justice can actually enforce.",
			cite: "DK 87 B44, P.Oxy. 1364"
		}, {
			title: "What the papyrus is not",
			text: "It is not a political program, and it is not yet a theory of rights. Later readers have wanted egalitarianism from a column about Greeks and barbarians. Read the column before you adopt the moral. The other titles under his name — On Concord, on the interpretation of dreams — survive as quotations, not as books."
		}],
		sources: [{
			label: "Internet Encyclopedia of Philosophy — Sophists",
			note: "The Antiphon section, including the identity question and B44.",
			href: `${IEP}sophists/`
		}, {
			label: "Stanford Encyclopedia — Ancient political philosophy",
			note: "The fifth-century section places Antiphon’s papyrus in the nomos and physis argument, beside the speeches Plato writes for Thrasymachus and Callicles.",
			href: `${SEP}ancient-political/`
		}]
	},
	{
		id: "antiphon-rhamnus",
		name: "Antiphon of Rhamnus",
		greek: "Ἀντιφῶν",
		generation: "prime",
		originId: "athens",
		seats: [],
		schools: ["athenian"],
		dates: "c. 480–411 BCE",
		stance: "Of the deme Rhamnus. A logographer: he wrote speeches for other men to deliver in court. In 411 he was a leader of the oligarchy of the Four Hundred, defended himself in a speech Thucydides calls the best of its time, and was executed.",
		caution: "The Tetralogies — three sets of model homicide speeches, each with accusation, defense, and replies — are transmitted under his name. Their date and their relation to On Truth are part of the same identity dispute. They may be exercises by the orator, or they may not be his.",
		doctrines: [{
			title: "Probability in court",
			text: "The Tetralogies argue homicide cases where the facts are thin, by eikos: what a person of that sort would probably have done. This is the sophistic art inside Athenian procedure. A death can be constructed, on either side, out of character and likelihood. That is a doctrine about logos whether or not the author is the author of On Truth.",
			cite: "Tetralogies 1–3"
		}, {
			title: "411",
			text: "Thucydides marks him as the man who planned the oligarchy and who, when it fell, stayed to stand trial rather than flee. The historian’s praise of the defense speech is almost the only contemporary literary judgment we have of him. The speech itself is lost.",
			cite: "Thucydides 8.68"
		}],
		sources: [{
			label: "Thucydides, Book 8",
			note: "English on Perseus. Chapter 68 is the portrait; the surrounding narrative is the coup.",
			href: `${P}1999.01.0200:book=8:chapter=68`
		}, {
			label: "Internet Encyclopedia of Philosophy — Sophists",
			note: "States the identity problem without pretending it has been closed.",
			href: `${IEP}sophists/`
		}]
	},
	{
		id: "herodotus",
		name: "Herodotus",
		greek: "Ἡρόδοτος",
		generation: "prime",
		originId: "halicarnassus",
		seats: ["athens", "thurii"],
		schools: ["historia"],
		dates: "c. 484–c. 425 BCE",
		stance: "Of Halicarnassus. His inquiry — he is the one who uses historiē of his own work — is the Persian wars, and everything a person would have to know to see why they were fought. Athens knew the work in the 440s. Later tradition settles him at Thurii.",
		caution: "He is not a philosopher of the schools above, and this plate does not pretend he is. He is here because 450 has no honest intellectual map that omits the invention of prose inquiry on this scale. The causes he gives are his causes. Check them against the inscriptions and against Aeschylus before you trust a speech he puts in a king’s mouth.",
		doctrines: [
			{
				title: "So that they not be without kleos",
				text: "The proem: so that what men have done not fade, and so that the great and wonderful works of Greeks and barbarians not lose their glory, and in particular the cause for which they warred. Greeks and barbarians are in the same sentence. That is a method, not a courtesy.",
				cite: "Histories 1.1"
			},
			{
				title: "Custom is king",
				text: "If someone set all human customs before men and told them to choose the finest, each would pick his own. Darius’ experiment — Greeks horrified at eating their fathers, Callatian Indians horrified at burning them — is the demonstration. He quotes Pindar: nomos is king of all. Custom is not a decoration on top of a universal human nature. It is what a people takes nature to be.",
				cite: "Histories 3.38"
			},
			{
				title: "The political argument",
				text: "The Persian debate (3.80–82) on democracy, oligarchy, and monarchy is not the minutes of a Persian cabinet. It is a Greek argument staged in Susa, and it belongs with the Athenian conversation of this generation about constitutions. Read it as thought, and say whose.",
				cite: "Histories 3.80–82"
			}
		],
		sources: [
			{
				label: "Herodotus, Histories (Godley)",
				note: "English on Perseus, with the Greek one click away. Start at the proem, then 3.38.",
				href: `${P}1999.01.0126`
			},
			{
				label: "Histories 3.38",
				note: "Custom is king. The chapter itself.",
				href: `${P}1999.01.0126:book=3:chapter=38`
			},
			{
				label: "Stanford Encyclopedia — Doxography",
				note: "Not an article on Herodotus. The right warning about how later handbooks turn inquirers into ‘positions.’ He is a victim of that genre too.",
				href: `${SEP}doxography-ancient/`
			}
		]
	},
	{
		id: "ion",
		name: "Ion of Chios",
		greek: "Ἴων",
		generation: "prime",
		originId: "chios",
		seats: ["athens"],
		schools: ["ionian", "historia"],
		dates: "c. 480–c. 422 BCE",
		stance: "Of Chios. Tragedian, elegist, and the author of a book of visits — the Epidēmiai — in which Sophocles and Pericles appear as men he sat with. A polymath of the Athenian orbit who is not a school.",
		caution: "The Triagmoi, a prose book organized in threes, is sometimes filed as Pythagorean cosmology. The filing is speculative. We have quotations, not the book. Do not build a system out of the numeral three.",
		doctrines: [{
			title: "Memoir as inquiry",
			text: "The Epidēmiai are not history in Herodotus’ sense and not biography in Plutarch’s. They are a contemporary’s scenes: what Sophocles said at a dinner, how a politician behaved in a room. For 450 this is rare. Almost everyone else on the plate reaches us through a handbook or a hostile dialogue. Ion was in the room.",
			cite: "DK 36; Plutarch’s quotations"
		}, {
			title: "A cosmology, thinly attested",
			text: "The Triagmoi is reported to have divided things by threes and to have touched the soul and the virtues. That is enough to show that a working tragedian of this generation also wrote a book of the physiologos type. It is not enough to reconstruct the book."
		}],
		sources: [{
			label: "Diogenes Laertius",
			note: "No real life of Ion. Listed here because the biographical genre that swallowed everyone else barely noticed him — which is itself a fact about the tradition.",
			href: `${P}1999.01.0258`
		}, {
			label: "Stanford Encyclopedia — Doxography of ancient philosophy",
			note: "How a book that survives only in other people’s quotations should be handled.",
			href: `${SEP}doxography-ancient/`
		}]
	},
	{
		id: "damon",
		name: "Damon",
		greek: "Δάμων",
		generation: "prime",
		originId: "athens",
		seats: [],
		schools: ["athenian"],
		dates: "mid-5th century BCE",
		stance: "Of the deme Oa, at Athens. A music theorist in the circle of Pericles, and in some reports a teacher of Socrates. The man who made the modes of the lyre into a question about character and about the city.",
		caution: "The treatise is lost. Plato’s Republic is our main window, and Plato has a constitutional project of his own: he wants the modes that soften or that intoxicate kept out of the guardians’ education. That is not a neutral report of Damon’s lecture. An ostracism is reported and the date floats. Do not invent the year.",
		doctrines: [{
			title: "Ethos of the modes",
			text: "Different harmoniai shape different characters. A city that lets every mode into its choruses is making a kind of citizen. The claim is older than Plato and narrower than ‘music is important.’ It says that rhythm and scale are already ethical, before anyone has spoken a proposition.",
			cite: "Plato, Republic 3, 400b and 424c"
		}, {
			title: "Counselor, not founder",
			text: "He does not found a school you can list beside the Eleatics. He shows what the Athenian circle sounded like when it was not doing ontology: technical musical knowledge, used as political advice, close enough to Pericles to be worth exiling if the ostracism tradition is true."
		}],
		sources: [{
			label: "Plato, Republic",
			note: "English on Perseus. Book 3 is the education of the guardians and the discussion of modes. Damon is named, not quoted at length.",
			href: `${P}1999.01.0168`
		}, {
			label: "Stanford Encyclopedia — shorter ethical dialogues",
			note: "Not an article on Damon. The Laches, where he is also in the background of a conversation about courage and teaching, sits in this family of dialogues.",
			href: `${SEP}plato-ethics-shorter/`
		}]
	},
	{
		id: "socrates",
		name: "Socrates",
		greek: "Σωκράτης",
		generation: "rising",
		originId: "athens",
		seats: [],
		schools: ["athenian"],
		dates: "469–399 BCE",
		stance: "Athenian, son of Sophroniscus. In 450 he is about nineteen. Nothing of the elenchus, the trial, or the circles of Plato and Xenophon has happened. He is on the plate because those things are what this city’s streams become.",
		caution: "He wrote nothing. Plato’s Socrates, Xenophon’s Socrates, and the Socrates of Aristophanes’ Clouds (423) are three compositions. Aristotle, who was not an eyewitness either, says the historical man sought universal definitions and turned inquiry toward ethical questions. Where the three literary portraits disagree, say so. Do not average them into a person.",
		doctrines: [{
			title: "What the next decades will mean by him",
			text: "The examined life, the disavowal of knowledge, the question-and-answer that ends with the interlocutor’s contradiction rather than with a doctrine. ‘The unexamined life is not worth living’ is a sentence from Plato’s Apology, written after the execution. It is not a saying recorded in 450. It is where the story goes.",
			cite: "Plato, Apology 38a"
		}, {
			title: "What 423 already thought he was",
			text: "Aristophanes puts him in a think-shop, mixing the weaker argument with the stronger and investigating the things in the air. That is a caricature with Anaxagoras and Diogenes of Apollonia folded in. It is also evidence that, twenty-seven years after this plate, a mass audience recognized the name and associated it with both argument and natural philosophy. The association with natural philosophy is exactly what Plato’s Apology denies.",
			cite: "Aristophanes, Clouds; Plato, Apology 19b–d"
		}],
		sources: [
			{
				label: "Stanford Encyclopedia — Socrates",
				note: "The problem of the sources is the subject of the entry, not a preface to it.",
				href: `${SEP}socrates/`
			},
			{
				label: "Plato, Apology",
				note: "Jowett’s public-domain English. A defense written by a philosopher, not a court stenographer.",
				href: `${MIT}Plato/apology.html`
			},
			{
				label: "Xenophon, Memorabilia",
				note: "English on Perseus. A different Socrates: more practical, more conventionally pious, still not a transcript.",
				href: `${P}1999.01.0208`
			},
			{
				label: "Aristophanes, Clouds",
				note: "English on Perseus. Comedy, 423, revised later. Use it as evidence of a public image.",
				href: `${P}1999.01.0241`
			}
		]
	},
	{
		id: "democritus",
		name: "Democritus",
		greek: "Δημόκριτος",
		generation: "rising",
		originId: "abdera",
		seats: [],
		schools: ["atomist"],
		dates: "c. 460–c. 370 BCE",
		stance: "Of Abdera. If the birth date holds, he is a child in 450. He is on the plate because Abdera’s atomism is the school this generation opens, and a pin that showed only Protagoras would misdraw the city.",
		caution: "The travels — Egypt, Persia, India — are a romantic biography. The ethical fragments are numerous and many are later paste. ‘By convention sweet, by convention bitter; in reality atoms and void’ is transmitted under his name (B9) and has also been associated with the school at large. Do not treat the wording as settled.",
		doctrines: [{
			title: "Atoms, void, necessity",
			text: "With Leucippus: indivisible bodies, different in shape and arrangement, moving in the empty. Perceptible qualities are not in the atoms as sweetness is in honey; they are what a composite does to a perceiver. Necessity, not a Nous that plans, governs the collisions. This is the pluralist answer to Parmenides that refuses a purpose.",
			cite: "DK 68 A37, B9; Aristotle, Metaphysics A.4"
		}, {
			title: "Cheerfulness",
			text: "The ethical goal reported for him is euthymia, cheerfulness: a state in which the soul is not shaken by fear or superstition, and pleasure is measured rather than maximized in a heap. Whether the ethical books and the physical books were one project is a real question. The tradition thought they were one man.",
			cite: "DK 68 B191 and the ethical fragments"
		}],
		sources: [
			{
				label: "Stanford Encyclopedia — Democritus",
				note: "Life, the catalogue of books, physics, and ethics.",
				href: `${SEP}democritus/`
			},
			{
				label: "Stanford Encyclopedia — Ancient atomism",
				note: "The school he shares with Leucippus, where the authorship is honestly blurred.",
				href: `${SEP}atomism-ancient/`
			},
			{
				label: "Aristotle, Metaphysics A",
				note: "English on Perseus. His chapter on the atomists is the most important ancient report, and it is not neutral.",
				href: `${P}1999.01.0052`
			}
		]
	},
	{
		id: "hippocrates",
		name: "Hippocrates",
		greek: "Ἱπποκράτης",
		generation: "rising",
		originId: "cos",
		seats: [],
		schools: ["medical"],
		dates: "traditional dates c. 460–c. 370 BCE",
		stance: "Of Cos. The name of a school and of a corpus. If the traditional birth year is right, the man is a child in 450. The treatises are later, and they are not one man’s book.",
		caution: "Almost nothing in the Hippocratic Corpus is signed, and the Oath’s date is disputed — it may be later than this century. ‘Hippocrates says’ is usually a way of saying ‘a treatise in the corpus says.’ The Coan and Cnidian collections were already being told apart in antiquity. This pin marks the Coan medical tradition, not an authorial hand.",
		doctrines: [
			{
				title: "The sacred disease is not more sacred",
				text: "On the Sacred Disease argues that epilepsy is no more divine than any other disease. It has a nature and a cause, and the cause is in the body — the brain, phlegm, bile — not in a god who can be bought off by a purifier. Calling a disease sacred is, the writer says, a cover for ignorance. This is the medical counterpart of Xenophanes’ attack on poetic theology.",
				cite: "On the Sacred Disease"
			},
			{
				title: "Place, season, people",
				text: "Airs, Waters, Places ties constitutions and even customs to winds, water, and exposure. A physician who does not know the city will misread the patient. It is also an ethnography of Europe and Asia that a reader of Herodotus will recognize as the same generation’s question: why are peoples different, and what kind of cause is allowed to count.",
				cite: "Airs, Waters, Places"
			},
			{
				title: "Prognosis, not a wonder",
				text: "The practical center of the corpus is prognosis: say what will happen, and say it from signs. That art is how a physician is distinguished from a magician in these texts. On Ancient Medicine argues, against philosophers, that medicine already has a method and does not need a new hypothesis about hot, cold, or a single arche. The polemic is aimed at people elsewhere on this plate.",
				cite: "Prognostic; On Ancient Medicine"
			}
		],
		sources: [
			{
				label: "Internet Encyclopedia of Philosophy — Hippocrates",
				note: "Corpus, authorship, and the philosophical treatises, with the skepticism the case requires.",
				href: `${IEP}hippocra/`
			},
			{
				label: "Hippocratic Corpus, volume I (Jones)",
				note: "English on Perseus. Includes On Ancient Medicine. Not a collected works you should treat as one author.",
				href: `${P}1999.01.0251`
			},
			{
				label: "Airs, Waters, Places — public-domain English",
				note: "Internet Classics Archive. An older translation. Check a modern edition before you quote it in print.",
				href: `${MIT}Hippocrates/airwatpl.html`
			},
			{
				label: "The Oath",
				note: "English on Perseus. Read it as a school document of uncertain date, not as his autograph.",
				href: `${P}1999.01.0252`
			}
		]
	},
	{
		id: "prodicus",
		name: "Prodicus",
		greek: "Πρόδικος",
		generation: "prime",
		originId: "ceos",
		seats: ["athens"],
		schools: ["sophist"],
		dates: "later 5th century BCE; the birth date is loose",
		stance: "Of Ioulis on Ceos. Plato presents him as younger than Protagoras and as a specialist: the man who distinguishes words the rest of us use as if they were the same.",
		caution: "Dates float. He may already have been teaching late in the 440s, or he may be a figure of the war years. He is filed here, not under Rising, because the sources do not fix a birth year the way they fix Socrates’.",
		doctrines: [
			{
				title: "The correctness of names",
				text: "Orthotēs onomatōn: near-synonyms are not synonyms. Plato has him separate ‘pleasure’ from ‘enjoyment’ and ‘delight’ until Socrates begs him to stop, which is comedy with a real practice underneath. If speech is the sophist’s instrument, the instrument has to be calibrated. Cratylus is Plato’s later dialogue about whether names are natural or conventional; Prodicus is one of the people that argument remembers.",
				cite: "Plato, Protagoras 337a–c; Cratylus"
			},
			{
				title: "The choice of Heracles",
				text: "Xenophon says he is paraphrasing a display-speech of Prodicus: Heracles at the crossroads, Virtue on one side and Vice on the other. The speech we have is Xenophon’s prose, not a transcript. What it shows is the form — a moral epideixis, suitable for the young, and famous enough to be retold.",
				cite: "Xenophon, Memorabilia 2.1.21–34"
			},
			{
				title: "How gods get their names",
				text: "A report, not a surviving essay: early humans treated as gods whatever benefited them — sun, moon, rivers, bread, wine — and the names followed the benefits. It is the most explicit fifth-century account we hear of religion as a human invention. Sextus and others are the reporters. Grade it as doxography.",
				cite: "DK 84 B5"
			}
		],
		sources: [
			{
				label: "Internet Encyclopedia of Philosophy — Sophists",
				note: "The Prodicus section: synonyms, Heracles, and the theology.",
				href: `${IEP}sophists/`
			},
			{
				label: "Xenophon, Memorabilia",
				note: "English on Perseus. Book 2, chapter 1 is the Choice of Heracles, explicitly marked as a paraphrase.",
				href: `${P}1999.01.0208:book=2:chapter=1`
			},
			{
				label: "Plato, Cratylus",
				note: "English on Perseus. The dialogue about names. Prodicus is named; the theory is Plato’s.",
				href: `${P}1999.01.0172`
			}
		]
	},
	{
		id: "hippias",
		name: "Hippias",
		greek: "Ἱππίας",
		generation: "rising",
		originId: "elis",
		seats: ["athens"],
		schools: ["sophist"],
		dates: "later 5th century BCE",
		stance: "Of Elis. A polymath who showed at Olympia: memory systems, mathematics, poetry, the making of his own clothes and rings. Documented activity belongs to the last third of the century. In 450 he is at most a boy.",
		caution: "Plato’s Hippias Major and Hippias Minor are hostile portraits. The Major’s authenticity has been doubted. Neither is a source for his wording. The quadratrix sometimes called the quadratrix of Hippias may belong to a later Hippias. Do not give him the curve without a warning.",
		doctrines: [{
			title: "The polymath as a program",
			text: "Where Protagoras sells political excellence and Prodicus sells distinctions, Hippias sells range. Plato has him claim to arrive at Olympia wearing and using only what he had made himself, and to be ready to speak on anything from memory. Even as mockery, the scene preserves the advertisement: the sophist as a one-man encyclopedia, performing in the panhellenic circuit, not only in Athens.",
			cite: "Plato, Hippias Minor 368b–d"
		}, {
			title: "Nature against the law of cities",
			text: "In the Protagoras, Plato gives him a speech to the effect that like-minded men are kin by nature, and the laws of cities, which treat them as strangers, do violence to that kinship. It is one sentence in a fictional gathering. It is also the nomos/physis thesis in a political key, parallel to Antiphon’s papyrus and not the same argument. Elis, not Athens, is his city — and in the war years Elis is not on Athens’ side.",
			cite: "Plato, Protagoras 337c–d"
		}],
		sources: [
			{
				label: "Internet Encyclopedia of Philosophy — Sophists",
				note: "The Hippias section, with Plato’s mockery labeled as Plato’s.",
				href: `${IEP}sophists/`
			},
			{
				label: "Plato, Greater Hippias",
				note: "English on Perseus. Authenticity disputed. A conversation about the fine (kalon), not a life.",
				href: `${P}1999.01.0180`
			},
			{
				label: "Plato, Protagoras",
				note: "Public-domain English. The gathering of sophists in which Hippias is given his nature-and-law remark.",
				href: `${MIT}Plato/protagoras.html`
			}
		]
	}
];
var generationRank = {
	prior: 0,
	prime: 1,
	rising: 2
};
var thinkersById = Object.fromEntries(thinkers.map((t) => [t.id, t]));
for (const t of thinkers) {
	if (!placesById[t.originId]) throw new Error(`Unknown origin for ${t.id}`);
	for (const seat of t.seats) if (!placesById[seat]) throw new Error(`Unknown seat ${seat} for ${t.id}`);
	for (const school of t.schools) if (!schoolById[school]) throw new Error(`Unknown school ${school} for ${t.id}`);
}
function sortThinkers(list) {
	return [...list].sort((a, b) => {
		const g = generationRank[a.generation] - generationRank[b.generation];
		if (g !== 0) return g;
		return a.name.localeCompare(b.name);
	});
}
function Dossier({ thinker, saved, onBack, onToggleSave, onSelect }) {
	const origin = placesById[thinker.originId];
	const seats = thinker.seats.map((id) => placesById[id]).filter(Boolean);
	const sameCity = thinkers.filter((item) => item.id !== thinker.id && item.originId === thinker.originId);
	const sameSchool = thinkers.filter((item) => item.id !== thinker.id && item.schools[0] === thinker.schools[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col gap-5 px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onBack,
					className: "inline-flex h-11 items-center gap-1 text-sm font-semibold text-sea",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "size-4",
						"aria-hidden": true
					}), "All thinkers"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onToggleSave,
					"aria-pressed": saved,
					className: `inline-flex h-11 items-center gap-2 border px-3 text-sm font-semibold ${saved ? "border-cinnabar bg-cinnabar-soft text-cinnabar" : "border-line bg-folio text-ink hover:border-sea"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
						className: `size-4 ${saved ? "fill-cinnabar" : ""}`,
						"aria-hidden": true
					}), saved ? "On the desk" : "Set aside"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold tracking-wide text-cinnabar uppercase",
					children: [
						generationById[thinker.generation].label,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: " · "
						}),
						thinker.schools.map((id) => schoolById[id].name).join(" · ")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-4xl leading-none text-balance text-ink",
					children: thinker.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-xl text-sea italic",
					children: thinker.greek
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: thinker.dates
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed text-pretty text-ink",
				children: thinker.stance
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Origin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
						origin?.name,
						origin?.greek ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", origin.greek]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", origin?.region]
						}),
						origin?.uncertain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-cinnabar",
							children: " · site disputed"
						}) : null
					] }),
					seats.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Also attested"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: seats.map((seat) => seat.name).join(", ") })] }) : null
				]
			}),
			thinker.caution ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-line bg-parchment px-3 py-2 text-sm leading-relaxed text-pretty text-ink",
				children: thinker.caution
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-none text-ink",
					children: "Doctrines"
				}), thinker.doctrines.map((doctrine) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold tracking-wide text-ink uppercase",
							children: doctrine.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-pretty text-ink",
							children: doctrine.text
						}),
						doctrine.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "border-l-2 border-cinnabar pl-3 font-display text-lg leading-snug text-ink italic",
							children: doctrine.quote
						}) : null,
						doctrine.cite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: doctrine.cite
						}) : null
					]
				}, doctrine.title))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-none text-ink",
					children: "Primary sources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: thinker.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line pt-2",
						children: [source.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: source.href,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-start gap-1 text-sm font-semibold text-sea",
							children: [source.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "mt-0.5 size-3.5 shrink-0",
								"aria-hidden": true
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: source.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm leading-relaxed text-pretty text-muted",
							children: source.note
						})]
					}, source.label))
				})]
			}),
			sameCity.length > 0 || sameSchool.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-none text-ink",
					children: "On the same plate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [...sameCity, ...sameSchool.filter((item) => item.originId !== thinker.originId)].filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index).slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(item.id),
						className: "h-11 border border-line bg-folio px-3 text-sm text-ink hover:border-sea",
						children: [item.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", placesById[item.originId]?.name]
						})]
					}, item.id))
				})]
			}) : null
		]
	});
}
var useDesk = create()(persist((set, get) => ({
	ids: [],
	toggle: (id) => {
		const ids = get().ids;
		set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] });
	}
}), {
	name: "doxa-desk",
	skipHydration: true
}));
var schoolIds = new Set(schools.map((school) => school.id));
function AtlasApp() {
	const search = useSearch({ strict: false });
	const navigate = useNavigate({ from: "/" });
	const desk = useDesk();
	const [deskReady, setDeskReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const pending = useDesk.persist.rehydrate();
		Promise.resolve(pending).then(() => setDeskReady(true));
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape" && search.t) setSearch({ t: void 0 });
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [search.t]);
	function setSearch(patch) {
		navigate({
			replace: true,
			search: (prev) => ({
				...prev,
				...patch
			})
		});
	}
	const selected = search.t ? thinkersById[search.t] : void 0;
	const query = search.q?.trim().toLowerCase() ?? "";
	const matchedIds = (0, import_react.useMemo)(() => {
		const ids = /* @__PURE__ */ new Set();
		for (const thinker of thinkers) {
			if (search.school && !thinker.schools.includes(search.school)) continue;
			if (search.gen && thinker.generation !== search.gen) continue;
			if (query) {
				const place = placesById[thinker.originId];
				if (![
					thinker.name,
					thinker.greek,
					place?.name,
					place?.greek,
					place?.region,
					...thinker.schools.map((id) => schoolById[id].name)
				].join(" ").toLowerCase().includes(query)) continue;
			}
			ids.add(thinker.id);
		}
		return ids;
	}, [
		query,
		search.gen,
		search.school
	]);
	const dimmed = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const thinker of thinkers) if (!matchedIds.has(thinker.id)) set.add(thinker.id);
		return set;
	}, [matchedIds]);
	const visible = sortThinkers(thinkers.filter((thinker) => matchedIds.has(thinker.id)));
	function openThinker(id) {
		setSearch({ t: id });
	}
	const sidebarProps = {
		search,
		setSearch,
		visible,
		selectedId: selected?.id,
		onSelect: openThinker,
		savedIds: deskReady ? desk.ids : [],
		onToggleSave: (id) => desk.toggle(id),
		saved: selected ? deskReady && desk.ids.includes(selected.id) : false
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-folio text-ink lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden min-h-0 w-96 shrink-0 flex-col border-line lg:flex lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				...sidebarProps,
				schools: true
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2 border-b border-line bg-folio px-3 py-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-none font-medium",
						children: "Oikoumenē"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate text-xs text-muted",
						children: "Greek thinkers, c. 450 BCE"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[10/7] w-full shrink-0 lg:aspect-auto lg:min-h-0 lg:flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasMap, {
							thinkers,
							selectedId: selected?.id,
							dimmed,
							onSelect: openThinker
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col border-t border-line lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-line px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolChips, {
							active: search.school,
							onChange: (school) => setSearch({ school })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { ...sidebarProps })]
				})
			]
		})]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-line px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-5xl leading-none font-medium tracking-tight",
				children: "Oikoumenē"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Greek thinkers, c. 450 BCE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-0.5 w-8 bg-cinnabar" })
		]
	});
}
function Sidebar({ search, setSearch, visible, selectedId, onSelect, savedIds, onToggleSave, saved, schools: showSchools = false }) {
	const selected = selectedId ? thinkersById[selectedId] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 border-b border-line px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search thinkers, cities, schools"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search.q ?? "",
							onChange: (event) => setSearch({ q: event.target.value || void 0 }),
							placeholder: "Search a name, a city, a school",
							className: "h-11 w-full border border-line bg-folio pr-3 pl-9 text-sm text-ink outline-none placeholder:text-muted focus:border-sea"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1",
					role: "group",
					"aria-label": "Generation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: !search.gen,
						onClick: () => setSearch({ gen: void 0 }),
						children: "All"
					}), generations.map((generation) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: search.gen === generation.id,
						onClick: () => setSearch({ gen: search.gen === generation.id ? void 0 : generation.id }),
						children: generation.label
					}, generation.id))]
				}),
				showSchools ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolChips, {
					wrap: true,
					active: search.school,
					onChange: (school) => setSearch({ school })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [visible.length, " on the plate"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dossier, {
				thinker: selected,
				saved,
				onBack: () => setSearch({ t: void 0 }),
				onToggleSave: () => onToggleSave(selected.id),
				onSelect
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1 px-4 pt-3",
				role: "tablist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: !search.panel,
						onClick: () => setSearch({ panel: void 0 }),
						children: "Gazetteer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterChip, {
						active: search.panel === "desk",
						onClick: () => setSearch({ panel: search.panel === "desk" ? void 0 : "desk" }),
						children: ["Desk", savedIds.length ? ` (${savedIds.length})` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: search.panel === "note",
						onClick: () => setSearch({ panel: search.panel === "note" ? void 0 : "note" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								className: "size-3.5",
								"aria-hidden": true
							}), "Note"]
						})
					})
				]
			}), search.panel === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {}) : search.panel === "desk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskList, {
				ids: savedIds,
				onSelect
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gazetteer, {
				thinkers: visible,
				onSelect
			})] })
		})]
	});
}
function SchoolChips({ active, onChange, wrap = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: wrap ? "flex flex-wrap gap-1" : "-mx-1 flex gap-1 overflow-x-auto px-1 pb-1",
		role: "group",
		"aria-label": "Schools",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
			active: !active,
			onClick: () => onChange(void 0),
			children: "All"
		}), schools.map((school) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterChip, {
			active: active === school.id,
			onClick: () => onChange(active === school.id ? void 0 : school.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: school.mark
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: active ? "text-folio" : "text-muted",
				children: [" ", school.name]
			})]
		}, school.id))]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: `inline-flex h-11 shrink-0 items-center border px-3 text-sm ${active ? "border-ink bg-ink text-folio" : "border-line bg-folio text-ink hover:border-sea"}`,
		children
	});
}
function Gazetteer({ thinkers: rows, onSelect }) {
	const groups = /* @__PURE__ */ new Map();
	for (const thinker of rows) {
		const region = placesById[thinker.originId]?.region ?? "Elsewhere";
		const list = groups.get(region) ?? [];
		list.push(thinker);
		groups.set(region, list);
	}
	const regions = [...groups.keys()].sort((a, b) => {
		const ai = REGION_ORDER.indexOf(a);
		const bi = REGION_ORDER.indexOf(b);
		return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
	});
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-6 text-sm text-muted",
		children: "No one on the plate matches."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col py-2",
		children: regions.map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "px-4 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted uppercase",
			children: region
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: (groups.get(region) ?? []).map((thinker) => {
			const place = placesById[thinker.originId];
			const school = schoolById[thinker.schools[0]];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(thinker.id),
				className: "flex w-full items-baseline gap-3 px-4 py-2 text-left hover:bg-parchment",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-8 shrink-0 font-semibold text-sea",
					children: school.mark
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-semibold text-ink",
						children: thinker.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted",
						children: [
							place?.name,
							" · ",
							generationById[thinker.generation].label
						]
					})]
				})]
			}) }, thinker.id);
		}) })] }, region))
	});
}
function DeskList({ ids, onSelect }) {
	const rows = ids.map((id) => thinkersById[id]).filter(Boolean);
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-6 text-sm leading-relaxed text-pretty text-muted",
		children: "Set a thinker aside from any dossier. The list stays in this browser."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "py-2",
		children: rows.map((thinker) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onSelect(thinker.id),
			className: "flex w-full flex-col px-4 py-2 text-left hover:bg-parchment",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold",
				children: thinker.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted",
				children: [
					placesById[thinker.originId]?.name,
					" · ",
					schoolById[thinker.schools[0]].name
				]
			})]
		}) }, thinker.id))
	});
}
function Note() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 px-4 py-4 text-sm leading-relaxed text-pretty text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Circa 450 BCE is a lens, not a census year. People marked Earlier were likely dead, or very old, by then; their arguments were not. People marked Rising were young; the books come later." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pins mark cities of origin. When a dossier names another city, the map draws a line to a seat the sources actually attest — an embassy, a school, an exile — not a grand tour." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dates are ancient and often insecure. Where the tradition is late, romantic, or split (Leucippus’ city, Diogenes’ Apollonia, the two Antiphons, anything attributed to Pythagoras himself), the dossier says so. Fragment numbers follow Diels–Kranz. Wording in quotation marks is a translation; everything else is paraphrase." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The coast is the modern shore. At this scale it is a fair proxy for the fifth-century coast. The bar at the southern edge is about 200 kilometers, measured near 35° N." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Outbound links open Perseus (Greek and a facing English, where the hopper has the work), the Stanford Encyclopedia, the Internet Encyclopedia of Philosophy, or — for a few dialogues the hopper mirror does not carry — the Internet Classics Archive’s older public-domain English. Check a critical edition before you quote any of them in print."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"Aristotle’s ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic",
						children: "Metaphysics"
					}),
					" A is the first surviving history of most of these people, and it is an argument, not a neutral report."
				]
			})
		]
	});
}
function isSchoolId(value) {
	return schoolIds.has(value);
}
var $$splitComponentImporter = () => import("./routes-B7bm9M04.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	validateSearch: (search) => {
		const gen = search.gen === "prior" || search.gen === "prime" || search.gen === "rising" ? search.gen : void 0;
		const panel = search.panel === "desk" || search.panel === "note" ? search.panel : void 0;
		const school = typeof search.school === "string" && isSchoolId(search.school) ? search.school : void 0;
		const q = typeof search.q === "string" && search.q.trim() ? search.q : void 0;
		return {
			t: typeof search.t === "string" && search.t.trim() ? search.t : void 0,
			school,
			gen,
			q,
			panel
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { AtlasApp as n, router_exports as t };
