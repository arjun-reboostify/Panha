import { FC, useState, FormEvent } from "react";
import { toast } from "react-toastify";
import TextFormField from "./shared/TextFormField";
import { noterAuth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

import { UserCredential } from "@firebase/auth-types";
import createUser from "../firebase/dbhelpers/createUser";
import GoogleAuthButton from "./shared/GoogleAuthButton";

const Register: FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

 

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== checkPassword) {
      toast.error("Passwords do not match!");
      setCheckPassword("");
      return;
    }
    noterAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.warning(
              <p className="text-gray-800">
                {error.message}{" "}
                <Link className="text-blue-600 underline" to="/login">
                  Click here to login
                </Link>
              </p>,
              {
                onClick: () => navigate("/login"),
              }
            );
        }
        console.log(error);
      })
      .then((value) => {
        let { additionalUserInfo, user } = value as UserCredential;
        if (additionalUserInfo?.isNewUser) {
          user?.updateProfile({
            displayName: fullname,
          });
          createUser({
            uid: user?.uid as string,
            email: user?.email as string,
            dp: user?.photoURL,
            fullname,
          });
        }
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900 px-2">
      <div className="max-w-xl w-full bg-white rounded shadow-inner border-2 border-gray-300 p-8">
        <header>
          <h1 className="text-4xl text-blue-500 font-bold mb-6">Panha</h1>
          <h3 className="text-xl font-semibold mb-1.5">Create Account</h3>
          <h6 className="">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </h6>
        </header>
        <main className="mt-6 mx-auto">
          <form onSubmit={onSubmit}>
            <TextFormField
              required
              label="Ful name"
              type="fullname"
              placeholder="arjun....."
              value={fullname}
              onChange={(event) => void setFullname(event.target.value)}
            />
            <TextFormField
              required
              label="Email"
              type="email"
              placeholder="akd@gmail.com"
              value={email}
              onChange={(event) => void setEmail(event.target.value)}
            />
            <TextFormField
              required
              label="Password"
              type="password"
              placeholder="your password"
              value={password}
              onChange={(event) => void setPassword(event.target.value)}
            />
            <TextFormField
              required
              label="Re-type Password"
              type="password"
              placeholder="Re-type Password"
              value={checkPassword}
              onChange={(event) => void setCheckPassword(event.target.value)}
            />
            <input
              className="w-full transition-colors hover:bg-blue-600 cursor-pointer rounded h-12 text-white font-medium text-base bg-blue-500"
              type="submit"
              value="Register"
            />
          </form>
          <div className="flex flex-row justify-between items-center gap-4 my-6">
            <Hr />
            <div className="font-medium text-gray-500">or</div>
            <Hr />
          </div>
          <div>
            <GoogleAuthButton />
          </div>
        </main>
      </div>
    </div>
  );
};

const Hr: FC = () => (
  <div className="h-0.5 bg-black bg-opacity-30 w-full"></div>
);

export default Register;
