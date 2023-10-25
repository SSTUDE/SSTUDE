
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { store } from './store';
import routes from './router';
import { Provider } from 'react-redux';


function App() {
  return (
    <>
      <Provider store={store}>
        <div className='App'>
          <BrowserRouter>
            <Routes>
              {routes.map((e) => (
                <Route key={e.path} path={e.path} element={<e.Component/>}/>
              ))}
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;

