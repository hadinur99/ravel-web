export interface Login {
  userId: string;
  password: string;
}

export interface Register {
  userId: string;
  name: string;
  password: string;
}

export interface Data {
  data: Array<TourData>;
  results: number;
  status: string;
}

export interface TourData {
  _id: string;
  name: string;
  slug: string;
  rating: number;
  price: number;
  description: string;
  image: string;
  __v: number;
}
