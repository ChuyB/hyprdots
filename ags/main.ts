import { autoReloadCSS, forMonitors } from "lib/utils";
import Bar from "widgets/bar/Bar";
import { Notifications } from "widgets/notifications/Notifications";
import { QuickSettings } from "widgets/quicksettings/QuickSettings";

autoReloadCSS();

const css = `/tmp/styles.css`;

App.config({
  style: css,
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(Notifications),
    ...forMonitors(QuickSettings),
  ],
});
