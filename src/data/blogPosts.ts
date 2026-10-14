import { Lang, Localized } from './mockData';
import coverSetup from '../assets/images/blog_smart-tv-setup.jpg';
import coverSpeed from '../assets/images/blog_speed-for-4k.jpg';
import coverSport from '../assets/images/blog_fix-buffering.jpg';
import coverStick from '../assets/images/blog_firestick-setup.jpg';

export interface BlogSection {
  heading: string;
  text: string;
}

export interface BlogPost {
  id: string;
  cover: string;
  /** Reading time in minutes. */
  minutes: number;
  /** Day it was published (YYYY-MM-DD). */
  date: string;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  body: Record<Lang, BlogSection[]>;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'smart-tv-setup',
    cover: coverSetup,
    minutes: 4,
    date: '2026-10-11',
    category: { nl: 'Handleiding', en: 'Guide', de: 'Anleitung' },
    title: {
      nl: 'IPTV installeren op je Smart TV in 5 minuten',
      en: 'Setting up IPTV on your Smart TV in 5 minutes',
      de: 'IPTV auf dem Smart TV einrichten in 5 Minuten',
    },
    excerpt: {
      nl: 'Van app downloaden tot je eerste zender: zo zet je IPTV stap voor stap op een Samsung of LG.',
      en: 'From downloading the app to your first channel: IPTV on a Samsung or LG, step by step.',
      de: 'Vom App-Download bis zum ersten Sender: IPTV auf Samsung oder LG, Schritt für Schritt.',
    },
    body: {
      nl: [
        {
          heading: '1. Kies een speler-app',
          text: 'Open de app-winkel van je tv (Samsung Tizen Store of LG Content Store) en zoek naar een IPTV-speler zoals IBO Player of Smart One IPTV. De app zelf bevat geen zenders: het is alleen de speler waarin je straks je gegevens invult.',
        },
        {
          heading: '2. Vul je gegevens in',
          text: 'Na je bestelling krijg je een M3U-link of Xtream Codes gegevens (servernaam, gebruikersnaam en wachtwoord). Kies in de app voor "Xtream Codes" als dat kan: dat laadt sneller en geeft je meteen de tv-gids en de film- en seriebibliotheek erbij.',
        },
        {
          heading: '3. Laat de lijst laden',
          text: 'De eerste keer duurt het laden een minuut of twee, omdat de volledige zenderlijst wordt opgehaald. Daarna start de app binnen een paar seconden. Zet je favoriete zenders in een eigen lijst, dan hoef je nooit meer te zoeken.',
        },
        {
          heading: 'Kom je er niet uit?',
          text: 'Stuur ons een bericht via WhatsApp met het merk van je tv. We lopen de installatie dan samen met je door.',
        },
      ],
      en: [
        {
          heading: '1. Pick a player app',
          text: 'Open your TV app store (Samsung Tizen Store or LG Content Store) and search for an IPTV player such as IBO Player or Smart One IPTV. The app itself contains no channels: it is only the player you enter your details into.',
        },
        {
          heading: '2. Enter your details',
          text: 'After ordering you receive an M3U link or Xtream Codes details (server, username and password). Choose "Xtream Codes" in the app if you can: it loads faster and brings the TV guide and the film and series library along with it.',
        },
        {
          heading: '3. Let the list load',
          text: 'The first load takes a minute or two, because the full channel list is fetched. After that the app starts within seconds. Put your favourite channels in your own list and you never have to search again.',
        },
        {
          heading: 'Stuck?',
          text: 'Send us a WhatsApp message with the brand of your TV and we will walk through the installation with you.',
        },
      ],
      de: [
        {
          heading: '1. Wähle eine Player-App',
          text: 'Öffne den App-Store deines Fernsehers (Samsung Tizen Store oder LG Content Store) und suche nach einem IPTV-Player wie IBO Player oder Smart One IPTV. Die App selbst enthält keine Sender: Sie ist nur der Player, in den du deine Daten einträgst.',
        },
        {
          heading: '2. Trage deine Daten ein',
          text: 'Nach der Bestellung erhältst du einen M3U-Link oder Xtream-Codes-Daten (Server, Benutzername und Passwort). Wähle in der App nach Möglichkeit "Xtream Codes": Das lädt schneller und bringt den TV-Guide sowie die Film- und Serienbibliothek gleich mit.',
        },
        {
          heading: '3. Lass die Liste laden',
          text: 'Das erste Laden dauert ein bis zwei Minuten, weil die komplette Senderliste abgerufen wird. Danach startet die App in wenigen Sekunden. Lege deine Lieblingssender in einer eigenen Liste ab, dann musst du nie wieder suchen.',
        },
        {
          heading: 'Kommst du nicht weiter?',
          text: 'Schick uns per WhatsApp eine Nachricht mit der Marke deines Fernsehers. Wir gehen die Installation dann gemeinsam mit dir durch.',
        },
      ],
    },
  },
  {
    id: 'speed-for-4k',
    cover: coverSpeed,
    minutes: 3,
    date: '2026-10-11',
    category: { nl: 'Internet', en: 'Internet', de: 'Internet' },
    title: {
      nl: 'Welke internetsnelheid heb je nodig voor 4K?',
      en: 'How much internet speed do you need for 4K?',
      de: 'Wie viel Internet brauchst du für 4K?',
    },
    excerpt: {
      nl: 'Minder dan je denkt. Stabiliteit telt zwaarder dan de snelheid op je contract.',
      en: 'Less than you think. Stability matters more than the speed on your contract.',
      de: 'Weniger als du denkst. Stabilität zählt mehr als die Geschwindigkeit im Vertrag.',
    },
    body: {
      nl: [
        {
          heading: 'De vuistregel',
          text: 'Reken op ongeveer 5 Mbps voor HD, 10 Mbps voor Full HD en 25 Mbps voor 4K, per scherm dat tegelijk kijkt. Kijkt het hele gezin op drie schermen in 4K, dan wil je dus zo\'n 75 Mbps vrij hebben.',
        },
        {
          heading: 'Stabiel is belangrijker dan snel',
          text: 'Een verbinding van 50 Mbps die constant is, geeft een beter beeld dan 500 Mbps die elke minuut inzakt. Hapert het beeld terwijl je snelheidstest prima is, dan ligt het bijna altijd aan de wifi en niet aan je abonnement.',
        },
        {
          heading: 'Kabel waar het kan',
          text: 'Sluit je tv of streamingstick met een netwerkkabel aan als de router in de buurt staat. Lukt dat niet, kies dan de 5 GHz-wifi en zet de router vrij neer, niet in een kast of achter de tv.',
        },
      ],
      en: [
        {
          heading: 'The rule of thumb',
          text: 'Count on roughly 5 Mbps for HD, 10 Mbps for Full HD and 25 Mbps for 4K, per screen watching at the same time. If the whole family watches 4K on three screens, you want about 75 Mbps free.',
        },
        {
          heading: 'Stable beats fast',
          text: 'A steady 50 Mbps connection gives a better picture than 500 Mbps that dips every minute. If the picture stutters while your speed test looks fine, the cause is almost always the wifi, not your plan.',
        },
        {
          heading: 'Use a cable where you can',
          text: 'Connect your TV or streaming stick with a network cable if the router is nearby. If that is not possible, pick the 5 GHz wifi and place the router in the open, not in a cupboard or behind the TV.',
        },
      ],
      de: [
        {
          heading: 'Die Faustregel',
          text: 'Rechne mit etwa 5 Mbit/s für HD, 10 Mbit/s für Full HD und 25 Mbit/s für 4K, pro Bildschirm, der gleichzeitig läuft. Schaut die ganze Familie auf drei Bildschirmen in 4K, solltest du rund 75 Mbit/s frei haben.',
        },
        {
          heading: 'Stabil schlägt schnell',
          text: 'Eine konstante Leitung mit 50 Mbit/s liefert ein besseres Bild als 500 Mbit/s, die jede Minute einbrechen. Ruckelt das Bild, obwohl der Speedtest gut aussieht, liegt es fast immer am WLAN und nicht am Tarif.',
        },
        {
          heading: 'Kabel, wo es geht',
          text: 'Schließe deinen Fernseher oder Streaming-Stick per Netzwerkkabel an, wenn der Router in der Nähe steht. Geht das nicht, nimm das 5-GHz-WLAN und stell den Router frei auf, nicht in einen Schrank oder hinter den Fernseher.',
        },
      ],
    },
  },
  {
    id: 'fix-buffering',
    cover: coverSport,
    minutes: 4,
    date: '2026-10-11',
    category: { nl: 'Tips', en: 'Tips', de: 'Tipps' },
    title: {
      nl: 'Hapert het beeld? 5 dingen die je zelf kunt doen',
      en: 'Picture stuttering? 5 things you can fix yourself',
      de: 'Das Bild ruckelt? 5 Dinge, die du selbst tun kannst',
    },
    excerpt: {
      nl: 'Net voor de aftrap blijft het beeld hangen. Deze stappen lossen het in de meeste gevallen op.',
      en: 'The picture freezes right before kick-off. These steps solve it in most cases.',
      de: 'Kurz vor dem Anpfiff hängt das Bild. Diese Schritte lösen es in den meisten Fällen.',
    },
    body: {
      nl: [
        {
          heading: 'Herstart in de juiste volgorde',
          text: 'Haal eerst de router dertig seconden van de stroom, start daarna je tv of stick opnieuw en open dan pas de app. Het klinkt simpel, maar het lost verrassend vaak alles op.',
        },
        {
          heading: 'Sluit wat meekijkt',
          text: 'Downloads, cloud-back-ups en game-updates op andere apparaten vreten bandbreedte. Pauzeer ze tijdens een wedstrijd en het beeld loopt meteen rustiger.',
        },
        {
          heading: 'Kies een lagere kwaliteit bij drukte',
          text: 'Veel zenders zijn er in 4K, Full HD en HD. Schakel bij een onrustige verbinding naar de Full HD-versie: op de meeste schermen zie je nauwelijks verschil, en de stream heeft minder dan de helft van de snelheid nodig.',
        },
        {
          heading: 'Houd je app en apparaat bij',
          text: 'Werk de speler-app bij en wis af en toe de cache. Oudere sticks met weinig vrije opslag gaan haperen, ook als je internet prima is.',
        },
        {
          heading: 'Blijft het gebeuren?',
          text: 'Stuur ons via WhatsApp welke zender het is, op welk apparaat en hoe laat. Met die drie gegevens kunnen we snel zien waar het aan ligt.',
        },
      ],
      en: [
        {
          heading: 'Restart in the right order',
          text: 'Unplug the router for thirty seconds first, then restart your TV or stick, and only then open the app. It sounds simple, but it fixes things surprisingly often.',
        },
        {
          heading: 'Close what is sharing the line',
          text: 'Downloads, cloud backups and game updates on other devices eat bandwidth. Pause them during a match and the picture settles straight away.',
        },
        {
          heading: 'Drop the quality when it is busy',
          text: 'Many channels come in 4K, Full HD and HD. On a shaky connection, switch to the Full HD version: on most screens you barely see the difference, and the stream needs less than half the speed.',
        },
        {
          heading: 'Keep your app and device up to date',
          text: 'Update the player app and clear its cache now and then. Older sticks with little free storage start to stutter even when your internet is fine.',
        },
        {
          heading: 'Still happening?',
          text: 'Tell us on WhatsApp which channel, on which device and at what time. With those three details we can quickly see what is going on.',
        },
      ],
      de: [
        {
          heading: 'In der richtigen Reihenfolge neu starten',
          text: 'Trenne zuerst den Router dreißig Sekunden vom Strom, starte danach Fernseher oder Stick neu und öffne erst dann die App. Klingt simpel, löst aber erstaunlich oft alles.',
        },
        {
          heading: 'Schließe, was mitläuft',
          text: 'Downloads, Cloud-Backups und Spiele-Updates auf anderen Geräten fressen Bandbreite. Pausiere sie während eines Spiels und das Bild läuft sofort ruhiger.',
        },
        {
          heading: 'Bei Andrang die Qualität senken',
          text: 'Viele Sender gibt es in 4K, Full HD und HD. Wechsle bei wackeliger Verbindung auf die Full-HD-Version: Auf den meisten Bildschirmen siehst du kaum einen Unterschied, und der Stream braucht weniger als die Hälfte der Geschwindigkeit.',
        },
        {
          heading: 'App und Gerät aktuell halten',
          text: 'Aktualisiere die Player-App und leere ab und zu den Cache. Ältere Sticks mit wenig freiem Speicher fangen an zu ruckeln, auch wenn dein Internet in Ordnung ist.',
        },
        {
          heading: 'Passiert es weiterhin?',
          text: 'Schreib uns per WhatsApp, welcher Sender es ist, auf welchem Gerät und um welche Uhrzeit. Mit diesen drei Angaben sehen wir schnell, woran es liegt.',
        },
      ],
    },
  },
  {
    id: 'firestick-setup',
    cover: coverStick,
    minutes: 4,
    date: '2026-10-11',
    category: { nl: 'Handleiding', en: 'Guide', de: 'Anleitung' },
    title: {
      nl: 'IPTV installeren op een Amazon Firestick',
      en: 'How to set up IPTV on an Amazon Firestick',
      de: 'IPTV auf dem Fire TV Stick einrichten',
    },
    excerpt: {
      nl: 'De Firestick is het populairste apparaat voor IPTV. Zo zet je er in vier stappen een speler-app op.',
      en: 'The Firestick is the most popular device for IPTV. Here is how to put a player app on it in four steps.',
      de: 'Der Fire TV Stick ist das beliebteste Gerät für IPTV. So bringst du in vier Schritten eine Player-App darauf.',
    },
    body: {
      nl: [
        {
          heading: '1. Installeer de app Downloader',
          text: 'Ga op het startscherm van je Firestick naar Zoeken en typ "Downloader". Installeer de app met het oranje pictogram uit de Amazon Appstore. Hiermee haal je straks de speler-app binnen, want de meeste IPTV-spelers staan niet in de Appstore zelf.',
        },
        {
          heading: '2. Sta installeren toe',
          text: 'Open Instellingen, kies Mijn Fire TV en daarna Opties voor ontwikkelaars. Zet bij "Onbekende apps installeren" de schakelaar voor Downloader aan. Zie je de ontwikkelaarsopties niet? Ga naar Mijn Fire TV, Over, en druk zeven keer op de naam van je apparaat.',
        },
        {
          heading: '3. Download de speler-app',
          text: 'Open Downloader en vul de link in die je van onze support krijgt voor de speler die bij je past, bijvoorbeeld IPTV Smarters of TiviMate. Kies Installeren zodra het downloaden klaar is en verwijder daarna het installatiebestand om ruimte vrij te houden.',
        },
        {
          heading: '4. Log in en kijk',
          text: 'Start de speler-app, kies voor inloggen met Xtream Codes en vul de servernaam, gebruikersnaam en het wachtwoord in die je na je bestelling hebt ontvangen. De zenderlijst en de tv-gids laden de eerste keer een minuut of twee. Sluit de Firestick bij voorkeur aan op de 5 GHz wifi of gebruik een ethernetadapter voor het stabielste beeld.',
        },
      ],
      en: [
        {
          heading: '1. Install the Downloader app',
          text: 'On the Firestick home screen, go to Find and type "Downloader". Install the app with the orange icon from the Amazon Appstore. You use it to fetch the player app, because most IPTV players are not in the Appstore itself.',
        },
        {
          heading: '2. Allow the installation',
          text: 'Open Settings, choose My Fire TV and then Developer options. Under "Install unknown apps", switch Downloader on. If you do not see the developer options, go to My Fire TV, About, and press the name of your device seven times.',
        },
        {
          heading: '3. Download the player app',
          text: 'Open Downloader and enter the link our support sends you for the player that suits you, for example IPTV Smarters or TiviMate. Choose Install when the download finishes, then delete the installer file to keep space free.',
        },
        {
          heading: '4. Log in and watch',
          text: 'Start the player app, choose to log in with Xtream Codes and enter the server name, username and password you received after ordering. The channel list and TV guide take a minute or two to load the first time. Connect the Firestick to 5 GHz wifi if you can, or use an ethernet adapter for the most stable picture.',
        },
      ],
      de: [
        {
          heading: '1. Die App Downloader installieren',
          text: 'Gehe auf dem Startbildschirm deines Fire TV Sticks auf Suchen und gib "Downloader" ein. Installiere die App mit dem orangefarbenen Symbol aus dem Amazon Appstore. Damit holst du später die Player-App, denn die meisten IPTV-Player gibt es nicht im Appstore selbst.',
        },
        {
          heading: '2. Installation erlauben',
          text: 'Öffne Einstellungen, wähle Mein Fire TV und dann Entwickleroptionen. Schalte unter "Unbekannte Apps installieren" den Schalter für Downloader ein. Siehst du die Entwickleroptionen nicht? Gehe zu Mein Fire TV, Info, und drücke siebenmal auf den Namen deines Geräts.',
        },
        {
          heading: '3. Die Player-App herunterladen',
          text: 'Öffne Downloader und gib den Link ein, den du von unserem Support für den passenden Player bekommst, zum Beispiel IPTV Smarters oder TiviMate. Wähle Installieren, sobald der Download fertig ist, und lösche danach die Installationsdatei, um Speicher freizuhalten.',
        },
        {
          heading: '4. Anmelden und schauen',
          text: 'Starte die Player-App, wähle die Anmeldung mit Xtream Codes und gib Servername, Benutzername und Passwort ein, die du nach der Bestellung erhalten hast. Senderliste und TV-Guide laden beim ersten Mal ein bis zwei Minuten. Verbinde den Fire TV Stick möglichst mit dem 5-GHz-WLAN oder nutze einen Ethernet-Adapter für das stabilste Bild.',
        },
      ],
    },
  },
];
