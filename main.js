// import './style.css'

import * as THREE from './assets/build/three.module.js';

import { OBJLoader } from './assets/jsm/loaders/OBJLoader.js';

document.addEventListener('scroll', (e) => {
  let title = document.getElementById('header-title')
  let description = document.getElementById('description')
  if (document.body.scrollHeight - window.screen.height > 80 ) {
    title.className = window.scrollY > 48 ? "centered" : ""
    description.className = window.scrollY > 48 ? 'hide' : ""      
  }
})



let container;
let camera, scene, renderer;
let windowHalfX, windowHalfY, mouseX, mouseY
let object;
let zoomIn = false;


init();
animate();


function init() {
  container = document.createElement( 'div' );
  document.getElementById('model').appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 30000 );
  camera.position.z = 3500;
  // camera.position.y = 2500;

  // scene
  scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight( 0x25a2e3, 0.4 );
  scene.add( ambientLight );
  const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  // manager

  function loadModel() {
    object.rotation.x = -(Math.PI/4) - (Math.PI/8) 
    object.position.y = -100
    if (window.innerWidth < 700) {
      camera.position.z += 500
    }

    scene.add( object );
  }

  const manager = new THREE.LoadingManager( loadModel );
  manager.onProgress = function ( item, loaded, total ) {
    $('#placeholder').hide()
  };

  // texture
  // const textureLoader = new THREE.TextureLoader( manager );
  // const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );

  // model
  function onProgress( xhr ) {
    if ( xhr.lengthComputable ) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete > 99) {
        $('#placeholder')[0].innerText = 'Finishing up...'
      } else if (percentComplete > 50) {
        $('#placeholder')[0].innerText = 'Almost there...'
      }
    }

  }

  function onError() {}

  // load object
  const loader = new OBJLoader( manager );
  loader.load( './assets/models/Chair.obj', function ( obj ) {
    object = obj;
  }, onProgress, onError );


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(0xffffff, 1)
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  if (object) {
    object.rotation.z = ((Math.PI/2))*percent
    if (zoomIn) {
      while(camera.position.z > (window.innerWidth > 700 ? 2500 : 3000)) {
        camera.position.z -= 0.1
      }
    } else {
      while(camera.position.z < 3500) {
        camera.position.z += 0.1
      }
    }
  }
  renderer.render( scene, camera );
}
  

$('.cube-icon')
  .off('click')
  .on('click', () => {
    $('#description').addClass('hide')
    $('.cancel-icon').show()
    $('.cancel-icon').removeClass('hide')
    $('.cube-icon').addClass('hide')
    $('.cube-icon').hide()
    $('.back-btn').css('visibility', 'hidden')
    setTimeout(() => {
      $('.wrap').show()
      $('.wrap').addClass('show')
    }, 1000);
    zoomIn = true
})

$('.cancel-icon')
  .off('click')
  .on('click', () => {
    $('#description').removeClass('hide')
    $('.cancel-icon').hide()
    $('.cancel-icon').addClass('hide')
    $('.cube-icon').removeClass('hide')
    $('.cube-icon').show()
    $('.wrap').hide()
    $('.wrap').removeClass('show')
    $('.back-btn').css('visibility', 'inherit')  
    zoomIn = false
})


