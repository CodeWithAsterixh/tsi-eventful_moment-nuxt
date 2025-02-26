export interface Moment {
    _id: string;
    userId: string;
    title: string;
    futureDate: string; // ISO date string
    details: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }
  
  export interface UserProfile {
    _id: string;
    fullname: string;
    email: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    moments: Moment[];
  }
  