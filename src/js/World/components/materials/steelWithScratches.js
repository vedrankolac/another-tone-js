import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const normalTexture       = new URL('/assets/copyrighted/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Normal.jpg', import.meta.url);
const roughnessTexture    = new URL('/assets/copyrighted/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Roughness.jpg', import.meta.url);
const metalnessTexture    = new URL('/assets/copyrighted/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Metalness.jpg', import.meta.url);
const aoTexture           = new URL('/assets/copyrighted/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_ao.jpg', import.meta.url);

const steelWithSchratches = (color, envmap) => {
  const aoMap = textureHandler(aoTexture);
  const normalMap = textureHandler(normalTexture);
  const roughnessMap = textureHandler(roughnessTexture);
  const metalnessMap = textureHandler(metalnessTexture);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 0.9,

    color: color,
    clearcoat: 0,

    aoMap: aoMap,

    normalMap: normalMap,
		normalScale: new Vector2( 0.1, 0.1 ),

    roughnessMap: roughnessMap,
    roughness: 0.3,

    metalnessMap: metalnessMap,
    metalness: 0.98,
  }

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export { steelWithSchratches };