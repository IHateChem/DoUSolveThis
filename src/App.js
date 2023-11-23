import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import spinner from './asset/spinner.gif';

const queryClient = new QueryClient();

const Landing = lazy(() => import('./page/landing/Landing'));
const SearchStudy = lazy(() => import('./page/searchStudy/SearchStudy'));

const Loading = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <img src={spinner} width="50" alt="로딩 중" />
    </div>
  );
};

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<SearchStudy />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
