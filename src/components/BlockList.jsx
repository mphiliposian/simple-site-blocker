import { useEffect, useRef, useCallback } from "react";

import { BlockListItem } from "./BlockListItem";
import { NewBlockListItem } from "./NewBlockListItem";

import styles from "./BlockList.module.css";

export function BlockList({ items, onUpdate, onRemove, onAdd }) {
    const listRef = useRef(null);
    const scrollToEndRef = useRef(false);

    // Scroll newly added items into view
    useEffect(() => {
        if (scrollToEndRef.current && listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
        scrollToEndRef.current = false;
    }, [items]);

    const addItem = useCallback(
        (value) => {
            scrollToEndRef.current = true;
            onAdd(value);
        },
        [onAdd],
    );

    return (
        <div className={styles.BlockList}>
            {items.length > 0 && (
                <div className={styles.BlockListItems} ref={listRef}>
                    {items.map((item) => (
                        <BlockListItem
                            key={item.id}
                            value={item.value}
                            onChange={(value) => onUpdate(item.id, value)}
                            onRemove={() => onRemove(item.id)}
                        />
                    ))}
                </div>
            )}
            <NewBlockListItem onAdd={addItem} />
        </div>
    );
}
