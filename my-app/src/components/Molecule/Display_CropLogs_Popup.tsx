import React, { FC } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import { useGetAllLogsByCropIdQuery } from '@/slice/fetch';
import Loading from '../Atom/Loading';

type DisplayCropLog = {
  cropId: number;
};

const Display_CropLogs_Popup: FC<DisplayCropLog> = ({ cropId }) => {
  const {
    data: cropLogs,
    isLoading: cropIsLoading,
    isError: cropIsError,
  } = useGetAllLogsByCropIdQuery({ cropId });

  if (cropIsLoading) {
    return <Loading />;
  }

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col items-center justify-center">
      <H2>Crop history :</H2>
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
          {cropLogs?.logs?.map((log) => (
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

export default Display_CropLogs_Popup;
