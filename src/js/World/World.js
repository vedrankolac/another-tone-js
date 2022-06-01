import { Color, Group } from "three";
import { createColor } from "./utils/createColor.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { sphere } from './components/meshes/sphere.js';
import { sphereWithAppliedForce } from "./components/meshes/sphereWithAppliedForce.js";
import { cube } from "./components/meshes/cube";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';
import { roomComposition } from './components/compositions/roomComposition.js';
import { createWalls } from './components/meshes/walls.js'

import { defaultColorMattPlastic } from "./components/materials/defaultColorMattPlastic.js";
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";
import { defaultColorWithNoise } from "./components/materials/defaultColorWithNoise.js";

// import { bentPlane } from "./components/materials/bentPlane.js";
// import { frostedPlastic } from "./components/materials/frostedPlastic.js";
// import { steelWithSchratches } from "./components/materials/steelWithScratches.js";
// import { superDotsGum } from "./components/materials/superDotsGum.js";
// import { checkerPatternGreen } from "./components/materials/checkerPatternGreen.js";

const hdrURL = new URL('/assets/copyrighted/hdr/studio_small_08_1k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    this.vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(this.vrControls);
    this.floorSize = 12;
    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.a16');
    this.physics = new AmmoPhysics(this.scene);
    // physics.debug.enable(true);
    this.loop.setPhysics(this.physics);
    const room = roomComposition(this.physics, this.floorSize, false);
    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.b20');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);
    this.walls = createWalls(this.scene, this.floorSize, envmap);
    const spreadWidth = 10;

    // hands physics controller
    const handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);

    // spheres with force

    const colorMaterial2 = defaultColorShinyPlastic(
      createColor(0.62, 1, 0.5),
      envmap
    );

    for (let i = 0; i < 8; i++) {
      const sphereItem = sphereWithAppliedForce(colorMaterial2, Math.random()/4 + 0.2);
      sphereItem.castShadow = true;
      sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      sphereItem.position.y = Math.random() + 2;
      sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      this.scene.add(sphereItem); 
      this.physics.add.existing(sphereItem);
      this.loop.updatables.push(sphereItem);
      sphereItem.body.setBounciness(1);
    }

    // spheres

    // const colorMaterial1 = defaultColorShinyPlastic(
    //   createColor(0.72, 1, 0.5),
    //   envmap
    // );

    // for (let i = 0; i < 2; i++) {
    //   const sphereItem = sphere(colorMaterial1, Math.random()/4 + 0.2);
    //   sphereItem.castShadow = true;
    //   sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   sphereItem.position.y = Math.random() + 2;
    //   sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   this.scene.add(sphereItem); 
    //   this.physics.add.existing(sphereItem);
    //   sphereItem.body.setBounciness(1);
    // }

    // white cubes

    // const whiteMaterial = defaultColorWithNoise(
    //   createColor(0, 1, 1),
    //   envmap
    // );

    // for (let i = 0; i < 4; i++) {
    //   const cubeItem = cube(whiteMaterial, Math.random() * 1 + 0.2, Math.random() * 1.6 + 0.2, Math.random() * 1 + 0.2);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    //   cubeItem.body.setBounciness(0.96);
    // }

    // black cubes

    // const blackMaterial = defaultColorWithNoise(
    //   createColor(0, 0, 0.06),
    //   envmap
    // );

    // for (let i = 0; i < 4; i++) {
    //   const cubeItem = cube(blackMaterial, Math.random() * 1 + 0.2, Math.random() * 1.6 + 0.2, Math.random() * 1 + 0.2);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    //   cubeItem.body.setBounciness(0.96);
    // }

    // // blue cubes

    // const blueMaterial = defaultColorWithNoise(
    //   createColor(0.6, 1, 0.5),
    //   envmap
    // );

    // for (let i = 0; i < 4; i++) {
    //   const cubeItem = cube(blueMaterial, Math.random() * 1 + 0.2, Math.random() * 1.4 + 0.2, Math.random() * 1 + 0.2);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // frosted cubes

    // const frostedPlasticMaterial = frostedPlastic(
    //   createColor(0.4, 1, 1),
    //   envmap
    //   );

    // for (let i = 0; i < 1; i++) {
    //   const cubeItem = cube(frostedPlasticMaterial, 1, 1, 1);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // // frosted cubes

    // const frostedPlasticColoredMaterial = frostedPlastic(
    //   createColor(0.1, 0.8, 0.8),
    //   envmap
    //   );

    // for (let i = 0; i < 12; i++) {
    //   const cubeItem = cube(frostedPlasticColoredMaterial, 1, 1, 1);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // // frosted spheres

    // const magentaMaterial = frostedPlastic(
    //   createColor(0.4, 0, 0.8),
    //   envmap
    // );

    // for (let i = 0; i < 8; i++) {
    //   const sphereItem = sphere(magentaMaterial, Math.random()/4 + 0.2);
    //   sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   sphereItem.position.y = Math.random() + 2;
    //   sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   this.scene.add(sphereItem); 
    //   this.physics.add.existing(sphereItem);
    // }

    // const steelMaterial = steelWithSchratches(
    //   createColor(0, 1, 1),
    //   envmap
    // );

    // for (let i = 0; i < 8; i++) {
    //   const cubeItem = cube(steelMaterial, 0.5, 1, 0.5);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // const superDotsGumMaterial = superDotsGum(
    //   createColor(0, 1, 1),
    //   envmap
    // );

    // for (let i = 0; i < 8; i++) {
    //   const cubeItem = cube(superDotsGumMaterial, 1, 1, 1);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // const checkerPatternGreenMaterial = checkerPatternGreen(
    //   createColor(0, 1, 1),
    //   envmap
    // );

    // for (let i = 0; i < 8; i++) {
    //   const cubeItem = cube(checkerPatternGreenMaterial, 0.5, 0.5, 0.5);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

    // bent plane

    // const bentPlaneMaterial = bentPlane(
    //   createColor(0, 1, 0),
    //   envmap
    // );

    // for (let i = 0; i < 8; i++) {
    //   const cubeItem = cube(bentPlaneMaterial, 1, 1, 0.9);
    //   cubeItem.castShadow = true;
    //   cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.position.y = Math.random() + 2;
    //   cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   cubeItem.rotation.x = Math.random();
    //   cubeItem.rotation.y = Math.random();
    //   cubeItem.rotation.z = Math.random();
    //   this.scene.add(cubeItem);
    //   this.physics.add.existing(cubeItem);
    // }

  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };