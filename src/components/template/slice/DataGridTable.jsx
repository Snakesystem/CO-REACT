import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useApi } from '../../../hooks/useApi';
import { LoadingSkeleton } from '../../../utils/utility';
import { useLoadingApi } from '../../../hooks/useLoadingApi';

const TableData = lazy(() => import('./TableData'));

export default function DataGridTable() {

  const [header, setHeader] = useState([]);

  const { isLoading, error } = useLoadingApi();
  const { getRequest } = useApi();

  useEffect(() => {
    const getHeader = async () => {
      try {
        const result = await getRequest(`api/generic/data/header?tablename=instruksibca`);
        setHeader(result);
      } catch (error) {
        console.error(error);
      }
    };
    getHeader();
  }, []);
  
  return (
    <div>
      {error}
      {isLoading ? <LoadingSkeleton count={15}/> : header ? (
          <Suspense fallback={<LoadingSkeleton count={15}/>}>
            <TableData 
              header={header} 
              nidkey="Statement_ID"
              url="http://localhost:8111/api/generic/data/getdata"/>
          </Suspense>
        ) : []}

    </div>
  )
}
