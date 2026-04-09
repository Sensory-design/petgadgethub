/**
 * MV3 background — placeholder match engine.
 * Next: parse Amazon product titles, compare to uk_retail_feed.json, notify when cheaper elsewhere.
 */
chrome.runtime.onInstalled.addListener(() => {
  console.info("[PetGadgetHub] Extension installed — wire up title matching next.");
});
