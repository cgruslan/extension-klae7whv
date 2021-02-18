import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as types from '../../background/constants/ActionTypes'

class Data extends Component {
  constructor() {
    super();
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>

        <form style={{ marginTop: '1em' }}>
          <div className="field">
            <label className="label">
              Names ({this.props.names.length})
            </label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                placeholder=""
                rows="3"
                value={this.props.names.join('\n')}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Companies ({this.props.businesses.length})
            </label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                placeholder=""
                rows="3"
                value={JSON.stringify(this.props.businesses)}
              />
            </div>
          </div>
          <div className="control">
            <button
              className="button is-danger"
              onClick={this.handleRemoveClick}
            >
              Remove data
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleRemoveClick() {
    this.props.dispatch({
      type: types.SET_BUSINESS_NAMES,
      names: [],
    });
    this.props.dispatch({
      type: types.SET_BUSINESSES,
      businesses: [],
    });
  }
}

function mapStateToProps(state) {
  return {
    names: state.businessNames,
    businesses: state.businesses,
  };
}

export default connect(mapStateToProps)(Data);
