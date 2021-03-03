import { networkResponse } from "./network";

export interface LoginState {
  token: string;
}


export interface LoginValidateSuccessResponse extends networkResponse {
  data: {isValid: true};
}


