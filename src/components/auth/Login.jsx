import { loginApi } from "../../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);
      const token = response.data.token;
      const userData = response.data.user || response.data;

      login(token, userData);
      navigate("/books", { replace: true });
      reset();
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="mb-4 text-xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-64 gap-4"
      >
        <input
          {...register("email", { required: "Email is required" })}
          className="border p-2"
          type="email"
          placeholder="Enter email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password", { required: "Password is required" })}
          className="border p-2"
          type="password"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          className="cursor-pointer border p-2 bg-gray-100 hover:bg-gray-200"
          type="submit"
          value="Send"
        />

        <NavLink className="text-blue-500 underline text-sm" to="/register">
          or register
        </NavLink>
      </form>
    </div>
  );
};
