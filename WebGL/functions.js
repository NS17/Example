function request() {
  $.ajax({
    url: "http://" + adress + ":3490/",
    jsonpCallback: 'callback',
    dataType: 'jsonp',
    success: function(json) {
      Building = json.Building;
      userID = json.userID;
      draw();
      // alert('done');
    },
    error: function (e) {
      alert(e);
    }
  });
}


function init(Building) {
  render = new THREE.WebGLRenderer();
  render.setSize(window.innerWidth, window.innerHeight);
  render.setClearColor(0xEEEEEE);
  document.body.appendChild(render.domElement);
  render.shadowMapEnabled = true;
  camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 10000);
  camera.position.x = Camera[0];
  camera.position.y = Camera[1];
  camera.position.z = Camera[2];

  scene = new THREE.Scene();
  var look = new THREE.Vector3(0, 0, 1);
  look.addVectors(camera.position, direction);
  camera.lookAt(look);

  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);
  draw(Building);
  animate();

  var instructions = document.body;
  var element = document.body;

  instructions.addEventListener('click', function(event) {

    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

    if (/Firefox/i.test(navigator.userAgent)) {

      var fullscreenchange = function(event) {

        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
          document.removeEventListener('fullscreenchange', fullscreenchange);
          document.removeEventListener('mozfullscreenchange', fullscreenchange);
          element.requestPointerLock();
        }
      }

      document.addEventListener('fullscreenchange', fullscreenchange, false);
      document.addEventListener('mozfullscreenchange', fullscreenchange, false);

      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

      if (element.requestFullscreen == element.mozRequestFullscreen)
        element.mozRequestFullscreen({
          vrDisplay: vrHMD
        });
      else
        element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
  }, false);
  return scene;
}


