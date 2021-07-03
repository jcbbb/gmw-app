import React from "react";
import DotsIcon from "../icons/dots";
import { useModal } from "../../hooks/useModal";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import api from "../../api";

function EventCard({ event }) {
  const { openModal, closeModal } = useModal();
  const { run } = useAsync();

  const onDelete = React.useCallback(async () => {
    try {
      await run(api.event.deleteEvent(event.id));
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  }, [event, run]);

  return (
    <div className="p-4 shadow-md rounded-lg">
      <div className="max-w-full h-40 overflow-hidden rounded-xl">
        <img
          className="w-full max-h-full object-cover"
          src="https://i.pravatar.cc/400"
          alt="event thumb"
        />
      </div>
      <div className="flex mt-2 justify-between items-center">
        <h3 className="text-purple-600 font-bold text-lg">{event.title}</h3>
        <details className="relative">
          <summary className="cursor-pointer">
            <DotsIcon color="text-gray-400" size="w-5 h-5" />
          </summary>
          <div className="dropdown max-w-max right-0 bottom-full mb-2">
            <button
              className="block p-3 w-36 text-gray-600 text-sm text-left bg-white hover:bg-gray-50 duration-200"
              onClick={() => openModal("eventEdit")}
            >
              Edit
            </button>
            <button
              className="block p-3 w-full text-red-500 text-sm text-left bg-white hover:bg-gray-50 duration-200"
              onClick={() =>
                openModal("confirmation", {
                  heading: "Delete event",
                  text: "Are you sure you want to delete this event with no option of recovery?",
                  onCancel: closeModal,
                  onConfirm: onDelete,
                })
              }
            >
              Delete
            </button>
          </div>
        </details>
      </div>
      <span className="text-gray-500 text-xs">10 days left</span>
    </div>
  );
}

export default EventCard;
