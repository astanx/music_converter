import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../state/useUserStore.ts";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerUser = useUserStore((state) => state.registerUser);
  const isLogined = useUserStore((state) => state.isLogined);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogined) {
      navigate("/music_converter");
    }
  }, [isLogined, navigate]);

  const submit = (data) => {
    registerUser(data.userName, data.password);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Зарегистрироваться</h2>
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
          Зарегистрироваться
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/login">Есть аккаунт? Войти</Link>
      </div>
    </div>
  );
};

export default Register;
