"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { withBase } from "../lib/base";

export default function CenterSculpture({ spinRef }: { spinRef: MutableRefObject<number> }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let running = true;
    let cleanup: (() => void) | undefined;

    const init = () => {
      if (!running) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentMap = pmrem.fromScene(environment, 0.04).texture;
      scene.environment = environmentMap;
      environment.dispose();

      scene.add(new THREE.HemisphereLight(0xf4f8ff, 0x526175, 1.8));
      const key = new THREE.DirectionalLight(0xffffff, 4.2);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x9fbaff, 3.1);
      rim.position.set(-4, 1, -3);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);
      let model: THREE.Object3D | null = null;
      let animationFrame = 0;
      let lastSpin = spinRef.current;

      const resize = () => {
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      new GLTFLoader().load(withBase("/models/silver-sculpture.glb"), (gltf) => {
        model = gltf.scene;
        const silver = new THREE.MeshPhysicalMaterial({
          color: 0xdce2eb,
          metalness: 1,
          roughness: 0.16,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          envMapIntensity: 1.55,
          side: THREE.DoubleSide,
        });
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = silver;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        model.position.sub(center);
        // This scan's accessor bounds exclude the raised hood/head geometry. The
        // raw bounds therefore place the visible figure too high and clip it at
        // the top of the WebGL canvas. Shift the scan down and keep a little more
        // framing room so the complete sculpture remains centered at every size.
        model.position.y -= size.y * 0.44;
        const scale = 2.32 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        group.add(model);
        host.classList.add("is-loaded");
        // 模型加载完成后设置初始角度并渲染首帧
        group.rotation.y = spinRef.current;
        group.rotation.x = -0.08 + Math.sin(spinRef.current * 0.45) * 0.035;
        renderer.render(scene, camera);
      });

      const render = () => {
        if (!running) return;
        // 关键优化：只在旋转角度发生"明显"变化时渲染一帧。
        // 首页主循环每帧都会写入 spinRef（含极慢的漂移量），若每次都渲染
        // 会变成每帧全量渲染 11MB 模型，占满主线程导致切换卡死。
        // 阈值 0.0015 弧度：滚动/交互驱动的旋转远超此值照常渲染，
        // 肉眼不可见的静止漂移则跳过，渲染开销趋近于零。
        if (model && !document.hidden && Math.abs(spinRef.current - lastSpin) > 0.0015) {
          lastSpin = spinRef.current;
          group.rotation.y += (lastSpin - group.rotation.y) * 0.055;
          group.rotation.x = -0.08 + Math.sin(lastSpin * 0.45) * 0.035;
          renderer.render(scene, camera);
        }
        animationFrame = window.requestAnimationFrame(render);
      };

      animationFrame = window.requestAnimationFrame(render);

      // 切回页面时补一帧，避免画面停留在旧角度
      const onVisibility = () => {
        if (!document.hidden && model && running) renderer.render(scene, camera);
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanup = () => {
        running = false;
        window.cancelAnimationFrame(animationFrame);
        document.removeEventListener("visibilitychange", onVisibility);
        resizeObserver.disconnect();
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((material) => material.dispose());
          }
        });
        environmentMap.dispose();
        pmrem.dispose();
        // 关键：THREE 的 dispose 不释放 WebGL context，必须手动 lose，
        // 否则反复切换页面会耗尽 Chrome 的 context 上限，导致新页面
        // WebGL 初始化阻塞主线程（表现为切换后页面卡死）
        renderer.getContext().getExtension("WEBGL_lose_context")?.loseContext();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // 浏览器空闲后再初始化 WebGL，避免与视频背景抢资源导致首屏卡顿
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(init, { timeout: 2500 });
    } else {
      window.setTimeout(init, 1500);
    }

    return () => {
      running = false;
      cleanup?.();
    };
  }, [spinRef]);

  return <div className="center-sculpture" ref={hostRef} aria-hidden="true" />;
}
