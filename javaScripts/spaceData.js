//(function() {
    //Gather Asteroid API Data
    var asteroids = [];

    function getAPIdata() {
            $.ajax({
                url: 'http://www.asterank.com/api/asterank?query={%22name%22:{%22$ne%22:%22%22}}&limit=1000'
            }).then(function(response) {
                asteroids = response;
                return response;
            });
        }
        //getAPIdata();

    //Set the scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 200000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Make Planets/Sun
    var makePlanets = function(planetData) {
        var geometry = new THREE.SphereGeometry(planetData.r, 64, 64);
        var texture = THREE.ImageUtils.loadTexture(planetData.img);
        texture.minFilter = THREE.NearestFilter;
        var material = new THREE.MeshBasicMaterial({
            map: texture
        });
        var sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(planetData.x, planetData.y, planetData.z);
        return sphere;
    };

    //planet data
    var sun = {
        r: 7, // radius 69.58 
        x: 0, 
        y: 0,
        z: 0,
        v: new THREE.Vector3(0, 0, 0), // velocity
        img: "/img/sun.jpg"
    };
    var mercury = {
        r: .244,
        x: 57.9,
        y: 0,
        z: 0,
        v: new THREE.Vector3(0, 0, 47.4),
        img: "/img/mercury.jpg"
    };
    var venus = {
    	r: .6052,
    	x:108.2,
    	y:0,
    	z:0,
    	v: new THREE.Vector3(0, 0, 35),
    	img: "/img/venus.jpg"
    };
    var earth = {
    	r: .6371,
    	x:149.6,
    	y:0,
    	z:0,
    	v:new THREE.Vector3(0, 0, 39.8),
    	img: "/img/earth.jpg"
    };
    var mars = {
    	r: .339,
    	x:227.9,
    	y:0,
    	z:0,
    	v:new THREE.Vector3(0, 0, 24.1),
    	img: "/img/mars.jpg"
    };
    var jupiter = {
    	r: 6.9911,
    	x:778.6,
    	y:0,
    	z:0,
    	v:13.1,
    	img: "/img/jupiter.jpg"
    };
    var saturn = {
    	r: 5.8232,
    	x:1433.5,
    	y:0,
    	z:0,
    	v:new THREE.Vector3(0, 0, 9.7),
    	img: "/img/saturn.jpg"
    };
    var uranus = {
    	r: 2.5362,
    	x:2872.5,
    	y:0,
    	z:0,
    	v:new THREE.Vector3(0, 0, 6.8),
    	img: "/img/Uranus.png"
    };
    var neptune = {
    	r: 2.4622,
    	x:4495.1,
    	y:0,
    	z:0,
    	v:new THREE.Vector3(0, 0, 5.4),
    	img: "/img/neptune.jpg"
    }
    var Sun = makePlanets(sun);
    var Mercury = makePlanets(mercury);
    var Venus = makePlanets(venus);
    var Earth = makePlanets(earth);
    var Mars = makePlanets(mars);
    var Jupiter = makePlanets(jupiter);
    var Saturn = makePlanets(saturn);
    var Uranus = makePlanets(uranus);
    var Neptune = makePlanets(neptune);

    var planets = [];
    planets.push(Mercury);
    planet.push(Venus);
    planet.push(Earth);
    planet.push(Mars);
    planet.push(Jupiter);
    planet.push(Saturn);
    planet.push(Uranus);
    planet.push(Neptune);
    //Set planets in orbit	

    function orbit(){
    	for (var i = 0; i < planets.length; planets++){
    		
    	}
    }




    //gravitational constant
    var G = 6.67384e-11;
    var sunMass = 1.989E30;

    function getAcceleration(distance) {
        return G * sunMass / (Math.pow(distance, 2));
    }

    var MercuryVelocity = getAcceleration(57.9);
    var VenusVelocity = getAcceleration(108.2);
    var EarthVelocity = getAcceleration(149.6);
    var MarsVelocity = getAcceleration(227.9);
    var JupiterVelocity = getAcceleration(778.6);
    var SaturnVelocity = getAcceleration(1433.5);
    var UranusVelocity = getAcceleration(2872.5);
    var NeptuneVelocity = getAcceleration(4495.1);


    //Make Asteroids

    //render scene
    scene.add(Sun);
    scene.add(Mercury);

    camera.position.set(0,0,50);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Renders the scene and updates the render as needed.
    function animate() {

          // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
          requestAnimationFrame(animate);
    
          // Render the scene.
          renderer.render(scene, camera);
          orbit();
          controls.update();

    }
    animate();
//})();
