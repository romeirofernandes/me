import { play } from "./engine.js";
import { isSoundName } from "./recipes.js";

const HOVER_GAP_MS = 150;
const boundRoots = new WeakSet();
const handledEvents = new WeakSet();
let lastHoverTime = -Infinity;

function resolve(el, attr, fallback) {
  const requested = el.getAttribute(attr);
  return isSoundName(requested) ? requested : fallback;
}

function isMouse(event) {
  return event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function findTarget(root, event, attr) {
  if (!(event.target instanceof Element)) return null;
  const element = event.target.closest(`[${attr}]`);
  return element && root.contains(element) ? element : null;
}

function listen(root, eventName, attr, fallback, mouseOnly = false) {
  root.addEventListener(eventName, (event) => {
    const element = findTarget(root, event, attr);
    if (!element || handledEvents.has(event)) return;
    if (mouseOnly && !isMouse(event)) return;
    if (eventName === "pointerenter") {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof Node && element.contains(relatedTarget)) return;
      const now = performance.now();
      if (now - lastHoverTime < HOVER_GAP_MS) return;
      lastHoverTime = now;
    }
    handledEvents.add(event);
    play(resolve(element, attr, fallback));
  }, true);
}

export function bind(root) {
  if (typeof document === "undefined") return;
  const scope = root ?? document;
  if (boundRoots.has(scope)) return;
  boundRoots.add(scope);
  listen(scope, "pointerenter", "data-cuelume-hover", "chime", true);
  listen(scope, "pointerdown", "data-cuelume-press", "press");
  listen(scope, "pointerup", "data-cuelume-release", "release");
  listen(scope, "click", "data-cuelume-toggle", "toggle");
}
