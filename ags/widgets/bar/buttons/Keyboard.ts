const hyprland = await Service.import("hyprland");

const getKeyboardLayout = () => {
  const hyprlandDevices = Utils.exec("hyprctl -j devices");
  const { keyboards } = JSON.parse(hyprlandDevices);
  const mainKeyboard = keyboards.find((el: { main: boolean }) => el.main);
  const keymap = mainKeyboard ? (mainKeyboard.active_keymap as string) : "NC";

  const listOfKeymaps = {
    Spanish: "ES",
    "English (US)": "US",
    NC: "Keyboard not connected",
  };

  return listOfKeymaps[keymap];
};

getKeyboardLayout();

const Keyboard = () =>
  Widget.Box({
    class_name: "container keyboard",
    children: [
      Widget.Icon({
        icon: "input-keyboard-symbolic",
      }),
      Widget.Label({
        setup: (self) => {
          self.hook(hyprland, (w) => {
            const content = getKeyboardLayout();
            w.label = content;
          });
        },
      }),
    ],
  });
export default Keyboard;
