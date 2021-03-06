import bindEvent from 'bind-event'

// Critical process
console.log('__DEV__', __DEV__ ? true : false)
console.log('portals - critical')

require('./critical.g.less')


document.addEventListener("DOMContentLoaded", function () {

    // main-loader
    let loader = document.createElement('div')
    loader.id = 'main-loader'
    document.body.appendChild(loader)
    bindEvent(
        loader,
        'animationend',
        function (evt) {
            if (evt.target === loader && evt.animationName === 'slideout-to-top')
                evt.target.parentNode.removeChild(evt.target)
        }
    )

    let tagHtml = document.getElementsByTagName('html')
    self.isMobile = false
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
})