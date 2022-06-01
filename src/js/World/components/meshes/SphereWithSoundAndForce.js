import { SphereGeometry, Mesh, PositionalAudio } from 'three';
import * as Tone from 'tone';

class SphereWithSoundAndForce {
  constructor(material, radius, listener, scene, physics, loop, buffer) {
    this.geometry = new SphereGeometry(radius, 64, 64);

    const spreadWidth = 10;
    this.mesh = new Mesh(this.geometry, material );
    this.mesh.castShadow = true;
    this.mesh.position.x = Math.random() * spreadWidth - spreadWidth/2;
    this.mesh.position.y = Math.random() + 2;
    this.mesh.position.z = Math.random() * spreadWidth - spreadWidth/2;

    scene.add(this.mesh); 
    physics.add.existing(this.mesh);
    loop.updatables.push(this.mesh);

    this.mesh.body.setBounciness(1);
    this.mesh.body.checkCollisions = true;

    this.positionalAudio = new PositionalAudio(listener);
    // this.synth = new Tone.Synth({
    //   oscillator : {
    //     type: 'sine'
    //   },
    //   // envelope: {
    //   //   attack: 0.001,
    //   //   decay: 0.02,
    //   //   sustain: 1,
    //   //   release: 0.2,
    //   // }
    // });
    // this.positionalAudio.setNodeSource(this.synth);
    this.positionalAudio.setBuffer(buffer);
    this.mesh.add(this.positionalAudio);

    this.mesh.body.on.collision((otherObject, event) => {
      if (event === 'start') {
      // if (event === 'start') {
        // console.log('start', this.mesh.body.velocity.y);
        this.playSound();
      }
      // console.log('start', sphereItem.body.velocity.y);
      // console.log('start', sphereItem.body.ammo.threeObject.geometry.boundingSphere.radius, sphereItem.body.position.y);
    })

    this.mesh.tick = (delta) => {
      if (this.mesh.body) {
        const forceRange = 60;
        const force = {
          x: Math.random() * forceRange - forceRange/2,
          y: Math.random() * forceRange/2,
          z: Math.random() * forceRange - forceRange/2
        }
  
        const treshold = Math.random();
        // if threshold and if on the ground
        // if ((treshold < 0.004) && ((this.mesh.position.y - radius) < 0.01)) {
        if ((treshold < 0.04) && ((this.mesh.position.y - radius) < 0.01)) {
          this.mesh.body.applyForce(force.x, force.y, force.z);
          // mesh.body.needUpdate = true;
        }
      }
    };
  }

  getMesh() {
    return this.mesh;
  }

  playSound() {
    // this.synth.triggerAttackRelease('E6', '64n');
    this.positionalAudio.isPlaying = false;
    this.positionalAudio.play();
  }
}

export { SphereWithSoundAndForce };