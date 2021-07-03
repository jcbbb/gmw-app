import React from "react";
import Input from "../input/Input";
import { Formiz, useForm, FormizStep } from "@formiz/core";
import Select from "../select/Select";

function NewEvent() {
  const eventForm = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div className="container p-6 max-w-md mx-auto space-y-4 bg-white rounded-lg">
      <h3 className="text-lg font-bold text-gray-900">Occasion</h3>
      <Formiz connect={eventForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={eventForm.submitStep} className="space-y-6">
          <FormizStep name="step_1">
            <Select name="for_you" label="Is it for you?" defaultValue="yes">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
            {eventForm.values.for_you === "no" ? (
              <Input
                name="for"
                type="text"
                label="Tell use their name"
                required="This field is required"
              />
            ) : null}
            <Input
              type="date"
              name="start_date"
              label="Start date"
              required="This field is required"
            />
            <Input type="date" name="end_date" label="End date" required="This field is required" />
          </FormizStep>
          <FormizStep name="step_2"></FormizStep>
          <div className="flex justify-between">
            {!eventForm.isFirstStep && (
              <button className="btn-secondary" type="button" onClick={eventForm.prevStep}>
                Back
              </button>
            )}
            <button className="btn-primary disabled:opacity-50 disabled:pointer-events-none ml-auto">
              Next
            </button>
          </div>
        </form>
      </Formiz>
    </div>
  );
}

export default NewEvent;
