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
        const lang = document.documentElement.lang || 'ru';
        submitBtn.textContent = lang === 'en' ? 'Sending...' : 'Отправляю...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/meevgzle', {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                const isEn = document.documentElement.lang === 'en';
                this.innerHTML = `
                    <div class="cta__form-success">
                        <p>${isEn ? 'Request sent' : 'Заявка отправлена'}</p>
                        <span>${isEn ? 'I will get back to you shortly' : 'Я свяжусь с вами в ближайшее время'}</span>
                    </div>
                `;
            } else {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                const isEn = document.documentElement.lang === 'en';
                alert(isEn ? 'Something went wrong. Write to me directly on Telegram.' : 'Что-то пошло не так. Напишите мне напрямую в Телеграм.');
            }
        } catch (err) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            const isEn = document.documentElement.lang === 'en';
            alert(isEn ? 'Connection error. Write to me directly on Telegram.' : 'Ошибка соединения. Напишите мне напрямую в Телеграм.');
        }
    });
}

// ==================== TRANSLATIONS ====================
const translations = {
    ru: {
        page_title: 'Fenix Law — Юридическая архитектура для технологических компаний и стартапов',
        page_desc: 'Fenix Law — бутиковая юридическая практика. Юридический аудит, структурирование, МФЦА и Astana Hub для технологических компаний; стратегические сессии для стартапов.',
        burger_label: 'Меню',
        nav_services: 'Услуги',
        nav_audit: 'Юридический аудит',
        nav_approach: 'Подход',
        nav_about: 'О практике',
        nav_faq: 'Вопросы',
        nav_cta: 'Обсудить проект',
        hero_badge: 'Бутиковая юридическая практика',
        hero_title_line1: 'Юридическая архитектура',
        hero_title_accent: 'для технологических компаний и стартапов',
        hero_subtitle: 'Помогаю собрать бизнес так, чтобы он мог расти, привлекать инвестиции и не ломаться на непрочном фундаменте. Не просто документы — а юридическая конструкция, которая выдерживает рост.',
        hero_price_label: 'Юридический аудит',
        hero_price_value: 'от 300 000 ₸',
        hero_btn_primary: 'Обсудить проект в Телеграм',
        hero_btn_outline: 'Узнать про аудит',
        hero_scroll: 'Узнать больше',
        products_label: 'Для технологических компаний',
        products_title: 'Чем я могу быть полезен',
        products_desc: 'Краткий обзор — детали и точный расчёт обсуждаем в Телеграм',
        p_card1_title: 'Юридический аудит',
        p_card1_desc: 'Быстрая проверка по выбранным блокам или комплексный разбор по всем шести: структура, IP, команда, контракты, данные, рост',
        p_card1_price: 'от 300 000 ₸',
        p_card2_title: 'Юрисдикции — МФЦА и Astana Hub',
        p_card2_desc: 'Открытие компании и сопровождение входа в экосистему',
        p_card2_price: 'по запросу',
        p_card3_title: 'Структура и капитал',
        p_card3_desc: 'Соглашения между сооснователями, передача прав ИС, структурирование инвестиционных сделок',
        p_card4_title: 'Операционная поддержка',
        p_card4_desc: 'Privacy Policy и Terms of Use, договоры с командой, постоянное юридическое сопровождение',
        products_group_label: 'Для стартапов',
        p_card5_title: 'Стратегическая сессия',
        p_card5_desc: 'Структурный разбор вашей ситуации: риски, доли, права на продукт, готовность к инвестициям',
        method_label: 'Подход',
        method_title: 'Как я смотрю на юридическую конструкцию',
        method_desc: 'За каждым продуктом — один и тот же метод: не закрыть формальность, а собрать систему, которая выдержит рост',
        method1_title: 'Системность, а не точечные правки',
        method1_desc: 'Документ всегда часть конструкции. Меняю один элемент — проверяю, как это отражается на остальных.',
        method2_title: 'Решения на годы вперёд',
        method2_desc: 'Смотрю не только на сегодняшнюю задачу, но и на то, как структура поведёт себя при раунде, росте команды или выходе на новый рынок.',
        method3_title: 'Понимание регулятора изнутри',
        method3_desc: 'Опыт работы в государственных структурах — вижу логику требований не как внешний наблюдатель, а как человек, который их формулировал.',
        method4_title: 'Язык продукта, не только документов',
        method4_desc: 'Понимаю, как устроен код, данные и юнит-экономика — поэтому документ соответствует тому, что реально происходит в бизнесе.',
        method5_title: 'Приоритизация, а не список задач',
        method5_desc: 'Не все риски одинаково срочны. Показываю, что нужно закрыть сейчас, а что можно отложить без вреда для бизнеса.',
        method6_title: 'Мост между юрисдикциями',
        method6_desc: 'Опыт в МФЦА, Astana Hub и трансграничных структурах — помогаю не выбрать юрисдикцию наугад, а понять последствия выбора.',
        session_label: 'Для стартапов',
        session_title: 'Стратегическая сессия — $100',
        session_desc: 'Не общий созвон и не абстрактные советы. Структурный разбор вашей ситуации: риски, доли, права на продукт — с готовой картой действий на выходе.',
        session_result1: 'Ясная карта рисков',
        session_result2: 'Понимание слабых мест',
        session_result3: 'Приоритеты: что сначала, что потом',
        session_btn: 'Записаться на стратегическую сессию',
        process_label: 'Процесс',
        process_title: 'Как проходит работа',
        proc1_title: 'Вводный контакт',
        proc1_desc: 'Короткий разговор, чтобы понять вашу ситуацию и определить, чем именно я могу быть полезен',
        proc2_title: 'Сбор контекста',
        proc2_desc: 'Изучаю документы, структуру, договоры — всё, что нужно для качественного разбора',
        proc3_title: 'Стратегическая сессия',
        proc3_desc: 'Детальный разбор вашей ситуации: риски, слабые места, возможности, структура',
        proc4_title: 'Рекомендации и план',
        proc4_desc: 'Конкретные следующие шаги с приоритетами — что делать сначала, что потом, что можно отложить',
        audit_label: 'Для технологических компаний',
        audit_title: 'Юридический аудит',
        audit_desc: 'Способ понять, где юридическая конструкция бизнеса уже не соответствует его текущему состоянию — и исправить это до того, как риски ударят по деньгам, репутации и устойчивости бизнеса.',
        audit_price_pill: 'Быстрая проверка — от 300 000 ₸ · Комплексный разбор по всем блокам — от 700 000 ₸',
        audit1_title: 'Корпоративная структура и контроль',
        audit1_desc: 'Проверяю актуальность корпоративной конструкции, распределение долей, механизмы контроля и защиты от нежелательных изменений.',
        audit2_title: 'Права на продукт и IP-цепочка',
        audit2_desc: 'Анализирую, кому принадлежат код, дизайн, алгоритмы и контент. Проверяю передачу прав от всех участников разработки.',
        audit3_title: 'Команда, подрядчики и доступы',
        audit3_desc: 'Смотрю на договорной контур с сотрудниками, фрилансерами и подрядчиками. Проверяю конфиденциальность, неконкуренцию и передачу результатов работы.',
        audit4_title: 'Клиентские и партнёрские договоры',
        audit4_desc: 'Анализирую пользовательские соглашения, договоры с партнёрами и контрагентами на предмет рисков, дисбалансов и слабых мест.',
        audit5_title: 'Персональные данные и публичные документы',
        audit5_desc: 'Проверяю политики обработки данных, согласия, условия использования сервиса. Соответствие требованиям законодательства о защите персональных данных.',
        audit6_title: 'Структура роста и юрисдикционные риски',
        audit6_desc: 'Оцениваю готовность структуры к масштабированию, привлечению инвестиций и выходу в новые юрисдикции. Выявляю узкие места, которые могут заблокировать рост.',
        audit_hub_badge: 'Только для участников Астана Хаб',
        audit_hub_title: 'Дополнительный блок',
        audit_hub_text: 'Соответствие договорной базы приоритетным видам деятельности Астана Хаб — проверяю, насколько текущая юридическая конструкция компании соответствует требованиям и возможностям, которые даёт статус участника.',
        audit_proc_title: 'Как проходит аудит',
        audit_proc1_title: 'Сбор данных',
        audit_proc1_desc: 'Вводная встреча и документы',
        audit_proc2_title: 'Проверка',
        audit_proc2_desc: 'Юридический анализ по ключевым блокам',
        audit_proc3_title: 'Выводы',
        audit_proc3_desc: 'Приоритизация рисков',
        audit_proc4_title: 'Финал',
        audit_proc4_desc: 'Финальная сессия и дорожная карта',
        audit_proc_format: 'Формат: интервью + анализ документов + аналитический отчёт + сессия с руководством',
        audit_cta_btn: 'Обсудить аудит вашей компании',
        about_photo_alt: 'Нариман — венчурный юрист, Fenix Law',
        about_label: 'О практике',
        about_title: 'Почему мне доверяют',
        about_text: 'Я — венчурный юрист. Работаю на стыке права, стартапов и инвестиций. Понимаю не только документы, но и природу технологического бизнеса — как устроен продукт, как принимаются решения, как работает привлечение капитала.',
        about_point1: 'Опыт работы с экосистемой инноваций и стартапами',
        about_point2: 'Практика в Астана Хаб, МФЦА и трансграничных структурах',
        about_point3: 'Помогаю выстраивать юридическую структуру, готовую к росту и инвестициям',
        about_point4: 'Понимаю продукт, данные, команду и сделки — а не только бумаги',
        stat1_label: 'стратегических сессий',
        stat1_sub: 'СНГ · MENA · India · ЕС',
        stat2_label: 'проектных работ',
        stat2_sub: 'структурирование · инкорп. · сделки',
        stat3_label: 'компаний на постоянном сопровождении',
        stat3_sub: 'юридическая функция целиком',
        cases_label: 'Типовые ситуации',
        cases_title: 'С чем ко мне приходят',
        case1: 'Стартап перед инвестором, но права на продукт не оформлены — непонятно, кому что принадлежит',
        case2: 'Два сооснователя делят 50/50, но нет ни соглашения, ни правил выхода, ни вестинга',
        case3: 'Технологическая компания с сильным продуктом, но слабым контуром интеллектуальной собственности',
        case4: 'Запуск второго продукта внутри действующей компании — нужна новая структура и разделение активов',
        case5: 'Выход в Астана Хаб, МФЦА или ОАЭ — нужна юрисдикционная модель и понимание последствий',
        case6: 'Платформа работает с данными пользователей, но нет политик, согласий и правовой рамки',
        test_label: 'Отзывы',
        test_title: 'Что говорят клиенты',
        test1_text: '«У нас технологическая компания в сфере наружной рекламы, и мы планировали выйти на юрисдикцию Abu Dhabi Global Market. Нариман сделал нам детальный и качественный план выхода и помог с начальными шагами. Грамотный юридический советник.»',
        test1_role: 'Основатель, WideLoop',
        test2_text: '«Я благодарна Нариману и компании Fenix Law за грамотную юридическую поддержку и помощь в выстраивании надежного внешнего контура, а именно политики конфиденциальности и условий использования. Для нас эти документы были критически важными, так как проект взаимодействует с чувствительными данными детей и подростков. Также Нариман помог нам грамотно оформить отношения с разработчиком.»',
        test2_role: 'Основатель, проект «Анама»',
        test3_text: 'Отметили, что разбор дал больше практической пользы, чем крупные конференции — от выбора между ИП и ТОО до разницы между Astana Hub и МФЦА, прозрачного Cap Table и защиты интересов фаундеров при работе с инвесторами.',
        test4_text: 'Поблагодарили за подход — все вопросы изучаются заранее, а на сессии сразу даётся готовая структура решения, без воды и общих советов.',
        faq_label: 'Частые вопросы',
        faq_title: 'Вопросы и ответы',
        faq1_q: 'Что такое юридический аудит (комплексная юридическая проверка) и зачем он нужен моей компании?',
        faq1_a: 'Это проверка того, насколько юридическая конструкция бизнеса — договоры, права на продукт, корпоративная структура, данные — соответствует его реальному состоянию. Бизнес часто растёт быстрее документов: продукт работает и клиенты платят, но договоры, политики и структура остались на уровне MVP. Аудит показывает, где накопились расхождения и что нужно закрыть до того, как риски ударят по деньгам или всплывут при проверке инвестора.',
        faq2_q: 'Как понять, что моей компании уже пора делать аудит?',
        faq2_a: 'Несколько типичных сигналов: к вам скоро придёт инвестор или крупный клиент с due diligence; вы работаете с пользовательскими данными; разработчики и подрядчики оформлены на ГПХ без передачи прав на код; вы участник Astana Hub и пользуетесь льготами; либо бизнес давно изменился, а устав и договоры остались прежними. Если узнали себя хотя бы в одном — аудит окупается тем, что вы узнаёте проблему заранее, а не в момент сделки.',
        faq3_q: 'Что я получу по итогам аудита?',
        faq3_a: 'Сводный отчёт для руководства без воды, карту рисков (критичные / высокие / средние с объяснением каждого), конкретные правки по каждому документу — что написать, что убрать, что добавить — и дорожную карту на 30–60–90 дней. Не абстрактный список замечаний, а готовый план действий.',
        faq4_q: 'Чем экспресс-проверка отличается от расширенного аудита?',
        faq4_a: 'Экспресс-проверка (от 300 000 ₸) закрывает ограниченный круг вопросов — например, блок продукта: Terms, Privacy, согласия — и занимает до недели. Расширенный аудит — это все блоки: продукт, корпоративная структура, интеллектуальная собственность, команда, готовность к росту, плюс для участников Astana Hub отдельный модуль соответствия. Формат подбираем под вашу ситуацию.',
        faq5_q: 'Зачем технологической компании открывать компанию в МФЦА?',
        faq5_a: 'МФЦА даёт юрисдикцию английского общего права — понятную для международных инвесторов корпоративную оболочку. Это нужно, когда вы готовитесь к раунду (под SAFE, акционерное соглашение, вход инвестора), когда хотите закрепить доли и вестинг между несколькими фаундерами, или когда нужно разделить владение, IP и операционную компанию при работе с зарубежными клиентами. Сопровождаю регистрацию Private Company под ключ.',
        faq6_q: 'Что даёт компании статус участника Astana Hub?',
        faq6_a: 'Главное — налоговые льготы (по КПН, НДС и другим) и доступ к экосистеме. Но льготы зависят от того, как описана ваша деятельность в договорах, актах и бизнес-плане, и насколько она соответствует приоритетным видам деятельности. Разрыв между бумагой и реальной выручкой — прямой риск потери льгот. Поэтому я начинаю не с подачи заявки, а с разбора модели деятельности, и сопровождаю вход так, чтобы вы заходили с юридически выверенной структурой.',
        faq7_q: 'Вы работаете только со стартапами?',
        faq7_a: 'Нет. Основной фокус — действующие технологические компании: платформы, маркетплейсы, финтех, SaaS, продукты на данных и ИИ. Им нужны аудит, структурирование сделок, юрисдикции, защита IP. Для стартапов на ранней стадии есть отдельный формат — стратегическая сессия, доступная по цене.',
        faq8_q: 'Как строится работа и с чего начать?',
        faq8_a: 'Обычно с короткого разговора в Telegram, чтобы понять вашу ситуацию. Дальше — сбор документов, анализ, и на выходе конкретный результат: карта рисков и план. Работаю в формате «риск → решение → действие», без лекций. Чтобы начать — просто напишите в Telegram.',
        cta_title: 'Если вам нужен не общий совет, а трезвый разбор вашей ситуации',
        cta_subtitle: 'Давайте обсудим ваш проект',
        cta_placeholder_name: 'Ваше имя',
        cta_placeholder_contact: 'Телеграм, телефон или почта',
        cta_placeholder_msg: 'Коротко опишите ваш проект или ситуацию',
        cta_btn: 'Записаться на консультацию',
        cta_divider: 'или напишите напрямую',
        cta_tg: 'Телеграм',
        cta_ig: 'Инстаграм',
        footer_p1: '© 2025 Fenix Law. Бутиковая юридическая практика.',
        footer_p2: 'Юридическая архитектура для стартапов и технологических компаний.'
    },
    en: {
        page_title: 'Fenix Law — Legal Architecture for Technology Companies and Startups',
        page_desc: 'Fenix Law — boutique legal practice. Legal audit, structuring, AIFC and Astana Hub for technology companies; strategic sessions for startups.',
        burger_label: 'Menu',
        nav_services: 'Services',
        nav_audit: 'Legal Audit',
        nav_approach: 'Approach',
        nav_about: 'About',
        nav_faq: 'FAQ',
        nav_cta: 'Discuss Project',
        hero_badge: 'Boutique Legal Practice',
        hero_title_line1: 'Legal Architecture',
        hero_title_accent: 'for technology companies and startups',
        hero_subtitle: 'I help structure businesses so they can grow, attract investment, and not collapse under a weak legal foundation. Not just documents — a legal architecture that holds up under growth.',
        hero_price_label: 'Legal Audit',
        hero_price_value: 'from 300 000 ₸',
        hero_btn_primary: 'Discuss Project on Telegram',
        hero_btn_outline: 'Learn About Audit',
        hero_scroll: 'Learn more',
        products_label: 'For Technology Companies',
        products_title: 'How I Can Help',
        products_desc: 'Brief overview — discuss details and exact pricing on Telegram',
        p_card1_title: 'Legal Audit',
        p_card1_desc: 'Express review of selected blocks or full deep-dive across all six: structure, IP, team, contracts, data, growth',
        p_card1_price: 'from 300 000 ₸',
        p_card2_title: 'Jurisdictions — AIFC & Astana Hub',
        p_card2_desc: 'Company formation and guided entry into the ecosystem',
        p_card2_price: 'on request',
        p_card3_title: 'Structure & Capital',
        p_card3_desc: 'Co-founder agreements, IP assignment, structuring investment deals',
        p_card4_title: 'Operational Support',
        p_card4_desc: 'Privacy Policy and Terms of Use, team agreements, ongoing legal counsel',
        products_group_label: 'For Startups',
        p_card5_title: 'Strategic Session',
        p_card5_desc: 'Structured review of your situation: risks, equity, product rights, investor readiness',
        method_label: 'Approach',
        method_title: 'How I Think About Legal Architecture',
        method_desc: 'Behind every engagement — one consistent method: not closing a formality, but building a system that holds up under growth',
        method1_title: 'Systems thinking, not point fixes',
        method1_desc: 'A document is always part of a larger structure. When I change one element, I check how it affects the rest.',
        method2_title: 'Decisions built to last',
        method2_desc: 'I look beyond today\'s task — at how the structure will behave through a funding round, team growth, or expansion into a new market.',
        method3_title: 'Regulator logic from the inside',
        method3_desc: 'Having worked within government structures, I understand the logic behind requirements — not as an outside observer, but as someone who helped formulate them.',
        method4_title: 'The language of product, not just papers',
        method4_desc: 'I understand how code, data, and unit economics work — so the document reflects what actually happens in the business.',
        method5_title: 'Prioritisation, not task lists',
        method5_desc: 'Not all risks are equally urgent. I show what needs to be addressed now and what can wait without harming the business.',
        method6_title: 'Bridge between jurisdictions',
        method6_desc: 'Experience with AIFC, Astana Hub, and cross-border structures — I help you understand the consequences of your jurisdiction choice, not guess at it.',
        session_label: 'For Startups',
        session_title: 'Strategic Session — $100',
        session_desc: 'Not a generic call or abstract advice. A structured review of your situation: risks, equity, product rights — with a ready action map at the end.',
        session_result1: 'Clear risk map',
        session_result2: 'Understanding of weak points',
        session_result3: 'Priorities: what first, what later',
        session_btn: 'Book a Strategic Session',
        process_label: 'Process',
        process_title: 'How We Work Together',
        proc1_title: 'Initial Contact',
        proc1_desc: 'A short conversation to understand your situation and define exactly how I can help',
        proc2_title: 'Context Gathering',
        proc2_desc: 'I review your documents, structure, contracts — everything needed for a quality analysis',
        proc3_title: 'Strategic Session',
        proc3_desc: 'Detailed review of your situation: risks, weak spots, opportunities, structure',
        proc4_title: 'Recommendations & Plan',
        proc4_desc: 'Concrete next steps with priorities — what to do first, what later, what can be deferred',
        audit_label: 'For Technology Companies',
        audit_title: 'Legal Audit',
        audit_desc: 'A way to understand where your company\'s legal structure no longer matches its actual state — and fix it before risks hit your money, reputation, or business stability.',
        audit_price_pill: 'Express review — from 300 000 ₸ · Full audit across all blocks — from 700 000 ₸',
        audit1_title: 'Corporate Structure & Control',
        audit1_desc: 'I review the corporate structure, equity distribution, control mechanisms, and protections against unwanted changes.',
        audit2_title: 'Product Rights & IP Chain',
        audit2_desc: 'I analyse who owns the code, design, algorithms, and content. I verify IP assignment from all contributors.',
        audit3_title: 'Team, Contractors & Access',
        audit3_desc: 'I examine the contractual framework with employees, freelancers, and contractors — confidentiality, non-compete, and work-for-hire provisions.',
        audit4_title: 'Client & Partner Agreements',
        audit4_desc: 'I analyse user agreements, partner and counterparty contracts for risks, imbalances, and weak points.',
        audit5_title: 'Personal Data & Public Documents',
        audit5_desc: 'I review data processing policies, consents, and terms of service. Compliance with personal data protection legislation.',
        audit6_title: 'Growth Structure & Jurisdictional Risks',
        audit6_desc: 'I assess readiness for scaling, fundraising, and entering new jurisdictions. I identify bottlenecks that could block growth.',
        audit_hub_badge: 'Astana Hub Participants Only',
        audit_hub_title: 'Additional Block',
        audit_hub_text: 'Alignment of your contractual framework with Astana Hub priority activities — I check how well your current legal structure meets the requirements and opportunities that come with participant status.',
        audit_proc_title: 'How the Audit Works',
        audit_proc1_title: 'Data Collection',
        audit_proc1_desc: 'Kick-off meeting and documents',
        audit_proc2_title: 'Review',
        audit_proc2_desc: 'Legal analysis across key blocks',
        audit_proc3_title: 'Findings',
        audit_proc3_desc: 'Risk prioritisation',
        audit_proc4_title: 'Final',
        audit_proc4_desc: 'Final session and roadmap',
        audit_proc_format: 'Format: interviews + document analysis + analytical report + leadership session',
        audit_cta_btn: 'Discuss Your Company\'s Audit',
        about_photo_alt: 'Nariman — Venture Lawyer, Fenix Law',
        about_label: 'About the Practice',
        about_title: 'Why They Trust Me',
        about_text: 'I am a venture lawyer. I work at the intersection of law, startups, and investment. I understand not just documents, but the nature of technology business — how products are built, how decisions are made, how capital is raised.',
        about_point1: 'Experience with innovation ecosystems and startups',
        about_point2: 'Practice in Astana Hub, AIFC, and cross-border structures',
        about_point3: 'I help build legal structures ready for growth and investment',
        about_point4: 'I understand products, data, teams, and deals — not just paperwork',
        stat1_label: 'strategic sessions',
        stat1_sub: 'CIS · MENA · India · EU',
        stat2_label: 'project engagements',
        stat2_sub: 'structuring · incorporation · deals',
        stat3_label: 'companies on retainer',
        stat3_sub: 'full in-house legal function',
        cases_label: 'Common Situations',
        cases_title: 'Why Clients Come to Me',
        case1: 'A startup approaching investors, but product rights are unregistered — unclear who owns what',
        case2: 'Two co-founders splitting 50/50 with no agreement, no exit rules, no vesting',
        case3: 'A tech company with a strong product but a weak intellectual property framework',
        case4: 'Launching a second product inside an existing company — need a new structure and asset separation',
        case5: 'Entering Astana Hub, AIFC, or the UAE — need a jurisdictional model and understanding of implications',
        case6: 'A platform handling user data with no policies, consent mechanisms, or legal framework in place',
        test_label: 'Testimonials',
        test_title: 'What Clients Say',
        test1_text: '"We run a technology company in the outdoor advertising space and were planning to enter the Abu Dhabi Global Market jurisdiction. Nariman put together a detailed, high-quality entry plan and helped us with the initial steps. A knowledgeable legal advisor."',
        test1_role: 'Founder, WideLoop',
        test2_text: '"I am grateful to Nariman and Fenix Law for competent legal support and help in building a solid external framework — specifically the privacy policy and terms of use. These documents were critical for us, as the project deals with sensitive data of children and teenagers. Nariman also helped us properly structure our relationship with the developer."',
        test2_role: 'Founder, Anama Project',
        test3_text: 'They noted that the session delivered more practical value than major conferences — from choosing between different legal forms to understanding the difference between Astana Hub and AIFC, building a transparent Cap Table, and protecting founder interests when working with investors.',
        test4_text: 'They appreciated the approach — all questions are studied in advance, and the session delivers a ready-made solution structure, without filler or generic advice.',
        faq_label: 'Frequently Asked Questions',
        faq_title: 'Questions & Answers',
        faq1_q: 'What is a legal audit (comprehensive legal review) and why does my company need one?',
        faq1_a: 'It\'s a review of how well your business\'s legal structure — contracts, product rights, corporate framework, data — matches its actual state. Businesses often outgrow their documents: the product works and clients are paying, but agreements, policies, and structure are still at MVP level. The audit shows where the gaps have built up and what needs to be fixed before risks hit your finances or surface during investor due diligence.',
        faq2_q: 'How do I know it\'s time for a legal audit?',
        faq2_a: 'A few typical signals: an investor or major client with due diligence is coming soon; you\'re working with user data; developers and contractors are on service agreements without IP assignment; you\'re an Astana Hub participant using tax benefits; or your business has changed significantly but your charter and contracts haven\'t. If any of these resonate — the audit pays for itself by surfacing the problem before the deal.',
        faq3_q: 'What do I get at the end of an audit?',
        faq3_a: 'An executive summary without filler, a risk map (critical / high / medium with explanation for each), specific edits for each document — what to add, remove, or rewrite — and a 30–60–90 day roadmap. Not an abstract list of remarks, but a ready action plan.',
        faq4_q: 'What\'s the difference between the express review and the full audit?',
        faq4_a: 'The express review (from 300 000 ₸) covers a limited scope — for example, the product block: Terms, Privacy, consent mechanisms — and takes up to a week. The full audit covers all blocks: product, corporate structure, intellectual property, team, growth readiness, plus a separate Astana Hub compliance module for participants. The format is tailored to your situation.',
        faq5_q: 'Why would a tech company incorporate in the AIFC?',
        faq5_a: 'The AIFC offers English common law jurisdiction — a corporate structure that international investors understand. It\'s relevant when you\'re preparing for a round (SAFE, shareholders\' agreement, investor entry), when you want to formalise equity and vesting among co-founders, or when you need to separate ownership, IP, and operating company for work with foreign clients. I handle Private Company registration end-to-end.',
        faq6_q: 'What does Astana Hub participant status give a company?',
        faq6_a: 'The main benefit is tax incentives (CIT, VAT, and others) and access to the ecosystem. But the incentives depend on how your activities are described in contracts, acts, and the business plan — and whether they align with priority activity types. A gap between paper and actual revenue is a direct risk of losing the benefits. So I start not with the application, but with an analysis of the business model, and guide the entry so that you arrive with a legally sound structure.',
        faq7_q: 'Do you only work with startups?',
        faq7_a: 'No. My primary focus is established technology companies: platforms, marketplaces, fintech, SaaS, data and AI products. They need audits, deal structuring, jurisdictions, IP protection. For early-stage startups there\'s a separate, accessible format — the strategic session.',
        faq8_q: 'How does the engagement work and where do we start?',
        faq8_a: 'Usually with a short conversation on Telegram to understand your situation. Then document collection, analysis, and a concrete output: risk map and plan. I work in a "risk → solution → action" format, no lectures. To get started — just write me on Telegram.',
        cta_title: 'If you need a clear-headed review of your situation, not generic advice',
        cta_subtitle: 'Let\'s discuss your project',
        cta_placeholder_name: 'Your name',
        cta_placeholder_contact: 'Telegram, phone or email',
        cta_placeholder_msg: 'Briefly describe your project or situation',
        cta_btn: 'Book a Consultation',
        cta_divider: 'or write directly',
        cta_tg: 'Telegram',
        cta_ig: 'Instagram',
        footer_p1: '© 2025 Fenix Law. Boutique Legal Practice.',
        footer_p2: 'Legal architecture for startups and technology companies.'
    }
};

// ==================== LANGUAGE SWITCHER ====================
function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update page title
    const titleEl = document.querySelector('[data-i18n-title]');
    if (titleEl) titleEl.textContent = t[titleEl.dataset.i18nTitle] || titleEl.textContent;

    // Update meta description
    const metaDesc = document.querySelector('[data-i18n-meta-desc]');
    if (metaDesc) metaDesc.setAttribute('content', t[metaDesc.dataset.i18nMetaDesc] || '');

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // Update inner HTML (for elements with quotes or markup)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.dataset.i18nAria;
        if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    // Update img alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.dataset.i18nAlt;
        if (t[key] !== undefined) el.setAttribute('alt', t[key]);
    });

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Persist preference
    localStorage.setItem('fenix_lang', lang);
}

// Init language toggle buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Apply saved language on load
const savedLang = localStorage.getItem('fenix_lang') || 'ru';
setLanguage(savedLang);
