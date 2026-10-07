import { BlockList } from "./BlockList";

import styles from "./Popup.module.css";

export function Popup() {
    return (
        <div>
            <h2 className={styles.Title}>Simple Site Blocker</h2>
            <BlockList />
        </div>
    );
}
