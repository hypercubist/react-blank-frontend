export interface IAnswer {
  no?: number;
  content?: string;
  writer?: string;
}

export interface IAnswerSlice {
  answers: IAnswer[];
  hasNext: boolean;
}

export interface IAnswerSave {
  questionNo?: string;
  content?: string;
}

export interface IAnswerUpdate {
  questionNo?: string;
  content?: string;
}
