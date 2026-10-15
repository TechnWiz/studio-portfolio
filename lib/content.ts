/** Studio details are centralized here. Replace the placeholder identity and links once supplied. */
export const studio = {
  name: "CREATIVE STUDIO",
  logo: "", // Optional path such as /brand/logo.svg; no logo was present in the supplied assets.
  location: "Bishkek, Kyrgyzstan",
  email: "", // Add a real inbox to enable the contact form's mailto handoff.
  socials: [] as { label: string; href: string }[],
};

export type Locale = "en" | "ru";
export type Project = {
  slug: string;
  category: "Motion" | "Digital" | "Identity";
  colors: string;
  media?: { video?: string; poster?: string; mobileVideo?: string; model?: string };
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  narrative: Record<Locale, string>;
  services: Record<Locale, string[]>;
  featured: boolean;
};

/** Add projects here. Keep media local under public/media/work/<slug>/ when available. */
export const projects: Project[] = [
  { slug: "silent-orbit", category: "Motion", colors: "violet", title: { en: "Silent orbit", ru: "Тихая орбита" }, summary: { en: "A study of light, matter and the spaces between.", ru: "Исследование света, материи и пространства между ними." }, narrative: { en: "An imagined landscape built from slow-moving forms and shifting light. This placeholder case is ready for the studio's film, stills and process notes.", ru: "Воображаемый ландшафт из медленно движущихся форм и меняющегося света. Этот макет кейса готов к добавлению видео, кадров и заметок о процессе." }, services: { en: ["3D design", "Motion direction"], ru: ["3D-дизайн", "Моушн-дирекшн"] }, featured: true },
  { slug: "matter-study", category: "Identity", colors: "amber", title: { en: "Matter study 04", ru: "Исследование материи 04" }, summary: { en: "Material, shape and a new visual language.", ru: "Материал, форма и новый визуальный язык." }, narrative: { en: "A visual identity exploration focused on tactile surfaces and quiet geometry. Replace this concept artwork and copy with an approved studio project.", ru: "Исследование визуальной айдентики, основанное на фактурных поверхностях и спокойной геометрии. Замените концепт-арт и текст подтверждённым проектом студии." }, services: { en: ["Visual identity", "Art direction"], ru: ["Визуальная айдентика", "Арт-дирекшн"] }, featured: true },
  { slug: "after-image", category: "Digital", colors: "blue", title: { en: "After image", ru: "После образа" }, summary: { en: "A digital space shaped by movement.", ru: "Цифровое пространство, сформированное движением." }, narrative: { en: "A responsive digital experience where typography and image move as one. The project system supports a video cover, image gallery and optional interactive model.", ru: "Адаптивный цифровой опыт, в котором типографика и изображение движутся вместе. Система поддерживает видеообложку, галерею и интерактивную 3D-модель." }, services: { en: ["Web design", "Creative development"], ru: ["Веб-дизайн", "Креативная разработка"] }, featured: true },
];

export const copy = {
  en: {
    nav: ["Work", "Services", "Studio", "Contact"],
    eyebrow: "Independent creative studio · Bishkek, Kyrgyzstan",
    heroA: "Ideas in",
    heroB: "another orbit.",
    intro: "We build distinct digital worlds through design, code and moving image.",
    explore: "Explore selected work",
    work: "Selected work",
    allWork: "All projects",
    workNote: "A small collection of possible worlds.",
    services: "What we do",
    servicesNote: "A considered blend of clarity and experimentation.",
    serviceList: ["Web design", "Web development", "Visual identity", "3D & motion design", "Telegram bots", "Creative development"],
    studio: "A studio for things that haven’t been made yet.",
    studioText: "Independent by nature. Collaborative by design. We bring visual thinking and technical craft together to make digital work with a point of view.",
    location: "Based in Bishkek. Working everywhere.",
    contact: "Have a world in mind?",
    contactText: "Tell us what you’re imagining. We’ll take it from there.",
    startProject: "Start a conversation",
    footer: "Independent by nature. In orbit since now.",
    case: "Project notes",
    role: "Scope",
    back: "Back to work",
    next: "Next project",
    filters: ["All", "Motion", "Digital", "Identity"],
  },
  ru: {
    nav: ["Работы", "Услуги", "Студия", "Контакт"],
    eyebrow: "Независимая креативная студия · Бишкек, Кыргызстан",
    heroA: "Идеи на",
    heroB: "новой орбите.",
    intro: "Создаём самобытные цифровые миры на стыке дизайна, кода и видео.",
    explore: "Смотреть избранные работы",
    work: "Избранные работы",
    allWork: "Все проекты",
    workNote: "Небольшая коллекция возможных миров.",
    services: "Чем мы занимаемся",
    servicesNote: "Продуманное сочетание ясности и эксперимента.",
    serviceList: ["Веб-дизайн", "Веб-разработка", "Визуальная айдентика", "3D и моушн-дизайн", "Telegram-боты", "Креативная разработка"],
    studio: "Студия идей, которых ещё не существует.",
    studioText: "Независимые по духу, открытые к сотрудничеству. Мы соединяем визуальное мышление и техническое мастерство, чтобы создавать цифровые проекты с характером.",
    location: "Бишкек. Работаем по всему миру.",
    contact: "Есть идея для нового мира?",
    contactText: "Расскажите, что вы задумали. Дальше — за нами.",
    startProject: "Начать разговор",
    footer: "Независимы по духу. На орбите с этого момента.",
    case: "О проекте",
    role: "Задачи",
    back: "К проектам",
    next: "Следующий проект",
    filters: ["Все", "Моушн", "Цифровое", "Айдентика"],
  },
} as const;

