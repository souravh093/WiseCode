export type TInfluencer = {
  id: string;
  name: string;
  platform: string;
  username: string;
  followers: number;
  engagement_rate: number;
  country: string;
  categories: string[];
  email?: string;
  created_at: string;
  updated_at: string;
};
