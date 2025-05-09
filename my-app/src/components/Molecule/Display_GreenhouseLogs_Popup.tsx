import React, { FC } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import { useGetAllLogsByGreenhouseIdQuery } from '@/slice/fetch';
import Loading from '../Atom/Loading';

type DisplayGreenhouseLog = {
  greenhouseId: number;
};

const Display_GreenhouseLogs_Popup: FC<DisplayGreenhouseLog> = ({
  greenhouseId,
}) => {
  const {
    data: greenhouseLogs,
    isLoading: greenhouseIsLoading,
    isError: greenhouseIsError,
  } = useGetAllLogsByGreenhouseIdQuery({ greenhouseId });

  if (greenhouseIsLoading) {
    return <Loading />;
  }

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col items-center justify-center">
      <H2>Greenhouse history :</H2>
      <table className="flex min-w-full">
        <thead>
          <tr className="border-1">
            <th className="border-1 p-1 text-lg">Date</th>
            <th className="border-1 p-1 text-lg">Action</th>
            <th className="border-1 p-1 text-lg">Comment</th>
            <th className="border-1 p-1 text-lg">Author</th>
          </tr>
        </thead>
        <tbody>
          {greenhouseLogs?.logs?.map((log) => (
            <tr key={log.id}>
              <td className="border-1 p-1 text-lg">
                <img src={log.createdAt} alt="" className="mx-auto" />
              </td>
              <td className="border-1 p-1 text-lg">{log.action}</td>
              <td className="border-1 p-1 text-lg">{log.comment}</td>
              <td className="border-1 p-1 text-lg">{log.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Display_GreenhouseLogs_Popup;
