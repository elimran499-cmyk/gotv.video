export type Lang = 'nl' | 'en' | 'de';

/** Languages in the order the switcher lists them. */
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'nl', label: 'Nederlands' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];
export type Localized = Record<Lang, string>;

/* ------------------------------------------------------------------ */
/* Content figures quoted across the site                              */
/* ------------------------------------------------------------------ */

export const TIER_STATS = {
  basis: { channels: '25.000+', vod: '140.000+' },
  premium: { channels: '80.000+', vod: '200.000+' },
} as const;

/** Head-line channel count, used in general copy. */
export const CHANNEL_COUNT = TIER_STATS.premium.channels;

/** Head-line films & series count, used in general copy. */
export const VOD_COUNT = TIER_STATS.premium.vod;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Channel {
  id: string;
  name: string;
  category: 'nl' | 'sport' | 'vod' | 'intl' | 'kids';
  quality: '4K Ultra HD' | 'Full HD' | '60 FPS';
  /** Emoji fallback, shown when no logo file is present. */
  logo: string;
  /** Bundled logo image, matched on id from src/assets/logos/<id>.png */
  logoSrc?: string;
  currentProgram?: string;
  popular?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'film' | 'serie';
  year: number;
  rating?: number;
  genre: string;
  quality: '4K Ultra HD' | 'Full HD';
  /** Bundled poster image, matched on id from src/assets/posters/<id>.jpg */
  poster: string;
  /** Gradient shown behind the poster while it loads. */
  accent: string;
  badge?: string;
}

export interface MediaRow {
  id: string;
  title: Localized;
  subtitle: Localized;
  items: MediaItem[];
}

export type PlanTierId = 'basis' | 'premium';
export type PlanDurationId = '3m' | '6m' | '15m';

export interface PlanDuration {
  id: PlanDurationId;
  label: Localized;
  months: number;
  /** Discount chip, e.g. '-50%' */
  badge?: string;
  /** Emphasis line, e.g. 'BESTE DEAL' */
  note?: Localized;
}

export interface PlanTier {
  id: PlanTierId;
  name: Localized;
  label: string;
  features: Record<Lang, string[]>;
}

/** A concrete pick from the pricing grid: tier × looptijd × aantal apparaten. */
export interface PlanSelection {
  tier: PlanTierId;
  duration: PlanDurationId;
  devices: number;
}

export interface SetupStep {
  number: number;
  title: Localized;
  description: Localized;
  detail: Localized;
}

export interface DeviceGuide {
  id: string;
  name: string;
  apps: string[];
  description: Localized;
}

export interface FaqItem {
  id: string;
  q: Localized;
  a: Localized;
}

/* ------------------------------------------------------------------ */
/* Channels                                                            */
/* ------------------------------------------------------------------ */

const LOGOS = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const LOGO_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(LOGOS).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    url,
  ])
);

const withLogos = (channels: Channel[]): Channel[] =>
  channels.map((channel) => ({ ...channel, logoSrc: LOGO_BY_ID[channel.id] }));

/**
 * Showcase sample of the line-up. A representative slice used by the
 * auto-scrolling wall — not the full catalogue.
 */
