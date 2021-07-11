import React from "react";
import Input from "../input/Input";
import { useUser } from "../../hooks/useUser";
import { useForm, Formiz } from "@formiz/core";

function Shipping() {
  const shippingForm = useForm();
  const onSubmit = (va) => console.log(va);
  const { user } = useUser();
  return (
    <div className="max-w-lg">
      <Formiz connect={shippingForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={shippingForm.submit} className="space-y-6">
          <Input name="street" label="Street" defaultValue={user.shipping_address.street} />
          <Input
            name="apartment"
            label="Apartment"
            defaultValue={user.shipping_address.apartment}
          />
          <Input name="country" label="Country" defaultValue={user.shipping_address.country} />
          <Input name="city" label="City" defaultValue={user.shipping_address.city} />
          <Input
            name="postal_code"
            label="Postal code"
            defaultValue={user.shipping_address.postal_code}
          />
          <Input
            type="number"
            name="phone_number"
            label="Phone number"
            defaultValue={user.shipping_address.phone_number}
          />
          <button className="btn-primary w-full disabled:opacity-50 disabled:pointer-events-none">
            Update
          </button>
        </form>
      </Formiz>
    </div>
  );
}

export default Shipping;
