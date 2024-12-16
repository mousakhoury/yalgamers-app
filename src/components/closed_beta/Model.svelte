<script>
	// @ts-nocheck

	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

	let container;

	onMount(() => {
		let scene, camera, renderer, model, controls, mixer;
		let clock = new THREE.Clock();

		// Scene setup
		scene = new THREE.Scene();

		// Camera setup
		camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.set(2, 0, 7); // Adjust camera position based on model size

		// Renderer setup with alpha to support transparency
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Light setup
		const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
		scene.add(light);

		const light2 = new THREE.DirectionalLight(0xffffff, 7);
		light2.position.set(2, 2, 2).normalize();
		scene.add(light2);

		// Load GLTF model
		const loader = new GLTFLoader();
		loader.load('/model/Website 3d models.glb', function (gltf) {
			model = gltf.scene;

			// Compute bounding box and center of the model
			const box = new THREE.Box3().setFromObject(model);
			const center = box.getCenter(new THREE.Vector3());
			const size = box.getSize(new THREE.Vector3());

			// Adjust the scale so the model fits within the container
			const scale = Math.min(
				(container.clientWidth / size.x) * 0.012,
				(container.clientHeight / size.y) * 0.012
			);
			model.scale.set(scale, scale, scale);

			// Center the model by adjusting its position
			model.position.set(-center.x, -center.y - 1, -center.z);

			scene.add(model);

			// Set up animation mixer
			if (gltf.animations && gltf.animations.length > 0) {
				mixer = new THREE.AnimationMixer(model);
				gltf.animations.forEach((clip) => {
					mixer.clipAction(clip).play();
				});
			}

			animate();
		});

		// OrbitControls setup
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true; // Enable damping (inertia)
		controls.dampingFactor = 0.25;
		controls.enableZoom = false; // Disable zooming
		controls.screenSpacePanning = false;
		controls.minDistance = 1;
		controls.maxDistance = 10;

		// Constrain rotation to only horizontal (left to right)
		controls.minPolarAngle = Math.PI / 2; // Lock to the horizontal plane
		controls.maxPolarAngle = Math.PI / 2; // Lock to the horizontal plane

		controls.autoRotate = false; // Disable auto-rotation

		// Disable right-click zooming
		controls.mouseButtons = {
			LEFT: THREE.MOUSE.ROTATE,
			MIDDLE: THREE.MOUSE.PAN,
			RIGHT: null // Disable right-click functionality
		};

		// Prevent context menu on right-click
		container.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});

		// Prevent context menu on right-click
		container.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});

		// Handle window resize
		window.addEventListener('resize', onWindowResize);

		function onWindowResize() {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		}

		// Animation loop
		function animate() {
			requestAnimationFrame(animate);

			const delta = clock.getDelta();
			if (mixer) mixer.update(delta);

			controls.update(); // Only required if controls.enableDamping is set to true
			renderer.render(scene, camera);
		}
	});
</script>

<div class="model-3d" bind:this={container} />

<style>
	.model-3d {
		width: 100%;
		height: 100%;
	}
</style>
