/**
 * Records
 * It is not consumable.
 */
import React from "react";
import { useGlobal } from "reactn";
import { TAchievementID } from "../all_ids";
import { all_records } from "./all_records";
import { isPermanent } from "./isPermanent";

export const Records = () => {
  const [records] = useGlobal("records");
  const list = all_records.map((r) => {
    return (
      <li key={r.id}>
        {isPermanent(r)}
        {r.forHuman ?? r.id}: {r.toStr(records[r.id])}
      </li>
    );
  });
  return (
    <div id="records">
      <h2>
      <ul>{list}</ul>
    </div>
  );
};
