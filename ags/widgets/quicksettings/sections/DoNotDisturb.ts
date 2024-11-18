const notifications = await Service.import("notifications");

const DoNotDisturb = () =>
  Widget.Box({
    class_name: "container do-not-disturb",
    children: [
      Widget.Label({ hpack: "start", label: "Do Not Disturb" }),
      Widget.Switch({
        hexpand: true,
        hpack: "end",
        on_activate: ({ active }) => notifications.dnd = active,
        active: notifications.bind("dnd"),
      }),
    ],
  });

export default DoNotDisturb;
