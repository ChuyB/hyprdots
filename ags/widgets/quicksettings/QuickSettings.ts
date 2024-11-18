import Gtk from "gi://Gtk?version=3.0";
import DoNotDisturb from "./sections/DoNotDisturb";
import { WifiSelection } from "./sections/Network";

const widgets = [DoNotDisturb, WifiSelection];

const SettingsList = () =>
  Widget.Box({
    css: "min-width: 2px; min-height: 2px;",
    class_name: "settings-list",
    vertical: true,
    vexpand: true,
    children: widgets.map((widget: any) => widget()),
  });

export function QuickSettings(monitor: number) {
  return Widget.Window<Gtk.Widget>({
    monitor,
    name: `QuickSettings ${monitor}`,
    class_name: "quick-settings",
    setup: (self) =>
      self.keybind("Escape", () => App.closeWindow(`QuickSettings ${monitor}`)),
    visible: false,
    anchor: ["top", "bottom", "right"],
    child: SettingsList(),
  });
}
