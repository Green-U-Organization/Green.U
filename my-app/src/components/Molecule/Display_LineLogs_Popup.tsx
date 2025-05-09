import React, { FC } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import { useGetAllLogsByLineIdQuery } from '@/slice/fetch';
import Loading from '../Atom/Loading';

type DisplayLineLog = {
  lineId: number;
};

const Display_LineLogs_Popup: FC<DisplayLineLog> = ({ lineId }) => {
  const {
    data: lineLogs,
    isLoading: lineIsLoading,
    isError: lineIsError,
  } = useGetAllLogsByLineIdQuery({ lineId });

  if (lineIsLoading) {
    return <Loading />;
  }

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col items-center justify-center">
      <H2>Line history :</H2>
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
          {lineLogs?.content.map((log) => (
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

export default Display_LineLogs_Popup;
