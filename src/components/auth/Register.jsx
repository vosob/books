import { registerApi } from "../../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerApi(data);
      navigate("/login", { replace: true });

      reset();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="mb-4 text-xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-64 gap-4"
      >
        <input
          {...register("name", { required: "Name is required" })}
          className="border p-2"
          type="text"
          placeholder="Enter name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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

        <NavLink className="text-blue-500 underline text-sm" to="/login">
          or login
        </NavLink>
      </form>
    </div>
  );
};
