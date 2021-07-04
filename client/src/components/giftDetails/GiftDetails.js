import React from "react";
import ClockIcon from "../icons/clock";
import CoinIcon from "../icons/coin";
import CashIcon from "../icons/cash";
import DotsIcon from "../icons/dots";
import { useModal } from "../../hooks/useModal";
import { useAsync } from "../../hooks/useAsync";
import api from "../../api";
import { toast } from "react-toastify";

function GiftDetails({ gift }) {
  const { openModal, closeModal } = useModal();
  const { run } = useAsync();

  const onDelete = React.useCallback(async () => {
    try {
      await run(api.gift.deleteOne(gift.id));
    } catch (err) {
      toast(err.message);
    }
  }, [gift, run]);

  return (
    <div className="max-w-3xl bg-white rounded-lg shadow-md">
      <div className="relative rounded-full overflow-hidden">
        <div className="absolute w-1/3 bg-red-700 left-0 h-6 flex items-center rounded-r-full">
          <span className="text-white text-sm absolute right-2">30%</span>
        </div>
        <div className="w-full bg-red-100 h-6"></div>
      </div>
      <div className="container p-8 flex items-center space-x-4">
        <div className="w-1/2 overflow-hidden rounded-xl mr-2">
          <img
            className="w-full max-h-full object-cover"
            src="https://i.pravatar.cc/400"
            alt="event thumb"
          />
        </div>
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl text-purple-600">Nike</h2>
            <details className="relative">
              <summary className="cursor-pointer">
                <DotsIcon color="text-gray-400" size="w-5 h-5" />
              </summary>

              <div className="dropdown max-w-max right-0 top-full mt-2">
                <button
                  className="block p-3 w-36 text-gray-600 text-sm text-left bg-white hover:bg-gray-50 duration-200"
                  onClick={() => openModal("giftEdit")}
                >
                  Edit
                </button>
                <button
                  className="block p-3 w-full text-red-500 text-sm text-left bg-white hover:bg-gray-50 duration-200"
                  onClick={() =>
                    openModal("confirmation", {
                      heading: "Delete gift",
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
          <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
            <ClockIcon color="text-purple-600" />
            <span className="font-bold text-lg text-purple-600">15 days</span>
          </div>
          <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
            <CoinIcon color="text-purple-600" />
            <span className="font-bold text-lg text-purple-600">30% funded</span>
          </div>
          <div className="bg-purple-100 flex items-center p-4 rounded-lg space-x-2 max-w-max">
            <CashIcon color="text-purple-600" />
            <span className="font-bold text-lg text-purple-600">150$ / 500$</span>
          </div>
          <button className="btn-primary w-full" onClick={() => openModal("contribute")}>
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftDetails;
