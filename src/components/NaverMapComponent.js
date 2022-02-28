import { useCallback, useEffect, useRef, useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import { useSelector, useDispatch } from "react-redux";
import { useHouseData } from "../hooks/useHouseData";

import styled, { keyframes } from "styled-components";
import { lighten, darken } from "polished";
import { AiOutlineLoading } from "react-icons/ai";
import { FiMaximize } from "react-icons/fi";

import CustomMarker from "./CustomMarker";
import { getGeocode } from "../modules/GeocodeAPI";
import { reset } from "../modules/SelectID";


const NaverMapBlock = styled(NaverMap)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoadingBlock = styled.div`
  width: 100%; 
  height: 100%; 
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled(AiOutlineLoading)`
    width: 64px;
    height: 64px;
    fill: #eee;
    animation: ${RotateKeyframes} 1s cubic-bezier(0.25, 1, 0.5, 1) infinite;
`;

const ResizeCameraBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 32px;
  bottom: 48px;
  z-index: 10;

  height: 72px;
  width: 72px;
  border-radius: 36px;
  background-color: cornflowerblue;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));

  cursor: pointer;

  &:hover {
    background-color: ${lighten(0.01, "cornflowerblue")};
  }
  &:active {
    background-color: ${darken(0.01, "cornflowerblue")};
  }
`;


const defaultCamera = {
  position: {
    lat: 37.537689087672476, 
    lng: 127.0065561897501
  },
  zoom: 12
};

function NaverMapComponent() {
  const dispatch = useDispatch();
  const { selectedDongID, selectedHouseID} = useSelector(state => ({selectedDongID: state.selectedID.dong, selectedHouseID: state.selectedID.house}));
  const loading = useSelector(state => state.process.loading);

  const houseData = useHouseData();
  const [camera, setCamera] = useState(defaultCamera);
  
  const resetCamera = () => {
    setCamera({
      position: {
        lat: 37.537689087672476, 
        lng: 127.0065561897501
      },
      zoom: 12
    });
  }

  function debounce(fn, delay) {
    let timer;
    return function(){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        fn.apply(this);
      }, delay);
    }
  }

  const onCenterChanged = useCallback((center) => {
    let centerPosition = { lat: center._lat, lng: center._lng };
    setCamera({ ...camera, position: centerPosition });
  })

  const onZoomChanged = useCallback((zoom) => {
    setCamera({ ...camera, zoom: zoom});
  })

  useEffect(() => {
    if (selectedDongID == null) return;
    let selectedDongFilter = houseData.dongList.filter(dong => dong.id == selectedDongID);
    if (selectedDongFilter.length < 1) throw(new Error("can't find selected dong")); 
    let selectedDong = selectedDongFilter[0];

    if (selectedHouseID == null) {
      getGeocode(selectedDong.address). then(res => {
        setCamera({position: {lat: res.y, lng: res.x}, zoom: 15});
      })
    } else {
      let selectedHouseFilter = selectedDong.houseIDList.filter(id => id == selectedHouseID);
      if (selectedHouseFilter.length < 1) throw(new Error("can't find selected house"));
      let selectedHouse = houseData.houseList.filter(house => house.id == selectedHouseID)[0];

      setCamera({position: {lat: selectedHouse.geocode.y, lng: selectedHouse.geocode.x}, zoom: 19});
    }
  }, [selectedDongID, selectedHouseID])


  return (
    <RenderAfterNavermapsLoaded 
      ncpClientId={"gjj698h64e"} 
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading</p>}
    >
      <NaverMapBlock 
        defaultCenter={defaultCamera.position}
        defaultZoom={defaultCamera.zoom}
        center={camera.position}
        zoom={camera.zoom}
        onCenterChanged={() => {debounce(onCenterChanged, 500)}}
        onZoomChanged={() => {debounce(onZoomChanged, 500)}}
        onClick={() => {dispatch(reset())}}
      >
        {houseData.houseList.map(house => <CustomMarker key={house.id} isSelected={selectedHouseID == house.id} house={house} />)}
        {loading && <LoadingBlock><LoadingIcon/></LoadingBlock>}
        <ResizeCameraBlock onClick={resetCamera}>
          <FiMaximize style={{width: "40%", height: "40%", stroke: "#fff"}}/>
        </ResizeCameraBlock>
      </NaverMapBlock>
    </RenderAfterNavermapsLoaded>
  );
}

export default NaverMapComponent;