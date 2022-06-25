import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCategories, getIssues } from "../apis/questionApis";
import { search } from "../apis/searchApis";
import { fetchLoginUser } from "../apis/userApis";
import { LoginBtn, SeacrhBtn } from "../components/Buttons";
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
} from "../components/Containers";
import {
  CategorySelector,
  QuestionList,
  QuestionListCategory,
  QuestionListContent,
  QuestionListInfo,
  QuestionListViews,
  SearchBlank,
  SearchBlankInput,
} from "../components/StyledItems";
import { IQuestion, IQuestionCategory } from "../Interfaces/QuestionInterfaces";
import { ISearchRequest } from "../Interfaces/SearchInterfaces";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function Questions() {
  const [searchRequest, setSearchRequest] = useState<ISearchRequest>({
    categoryValue: "NONE",
    word: "",
  });
  const [searchResult, setSearchResult] = useState<IQuestion[]>();
  const [isSearching, setIsSearching] = useState(false);
  const { data: loginUser } = useQuery<ILoginUser>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IQuestionCategory[]>(
    ["questionCategory"],
    getCategories
  );
  const { data: issues } = useQuery<IQuestion[]>(["questionIssues"], getIssues);
  const changeSearchBlankInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchRequest((prev) => ({
      categoryValue: prev.categoryValue,
      word: value,
    }));
  };
  const clickCategoryBtn = (event: React.MouseEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id },
    } = event;
    setSearchRequest((prev) => ({ categoryValue: id, word: prev.word }));
  };
  const clickSearchBtn = async () => {
    const searchResponse = await search(searchRequest);
    setIsSearching(true);
    setSearchResult(searchResponse);
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
            {loginUser ? (
              <WelcomeUserContainer>
                <Link
                  to={{
                    pathname: `/user/${loginUser.no}`,
                  }}
                >
                  <div>반가워요!</div>
                  <div>{`${loginUser.nickname} 님`}</div>
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
            {categories?.map((category) => {
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
            {(isSearching ? searchResult : issues)?.map((question) => (
              <Link to={`${question.no}`} key={question.no}>
                <QuestionList>
                  <div>
                    <QuestionListInfo>
                      <QuestionListCategory>
                        {question.categoryValue}
                      </QuestionListCategory>
                      <div>{question.writer}</div>
                    </QuestionListInfo>
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
            ))}
          </QuestionListContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Questions;
