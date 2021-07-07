import React from "react";
import EventCard from "../../components/eventCard/EventCard";
import api from "../../api";
import Search from "../../components/search/Search";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
import { useUserEvent } from "../../hooks/useUserEvent";

function MyEvents() {
  const { run } = useAsync();
  const { openModal } = useModal();
  const { setUserEvents, events } = useUserEvent();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const getUserEvents = async () => {
      try {
        const { events } = await run(api.event.getUserEvents());
        setUserEvents(events);
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    getUserEvents();
  }, [run, setUserEvents]);

  const onChange = React.useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  const results = React.useMemo(() => {
    return events?.filter((event) => {
      return event.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, events]);

  return (
    <div className="container mx-auto max-w-7xl bg-white space-y-6 p-4 mt-12 xl:shadow-md">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
        <Search onChange={onChange} placeholder="Search events" />
        <button className="btn-primary py-4" onClick={() => openModal("newEvent")}>
          Add new event
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results?.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
