export default {
  fetchTags() {
    return fetch("https://conduit.productionready.io/api/tags")
      .then((response) => response.json())
      .then((tags) => tags.tags);
  },
};
