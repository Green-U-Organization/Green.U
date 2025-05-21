/* eslint-disable @next/next/no-img-element */
import { useGetCropByLineIdQuery } from '@/redux/api/fetch';
import { VegetableIconProps } from '@/utils/types';

const VegetableIcon = ({ id }: VegetableIconProps) => {
  // const { data: crops } = useGetCropByLineIdQuery({
  //   lineId: id,
  // });
  // return (
  //   <>
  //     {crops?.content[0]?.icon && crops.content[0].icon !== '' && (
  //       <img src={crops.content[0].icon} alt="" className="w-[6vw]" />
  //     )}
  //   </>
  // );
};

export default VegetableIcon;
