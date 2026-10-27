import { useCallback, useEffect, useState } from "react";

import pauseIcon from "../assets/pause.svg";
import playIcon from "../assets/play.svg";

import styles from "./PauseButton.module.css";

export function PauseButton() {
    const [blockState, setBlockState] = useState("active");

    // Sync block state from the browser's storage
    useEffect(() => {
        chrome.storage.sync
            .get("blockState")
            .then(({ blockState = "active" }) => {
                setBlockState(blockState);
            });
    }, []);

    const onClick = useCallback(() => {
        let newState = blockState === "active" ? "inactive" : "active";
        setBlockState(newState);
        chrome.storage.sync.set({ blockState: newState });
    }, [blockState]);

    return (
        <div className={styles.PauseMenu}>
            <span className={`${blockState === "active" ? styles.Hidden : ""}`}>
                Blocking is PAUSED
            </span>
            <button className={styles.PauseButton} onClick={onClick}>
                <img src={blockState === "active" ? pauseIcon : playIcon} />
            </button>
        </div>
    );
}
