export interface Member {
  _id?: string;
  loginEmail?: string;
  loginEmailVerified?: boolean;
  status?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    phones?: string[];
  };
  profile?: {
    nickname?: string;
    photo?: {
      url?: string;
      height?: number;
      width?: number;
    };
    title?: string;
  };
  _createdDate?: string; // ISO Date string
  lastLoginDate?: string; // ISO Date string
}