<template>
  <div class="pull-xs-right">
    <button class="btn btn-sm btn-outline-primary" v-on:click="favorite(article)">
      <i class="ion-heart"></i>
      {{article.favoritesCount}}
    </button>
  </div>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    favorite(article) {
      this.$emit("favorited", article);
    }
  }
};
</script>