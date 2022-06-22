import styled from "styled-components";

export const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  background-color: wheat;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 30px;
  width: 640px;
  height: 1000px;
  padding: 30px 20px;
  margin: 20px;
  border-radius: 10px;
  background-color: white;
`;

export const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Footer = styled.footer`
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 100px;
  }
`;

export const LoginBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuestionBlankContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
