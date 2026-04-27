document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // 2. Smart Navbar Logic (Hide/Show + Active Link)
    const nav = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (winScroll / height) * 100 + "%";

        // Hide/Show Navbar
        if (currentScroll > lastScroll && currentScroll > 150) {
            nav.classList.add('nav-up');
        } else {
            nav.classList.remove('nav-up');
        }
        
        // Style on scroll
        if (currentScroll > 50) {
            nav.classList.add('py-3', 'shadow-2xl');
            nav.classList.remove('py-5');
        } else {
            nav.classList.add('py-5');
            nav.classList.remove('py-3', 'shadow-2xl');
        }
        lastScroll = currentScroll;

        // Active Link Highlighter
        let activeId = "";
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (currentScroll >= top - 200) {
                activeId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(activeId)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Counter-Up Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const speed = target / 50; // Adjust for duration
                const updateCount = () => {
                    const count = +entry.target.innerText.replace('+', '').replace(',', '');
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + speed) + (target > 1000 ? '+' : '+');
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 4. Enhanced 3D Tilt Card with Glare
    const smartCards = document.querySelectorAll('.smart-card');
    smartCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            
            // Set Glare Position
            card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 5. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-mag');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.6;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 6. FAQ Accordion
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('click', () => {
            const body = card.querySelector('.faq-body');
            const icon = card.querySelector('.faq-trigger i');
            
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
                icon.className = 'fas fa-plus';
                card.classList.remove('bg-white', 'shadow-xl');
            } else {
                // Close others
                faqCards.forEach(c => {
                    c.querySelector('.faq-body').style.maxHeight = null;
                    c.querySelector('.faq-trigger i').className = 'fas fa-plus';
                    c.classList.remove('bg-white', 'shadow-xl');
                });
                
                body.style.maxHeight = body.scrollHeight + "px";
                icon.className = 'fas fa-minus';
                card.classList.add('bg-white', 'shadow-xl');
            }
        });
    });

    // 7. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileBtn.innerHTML = mobileMenu.classList.contains('hidden') ? 
            '<i class="fas fa-bars-staggered"></i>' : '<i class="fas fa-times"></i>';
    });
    
    document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileBtn.innerHTML = '<i class="fas fa-bars-staggered"></i>';
        });
    });
});