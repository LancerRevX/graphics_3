let renderer = new THREE.WebGLRenderer();
document.getElementById('canvas').appendChild( renderer.domElement );

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

let sphere = new THREE.Mesh();
sphere.material = new THREE.MeshNormalMaterial();
sphere.material.flatShading = true;
scene.add(sphere);

let width, height;

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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

    sphere.geometry = new THREE.SphereBufferGeometry(
        document.getElementById('radius_input').value,
        document.getElementById('width_segments_input').value,
        document.getElementById('height_segments_input').value
    );
    renderer.render(scene, camera);    
}