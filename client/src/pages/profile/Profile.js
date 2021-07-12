import React from "react";
import api from "../../api";
import ProfileIcon from "../../components/icons/profile";
import CoinIcon from "../../components/icons/coin";
import CashIcon from "../../components/icons/cash";
import CreditCardIcon from "../../components/icons/credit-card";
import TruckIcon from "../../components/icons/truck";
import QuestionMarkIcon from "../../components/icons/question-mark";
import CameraIcon from "../../components/icons/camera";
import { useUser } from "../../hooks/useUser";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { useWallet } from "../../hooks/useWallet";
import { NavLink, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../../components/Routes";
import { WalletProvider } from "../../context/WalletContext";
import { withProvider } from "../../utils/with-provider";

function Profile({ routes }) {
  const { user } = useUser();
  const { run } = useAsync();
  const { setWallet, wallet } = useWallet();
  const [preview, setPreview] = React.useState();

  React.useEffect(() => {
    const getWallet = async () => {
      try {
        const { wallet } = await run(api.wallet.getWallet());
        setWallet(wallet);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getWallet();
  }, [run, setWallet]);

  const onChange = React.useCallback(
    async (e) => {
      try {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("avatar", file);
        await run(api.profile.uploadAvatar(user.id, formData));
        const url = URL.createObjectURL(file);
        setPreview(url);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [setPreview, user, run]
  );

  return (
    <div className="flex justify-between max-w-7xl mx-auto mt-12 space-x-4 items-start">
      <div className="max-w-sm w-full rounde-lg shadow-md overflow-hidden p-4 space-y-4 flex flex-col items-center">
        <div className="w-32 h-32 min-w-min rounded-full overflow-hidden flex items-center justify-center relative">
          <input
            type="file"
            className="hidden"
            id="profile_photo"
            accept="image/*"
            name="avatar"
            onChange={onChange}
          />
          <label
            htmlFor="profile_photo"
            className="absolute flex items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black w-full h-full bg-opacity-0 group hover:bg-opacity-60 duration-300 cursor-pointer"
          >
            <CameraIcon
              color="text-transparent"
              className="stroke-current group-hover:text-gray-200 duration-300"
            />
          </label>
          <img
            className="max-h-full object-cover w-full h-full"
            src={preview || user?.avatar.thumb.url || DEFAULT_GIFT_THUMB_URL}
            alt="friend thumb"
          />
        </div>
        <h2 className="text-gray-900 font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
          {user.last_name} {user.first_name}
        </h2>
        <div className="flex justify-between w-full">
          <span className="text-gray-500">Balance:</span>
          <span className="text-gray-900 font-bold">${wallet?.balance || 0}</span>
        </div>
        <ul className="w-full space-y-4">
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/general"
              activeClassName="bg-purple-600 text-white"
            >
              <ProfileIcon color="currentColor" size="w-5 h-5" />

              <span className="ml-2">General</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/contributions"
              activeClassName="bg-purple-600 text-white"
            >
              <CoinIcon color="currentColor" size="w-5 h-5" />
              <span className="ml-2">My contributions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/cards"
              activeClassName="bg-purple-600 text-white"
            >
              <CreditCardIcon color="currentColor" size="w-5 h-5" />
              <span className="ml-2">My cards</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/payments"
              activeClassName="bg-purple-600 text-white"
            >
              <CashIcon color="currentColor" size="w-5 h-5" />
              <span className="ml-2">Payments & Wallet</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/shipping"
              activeClassName="bg-purple-600 text-white"
            >
              <TruckIcon color="currentColor" size="w-5 h-5" />
              <span className="ml-2">Shipping address</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="flex h-12 px-4 items-center bg-gray-50 rounded-lg"
              to="/profile/help"
              activeClassName="bg-purple-600 text-white"
            >
              <QuestionMarkIcon color="currentColor" size="w-5 h-5" />
              <span className="ml-2">Help</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-md max-w-4xl w-full p-4">
        <Switch>
          {routes?.map((route, i) => (
            <RouteWithSubRoutes {...route} key={i} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default withProvider(WalletProvider)(Profile);
