import axios from "axios";
import { Result } from "@/types";  
export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};


const RANDOM_USER_API_URL = "https://randomuser.me/api";

export default async function getProfilePhotos(): Promise<string[]> {
  const res = await axios.get(RANDOM_USER_API_URL, {
    params: { results: 78 },
  });

  return res.data.results.map((result: Result) => result.picture.medium);
}
