import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

export const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div>
      
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.props,
});

// const mapDispatchToProps = {
  
// }

export default connect(mapStateToProps, { getProfiles })(Profiles);
