import {Math, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, Vector2 } from 'three';
import { dirtyConcrete } from '../materials/dirtyConcrete';

const createWalls = (scene, size = 20, envmap = null) => {
  const material = dirtyConcrete(0x3333ff, envmap);
  const geometry = new PlaneGeometry(size, size, 4, 4);
  geometry.attributes.uv2 = geometry.attributes.uv; // second uv is needed for aoMap

  const floor = new Mesh( geometry, material );
  floor.receiveShadow = true;
  floor.rotation.x = Math.degToRad(270);
  scene.add(floor);

  const ceeling = new Mesh( geometry, material );
  ceeling.receiveShadow = true;
  ceeling.rotation.x = Math.degToRad(90);
  ceeling.position.y = size;
  scene.add(ceeling);

  const wallLeft = new Mesh( geometry, material );
  wallLeft.receiveShadow = true;
  wallLeft.rotation.y = Math.degToRad(90);
  wallLeft.position.x = -size/2;
  wallLeft.position.y = size/2;
  scene.add(wallLeft);

  const wallRight = new Mesh( geometry, material );
  wallRight.receiveShadow = true;
  wallRight.rotation.y = Math.degToRad(270);
  wallRight.position.x = size/2;
  wallRight.position.y = size/2;
  scene.add(wallRight);

  const wallFront = new Mesh( geometry, material );
  wallFront.receiveShadow = true;
  wallFront.rotation.y = Math.degToRad(180);
  wallFront.position.x = 0;
  wallFront.position.y = size/2;
  wallFront.position.z = size/2;
  scene.add(wallFront);

  const wallBack = new Mesh( geometry, material );
  wallBack.receiveShadow = true;
  wallBack.position.x = 0;
  wallBack.position.y = size/2;
  wallBack.position.z = -size/2;
  scene.add(wallBack);
}

export { createWalls };