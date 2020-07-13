/**
 * ---- Core animation process ------------------------------------------------
 */

import { timePerFrame } from "./fps-settings";
import { renderer, scene, camera } from "./instances";

let run = () => {};

/**
 * Sets a function to be run in every frame.
 */
export const runEveryFrame = (f: () => void) => {
  run = f;
};

let lastTimestamp = performance.now();

const animate = () => {
  requestAnimationFrame(animate);

  const currentTimestamp = performance.now();
  const elapsedTime = currentTimestamp - lastTimestamp;

  if (elapsedTime > timePerFrame) {
    lastTimestamp = currentTimestamp - (elapsedTime % timePerFrame);

    run();
    renderer.render(scene, camera);
  }
};

animate();
