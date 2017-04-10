
import type { Action } from './types';
import {HOST_URL} from '../config/serverConfig';

export const SET_USER = 'SET_USER';
export const REGISTER_USER = 'REGISTER_USER';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function registerUser(user) {
  return function(dispatch) {
    fetch(HOST_URL + 'auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const user = {
        email: responseJson.email,
        token: responseJson.token
      }
      dispatch(setUser(user));
    })
    .catch((error) => {
      throw(error)
    })
  }
}
