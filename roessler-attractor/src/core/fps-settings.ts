/**
 * ---- FPS settings ----------------------------------------------------------
 */

/**
 * Current FPS.
 */
export let fps: number;

/**
 * Time per frame in milliseconds under the current FPS.
 */
export let timePerFrame: number;

/**
 * Current time scale based on 60 FPS.
 *
 * `1.0` if 60 FPS, `2.0` if 30 FPS.
 */
export let timeScale: number;

/**
 * Changes the FPS.
 */
export const setFps = (framesPerSecond: number): void => {
  fps = framesPerSecond;
  timePerFrame = 1000.0 / framesPerSecond;
  timeScale = 60.0 / framesPerSecond;
};

setFps(60.0);
