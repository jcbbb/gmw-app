import React from "react";
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import { Formiz, useForm } from "@formiz/core";

function EventEdit(props) {
  const editForm = useForm();
  const onSubmit = (vals) => console.log(vals);

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg">
      <Formiz connect={editForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={editForm.submit} className="space-y-6">
          <div className="max-w-full h-40 overflow-hidden rounded-xl">
            <img
              className="w-full max-h-full object-cover"
              src="https://i.pravatar.cc/400"
              alt="event thumb"
            />
          </div>
          <Input name="title" type="text" label="Title" defaultValue="Blackberry" />
          <Input name="start_date" type="date" label="Start date" defaultValue="31/10/2021" />
          <Input name="end_date" type="date" label="End date" defaultValue="31/10/2021" />
          <Textarea name="description" label="Description" rows="3" defaultValue="desc" />
          <button className="btn-primary">Update</button>
        </form>
      </Formiz>
    </div>
  );
}

export default EventEdit;
