import { HTTP } from "./instance";

export const Books = {
  create(book) {
    return HTTP.post("books/", book)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: error.response.statusText };
      });
  },
  delete(book) {
    return HTTP.delete(`books/${book.id}/`);
  },
  update(book) {
    return HTTP.put(`books/${book.id}/`, book)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: error.response.statusText };
      });
  },
  list() {
    return HTTP.get("books/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: error.response.statusText };
      });
  },
};
