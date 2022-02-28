import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Marker } from "react-naver-maps";
import { renderToString } from "react-dom/server";
import { useNavigate, useLocation } from "react-router-dom";


import styled, { css } from "styled-components";

import { useHouseData } from "../hooks/useHouseData";
import { setID } from "../modules/SelectID";
import { setHouseList } from "../modules/PopupPage";


const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerIconBlock = styled.div`
  ${FlexCenter}
  flex-direction: column;
  transform: translate(-50%, calc(-100% + 10px));
`;

const MarkerHead = styled.div`
  ${FlexCenter}
  background-color: white;
  border: 5px solid ${props => props.color};
  border-radius: 20px;

  box-sizing: border-box;
  font-weight: bold;

        width: 40px;
        height: 40px;
        z-index: 1;
        font-size: 0.9em;
`;

const MarkerTail = styled.div`
  border-top: 24px solid ${props => props.color};
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  position: relative;
  top: -10px;
  z-index: 0;
`;

const MarkerNoti = styled.div`
  ${FlexCenter}
  width: 18px;
  height: 18px;
  border-radius: 9px;

  position: relative;
  left: 12px;
  top: 12px;
  z-index: 2;

  font-size: 0.8em;
  font-weight: bold;

  color: white;
  background-color: red;
`;

const MarkerHeadSelected = styled(MarkerHead)`
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  width: 320px;
  height: fit-content;
  min-height: 240px;
  padding: 16px;
  z-index: 1;
  font-size: 0.9em;
`;

const IdCircle = styled.div`
  ${FlexCenter}
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  color: white;
  background-color: cornflowerblue;
`;

function MarkerDetail({color, houseData}) {
  const mainData = houseData[0];
  
  return (
    <MarkerHeadSelected color={color}>
      <div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}>
      {houseData.map(house => <IdCircle key={house.id}>{house.id}</IdCircle>)}
      </div>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "1px solid #d7d7d7", borderBottom: "1px solid #d7d7d7", flexGrow: 1, padding: "16px 0"}}>{mainData.address}</div>
      <div>{mainData.station + "에서 " + mainData.distFromStation + "km"}</div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} onClick={() => {console.log("hahaha")}}>
        <span>{mainData.elevator == "무" ? "엘리베이터 있음": "엘리베이터 없음"}</span>
        <span>{mainData.year + "년 완공"}</span>
      </div>
    </MarkerHeadSelected>
  );
}

function MarkerIcon({house, isSelected, overlappedHouse = []}) {
  let markerColor = "white";
  switch (house.type) {
    case "다가구 가형":
        markerColor = "#88E0EF";
      break;
    case "다가구 나형":
        markerColor = "#161E54";
      break;
    case "원룸":
        markerColor = "#FF5151";
      break;
    default:
      break;
  }

  return (
    <MarkerIconBlock>
      {(overlappedHouse.length > 1) && !isSelected && <MarkerNoti>{overlappedHouse.length}</MarkerNoti>}
      { isSelected && <MarkerDetail color={markerColor} houseData={overlappedHouse}></MarkerDetail> }
      { !isSelected && <MarkerHead color={markerColor} isSelected={isSelected}>{house.id}</MarkerHead>}
      <MarkerTail color={markerColor} isSelected={isSelected}/>
    </MarkerIconBlock>
  );
}

function CustomMarker({ isSelected, house }) {
  const houseData = useHouseData();
  const overlappedHouse = houseData.houseList.filter(x => x.address == house.address );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const onMarkerClick = useCallback(() => {
    if (isSelected) {
      dispatch(setHouseList(overlappedHouse));
      let pathname = location.pathname == "/" ? "cat/전체" : location.pathname;
      navigate(pathname + "/id/" + house.id);
    } else {
      let dongID = houseData.dongList.filter(dong => dong.dong == house.dong)[0].id;
      let houseID = house.id;
      dispatch(setID(dongID, houseID));
    }
  })
  
  return (
    <Marker
      position={{lat: house.geocode.y, lng: house.geocode.x}}
      icon={{content: renderToString(<MarkerIcon house={house} isSelected={isSelected} overlappedHouse={overlappedHouse}/>)}}
      zIndex={isSelected ? 1 : 0}
      onClick={onMarkerClick}
    />
  );
}

export default CustomMarker;