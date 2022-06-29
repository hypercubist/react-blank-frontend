import { BACKEND_SERVER_URL } from "../Constants";

import {
  IQuestionSave,
  IQuestionUpdate,
} from "../Interfaces/QuestionInterfaces";

const QUESTION_API_URL = `${BACKEND_SERVER_URL}/api/v1/question`;

export async function getCategories() {
  const response = await fetch(`${QUESTION_API_URL}/category`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function saveQuestion(questionSaveRequest: IQuestionSave) {
  const response = await fetch(`${QUESTION_API_URL}`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionSaveRequest),
  });
  if (response.status === 201) {
    return await response.json();
  } else {
    return null;
  }
}

export async function getIssues() {
  const response = await fetch(`${QUESTION_API_URL}/top5`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function getQuestionDetail(questionNo?: string) {
  const response = await fetch(`${QUESTION_API_URL}/${questionNo}`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function deleteQuestionDetail(questionNo?: string) {
  const response = await fetch(`${QUESTION_API_URL}/${questionNo}`, {
    credentials: "include",
    method: "delete",
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function updateQuestionDetail(
  questionNo?: string,
  questionUpdateData?: IQuestionUpdate
) {
  const response = await fetch(`${QUESTION_API_URL}/${questionNo}`, {
    method: "put",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionUpdateData),
  });
  if (response.status === 202) {
    return await response.json();
  } else {
    return null;
  }
}
