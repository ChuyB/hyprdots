const divide = ([total, free]) => free / total;
const cpu = Variable(0, {
  poll: [
    2000,
    "top -b -n 1",
    (out) =>
      divide([
        100,
        out
          .split("\n")
          .find((line) => line.includes("Cpu(s)"))
          ?.split(/\s+/)[1]
          .replace(",", "."),
      ]),
  ],
});

const ram = Variable(0, {
  poll: [
    2000,
    "free",
    (out) =>
      divide(
        out
          .split("\n")
          .find((line) => line.includes("Mem:"))
          ?.split(/\s+/)
          .splice(1, 2) as any,
      ),
  ],
});

const CPUReveal = Variable(false);
const RAMReveal = Variable(false);

const CPU = () =>
  Widget.EventBox({
    class_name: "cpu",
    on_hover: () => CPUReveal.setValue(true),
    on_hover_lost: () => CPUReveal.setValue(false),
    child: Widget.Box([
      Widget.CircularProgress({
        value: cpu.bind(),
      }),
      Widget.Revealer({
        transition: "slide_right",
        click_through: true,
        reveal_child: CPUReveal.bind(),
        child: Widget.Label({
          label: cpu
            .bind()
            .as((value) => `CPU: ${Math.round(value * 1000) / 10}%`),
        }),
      }),
    ]),
  });

const RAM = () =>
  Widget.EventBox({
    class_name: "ram",
    on_hover: () => RAMReveal.setValue(true),
    on_hover_lost: () => RAMReveal.setValue(false),
    child: Widget.Box([
      Widget.CircularProgress({
        value: ram.bind(),
      }),
      Widget.Revealer({
        transition: "slide_right",
        click_through: true,
        reveal_child: RAMReveal.bind(),
        child: Widget.Label({
          label: ram
            .bind()
            .as((value) => `RAM: ${Math.round(value * 1000) / 10}%`),
        }),
      }),
    ]),
  });

const SystemInfo = () =>
  Widget.Box({
    class_name: "container system-info",
    children: [CPU(), RAM()],
  });

export default SystemInfo;
