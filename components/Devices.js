import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';
class Devices extends React.PureComponent {
  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <style jsx>
          {`
            .header-with-btn {
              display: flex;
              flex-flow: row;
              align-items: center;
            }
            .header-with-btn h2{
              margin-right: .5em;
            }
            .btn {
              border: none;
              border-radius: 5em;
              color: #fff;
              cursor: pointer;
              font-weight: bold;
              font-size: .8em;
              padding: .5em .8em;
              display: flex;
              background: #092EF2;
              align-items: center;
              align-content: center;
              font-family: 'nunito sans';
              letter-spacing: .5px;
              transition: .3s ease;
            }
            .btn:hover {
              box-shadow: 0 .6em 1em rgba(0,0,0,.25);
              pointer: cursor;
              transform: translateY(-2px);
            }
            .btn img {
              margin-right: .5em;
            }
            .text-space {
              margin: 0 0 .5em 0;
            }
          `}
        </style>

        <div className="header-with-btn">
          <h2><FormattedMessage id="devices.title"/></h2>
          <button
            className="btn"
            disabled={isFetching}
            onClick={() => {
              fetchAvailableDevices();
            }}
          >
            <img src="../static/devices.svg" />
            <FormattedMessage id="devices.fetch" />
          </button>
        </div>

        {devices.length === 0
          ? <p className="text-space"><FormattedMessage id="devices.empty" /></p>
          : <table>
              <tbody>
                {devices.map(device => (
                  <tr>
                    <td>
                      {device.is_active
                        ? <strong>Active -&gt;</strong>
                        : <button
                            onClick={() => {
                              transferPlaybackToDevice(device.id);
                            }}
                          >
                            <FormattedMessage id="devices.transfer" />
                          </button>}
                    </td>
                    <td>
                      {device.name}
                    </td>
                    <td>
                      {device.type}
                    </td>
                    <td>
                      {device.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
