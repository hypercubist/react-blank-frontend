import { BACKEND_SERVER_URL } from "../Constants";
import { IPaging } from "../Interfaces/CommonInterfaces";
import { ISearch } from "../Interfaces/SearchInterfaces";

const SEARCH_API_URL = `${BACKEND_SERVER_URL}/api/v1/search`;

const pagingRequestUrl = (paging: IPaging) => {
  return `page=${paging.page}&size=${paging.size}`;
};

export async function search(paging: IPaging, searchRequest: ISearch) {
  const response = await fetch(
    `${SEARCH_API_URL}/question?categoryValue=${
      searchRequest.categoryValue
    }&word=${searchRequest.word}&${pagingRequestUrl(paging)}`
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
