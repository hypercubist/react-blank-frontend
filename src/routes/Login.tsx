import { Link } from "react-router-dom";
import {
  BackGround,
  MainContainer,
  Header,
  LogoContainer,
  Section,
  Footer,
  LoginContainer,
} from "../components/Containers";
import { BACKEND_SERVER_URL } from "../Constants";

function Login() {
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
          <LoginContainer>
            <Link
              to={{
                pathname: `${BACKEND_SERVER_URL}/oauth2/authorization/google`,
              }}
            >
              <img src="/images/login_btn_google.png" alt="login_btn" />
            </Link>
            <h2>SNS 계정으로 1초 만에 로그인하기</h2>
          </LoginContainer>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Login;
