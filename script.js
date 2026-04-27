document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 },
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // 2. Smart Navbar Logic (Hide/Show + Active Link)

  const nav = document.getElementById("navbar");
  const progress = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percent = (scrollY / height) * 100;

    // ✅ progress bar fill
    progress.style.width = percent + "%";

    // ✨ glow intensity effect
    progress.style.boxShadow =
      scrollY > 50
        ? "0 0 18px rgba(59,130,246,0.9)"
        : "0 0 8px rgba(59,130,246,0.4)";

    // 🌟 navbar premium shrink effect (NO height change, only scale feel)
    if (scrollY > 60) {
      nav.classList.add("shadow-2xl", "bg-white");
      nav.style.transform = "translateX(-50%) scale(0.98)";
    } else {
      nav.classList.remove("shadow-2xl");
      nav.style.transform = "translateX(-50%) scale(1)";
    }
  });

  // 👉 ACTIVE LINK SCROLL SPY
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-link");

  // 3. Counter-Up Animation
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute("data-target");
          const speed = target / 50; // Adjust for duration
          const updateCount = () => {
            const count =
              parseInt(entry.target.getAttribute("data-target")) || 0;

            if (count < target) {
              entry.target.innerText =
                Math.ceil(count + speed) + (target > 1000 ? "+" : "+");
              setTimeout(updateCount, 20);
            } else {
              entry.target.innerText = target + "+";
            }
          };
          updateCount();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // 4. Enhanced 3D Tilt Card with Glare
  // 4. FAST 3D Tilt Card with Glare (Optimized)
  const smartCards = document.querySelectorAll(".smart-card");

  smartCards.forEach((card) => {
    let requestId = null;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 12;
      const rotateY = (x - centerX) / 12;

      card.style.transform = `perspective(900px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.04)`;

      // glare position
      card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
    };

    card.addEventListener("mousemove", (e) => {
      if (requestId) cancelAnimationFrame(requestId);

      requestId = requestAnimationFrame(() => handleMove(e));
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.2s ease";
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "none";
    });
  });

  // 5. Magnetic Button Effect
  const magneticBtns = document.querySelectorAll(".btn-mag");

  magneticBtns.forEach((btn) => {
    let x = 0,
      y = 0;

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      y = (e.clientY - rect.top - rect.height / 2) * 0.6;

      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px) scale(1)`;
    });
  });

  // FAQ Accordion (SMART VERSION)
  const faqCards = document.querySelectorAll(".faq-card");

  faqCards.forEach((card) => {
    card.addEventListener("click", () => {
      const body = card.querySelector(".faq-body");
      const icon = card.querySelector(".faq-trigger i");

      const isOpen = body.style.maxHeight && body.style.maxHeight !== "0px";

      // close all
      faqCards.forEach((c) => {
        const icon = c.querySelector(".faq-trigger i");

        c.querySelector(".faq-body").style.maxHeight = null;
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      });

      // open clicked if closed
      if (!isOpen) {
        body.style.maxHeight = body.scrollHeight + "px";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }
    });
  });

  // 7. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i class="fas fa-bars-staggered"></i>'
      : '<i class="fas fa-times"></i>';
  });

  document.querySelectorAll(".mob-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileBtn.innerHTML = '<i class="fas fa-bars-staggered"></i>';
    });
  });
  // 8. Testimonials Slider
  // =============================
  // TESTIMONIAL 3D CAROUSEL PRO
  // =============================

  const slider = document.getElementById("testimonial-slider");
  const dots = document.querySelectorAll(".dot");

  let index = 0;
  const totalSlides = Math.floor(slider.children.length / 2);
  let interval;

  // Move Slide
  function goToSlide(i) {
    index = i;
    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle("bg-blue-500", idx === index);
      dot.classList.toggle("bg-slate-300", idx !== index);
    });
  }

  // Auto Play
  function startAuto() {
    interval = setInterval(() => {
      index = (index + 1) % totalSlides;
      goToSlide(index);
    }, 2000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  // Pause on hover (IMPORTANT UX)
  const wrapper = document.getElementById("testimonial-wrapper");

  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

  // Touch swipe (mobile like Instagram)
  let startX = 0;

  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = (index + 1) % totalSlides;
    } else if (endX - startX > 50) {
      index = (index - 1 + totalSlides) % totalSlides;
    }

    goToSlide(index);
  });

  // init
  goToSlide(0);
  startAuto();

  // How It Works - scroll reveal (Tailwind only)
  const stepCards = document.querySelectorAll(".step-card");

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.2 },
  );

  stepCards.forEach((card) => {
    card.classList.add(
      "opacity-0",
      "translate-y-6",
      "transition-all",
      "duration-700",
    );
    stepObserver.observe(card);
  });

  // =========================
  // LIVE DISTANCE CALCULATOR
  // =========================

  // Store location (Bubbles Laundromat)
  const storeLat = 35.5795; // OKC approx lat
  const storeLng = -97.567;

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Get user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          storeLat,
          storeLng,
        );

        const el = document.getElementById("distance-text");

        if (distance < 1) {
          el.innerHTML = `${Math.round(distance * 1000)} meters away`;
        } else {
          el.innerHTML = `${distance.toFixed(2)} km away`;
        }
      },
      () => {
        document.getElementById("distance-text").innerText =
          "Location access denied";
      },
    );
  } else {
    document.getElementById("distance-text").innerText =
      "Geolocation not supported";
  }

// 
// =========================
// BUBBLE BACKGROUND SYSTEM
// =========================

const bubbleContainer = document.querySelector(".bubble-container");

function createBubble() {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");

  const size = Math.random() * 60 + 20;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  bubble.style.left = Math.random() * 100 + "vw";

  bubble.style.animationDuration = Math.random() * 10 + 8 + "s";
  bubble.style.animationDelay = Math.random() * 5 + "s";

  bubbleContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 20000);
}

setInterval(createBubble, 300);

  
});
