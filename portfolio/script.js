const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

/* ================= SMOOTH SCROLL ================= */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // 🔹 ACTIVE LINE ON CLICK
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // close mobile menu after click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

/* ================= ACTIVE NAV ON SCROLL ================= */
window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

/* ================= BACK TO TOP ================= */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ================= SKILL BAR ANIMATION ================= */
const animateSkillBars = () => {
    const bars = document.querySelectorAll('.skill-progress');
    const skills = document.getElementById('skills');

    if (!skills || bars.length === 0) return;

    if (window.scrollY > skills.offsetTop - window.innerHeight + 200) {
        bars.forEach(bar => {
            const w = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = w, 100);
        });
        window.removeEventListener('scroll', animateSkillBars);
    }
};

window.addEventListener('scroll', animateSkillBars);

/* ================= CONTACT FORM (FORMSPREE AJAX) ================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                formStatus.classList.remove("hidden");
                formStatus.classList.remove("text-red-400");
                formStatus.classList.add("text-green-400");
                formStatus.textContent = "✅ Message has been sent successfully!";

                contactForm.reset();

                // Auto hide after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add("hidden");
                }, 5000);
            } else {
                formStatus.classList.remove("hidden");
                formStatus.classList.remove("text-green-400");
                formStatus.classList.add("text-red-400");
                formStatus.textContent = "❌ Something went wrong. Please try again.";
            }
        } catch (error) {
            formStatus.classList.remove("hidden");
            formStatus.classList.remove("text-green-400");
            formStatus.classList.add("text-red-400");
            formStatus.textContent = "❌ Network error. Please try again.";
        }
    });
}