export const CHANNELS: Channel[] = withLogos([
  // ---------------- Sport ----------------
  {
    id: 'ziggo-select',
    name: 'Ziggo Sport Select 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '⚽',
    currentProgram: 'Live: Formule 1 Grand Prix Kwalificatie',
    popular: true
  },
  {
    id: 'viaplay-f1',
    name: 'Viaplay Sport 1 4K 60fps',
    category: 'sport',
    quality: '60 FPS',
    logo: '🏎️',
    currentProgram: 'Live: F1 Max Verstappen On-Board Cam',
    popular: true
  },
  {
    id: 'espn-1',
    name: 'ESPN 1 Eredivisie HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🇳🇱',
    currentProgram: 'Live: Feyenoord vs Ajax (De Klassieker)',
    popular: true
  },
  {
    id: 'espn-2',
    name: 'ESPN 2 UHD',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '⚽',
    currentProgram: 'Live: Keuken Kampioen Divisie',
    popular: false
  },
  {
    id: 'espn-3',
    name: 'ESPN 3 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🥊',
    currentProgram: 'Boksgala & UFC Herhalingen',
    popular: false
  },
  {
    id: 'espn-4',
    name: 'ESPN 4 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🤾',
    currentProgram: 'Handbal & Volleybal Eredivisie',
    popular: false
  },
  {
    id: 'sky-sports-main',
    name: 'Sky Sports Main Event 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'Live: Premier League Super Sunday',
    popular: true
  },

  // ---------------- Nederlandse Zenders ----------------
  {
    id: 'npo-1',
    name: 'NPO 1 4K UHD',
    category: 'nl',
    quality: '4K Ultra HD',
    logo: '📺',
    currentProgram: 'NOS Journaal & Studio Sport',
    popular: true
  },
  {
    id: 'rtl-4',
    name: 'RTL 4 UHD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🔴',
    currentProgram: 'B&B Vol Liefde / RTL Nieuws',
    popular: true
  },
  {
    id: 'sbs-6',
    name: 'SBS 6 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '6️⃣',
    currentProgram: 'Vandaag Inside Live',
    popular: true
  },
  {
    id: 'rtl-7',
    name: 'RTL 7 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🎯',
    currentProgram: 'Darts World Championship',
    popular: false
  },
  {
    id: 'rtl-5',
    name: 'RTL 5 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📺',
    currentProgram: 'Expeditie Robinson',
    popular: false
  },
  {
    id: 'rtl-8',
    name: 'RTL 8 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '8️⃣',
    currentProgram: 'Films & Lifestyle',
    popular: false
  },
  {
    id: 'veronica',
    name: 'Veronica HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🎬',
    currentProgram: 'Actiefilms & Comedyseries',
    popular: false
  },
  {
    id: 'rtl-z',
    name: 'RTL Z HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📈',
    currentProgram: 'Beurs & Zakennieuws',
    popular: false
  },
  {
    id: 'npo-nieuws',
    name: 'NPO Nieuws HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📰',
    currentProgram: 'Doorlopend Nieuwsoverzicht',
    popular: false
  },
  {
    id: 'rtv-noord',
    name: 'RTV Noord HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📡',
    currentProgram: 'Regionaal Nieuws Groningen',
    popular: false
  },

  // ---------------- VOD Film & Series ----------------
  {
    id: 'vod-netflix',
    name: 'Netflix Originals (VOD)',
    category: 'vod',
    quality: '4K Ultra HD',
    logo: '🔴',
    currentProgram: 'Complete Originals Bibliotheek',
    popular: true
  },

  // ---------------- Internationaal ----------------
  {
    id: 'bbc-one',
    name: 'BBC One 4K UK',
    category: 'intl',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'BBC Premier Shows & News',
    popular: false
  },
  {
    id: 'bbc-two',
    name: 'BBC Two HD UK',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇬🇧',
    currentProgram: 'Documentaires & Comedy',
    popular: false
  },
  {
    id: 'cnn-intl',
    name: 'CNN International HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🌐',
    currentProgram: 'Breaking News Wereldwijd',
    popular: false
  },
  {
    id: 'france-24',
    name: 'France 24 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Frans & Engels Nieuws',
    popular: false
  },
  {
    id: 'zdf-de',
    name: 'ZDF HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Heute Journal & Krimi',
    popular: false
  },
  {
    id: 'rtl-de',
    name: 'RTL Television HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Duitse Shows & Series',
    popular: false
  },
  {
    id: 'tf1-fr',
    name: 'TF1 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Franse Series & Films',
    popular: false
  },
  {
    id: 'een-be',
    name: 'Één HD België',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇧🇪',
    currentProgram: 'VRT Journaal & Thuis',
    popular: true
  },

  // ---------------- Kinderen ----------------
  {
    id: 'disney-channel',
    name: 'Disney Channel NL',
    category: 'kids',
    quality: 'Full HD',
    logo: '🏰',
    currentProgram: 'Animatieseries (Nederlands gesproken)',
    popular: false
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon NL HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🟧',
    currentProgram: 'SpongeBob & Paw Patrol NL',
    popular: false
  },
  {
    id: 'cartoon-network',
    name: 'Cartoon Network NL HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎨',
    currentProgram: 'Tekenfilms Nederlands Gesproken',
    popular: false
  },
  {
    id: 'disney-junior',
    name: 'Disney Junior HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🧸',
    currentProgram: 'Series voor de Allerkleinsten',
    popular: false
  },
  {
    id: 'nick-jr',
    name: 'Nick Jr. HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🐾',
    currentProgram: 'Peuter- & Kleuterseries',
    popular: false
  }]);

/* ------------------------------------------------------------------ */
/* Films & series                                                      */
/* ------------------------------------------------------------------ */

