/* eslint-disable react/prop-types */
import axios from "axios";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const Form = ({
  doctor,
  register,
  setRegister,
  clear,
  setClear,
  setData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [no, setNo] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setFirstName("");
    setNo("");
    setLastName("");
    setPassword("");
  }, [clear]);

  const handleNoChange = (event) => {
    setNo(event.target.value);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    try {
      let response;
      if (doctor) {
        if (register) {
          response = await axios.post(
            "http://localhost:10090/doctorservice/api/v1/doctor/add",
            {
              registrationNumber: no,
              firstName: firstName,
              lastName: lastName,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await axios.post(
            "http://localhost:10090/doctorservice/api/v1/doctor/login",
            {
              registrationNumber: no,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      } else {
        if (register) {
          response = await axios.post(
            "http://localhost:10090/patientservice/api/v1/patient/add",
            {
              tcNo: no,
              firstName: firstName,
              lastName: lastName,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          // Hasta giriş işlemi
          response = await axios.post(
            "http://localhost:10090/patientservice/api/v1/patient/login",
            {
              tcNo: no,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        if (doctor) {
          navigate("/doctorLogin");
        } else {
          navigate("/patientLogin");
        }
        setData(response.data);

        toast.success(register ? "Kayıt başarılı!" : "Giriş başarılı!");
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Hata: ${error.response.data.message}`);
      } else {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="container">
      <div className="loginForm">
        <div>
          {register ? (
            <div>
              <div className="registerForm">
                <label>{doctor ? "Sicil No" : "Tc Kimlik"} </label>
                <input
                  maxLength={doctor ? "10" : "11"}
                  onChange={handleNoChange}
                  type="text"
                  value={no}
                />
                <label>Ad</label>
                <input
                  onChange={handleFirstName}
                  type="text"
                  value={firstName}
                />
                <label>Soyad</label>
                <input onChange={handleLastName} type="text" value={lastName} />
                <label htmlFor="">Şifre</label>
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="login">
                <label>{doctor ? "Sicil No" : "Tc Kimlik"}</label>
                <input
                  onChange={handleNoChange}
                  value={no}
                  type="text"
                  maxLength={doctor ? "10" : "11"}
                />
                <label htmlFor="">Şifre</label>
                <input
                  onChange={handlePassword}
                  value={password}
                  type="password"
                />
              </div>
            </div>
          )}
        </div>

        <div className="loginButtonDiv">
          <button onClick={handleClick} className="loginButton">
            {register ? "Kayıt Ol" : "Giriş"}
          </button>
        </div>
      </div>
      <hr
        style={{ width: "70%", border: "1px soliid black", margin: "20px 0" }}
      />
      <div>
        <p
          className="girisP"
          onClick={() => {
            setRegister(!register);
            setClear(!clear);
          }}
        >
          {register ? "Giriş Yap" : "Yeni Kayıt"}
        </p>
      </div>
    </div>
  );
};
