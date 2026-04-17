// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ==================== MOBILE NAV ====================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
let overlay = null;

function createOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeNav);
}

function openNav() {
    nav.classList.add('open');
    burger.classList.add('active');
    if (!overlay) createOverlay();
    setTimeout(() => overlay.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
});

// Close nav on link click
nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', closeNav);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==================== FADE IN ANIMATION ====================
function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations within the same viewport batch
                const delay = Array.from(entry.target.parentElement.children)
                    .filter(el => el.classList.contains('fade-in'))
                    .indexOf(entry.target) * 80;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Math.min(delay, 400));

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

initFadeIn();

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq__item').forEach(i => {
            i.classList.remove('active');
        });

        // Open clicked if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==================== CONTACT FORM (Formspree) ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляю...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/meevgzle', {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.innerHTML = `
                    <div class="cta__form-success">
                        <p>Заявка отправлена</p>
                        <span>Я свяжусь с вами в ближайшее время</span>
                    </div>
                `;
            } else {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Что-то пошло не так. Напишите мне напрямую в Телеграм.');
            }
        } catch (err) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Ошибка соединения. Напишите мне напрямую в Телеграм.');
        }
    });
}
