import React from 'react';
import Icon from '../Atom/Icon';
import Submenu from './Submenu';
import { MenuIconProps } from '@/utils/types';

const MenuIcon: React.FC<MenuIconProps> = ({
  menuIconList,
  subMenuIconList,
}) => {
  return (
    <div className="m-50 py-[50%]">
      {menuIconList.map((menuIcon, index) => (
        <div key={index}>
          <Icon
            icon={{
              src: menuIcon.src,
              alt: menuIcon.alt,
              handleClick: menuIcon.handleClick,
            }}
          />
          <Submenu
            displayCondition={true}
            iconList={subMenuIconList.map((icon) => ({
              ...icon,
              displayCondition: true,
              form: <div>Default Form</div>,
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuIcon;
