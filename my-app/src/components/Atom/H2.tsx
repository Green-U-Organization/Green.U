import React, { FC, PropsWithChildren } from 'react';

const H2: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="mt-0 ml-4 text-2xl">{children}</h2>;
};

export default H2;
