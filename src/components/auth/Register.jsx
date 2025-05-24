import { useState } from "react";
import {} from "../../api/api";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("log with register comp", { name, email, password });

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col w-xs gap-4">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="border"
          type="text"
          placeholder="Enter name"
        />
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
        <NavLink to={"/login"}>or login</NavLink>
      </form>
    </div>
  );
};
