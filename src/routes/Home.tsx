import { useQuery } from "react-query";
import { fetchLoginUser } from "../apis/loginApi";
import {
  BackGround,
  Header,
  Footer,
  MainContainer,
  Section,
  LogoContainer,
  LoginBtnContainer,
  QuestionBlankContainer,
} from "../components/Containers";
import { LoginBtn, SearchBtn } from "../components/Buttons";
import { QuestionBlank } from "../components/StyledItems";

interface ILoginUser {
  userNo?: number;
  nickname?: string;
  email?: string;
  profileImgUrl?: string;
}
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
            <LoginBtn>
              <a href="http://localhost:8900/oauth2/authorization/google">
                로그인
              </a>
            </LoginBtn>
          </LoginBtnContainer>
        </Header>
        <Section>
          <LogoContainer>
            <img src="/blank_logo_temp.png" alt="logo" />
          </LogoContainer>
          <QuestionBlankContainer>
            <QuestionBlank>
              <div></div>
              <div></div>
              <SearchBtn></SearchBtn>
            </QuestionBlank>
          </QuestionBlankContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
        <div>{loginUser?.nickname}</div>
      </MainContainer>
    </BackGround>
  );
}

export default Home;
