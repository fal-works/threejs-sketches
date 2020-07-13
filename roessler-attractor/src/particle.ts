import { Vector3, Line, BufferGeometry, LineBasicMaterial } from "three";

const pointCount = 8;

const material = new LineBasicMaterial({ color: 0x0020a0 });

const roesslerField = {
  a: 0.2,
  b: 0.2,
  c: 5.7,
};

const timeScale = 0.005;

const copyVector3 = (src: Vector3, dest: Vector3): void => {
  dest.x = src.x;
  dest.y = src.y;
  dest.z = src.z;
};

const updatePosition = (current: Vector3, target: Vector3): void => {
  const { x, y, z } = current;
  const { a, b, c } = roesslerField;
  const dx = timeScale * (-y - z);
  const dy = timeScale * (x + a * y);
  const dz = timeScale * (b + (x - c) * z);
  target.set(x + dx, y + dy, z + dz);
};

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
