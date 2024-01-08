import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import { Toaster } from './components/ui/toaster';


function App() {
  return (
    <BrowserRouter>
      <div className='max-w-[1080px] mx-auto' >
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
