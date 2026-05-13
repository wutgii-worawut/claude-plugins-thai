// Brutalist Terminal — Three.js wireframe geometry scene
// Floating wireframe cubes / octahedrons / dodecahedrons in phosphor green
// Respects prefers-reduced-motion + tab visibility

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Skip scene
} else {
  import('three').then(THREE => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e0a, 0.035);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Wireframe materials — phosphor green + amber
    const phosphorMat = new THREE.LineBasicMaterial({ color: 0x80c080, transparent: true, opacity: 0.55 });
    const phosphorBrightMat = new THREE.LineBasicMaterial({ color: 0xa0e6a0, transparent: true, opacity: 0.7 });
    const amberMat = new THREE.LineBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.5 });

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

    // Layout: cubes, octahedrons, dodecahedrons scattered
    const geometries = [
      () => new THREE.BoxGeometry(1, 1, 1),
      () => new THREE.OctahedronGeometry(0.8, 0),
      () => new THREE.DodecahedronGeometry(0.7, 0),
      () => new THREE.IcosahedronGeometry(0.75, 0),
      () => new THREE.TetrahedronGeometry(0.9, 0),
    ];

    const mats = [phosphorMat, phosphorBrightMat, phosphorMat, amberMat, phosphorMat];

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

    // Plus a grid floor far back
    const gridHelper = new THREE.GridHelper(40, 40, 0x2a3a30, 0x1d2620);
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
        // Wrap
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
