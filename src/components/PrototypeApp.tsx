/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Settings, 
  BarChart3, 
  Plus, 
  Trash2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  GraduationCap, 
  ShieldAlert, 
  History, 
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { 
  Employee, 
  EvaluationInstance, 
  EvaluationTemplate, 
  EvaluationCriteria, 
  EvaluationStatus 
} from '../types';

// Standard Predefined Templates
const defaultTemplates: EvaluationTemplate[] = [
  {
    id: 'tpl_kreditni',
    name: 'Šablon za Kreditne Službenike',
    description: 'Šablon za procjenu operativnog osoblja u kreditnom sektoru (MKD EKI mreža).',
    positionGroup: 'Kreditni Službenici',
    deadlineDays: 5,
    criteria: [
      { id: 'kr_1_1', category: 'Tehničke vještine', title: 'Kvalitet kreditne analize', description: 'Sposobnost precizne i analitičke procjene kreditne sposobnosti klijenta i analize rizika u skladu sa EKI metodologijom.', weight: 30 },
      { id: 'kr_1_2', category: 'Produktivnost & Kvalitet', title: 'Akvizicija i zadržavanje klijenata', description: 'Efikasnost u pronalaženju novih klijenata, širenju portfolija i održavanju visoke stope zadržavanja postojećih klijenata.', weight: 30 },
      { id: 'kr_1_3', category: 'Skladenost s vrijednostima', title: 'Profesionalna etika i EKI vrijednosti', description: 'Usklađenost u radu sa kodeksom ponašanja kompanije, timski duh, te poštovanje etičkih principa u radu s klijentima.', weight: 20 },
      { id: 'kr_1_4', category: 'Komunikacija & Saradnja', title: 'Komunikacijske vještine', description: 'Kvalitet verbalne i pismene komunikacije, sposobnost pregovaranja i rješavanja konflikata sa klijentima i kolegama.', weight: 20 }
    ]
  },
  {
    id: 'tpl_it',
    name: 'Šablon za IT i Tehničku Podršku',
    description: 'Šablon namijenjen programerima, sistem administratorima i IT podršci u centrali.',
    positionGroup: 'IT i Podrška',
    deadlineDays: 7,
    criteria: [
      { id: 'kr_2_1', category: 'Tehničke vještine', title: 'Tehnička ekspertiza i rješavanje problema', description: 'Nivo tehničkog znanja, brzina i kvalitet otklanjanja incidenata, te rješavanje sistemskih problema.', weight: 30 },
      { id: 'kr_2_2', category: 'Produktivnost & Kvalitet', title: 'Kvalitet isporuke programskog koda / rješenja', description: 'Pristup razvoju, robusnost i stabilnost kreiranih softverskih modula ili IT infrastrukture.', weight: 30 },
      { id: 'kr_2_3', category: 'Inicijativa', title: 'Inovacije i proaktivnost', description: 'Predlaganje poboljšanja u procesima, automatizacija manuelnih zadataka i uvođenje modernih praksi u radu.', weight: 20 },
      { id: 'kr_2_4', category: 'Komunikacija & Saradnja', title: 'Timski rad i saradnja sa biznisom', description: 'Sposobnost prevođenja tehničkih pojmova u biznis zahtjeve i kvalitetna podrška kolegama iz drugih sektora.', weight: 20 }
    ]
  }
];

// Initial Dummy Employees
const initialEmployees: Employee[] = [
  { id: 'emp_001', name: 'Haris Mujić', email: 'haris.mujic@eki.ba', position: 'Mlađi kreditni službenik', department: 'Kreditni sektor', branch: 'Sarajevo', costCenter: 'CC-301', hireDate: '2026-03-15', status: 'Probni rad (3m)', managerName: 'Alen Mujkić', managerEmail: 'alen.mujkic@eki.ba' },
  { id: 'emp_002', name: 'Nejra Pašić', email: 'nejra.pasic@eki.ba', position: 'IT Specijalista za razvoj', department: 'IT sektor', branch: 'Centrala - Sarajevo', costCenter: 'CC-102', hireDate: '2025-12-15', status: 'Probni rad (6m)', managerName: 'Alen Mujkić', managerEmail: 'alen.mujkic@eki.ba' },
  { id: 'emp_003', name: 'Benjamin Softić', email: 'benjamin.softic@eki.ba', position: 'Kreditni službenik', department: 'Kreditni sektor', branch: 'Tuzla', costCenter: 'CC-402', hireDate: '2024-07-01', status: 'Pred produženje', managerName: 'Amra Hadžić', managerEmail: 'amra.hadzic@eki.ba' },
  { id: 'emp_004', name: 'Lejla Kadić', email: 'lejla.kadic@eki.ba', position: 'Viši kreditni službenik', department: 'Kreditni sektor', branch: 'Mostar', costCenter: 'CC-503', hireDate: '2022-01-10', status: 'Periodična procjena', managerName: 'Amra Hadžić', managerEmail: 'amra.hadzic@eki.ba' }
];

