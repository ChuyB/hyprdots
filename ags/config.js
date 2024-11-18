const entry = App.configDir + "/main.ts";
const outdir = "/tmp/ags/js";

try {
  const scss = `${App.configDir}/styles.scss`;
  const css = "/tmp/styles.css";
  Utils.exec(`sass ${scss} ${css}`);
} catch (error) {
  console.error("Dart-Sass might not be installed\n", error)
}

try {
  await Utils.execAsync([
    "bun", "build", entry,
    "--outdir", outdir,
    "--external", "resource://*",
    "--external", "gi://*",
    "--external", "file://*",
  ]);
  await import(`file://${outdir}/main.js`);
} catch (error) {
  console.error(error);
}
