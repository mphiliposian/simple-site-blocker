import { useState, useEffect, useRef, useCallback } from "react";

import { BlockListItem } from "./BlockListItem";
import { NewBlockListItem } from "./NewBlockListItem";
import { PauseButton } from "./PauseButton";

import styles from "./BlockList.module.css";

export function BlockList() {
    const EDIT_DELAY = 400;

    const [items, setItems] = useState([]); // [{ id, value }]
    const timeoutRef = useRef(null);

    const removeEmpty = useCallback(() => {
        setItems((prevItems) => prevItems.filter((item) => item.value));
    }, []);

    const persist = useCallback(
        (itemsToWrite) => {
            removeEmpty();
            clearTimeout(timeoutRef.current);
            const blockedDomains = Object.fromEntries(
                itemsToWrite.map((i) => [i.value, i.id]),
            );
            chrome.storage.sync.set({ blockedDomains });
        },
        [removeEmpty],
    );

    // Sync block list from the browser's storage
    useEffect(() => {
        chrome.storage.sync
            .get("blockedDomains")
            .then(({ blockedDomains = {} }) => {
                setItems(
                    Object.entries(blockedDomains).map(([value, id]) => ({
                        id,
                        value,
                    })),
                );
            });
    }, []);

    const updateItem = useCallback(
        (id, value) => {
            const newItems = items.map((item) =>
                item.id === id ? { ...item, value } : item,
            );
            setItems(newItems);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(
                () => persist(newItems),
                EDIT_DELAY,
            );
        },
        [items, persist],
    );

    const removeItem = useCallback(
        (id) => {
            const newItems = items.filter((item) => item.id !== id);
            setItems(newItems);
            persist(newItems);
        },
        [items, persist],
    );

    const addItem = useCallback(
        (value) => {
            if (!value.trim()) return;
            const newItems = [
                ...items,
                { id: getNextRuleId(items.map((x) => x.id)), value },
            ];
            setItems(newItems);
            persist(newItems);
        },
        [items, persist],
    );

    return (
        <div className={styles.BlockList}>
            {items.map((item) => (
                <BlockListItem
                    key={item.id}
                    value={item.value}
                    onChange={(value) => updateItem(item.id, value)}
                    onRemove={() => removeItem(item.id)}
                />
            ))}
            <NewBlockListItem onAdd={addItem} />
            <PauseButton />
        </div>
    );
}

function getNextRuleId(existingIds) {
    return existingIds.length ? Math.max(...existingIds) + 1 : 1;
}