// Prepopulated instances matching default statuses
const initialInstances: EvaluationInstance[] = [
  {
    id: 'eval_001',
    employeeId: 'emp_001',
    employeeName: 'Haris Mujić',
    position: 'Mlađi kreditni službenik',
    branch: 'Sarajevo',
    status: 'Inicirano',
    templateId: 'tpl_kreditni',
    templateName: 'Šablon za Kreditne Službenike',
    initiatedDate: '2026-06-15',
    scores: {},
    auditLog: [
      { timestamp: '2026-06-15 09:00', action: 'Proces automatski iniciran (Sistemski okidač: 30 dana pred istek probnog rada)', user: 'Power Automate System' }
    ]
  },
  {
    id: 'eval_002',
    employeeId: 'emp_002',
    employeeName: 'Nejra Pašić',
    position: 'IT Specijalista za razvoj',
    branch: 'Centrala - Sarajevo',
    status: 'Samoprocjena završena',
    templateId: 'tpl_it',
    templateName: 'Šablon za IT i Tehničku Podršku',
    initiatedDate: '2026-06-10',
    selfSubmittedDate: '2026-06-14',
    scores: {
      'kr_2_1': { self: 4, comment: 'Smatram da sam uspješno savladala sve osnovne interne sisteme i brzo rješavam korisničke tickete.' },
      'kr_2_2': { self: 3, comment: 'Isporučila sam nekoliko manjih modula, radim na usavršavanju čistog pisanja koda.' },
      'kr_2_3': { self: 4, comment: 'Sama sam predložila i implementirala skriptu za automatizaciju dnevnih backupa.' },
      'kr_2_4': { self: 5, comment: 'Imam odličnu saradnju sa kolegama, uvijek dostupna za pomoć.' }
    },
    generalSelfComment: 'Izuzetno sam zadovoljna probnim radom. Sektor je kolegijalan i pružena mi je adekvatna obuka.',
    auditLog: [
      { timestamp: '2026-06-10 09:00', action: 'Proces pokrenut od strane HR-a', user: 'Amina Salman (HR)' },
      { timestamp: '2026-06-14 16:30', action: 'Zaposlenik popunio i podnio samoprocjenu', user: 'Nejra Pašić' }
    ]
  },
  {
    id: 'eval_003',
    employeeId: 'emp_003',
    employeeName: 'Benjamin Softić',
    position: 'Kreditni službenik',
    branch: 'Tuzla',
    status: 'Rukovodilac završio',
    templateId: 'tpl_kreditni',
    templateName: 'Šablon za Kreditne Službenike',
    initiatedDate: '2026-06-01',
    selfSubmittedDate: '2026-06-05',
    managerSubmittedDate: '2026-06-10',
    scores: {
      'kr_1_1': { self: 4, manager: 4, comment: 'Benjamin ima solidno razumijevanje, ali treba obratiti pažnju na dodatne analize kod specifičnih klijenata.' },
      'kr_1_2': { self: 5, manager: 4, comment: 'Vrlo aktivan na terenu. Ostvario 95% ciljeva u akviziciji, što je odlično.' },
      'kr_1_3': { self: 5, manager: 5, comment: 'Izuzetno poštuje vrijednosti i kodeks, primjer kolegijalnosti u poslovnici.' },
      'kr_1_4': { self: 4, manager: 4, comment: 'Dobra komunikacija i odlično vodi sastanke sa novim klijentima.' }
    },
    generalSelfComment: 'Smatram da sam dao maksimalan doprinos u Tuzli i da zaslužujem ugovor na neodređeno.',
    generalManagerComment: 'Benjamin je pouzdan radnik. Pokazao je izuzetan trud i disciplinu. Preporučujem produženje ugovora.',
    developmentGoals: 'Unaprijediti analizu rizika za poljoprivredne kredite u naredna 3 mjeseca.',
    recommendedTraining: ['Napredna kreditna analiza', 'Komunikacijske i pregovaračke vještine'],
    contractRecommendation: 'Produženje na neodređeno',
    auditLog: [
      { timestamp: '2026-06-01 08:30', action: 'Sistemski iniciran proces', user: 'Power Automate System' },
      { timestamp: '2026-06-05 11:20', action: 'Zaposlenik završio samoprocjenu', user: 'Benjamin Softić' },
      { timestamp: '2026-06-10 14:15', action: 'Rukovodilac završio procjenu i predložio odluku', user: 'Amra Hadžić' }
    ]
  }
];

