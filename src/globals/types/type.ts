export interface ILogin {
  email: string | null;
  password: string | null;
}
export interface IUser {
  username: string | null;
  email: string | null;
  password: string | null;
  token?: string | null;
}

export interface IAuthState {
  user: IUser;
  registerStatus: Status;
  loginStatus: Status;
  status: Status;
  errorMessage: string;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
