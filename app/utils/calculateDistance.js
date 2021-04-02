/**
 * Return the distance between two points with (x, y) coordinates
 * @param x1: x-coordinate of point 1
 * @param y1: y-coordinate of point 1
 * @param x2: x-coordinate of point 2
 * @param y2: y-coordinate of point 2
 */
export default function calculateDistance2(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
