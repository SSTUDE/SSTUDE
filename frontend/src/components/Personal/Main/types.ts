export type PersonalBeautyState = {
  eng: string;
  result: string;
  imgUri: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type PersonalBeautyresultsState = {
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

export type ClothesResultsState = {
  imguri: string;
  score: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type PersonalState = {
  beauty: PersonalBeautyState | null;
  beautyResults: PersonalBeautyresultsState | null;
  clothesResults: ClothesResultsState[] | null;
  loading: boolean;
  error: string | null;
};
