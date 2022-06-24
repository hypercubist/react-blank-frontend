import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchLoginUser,
  fetchUserProfile,
  getAnswerTop3,
  getQuestionTop3,
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
  ProfileImage,
  ProfileInfo,
  ProfileQnA,
  ProfileQnATitle,
} from "../components/StyledItems";
import { ILoginUser } from "../Interfaces/UserInterfaces";
import { IQuestion } from "../Interfaces/QuestionInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { userNo } = useParams<string>();
  const { isLoading: isLoginUserLoading, data: loginUser } =
    useQuery<ILoginUser>(["loginUser"], fetchLoginUser);
  const { isLoading: isProfileLoading, data: profile } = useQuery<ILoginUser>(
    ["profile", userNo],
    () => fetchUserProfile(userNo)
  );
  const { isLoading: isQuestionTop3Loading, data: questionTop3 } = useQuery<
    IQuestion[]
  >(["profileQuestionTop3", userNo], () => getQuestionTop3(userNo));
  const { isLoading: isAnswerTop3Loading, data: answerTop3 } = useQuery<
    IQuestion[]
  >(["profileAnswerTop3", userNo], () => getAnswerTop3(userNo));

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
                <div>{profile?.nickname}</div>
              </ProfileInfo>
              <ProfileInfo>
                <div>이메일</div>
                <div>{profile?.email}</div>
              </ProfileInfo>
              <ProfileInfo>
                <FontAwesomeIcon icon={faPenToSquare} />
              </ProfileInfo>
            </ProfileInfoContainer>
          </ProfileContainer>
          <ProfileQnAContainer>
            <ProfileQnATitle>{profile?.nickname}님의 최근 질문</ProfileQnATitle>
            {questionTop3?.map((question) => (
              <ProfileQnA key={question.no}>{question.content}</ProfileQnA>
            ))}
          </ProfileQnAContainer>
          <ProfileQnAContainer>
            <ProfileQnATitle>{profile?.nickname}님의 최근 답변</ProfileQnATitle>
            {answerTop3?.map((answer) => (
              <ProfileQnA key={answer.no}>{answer.content}</ProfileQnA>
            ))}
          </ProfileQnAContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Profile;
