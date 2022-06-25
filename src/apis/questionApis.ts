import { BACKEND_SERVER_URL } from "../Constants";
import { IQuestionSaveRequest } from "../Interfaces/QuestionInterfaces";

const QUESTION_API_URL = `${BACKEND_SERVER_URL}/api/v1/question`;

export async function getCategories() {
  const response = await fetch(`${QUESTION_API_URL}/category`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function saveQuestion(questionSaveRequest: IQuestionSaveRequest) {
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
