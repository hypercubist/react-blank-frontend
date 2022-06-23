import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchLoginUser, fetchUserProfile } from "../apis/userApis";
import {
  BackGround,
  MainContainer,
  Header,
  Section,
  Footer,
  LogoContainer,
} from "../components/Containers";
import { ILoginUser } from "../Interfaces/UserInterfaces";

function Profile() {
  const { userId } = useParams<string>();
  const { isLoading: isLoginUserLoading, data: loginUser } =
    useQuery<ILoginUser>(["loginUser"], fetchLoginUser);
  const { isLoading: isProfileLoading, data: profile } = useQuery<ILoginUser>(
    ["profile", userId],
    () => fetchUserProfile(userId)
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
          <div></div>
        </Header>
        <Section>
          <h1>Profile Page</h1>
          <h2>login-user</h2>
          <div>{loginUser?.userNo}</div>
          <div>{loginUser?.email}</div>
          <div>{loginUser?.nickname}</div>
          <div>{loginUser?.profileImgUrl}</div>
          <h2>profile</h2>
          <div>{profile?.userNo}</div>
          <div>{profile?.email}</div>
          <div>{profile?.nickname}</div>
          <div>{profile?.profileImgUrl}</div>
        </Section>
        <Footer>© 2022 Team DDOBAB</Footer>
      </MainContainer>
    </BackGround>
  );
}

export default Profile;
