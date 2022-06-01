import { Vector2, MeshPhysicalMaterial } from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl            = new URL('/assets/public/textures/bent-plane/deform-plane_color.png', import.meta.url);
const normalMapUrl           = new URL('/assets/public/textures/bent-plane/deform-plane_2_normal.png', import.meta.url);
const roughnessMapUrl        = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const metalnessMapUrl     = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const aoMapUrl            = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const alphaMapUrl         = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const bumpMapUrl          = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const emissiveMapUrl      = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const displacementMapUrl  = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const clearcoatMapUrl     = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const transmissionMapUrl  = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);

const template = (color, envmap) => {
  const repeat = 1;
  const colorMap = textureHandler(colorMapUrl, repeat);
  const normalMap = textureHandler(normalMapUrl, repeat);
  const roughnessMap = textureHandler(roughnessMapUrl, repeat);
  // const metalnessMap = textureHandler(metalnessMapUrl, repeat);
  // const aoMap = textureHandler(aoMapUrl, repeat);
  // const alphaMap = textureHandler(alphaMapUrl, repeat);
  // const bumpMap = textureHandler(bumpMapUrl, repeat);
  // const emissiveMap = textureHandler(emissiveMapUrl, repeat);
  // const displacementMap = textureHandler(displacementMapUrl, repeat);
  // const clearcoatMap = textureHandler(clearcoatMapUrl, repeat);
  // const transmissionMap = textureHandler(transmissionMapUrl, repeat);

  const parameters = {
    // STANDARD

    envMap: envmap.texture,
    envMapIntensity: 1,

    color: color,
    map: colorMap,

    roughness: 0.56,
    roughnessMap: roughnessMap,

    normalMap: normalMap,
		normalScale: new Vector2(1, 1),

    // aoMap: aoMap,
    // aoMapIntensity:

    // bumpMap: bumpMap,
    // bumpScale:

    // emissive:
    // emissiveMap: emissiveMap,

    // displacementMap
    // displacementScale
    // displacementBias

    // metalness: 0,
    // metalnessMap: metalnessMap,

    // alphaMap: alphaMap,

    // PHYSICAL

    // clearcoat:
    // clearcoatMap: clearcoatMap,
    // clearcoatRoughness:
    // clearcoatRoughnessMap:
    // clearcoatNormalScale: 
    // clearcoatNormalMap:

    // reflectivity:
    // ior:

    // sheen:
    // sheenColor:
    // sheenRoughness:

    // transmission:
    // transmissionMap: transmissionMap,
    // attenuationDistance:
    // attenuationColor:

    // specularIntensity:
    // specularColor:
    // specularIntensityMap:
    // specularColorMap:
  } 

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {
  template
};