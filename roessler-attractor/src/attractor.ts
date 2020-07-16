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

    // roessler
    this.rotation.x = -0.22 * 2 * Math.PI;
    this.position.y = -10;

    // roessler 2
    // this.rotation.x = -0.2 * 2 * Math.PI;
    // this.rotation.z = 0.2 * 2 * Math.PI;
    // this.position.x = -8;
    // this.position.y = -10;

    // lorentz
    // this.rotation.x = -0.25 * 2 * Math.PI;
    // this.rotation.z = 0.4 * 2 * Math.PI;
    // this.position.y = -20;
    // this.position.z = -20;
  }

  update(): void {
    for (const particle of this.particles) particle.update();
  }
}
