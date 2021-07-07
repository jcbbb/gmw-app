import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import { Formiz, useForm } from "@formiz/core";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function GiftEdit({ gift }) {
  const editForm = useForm();
  const onSubmit = (vals) => console.log(vals);

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg">
      <Formiz connect={editForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={editForm.submit} className="space-y-6">
          <div className="max-w-full overflow-hidden rounded-xl">
            <img
              className="h-40 object-contain w-full"
              src={gift.photo.url || DEFAULT_GIFT_THUMB_URL}
              alt="event thumb"
            />
          </div>
          <Input name="title" type="text" label="Title" defaultValue={gift.name} />
          <Input name="size" label="Size european" defaultValue={gift.size} />
          <Input name="color" label="Color" defaultValue={gift.color} />
          <Textarea
            name="description"
            label="Extra description"
            rows="3"
            defaultValue={gift.extra_description}
          />
          <button className="btn-primary">Update</button>
        </form>
      </Formiz>
    </div>
  );
}

export default GiftEdit;
