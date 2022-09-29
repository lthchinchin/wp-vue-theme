<template>
  <div>

    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDesc }}</p>
    <button @click="creaseNum">up</button>
    <p>{{ num }}</p>
      <div style="height:500px" id="map"></div>

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
      map : null
    };
  },
  created: function () {},
  mounted(){
      this.initMap();
  },
  methods: {
        initMap: function () {
          console.log('123');
      let that = this;
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: {lat:16.0464896,lng:108.1901056},
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: true,
      });


      this.map.setOptions({
        styles: [
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      });

        var marker = new google.maps.Marker({
          map: this.map,
          title: "sdsdassd",
          position: {lat:16.0464896,lng:108.1901056},
          // icon: iconUrl,
        });


      // if (!this.markers.length) {
      // this.service = new google.maps.places.PlacesService(this.map);

          console.log('456');


      // }
    },
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
