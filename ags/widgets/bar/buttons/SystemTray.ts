import { TrayItem } from "types/service/systemtray";

const st = await Service.import("systemtray");

const SysTrayItem = (item: TrayItem) =>
  Widget.Button({
    class_name: "system-tray-item",
    vpack: "center",
    child: Widget.Icon().bind("icon", item, "icon"),
    tooltipMarkup: item.bind("tooltip_markup"),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
  });

const SystemTray = () =>
  Widget.Box({
    class_name: "container system-tray",
    children: st.bind("items").as((items) => items.map(SysTrayItem)),
    setup: (self) => {
      self.hook(st, (w) => {
        if (st.items.length === 0) {
          self.visible = false;
        } else {
          self.visible = true;
        }
      });
    },
  });

export default SystemTray;
