import { Link } from "react-router-dom";
import {
  BackGround,
  MainContainer,
  Header,
  LogoContainer,
  Section,
  Footer,
} from "../components/Containers";

function Questions() {
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
          <h1>Questions Page</h1>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Questions;
