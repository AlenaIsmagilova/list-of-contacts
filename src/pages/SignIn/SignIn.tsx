import { Button, Input } from "@mui/material";
import { FC } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { signInThunk } from "../../services/actions/actions";
import styles from "./SignIn.module.css";

const SignIn: FC = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isLogedIn = useSelector((store: any) => store.userReducer.isLogedIn);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInThunk(values.email, values.password));
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
        Войти
      </Button>
    </form>
  );
};

export default SignIn;
