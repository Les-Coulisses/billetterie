import axios from "axios";
import { API_URL } from "./env";

export type ShowDto = {
  id: string;
  slug: string;
  title: string;
  cover: FileDto;
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
  return axios.get(API_URL + "/shows").then((response) => {
    successCallBack(response.data);
  });
};
