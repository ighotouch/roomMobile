import { networkResponse } from "./network";

export interface DebitCard {
  number: string;
  cvv: string;
  expiry: string;
  name?: string;
}

export interface DebitCardProps extends DebitCard {}


export interface CardSuccessResponse extends networkResponse {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  }
}


export interface ICard {
  bank: string;
  created_at: string;
  expiration_month: string;
  expiration_year: string;
  gateway: string;
  id: number;
  last4: string;
  type: 'visa';
  updated_at: string;
  user_id: string;
}

export interface CardListSuccessResponse extends networkResponse {
  data: Array<ICard>
}





export interface CardValidateSuccessResponse extends networkResponse {
  data: {
    id: number;
    user_id: number;
    type: string;
    reference: string;
    transactionable_type: string;
    transactionable_id: number;
    amount: number
    fees: number
    balance: number
    remark: string;
    status: string;
  }
}
