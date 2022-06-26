import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchLoginUser,
  fetchUserProfile,
  getAnswerTop3,
  getQuestionTop3,
  udpateProfile,
} from "../apis/userApis";
import {
  BackGround,
  MainContainer,
  Header,
  Section,
  Footer,
  LogoContainer,
  ProfileContainer,
  ProfileImgContainer,
  ProfileInfoContainer,
  ProfileQnAContainer,
} from "../components/Containers";
import {
  Loading,
  ProfileImage,
  ProfileInfo,
  ProfileInfoInput,
  ProfileQnA,
  ProfileQnATitle,
} from "../components/StyledItems";
import { ILoginUser, IUserInfoUpdate } from "../Interfaces/UserInterfaces";
import { IQuestion } from "../Interfaces/QuestionInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { ProfileEditBtn } from "../components/Buttons";

function Profile() {
  const { userNo } = useParams<string>();
  const [readOnly, setReadOnly] = useState(true);
  const [icon, setIcon] = useState(faPenToSquare);
  const [border, setBorder] = useState(false);
  const [userInfoUpdateData, setUserInfoUpdateData] =
    useState<IUserInfoUpdate>();
  const { data: loginUser } = useQuery<ILoginUser>(
    ["loginUser"],
    fetchLoginUser
  );
  const { data: profile } = useQuery<ILoginUser>(["profile", userNo], () =>
    fetchUserProfile(userNo)
  );
  const { isLoading: isQuestionTop3Loading, data: questionTop3 } = useQuery<
    IQuestion[]
  >(["profileQuestionTop3", userNo], () => getQuestionTop3(userNo));
  const { isLoading: isAnswerTop3Loading, data: answerTop3 } = useQuery<
    IQuestion[]
  >(["profileAnswerTop3", userNo], () => getAnswerTop3(userNo));
  const clickEditBtn = async () => {
    setUserInfoUpdateData({ nickname: profile?.nickname });
    setIcon((prev) => (prev === faPenToSquare ? faFloppyDisk : faPenToSquare));
    setReadOnly((prev) => !prev);
    setBorder((prev) => !prev);
    if (icon === faFloppyDisk) {
      const success = await udpateProfile(userNo, userInfoUpdateData);
      if (success) {
        alert("변경하신 내용이 저장되었습니다.");
      } else {
        alert(
          "오류가 발생하여 변경 내용이 저장되지 않았습니다. 다시 시도해주세요"
        );
      }
    }
  };
  const changeNicknameInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUserInfoUpdateData((prev) => ({
      nickname: value,
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
          <div></div>
        </Header>
        <Section>
          <ProfileContainer>
            <ProfileImgContainer>
              <ProfileImage src={profile?.profileImgUrl} />
            </ProfileImgContainer>
            <ProfileInfoContainer>
              <ProfileInfo>
                <div>닉네임</div>
                <ProfileInfoInput
                  border={border}
                  defaultValue={profile?.nickname}
                  onChange={changeNicknameInput}
                  readOnly={readOnly}
                />
              </ProfileInfo>
              <ProfileInfo>
                <div>이메일</div>
                <ProfileInfoInput
                  defaultValue={profile?.email}
                  border={false}
                  readOnly
                />
              </ProfileInfo>
              {loginUser ? (
                loginUser.no === profile?.no ? (
                  <ProfileEditBtn>
                    <FontAwesomeIcon icon={icon} onClick={clickEditBtn} />
                  </ProfileEditBtn>
                ) : null
              ) : null}
            </ProfileInfoContainer>
          </ProfileContainer>
          <ProfileQnAContainer>
            <ProfileQnATitle>{profile?.nickname}님의 최근 질문</ProfileQnATitle>
            {isQuestionTop3Loading ? (
              <Loading>Loading...</Loading>
            ) : (
              questionTop3?.map((question) => (
                <ProfileQnA key={question.no}>{question.content}</ProfileQnA>
              ))
            )}
          </ProfileQnAContainer>
          <ProfileQnAContainer>
            <ProfileQnATitle>{profile?.nickname}님의 최근 답변</ProfileQnATitle>
            {isAnswerTop3Loading ? (
              <Loading>Loading...</Loading>
            ) : (
              answerTop3?.map((answer) => (
                <ProfileQnA key={answer.no}>{answer.content}</ProfileQnA>
              ))
            )}
          </ProfileQnAContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Profile;
