import styles from "./BlockListItem.module.css";

export function BlockListItem({ value, onChange, onRemove }) {
    return (
        <div className={styles.BlockListItem}>
            <input
                className={styles.DomainInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button onClick={onRemove}>
                <img src="/src/assets/trash.svg" />
            </button>
        </div>
    );
}
