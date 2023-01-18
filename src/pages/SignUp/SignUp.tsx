import { Input, Button } from "@mui/material";
import { Redirect } from "react-router-dom";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./SignUp.module.css";
import { SignUpThunk } from "../../services/actions/actions";

const SignUp: FC = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const token = useSelector((store: any) => store.userReducer.accessToken);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SignUpThunk(values.email, values.password));
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="email"
        placeholder="Введите логин"
        onChange={handleChange}
        value={values.email}
      />
      <Input
        name="password"
        placeholder="Введите пароль"
        onChange={handleChange}
        value={values.password}
      />
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default SignUp;
