import { useState, useEffect, useRef, useCallback } from "react";

import { BlockListItem } from "./BlockListItem";
import { NewBlockListItem } from "./NewBlockListItem";

import styles from "./BlockList.module.css";

export function BlockList() {
    const [items, setItems] = useState([]); // [{ id, value }]
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    const persist = useCallback((itemsToWrite) => {
        removeEmpty();
        clearTimeout(timeoutRef.current);
        const blockedDomains = Object.fromEntries(
            itemsToWrite.map((i) => [i.value, i.id]),
        );
        chrome.storage.sync.set({ blockedDomains });
    }, []);

    // Debounced write whenever the component is updated
    useEffect(() => {
        timeoutRef.current = setTimeout(() => persist(items), 400);
        return () => clearTimeout(timeoutRef.current);
    }, [items, persist]);

    // Synchronous write whenever the popup is hidden
    useEffect(() => {
        const onPageHide = () => persist(items);
        window.addEventListener("pagehide", onPageHide);
        return () => window.removeEventListener("pagehide", onPageHide);
    }, [persist]);

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

    const updateItem = useCallback((id, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, value } : item,
            ),
        );
    }, []);

    const removeItem = useCallback((id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    const addItem = useCallback((value) => {
        if (!value.trim()) return;
        setItems((prevItems) => [
            ...prevItems,
            { id: getNextRuleId(prevItems.map((x) => x.id)), value },
        ]);
    }, []);

    const removeEmpty = useCallback(() => {
        setItems((prevItems) => prevItems.filter((item) => item.value));
    }, []);

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
        </div>
    );
}

function getNextRuleId(existingIds) {
    return existingIds.length ? Math.max(...existingIds) + 1 : 1;
}
