import axios from "axios";
import { API_URL } from "./env";

export type ShowDto = {
  id: number;
};

export type FileDto = {
  id: string;
  path: string;
  url: string;
  thumb: [];
};

export const getShows = (
  successCallBack: (shows: [ShowDto]) => void
): Promise<void | [ShowDto]> => {
  console.log("test response");
  return axios.get(API_URL + "/shows-id").then((response) => {
    successCallBack(response.data);
  });
};
