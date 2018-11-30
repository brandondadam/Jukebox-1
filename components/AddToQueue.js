import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { searchTracks, searchTracksReset } from '../actions/searchActions';
import { queueTrack } from '../actions/queueActions';

class ResultsList extends Component {
  render() {
    const { results, focus } = this.props;
    return (
      <div className="hide-scroll-container">
      <style jsx>{`
        .hide-scroll-container {
          width: calc(100% - 1.2em - 4px);
          list-style: none;
          margin: -2.55em 0 0 0;
          position: absolute;
          left: .6em;
          background: #f2f2f2;
          z-index: 1;
          top: 0;
          border-radius: 1.4em;
          border: 2px solid #092EF2;
          overflow: hidden;
          height: calc(100% + 1em);
        }
        .add-to-queue__search-results {
          width: calc(100% - 1em);
          list-style: none;
          margin: 0;
          padding: .5em;
          position: relative;
          z-index: 1;
          padding-top: calc(24px + 2em);
          top: 0;
          border-radius: 1.4em;
          overflow: auto;
          height: calc(100% - 24px - 2.4em);
        }
        .add-to-queue__search-results li {
          margin: 0 0 1em 0;
        }
        .add-to-queue__search-results li:last-child {
          margin: 0 0 .2em 0;
        }
        .add-to-queue__search-results-item {
          transition: .25s ease;
          border-radius: .5em;
        }
        .add-to-queue__search-results-item:hover {
          background: rgba(0,0,0,.1);
          cursor: pointer;
        }
        .add-to-queue__search-results-item:hover .album-img {
          box-shadow: 0 .7em 1.2em rgba(0,0,0,.25);
          opacity: 1;
          transform: scale(1.08);
        }
        .add-to-queue__search-results-item--focused {
          background-color: #f2f2f2;
        }
        .container{
          display: flex;
        }
        .album-img{
          opacity: .45;
          width: 65px;
          height: 65px;
          min-width: 65px;
          min-height: 65px;
          max-width: 65px;
          max-height: 65px;
          overflow: hidden;
          border-radius: .5em;
          box-shadow: 0 .6em 1em rgba(0,0,0,.35);
          transition: .25s ease;
        }
        .album-img img{
          width: 100%;
          height: 100%;
        }
        .flex-item{
            flex-grow: 1;
            margin: 0 0 0 .8em;
            width: calc(100% - 65px - .8em);
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-content: center;
            transition. .25s ease;
        }
        .song-name {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: calc(100% - 1em);
        }
        .artist-name {
          opacity: .54;
          font-size: .825em;
          margin-bottom: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: calc(100% - 1em);
        }
      `}</style>
        <ul className="add-to-queue__search-results">
          {results.map((r, index) => {
            const isFocused = focus === index;
            const className =
              'add-to-queue__search-results-item' + (isFocused ? ' add-to-queue__search-results-item--focused' : '');
            return (
              <li key={r.id} className={className} onClick={() => this.props.onSelect(r.id)}>
                <div className="container">
                  <div className="album-img">
                    <img src={r.album.images[2].url}/>
                  </div>
                  <div className="flex-item">
                    <div className="song-name">{r.name}</div>
                    <div className="artist-name">{r.artists[0].name}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class AddToQueue extends Component {
  state = {
    text: this.props.text || '',
    focus: -1
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState({ text: text });
    if (text !== '') {
      this.props.searchTracks(text);
    } else {
      this.setState({ focus: -1 });
      this.props.searchTracksReset();
    }
  };

  handleSelectElement = id => {
    this.setState({ text: '' });
    this.props.queueTrack(id);
    this.props.searchTracksReset();
  };

  handleBlur = e => {
    // todo: this happens before the item from the list is selected, hiding the
    // list of results. We need to do this in a different way.
    /*    this.setState({ focus: -1 });
    this.props.searchTracksReset(); */
  };

  handleFocus = e => {
    if (e.target.value !== '') {
      this.props.searchTracks(e.target.value);
    }
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 38: // up
        this.setState({ focus: this.state.focus - 1 });
        break;
      case 40: // down
        this.setState({ focus: this.state.focus + 1 });
        break;
      case 13: {
        let correct = false;
        if (this.state.focus !== -1) {
          this.props.queueTrack(this.props.search.results[this.state.focus].id);
          correct = true;
        } else {
          const text = e.target.value.trim();
          if (text.length !== 0) {
            this.props.queueTrack(text);
            correct = true;
          }
        }
        if (correct) {
          this.setState({ text: '' });
          this.props.searchTracksReset();
          this.setState({ focus: -1 });
        }
        break;
      }
    }
  };

  componentDidUpdate() {
    if(this.state.active)
      this.focusDiv();
  }

  focusDiv() {
    ReactDOM.findDOMNode(this.refs.theDiv).focus();
  }

  render() {
    const placeholder = this.props.intl.formatMessage({id: 'queue.add'});
    const results = this.props.search.results;
    return (
      <div className="add-to-queue" onBlur={this.handleBlur}>
        <style jsx>{`
          .add-to-queue {
            display: flex;
            flex-flow: column;
            justify-content: center;
            z-index: 9999;
            margin-top: -2.6em;
          }
          .add-queue-wrapper {
            display: flex;
            align-items: center;
            width: calc(100% - 1.25em);
            border: none;
            background: #092EF2;
            color: #fff;
            padding: 0;
            font-size: 1em;
            border-radius: 3em;
            margin: 0 auto;
            box-shadow: 0 .5em 1em rgba(0,0,0,.25);
            z-index: 999;
            transition: .25s ease;
          }
          .add-queue-wrapper:hover {
            box-shadow: 0 .65em 1.2em rgba(0,0,0,.2);
            transform: scale(1.02);
          }
          .add-queue-wrapper:focus {
            outline: none;
            transform: scale(1.02);
            box-shadow: 0 .65em 1.2em rgba(0,19,211,.35);
          }
          .add-queue-wrapper span {
            position: absolute;
            margin-left: .8em;
            width: 24px;
            height: 24px;
            pointer-events: none;
          }
          .add-to-queue__input {
            width: 100%;
            border: none;
            background: #092EF2;
            color: #fff;
            padding: .8em .8em .8em 2.8em;
            font-size: 1em;
            border-radius: 3em;
            margin: 0;
          }
          .add-to-queue__input:focus {
            outline: none;
            box-shadow: 0 .65em 1.2em rgba(0,19,211,.35);
          }
          .queue-icon {
            position: relative;
            border: none;
            width: 24px;
            height: 24px;
          }
          ::placeholder {
            color: #fff;
            opacity: .5;
          }
          :-ms-input-placeholder {
            color: #fff;
            opacity: .5;
          }
          ::-ms-input-placeholder {
            color: #fff;
            opacity: .5;
          }
        `}</style>
        <div className="add-queue-wrapper">
          <span><img className="queue-icon" src="/static/add-queue.svg" /></span>
          <input
            className="add-to-queue__input"
            placeholder={placeholder}
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
          />
        </div>
        {results && <ResultsList results={results} onSelect={this.handleSelectElement} focus={this.state.focus} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  searchTracks: query => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset())
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddToQueue));
