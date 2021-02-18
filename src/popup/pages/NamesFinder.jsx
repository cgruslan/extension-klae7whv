import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { call } from '../../utils';
import * as types from '../../background/constants/ActionTypes';

class NamesFinder extends Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      input: { pageCount: 5 },
    };
  }
  
  render() {
    const { currentTask } = this.props;

    return (
      <div>
        <Link to="/">Back</Link>

        {!currentTask ? (
          <form style={{ marginTop: '1em' }}>
            <div className="field">
              <label className="label">Page count</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="5"
                  name="pageCount"
                  onChange={this.handleInputChange}
                  value={this.state.input.pageCount}
                />
              </div>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={this.handleButtonClick}
                disabled={this.state.input.pageCount < 1}
              >
                Search
              </button>
            </div>
          </form>
        ) : (
          <form style={{ marginTop: '1em' }}>
            <div className="field">
              <p>Task is running.</p>
            </div>
            {currentTask === 'NAMES' && (
              <div className="control">
                <button
                  className="button is-danger"
                  onClick={this.handleStopClick}
                >
                  Stop
                </button>
              </div>
            )}
            <div className="field" style={{ marginTop: '1em' }}>
              <Link to="/data">Go to data</Link>
            </div>
          </form>
        )}
      </div>
    );
  }

  handleButtonClick() {
    call('toggleNamesFinder', Number(this.state.input.pageCount));
    this.props.dispatch({ type: types.SET_CURRENT_TASK, task: 'NAMES' });
  }

  handleStopClick() {
    call('toggleNamesFinder');
    this.props.dispatch({ type: types.SET_CURRENT_TASK, task: '' });
  }

  handleInputChange(event) {
    this.setState({
      input: {
        [event.target.name]: event.target.value,
      },
    });
  }
}

function mapStateToProps(state) {
  return {
    currentTask: state.currentTask,
  };
}

export default connect(mapStateToProps)(NamesFinder);
