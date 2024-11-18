import { range } from "lib/utils";

const hyprland = await Service.import("hyprland");

const dispatch = (ws: number) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () =>
  Widget.Box({
    class_name: "container workspaces",
    children: range(10).map((i) =>
      Widget.Button({
        attribute: i,
        vpack: "center",
        label: `${i}`,
        onClicked: () => dispatch(i), 
        setup: (self) =>
          self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id === i);
            self.toggleClassName(
              "occupied",
              (hyprland.getWorkspace(i)?.windows || 0) > 0,
            );
          }),
      }),
    ),
    setup: (box) => {
      box.hook(hyprland, () =>
        box.children.forEach((btn) => {
          btn.visible = hyprland.workspaces.some(
            (ws) => ws.id === btn.attribute,
          );
        }),
      );
    },
  });

export default Workspaces;
