import {
  faFloppyDisk,
  faMinus,
  faPen,
  faSortDown,
  faSortUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  deleteAnswer,
  getAnswersByQuestionNo,
  saveAnswer,
  updateAnswer,
} from "../apis/answerApis";
import {
  deleteQuestionDetail,
  getCategories,
  getQuestionDetail,
  updateQuestionDetail,
} from "../apis/questionApis";
import { fetchLoginUser } from "../apis/userApis";
import {
  LoadAfterBtn,
  LoadBeforeBtn,
  LoginBtn,
  OpenAnswerSaveFormBtn,
  QuestionDetailDeleteBtn,
  QuestionDetailEditBtn,
} from "../components/Buttons";
import {
  AnswerButtonsContainer,
  AnswerContainer,
  AnswerInfoContainer,
  BackGround,
  CategorySelectorContainer,
  Footer,
  Header,
  LoadMoreContainer,
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
  AnswerContent,
  AnswerContentInput,
  AnswerWriter,
  CategorySelector,
  QuestionDetailCategory,
  QuestionDetailContentInput,
  QuestionDetailViews,
  QuestionDetailWriter,
} from "../components/StyledItems";
import {
  IAnswer,
  IAnswerSlice,
  IAnswerUpdate,
} from "../Interfaces/AnswerInterfaces";
import { IResponse } from "../Interfaces/CommonInterfaces";
import {
  IQuestion,
  IQuestionCategory,
  IQuestionUpdate,
} from "../Interfaces/QuestionInterfaces";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function QuestionDetail() {
  const { questionNo } = useParams<string>();
  const [toUpdateAnswerNo, setToUpdateAnswerNo] = useState<number>();
  const [paging, setPaging] = useState({ page: 0, size: 3 });
  const [editIcon, setEditIcon] = useState(faPen);
  const [questionInputBorder, setQuestionInputBorder] = useState(false);
  const [questionInputReadOnly, setQuestionInputReadOnly] = useState(true);
  const [questionUpdateData, setQuestionUpdateData] =
    useState<IQuestionUpdate>();
  const [showCategories, setShowCategories] = useState(false);
  const [showAnswerSaveForm, setShowAnswerSaveForm] = useState(false);
  const [showOpenAnswerSaveFormBtn, setShowOpenAnswerSaveFormBtn] =
    useState(true);
  const [showAnswerEditForm, setShowAnswerEditForm] = useState(false);
  const [answerSaveRequestData, setAnswerSaveRequestData] = useState({
    questionNo,
    content: "",
  });
  const [answerUpdateRequestData, setAnswerUpdateRequestData] =
    useState<IAnswerUpdate>({
      questionNo,
      content: "",
    });
  const { data: loginUser } = useQuery<IResponse<ILoginUser>>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: categories } = useQuery<IResponse<IQuestionCategory[]>>(
    ["questionCategory"],
    getCategories
  );
  const { data: questionDetail } = useQuery<IResponse<IQuestion>>(
    ["questionDetail", questionNo],
    () => getQuestionDetail(questionNo)
  );

  const { data: answerSlice } = useQuery<IResponse<IAnswerSlice>>(
    ["answerSlice", questionNo, paging],
    () => getAnswersByQuestionNo(paging, questionNo)
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
  const clickQuestionDeleteBtn = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const success = await deleteQuestionDetail(questionNo);
      if (success) {
        alert("삭제되었습니다.");
        window.location.href = "/";
      } else {
        alert("삭제 중 오류가 발생하였습니다. 다시 시도해주세요.");
      }
    }
  };
  const clickQuestionEditBtn = async () => {
    setQuestionUpdateData({
      categoryValue: categories?.data?.filter(
        (category) => category.korValue === questionDetail?.data?.categoryValue
      )[0].engValue,
      content: questionDetail?.data?.content,
    });
    setEditIcon((prev) => (prev === faPen ? faFloppyDisk : faPen));
    setQuestionInputBorder((prev) => !prev);
    setQuestionInputReadOnly((prev) => !prev);
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
  const clickOpenAnswerSaveFormBtn = () => {
    setShowOpenAnswerSaveFormBtn(false);
    setShowAnswerSaveForm(true);
    setAnswerUpdateRequestData((prev) => ({
      questionNo: prev?.questionNo,
      content: "",
    }));
    setShowAnswerEditForm(false);
  };
  const clickAnswerSaveBtn = async () => {
    if (answerSaveRequestData.content === "") {
      alert("답변이 작성되지 않았습니다.");
    } else {
      const success = await saveAnswer(answerSaveRequestData);
      if (success) {
        setShowOpenAnswerSaveFormBtn(true);
        setShowAnswerSaveForm(false);
        setAnswerSaveRequestData((prev) => ({
          questionNo: prev.questionNo,
          content: "",
        }));
        alert("답변이 저장되었습니다.");
      } else {
        alert("오류가 발생하여 답변이 저장되지 않았습니다. 다시 시도해주세요.");
      }
    }
  };
  const clickAnswerUpdateBtn = async () => {
    if (answerUpdateRequestData.content === "") {
      alert("답변이 작성되지 않았습니다.");
    } else {
      const success = await updateAnswer(
        toUpdateAnswerNo,
        answerUpdateRequestData
      );
      if (success) {
        setShowAnswerEditForm(false);
        setAnswerUpdateRequestData((prev) => ({
          questionNo: prev.questionNo,
          content: "",
        }));
        setToUpdateAnswerNo(0);
        alert("답변이 저장되었습니다.");
      } else {
        alert("오류가 발생하여 답변이 저장되지 않았습니다. 다시 시도해주세요.");
      }
    }
  };
  const clickAnswerDeleteBtn = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const success = await deleteAnswer(toUpdateAnswerNo);
      if (success) {
        setShowAnswerEditForm(false);
        setAnswerUpdateRequestData((prev) => ({
          questionNo: prev.questionNo,
          content: "",
        }));
        setToUpdateAnswerNo(0);
        alert("삭제되었습니다.");
      } else {
        alert("삭제 중 오류가 발생하였습니다. 다시 시도해주세요.");
      }
    }
  };
  const clickCloseAnswerSaveFormBtn = () => {
    setShowOpenAnswerSaveFormBtn(true);
    setShowAnswerSaveForm(false);
    setAnswerSaveRequestData((prev) => ({
      questionNo: prev.questionNo,
      content: "",
    }));
  };
  const clickCloseAnswerEditFormBtn = () => {
    setShowAnswerEditForm(false);
    setAnswerUpdateRequestData((prev) => ({
      questionNo: prev.questionNo,
      content: "",
    }));
    setToUpdateAnswerNo(0);
  };
  const clickOpenAnswerEditFormBtn = (answer: IAnswer) => {
    setAnswerUpdateRequestData((prev) => ({
      questionNo: prev?.questionNo,
      content: answer?.content,
    }));
    setToUpdateAnswerNo(answer.no);
    setShowAnswerEditForm(true);
    setShowOpenAnswerSaveFormBtn(true);
    setShowAnswerSaveForm(false);
    setAnswerSaveRequestData((prev) => ({
      questionNo: prev.questionNo,
      content: "",
    }));
  };
  const clickLoadAfterBtn = () => {
    setPaging((prev) => ({ page: prev.page + 1, size: prev.size }));
  };
  const clickLoadBeforeBtn = () => {
    setPaging((prev) => ({ page: prev.page - 1, size: prev.size }));
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
  const changeAnswerSaveInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setAnswerSaveRequestData((prev) => ({
      questionNo: prev.questionNo,
      content: value,
    }));
  };
  const changeAnswerEditInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setAnswerUpdateRequestData((prev) => ({
      questionNo: prev.questionNo,
      content: value,
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
          <QuestionDetailContainer>
            <QuestionDetailInfoContainer>
              <QuestionDetailCategory>
                {questionDetail?.data?.categoryValue}
              </QuestionDetailCategory>
              <QuestionDetailViews>{`${questionDetail?.data?.views} views`}</QuestionDetailViews>
            </QuestionDetailInfoContainer>
            {showCategories ? (
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
            ) : null}
            <QuestionDetailContentInput
              border={questionInputBorder}
              defaultValue={questionDetail?.data?.content}
              onChange={changeQuestionDetailContentInput}
              readOnly={questionInputReadOnly}
            />

            <QuestionDetailInfoContainer>
              <Link to={`/user/${questionDetail?.data?.writerNo}`}>
                <QuestionDetailWriter>
                  {questionDetail?.data?.writer}
                </QuestionDetailWriter>
              </Link>
              {loginUser ? (
                loginUser.data.no === questionDetail?.data?.writerNo ? (
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
                    {showOpenAnswerSaveFormBtn ? (
                      <OpenAnswerSaveFormBtn
                        onClick={clickOpenAnswerSaveFormBtn}
                      >
                        답변하기
                      </OpenAnswerSaveFormBtn>
                    ) : null}
                  </QuestionDetailButtonsContainer>
                )
              ) : null}
            </QuestionDetailInfoContainer>
          </QuestionDetailContainer>
          {showAnswerSaveForm ? (
            <AnswerContainer>
              <AnswerInfoContainer onClick={clickCloseAnswerSaveFormBtn}>
                <FontAwesomeIcon icon={faMinus} />
              </AnswerInfoContainer>
              <AnswerContentInput
                placeholder="답변을 여기 적어주세요."
                onChange={changeAnswerSaveInput}
              />
              <AnswerInfoContainer>
                <AnswerWriter>{loginUser?.data.nickname}</AnswerWriter>
                <AnswerButtonsContainer onClick={clickAnswerSaveBtn}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </AnswerButtonsContainer>
              </AnswerInfoContainer>
            </AnswerContainer>
          ) : null}
          {showAnswerEditForm ? (
            <AnswerContainer>
              <AnswerInfoContainer onClick={clickCloseAnswerEditFormBtn}>
                <FontAwesomeIcon icon={faMinus} />
              </AnswerInfoContainer>
              <AnswerContentInput
                placeholder="변경하실 답변을 여기 적어주세요."
                value={answerUpdateRequestData.content}
                onChange={changeAnswerEditInput}
              />
              <AnswerInfoContainer>
                <AnswerWriter>{loginUser?.data.nickname}</AnswerWriter>
                <AnswerButtonsContainer>
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    onClick={clickAnswerUpdateBtn}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={clickAnswerDeleteBtn}
                  />
                </AnswerButtonsContainer>
              </AnswerInfoContainer>
            </AnswerContainer>
          ) : null}
          {answerSlice?.data?.answers?.map((answer) => {
            return (
              <AnswerContainer key={answer?.no}>
                <AnswerContent>{answer?.content}</AnswerContent>
                <AnswerInfoContainer>
                  <AnswerWriter>{answer?.writer}</AnswerWriter>
                  <AnswerButtonsContainer
                    onClick={() => clickOpenAnswerEditFormBtn(answer)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </AnswerButtonsContainer>
                </AnswerInfoContainer>
              </AnswerContainer>
            );
          })}
          <LoadMoreContainer>
            {paging.page > 0 ? (
              <LoadBeforeBtn onClick={clickLoadBeforeBtn}>
                <FontAwesomeIcon icon={faSortUp} />
              </LoadBeforeBtn>
            ) : null}
            {answerSlice?.data?.hasNext ? (
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

export default QuestionDetail;
