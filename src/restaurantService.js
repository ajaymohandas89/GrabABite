import http from "./httpService";

let apiEndpoint = "http://localhost:4000/restaurant/getDetails";


export function getAllRestaurants() {
  return http.get(apiEndpoint);
}