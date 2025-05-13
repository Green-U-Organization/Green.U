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
  nursery: {
    id: number;
    name: string;
    comments: string;
    type: string;
    crop: {
      id: number;
      vegetable: string;
      variety: string;
      icon: string;
      sowing: string;
      planting: string;
      harvesting: string;
      distance_plantation: number;
      comments: string;
    }[];
  }[];
  parcel: {
    id: number;
    gardenId: number;
    length: number;
    width: number;
    nLine: number;
    parcelAngle: number;
    createdAt: string;
    lines: {
      id: number;
      parcelId: number;
      length: number;
      createdAt: string;
      crop: {
        id: number;
        vegetable: string;
        variety: string;
        icon: string;
        sowing: string;
        planting: string;
        harvesting: string;
        distance_plantation: number;
        comments: string;
      }[];
    }[];
  }[];
}
