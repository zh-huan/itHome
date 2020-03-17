<template>
  <div class="write clearfix" @keyup.esc="KeyUpEsc">
    <div style="width:100%;height:100%" v-if="!preview">
      <div class="write_block note-book">
        <!-- <div class="goto-homepage">
          <a href="/">回首页</a>
        </div>-->
        <div class="add-book">
          <div class="add-book-click" @click="isAddBook=true">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiahao" />
            </svg>
            <span>新建文集</span>
          </div>
          <div v-show="isAddBook">
            <input type="text" placeholder="请输入文集名称" v-model="noteBookItem.noteBookTitle" />
            <button class="commit" @click="addBookList">
              <span>确定</span>
            </button>
            <button class="cancle" @click="isAddBook=false">
              <span>取消</span>
            </button>
          </div>
        </div>
        <ul class="book-list" v-if="bookList&&bookList.length">
          <li
            class="book-list_item"
            v-for="item in bookList"
            :key="item.noteBookId"
            :class="{'selected':currentBook&&currentBook.noteBookTitle===item.noteBookTitle}"
            @click="selectBook(item)"
          >
            <span>{{item.noteBookTitle}}</span>
            <svg class="icon book-setting_icon" aria-hidden="true">
              <use xlink:href="#icon-icon_huabanfuben" />
            </svg>
          </li>
        </ul>
      </div>
      <div class="write_block notebook-article">
        <div class="add-article" @click="addActicle()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiakeshiicon" />
          </svg>
          <span>新建文章</span>
        </div>
        <ul class="article-list" v-if="articleList&&articleList.length">
          <li
            v-for="articleItem in articleList"
            :key="articleItem.articleId"
            class="article-list_item"
            :class="{'selected':currentArticle&&currentArticle.articleId===articleItem.articleId}"
            @click="selectArticle(articleItem)"
          >
            <svg
              class="icon article-list_item-icon"
              aria-hidden="true"
              v-if="articleItem.state==0"
            >
              <use xlink:href="#icon-biaoqian2" />
            </svg>
            <svg class="icon article-list_item-icon" aria-hidden="true" v-else>
              <use xlink:href="#icon-biaoqian1" />
            </svg>
            <span class="title">{{articleItem.title}}</span>
            <span
              class="simple-content"
            >{{articleItem.content&&articleItem.content.length>50?articleItem.content.substring(0,50):articleItem.content}}</span>
            <span class="count">字数:{{articleItem.content&&articleItem.content.length}}</span>
            <svg class="icon book-setting_icon" aria-hidden="true">
              <use xlink:href="#icon-icon_huabanfuben" />
            </svg>
          </li>
        </ul>
      </div>
      <div class="write_block article-content">
        <div class="article-content_block">
          <input type="text" class="title-input" v-model="currentArticle.title" />
          <div class="tool-bar clearfix">
            <div
              class="tool-bar_block publish"
              v-if="currentArticle.state==0"
              @click="publishActicle"
            >
              <svg class="icon tool-bar_icon" aria-hidden="true">
                <use xlink:href="#icon-fabu" />
              </svg>
              <span>发布文章</span>
            </div>
            <div class="tool-bar_block publish" v-else>
              <svg class="icon tool-bar_icon" aria-hidden="true">
                <use xlink:href="#icon-ic_check" />
              </svg>
              <span>已发布</span>
            </div>
            <div class="tool-bar_block" title="保存" @click="saveActicle" v-if="!saving">
              <svg class="icon tool-bar_icon" aria-hidden="true">
                <use xlink:href="#icon-baocun" />
              </svg>
            </div>
            <div class="tool-bar_block" style="width:34px" v-if="saving">
              <span class="save-loading"></span>
              <span class="save-loading"></span>
              <span class="save-loading"></span>
            </div>
            <div class="tool-bar_block" title="预览" @click="previewArticle">
              <svg class="icon tool-bar_icon" aria-hidden="true">
                <use xlink:href="#icon-review" />
              </svg>
            </div>
          </div>
          <textarea v-model="currentArticle.content"></textarea>
        </div>
      </div>
    </div>
    <component-preview :aricle="currentArticle" v-if="preview"></component-preview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAddBook: false,
      noteBookItem: {},
      bookList: [],
      currentBook: null,
      articleList: [],
      currentArticle: {},
      saving: false,
      preview: false
    };
  },
  components: {
    "component-preview": () => import("./writeArticle.vue")
  },
  computed: {},
  mounted() {
    this.getHashValue();
    this.getBookList();
  },
  methods: {
    getHashValue() {
      let hashStr = this.$route.hash;
      if (hashStr) {
        let hash = hashStr.split("/");
        this.hashValue = {};
        if (hash.length > 1) {
          this.hashValue.noteBookId = hash[1];
        }
        if (hash.length > 2) {
          this.hashValue.articleId = hash[2];
        }
        this.preview = hash.length > 3 && hash[3] == "preview";
      }
    },
    changeHash() {
      let hash = "";
      if (this.currentBook && this.currentBook.noteBookId) {
        hash = `#/${this.currentBook.noteBookId}/`;
      }
      if (this.selectedArticle && this.selectedArticle.articleId) {
        hash += `${this.selectedArticle.articleId}`;
      }
      if (this.preview) {
        hash += `/preview`;
      }
      if (hash.length&&hash != this.$route.hash) {
        this.$router
          .push({
            path: this.$route.path,
            hash: hash
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    addBookList() {
      if (!this.noteBookItem.noteBookTitle) {
        return;
      }
      this.$ajax("/api/noteBook/add", this.noteBookItem, "POST")
        .then(result => {
          if (result.datas && result.datas > 0) {
            this.isAddBook = false;
            this.getBookList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBookList() {
      this.$ajax("/api/noteBook/getlist", { delete: 0 }, "POST")
        .then(result => {
          if (result.datas && result.datas.length) {
            this.bookList = result.datas;
            if (!this.currentBook) {
              this.currentBook = this.bookList[0];
              if (this.hashValue && this.hashValue.noteBookId) {
                let book = this.bookList.find(
                  x => x.noteBookId == this.hashValue.noteBookId
                );
                book && (this.currentBook = book);
              }
              this.getArticleList();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectBook(bookItem) {
      this.currentBook = bookItem;
      this.articleList = [];
      this.currentArticle = {};
      this.getArticleList();
    },
    getArticleList() {
      if (!this.currentBook) return;
      let param = {
        noteBookId: this.currentBook.noteBookId,
        delete: 0
      };
      this.$ajax("/api/article/getlist", param, "POST")
        .then(result => {
          if (result.datas && result.datas.length) {
            this.articleList = result.datas;
            this.selectedArticle = this.articleList[0];
            if (this.hashValue && this.hashValue.articleId) {
              let article = this.articleList.find(
                x => x.articleId == this.hashValue.articleId
              );
              article && (this.selectedArticle = article);
              this.getArticleOne();
            }
          }
          this.changeHash();
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectArticle(articleItem) {
      this.selectedArticle = articleItem;
      this.getArticleOne();
      this.changeHash();
    },
    getArticleOne() {
      if (!this.selectedArticle) return;
      this.$ajax("/api/article/getOne", this.selectedArticle, "POST")
        .then(result => {
          if (result.datas) {
            this.currentArticle = result.datas;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addActicle() {
      let article = {
        noteBookId: this.currentBook.noteBookId,
        title: new Date().format("yyyy-MM-dd"),
        state: 0
      };
      this.$ajax("/api/article/add", article, "POST")
        .then(result => {
          if (result.type == 1 && result.datas) {
            this.articleList.push(result.datas);
            this.currentArticle = result.datas;
            this.changeHash();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveActicle() {
      this.saving = true;
      this.$ajax("/api/article/update", this.currentArticle, "POST")
        .then(result => {
          this.saving = false;
          if (result.type == 1 && result.datas > 0) {
            this.$elms({
              showClose: true,
              type: "success",
              message: "保存成功"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    publishActicle() {
      this.currentArticle.state = 1;
      this.saveActicle();
    },
    previewArticle() {
      this.preview = true;
      this.changeHash();
      this.$elms({
        type: "info",
        message: "按ESC退出"
      });
    },
    KeyUpEsc() {
      if (this.preview) {
        this.preview = false;
      }
      this.changeHash();
    }
  }
};
</script>
<style lang="stylus" scoped>
.write {
  width: 100%;
  height: 100%;
}

.write_block {
  float: left;
  height: 100%;
  background-color: #fff;
}

.note-book {
  width: 16%;
  color: #fff;
  background-color: #404040;
}

.add-book {
  padding: 10px 15px;

  .add-book-click {
    width: 100%;
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 35px;
    color: #ccc;
    background-color: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;

    &:focus {
      border: 1px solid #333;
    }
  }

  button {
    border-style: none;
    border-width: 0;
    background-color: transparent;
    color: #999;
    padding: 5px 12px;
    margin-left: 5px;
  }

  .commit {
    border: 1px solid #42c02e;
    color: #42c02e;
    border-radius: 15px;
  }

  .cancle {
    &:hover, &:focus {
      color: #b3b3b3;
    }
  }
}

.book-list_item {
  position: relative;
  padding: 10px 15px;
  border-left: 3px solid transparent;

  &:hover {
    background-color: #666;
  }
}

.book-setting_icon {
  display: none;
  position: absolute;
  right: 23px;
  top: 35%;
  font-size: 18px;
  cursor: pointer;
}

.selected {
  .book-setting_icon {
    display: block;
  }
}

.book-list_item.selected {
  border-left: 3px solid #ec7259;
}

.notebook-article {
  width: 34%;
  border-right: 1px solid #d9d9d9;
}

.add-article {
  line-height: 20px;
  font-size: 15px;
  font-weight: 400;
  padding: 20px 0 20px 25px;
  cursor: pointer;
  color: #595959;
}

.article-list {
  position: relative;
  margin-bottom: 0;
  background-color: #efe9d9;
  border-top: 1px solid #d9d9d9;

  .article-list_item {
    position: relative;
    height: 90px;
    color: #595959;
    background-color: #fff;
    margin-bottom: 0;
    padding: 15px 10px 15px 60px;
    -webkit-box-shadow: 1px 0px 0px 1px #d9d9d9;
    box-shadow: 1px 0px 0px 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      background-color: #e6e6e6;
    }

    .article-list_item-icon {
      position: absolute;
      top: 30px;
      left: 20px;
      width: 22px;
      height: 30px;
    }

    .title, .simple-content {
      display: block;
      height: 30px;
      line-height: 30px;
      margin-right: 40px;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      font-size: 18px;
    }

    .count {
      position: absolute;
      bottom: 2px;
      left: 5px;
      font-size: 9px;
      line-height: 16px;
      color: #595959;
    }
  }

  .article-list_item.selected {
    border-left: 5px solid #ec7259;
    background-color: #e6e6e6;
  }
}

.article-content {
  width: 50%;
  height: 100%;
  background-color: #fff;
  padding-top: 16px;

  .article-content_block {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .title-input {
    flex-shrink: 0;
    width: 100%;
    padding: 0 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tool-bar {
    margin: 0;
    list-style-type: none;
    background-color: #d9d9d9;
    border-bottom: 1px solid #ccc;

    .tool-bar_block {
      display: inline-block;
      float: right;
      width: 32px;
      height: 32px;
      color: #595959;
      padding: 8px;

      &:hover {
        color: #f2f2f2;
        background-color: #595959;
      }
    }

    .publish {
      width: auto;

      span {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
      }
    }
  }

  textarea {
    width: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 40px 40px 80px;
    margin-bottom: 0;
    resize: none;
    color: #333;
    background-color: transparent;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    border: none;
    outline: none;
    -webkit-appearance: none;
    overflow: auto;
  }
}

input, textarea {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
}

.goto-homepage {
  text-align: center;
  padding: 15px;

  a {
    display: block;
    font-size: 15px;
    padding: 9px 0;
    color: #ec7259;
    border: 1px solid rgba(236, 114, 89, 0.8);
    border-radius: 20px;
    -webkit-transition: border-color 0.2s ease-in;
    -o-transition: border-color 0.2s ease-in;
    transition: border-color 0.2s ease-in;

    &:hover {
      will-change: border-color;
      color: #ec7259;
      border-color: #ec7259;
    }
  }
}

.save-loading {
  display: inline-block;
  width: 3px;
  height: 14px;
  background-color: #595959;
  animation: saveloading linear 1s infinite;
  -webkit-animation: saveloading linear 1s infinite;
}

.save-loading:nth-child(2) {
  height: 6px;
}

.save-loading:nth-child(1) {
  animation-delay: 0s;
}

.save-loading:nth-child(2) {
  animation-delay: 0.1s;
}

.save-loading:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes saveloading {
  0%, 100% {
    height: 6px;
  }

  50% {
    height: 14px;
  }
}

@keyframes saveloading {
  0%, 100% {
    height: 8px;
  }

  50% {
    height: 12px;
  }
}
</style>