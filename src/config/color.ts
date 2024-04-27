export const colorPrimary = "#fc9d00";
export const colorSecondary = "#cccccc";
export const colorSuccess = "#09e034";
export const colorDenger = "#ff616d";

export const adjustColor = (color: string, percent: number) => {
  const f = parseInt(color.slice(1), 16);
  const R = (f >> 16) + percent;
  const G = ((f >> 8) & 0x00ff) + percent;
  const B = (f & 0x0000ff) + percent;

  const RR = Math.min(255, Math.max(0, R));
  const GG = Math.min(255, Math.max(0, G));
  const BB = Math.min(255, Math.max(0, B));

  const newColor = `#${RR.toString(16).padStart(2, "0")}${GG.toString(
    16
  ).padStart(2, "0")}${BB.toString(16).padStart(2, "0")}`;

  return newColor;
};

export const CalColor = (color: string, percen?: number) => {
  return percen ? adjustColor(color, percen) : color;
};
export const BgCal = (color: string, percen?: number) => {
  return {
    backgroundColor: percen ? adjustColor(color, percen) : color,
  };
};
