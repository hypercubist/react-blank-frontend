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

export async function fetchUserProfile(userId?: string) {
  const response = await fetch(`${USER_API_URL}/${userId}`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
