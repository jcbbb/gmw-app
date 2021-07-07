import React from "react";
import Search from "../../components/search/Search";
import FriendEventCard from "../../components/friendEventCard/FriendEventCard";
import api from "../../api";
import { toast } from "react-toastify";
import { useFriendEvent } from "../../hooks/useFriendEvent";
import { withRouter } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";

function FriendsEvents() {
  const { run } = useAsync();
  const [query, setQuery] = React.useState("");
  const { setFriendsEvents, friendsEvents } = useFriendEvent();

  const onChange = React.useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  React.useEffect(() => {
    const getFriendsEvents = async () => {
      try {
        const { events } = await run(api.friend.getFriendsEvents());
        setFriendsEvents(events);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getFriendsEvents();
  }, [run, setFriendsEvents]);

  const results = React.useMemo(() => {
    return friendsEvents?.filter((event) => {
      return event.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, friendsEvents]);

  return (
    <div className="container mx-auto max-w-7xl shadow-md bg-white space-y-6 p-4 mt-12 xl:shadow-md">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
        <Search onChange={onChange} placeholder="Search events" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results?.map((event, index) => (
          <FriendEventCard event={event} key={index} />
        ))}
      </div>
    </div>
  );
}

export default withRouter(FriendsEvents);
