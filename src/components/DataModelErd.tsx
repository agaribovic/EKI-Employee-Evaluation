/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, ShieldAlert, Key, Link2, ChevronRight, User, FileText, CheckSquare } from 'lucide-react';

interface TableField {
  name: string;
  type: string;
  key?: 'PK' | 'FK';
  description: string;
}

interface TableDetail {
  id: string;
  name: string;
  displayName: string;
  description: string;
  security: string;
  fields: TableField[];
  relationships: {
    targetTable: string;
    type: string;
    field: string;
  }[];
}

export default function DataModelErd() {
  const [selectedTable, setSelectedTable] = useState<string>('evaluacija');

  const tables: Record<string, TableDetail> = {
    zaposlenik: {
      id: 'zaposlenik',
      name: 'EKI_Zaposlenik',
      displayName: 'Zaposlenik (Employee)',
      description: 'Glavna matična tabela zaposlenih u MKD EKI, sinhronizovana sa Active Directory/HRIS sistemom.',
      security: 'HR: Čitanje/Upis, Rukovodioci: Čitanje podređenih, Zaposleni: Čitanje vlastitog profila.',
      fields: [
        { name: 'ZaposlenikID', type: 'Unique identifier (PK)', key: 'PK', description: 'Jedinstveni ključ zaposlenika.' },
        { name: 'ImePrezime', type: 'Text (150)', description: 'Ime i prezime zaposlenika.' },
        { name: 'Email', type: 'Text (100)', description: 'Službeni email (@eki.ba).' },
        { name: 'Pozicija', type: 'Text (100)', description: 'Jedna od 60+ pozicija u sistemu.' },
        { name: 'PoslovnaJedinica', type: 'Text (50)', description: 'Poslovnica ili Centrala (Sarajevo, Tuzla, itd.).' },
        { name: 'OrganizacijskiDio', type: 'Text (100)', description: 'Sektor / Služba (npr. Kreditni sektor, IT sektor).' },
        { name: 'DatumZaposlenja', type: 'Date Only', description: 'Datum kada je zaposlenik počeo s radom u kompaniji.' },
        { name: 'RukovodilacID', type: 'Lookup (FK)', key: 'FK', description: 'Pokazivač na zaposlenog koji je rukovodilac.' }
      ],
      relationships: [
        { targetTable: 'evaluacija', type: '1 : N (Jedan zaposlenik ima više evaluacija tokom vremena)', field: 'ZaposlenikID' }
      ]
    },
    sablon: {
      id: 'sablon',
      name: 'EKI_SablonEvaluacije',
      displayName: 'Šablon Evaluacije (Template Header)',
      description: 'Zemljopisni i pozicijski šabloni evaluacija koje HR kreira i ažurira (No-Code).',
      security: 'HR: Čitanje/Upis, Rukovodioci: Čitanje, Zaposleni: Nema pristup.',
      fields: [
        { name: 'SablonID', type: 'Unique identifier (PK)', key: 'PK', description: 'Jedinstveni ključ šablona.' },
        { name: 'NazivSablona', type: 'Text (100)', description: 'Naziv (npr. Šablon za Kreditne Službenike).' },
        { name: 'OpisSablona', type: 'Text (400)', description: 'Detaljniji opis i namjena šablona.' },
        { name: 'GrupaPozicija', type: 'Choice', description: 'Grupa pozicija na koju se šablon primjenjuje (IT, Kreditni sektor, itd.).' },
        { name: 'RokSamoprocjeneDani', type: 'Integer', description: 'Broj dana koje zaposlenik ima za unos samoprocjene (npr. 5 dana).' },
        { name: 'RokRukovodiocaDani', type: 'Integer', description: 'Broj dana koje rukovodilac ima za ocjenjivanje (npr. 5 dana).' },
        { name: 'AktivnaVerzija', type: 'Two Options (Yes/No)', description: 'Zastavica da li je šablon aktivan za korištenje.' }
      ],
      relationships: [
        { targetTable: 'kriterij', type: '1 : N (Jedan šablon sadrži više kriterija)', field: 'SablonID' },
        { targetTable: 'evaluacija', type: '1 : N (Jedan šablon se koristi za više evaluacija)', field: 'SablonID' }
      ]
    },
    kriterij: {
      id: 'kriterij',
      name: 'EKI_KriterijSablon',
      displayName: 'Kriteriji Šablona (Template Criteria Details)',
      description: 'Pojedinačni kriteriji, opisi vještina i težine (ponderi) koji pripadaju određenom šablonu.',
      security: 'HR: Čitanje/Upis, Rukovodioci: Čitanje, Zaposleni: Čitanje tokom procesa.',
      fields: [
        { name: 'KriterijID', type: 'Unique identifier (PK)', key: 'PK', description: 'Jedinstveni ključ kriterija.' },
        { name: 'SablonID', type: 'Lookup (FK)', key: 'FK', description: 'Veza sa roditeljskim šablonu evaluacije.' },
        { name: 'Kategorija', type: 'Choice', description: 'Tehničke vještine, Komunikacija, Skladenost s vrijednostima, itd.' },
        { name: 'NazivKriterija', type: 'Text (150)', description: 'Naziv (npr. Kvalitet analize kreditnih zahtjeva).' },
        { name: 'OpisKompetencije', type: 'Text (500)', description: 'Pojasnjenje šta se tačno ocjenjuje i kako se dodjeljuju bodovi.' },
        { name: 'TezinaKriterija', type: 'Integer', description: 'Težinski udio u ukupnoj ocjeni (npr. 20%). Ukupan zbir u šablonu mora biti 100%.' }
      ],
      relationships: [
        { targetTable: 'sablon', type: 'N : 1 (Više kriterija pripada jednom šablonu)', field: 'SablonID' },
        { targetTable: 'detalj_evaluacije', type: '1 : N (Jedan kriterij se ocjenjuje u više detalja)', field: 'KriterijID' }
      ]
    },
    evaluacija: {
      id: 'evaluacija',
      name: 'EKI_Evaluacija',
      displayName: 'Evaluacija (Evaluation Instance Header)',
      description: 'Glavni transakcijski zapis pokrenutog procesa procjene rada za određenog zaposlenika.',
      security: 'Row-Level Security: HR: Čitanje/Upis, Rukovodilac: Čitanje/Upis (samo za svoje zaposlenike), Zaposleni: Čitanje/Upis (samo samoprocjena).',
      fields: [
        { name: 'EvaluacijaID', type: 'Unique identifier (PK)', key: 'PK', description: 'Jedinstveni ključ instance evaluacije.' },
        { name: 'ZaposlenikID', type: 'Lookup (FK)', key: 'FK', description: 'Veza sa zaposlenikom koji se ocjenjuje.' },
        { name: 'SablonID', type: 'Lookup (FK)', key: 'FK', description: 'Veza sa šablonom na osnovu kojeg se vrši ocjenjivanje.' },
        { name: 'Status', type: 'Choice', description: 'Inicirano, Samoprocjena završena, Rukovodilac završio, Kalibrisano, Arhivirano.' },
        { name: 'DatumIniciranja', type: 'Date Only', description: 'Datum kada je proces pokrenut (npr. 30 dana prije isteka probnog rada).' },
        { name: 'ZajednickiKomentarZaposlenik', type: 'Memo', description: 'Završno mišljenje i komentar zaposlenika na evaluaciju.' },
        { name: 'ZajednickiKomentarRukovodilac', type: 'Memo', description: 'Završni komentar i obrazloženje ocjena od strane rukovodioca.' },
        { name: 'RazvojniCiljevi', type: 'Memo', description: 'Definisani ciljevi razvoja za naredni period koji se prate u sledećem ciklusu.' },
        { name: 'PreporuceneEdukacije', type: 'Multiple Select Choice', description: 'Odabrani paketi obuka (npr. MS Excel, Upravljanje vremenom, Kreditna analiza).' },
        { name: 'PreporukaUgovor', type: 'Choice', description: 'Prijedlog ugovora (Produženje na neodređeno, određeno, ili raskid).' }
      ],
      relationships: [
        { targetTable: 'zaposlenik', type: 'N : 1 (Više evaluacija pripada jednom zaposleniku)', field: 'ZaposlenikID' },
        { targetTable: 'sablon', type: 'N : 1 (Evaluacija se radi prema jednom šablonu)', field: 'SablonID' },
        { targetTable: 'detalj_evaluacije', type: '1 : N (Jedna evaluacija sadrži više detaljnih ocjena po kriteriju)', field: 'EvaluacijaID' }
      ]
    },
    detalj_evaluacije: {
      id: 'detalj_evaluacije',
      name: 'EKI_DetaljEvaluacije',
      displayName: 'Detalj Evaluacije (Evaluation Details - Line Items)',
      description: 'Pojedinačne ocjene i komentari za svaki kriterij unutar jedne evaluacije.',
      security: 'Isti nivo pristupa kao i krovna tabela Evaluacija.',
      fields: [
        { name: 'DetaljEvaluacijeID', type: 'Unique identifier (PK)', key: 'PK', description: 'Jedinstveni ključ pojedinačne ocjene.' },
        { name: 'EvaluacijaID', type: 'Lookup (FK)', key: 'FK', description: 'Veza sa krovnim zapisom evaluacije.' },
        { name: 'KriterijID', type: 'Lookup (FK)', key: 'FK', description: 'Veza sa definisanim kriterijem iz šablona.' },
        { name: 'OcjenaZaposlenika', type: 'Integer (1-5)', description: 'Ocjena koju je unio sam zaposlenik.' },
        { name: 'OcjenaRukovodioca', type: 'Integer (1-5)', description: 'Ocjena koju je unio rukovodilac.' },
        { name: 'KomentarKriterija', type: 'Text (400)', description: 'Komentar i obrazloženje ocjene, obavezan ako su ocjene ekstremne (1 ili 5) ili različite.' }
      ],
      relationships: [
        { targetTable: 'evaluacija', type: 'N : 1 (Više pojedinačnih ocjena pripada jednoj krovnoj evaluaciji)', field: 'EvaluacijaID' },
        { targetTable: 'kriterij', type: 'N : 1 (Ocjena se veže za tačan kriterij iz šablona)', field: 'KriterijID' }
      ]
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2">
            <Database className="text-eki-green-500 h-6 w-6" />
            Relacijski Model Podataka (Dataverse ERD)
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Odaberite tabelu s lijeve strane da biste vidjeli polja, tipove podataka i relacije.
          </p>
        </div>
        <span className="text-xs bg-teal-50 text-teal-600 font-mono px-3 py-1.5 rounded-full border border-teal-100 mt-2 md:mt-0">
          Microsoft Dataverse Standard Entities
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: List of Tables */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Dataverse Tabele (Entities)</h4>
          <div className="space-y-2">
            {Object.values(tables).map((table) => {
              const isSelected = selectedTable === table.id;
              return (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected 
                      ? 'bg-eki-green-50 border-eki-green-500 text-eki-green-900 shadow-sm ring-1 ring-eki-green-200' 
                      : 'bg-white border-gray-100 hover:border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    <span className={`p-1.5 rounded-lg mt-0.5 ${
                      isSelected ? 'bg-eki-green-500 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {table.id === 'zaposlenik' && <User className="h-4 w-4" />}
                      {table.id === 'sablon' && <FileText className="h-4 w-4" />}
                      {table.id === 'kriterij' && <CheckSquare className="h-4 w-4" />}
                      {table.id === 'evaluacija' && <Database className="h-4 w-4" />}
                      {table.id === 'detalj_evaluacije' && <Link2 className="h-4 w-4" />}
                    </span>
                    <div>
                      <h5 className="font-bold text-sm leading-tight">{table.displayName}</h5>
                      <span className="text-[10px] font-mono text-gray-400 mt-0.5 block">{table.name}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 mt-1 transition-transform ${isSelected ? 'transform translate-x-1 text-eki-green-600' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex gap-2.5 items-start mt-4">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h6 className="font-bold text-xs">Usklađenost sa Sigurnošću</h6>
              <p className="text-[10px] text-amber-700 leading-normal mt-0.5">
                Struktura je projektovana da automatski primjenjuje prava na nivou redova. Zaposlenici nemaju nikakav uvid u tabelu <strong>EKI_SablonEvaluacije</strong> ili tuđe zapise.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Selected Table Fields & Relationships */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Table Header Details */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-mono font-semibold text-eki-green-600 uppercase tracking-widest bg-eki-green-50 px-2 py-0.5 rounded-md border border-eki-green-100">
                  Dataverse Tabela
                </span>
                <h4 className="font-display font-bold text-xl text-gray-900 mt-1">
                  {tables[selectedTable].displayName}
                </h4>
              </div>
              <span className="text-xs bg-white text-gray-500 border border-gray-200 px-3 py-1 rounded-full font-mono">
                {tables[selectedTable].name}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3.5 leading-relaxed">
              {tables[selectedTable].description}
            </p>
            <div className="border-t border-gray-200/60 pt-2.5 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between items-start sm:items-center text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldAlert className="h-3.5 w-3.5 text-eki-green-500 shrink-0" />
                Dozvole: <span className="text-gray-700">{tables[selectedTable].security}</span>
              </span>
            </div>
          </div>

          {/* Fields list */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h5 className="font-display font-bold text-sm text-gray-800">Definisana polja (Fields & Data Types)</h5>
              <span className="text-xs text-gray-400 font-medium">Ukupno polja: {tables[selectedTable].fields.length}</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[280px] overflow-y-auto">
              {tables[selectedTable].fields.map((field, idx) => (
                <div key={idx} className="p-3 px-4 flex items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50">
                  <div className="flex items-start sm:items-center gap-2.5">
                    {field.key === 'PK' && (
                      <span className="p-1 bg-amber-100 text-amber-700 rounded-md shrink-0" title="Primary Key">
                        <Key className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {field.key === 'FK' && (
                      <span className="p-1 bg-sky-100 text-sky-700 rounded-md shrink-0" title="Foreign Key / Lookup">
                        <Link2 className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {!field.key && <span className="w-5 h-5 shrink-0 block" />}
                    <div>
                      <span className="font-mono text-xs font-semibold text-gray-800 block">
                        {field.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {field.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 shrink-0">
                    {field.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Relationships */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Uspostavljene relacije (Relationships)
            </h5>
            <div className="space-y-2">
              {tables[selectedTable].relationships.map((rel, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-gray-800">{tables[selectedTable].name}</span>
                    <span className="text-gray-400">➔</span>
                    <span className="font-mono text-eki-green-600 bg-eki-green-50 px-1.5 py-0.5 rounded font-semibold">
                      {tables[rel.targetTable]?.name || rel.targetTable}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 italic bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                    Tip: {rel.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
