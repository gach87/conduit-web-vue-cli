<template>
  <div>
    <ConduitArticleListItem
      v-for="article in articles"
      :key="article.slug"
      v-bind:article="article"
    ></ConduitArticleListItem>
  </div>
</template>

<script>
import ConduitArticleListItem from "./conduit-articles-list-item";

export default {
  name: "ConduitArticlesList",
  components: { ConduitArticleListItem },
  props: ["articles"]
};
</script>