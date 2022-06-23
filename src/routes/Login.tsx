import { Link } from "react-router-dom";
import {
  BackGround,
  MainContainer,
  Header,
  LogoContainer,
  Section,
  Footer,
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
          <h1>Login Page</h1>
          <a href={`${BACKEND_SERVER_URL}/oauth2/authorization/google`}>
            로그인
          </a>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Login;
