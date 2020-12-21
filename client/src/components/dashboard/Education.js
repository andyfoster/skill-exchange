import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// Redux
import { connect } from 'react-redux';


const Education = ({ education }) => {

  const educationItems = education.map(edu => (
    <tr key={edu.id}>
      <td>{edu.school}</td>
    <td className="hide-sm">{edu.degree}</td>
    <td>
      <Moment format=' D MMM YYYY'>{edu.from}</Moment> -
      {
        edu.to === null ? (' Now') : (<Moment format=' D MMM YYYY'>{edu.to}</Moment>)
      }
    </td>
    <td>
      <button className="btn btn-danger">Delete</button>
    </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="">School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationItems}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
}

export default Education;
