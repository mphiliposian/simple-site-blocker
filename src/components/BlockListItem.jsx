import trashIcon from "../assets/trash.svg";

import { Icon } from "./Icon";

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
                <Icon src={trashIcon} />
            </button>
        </div>
    );
}
