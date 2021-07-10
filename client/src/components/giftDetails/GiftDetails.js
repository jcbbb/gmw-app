import React from "react";
import ClockIcon from "../icons/clock";
import CoinIcon from "../icons/coin";
import CashIcon from "../icons/cash";
import DotsIcon from "../icons/dots";
import api from "../../api";
import { useModal } from "../../hooks/useModal";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { diffInDays } from "../../utils/date-fns";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useHistory } from "react-router-dom";
import { uniqueBy } from "../../utils/unique";

function GiftDetails({ event, isFriend }) {
  const { openModal, closeModal } = useModal();
  const { run } = useAsync();
  const { gift_id } = useParams();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef();
  const history = useHistory();

  const gift = React.useMemo(() => {
    return event?.gifts.find((gift) => gift.id === parseInt(gift_id, 10));
  }, [gift_id, event]);

  const onDelete = React.useCallback(async () => {
    try {
      await run(api.gift.deleteOne(gift?.id));
      toast("Successfully deleted the gift", { type: "success" });
      history.goBack();
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  }, [gift, run, history]);

  const daysLeft = React.useMemo(() => {
    const days = diffInDays(event?.start_date, event?.end_date);
    if (days < 0) return "Expired";
    return `${days} days`;
  }, [event]);

  const handleToggle = (ev) => {
    ev.preventDefault();
    setMenuOpen((open) => !open);
  };

  useClickOutside(menuRef, () => setMenuOpen(false));

  const donations = React.useMemo(() => {
    return gift?.donations.length ? uniqueBy(gift.donations, "id") : [];
  }, [gift]);

  if (gift) {
    return (
      <div className="bg-white rounded-lg shadow-md max-w-4xl w-full">
        <div className="relative rounded-full overflow-hidden">
          <div
            className="absolute w-1/3 bg-red-700 left-0 h-6 flex items-center rounded-r-full"
            style={{ width: gift?.total_fund_percentage + "%", minWidth: "38px" }}
          >
            <span className="text-white text-sm absolute right-2">
              {gift?.total_fund_percentage}%
            </span>
          </div>
          <div className="w-full bg-red-100 h-6"></div>
        </div>
        <div className="container p-8 flex items-center space-x-4">
          <div className="w-1/2 overflow-hidden rounded-xl mr-2">
            <img
              className="h-96 object-contain w-full"
              src={gift?.photo.url || DEFAULT_GIFT_THUMB_URL}
              alt="gift thumb"
            />
          </div>
          <div className="w-1/2 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl text-purple-600">{gift?.name}</h2>
              {!isFriend ? (
                <details className="relative" open={menuOpen} ref={menuRef}>
                  <summary className="cursor-pointer" onClick={handleToggle}>
                    <DotsIcon color="text-gray-400" size="w-5 h-5" />
                  </summary>

                  <div className="dropdown max-w-max right-0 top-full mt-2">
                    <button
                      className="block p-3 w-36 text-gray-600 text-sm text-left bg-white hover:bg-gray-50 duration-200"
                      onClick={() => openModal("giftEdit", { gift })}
                    >
                      Edit
                    </button>
                    <button
                      className="block p-3 w-full text-red-500 text-sm text-left bg-white hover:bg-gray-50 duration-200"
                      onClick={() =>
                        openModal("confirmation", {
                          heading: "Delete gift",
                          text: "Are you sure you want to delete this gift with no option of recovery?",
                          onCancel: closeModal,
                          onConfirm: onDelete,
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </details>
              ) : null}
            </div>
            <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
              <ClockIcon color="text-purple-600" />
              <span className="font-bold text-lg text-purple-600">{daysLeft}</span>
            </div>
            <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
              <CoinIcon color="text-purple-600" />
              <span className="font-bold text-lg text-purple-600">
                {gift.total_fund_percentage}% funded
              </span>
            </div>
            <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
              <CashIcon color="text-purple-600" />
              <span className="font-bold text-lg text-purple-600">
                {gift.total_fund}$ / {gift.price}$
              </span>
            </div>
            <button
              className="btn-primary w-full"
              onClick={() => openModal("contribute", { gift })}
            >
              Contribute
            </button>
          </div>
        </div>
        {!isFriend ? (
          <div className="px-8 py-4">
            <h2 className="text-xl font-bold text-gray-900">Participants</h2>
            {donations.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-4">
                {donations.map(({ user }) => (
                  <div className="max-w-full h-36 overflow-hidden rounded-xl relative group cursor-pointer">
                    <img
                      className="w-full max-h-full object-cover"
                      src={user.avatar.url || DEFAULT_GIFT_THUMB_URL}
                      alt="event thumb"
                    />
                    <div className="absolute bg-black w-full h-full top-0 z-10 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                      <p className="text-white opacity-0 group-hover:opacity-100">
                        {user.first_name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-1">No donations yet</p>
            )}
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

export default GiftDetails;
