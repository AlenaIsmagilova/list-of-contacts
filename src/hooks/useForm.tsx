import { useState } from "react";

export interface IInputValues {
  password: string;
  token?: string;
  email: string;
  name?: string;
}

export interface IUseFormReturn {
  values: IInputValues;
  handleChange: (event: any) => void;
  setValues: (value: React.SetStateAction<IInputValues>) => void;
}

export const useForm = (inputValues: IInputValues): IUseFormReturn => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};
