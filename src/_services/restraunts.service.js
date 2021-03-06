import config from "config";
import { authHeader } from "../_helpers";

export const restaurantsService = {
  get,
};

function get() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${config.apiUrl}/restaurant/v1/`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }
      console.log({ data });
      const error =
        (data && JSON.stringify(data.errors)) || response.statusText;
      return Promise.reject(error);
    }
    console.log({ data });
    return data;
  });
}
