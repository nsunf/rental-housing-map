import styled from "styled-components";
import { darken, lighten } from "polished";

import { useSelector, useDispatch } from "react-redux";
import { setHouseID } from "../modules/SelectID";
import { useCallback } from "react";
import { useHouseData } from "../hooks/useHouseData";

const HouseBlock = styled.li`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  border-bottom: 1px solid #aaa;
  padding: 8px 0;

  cursor: pointer;

  &:hover {
    background: ${lighten(0.025, "#eee")};
  }
  &:active {
    background: ${darken(0.01, "#eee")};
  }

  ${props => props.isSelected && `background: ${darken(0.01, "#eee")}`}
`;

function House({ house, isSelected, onClickHouse }) {

  return (
    <HouseBlock isSelected={isSelected} onClick={() => {onClickHouse(house.id)}}>
      <div style={{"borderBottom": "1px solid #d7d7d7", "fontSize": "0.9em"}}>
        <div style={{fontSize: "1.4em"}}>{house.id}</div>
        {house.address + " " + house.roomNumber + "호"}
      </div>
      <div style={{"fontSize": "0.8em"}}>
        <div>{`${house.station}에서 ${house.distFromStation}km`}</div>
        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-between"}}>
          <span>{house.elevator == "무" ? "엘리베이터 있음" : "엘리베이터 없음"}</span>
          <span>{house.year + "년 완공"}</span>
        </div>
      </div>
    </HouseBlock>
  );
}

function HouseList({ houseIDArr }) {
  const houseData = useHouseData();
  const houseList = houseData.houseList.filter(house => houseIDArr.includes(house.id));
  const selectedHouseID = useSelector(state => state.selectedID.house );
  const dispatch = useDispatch();
  const onClickHouse = useCallback((id) => {
    dispatch(setHouseID(id));
  });

  return(
    <ul style={{"paddingLeft": "16px", "paddingRight": "8px"}}>
      {houseList.map(house => 
        <House 
          key={house.id} 
          house={house} 
          isSelected={selectedHouseID == house.id}
          onClickHouse={onClickHouse}
      />)}
    </ul>
  );
}

export default HouseList;