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

  return (
    <div className="container mx-auto max-w-7xl p-4 shadow-md bg-white space-y-6">
      <div className="flex justify-between items-center">
        <Search />
        <button className="btn-primary py-4" onClick={() => openModal("newEvent")}>
          Add new event
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events?.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
