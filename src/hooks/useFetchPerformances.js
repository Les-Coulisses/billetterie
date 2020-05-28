import { useState, useEffect } from 'react';
import { useStaticQuery } from 'gatsby';
import { query } from '../utils';

const useFetchPerformances = showId => {
  const data = useStaticQuery(query);
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    setPerformances(
      data.allInternalPerformances.edges.filter(
        item => item.node.show_id === showId
      )
    );
  }, []);

  return [performances, setPerformances];
};

export default useFetchPerformances;
