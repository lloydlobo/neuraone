export const guiBall = {
  max_count: 111,
  berserker: 50,
  wavelength: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

export const guiVortex = {
  size: 5,
  hue: 200,
  saturation: 80,
  lightness: 95,
};

export const guiBgColor = {
  hue: 200,
  saturation: 61,
  lightness: 51,
  alpha: 0.4,
};

export function addDatGuiFolders(dat: { GUI: new () => any }) {
  const gui = new dat.GUI();
  const guiFolderBall = gui.addFolder("Balls");
  const guiFolderVortex = gui.addFolder("Vortex");
  const guiFolderBackground = gui.addFolder("Background");

  guiFolderBall.add(guiBall, "max_count", 25, 1000);
  guiFolderBall.add(guiBall, "berserker", 10, 1000);
  guiFolderBall.open(); // helps to default to open on window load by default
  guiFolderVortex.add(guiVortex, "size", 5, 10);
  guiFolderVortex.add(guiVortex, "hue", 0, 360);
  guiFolderVortex.add(guiVortex, "saturation", 0, 100);
  guiFolderVortex.add(guiVortex, "lightness", 0, 100);
  guiFolderBackground.add(guiBgColor, "hue", 0, 360);
  guiFolderBackground.add(guiBgColor, "saturation", 0, 100);
  guiFolderBackground.add(guiBgColor, "lightness", 0, 100);
  guiFolderBackground.add(guiBgColor, "alpha", 0, 1);
}

// https://www.npmjs.com/package/dat.gui
// https://github.com/dataarts/dat.gui/blob/master/API.md
