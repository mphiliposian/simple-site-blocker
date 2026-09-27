import { useState } from "react";

export function NewBlockListItem({ onAdd }) {
    const [draft, setDraft] = useState("");

    const commit = () => {
        if (draft.trim()) {
            onAdd(draft.trim());
            setDraft("");
        }
    };

    return (
        <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            onBlur={commit}
            placeholder="e.g. somedomain.com"
        />
    );
}
