import React from "react";
import api from "../../api";
import Input from "../input/Input";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
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

  const onOauthCb = React.useCallback(
    async (res, provider, key) => {
      try {
        if (res.error) throw new Error(res.error);
        const token = res[key];
        const user = await run(api.social.login(provider, token));
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
        clientId="592213910014-cqgf512gj03in8c62u8o2b00te6n6f7j.apps.googleusercontent.com"
        onSuccess={(res) => onOauthCb(res, "gmail", "tokenId")}
        onFailure={(res) => onOauthCb(res, "gmail", "tokenId")}
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
      <FacebookLogin
        appId="290511525426479"
        callback={(res) => onOauthCb(res, "facebook", "accessToken")}
        onFailure={(res) => onOauthCb(res, "facebook", "accessToken")}
        cssClass="px-8 py-4 bg-white mt-4 shadow-md rounded-lg text-gray-700 w-full text-sm disabled:opacity-50 disabled:pointer-events-none"
        render={(props) => (
          <button onClick={props.onClick} disabled={props.isDisabled}>
            Continue with Facebook
          </button>
        )}
      />
    </div>
  );
}

export default Login;
