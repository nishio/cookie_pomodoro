import React from "react";
import { useGlobal } from "reactn";
import { all_records } from "./all_records";

export const Records = () => {
  const [records] = useGlobal("records");
  const list = all_records.map((r) => {
    return (
      <li key={r.id}>
        {r.forHuman ?? r.id}: {r.toStr(records[r.id])}
      </li>
    );
  });
  return (
    <div>
      <h2>Records</h2>
      <ul>{list}</ul>
    </div>
  );
};
