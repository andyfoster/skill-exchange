import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';

// Redux
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ 
  getCurrentProfile, 
  auth: { user }, 
  profile: {profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? <Spinner /> : 
    <Fragment>
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome, { user && user.name }
      </p>
      { profile !== null ? 
      <Fragment>You have a profile</Fragment> : 
      <Fragment>No profile</Fragment> }
      <p className=""></p>
    </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
