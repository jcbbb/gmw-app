import React from "react";
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import { useUser } from "../../hooks/useUser";
import { Formiz, useForm } from "@formiz/core";

function ProfileGeneral() {
  const { user } = useUser();
  const generalForm = useForm();

  const onSubmit = (va) => console.log(va);

  const shippingAddress = React.useMemo(() => {
    const { street, apartment, country, city, postal_code } = user.shipping_address;
    return [country, city, street, apartment, postal_code].filter(Boolean).join(",");
  }, [user]);

  return (
    <div className="max-w-lg">
      <Formiz connect={generalForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={generalForm.submit} className="space-y-6">
          <Input name="first_name" label="Firstname" defaultValue={user.first_name} />
          <Input name="last_name" label="Lastname" defaultValue={user.last_name} />
          <Input name="phone_number" label="Phone" defaultValue={user.phone_number} />
          <Input name="email" label="Email" defaultValue={user.email} />
          <Textarea
            name="shipping_address"
            label="Shipping address"
            defaultValue={shippingAddress}
          />
          <button className="btn-primary w-full disabled:opacity-50 disabled:pointer-events-none">
            Update
          </button>
        </form>
      </Formiz>
    </div>
  );
}

export default ProfileGeneral;
