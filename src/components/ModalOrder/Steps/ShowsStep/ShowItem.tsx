import React from 'react';
import { ShowDto } from '../../../../types';
import ButtonPrimary from '../../../../components/Buttons/ButtonPrimary';
import ButtonGoldOutlined from '../../../../components/Buttons/ButtonGoldOutlined';
import Img from 'gatsby-image';

interface ShowsItemProps {
  show: ShowDto;
  onSelect: (show: ShowDto) => void;
}

export default function ShowItem({ show, onSelect }: ShowsItemProps) {
  return (
    <div className='ShowItem' key={show.alternative_id}>
      <div className='ShowCover'>
        <Img fluid={show.featuredCover?.childImageSharp.fluid} />
      </div>
      <div className='ShowListActions'>
        <ButtonPrimary
          onClick={() => {
            onSelect(show);
          }}
        >
          Choisir ce spectacle
        </ButtonPrimary>
        <ButtonGoldOutlined>En savoir plus</ButtonGoldOutlined>
      </div>
    </div>
  );
}
