import React from "react";
import EventCard from "../eventCard/EventCard";
import api from "../../api";
import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";

function FriendsEventsList() {
  const { friend_id } = useParams();
  const { run, data } = useAsync();

  React.useEffect(() => {
    const getFriendsEvents = async () => {
      try {
        await run(api.friend.getFriendEvents(friend_id));
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getFriendsEvents();
  }, [friend_id, run]);

  return (
    <div className="bg-white rounded-lg shadow-md max-w-4xl w-full">
      {!data?.events.length ? (
        <div className="p-4 flex justify-center w-full">
          <h3 className="text-2xl font-bold text-gray-900">No events</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.events.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsEventsList;
