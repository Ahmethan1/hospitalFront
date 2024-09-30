import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [doctor, setDoctor] = useState(false);
  const [register, setRegister] = useState(false);
  const [clear, setClear] = useState(false);
  const [data, setData] = useState({});

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              clear={clear}
              setClear={setClear}
              register={register}
              doctor={doctor}
              setDoctor={setDoctor}
              setRegister={setRegister}
              setData={setData}
            />
          }
        />
        <Route path="/doctorLogin" element={<DoctorLogin data={data} />} />
        <Route path="/patientLogin" element={<PatientLogin data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
