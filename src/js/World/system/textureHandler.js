import {
  TextureLoader,
  RepeatWrapping
} from 'three';

const textureHandler = (textureUrl, repeat = 1) => {
  const loader = new TextureLoader();
  const texture = loader.load(
    textureUrl,
    txtr => {
      // console.log('loaded', txtr);
    },
    e => {
      // console.log('progress', e);
    },
    e => {
      // console.log('error', e);
    },
  );

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.x = repeat;
  texture.repeat.y = repeat;
  return texture;
}

export { textureHandler };