import { Input, Button } from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./SignUp.module.css";
import { signUpThunk } from "../../services/actions/actions";

const SignUp: FC = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isLogedIn = useSelector((store: any) => store.userReducer.isLogedIn);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpThunk(values.email, values.password));
  };

  if (isLogedIn) {
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
      <p className={styles.text}>
        Уже есть аккаунт?&nbsp;<Link to="/login">Войти</Link>
      </p>
    </form>
  );
};

export default SignUp;
