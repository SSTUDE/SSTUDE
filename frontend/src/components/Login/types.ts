
export interface LoginState {
    userInfo: string;
    serialNum: string;
    signUp: boolean;
    signIn: boolean;
    memberId: string;
    gps: [number, number] | null;
  }