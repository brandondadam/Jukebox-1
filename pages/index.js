import Link from 'next/link';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/MyLayout.js';
import { initStore } from '../store/store';
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
import Users from '../components/Users';
import Queue from '../components/Queue';
import AddToQueue from '../components/AddToQueue';
import NowPlaying from '../components/NowPlaying';
import Devices from '../components/Devices';
import PageWithIntl from '../components/PageWithIntl';
import { FormattedMessage } from 'react-intl';

class Main extends React.Component {
  static getInitialProps({ req, store, isServer }) {
    return Promise.all([
      store.dispatch(fetchQueue()),
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPlayingContext())
    ]);
  }
  render() {
    return (
      <Layout>
        {this.props.playing.track
          ? <NowPlaying
              track={this.props.playing.track}
              user={this.props.playing.user}
              position={this.props.playing.position}
            /> :
          <div className="placeholder-song">
            <div className="dark-filter"></div>
            <div className="gradient"></div>
            <h1>Hi!</h1>
            <h1>You're the first one here. Make sure to sign in to the right. Then enter a song below to get started.</h1>
          </div>}
        <div className="app">
          <style jsx global>
            {`
              .app {
                position: absolute;
                width: 100%;
                height: calc(100% - 42px - 1em);
                margin-top: calc(42px + 1em);
              }
              .placeholder-song {
                position: fixed;
                background: #000;
                color: #fff;
                margin: 0;
                padding: .8em;
                width: calc(375px - 1.6em);
                height: calc(375px - 1.6em);
                top: 0;
                left: 0;
              }
              .placeholder-song h1{
                position: relative;
                margin: 0 0 .5em 0;
                width: calc(100% - 1.6em);
              }
              .gradient {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(-180deg, rgba(21,24,35,0.50) 14%, rgba(150,152,159,0.67) 56%, rgba(232,233,237,0.80) 83%, #F2F2F2 97%);
              }
              .dark-filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                opacity: .15;
              }
              .queue {
                position: fixed;
                width: 375px;
                left: 0;
                height: calc(100% - 375px);
                bottom: 0;
                background: f2f2f2;
                display: flex;
                flex-flow: column;
                background: #f2f2f2;
                z-index: 9999;
              }
              .page-content {
                width: calc(100% - 375px - 1.8em);
                margin: 0 .8em 0 auto;
              }
              .active-user-wrapper {
                margin-bottom: 3em;
              }
              ::-webkit-scrollbar {
                width: .3em;
              }
              ::-webkit-scrollbar-track {
                background: #f2f2f2;
              }
              ::-webkit-scrollbar-thumb {
                background: #BAC4FE;
              }
            `}
          </style>
          <div className="queue">
            {this.props.session.user !== null ? <AddToQueue /> : null}
            <Queue items={this.props.queue} session={this.props.session} />
          </div>

          <div className="page-content">
            <div className="active-user-wrapper">
              <Users items={this.props.users} />
            </div>
            <div className="available-devices-wrapper">
              {this.props.session.user !== null ? <Devices /> : null}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

export default withRedux(initStore, mapStateToProps, null)(PageWithIntl(Main));
