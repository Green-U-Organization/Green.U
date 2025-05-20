export type GardenQuery = {
  isEmpty: boolean;
  message: string;
  content: Garden;
};

export type ParcelQuery = {
  isEmpty: boolean;
  message: string;
  content: Parcel;
};

export type LineQuery = {
  isEmpty: boolean;
  message: string;
  content: Line;
};

export type NurseryQuery = {
  isEmpty: boolean;
  message: string;
  content: Nursery;
};

export type CropQuery = {
  isEmpty: boolean;
  message: string;
  content: Crop;
};

export type Garden = {
  id: number;
  authorId: number;
  name: string;
  deleted: boolean;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  createdAt: string;
  privacy: number;
  type: number;
  constributors: string[]; // A changer
  followers: string[]; // A changer
  parcels: Parcel[];
  plantNurseries: Nursery[];
  tagsInterests: Tag[];
  log?: Log[];
};

export type Parcel = {
  id: number;
  gardenId: number;
  length: number;
  width: number;
  nLine: number;
  parcelAngle: number;
  createdAt: string;
  lines?: Line[];
  log?: Log[];
};

export type Line = {
  id: number;
  gardenId: number;
  parcelId: number;
  length: number;
  createdAt: string;
  crops?: Crop[];
  // log?: Log[];
};

export type Nursery = {
  id: number;
  gardenId: number;
  name: string;
  type: string;
  createdAt: string;
  comments: string;
  crops?: Crop[];
  log?: Log[];
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export type Crop = {
  id: number;
  gardenId?: number;
  parcelId?: number;
  lineId?: number;
  nurseryId?: number;
  vegetable: string;
  variety: string;
  sowing: string;
  planting: string;
  harvesting: string;
  icon: string;
  nPot?: number;
  potSize?: number;
  createdAt: string;
  log?: Log[];
};

export type Log = {
  id: number;
  gardenId?: number;
  parcelId?: number;
  lineId?: number;
  cropId?: number;
  nurseryId?: number;
  greenhouseId?: number;
  action: string;
  comment?: string;
  authorId?: number;
  username?: string;
  type: string;
  createdAt: string;
};

export type Tag = { tag: string; count: number };

//#region

export type BentoCardHeaderProps = {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
  pageLink: string;
};

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

export type AddCropPopupProps = {
  lineId: number | null;
};

export type ConfirmationProps = {
  element: string;
  handleYesClick: () => void;
  handleNoClick: () => void;
};

export type EditParcelPopupProps = {
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
export type NurseryProps = {
  nursery: Nursery;

  nurseryKey: number;
};
export type ParcelProps = {
  parcel: Parcel;

  parcelKey: number;
};

// export type GardenType = {
//   authorId: number;
//   name: string;
//   description: string;
//   latitude: number;
//   longitude: number;
//   length: number;
//   width: number;
//   privacy: number;
//   type: number;
//   hashtags: string[];
// };

//#endregion
