import { BACKEND_SERVER_URL } from "../Constants";

const QUESTION_API_URL = `${BACKEND_SERVER_URL}/api/v1/question`;

export async function getCategories() {
  const response = await fetch(`${QUESTION_API_URL}/category`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function saveQuestion() {
  const response = await fetch(`${QUESTION_API_URL}`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
