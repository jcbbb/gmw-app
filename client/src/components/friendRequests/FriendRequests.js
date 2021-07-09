import React from "react";
import api from "../../api";
import CheckIcon from "../icons/check";
import CloseIcon from "../icons/close";
import { toast } from "react-toastify";
import { useAsync } from "../../hooks/useAsync";
import { Link } from "react-router-dom";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";
import { useUser } from "../../hooks/useUser";

function FriendRequests() {
  const {
    setIncomingRequests,
    setOutgoingRequests,
    incomingRequests,
    outgoingRequests,
    acceptIncoming,
    deleteOutgoing,
    deleteIncoming,
  } = useUser();
  const { run } = useAsync();

  React.useEffect(() => {
    const getIncomingRequests = async () => {
      try {
        const { friend_requests } = await run(api.friend.getIncomingRequests());
        setIncomingRequests(friend_requests);
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    const getOutgoingRequests = async () => {
      try {
        const { friend_requests } = await run(api.friend.getOutgoingRequests());
        setOutgoingRequests(friend_requests);
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    Promise.all([getIncomingRequests(), getOutgoingRequests()]);
  }, [run, setIncomingRequests, setOutgoingRequests]);

  const acceptFriend = React.useCallback(
    async (id) => {
      try {
        acceptIncoming(id);
        await run(api.friend.acceptFriendRequest(id));
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [run, acceptIncoming]
  );

  const deleteFriendRequeest = React.useCallback(
    async (id) => {
      try {
        deleteOutgoing(id);
        await run(api.friend.deleteFriendRequest(id));
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [deleteOutgoing, run]
  );

  const declineFriendRequest = React.useCallback(
    async (id) => {
      try {
        deleteIncoming(id);
        await run(api.friend.declineFriendRequest(id));
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [deleteIncoming, run]
  );

  return (
    <div className="flex flex-col space-y-4">
      <section>
        <h2 className="text-lg font-bold text-gray-900">Incoming requests</h2>
        {incomingRequests?.map((request, index) => (
          <div className="flex py-4 rounded-lg overflow-hidden items-center" key={index}>
            <div className="w-14 overflow-hidden rounded-full">
              <img
                className="h-18 object-contain w-full"
                src={request.user.avatar.thumb.url || DEFAULT_GIFT_THUMB_URL}
                alt="friend thumb"
              />
            </div>
            <div className="ml-2">
              <Link to={`/users/${request.user.id}`}>
                <h3 className="font-bold text-gray-900 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {request.user.first_name} {request.user.last_name}
                </h3>
              </Link>
            </div>
            <div className="ml-auto space-x-2">
              <button className="btn-primary py-2 px-4" onClick={() => acceptFriend(request.id)}>
                <CheckIcon color="#fff" size="w-5 h-5" />
              </button>
              <button
                className="btn-secondary py-2 px-4"
                onClick={() => declineFriendRequest(request.id)}
              >
                <CloseIcon color="#fff" size="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </section>
      <hr />
      <section>
        <h2 className="text-lg font-bold text-gray-900">Outgoing requests</h2>
        {outgoingRequests?.map((request, index) => (
          <div className="flex py-4 rounded-lg overflow-hidden items-center" key={index}>
            <div className="w-14 overflow-hidden rounded-full">
              <img
                className="h-18 object-contain w-full"
                src={request.user.avatar.thumb.url || DEFAULT_GIFT_THUMB_URL}
                alt="friend thumb"
              />
            </div>
            <div className="ml-2">
              <Link to={`/users/${request.user.id}`}>
                <h3 className="font-bold text-gray-900 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {request.user.first_name} {request.user.last_name}
                </h3>
              </Link>
            </div>
            <button
              className="btn-outlined py-2 px-4 ml-auto"
              onClick={() => deleteFriendRequeest(request.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FriendRequests;
