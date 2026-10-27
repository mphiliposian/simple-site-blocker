import trashIcon from "../assets/trash.svg";

import styles from "./BlockListItem.module.css";

export function BlockListItem({ value, onChange, onRemove }) {
    return (
        <div className={styles.BlockListItem}>
            <input
                className={styles.DomainInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className={styles.TrashButton} onClick={onRemove}>
                <img src={trashIcon} />
            </button>
        </div>
    );
}
