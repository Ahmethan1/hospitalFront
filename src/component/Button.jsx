import "../styles/Button.css";
// eslint-disable-next-line react/prop-types
export const Button = ({ setDoctor, register, clear, setClear }) => {
  return (
    <div className="buttonsDiv">
      <div className="doctorDiv">
        <button
          onClick={() => {
            setDoctor(true);
            setClear(!clear);
          }}
          className="button-86"
        >
          Doktor{register ? " Kayıt" : " Giriş"}
        </button>
      </div>
      <div className="patientDiv">
        <button
          onClick={() => {
            setDoctor(false);
            setClear(!clear);
          }}
          className="button-86"
        >
          Hasta{register ? " Kayıt" : " Giriş"}
        </button>
      </div>
    </div>
  );
};
