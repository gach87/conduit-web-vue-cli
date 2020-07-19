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
            v-bind:feeds="state.feeds"
            v-bind:selected="state.selectedFeed"
            v-on:select="onFeedSelected($event)"
          ></ConduitArticlesFeed>

          <ConduitArticlesList v-bind:articles="state.articles" />

          <ConduitLayoutPagination
            v-bind:pages="state.pages"
            v-bind:selected="state.selectedPage"
            v-bind:onSelect="onPageSelected"
          ></ConduitLayoutPagination>
        </div>
        <div class="col-md-3">
          <ConduitTagsPopular v-bind:tags="state.tags" v-on:select="onTagSelected($event)"></ConduitTagsPopular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConduitTagsPopular from "./conduit-tags-popular";
import ConduitArticlesFeed from "./conduit-articles-feed";
import ConduitHomePageService from "./conduit-pages-home-service";
import ConduitLayoutPagination from "./conduit-layout-pagination";
import ConduitArticlesList from "./conduit-articles-list";

export default {
  name: "ConduitPagesHome",
  components: {
    ConduitTagsPopular,
    ConduitArticlesFeed,
    ConduitArticlesList,
    ConduitLayoutPagination
  },
  data() {
    return {
      state: {
        tags: undefined,
        feeds: undefined,
        selectedFeed: undefined,
        articles: undefined,
        selectedPage: undefined,
        pages: undefined
      }
    };
  },
  created() {
    ConduitHomePageService.init().then(
      state => (this.state = Object.assign({}, state))
    );
  },
  methods: {
    onTagSelected(tag) {
      ConduitHomePageService.onTagSelected({
        tag,
        state: Object.assign({}, this.state)
      }).then(state => (this.state = Object.assign({}, state)));
    },
    onFeedSelected(feed) {
      ConduitHomePageService.onFeedSelected({
        feed,
        state: Object.assign({}, this.state)
      }).then(state => (this.state = Object.assign({}, state)));
    },
    onPageSelected(page) {
      ConduitHomePageService.onPageSelected({
        page,
        state: Object.assign({}, this.state)
      }).then(state => (this.state = Object.assign({}, state)));
    }
  }
};
</script>