const POSTERS = import.meta.glob('../assets/posters/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

type RawMediaItem = Omit<MediaItem, 'poster'>;
type RawMediaRow = Omit<MediaRow, 'items' | 'title' | 'subtitle'> & {
  title: string;
  subtitle: string;
  items: RawMediaItem[];
};

const ROW_COPY_DE: Record<string, { title: string; subtitle: string }> = {
  series: {
    title: 'Die beliebtesten Serien im Moment',
    subtitle: '',
  },
  films: {
    title: 'Die besten Filme 2020–2026',
    subtitle: 'Von preisgekröntem Arthouse bis zu unentdeckten Perlen',
  },
  familie: {
    title: 'Kids & Familie',
    subtitle: 'Zeitlose Klassiker für die ganze Familie',
  },
};

const ROW_COPY_EN: Record<string, { title: string; subtitle: string }> = {
  series: {
    title: 'Most Popular Series Right Now',
    subtitle: '',
  },
  films: {
    title: 'The Best Films 2020–2026',
    subtitle: 'From award-winning arthouse to undiscovered gems',
  },
  familie: {
    title: 'Kids & Family',
    subtitle: 'Timeless classics for the whole family',
  },
};

const withPosters = (rows: RawMediaRow[]): MediaRow[] =>
  rows.map((row) => ({
    ...row,
    title: {
      nl: row.title,
      en: ROW_COPY_EN[row.id]?.title ?? row.title,
      de: ROW_COPY_DE[row.id]?.title ?? row.title,
    },
    subtitle: {
      nl: row.subtitle,
      en: row.subtitle ? ROW_COPY_EN[row.id]?.subtitle ?? row.subtitle : '',
      de: row.subtitle ? ROW_COPY_DE[row.id]?.subtitle ?? row.subtitle : '',
    },
    items: row.items.map((item) => ({
      ...item,
      poster: POSTERS[`../assets/posters/${item.id}.jpg`],
    })),
  }));

export const MEDIA_ROWS: MediaRow[] = withPosters([
  {
    id: 'series',
    title: 'Populairste Series Van Dit Moment',
    subtitle: '',
    items: [
      {
        id: 'sr-house-of-the-dragon',
        title: 'House of the Dragon',
        type: 'serie',
        year: 2022,
        rating: 8.3,
        genre: 'Actie / Avontuur',
        quality: '4K Ultra HD',
        accent: 'from-red-700 to-slate-900',
        badge: '#1 Trending'
      },
      {
        id: 'sr-the-hawk',
        title: 'The Hawk',
        type: 'serie',
        year: 2026,
        rating: 6.4,
        genre: 'Komedie / Sport',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-orange-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-ride-or-die',
        title: 'Ride or Die',
        type: 'serie',
        year: 2026,
        rating: 7.6,
        genre: 'Actie / Avontuur',
        quality: '4K Ultra HD',
        accent: 'from-orange-600 to-red-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-silo',
        title: 'Silo',
        type: 'serie',
        year: 2023,
        rating: 8.1,
        genre: 'Sci-Fi / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-slate-600 to-slate-950'
      },
      {
        id: 'sr-i-will-find-you',
        title: 'I Will Find You',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Misdaad / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-cyan-700 to-slate-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-ransom-canyon',
        title: 'Ransom Canyon',
        type: 'serie',
        year: 2025,
        rating: 6.8,
        genre: 'Drama / Western',
        quality: '4K Ultra HD',
        accent: 'from-amber-700 to-stone-900'
      },
      {
        id: 'sr-lanterns',
        title: 'Lanterns',
        type: 'serie',
        year: 2026,
        genre: 'Actie / Misdaad',
        quality: '4K Ultra HD',
        accent: 'from-emerald-600 to-green-950',
        badge: 'Binnenkort'
      },
      {
        id: 'sr-stuart-fails',
        title: 'Stuart Fails to Save the Universe',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Komedie / Sci-Fi',
        quality: '4K Ultra HD',
        accent: 'from-violet-600 to-indigo-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-lucky',
        title: 'Lucky',
        type: 'serie',
        year: 2026,
        rating: 6.6,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-green-600 to-emerald-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-neuromancer',
        title: 'Neuromancer',
        type: 'serie',
        year: 2027,
        genre: 'Sci-Fi / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-fuchsia-600 to-indigo-950',
        badge: 'Binnenkort'
      },
      {
        id: 'sr-cape-fear',
        title: 'Cape Fear',
        type: 'serie',
        year: 2026,
        rating: 6.8,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-widows-bay',
        title: "Widow's Bay",
        type: 'serie',
        year: 2026,
        rating: 8.1,
        genre: 'Komedie / Horror',
        quality: '4K Ultra HD',
        accent: 'from-purple-700 to-slate-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-game-of-thrones',
        title: 'Game of Thrones',
        type: 'serie',
        year: 2011,
        rating: 9.2,
        genre: 'Drama / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-700 to-neutral-950'
      },
      {
        id: 'sr-little-house',
        title: 'Little House on the Prairie',
        type: 'serie',
        year: 2026,
        rating: 7.3,
        genre: 'Drama / Familie',
        quality: '4K Ultra HD',
        accent: 'from-lime-600 to-emerald-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-gign',
        title: 'GIGN',
        type: 'serie',
        year: 2026,
        rating: 6.3,
        genre: 'Actie',
        quality: '4K Ultra HD',
        accent: 'from-blue-700 to-slate-950',
        badge: 'Nieuw'
      }
    ]
  },
  {
    id: 'films',
    title: 'De Beste Films 2020–2026',
    subtitle: 'Van bekroonde arthouse tot onontdekte parels',
    items: [
      {
        id: 'fl-another-round',
        title: 'Another Round',
        type: 'film',
        year: 2020,
        rating: 7.7,
        genre: 'Komedie / Drama',
        quality: '4K Ultra HD',
        accent: 'from-amber-500 to-orange-800',
        badge: 'Oscar'
      },
      {
        id: 'fl-after-love',
        title: 'After Love',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-rose-600 to-slate-900'
      },
      {
        id: 'fl-da-5-bloods',
        title: 'Da 5 Bloods',
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Avontuur / Oorlog',
        quality: '4K Ultra HD',
        accent: 'from-yellow-700 to-green-950'
      },
      {
        id: 'fl-dear-comrades',
        title: 'Dear Comrades!',
        type: 'film',
        year: 2020,
        rating: 7.4,
        genre: 'Drama / Historisch',
        quality: 'Full HD',
        accent: 'from-red-700 to-neutral-900'
      },
      {
        id: 'fl-devil-all-the-time',
        title: 'The Devil All the Time',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-stone-600 to-stone-950'
      },
      {
        id: 'fl-dinner-in-america',
        title: 'Dinner in America',
        type: 'film',
        year: 2020,
        rating: 7.5,
        genre: 'Komedie / Muziek',
        quality: 'Full HD',
        accent: 'from-pink-600 to-purple-900'
      },
      {
        id: 'fl-the-disciple',
        title: 'The Disciple',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Drama / Muziek',
        quality: 'Full HD',
        accent: 'from-indigo-600 to-slate-900'
      },
      {
        id: 'fl-farewell-amor',
        title: 'Farewell Amor',
        type: 'film',
        year: 2020,
        rating: 6.9,
        genre: 'Drama / Romantiek',
        quality: 'Full HD',
        accent: 'from-fuchsia-600 to-rose-900'
      },
      {
        id: 'fl-father-otac',
        title: 'Father',
        type: 'film',
        year: 2020,
        rating: 7.6,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-slate-500 to-slate-900'
      },
      {
        id: 'fl-the-father',
        title: 'The Father',
        type: 'film',
        year: 2020,
        rating: 8.2,
        genre: 'Drama / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-blue-600 to-indigo-950',
        badge: 'Oscar'
      },
      {
        id: 'fl-fear-strah',
        title: 'Fear',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Komedie / Romantiek',
        quality: 'Full HD',
        accent: 'from-teal-600 to-slate-900'
      },
      {
        id: 'fl-forty-year-old-version',
        title: 'The Forty-Year-Old Version',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Komedie / Drama',
        quality: 'Full HD',
        accent: 'from-neutral-500 to-neutral-900'
      },
      {
        id: 'fl-hamilton',
        title: 'Hamilton',
        type: 'film',
        year: 2020,
        rating: 8.3,
        genre: 'Biografie / Historisch',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-yellow-900',
        badge: 'Top 10'
      },
      {
        id: 'fl-ending-things',
        title: "I'm Thinking of Ending Things",
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Drama / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950'
      },
      {
        id: 'fl-identifying-features',
        title: 'Identifying Features',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-orange-700 to-amber-950'
      }
    ]
  },
  {
    id: 'familie',
    title: 'Kids & Familie',
    subtitle: 'Tijdloze klassiekers voor het hele gezin',
    items: [
      {
        id: 'kf-sinbad',
        title: 'The 7th Voyage of Sinbad',
        type: 'film',
        year: 1958,
        rating: 7.0,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-teal-500 to-blue-900'
      },
      {
        id: 'kf-gulliver',
        title: 'The 3 Worlds of Gulliver',
        type: 'film',
        year: 1960,
        rating: 6.4,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-amber-500 to-orange-800'
      },
      {
        id: 'kf-jason-argonauts',
        title: 'Jason and the Argonauts',
        type: 'film',
        year: 1963,
        rating: 7.3,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-cyan-600 to-blue-900'
      },
      {
        id: 'kf-lotr-1978',
        title: 'The Lord of the Rings',
        type: 'film',
        year: 1978,
        rating: 6.2,
        genre: 'Animatie / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-600 to-stone-900'
      },
      {
        id: 'kf-water-babies',
        title: 'The Water Babies',
        type: 'film',
        year: 1978,
        rating: 6.1,
        genre: 'Animatie / Familie',
        quality: 'Full HD',
        accent: 'from-sky-400 to-cyan-800'
      },
      {
        id: 'kf-watership-down',
        title: 'Watership Down',
        type: 'film',
        year: 1978,
        rating: 7.5,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-lime-600 to-green-900'
      },
      {
        id: 'kf-lion-witch-wardrobe',
        title: 'The Lion, the Witch & the Wardrobe',
        type: 'film',
        year: 1979,
        rating: 7.0,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-amber-600 to-red-900'
      },
      {
        id: 'kf-clash-of-titans',
        title: 'Clash of the Titans',
        type: 'film',
        year: 1981,
        rating: 6.9,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-500 to-slate-900'
      },
      {
        id: 'kf-et',
        title: 'E.T. the Extra-Terrestrial',
        type: 'film',
        year: 1982,
        rating: 7.9,
        genre: 'Familie / Sci-Fi',
        quality: '4K Ultra HD',
        accent: 'from-indigo-500 to-purple-900',
        badge: 'Klassieker'
      },
      {
        id: 'kf-last-unicorn',
        title: 'The Last Unicorn',
        type: 'film',
        year: 1982,
        rating: 7.3,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-pink-400 to-violet-800'
      },
      {
        id: 'kf-dark-crystal',
        title: 'The Dark Crystal',
        type: 'film',
        year: 1982,
        rating: 7.1,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-violet-600 to-indigo-950'
      },
      {
        id: 'kf-wind-in-the-willows',
        title: 'The Wind in the Willows',
        type: 'film',
        year: 1983,
        rating: 7.5,
        genre: 'Animatie / Familie',
        quality: 'Full HD',
        accent: 'from-green-500 to-emerald-900'
      },
      {
        id: 'kf-ghostbusters',
        title: 'Ghostbusters',
        type: 'film',
        year: 1984,
        rating: 7.8,
        genre: 'Komedie / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-500 to-red-900',
        badge: 'Klassieker'
      },
      {
        id: 'kf-karate-kid',
        title: 'The Karate Kid',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Actie / Familie',
        quality: '4K Ultra HD',
        accent: 'from-red-600 to-neutral-900'
      },
      {
        id: 'kf-neverending-story',
        title: 'The NeverEnding Story',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-amber-500 to-purple-900'
      }
    ]
  }]);

/* ------------------------------------------------------------------ */
/* Pricing: tier × looptijd × aantal apparaten                         */
/* ------------------------------------------------------------------ */

export const PLAN_DURATIONS: PlanDuration[] = [
  {
    id: '15m',
    label: { nl: '12 + 3 Maanden', en: '12 + 3 Months', de: '12 + 3 Monate' },
    months: 15,
    badge: '-50%',
    note: { nl: 'BESTE DEAL', en: 'BEST DEAL', de: 'BESTES ANGEBOT' },
  },
  { id: '6m', label: { nl: '6 Maanden', en: '6 Months', de: '6 Monate' }, months: 6 },
  { id: '3m', label: { nl: '3 Maanden', en: '3 Months', de: '3 Monate' }, months: 3 },
];

/** Number of screens that can stream at the same time. */
export const DEVICE_OPTIONS = [1, 2, 3, 4] as const;

export const PLAN_TIERS: Record<PlanTierId, PlanTier> = {
  basis: {
    id: 'basis',
    name: { nl: 'Basis Pakket', en: 'Basic Package', de: 'Basis-Paket' },
    label: 'BASIS',
    features: {
      nl: [
        'SD, HD en Full HD kwaliteit',
        `${TIER_STATS.basis.channels} live zenders`,
        'RTL, NPO, Ziggo, SBS, ESPN en Viaplay',
        `${TIER_STATS.basis.vod} films & series on demand`,
        'Wekelijkse contentupdates',
        'Anti-Freeze technologie',
        'Werkt op al je apparaten',
        'Exclusieve NL & BE content',
        'Netflix, Amazon, HBO, Apple TV & Hulu',
        '100% anoniem kijken',
        '24/7 support in NL & BE',
      ],
      en: [
        'SD, HD and Full HD quality',
        `${TIER_STATS.basis.channels} live channels`,
        'RTL, NPO, Ziggo, SBS, ESPN and Viaplay',
        `${TIER_STATS.basis.vod} movies & series on demand`,
        'Weekly content updates',
        'Anti-Freeze technology',
        'Works on all your devices',
        'Exclusive NL & BE content',
        'Netflix, Amazon, HBO, Apple TV & Hulu',
        '100% anonymous viewing',
        '24/7 support in NL & BE',
      ],
      de: [
        'SD-, HD- und Full-HD-Qualität',
        `${TIER_STATS.basis.channels} Live-Sender`,
        'RTL, NPO, Ziggo, SBS, ESPN und Viaplay',
        `${TIER_STATS.basis.vod} Filme & Serien on demand`,
        'Wöchentliche Content-Updates',
        'Anti-Freeze-Technologie',
        'Läuft auf all deinen Geräten',
        'Exklusive NL- & BE-Inhalte',
        'Netflix, Amazon, HBO, Apple TV & Hulu',
        '100% anonym schauen',
        '24/7-Support',
      ],
    },
  },
  premium: {
    id: 'premium',
    name: { nl: 'Premium VIP Pakket', en: 'Premium VIP Package', de: 'Premium-VIP-Paket' },
    label: 'PREMIUM VIP',
    features: {
      nl: [
        'SD tot 4K, 8K, HDR en VR kwaliteit',
        `${TIER_STATS.premium.channels} live zenders`,
        'RTL, NPO, Ziggo, SBS, ESPN, Viaplay en VTM',
        `${TIER_STATS.premium.vod} films & series on demand`,
        'Dagelijkse contentupdates',
        'Alle sport-PPV evenementen inbegrepen',
        'Enterprise Anti-Freeze PRO',
        'Werkt op al je apparaten',
        'VPN inbegrepen',
        'Exclusieve VIP content',
        'Videoland, Netflix, Amazon, HBO, Apple TV & Hulu',
        'Persoonlijke VIP accountmanager',
        'VIP support, 24/7 bereikbaar',
      ],
      en: [
        'SD up to 4K, 8K, HDR and VR quality',
        `${TIER_STATS.premium.channels} live channels`,
        'RTL, NPO, Ziggo, SBS, ESPN, Viaplay and VTM',
        `${TIER_STATS.premium.vod} movies & series on demand`,
        'Daily content updates',
        'All sports PPV events included',
        'Enterprise Anti-Freeze PRO',
        'Works on all your devices',
        'VPN included',
        'Exclusive VIP content',
        'Videoland, Netflix, Amazon, HBO, Apple TV & Hulu',
        'Personal VIP account manager',
        'VIP support, available 24/7',
      ],
      de: [
        'SD bis 4K, 8K, HDR und VR-Qualität',
        `${TIER_STATS.premium.channels} Live-Sender`,
        'RTL, NPO, Ziggo, SBS, ESPN, Viaplay und VTM',
        `${TIER_STATS.premium.vod} Filme & Serien on demand`,
        'Tägliche Content-Updates',
        'Alle Sport-PPV-Events inklusive',
        'Enterprise Anti-Freeze PRO',
        'Läuft auf all deinen Geräten',
        'VPN inklusive',
        'Exklusive VIP-Inhalte',
        'Videoland, Netflix, Amazon, HBO, Apple TV & Hulu',
        'Persönlicher VIP-Account-Manager',
        'VIP-Support, rund um die Uhr erreichbar',
      ],
    },
  },
};

/** Prices in euro, indexed by tier → looptijd → (aantal apparaten - 1). */
const PRICE_TABLE: Record<PlanTierId, Record<PlanDurationId, number[]>> = {
  basis: {
    '3m': [24.99, 39.99, 49.99, 57.99],
    '6m': [34.99, 49.99, 69.99, 89.99],
    '15m': [49.0, 79.0, 109.0, 129.0],
  },
  premium: {
    '3m': [34.99, 49.99, 69.99, 89.99],
    '6m': [44.99, 79.99, 99.99, 139.99],
    '15m': [78.0, 124.99, 179.99, 199.99],
  },
};

/** One-off price for a tier / looptijd / device-count combination. */
export const getPlanPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => PRICE_TABLE[tier][duration][devices - 1];

/** Effective cost per month, used for the "≈ … per maand" line. */
export const getMonthlyPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => {
  const plan = PLAN_DURATIONS.find((d) => d.id === duration);
  return getPlanPrice(tier, duration, devices) / (plan ? plan.months : 1);
};

export const formatEuro = (value: number): string => `€${value.toFixed(2).replace('.', ',')}`;

/** Shortest term on sale — the entry point, currently 3 months. */
export const SHORTEST_TERM_MONTHS = Math.min(...PLAN_DURATIONS.map((d) => d.months));

/**
 * Human list of the available terms, e.g. "3, 6 of 12 + 3 maanden".
 * Copy that enumerates looptijden reads this so it tracks PLAN_DURATIONS.
 */
export const DURATION_SUMMARY: Localized = (() => {
  const terms = [...PLAN_DURATIONS]
    .sort((x, y) => x.months - y.months)
    .map((d) => d.label.nl.replace(/\s*maanden?/i, '').trim());
  const head = terms.slice(0, -1).join(', ');
  const last = terms[terms.length - 1];
  return {
    nl: `${head} of ${last} maanden`,
    en: `${head} or ${last} months`,
    de: `${head} oder ${last} Monate`,
  };
})();

/** Default selection: the promoted Premium 12+3 bundle on one screen. */
export const DEFAULT_PLAN: PlanSelection = { tier: 'premium', duration: '15m', devices: 1 };

/* ------------------------------------------------------------------ */
/* Setup steps & device guides                                         */
/* ------------------------------------------------------------------ */

export const SETUP_STEPS: SetupStep[] = [
  {
    number: 1,
    title: { nl: 'Kies Je Pakket', en: 'Choose Your Package', de: 'Wähle dein Paket' },
    description: {
      nl: `Selecteer de gewenste looptijd (${DURATION_SUMMARY.nl}) en reken veilig af met iDEAL, creditcard, Apple Pay of crypto.`,
      en: `Select the term you want (${DURATION_SUMMARY.en}) and pay securely with iDEAL, credit card, Apple Pay or crypto.`,
      de: `Wähle die gewünschte Laufzeit (${DURATION_SUMMARY.de}) und bezahle sicher per iDEAL, Kreditkarte, Apple Pay oder Krypto.`,
    },
    detail: {
      nl: 'Geen contract — je verlengt alleen als je dat zelf wilt',
      en: 'No contract — you only renew if you want to',
      de: 'Kein Vertrag — du verlängerst nur, wenn du es selbst willst',
    },
  },
  {
    number: 2,
    title: {
      nl: 'Direct Geactiveerd per Mail & WhatsApp',
      en: 'Activated Instantly by Email & WhatsApp',
      de: 'Sofort aktiviert per E-Mail & WhatsApp',
    },
    description: {
      nl: 'Na je aanvraag ontvang je binnen 2 tot 5 minuten automatisch je M3U-link & Xtream Codes inloggegevens.',
      en: 'Within 2 to 5 minutes of your request you automatically receive your M3U link & Xtream Codes login details.',
      de: 'Innerhalb von 2 bis 5 Minuten nach deiner Anfrage erhältst du automatisch deinen M3U-Link & deine Xtream-Codes-Zugangsdaten.',
    },
    detail: {
      nl: 'Super snelle 24/7 geautomatiseerde oplevering',
      en: 'Super fast, automated delivery 24/7',
      de: 'Superschnelle, automatisierte Lieferung rund um die Uhr',
    },
  },
  {
    number: 3,
    title: { nl: 'Installeer & Begin met Kijken', en: 'Install & Start Watching', de: 'Installieren & losschauen' },
    description: {
      nl: `Vul je inloggegevens in op onze aanbevolen app (IPTV Smarters, IBO Player, TiviMate) en geniet direct van ${CHANNEL_COUNT} zenders!`,
      en: `Enter your login details in one of our recommended apps (IPTV Smarters, IBO Player, TiviMate) and enjoy ${CHANNEL_COUNT} channels right away!`,
      de: `Gib deine Zugangsdaten in einer unserer empfohlenen Apps ein (IPTV Smarters, IBO Player, TiviMate) und genieße sofort ${CHANNEL_COUNT} Sender!`,
    },
    detail: {
      nl: 'Eenvoudige stapsgewijze handleiding inbegrepen',
      en: 'Simple step-by-step guide included',
      de: 'Einfache Schritt-für-Schritt-Anleitung inklusive',
    },
  },
];

export const DEVICE_GUIDES: DeviceGuide[] = [
  {
    id: 'smarttv',
    name: 'Smart TV (Samsung / LG)',
    apps: ['IBO Player', 'Smart One IPTV', 'Nanomid', 'SS IPTV'],
    description: {
      nl: 'Download simpelweg de gratis IBO Player of Smart One app uit de Samsung Tizen Store of LG Content Store, vul je inloggegevens in en klaar!',
      en: 'Simply download the free IBO Player or Smart One app from the Samsung Tizen Store or LG Content Store, enter your login details and you are done!',
      de: 'Lade einfach die kostenlose IBO Player oder Smart One App aus dem Samsung Tizen Store oder LG Content Store, gib deine Zugangsdaten ein und fertig!',
    },
  },
  {
    id: 'firestick',
    name: 'Amazon Firestick & Fire TV',
    apps: ['IPTV Smarters Pro', 'XCIPTV Player', 'TiviMate'],
    description: {
      nl: 'De absolute aanrader voor de snelste zap-ervaring! Werkt fantastisch met TiviMate of IPTV Smarters Pro via de Downloader app.',
      en: 'Our top recommendation for the fastest channel-zapping experience! Works brilliantly with TiviMate or IPTV Smarters Pro via the Downloader app.',
      de: 'Unsere Top-Empfehlung für das schnellste Zapping! Läuft hervorragend mit TiviMate oder IPTV Smarters Pro über die Downloader-App.',
    },
  },
  {
    id: 'android',
    name: 'Android TV / Google TV',
    apps: ['TiviMate 4K', 'IPTV Smarters', 'GSE Smart IPTV'],
    description: {
      nl: 'Installeer direct vanuit de Google Play Store op Sony Bravia, Philips Ambilight, Xiaomi Mi Box of Nvidia Shield.',
      en: 'Install straight from the Google Play Store on Sony Bravia, Philips Ambilight, Xiaomi Mi Box or Nvidia Shield.',
      de: 'Installiere direkt aus dem Google Play Store auf Sony Bravia, Philips Ambilight, Xiaomi Mi Box oder Nvidia Shield.',
    },
  },
  {
    id: 'apple',
    name: 'Apple TV, iPhone & iPad',
    apps: ['IPTV Smarters Lite', 'GSE Smart IPTV', 'Snappier Player'],
    description: {
      nl: 'Download onze partner-app in de App Store, voer je Xtream Codes gegevens in en geniet in 4K op al je Apple schermen.',
      en: 'Download our partner app from the App Store, enter your Xtream Codes details and enjoy 4K on all your Apple screens.',
      de: 'Lade unsere Partner-App im App Store, gib deine Xtream-Codes-Daten ein und genieße 4K auf all deinen Apple-Bildschirmen.',
    },
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS: FaqItem[] = [
  {
    id: 'activation-speed',
    q: {
      nl: 'Hoe snel wordt mijn GOTV account geactiveerd?',
      en: 'How quickly is my GOTV account activated?',
      de: 'Wie schnell wird mein GOTV-Konto aktiviert?',
    },
    a: {
      nl: 'Vrijwel direct! Na het voltooien van je bestelling ontvang je binnen 2 tot 10 minuten je persoonlijke inloggegevens en een overzichtelijke installatiehandleiding via e-mail en WhatsApp.',
      en: 'Almost instantly! After completing your order you receive your personal login details and a clear installation guide by email and WhatsApp within 2 to 10 minutes.',
      de: 'Fast sofort! Nach Abschluss deiner Bestellung erhältst du innerhalb von 2 bis 10 Minuten deine persönlichen Zugangsdaten und eine übersichtliche Installationsanleitung per E-Mail und WhatsApp.',
    },
  },
  {
    id: 'satellite-req',
    q: {
      nl: 'Heb ik een schotelantenne of speciale decoder nodig?',
      en: 'Do I need a satellite dish or a special decoder?',
      de: 'Brauche ich eine Satellitenschüssel oder einen speziellen Decoder?',
    },
    a: {
      nl: 'Nee, absoluut niet! GOTV werkt 100% via internet. Je hebt alleen een internetverbinding nodig en een apparaat zoals een Smart TV, Amazon Firestick, Android box, Apple TV, tablet, smartphone of computer.',
      en: 'No, absolutely not! GOTV works 100% over the internet. All you need is an internet connection and a device such as a Smart TV, Amazon Firestick, Android box, Apple TV, tablet, smartphone or computer.',
      de: 'Nein, überhaupt nicht! GOTV läuft zu 100% über das Internet. Du brauchst nur eine Internetverbindung und ein Gerät wie einen Smart TV, Amazon Firestick, eine Android-Box, ein Smartphone oder einen Computer.',
    },
  },
  {
    id: 'internet-speed',
    q: {
      nl: 'Welke internetsnelheid heb ik minimaal nodig voor 4K streaming?',
      en: 'What is the minimum internet speed I need for 4K streaming?',
      de: 'Welche Internetgeschwindigkeit brauche ich mindestens für 4K-Streaming?',
    },
    a: {
      nl: 'Voor een vloeiende Full HD en 4K Ultra HD ervaring raden we een stabiele internetsnelheid van minimaal 15 tot 25 Mbps aan. Dankzij onze unieke Anti-Freeze™ v9.0 technologie buffert het beeld niet, zelfs niet tijdens drukbezochte sportwedstrijden.',
      en: 'For a smooth Full HD and 4K Ultra HD experience we recommend a stable connection of at least 15 to 25 Mbps. Thanks to our unique Anti-Freeze™ v9.0 technology the picture does not buffer, even during busy sports matches.',
      de: 'Für ein flüssiges Full-HD- und 4K-Ultra-HD-Erlebnis empfehlen wir eine stabile Verbindung von mindestens 15 bis 25 Mbit/s. Dank unserer Anti-Freeze-Technologie läuft das Bild auch zu Stoßzeiten stabil.',
    },
  },
  {
    id: 'device-compatibility',
    q: {
      nl: 'Op welke apparaten en apps kan ik GOTV gebruiken?',
      en: 'On which devices and apps can I use GOTV?',
      de: 'Auf welchen Geräten und Apps kann ich GOTV nutzen?',
    },
    a: {
      nl: 'GOTV is compatibel met vrijwel elk modern scherm: Samsung & LG Smart TV (via IBO Player, Nanomid of Smart One), Android TV, Amazon Fire Stick (via IPTV Smarters Pro of XCIPTV), Apple TV (via GSE of TiviMate), iOS, Android telefoons en Windows/Mac.',
      en: 'GOTV is compatible with virtually every modern screen: Samsung & LG Smart TV (via IBO Player, Nanomid or Smart One), Android TV, Amazon Fire Stick (via IPTV Smarters Pro or XCIPTV), Apple TV (via GSE or TiviMate), iOS, Android phones and Windows/Mac.',
      de: 'GOTV ist mit praktisch jedem modernen Bildschirm kompatibel: Samsung & LG Smart TV (über IBO Player, Nanomid oder Smart One), Android TV, Amazon Firestick, Apple TV, iPhone, iPad, Windows, Mac und Enigma2-Receiver.',
    },
  },
  {
    id: 'sports-channels',
    q: {
      nl: 'Zitten Formule 1 (Viaplay), Viaplay, Ziggo Sport en ESPN inbegrepen?',
      en: 'Are Formula 1 (Viaplay), Viaplay, Ziggo Sport and ESPN included?',
      de: 'Sind Formel 1 (Viaplay), Viaplay, Ziggo Sport und ESPN enthalten?',
    },
    a: {
      nl: 'Ja! Alle Nederlandse top-sportkanalen, inclusief alle Viaplay streams, Ziggo Sport Totaal, ESPN 1-4 en internationale sportzenders zijn standaard inbegrepen in 4K Ultra HD kwaliteit met 60 FPS zonder extra maandelijkse kosten.',
      en: 'Yes! All top Dutch sports channels, including every Viaplay stream, Ziggo Sport Totaal, ESPN 1-4 and international sports channels, are included as standard in 4K Ultra HD at 60 FPS with no extra monthly cost.',
      de: 'Ja! Alle niederländischen Top-Sportsender, einschließlich aller Viaplay-Streams, Ziggo Sport Totaal, ESPN 1-4 und internationaler Sportsender, sind enthalten.',
    },
  },
  {
    id: 'first-package',
    q: {
      nl: 'Kan ik eerst een korte periode uitproberen?',
      en: 'Can I try it for a short period first?',
      de: 'Kann ich es zuerst für kurze Zeit ausprobieren?',
    },
    a: {
      nl: `We werken niet met gratis proefaccounts, maar je kunt zonder enige verplichting starten met het pakket van ${SHORTEST_TERM_MONTHS} maanden — dat is onze kortste looptijd. Er is geen contract en geen automatische verlenging: je bepaalt zelf of je daarna verlengt. Twijfel je welk pakket past? Stel je vraag via WhatsApp, dan denken we vrijblijvend met je mee.`,
      en: `We do not offer free trial accounts, but you can start with no obligation on the ${SHORTEST_TERM_MONTHS}-month package — our shortest term. There is no contract and no automatic renewal: you decide whether to renew afterwards. Not sure which package fits? Ask us on WhatsApp and we will gladly think along with you.`,
      de: `Wir bieten keine kostenlosen Testzugänge an, aber du kannst unverbindlich mit dem ${SHORTEST_TERM_MONTHS}-Monats-Paket starten — unserer kürzesten Laufzeit. Es gibt keine automatische Verlängerung.`,
    },
  },
];

/* ------------------------------------------------------------------ */
/* Contact: orders and support run over WhatsApp                       */
/* ------------------------------------------------------------------ */

/** Number in international format without + or spaces. */
export const WHATSAPP_NUMBER = '447414662070';

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Default message for the general "Neem contact op" buttons. */
export const contactLink = (lang: Lang): string =>
  whatsappLink(
    {
      nl: 'Hallo GOTV, ik heb een vraag over jullie IPTV-pakketten.',
      en: 'Hello GOTV, I have a question about your IPTV packages.',
      de: 'Hallo GOTV, ich habe eine Frage zu euren IPTV-Paketen.',
    }[lang]
  );

/**
 * Order link with every chosen option in the message, so support knows
 * right away which package, term and number of screens it concerns.
 */
export const orderLink = (selection: PlanSelection, lang: Lang): string => {
  const tier = PLAN_TIERS[selection.tier];
  const duration = PLAN_DURATIONS.find((d) => d.id === selection.duration) ?? PLAN_DURATIONS[0];
  const price = formatEuro(getPlanPrice(selection.tier, selection.duration, selection.devices));
  const { devices } = selection;

  const lines: Record<Lang, string[]> = {
    nl: [
      `Hallo GOTV, ik wil het ${tier.name.nl} bestellen.`,
      '',
      `Looptijd: ${duration.label.nl}`,
      `Schermen: ${devices} ${devices === 1 ? 'apparaat' : 'apparaten'}`,
      `Prijs: ${price}`,
    ],
    en: [
      `Hello GOTV, I would like to order the ${tier.name.en}.`,
      '',
      `Term: ${duration.label.en}`,
      `Screens: ${devices} ${devices === 1 ? 'device' : 'devices'}`,
      `Price: ${price}`,
    ],
    de: [
      `Hallo GOTV, ich möchte das ${tier.name.de} bestellen.`,
      '',
      `Laufzeit: ${duration.label.de}`,
      `Bildschirme: ${devices} ${devices === 1 ? 'Gerät' : 'Geräte'}`,
      `Preis: ${price}`,
    ],
  };

  return whatsappLink(lines[lang].join('\n'));
};
