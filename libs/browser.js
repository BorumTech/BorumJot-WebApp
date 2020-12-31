export default class Browser {
    constructor(window) {
        this.window = window;
    }

    get isChrome() {
        return !!this.window.chrome && (!!this.window.chrome.webstore || !!this.window.chrome.runtime)
    }

    get isOpera() {
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
    } 
    
    get isFirefox() {
        return typeof InstallTrigger !== 'undefined'
    }

    get isSafari() {
        return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    }
    
    get isIE() {
        return /*@cc_on!@*/false || !!document.documentMode;
    }

    get isEdge() {
        return !this.isIE && !!window.StyleMedia
    } 
    
    get isBlink() {
        return (isChrome || isOpera) && !!window.CSS
    }

    get browser() {
        if (this.isEdge) return "Edge";
        if (this.isChrome) return "Edge or Chrome";
        if (this.isOpera) return "Opera";
        if (this.isFirefox) return "Firefox";
        if (this.isSafari) return "Safari";
        if (this.isBlink) return "Blink";
        if (this.isIE) return "IE";

        return null;
    }

    browserSupported() {
        if (this.browser == "Firefox") return true;

        return false;
    }
}
