import Link from 'next/link';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div className="page-header">

    <div className="logo-section">
      <img src="/static/logo.svg" height="40" />
      <h1>Jukebox-1</h1>
    </div>

    <div className="control-section">
      {session.user
        ? <div className="playback-control">
            <style jsx>
              {ButtonStyle}
            </style>
            <style jsx>
              {ButtonDarkStyle}
            </style>
            <style jsx>{`
              .playback-control {
                margin-right: .5em;
              }
            `}</style>
            <button
              className="btn btn--dark"
              onClick={() => {
                muted ? unmutePlayback() : mutePlayback();
              }}
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        : null}
      {session.user
        ? <div className="media user-header">
            <style jsx>{`
              .user-header {
                display: flex;
                align-items: center;
                flex-flow: row-reverse;
              }
              .user-image {
                margin-left: .5em;
              }
            `}</style>
              <img
                className="user-image"
                src={
                  (session.user.images && session.user.images.length && session.user.images[0].url) ||
                    '/static/user.svg'
                }
                width="30"
                height="30"
                alt={getNameFromUser(session.user)}
              />
            <div className="user-name media__bd">
              {getNameFromUser(session.user)}
            </div>
          </div>
        : <button className="btn btn--dark" style={{ float: 'right' }} onClick={login}>
            <style jsx>{ButtonStyle}</style>
            <style jsx>{ButtonDarkStyle}</style>
            <FormattedMessage id="login" />
          </button>}
    </div>

    {<style jsx>{`
      .page-header {
        position: fixed;
        padding: .5rem .8em;
        width: calc(100% - 1.6em - 375px);
        top: 0;
        right: 0;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #e0e0e0;
        background: #fff;
        z-index: 999;
      }
      .logo-section {
        display: flex;
        flex-flow: row;
        align-items: center;
      }
      h1 {
        margin: 0;
        font-size: 1.35em;
        margin-left: .2em;
      }
      .control-section {
        display: flex;
        flex-flow: row;
      }
    `}</style>}
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
