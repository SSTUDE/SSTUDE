const mirror_real_weight = 58.9;
const mirror_real_height = 33.1;
const mirror_black_side = 17;

const MIRROR_WEIGHT = 100;
const MIRROR_HEIGHT = MIRROR_WEIGHT / mirror_real_weight * mirror_real_height;


const MIRROR_LEFT = MIRROR_WEIGHT/ mirror_real_weight * mirror_black_side;
const MIRROR_RIGHT = MIRROR_LEFT
const MIRROR_CENTER = MIRROR_WEIGHT - MIRROR_LEFT * 2

const BACK_GROUND_COLOR = "black";

export { MIRROR_WEIGHT, MIRROR_HEIGHT, MIRROR_LEFT, MIRROR_RIGHT, MIRROR_CENTER, BACK_GROUND_COLOR };
