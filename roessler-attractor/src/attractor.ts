import * as THREE from "three";
import { Particle } from "./particle";

const particleCount = 256;

export class Attractor extends THREE.Object3D {
  readonly particles: Particle[] = [];

  constructor() {
    super();

    for (let i = 0; i < particleCount; i += 1) {
      const particle = new Particle(
        -5 + 10 * Math.random(),
        -5 + 10 * Math.random(),
        2 * Math.random()
      );
      this.particles.push(particle);
      this.add(particle.line);
    }

    this.rotation.x = -0.22 * 2 * Math.PI;
    this.position.y = -10;
  }

  update(): void {
    for (const particle of this.particles) particle.update();
  }
}
