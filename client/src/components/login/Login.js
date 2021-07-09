import React from "react";
import api from "../../api";
import Input from "../input/Input";
import GoogleLogin from "react-google-login";
import Indeterminate from "../indeterminate/Indeterminate";
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

  const onGoogleResponse = React.useCallback(
    async (response) => {
      try {
        if (response.error) throw new Error(response.error);
        const token = response.tokenId;
        const user = await run(api.social.login("gmail", token));
        login(user);
        closeModal();
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [login, run, closeModal]
  );

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg relative overflow-hidden">
      {isLoading ? <Indeterminate /> : null}
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
        // clientId="592213910014-h007lg9g3i5h9ejhc3r4k3mohfis3g2j.apps.googleusercontent.com"
        clientId="592213910014-cqgf512gj03in8c62u8o2b00te6n6f7j.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onGoogleResponse}
        onFailure={onGoogleResponse}
        cookiePolicy={"single_host_origin"}
        render={(props) => (
          <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="px-8 py-4 bg-white shadow-md rounded-lg text-gray-700 w-full text-sm disabled:opacity-50 disabled:pointer-events-none"
          >
            Continue with Google
          </button>
        )}
      />
      <button className="px-8 py-4 bg-white shadow-md rounded-lg text-gray-700 w-full text-sm">
        Continue with Facebook
      </button>
    </div>
  );
}

export default Login;
