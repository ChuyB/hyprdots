const hyprland = await Service.import("hyprland");

const NotificationsButton = () =>
  Widget.Button({
    class_name: "container notifications-button",
    child: Widget.Icon({ icon: "open-menu-symbolic" }),
    setup: (self) => {
      self.hook(hyprland, (w) => {
        const monitor = hyprland.monitors.find((m) => m.focused);
        if (monitor === undefined) return;
        w.on_clicked = () => App.ToggleWindow(`QuickSettings ${monitor.id}`);
      });
    },
  });

export default NotificationsButton;
