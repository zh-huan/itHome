let COOKEY_TIMEOUT = 10; //单位：天
export default {
    setItem(key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        } else {
            this.setCookey(key, value, COOKEY_TIMEOUT)
        }
    },
    getItem(key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        } else {
            this.getCookey(key);
        }
    },
    removeItem(key) {
        if (window.localStorage) {
            window.localStorage.removeItem(key);
        } else {
            this.removeCookey(key);
        }
    },
    setSessionItem(key, val) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(key, val);
        } else {
            this.setCookey(key, val, COOKEY_TIMEOUT);
        }
    },
    getSessionItem(key) {
        if (window.sessionStorage) {
            return window.sessionStorage.getItem(key);
        } else {
            return this.getCookey(key);
        }
    },
    removeSessionItem(key) {
        if (window.sessionStorage) {
            window.sessionStorage.removeItem(key);
        } else {
            this.removeCookey(key);
        }
    },
    setCookey(key, val, days) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + days);
        document.cookie = key + "=" + escape(val) + ";expires=" + exdate.toGMTString();
    },
    getCookey(key) {
        let key_start = document.cookie.indexOf(key + "=")
        if (key_start != -1) {
            key_start = key_start + key.length + 1
            let key_end = document.cookie.indexOf(";", key_start)
            if (key_end == -1) {
                key_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(key_start, key_end))
        } else {
            return '';
        }
    },
    removeCookey(key) {
        let val = this.getCookey(key);
        if (val) {
            let exdate = new Date();
            document.cookie = key + "=" + escape(val) + ";expires=" + exdate.toGMTString();
        }
    }
}