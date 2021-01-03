import * as filestack from 'filestack-js';

export const environment = {
  production: true,
  baseURL: "http://api.ischedulenow.com/",
  // baseURL: "http://localhost:31000/",
  client: filestack.init('AGqWW8kQNRqi122GGl1nvz')

};
