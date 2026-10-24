import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Exam } from './pages/Exam';
import { Results } from './pages/Results';
import { Review } from './pages/Review';
import { SelectSimulation } from './pages/SelectSimulation';
import { SimulationIntro } from './pages/SimulationIntro';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SelectSimulation />} />
        <Route path="/simulasi/:id" element={<SimulationIntro />} />
        <Route path="/ujian/:id" element={<Exam />} />
        <Route path="/hasil/:id" element={<Results />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}