export interface IUser {
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface IAuthState {
  user: IUser;
  status: Status;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
