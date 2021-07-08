import React from "react";
import api from "../../api";
import Input from "../input/Input";
import GoogleLogin from "react-google-login";
import { useAsync } from "../../hooks/useAsync";
import { Formiz, useForm } from "@formiz/core";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../hooks/useModal";

function Login() {
  const loginForm = useForm();
  const { run, isLoading } = useAsync();
  const { login } = useUser();
  const { closeModal } = useModal();

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const { username, password } = values;
        const user = await run(api.user.login(username, password));

        login(user);
        closeModal();
        toast("Successfully logged in!", {
          type: "success",
        });
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [run, login, closeModal]
  );

  const responseGoogle = (response) => console.log(response);
  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg">
      <h3 className="text-lg font-bold text-gray-900">Login</h3>
      <Formiz connect={loginForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={loginForm.submit} className="space-y-6">
          <Input name="username" label="Username" required="This field is required" />
          <Input
            name="password"
            type="password"
            label="Password"
            required="This field is required"
          />
          <button
            className="btn-primary w-full disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
      </Formiz>
      <span className="text-gray-500 text-sm text-center block">or</span>
      <GoogleLogin
        clientId="592213910014-h007lg9g3i5h9ejhc3r4k3mohfis3g2j.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
      <button className="px-8 py-4 bg-white shadow-md rounded-lg text-gray-700 w-full text-sm">
        Continue with Google
      </button>
      <button className="px-8 py-4 bg-white shadow-md rounded-lg text-gray-700 w-full text-sm">
        Continue with Facebook
      </button>
    </div>
  );
}

export default Login;
