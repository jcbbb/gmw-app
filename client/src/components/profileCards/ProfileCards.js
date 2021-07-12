import React from "react";
import api from "../../api";
import VisaIcon from "../icons/visa";
import MasterCardIcon from "../icons/mastercard";
import DiscoverIcon from "../icons/discover";
import AmericanExpressIcon from "../icons/american-express";
import { toast } from "react-toastify";
import { useAsync } from "../../hooks/useAsync";
import { useCard } from "../../hooks/useCard";
import { withProvider } from "../../utils/with-provider";
import { CardProvider } from "../../context/CardContext";
import { useMounted } from "../../hooks/useMounted";

const brands = {
  Visa: <VisaIcon viewBox="0 0 48 48" size="w-28 h-24" className="stroke-0" />,
  MasterCard: <MasterCardIcon viewBox="0 0 48 48" size="w-28 h-24" className="stroke-0" />,
  Discover: <DiscoverIcon viewBox="0 0 48 48" size="w-28 h-24" className="stroke-0" />,
  AmericanExpress: (
    <AmericanExpressIcon viewBox="0 0 48 48" size="w-28 h-24" className="stroke-0" />
  ),
};

function ProfileCards() {
  const { run } = useAsync();
  const { setUserCards, cards } = useCard();
  const isMounted = useMounted();

  React.useEffect(() => {
    const getUserCards = async () => {
      try {
        const { cards } = await run(api.card.getAll());
        if (isMounted()) {
          setUserCards(cards);
        }
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getUserCards();
  }, [run, setUserCards, isMounted]);

  return (
    <div className="max-w-lg">
      {cards?.length ? (
        <div className="flex flex-col space-y-4">
          {cards.map((card, index) => (
            <div className="flex items-center space-x-4 shadow-md rounded-lg px-2 py-1" key={index}>
              {brands[card.brand]}
              <div className="flex flex-col">
                <span className="text-gray-600 font-bold text-lg">**** **** **** {card.last4}</span>
                <span className="text-gray-500 text-sm">
                  {card.exp_month}/{card.exp_year}
                </span>
              </div>
            </div>
          ))}
          <button className="btn-primary mt-3 max-w-max">New card</button>
        </div>
      ) : (
        <div>
          <p className="text-gray-500">No cards yet</p>
          <button className="btn-primary mt-3">New card</button>
        </div>
      )}
    </div>
  );
}

export default withProvider(CardProvider)(ProfileCards);
