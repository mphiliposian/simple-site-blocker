// Rebuild DNR rules based on current blockedDomains + blockState
async function syncRulesFromStorage() {
    const { blockedDomains = {}, blockState = "active" } =
        await chrome.storage.sync.get(["blockedDomains", "blockState"]);

    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const existingIds = existing.map((r) => r.id);

    const shouldBlock = blockState === "active";

    const addRules = shouldBlock
        ? Object.entries(blockedDomains).map(([domain, id]) => ({
              id,
              priority: 1,
              action: { type: "block" },
              condition: {
                  urlFilter: `||${domain}`,
                  resourceTypes: ["main_frame"],
              },
          }))
        : [];

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingIds,
        addRules,
    });
}

// React to storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && (changes.blockedDomains || changes.blockState)) {
        syncRulesFromStorage();
    }
});

// Run on install and on every browser startup
chrome.runtime.onInstalled.addListener(syncRulesFromStorage);
chrome.runtime.onStartup.addListener(syncRulesFromStorage);
