import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

import Popup_HouseList from "./Popup_HouseList";
import { useCallback } from "react";

const PopupBackground = styled.div`
  ${props => !props.isOpen && "display: none;"}
  width: 100vw;
  height: 100vh;

  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;

  background-color: rgba(0, 0, 0, 0.6);
  transition: 500ms;
`;

const PopupBlock = styled.div`
  height: 95vh;
  width: 100vw;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;

  position: fixed;
  left: 0;
  bottom: ${props => props.isOpen ? "0vh" : "-95vh"};
  z-index: 100;

  border-radius: 32px 32px 0px 0px;

  background-color: white;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  transition: 500ms;
`;

const CloseBtn = styled(IoCloseSharp)`
  width: 32px;
  height: 32px;
  padding: 8px;
  float: right;

  cursor: pointer;
`;

export default function Popup({ isOpen }) {
  const houseList = useSelector(state => state.popupPage.houseList);
  console.log(houseList)
  const navigate = useNavigate();
  const location = useLocation();

  let onCloseButtonClick = useCallback(() => {
    let pathname = location.pathname
    let newPath = pathname.split("/").slice(0, 3).join("/");
    navigate(newPath);
  })

  return (
    <>
    <PopupBackground isOpen={isOpen}/>
    <PopupBlock isOpen={isOpen}>
      <CloseBtn onClick={onCloseButtonClick}/>
      <Popup_HouseList houseList={houseList}/>
    </PopupBlock>
    </>
  );
};
