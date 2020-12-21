import axios from 'axios';
import { setAlert } from './alert';

import { 
  ACCOUNT_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
 } from './types';

// Get the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });
  }
};

// Create/update a profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/v1/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });    

    dispatch(
      setAlert(
        edit ? 
        'Profile updated' : 
        'Profile created', 
        'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(
        error => dispatch(
          setAlert(error.msg, 'danger')
        )
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });    
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/v1/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });    

    dispatch(
      setAlert(
        'Experience Added', 
        'success')
    );

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(
        error => dispatch(
          setAlert(error.msg, 'danger')
        )
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });    
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/v1/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });    

    dispatch(
      setAlert(
        'Education Added', 
        'success')
    );

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(
        error => dispatch(
          setAlert(error.msg, 'danger')
        )
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });    
  }
};

// Delete Education
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res= await axios.delete(`/api/v1/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        'Experience Deleted', 
        'success')
    );    
    
  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });      
    
  }
};

// Delete Experience
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        'Education Deleted', 
        'success')
    );    
    
  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status,
      }
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    try {
      await axios.delete('/api/v1/profile');
  
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
  
      dispatch(
        setAlert(
          'Your account has been permanently deleted')
      );     
    } catch (err) {
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { 
          msg: err.response.statusText, 
          status: err.response.status,
        }
      });
    }

  }

};
