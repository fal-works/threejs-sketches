import { Vector3, Line, BufferGeometry, LineBasicMaterial } from "three";

const pointCount = 8;
const timeScale = 0.005;

const color = 0x0020a0; // blue
// const color = 0xa00020; // red
const material = new LineBasicMaterial({ color });

const copyVector3 = (src: Vector3, dest: Vector3): void => {
  dest.x = src.x;
  dest.y = src.y;
  dest.z = src.z;
};

const roesslerField = {
  a: 0.2, // 2 * Math.random(),
  b: 0.2, // 2 * Math.random(),
  c: 5.7, // 5 * Math.random(),
};

const updatePositionRoessler = (current: Vector3, target: Vector3): void => {
  const { x, y, z } = current;
  const { a, b, c } = roesslerField;
  const dx = timeScale * (-y - z);
  const dy = timeScale * (x + a * y);
  const dz = timeScale * (b + (x - c) * z);
  target.set(x + dx, y + dy, z + dz);
};

// const lorentzField = {
//   p: 10,
//   r: 23,
//   b: 8 / 3,
// };

// const updatePositionLorentz = (current: Vector3, target: Vector3): void => {
//   const { x, y, z } = current;
//   const { p, r, b } = lorentzField;
//   const dx = timeScale * p * (-x + y);
//   const dy = timeScale * (x * (-z + r) - y);
//   const dz = timeScale * (x * y - b * z);
//   target.set(x + dx, y + dy, z + dz);
// };

const updatePosition = updatePositionRoessler;

export class Particle {
  readonly points: Vector3[] = [];
  readonly line: Line;

  constructor(x = 0.0, y = 0.0, z = 0.0) {
    for (let i = 0; i < pointCount; i += 1)
      this.points.push(new Vector3(x, y, z));

    this.line = new Line(new BufferGeometry(), material);
  }

  update(): void {
    const points = this.points;

    const endI = pointCount - 1;
    copyVector3(points[endI], points[0]);
    for (let i = 0; i < endI; i += 1) updatePosition(points[i], points[i + 1]);

    this.line.geometry.dispose();
    this.line.geometry = new BufferGeometry().setFromPoints(this.points);
  }
}
