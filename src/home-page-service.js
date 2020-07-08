export default {
  fetchTags() {
    return fetch("https://conduit.productionready.io/api/tags")
      .then((response) => response.json())
      .then((response) => response.tags);
  },
  fetchArticles(filter) {
    return fetch(
      `https://conduit.productionready.io/api/articles${filter ? "?" : ""}${
        filter.limit ? `limit=${filter.limit}` : ""
      }${filter.offset >= 0 ? `&offset=${filter.offset}` : ""}`
    )
      .then((response) => response.json())
      .then((response) => response.articles);
  },
};
