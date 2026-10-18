import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { CatchAllPage } from './pages/CatchAllPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<CatchAllPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
