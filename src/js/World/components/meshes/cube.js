import { BoxGeometry, Mesh } from 'three';

const cube = (material, width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) => {
  const geometry = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
  const mesh = new Mesh( geometry, material );
  // const speed = Math.random() + 0.4;

  mesh.tick = (delta) => {
    // mesh.rotation.x += delta * speed;
    // mesh.rotation.y += delta * speed;
  };

  return mesh;
}

export { cube };