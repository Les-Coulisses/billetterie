import React from 'react';
import ShowItem from './ShowItem';
import { ShowDto } from '../../../../types';

import './ShowsStep.scss';

interface ShowsStepProps {
  shows: ShowDto[];
}

export default function ShowsStep({ shows }: ShowsStepProps) {
  return (
    <ul className='CoulissesShowsList'>
      {shows.map((show, index) => {
        return (
          <li key={index}>
            <ShowItem key={index} show={show} />
          </li>
        );
      })}
    </ul>
  );
}
