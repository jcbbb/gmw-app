import React from "react";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";
import { useWallet } from "../../hooks/useWallet";

function ProfilePayments() {
  const { wallet } = useWallet();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {wallet.transaction_histories.length ? (
          wallet.transaction_histories.map((transaction) => (
            <div className="shadow-md rounded-lg flex items-center p-4">
              <div className="w-24 h-16 min-w-min overflow-hidden rounded-lg">
                <img
                  src={transaction.gift?.photo?.url || DEFAULT_GIFT_THUMB_URL}
                  alt=""
                  className="max-h-full object-cover w-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-600">
                  {transaction.category} {transaction.gift ? `for ${transaction.gift.name}` : null}
                </h3>
                <span className="text-gray-500 text-sm">
                  {new Date(transaction.created_at).toLocaleString("ru-RU")}
                </span>
              </div>
              <span className="text-gray-500 text-sm ml-auto">{transaction.amount}$</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No transactions yet...</p>
        )}
      </div>
      <button className="btn-primary">Refill</button>
    </div>
  );
}

export default ProfilePayments;
