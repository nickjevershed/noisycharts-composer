/**
 * Checks if the atom is inside an iframe and does a risize. This is specific to The Guardian.
 *
 * @param {string} - The element containing the content (By default it is #gv-atom)
 */

export function resizeIframe(elem="#gv-atom") {
  if (window.frameElement) {
    const target = document.querySelector(elem);

    console.log("Inside version 1.1");

    // Post message to parent window to adjust the height
    window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');

    // Hide the overflow to avoid scrollbars
    document.body.style.overflow = 'hidden';

    // Set the initial height of the iframe
    window.frameElement.height = target.offsetHeight;

    // Function to detect height changes of an element
    function onElementHeightChange(elm, callback) {
      let lastHeight = elm.clientHeight;
      let newHeight;
      (function run() {
        newHeight = elm.clientHeight;
        if (lastHeight !== newHeight) callback();
        lastHeight = newHeight;

        if (elm.onElementHeightChangeTimer) {
          clearTimeout(elm.onElementHeightChangeTimer);
        }
        elm.onElementHeightChangeTimer = setTimeout(run, 200);
      })();
    }

    // Watch for changes in the body's height
    onElementHeightChange(document.body, function() {
      window.frameElement.height = target.offsetHeight;
    });
  }
}

export function getBrowser() {
  let result = undefined;
  if (typeof navigator !== 'undefined') { 
    result = navigator.userAgent.toLowerCase();
  }
  return result;
}

export function checkMobile() {
  if (typeof navigator !== 'undefined') {
    const regex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    const a = navigator.userAgent || navigator.vendor || window.opera;
    return regex.test(a.substr(0, 4)) || /iPad/i.test(navigator.userAgent);
  }
  return false;
}

export function checkIOS() {
    if (typeof navigator !== 'undefined') {
      const iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ];
  
      return !!navigator.platform && iDevices.includes(navigator.platform);
    }
    return false;
  
}

export function checkApp() {
  
  let browser = getBrowser();
  console.log('browser', browser);
  let result = false;
  // check if it's inside an iframe
  let embedded = (window.location != window.parent.location)

  if (embedded) {

    // iframeMessenger.getLocation(loc => console.log(loc));

    // window.location.ancestorOrigins doesn't work in Firefox

    if (window.location.ancestorOrigins) {
      if (window.location.ancestorOrigins[0] == 'null') {
        result = true
        }
      else {
        result = false
      }
    }
    else {
      return false
    }

  }
  
  // Check if an atom embed - note I haven't tested this yet because iOS app to console output is annoying
  
  else {
    result = window.location.origin === "file://" || window.location.origin === null || window.location.origin === "https://mobile.guardianapis.com";
  }
  return result;
}

export function checkPlatform() {
  // console.log("window.location",window.location)
  // console.log("parent.location", window.parent)
  // console.log("document.referrer", document.referrer)
  // console.log("checkApp", checkApp())
  // Check if within iframe

  let embedded = (window.location != window.parent.location)
  console.log("embedded",embedded)

  let results = {};

  if (typeof navigator !== 'undefined') {
    results.platform = navigator.platform.toLowerCase();
    results.userAgent = navigator.userAgent.toLowerCase();
    results.isMobile = checkMobile();
  
    results.app = {
      isApp: checkApp(),
      isIos: checkIOS(),
      isAndroid: /(android)/i.test(navigator.userAgent),
      isiPhone: /(iPhone)/i.test(navigator.platform),
      isiPad: /iPad/i.test(navigator.userAgent)
    };
  } else {
    console.warn('Navigator is not defined. Running in a non-browser environment.');
    results.platform = 'unknown';
    results.userAgent = 'unknown';
    results.isMobile = false;
    results.app = {
      isApp: false,
      isIos: false,
      isAndroid: false,
      isiPhone: false,
      isiPad: false
    };
  }

  return results;
}

