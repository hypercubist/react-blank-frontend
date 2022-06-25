import styled from "styled-components";

export const BackGround = styled.div`
  width: 100%;
  background-color: wheat;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 30px;
  width: 640px;
  height: 800px;
  padding: 30px 20px;
  margin: 20px;
  border-radius: 10px;
  background-color: white;
`;

export const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border-radius: 30px;
  box-shadow: 0 3px 5px 3px whitesmoke;
`;

export const CategorySelectorContainer = styled.div`
  width: 450px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const WelcomeUserContainer = styled.div`
  padding: 10px;
  font-weight: 600;
  color: gray;
`;

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  padding: 30px 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 5px whitesmoke;
  margin-top: 20px;
`;

export const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
`;

export const ProfileQnAContainer = styled.div`
  width: 100%;
  padding: 30px 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 5px whitesmoke;
  margin-top: 20px;
`;

export const SearchLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 0.9rem;
`;
