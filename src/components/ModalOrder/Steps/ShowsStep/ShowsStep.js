import React from 'react';
import { getShows } from '../../../../utils';

export default function ShowsStep() {
  const showsList = getShows();

  return (
    <ul>
      {showsList.map(item => (
        <li style={{ width: 250 }} key={item.node.id}>
          test
        </li>
      ))}
    </ul>
  );
}
