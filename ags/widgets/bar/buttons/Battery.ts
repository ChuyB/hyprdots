const battery = await Service.import("battery");
const lowValue = 40;
const criticalValue = 20;
let isRevealed = Variable(false);

const LevelBar = () =>
  Widget.LevelBar({
    vpack: "center",
    widthRequest: 100,
    value: battery.bind("percent").as((p) => p / 100),
  });

const Icon = () =>
  Widget.Icon({
    setup: (self) => {
      self.hook(battery, () => {
        self.icon = battery.charged
          ? "battery-full-charged-symbolic"
          : battery.icon_name;
      });
    },
  });

const LevelPercentage = () =>
  Widget.Revealer({
    transition: "slide_right",
    click_through: true,
    revealChild: isRevealed.bind(),
    child: Widget.Label({
      label: battery.bind("percent").as((p) => `${p}%`),
    }),
  });

const Battery = () =>
  Widget.Button({
    class_name: "container battery",
    vpack: "center",
    on_clicked: () => isRevealed.setValue(!isRevealed.getValue()),
    child: Widget.Box({
      expand: true,
      children: [Icon(), LevelPercentage(), LevelBar()],
      setup: (self) =>
        self.hook(battery, (w) => {
          w.toggleClassName("charging", battery.charging || battery.charged);
          w.toggleClassName(
            "low",
            battery.percent > criticalValue && battery.percent <= lowValue,
          );
          w.toggleClassName("critical", battery.percent <= criticalValue);
        }),
    }),
  });

export default Battery;
