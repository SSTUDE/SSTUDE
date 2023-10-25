
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './router';

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            {routes.map((e) => (
              <Route key={e.path} path={e.path} element={<e.Component/>}/>
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

