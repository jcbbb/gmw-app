import React from "react";
import DotsIcon from "../icons/dots";
import api from "../../api";
import { useModal } from "../../hooks/useModal";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useUserEvent } from "../../hooks/useUserEvent";
import { diffInDays } from "../../utils/date-fns";
import { withRouter } from "react-router-dom";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function EventCard({ event, match }) {
  const { openModal, closeModal } = useModal();
  const { run, isLoading } = useAsync();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { deleteOne } = useUserEvent();
  const menuRef = React.useRef();

  const handleToggle = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setMenuOpen((open) => !open);
  };

  useClickOutside(menuRef, () => setMenuOpen(false));

  const onDelete = React.useCallback(async () => {
    try {
      await run(api.event.deleteOne(event.id));
      deleteOne(event.id);
      closeModal();
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  }, [event, run, deleteOne, closeModal]);

  const daysLeft = React.useMemo(() => {
    const days = diffInDays(event?.start_date, event?.end_date);
    if (days < 0) return "Expired";
    return `${days} days left`;
  }, [event]);

  return (
    <Link
      className="p-4 shadow-md rounded-lg"
      to={`${match.url}/${event?.id}/gifts/${event.gifts[0].id}`}
    >
      <div className="max-w-full h-40 overflow-hidden rounded-xl">
        <img
          className="w-full max-h-full object-cover"
          src={event?.photo.url || DEFAULT_GIFT_THUMB_URL}
          alt="event thumb"
        />
      </div>

      <div className="flex mt-2 justify-between items-center">
        <h3 className="text-purple-600 font-bold text-lg">{event?.title}</h3>
        <details className="relative" open={menuOpen} ref={menuRef}>
          <summary className="cursor-pointer" onClick={handleToggle}>
            <DotsIcon color="text-gray-400" size="w-5 h-5" />
          </summary>
          <div className="dropdown max-w-max right-0 bottom-full mb-2">
            <button
              className="block p-3 w-36 text-gray-600 text-sm text-left bg-white hover:bg-gray-50 duration-200"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                openModal("eventEdit", { event });
              }}
            >
              Edit
            </button>
            <button
              disabled={isLoading}
              className="block p-3 w-full text-red-500 text-sm text-left bg-white hover:bg-gray-50 duration-200 disabled:opacity-50 disabled:pointer-events-none"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                openModal("confirmation", {
                  heading: "Delete event",
                  text: "Are you sure you want to delete this event with no option of recovery?",
                  onCancel: closeModal,
                  onConfirm: onDelete,
                });
              }}
            >
              Delete
            </button>
          </div>
        </details>
      </div>
      <span className="text-gray-500 text-xs">{daysLeft}</span>
    </Link>
  );
}

export default withRouter(EventCard);
