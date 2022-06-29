export interface IQuestionCategory {
  korValue?: string;
  engValue?: string;
}

export interface IQuestionSave {
  content?: string;
  categoryValue?: string;
}

export interface IQuestion {
  no?: number;
  categoryValue?: string;
  content?: string;
  writer?: string;
  writerNo?: number;
  views?: number;
}

export interface IQuestionSlice {
  questions: IQuestion[];
  hasNext: boolean;
}

export interface IQuestionUpdate {
  content?: string;
  categoryValue?: string;
}
