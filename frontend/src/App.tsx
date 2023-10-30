import React from 'react';
import routes from './router';
import { store } from './store';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { BACK_GROUND_COLOR } from './constants/defaultSlices'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Provider store={store}>
        <Main>
          <BrowserRouter>
            <Routes>
              {routes.map((e) => (
                <Route key={e.path} path={e.path} element={<e.Component/>}/>
              ))}
            </Routes>
          </BrowserRouter>
        </Main>
      </Provider> 
    </>
  );
}

const Main = styled.div`
  background-color: ${BACK_GROUND_COLOR};
  width: 100%;
  height: 100vh;
  color: #fff;
  overflow: hidden;
`

export default App;

