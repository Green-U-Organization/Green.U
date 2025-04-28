import React, { FC, PropsWithChildren } from 'react';

const H1: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="mt-2 ml-4 text-4xl">{children}</h1>;
};

export default H1;
