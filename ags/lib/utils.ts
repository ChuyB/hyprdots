import Gtk from "gi://Gtk?version=3.0";
import Gdk from "gi://Gdk";

export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

export function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).flatMap(widget);
}

const reloadCss = () => {
  const css = "/tmp/styles.css";
  const scss = `${App.configDir}/styles.scss`;
  Utils.exec(`sass ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);
};

export function autoReloadCSS() {
  Utils.monitorFile(`/home/jesus/.cache/wal/colors.scss`, reloadCss);
  Utils.monitorFile(`${App.configDir}/styles`, reloadCss);
}
