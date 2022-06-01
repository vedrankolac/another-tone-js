import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl           = new URL('/assets/copyrighted/textures/Checker_Pattern_Green_01/Checker_Pattern_Green_01_Diffuse.jpeg', import.meta.url);
const normalMapUrl          = new URL('/assets/copyrighted/textures/Checker_Pattern_Green_01/Checker_Pattern_Green_01_Normal.jpeg', import.meta.url);
const roughnessMapUrl       = new URL('/assets/copyrighted/textures/Checker_Pattern_Green_01/Checker_Pattern_Green_01_ReflRoughness.jpeg', import.meta.url);
const displacementMapUrl    = new URL('/assets/copyrighted/textures/Checker_Pattern_Green_01/Checker_Pattern_Green_01_Displacement.jpeg', import.meta.url);

const checkerPatternGreen = (color, envmap) => {
  const repeat = 1;
  const colorMap = textureHandler(colorMapUrl, repeat);
  const normalMap = textureHandler(normalMapUrl, repeat);
  const roughnessMap = textureHandler(roughnessMapUrl, repeat);
  const displacementMap = textureHandler(displacementMapUrl, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 0.6,

    map: colorMap,
    // color: color,

    normalMap: normalMap,
		normalScale: new Vector2( 1, 1 ),

    roughnessMap: roughnessMap,
    // roughness: 0.3,

    // displacementMap: displacementMap,
  }

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export { checkerPatternGreen };