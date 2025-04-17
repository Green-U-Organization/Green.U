import React from 'react';
import Icon from '../Atom/Icon';
import Submenu from './Submenu';

interface MenuIconProps {
  menuIconList: { src: string; alt: string; handleClick: () => void }[];
  subMenuIconList: {
    src: string;
    alt: string;
    handleClick: () => void;
    displayCondition: boolean;
    form: React.ReactNode;
  }[];
}

const MenuIcon: React.FC<MenuIconProps> = ({
  menuIconList,
  subMenuIconList,
}) => {
  return (
    <>
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
    </>
  );
};

export default MenuIcon;
