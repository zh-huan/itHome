<template>
  <div style="width:100%;height:100%">
    <div id="app">
      <ion-app>
        <ion-vue-router />
      </ion-app>
    </div>
  </div>
</template>
<script>
//import { on, closest, goToLogin } from "@/common/util.js";
export default {
  data() {
    return {
    //   types: [],
    //   typeSelected: "",
    //   loading: false,
    //   searchKey: null,
    //   hasLogin: false,
    //   headerImg: "/img/header.jpg",
    //   showUserList: false
    };
  },
  mounted() {
    //获取基础信息（登录用户信息等）
    //this.getCommonInfo();
    //获取类型信息
    //this.getType();
  },
  methods: {
      presentActionSheet(){

      },
    getCommonInfo() {
      this.$ajax("/api/getCommonInfo", null, "post")
        .then(result => {
          let commonInfo = result.datas;
          if (commonInfo) {
            this.hasLogin = true;
            this.$store.commit("setUser", commonInfo.userInfo);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getType() {
      this.$ajax("/api/index/getType", null, "post")
        .then(result => {
          this.types = result.datas;
          if (this.types && this.types.length) {
            this.getSelected(this.types);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getSelected(types) {
      let type = this.$route.params.type;
      if (!type && (!this.$route.name || this.$route.name == "index")) {
        this.typeClick(types[0]);
        return;
      } else {
        for (let typeItem of types) {
          if (typeItem.router == type) {
            this.typeSelected = typeItem.name;
            return;
          }
        }
      }
    },
    typeClick(typeItem) {
      this.typeSelected = typeItem.name;
      this.$router.push({
        path: `/index/${typeItem.router}`
      });
    },
    searchDatas() {
      this.$router.push({
        path: `/search`,
        query: {
          k: this.searchKey
        }
      });
    },
    logOut() {
      if (!this.$store.getters.getCurrentUser) {
        return;
      }
      let user = this.$store.getters.getCurrentUser;
      this.$ajax("/api/user/logOut", { userInfo: user }, "post")
        .then(result => {
          if (result.type == "1") {
            storageUtil.removeItem("token");
            this.$store.commit("removeUser");
            window.location.href = "/login";
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    writeArticle() {
      if (!this.$store.getters.getCurrentUser) {
        goToLogin("/write");
        return;
      }
      this.$router.push("/write");
    }
  }
};
</script>
<style lang="stylus" scoped></style>