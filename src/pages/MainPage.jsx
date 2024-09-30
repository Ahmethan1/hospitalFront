/* eslint-disable react/prop-types */
import { Button } from "../component/Button";
import { Form } from "../component/Form";

export const MainPage = ({
  doctor,
  setDoctor,
  clear,
  setClear,
  register,
  setRegister,
  setData,
}) => {
  return (
    <div>
      <Button
        clear={clear}
        setClear={setClear}
        register={register}
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <Form
        setRegister={setRegister}
        register={register}
        doctor={doctor}
        setClear={setClear}
        clear={clear}
        setData={setData}
      />
    </div>
  );
};
