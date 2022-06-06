import { SphereGeometry, Mesh, PositionalAudio } from 'three';
import * as Tone from 'tone';

class SphereWithSoundAndForce {
  constructor(material, radius, listener, scene, physics, loop) {
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

    // const reverb = new Tone.Reverb({
    //   decay: 0.8
    // }).toDestination();

    // const reverb = new Tone.Freeverb({
    //   roomSize: 0.1,
    //   dampening: 10000,
    // }).toDestination();

    // const filter = new Tone.Filter({
    //   type : 'highpass',
    //   frequency : 600
    // }).toDestination();

    this.synth = new Tone.Synth({
      // sine, square, triangle, sawtooth
      oscillator : {
        type: 'sine'
      },
      envelope: {
        attack: 0.001,
        decay: 0.001,
        sustain: 0.2,
        release: 0.4,
      }
    });

    // this.synth.chain(filter);

    this.positionalAudio.setNodeSource(this.synth);
    this.mesh.add(this.positionalAudio);

    this.mesh.body.on.collision((otherObject, event) => {
      if (event === 'start') {

        let v = 0;
        // ceeling or floor
        if (otherObject.position.x === 0 && otherObject.position.z === 0) {
          v = this.mesh.body.velocity.y;
        }

        // left or right wall
        if (otherObject.position.z === 0 && otherObject.position.x !== 0 && otherObject.position.y !== 0) {
          v = this.mesh.body.velocity.x;
        }

        // front or back wall
        if (otherObject.position.x === 0 && otherObject.position.y !== 0 && otherObject.position.z !== 0) {
          v = this.mesh.body.velocity.z;
        }

        let vNormalized = Math.pow(Math.abs(v), 1/2);
        // if (vNormalized > 1) vNormalized = 1;
        this.playSound(vNormalized, this.mesh.body.ammo.threeObject.geometry.boundingSphere.radius);
      }
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

  playSound(v, size) {
    const treshold = 0.004;
    if (v > treshold) {
      const f = 250 - (size * 100 * 2);
      const now = Tone.immediate();
      this.synth.triggerAttackRelease(f, 0.001, now, v); 
    }
  }
}

export { SphereWithSoundAndForce };