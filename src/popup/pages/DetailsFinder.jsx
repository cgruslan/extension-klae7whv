import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DetailsFinder extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProcessClick = this.handleProcessClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);

    this.state = {
      input: { companies: '' },
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
              <label className="label">
                Companies to process
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="companies"
                  type="text"
                  rows="4"
                  onChange={this.handleInputChange}
                  value={this.state.input.companies}
                />
              </div>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={this.handleProcessClick}
              >
                Process list
              </button>
            </div>
          </form>
        ): (
          <form style={{ marginTop: '1em' }}>
            <div className="field">
              <p>Task is running.</p>
            </div>
            {currentTask === 'DETAILS' && (
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

  handleInputChange(event) {
    this.setState({
      input: {
        [event.target.name]: event.target.value,
      },
    });
  }

  handleProcessClick() {
    const bgWindow = chrome.extension.getBackgroundPage();
    bgWindow.listProcessor.start(
      this.state.input.companies
        .trim().split('\n')
        .filter(Boolean)
    );
  }

  handleStopClick() {
    const bgWindow = chrome.extension.getBackgroundPage();
    bgWindow.listProcessor.stop();
  }
}

function mapStateToProps(state) {
  return {
    currentTask: state.currentTask,
    names: state.businessNames,
  };
}

export default connect(mapStateToProps)(DetailsFinder);
