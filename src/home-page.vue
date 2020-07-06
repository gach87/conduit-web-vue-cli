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
          <!-- <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  :to="{ name: 'home-my-feed' }"
                  class="nav-link"
                  active-class="active"
                >Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'home' }"
                  exact
                  class="nav-link"
                  active-class="active"
                >Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{ name: 'home-tag', params: { tag } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i>
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>-->
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
import HomePageService from "./home-page-service";
export default {
  name: "home",
  components: { PopularTags },
  data() {
    return { tags: undefined };
  },
  created() {
    HomePageService.fetchTags().then(tags => (this.tags = tags));
  },
  methods: {
    onTagSelected(tag) {
      console.log(tag);
    }
  }
};
</script>