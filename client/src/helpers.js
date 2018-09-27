import axios from 'axios';

const helpers = {
  post: (url, params) => {
    return axios
      .post(url, params)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
				console.log(error);
				return error;
      });
  },
  get: url => {
    return axios
      .get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
};
export default helpers;
