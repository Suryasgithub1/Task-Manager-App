import React from "react";
import PageHeading from "./PageHeading";
import DropdownMenu from "./DropdownMenu";
import BoardHeader from "./BoardHeader";
import GroupList from "./GroupList";

const Board = (() => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeading />

      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-semibold text-gray-800">Task Board</h1>
        <DropdownMenu />
      </header>

      <BoardHeader />
      <GroupList />
    </div>
  );
});

export default Board;
