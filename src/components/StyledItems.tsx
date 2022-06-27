import styled from "styled-components";

export const QuestionBlank = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 4px solid transparent;
  border-radius: 30px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #9796f0, #fbc7d4);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const SearchBlank = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 4px solid transparent;
  border-radius: 20px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #9796f0, #fbc7d4);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const QuestionBlankInput = styled.input`
  width: 100%;
  height: 80%;
  margin-left: 15px;
  border: none;
  font-size: 1.5rem;
  &:focus {
    outline: 0px;
  }
`;

export const SearchBlankInput = styled.input`
  width: 100%;
  height: 80%;
  margin-left: 15px;
  border: none;
  font-size: 1.1rem;
  &:focus {
    outline: 0px;
  }
`;

export const CategorySelector = styled.input<{ width: number | 0 }>`
  width: ${(props) => props.width + 0.7}rem;
  height: 30px;
  border: 3px solid whitesmoke;
  border-radius: 15px;
  font-size: 0.8rem;
  color: gray;
  padding: 5px;
  margin: 3px 8px 0 0;
  &:focus {
    outline: 0px;
    border: 3px solid lightgray;
  }
`;

export const ProfileImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 100px;
  box-shadow: 0 0 5px 3px lightgray;
`;

export const ProfileInfo = styled.div`
  padding: 10px 0;
`;

export const ProfileQnATitle = styled.div`
  font-size: 0.9rem;
  padding-bottom: 10px;
`;

export const ProfileQnA = styled.div`
  font-size: 0.8rem;
`;

export const ProfileInfoInput = styled.input<{ border: boolean }>`
  padding: 3px;
  margin-top: 5px;
  border: ${(props) => (props.border ? "2px solid lightgray" : "none")};
  border-radius: 5px;
  &:focus {
    outline: 0px;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;

export const QuestionList = styled.li`
  display: grid;
  grid-template-columns: 7fr 1fr;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 5px whitesmoke;
  margin-bottom: 10px;
`;

export const QuestionListContent = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 0.8rem;
`;

export const QuestionListViews = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  color: gray;
  padding-left: 15px;
  div {
    margin-left: 3px;
  }
`;

export const QuestionListCategory = styled.div`
  height: 30px;
  border: 3px solid whitesmoke;
  border-radius: 15px;
  padding: 5px;
  margin-right: 10px;
`;

export const QuestionDetailContentInput = styled.input<{ border: boolean }>`
  margin: 15px 0;
  font-size: 0.9rem;
  padding: 3px;
  border: ${(props) => (props.border ? "2px solid lightgray" : "none")};
  border-radius: 5px;
  &:focus {
    outline: 0px;
  }
`;

export const AnswerContentInput = styled.input`
  height: 40px;
  font-size: 0.9rem;
  padding: 3px;
  margin: 10px 0;
  border: 2px solid lightgray;
  border-radius: 5px;
  &:focus {
    outline: 0px;
  }
`;

export const AnswerContent = styled.div`
  font-size: 0.9rem;
  padding: 3px;
  margin: 10px 0;
`;

export const QuestionDetailCategory = styled.div`
  height: 30px;
  border: 3px solid whitesmoke;
  border-radius: 15px;
  padding: 5px;
`;
export const QuestionDetailWriter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

export const AnswerWriter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 0.8rem;
`;

export const QuestionDetailViews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: gray;
  padding: 5px;
`;
