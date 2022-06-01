import {
  MeshStandardMaterial
} from 'three';

const defaultColorMattPlastic = (color, envmap) => {
  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    color: color,
    roughness: 1,
    metalness: 0,
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  defaultColorMattPlastic
};