// Paper IDE — Three.js wireframe geometry scene
// Floating wireframe primitives in deep sage + amber on cream paper bg
// Respects prefers-reduced-motion + tab visibility

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // skip
} else {
  import('three').then(THREE => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf7ea, 0.03);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Wireframe materials — deep sage + amber on cream
    const sageMat = new THREE.LineBasicMaterial({ color: 0x3a5a3a, transparent: true, opacity: 0.4 });
    const sageDeepMat = new THREE.LineBasicMaterial({ color: 0x2a4528, transparent: true, opacity: 0.45 });
    const amberMat = new THREE.LineBasicMaterial({ color: 0xa86c14, transparent: true, opacity: 0.4 });

    const meshes = [];

    function addWireframe(geom, mat, scale, pos) {
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(edges, mat);
      line.scale.setScalar(scale);
      line.position.set(pos.x, pos.y, pos.z);
      line.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.0035,
        rotSpeedY: (Math.random() - 0.5) * 0.0045,
        rotSpeedZ: (Math.random() - 0.5) * 0.002,
        driftX: (Math.random() - 0.5) * 0.001,
        driftY: (Math.random() - 0.5) * 0.001,
      };
      scene.add(line);
      meshes.push(line);
    }

    const geometries = [
      () => new THREE.BoxGeometry(1, 1, 1),
      () => new THREE.OctahedronGeometry(0.8, 0),
      () => new THREE.DodecahedronGeometry(0.7, 0),
      () => new THREE.IcosahedronGeometry(0.75, 0),
      () => new THREE.TetrahedronGeometry(0.9, 0),
    ];

    const mats = [sageMat, sageDeepMat, sageMat, amberMat, sageMat];

    for (let i = 0; i < 9; i++) {
      const geomFn = geometries[i % geometries.length];
      const matIdx = i % mats.length;
      const scale = 0.85 + Math.random() * 1.4;
      const pos = {
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 14,
        z: (Math.random() - 0.5) * 8 - 2,
      };
      addWireframe(geomFn(), mats[matIdx], scale, pos);
    }

    // Soft grid floor in cream/sage
    const gridHelper = new THREE.GridHelper(40, 40, 0xd4c890, 0xe8e0c2);
    gridHelper.position.y = -6;
    gridHelper.position.z = -8;
    gridHelper.rotation.x = Math.PI / 8;
    scene.add(gridHelper);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    let running = true;
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) animate();
    });

    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      meshes.forEach(m => {
        m.rotation.x += m.userData.rotSpeedX;
        m.rotation.y += m.userData.rotSpeedY;
        m.rotation.z += m.userData.rotSpeedZ;
        m.position.x += m.userData.driftX;
        m.position.y += m.userData.driftY;
        if (m.position.x > 14) m.position.x = -14;
        if (m.position.x < -14) m.position.x = 14;
        if (m.position.y > 10) m.position.y = -10;
        if (m.position.y < -10) m.position.y = 10;
      });
      renderer.render(scene, camera);
    }
    animate();
  }).catch(err => console.warn('Three.js scene failed:', err));
}
