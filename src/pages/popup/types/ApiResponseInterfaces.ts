export interface Source {
  id: string;
  url: string;
  date: string;
}

export interface Sentence {
  id: string;
  sentence: string;
  source: Source;
}

export interface ApiResponseForSentence {
  count: number;
  sentences: Sentence[];
}
