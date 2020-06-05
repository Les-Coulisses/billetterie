import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useStaticQuery } from 'gatsby';
import { CategoryDto } from '../types';
import query from '../utils';

const useFetchCategories = (
  performanceId: number
): [CategoryDto[], Dispatch<SetStateAction<CategoryDto[]>>] => {
  const data = useStaticQuery(query);
  const [categories, setCategories] = useState<CategoryDto[]>(undefined);

  useEffect(() => {
    setCategories(
      data.allInternalCategories.edges
        .filter(item => item.node.performance_id == performanceId)
        .map(item => item.node)
    );
  }, [performanceId]);

  return [categories, setCategories];
};

export default useFetchCategories;
