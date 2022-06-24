import styled from "styled-components";

export const QuestionBlank = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 60px;
  border: 4px solid transparent;
  border-radius: 30px;
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
