import { useState } from "react";
import { loginApi } from "../../api/api";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi({ email, password });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/books", { replace: true });
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col w-xs gap-4">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="border"
          type="text"
          placeholder="Enter email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="border"
          type="text"
          placeholder="Enter password"
        />
        <button className="cursor-pointer border" type="submit">
          Send
        </button>
        <NavLink to={"/register"}>or register</NavLink>
      </form>
    </div>
  );
};
