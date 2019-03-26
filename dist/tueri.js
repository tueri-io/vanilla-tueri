"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

function WebpIsSupported() {
  if (!self.createImageBitmap) return false;
  var webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  return fetch(webpData).then(function (r) {
    return r.blob();
  }).then(function (blob) {
    return createImageBitmap(blob).then(function () {
      return true;
    }, function () {
      return false;
    });
  });
}

function loadTueri() {
  return _loadTueri.apply(this, arguments);
}

function _loadTueri() {
  _loadTueri = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var webpIsSupported, tueriImages, i, originalDataSrc, dataSrc, ii, newSrc, width, element, webp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return WebpIsSupported();

          case 2:
            webpIsSupported = _context.sent;
            console.log('WEBP Support', webpIsSupported);
            tueriImages = document.getElementsByClassName("tueri");

            for (i = 0; i < tueriImages.length; i++) {
              if (tueriImages[i].getAttribute('src') === null) {
                originalDataSrc = tueriImages[i].getAttribute("data-src").split('/');
                dataSrc = '';

                for (ii = 0; ii < originalDataSrc.length; ii++) {
                  newSrc = ii < 5 ? originalDataSrc[ii] + '/' : ii === 5 ? originalDataSrc[ii] : '%2f' + originalDataSrc[ii];
                  dataSrc += newSrc;
                }

                width = 0;
                element = tueriImages[i];

                while (width === 0) {
                  width = element.offsetWidth;
                  element = element.parentNode;
                }

                webp = webpIsSupported ? '&fm=webp' : '';
                tueriImages[i].setAttribute("src", dataSrc + '?w=' + width + webp);
              }
            }

            window.requestAnimationFrame(loadTueri);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadTueri.apply(this, arguments);
}

window.requestAnimationFrame(loadTueri);
