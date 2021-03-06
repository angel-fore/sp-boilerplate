import bindEvent from 'bind-event'

(() => {
    // target only for browser
    if (self && self.isCriticalInit) return true

    self.importJS = (uri) => {
        let s = document.createElement('script')
        s.src = uri
        s.type = "text/javascript"
        s.async = false
        document.getElementsByTagName('head')[0].appendChild(s)
    }

    // if Object.assign not supported, load /client/critical-old-ie.js
    if (typeof Object.assign != 'function') self.importJS(
        typeof __CRITICAL_EXTRA_OLD_IE_FILENAME__ == 'undefined' ? "/client/critical-extra-old-ie.js" : __CRITICAL_EXTRA_OLD_IE_FILENAME__
    )

    // import global css
    require('./critical.g.less')

    document.addEventListener("DOMContentLoaded", function (event) {
        let tagHtml = document.getElementsByTagName('html')
        self.isMobile = false

        // remove #main-loader from DOM when page ready
        // disabled for this sample project though
        /*
        let mainLoader = document.getElementById('main-loader')
        bindEvent(
            mainLoader,
            'transitionend',
            function (evt) {
                if (evt.target && evt.target.parentNode && evt.propertyName == 'opacity' && !evt.target.style.opacity)
                    evt.target.parentNode.removeChild(evt.target)
            }
        )
        */

        // platform checking
        let platform = 'not-specified'

        if (tagHtml && tagHtml.length) {
            tagHtml = tagHtml[0]
            if (typeof navigator !== 'undefined') {
                const UA = navigator.userAgent
                if (/Android|HTC/i.test(UA)) {
                    self.isMobile = true
                    platform = 'android'
                } else if (/iPad/i.test(UA)) {
                    // iPad
                    self.isMobile = true
                    platform = 'ios'
                } else if (/iPod|iPhone/i.test(UA)) {
                    // iPhone
                    self.isMobile = true
                    platform = 'ios'
                } else if (/Mobile/i.test(UA) && /Safari/i.test(UA)) {
                    // general iOS
                    self.isMobile = true
                    platform = 'ios'
                }
            }
            if (self.isMobile) {
                tagHtml.classList.add('is-mobile')
            }
            if (platform) {
                tagHtml.classList.add('platform-' + platform)
            }
        }

        // if (platform === 'android') {
        //     let iframe = document.createElement('iframe')
        //     iframe.id = 'main-android-cmpg'
        //     iframe.src = 'cmpg://photogrid.cmcm.com' + location.pathname + location.search
        //     bindEvent(
        //         iframe,
        //         'load',
        //         function (evt) {
        //             evt.target.parentNode.removeChild(evt.target)
        //         }
        //     )
        //     document.body.appendChild(iframe)
        // }

        // online / offline
        function doOnline() {
            console.log('online')
            tagHtml.classList.remove('is-offline')
        }
        function doOffline() {
            console.log('offline')
            tagHtml.classList.add('is-offline')
        }
        window.addEventListener('online', doOnline)
        window.addEventListener('offline', doOffline)
        if (navigator.onLine === false) doOffline()
    })

    self.isCriticalInit = true
})()
