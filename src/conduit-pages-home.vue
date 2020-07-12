<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <ConduitArticlesFeed
            v-bind:feeds="feeds"
            v-bind:selected="selectedFeed"
            v-on:select="onFeedSelected($event)"
          ></ConduitArticlesFeed>

          <div v-for="article in articles" :key="article.slug" v-bind:article="article">
            <ConduitArticlePreview v-bind:article="article">
              <ConduitArticleMeta v-bind:article="article">
                <ConduitButtonsFavorite
                  v-bind:article="article"
                  v-on:favorited="onFavoritedArticle(article)"
                ></ConduitButtonsFavorite>
              </ConduitArticleMeta>
            </ConduitArticlePreview>
          </div>

          <ConduitLayoutPagination
            v-bind:pages="pages"
            v-bind:selected="selectedPage"
            v-bind:onSelect="onPageSelected"
          ></ConduitLayoutPagination>
        </div>
        <div class="col-md-3">
          <ConduitTagsPopular v-bind:tags="tags" v-on:select="onTagSelected($event)"></ConduitTagsPopular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConduitTagsPopular from "./conduit-tags-popular";
import ConduitArticlesFeed from "./conduit-articles-feed";
import ConduitHomePageService from "./conduit-pages-home-service";
import ConduitArticlePreview from "./conduit-articles-preview";
import ConduitArticleMeta from "./conduit-articles-meta";
import ConduitButtonsFavorite from "./conduit-buttons-favorite";
import ConduitLayoutPagination from "./conduit-layout-pagination";

export default {
  name: "ConduitPagesHome",
  components: {
    ConduitTagsPopular,
    ConduitArticlesFeed,
    ConduitArticlePreview,
    ConduitArticleMeta,
    ConduitButtonsFavorite,
    ConduitLayoutPagination
  },
  data() {
    return {
      tags: undefined,
      feeds: undefined,
      selectedFeed: undefined,
      articles: undefined,
      selectedPage: undefined,
      pages: undefined
    };
  },
  created() {
    this.selectedPage = 1;
    this.selectedFeed = "all";
    this.feeds = [
      { id: "personal", name: "Your feed" },
      { id: "all", name: "Global Feed" }
    ];
    ConduitHomePageService.fetchTags().then(tags => (this.tags = tags));
    ConduitHomePageService.fetchArticles({
      limit: 10,
      page: this.selectedPage,
      feed: this.feeds.find(feed => feed.id === this.selectedFeed)
    }).then(response => {
      this.articles = response.data;
      this.pages = response.meta.pages;
    });
  },
  methods: {
    onTagSelected(tag) {
      const tagFeed = {
        id: tag.toLowerCase(),
        name: "#" + tag
      };
      this.feeds[2] = tagFeed;
      this.selectedFeed = tagFeed.id;
      this.selectedPage = 1;
      ConduitHomePageService.fetchArticles({
        limit: 10,
        page: this.selectedPage,
        feed: tagFeed
      }).then(articles => (this.articles = articles));
    },
    onFeedSelected(selectedFeed) {
      this.selectedFeed = selectedFeed.id;
      this.selectedPage = 1;

      ConduitHomePageService.fetchArticles({
        limit: 10,
        page: this.selectedPage,
        feed: selectedFeed
      }).then(articles => (this.articles = articles));
    },
    onFavoritedArticle(article) {
      console.log(article);
    },
    onPageSelected(page) {
      ConduitHomePageService.fetchArticles({
        limit: 10,
        page: page,
        feed: this.feeds.find(feed => feed.id === this.selectedFeed)
      }).then(response => {
        this.articles = response.data;
        this.pages = response.meta.pages;
        this.selectedPage = page;
      });
    }
  }
};
</script>