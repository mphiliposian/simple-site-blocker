import { useEffect, useState } from "react";

import trashIcon from "../assets/trash.svg";

import { Icon } from "./Icon";

import styles from "./TrashAllButton.module.css";

export function TrashAllButton({ onClick }) {
    const CONFIRM_TIMEOUT = 3000;

    const [confirming, setConfirming] = useState(false);

    // Revert to the default state if the user doesn't confirm in time
    useEffect(() => {
        if (!confirming) return;
        const timeout = setTimeout(() => setConfirming(false), CONFIRM_TIMEOUT);
        return () => clearTimeout(timeout);
    }, [confirming]);

    const handleClick = () => {
        if (confirming) {
            setConfirming(false);
            onClick();
        } else {
            setConfirming(true);
        }
    };

    return (
        <button className={styles.TrashAllButton} onClick={handleClick}>
            {confirming ? (
                "Sure?"
            ) : (
                <>
                    <Icon src={trashIcon} />
                    All
                </>
            )}
        </button>
    );
}
