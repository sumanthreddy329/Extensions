chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "openURL") {
    chrome.tabs.create({ url: "https://example.com" });
    scheduleNextAlarm();
  }
});

function scheduleNextAlarm() {
  const now = new Date();
  const currentDay = now.getDay();
  const daysUntilNextFriday = currentDay <= 2 ? 2 - currentDay : 9 - currentDay;
  const nextFriday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilNextFriday, 1, 13);
  const timeDiff = nextFriday.getTime() - now.getTime();
  
  if (timeDiff <= 0) {
    // If it's already past Friday 01:30 for today, schedule for next week
    nextFriday.setDate(nextFriday.getDate() + 7);
  }

  const delay = nextFriday.getTime() - now.getTime();

  chrome.alarms.create("openURL", { when: Date.now() + delay });
}

scheduleNextAlarm();
