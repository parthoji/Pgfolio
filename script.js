/**
 * PORTFOLIO SYSTEM SCRIPTS
 * Version: 2.2.0 (ThreeJS Canvas + Swiper Matrix Overhaul + Verified Resume Stack)
 */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initSmoothScroll();
    initThreeJSBackground();
    initInteractiveGlowAndCursors();
    initTypographyEngines();
    initGSAPScrollAnimations();
    initSwiperSliders();
    initComponentTilts();
    initMagneticMechanics();
});

/* =========================================================================
   1. LOADER CONTROLLER
   ========================================================================= */
function initPreloader() {
    const bar = document.querySelector('.loader-bar');
    const loader = document.getElementById('loader');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            gsap.to(loader, {
                opacity: 0, duration: 0.6, ease: "power3.inOut",
                onComplete: () => {
                    loader.style.display = 'none';
                    triggerHeroReveal();
                }
            });
        }
        bar.style.width = `${progress}%`;
    }, 50);
}

/* =========================================================================
   2. SMOOTH SCROLL ARCHITECTURE (LENIS ENGINE)
   ========================================================================= */
let lenis;
function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);
}

/* =========================================================================
   3. THREEJS INTERACTIVE MATRIX SPACE
   ========================================================================= */
function initThreeJSBackground() {
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Stars Topology Layout Setup
    const starsCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 12;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.025, color: 0x00b4d8, transparent: true, opacity: 0.6 });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    camera.position.z = 3;

    // Relational Mouse Tracking Variables
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // Render Execution Loop Sequence
    function animate() {
        requestAnimationFrame(animate);
        starField.rotation.y += 0.001;
        starField.rotation.x += 0.0005;

        // Smooth Interpolated Matrix Tilts
        starField.position.x += (mouseX * 0.5 - starField.position.x) * 0.05;
        starField.position.y += (-mouseY * 0.5 - starField.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // Responsiveness Watchdog Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* =========================================================================
   4. CURSOR RADAR INTERACTIVE INJECTIONS
   ========================================================================= */
function initInteractiveGlowAndCursors() {
    const glow = document.getElementById('mouseGlow');
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        gsap.to(glow, { x: clientX, y: clientY, duration: 0.5, ease: "power2.out" });
        gsap.to(cursor, { x: clientX, y: clientY, duration: 0.08 });
        gsap.to(dot, { x: clientX, y: clientY, duration: 0.01 });
    });

    document.querySelectorAll('a, button, .skill-pill-card, .service-card, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { width: 55, height: 55, backgroundColor: 'rgba(0, 180, 216, 0.03)', borderColor: '#00b4d8', duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { width: 32, height: 32, backgroundColor: 'transparent', borderColor: 'rgba(0, 180, 216, 0.3)', duration: 0.2 });
        });
    });
}

/* =========================================================================
   5. AUTO-TYPOGRAPHY INTERFACES
   ========================================================================= */
function initTypographyEngines() {
    new Typed('#typed-text', {
        strings: [
            "Crafting fast custom themes.",
            "WooCommerce system specialist.",
            "Building robust server solutions.",
            "Writing clean scalable architectures."
        ],
        typeSpeed: 40, backSpeed: 20, backDelay: 2200, loop: true
    });
}

/* =========================================================================
   6. GSAP STAGGER ANIMATIONS ENGINE
   ========================================================================= */
gsap.registerPlugin(ScrollTrigger);

function triggerHeroReveal() {
    const tl = gsap.timeline();
    tl.from(".main-header", { y: -80, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".text-stagger", { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4")
      .from(".hero-socials, .scroll-indicator", { opacity: 0, duration: 0.4 }, "-=0.2");
}

function initGSAPScrollAnimations() {
    document.querySelectorAll('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, y: 30, duration: 0.8, ease: "power2.out"
        });
    });

    document.querySelectorAll('.reveal-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0, y: 40, duration: 0.8, ease: "power2.out"
        });
    });

    document.querySelectorAll('.counter').forEach(counter => {
        gsap.from(counter, {
            scrollTrigger: { trigger: counter, start: "top 90%" },
            innerText: 0, duration: 1.5, snap: { innerText: 1 }, ease: "power1.out"
        });
    });

    // Horizontal Scroll Trigger Matrix Setup
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    if (horizontalContainer) {
        ScrollTrigger.matchMedia({
            "(min-width: 1025px)": function() {
                gsap.to(horizontalContainer, {
                    x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".projects-horizontal-section",
                        pin: true, scrub: 1, start: "top top",
                        end: () => "+=" + horizontalContainer.scrollWidth,
                        invalidateOnRefresh: true
                    }
                });
            }
        });
    }
}

/* =========================================================================
   7. SKILLS SWIPER AUTOMATIC RUNNERS
   ========================================================================= */
function initSwiperSliders() {
    // Forward Marquee Runner
    new Swiper('.skills-swiper-track-a', {
        slidesPerView: "auto", spaceBetween: 16, loop: true, speed: 6000,
        autoplay: { delay: 0, disableOnInteraction: false },
        allowTouchMove: false
    });

    // Reverse Marquee Runner
    new Swiper('.skills-swiper-track-b', {
        slidesPerView: "auto", spaceBetween: 16, loop: true, speed: 6500,
        autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true },
        allowTouchMove: false
    });

    // Testimonial Interface Slide Controller
    new Swiper('.testimonial-swiper', {
        slidesPerView: 1, spaceBetween: 30, loop: true, speed: 600,
        autoplay: { delay: 4500 },
        pagination: { el: '.swiper-pagination', clickable: true }
    });
}

/* =========================================================================
   8. COMPONENT TILTS (VANILLA TILT)
   ========================================================================= */
function initComponentTilts() {
    if(window.innerWidth > 1024) {
        const cards = document.querySelectorAll('.service-card, .info-card, .skill-pill-card');
        VanillaTilt.init(Array.from(cards), { max: 10, speed: 500, glare: false });
    }
}

/* =========================================================================
   9. INTERACTIVE MAGNETIC LINK SYSTEMS
   ========================================================================= */
function initMagneticMechanics() {
    if(window.innerWidth > 1024) {
        document.querySelectorAll('.magnetic').forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const bound = this.getBoundingClientRect();
                const x = e.clientX - bound.left - bound.width / 2;
                const y = e.clientY - bound.top - bound.height / 2;
                gsap.to(this, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
            });
            item.addEventListener('mouseleave', function() {
                gsap.to(this, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
            });
        });
    }
}