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
  IQuestionSaveRequest,
} from "../Interfaces/QuestionInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Home() {
  const { data: loginUser } = useQuery<ILoginUser>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IQuestionCategory[]>(
    ["questionCategory"],
    getCategories
  );
  const [questionSaveRequest, setQuestionSaveRequest] =
    useState<IQuestionSaveRequest>({
      content: "",
      categoryValue: "NONE",
    });
  const clickQuestionBtn = async () => {
    await saveQuestion(questionSaveRequest);
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
        </Section>

        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Home;
