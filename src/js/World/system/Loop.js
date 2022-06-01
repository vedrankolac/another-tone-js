import { Clock } from 'three';

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.clock = new Clock();
    this.physics = undefined;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  setPhysics(physics) {
    this.physics = physics;
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = this.clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
    
    if (this.physics) {
      this.physics.update(delta * 1000);
      // this.physics.updateDebugger();
    }
  }
}

export { Loop };
