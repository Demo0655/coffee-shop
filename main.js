import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scroll when menu is open
        if (navLinks.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            lenis.start();
        });
    });
}

// Custom Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

document.querySelectorAll('a, button, .menu-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Loader Animation
const hideLoader = () => {
    const tl = gsap.timeline();
    tl.to('.coffee-fill', { height: '100%', duration: 0.5 })
      .to('#loader', { yPercent: -100, duration: 1, ease: 'expo.inOut' })
      .from('.premium-badge', { y: -20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.hero-title span', { y: 100, opacity: 0, stagger: 0.1, duration: 1.2, ease: 'expo.out' }, '-=0.8')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.9')
      .from('.hero-actions .btn-wrapper', { scale: 0.8, opacity: 0, stagger: 0.2, duration: 1, ease: 'back.out(1.7)' }, '-=0.7')
      .from('.cup-wrapper', { x: 100, opacity: 0, duration: 1.5, ease: 'expo.out' }, '-=1.5')
      .from('.bean', { scale: 0, opacity: 0, stagger: 0.1, duration: 1, ease: 'power2.out' }, '-=1');
};

window.addEventListener('load', hideLoader);

// Safety timeout: Hide loader after 5 seconds if window.load doesn't fire
setTimeout(() => {
    if (document.getElementById('loader').style.transform !== 'translate(0%, -100%)') {
        hideLoader();
    }
}, 5000);

// Parallax Hero Elements
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2);
    
    // Cup Parallax (Fastest)
    gsap.to('.cup-wrapper', {
        x: x * 0.08,
        y: y * 0.08,
        rotationY: x * 0.02,
        rotationX: -y * 0.02,
        duration: 1,
        ease: 'power2.out'
    });

    // Content Parallax (Medium)
    gsap.to('.hero-content', {
        x: x * 0.03,
        y: y * 0.03,
        duration: 1,
        ease: 'power2.out'
    });

    // Beans Parallax (Varied)
    document.querySelectorAll('.bean').forEach((bean, i) => {
        const factor = (i + 1) * 0.02;
        gsap.to(bean, {
            x: x * factor,
            y: y * factor,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Light Rays Parallax (Slowest)
    gsap.to('.light-rays', {
        x: -x * 0.01,
        y: -y * 0.01,
        duration: 2,
        ease: 'power2.out'
    });
});

// Magnetic Buttons Logic
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Steam Particles Animation
const steamSpans = document.querySelectorAll('.steam-particles span');
steamSpans.forEach((span, i) => {
    gsap.to(span, {
        y: -100,
        x: () => (Math.random() - 0.5) * 50,
        opacity: 0,
        scale: 2,
        duration: 2 + Math.random(),
        repeat: -1,
        delay: i * 0.4,
        ease: 'power1.out',
        onRepeat: () => {
            gsap.set(span, { y: 0, opacity: 0.4, scale: 1, x: 0 });
        }
    });
});

// Cup Hover & Click Interactions
const cupWrapper = document.querySelector('.cup-wrapper');
cupWrapper.addEventListener('mouseenter', () => {
    gsap.to('.steam-particles span', {
        opacity: 0.8,
        scale: 3,
        duration: 0.3,
        stagger: 0.1
    });
});

cupWrapper.addEventListener('mouseleave', () => {
    gsap.to('.steam-particles span', {
        opacity: 0.4,
        scale: 1,
        duration: 0.3
    });
});

cupWrapper.addEventListener('click', () => {
    const ripple = document.getElementById('cup-ripple');
    gsap.fromTo(ripple, { scale: 0, opacity: 0.6 }, {
        scale: 15,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to('#hero-cup', {
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        duration: 0.1
    });
});

// Idle Floating Animations
gsap.to('.cup-wrapper', {
    y: '+=15',
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

document.querySelectorAll('.bean').forEach((bean, i) => {
    gsap.to(bean, {
        y: '+=20',
        x: '+=10',
        rotation: 360,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
    });
});

// Scroll Reveals
const revealElements = [
    { selector: '.reveal-left', x: -100, opacity: 0 },
    { selector: '.reveal-right', x: 100, opacity: 0 },
    { selector: '.reveal-up', y: 100, opacity: 0 }
];

revealElements.forEach(item => {
    gsap.utils.toArray(item.selector).forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: item.x || 0,
            y: item.y || 0,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });
});

// Menu Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        gsap.to(menuCards, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                menuCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                gsap.to(menuCards, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
});

// Fix for Hero Parallax visibility
gsap.set('.hero-title, .hero-subtitle, .hero-actions, .navbar, .cup-wrapper, .bean', { opacity: 1, y: 0 });

// Environment Parallax
gsap.to('#env-parallax', {
    scrollTrigger: {
        trigger: '.environment-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    yPercent: 20,
    ease: 'none'
});

// Button Ripple Effect
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        this.appendChild(ripples);
        
        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });
});

