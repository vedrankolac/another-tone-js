import { Color, Group, AudioLoader } from "three";
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
import { SphereWithSoundAndForce } from "./components/meshes/SphereWithSoundAndForce.js";
import { cube } from "./components/meshes/cube";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator, AudioListener } from 'three';
import { roomComposition } from './components/compositions/roomComposition.js';
import { createWalls } from './components/meshes/walls.js'
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";
import * as Tone from 'tone';

const soundURL = new URL('/assets/public/sounds/ping_pong.mp3', import.meta.url);
// const hdrURL = new URL('/assets/copyrighted/hdr/studio_small_08_1k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.listener = new AudioListener();
    this.camera.add(this.listener);
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
    this.physics = new AmmoPhysics(this.scene, { maxSubSteps: 6, fixedTimeStep: 1 / 30 });
    console.log(this.physics);

    // physics.debug.enable(true);
    this.loop.setPhysics(this.physics);
    this.room = roomComposition(this.physics, this.floorSize, false);
    // new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
    this.buildScene(null);
  }

  buildScene(hdrmap) {
    console.log('buildScene.b41');
    // const envmaploader = new PMREMGenerator(this.renderer);
    // const envmap = envmaploader.fromCubemap(hdrmap);
    const envmap = { texture: null };

    this.walls = createWalls(this.scene, this.floorSize, envmap);
    this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);

    const newContext = new Tone.Context(this.listener.context);
    console.log('newContext.updateInterval', newContext.updateInterval, newContext.lookAhead);
    newContext.updateInterval = 0;
    newContext.lookAhead = 0;
    console.log('newContext.updateInterval', newContext.updateInterval, newContext.lookAhead);
    Tone.setContext(newContext);

    const colorMaterial2 = defaultColorShinyPlastic(
      createColor(0.62, 1, 0.04),
      envmap
    );

    const audioLoader = new AudioLoader();
    audioLoader.load(soundURL, (buffer) => {
      for (let i = 0; i < 3; i++) {
        const sphereItem = new SphereWithSoundAndForce(colorMaterial2, Math.random()/5 + 0.1, this.listener, this.scene, this.physics, this.loop, buffer);
      }
    });
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };