import React, { useContext } from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: rgba(128, 0, 0, 0.5)
    url("https://images.pexels.com/photos/952437/pexels-photo-952437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
    no-repeat center center;
`;

const Wrapper = styled.div`
  height: 60%;
  width: 30%;
  background-color: rgba(0, 128, 0, 0.2);
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  @media (max-width: 600px) {
    height: 60%;
    width: 70%;
  }
`;
const Top = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  background-color: #ddddf7;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
  border: 2px solid red;

  @media (max-width: 600px) {
    height: 120px;
    width: 120px;
  }
`;

const Mid = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #f1f1f1;
  font-size: 24px;
  font-weight: bolder;
`;

const UserName = styled.span`
  text-transform: capitalize;
  font-size: 50px;
  font-weight: bolder;

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const Paragraph = styled.p`
  font-size: 45px;
  font-weight: bolder;
  color: #00ff00;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Bottom = styled.div`
  flex: 1;
  text-align: center;
  margin: 5px;
`;

const Paragraph1 = styled.p`
  color: #f1f1f1;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Paragraph2 = styled.p`
  margin-top: 10px;
  font-size: 50px;
  color: #ff0000;
  font-weight: bolder;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Button = styled.button``;

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container>
      <Wrapper>
        <Top>
          <Avatar src={currentUser.photoURL} />
        </Top>
        <Mid>
          <UserName>I {currentUser.displayName}</UserName>
          <Paragraph> will be attending </Paragraph>
        </Mid>
        <Bottom>
          <Paragraph1>intense worship 2.0</Paragraph1>
          <Paragraph2>THE IMPARTATION</Paragraph2>
        </Bottom>
      </Wrapper>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </Container>
  );
};

export default Home;
