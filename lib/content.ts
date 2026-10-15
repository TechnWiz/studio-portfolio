/** Studio details are centralized here; replace the generic label and empty contact fields with approved information. */
export const studio = {
  name: "CREATIVE STUDIO",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio-portfolio-smoky.vercel.app",
  logo: "", // Add the approved mark under public/brand and set its public path here.
  location: { en: "Bishkek, Kyrgyzstan", ru: "Бишкек, Кыргызстан" },
  email: "", // An optional public email address; form delivery uses CONTACT_WEBHOOK_URL.
  socials: [] as { label: string; href: string }[],
};

export type Locale = "en" | "ru";
export type ProjectCategory = "Motion" | "Digital" | "Identity";
export type Project = {
  slug: string;
  category: ProjectCategory;
  colors: string;
  // Add optimized local media. Optional fields stay absent until approved assets exist.
  media?: {
    video?: string;
    poster?: string;
    mobileVideo?: string;
    gallery?: { src: string; alt: Record<Locale, string> }[];
    model?: string;
  };
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  narrative: Record<Locale, string>;
  services: Record<Locale, string[]>;
  status: Record<Locale, string>;
  featured: boolean;
};

/** Add verified work or clearly labeled studio concepts here; never present CSS artwork as client media. */
export const projects: Project[] = [
  {
    slug: "silent-orbit", category: "Motion", colors: "violet", featured: true,
    title: { en: "Silent orbit", ru: "Тихая орбита" },
    summary: { en: "A motion concept exploring light, matter and the spaces between.", ru: "Моушн-концепт о свете, материи и пространстве между ними." },
    narrative: { en: "A self-directed motion study in abstract forms and shifting light. This original procedural scene is a studio concept, not commissioned work.", ru: "Самостоятельное моушн-исследование абстрактных форм и меняющегося света. Эта авторская процедурная сцена — концепт студии, а не заказная работа." },
    services: { en: ["3D design", "Motion direction"], ru: ["3D-дизайн", "Моушн-дирекшн"] },
    status: { en: "Studio concept · not client work", ru: "Концепт студии · не клиентский проект" },
  },
  {
    slug: "matter-study", category: "Identity", colors: "amber", featured: true,
    title: { en: "Matter study 04", ru: "Исследование материи 04" },
    summary: { en: "An identity concept built around tactile surfaces and quiet geometry.", ru: "Концепт айдентики на основе тактильных поверхностей и спокойной геометрии." },
    narrative: { en: "A self-directed visual identity study exploring a tactile material language and restrained geometry. The artwork is an abstract studio concept, not a representation of a real client or delivered identity.", ru: "Самостоятельное исследование визуальной айдентики с тактильным языком материалов и сдержанной геометрией. Изображение — абстрактный концепт студии, а не проект для реального клиента или готовая айдентика." },
    services: { en: ["Visual identity", "Art direction"], ru: ["Визуальная айдентика", "Арт-дирекшн"] },
    status: { en: "Studio concept · not client work", ru: "Концепт студии · не клиентский проект" },
  },
  {
    slug: "after-image", category: "Digital", colors: "blue", featured: true,
    title: { en: "After image", ru: "После образа" },
    summary: { en: "A digital experience concept shaped by typography and movement.", ru: "Концепт цифрового опыта, построенного на типографике и движении." },
    narrative: { en: "A self-directed interface concept considering how typography and image might move together. The page uses procedural artwork in place of production media; no client engagement or outcome is implied.", ru: "Самостоятельный концепт интерфейса о том, как типографика и изображение могут двигаться вместе. Вместо готовых материалов здесь процедурная графика; проект не подразумевает работу с клиентом или достигнутый результат." },
    services: { en: ["Web design", "Creative development"], ru: ["Веб-дизайн", "Креативная разработка"] },
    status: { en: "Studio concept · not client work", ru: "Концепт студии · не клиентский проект" },
  },
];

