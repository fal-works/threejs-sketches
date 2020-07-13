/**
 * ---- Main ------------------------------------------------------------------
 */

import * as THREE from "three";
import {
  scene,
  camera,
  renderer,
  preserveDrawingBuffer,
  runEveryFrame,
} from "./core";
import { createFadeMesh } from "./fade";
import { Attractor } from "./attractor";

preserveDrawingBuffer();
renderer.autoClearColor = false;
scene.add(createFadeMesh(0.03, 0xffffff, 100));
scene.background = new THREE.Color(0xffffff);

// camera.fov = 70;
camera.position.z = 40;

const attractor = new Attractor();
scene.add(attractor);

runEveryFrame(() => {
  attractor.update();
});
