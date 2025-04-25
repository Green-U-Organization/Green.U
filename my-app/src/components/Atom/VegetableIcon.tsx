import { useGetCropByLineIdQuery } from '@/slice/garden';
import { VegetableIconProps } from '@/utils/types';

const VegetableIcon = ({ id }: VegetableIconProps) => {
  const { data: crops } = useGetCropByLineIdQuery({
    lineId: id,
  });
  return (
    <>
      {crops?.content[0]?.icon && crops.content[0].icon !== '' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={crops.content[0].icon} alt="" className="w-[6vw]" />
      )}
    </>
  );
};

export default VegetableIcon;
