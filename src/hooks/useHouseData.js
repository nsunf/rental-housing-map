import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const getOrganizedData = (inputData) => {
  let dongList = [];
  let dongID = 1;
  inputData.forEach(house => {
    if (dongList.filter(dongObj => dongObj.dong == house.dong).length > 0) {
      let index = dongList.findIndex(dongObj => dongObj.dong == house.dong);
      let newDongObject = dongList[index];
      newDongObject.houseIDList.push(house.id);
      dongList[index] = newDongObject;
    } else {
      let dongObject = {id: dongID, autonomous: house.autonomous, dong: house.dong, address: `${house.autonomous} ${house.dong}`, houseIDList: [house.id]};
      dongList.push(dongObject);
      dongID++;
    }
  })
  return { dongList, houseList: inputData };
};

export function useHouseData() {
  const { cat } = useParams();
  const data = useSelector(state => state.data);

  const initialData = getOrganizedData(data);

  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (cat == undefined || cat == "전체") {
      setFilteredData(initialData);
      return;
    }
    let result = getOrganizedData(data.filter(house => house.type == cat));

    setFilteredData(result);
  }, [cat, data])

  return filteredData;
}
