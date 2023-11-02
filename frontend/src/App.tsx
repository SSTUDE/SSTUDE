import React from 'react';
import routes from './router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import ClickEffect from './components/Common/ClickEffect';
import { BACK_GROUND_COLOR } from './constants/defaultSlices'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { WebSocketProvider } from './components/Login/TokenLasp';

interface RouteConfig {
  path: string;
  Component: React.ComponentType<any>;
  props?: any;
}

function renderRouteComponent(route: RouteConfig) {
  const Component = route.Component;
  const props = route.props;
  return <Component {...props} />;
}

function App() {
  return (
    <Provider store={store}>
      {/* <WebSocketProvider> */}
        <Main>
          <ClickEffect />
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={renderRouteComponent(route)}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </Main>
      {/* </WebSocketProvider> */}
    </Provider>
  );
}

const Main = styled.div`
  background-color: ${BACK_GROUND_COLOR};
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: #fff;
`

export default App;
