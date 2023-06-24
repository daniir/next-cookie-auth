import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserDto } from "../../types";
import ErrorMsg from "./errorMsg";
import NavigationButton from "./navigationButton";
import { toast } from "react-hot-toast";

function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ([firstName, lastName, email, userName, password].includes("")) {
      setError("All fields are required");
      return;
    };

    const userPayload: UserDto = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };

    try {
      const { data: { message } } = await axios.post("/api/auth/signup/", userPayload);
      toast.success(message, {
        duration: 5000,
        position: 'top-right'
      });
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error('Something went wrong, try again', {
        duration: 5000,
        position: 'top-right'
      });
    }
    resetValues();
  };

  const resetValues = () => {
    setFirstName("");
    setlastName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {error && <ErrorMsg msg={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            className="border-2 border-slate-600 text-center rounded p-2"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="border-2 border-slate-600 text-center rounded p-2"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <input
            className="border-2 border-slate-600 text-center rounded p-2 mb-2"
            type="email"
            placeholder="user@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-slate-600 text-center rounded p-2 mb-2"
            type="text"
            placeholder="User name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="border-2 border-slate-600 text-center rounded p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between my-5">
          <button
            className="block w-full bg-green-600 rounded-md text-white font-bold p-3 mr-2"
            type="submit"
          >
            Register
          </button>
          <NavigationButton 
            name="Cancel"
            color="bg-red-600"
            path="/login"
          />
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
