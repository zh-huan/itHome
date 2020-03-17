import {
    encryption
} from './aes.js'
const whiteUrl = ["/api/getCommonInfo"];
/**
 * 绑定事件
 *
 * @export
 * @param {any} domName
 * @param {any} eventType
 * @param {any} callback
 */
export function on(dom, eventType, callback) {
    if (dom && dom.addEventListener) {
        dom.addEventListener(eventType, callback)
    } else if (dom) {
        dom.attachEvent('on' + eventType, callback)
    }
}

/**
 * 解绑事件
 *
 * @export
 * @param {any} dom 元素标识，类名/ID/标签名称
 * @param {any} eventType
 * @param {any} callback
 */
export function off(dom, eventType, callback) {
    if (dom.removeEventListener) {
        dom.removeEventListener(eventType, callback)
    } else {
        dom.detachEvent('on' + eventType, callback)
    }
}

/****
 * 获取元素
 * @exports
 * @param domName 元素标识，类名/ID/标签名称
 */
export function getElement(domName) {
    let dom = document.querySelector(domName);
    if (dom && dom.length) {
        return dom[0];
    }
    console.log(dom)
    return dom;
}

/****
 * 递归判断父元素
 * @exports
 * @param domName 元素标识，类名/ID/标签名称
 */
export function closest(elem, select) {
    if (select.indexOf('.') >= 0) {
        let selClass = select.substring(select.indexOf('.') + 1);
        while (elem) {
            if (elem.nodeType < 11 && typeof elem.className == 'string' && elem.className.indexOf(selClass) >= 0) {
                break;
            }
            if (elem.nodeName.toLowerCase() == 'body') {
                elem = null;
                break;
            }
            elem = elem.parentNode;
        }
    } else if (select.indexOf('#') >= 0) {
        let selId = select.substring(select.indexOf('#') + 1);
        while (elem) {
            if (elem.nodeType < 11 && elem.id && elem.id.indexOf(selId) >= 0) {
                break;
            }
            if (elem.nodeName.toLowerCase() == 'body') {
                elem = null;
                break;
            }
            elem = elem.parentNode;
        }
    } else {
        elem = null;
    }
    return elem;
}

export function tokenExpired(url, data) {
    if (isTokenExpired(data) && whiteUrl.indexOf(url) < 0) {
        goToLogin();
    }
}
export function goToLogin(redirect) {
    if (!redirect) {
        redirect = window.location.href;
    }
    redirect = encryption(redirect);
    //清除token
    storageUtil.removeItem("token");
    window.location.href = "/login?redirect=" + redirect;
}
export function isTokenExpired(data) {
    let isExpired = false;
    isExpired = typeof (data.message) === "object" && data.message.name && data.message.name == "TokenExpiredError";
    isExpired = isExpired || (typeof (data.message) === "string" && data.message.indexOf("登录超时") > -1 || data.message.indexOf("未登录") > -1|| data.message.indexOf("expired") > -1);
    return isExpired
}

export function getUrlParams(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            //return decodeURI(pair[1]);
            return unescape(pair[1]);
        }
    }
    return false;
}