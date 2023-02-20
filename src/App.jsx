import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<Layout />} />
      </Routes>
      {/* <Layout /> */}
    </>
  );
}

export default App;
