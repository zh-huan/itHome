class result {
    constructor() {
        this.type = null;
        this.datas = null;
        this.message = null;
    }
    //成功
    setDatas(datas) {
        this.datas = datas;
        this.type = 1;
        this.message = "";
        return this;
    }

    //失败
    setError(errorMessage) {
        this.datas = null;
        this.type = -1;
        this.message = errorMessage;
        return this;
    }

    //警告
    setWarn(warnMessage) {
        this.datas = null;
        this.type = 0;
        this.message = warnMessage;
        return this;
    }
}
module.exports = result;