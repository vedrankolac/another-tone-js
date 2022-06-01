## threejs-material-boilerplate
Boilerplate for a fast start with three.js materials in ammo physics engine on Oculus Quest 2 VR headset.
- only tested on Oculus Quest 2
- movement is controlled with joystick

### Quick start
```
npm i
npm run copy-assets-to-dist
npm start
````

### How to Ammo with Parcel
To use Ammo successfully, be sure to have the library (https://github.com/kripken/ammo.js/tree/main/builds) in your assets folder. Use the commands below to use the version of library from the project assets folder.
```
# to copy assets to dist
npm run copy-assets-to-dist

# to copy assets to build
npm run copy-assets-to-build
````

#### GitHub Page
https://birdlaketree.github.io/threejs-material-boilerplate/

### How to deploy for github pages
```bash
rm -r build
npm run build
npm run copy-assets-to-build
npm run deploy
```

### How to inspect in immersive mode
- Open Oculus Developer Hub (it automatically runs ADB and you can use it over WiFi)
- Use Oculus browser to run content (not tested with Firefox Reality)
- Use Chrome to debug `chrome://inspect/#devices`
