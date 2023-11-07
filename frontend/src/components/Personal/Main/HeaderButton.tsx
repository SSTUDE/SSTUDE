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
  color: ${(props) => (props.isActive ? "#000000" : "#ffffff")};

  background-color: transparent;
  border: none;

  transition: all 0.7s;
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
