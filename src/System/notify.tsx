export const notify = () => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification("You can harvest new Pomodoro!");
  }
};

export const grantNotificationPermission = () => {
  if (!("Notification" in window)) {
    alert(
      "Your browser doesn't support Notifiation API (for example iOS Safari)"
    );
    return;
  }
  Notification.requestPermission();
};
