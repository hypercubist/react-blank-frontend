import { BACKEND_SERVER_URL } from "../Constants";

const USER_API_URL = `${BACKEND_SERVER_URL}/api/v1/user`;

export async function fetchLoginUser() {
  const response = await fetch(`${USER_API_URL}`, {
    credentials: "include",
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function fetchUserProfile(userNo?: string) {
  const response = await fetch(`${USER_API_URL}/${userNo}`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function getQuestionTop3(userNo?: string) {
  const response = await fetch(`${USER_API_URL}/${userNo}/question/top3`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function getAnswerTop3(userNo?: string) {
  const response = await fetch(`${USER_API_URL}/${userNo}/answer/top3`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
