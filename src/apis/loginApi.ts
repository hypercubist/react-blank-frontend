const BLANK_SERVER_URL = "http://localhost:8900/api/v1";

export async function fetchLoginUser() {
  const response = await fetch(`${BLANK_SERVER_URL}/user`);
  console.log(response);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
