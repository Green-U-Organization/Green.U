export interface BentoCardHeaderProps {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface DropdownSelectProps<T> {
  label: string;
  placeholder: string;
  options: T[]; // Liste d'options générique
  selectedValue: T;
  setSelectedValue: (value: T) => void;
  error?: boolean;
}

export interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export interface GardenProps {
  garden: Garden;
  scale: number;
}

export interface Garden {
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
}

export interface Parcel {
  id: number;
  gardenId: number;
  length: number;
  width: number;
  nLine: number;
  parcelAngle: number;
  createdAt: string;
  garden: string;
  lines: [];
  logs: [];
}

export interface GardenCardHeaderProps {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
  onGardenIdChange?: (selectedGarden: Garden) => void;
  onScaleChange: (scale: number) => void;
  type: 'display' | 'edit';
}

export interface LineProps {
  lineX: number;
  scale: number;
}

export interface LocationPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationChange?: (lat: number, lng: number) => void;
  readOnly?: boolean;
  multipleMarkers?: { lat: number; lng: number }[];
}

export interface ParcelProps {
  parcel: Parcel;
  scale: number;
};

export interface Lines {
  id: number;
  parcelId: number;
  length: number;
  // crop: string;
  // status: string;
};

export interface RadioProps {
  name: string;
  value: string;
  checked?: boolean;
  id: string;
  onChange?: (value: string) => void;
}

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  errorPassMatch?: boolean;
  errorPassChar?: boolean;
  className?: string; // Explicitly include className
};

export interface TodosProps {
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


export interface ZoomSliderProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export interface 

export interface 

export interface 

export interface 

export interface 

export interface 
