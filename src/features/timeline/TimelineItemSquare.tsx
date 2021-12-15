import React, { useMemo } from "react";
import styles from "./TimelineItemSquare.module.css";
import clsx from "clsx";
import { useAppSelector } from "../../app/hooks";
import {
  makeTimelineItemSelector,
  selectTimelineItemSelector,
} from "./timeLineAndPurchasesSelector";
import { RootState } from "../../app/store";

interface TimelineItemProps {
  itemId: number;
  onSelectSquare(itemId: number): void;
  onDeselectSquare(): void;
  isSelected: boolean;
}

export const TimelineItemSquare = function TimelineItemSquare({
  itemId,
  onDeselectSquare,
  onSelectSquare,
  isSelected,
}: TimelineItemProps) {
  // based on react-redux docs
  // const timelineItemSelector = useMemo(makeTimelineItemSelector, []);
  // const item = useAppSelector((state) => timelineItemSelector(state, itemId));

  // based on using on re-reselect
  const item = useAppSelector((state: RootState) =>
    selectTimelineItemSelector(state, itemId)
  );

  if (!item) {
    return null;
  }

  const handleClick = () => {
    if (!isSelected) {
      onSelectSquare(itemId);
      return;
    }
    if (isSelected) {
      onDeselectSquare();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.timelineSquare, {
        [styles.timelineSquareHasPurchase]: item.purchase,
        [styles.timelineSquareSelected]: isSelected,
      })}
    >
      <div>id: {item.id}</div>
      <div>section: {item.section}</div>
      <div>
        table: {item.name} - {item.tableId}
      </div>
      <div>startDateTime: {item.startDateTime}</div>
      {item.purchase ? <div>purchaseId: {item.purchase.id}</div> : null}
    </button>
  );
};
