import {IRegisterRequest, IRegisterResponse, IJokesResponse, IAnimeResponse} from 'src/interfaces/global';
import {requestClan} from './request';

const BASE_URL = 'https://theroom-test.herokuapp.com/v1';

const AUTH_REGISTER = BASE_URL + '/auth/register';

const AUTH_LOGIN = BASE_URL + '/auth/login';

const GET_JOKES = BASE_URL + '/jokes';
const GET_ANIME = BASE_URL + '/anime';

function registerUser(data: IRegisterRequest): Promise<IRegisterResponse> {
  return requestClan({data, type: 'POST', route: AUTH_REGISTER});
}

function login(data: {email: string; password: string}) {
  return requestClan({data, type: 'POST', route: AUTH_LOGIN});
}

function getJokes(): Promise<IJokesResponse> {
  return requestClan({type: 'GET', route: GET_JOKES, isSecure: true});
}

function getAnime(): Promise<IAnimeResponse> {
  return requestClan({type: 'GET', route: GET_ANIME, isSecure: true});
}

export default {
  login,
  registerUser,
  getJokes,
  getAnime,
};
