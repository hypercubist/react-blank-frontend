import { useQuery } from "react-query";
import { fetchLoginUser } from "../apis/userApis";
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
} from "../components/Containers";
import { LoginBtn, QuestionBtn } from "../components/Buttons";
import { QuestionBlank } from "../components/StyledItems";
import { BACKEND_SERVER_URL } from "../Constants";
import { Link } from "react-router-dom";
import { ILoginUser } from "../Interfaces/UserInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { isLoading: isLoginUserLoading, data: loginUser } =
    useQuery<ILoginUser>(["loginUser"], fetchLoginUser);
  return (
    <BackGround>
      <MainContainer>
        <Header>
          <div></div>
          <div></div>
          <LoginBtnContainer>
            {loginUser ? (
              <WelcomeUserContainer>
                <Link
                  to={{
                    pathname: `/user/${loginUser.userNo}`,
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
              <input type="text" />
              <QuestionBtn>
                <FontAwesomeIcon icon={faQuestion} />
              </QuestionBtn>
            </QuestionBlank>
          </QuestionBlankContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Home;