// Fav Button Heart Animation
document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.style.color = '#ff4b2b';
            gsap.fromTo(this, { scale: 1 }, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1 });
        } else {
            this.style.color = 'inherit';
        }
    });
});

// Contact Form Interactions
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.nextElementSibling, { color: '#C8A165', duration: 0.3 });
    });
    input.addEventListener('blur', () => {
        if (!input.value) {
            gsap.to(input.nextElementSibling, { color: '#b0b0b0', duration: 0.3 });
        }
    });
});

// Menu Modal Logic
const modal = document.getElementById('menu-modal');
if (modal) {
    const closeModal = modal.querySelector('.close-modal');
    
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.fav-btn')) return; // Don't open modal if clicking fav btn
            
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const desc = card.querySelector('p').innerText;
            const price = card.querySelector('.price').innerText;
            
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-desc').innerText = desc;
            document.getElementById('modal-price').innerText = price;
            
            modal.classList.add('active');
            lenis.stop(); // Stop scroll when modal open
        });
    });
    
    closeModal?.addEventListener('click', () => {
        modal.classList.remove('active');
        lenis.start();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            lenis.start();
        }
    });
}

// Gallery Modal Logic
const galleryModal = document.getElementById('gallery-modal');
const galleryPreviewImg = document.getElementById('gallery-preview-img');

if (galleryModal && galleryPreviewImg) {
    const closeGalleryModal = galleryModal.querySelector('.close-modal');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            galleryPreviewImg.src = imgSrc;
            galleryModal.classList.add('active');
            lenis.stop();
        });
    });
    
    closeGalleryModal?.addEventListener('click', () => {
        galleryModal.classList.remove('active');
        lenis.start();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            lenis.start();
        }
    });
}

// Sticky Navbar
const navbar = document.querySelector('.navbar');
if (navbar) {
    lenis.on('scroll', ({ scroll }) => {
        if (scroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Reservation Modal Logic
const resModal = document.getElementById('reservation-modal');
const resBtns = document.querySelectorAll('.cta-btn.secondary.magnetic'); // Target all Order Now buttons
const closeRes = document.querySelector('.close-reservation');

if (resModal && resBtns.length > 0) {
    resBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resModal.classList.add('active');
            lenis.stop();
            
            // Animation for modal entry
            gsap.from('.reservation-container', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'expo.out'
            });
        });
    });

    closeRes.addEventListener('click', () => {
        resModal.classList.remove('active');
        lenis.start();
    });

    resModal.addEventListener('click', (e) => {
        if (e.target === resModal) {
            resModal.classList.remove('active');
            lenis.start();
        }
    });

    // Multi-step Form Logic
    const nextBtn = document.querySelector('.next-step');
    const prevBtn = document.querySelector('.prev-step');
    const steps = document.querySelectorAll('.res-step');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Basic validation for step 1
            const name = document.getElementById('res-name').value;
            const phone = document.getElementById('res-phone').value;
            const date = document.getElementById('res-date').value;

            if (name && phone && date) {
                steps[0].classList.remove('active');
                steps[1].classList.add('active');
                
                gsap.from('.res-step[data-step="2"] > *', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                alert('Please fill in all basic details.');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            steps[1].classList.remove('active');
            steps[0].classList.add('active');
        });
    }

    // Vibe Selection
    const vibeOpts = document.querySelectorAll('.vibe-opt');
    vibeOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            vibeOpts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            
            // Change background image based on vibe (optional but cool)
            const vibe = opt.dataset.vibe;
            const resLeft = document.querySelector('.res-left');
            if (vibe === 'cozy') resLeft.style.backgroundImage = "url('/Shop1.webp')";
            if (vibe === 'window') resLeft.style.backgroundImage = "url('/interior.png')";
            if (vibe === 'bar') resLeft.style.backgroundImage = "url('/latte.jpg')";
        });
    });

    // Form Submission
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = resForm.querySelector('button[type="submit"]');
            btn.innerHTML = 'Securing Table...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Success! Your table has been reserved. We will contact you shortly.');
                resModal.classList.remove('active');
                lenis.start();
                resForm.reset();
                btn.innerHTML = 'Confirm Reservation';
                btn.disabled = false;
                steps[1].classList.remove('active');
                steps[0].classList.add('active');
            }, 2000);
        });
    }
}
