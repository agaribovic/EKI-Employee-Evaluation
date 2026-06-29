/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer, 
  Download, 
  HelpCircle, 
  TrendingUp, 
  Award, 
  Timer, 
  SlidersHorizontal,
  FolderLock,
  Compass,
  Briefcase,
  Layers,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { slides } from '../data/slides';
import ArchitectureDiagram from './ArchitectureDiagram';
import DataModelErd from './DataModelErd';

export default function Slideshow() {
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const slide = slides[currentSlideIdx];

  const handleNext = () => {
    if (currentSlideIdx < slides.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Slide Navigation Topbar */}
      <div className="no-print bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-eki-green-50 text-eki-green-600 rounded-lg">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display font-bold text-sm text-gray-800">Preglednik Prezentacije</h3>
            <p className="text-[10px] text-gray-400">10 Slajdova • Spremno za ispis / prezentaciju komisiji</p>
          </div>
        </div>

        {/* Quick Slide Index Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`w-7 h-7 rounded-md text-xs font-bold transition-all border ${
                currentSlideIdx === idx 
                  ? 'bg-eki-green-500 border-eki-green-500 text-white shadow-sm' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
              title={s.title}
            >
              {s.id}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <Printer className="h-3.5 w-3.5" />
            Ispis (Print PDF)
          </button>
        </div>
      </div>

      {/* Main Slide Card Layout */}
      <div className={`relative bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video min-h-[500px]'
      }`}>
        
        {/* Slide Header Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-eki-green-500/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Slide Top bar */}
        <div className="p-6 md:px-8 flex justify-between items-center border-b border-slate-800/80 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-eki-green-500/10 text-eki-green-500 border border-eki-green-500/20 px-3 py-1 rounded-full font-bold font-mono uppercase tracking-wider">
              {slide.section}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest hidden sm:inline">
              MKD EKI d.o.o. Sarajevo • IT Razvoj
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded border border-slate-700/60">
            Slajd {slide.id} / {slides.length}
          </span>
        </div>

        {/* Slide Body Content */}
        <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 overflow-y-auto max-h-[480px]">
          
          {/* Left Side: Structured Text Points (7 cols or full if no graphic) */}
          <div className={`${slide.visualType === 'none' || slide.visualType === 'architecture' || slide.visualType === 'datamodel' ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            <div>
              {slide.subtitle && (
                <span className="text-xs font-bold text-eki-yellow-500 tracking-wider uppercase block mb-1">
                  {slide.subtitle}
                </span>
              )}
              <h2 className="font-display font-extrabold text-2xl tracking-tight text-white leading-tight">
                {slide.title}
              </h2>
            </div>

            <div className="space-y-4">
              {slide.points.map((pt, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="h-5 w-5 rounded-full bg-eki-green-500/15 text-eki-green-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-eki-green-500/20">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 leading-snug">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Specialized Visual Elements */}
          {slide.visualType !== 'none' && slide.visualType !== 'architecture' && slide.visualType !== 'datamodel' && (
            <div className="lg:col-span-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center min-h-[250px] relative overflow-hidden shadow-inner">
              
              {/* Visual Element 1: Hero Cover logo block */}
              {slide.visualType === 'hero' && (
                <div className="text-center space-y-4">
                  <div className="inline-block p-4.5 bg-gradient-to-br from-eki-green-500 to-eki-green-600 rounded-3xl shadow-lg ring-4 ring-eki-green-500/10">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-white">MKD EKI d.o.o.</h3>
                    <p className="text-xs text-slate-400 mt-1">Sigurnost, stabilnost i tehnološki napredak u mikrokreditnom sektoru</p>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex justify-center gap-3 text-[10px] text-slate-500 font-mono">
                    <span>Power Platform</span>
                    <span>•</span>
                    <span>M365 Cloud</span>
                    <span>•</span>
                    <span>GDPR</span>
                  </div>
                </div>
              )}

              {/* Visual Element 2: Statistical representations */}
              {slide.visualType === 'stats' && (
                <div className="space-y-4">
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Zaposlenici</span>
                      <TrendingUp className="h-4 w-4 text-eki-green-500" />
                    </div>
                    <p className="font-display font-extrabold text-3xl text-white mt-1">~500</p>
                    <span className="text-[10px] text-slate-400">Uslužna mreža širom BiH</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold">Radna Mjesta</span>
                      <p className="font-display font-bold text-xl text-white mt-1">60+</p>
                    </div>
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold">Verzije Šablona</span>
                      <p className="font-display font-bold text-xl text-white mt-1">No-Code</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Element 3: Process flow map */}
              {slide.visualType === 'process-flow' && (
                <div className="space-y-4.5">
                  {[
                    { title: 'Iniciranje procesa', desc: 'Sistemski Power Automate okidač na osnovu AD datuma.', icon: <Timer className="h-3.5 w-3.5" />, color: 'text-sky-400' },
                    { title: 'Samoprocjena zaposlenog', desc: 'Obrazac u Power Apps i adaptivna kartica u Teams.', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, color: 'text-amber-400' },
                    { title: 'Procjena rukovodioca', desc: 'Ocjenjivanje, razvojni plan i ugovorni prijedlog.', icon: <Award className="h-3.5 w-3.5" />, color: 'text-eki-green-500' },
                    { title: 'Kalibracija i Arhiva', desc: 'HR odobrenje, PDF generisanje i uvoz u dosije.', icon: <FileCheck className="h-3.5 w-3.5" />, color: 'text-purple-400' }
                  ].map((flow, idx) => (
                    <div key={idx} className="flex gap-3 items-start relative">
                      {idx < 3 && <div className="absolute left-2.5 top-6 bottom-[-14px] w-0.5 bg-slate-700" />}
                      <span className={`p-1 bg-slate-800 border border-slate-700 rounded-md shrink-0 ${flow.color}`}>
                        {flow.icon}
                      </span>
                      <div>
                        <h5 className="font-bold text-xs text-slate-200">{flow.title}</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Visual Element 4: Security Features Checklist */}
              {slide.visualType === 'security' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderLock className="text-eki-green-500 h-5 w-5 shrink-0" />
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider">Enterprise Security Layer</h4>
                  </div>
                  {[
                    'Row-Level Security (RLS) u Dataverse i Power BI',
                    'Usklađenost sa GDPR / AZLP propisima u BiH',
                    'Potpuni revizijski tragovi (Audit trail)',
                    'Sprečavanje dijeljenja povjerljivih ocjena van mreže'
                  ].map((sec, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-eki-green-500 shrink-0" />
                      <span className="text-slate-300">{sec}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Visual Element 5: Project timeline/roadmap (6 weeks) */}
              {slide.visualType === 'timeline' && (
                <div className="space-y-4">
                  {[
                    { week: 'W1-W2', title: 'Data model & Dataverse set-up' },
                    { week: 'W3-W4', title: 'Power Apps & Teams integration' },
                    { week: 'W5', title: 'Workflows & Power BI development' },
                    { week: 'W6', title: 'Audit, Pilot phase & Deployment' }
                  ].map((tm, idx) => (
                    <div key={idx} className="flex gap-3 items-center text-xs">
                      <span className="font-mono font-bold text-eki-yellow-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 shrink-0 w-16 text-center">
                        {tm.week}
                      </span>
                      <span className="text-slate-300">{tm.title}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Embedded Large Diagrams on specific slides */}
        {slide.visualType === 'architecture' && (
          <div className="p-6 md:px-8 border-t border-slate-800 bg-slate-900 overflow-y-auto max-h-[380px]">
            <div className="text-slate-900 bg-white p-2.5 rounded-3xl">
              <ArchitectureDiagram />
            </div>
          </div>
        )}

        {slide.visualType === 'datamodel' && (
          <div className="p-6 md:px-8 border-t border-slate-800 bg-slate-900 overflow-y-auto max-h-[380px]">
            <div className="text-slate-900 bg-white p-2.5 rounded-3xl">
              <DataModelErd />
            </div>
          </div>
        )}

        {/* Slide Footer / Navigation Controls */}
        <div className="p-6 md:px-8 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-sm flex justify-between items-center relative z-10 no-print">
          <button
            onClick={handlePrev}
            disabled={currentSlideIdx === 0}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 font-semibold py-1.5 px-3.5 rounded-xl border border-slate-700/50 text-xs transition-all disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Prethodni
          </button>

          {/* Progress Indicator Dots */}
          <div className="hidden md:flex gap-1.5">
            {slides.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${
                  currentSlideIdx === idx ? 'w-6 bg-eki-green-500' : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIdx === slides.length - 1}
            className="flex items-center gap-1.5 bg-eki-green-500 hover:bg-eki-green-600 disabled:opacity-30 disabled:hover:bg-eki-green-500 text-white font-bold py-1.5 px-3.5 rounded-xl text-xs transition-all disabled:cursor-not-allowed shadow-md"
          >
            Sljedeći
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Helper Print instructions 
      <div className="no-print bg-gray-50 p-4 border border-gray-100 rounded-xl text-xs text-gray-500 flex gap-2.5 items-start">
        <HelpCircle className="h-5 w-5 text-eki-green-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-gray-700">Preporuka za Prezentaciju Komisiji:</span>
          <p className="leading-relaxed mt-0.5">
            Ova interaktivna aplikacija služi i kao vaš govorni slajd-špil i kao funkcionalni dokaz koncepta (PoC) sistema. Možete kliknuti na dugme <strong>"Print PDF"</strong> na vrhu kako biste generisali profesionalni PDF dokument od 10 stranica spreman za slanje na email amina.salman@eki.ba!
          </p>
        </div>
      </div>
      */}
    </div>
  );
}
