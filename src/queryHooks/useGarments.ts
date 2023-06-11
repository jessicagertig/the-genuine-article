import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiGet, apiPost } from './api';

const getGarments = async () => {
  return await apiGet({ endpoint: '/items'});
}


/* Hooks
--===================================================-- */

function useGarments(): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["garments"], ()  => getGarments(), {
    refetchOnWindowFocus: false,
  })
}



export { useGarments };