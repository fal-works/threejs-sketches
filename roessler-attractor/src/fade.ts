import * as THREE from "three";

export const createFadeMesh = (
  opacity: number,
  color = 0x000000,
  planeSize = 10,
  z = -0.1,
  renderOrder = -1
): THREE.Mesh => {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  });
  const geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.z = z;
  mesh.renderOrder = renderOrder;

  return mesh;
};
