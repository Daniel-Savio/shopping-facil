import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Home } from './pages/home';
import icon from './img/icon.png'
export default function App() {


  return (
    <div
      className={`flex flex-col bg-gradient-to-t from-slate-50 to-violet-400`}
    >
    
      <header id='title-bar' className="flex justify-center  text-center">
        
        <div className="flex w-fit items-center gap-3 bg-slate-100 rounded-b-md pl-4 pr-4 p-1 shadow-xl text-green-500 text-treetech-50">
          <img className='w-5' src={icon} alt="" />
          <h1 className="text-lg font-bold"> Shopping Facil </h1>
         
        </div>


      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

      <div id='footer' className='text-center text-xs p-1 bg-gradient-to-r from-green-500 to-green-600 text-slate-50'> Made by: Daniel Sávio</div>
    </div>
  );
}
