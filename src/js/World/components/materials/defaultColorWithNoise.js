import { Vector2, MeshStandardMaterial } from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorTexture   = new URL('/assets/public/textures/noise/uniform-noise_color_3.png', import.meta.url);
const normalTexture  = new URL('/assets/public/textures/noise/uniform-noise_normal_4.png', import.meta.url);

const defaultColorWithNoise = (color, envmap) => {
  const repeat = 1;
  const colorMap = textureHandler(colorTexture, repeat);
  const normalMap = textureHandler(normalTexture, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    color: color,
    roughness: 1,
    metalness: 0.4,

    map: colorMap,
    normalMap: normalMap,
		normalScale: new Vector2(0.6, 0.6),
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  defaultColorWithNoise
};