import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="archive" element={<Archive />} />
    </Route>
  )
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <RouterProvider router={router}>
    //   {/* Your other components */}
    // </RouterProvider>
  );
}

export default App;
