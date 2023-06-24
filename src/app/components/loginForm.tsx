import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPayload } from "../../types";
import useAuthContext from "@/hook/useAuth";
import ErrorMsg from "./errorMsg";
import NavigationButton from "./navigationButton";

function LoginForm() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { login } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ([userName, password].includes("")) {
      setError("All fields are required");
      return;
    }

    const userPayload: UserPayload = {
      userName,
      password,
    };

    try {
      await login(userPayload);
      router.push("/");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    resetValues();
  };

  const resetValues = () => {
    setUserName("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {error && <ErrorMsg msg={error} />}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-80">
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
        <div className="flex flex-col justify-center my-5">
          <button
            className="block w-full bg-blue-800 rounded-md text-white font-bold p-3"
            type="submit"
          >
            Sign in
          </button>
          <br />
          <NavigationButton
            name="Sign Up"
            color="bg-green-600"
            path="/signup"
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
