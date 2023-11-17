import React from "react";
import { styled } from "styled-components";

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const ContentButton = styled.button<ButtonProps>`
  width: 100%;
  height: 7vh;
  padding: 0;

  cursor: pointer;
  font-size: 1.5rem;
  font-family: "Giants-Bold";
  color: ${(props) => (props.isActive ? "#000000" : "#7f7c7c")};
  background-color: transparent;
  border: none;

  transition: all 0.7s;
  outline: none;

  &:active {
    background-color: transparent;
  }
  -webkit-tap-highlight-color: transparent;
`;

const HeaderButton: React.FC<ButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  return (
    <ContentButton isActive={isActive} onClick={onClick}>
      {children}
    </ContentButton>
  );
};

export default HeaderButton;
