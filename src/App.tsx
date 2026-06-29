/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Database, 
  Workflow, 
  Layers, 
  Award, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  Mail,
  Calendar,
  Phone,
  ArrowRight
} from 'lucide-react';
import Slideshow from './components/Slideshow';
import PrototypeApp from './components/PrototypeApp';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import DataModelErd from './components/DataModelErd';

export default function App() {
  const [activeTab, setActiveTab] = useState<'slides' | 'prototype' | 'architecture' | 'datamodel'>('slides');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800 antialiased">
      
      {/* Premium MKD EKI Header banner */}
      <header className="no-print bg-white border-b border-gray-200 shadow-sm relative overflow-hidden shrink-0">
        {/* Decorative Top Accent line (EKI Green + Yellow Gold) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-eki-green-500 via-eki-yellow-500 to-eki-green-600" />
        
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            {/* EKI Branded Geometric Hex / Diamond Logo Container */}
            <div className="relative w-11 h-11 shrink-0 bg-eki-green-500 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md overflow-hidden">
              E
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-eki-yellow-500 transform rotate-45 translate-x-1.5 translate-y-1.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-eki-green-600 uppercase tracking-widest bg-eki-green-100/60 px-2.5 py-0.5 rounded-md border border-eki-green-100">
                  IT Razvoj & Analiza
                </span>
              </div>
              <h1 className="font-display font-extrabold text-lg md:text-xl text-gray-900 tracking-tight mt-1">
                EKI Procjena Rada Zaposlenika
              </h1>
            </div>
          </div>

          {/* Candidate Metadata block */}
          <div className="text-xs bg-gray-50/80 border border-gray-100 rounded-xl p-3 flex flex-col gap-1 shrink-0">
            <div className="flex items-center gap-1.5 text-gray-600">
              <span className="font-semibold text-gray-800">Kandidat:</span> Alen Garibović
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Mail className="h-3 w-3 text-eki-green-500" /> a.garibovic95@gmail.com
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="h-3 w-3 text-eki-green-500" /> Rok predaje: 29. juni 2026. do 12:00
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Controls Bar */}
      <nav className="no-print bg-white border-b border-gray-200/60 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'slides' 
                ? 'bg-eki-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-4 w-4" />
            1. Prezentacija (10 Slajdova)
          </button>
          <button
            onClick={() => setActiveTab('prototype')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prototype' 
                ? 'bg-eki-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            2. Interaktivni Prototip (M365 Demo)
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'architecture' 
                ? 'bg-eki-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers className="h-4 w-4" />
            3. Tehnološka Arhitektura
          </button>
          <button
            onClick={() => setActiveTab('datamodel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'datamodel' 
                ? 'bg-eki-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Database className="h-4 w-4" />
            4. Model Podataka (ERD)
          </button>
        </div>
      </nav>

      {/* Primary Work area */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto w-full">
        
        {/* Tab 1: Slide Player */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display font-extrabold text-xl text-gray-900 tracking-tight">
                Prijedlog digitalnog rješenja za procjenu rada zaposlenika
              </h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Kao stručni Programer/Analitičar za IT razvoj, razvio sam kompletan i profesionalan prijedlog rješenja za <strong>Scenario 2</strong>, optimizovan za potrebe <strong>MKD EKI</strong>. Prijedlog obuhvata cjelokupnu tehničku arhitekturu, bezbjednosne protokole, model baze podataka i poslovni proces.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-100 text-xs">
                <div className="flex gap-2.5">
                  <span className="p-1.5 bg-eki-green-50 text-eki-green-600 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-800">100% Pokrivenost zadatka</h4>
                    <p className="text-gray-500 mt-0.5">Uključeni svi traženi dijelovi: procesi, arhitektura, bezbjednost, rizici i plan isporuke.</p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <span className="p-1.5 bg-eki-green-50 text-eki-green-600 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center">
                    <Workflow className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-800">Enterprise Arhitektura</h4>
                    <p className="text-gray-500 mt-0.5">Arhitektura ugrađena u M365 i Power Platform ekosistem bez eksternih zavisnosti i premium licenci.</p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <span className="p-1.5 bg-eki-green-50 text-eki-green-600 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center">
                    <Database className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-800">No-Code Samoupravljanje</h4>
                    <p className="text-gray-500 mt-0.5">HR u potpunosti samostalno upravlja formama i kriterijima bez IT programera.</p>
                  </div>
                </div>
              </div>
            </div>

            <Slideshow />
          </div>
        )}

        {/* Tab 2: Working Application Prototype */}
        {activeTab === 'prototype' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-gray-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="text-eki-yellow-500 h-6 w-6" />
                    Funkcionalni Prototip Rješenja (Proof of Concept)
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    U skladu s tehničkim smjernicama selekcije, priložio sam funkcionalni prototip aplikacije. Izaberite ulogu na vrhu simulacione trake da biste testirali različite poglede.
                  </p>
                </div>
                <button 
                  onClick={() => alert('Generisana je simulacija za sve 4 uloge!')}
                  className="bg-gray-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 px-4 rounded-xl transition-all shadow shrink-0"
                >
                  Uputstvo za testiranje
                </button>
              </div>

              {/* Prototype Role Explainer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100 text-xs text-gray-500">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-700 block mb-1">1. HR Admin</span>
                  Inicirajte procjenu za zaposlenika, upravljajte kriterijima i odobravajte završne ocjene.
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-700 block mb-1">2. Zaposlenik</span>
                  Unesite samoprocjenu sa ocjenama i komentarima za dodijeljeni šablon.
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-700 block mb-1">3. Rukovodilac</span>
                  Procijenite podređene, definišite ciljeve i obuke, te dajte prijedlog za ugovor.
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-700 block mb-1">4. Power BI</span>
                  Pregledajte zbirnu analitiku i automatski detektovane potrebe za edukacijom.
                </div>
              </div>
            </div>

            <PrototypeApp />
          </div>
        )}

        {/* Tab 3: Standalone System Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display font-extrabold text-xl text-gray-900 tracking-tight">
                Arhitektonska integracija u M365 i Power Platform
              </h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Predloženo rješenje se u potpunosti oslanja na postojeći <strong>Microsoft 365 i Cloud ekosistem MKD EKI</strong>. Korištenjem nativnih integracija između Dataverse, Power Apps, Power Automate i Teams-a eliminiše se rizik od kreiranja zasebnih IT silosa, smanjuju troškovi održavanja i osigurava maksimalna sigurnost podataka.
              </p>
            </div>
            
            <ArchitectureDiagram />
          </div>
        )}

        {/* Tab 4: Standalone ERD Data Model */}
        {activeTab === 'datamodel' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display font-extrabold text-xl text-gray-900 tracking-tight">
                Struktura i Normalizacija Relacijskih Podataka
              </h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Relacijski model podataka je postavljen unutar <strong>Microsoft Dataverse-a</strong> po uzoru na standarde za ljudske resurse (HR Schema). Relacije osiguravaju integritet (npr. brisanje šablona ne ugrožava arhivirane evaluacije) i brze upite za Power BI izvještavanje.
              </p>
            </div>

            <DataModelErd />
          </div>
        )}

      </main>

      {/* Corporate Professional Footer */}
      <footer className="no-print bg-slate-900 text-white py-10 mt-auto border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-400">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-eki-green-500 rounded-lg flex items-center justify-center font-extrabold text-white text-base">E</div>
              <span className="font-display font-bold text-sm text-white">MKD EKI d.o.o. Sarajevo</span>
            </div>
            <p className="leading-relaxed">
              Prijedlog digitalnog rješenja i prototipa za poziciju Programer/Analitičar za IT razvoj. Sva prava pridržana. Podaci korišteni u prototipu su simulirani u svrhu demonstracije rješenja.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Tehničke Specifikacije</h4>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Platforma:</span>
                <span className="text-white">MS Power Platform & M365</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Baza podataka:</span>
                <span className="text-white">Microsoft Dataverse</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Bezbjednost:</span>
                <span className="text-white">Row-Level Security (RLS)</span>
              </li>
              <li className="flex justify-between">
                <span>Kanal notifikacije:</span>
                <span className="text-white">MS Teams Adaptive Cards</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-display">Kontakt i predaja</h4>
            <p className="leading-relaxed mb-4">
              Prijedlog rješenja u obliku interaktivnog PoC prototipa, dijagrama i ispisnog PDF dokumenta spreman za predaju selekcijskoj komisiji:
            </p>
            <div className="space-y-2 font-medium">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-eki-yellow-500" /> adi.tanovic@eki.ba
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-eki-yellow-500" /> igor.duspara@eki.ba
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-eki-yellow-500" /> sabahudin.cajic@eki.ba
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
