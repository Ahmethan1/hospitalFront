/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect } from "react";

export const Table = ({
  data,
  appointmentData,
  setSelectedId,
  getAppointmentData,
}) => {
  useEffect(() => {
    getAppointmentData();
  }, []);

  return (
    <div>
      <table className="patientTable">
        <thead>
          <tr>
            <th>Doktor Ad</th>
            <th>Doktor Soyad</th>
            <th>Randevu Tarihi </th>
          </tr>
        </thead>

        <tbody>
          {appointmentData.map((item) => {
            if (item.patientId == data.id) {
              return (
                <tr
                  onClick={() => {
                    setSelectedId(item.id);
                  }}
                  key={item.id}
                >
                  <td>{item.doctorFirstName}</td>
                  <td>{item.doctorLastName}</td>
                  <td>{item.appointmentDate}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};
