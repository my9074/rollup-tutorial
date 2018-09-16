import axios from "axios";

export function fetchTest() {
  return axios.get("www.baidu.com");
}

export const foo = "myu";
