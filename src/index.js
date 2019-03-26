// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license
console.log('test')
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                    || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
    
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
    
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    function WebpIsSupported() {

        if (!self.createImageBitmap) return false

        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        return fetch(webpData)
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob).then(() => true, () => false))
    }

    

    async function loadTueri() {
        var webpIsSupported = await WebpIsSupported();
        console.log('WEBP Support', webpIsSupported);
        var tueriImages = document.getElementsByClassName("tueri");
        for(var i = 0; i < tueriImages.length; i++) {
            if (tueriImages[i].getAttribute('src') === null) {
                var originalDataSrc = tueriImages[i].getAttribute("data-src").split('/');
                var dataSrc = '';
                for (var ii = 0; ii < originalDataSrc.length; ii++) {
                    var newSrc = ii < 5 ? originalDataSrc[ii] + '/' : ii === 5 ? originalDataSrc[ii] : '%2f' + originalDataSrc[ii];
                    dataSrc += newSrc
                }

                var width = 0
                var element = tueriImages[i]
                while (width === 0) {
                    width = element.offsetWidth;
                    element = element.parentNode;
                }
                const webp = webpIsSupported ? '&fm=webp' : ''   
                tueriImages[i].setAttribute("src", dataSrc + '?w=' + width + webp);
            }
        }
        window.requestAnimationFrame(loadTueri);
    }
    window.requestAnimationFrame(loadTueri);
