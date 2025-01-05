import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../state/useUserStore.ts";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const isLogined = useUserStore((state) => state.isLogined);

  const loginUser = useUserStore((state) => state.loginUser);

  const submit = async (data) => {
    const response = await loginUser(data.userName, data.password);
    if (response.error) {
      setError(response.message);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogined) {
      navigate("/music_converter");
    }
  }, [isLogined, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Войти в систему</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Имя пользователя
          </label>
          <input
            autoComplete="username"
            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            id="userName"
            placeholder="Введите ваше имя пользователя"
            {...register("userName", {
              required: "Имя пользователя обязательно",
            })}
          />
          {errors.userName && (
            <div className="invalid-feedback">{errors.userName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            autoComplete="current-password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Пароль обязателен",
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
          {error && (
            <div className="alert alert-danger mt-3 text-center" role="alert">
              {error}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-secondary w-100">
          Войти
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/register">Нету аккаунта? Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;
