/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/PatientLogin.css";
import axios from "axios";
import { Table } from "../component/Table";
import { AppointmentAdd } from "../component/AppointmentAdd";

const PatientLogin = ({ data }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState("table");
  const [isAdd, setIsAdd] = useState(true);

  const [appointmentData, setAppointmentData] = useState([]);
  const getAppointmentData = async () => {
    const response = await axios.get(
      "http://localhost:10090/appointmentservice/api/v1/appointment/getAll?page=0&size=1000"
    );
    console.log(response);
    setAppointmentData(response.data.content);
  };

  const appointmentDelete = async () => {
    const response = await axios.delete(
      `http://localhost:10090/appointmentservice/api/v1/appointment/deleteById/${selectedId}`
    );
    console.log(response);
    if (
      response.status == 200 ||
      response.status == 201 ||
      response.status == 202
    ) {
      getAppointmentData();
    }
  };

  useEffect(() => {
    if (!(data && data.id)) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="patientInfo">
        <p>TC: {data.tcNo}</p>
        <p>AD: {data.firstName}</p>
        <p>Soyad: {data.lastName}</p>
      </div>
      <div className="appointmentDiv">
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Randevularım
        </h3>
        <div className="appointmentButtons">
          <button
            className="appointmentAdd"
            onClick={() => {
              setView("add");
              setIsAdd(true);
            }}
          >
            Randevu Ekle
          </button>
          <button
            className="appointmentEdit"
            onClick={() => {
              setView("add");
              setIsAdd(false);
            }}
          >
            Randevu Düzenle
          </button>
          <button
            onClick={() => {
              appointmentDelete();
            }}
            className="appointmentRemove"
          >
            Randevu Sil
          </button>
        </div>
        <div>
          {view == "table" ? (
            <Table
              getAppointmentData={getAppointmentData}
              data={data}
              appointmentData={appointmentData}
              setSelectedId={setSelectedId}
            />
          ) : view == "add" ? (
            <AppointmentAdd
              selectedId={selectedId}
              isAdd={isAdd}
              setView={setView}
              patientId={data.id}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
