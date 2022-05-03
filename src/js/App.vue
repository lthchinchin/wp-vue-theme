<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDesc }}</p>
    <button @click="creaseNum">up</button>
    <p>{{ num }}</p>
  </div>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from "vuex";
// import mapRender from "./components/map_freeh.vue";

export default {
  data() {
    return {
      title: "Hello this trung hieu & vuejs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      num: 0,
    };
  },
  created: function () {},
  methods: {
    testFunc() {
      console.log("123");
    },
    creaseNum() {
      this.num++;
    },
  },
  components: {},
  computed: {
    pageTitle() {
      return this.title;
    },
    pageDesc() {
      return this.desc;
    },
    ...mapGetters({
      // isShowPaginate: "a/getIsShowPaginate",
    }),
  },
};
</script>
