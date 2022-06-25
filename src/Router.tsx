import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import QuestionDetail from "./routes/QuestionDetail";
import Questions from "./routes/Questions";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:userNo" element={<Profile />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:questionId" element={<QuestionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
