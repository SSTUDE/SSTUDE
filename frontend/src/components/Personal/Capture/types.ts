export interface Message {
  type: string;
  data: string;
}

export interface CaptureState {
  messages: Message;
}
