import { Vector2, MeshPhysicalMaterial } from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl            = new URL('/assets/public/textures/noise/uniform-noise_color_3.png', import.meta.url);
const normalMapUrl           = new URL('/assets/public/textures/noise/uniform-noise_normal_4.png', import.meta.url);
const roughnessMapUrl        = new URL('/assets/copyrighted/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Roughness.jpg', import.meta.url);
// const metalnessMapUrl     = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const aoMapUrl            = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const alphaMapUrl         = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const bumpMapUrl          = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const emissiveMapUrl      = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const displacementMapUrl  = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const clearcoatMapUrl     = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);
// const transmissionMapUrl  = new URL('/assets/copyrighted/textures/10_W_Dots_Scratch_Hair_Cleaner/uniform-noise_color_3.png', import.meta.url);

const WallNoise = (color, envmap, envMapIntensity = 1) => {
  const repeat = 4;
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
    envMapIntensity: envMapIntensity,

    color: color,
    map: colorMap,

    // roughness: 1,
    roughnessMap: roughnessMap,

    normalMap: normalMap,
		normalScale: new Vector2(-0.2, -0.2),

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
  WallNoise
};