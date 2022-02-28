import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDongID } from '../modules/SelectID';
import { useHouseData } from '../hooks/useHouseData';

import styled from "styled-components";
import { darken, lighten } from 'polished';

import HouseList from './HouseList';



const DongBlock = styled.li`
  display: felx;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid black;

  cursor: pointer;

  &:hover {
    background: ${lighten(0.025, "#eee")};
  }
  &:active {
    background: ${darken(0.01, "#eee")};
  }
`;

const FoldArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 8px solid black;

  transform: ${props => props.isFolded ? "none" : "rotate(90deg)"};
  transition: 500ms;
`;

const DongLabel = styled.div`
  flex-grow: 1;
  padding: 16px;
`;

const NumOfHouse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
  background-color: #ccc;
  color: white;
`;

const DongListBlock = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: scroll;
  &::scroll-bar {
    display: hidden;
  }
`;




function Dong({ dong, isFolded, onClickDong }) {

  return(
    <>
      <DongBlock onClick={() => {onClickDong(dong.id)}}>
        <FoldArrow isFolded={isFolded}/>
        <DongLabel>{dong.address}</DongLabel>
        <NumOfHouse>{dong.houseIDList.length}</NumOfHouse>
      </DongBlock>
      {!isFolded && <HouseList houseIDArr={dong.houseIDList}/>}
    </>
  );
}

function DongList() {
  const houseData = useHouseData();
  const selectedDongID = useSelector(state => state.selectedID.dong);

  const dispatch = useDispatch();
  const onClickDong = useCallback((id) => {dispatch(setDongID(id))})

  return (
    <DongListBlock>
      {houseData.dongList.map(dong => 
        <Dong 
          key={dong.id} 
          dong={dong} 
          isFolded={dong.id != selectedDongID} 
          onClickDong={onClickDong}
        />
      )}
    </DongListBlock>
  );
}

export default DongList;