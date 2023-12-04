/**
 * Return a color according to the given temperature
 * 0 is cold so a light blue
 * 50 is middle so a dark mid-red mid-blue
 * 100 is hot so a light red
 * @param temperature: Number between 0 and 100
 */
export default function getBgColorFromTemperature(temperature) {
  const green = 50 + Math.abs(temperature - 50) / 5;
  const blue =
    50 + (temperature <= 50 ? ((255 - 50) * 2 * (50 - temperature)) / 100 : 0);
  const red =
    50 + (temperature >= 50 ? ((255 - 50) * 2 * (temperature - 50)) / 100 : 0);
  // // we calculate luminosity. We want this :
  // // 0    25    50      75     100
  // // 200  150   100     150    200
  // const luminosity = 100 + Math.abs(temperature - 50) * 2;

  return [Math.round(red), Math.round(green), Math.round(blue)];
}
