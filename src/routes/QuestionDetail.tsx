import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchLoginUser } from "../apis/userApis";
import {
  LoginBtn,
  QuestionDetailDeleteBtn,
  QuestionDetailEditBtn,
} from "../components/Buttons";
import {
  BackGround,
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
  QuestionDetailCategory,
  QuestionDetailContent,
  QuestionDetailViews,
  QuestionDetailWriter,
  QuestionListContent,
} from "../components/StyledItems";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function QuestionDetail() {
  const { data: loginUser } = useQuery<ILoginUser>(
    ["loginUser"],
    fetchLoginUser
  );
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
              <QuestionDetailCategory>여행</QuestionDetailCategory>
              <QuestionDetailViews>3212 views</QuestionDetailViews>
              <QuestionDetailWriter>DH KIM</QuestionDetailWriter>
            </QuestionDetailInfoContainer>
            <QuestionDetailContent>하와이 맛집</QuestionDetailContent>
            <QuestionDetailButtonsContainer>
              <QuestionDetailEditBtn>수정</QuestionDetailEditBtn>
              <QuestionDetailDeleteBtn>삭제</QuestionDetailDeleteBtn>
            </QuestionDetailButtonsContainer>
          </QuestionDetailContainer>
        </Section>
        <Footer></Footer>
      </MainContainer>
    </BackGround>
  );
}

export default QuestionDetail;
