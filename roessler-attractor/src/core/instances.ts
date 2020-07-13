/**
 * ---- Core three.js instances -----------------------------------------------
 */

import * as THREE from "three";

const container = document.getElementById("sketch") || document.body;
const containerSize = container.getBoundingClientRect();

/**
 * The three.js scene instance.
 */
export const scene = new THREE.Scene();

/**
 * The three.js camera instance.
 */
export const camera = new THREE.PerspectiveCamera(
  50,
  containerSize.width / containerSize.height
);

/**
 * The three.js renderer instance.
 */
export let renderer: THREE.WebGLRenderer;

/**
 * Replaces the current renderer with `newRenderer`.
 */
export const setRenderer = (
  newRenderer: THREE.WebGLRenderer,
  fitToContainer = true,
  pixelRatio: number | undefined = 1
): void => {
  if (renderer) container.removeChild(renderer.domElement);
  if (fitToContainer)
    newRenderer.setSize(containerSize.width, containerSize.height);
  if (pixelRatio) newRenderer.setPixelRatio(pixelRatio);
  container.appendChild(newRenderer.domElement);
  renderer = newRenderer;
};

setRenderer(new THREE.WebGLRenderer({ antialias: true }));

/**
 * Replaces the current renderer with a new `WebGLRenderer` with
 * `preserveDrawingBuffer: true`.
 */
export const preserveDrawingBuffer = (): void =>
  setRenderer(
    new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
  );
