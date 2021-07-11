import React from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useAsync } from "../../hooks/useAsync";
import { useCard } from "../../hooks/useCard";
import { withProvider } from "../../utils/with-provider";
import { CardProvider } from "../../context/CardContext";
import { useMounted } from "../../hooks/useMounted";

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
        cards.map((card) => <h1>{JSON.stringify(card)}</h1>)
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
