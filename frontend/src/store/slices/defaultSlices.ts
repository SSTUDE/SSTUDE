const ratio = [1, 3.92, 3.23];

const sum = (arr: number[]): number => arr.reduce((acc: number, cur: number) => acc + cur, 0);

const MIRROR_HEADER = 100 / sum(ratio) * ratio[0];
const MIRROR_BODY = 100 / sum(ratio) * ratio[1];
const MIRROR_BOTTOM = 100 / sum(ratio) * ratio[2];
const MIRROR_COLOR = "black";

export { MIRROR_HEADER, MIRROR_BODY, MIRROR_BOTTOM, MIRROR_COLOR };
