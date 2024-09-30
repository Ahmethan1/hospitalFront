/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/DoctorLogin.css";
import axios from "axios";

const DoctorLogin = ({ data }) => {
  const [appointmentData, setAppointmentData] = useState([]);
  const getAppointmentData = async () => {
    const response = await axios.get(
      "http://localhost:10090/appointmentservice/api/v1/appointment/getAll?page=0&size=1000"
    );

    setAppointmentData(response.data.content);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!(data && data.id)) {
      navigate("/");
    } else {
      getAppointmentData();
    }
  }, []);

  return (
    <div>
      <div className="doctorInfo">
        <p>Sicil No: {data.registrationNumber}</p>
        <p>AD: {data.firstName}</p>
        <p>Soyad: {data.lastName}</p>
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>Hastalarım</h3>
        <div>
          <table className="patientTable">
            <thead>
              <tr>
                <th>AD</th>
                <th>Soyad</th>
                <th>Tc Kimlik</th>
                <th>Randevu Tarihi </th>
              </tr>
            </thead>

            <tbody>
              {appointmentData.map((item) => {
                if (item.doctorId == data.id) {
                  return (
                    <tr key={item}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.tcNo}</td>
                      <td>{item.appointmentDate}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
