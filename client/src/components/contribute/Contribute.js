import React from "react";
import Textarea from "../textarea/Textarea";
import Select from "../select/Select";
import Input from "../input/Input";
import { Formiz, useForm } from "@formiz/core";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function Contribute({ gift }) {
  const contributeForm = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg">
      <div className="max-w-full h-40 overflow-hidden rounded-xl">
        <img
          className="w-full max-h-full object-cover"
          src={gift?.photo.url || DEFAULT_GIFT_THUMB_URL}
          alt="event thumb"
        />
      </div>
      <h2 className="font-bold text-xl text-purple-600 text-center">{gift?.name}</h2>
      <Formiz connect={contributeForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={contributeForm.submit} className="space-y-6">
          <Input name="name" type="text" label="Your name" defaultValue="Jane Doe" />
          <Select name="amount" defaultValue="10" label="Amount">
            <option value="10">10$</option>
            <option value="20">20$</option>
            <option value="30">30$</option>
          </Select>
          <Textarea name="message" label="Message" rows="3" defaultValue="Your message" />
          <div className="space-y-2">
            <button className="btn-primary w-full">Contribute from balance</button>
            <button className="btn-secondary w-full">Contribute with card</button>
          </div>
        </form>
      </Formiz>
    </div>
  );
}

export default Contribute;
