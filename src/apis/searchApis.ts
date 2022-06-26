import { BACKEND_SERVER_URL } from "../Constants";
import { ISearch } from "../Interfaces/SearchInterfaces";

const SEARCH_API_URL = `${BACKEND_SERVER_URL}/api/v1/search`;

export async function search(searchRequest: ISearch) {
  const response = await fetch(
    `${SEARCH_API_URL}/question?categoryValue=${searchRequest.categoryValue}&word=${searchRequest.word}`
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
