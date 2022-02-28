import styled, { css } from "styled-components";
import { darken, lighten } from 'polished';
import { Link, useParams } from 'react-router-dom';

const CatBlock = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const CatBtnBlock = styled.div`
  padding: 8px 16px;
  border-radius: 8px;

  cursor: pointer;
  color: white;

  &:hover {
    opacity: 1;
  }
  ${props => {
    let color = "#000";
    switch (props.name) {
      case "다가구 가형":
        color = "#88e0ef";
        break;
      case "다가구 나형":
        color = "#161e54";
        break;
      case "원룸":
        color = "#ff5151";
        break;
      default: break;;
    }
    if (props.isSelected) {
      return css`
        background: ${color};
        font-weight: bold;
      `;
    } else {
      return css`
        background: ${lighten(0.01, color)};
        opacity: 0.5;
      `;
    }
  }}
`;

function CatBtn({ name, isSelected }) {
  return (
    <CatBtnBlock isSelected={isSelected} name={name}>
      <Link style={{"color": "inherit"}} to={`/cat/${name}`}>
        {name}
      </Link>
    </CatBtnBlock>
  );
}

function Category() {
  let { cat } = useParams();
  let selectedCat = cat || "전체";
  
  let cats = ["전체", "다가구 가형", "다가구 나형", "원룸"];
  return(
    <CatBlock>
      {cats.map(catName => (
        <CatBtn key={catName} name={catName} isSelected={selectedCat == catName}/>
      ))}
    </CatBlock>
  );
}

export default Category;