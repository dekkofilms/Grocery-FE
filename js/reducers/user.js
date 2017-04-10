
import type { Action } from '../actions/types';
import { SET_USER, REGISTER_USER } from '../actions/user';

const initialState = {
  username: '',
  email: '',
  token: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.email,
        token: action.payload.token
      };
  }

  return state;
}
