var camera, scene, renderer;
var group;


function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x090b33, 5, 50);  //加入霧 景深明顯 5~50 看的到霧
     renderer = new THREE.WebGLRenderer({
        antialias: true // 渲染毛邊會比較少
    });
    renderer.setSize(window.innerWidth, window.innerHeight); //渲染器尺寸
    renderer.shadowMap.enable = true;  // 開啟陰影

    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 100 ); 
    camera.position.set(16, 10, 12);
    camera.lookAt(scene.position);//預設(0, 0, 0)

    group = new THREE.Object3D();  //物件群組
    scene.add(group);

    function generateBall(r, widthSegments , heightSegments , color, name, x, y, z) {

        var SphereGeometry = new THREE.SphereGeometry( r, widthSegments, heightSegments );  // 半徑,邊數  邊數越高越逼近圓形
        var sphereMaterial = new THREE.MeshLambertMaterial( {color: color} ); //這個材質要新增光才看的到
        var sphere = new THREE.Mesh( SphereGeometry, sphereMaterial );
        sphere.name = name;
        sphere.position.set(x || 0, y || 0, z || 0);
        group.add(sphere);
        return sphere;

    }


    for(var i = 0; i<1; i++) {
    
        var ballColor ="#f24";
        r = 3;
        x = 0;
        y = -15;
        z = 0 ;


        generateBall(r, 25, 30, ballColor, "ball", x, y, z);

    }



    var ambientLight = new THREE.AmbientLight("#333");
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); //0.5 是強度  //平行燈
    scene.add(directionalLight);

    var spotLight = new THREE.SpotLight( "#fff" );  // 聚光燈
    spotLight.position.set( -20, 20, 10 );
    spotLight.castShadow = true;
    scene.add(spotLight);


    //綁定控制攝影機 
    cameraControl = new THREE.OrbitControls(camera);

}

init();

function render() {


    renderer.render(scene, camera);  //渲染器去渲染場景從camera的角度

    //更新攝影機
    cameraControl.update();


    group.position.y += 0.01;


    requestAnimationFrame(render);

}

render();

window.addEventListener("resize", function() {

    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

})