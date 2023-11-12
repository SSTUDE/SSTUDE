export type PersonalBeautyState = {
  eng: string;
  result: string;
  imgUri: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type PersonalClothesState = {
  score: number;
  imgUri: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type PersonalBeautyesultsState = {
  personal_color: string;
  user_img: string;
  match_color: string[];
  hair: string[];
  accessary: string[];
  expl: string;
  skin: string[];
  eye: string[];
  eng: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type PersonalState = {
  beauty: PersonalBeautyState | null;
  clothes: PersonalClothesState | null;
  beautyResults: PersonalBeautyesultsState | null;
  loading: boolean;
  error: string | null;
};
