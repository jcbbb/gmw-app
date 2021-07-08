import React from "react";
import api from "../../api";
import CheckIcon from "../icons/check";
import CloseIcon from "../icons/close";
import { toast } from "react-toastify";
import { useAsync } from "../../hooks/useAsync";
import { Link } from "react-router-dom";

function FriendRequests() {
  const { run, data: incoming } = useAsync();
  const { run: run2, data: outgoing } = useAsync();

  React.useEffect(() => {
    const getIncomingRequests = async () => {
      try {
        await run(api.friend.getIncomingRequests());
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    const getOutgoingRequests = async () => {
      try {
        await run2(api.friend.getOutgoingRequests());
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    Promise.all([getIncomingRequests(), getOutgoingRequests()]);
  }, [run2, run]);

  return (
    <div className="flex flex-col space-y-4">
      <section>
        <h2 className="text-lg font-bold text-gray-900">Incoming requests</h2>
        {incoming?.friend_requests.map(({ user }, index) => (
          <div className="flex py-4 rounded-lg overflow-hidden items-center" key={index}>
            <div className="w-14 overflow-hidden rounded-full">
              <img
                className="h-18 object-contain w-full"
                src={user.avatar.thumb.url}
                alt="friend thumb"
              />
            </div>
            <div className="ml-2">
              <Link to={`/users/${user.id}`}>
                <h3 className="font-bold text-gray-900 text-sm">
                  {user.first_name} {user.last_name}
                </h3>
              </Link>
            </div>
            <div className="ml-auto space-x-2">
              <button className="btn-primary py-2 px-4">
                <CheckIcon color="#fff" size="w-5 h-5" />
              </button>
              <button className="btn-secondary py-2 px-4">
                <CloseIcon color="#fff" size="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </section>
      <hr />
      <section>
        <h2 className="text-lg font-bold text-gray-900">Outgoing requests</h2>
        {outgoing?.friend_requests.map(({ user }, index) => (
          <div className="flex py-4 rounded-lg overflow-hidden items-center" key={index}>
            <div className="w-14 overflow-hidden rounded-full">
              <img
                className="h-18 object-contain w-full"
                src={user.avatar.thumb.url}
                alt="friend thumb"
              />
            </div>
            <div className="ml-2">
              <Link to={`/users/${user.id}`}>
                <h3 className="font-bold text-gray-900 text-sm">
                  {user.first_name} {user.last_name}
                </h3>
              </Link>
            </div>
            <button className="btn-outlined py-2 px-4 ml-auto">Cancel</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FriendRequests;
