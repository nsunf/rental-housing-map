import styled from "styled-components";


const AsideBlock = styled.div`
  width: 30vw;
  height: 100vh;
  padding: 8px 16px;
  box-sizing: border-box;
  word-break: keep-all;
  
  display: flex;
  flex-direction: column;
`;


function Aside({ children }) {

  return (
    <AsideBlock>
      <h1>2022년 1차 장기미임대 매입임대주택 목록</h1>
      {children}
    </AsideBlock>
  );
}

export default Aside;