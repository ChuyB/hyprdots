import { Notification } from "types/service/notifications";

function NotificationIcon({ app_entry, app_icon, image }: Notification) {
  if (image) {
    return Widget.Box({
      css:
        `background-image: url("${image}");` +
        "background-size: contain;" +
        "background-repeat: no-repeat;" +
        "background-position: center;",
    });
  }

  let icon = "user-idle-symbolic";
  if (Utils.lookUpIcon(app_icon)) icon = app_icon;

  if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry;

  return Widget.Box({
    child: Widget.Icon({
      hexpand: true,
      icon,
    }),
  });
}

export function NotificationPopup(n: Notification) {
  const icon = Widget.Box({
    class_name: "notification-icon",
    child: NotificationIcon(n),
  });

  const title = Widget.Label({
    class_name: "notification-title",
    label: n.summary,
    max_width_chars: 18,
    truncate: "end",
    hexpand: true,
    xalign: 0,
    wrap: true,
    use_markup: true,
  });

  const body = Widget.Label({
    class_name: "notification-body",
    label: n.body,
    max_width_chars: 18,
    hexpand: true,
    vexpand: true,
    xalign: 0,
    vpack: "center",
    wrap: true,
    truncate: "end",
    lines: 2,
    use_markup: true,
  });

  const content = Widget.Box({
    vertical: true,
    hexpand: true,
    vexpand: true,
    children: [title, body],
  });

  const actions = Widget.Box({
    class_name: "notification-actions",
    hpack: "center",
    vpack: "center",
    children: n.actions.map(({ id, label }) =>
      Widget.Button({
        class_name: "notification-action-button",
        on_clicked: () => {
          n.invoke(id);
          n.dismiss();
        },
        child: Widget.Label(label),
      }),
    ),
  });

  return Widget.EventBox(
    {
      on_primary_click: n.dismiss,
    },
    Widget.Box({
      class_name: `${n.urgency}`,
      vertical: true,
      children: [
        Widget.Box({
          class_name: "notification",
          children: [icon, content],
        }),
        actions,
      ],
    }),
  );
}
