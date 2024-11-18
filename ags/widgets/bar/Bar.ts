import Battery from "./buttons/Battery";
import Clock from "./buttons/Clock";
import Indicators from "./buttons/Indicators";
import Keyboard from "./buttons/Keyboard";
import NotificationsButton from "./buttons/NotificationButton";
import SystemInfo from "./buttons/SystemInfo";
import SystemTray from "./buttons/SystemTray";
import Workspaces from "./buttons/Workspaces";

const startWidgets = [Workspaces];
const centerWidgets = [Clock];
const endWidgets = [Keyboard, SystemInfo, Indicators, SystemTray, Battery, NotificationsButton];

const Bar = (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: "bar",
    name: `Bar ${monitor}`,
    exclusivity: "exclusive",
    anchor: ["left", "top", "right"],
    child: Widget.CenterBox({
      startWidget: Widget.Box({
        hexpand: true,
        children: startWidgets.map((widget: any) => widget()),
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: centerWidgets.map((widget: any) => widget()),
      }),
      endWidget: Widget.Box({
        hpack: "end",
        children: endWidgets.map((widget: any) => widget()),
      }),
    }),
  });

export default Bar;
