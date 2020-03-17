<template>
    <div class="post-list-loading">
        <div style="display: inline-block;">
            <div class="loading"></div>
            <div class="loading"></div>
            <div class="loading"></div>
            <div class="loading"></div>
            <div class="loading"></div>
        </div>

    </div>
</template>
<style scoped lang="stylus">
    .post-list-loading
        width :200px;
        margin : 0 auto;
        text-align: center;
        padding: 10px;
    .post-list-loading .loading {
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: #68b2ce;
        float: left;
        margin: 0 3px;
        animation: loading linear 1s infinite;
        -webkit-animation: loading linear 1s infinite;
    }
    .post-list-loading .loading:nth-child(1) {
        animation-delay: 0s;
    }
    .post-list-loading .loading:nth-child(2) {
        animation-delay: 0.15s;
    }
    .post-list-loading .loading:nth-child(3) {
        animation-delay: 0.3s;
    }
    .post-list-loading .loading:nth-child(4) {
        animation-delay: 0.45s;
    }
    .post-list-loading .loading:nth-child(5) {
        animation-delay: 0.6s;
    }
    @keyframes loading {
        0%, 60%, 100% {
            transform: scale(1);
        }
        30% {
            transform: scale(2.5);
        }
    }
    @-webkit-keyframes loading {
          0%, 60%, 100% {
              transform: scale(1);
          }
          30% {
              transform: scale(2.5);
          }
     }

</style>