import { Lang, TIER_STATS, formatEuro, getPlanPrice } from '../data/mockData';
import { PageId } from './routes';

/**
 * Text and links that only a section page has. The homepage shows the same
 * sections, so this is what makes /zenders, /prijzen and the others pages of
 * their own, and where they point readers to the pages that go deeper.
 */

export interface ExtraBlock {
  heading: string;
  text: string;
}

/** A link to another page (`page`) or a blog article (`post` = its id). */
export interface ExtraLink {
  page?: PageId;
  post?: string;
  label: string;
}

export interface PageExtra {
  blocks: ExtraBlock[];
  linksTitle: string;
  links: ExtraLink[];
}

const B = TIER_STATS.basis;
const P = TIER_STATS.premium;
const basis3 = formatEuro(getPlanPrice('basis', '3m', 1));
const basis15 = formatEuro(getPlanPrice('basis', '15m', 1));
const premium3 = formatEuro(getPlanPrice('premium', '3m', 1));
const premium15 = formatEuro(getPlanPrice('premium', '15m', 1));

export const PAGE_EXTRAS: Record<Exclude<PageId, 'home'>, Record<Lang, PageExtra>> = {
  channels: {
    nl: {
      blocks: [
        {
          heading: 'Live sport zonder losse abonnementen',
          text: 'Voetbal, Formule 1, darts en tennis staan bij de meeste aanbieders verspreid over meerdere betaalde pakketten. In de zenderlijst van GOTV zitten Ziggo Sport, ESPN 1 tot en met 4 en Viaplay in hetzelfde account, zodat je voor de Eredivisie, de Grand Prix en de Champions League niet hoeft te wisselen van app of abonnement.',
        },
        {
          heading: 'Basis of Premium: hoeveel zenders krijg je?',
          text: `Het Basis pakket bevat ${B.channels} live zenders in SD, HD en Full HD. Premium VIP breidt dat uit naar ${P.channels} zenders en voegt 4K toe. Beide pakketten bevatten alle Nederlandse en Belgische zenders; het verschil zit in de beeldkwaliteit en het internationale aanbod.`,
        },
      ],
      linksTitle: 'Verder lezen',
      links: [
        { page: 'pricing', label: 'Vergelijk Basis en Premium VIP' },
        { page: 'movies', label: 'Films en series on demand' },
        { post: 'speed-for-4k', label: 'Welke internetsnelheid heb je nodig voor 4K?' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Live-Sport ohne einzelne Abos',
          text: 'Fußball, Formel 1, Darts und Tennis sind bei den meisten Anbietern über mehrere kostenpflichtige Pakete verteilt. In der Senderliste von GOTV liegen die Sportsender im selben Zugang, sodass du für das Spiel am Samstag und das Rennen am Sonntag weder App noch Abo wechseln musst.',
        },
        {
          heading: 'Basis oder Premium: wie viele Sender bekommst du?',
          text: `Das Basis-Paket enthält ${B.channels} Live-Sender in SD, HD und Full HD. Premium VIP erweitert das auf ${P.channels} Sender und bringt 4K dazu. Der Unterschied liegt in der Bildqualität und im internationalen Angebot.`,
        },
      ],
      linksTitle: 'Weiterlesen',
      links: [
        { page: 'pricing', label: 'Basis und Premium VIP vergleichen' },
        { page: 'movies', label: 'Filme und Serien on demand' },
        { post: 'speed-for-4k', label: 'Welche Internetgeschwindigkeit braucht 4K?' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'Live sport without separate subscriptions',
          text: 'Football, Formula 1, darts and tennis are spread over several paid packages at most providers. In the GOTV channel list, Ziggo Sport, ESPN 1 to 4 and Viaplay sit in the same account, so you do not switch apps or subscriptions for the Eredivisie, the Grand Prix and the Champions League.',
        },
        {
          heading: 'Basic or Premium: how many channels do you get?',
          text: `The Basic package has ${B.channels} live channels in SD, HD and Full HD. Premium VIP extends that to ${P.channels} channels and adds 4K. Both include every Dutch and Belgian channel; the difference is picture quality and the international range.`,
        },
      ],
      linksTitle: 'Read on',
      links: [
        { page: 'pricing', label: 'Compare Basic and Premium VIP' },
        { page: 'movies', label: 'Movies and series on demand' },
        { post: 'speed-for-4k', label: 'What internet speed do you need for 4K?' },
      ],
    },
  },
  movies: {
    nl: {
      blocks: [
        {
          heading: 'Zo werkt on demand kijken via IPTV',
          text: 'De films en series staan in dezelfde speler-app als je live zenders, in een eigen tabblad. Je zoekt op titel, kiest een aflevering en kijkt verder waar je gebleven was. Er is geen aparte streamingdienst of extra login nodig.',
        },
        {
          heading: 'Hoe groot is de bibliotheek?',
          text: `Met Basis kies je uit ${B.vod} films en series, met Premium VIP uit ${P.vod}. Elke week komen er nieuwe titels bij. Voor 4K titels heb je Premium VIP en een stabiele internetverbinding nodig.`,
        },
      ],
      linksTitle: 'Verder lezen',
      links: [
        { page: 'pricing', label: 'Bekijk de pakketten en prijzen' },
        { page: 'channels', label: 'De volledige zenderlijst' },
        { post: 'fix-buffering', label: 'Beeld hapert? Dit los je zelf op' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'So funktioniert On-Demand über IPTV',
          text: 'Filme und Serien liegen in derselben Player-App wie deine Live-Sender, in einem eigenen Bereich. Du suchst nach dem Titel, wählst eine Folge und schaust dort weiter, wo du aufgehört hast. Ein eigener Streamingdienst oder ein zusätzlicher Login ist nicht nötig.',
        },
        {
          heading: 'Wie groß ist die Mediathek?',
          text: `Mit Basis wählst du aus ${B.vod} Filmen und Serien, mit Premium VIP aus ${P.vod}. Jede Woche kommen neue Titel dazu. Für 4K-Titel brauchst du Premium VIP und eine stabile Internetverbindung.`,
        },
      ],
      linksTitle: 'Weiterlesen',
      links: [
        { page: 'pricing', label: 'Pakete und Preise ansehen' },
        { page: 'channels', label: 'Die komplette Senderliste' },
        { post: 'fix-buffering', label: 'Bild ruckelt? Das kannst du selbst beheben' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'How on-demand viewing works over IPTV',
          text: 'Movies and series live in the same player app as your live channels, in their own tab. You search by title, pick an episode and carry on where you left off. No separate streaming service or extra login is needed.',
        },
        {
          heading: 'How big is the library?',
          text: `Basic gives you ${B.vod} movies and series, Premium VIP ${P.vod}. New titles are added every week. For 4K titles you need Premium VIP and a stable internet connection.`,
        },
      ],
      linksTitle: 'Read on',
      links: [
        { page: 'pricing', label: 'See the packages and prices' },
        { page: 'channels', label: 'The full channel list' },
        { post: 'fix-buffering', label: 'Picture stuttering? Fix it yourself' },
      ],
    },
  },
  pricing: {
    nl: {
      blocks: [
        {
          heading: 'Wat kost een IPTV abonnement bij GOTV?',
          text: `Voor één apparaat kost het Basis pakket ${basis3} voor 3 maanden en ${basis15} voor 12 maanden met 3 maanden gratis. Premium VIP kost ${premium3} voor 3 maanden en ${premium15} voor 15 maanden. Wil je op meerdere schermen tegelijk kijken, dan kies je 2, 3 of 4 apparaten en zie je de prijs meteen.`,
        },
        {
          heading: 'Betalen en activeren',
          text: 'Je betaalt eenmalig, onder meer met iDEAL, Bancontact, creditcard of Apple Pay. Na je betaling ontvang je de inloggegevens via WhatsApp, meestal binnen 5 minuten. Het abonnement stopt vanzelf aan het einde van de looptijd; verlengen doe je alleen als je dat zelf wilt.',
        },
      ],
      linksTitle: 'Verder lezen',
      links: [
        { page: 'faq', label: 'Veelgestelde vragen over betalen en activeren' },
        { page: 'guides', label: 'IPTV installeren op je apparaat' },
        { page: 'features', label: 'Waarom kiezen voor GOTV' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Was kostet ein IPTV Abo bei GOTV?',
          text: `Für ein Gerät kostet das Basis-Paket ${basis3} für 3 Monate und ${basis15} für 12 Monate mit 3 Monaten gratis. Premium VIP kostet ${premium3} für 3 Monate und ${premium15} für 15 Monate. Für mehrere Bildschirme gleichzeitig wählst du 2, 3 oder 4 Geräte und siehst den Preis sofort.`,
        },
        {
          heading: 'Bezahlen und Aktivieren',
          text: 'Du zahlst einmalig, unter anderem per Kreditkarte, Apple Pay oder iDEAL. Nach der Zahlung erhältst du die Zugangsdaten per WhatsApp, meist innerhalb von 5 Minuten. Das Abo endet automatisch am Ende der Laufzeit; verlängert wird nur, wenn du es möchtest.',
        },
      ],
      linksTitle: 'Weiterlesen',
      links: [
        { page: 'faq', label: 'Häufige Fragen zu Zahlung und Aktivierung' },
        { page: 'guides', label: 'IPTV auf deinem Gerät einrichten' },
        { page: 'features', label: 'Warum GOTV' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'What does an IPTV subscription cost at GOTV?',
          text: `For one device, the Basic package costs ${basis3} for 3 months and ${basis15} for 12 months with 3 months free. Premium VIP costs ${premium3} for 3 months and ${premium15} for 15 months. To watch on several screens at once, pick 2, 3 or 4 devices and the price updates straight away.`,
        },
        {
          heading: 'Paying and activating',
          text: 'You pay once, with iDEAL, Bancontact, credit card or Apple Pay among others. After payment you receive your login details over WhatsApp, usually within 5 minutes. The subscription ends by itself at the end of the term; you only renew if you choose to.',
        },
      ],
      linksTitle: 'Read on',
      links: [
        { page: 'faq', label: 'Questions about payment and activation' },
        { page: 'guides', label: 'Set up IPTV on your device' },
        { page: 'features', label: 'Why choose GOTV' },
      ],
    },
  },
  features: {
    nl: {
      blocks: [
        {
          heading: 'Wat anti-freeze in de praktijk betekent',
          text: 'Haperend beeld ontstaat meestal op drukke momenten, zoals vlak voor de aftrap. Anti-freeze verdeelt kijkers over meerdere servers en schakelt automatisch over als een stream vertraagt. Je merkt daar zelf niets van, behalve dat het beeld blijft lopen.',
        },
        {
          heading: 'Hulp van mensen, niet van een formulier',
          text: 'Loop je vast bij de installatie of werkt een zender niet, dan stuur je een bericht via WhatsApp. Je krijgt antwoord van een medewerker die met je meekijkt, in het Nederlands, ook in het weekend.',
        },
      ],
      linksTitle: 'Verder lezen',
      links: [
        { page: 'pricing', label: 'Bekijk de pakketten en prijzen' },
        { page: 'channels', label: 'Bekijk de zenderlijst' },
        { post: 'fix-buffering', label: 'Wat je zelf kunt doen tegen haperend beeld' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Was Anti-Freeze in der Praxis bedeutet',
          text: 'Ruckeln entsteht meist zu Stoßzeiten, etwa kurz vor dem Anpfiff. Anti-Freeze verteilt die Zuschauer auf mehrere Server und schaltet automatisch um, wenn ein Stream langsamer wird. Du merkst davon nichts, außer dass das Bild weiterläuft.',
        },
        {
          heading: 'Hilfe von Menschen, nicht von einem Formular',
          text: 'Hängst du bei der Installation fest oder läuft ein Sender nicht, schreibst du uns per WhatsApp. Du bekommst Antwort von einer Person, die mit dir draufschaut, auch am Wochenende.',
        },
      ],
      linksTitle: 'Weiterlesen',
      links: [
        { page: 'pricing', label: 'Pakete und Preise ansehen' },
        { page: 'channels', label: 'Senderliste ansehen' },
        { post: 'fix-buffering', label: 'Was du selbst gegen Ruckeln tun kannst' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'What anti-freeze means in practice',
          text: 'A stuttering picture usually happens at busy moments, such as right before kick-off. Anti-freeze spreads viewers over several servers and switches automatically when a stream slows down. You notice nothing, except that the picture keeps running.',
        },
        {
          heading: 'Help from people, not from a form',
          text: 'If you get stuck during setup or a channel does not work, you send a message on WhatsApp. A member of the team answers and looks at it with you, weekends included.',
        },
      ],
      linksTitle: 'Read on',
      links: [
        { page: 'pricing', label: 'See the packages and prices' },
        { page: 'channels', label: 'Browse the channel list' },
        { post: 'fix-buffering', label: 'What you can do yourself about buffering' },
      ],
    },
  },
  guides: {
    nl: {
      blocks: [
        {
          heading: 'Wat heb je nodig om IPTV te installeren?',
          text: 'Drie dingen: een apparaat met een speler-app (Smart TV, Firestick, Android TV, Apple TV, telefoon of MAG box), een internetverbinding van ongeveer 25 Mbps voor 4K, en de inloggegevens die je na je bestelling ontvangt. Een schotel, coaxkabel of monteur is niet nodig.',
        },
        {
          heading: 'M3U-link of Xtream Codes?',
          text: 'De meeste apps accepteren beide. Xtream Codes (servernaam, gebruikersnaam en wachtwoord) laadt sneller en geeft je meteen de tv-gids en de film- en seriebibliotheek. Een M3U-link gebruik je als je app geen Xtream Codes ondersteunt.',
        },
      ],
      linksTitle: 'Uitgebreide handleidingen',
      links: [
        { post: 'smart-tv-setup', label: 'IPTV installeren op een Samsung of LG Smart TV' },
        { post: 'firestick-setup', label: 'IPTV installeren op een Amazon Firestick' },
        { post: 'speed-for-4k', label: 'Welke internetsnelheid heb je nodig?' },
        { page: 'faq', label: 'Veelgestelde vragen' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Was brauchst du, um IPTV einzurichten?',
          text: 'Drei Dinge: ein Gerät mit einer Player-App (Smart TV, Fire TV Stick, Android TV, Apple TV, Smartphone oder MAG Box), eine Internetverbindung von etwa 25 Mbit/s für 4K und die Zugangsdaten, die du nach der Bestellung erhältst. Schüssel, Koaxkabel oder Techniker brauchst du nicht.',
        },
        {
          heading: 'M3U-Link oder Xtream Codes?',
          text: 'Die meisten Apps akzeptieren beides. Xtream Codes (Servername, Benutzername und Passwort) lädt schneller und liefert direkt den TV-Guide sowie die Film- und Serienbibliothek. Einen M3U-Link nutzt du, wenn deine App keine Xtream Codes unterstützt.',
        },
      ],
      linksTitle: 'Ausführliche Anleitungen',
      links: [
        { post: 'smart-tv-setup', label: 'IPTV auf Samsung oder LG Smart TV einrichten' },
        { post: 'firestick-setup', label: 'IPTV auf dem Fire TV Stick einrichten' },
        { post: 'speed-for-4k', label: 'Welche Internetgeschwindigkeit brauchst du?' },
        { page: 'faq', label: 'Häufige Fragen' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'What do you need to set up IPTV?',
          text: 'Three things: a device with a player app (Smart TV, Firestick, Android TV, Apple TV, phone or MAG box), an internet connection of about 25 Mbps for 4K, and the login details you receive after ordering. No dish, coax cable or engineer is needed.',
        },
        {
          heading: 'M3U link or Xtream Codes?',
          text: 'Most apps accept both. Xtream Codes (server name, username and password) loads faster and gives you the TV guide and the movie and series library right away. Use an M3U link when your app does not support Xtream Codes.',
        },
      ],
      linksTitle: 'Detailed guides',
      links: [
        { post: 'smart-tv-setup', label: 'Set up IPTV on a Samsung or LG Smart TV' },
        { post: 'firestick-setup', label: 'Set up IPTV on an Amazon Firestick' },
        { post: 'speed-for-4k', label: 'What internet speed do you need?' },
        { page: 'faq', label: 'Frequently asked questions' },
      ],
    },
  },
  blog: {
    nl: {
      blocks: [
        {
          heading: 'Waar begin je?',
          text: 'Ben je nieuw met IPTV, lees dan eerst de installatiehandleiding voor jouw apparaat. Kijk je al en loopt het beeld niet soepel, dan helpen de artikelen over internetsnelheid en haperend beeld je in een paar minuten verder.',
        },
      ],
      linksTitle: 'Handig om te weten',
      links: [
        { page: 'guides', label: 'IPTV installeren in 3 stappen' },
        { page: 'faq', label: 'Veelgestelde vragen' },
        { page: 'pricing', label: 'Pakketten en prijzen' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Wo fängst du an?',
          text: 'Bist du neu bei IPTV, lies zuerst die Einrichtungsanleitung für dein Gerät. Schaust du schon und das Bild läuft nicht flüssig, helfen dir die Artikel über Internetgeschwindigkeit und Ruckeln in wenigen Minuten weiter.',
        },
      ],
      linksTitle: 'Gut zu wissen',
      links: [
        { page: 'guides', label: 'IPTV einrichten in 3 Schritten' },
        { page: 'faq', label: 'Häufige Fragen' },
        { page: 'pricing', label: 'Pakete und Preise' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'Where do you start?',
          text: 'If you are new to IPTV, read the setup guide for your device first. If you are already watching and the picture is not smooth, the articles on internet speed and buffering get you further in a few minutes.',
        },
      ],
      linksTitle: 'Good to know',
      links: [
        { page: 'guides', label: 'Set up IPTV in 3 steps' },
        { page: 'faq', label: 'Frequently asked questions' },
        { page: 'pricing', label: 'Packages and prices' },
      ],
    },
  },
  faq: {
    nl: {
      blocks: [
        {
          heading: 'Meer uitleg per onderwerp',
          text: 'Sommige antwoorden vragen om meer dan een paar zinnen. Voor de installatie per apparaat, de internetsnelheid die je nodig hebt en haperend beeld hebben we aparte handleidingen. Prijzen en looptijden vind je op de pakkettenpagina.',
        },
      ],
      linksTitle: 'Lees verder over',
      links: [
        { page: 'guides', label: 'Installatie op Smart TV, Firestick en meer' },
        { page: 'pricing', label: 'Pakketten, prijzen en looptijden' },
        { post: 'fix-buffering', label: 'Haperend beeld oplossen' },
        { post: 'speed-for-4k', label: 'Internetsnelheid voor 4K' },
      ],
    },
    de: {
      blocks: [
        {
          heading: 'Mehr Erklärung je Thema',
          text: 'Manche Antworten brauchen mehr als ein paar Sätze. Für die Einrichtung je Gerät, die nötige Internetgeschwindigkeit und ruckelndes Bild gibt es eigene Anleitungen. Preise und Laufzeiten findest du auf der Paketseite.',
        },
      ],
      linksTitle: 'Mehr dazu',
      links: [
        { page: 'guides', label: 'Einrichtung auf Smart TV, Fire TV Stick und mehr' },
        { page: 'pricing', label: 'Pakete, Preise und Laufzeiten' },
        { post: 'fix-buffering', label: 'Ruckelndes Bild beheben' },
        { post: 'speed-for-4k', label: 'Internetgeschwindigkeit für 4K' },
      ],
    },
    en: {
      blocks: [
        {
          heading: 'More detail per topic',
          text: 'Some answers need more than a few sentences. For setup per device, the internet speed you need and a stuttering picture we have separate guides. Prices and terms are on the packages page.',
        },
      ],
      linksTitle: 'Read more about',
      links: [
        { page: 'guides', label: 'Setup on Smart TV, Firestick and more' },
        { page: 'pricing', label: 'Packages, prices and terms' },
        { post: 'fix-buffering', label: 'Fixing a stuttering picture' },
        { post: 'speed-for-4k', label: 'Internet speed for 4K' },
      ],
    },
  },
};
