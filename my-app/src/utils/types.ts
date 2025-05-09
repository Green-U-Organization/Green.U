export type BentoCardHeaderProps = {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
  pageLink: string;
};

// export type ButtonProps =
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   disabled?: boolean;
// }

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  bgColor?: string;
  ref?: React.Ref<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type DropdownSelectProps<T> = {
  label: string;
  placeholder: string;
  options: T[]; // Liste d'options générique
  selectedValue: T;
  setSelectedValue: (value: T) => void;
  error?: boolean;
};

export type FileUploadProps = {
  onFileChange: (file: File) => void;
};

export type GardenProps = {
  garden: Garden;
  scale: number;
};

export type Garden = {
  id?: number;
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
  hashtags: string[];
};

export type Parcel = {
  id: number;
  gardenId: number;
  length: number;
  width: number;
  nLine: number;
  parcelAngle: number;
  createdAt: string;
  garden?: string;
  lines: [];
  logs: [];
};

export type GardenCardHeaderProps = {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
  onGardenIdChange?: (selectedGarden: Garden) => void;
  onScaleChange?: (scale: number) => void;
  type: 'display' | 'edit';
};

export type LineProps = {
  line: Line;
  scale: number;
  lineIndex: number;
};

export type LocationPickerProps = {
  initialLat?: number;
  initialLng?: number;
  onLocationChange?: (lat: number, lng: number) => void;
  readOnly?: boolean;
  multipleMarkers?: { lat: number; lng: number }[];
  enableRadius?: boolean;
  showUserPosition?: boolean;
};

export type ParcelProps = {
  parcel: Parcel;
  scale: number;
  parcelKey: number;
};

export type Line = {
  id: number;
  parcelId: number;
  length: number;
  // crop: string;
  // status: string;
};

export type RadioProps = {
  name: string;
  value: string;
  checked?: boolean;
  id: string;
  onChange?: (value: string) => void;
};

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  errorPassMatch?: boolean;
  errorPassChar?: boolean;
  className?: string; // Explicitly include className
};

export type TodosProps = {
  status: number;
  content: string;
  added: string;
  publishBy: string;
  id: string;
  itemKey: number;
  style: React.CSSProperties;
  garden: string;
  parcel: string;
  line: string;
  className?: string;
  onStatusChange: (id: string, newStatus: number) => void;
  handleEdit: (e: React.FormEvent) => void;
};

export type ZoomSliderProps = {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  scale: number;
  className?: string;
};

export type NurceryProps = {
  nursery: Nurcery;
  scale: number;
  nurseryKey: number;
};

export type Nurcery = {
  id: number;
  name: string;
  comments: string;
  type: string;
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectInputProps = {
  label: string;
  name: string;
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export type VegetableIconProps = {
  id: number;
};

export type AddCropPopup = {
  lineId: number;
};

export type ConfirmationProps = {
  element: string;
  handleYesClick: () => void;
  handleNoClick: () => void;
};

export type EditParcelPopup = {
  parcel: Parcel;
};

export type ExistentCropPopupProps = {
  lineId: number;
};

export type MenuIconProps = {
  menuIconList: { src: string; alt: string; handleClick: () => void }[];
  subMenuIconList: {
    src: string;
    alt: string;
    handleClick: () => void;
    displayCondition: boolean;
    form: React.ReactNode;
  }[];
};

export type MenuSandwichProps = {
  iconList: {
    src: string;
    alt: string;
    handleClick: () => void;
    submenu?: React.ReactNode;
  }[];
  children?: React.ReactNode;
};

export type SubmenuProps = {
  iconList: {
    src: string;
    alt: string;
    handleClick: () => void;
    displayCondition: boolean;
    form: React.ReactNode;
  }[];
  displayCondition: boolean;
  children?: React.ReactNode;
};

export type GardenType = {
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
  hashtags: string[];
};

export type CropType = {
  id?: number;
  lineId?: number;
  nurseryId?: number;
  vegetable: string;
  variety: string;
  sowing: string;
  planting: string;
  harvesting: string;
  icon: string;
};
