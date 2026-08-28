import codeMasterData from './codeMasterMessages.json';

export interface Poem {
  id: number;
  title: string;
  subtitle: string;
  theme: 'wadi-rum' | 'petra' | 'black-iris';
  themeNameAr: string;
  verses: string[];
  note: string;
  accentColor: string;
  badge: string;
  timestamp?: string;
  sender?: string;
  category?: string;
  type?: 'poetry' | 'prose';
  rawText?: string;
}

export const poems: Poem[] = codeMasterData as Poem[];
