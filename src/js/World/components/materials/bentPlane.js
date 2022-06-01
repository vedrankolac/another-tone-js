import { Vector2, MeshPhysicalMaterial } from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl      = new URL('/assets/public/textures/bent-plane/deform-plane_color.png', import.meta.url);
const normalMapUrl     = new URL('/assets/public/textures/bent-plane/deform-plane_2_normal.png', import.meta.url);
const roughnessMapUrl  = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);

const bentPlane = (color, envmap) => {
  const repeat = 1;
  const colorMap = textureHandler(colorMapUrl, repeat);
  const normalMap = textureHandler(normalMapUrl, repeat);
  const roughnessMap = textureHandler(roughnessMapUrl, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    color: color,

    roughnessMap: roughnessMap,
    roughness: 0.56,

    metalness: 0,

    clearcoat: 1,
    clearcoatMap: roughnessMapUrl,

    map: colorMap,
    normalMap: normalMap,
		normalScale: new Vector2(1, 1),
  } 
  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {
  bentPlane
};