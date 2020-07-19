<template>
  <ConduitArticlePreview v-bind:article="article">
    <ConduitArticleMeta v-bind:article="article">
      <ConduitButtonsFavorite v-bind:article="article" v-on:favorited="onFavoritedArticle(article)"></ConduitButtonsFavorite>
    </ConduitArticleMeta>
  </ConduitArticlePreview>
</template>

<script>
import ConduitArticlePreview from "./conduit-articles-preview";
import ConduitArticleMeta from "./conduit-articles-meta";
import ConduitButtonsFavorite from "./conduit-buttons-favorite";

export default {
  name: "ConduitArticlesListItem",
  components: {
    ConduitArticleMeta,
    ConduitArticlePreview,
    ConduitButtonsFavorite
  },
  props: ["article"],
  methods: {
    onFavoritedArticle(article) {
      console.log(article);
    }
  }
};
</script>