/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlidePoint {
  title: string;
  description: string;
  subPoints?: string[];
}

export interface SlideData {
  id: number;
  section: 'Uvod' | 'Proces' | 'Arhitektura' | 'Baza' | 'NoCode' | 'Sigurnost' | 'Izvještaji' | 'Plan';
  title: string;
  subtitle?: string;
  points: SlidePoint[];
  visualType: 'none' | 'hero' | 'stats' | 'architecture' | 'datamodel' | 'process-flow' | 'security' | 'timeline';
  visualData?: any;
}

// Prototype structures
export interface EvaluationCriteria {
  id: string;
  category: 'Tehničke vještine' | 'Komunikacija & Saradnja' | 'Produktivnost & Kvalitet' | 'Skladenost s vrijednostima' | 'Inicijativa';
  title: string;
  description: string;
  weight: number; // Percentage, e.g., 20
}

export interface EvaluationTemplate {
  id: string;
  name: string;
  description: string;
  positionGroup: string; // e.g., "Kreditni Službenici", "IT i Podrška", "Administracija", "Rukovodioci"
  criteria: EvaluationCriteria[];
  deadlineDays: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  branch: string; // e.g., "Sarajevo", "Tuzla", "Mostar", "Banja Luka"
  costCenter: string;
  hireDate: string;
  status: 'Probni rad (3m)' | 'Probni rad (6m)' | 'Pred produženje' | 'Periodična procjena';
  managerName: string;
  managerEmail: string;
}

export interface EvaluationDetail {
  criteriaId: string;
  selfRating?: number; // 1-5
  managerRating?: number; // 1-5
  comment?: string;
}

export type EvaluationStatus = 
  | 'Inicirano' 
  | 'Samoprocjena završena' 
  | 'Rukovodilac završio' 
  | 'Kalibrisano & Potvrđeno' 
  | 'Arhivirano';

export interface EvaluationInstance {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  branch: string;
  status: EvaluationStatus;
  templateId: string;
  templateName: string;
  initiatedDate: string;
  selfSubmittedDate?: string;
  managerSubmittedDate?: string;
  completedDate?: string;
  
  // Scores & Comments
  scores: Record<string, { self?: number; manager?: number; comment?: string }>;
  generalSelfComment?: string;
  generalManagerComment?: string;
  
  // Recommendations
  developmentGoals?: string;
  recommendedTraining?: string[]; // list of training programs
  contractRecommendation?: 'Produženje na neodređeno' | 'Produženje na određeno (6m)' | 'Prekid ugovora' | 'Nije primjenjivo (Periodična)';
  
  // Audits
  auditLog: {
    timestamp: string;
    action: string;
    user: string;
  }[];
}
