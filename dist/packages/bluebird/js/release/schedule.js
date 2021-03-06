"use strict";

var util = require("./util.js");
var schedule;
var noAsyncScheduler = function noAsyncScheduler() {
    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode ? function (fn) {
        GlobalSetImmediate.call(global, fn);
    } : function (fn) {
        ProcessNextTick.call(process, fn);
    };
} else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function schedule(fn) {
        nativePromise.then(fn);
    };
} else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova))) {
    schedule = function () {
        var div = document.createElement("div");
        var opts = { attributes: true };
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function () {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function scheduleToggle() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function () {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    }();
} else if (typeof setImmediate !== "undefined") {
    schedule = function schedule(fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function schedule(fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;