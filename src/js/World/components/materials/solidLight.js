import {
  MeshStandardMaterial
} from 'three';

const solidLight = (color, emissive) => {
  const parameters = {
    color: color,
    roughness: 1,
    metalness: 0,
    emissive: emissive
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  solidLight
};