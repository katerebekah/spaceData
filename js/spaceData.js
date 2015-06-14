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
        getAPIdata();

    //Set the scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerHeight / window.innerHeight, 0.1, 200000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight, window.innerHeight);
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
        sphere.v = planetData.v;
        return sphere;
    };

    //planet data
    var sun = {
        r: 140, // radius 695,800 km
        x: 0, 
        y: 0,
        z: 0,
        v: new THREE.Vector3(0, 0, 0), // velocity
        img: "/img/sun.jpg"
    };
    var mercury = {
        r: 2.44, // 2,440
        x: 57.9 + sun.r,
        y: 0,
        z: 0,
        s: 1, //orbit speed ratio
        v: new THREE.Vector3(0, 0, 47.4),
        img: "/img/mercury.jpg"
    };
    var venus = {
    	r: 6.052,
    	x:108.2 + sun.r,
    	y:0,
    	z:0,
    	s:2.55,
    	v: new THREE.Vector3(0, 0, 35),
    	img: "/img/venus.jpg"
    };
    var earth = {
    	r: 6.371,
    	x:149.6 + sun.r,
    	y:0,
    	z:0,
    	s:4.51,
    	v:new THREE.Vector3(0, 0, 39.8),
    	img: "/img/earth.jpg"
    };
    var mars = {
    	r: 3.39,
    	x:227.9 + sun.r,
    	y:0,
    	z:0,
    	s:7.81,
    	v:new THREE.Vector3(0, 0, 24.1),
    	img: "/img/mars.jpg"
    };
    var jupiter = {
    	r: 69.911,
    	x:778.6 + sun.r,
    	y:0,
    	z:0,
    	s: 49.22,
    	v:13.1,
    	img: "/img/jupiter.jpg"
    };
    var saturn = {
    	r: 58.232,
    	x:1433.5 + sun.r,
    	y:0,
    	z:0,
    	s:122.13,
    	v:new THREE.Vector3(0, 0, 9.7),
    	img: "/img/saturn.jpg"
    };
    var uranus = {
    	r: 25.362,
    	x:2872.5 + sun.r,
    	y:0,
    	z:0,
    	s:347.6,
    	v:new THREE.Vector3(0, 0, 6.8),
    	img: "/img/Uranus.png"
    };
    var neptune = {
    	r: 24.622,
    	x:4495.1 + sun.r,
    	y:0,
    	z:0,
    	s:679.55,
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

    time = 0;
    function orbit(){
    	time += .1;
    	Mercury.position.set(mercury.x* Math.cos(time/mercury.s), mercury.x* Math.sin(time/mercury.s), 0);
    	Venus.position.set(venus.x* Math.cos(time/venus.s), venus.x* Math.sin(time/venus.s), 0);
    	Earth.position.set(earth.x* Math.cos(time/earth.s), earth.x* Math.sin(time/earth.s), 0);
    	Mars.position.set(mars.x* Math.cos(time/mars.s), mars.x* Math.sin(time/mars.s), 0);
    	Jupiter.position.set(jupiter.x*Math.cos(time/jupiter.s), jupiter.x*Math.sin(time/jupiter.s), 0);
    	Saturn.position.set(saturn.x* Math.cos(time/saturn.s), saturn.x* Math.sin(time/saturn.s), 0);
    	Uranus.position.set(uranus.x* Math.cos(time/uranus.s), uranus.x* Math.sin(time/uranus.s), 0);
    	Neptune.position.set(neptune.x* Math.cos(time/neptune.s), neptune.x* Math.sin(time/neptune.s), 0);
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
    scene.add(Venus);
    scene.add(Earth);
    scene.add(Mars);
    scene.add(Jupiter);
    scene.add(Saturn);
    scene.add(Uranus);
    scene.add(Neptune);

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
