const WifiIsRevealed = Variable(false);
const BtRevealed = Variable(false);
const VolumeIsRevealed = Variable(false);

const bluetooth = await Service.import("bluetooth");
const network = await Service.import("network");
const audio = await Service.import("audio");

const VolumeIndicator = () =>
  Widget.EventBox({
    class_name: "volume",
    on_primary_click: () => (audio.speaker.is_muted = !audio.speaker.is_muted),
    on_hover: () => VolumeIsRevealed.setValue(true),
    on_hover_lost: () => VolumeIsRevealed.setValue(false),
    child: Widget.Box([
      Widget.Icon().hook(audio.speaker, (self) => {
        const volume = audio.speaker.volume * 100;
        const icon = [
          [101, "overamplified"],
          [67, "high"],
          [34, "medium"],
          [1, "low"],
          [0, "muted"],
        ].find(([threshold]) => volume >= (threshold as any))?.[1];
        self.icon = `audio-volume-${audio.speaker.is_muted ? "muted" : icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.ceil(volume)}%`;
      }),
      Widget.Revealer({
        transition: "slide_right",
        click_through: true,
        reveal_child: VolumeIsRevealed.bind(),
        child: Widget.Label({
          setup: (self) => {
            self.hook(audio.speaker, (w) => {
              w.label = audio.speaker.is_muted
                ? "Muted"
                : `${Math.ceil(audio.speaker.volume * 100)}%`;
            });
          },
        }),
      }),
    ]),
  });

const ConnectedDevices = () =>
  Widget.Box({
    class_name: "bt-devices",
    children: bluetooth.connected_devices.map(
      ({ icon_name, name, battery_percentage }) => {
        const BtDeviceRevealed = Variable(false);
        return Widget.EventBox({
          on_hover: () => BtDeviceRevealed.setValue(true),
          on_hover_lost: () => BtDeviceRevealed.setValue(false),
          on_primary_click: () => {
            bluetooth.enabled = !bluetooth.enabled;
            BtDeviceRevealed.setValue(false);
          },
          child: Widget.Box([
            Widget.Icon(icon_name + "-symbolic"),
            Widget.Revealer({
              transition: "slide_right",
              click_through: true,
              revealChild: BtDeviceRevealed.bind(),
              child: Widget.Label({ label: `${name} ${battery_percentage}%` }),
            }),
          ]),
        });
      },
    ),
  });

const Bluetooth = () =>
  Widget.Stack({
    class_name: "bluetooth",
    children: {
      normal: Widget.EventBox({
        on_hover: () => BtRevealed.setValue(true),
        on_hover_lost: () => BtRevealed.setValue(false),
        on_primary_click: () => (bluetooth.enabled = !bluetooth.enabled),
        child: Widget.Box([
          Widget.Icon({
            icon: bluetooth
              .bind("enabled")
              .as((on) => `bluetooth-${on ? "active" : "disabled"}-symbolic`),
          }),
          Widget.Revealer({
            transition: "slide_right",
            click_through: true,
            reveal_child: BtRevealed.bind(),
            child: Widget.Label({
              label: bluetooth
                .bind("enabled")
                .as((on) => (on ? "Not connected" : "Disabled")),
            }),
          }),
        ]),
      }),
      devices: ConnectedDevices(),
    },
    shown: bluetooth
      .bind("connected_devices")
      .as((p) => (p.length > 0 ? "devices" : "normal")),
  });

const WifiIndicator = () =>
  Widget.EventBox({
    class_name: "wifi",
    on_primary_click: () => (network.wifi.enabled = !network.wifi.enabled),
    on_hover: () => WifiIsRevealed.setValue(true),
    on_hover_lost: () => WifiIsRevealed.setValue(false),
    child: Widget.Box([
      Widget.Icon({
        setup: (self) => {
          self.hook(network.wifi, (w) => {
            w.icon = network.wifi.enabled
              ? network.wifi.icon_name
              : "network-wireless-disabled-symbolic";
          });
        },
      }),
      Widget.Revealer({
        transition: "slide_right",
        click_through: true,
        reveal_child: WifiIsRevealed.bind(),
        child: Widget.Label({
          setup: (self) =>
            self.hook(network.wifi, (w) => {
              w.label = network.wifi.enabled
                ? network.wifi.ssid || "Not connected"
                : "Disabled";
            }),
        }),
      }),
    ]),
  });

const WiredIndicator = () =>
  Widget.Box({
    class_name: "wired",
    children: [
      Widget.Icon({
        icon: network.wired.bind("icon_name"),
      }),
    ],
  });

const Network = () =>
  Widget.Stack({
    class_name: "network",
    children: {
      wifi: WifiIndicator(),
      wired: WiredIndicator(),
    },
    shown: network.bind("primary").as((p) => p || "wifi"),
  });

const Indicators = () =>
  Widget.Box({
    class_name: "container indicators",
    children: [VolumeIndicator(), Network(), Bluetooth()],
  });

export default Indicators;
