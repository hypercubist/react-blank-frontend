export interface IQuestionCategory {
  korValue?: string;
  engValue?: string;
}

export interface IQuestionSaveRequest {
  content?: string;
  categoryValue?: string;
}

export interface IQuestion {
  no?: number;
  categoryValue?: string;
  content?: string;
  writer?: string;
  views?: number;
}
