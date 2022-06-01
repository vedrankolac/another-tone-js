import { Vector2, MeshStandardMaterial } from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl      = new URL('/assets/copyrighted/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Albedo.jpg', import.meta.url);
const aoMapUrl         = new URL('/assets/copyrighted/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_AO.jpg', import.meta.url);
const normalMapUrl     = new URL('/assets/copyrighted/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Normal.jpg', import.meta.url);
const roughnessMapUrl  = new URL('/assets/copyrighted/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Roughness.jpg', import.meta.url);

const dirtyConcrete = (color, envmap) => {
  const repeat = 4;
  const colorMap = textureHandler(colorMapUrl, repeat);
  const aoMap = textureHandler(aoMapUrl, repeat);
  const normalMap = textureHandler(normalMapUrl, repeat);
  const roughnessMap = textureHandler(roughnessMapUrl, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    // color: 0x3333ff,
    // side: DoubleSide,
    // roughness: 0.8,
    // metalness: 0,
    map: colorMap,
    aoMap: aoMap,
    normalMap: normalMap,
    normalScale: new Vector2(1.0, 1.0),
    roughnessMap: roughnessMap
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  dirtyConcrete
};


