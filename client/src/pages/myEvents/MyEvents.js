import React from "react";
import EventCard from "../../components/eventCard/EventCard";
import api from "../../api";
import Search from "../../components/search/Search";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";

function MyEvents() {
  const { data, run } = useAsync();
  const { openModal } = useModal();

  React.useEffect(() => {
    const getUserEvents = async () => {
      try {
        await run(api.event.getUserEvents());
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    };

    getUserEvents();
  }, [run]);

  return (
    <div className="container mx-auto max-w-7xl px-4 xl:px-0">
      <div className="flex justify-between items-center">
        <Search />
        <button className="btn-primary py-4" onClick={() => openModal("newEvent")}>
          Add new event
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
