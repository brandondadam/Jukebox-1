import React from 'react';

class NowPlaying extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      currentPosition: 0
    };
    this.timer = null;
    this.tick = () => {
      this.setState({
        currentPosition: Date.now() - this.state.start + (this.props.position || 0)
      });
    };
  }
  componentWillReceiveProps(props) {
    if (this.props.position !== props.position || this.props.track !== props.track) {
      this.setState({
        start: Date.now(),
        currentPosition: 0
      });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const percentage = +(this.state.currentPosition * 100 / this.props.track.duration_ms).toFixed(2) + '%';
    const userName = this.props.user.display_name || this.props.user.id;
    return (
      <div className="now-playing">
        <style jsx>{`
          .now-playing {
            background-color: #F2F2F2;
            color: #fff;
            height: 100%;
            width: 375px;
            top: 0;
            position: fixed;
            display: flex;
            flex-flow: row;
            z-index: 999;
          }
          .media {
            display: flex;
            flex-flow: column;
            top: 50%;
            position: relative;
            transform: translateY(-50%);
            margin: 0;
          }
          .media__bd {
            margin: .5em;
            position: absolute;
            width: calc(100% - 1.1em);
          }
          .media__img {
            position: relative;
            width: 375px;
            height: 375px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
          }
          .gradient {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(-180deg, rgba(21,24,35,0.50) 14%, rgba(150,152,159,0.67) 56%, rgba(232,233,237,0.80) 83%, #F2F2F2 97%);
          }
          .dark-filter {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: .15;
          }
          .album-cover {
            width: 100%;
            height: 100%;
          }
          .now-playing__track-name {
            font-size: 2em;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .now-playing__artist-name {
            font-size: 1.2em;
            transform: translateY(-.15em);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .user-suggestion-wrapper {
            display: flex;
            flex-flow: row;
            align-items: center;
            margin-top: .5em;
          }
          .user-suggestion-wrapper .user-name{
            margin-left: .3em;
          }
          .now-playing__progress_bar {
            top: 0;
            background-color: #092EF2;
            height: .25em;
            position: absolute;
            width: 100%;
          }
        `}</style>
        <div className="now-playing__text media">
          <div className="media__img">
          <div className="dark-filter"></div>
            <div className="gradient"></div>
            <img src={this.props.track.album.images[1].url} className="album-cover" />
          </div>
          <div className="now-playing__bd media__bd">
            <div className="now-playing__track-name">
              {this.props.track.name}
            </div>
            <div className="now-playing__artist-name">
              {this.props.track.artists.map(a => a.name).join(', ')}
            </div>
            <div className="user-suggestion-wrapper">
              <img
                className="user-image"
                src={
                  (this.props.user.images && this.props.user.images.length && this.props.user.images[0].url) ||
                    '/static/user-white.svg'
                }
                width="30"
                height="30"
                border="none"
                alt={userName}
                title={userName}
              />
              <div className="user-name">
                {userName}
              </div>
            </div>
          </div>
        </div>
        <div className="now-playing__progress">
          <div className="now-playing__progress_bar" style={{ width: percentage }} />
        </div>
      </div>
    );
  }
}

export default NowPlaying;
