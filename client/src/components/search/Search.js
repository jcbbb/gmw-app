import React from "react";
import SearchIcon from "../icons/search";
import Input from "../input/Input";
import { Formiz, useForm } from "@formiz/core";

function Search(props) {
  const searchForm = useForm();

  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <div className="relative">
      <Formiz connect={searchForm} onValidSubmit={onSubmit}>
        <form noValidate onSubmit={searchForm.submit}>
          <Input name="search_query" className="pr-10" placeholder="Search for events" />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <SearchIcon color="text-gray-500" size="w-5 h-5" />
          </button>
        </form>
      </Formiz>
    </div>
  );
}

export default Search;