function draw(Building) {
  for (i = 0; i < Building.length; i++) {
    if (Building[i].colour == "Blue") {
      Building[i].colour = 0x7777ff;
    }
    if (Building[i].colour == "Red") {
      Building[i].colour = 0xff0000;
    }
  

  }

  for (i = 0; i < Building.length; i++) {
    if( scene.getObjectById(Building[i].id, true) )
      continue;

    if (Building[i].type == "plane") {
      Geometry[i] = new THREE.PlaneGeometry(Building[i].size[0], Building[i].size[1]);
      if (Building[i].colour == "texture") {
        Texture[i] = new THREE.ImageUtils.loadTexture(Building[i].texture);
        Texture[i].anisotropy = render.getMaxAnisotropy();
        Material[i] = new THREE.MeshLambertMaterial({
          map: Texture[i]
        });
      } else {
        Material[i] = new THREE.MeshLambertMaterial({
          color: Building[i].colour,
          wireframe: false
        });
      }
      Mesh[i] = new THREE.Mesh(Geometry[i], Material[i]);
      Mesh[i].receiveShadow = true;
      Mesh[i].rotation.x = Building[i].rotation[0];
      Mesh[i].rotation.y = Building[i].rotation[1];
      Mesh[i].rotation.z = Building[i].rotation[2];
      Mesh[i].position.x = Building[i].position[0];
      Mesh[i].position.y = Building[i].position[1];
      Mesh[i].position.z = Building[i].position[2];
      VecPosition[i] = new THREE.Vector3(0,0,0);
      Border[i] =0;
    }

    if (Building[i].type == "sphere") {
      Geometry[i] = new THREE.SphereGeometry(Building[i].size[0], Building[i].size[1], Building[i].size[2]);
      if (Building[i].colour == "texture") {
        Texture[i] = new THREE.ImageUtils.loadTexture(Building[i].texture);
        Texture[i].anisotropy = render.getMaxAnisotropy();
        Material[i] = new THREE.MeshLambertMaterial({
          map: Texture[i]
        });
      } else {
        Material[i] = new THREE.MeshLambertMaterial({
          color: Building[i].colour,
          wireframe: false
        });
      }

      Mesh[i] = new THREE.Mesh(Geometry[i], Material[i]);
      Mesh[i].castShadow = true;
      Geometry[i].computeFaceNormals();
      Geometry[i].computeVertexNormals();
      Mesh[i].position.x = Building[i].position[0];
      Mesh[i].position.y = Building[i].position[1];
      Mesh[i].position.z = Building[i].position[2];
      Mesh[i].rotation.x = Building[i].rotation[0];
      Mesh[i].rotation.y = Building[i].rotation[1];
      Mesh[i].rotation.z = Building[i].rotation[2];
      Mesh[i].scale.x = Building[i].scale[0];
      Mesh[i].scale.y = Building[i].scale[1];
      Mesh[i].scale.z = Building[i].scale[2];
      VecPosition[i] = new THREE.Vector3(Mesh[i].position.x, Mesh[i].position.y,  Mesh[i].position.z);
    Border[i] = Building[i].size[0] +1 ;
    }
    if (Building[i].type == "light") {
      Mesh[i] = new THREE.SpotLight(0xffffff);
      Mesh[i].position.set(Building[i].position[0], Building[i].position[1], Building[i].position[2]);
      Mesh[i].castShadow = true;
      scene.add(Mesh[i]);
      VecPosition[i] = new THREE.Vector3(0,0,0);
      Border[i] =0;
    }

    if (Building[i].type == "cube") {
      Geometry[i] = new THREE.CubeGeometry(Building[i].size[0], Building[i].size[1], Building[i].size[2]);
      if (Building[i].colour == "texture") {
        Texture[i] = new THREE.ImageUtils.loadTexture(Building[i].texture);
        Texture[i].anisotropy = render.getMaxAnisotropy();
        Material[i] = new THREE.MeshLambertMaterial({
          map: Texture[i]
        });
      } else {
        Material[i] = new THREE.MeshLambertMaterial({
          color: Building[i].colour
        });
      }


      Mesh[i] = new THREE.Mesh(Geometry[i], Material[i]);
      Mesh[i].position.x = Building[i].position[0];
      Mesh[i].position.y = Building[i].position[1];
      Mesh[i].position.z = Building[i].position[2];
      Mesh[i].rotation.x = Building[i].rotation[0];
      Mesh[i].rotation.y = Building[i].rotation[1];
      Mesh[i].rotation.z = Building[i].rotation[2];
      Mesh[i].scale.x = Building[i].scale[0];
      Mesh[i].scale.y = Building[i].scale[1];
      Mesh[i].scale.z = Building[i].scale[2];
      Mesh[i].castShadow = true;
      VecPosition[i] = new THREE.Vector3(Mesh[i].position.x, Mesh[i].position.y,  Mesh[i].position.z);
Border[i] = Math.sqrt(Math.sqrt(Math.pow(Building[i].size[0],2)+Math.pow(Building[i].size[1],2))+Math.pow(Building[i].size[2],2)) + 0.1;
    }

    if (Building[i].type == "NotStandart") {
      Vertices.length = 0;
      Faces.length = 0;
      j = 0;
      k = 0;
      while (j != Building[i].vertices.length) {
        Vertices[k] = new THREE.Vector3(Building[i].vertices[j], Building[i].vertices[j + 1], Building[i].vertices[j + 2]);
        k++;
        j = j + 3;
      }
      j = 0;
      k = 0;
      while (j != Building[i].faces.length) {
        Faces[k] = new THREE.Face3(Building[i].faces[j], Building[i].faces[j + 1], Building[i].faces[j + 2]);
        k++;
        j = j + 3;
      }

      Geometry[i] = new THREE.Geometry();
      Geometry[i].vertices = Vertices;
      Geometry[i].faces = Faces;
      Geometry[i].computeCentroids();
      Geometry[i].mergeVertices();
      Geometry[i].computeFaceNormals();
      if (Building[i].colour == "texture") {
        Texture[i] = new THREE.ImageUtils.loadTexture(Building[i].texture);
        Texture[i].anisotropy = render.getMaxAnisotropy();
        Material[i] = new THREE.MeshLambertMaterial({
          map: Texture[i]
        });
      } else {
        Material[i] = new THREE.MeshLambertMaterial({
          color: Building[i].colour,
          wireframe: false
        });
      }

      Mesh[i] = new THREE.Mesh(Geometry[i], Material[i]);
      Mesh[i].castShadow = true;
      Mesh[i].position.x = Building[i].position[0];
      Mesh[i].position.y = Building[i].position[1];
      Mesh[i].position.z = Building[i].position[2];
      Mesh[i].rotation.x = Building[i].rotation[0];
      Mesh[i].rotation.y = Building[i].rotation[1];
      Mesh[i].rotation.z = Building[i].rotation[2];
      Mesh[i].scale.y = Building[i].scale[0];
      Mesh[i].scale.x = Building[i].scale[1];
      Mesh[i].scale.z = Building[i].scale[2];
      VecPosition[i] = new THREE.Vector3(0,0,0);
      Border[i] =0;
    }
    Mesh[i].id = Building[i].id;
    scene.add(Mesh[i]);
  }
}

function animate() {
  requestAnimationFrame(animate);
  render.render(scene, camera);
}

