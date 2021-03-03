import {networkResponse} from './network';
export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegisterResponse extends networkResponse {}

export interface IJokesResponse extends networkResponse {
  data?: Array<IJoke>;
}

export interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export interface IAnime {
  id: string;
  type: string;
  links: {
    self: string;
  };
  punchline: string;
  attributes: IAnimeAttributes;
}

export interface IAnimeAttributes {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: string;
  canonicalTitle: string;
  averageRating: string;
  userCount: number;
  posterImage: {
    tiny: string;
    small: string;
    medium: string;
  };
  coverImage: {
    tiny: string;
  };
}

export interface IAnimeResponse extends networkResponse {
  data: {data?: Array<IAnime>};
}

export interface GlobalState {
  biometry?: boolean;
  biometryType?: boolean | string;
}

export interface IProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
}
