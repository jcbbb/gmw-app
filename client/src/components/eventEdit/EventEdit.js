import React from "react";
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import { Formiz, useForm } from "@formiz/core";
import { useAsync } from "../../hooks/useAsync";
import { useModal } from "../../hooks/useModal";
import { useUserEvent } from "../../hooks/useUserEvent";
import api from "../../api";
import { toast } from "react-toastify";

function EventEdit({ event }) {
  const editForm = useForm();
  const { closeModal } = useModal();
  const { run } = useAsync();
  const { updateOne } = useUserEvent();

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        const start_date = new Date(values.start_date).toISOString();
        const end_date = new Date(values.end_date).toISOString();
        const { event: updatedEvent } = await run(
          api.event.updateOne(event.id, { ...values, start_date, end_date })
        );
        updateOne(event.id, updatedEvent);
        closeModal();
        toast("Updated successfully", {
          type: "success",
        });
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [event, run, closeModal, updateOne]
  );

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg h-4/5 overflow-y-scroll">
      <Formiz connect={editForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={editForm.submit} className="space-y-6">
          <div className="max-w-full h-40 overflow-hidden rounded-xl">
            <img
              className="w-full max-h-full object-cover"
              src="https://i.pravatar.cc/400"
              alt="event thumb"
            />
          </div>
          <Input name="title" type="text" label="Title" defaultValue={event.title} />
          <Input
            name="start_date"
            type="date"
            label="Start date"
            defaultValue={new Date(event.start_date).toISOString().substr(0, 10)}
          />
          <Input
            name="end_date"
            type="date"
            label="End date"
            defaultValue={new Date(event.end_date).toISOString().substr(0, 10)}
          />
          <Textarea
            name="description"
            label="Description"
            rows="3"
            defaultValue={event.description}
          />
          <button className="btn-primary">Update</button>
        </form>
      </Formiz>
    </div>
  );
}

export default EventEdit;
