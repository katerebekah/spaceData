/* global THREE */
(function () {
      
      // Set up the scene, camera, and renderer as global variables.
      var scene, camera, renderer, controls;

      init();
      animate();

      // Sets up the scene.
      function init() {

            // Create the scene and set the scene size.
            scene = new THREE.Scene();
            var WIDTH = $('#container').width(),
                  HEIGHT = $('#container').height();
          
            // Create a renderer and add it to the DOM.
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(WIDTH, HEIGHT);
            $("#container").append(renderer.domElement);

            // Create a camera, zoom it out from the model a bit, and add it to the scene.
            camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
            camera.position.set(0, 6, 0);
            scene.add(camera);

            // Create an event listener that resizes the renderer with the browser window.
            window.addEventListener('resize', function () {
                 var WIDTH = $('#container').width(),
                  HEIGHT = $('#container').height();
                  renderer.setSize(WIDTH, HEIGHT);
                  camera.aspect = WIDTH / HEIGHT;
                  camera.updateProjectionMatrix();
            });
      

            // Create a light and add it to the scene
            var light = new THREE.PointLight(0xffffff, 1, 0);
            light.position.set(50, 50, 50);
            scene.add(light);


            var texture = THREE.ImageUtils.loadTexture("js/mars.jpg");
            texture.minFilter = THREE.NearestFilter;
      
            // Load in the mesh and add it to the scene.
            var geometry = new THREE.SphereGeometry(1.8, 32, 32);
            var material = new THREE.MeshPhongMaterial({ map: texture });
            var earthMesh = new THREE.Mesh(geometry, material);
            scene.add(earthMesh);
            // Add OrbitControls so that we can pan around with the mouse.
            controls = new THREE.OrbitControls(camera, renderer.domElement);

      }


      // Renders the scene and updates the render as needed.
      function animate() {

            // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
            requestAnimationFrame(animate);
      
            // Render the scene.
            renderer.render(scene, camera);
            controls.update();

      }
})();
