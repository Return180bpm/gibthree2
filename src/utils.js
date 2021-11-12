function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
const hex = d => Number(d).toString(16).padStart(2, "0");
// Interpolation functions from https://www.trysmudford.com/blog/linear-interpolation-functions/
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

export { getRandomInRange, hex, lerp, clamp, invlerp, range };
