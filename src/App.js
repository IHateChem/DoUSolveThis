import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './page/Landing';
import SearchStudy from './page/SearchStudy';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchStudy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
