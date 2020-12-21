import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';
import { Link } from 'react-router-dom';

import DashboardActions from './DashboardActions';
import Experience from './Experience';

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
      (<Fragment>
        <DashboardActions />
        <Experience experience={profile.experience} />
      </Fragment>) : 
      (<Fragment>
        You don't have a profile yet.
        <Link to='/create-profile' className="btn btn-primary my-1">
          Create a profile
        </Link>
      </Fragment>) }
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
