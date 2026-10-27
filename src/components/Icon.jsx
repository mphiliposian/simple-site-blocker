import styles from "./Icon.module.css";

// Renders an SVG as a mask so it takes on the current text color
export function Icon({ src }) {
    return (
        <span className={styles.Icon} style={{ maskImage: `url("${src}")` }} />
    );
}
