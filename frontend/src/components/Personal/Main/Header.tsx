// import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 5% 0;
`;

const StyledLink = styled(Link)`
  flex: 1;
  text-decoration: none;
`;

const ContentButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 7vh;

  cursor: pointer;

  font-size: 1.5rem;
  color: white;

  background-color: ${(props) => (props.isActive ? "#ffffff50" : "#ffffff12")};
  border: none;
`;

type HeaderProps = {
  activeButton: string;
  setActiveButton: (active: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeButton, setActiveButton }) => {
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <HeaderContainer>
      <StyledLink to="/previouspersonalcolor">
        <ContentButton
          isActive={activeButton === "previouspersonalcolor"}
          onClick={() => handleButtonClick("previouspersonalcolor")}
        >
          퍼스널 컬러 진단
        </ContentButton>
      </StyledLink>
      <StyledLink to="/previousclothes">
        <ContentButton
          isActive={activeButton === "previousclothes"}
          onClick={() => handleButtonClick("previousclothes")}
        >
          의상 진단
        </ContentButton>
      </StyledLink>
    </HeaderContainer>
  );
};

export default Header;
