import styled from "styled-components";
import Popup from "./Popup";

const Popup_HouseListBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  clear: both;

  height: calc(100% - 48px);
  overflow: scroll;
`;


const Popup_HouseBlock = styled.tr`
  height: 120px;
  text-align: center;
`;

function Popup_House({ house }) {
  return (
    <Popup_HouseBlock>
      <td>{house.id}</td>
      <td>{house.type}</td>
      <td>{house.address}</td>
      <td>{house.station}까지 {house.distFromStation}km</td>
      <td>{house.roomNumber}호</td>
      <td><span style={{display: "block"}}>{house.area}m²</span><span>(8.87평)</span></td>
      <td><span style={{display: "block"}}>{house.securityDeposit}원</span><span>{house.rent}원</span></td>
      <td>{house.elevator}</td>
      <td>{house.year}</td>
      <td>{house.jurisdiction}</td>
    </Popup_HouseBlock>
  );
}

export default function Popup_HouseList({ houseList }) {
  return (
    <Popup_HouseListBlock>
      <table border="1" style={{borderCollapse: "collapse"}}>
        <thead>
          <tr><th>ID</th><th>Type</th><th>Address</th><th>Station</th><th>RoomNum</th><th>Area</th><th>Rent</th><th>Elevator</th><th>Year</th><th>Jurisdiction</th></tr>
        </thead>
        <tbody>
          {houseList.map(house => <Popup_House key={house.id} house={house}/>)}
        </tbody>
      </table>
    </Popup_HouseListBlock>
  );
}