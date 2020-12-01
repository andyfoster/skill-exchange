import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
 } from './types';

// Load token for authenticated user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

 // Register user
 export const register = ({ name, email, password }) => async (dispatch) => {
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };

   const body = JSON.stringify({ name, email, password });

   try {
     const res = await axios.post('/api/v1/users', body, config);
     console.log(res);

     dispatch({
       type: REGISTER_SUCCESS,
       payload: res.data
     });

     dispatch(loadUser());
   } catch (err) {
     const errors = err.response.data.errors;

     if (errors) {
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     }

     dispatch({
       type: REGISTER_FAIL
     });
   }
 };

 // Log in user
 export const login = (email, password) => async (dispatch) => {
   console.log('hit auth login()');
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };

   const body = JSON.stringify({ email, password });

   try {
     const res = await axios.post('/api/v1/auth', body, config);

     dispatch({
       type: LOGIN_SUCCESS,
       payload: res.data
     });

     dispatch(loadUser());
   } catch (err) {
     const errors = err.response.data.errors;

     if (errors) {
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     }

     dispatch({
       type: LOGIN_FAIL
     });
   }
 };
