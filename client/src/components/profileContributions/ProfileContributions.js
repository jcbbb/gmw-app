import React from "react";
import api from "../../api";
import ProfileIcon from "../icons/profile";
import DollarIcon from "../icons/dollar";
import { withProvider } from "../../utils/with-provider";
import { DonationProvider } from "../../context/DonationContext";
import { useDonation } from "../../hooks/useDonation";
import { useAsync } from "../../hooks/useAsync";
import { useMounted } from "../../hooks/useMounted";
import { toast } from "react-toastify";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function ProfileContributions() {
  const { donations, setDonations } = useDonation();
  const { run } = useAsync();
  const isMounted = useMounted();

  React.useEffect(() => {
    const getDonations = async () => {
      try {
        const { donations } = await run(api.donation.getAll());
        if (isMounted()) {
          setDonations(donations);
        }
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getDonations();
  }, [run, setDonations, isMounted]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {donations?.length ? (
        donations.map((donation) => (
          <div className="flex space-x-2 items-center">
            <div className="w-40 h-28 min-w-min overflow-hidden rounded-xl">
              <img
                className="max-h-full object-cover w-full"
                src={donation.gift.photo.url || DEFAULT_GIFT_THUMB_URL}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-purple-600 text-xl">{donation.gift.name}</h3>
              <div className="flex items-center space-x-1">
                <ProfileIcon size="h-5 w-5" color="text-purple-600" />
                <span className="text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {donation.user.last_name} {donation.user.first_name}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarIcon size="h-5 w-5" color="text-purple-600" />
                <span className="text-gray-500">{donation.amount} USD</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contributions yet...</p>
      )}
    </div>
  );
}

export default withProvider(DonationProvider)(ProfileContributions);
