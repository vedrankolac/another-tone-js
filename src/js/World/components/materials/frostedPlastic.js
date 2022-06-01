import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorTexture        = new URL('/assets/public/textures/noise/uniform-noise_color_3.png', import.meta.url);
const normalTexture       = new URL('/assets/public/textures/noise/uniform-noise_normal_5.png', import.meta.url);
const transmissionTexture = new URL('/assets/public/textures/noise/uniform-noise_color_3.png', import.meta.url);

const frostedPlastic = (color, envmap) => {
  const repeat = 1;
  const colorMap = textureHandler(colorTexture, repeat);
  const normalMap = textureHandler(normalTexture, repeat);
  const transmissionMap     = textureHandler(transmissionTexture, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,

    color: color,
    map: colorMap,
    
    metalness: 0,
    
    transmissionMap: transmissionMap,
    transmission: 0.9,
    reflectivity: 0,

    roughness: 0.8,
    ior: 1.38, // from 1.0 to 2.333
    thickness: 0.1,

    normalMap: normalMap,
		normalScale: new Vector2(1, 1),
  }
  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {frostedPlastic};