import {
  faMagnifyingGlass,
  faEye,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCategories, getIssues } from "../apis/questionApis";
import { search } from "../apis/searchApis";
import { fetchLoginUser } from "../apis/userApis";
import {
  LoadAfterBtn,
  LoadBeforeBtn,
  LoginBtn,
  SeacrhBtn,
} from "../components/Buttons";
import {
  BackGround,
  MainContainer,
  Header,
  LogoContainer,
  Section,
  Footer,
  LoginBtnContainer,
  WelcomeUserContainer,
  SearchBlankContainer,
  CategorySelectorContainer,
  QuestionListContainer,
  QuestionListInfoContainer,
  LoadMoreContainer,
} from "../components/Containers";
import {
  CategorySelector,
  QuestionList,
  QuestionListCategory,
  QuestionListContent,
  QuestionListViews,
  SearchBlank,
  SearchBlankInput,
} from "../components/StyledItems";
import { IResponse } from "../Interfaces/CommonInterfaces";
import {
  IQuestion,
  IQuestionCategory,
  IQuestionSlice,
} from "../Interfaces/QuestionInterfaces";
import { ISearch } from "../Interfaces/SearchInterfaces";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function Questions() {
  const [searchRequestData, setSearchRequestData] = useState<ISearch>({
    categoryValue: "NONE",
    word: "",
  });
  const [searchSlice, setSearchSlice] = useState<IResponse<IQuestionSlice>>();
  const [isSearching, setIsSearching] = useState(false);
  const [paging, setPaging] = useState({ page: 0, size: 5 });
  const { data: loginUser } = useQuery<IResponse<ILoginUser>>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IResponse<IQuestionCategory[]>>(
    ["questionCategory"],
    getCategories
  );
  const { data: issues } = useQuery<IResponse<IQuestion[]>>(
    ["questionIssues"],
    getIssues
  );
  const changeSearchBlankInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchRequestData((prev) => ({
      categoryValue: prev.categoryValue,
      word: value,
    }));
  };
  const clickCategoryBtn = (event: React.MouseEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id },
    } = event;
    setSearchRequestData((prev) => ({ categoryValue: id, word: prev.word }));
  };
  const clickSearchBtn = async () => {
    setPaging((prev) => ({ page: 0, size: prev.size }));
    const success = await search(paging, searchRequestData);
    if (success) {
      setIsSearching(true);
      setSearchSlice(success);
    } else {
      alert("검색 중 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };
  const clickLoadAfterBtn = () => {
    setPaging((prev) => ({ page: prev.page + 1, size: prev.size }));
  };
  const clickLoadBeforeBtn = () => {
    setPaging((prev) => ({ page: prev.page - 1, size: prev.size }));
  };
  return (
    <BackGround>
      <MainContainer>
        <Header>
          <div></div>
          <LogoContainer>
            <Link
              to={{
                pathname: "/",
              }}
            >
              <img src="/images/blank_logo_temp.png" alt="logo" />
            </Link>
          </LogoContainer>
          <LoginBtnContainer>
            {loginUser?.data ? (
              <WelcomeUserContainer>
                <Link
                  to={{
                    pathname: `/user/${loginUser.data.no}`,
                  }}
                >
                  <div>반가워요!</div>
                  <div>{`${loginUser.data.nickname} 님`}</div>
                </Link>
              </WelcomeUserContainer>
            ) : (
              <LoginBtn>
                <Link
                  to={{
                    pathname: "/login",
                  }}
                >
                  로그인
                </Link>
              </LoginBtn>
            )}
          </LoginBtnContainer>
        </Header>
        <Section>
          <SearchBlankContainer>
            <SearchBlank>
              <SearchBlankInput
                onChange={changeSearchBlankInput}
                placeholder="지금 검색하기"
              />
              <SeacrhBtn onClick={clickSearchBtn}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </SeacrhBtn>
            </SearchBlank>
          </SearchBlankContainer>
          <CategorySelectorContainer>
            {categories?.data.map((category) => {
              return (
                <CategorySelector
                  key={category.engValue}
                  onClick={clickCategoryBtn}
                  value={category.korValue}
                  id={category.engValue}
                  width={category.korValue?.length || 0}
                  readOnly
                ></CategorySelector>
              );
            })}
          </CategorySelectorContainer>
          <QuestionListContainer>
            {(isSearching ? searchSlice?.data?.questions : issues?.data)?.map(
              (question) => (
                <Link to={`${question.no}`} key={question.no}>
                  <QuestionList>
                    <div>
                      <QuestionListInfoContainer>
                        <QuestionListCategory>
                          {question.categoryValue}
                        </QuestionListCategory>
                        <div>{question.writer}</div>
                      </QuestionListInfoContainer>
                      <QuestionListContent>
                        {(question.content?.length || 0) <= 70
                          ? question.content
                          : `${question.content?.slice(0, 70)}...`}
                      </QuestionListContent>
                    </div>
                    <QuestionListViews>
                      <FontAwesomeIcon icon={faEye} />
                      <div>{question.views}</div>
                    </QuestionListViews>
                  </QuestionList>
                </Link>
              )
            )}
          </QuestionListContainer>
          <LoadMoreContainer>
            {paging.page > 0 ? (
              <LoadBeforeBtn onClick={clickLoadBeforeBtn}>
                <FontAwesomeIcon icon={faSortUp} />
              </LoadBeforeBtn>
            ) : null}
            {searchSlice?.data?.hasNext ? (
              <LoadAfterBtn onClick={clickLoadAfterBtn}>
                <FontAwesomeIcon icon={faSortDown} />
              </LoadAfterBtn>
            ) : null}
          </LoadMoreContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Questions;
