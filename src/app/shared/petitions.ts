export interface Petition {
  petitionId?: number;
  creatorEmail?: string;
  creatorName?: string;
  creatorSurname?: string;
  description: string;
  likesNumber: number;
  likedByThisUser: boolean;
  category: string|null;
  station: string | null;
  route: string | null;
  latitude: number | null;
  longitude: number | null;
  }
