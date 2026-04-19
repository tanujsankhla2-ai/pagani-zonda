/* =========================================
   Botto | Custom JavaScript & Animations
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Keep it blurred mostly
            if(window.scrollY < 10) navbar.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'lucide:x' : 'lucide:menu';
        mobileBtn.innerHTML = `<iconify-icon icon="${icon}" width="24"></iconify-icon>`;
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.innerHTML = `<iconify-icon icon="lucide:menu" width="24"></iconify-icon>`;
        });
    });

    // --- 3. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Check if already active
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open if wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 4. GSAP Animations ---

    // ---- Hero content entrance ----
    // The slideshow runs purely via CSS keyframes.
    // GSAP only animates the content text on top.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".badge", {
        opacity: 0,
        y: -20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4
    })
    .fromTo(".hero-title", {
        opacity: 0,
        y: 60
    }, {
        opacity: 1,
        y: 0,
        duration: 1.1
    }, "-=0.5")
    .fromTo(".hero-subtitle", {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.9
    }, "-=0.7")
    .fromTo(".hero-actions", {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, "-=0.6")
    .fromTo(".scroll-indicator", {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.6
    }, "-=0.3");

    // ---- Hero slideshow scroll parallax ----
    // Only the image stack (.hero-slideshow) shifts upward on scroll.
    // The overlay (.hero-overlay) stays fixed so text contrast is preserved.
    gsap.to(".hero-slideshow", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5   // smooth lag for cinematic feel
        }
    });

    // Fade up sections
    const sections = gsap.utils.toArray('.section-padding');
    sections.forEach(section => {
        gsap.from(section.querySelectorAll('.section-title, .section-desc'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Feature Cards Stagger
    gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%"
        }
    });

    // About Image Parallax
    gsap.from(".glass-float", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".about-image",
            start: "top 70%"
        }
    });

    // Product Cards Reveal
    gsap.from(".product-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 85%"
        }
    });

});
