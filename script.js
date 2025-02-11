// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#hero-canvas'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create particle geometry
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create particle material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#64ffda',
    transparent: true,
    opacity: 0.8
});

// Create particle mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Position camera
camera.position.z = 2;

// Animation
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Regular animation without scroll checks
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    
    // Animate spheres
    const time = Date.now() * 0.001;
    spheres.forEach((sphere, i) => {
        const { speed, offset } = sphere.userData;
        sphere.position.y = Math.sin(time * speed + offset) * 1.5;
        sphere.rotation.x += 0.02;
        sphere.rotation.z += 0.02;
    });
    
    renderer.render(scene, camera);
}

animate();
// Why Choose Us Section Animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Project Slider Enhancement
function initProjectSlider() {
    const slider = document.querySelector('.project-slider');
    const slides = slider.querySelectorAll('.project-slide');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let isAnimating = false;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => !isAnimating && goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateSlides() {
        isAnimating = true;
        
        slides.forEach((slide, index) => {
            slide.style.zIndex = index === currentSlide ? 2 : 1;
            slide.classList.remove('active', 'prev-slide', 'next-slide');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev-slide');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next-slide');
            }
        });
        
        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }
    
    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }
    
    function goToSlide(index) {
        if (currentSlide === index || isAnimating) return;
        currentSlide = index;
        updateSlides();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Auto advance slides with pause on hover
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Initialize
    updateSlides();
    startAutoPlay();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectSlider);

// Function to create a slider
function createSlider(sliderContainer) {
    return {
        currentSlide: 0,
        slides: sliderContainer.querySelectorAll('.testimonial-slide'),
        dotsContainer: sliderContainer.querySelector('.slider-dots'),
        prevBtn: sliderContainer.querySelector('.prev-btn'),
        nextBtn: sliderContainer.querySelector('.next-btn'),
        
        init() {
            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
            
            // Add button listeners
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Show first slide
            this.showSlide(0);
            
            // Auto advance slides every 5 seconds
            setInterval(() => this.nextSlide(), 5000);
        },
        
        showSlide(index) {
            this.slides.forEach(slide => slide.style.display = 'none');
            this.dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            
            this.slides[index].style.display = 'block';
            this.dotsContainer.querySelectorAll('.dot')[index].classList.add('active');
            this.currentSlide = index;
        },
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        },
        
        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        },
        
        goToSlide(index) {
            this.showSlide(index);
        }
    };
}

// Initialize both sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const reviewsSlider = createSlider(document.querySelector('.reviews'));
    const testimonialsSlider = createSlider(document.querySelector('.testimonials'));
    
    reviewsSlider.init();
    testimonialsSlider.init();
});

// 3D card animation
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
        
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('h3');
        const text = card.querySelector('p');
        
        if (icon) icon.style.transform = `translateZ(50px)`;
        if (title) title.style.transform = `translateZ(30px)`;
        if (text) text.style.transform = `translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('h3');
        const text = card.querySelector('p');
        
        if (icon) icon.style.transform = 'translateZ(30px)';
        if (title) title.style.transform = 'translateZ(20px)';
        if (text) text.style.transform = 'translateZ(15px)';
    });
});

// Page 3D Animation
document.addEventListener('mousemove', (e) => {
    const sections = document.querySelectorAll('section');
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

    sections.forEach((section, index) => {
        const depth = (sections.length - index) * 0.2;
        section.style.transform = `
            perspective(1000px)
            rotateX(${-mouseY * depth}deg)
            rotateY(${mouseX * depth}deg)
            translateZ(${depth * 10}px)
        `;
    });
});

// Add smooth transition on initial load
document.querySelectorAll('section').forEach(section => {
    section.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

// Reset transforms when mouse leaves the window
document.addEventListener('mouseleave', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0px)
        `;
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate text if it's a text container
            if (entry.target.classList.contains('animate-text-container')) {
                animateText(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .section-header, .animate-text-container')
    .forEach(el => observer.observe(el));

// Text animation function
function animateText(container) {
    const text = container.textContent;
    container.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'animate-text';
        span.style.animationDelay = `${index * 0.05}s`;
        container.appendChild(span);
        
        setTimeout(() => {
            span.classList.add('visible');
        }, index * 50);
    });
}

// Slideshow functionality
function initSlideshow() {
    const slideshows = document.querySelectorAll('.slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide-show');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Auto advance slides
        setInterval(nextSlide, 5000);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    
    // Add animation classes to elements
    document.querySelectorAll('h1, h2, h3').forEach(el => {
        el.classList.add('glow-text');
    });
    
    // Add animation to project images
    document.querySelectorAll('.project-image').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Add slide-in animations to cards
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Logo hover animation
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
        logo.style.filter = 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.5))';
    });

    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'scale(1) rotate(0deg)';
        logo.style.filter = 'none';
    });
}

