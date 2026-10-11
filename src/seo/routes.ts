import { CHANNEL_COUNT, VOD_COUNT, Lang, Localized } from '../data/mockData';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';

/**
 * Every page of the site, in every language, with its own address.
 *
 * Dutch lives at the root, German under /de and English under /en. The same
 * table drives the router, the links in the menus, the <head> tags, the
 * sitemap and the pre-rendered HTML, so a page added here shows up everywhere.
 */

/** The address the site is served on. Canonical links and the sitemap use it. */
export const SITE_URL = 'https://gotv.video';
export const SITE_NAME = 'GOTV';

export type PageId = 'home' | 'channels' | 'movies' | 'pricing' | 'features' | 'guides' | 'blog' | 'faq';

/** The section pages, in menu order. */
export const SECTION_PAGES: Exclude<PageId, 'home'>[] = [
  'channels',
  'movies',
  'pricing',
  'features',
  'guides',
  'blog',
  'faq',
];

/** The id of the section each page shows (also its anchor on the homepage). */
export const SECTION_ID: Record<Exclude<PageId, 'home'>, string> = {
  channels: 'zenders',
  movies: 'films',
  pricing: 'prijzen',
  features: 'functionaliteiten',
  guides: 'handleidingen',
  blog: 'blog',
  faq: 'faq',
};

const SLUGS: Record<Exclude<PageId, 'home'>, Localized> = {
  channels: { nl: 'zenders', de: 'sender', en: 'channels' },
  movies: { nl: 'films-series', de: 'filme-serien', en: 'movies-series' },
  pricing: { nl: 'prijzen', de: 'preise', en: 'pricing' },
  features: { nl: 'waarom-gotv', de: 'warum-gotv', en: 'why-gotv' },
  guides: { nl: 'installatie', de: 'installation', en: 'installation' },
  blog: { nl: 'blog', de: 'blog', en: 'blog' },
  faq: { nl: 'veelgestelde-vragen', de: 'faq', en: 'faq' },
};

const PREFIX: Record<Lang, string> = { nl: '', de: '/de', en: '/en' };
export const ROUTE_LANGS: Lang[] = ['nl', 'de', 'en'];

export interface Route {
  page: PageId;
  lang: Lang;
  /** Set on a blog article. */
  post?: BlogPost;
  /** True when the address matches no page. */
  notFound?: boolean;
}

export const pagePath = (page: PageId, lang: Lang): string =>
  page === 'home' ? PREFIX[lang] || '/' : `${PREFIX[lang]}/${SLUGS[page][lang]}`;

export const postPath = (post: BlogPost, lang: Lang): string => `${pagePath('blog', lang)}/${post.id}`;

export const routePath = (route: Route): string =>
  route.post ? postPath(route.post, route.lang) : pagePath(route.page, route.lang);

/** The same page in another language. */
export const translatePath = (route: Route, lang: Lang): string => routePath({ ...route, lang });

export const absoluteUrl = (path: string): string => `${SITE_URL}${path === '/' ? '/' : path}`;

