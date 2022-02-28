import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import styled from 'styled-components';

import NaverMapComponent from './components/NaverMapComponent';
import Aside from './components/Aside';
import Category from './components/Category';
import DongList from './components/DongList';
import Popup from './components/Popup';

import { getDataAsync } from "./modules/GetData";
import { setStateLoading, setStateSuccess } from './modules/Process';


const AppBlock = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

function App() {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const setLoading = () => { dispatch(setStateLoading()) };
  const setSuccess = () => { dispatch(setStateSuccess()) };
  const setData = () => { dispatch(getDataAsync()) };

  useEffect(() => {
    setLoading();
    setData()
  }, []);

  useEffect(() => {
    if (data.length == 0) return ;
    setSuccess();
  }, [data])

  return (
    <AppBlock className="App">
      <Routes>

      {["/", "/cat/:cat", "/cat/:cat/id/:id"].map(path => (
        <Route key={path} path={path} element={
          <>
          <NaverMapComponent />
          <Aside>
            <Category />
            <DongList />
          </Aside>
          <Popup isOpen={path.includes("id")}/>
          </>
        }/>
      ))}

      </Routes>
    </AppBlock>
  );
}

export default App;
