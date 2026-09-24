export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  note?: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  text: string;
  items: string[];
  time: string;
  icon: string;
}

export interface ProjectItem {
  name: string;
  catKey: "residential" | "interiors" | "commercial";
  cat: string;
  city: string;
  area: string;
  floors: string;
  year: string;
  hasImage: boolean;
}

export interface StepItem {
  n: string;
  time: string;
  title: string;
  text: string;
}

export interface MixRow {
  label: string;
  pct: number;
  color: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  nav: {
    studio: string;
    services: string;
    projects: string;
    process: string;
    contact: string;
    cta: string;
    langLabel: string;
    langHref: string;
    menuLabel: string;
  };
  brand: { name: string; role: string };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: StatItem[];
    model: { tag: string; scale: string; elev: string; gfa: string };
    floatCard: {
      title: string;
      floorsLabel: string;
      floors: string;
      plotLabel: string;
      plot: string;
      permitLabel: string;
      permit: string;
    };
  };
  marquee: string[];
  studio: {
    eyebrow: string;
    title: string;
    text: string;
    featured: { tag: string; name: string; area: string; floors: string; year: string };
    cards: { title: string; note: string; icon: string }[];
  };
  bigStats: {
    eyebrow: string;
    title: string;
    updated: string;
    stats: StatItem[];
    mix: { title: string; note: string; rows: MixRow[]; avgLabel: string; avgValue: string };
  };
  services: {
    eyebrow: string;
    title: string;
    text: string;
    items: ServiceItem[];
    timelineLabel: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    filters: { key: string; label: string }[];
    items: ProjectItem[];
    areaLabel: string;
    floorsLabel: string;
    cityLabel: string;
    yearLabel: string;
    photoPlaceholder: string;
  };
  process: {
    eyebrow: string;
    title: string;
    badge: string;
    steps: StepItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    addressLabel: string;
    address: string;
    whatsapp: string;
    formTitle: string;
    form: {
      name: string;
      phone: string;
      service: string;
      services: string[];
      area: string;
      message: string;
      submit: string;
      sent: string;
    };
  };
  footer: {
    nav: { label: string; href: string }[];
    copyright: string;
    tagline: string;
  };
}
