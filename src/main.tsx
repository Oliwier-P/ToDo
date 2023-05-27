import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import Categories from './pages/Categories';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/Home" element={<Home />} />
        <Route path="/Alltasks" element={<AllTasks />} />
        <Route path="/Categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
