import { useQuery } from "react-query";
import { fetchLoginUser } from "../apis/loginApi";

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
    <div>
      <h1>blank home</h1>
      <div>{loginUser?.nickname}</div>
      <a href="http://localhost:8900/oauth2/authorization/google">
        google login
      </a>
    </div>
  );
}

export default Home;
