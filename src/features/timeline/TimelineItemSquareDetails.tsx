import clsx from "clsx";
import React from "react";
import { TimelineItemPurchase } from "./timeLineAndPurchasesSelector";
import styles from "./TimelineItemSquare.module.css";

type TimelineItemSquareDetailsProps = TimelineItemPurchase;

export const TimelineItemSquareDetails = function TimelineItemSquareDetails({
  description,
  id,
  name,
  purchaseId,
  section,
  startDateTime,
  tableId,
  party,
  purchase,
}: TimelineItemSquareDetailsProps) {
  return (
    <div
      className={clsx(styles.timelineSquare, styles.timelineSquareDetails, {
        [styles.timelineSquareHasPurchase]: !!purchase,
      })}
    >
      <h2 className={styles.timelineSquareTitle}>Details:</h2>
      <div>id: {id}</div>
      <div>section: {section}</div>
      <div>
        table: {name} - {tableId}
      </div>
      <div>startDateTime: {startDateTime}</div>
      {purchase ? <div>purchaseId: {purchase.id}</div> : null}
      {party ? <div>party name: {party.firstName}</div> : null}
    </div>
  );
};
