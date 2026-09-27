chrome.runtime.onStartup.addListener(syncRulesFromStorage);
chrome.runtime.onInstalled.addListener(syncRulesFromStorage);

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.blockedDomains) {
        syncRulesFromStorage();
    }
});

async function syncRulesFromStorage() {
    const { blockedDomains = {} } =
        await chrome.storage.sync.get("blockedDomains");

    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const existingIds = existing.map((r) => r.id);

    const addRules = Object.entries(blockedDomains).map(([domain, id]) => ({
        id,
        priority: 1,
        action: { type: "block" },
        condition: { urlFilter: `||${domain}`, resourceTypes: ["main_frame"] },
    }));

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingIds,
        addRules,
    });
}
