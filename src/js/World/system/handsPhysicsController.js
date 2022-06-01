import { Group } from 'three';
import { sphere } from '../components/meshes/sphere';
import { createColor } from '../utils/createColor';
import { defaultColorMattPlastic } from '../components/materials/defaultColorMattPlastic';

const createHandsPhysicsController = (scene, physics, vrControls, envMap) => {
  const handleMaterial = defaultColorMattPlastic(
    createColor(0, 1, 1),
    envMap
  );

  const handDistance = 0;

  const rightHandController = new Group();
  // const rightHandAnchor = sphere(handleMaterial, 0.04);
  // rightHandAnchor.position.z = 0;
  // rightHandAnchor.visible = false;
  // rightHandController.add(rightHandAnchor);
  const rightHandAsset = sphere(handleMaterial, 0.04);
  rightHandAsset.position.z = handDistance;
  rightHandAsset.castShadow = true;
  rightHandController.add(rightHandAsset);

  scene.add(rightHandController);
  physics.add.existing(rightHandController);
  rightHandController.visible = false;
  rightHandController.body.setCollisionFlags(1);
  rightHandController.body.setBounciness(0.9);
  vrControls.addAssetToRightHand(rightHandController);

  const leftHandController = new Group();
  const leftHandAsset = sphere(handleMaterial, 0.04);
  leftHandAsset.position.z = handDistance;
  leftHandAsset.castShadow = true;
  leftHandController.add(leftHandAsset);

  scene.add(leftHandController);
  physics.add.existing(leftHandController);
  leftHandController.visible = false;
  leftHandController.body.setCollisionFlags(1);
  leftHandController.body.setBounciness(0.9);
  vrControls.addAssetToLeftHand(leftHandController);
}

export { createHandsPhysicsController };