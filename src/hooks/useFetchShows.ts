import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ShowDto } from '../types';
import query from '../utils';

const useFetchShows = (): [ShowDto[], Dispatch<SetStateAction<ShowDto[]>>] => {
  const data = useStaticQuery(query);
  const [shows, setShows] = useState<ShowDto[]>(undefined);

  useEffect(() => {
    setShows(data.allInternalShows.edges.map(item => item.node));
  }, []);

  return [shows, setShows];
};

export default useFetchShows;