/** Every visitor-facing interface label lives here so pages stay consistent in both locales. */
export const copy = {
  en: {
    seo: { homeTitle: "Independent creative studio in Bishkek", homeDescription: "Independent creative studio in Bishkek working across digital design, development and motion.", workTitle: "Work", workDescription: "Selected digital, identity and motion explorations.", servicesTitle: "Services", servicesDescription: "Web design, development, visual identity, 3D and motion.", studioTitle: "Studio", studioDescription: "An independent creative studio in Bishkek.", contactTitle: "Contact", contactDescription: "Contact the independent creative studio in Bishkek." },
    nav: ["Work", "Services", "Studio", "Contact"], menuOpen: "Open menu", menuClose: "Close menu", language: "Language", mainNavigation: "Main navigation",
    eyebrow: "Independent creative studio · Bishkek, Kyrgyzstan", heroA: "Ideas in", heroB: "another orbit.", intro: "We build distinct digital worlds through design, code and moving image.", explore: "Explore selected work", scroll: "Scroll to discover", heroVisualCaption: ["AN OPEN FIELD", "OF POSSIBILITY"], heroVisualLabel: "DIGITAL ATELIER", cityLabel: "BISHKEK",
    work: "Selected work", allWork: "All projects", allServices: "All services", aboutStudio: "Get to know us", workNote: "A small collection of possible worlds.",
    services: "What we do", servicesNote: "A considered blend of clarity and experimentation.", serviceList: ["Web design", "Web development", "Visual identity", "3D & motion design", "Telegram bots", "Creative development"], serviceDescriptions: ["Digital products with clear structure and a distinctive visual character.", "Fast, accessible interfaces shaped around real needs.", "Identity systems built through thoughtful typography and graphic language.", "Cinematic worlds, materials and movement in 3D.", "Useful bots for communication, automation and services.", "Interactive details and unexpected web experiences."],
    studio: "A studio for things that haven’t been made yet.", studioText: "Independent by nature. Collaborative by design. We bring visual thinking and technical craft together to make digital work with a point of view.", studioTag: "The studio", approachTag: "Approach", capabilitiesTag: "Capabilities", portfolioTag: "Portfolio", openProjectsTag: "Open to selected projects", studioLabel: "Independent · creative · digital", pointOfView: "Our point of view", studioPhilosophy: "Every exploration begins with curiosity. We look for the point where an expressive idea meets precise execution, then give it room to unfold.",
    location: "Based in Bishkek. Working everywhere.", contact: "Have a world in mind?", contactText: "Tell us what you’re imagining. We’ll take it from there.", contactTag: "Get in touch", locationTag: "Location", emailMissing: "Set studio.email to add a direct email contact.", startProject: "Start a conversation",
    footer: "Independent by nature. In orbit since now.", case: "Project notes", role: "Scope", back: "Back to work", next: "Next project", filters: ["All", "Motion", "Digital", "Identity"], filterProjects: "Filter projects", category: { Motion: "Motion", Digital: "Digital", Identity: "Identity" }, projectConcept: "Studio concept", artworkLabel: "Procedural concept artwork", gallery: "Project gallery",
    projectTypes: ["Digital experience", "Visual identity", "3D / motion", "Other"], formName: "Your name", formEmail: "Email address", formType: "Project type", formDescription: "A little about the project", formSubmit: "Send inquiry", formSending: "Sending…", formInvalid: "Please complete all required fields with a valid email address.", formUnavailable: "The contact form is not connected. Configure CONTACT_WEBHOOK_URL to enable delivery.", formSuccess: "Your inquiry has been sent.", formFailure: "We could not send your inquiry. Please try again or contact the studio directly.", exploreModel: "Explore the 3D model", hideModel: "Close the model", modelUnavailable: "The 3D model could not be loaded. Use the preview instead.", mediaFallback: "A still preview is shown because video playback is unavailable.",
  },
  ru: {
    seo: { homeTitle: "Независимая креативная студия в Бишкеке", homeDescription: "Независимая креативная студия в Бишкеке: цифровой дизайн, разработка и моушн.", workTitle: "Работы", workDescription: "Подборка исследований в области цифрового дизайна, айдентики и моушн-дизайна.", servicesTitle: "Услуги", servicesDescription: "Веб-дизайн, разработка, визуальная айдентика, 3D и моушн.", studioTitle: "Студия", studioDescription: "Независимая креативная студия в Бишкеке.", contactTitle: "Контакт", contactDescription: "Свяжитесь с независимой креативной студией в Бишкеке." },
    nav: ["Работы", "Услуги", "Студия", "Контакт"], menuOpen: "Открыть меню", menuClose: "Закрыть меню", language: "Язык", mainNavigation: "Основная навигация",
    eyebrow: "Независимая креативная студия · Бишкек, Кыргызстан", heroA: "Идеи на", heroB: "новой орбите.", intro: "Создаём самобытные цифровые миры на стыке дизайна, кода и видео.", explore: "Смотреть избранные работы", scroll: "Листайте вниз", heroVisualCaption: ["ПОЛЕ", "ВОЗМОЖНОСТЕЙ"], heroVisualLabel: "ЦИФРОВАЯ СТУДИЯ", cityLabel: "БИШКЕК",
    work: "Избранные работы", allWork: "Все проекты", allServices: "Все услуги", aboutStudio: "Познакомиться ближе", workNote: "Небольшая коллекция возможных миров.",
    services: "Чем мы занимаемся", servicesNote: "Продуманное сочетание ясности и эксперимента.", serviceList: ["Веб-дизайн", "Веб-разработка", "Визуальная айдентика", "3D и моушн-дизайн", "Telegram-боты", "Креативная разработка"], serviceDescriptions: ["Цифровые продукты с ясной структурой и выразительным визуальным характером.", "Быстрые и доступные интерфейсы, созданные под реальные задачи.", "Системы айдентики с продуманной типографикой и графическим языком.", "Кинематографичные миры, материалы и движение в 3D.", "Полезные боты для общения, автоматизации и сервисов.", "Интерактивные детали и необычные веб-решения."],
    studio: "Студия идей, которых ещё не существует.", studioText: "Независимые по духу, открытые к сотрудничеству. Мы соединяем визуальное мышление и техническое мастерство, чтобы создавать цифровые проекты с характером.", studioTag: "Студия", approachTag: "Подход", capabilitiesTag: "Компетенции", portfolioTag: "Портфолио", openProjectsTag: "Открыты к отдельным проектам", studioLabel: "Независимость · творчество · цифра", pointOfView: "Наш подход", studioPhilosophy: "Любое исследование начинается с любопытства. Мы ищем точку встречи выразительной идеи и точного исполнения, а затем даём ей развиваться.",
    location: "Бишкек. Работаем по всему миру.", contact: "Есть идея для нового мира?", contactText: "Расскажите, что вы задумали. Дальше — за нами.", contactTag: "Связаться", locationTag: "Местоположение", emailMissing: "Укажите studio.email, чтобы добавить адрес для связи.", startProject: "Начать разговор",
    footer: "Независимы по духу. На орбите с этого момента.", case: "О проекте", role: "Задачи", back: "К проектам", next: "Следующий проект", filters: ["Все", "Моушн", "Цифровое", "Айдентика"], filterProjects: "Фильтровать проекты", category: { Motion: "Моушн", Digital: "Цифровое", Identity: "Айдентика" }, projectConcept: "Концепт студии", artworkLabel: "Процедурный концепт-арт", gallery: "Галерея проекта",
    projectTypes: ["Цифровой проект", "Визуальная айдентика", "3D / моушн", "Другое"], formName: "Ваше имя", formEmail: "Электронная почта", formType: "Тип проекта", formDescription: "Расскажите об идее", formSubmit: "Отправить запрос", formSending: "Отправка…", formInvalid: "Заполните обязательные поля и укажите корректный адрес электронной почты.", formUnavailable: "Форма пока не подключена. Для приёма сообщений настройте CONTACT_WEBHOOK_URL.", formSuccess: "Ваш запрос отправлен.", formFailure: "Не удалось отправить запрос. Попробуйте ещё раз или свяжитесь со студией напрямую.", exploreModel: "Открыть 3D-модель", hideModel: "Закрыть модель", modelUnavailable: "Не удалось загрузить 3D-модель. Можно посмотреть превью.", mediaFallback: "Видео недоступно — показан статичный кадр.",
  },
} as const;

