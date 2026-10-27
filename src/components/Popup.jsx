import { useBlockList } from "../hooks/useBlockList";

import { BlockList } from "./BlockList";
import { PauseButton } from "./PauseButton";

import styles from "./Popup.module.css";

export function Popup() {
    const { items, updateItem, removeItem, addItem } = useBlockList();

    return (
        <div className={styles.Popup}>
            <h2>Simple Site Blocker</h2>
            <BlockList
                items={items}
                onUpdate={updateItem}
                onRemove={removeItem}
                onAdd={addItem}
            />
            <PauseButton />
        </div>
    );
}