/** Reads an address ("/de/preise") back into a page. */
export const matchRoute = (rawPath: string): Route => {
  const clean = (rawPath.split(/[?#]/)[0].replace(/\/+$/, '') || '/').toLowerCase();
  const parts = clean.split('/').filter(Boolean);
  let lang: Lang = 'nl';
  if (parts[0] === 'de' || parts[0] === 'en') lang = parts.shift() as Lang;

  if (parts.length === 0) return { page: 'home', lang };
  const page = SECTION_PAGES.find((id) => SLUGS[id][lang] === parts[0]);
  if (page && parts.length === 1) return { page, lang };
  if (page === 'blog' && parts.length === 2) {
    const post = BLOG_POSTS.find((p) => p.id === parts[1]);
    if (post) return { page: 'blog', lang, post };
  }
  return { page: 'home', lang, notFound: true };
};

/** Every indexable page: 8 pages and the blog articles, in three languages. */
export const allRoutes = (): Route[] =>
  ROUTE_LANGS.flatMap((lang) => [
    { page: 'home' as PageId, lang },
    ...SECTION_PAGES.map((page) => ({ page: page as PageId, lang })),
    ...BLOG_POSTS.map((post) => ({ page: 'blog' as PageId, lang, post })),
  ]);

/* ------------------------------------------------------------------ */
/* What each page says about itself                                    */
/* ------------------------------------------------------------------ */

export interface PageCopy {
  /** <title>: under 60 characters, keyword first. */
  title: string;
  /** Meta description: 120–160 characters. */
  description: string;
  /** The page's own headline (the homepage keeps its hero headline). */
  h1: string;
  /** A short opening paragraph that only this page has. */
  intro: string;
  /** Name in menus and breadcrumbs. */
  label: string;
}

const C = CHANNEL_COUNT;
const V = VOD_COUNT;

export const PAGE_COPY: Record<PageId, Record<Lang, PageCopy>> = {
  home: {
    nl: {
      title: 'IPTV Kopen Nederland | GOTV 4K IPTV Abonnement',
      description: `IPTV kopen bij GOTV: ${C} live zenders en ${V} films & series in 4K. Nederlandse zenders, Viaplay, Ziggo Sport en ESPN. Direct actief, zonder contract.`,
      h1: 'IPTV kopen in Nederland',
      intro: '',
      label: 'Home',
    },
    de: {
      title: 'IPTV kaufen | GOTV 4K IPTV Abo ohne Vertrag',
      description: `IPTV kaufen bei GOTV: ${C} Live-Sender und ${V} Filme & Serien in 4K. Deutsche und internationale Sender, Live-Sport, sofort aktiv und ohne Vertrag.`,
      h1: 'IPTV kaufen',
      intro: '',
      label: 'Start',
    },
    en: {
      title: 'Buy IPTV Netherlands | GOTV 4K IPTV Subscription',
      description: `Buy IPTV from GOTV: ${C} live channels and ${V} movies & series in 4K. Dutch and international channels, live sport, instant activation, no contract.`,
      h1: 'Buy IPTV in the Netherlands',
      intro: '',
      label: 'Home',
    },
  },
  channels: {
    nl: {
      title: 'IPTV Zenders: Nederlandse Zenderlijst & Sport | GOTV',
      description: `Bekijk de IPTV zenderlijst van GOTV: ${C} live zenders met NPO, RTL, SBS, Ziggo Sport, ESPN en Viaplay in HD en 4K. Inclusief tv-gids en terugkijken.`,
      h1: 'IPTV zenders: alle Nederlandse zenders en live sport',
      intro: `Met een IPTV abonnement van GOTV kijk je ${C} live zenders op één account. Alle Nederlandse zenders zoals NPO 1, RTL 4 en SBS 6 zitten erin, samen met Ziggo Sport, ESPN en Viaplay voor Eredivisie, Formule 1 en Champions League. Zoek hieronder op zender of filter op categorie om te zien wat er in de zenderlijst zit.`,
      label: 'Zenders',
    },
    de: {
      title: 'IPTV Sender: Senderliste & Live-Sport in 4K | GOTV',
      description: `Die IPTV Senderliste von GOTV: ${C} Live-Sender mit deutschen und internationalen Programmen, Live-Sport, Kinder- und Nachrichtensendern in HD und 4K.`,
      h1: 'IPTV Sender: Senderliste mit Live-Sport',
      intro: `Mit einem IPTV Abo von GOTV schaust du ${C} Live-Sender mit einem einzigen Zugang. Deutsche Programme wie ZDF und RTL sind ebenso dabei wie internationale Sender, Live-Sport, Nachrichten und Kinderprogramm. Suche unten nach einem Sender oder filtere nach Kategorie, um die Senderliste zu durchstöbern.`,
      label: 'Sender',
    },
    en: {
      title: 'IPTV Channels: Dutch Channel List & Live Sport | GOTV',
      description: `Browse the GOTV IPTV channel list: ${C} live channels including NPO, RTL, SBS, Ziggo Sport, ESPN and Viaplay in HD and 4K, with TV guide and catch-up.`,
      h1: 'IPTV channels: every Dutch channel and live sport',
      intro: `A GOTV IPTV subscription gives you ${C} live channels on one account. Every Dutch channel such as NPO 1, RTL 4 and SBS 6 is included, together with Ziggo Sport, ESPN and Viaplay for Eredivisie football, Formula 1 and the Champions League. Search for a channel below or filter by category to see what is in the channel list.`,
      label: 'Channels',
    },
  },
  movies: {
    nl: {
      title: 'IPTV Films & Series met NL Ondertiteling | GOTV',
      description: `Films en series kijken via IPTV: ${V} titels on demand bij GOTV, met Nederlandse ondertiteling en in 4K. Nieuwe releases worden wekelijks toegevoegd.`,
      h1: 'IPTV films en series on demand',
      intro: `Naast live tv krijg je bij GOTV een bibliotheek van ${V} films en series die je kijkt wanneer het jou uitkomt. Van nieuwe bioscoopfilms tot complete seizoenen, veel met Nederlandse ondertiteling en in 4K. De collectie wordt elke week aangevuld en zit zonder meerprijs in je IPTV abonnement.`,
      label: 'Films & Series',
    },
    de: {
      title: 'IPTV Filme & Serien on demand in 4K | GOTV',
      description: `Filme und Serien per IPTV streamen: ${V} Titel on demand bei GOTV, viele in 4K und mit Untertiteln. Neue Veröffentlichungen kommen jede Woche dazu.`,
      h1: 'IPTV Filme und Serien on demand',
      intro: `Neben Live-TV bekommst du bei GOTV eine Mediathek mit ${V} Filmen und Serien, die du schaust, wann es dir passt. Von aktuellen Kinofilmen bis zu kompletten Staffeln, viele davon in 4K. Die Auswahl wird jede Woche erweitert und ist ohne Aufpreis in deinem IPTV Abo enthalten.`,
      label: 'Filme & Serien',
    },
    en: {
      title: 'IPTV Movies & Series On Demand in 4K | GOTV',
      description: `Stream movies and series over IPTV: ${V} titles on demand at GOTV, many in 4K and with Dutch subtitles. New releases are added every week.`,
      h1: 'IPTV movies and series on demand',
      intro: `Alongside live TV, GOTV gives you a library of ${V} movies and series to watch whenever it suits you. From new cinema releases to complete seasons, many with Dutch subtitles and in 4K. The collection grows every week and is included in your IPTV subscription at no extra cost.`,
      label: 'Movies & Series',
    },
  },
  pricing: {
    nl: {
      title: 'IPTV Abonnement Prijzen: 3, 6 of 15 Maanden | GOTV',
      description: 'Vergelijk de IPTV abonnementen van GOTV: Basis of Premium VIP voor 3, 6 of 12+3 maanden, op 1 tot 4 apparaten. Eenmalig betalen, geen contract, direct actief.',
      h1: 'IPTV abonnement: prijzen en pakketten',
      intro: 'Kies het IPTV abonnement dat bij je past. Je betaalt één keer voor de looptijd die je kiest: 3 maanden, 6 maanden of 12 maanden met 3 maanden gratis. Er is geen contract en niets wordt automatisch verlengd. Bepaal hieronder je pakket, de looptijd en op hoeveel apparaten je tegelijk wilt kijken; de prijs past zich direct aan.',
      label: 'Prijzen',
    },
    de: {
      title: 'IPTV Abo Preise: 3, 6 oder 15 Monate | GOTV',
      description: 'Vergleiche die IPTV Abos von GOTV: Basis oder Premium VIP für 3, 6 oder 12+3 Monate, auf 1 bis 4 Geräten. Einmal zahlen, kein Vertrag, sofort aktiv.',
      h1: 'IPTV Abo: Preise und Pakete',
      intro: 'Wähle das IPTV Abo, das zu dir passt. Du zahlst einmal für die gewählte Laufzeit: 3 Monate, 6 Monate oder 12 Monate mit 3 Monaten gratis. Es gibt keinen Vertrag und keine automatische Verlängerung. Stelle unten Paket, Laufzeit und die Anzahl der gleichzeitigen Geräte ein; der Preis passt sich sofort an.',
      label: 'Preise',
    },
    en: {
      title: 'IPTV Subscription Prices: 3, 6 or 15 Months | GOTV',
      description: 'Compare GOTV IPTV subscriptions: Basic or Premium VIP for 3, 6 or 12+3 months, on 1 to 4 devices. One payment, no contract, instant activation.',
      h1: 'IPTV subscription: prices and packages',
      intro: 'Pick the IPTV subscription that suits you. You pay once for the term you choose: 3 months, 6 months, or 12 months with 3 months free. There is no contract and nothing renews automatically. Set your package, the term and how many devices should stream at once below; the price updates straight away.',
      label: 'Pricing',
    },
  },
  features: {
    nl: {
      title: 'Beste IPTV Aanbieder: 4K, Anti-Freeze & Support | GOTV',
      description: 'Waarom GOTV de beste IPTV aanbieder voor jou is: stabiele 4K streams met anti-freeze, Europese servers, tv-gids, terugkijken en 24/7 Nederlandse support.',
      h1: 'Waarom GOTV: stabiele IPTV in 4K',
      intro: 'Een goede IPTV aanbieder herken je aan beeld dat niet hapert tijdens de wedstrijd. GOTV draait op eigen Europese servers met anti-freeze technologie, zodat streams ook op drukke avonden stabiel blijven. Je krijgt 4K kwaliteit, een volledige tv-gids, terugkijken en hulp van Nederlandse support via WhatsApp, zeven dagen per week.',
      label: 'Waarom GOTV',
    },
    de: {
      title: 'Bester IPTV Anbieder: 4K, Anti-Freeze & Support | GOTV',
      description: 'Warum GOTV der passende IPTV Anbieter ist: stabile 4K-Streams mit Anti-Freeze, europäische Server, TV-Guide, Replay und Support rund um die Uhr.',
      h1: 'Warum GOTV: stabiles IPTV in 4K',
      intro: 'Einen guten IPTV Anbieter erkennst du daran, dass das Bild auch beim Spiel nicht ruckelt. GOTV läuft auf eigenen europäischen Servern mit Anti-Freeze-Technik, damit Streams auch an vollen Abenden stabil bleiben. Du bekommst 4K-Qualität, einen kompletten TV-Guide, Replay und Hilfe vom Support per WhatsApp, sieben Tage die Woche.',
      label: 'Warum GOTV',
    },
    en: {
      title: 'Best IPTV Provider: 4K, Anti-Freeze & Support | GOTV',
      description: 'Why GOTV is the right IPTV provider: stable 4K streams with anti-freeze, European servers, TV guide, catch-up and 24/7 support over WhatsApp.',
      h1: 'Why GOTV: stable IPTV in 4K',
      intro: 'You recognise a good IPTV provider by a picture that does not stutter during the match. GOTV runs on its own European servers with anti-freeze technology, so streams stay stable on busy evenings too. You get 4K quality, a full TV guide, catch-up and help from support over WhatsApp, seven days a week.',
      label: 'Why GOTV',
    },
  },
  guides: {
    nl: {
      title: 'IPTV Installeren: Smart TV, Firestick & Android | GOTV',
      description: 'IPTV installeren in 3 stappen op Samsung of LG Smart TV, Amazon Firestick, Android TV, Apple TV, iPhone en MAG box. Met IBO Player, Smarters of TiviMate.',
      h1: 'IPTV installeren op elk apparaat',
      intro: 'IPTV installeren duurt een paar minuten en je hebt er geen schotel of extra kastje voor nodig. Je downloadt een speler-app zoals IBO Player, IPTV Smarters of TiviMate, vult de gegevens in die je na je bestelling ontvangt en je kijkt. Kies hieronder je apparaat voor de stappen op Smart TV, Firestick, Android TV, Apple TV of MAG box.',
      label: 'Installatie',
    },
    de: {
      title: 'IPTV einrichten: Smart TV, Fire TV Stick & Android | GOTV',
      description: 'IPTV einrichten in 3 Schritten auf Samsung oder LG Smart TV, Fire TV Stick, Android TV, Apple TV, iPhone und MAG Box. Mit IBO Player, Smarters oder TiviMate.',
      h1: 'IPTV einrichten auf jedem Gerät',
      intro: 'IPTV einzurichten dauert nur ein paar Minuten, ganz ohne Schüssel oder Zusatzbox. Du lädst eine Player-App wie IBO Player, IPTV Smarters oder TiviMate, gibst die Zugangsdaten ein, die du nach der Bestellung erhältst, und schaust los. Wähle unten dein Gerät für die Schritte auf Smart TV, Fire TV Stick, Android TV, Apple TV oder MAG Box.',
      label: 'Installation',
    },
    en: {
      title: 'IPTV Setup: Smart TV, Firestick & Android | GOTV',
      description: 'Set up IPTV in 3 steps on a Samsung or LG Smart TV, Amazon Firestick, Android TV, Apple TV, iPhone or MAG box. Works with IBO Player, Smarters and TiviMate.',
      h1: 'Set up IPTV on any device',
      intro: 'Setting up IPTV takes a few minutes and needs no dish or extra box. You download a player app such as IBO Player, IPTV Smarters or TiviMate, enter the details you receive after ordering, and start watching. Choose your device below for the steps on Smart TV, Firestick, Android TV, Apple TV or MAG box.',
      label: 'Installation',
    },
  },
  blog: {
    nl: {
      title: 'IPTV Blog: Tips, Handleidingen & Oplossingen | GOTV',
      description: 'Het GOTV blog: korte IPTV handleidingen van ons supportteam. IPTV installeren op je Smart TV, de juiste internetsnelheid voor 4K en haperend beeld oplossen.',
      h1: 'IPTV blog: tips en handleidingen',
      intro: 'Op het GOTV blog deelt ons supportteam wat in de praktijk werkt. Lees hoe je IPTV installeert op een Smart TV, welke internetsnelheid je nodig hebt voor 4K en wat je doet als het beeld hapert of buffert.',
      label: 'Blog',
    },
    de: {
      title: 'IPTV Blog: Tipps, Anleitungen & Lösungen | GOTV',
      description: 'Der GOTV Blog: kurze IPTV Anleitungen von unserem Support. IPTV auf dem Smart TV einrichten, die richtige Internetgeschwindigkeit für 4K und Ruckeln beheben.',
      h1: 'IPTV Blog: Tipps und Anleitungen',
      intro: 'Im GOTV Blog teilt unser Support, was in der Praxis funktioniert. Lies, wie du IPTV auf einem Smart TV einrichtest, welche Internetgeschwindigkeit du für 4K brauchst und was hilft, wenn das Bild ruckelt oder puffert.',
      label: 'Blog',
    },
    en: {
      title: 'IPTV Blog: Tips, Guides & Fixes | GOTV',
      description: 'The GOTV blog: short IPTV guides from our support team. Setting up IPTV on a Smart TV, the internet speed you need for 4K, and how to fix buffering.',
      h1: 'IPTV blog: tips and guides',
      intro: 'On the GOTV blog our support team shares what works in practice. Read how to set up IPTV on a Smart TV, what internet speed you need for 4K, and what to do when the picture stutters or buffers.',
      label: 'Blog',
    },
  },
  faq: {
    nl: {
      title: 'IPTV Veelgestelde Vragen: Activatie & Betalen | GOTV',
      description: 'Antwoord op veelgestelde vragen over IPTV bij GOTV: hoe snel je account actief is, betalen met iDEAL, kijken op meerdere apparaten, VPN en support.',
      h1: 'Veelgestelde vragen over IPTV',
      intro: 'Hier vind je de vragen die we het vaakst krijgen over een IPTV abonnement bij GOTV: activatie, betalen, apparaten, beeldkwaliteit en support. Staat je vraag er niet tussen? Stuur ons een bericht via WhatsApp, meestal heb je binnen een paar minuten antwoord.',
      label: 'Veelgestelde vragen',
    },
    de: {
      title: 'IPTV FAQ: Aktivierung, Zahlung & Geräte | GOTV',
      description: 'Antworten auf häufige Fragen zu IPTV bei GOTV: wie schnell dein Zugang aktiv ist, Zahlungsarten, mehrere Geräte gleichzeitig, VPN und Support.',
      h1: 'Häufige Fragen zu IPTV',
      intro: 'Hier findest du die Fragen, die wir am häufigsten zu einem IPTV Abo bei GOTV bekommen: Aktivierung, Zahlung, Geräte, Bildqualität und Support. Deine Frage ist nicht dabei? Schreib uns per WhatsApp, meist antworten wir innerhalb weniger Minuten.',
      label: 'FAQ',
    },
    en: {
      title: 'IPTV FAQ: Activation, Payment & Devices | GOTV',
      description: 'Answers to frequently asked questions about IPTV at GOTV: how fast your account is activated, payment methods, multiple devices, VPN and support.',
      h1: 'Frequently asked questions about IPTV',
      intro: 'These are the questions we get most often about an IPTV subscription at GOTV: activation, payment, devices, picture quality and support. Is yours not listed? Send us a message on WhatsApp and you usually have an answer within a few minutes.',
      label: 'FAQ',
    },
  },
};

/** Title, description and headline for a page or a blog article. */
export const copyFor = (route: Route): PageCopy => {
  if (!route.post) return PAGE_COPY[route.page][route.lang];
  const title = route.post.title[route.lang];
  // The excerpt is short, so the description continues with the article's first lines.
  const opening = `${route.post.excerpt[route.lang]} ${route.post.body[route.lang][0].text}`;
  const description =
    opening.length <= 158 ? opening : `${opening.slice(0, 156).replace(/\s+\S*$/, '').replace(/[,;:.]$/, '')}…`;
  return {
    title: `${title} | ${SITE_NAME}`.length <= 62 ? `${title} | ${SITE_NAME}` : title,
    description,
    h1: title,
    intro: route.post.excerpt[route.lang],
    label: title,
  };
};
