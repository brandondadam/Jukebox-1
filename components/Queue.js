import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import QueueItem from './QueueItem';
import { queueRemoveTrack } from '../actions/queueActions';
import { voteUp } from '../actions/voteActions';

class Queue extends React.PureComponent {
  render() {
    const { items, session } = this.props;
    return (
      <div className="queued-songs-wrapper">
        <style jsx>{`
          .queued-songs-wrapper {
            margin: 0 .8em;
            background: #f2f2f2;
            position: absolute;
            top: 0;
            height: 100%;
          }
        `}</style>
        <h3><FormattedMessage id="queue.title" /></h3>
        {items.length === 0
          ? <p><FormattedMessage id="queue.empty" /></p>
          : <table className="queued-items">
              <tbody>
                {items.map((i, index) => (
                  <QueueItem
                    item={i}
                    session={session}
                    index={index}
                    key={index}
                    onVoteUp={() => this.props.voteUp(i.id)}
                    onRemoveItem={() => this.props.queueRemoveTrack(i.id)}
                  />
                ))}
              </tbody>
            </table>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  voteUp: id => dispatch(voteUp(id)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id))
});

const mapStateToProps = state => ({
  queue: state.queue
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
