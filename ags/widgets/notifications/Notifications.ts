import { Notification } from "types/service/notifications";
import { NotificationPopup } from "./NotificationPopup";
const notifications = await Service.import("notifications");
notifications.popupTimeout = 5000;
notifications.forceTimeout = true;
const animationDuration = 500;

const NotificationRevealer = (n: Notification) => {
  const widget = NotificationPopup(n);

  const revealer = Widget.Revealer({
    attribute: { id: n.id },
    transition: "slide_down",
    transition_duration: animationDuration,
    child: widget,
  });

  Utils.idle(() => {
    revealer.reveal_child = true;
  })

  return revealer;
}

const PopupList = () => {
  const list = Widget.Box({
    class_name: "notification-list",
    hpack: "end",
    vertical: true,
    children: notifications.popups.map(NotificationRevealer),
  });

  function onNotified(_: any, id: number) {
    if (notifications.dnd) return;

    const n = notifications.getNotification(id);
    if (n) list.children = [NotificationRevealer(n), ...list.children];
  }

  function onDismissed(_: any, id: number) {
    const w = list.children.find((n) => n.attribute.id === id);
    if (w) {
      w.reveal_child = false;
      Utils.timeout(animationDuration, () => w.destroy());
    }
  }

  list
    .hook(notifications, onNotified, "notified")
    .hook(notifications, onDismissed, "dismissed")
    .hook(notifications, onDismissed, "closed");

  return list;
}
export function Notifications(monitor: number) {

  return Widget.Window({
    monitor,
    name: `Notifications ${monitor}`,
    class_name: "notification-popups",
    anchor: ["top", "right"],
    child: Widget.Box({
      css: "min-width: 2px; min-height: 2px;",
      class_name: "notifications",
      vertical: true,
      child: PopupList(),
    }),
  });
}
