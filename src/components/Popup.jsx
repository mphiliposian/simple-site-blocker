import { BlockList } from "./BlockList";
import { PauseButton } from "./PauseButton";

import styles from "./Popup.module.css";

export function Popup() {
    return (
        <div className={styles.Popup}>
            <h2>Simple Site Blocker</h2>
            <BlockList />
            <PauseButton />
        </div>
    );
}
