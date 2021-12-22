import { add, format } from "date-fns";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DATETIMEFORMAT } from "../../lib/constants";
import styles from "./Timeline.module.css";
import {
  selectedTimelineItemSelector,
  timelineAndPurchasesSelector,
} from "./timeLineAndPurchasesSelector";
import { TimelineItemSquare } from "./TimelineItemSquare";
import { TimelineItemSquareDetails } from "./TimelineItemSquareDetails";
import {
  changeDate,
  clearselectedItem,
  selectedDateTimeSelector,
  selectItem,
} from "./timelineSlice";

export function Timeline() {
  const selectedItem = useAppSelector(selectedTimelineItemSelector);
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
      {selectedItem ? (
        <TimelineItemSquareDetails {...selectedItem} />
      ) : (
        <p>Nothing selected</p>
      )}
      <p>{selectedDateTime}</p>
      <button onClick={handleClickNextDate}>Next date &#62;</button>
      <ul className={styles.timelineList}>
        {items.map((item) => (
          <li key={item.id} className={styles.timelineListItem}>
            <TimelineItemSquare
              onSelectSquare={handleSelectSquare}
              onDeselectSquare={handleDeselectSquare}
              itemId={item.id}
              isSelected={selectedItem?.id === item.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
