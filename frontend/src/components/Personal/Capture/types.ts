export interface Message {
  type: string;
  data: string;
}

export interface CaptureState {
  messages: { type: string; data: string };
  finishPersonal: boolean;
}