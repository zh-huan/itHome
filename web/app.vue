<template>
    <div>
        <loading :state="loading"></loading>
        <div class="header">
            <ul class="header_type">
                <li class="header_type-item" v-for="typeItem in types"
                    :class="{'selected': typeSelected==typeItem.name}" @click="typeClick(typeItem)">{{typeItem.name}}
                </li>
            </ul>
            <div class="login-wrap"></div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>
<script>
    import "./src/assets/css/base.styl"

    export default {
        data() {
            return {
                types: [],
                typeSelected: "",
                loading: false
            }
        },
        mounted() {
            // 并且响应成功以后会执行then方法中的回调函数
            this.$ajax("/index/getType", {}, "post").then((result) => {
                this.types = result.datas;
                if (this.types && this.types.length) {
                    this.getSelected(this.types);
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            getSelected(types) {
                let type = this.$route.params.type;
                if (!type) {
                    this.typeClick(types[0]);
                    return;
                }
                else {
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
                    path: `/${typeItem.router}`,
                })
            }
        }
    }
</script>