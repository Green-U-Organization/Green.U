import { useGetCropByLineIdQuery } from '@/slice/garden';

interface VegetableIconProps {
  id: number;
}

const VegetableIcon = ({ id }: VegetableIconProps) => {
  const { data: crops } = useGetCropByLineIdQuery({
    lineId: id,
  });
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <>
      {crops?.content[0]?.icon && crops.content[0].icon !== '' && (
        <img src={crops.content[0].icon} alt="" className="w-[6vw]" />
      )}
    </>
  );
};

export default VegetableIcon;