// Page transition effects
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Add floating animation to specific elements
const floatingElements = document.querySelectorAll('.feature-icon, .plan-image');
floatingElements.forEach((element, index) => {
    element.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add CSS class for animated elements
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    </style>
`);

// Header Scroll Effect
const nav = document.querySelector('nav');
const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('nav ul');

// Update scroll handling
window.addEventListener('scroll', () => {
    // Only handle navigation background
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Add active class to current section
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Email Form Submission
async function sendEmail(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    btnText.style.opacity = '0';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
        const response = await fetch('https://formspree.io/f/xdkazyoz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.opacity = '1';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hero Section 3D Animation
function initHeroAnimation() {
    const container = document.querySelector('.hero-3d');
    const canvas = document.getElementById('hero-canvas');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create DNA-like double helix structure
    const helixPoints = [];
    const helixCount = 2; // Two strands for DNA
    const pointsPerHelix = 100;
    
    for (let i = 0; i < pointsPerHelix; i++) {
        const t = i / pointsPerHelix;
        const angle = t * Math.PI * 8; // 4 complete rotations
        
        // First strand
        helixPoints.push(
            new THREE.Vector3(
                Math.cos(angle) * 2,
                t * 10 - 5,
                Math.sin(angle) * 2
            )
        );
        
        // Second strand (offset by PI)
        helixPoints.push(
            new THREE.Vector3(
                Math.cos(angle + Math.PI) * 2,
                t * 10 - 5,
                Math.sin(angle + Math.PI) * 2
            )
        );
    }

    // Create connecting lines between strands
    const connectingLines = new THREE.Group();
    for (let i = 0; i < pointsPerHelix; i += 4) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            helixPoints[i * 2],
            helixPoints[i * 2 + 1]
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.5
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        connectingLines.add(line);
    }
    scene.add(connectingLines);

    // Create particles for each helix point
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    
    helixPoints.forEach(point => {
        positions.push(point.x, point.y, point.z);
        colors.push(0.4, 1, 0.85); // Teal color
        sizes.push(Math.random() * 2 + 1);
    });

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                float strength = distance(gl_PointCoord, vec2(0.5));
                strength = 1.0 - strength;
                strength = pow(strength, 3.0);
                gl_FragColor = vec4(vColor, strength);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0x64ffda, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4285f4, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate based on mouse position
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        connectingLines.rotation.y += 0.002;
        connectingLines.rotation.x += 0.001;

        // Smooth camera movement
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Pulse effect
        const time = Date.now() * 0.001;
        particles.material.uniforms.pulse = { value: Math.sin(time) * 0.5 + 0.5 };
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Initialize animation when page loads
window.addEventListener('load', initHeroAnimation);

// Page and Slide Animations
function initAnimations() {
    // Slide animations for all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `all 0.8s cubic-bezier(0.17, 0.85, 0.438, 0.99) ${index * 0.2}s`;
    });

    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Card hover effects with 3D animation
    const cards = document.querySelectorAll('.service-card, .feature-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Smooth scroll with parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        sections.forEach(section => {
            const rate = section.dataset.parallax || 0.5;
            const yPos = -(scrolled * rate);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Text reveal animation
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    textElements.forEach(element => textObserver.observe(element));

    // Image reveal animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.8s cubic-bezier(0.17, 0.85, 0.438, 0.99)';
    });

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.2 });

    images.forEach(img => imageObserver.observe(img));

    // Slider animation enhancement
    const sliders = document.querySelectorAll('.project-slider, .testimonial-slider');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.project-slide, .testimonial-slide');
        slides.forEach((slide, index) => {
            slide.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transform = index === 0 ? 'scale(1)' : 'scale(0.8)';
        });
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', initAnimations);

// Smooth page transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Add entrance animation to target section
            targetSection.style.animation = 'sectionEntrance 1s cubic-bezier(0.17, 0.85, 0.438, 0.99)';
        }
    });
});

// Add animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes sectionEntrance {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .slide-transition {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(styleSheet);

// 3D Animation and Smooth Scroll Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll
    const sections = document.querySelectorAll('[data-scroll-section]');
    let lastScroll = window.scrollY;
    
    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const scrollDirection = currentScroll > lastScroll ? 1 : -1;
        
        sections.forEach(section => {
            const speed = section.dataset.scrollSpeed || 1;
            const rect = section.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yOffset = (currentScroll - lastScroll) * speed * 0.1;
                section.style.transform = `translateY(${yOffset}px)`;
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // 3D card effect
    const cards = document.querySelectorAll('.portfolio-box');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Page transition effect
    const pageTransition = document.querySelector('.page-transition');
    
    function animatePageTransition() {
        pageTransition.style.transform = 'scaleY(1)';
        setTimeout(() => {
            pageTransition.style.transform = 'scaleY(0)';
        }, 500);
    }
    
    // Trigger transition on navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            animatePageTransition();
            
            setTimeout(() => {
                window.location.hash = anchor.getAttribute('href');
            }, 500);
        });
    });
});

// Background video parallax
const bgVideo = document.getElementById('bgVideo');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    bgVideo.style.transform = `scale(${1 + scroll * 0.0002})`;
});
// Enhanced 3D page transition effects
function initPageTransitions() {
    const pageTransition = document.querySelector('.page-transition');
    const mainContent = document.querySelector('main');
    
    function startTransition() {
        pageTransition.classList.add('slide-in');
        mainContent.style.transform = 'translateZ(-100px)';
        mainContent.style.filter = 'blur(5px)';
        
        setTimeout(() => {
            pageTransition.classList.remove('slide-in');
            pageTransition.classList.add('slide-out');
            mainContent.style.transform = 'translateZ(0)';
            mainContent.style.filter = 'none';
            
            setTimeout(() => {
                pageTransition.classList.remove('slide-out');
            }, 1200);
        }, 1200);
    }

    // Update existing navigation handlers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            startTransition();
            
            setTimeout(() => {
                window.location.hash = anchor.getAttribute('href');
            }, 1200);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        startTransition();
    });
}

// Initialize transitions
initPageTransitions();




