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
          <ArticlesFeed v-bind:feeds="feeds" v-on:feed-selected="onFeedSelected($event)"></ArticlesFeed>
        </div>
        <div class="col-md-3">
          <PopularTags v-bind:tags="tags" v-on:tag-selected="onTagSelected($event)"></PopularTags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopularTags from "./popular-tags";
import ArticlesFeed from "./articles-feed";
import HomePageService from "./home-page-service";

export default {
  name: "home",
  components: { PopularTags, ArticlesFeed },
  data() {
    return {
      tags: undefined,
      feeds: [
        { id: "personal", name: "Your feed", selected: false, isTag: false },
        { id: "all", name: "Global Feed", selected: true, isTag: false }
      ]
    };
  },
  created() {
    HomePageService.fetchTags().then(tags => (this.tags = tags));
  },
  methods: {
    onTagSelected(tag) {
      const tagFeed = {
        id: tag.toLowerCase(),
        name: "#" + tag,
        selected: true,
        isTag: true
      };

      this.feeds = this.feeds
        .map(feed => Object.assign(feed, { selected: false }))
        .concat([tagFeed]);
    },
    onFeedSelected(selectedFeed) {
      this.feeds = this.feeds.map(feed =>
        Object.assign(feed, { selected: feed.id === selectedFeed.id })
      );
    }
  }
};
</script>