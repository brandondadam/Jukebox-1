import React from 'react';

export default ({ index, item, session, onRemoveItem, onVoteUp }) => {
  const voteUp = item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0
    ? <button onClick={onVoteUp}>▲</button>
    : null;
  return (
    <tr>
      <td>
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td>
        {index + 1}
      </td>
      <td>
        {item.track.name}
      </td>
      <td>
        {item.track.artists.map(a => a.name).join(', ')}
      </td>
      <td>
        {item.user && (item.user.display_name || item.user.id)}
      </td>
      <td>
        {item.user && session.user && item.user.id === session.user.id
          ? <button
              onClick={() => {
                onRemoveItem(item.id);
              }}
            >
              X
            </button>
          : voteUp}
      </td>
      <td>
        {item.voters && item.voters.length > 0
          ? <span>
              {item.voters.length === 1 ? '1 vote' : item.voters.length + ' votes'}
            </span>
          : ''}
      </td>
    </tr>
  );
};
