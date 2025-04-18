export type BentoCardHeaderProps = {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
};

// export type ButtonProps =
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   disabled?: boolean;
// }

export type CardProps = {
  children: React.ReactNode;
  className?: string;
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
  id: number;
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
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
  lineKey: number;
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
