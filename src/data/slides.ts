/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SlideData } from '../types';

export const slides: SlideData[] = [
  {
    id: 1,
    section: 'Uvod',
    title: 'Digitalizacija i Automatizacija Procjene Rada Zaposlenika',
    subtitle: 'Arhitektonsko i poslovno rješenje bazirano na Microsoft Power Platform i M365 za MKD EKI',
    visualType: 'hero',
    points: [
      {
        title: 'Pozicija i Svrha',
        description: 'Prijedlog rješenja za poziciju Programer/Analitičar za IT razvoj. Fokus je na optimalnoj sinergiji tehnologije, sigurnosti i poslovne vrijednosti.'
      },
      {
        title: 'Kompanijski Kontekst: MKD EKI',
        description: 'Mikrokreditno društvo sa oko 500 zaposlenih raspoređenih na više od 60 pozicija i u preko 60 poslovnica širom Bosne i Hercegovine.'
      },
      {
        title: 'Ključni Fokus Rješenja',
        description: 'Uspostavljanje robusnog, skalabilnog i povjerljivog procesa procjene tokom probnog rada, prije produženja ugovora te periodičnih evaluacija.'
      }
    ]
  },
  {
    id: 2,
    section: 'Uvod',
    title: 'Razumijevanje Problema, Ciljevi i Izazovi',
    subtitle: 'Analiza trenutnog stanja i ciljana poslovna vrijednost',
    visualType: 'stats',
    points: [
      {
        title: 'Izazovi Trenutnog Stanja',
        description: 'Manuelno praćenje rokova, različiti Word/Excel obrasci za 60+ pozicija, otežana konsolidacija podataka od strane HR-a i rizik od neovlaštenog pristupa povjerljivim ocjenama.'
      },
      {
        title: 'Operativni Ciljevi',
        description: 'Standardizacija procesa kroz 5 ključnih grupa radnih mjesta, eliminacija papirnih dokumenata i automatsko iniciranje evaluacija na osnovu datuma zaposlenja.'
      },
      {
        title: 'Strateški Ciljevi za HR',
        description: 'Potpuno autonomno upravljanje kriterijima i rokovima bez učešća IT-ja (No-Code), te dobijanje agregiranih trendova o razvojnim potrebama u realnom vremenu.'
      }
    ]
  },
  {
    id: 3,
    section: 'Proces',
    title: 'Budući Proces i Korisničke Uloge',
    subtitle: 'Optimizovan, dvosmjeran i automatizovan tok evaluacije',
    visualType: 'process-flow',
    points: [
      {
        title: 'Zaposlenik (Uloga: Samoprocjena)',
        description: 'Prima obavještenje putem MS Teams-a i Outlook-a. Popunjava obrazac samoprocjene (ocjene i komentari) prilagođen njegovoj poziciji.'
      },
      {
        title: 'Rukovodilac (Uloga: Procjenitelj)',
        description: 'Nakon što zaposlenik završi, rukovodilac unosi svoje ocjene, definiše ciljeve razvoja, preporučuje edukaciju i predlaže odluku o ugovoru.'
      },
      {
        title: 'HR Administracija (Uloga: Regulator)',
        description: 'Inicira procese (ili sistem automatski), vrši kalibraciju ocjena, nadgleda statuse kroz dashboard i upravlja šablonima bez IT intervencije.'
      },
      {
        title: 'Uprava i Regionalni Koordinatori',
        description: 'Pregledaju isključivo agregirane i anonimizirane izvještaje o performansama po regijama i odjelima radi donošenja strateških odluka.'
      }
    ]
  },
  {
    id: 4,
    section: 'Arhitektura',
    title: 'Tehnološka Arhitektura Sistema',
    subtitle: 'M365 i Power Platform Enterprise Arhitektura',
    visualType: 'architecture',
    points: [
      {
        title: 'Korisnički Interfejs: Power Apps (Canvas)',
        description: 'Jedinstvena, prilagođena aplikacija za sve uloge. Optimizovana za desktop i mobilne uređaje sa modernim i čistim EKI brendiranim interfejsom.'
      },
      {
        title: 'Baza Podataka: Microsoft Dataverse',
        description: 'Izabrana zbog naprednog sigurnosnog modela, relacijskog integriteta, ugrađenih audit logova i direktne integracije sa M365 bez potrebe za eksternim API-jima.'
      },
      {
        title: 'Automatizacija: Power Automate & MS Teams',
        description: 'Tokovi koji upravljaju slanjem Teams adaptivnih kartica, email podsjetnicima, eskalacijama u slučaju kašnjenja i zaključavanjem zapisa nakon podnošenja.'
      },
      {
        title: 'Izvještavanje: Power BI Embedded',
        description: 'Interaktivna analitika koja vuče podatke direktno iz Dataverse-a, osiguravajući Row-Level Security (RLS) tako da niko ne vidi podatke koje ne smije.'
      }
    ]
  },
  {
    id: 5,
    section: 'Baza',
    title: 'Struktura Podataka (Data Model)',
    subtitle: 'Relacijska struktura u Microsoft Dataverse',
    visualType: 'datamodel',
    points: [
      {
        title: 'Zaposlenik (Employee - Master)',
        description: 'ID, Ime, Email, Pozicija, Poslovna jedinica (Branch), Organizaciona jedinica, Datum zaposlenja, Status ugovora, ID Rukovodioca.'
      },
      {
        title: 'Šablon Evaluacije (Evaluation Template)',
        description: 'ID, Naziv (npr. Kreditni službenik), Opis, Aktivna verzija, Rok za samoprocjenu, Rok za rukovodioca. Povezan sa grupama pozicija.'
      },
      {
        title: 'Kriteriji Šablona (Template Criteria)',
        description: 'ID, Povezan Šablon, Kategorija (Tehničke vještine, Vrijednosti...), Naziv kriterija, Opis, Težinski faktor (%).'
      },
      {
        title: 'Evaluacija (Evaluation Instance - Transaction)',
        description: 'ID, Povezan Zaposlenik, Šablon, Status, Datum iniciranja, Ukupna ocjena, Razvojni ciljevi, Preporuka za edukaciju, Predložena odluka.'
      },
      {
        title: 'Detalji Evaluacije (Evaluation Detail - Line Items)',
        description: 'ID, Povezana Evaluacija, ID Kriterija, Ocjena zaposlenika (1-5), Ocjena rukovodioca (1-5), Obrazloženje/Komentar.'
      }
    ]
  },
  {
    id: 6,
    section: 'NoCode',
    title: 'Ključne Automatizacije (Tokovi rada)',
    subtitle: 'Povećanje operativne efikasnosti kroz Power Automate',
    visualType: 'process-flow',
    points: [
      {
        title: '1. Iniciranje i Alokacija (Dynamic Trigger Flow)',
        description: 'Sistem svakog 1. u mjesecu provjerava Dataverse za zaposlene kojima ističe probni rad za 30 dana, te automatski generiše evaluaciju na osnovu njihove pozicije.'
      },
      {
        title: '2. Tok Obavještavanja i Podsjetnika (Escalation & Notification)',
        description: 'Šalje adaptivnu karticu u Teams zaposleniku. Ukoliko samoprocjena nije gotova za 5 dana, šalje se automatski blagi podsjetnik. Nakon slanja, odmah se otključava sekcija za rukovodioca.'
      },
      {
        title: '3. Tok Odobravanja i Sinhronizacije (Calibration Workflow)',
        description: 'Kada rukovodilac podnese ocjene, HR dobija obavještenje o spremnosti za kalibraciju. Nakon usaglašavanja, generiše se PDF izvještaj, potpisuje se digitalno i arhivira.'
      }
    ]
  },
  {
    id: 7,
    section: 'NoCode',
    title: 'HR Autonomija: Upravljanje Bez Kodiranja',
    subtitle: 'Kako HR samostalno kontroliše sistem',
    visualType: 'none',
    points: [
      {
        title: 'No-Code Administracija Šablona',
        description: 'Kroz poseban administratorski ekran u Power Apps-u, HR može dodavati nove kriterije, mijenjati opise vještina i redefinisati težinske faktore u realnom vremenu.'
      },
      {
        title: 'Dinamičko Mapiranje Pozicija',
        description: 'Umjesto kreiranja 60+ individualnih šablona, HR grupiše pozicije u npr. 5 "Porodica poslova" (Kreditni sektor, IT, Front-office, Back-office, Rukovodstvo).'
      },
      {
        title: 'Upravljanje Rokovima i Metrikama',
        description: 'HR može jednim klikom promijeniti rokove za predaju (npr. sa 5 na 7 dana) ili isključiti samoprocjenu za specifične pozicije ukoliko biznis proces to zahtijeva.'
      }
    ]
  },
  {
    id: 8,
    section: 'Sigurnost',
    title: 'Sigurnost, Povjerljivost i Usklađenost',
    subtitle: 'Zaštita osjetljivih ličnih podataka u skladu sa zakonom i GDPR-om',
    visualType: 'security',
    points: [
      {
        title: 'Row-Level Security (Sigurnost na nivou reda)',
        description: 'Sistemski nivo zaštite u Dataverse-u: Zaposlenik vidi isključivo svoj trenutni karton; Rukovodilac vidi samo svoje direktne podređene; HR vidi sve aktivne procese.'
      },
      {
        title: 'Historija Izmjena (Auditing) i Verzije',
        description: 'Svaka promjena ocjene ili komentara bilježi se sa vremenskim pečatom i ID-em korisnika. HR može u svakom trenutku vidjeti originalnu ocjenu rukovodioca prije kalibracije.'
      },
      {
        title: 'Privatnost i Anonymizacija',
        description: 'U Power BI-ju, podaci za Upravu se agresivno anonimiziraju na nivoima ispod 5 zaposlenika u nekoj poslovnici, sprečavajući dedukciju nečije ocjene.'
      }
    ]
  },
  {
    id: 9,
    section: 'Izvještaji',
    title: 'Analitika i Izvještavanje (Power BI)',
    subtitle: 'Zbirni uvid u performanse i potrebe MKD EKI',
    visualType: 'stats',
    points: [
      {
        title: 'Dashboard za Upravu i HR',
        description: 'Pregled stopa završetka evaluacija po regijama/poslovnicama, distributivna kriva ocjena (prevencija nerealno visokih ocjena) i procenat preporuka za produženje.'
      },
      {
        title: 'Analiza Edukacijskih Potreba (Gap Analysis)',
        description: 'Automatska konsolidacija svih preporuka za edukaciju (npr. "Prodajne vještine", "Usklađenost", "Excel"). HR dobija jasan plan obuka za naredni kvartal.'
      },
      {
        title: 'Identifikacija Talenata i Mentora',
        description: 'Sistem automatski flaguje visoko ocijenjene zaposlenike u specifičnim vještinama koji mogu djelovati kao interni mentori za druge kolege u mreži.'
      }
    ]
  },
  {
    id: 10,
    section: 'Plan',
    title: 'Plan Implementacije, Rizici i ROI',
    subtitle: 'Agilni plan isporuke rješenja za 6 sedmica',
    visualType: 'timeline',
    points: [
      {
        title: 'Agilni Plan Razvoja',
        description: 'Sedmica 1: Detaljna analiza i postavljanje Dataverse modela. Sedmica 2-3: Razvoj Canvas aplikacije i integracija sa MS Teams. Sedmica 4: Razvoj Power Automate tokova i Power BI izvještaja. Sedmica 5: Testiranje, sigurnosni audit i pilot faza. Sedmica 6: Produkcija i obuka.'
      },
      {
        title: 'Glavni Rizici i Mitigacija',
        description: 'Rizik 1: Otpor rukovodilaca prema novom digitalnom alatu. Mitigacija: Slanje jednostavnih, jednoklikovnih Teams adaptivnih kartica za ocjenjivanje bez napuštanja Teams aplikacije.'
      },
      {
        title: 'Rizik Premium Licenci i Mitigacija',
        description: 'Ukoliko su Dataverse/Power Apps premium licence izazov, predlaže se hibridni model: SharePoint Online kao back-end (standardne M365 licence) sa striktnim folder-level dozvolama za sigurnost.'
      }
    ]
  }
];
