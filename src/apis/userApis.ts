const BLANK_SERVER_URL = "http://localhost:8900/api/v1";

export async function fetchLoginUser() {
  const response = await fetch(`${BLANK_SERVER_URL}/user`, {
    credentials: "include",
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

export async function fetchUserProfile(userId?: string) {
  const response = await fetch(`${BLANK_SERVER_URL}/user/${userId}`);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
