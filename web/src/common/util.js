/**
 * 绑定事件
 *
 * @export
 * @param {any} dom
 * @param {any} eventType
 * @param {any} callback
 */
export function on (dom, eventType, callback) {
    if (document.addEventListener) {
        dom.addEventListener(eventType, callback)
    } else {
        dom.attachEvent('on' + eventType, callback)
    }
}

/**
 * 解绑事件
 *
 * @export
 * @param {any} dom
 * @param {any} eventType
 * @param {any} callback
 */
export function off (dom, eventType, callback) {
    if (document.removeEventListener) {
        dom.removeEventListener(eventType, callback)
    } else {
        dom.detachEvent('on' + eventType, callback)
    }
}