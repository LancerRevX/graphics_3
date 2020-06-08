let renderer = new THREE.WebGLRenderer();
document.getElementById('canvas').appendChild( renderer.domElement );

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

let sphere = new THREE.Mesh();
sphere.material = new THREE.MeshStandardMaterial();
sphere.material.flatShading = true;
sphere.material.map = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg');
scene.add(sphere);

let light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(0, 0, 1000);
scene.add(light1);

let light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 0, -1000);
scene.add(light2);

let light3 = new THREE.DirectionalLight(0xffffff, 0.5);
light3.position.set(0, 1000, 0);
scene.add(light3);

let light4 = new THREE.DirectionalLight(0xffffff, 0.5);
light4.position.set(0, -1000, 0);
scene.add(light4);

let width, height;

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let distance = 512;
let mouse_down = false;
let last_mouse_position = {x: 0, y: 0};
let theta = 0;
let phi = 0;
document.onmousedown = function(event) {
    mouse_down = true;
    last_mouse_position.x = event.clientX;
    last_mouse_position.y = event.clientY;
};
document.onmouseup = function() {
    mouse_down = false;
};
document.getElementById('canvas').onmousemove = function(event) {
    if (mouse_down) {
        theta += -((event.clientX - last_mouse_position.x) * 0.5);
        phi += ((event.clientY - last_mouse_position.y) * 0.5);
        last_mouse_position.x = event.clientX;
        last_mouse_position.y = event.clientY;
        
        camera.position.x = distance * Math.sin( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.position.y = distance * Math.sin( phi * Math.PI / 360 );
        camera.position.z = distance * Math.cos( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        document.getElementById('camera_x_input').value = camera.position.x;
        document.getElementById('camera_y_input').value = camera.position.y;
        document.getElementById('camera_z_input').value = camera.position.z;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }
};

(window.onresize = function() {
    renderer.setSize(0, 0);
    width = document.getElementById('canvas').clientWidth;
    height = document.getElementById('canvas').clientHeight;
    renderer.setSize(width, height);
    renderer.render(scene, camera);  
})()

document.getElementById('build_button').onclick = function() {
    let projection_select = document.getElementById('projection_select');
    switch (projection_select.options[projection_select.selectedIndex].value) {
        case 'parallel':
            camera = new THREE.OrthographicCamera(
                width / -2, width / 2,
                height / 2, height / -2,
                1, 1000
            );
            break;
        case 'perspective':
            camera = new THREE.PerspectiveCamera(
                45, width / height, 1, 1000
            );
            break;
    }

    camera.position.x = document.getElementById('camera_x_input').value;
    camera.position.y = document.getElementById('camera_y_input').value;
    camera.position.z = document.getElementById('camera_z_input').value;
    camera.lookAt(0, 0, 0);

    let camera_position = new THREE.Vector3();
    camera.getWorldPosition(camera_position);
    distance = camera_position.distanceTo(new THREE.Vector3(0, 0, 0))
    phi = 0;
    theta = 0;
    

    sphere.geometry = new THREE.SphereBufferGeometry(
        document.getElementById('radius_input').value,
        document.getElementById('width_segments_input').value,
        document.getElementById('height_segments_input').value
    );
    renderer.render(scene, camera);    
}