function AddCube(x, y, z) {
  var cubeSize = 4;
                var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
                var Texture = new THREE.ImageUtils.loadTexture('kl.jpg');
                Texture.anisotropy = render.getMaxAnisotropy();
                var cubeMaterial = new THREE.MeshLambertMaterial({map:Texture});
                //var cubeMaterial = new THREE.MeshLambertMaterial({color:  0xffffff });
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.position.x=x;
                cube.position.y= y;
                cube.position.z=z;
                cubeBorder[cubeNumber] = Math.sqrt(Math.sqrt(Math.pow(cubeSize,2)+Math.pow(cubeSize,2))+Math.pow(cubeSize,2)) + 2;
                cubeVector[cubeNumber] =  new THREE.Vector3(cube.position.x, cube.position.y,  cube.position.z);
                cubeNumber++;

  //d = userID + objCounter;
  d=5000;
  cube.id = d;
  objCounter++;

  scene.add(cube);

  x = x.toPrecision(3);
  y = y.toPrecision(3);
  z = z.toPrecision(3);
  $.ajax({
    url: "http://" + adress + ":3490/",
    jsonpCallback: 'callback',
    dataType: 'jsonp',
    data: {
      cubeSize, x, y, z, d
    },
    success: function(json) {}
  });
}

function onMouseDown(e) {
  var vectorMouse = new THREE.Vector3(-(window.innerWidth / 2 - e.clientX) * 2 / window.innerHeight, (window.innerHeight / 2 - e.clientY) * 2 / window.innerHeight, -1 / Math.tan(22.5 * Math.PI / 180)); //22.5 is half of camera frustum angle 45 degree
  vectorMouse.applyQuaternion(camera.quaternion);
  vectorMouse.normalize();
  vectorMouse.multiplyScalar(10);
  a = new THREE.Vector3();

  a.addVectors(camera.position, vectorMouse);
  AddCube(a.x, a.y, a.z);
}

function handleKeyDown(event){
                //You can uncomment the next line to find out what keycode goes to which key
                //alert(event.keyCode);
               
                 if(event.keyCode == 37)
                {
                    //Left Arrow Key
                    var yVector = new THREE.Vector3(0, 1, 0);
                    direction.applyAxisAngle(yVector, 0.1);
                    var look = new THREE.Vector3(0, 0, 1);
                    look.addVectors(camera.position, direction);
                    camera.lookAt(look);
                
                }
                else
                 if(event.keyCode == 38)
                {
                    //Up Arrow Key
                     var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.add(direction);
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                      camera.position.add(direction);
                }
                else if(event.keyCode == 39)
                {
                    //Right Arrow Key
                    var yVector = new THREE.Vector3(0, 1, 0);
                    direction.applyAxisAngle(yVector, -0.1);
                    var look = new THREE.Vector3(0, 0, 1);
                    look.addVectors(camera.position, direction);
                    camera.lookAt(look);

                }
                else 
                    if(event.keyCode == 40)
                {
                    //Down Arrow Key
                    var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.sub(direction);
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
                      
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                    camera.position.sub(direction);
                    
                } 
                else 

                  if(event.keyCode == 33)
                {
                    //Pageup Arrow Key
                    var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.y+=0.4;
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
        
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                    camera.position.y += 0.4;

                }
                else 
                   if(event.keyCode == 34)
                {
                    //Pagedown Arrow Key
                    var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.y-=0.4;
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
                      
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                    camera.position.y -= 0.4;
                    
                }


                if(event.keyCode == 65)
                {
                    //Left Arrow Key
                    var yVector = new THREE.Vector3(0, 1, 0);
                    direction.applyAxisAngle(yVector, 0.1);
                    var look = new THREE.Vector3(0, 0, 1);
                    look.addVectors(camera.position, direction);
                    camera.lookAt(look);
                }
                else
                if(event.keyCode == 87)
                {
                    //Up Arrow Key
                     
                   var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.add(direction);
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
                     
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                      camera.position.add(direction);
                
                }
                else if(event.keyCode == 68)
                {
                    //Right Arrow Key
                    var yVector = new THREE.Vector3(0, 1, 0);
                    direction.applyAxisAngle(yVector, -0.1);
                    var look = new THREE.Vector3(0, 0, 1);
                    look.addVectors(camera.position, direction);
                    camera.lookAt(look);

                }
                else 
                   if(event.keyCode == 83)
                {
                    //Down Arrow Key
                     var collide = false;
                    for (i =0; i<scene.children.length; i++){
                      if (scene.children[i].id > 100){
                    c.copy(camera.position);
                    c.sub(direction);
                     c.sub(scene.children[i].position);
                     len = c.length();
                     Bord = 3.18;
              
                      if (len < Bord){
                        collide = true;
                        break;
                        }
                      }
                     } 
                    if(!collide)
                    camera.position.sub(direction);
                    
                } 
                
            }
document.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(event) {
  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  var yVector = new THREE.Vector3(0, 1, 0);
  var zVector = new THREE.Vector3(0, 1, 0);

  zVector.cross(direction);
  zVector.normalize();
  direction.applyAxisAngle(yVector, -movementX * 0.002);
  direction.applyAxisAngle(zVector,  movementY * 0.0007);
  var look = new THREE.Vector3(0, 0, 1);
  look.addVectors(camera.position, direction);
  camera.lookAt(look);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
}