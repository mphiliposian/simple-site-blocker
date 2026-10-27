import { BlockListItem } from "./BlockListItem";
import { NewBlockListItem } from "./NewBlockListItem";

import styles from "./BlockList.module.css";

export function BlockList({ items, onUpdate, onRemove, onAdd }) {
    return (
        <div className={styles.BlockList}>
            {items.map((item) => (
                <BlockListItem
                    key={item.id}
                    value={item.value}
                    onChange={(value) => onUpdate(item.id, value)}
                    onRemove={() => onRemove(item.id)}
                />
            ))}
            <NewBlockListItem onAdd={onAdd} />
        </div>
    );
}
