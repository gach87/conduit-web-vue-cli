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
    ConduitHomePageService.init().then(state => this.setState(state));
  },
  methods: {
    onTagSelected(tag) {
      ConduitHomePageService.onTagSelected({
        tag,
        state: this.getState()
      }).then(state => this.setState(state));
    },
    onFeedSelected(feed) {
      ConduitHomePageService.onFeedSelected({
        feed,
        state: this.getState()
      }).then(state => this.setState(state));
    },
    onPageSelected(page) {
      ConduitHomePageService.onPageSelected({
        page,
        state: this.getState()
      }).then(state => this.setState(state));
    },

    onFavoritedArticle(article) {
      console.log(article);
    },
    getState() {
      return JSON.parse(
        JSON.stringify({
          articles: this.articles,
          pages: this.pages,
          tags: this.tags,
          feeds: this.feeds,
          selectedFeed: this.selectedFeed,
          selectedPage: this.selectedPage
        })
      );
    },
    setState(input) {
      this.articles = input.articles;
      this.pages = input.pages;
      this.tags = input.tags;
      this.feeds = input.feeds;
      this.selectedFeed = input.selectedFeed;
      this.selectedPage = input.selectedPage;
    }
  }
};
</script>