export default function PrototypeApp() {
  const [role, setRole] = useState<'employee' | 'manager' | 'hr' | 'powerbi'>('hr');
  const [templates, setTemplates] = useState<EvaluationTemplate[]>(defaultTemplates);
  const [instances, setInstances] = useState<EvaluationInstance[]>(initialInstances);
  
  // Selection states
  const [selectedInstanceId, setSelectedInstanceId] = useState<string>('eval_002');
  const [activeTemplateId, setActiveTemplateId] = useState<string>('tpl_kreditni');
  
  // Self Appraisal State
  const [tempSelfRatings, setTempSelfRatings] = useState<Record<string, number>>({});
  const [tempSelfComments, setTempSelfComments] = useState<Record<string, string>>({});
  const [tempGeneralSelfComment, setTempGeneralSelfComment] = useState<string>('');
  
  // Manager Appraisal State
  const [tempManagerRatings, setTempManagerRatings] = useState<Record<string, number>>({});
  const [tempManagerComments, setTempManagerComments] = useState<Record<string, string>>({});
  const [tempGeneralManagerComment, setTempGeneralManagerComment] = useState<string>('');
  const [tempDevGoals, setTempDevGoals] = useState<string>('');
  const [tempTraining, setTempTraining] = useState<string[]>([]);
  const [tempContractRec, setTempContractRec] = useState<any>('Produženje na neodređeno');

  // HR No-Code Forms Management States
  const [newCriteriaTitle, setNewCriteriaTitle] = useState('');
  const [newCriteriaDesc, setNewCriteriaDesc] = useState('');
  const [newCriteriaCategory, setNewCriteriaCategory] = useState<any>('Tehničke vještine');
  const [newCriteriaWeight, setNewCriteriaWeight] = useState(25);

  const selectedInstance = instances.find(inst => inst.id === selectedInstanceId) || instances[0];
  const activeTemplateForEdit = templates.find(t => t.id === activeTemplateId) || templates[0];

  // Functions
  const handleSelectInstance = (id: string) => {
    setSelectedInstanceId(id);
    const inst = instances.find(i => i.id === id);
    if (inst) {
      // Pre-populate ratings from instance if they exist
      const selfRates: Record<string, number> = {};
      const selfComms: Record<string, string> = {};
      const mgrRates: Record<string, number> = {};
      const mgrComms: Record<string, string> = {};

      Object.entries(inst.scores).forEach(([critId, val]) => {
        const scoreObj = val as { self?: number; manager?: number; comment?: string };
        if (scoreObj.self) selfRates[critId] = scoreObj.self;
        if (scoreObj.comment) selfComms[critId] = scoreObj.comment;
        if (scoreObj.manager) mgrRates[critId] = scoreObj.manager;
        if (scoreObj.comment && scoreObj.manager) mgrComms[critId] = scoreObj.comment;
      });

      setTempSelfRatings(selfRates);
      setTempSelfComments(selfComms);
      setTempGeneralSelfComment(inst.generalSelfComment || '');
      
      setTempManagerRatings(mgrRates);
      setTempManagerComments(mgrComms);
      setTempGeneralManagerComment(inst.generalManagerComment || '');
      setTempDevGoals(inst.developmentGoals || '');
      setTempTraining(inst.recommendedTraining || []);
      setTempContractRec(inst.contractRecommendation || 'Produženje na neodređeno');
    }
  };

  const handleSelfAppraisalSubmit = (instId: string) => {
    const inst = instances.find(i => i.id === instId);
    if (!inst) return;

    const tpl = templates.find(t => t.id === inst.templateId);
    if (!tpl) return;

    // Build the scores object
    const finalScores: Record<string, any> = {};
    tpl.criteria.forEach(crit => {
      finalScores[crit.id] = {
        self: tempSelfRatings[crit.id] || 3,
        comment: tempSelfComments[crit.id] || ''
      };
    });

    const updated = instances.map(i => {
      if (i.id === instId) {
        return {
          ...i,
          status: 'Samoprocjena završena' as EvaluationStatus,
          scores: finalScores,
          generalSelfComment: tempGeneralSelfComment,
          selfSubmittedDate: new Date().toISOString().split('T')[0],
          auditLog: [
            ...i.auditLog,
            { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Zaposlenik popunio i podnio samoprocjenu', user: i.employeeName }
          ]
        };
      }
      return i;
    });

    setInstances(updated);
    alert('Samoprocjena uspješno spremljena i poslana rukovodiocu na pregled!');
  };

  const handleManagerAppraisalSubmit = (instId: string) => {
    const inst = instances.find(i => i.id === instId);
    if (!inst) return;

    const updated = instances.map(i => {
      if (i.id === instId) {
        // Merge manager ratings into scores
        const finalScores = { ...i.scores };
        Object.keys(finalScores).forEach(critId => {
          finalScores[critId] = {
            ...finalScores[critId],
            manager: tempManagerRatings[critId] || 3,
            comment: tempManagerComments[critId] || finalScores[critId].comment || ''
          };
        });

        return {
          ...i,
          status: 'Rukovodilac završio' as EvaluationStatus,
          scores: finalScores,
          generalManagerComment: tempGeneralManagerComment,
          developmentGoals: tempDevGoals,
          recommendedTraining: tempTraining,
          contractRecommendation: tempContractRec,
          managerSubmittedDate: new Date().toISOString().split('T')[0],
          auditLog: [
            ...i.auditLog,
            { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Rukovodilac završio procjenu i predložio odluku', user: inst.managerName }
          ]
        };
      }
      return i;
    });

    setInstances(updated);
    alert('Procjena uspješno završena! Podaci su poslani HR-u radi kalibracije.');
  };

  const handleAddCriteria = () => {
    if (!newCriteriaTitle || !newCriteriaDesc) {
      alert('Molimo popunite naziv i opis novog kriterija.');
      return;
    }

    const newCrit: EvaluationCriteria = {
      id: `kr_${Date.now()}`,
      category: newCriteriaCategory,
      title: newCriteriaTitle,
      description: newCriteriaDesc,
      weight: Number(newCriteriaWeight)
    };

    const updatedTpls = templates.map(t => {
      if (t.id === activeTemplateId) {
        return {
          ...t,
          criteria: [...t.criteria, newCrit]
        };
      }
      return t;
    });

    setTemplates(updatedTpls);
    setNewCriteriaTitle('');
    setNewCriteriaDesc('');
    alert(`Novi kriterij "${newCriteriaTitle}" je uspješno dodan u šablon bez izmjene ijedne linije koda!`);
  };

  const handleDeleteCriteria = (tplId: string, critId: string) => {
    const updatedTpls = templates.map(t => {
      if (t.id === tplId) {
        return {
          ...t,
          criteria: t.criteria.filter(c => c.id !== critId)
        };
      }
      return t;
    });
    setTemplates(updatedTpls);
  };

  const handleCalibrationConfirm = (instId: string) => {
    const updated = instances.map(i => {
      if (i.id === instId) {
        return {
          ...i,
          status: 'Kalibrisano & Potvrđeno' as EvaluationStatus,
          completedDate: new Date().toISOString().split('T')[0],
          auditLog: [
            ...i.auditLog,
            { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'HR odobrio i kalibrisao ocjene. Generisan PDF u SharePoint arhivi.', user: 'Amina Salman (HR Admin)' }
          ]
        };
      }
      return i;
    });
    setInstances(updated);
    alert('Evaluacija je uspješno kalibrisana, zaključana i spremljena u digitalni arhiv!');
  };

  const handleTriggerNewEvaluation = (empId: string) => {
    const emp = initialEmployees.find(e => e.id === empId);
    if (!emp) return;

    // Check if already exists
    if (instances.some(i => i.employeeId === empId && i.status !== 'Kalibrisano & Potvrđeno' && i.status !== 'Arhivirano')) {
      alert('Zaposlenik već ima aktivan proces evaluacije!');
      return;
    }

    const tplId = emp.department === 'IT sektor' ? 'tpl_it' : 'tpl_kreditni';
    const tplName = templates.find(t => t.id === tplId)?.name || 'Šablon';

    const newInst: EvaluationInstance = {
      id: `eval_${Date.now().toString().substring(8)}`,
      employeeId: emp.id,
      employeeName: emp.name,
      position: emp.position,
      branch: emp.branch,
      status: 'Inicirano',
      templateId: tplId,
      templateName: tplName,
      initiatedDate: new Date().toISOString().split('T')[0],
      scores: {},
      auditLog: [
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'HR manuelno pokrenuo vanrednu procjenu', user: 'Amina Salman (HR)' }
      ]
    };

    setInstances([newInst, ...instances]);
    setSelectedInstanceId(newInst.id);
    alert(`Uspješno pokrenut proces procjene za ${emp.name}. Poslano je obavještenje u MS Teams!`);
  };

  return (
    <div className="bg-gray-100 min-h-[600px] rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col font-sans max-w-6xl mx-auto">
      
      {/* Simulation Bar */}
      <div className="bg-slate-900 px-6 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-eki-yellow-500 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-gray-300">
            Power Platform / Microsoft 365 Prototip Simulacija
          </span>
        </div>
        
        {/* Role Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button 
            onClick={() => { setRole('hr'); handleSelectInstance('eval_002'); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              role === 'hr' ? 'bg-eki-green-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            HR Admin (Amina)
          </button>
          <button 
            onClick={() => { setRole('employee'); handleSelectInstance('eval_001'); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              role === 'employee' ? 'bg-eki-green-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Zaposlenik (Haris)
          </button>
          <button 
            onClick={() => { setRole('manager'); handleSelectInstance('eval_002'); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              role === 'manager' ? 'bg-eki-green-50 text-eki-green-900 shadow font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Rukovodilac (Alen)
          </button>
          <button 
            onClick={() => setRole('powerbi')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              role === 'powerbi' ? 'bg-amber-500 text-slate-900 shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Power BI
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-white grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* ========================================================
            ROLE 1: HR COORDINATOR (AMINA) VIEW
            ======================================================== */}
        {role === 'hr' && (
          <>
            {/* Left sidebar: active evaluations & templates */}
            <div className="lg:col-span-4 border-r border-gray-100 p-5 bg-gray-50/50 flex flex-col gap-5">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Iniciranje Vanrednih Evaluacija
                </h4>
                <div className="space-y-2">
                  {initialEmployees.map(emp => (
                    <div key={emp.id} className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-gray-800">{emp.name}</span>
                        <span className="block text-gray-400 font-mono text-[9px]">{emp.position} ({emp.branch})</span>
                      </div>
                      <button 
                        onClick={() => handleTriggerNewEvaluation(emp.id)}
                        className="bg-eki-green-500 hover:bg-eki-green-600 text-white p-1.5 rounded-md text-[10px] font-semibold flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Pokreni
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Aktivne Procjene u Toku ({instances.length})
                  </h4>
                  <span className="text-[10px] bg-eki-green-100 text-eki-green-800 font-mono px-2 py-0.5 rounded-full">Dataverse</span>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[220px]">
                  {instances.map(inst => (
                    <button
                      key={inst.id}
                      onClick={() => handleSelectInstance(inst.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedInstanceId === inst.id 
                          ? 'bg-eki-green-50 border-eki-green-500 ring-1 ring-eki-green-200' 
                          : 'bg-white border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-gray-800">{inst.employeeName}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          inst.status === 'Inicirano' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          inst.status === 'Samoprocjena završena' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          inst.status === 'Rukovodilac završio' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                          'bg-gray-50 text-gray-500 border border-gray-100'
                        }`}>
                          {inst.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 flex justify-between items-center">
                        <span>{inst.position}</span>
                        <span>Inicirano: {inst.initiatedDate}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reminder Simulation */}
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 mt-auto">
                <div className="flex gap-2 items-start mb-2">
                  <Bell className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs leading-none">Power Automate Podsjetnici</h5>
                    <p className="text-[10px] text-indigo-700 leading-normal mt-1">
                      Pošaljite automatske M365 podsjetnike rukovodiocima koji kasne.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Power Automate tok pokrenut! Provjera svih neaktivnih evaluacija... 3 podsjetnika poslana putem MS Teams-a i Outlook-a.')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 rounded-md text-[10px] shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3 w-3" />
                  Pošalji podsjetnike sad
                </button>
              </div>
            </div>

            {/* Right main panel: HR Form & Template Management Console */}
            <div className="lg:col-span-8 p-6 flex flex-col gap-6 overflow-y-auto max-h-[580px]">
              
              {/* Appraisal review / Calibration section */}
              <div className="border border-gray-100 rounded-xl p-5 shadow-sm bg-gray-50/40">
                <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Kalibracija i Odobrenje</span>
                    <h3 className="font-display font-bold text-base text-gray-900 mt-0.5">
                      Procjena: {selectedInstance.employeeName} ({selectedInstance.position})
                    </h3>
                  </div>
                  <span className="text-xs bg-white text-gray-500 px-2.5 py-1 rounded border border-gray-100 font-mono font-medium">
                    ID: {selectedInstance.id}
                  </span>
                </div>

                {/* Displaying Current Ratings comparison */}
                {selectedInstance.status === 'Inicirano' ? (
                  <div className="py-6 flex flex-col items-center text-center text-gray-400">
                    <Clock className="h-10 w-10 text-gray-300 mb-2 animate-bounce" />
                    <p className="text-xs">Zaposlenik još uvijek nije popunio samoprocjenu.</p>
                    <p className="text-[10px] text-gray-400 mt-1">Status: Čeka se unos samoprocjene (Haris Mujić).</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                        <span className="font-semibold text-amber-800 block mb-1">Komentar Zaposlenika:</span>
                        <p className="italic text-gray-600">"{selectedInstance.generalSelfComment || 'Nema komentara.'}"</p>
                      </div>
                      <div className="bg-teal-50/50 p-3 rounded-lg border border-teal-100">
                        <span className="font-semibold text-teal-800 block mb-1">Komentar Rukovodioca:</span>
                        <p className="italic text-gray-600">"{selectedInstance.generalManagerComment || 'Čeka se popunjavanje.'}"</p>
                      </div>
                    </div>

                    {/* Quick Scores Comparison List */}
                    <div className="bg-white rounded-lg border border-gray-100 p-3 space-y-2">
                      <h5 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2">Poređenje Ocjena (Zaposlenik vs Rukovodilac)</h5>
                      {Object.entries(selectedInstance.scores).map(([critId, scoreObj]: [string, any]) => {
                        const template = templates.find(t => t.id === selectedInstance.templateId);
                        const crit = template?.criteria.find(c => c.id === critId);
                        if (!crit) return null;
                        return (
                          <div key={critId} className="flex justify-between items-center text-xs border-b border-gray-50 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-medium text-gray-700">{crit.title}</span>
                            <div className="flex gap-4 font-mono font-bold">
                              <span className="text-amber-600" title="Samoprocjena">S: {scoreObj.self || '-'}</span>
                              <span className="text-teal-600" title="Procjena rukovodioca">R: {scoreObj.manager || '-'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Goals & Training Recommendations */}
                    {selectedInstance.status === 'Rukovodilac završio' && (
                      <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-100 text-xs">
                        <h5 className="font-bold text-sky-900 mb-1.5 flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" /> Preporučeni Razvojni Plan:
                        </h5>
                        <p className="mb-2"><strong>Ciljevi:</strong> {selectedInstance.developmentGoals}</p>
                        <p className="mb-2"><strong>Preporučene Obuke:</strong> {selectedInstance.recommendedTraining?.join(', ')}</p>
                        <p className="font-semibold text-sky-800">Predloženi ugovor: {selectedInstance.contractRecommendation}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                      {selectedInstance.status === 'Rukovodilac završio' && (
                        <button
                          onClick={() => handleCalibrationConfirm(selectedInstance.id)}
                          className="bg-eki-green-500 hover:bg-eki-green-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Odobri i Kalibriši (Zaključaj proces)
                        </button>
                      )}
                      {selectedInstance.status === 'Kalibrisano & Potvrđeno' && (
                        <div className="w-full flex justify-between items-center bg-eki-green-50 p-3 rounded-lg border border-eki-green-200">
                          <span className="text-xs font-bold text-eki-green-800 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" /> Evaluacija je završena i spremljena u digitalni dosije.
                          </span>
                          <button 
                            onClick={() => alert('PDF Izveštaj generisan i spremljen na SharePoint lokaciju: /Dokumenti/Evaluacije_2026/')}
                            className="bg-white border border-eki-green-300 hover:bg-eki-green-50 text-eki-green-700 text-[10px] font-bold py-1 px-3 rounded-md"
                          >
                            Preuzmi PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* HR No-Code Forms & Templates Configuration Panel */}
              <div className="border border-gray-100 rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-5">
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900 flex items-center gap-2">
                      <Sparkles className="text-eki-yellow-500 h-5 w-5" />
                      HR Samostalno Upravljanje Šablonima (No-Code Console)
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Uređujte kriterije, težine i dodajte nova pravila u šablone evaluacije bez ikakve izmjene koda u aplikaciji.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* List criteria inside active template (6 cols) */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Izaberi Šablon za Uređivanje</label>
                      <select 
                        value={activeTemplateId}
                        onChange={(e) => setActiveTemplateId(e.target.value)}
                        className="text-xs bg-gray-50 border border-gray-200 rounded px-2.5 py-1"
                      >
                        {templates.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100 space-y-3">
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Trenutni kriteriji u šablonu</span>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {activeTemplateForEdit.criteria.map(crit => (
                          <div key={crit.id} className="bg-white p-2.5 rounded-lg border border-gray-100 flex justify-between items-start gap-3">
                            <div className="text-xs flex-1">
                              <span className="text-[9px] uppercase font-bold text-eki-green-600 block mb-0.5">{crit.category}</span>
                              <h5 className="font-bold text-gray-800 leading-tight">{crit.title}</h5>
                              <p className="text-[10px] text-gray-400 mt-1 font-mono">Ponder (Težina): {crit.weight}%</p>
                            </div>
                            <button 
                              onClick={() => handleDeleteCriteria(activeTemplateForEdit.id, crit.id)}
                              className="text-gray-300 hover:text-red-500 p-1 rounded transition-colors"
                              title="Ukloni kriterij"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add new criteria form (6 cols) */}
                  <div className="md:col-span-6 bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                    <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                      <Plus className="h-4 w-4 text-eki-green-500" />
                      Dodaj Novi Kriterij (Pravilo)
                    </h4>
                    
                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Naziv vještine / Kriterija</label>
                        <input 
                          type="text" 
                          placeholder="npr. Poznavanje AML propisa"
                          value={newCriteriaTitle}
                          onChange={(e) => setNewCriteriaTitle(e.target.value)}
                          className="w-full text-xs bg-white border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Kategorija</label>
                        <select 
                          value={newCriteriaCategory}
                          onChange={(e: any) => setNewCriteriaCategory(e.target.value)}
                          className="w-full text-xs bg-white border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                        >
                          <option value="Tehničke vještine">Tehničke vještine</option>
                          <option value="Komunikacija & Saradnja">Komunikacija & Saradnja</option>
                          <option value="Produktivnost & Kvalitet">Produktivnost & Kvalitet</option>
                          <option value="Skladenost s vrijednostima">Skladenost s vrijednostima</option>
                          <option value="Inicijativa">Inicijativa</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Opis (Šta se ocjenjuje i kako)</label>
                        <textarea 
                          rows={2}
                          placeholder="Usklađenost u radu sa najnovijim zakonskim procedurama o sprečavanju pranja novca..."
                          value={newCriteriaDesc}
                          onChange={(e) => setNewCriteriaDesc(e.target.value)}
                          className="w-full text-xs bg-white border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Ponder / Težina (%)</label>
                          <input 
                            type="number" 
                            min="5" 
                            max="50" 
                            value={newCriteriaWeight}
                            onChange={(e) => setNewCriteriaWeight(Number(e.target.value))}
                            className="w-full text-xs bg-white border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={handleAddCriteria}
                            className="w-full bg-eki-green-500 hover:bg-eki-green-600 text-white font-bold py-2 px-3 rounded text-xs shadow-sm transition-all"
                          >
                            Spremi Kriterij
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Audit History and Logs - Proof of Enterprise Security */}
              <div className="border border-gray-100 rounded-xl p-5 shadow-sm bg-white">
                <h4 className="font-display font-bold text-sm text-gray-800 flex items-center gap-1.5 mb-3">
                  <History className="h-4.5 w-4.5 text-gray-500" />
                  Istorija Promjena i Revizijski Tragovi (Audit Logs)
                </h4>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {selectedInstance.auditLog.map((log, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] flex justify-between items-start gap-4">
                      <div>
                        <span className="font-mono text-gray-400 font-semibold">{log.timestamp}</span>
                        <p className="font-medium text-gray-700 mt-0.5">{log.action}</p>
                      </div>
                      <span className="bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500 shrink-0 font-medium">
                        Korisnik: {log.user}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}

        {/* ========================================================
            ROLE 2: EMPLOYEE (HARIS) SELF-APPRAISAL VIEW
            ======================================================== */}
        {role === 'employee' && (
          <div className="lg:col-span-12 p-6 overflow-y-auto max-h-[580px]">
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Employee Header */}
              <div className="bg-eki-green-50 p-5 rounded-2xl border border-eki-green-100 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-eki-green-700 bg-eki-green-100 px-2 py-0.5 rounded border border-eki-green-200">
                    Samouslužni Portal za Zaposlenike (Employee Portal)
                  </span>
                  <h3 className="font-display font-bold text-xl text-gray-900 mt-1.5">
                    Haris Mujić — Mlađi kreditni službenik (Sarajevo)
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Trenutna faza: <strong>Probni rad (3 mjeseca)</strong> • Rukovodilac: <strong>Alen Mujkić</strong>
                  </p>
                </div>
                <div className="text-right text-xs bg-white p-3 rounded-lg border border-gray-100 shrink-0">
                  <span className="text-gray-400">Rok za predaju:</span>
                  <p className="font-bold text-red-500 flex items-center gap-1 mt-0.5">
                    <Clock className="h-4 w-4" /> Još 3 dana
                  </p>
                </div>
              </div>

              {/* Appraisal Instructions */}
              <div className="bg-amber-50/50 p-4 border border-amber-100 rounded-xl text-xs text-amber-900 leading-relaxed">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Instrukcija za popunjavanje samoprocjene:
                </span>
                Procijenite svoj rad u proteklom periodu na skali od 1 do 5 za svaki navedeni kriterij. Vaša samoprocjena je polazna tačka za razgovor o performansu sa vašim rukovodiocem. Budite objektivni i navedite kratka obrazloženja za ocjene.
              </div>

              {/* Dynamic Evaluation Criteria Form */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-5 py-3.5 border-b border-gray-100">
                  <h4 className="font-display font-bold text-sm text-gray-800">
                    Obrazac procjene: Šablon za Kreditne Službenike
                  </h4>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {templates.find(t => t.id === 'tpl_kreditni')?.criteria.map((crit) => (
                    <div key={crit.id} className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-eki-green-600 bg-eki-green-50 px-2 py-0.5 rounded border border-eki-green-100 font-mono">
                            {crit.category}
                          </span>
                          <h5 className="font-bold text-sm text-gray-800 mt-1">{crit.title}</h5>
                          <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{crit.description}</p>
                        </div>
                        <span className="text-[10px] bg-gray-100 font-mono text-gray-500 px-2 py-0.5 rounded">Ponder: {crit.weight}%</span>
                      </div>

                      {/* Score Selector (1-5) */}
                      <div className="flex items-center gap-4 mt-2">
                        <label className="text-xs font-bold text-gray-500">Vaša ocjena:</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((val) => {
                            const isSelected = tempSelfRatings[crit.id] === val;
                            return (
                              <button
                                key={val}
                                onClick={() => setTempSelfRatings({ ...tempSelfRatings, [crit.id]: val })}
                                className={`w-8 h-8 rounded-full font-mono text-xs font-bold transition-all border ${
                                  isSelected 
                                    ? 'bg-eki-green-500 border-eki-green-500 text-white shadow-sm ring-2 ring-eki-green-200' 
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs text-gray-400">
                          {tempSelfRatings[crit.id] === 1 && 'Nedovoljan'}
                          {tempSelfRatings[crit.id] === 2 && 'Dovoljan (Potrebno poboljšanje)'}
                          {tempSelfRatings[crit.id] === 3 && 'Dobar (U skladu s očekivanjima)'}
                          {tempSelfRatings[crit.id] === 4 && 'Vrlo dobar (Iznad očekivanja)'}
                          {tempSelfRatings[crit.id] === 5 && 'Izuzetan'}
                        </span>
                      </div>

                      {/* Optional Comment for the criteria */}
                      <div className="mt-1">
                        <input 
                          type="text" 
                          placeholder="Dodajte opcionalni komentar ili obrazloženje ocjene..."
                          value={tempSelfComments[crit.id] || ''}
                          onChange={(e) => setTempSelfComments({ ...tempSelfComments, [crit.id]: e.target.value })}
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General comment */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Opšti komentar, utisci o timu i mentorska podrška:</label>
                <textarea 
                  rows={3}
                  placeholder="Navedite svoje utiske o probnom radu, kolegama, obuci, te oblastima u kojima smatrate da vam je potrebna dalja podrška u MKD EKI..."
                  value={tempGeneralSelfComment}
                  onChange={(e) => setTempGeneralSelfComment(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <ShieldAlert className="h-4 w-4 text-eki-green-500" />
                  Podnošenjem forme zaključavate ocjene. Promjene su poslije moguće isključivo uz odobrenje HR-a.
                </span>
                <button
                  onClick={() => handleSelfAppraisalSubmit('eval_001')}
                  className="bg-eki-green-500 hover:bg-eki-green-600 text-white font-bold text-xs py-2 px-5 rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Pošalji samoprocjenu
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            ROLE 3: MANAGER (ALEN) APPRAISAL VIEW
            ======================================================== */}
        {role === 'manager' && (
          <>
            {/* Left sidebar: list of team members waiting review */}
            <div className="lg:col-span-4 border-r border-gray-100 p-5 bg-gray-50/50 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Moji Direktni Podređeni
                </h4>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-mono px-2 py-0.5 rounded-full">Manager RLS</span>
              </div>
              
              <div className="space-y-2">
                {instances.filter(i => i.status === 'Samoprocjena završena' || i.status === 'Rukovodilac završio').map(inst => {
                  const isSelected = selectedInstanceId === inst.id;
                  return (
                    <button
                      key={inst.id}
                      onClick={() => handleSelectInstance(inst.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                        isSelected 
                          ? 'bg-eki-green-50 border-eki-green-500 ring-1 ring-eki-green-200' 
                          : 'bg-white border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-gray-800">{inst.employeeName}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          inst.status === 'Samoprocjena završena' ? 'bg-amber-100 text-amber-800 font-semibold' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {inst.status === 'Samoprocjena završena' ? 'Čeka Procjenu' : 'Završeno'}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {inst.position} • {inst.branch}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-3.5 mt-auto text-xs text-gray-500">
                <h5 className="font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <User className="h-4 w-4 text-eki-green-500" />
                  Rukovodilac Profil:
                </h5>
                <p><strong>Ime:</strong> Alen Mujkić</p>
                <p><strong>Uloga:</strong> Voditelj IT službe / Kreditni direktor regije</p>
              </div>
            </div>

            {/* Right main panel: Manager form entries */}
            <div className="lg:col-span-8 p-6 overflow-y-auto max-h-[580px] flex flex-col gap-5">
              
              {/* Active Employee context summary */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Ocjenjivanje Zaposlenika</span>
                  <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">
                    {selectedInstance.employeeName}
                  </h3>
                  <span className="text-xs text-gray-500">{selectedInstance.position} • {selectedInstance.branch}</span>
                </div>
                <div className="bg-white p-2 border border-gray-100 rounded-lg text-center shrink-0">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold block">Datum podnošenja samoprocjene</span>
                  <span className="text-xs font-mono font-bold text-gray-700">{selectedInstance.selfSubmittedDate || 'N/A'}</span>
                </div>
              </div>

              {/* Employee's general self feedback */}
              <div className="bg-amber-50/50 p-4 border border-amber-100 rounded-xl text-xs">
                <span className="font-bold text-amber-800 block mb-1 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Opšti utisci zaposlenog o radu i podršci:
                </span>
                <p className="italic text-gray-600">"{selectedInstance.generalSelfComment || 'Zaposlenik nije ostavio opšti komentar.'}"</p>
              </div>

              {/* Interactive manager scores list */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm space-y-4">
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100 flex justify-between items-center">
                  <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wider">Unos ocjena i poređenje</h4>
                  <span className="text-[10px] text-gray-400">Vrijednost samoprocjene je označena narandžastom bojom.</span>
                </div>

                <div className="divide-y divide-gray-100 p-1">
                  {templates.find(t => t.id === selectedInstance.templateId)?.criteria.map((crit) => {
                    const selfScore = selectedInstance.scores[crit.id]?.self;
                    const selfComment = selectedInstance.scores[crit.id]?.comment;
                    return (
                      <div key={crit.id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h5 className="font-bold text-xs text-gray-800 leading-tight">{crit.title}</h5>
                            <p className="text-[10px] text-gray-400 leading-normal mt-0.5">{crit.description}</p>
                            {selfComment && (
                              <p className="text-[10px] bg-amber-50 text-amber-800 p-2 rounded border border-amber-100/50 mt-2 italic">
                                <strong>Komentar zaposlenog:</strong> "{selfComment}"
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] bg-gray-100 font-mono text-gray-500 px-2 py-0.5 rounded">Ponder: {crit.weight}%</span>
                        </div>

                        {/* Rating Comparison Row */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-xs">
                          {/* Self score badge */}
                          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2 py-1 rounded border border-amber-100">
                            <span>Samoprocjena:</span>
                            <span className="font-bold">{selfScore || 'N/A'}</span>
                          </div>

                          {/* Manager Rating Selector */}
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-600">Ocjena rukovodioca:</span>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const isSelected = tempManagerRatings[crit.id] === val;
                                return (
                                  <button
                                    key={val}
                                    onClick={() => setTempManagerRatings({ ...tempManagerRatings, [crit.id]: val })}
                                    className={`w-7 h-7 rounded-full font-mono text-[10px] font-bold transition-all border ${
                                      isSelected 
                                        ? 'bg-eki-green-500 border-eki-green-500 text-white shadow' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Comment input */}
                        <div>
                          <input 
                            type="text" 
                            placeholder="Obrazloženje ocjene rukovodioca (obavezno ako se razlikuje od samoprocjene)..."
                            value={tempManagerComments[crit.id] || ''}
                            onChange={(e) => setTempManagerComments({ ...tempManagerComments, [crit.id]: e.target.value })}
                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded p-1.5 focus:ring-1 focus:ring-eki-green-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Goal-setting, Training & Recommendation section */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
                <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-2">
                  Razvojni plan i Preporuka ugovora
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Ciljevi razvoja za naredni period:</label>
                    <textarea 
                      rows={2}
                      placeholder="npr. Unaprijediti brzinu unosa kreditnih prijedloga, proći obuku o AML procedurama..."
                      value={tempDevGoals}
                      onChange={(e) => setTempDevGoals(e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                    />
                  </div>

                  {/* Prebuilt Obuke Checklist */}
                  <div>
                    <label className="font-bold text-gray-700 block mb-1.5">Preporučene Edukacije / Obuke:</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['EKI Kreditna metodologija', 'AML i Sprječavanje pranja novca', 'Pregovaračke vještine', 'Napredni Excel', 'Upravljanje vremenom'].map((obuka) => {
                        const isChecked = tempTraining.includes(obuka);
                        return (
                          <button
                            key={obuka}
                            onClick={() => {
                              if (isChecked) {
                                setTempTraining(tempTraining.filter(t => t !== obuka));
                              } else {
                                setTempTraining([...tempTraining, obuka]);
                              }
                            }}
                            className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${
                              isChecked ? 'bg-sky-50 border-sky-300 text-sky-900 font-semibold' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-sky-500 border-sky-500 text-white' : 'border-gray-300'
                            }`}>
                              {isChecked && '✓'}
                            </span>
                            <span>{obuka}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommendation decision */}
                  <div className="pt-2">
                    <label className="font-bold text-gray-700 block mb-1.5">Predložena Odluka o radno-pravnom statusu:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Produženje na neodređeno',
                        'Produženje na određeno (6m)',
                        'Prekid ugovora'
                      ].map((rec) => {
                        const isSel = tempContractRec === rec;
                        return (
                          <button
                            key={rec}
                            onClick={() => setTempContractRec(rec as any)}
                            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                              isSel 
                                ? 'bg-eki-green-50 border-eki-green-500 text-eki-green-900 font-bold ring-1 ring-eki-green-100' 
                                : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-[11px] leading-tight">{rec}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Završni komentar rukovodioca:</label>
                    <textarea 
                      rows={2}
                      placeholder="Obrazložite predloženu odluku..."
                      value={tempGeneralManagerComment}
                      onChange={(e) => setTempGeneralManagerComment(e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded p-2 focus:ring-1 focus:ring-eki-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit panel */}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400">
                  Ocjene se šalju na kalibraciju HR-u. Podaci su zaštićeni RLS-om i niko drugi u poslovnici ih ne može vidjeti.
                </span>
                <button
                  onClick={() => handleManagerAppraisalSubmit(selectedInstance.id)}
                  className="bg-eki-green-500 hover:bg-eki-green-600 text-white font-bold text-xs py-2 px-5 rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Pošalji ocjene HR-u
                </button>
              </div>

            </div>
          </>
        )}

        {/* ========================================================
            ROLE 4: POWER BI ANALYTICS (DASHBOARD)
            ======================================================== */}
        {role === 'powerbi' && (
          <div className="lg:col-span-12 p-6 overflow-y-auto max-h-[580px] bg-slate-50">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Power BI Title Banner */}
              <div className="bg-amber-500 text-slate-900 p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-slate-900 text-amber-500 rounded-xl shadow-md">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">Zbirni Dashboard za Performanse (Power BI Embedded)</h3>
                    <p className="text-xs text-slate-800 mt-0.5">MKD EKI d.o.o. Sarajevo • Analitika i agregirani trendovi u realnom vremenu</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/10 p-1.5 rounded-lg border border-slate-900/15 text-xs font-semibold">
                  <Filter className="h-3.5 w-3.5" /> Filteri: Sve regije
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Pokrenuto evaluacija</span>
                  <p className="font-display font-bold text-2xl text-gray-900 mt-1">124</p>
                  <span className="text-[9px] text-eki-green-500 font-semibold mt-1 block">✓ 100% u roku</span>
                </div>
                <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Završena stopa (%)</span>
                  <p className="font-display font-bold text-2xl text-gray-900 mt-1">92.4%</p>
                  <span className="text-[9px] text-gray-400 block mt-1">Preostalo: 8 procesa</span>
                </div>
                <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Prosječna ocjena MKD</span>
                  <p className="font-display font-bold text-2xl text-eki-green-500 mt-1">4.12 / 5.0</p>
                  <span className="text-[9px] text-amber-600 block mt-1 font-semibold">U skladu sa budžetom</span>
                </div>
                <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Preporuke za neodređeno</span>
                  <p className="font-display font-bold text-2xl text-indigo-600 mt-1">84.5%</p>
                  <span className="text-[9px] text-gray-400 block mt-1">Stopa zadržavanja kadra</span>
                </div>
              </div>

              {/* Graphical Analysis grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Average Rating by Category (7 cols) */}
                <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wider">
                    Prosječne Ocjene po Kategorijama Vještina
                  </h4>
                  <div className="space-y-3.5">
                    {[
                      { cat: 'Tehničke vještine', score: 4.2 },
                      { cat: 'Komunikacija & Saradnja', score: 4.5 },
                      { cat: 'Produktivnost & Kvalitet', score: 3.9 },
                      { cat: 'Skladenost s vrijednostima', score: 4.8 },
                      { cat: 'Inicijativa', score: 3.5 }
                    ].map((item, idx) => {
                      const percent = (item.score / 5.0) * 100;
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-gray-700">{item.cat}</span>
                            <span className="font-bold text-gray-900">{item.score} / 5.0</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-eki-green-500 rounded-full transition-all duration-1000" 
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-[10px] text-gray-500 leading-normal border border-gray-100/50">
                    💡 <strong>Opažanje:</strong> Najviša prosječna ocjena je zabilježena u usklađenosti s vrijednostima (4.8), dok je najmanja u inicijativi (3.5). HR planira organizaciju radionica o proaktivnosti i inovativnosti u poslovnicama.
                  </div>
                </div>

                {/* 2. Top training needs (5 cols) */}
                <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm space-y-3">
                  <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wider">
                    Top 5 Edukacijskih Potreba (GAP analiza)
                  </h4>
                  
                  <div className="space-y-3 pt-1">
                    {[
                      { name: 'AML i sprječavanje pranja novca', count: 48 },
                      { name: 'Pregovaračke vještine', count: 35 },
                      { name: 'EKI Kreditna metodologija', count: 28 },
                      { name: 'Napredni Excel', count: 19 },
                      { name: 'Upravljanje stresom i vremenom', count: 12 }
                    ].map((tr, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-700 font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 truncate max-w-[160px]">{tr.name}</span>
                        </div>
                        <span className="bg-sky-50 text-sky-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {tr.count} zahtjeva
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-[10px] text-sky-900 leading-normal">
                    <strong>HR Akcija:</strong> Automatski objedinjeni podaci za trening plan. Odjel edukacija može direktno organizovati grupni AML webinar u julu, čime se štedi 30% budžeta u odnosu na individualne treninge.
                  </div>
                </div>

              </div>

              {/* Branch comparison */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm space-y-3">
                <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wider">
                  Učinak po Poslovnicama i Regijama (Izvještaj za Upravu)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                  {[
                    { branch: 'Regija Sarajevo', val: '4.21', status: 'Sve popunjeno' },
                    { branch: 'Regija Tuzla', val: '4.15', status: 'Čeka se 2' },
                    { branch: 'Regija Mostar', val: '4.08', status: 'Sve popunjeno' },
                    { branch: 'Regija Banja Luka', val: '4.02', status: 'Čeka se 1' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100 text-center">
                      <span className="text-xs font-bold text-gray-800 block">{item.branch}</span>
                      <p className="font-display font-bold text-xl text-gray-900 mt-1">{item.val} <span className="text-[11px] text-gray-400 font-normal">/5.0</span></p>
                      <span className="text-[9px] text-gray-400 block mt-0.5">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
