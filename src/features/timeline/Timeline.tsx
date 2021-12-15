import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { TimelineItemSquare } from "./TimelineItemSquare";
import {
  clearselectedItem,
  itemsSelector,
  selectedDateTimeSelector,
  selectedItemIdSelector,
  selectItem,
  changeDate,
} from "./timelineSlice";
import styles from "./Timeline.module.css";
import { add, format } from "date-fns";
import { DATETIMEFORMAT } from "../../lib/constants";
import { timelineAndPurchasesSelector } from "./timeLineAndPurchasesSelector";

export function Timeline() {
  const selectedItemId = useAppSelector(selectedItemIdSelector);
  const items = useAppSelector(timelineAndPurchasesSelector);
  const selectedDateTime = useAppSelector(selectedDateTimeSelector);
  const dispatch = useAppDispatch();

  const handleSelectSquare = useCallback(
    (itemId: number) => dispatch(selectItem(itemId)),
    [dispatch]
  );

  const handleDeselectSquare = useCallback(
    () => dispatch(clearselectedItem()),
    [dispatch]
  );

  const handleClickNextDate = () => {
    dispatch(
      changeDate(
        format(add(new Date(selectedDateTime), { days: 1 }), DATETIMEFORMAT)
      )
    );
  };

  return (
    <section>
      <h1>Timeline</h1>
      <p>
        {selectedItemId ? `Selected: ${selectedItemId}` : "Nothing selected"}
      </p>
      <p>{selectedDateTime}</p>
      <button onClick={handleClickNextDate}>Next date &#62;</button>
      <ul className={styles.timelineList}>
        {items.map((item) => (
          <li key={item.id} className={styles.timelineListItem}>
            <TimelineItemSquare
              onSelectSquare={handleSelectSquare}
              onDeselectSquare={handleDeselectSquare}
              itemId={item.id}
              isSelected={selectedItemId === item.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
