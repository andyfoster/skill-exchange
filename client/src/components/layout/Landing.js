import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to HobbySwap</h1>
          <p className="lead">
            Trade skills with other people in your area or online
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">Sign Up</Link>
            <Link to='/login' className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
