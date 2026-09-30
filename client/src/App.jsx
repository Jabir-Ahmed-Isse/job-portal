import { useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Applications from './pages/Applications';
import Applyjob from './pages/Applyjob';
import CompanyLogin from './components/CompanyLogin';
import { AppContext } from './context/appContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { showRecriuterLogin, companyToken } = useContext(AppContext);

  return (
    <>
      {showRecriuterLogin && <CompanyLogin />}
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='applications' element={<Applications />} />
        <Route path='applied-jobs/:id' element={<Applyjob />} />

        {/* Nested route under dashboard */}
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='addjob' element={<AddJob />} />
              <Route path='managejobs' element={<ManageJobs />} />
              <Route path='viewapplications' element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </>
  );
}

export default App;
