import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Home } from './pages/home';
import { Background } from './components/backgorund';

export default function App() {


  return (
    <div
      className={`flex flex-col  h-screen `}
    >
      <Background></Background>

      <header id='title-bar' className="flex justify-between pl-4 pr-4 pt-1 pb-1 items-center bg-sky-700 dark:bg-sky-950">
        
        <div className="flex items-center ">
          <h1 className="text-lg font-bold text-slate-50 text-treetech-50">
            
           Shopping Facil
            
          </h1>
         
        </div>

        <div id='header-tools' className="flex items-center gap-2 ">

        </div>

      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
