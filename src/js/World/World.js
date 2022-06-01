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
    this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);

    const spreadWidth = 10;

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
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };