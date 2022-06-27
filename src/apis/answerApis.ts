import { BACKEND_SERVER_URL } from "../Constants";
import { IAnswerSave, IAnswerUpdate } from "../Interfaces/AnswerInterfaces";
import { IPaging } from "../Interfaces/CommonInterfaces";

const ANSWER_API_URL = `${BACKEND_SERVER_URL}/api/v1/answer`;

const pagingRequestUrl = (paging: IPaging) => {
  return `page=${paging.page}&size=${paging.size}`;
};

export async function saveAnswer(answerSaveRequest: IAnswerSave) {
  const response = await fetch(`${ANSWER_API_URL}`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answerSaveRequest),
  });
  if (response.status === 201) {
    return await response.json();
  } else {
    return null;
  }
}

export async function getAnswersByQuestionNo(
  paging: IPaging,
  questionNo?: string
) {
  const response = await fetch(
    `${ANSWER_API_URL}?questionNo=${questionNo}&${pagingRequestUrl(paging)}`
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function updateAnswer(
  answerNo?: number,
  answerUpdateData?: IAnswerUpdate
) {
  const response = await fetch(`${ANSWER_API_URL}/${answerNo}`, {
    method: "put",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answerUpdateData),
  });
  if (response.status === 202) {
    return await response.json();
  } else {
    return null;
  }
}
