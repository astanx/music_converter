import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../state/useUserStore.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginUser = useUserStore((state) => state.loginUser);
  const isLogined = useUserStore((state) => state.isLogined);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogined) {
      navigate("/music_converter");
    }
  }, [isLogined]);

  const submit = (data) => {
    // проверка наличия пользователя
    const userId = "absd1";

    loginUser(data.userName, userId);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Войти в систему</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Имя пользователя
          </label>
          <input
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
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
