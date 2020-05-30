import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useStaticQuery } from 'gatsby';
import { PerformanceDto } from '../types';
import { query } from '../utils';

const useFetchPerformances = (
  showId: string
): [PerformanceDto[], Dispatch<SetStateAction<PerformanceDto[]>>] => {
  const data = useStaticQuery(query);
  const [performances, setPerformances] = useState<PerformanceDto[]>(undefined);

  useEffect(() => {
    console.log(showId + '');
    console.log(
      'allPerformances',
      data.allInternalPerformances.edges.map(item => item.node)
    );
    setPerformances(
      data.allInternalPerformances.edges
        .filter(item => item.node.show_id == showId)
        .map(item => item.node)
    );
  }, [showId]);

  return [performances, setPerformances];
};

export default useFetchPerformances;
