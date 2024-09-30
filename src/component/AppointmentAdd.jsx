/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppointmentAdd = ({ patientId, setView, isAdd, selectedId }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getAllDoctor();
  }, []);

  const getAllDoctor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:10090/doctorservice/api/v1/doctor/getAll?page=0&size=10"
      );

      if (
        response.data &&
        response.data.content &&
        response.data.content.length
      ) {
        setDoctorList(response.data.content);
      } else if (response.content && response.content.length) {
        setDoctorList(response.content);
      } else {
        toast.warn("Doktor bulunamadı.");
      }
    } catch (error) {
      console.error("Doktor listesi alınırken hata oluştu:", error);
      toast.error(
        "Doktor listesi alınırken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  const saveSubmit = async () => {
    try {
      let response;
      if (isAdd) {
        response = await axios.post(
          "http://localhost:10090/appointmentservice/api/v1/appointment/add",
          {
            appointmentDate: `${selectedDate}T${selectedTime}`,
            doctorId: selectedDoctor,
            patientId: patientId,
          }
        );
        toast.success("Randevu başarıyla eklendi!");
      } else {
        response = await axios.put(
          "http://localhost:10090/appointmentservice/api/v1/appointment/update",
          {
            id: selectedId,
            appointmentDate: `${selectedDate}T${selectedTime}`,
            doctorId: selectedDoctor,
            patientId: patientId,
          }
        );
        toast.success("Randevu başarıyla güncellendi!");
      }

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        setView("table");
      }
    } catch (error) {
      console.error("Randevu işlemi sırasında hata oluştu:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Hata: ${error.response.data.message}`);
      } else {
        toast.error(
          "Randevu işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="">Doktor Seçiniz</label>
        <br />
        <select
          value={selectedDoctor}
          onChange={handleDoctorChange}
          style={{ width: "100%" }}
        >
          <option value="" disabled>
            Doktor Seçiniz
          </option>
          {doctorList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>

        <label htmlFor="">Tarih Seçiniz</label>
        <br />
        <select
          value={selectedDate}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        >
          <option value="" disabled>
            Tarih Seçiniz
          </option>
          {(() => {
            let today = new Date();
            const options = [];

            for (let i = 0; i < 7; i++) {
              let currentDate = new Date(today);
              currentDate.setDate(currentDate.getDate() + i);
              const formattedDate = currentDate.toISOString().split("T")[0];

              options.push(
                <option key={i} value={formattedDate}>
                  {formattedDate}
                </option>
              );
            }
            return options;
          })()}
        </select>

        <label htmlFor="">Saat Seçiniz</label>
        <br />
        <select
          value={selectedTime}
          onChange={handleTimeChange}
          style={{ width: "100%" }}
        >
          <option value="" disabled>
            Saat Seçiniz
          </option>
          <option value="09:00:00.000">09:00</option>
          <option value="10:00:00.000">10:00</option>
          <option value="11:00:00.000">11:00</option>
          <option value="12:00:00.000">12:00</option>
          <option value="13:00:00.000">13:00</option>
          <option value="14:00:00.000">14:00</option>
          <option value="15:00:00.000">15:00</option>
          <option value="16:00:00.000">16:00</option>
          <option value="17:00:00.000">17:00</option>
        </select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={saveSubmit} className="saveAppointmentButton">
          Kayıt
        </button>
        <button
          onClick={() => {
            setView("table");
          }}
          className="saveAppointmentButton"
          style={{ marginLeft: "10px" }}
        >
          Geri Dön
        </button>
      </div>
    </div>
  );
};
