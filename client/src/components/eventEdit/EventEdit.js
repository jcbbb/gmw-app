import React from "react";
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import api from "../../api";
import { Formiz, useForm } from "@formiz/core";
import { useAsync } from "../../hooks/useAsync";
import { useModal } from "../../hooks/useModal";
import { useUserEvent } from "../../hooks/useUserEvent";
import { toast } from "react-toastify";

function EventEdit({ event }) {
  const editForm = useForm();
  const { closeModal } = useModal();
  const { run, isLoading } = useAsync();
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
          <div className="max-w-full overflow-hidden rounded-xl">
            <img className="h-40 object-contain w-full" src={event.photo.url} alt="event thumb" />
          </div>
          <Input name="title" type="text" label="Title" defaultValue={event.title} />
          <Input
            name="end_date"
            type="date"
            label="End date"
            defaultValue={new Date(event.end_date).toISOString().substr(0, 10)}
          />
          <Textarea
            name="description"
            label="Description"
            rows="5"
            defaultValue={event.description}
          />
          <button
            className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            Update
          </button>
        </form>
      </Formiz>
    </div>
  );
}

export default EventEdit;
