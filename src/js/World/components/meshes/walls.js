import {Math, PlaneGeometry, Mesh } from 'three';
import { WDotsScratchHairCleaner } from '../materials/WDotsScratchHairCleaner';
import { WallNoise } from '../materials/WallNoise';
import { solidLight } from '../materials/solidLight';

const createWalls = (scene, size = 20, envmap = null) => {
  const materialWall = WallNoise(0xffffff, envmap, 0.8);
  const materialFloor = WDotsScratchHairCleaner(0xffffff, envmap, 0.08);
  const materialCeeling = solidLight(0xffffff, 0xffffff);
  const geometry = new PlaneGeometry(size, size, 4, 4);
  geometry.attributes.uv2 = geometry.attributes.uv; // second uv is needed for aoMap

  const floor = new Mesh( geometry, materialFloor );
  floor.receiveShadow = true;
  floor.rotation.x = Math.degToRad(270);
  scene.add(floor);

  const ceeling = new Mesh( geometry, materialCeeling );
  ceeling.receiveShadow = true;
  ceeling.rotation.x = Math.degToRad(90);
  ceeling.position.y = size;
  scene.add(ceeling);

  const wallLeft = new Mesh( geometry, materialWall );
  wallLeft.receiveShadow = true;
  wallLeft.rotation.y = Math.degToRad(90);
  wallLeft.position.x = -size/2;
  wallLeft.position.y = size/2;
  scene.add(wallLeft);

  const wallRight = new Mesh( geometry, materialWall );
  wallRight.receiveShadow = true;
  wallRight.rotation.y = Math.degToRad(270);
  wallRight.position.x = size/2;
  wallRight.position.y = size/2;
  scene.add(wallRight);

  const wallFront = new Mesh( geometry, materialWall );
  wallFront.receiveShadow = true;
  wallFront.rotation.y = Math.degToRad(180);
  wallFront.position.x = 0;
  wallFront.position.y = size/2;
  wallFront.position.z = size/2;
  scene.add(wallFront);

  const wallBack = new Mesh( geometry, materialWall );
  wallBack.receiveShadow = true;
  wallBack.position.x = 0;
  wallBack.position.y = size/2;
  wallBack.position.z = -size/2;
  scene.add(wallBack);
}

export { createWalls };