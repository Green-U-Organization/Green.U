import React, { FC, useState, useMemo } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import {
  useGetAllLogsByCropIdQuery,
  useGetAllLogsByGardenIdQuery,
  useGetAllLogsByGreenhouseIdQuery,
  useGetAllLogsByLineIdQuery,
  useGetAllLogsByNurseryIdQuery,
  useGetAllLogsByParcelIdQuery,
} from '@/slice/fetch';
import Loading from '../Atom/Loading';
import { Log } from '@/utils/types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

type SortConfig = {
  key: keyof Log;
  direction: 'ascending' | 'descending';
};

type DisplayLog = {
  id?: number;
  display: boolean;
  logObject: string;
};

const Display_Logs_Popup: FC<DisplayLog> = ({ id, display, logObject }) => {
  let logs, isLoading, isError;

  switch (logObject) {
    case 'garden':
      ({
        data: logs,
        isLoading,
        isError,
      } = useGetAllLogsByGardenIdQuery({ id }));
      break;
    case 'parcel':
      ({
        data: logs,
        isLoading,
        isError,
      } = useGetAllLogsByParcelIdQuery({ id }));
      break;
    case 'line':
      ({ data: logs, isLoading, isError } = useGetAllLogsByLineIdQuery({ id }));
      break;
    case 'crop':
      ({ data: logs, isLoading, isError } = useGetAllLogsByCropIdQuery({ id }));
      break;
    case 'nursery':
      ({
        data: logs,
        isLoading,
        isError,
      } = useGetAllLogsByNurseryIdQuery({ id }));
      break;
    case 'greenhouse':
      ({
        data: logs,
        isLoading,
        isError,
      } = useGetAllLogsByGreenhouseIdQuery({ id }));
      break;
    default:
      ({
        data: logs,
        isLoading,
        isError,
      } = useGetAllLogsByGardenIdQuery({ id }));
      break;
  }

  console.log(logs);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'createdAt', // Colonne par défaut à trier
    direction: 'descending', // Ordre par défaut
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const sortedLogs = useMemo(() => {
    if (!logs?.content) return [];

    const sortableItems = [...logs.content];
    sortableItems.sort((a, b) => {
      // Gestion des valeurs nulles ou undefined
      if (a[sortConfig.key] === null || a[sortConfig.key] === undefined)
        return 1;
      if (b[sortConfig.key] === null || b[sortConfig.key] === undefined)
        return -1;

      if ((a[sortConfig.key] ?? '') > (b[sortConfig.key] ?? '')) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if ((a[sortConfig.key] ?? '') > (b[sortConfig.key] ?? '')) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [logs, sortConfig]);

  const requestSort = (key: keyof Log) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Log) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? (
      <FaArrowUp className="ml-1 inline" />
    ) : (
      <FaArrowDown className="ml-1 inline" />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section
      style={{
        display: display ? 'flex' : 'none',
      }}
      className={`${logObject === 'garden' ? 'fixed right-[8vw] bottom-[2vh] z-50 flex h-[auto] max-h-[90vh] w-[70vw]' : 'm-auto w-[80vw]'} bg-cardbackground flex-col items-center justify-between rounded-xl border-2`}
    >
      <H2>{logObject} history :</H2>
      <div
        className={` ${logObject === 'garden' ? 'w-[68vw]' : 'w-full'} overflow-auto`}
      >
        <table className="min-w-full">
          <thead>
            <tr className="border-1">
              <th
                className="cursor-pointer border-1 p-1 text-lg hover:bg-gray-100"
                onClick={() => requestSort('createdAt')}
              >
                Date{getSortIndicator('createdAt')}
              </th>
              <th
                className="cursor-pointer border-1 p-1 text-lg hover:bg-gray-100"
                onClick={() => requestSort('action')}
              >
                Action{getSortIndicator('action')}
              </th>
              <th
                className="cursor-pointer border-1 p-1 text-lg hover:bg-gray-100"
                onClick={() => requestSort('comment')}
              >
                Comment{getSortIndicator('comment')}
              </th>
              <th
                className="cursor-pointer border-1 p-1 text-lg hover:bg-gray-100"
                onClick={() => requestSort('userName')}
              >
                Author{getSortIndicator('userName')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs?.map((log: Log) => (
              <tr key={log.id} className="border-1">
                <td className="border-1 p-1 text-lg">
                  {formatDate(log.createdAt)}
                </td>
                <td className="border-1 p-1 text-lg">{log.action}</td>
                <td className="border-1 p-1 text-lg">{log.comment}</td>
                <td className="border-1 p-1 text-lg">{log.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Display_Logs_Popup;
