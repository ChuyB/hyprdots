import GLib from "gi://GLib";

const clock = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000, () => GLib.DateTime.new_now_local()],
});

const timeFormat = "%A %d, %I:%M %p";

const Clock = () =>
  Widget.Box({
    class_name: "container clock",
    children: [
      Widget.Label({
        class_name: "time",
        label: clock.bind().as((value) => value.format(timeFormat) || ""),
        setup: (self) =>
          self.hook(clock, () => {
            self.label = clock.value.format(timeFormat) || "";
          }),
      }),
    ],
  });

export default Clock;
