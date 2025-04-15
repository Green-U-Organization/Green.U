import React from 'react';
import Icon from '../Atom/Icon';
import Submenu from './Submenu';

interface MenuIconProps {
  menuIconList: { src: string; alt: string; handleClick: () => void }[];
  subMenuIconList: { src: string; alt: string; handleClick: () => void }[];
}

const MenuIcon: React.FC<MenuIconProps> = ({
  menuIconList,
  subMenuIconList,
}) => {
  return (
    <>
      <Icon icon={menuIconList}>
        <Submenu displayCondition={''} iconList={subMenuIconList}></Submenu>
      </Icon>
    </>
  );
};

export default MenuIcon;
