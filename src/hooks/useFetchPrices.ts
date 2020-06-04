import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useStaticQuery } from 'gatsby';
import { PriceDto } from '../types';
import { query } from '../utils';

const useFetchPrices = (
  performanceId: number,
  categoryId: number
): [PriceDto[], Dispatch<SetStateAction<PriceDto[]>>] => {
  const data = useStaticQuery(query);
  const [prices, setPrices] = useState<PriceDto[]>(undefined);
  console.log('performanceId', performanceId);
  console.log('categoryId', categoryId);

  useEffect(() => {
    if (!performanceId !== undefined && categoryId !== undefined) {
      console.log(
        'allPrices',
        data.allInternalPrices.edges.map(item => item.node)
      );
      setPrices(
        data.allInternalPrices.edges
          .filter(
            item =>
              item.node.performance.alternative_id == performanceId &&
              item.node.category.alternative_id == categoryId
          )
          .map(item => item.node)
      );
    }
  }, [categoryId, performanceId]);

  return [prices, setPrices];
};

export default useFetchPrices;
