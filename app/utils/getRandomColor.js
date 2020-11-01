/**
 * Return a random color according with the given luminosity
 * @param luminosity: Number between 0 and 255
 */
export default function getRandomColor(luminosity) {
  const r1 = Math.random();
  const r2 = Math.random();
  let rMin = Math.min(r1, r2);
  let rMax = Math.max(r1, r2);

  if (rMin > 1 / 2) {
    rMin = 1 / 2;
  }

  if (rMax - rMin > 1 / 2) {
    rMax = rMin + 1 / 2;
  }

  let l1;
  let l2;
  let l3;
  if (luminosity < (255 * 3) / 2) {
    l1 = Math.round(luminosity * rMin);
    l2 = Math.round(luminosity * (rMax - rMin));
    l3 = Math.round(luminosity * (1 - rMax));
  } else {
    l1 = 255 - Math.round((255 * 3 - luminosity) * rMin);
    l2 = 255 - Math.round((255 * 3 - luminosity) * (rMax - rMin));
    l3 = 255 - Math.round((255 * 3 - luminosity) * (1 - rMax));
  }

  let r;
  for (let i = 0; i < 10; i += 1) {
    if (l1 > 255 || l2 > 255 || l3 > 255) {
      if (l1 > 255) {
        r = Math.random();
        l1 = 255;
        l2 += r * (l1 - 255);
        l3 += (1 - r) * (l1 - 255);
      }
      if (l2 > 255) {
        r = Math.random();
        l1 += r * (l2 - 255);
        l2 = 255;
        l3 += (1 - r) * (l2 - 255);
      }
      if (l3 > 255) {
        r = Math.random();
        l1 += r * (l3 - 255);
        l2 += (1 - r) * (l3 - 255);
        l3 = 255;
      }
    } else {
      break;
    }
  }
  return [Math.round(l1), Math.round(l2), Math.round(l3)];
}
