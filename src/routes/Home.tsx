import { useQuery } from "react-query";
import { fetchLoginUser } from "../apis/userApis";
import { getCategories, saveQuestion } from "../apis/questionApis";
import {
  BackGround,
  Header,
  Footer,
  MainContainer,
  Section,
  LogoContainer,
  LoginBtnContainer,
  QuestionBlankContainer,
  WelcomeUserContainer,
  CategorySelectorContainer,
  SearchLinkContainer,
} from "../components/Containers";
import { LoginBtn, QuestionBtn } from "../components/Buttons";
import {
  CategorySelector,
  QuestionBlank,
  QuestionBlankInput,
} from "../components/StyledItems";
import { Link } from "react-router-dom";
import { ILoginUser } from "../Interfaces/UserInterfaces";
import {
  IQuestionCategory,
  IQuestionSave,
} from "../Interfaces/QuestionInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { IResponse } from "../Interfaces/CommonInterfaces";

function Home() {
  const [questionSaveRequest, setQuestionSaveRequest] = useState<IQuestionSave>(
    {
      content: "",
      categoryValue: "NONE",
    }
  );
  const { data: loginUser } = useQuery<IResponse<ILoginUser>>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IResponse<IQuestionCategory[]>>(
    ["questionCategory"],
    getCategories
  );
  const clickQuestionBtn = async () => {
    const success = await saveQuestion(questionSaveRequest);
    if (success) {
      window.location.href = `/questions/${success?.data.no}`;
    } else {
      alert("질문 중 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };
  const clickCategoryBtn = (event: React.MouseEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id },
    } = event;
    setQuestionSaveRequest((prev) => ({
      content: prev.content,
      categoryValue: id,
    }));
  };
  const changeQuestionBlankInput = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setQuestionSaveRequest((prev) => ({
      content: value,
      categoryValue: prev.categoryValue,
    }));
  };
  return (
    <BackGround>
      <MainContainer>
        <Header>
          <SearchLinkContainer>
            <Link to="/questions">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span> 먼저 검색해보기</span>
            </Link>
          </SearchLinkContainer>
          <div></div>
          <LoginBtnContainer>
            {loginUser ? (
              <WelcomeUserContainer>
                <Link
                  to={{
                    pathname: `/user/${loginUser?.data?.no}`,
                  }}
                >
                  <div>반가워요!</div>
                  <div>{`${loginUser?.data?.nickname} 님`}</div>
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
          <LogoContainer>
            <Link
              to={{
                pathname: "/",
              }}
            >
              <img src="/images/blank_logo_temp.png" alt="logo" />
            </Link>
          </LogoContainer>
          <QuestionBlankContainer>
            <QuestionBlank>
              <QuestionBlankInput
                onChange={changeQuestionBlankInput}
                placeholder="지금 질문하기"
              />
              <QuestionBtn onClick={clickQuestionBtn}>
                <FontAwesomeIcon icon={faQuestion} />
              </QuestionBtn>
            </QuestionBlank>
          </QuestionBlankContainer>
          <CategorySelectorContainer>
            {categories?.data?.map((category) => {
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
        </Section>

        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Home;
