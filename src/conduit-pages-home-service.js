export default {
  fetchTags() {
    return fetch("https://conduit.productionready.io/api/tags")
      .then((response) => response.json())
      .then((response) => response.tags);
  },
  fetchArticles(filter) {
    filter = Object.assign(filter, {
      offset: filter.limit * (filter.page - 1),
    });
    const url =
      filter.feed.id === "personal"
        ? `https://conduit.productionready.io/api/articles/feed`
        : `https://conduit.productionready.io/api/articles${filter ? "?" : ""}${
            filter.limit ? `limit=${filter.limit}` : ""
          }${filter.offset >= 0 ? `&offset=${filter.offset}` : ""}${
            filter.feed.name.includes("#") ? `&tag=${filter.feed.id}` : ""
          }`;
    return fetch(url)
      .then((response) => response.json())
      .then((response) => ({
        data: response.articles,
        meta: {
          pages: Array.from(
            new Array(Math.ceil(response.articlesCount / filter.limit)),
            (val, index) => index + 1
          ),
        },
      }));
  },
};
