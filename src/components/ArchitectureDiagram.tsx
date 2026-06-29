/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AppWindow, 
  Database, 
  Workflow, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Mail, 
  Bell, 
  Clock, 
  FileText,
  ChevronRight,
  Info
} from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  type: string;
  description: string;
  responsibilities: string[];
  integration: string;
}

export default function ArchitectureDiagram() {
  const [selectedComp, setSelectedComp] = useState<string>('powerapps');

  const components: Record<string, ComponentDetail> = {
    powerapps: {
      id: 'powerapps',
      name: 'Power Apps (Canvas App)',
      type: 'Korisnički Interfejs (Frontend)',
      description: 'Zaslon prilagođen krajnjim korisnicima. Sadrži dva primarna pogleda: Samouslužni portal za zaposlenike i rukovodioce, te administratorsku konzolu za HR.',
      responsibilities: [
        'Unos samoprocjene (ocjene 1-5 i tekstualno obrazloženje)',
        'Unos procjene rukovodioca, postavljanje ciljeva i preporuke obuka',
        'HR konzola za modifikaciju kriterija, rokova i raspoređivanje šablona bez kodiranja',
        'Zabrana unosa nakon isteka roka i vizuelni indikatori napretka'
      ],
      integration: 'Povezan direktno na Dataverse preko nativnog konektora (sigurno, unutar M365 tenanta).'
    },
    dataverse: {
      id: 'dataverse',
      name: 'Microsoft Dataverse',
      type: 'Baza Podataka i Sigurnosni Sloj',
      description: 'Robusna, relacijska baza podataka u oblaku sa integrisanim sigurnosnim modelom na nivou poslovnih jedinica (Business Units) i korisničkih uloga.',
      responsibilities: [
        'Pohrana svih matičnih podataka zaposlenih, šablona evaluacije i kriterija',
        'Transakciono bilježenje ocjena i istorije verzija (Audit Log)',
        'Row-Level Security (RLS) - automatsko filtriranje zapisa prema menadžerskoj hijerarhiji',
        'Automatsko kreiranje metapodataka (ko je kreirao, kada, ko je modifikovao)'
      ],
      integration: 'Centralno skladište podataka. Izvor za Power Apps, okidač za Power Automate i skladište za Power BI.'
    },
    powerautomate: {
      id: 'powerautomate',
      name: 'Power Automate',
      type: 'Logika i Automatizacija (Workflow)',
      description: 'Pozadinski motor koji upravlja svim tokovima odobravanja, slanjem poruka, automatskim provjerama rokova i arhiviranjem dokumenata.',
      responsibilities: [
        'Inicijalni okidač: Provjera zaposlenih pred istek probnog rada na 1. u mjesecu',
        'Distribucija: Slanje Teams adaptivnih kartica zaposlenicima sa linkom za brzi pristup',
        'Eskalacija: Automatski email podsjetnici rukovodiocima nakon 5 dana neaktivnosti',
        'Finalizacija: Generisanje službenog PDF-a, slanje na SharePoint arhivu i notifikacija HR-u'
      ],
      integration: 'Komunicira sa Dataverse-om na osnovu okidača (Dataverse triggers) i integriše se sa Outlookom i Teams-om.'
    },
    powerbi: {
      id: 'powerbi',
      name: 'Power BI',
      type: 'Analitika i Izvještavanje (BI)',
      description: 'Napredna poslovna analitika koja agregira podatke za Upravu i HR, omogućavajući donošenje odluka na osnovu stvarnih pokazatelja performansi.',
      responsibilities: [
        'Zbirni prikazi prolaznosti probnog rada i distribucije ocjena (Bell Curve)',
        'Identifikacija kritičnih treninga (Gaps) - automatsko sabiranje preporučenih edukacija',
        'Statistika po regionalnim podružnicama bez izlaganja pojedinačnih povjerljivih ocjena',
        'Row-level security sinhronizovan sa Dataverse pravima pristupa'
      ],
      integration: 'Direktan upit (DirectQuery) ili zakazano osvježavanje nad Dataverse bazom podataka.'
    },
    teams: {
      id: 'teams',
      name: 'Microsoft Teams & Outlook',
      type: 'Komunikacijski Kanali',
      description: 'Primarni kanali komunikacije i obavještavanja sa kojima zaposlenici u MKD EKI svakodnevno rade.',
      responsibilities: [
        'Slanje interaktivnih adaptivnih kartica za popunjavanje kratkih formi',
        'Notifikacije o pokretanju evaluacije i hitnim rokovima direktno u Teams Chat',
        'Email obavještenja sa direktnim dubokim linkovima (Deep Links) do Power Apps forme'
      ],
      integration: 'Integrisan preko Power Automate konektora za Office 365 Outlook i Teams.'
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2">
            <ShieldCheck className="text-eki-green-500 h-6 w-6" />
            Interaktivni Arhitektonski Dijagram rješenja
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Kliknite na bilo koju komponentu da biste vidjeli detaljne uloge, integraciju i sigurnost.
          </p>
        </div>
        <span className="text-xs bg-eki-green-50 text-eki-green-500 font-mono px-3 py-1.5 rounded-full border border-eki-green-100 mt-2 md:mt-0">
          Power Platform + M365 Ecosystem
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Architecture Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[420px]">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* User & Channel Layer */}
          <div className="relative z-10 flex flex-col gap-4">
            
            {/* Top Layer: Channels & Ingress */}
            <div className="flex justify-around items-center">
              <button 
                onClick={() => setSelectedComp('teams')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  selectedComp === 'teams' 
                    ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-2 ring-indigo-200 text-indigo-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold">MS Teams / Outlook</span>
              </button>
            </div>

            {/* Downward Flow Indicator 1 */}
            <div className="flex justify-center my-1">
              <div className="h-6 w-0.5 bg-dashed border-l-2 border-gray-300" />
            </div>

            {/* Middle Layer: Application & Automation */}
            <div className="flex justify-between items-center gap-4">
              {/* Power Apps (Frontend) */}
              <button 
                onClick={() => setSelectedComp('powerapps')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedComp === 'powerapps' 
                    ? 'bg-eki-green-50 border-eki-green-500 shadow-sm ring-2 ring-eki-green-100 text-eki-green-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="p-3 bg-eki-green-100 text-eki-green-600 rounded-xl">
                  <AppWindow className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold">Power Apps</span>
                <span className="text-[10px] text-gray-400">Korisnički interfejs</span>
              </button>

              {/* Bidirectional Arrow */}
              <div className="flex flex-col items-center justify-center text-gray-300">
                <Workflow className="h-5 w-5 animate-pulse text-eki-green-500" />
                <span className="text-[9px] font-mono mt-1 text-gray-400">Automatizacija</span>
              </div>

              {/* Power Automate (Workflows) */}
              <button 
                onClick={() => setSelectedComp('powerautomate')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedComp === 'powerautomate' 
                    ? 'bg-sky-50 border-sky-500 shadow-sm ring-2 ring-sky-100 text-sky-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="p-3 bg-sky-100 text-sky-600 rounded-xl">
                  <Workflow className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold">Power Automate</span>
                <span className="text-[10px] text-gray-400">Pozadinski motor</span>
              </button>
            </div>

            {/* Downward Flow Indicator 2 */}
            <div className="flex justify-center my-1">
              <div className="h-6 w-0.5 bg-dashed border-l-2 border-gray-300" />
            </div>

            {/* Bottom Layer: Storage & BI */}
            <div className="flex justify-between items-center gap-4">
              {/* MS Dataverse (Secure database) */}
              <button 
                onClick={() => setSelectedComp('dataverse')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedComp === 'dataverse' 
                    ? 'bg-teal-50 border-teal-500 shadow-sm ring-2 ring-teal-100 text-teal-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                  <Database className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold">Microsoft Dataverse</span>
                <span className="text-[10px] text-gray-400">Baza podataka & Sigurnost</span>
              </button>

              {/* Power BI (Analytics) */}
              <button 
                onClick={() => setSelectedComp('powerbi')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  selectedComp === 'powerbi' 
                    ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-100 text-amber-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold">Power BI</span>
                <span className="text-[10px] text-gray-400">Agregirani izvještaji</span>
              </button>
            </div>

          </div>
        </div>

        {/* Selected Component Information Detail Panel (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col">
          <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className={`p-2 rounded-lg text-white ${
                  selectedComp === 'powerapps' ? 'bg-eki-green-500' :
                  selectedComp === 'dataverse' ? 'bg-teal-600' :
                  selectedComp === 'powerautomate' ? 'bg-sky-500' :
                  selectedComp === 'powerbi' ? 'bg-amber-500' : 'bg-indigo-500'
                }`}>
                  {selectedComp === 'powerapps' && <AppWindow className="h-5 w-5" />}
                  {selectedComp === 'dataverse' && <Database className="h-5 w-5" />}
                  {selectedComp === 'powerautomate' && <Workflow className="h-5 w-5" />}
                  {selectedComp === 'powerbi' && <BarChart3 className="h-5 w-5" />}
                  {selectedComp === 'teams' && <MessageSquare className="h-5 w-5" />}
                </span>
                <div>
                  <h4 className="font-display font-bold text-lg text-gray-900 leading-tight">
                    {components[selectedComp].name}
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    {components[selectedComp].type}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {components[selectedComp].description}
              </p>

              <div className="mb-4">
                <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Info className="h-3 w-3 text-eki-green-500" />
                  Glavne Odgovornosti u MKD EKI:
                </h5>
                <ul className="space-y-2">
                  {components[selectedComp].responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-eki-green-500 mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3.5 mt-4">
              <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Način integracije:
              </h5>
              <p className="text-xs text-gray-500 italic leading-normal">
                {components[selectedComp].integration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
