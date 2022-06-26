import {
  faFloppyDisk,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  deleteQuestionDetail,
  getCategories,
  getQuestionDetail,
  updateQuestionDetail,
} from "../apis/questionApis";
import { fetchLoginUser } from "../apis/userApis";
import {
  LoginBtn,
  QuestionDetailAnswerBtn,
  QuestionDetailDeleteBtn,
  QuestionDetailEditBtn,
} from "../components/Buttons";
import {
  BackGround,
  CategorySelectorContainer,
  Footer,
  Header,
  LoginBtnContainer,
  LogoContainer,
  MainContainer,
  QuestionDetailButtonsContainer,
  QuestionDetailContainer,
  QuestionDetailInfoContainer,
  Section,
  WelcomeUserContainer,
} from "../components/Containers";
import {
  CategorySelector,
  QuestionDetailCategory,
  QuestionDetailContentInput,
  QuestionDetailViews,
  QuestionDetailWriter,
} from "../components/StyledItems";
import {
  IQuestion,
  IQuestionCategory,
  IQuestionUpdate,
} from "../Interfaces/QuestionInterfaces";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function QuestionDetail() {
  const [editIcon, setEditIcon] = useState(faPen);
  const [border, setBorder] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [questionUpdateData, setQuestionUpdateData] =
    useState<IQuestionUpdate>();
  const [showCategories, setShowCategories] = useState(false);
  const { questionNo } = useParams<string>();
  const { data: loginUser } = useQuery<ILoginUser>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IQuestionCategory[]>(
    ["questionCategory"],
    getCategories
  );
  const { data: questionDetail } = useQuery<IQuestion>(["questionDetail"], () =>
    getQuestionDetail(questionNo)
  );
  const clickCategoryBtn = (event: React.MouseEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id },
    } = event;
    setQuestionUpdateData((prev) => ({
      categoryValue: id,
      content: prev?.content,
    }));
  };
  const clickQuestionDeleteBtn = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteQuestionDetail(questionNo);
      alert("삭제되었습니다.");
      window.location.href = "/";
    }
  };
  const clickQuestionEditBtn = async () => {
    setQuestionUpdateData({
      categoryValue: categories?.filter(
        (category) => category.korValue === questionDetail?.categoryValue
      )[0].engValue,
      content: questionDetail?.content,
    });
    setEditIcon((prev) => (prev === faPen ? faFloppyDisk : faPen));
    setBorder((prev) => !prev);
    setReadOnly((prev) => !prev);
    setShowCategories((prev) => !prev);
    if (editIcon === faFloppyDisk) {
      const success = await updateQuestionDetail(
        questionNo,
        questionUpdateData
      );
      if (success) {
        alert("변경하신 내용이 저장되었습니다.");
      } else {
        alert(
          "오류가 발생하여 변경 내용이 저장되지 않았습니다. 다시 시도해주세요"
        );
      }
    }
  };
  const changeQuestionDetailContentInput = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const {
      currentTarget: { value },
    } = event;
    setQuestionUpdateData((prev) => ({
      content: value,
      categoryValue: prev?.categoryValue,
    }));
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
          <QuestionDetailContainer>
            <QuestionDetailInfoContainer>
              <QuestionDetailCategory>
                {questionDetail?.categoryValue}
              </QuestionDetailCategory>
              <QuestionDetailViews>{`${questionDetail?.views} views`}</QuestionDetailViews>
            </QuestionDetailInfoContainer>
            {showCategories ? (
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
            ) : null}
            <QuestionDetailContentInput
              border={border}
              defaultValue={questionDetail?.content}
              onChange={changeQuestionDetailContentInput}
              readOnly={readOnly}
            />

            <QuestionDetailInfoContainer>
              <Link to={`/user/${questionDetail?.writerNo}`}>
                <QuestionDetailWriter>
                  {questionDetail?.writer}
                </QuestionDetailWriter>
              </Link>
              {loginUser ? (
                loginUser.no === questionDetail?.writerNo ? (
                  <QuestionDetailButtonsContainer>
                    <QuestionDetailEditBtn onClick={clickQuestionEditBtn}>
                      <FontAwesomeIcon icon={editIcon} />
                    </QuestionDetailEditBtn>
                    <QuestionDetailDeleteBtn onClick={clickQuestionDeleteBtn}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </QuestionDetailDeleteBtn>
                  </QuestionDetailButtonsContainer>
                ) : (
                  <QuestionDetailButtonsContainer>
                    <QuestionDetailAnswerBtn>답변하기</QuestionDetailAnswerBtn>
                  </QuestionDetailButtonsContainer>
                )
              ) : null}
            </QuestionDetailInfoContainer>
          </QuestionDetailContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default QuestionDetail;
