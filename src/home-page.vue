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
          <ArticlesFeed
            v-bind:feeds="feeds"
            v-bind:selected="selectedFeed"
            v-on:select="onFeedSelected($event)"
          ></ArticlesFeed>

          <ArticlesList v-bind:articles="articles">
            <ArticleListItem
              v-for="article in articles"
              :key="article.slug"
              v-bind:article="article"
            >
              <ArticlePreview v-bind:article="article">
                <ArticleMeta v-bind:article="article">
                  <ButtonsFavorite
                    v-bind:article="article"
                    v-on:favorited="onFavoritedArticle(article)"
                  ></ButtonsFavorite>
                </ArticleMeta>
              </ArticlePreview>
            </ArticleListItem>
          </ArticlesList>
        </div>
        <div class="col-md-3">
          <TagsPopular v-bind:tags="tags" v-on:select="onTagSelected($event)"></TagsPopular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagsPopular from "./popular-tags";
import ArticlesFeed from "./articles-feed";
import HomePageService from "./home-page-service";
import ArticlesList from "./articles-list";
import ArticleListItem from "./articles-list-item";
import ArticlePreview from "./articles-preview";
import ArticleMeta from "./articles-meta";
import ButtonsFavorite from "./buttons-favorite";

export default {
  name: "home",
  components: {
    TagsPopular,
    ArticlesFeed,
    ArticlesList,
    ArticleListItem,
    ArticlePreview,
    ArticleMeta,
    ButtonsFavorite
  },
  data() {
    return {
      tags: undefined,
      feeds: [
        { id: "personal", name: "Your feed" },
        { id: "all", name: "Global Feed" }
      ],
      selectedFeed: "all",
      articles: undefined
    };
  },
  created() {
    HomePageService.fetchTags().then(tags => (this.tags = tags));
    HomePageService.fetchArticles({
      limit: 10,
      offset: 0,
      feed: { id: "all", name: "Global Feed" }
    }).then(articles => (this.articles = articles));
  },
  methods: {
    onTagSelected(tag) {
      const tagFeed = {
        id: tag.toLowerCase(),
        name: "#" + tag
      };
      this.feeds[2] = tagFeed;
      this.selectedFeed = tagFeed.id;
      HomePageService.fetchArticles({
        limit: 10,
        offset: 0,
        feed: tagFeed
      }).then(articles => (this.articles = articles));
    },
    onFeedSelected(selectedFeed) {
      this.selectedFeed = selectedFeed.id;
      HomePageService.fetchArticles({
        limit: 10,
        offset: 0,
        feed: selectedFeed
      }).then(articles => (this.articles = articles));
    },
    onFavoritedArticle(article) {
      console.log(article);
    }
  }
};
</script>