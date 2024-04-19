function Q0(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var Hd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function aa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Pm={exports:{}},sa={},_m={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi=Symbol.for("react.element"),q0=Symbol.for("react.portal"),G0=Symbol.for("react.fragment"),Y0=Symbol.for("react.strict_mode"),X0=Symbol.for("react.profiler"),J0=Symbol.for("react.provider"),Z0=Symbol.for("react.context"),e1=Symbol.for("react.forward_ref"),t1=Symbol.for("react.suspense"),n1=Symbol.for("react.memo"),r1=Symbol.for("react.lazy"),Vd=Symbol.iterator;function o1(e){return e===null||typeof e!="object"?null:(e=Vd&&e[Vd]||e["@@iterator"],typeof e=="function"?e:null)}var Rm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Im=Object.assign,Om={};function to(e,t,n){this.props=e,this.context=t,this.refs=Om,this.updater=n||Rm}to.prototype.isReactComponent={};to.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};to.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Am(){}Am.prototype=to.prototype;function dc(e,t,n){this.props=e,this.context=t,this.refs=Om,this.updater=n||Rm}var fc=dc.prototype=new Am;fc.constructor=dc;Im(fc,to.prototype);fc.isPureReactComponent=!0;var Wd=Array.isArray,Lm=Object.prototype.hasOwnProperty,pc={current:null},zm={key:!0,ref:!0,__self:!0,__source:!0};function Mm(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)Lm.call(t,r)&&!zm.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:yi,type:e,key:i,ref:l,props:o,_owner:pc.current}}function i1(e,t){return{$$typeof:yi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function mc(e){return typeof e=="object"&&e!==null&&e.$$typeof===yi}function l1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Kd=/\/+/g;function Xa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?l1(""+e.key):t.toString(36)}function al(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case yi:case q0:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Xa(l,0):r,Wd(o)?(n="",e!=null&&(n=e.replace(Kd,"$&/")+"/"),al(o,t,n,"",function(u){return u})):o!=null&&(mc(o)&&(o=i1(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Kd,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Wd(e))for(var a=0;a<e.length;a++){i=e[a];var s=r+Xa(i,a);l+=al(i,t,n,s,o)}else if(s=o1(e),typeof s=="function")for(e=s.call(e),a=0;!(i=e.next()).done;)i=i.value,s=r+Xa(i,a++),l+=al(i,t,n,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Li(e,t,n){if(e==null)return e;var r=[],o=0;return al(e,r,"","",function(i){return t.call(n,i,o++)}),r}function a1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var rt={current:null},sl={transition:null},s1={ReactCurrentDispatcher:rt,ReactCurrentBatchConfig:sl,ReactCurrentOwner:pc};ne.Children={map:Li,forEach:function(e,t,n){Li(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Li(e,function(){t++}),t},toArray:function(e){return Li(e,function(t){return t})||[]},only:function(e){if(!mc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ne.Component=to;ne.Fragment=G0;ne.Profiler=X0;ne.PureComponent=dc;ne.StrictMode=Y0;ne.Suspense=t1;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=s1;ne.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Im({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=pc.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Lm.call(t,s)&&!zm.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var u=0;u<s;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:yi,type:e.type,key:o,ref:i,props:r,_owner:l}};ne.createContext=function(e){return e={$$typeof:Z0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:J0,_context:e},e.Consumer=e};ne.createElement=Mm;ne.createFactory=function(e){var t=Mm.bind(null,e);return t.type=e,t};ne.createRef=function(){return{current:null}};ne.forwardRef=function(e){return{$$typeof:e1,render:e}};ne.isValidElement=mc;ne.lazy=function(e){return{$$typeof:r1,_payload:{_status:-1,_result:e},_init:a1}};ne.memo=function(e,t){return{$$typeof:n1,type:e,compare:t===void 0?null:t}};ne.startTransition=function(e){var t=sl.transition;sl.transition={};try{e()}finally{sl.transition=t}};ne.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};ne.useCallback=function(e,t){return rt.current.useCallback(e,t)};ne.useContext=function(e){return rt.current.useContext(e)};ne.useDebugValue=function(){};ne.useDeferredValue=function(e){return rt.current.useDeferredValue(e)};ne.useEffect=function(e,t){return rt.current.useEffect(e,t)};ne.useId=function(){return rt.current.useId()};ne.useImperativeHandle=function(e,t,n){return rt.current.useImperativeHandle(e,t,n)};ne.useInsertionEffect=function(e,t){return rt.current.useInsertionEffect(e,t)};ne.useLayoutEffect=function(e,t){return rt.current.useLayoutEffect(e,t)};ne.useMemo=function(e,t){return rt.current.useMemo(e,t)};ne.useReducer=function(e,t,n){return rt.current.useReducer(e,t,n)};ne.useRef=function(e){return rt.current.useRef(e)};ne.useState=function(e){return rt.current.useState(e)};ne.useSyncExternalStore=function(e,t,n){return rt.current.useSyncExternalStore(e,t,n)};ne.useTransition=function(){return rt.current.useTransition()};ne.version="18.2.0";_m.exports=ne;var R=_m.exports;const ki=aa(R),Qd=Q0({__proto__:null,default:ki},[R]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u1=R,c1=Symbol.for("react.element"),d1=Symbol.for("react.fragment"),f1=Object.prototype.hasOwnProperty,p1=u1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m1={key:!0,ref:!0,__self:!0,__source:!0};function Fm(e,t,n){var r,o={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)f1.call(t,r)&&!m1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:c1,type:e,key:i,ref:l,props:o,_owner:p1.current}}sa.Fragment=d1;sa.jsx=Fm;sa.jsxs=Fm;Pm.exports=sa;var z=Pm.exports,Gs={},Nm={exports:{}},Et={},Dm={exports:{}},jm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(O,H){var b=O.length;O.push(H);e:for(;0<b;){var Y=b-1>>>1,W=O[Y];if(0<o(W,H))O[Y]=H,O[b]=W,b=Y;else break e}}function n(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var H=O[0],b=O.pop();if(b!==H){O[0]=b;e:for(var Y=0,W=O.length,x=W>>>1;Y<x;){var re=2*(Y+1)-1,we=O[re],ee=re+1,Ue=O[ee];if(0>o(we,b))ee<W&&0>o(Ue,we)?(O[Y]=Ue,O[ee]=b,Y=ee):(O[Y]=we,O[re]=b,Y=re);else if(ee<W&&0>o(Ue,b))O[Y]=Ue,O[ee]=b,Y=ee;else break e}}return H}function o(O,H){var b=O.sortIndex-H.sortIndex;return b!==0?b:O.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,a=l.now();e.unstable_now=function(){return l.now()-a}}var s=[],u=[],d=1,c=null,f=3,p=!1,m=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k(O){for(var H=n(u);H!==null;){if(H.callback===null)r(u);else if(H.startTime<=O)r(u),H.sortIndex=H.expirationTime,t(s,H);else break;H=n(u)}}function C(O){if(y=!1,k(O),!m)if(n(s)!==null)m=!0,A(T);else{var H=n(u);H!==null&&$(C,H.startTime-O)}}function T(O,H){m=!1,y&&(y=!1,g(P),P=-1),p=!0;var b=f;try{for(k(H),c=n(s);c!==null&&(!(c.expirationTime>H)||O&&!I());){var Y=c.callback;if(typeof Y=="function"){c.callback=null,f=c.priorityLevel;var W=Y(c.expirationTime<=H);H=e.unstable_now(),typeof W=="function"?c.callback=W:c===n(s)&&r(s),k(H)}else r(s);c=n(s)}if(c!==null)var x=!0;else{var re=n(u);re!==null&&$(C,re.startTime-H),x=!1}return x}finally{c=null,f=b,p=!1}}var v=!1,E=null,P=-1,M=5,w=-1;function I(){return!(e.unstable_now()-w<M)}function L(){if(E!==null){var O=e.unstable_now();w=O;var H=!0;try{H=E(!0,O)}finally{H?B():(v=!1,E=null)}}else v=!1}var B;if(typeof h=="function")B=function(){h(L)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,D=V.port2;V.port1.onmessage=L,B=function(){D.postMessage(null)}}else B=function(){S(L,0)};function A(O){E=O,v||(v=!0,B())}function $(O,H){P=S(function(){O(e.unstable_now())},H)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(O){O.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,A(T))},e.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<O?Math.floor(1e3/O):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(O){switch(f){case 1:case 2:case 3:var H=3;break;default:H=f}var b=f;f=H;try{return O()}finally{f=b}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(O,H){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var b=f;f=O;try{return H()}finally{f=b}},e.unstable_scheduleCallback=function(O,H,b){var Y=e.unstable_now();switch(typeof b=="object"&&b!==null?(b=b.delay,b=typeof b=="number"&&0<b?Y+b:Y):b=Y,O){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=b+W,O={id:d++,callback:H,priorityLevel:O,startTime:b,expirationTime:W,sortIndex:-1},b>Y?(O.sortIndex=b,t(u,O),n(s)===null&&O===n(u)&&(y?(g(P),P=-1):y=!0,$(C,b-Y))):(O.sortIndex=W,t(s,O),m||p||(m=!0,A(T))),O},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(O){var H=f;return function(){var b=f;f=H;try{return O.apply(this,arguments)}finally{f=b}}}})(jm);Dm.exports=jm;var h1=Dm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $m=R,Ct=h1;function F(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Bm=new Set,jo={};function mr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(jo[e]=t,e=0;e<t.length;e++)Bm.add(t[e])}var yn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ys=Object.prototype.hasOwnProperty,g1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qd={},Gd={};function y1(e){return Ys.call(Gd,e)?!0:Ys.call(qd,e)?!1:g1.test(e)?Gd[e]=!0:(qd[e]=!0,!1)}function k1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function w1(e,t,n,r){if(t===null||typeof t>"u"||k1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ot(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Ke={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ke[e]=new ot(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ke[t]=new ot(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ke[e]=new ot(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ke[e]=new ot(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ke[e]=new ot(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ke[e]=new ot(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ke[e]=new ot(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ke[e]=new ot(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ke[e]=new ot(e,5,!1,e.toLowerCase(),null,!1,!1)});var hc=/[\-:]([a-z])/g;function gc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(hc,gc);Ke[t]=new ot(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(hc,gc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(hc,gc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!1,!1)});Ke.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!0,!0)});function yc(e,t,n,r){var o=Ke.hasOwnProperty(t)?Ke[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(w1(t,n,o,r)&&(n=null),r||o===null?y1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var vn=$m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zi=Symbol.for("react.element"),Cr=Symbol.for("react.portal"),Er=Symbol.for("react.fragment"),kc=Symbol.for("react.strict_mode"),Xs=Symbol.for("react.profiler"),Um=Symbol.for("react.provider"),Hm=Symbol.for("react.context"),wc=Symbol.for("react.forward_ref"),Js=Symbol.for("react.suspense"),Zs=Symbol.for("react.suspense_list"),bc=Symbol.for("react.memo"),Pn=Symbol.for("react.lazy"),Vm=Symbol.for("react.offscreen"),Yd=Symbol.iterator;function uo(e){return e===null||typeof e!="object"?null:(e=Yd&&e[Yd]||e["@@iterator"],typeof e=="function"?e:null)}var Ee=Object.assign,Ja;function xo(e){if(Ja===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ja=t&&t[1]||""}return`
`+Ja+e}var Za=!1;function es(e,t){if(!e||Za)return"";Za=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),i=r.stack.split(`
`),l=o.length-1,a=i.length-1;1<=l&&0<=a&&o[l]!==i[a];)a--;for(;1<=l&&0<=a;l--,a--)if(o[l]!==i[a]){if(l!==1||a!==1)do if(l--,a--,0>a||o[l]!==i[a]){var s=`
`+o[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=a);break}}}finally{Za=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?xo(e):""}function b1(e){switch(e.tag){case 5:return xo(e.type);case 16:return xo("Lazy");case 13:return xo("Suspense");case 19:return xo("SuspenseList");case 0:case 2:case 15:return e=es(e.type,!1),e;case 11:return e=es(e.type.render,!1),e;case 1:return e=es(e.type,!0),e;default:return""}}function eu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Er:return"Fragment";case Cr:return"Portal";case Xs:return"Profiler";case kc:return"StrictMode";case Js:return"Suspense";case Zs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Hm:return(e.displayName||"Context")+".Consumer";case Um:return(e._context.displayName||"Context")+".Provider";case wc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case bc:return t=e.displayName||null,t!==null?t:eu(e.type)||"Memo";case Pn:t=e._payload,e=e._init;try{return eu(e(t))}catch{}}return null}function x1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return eu(t);case 8:return t===kc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wm(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function v1(e){var t=Wm(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mi(e){e._valueTracker||(e._valueTracker=v1(e))}function Km(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Wm(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Tl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function tu(e,t){var n=t.checked;return Ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Xd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Qm(e,t){t=t.checked,t!=null&&yc(e,"checked",t,!1)}function nu(e,t){Qm(e,t);var n=Vn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ru(e,t.type,n):t.hasOwnProperty("defaultValue")&&ru(e,t.type,Vn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Jd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ru(e,t,n){(t!=="number"||Tl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vo=Array.isArray;function Fr(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function ou(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(F(91));return Ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Zd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(F(92));if(vo(n)){if(1<n.length)throw Error(F(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vn(n)}}function qm(e,t){var n=Vn(t.value),r=Vn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ef(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Gm(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function iu(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Gm(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Fi,Ym=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Fi=Fi||document.createElement("div"),Fi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Fi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function $o(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Eo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},S1=["Webkit","ms","Moz","O"];Object.keys(Eo).forEach(function(e){S1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Eo[t]=Eo[e]})});function Xm(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Eo.hasOwnProperty(e)&&Eo[e]?(""+t).trim():t+"px"}function Jm(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Xm(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var C1=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function lu(e,t){if(t){if(C1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(F(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(F(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(F(61))}if(t.style!=null&&typeof t.style!="object")throw Error(F(62))}}function au(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var su=null;function xc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var uu=null,Nr=null,Dr=null;function tf(e){if(e=xi(e)){if(typeof uu!="function")throw Error(F(280));var t=e.stateNode;t&&(t=pa(t),uu(e.stateNode,e.type,t))}}function Zm(e){Nr?Dr?Dr.push(e):Dr=[e]:Nr=e}function eh(){if(Nr){var e=Nr,t=Dr;if(Dr=Nr=null,tf(e),t)for(e=0;e<t.length;e++)tf(t[e])}}function th(e,t){return e(t)}function nh(){}var ts=!1;function rh(e,t,n){if(ts)return e(t,n);ts=!0;try{return th(e,t,n)}finally{ts=!1,(Nr!==null||Dr!==null)&&(nh(),eh())}}function Bo(e,t){var n=e.stateNode;if(n===null)return null;var r=pa(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(F(231,t,typeof n));return n}var cu=!1;if(yn)try{var co={};Object.defineProperty(co,"passive",{get:function(){cu=!0}}),window.addEventListener("test",co,co),window.removeEventListener("test",co,co)}catch{cu=!1}function E1(e,t,n,r,o,i,l,a,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var To=!1,Pl=null,_l=!1,du=null,T1={onError:function(e){To=!0,Pl=e}};function P1(e,t,n,r,o,i,l,a,s){To=!1,Pl=null,E1.apply(T1,arguments)}function _1(e,t,n,r,o,i,l,a,s){if(P1.apply(this,arguments),To){if(To){var u=Pl;To=!1,Pl=null}else throw Error(F(198));_l||(_l=!0,du=u)}}function hr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function oh(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function nf(e){if(hr(e)!==e)throw Error(F(188))}function R1(e){var t=e.alternate;if(!t){if(t=hr(e),t===null)throw Error(F(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return nf(o),e;if(i===r)return nf(o),t;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,a=o.child;a;){if(a===n){l=!0,n=o,r=i;break}if(a===r){l=!0,r=o,n=i;break}a=a.sibling}if(!l){for(a=i.child;a;){if(a===n){l=!0,n=i,r=o;break}if(a===r){l=!0,r=i,n=o;break}a=a.sibling}if(!l)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?e:t}function ih(e){return e=R1(e),e!==null?lh(e):null}function lh(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=lh(e);if(t!==null)return t;e=e.sibling}return null}var ah=Ct.unstable_scheduleCallback,rf=Ct.unstable_cancelCallback,I1=Ct.unstable_shouldYield,O1=Ct.unstable_requestPaint,Re=Ct.unstable_now,A1=Ct.unstable_getCurrentPriorityLevel,vc=Ct.unstable_ImmediatePriority,sh=Ct.unstable_UserBlockingPriority,Rl=Ct.unstable_NormalPriority,L1=Ct.unstable_LowPriority,uh=Ct.unstable_IdlePriority,ua=null,rn=null;function z1(e){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(ua,e,void 0,(e.current.flags&128)===128)}catch{}}var Qt=Math.clz32?Math.clz32:N1,M1=Math.log,F1=Math.LN2;function N1(e){return e>>>=0,e===0?32:31-(M1(e)/F1|0)|0}var Ni=64,Di=4194304;function So(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Il(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var a=l&~o;a!==0?r=So(a):(i&=l,i!==0&&(r=So(i)))}else l=n&~o,l!==0?r=So(l):i!==0&&(r=So(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qt(t),o=1<<n,r|=e[n],t&=~o;return r}function D1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function j1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-Qt(i),a=1<<l,s=o[l];s===-1?(!(a&n)||a&r)&&(o[l]=D1(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function fu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ch(){var e=Ni;return Ni<<=1,!(Ni&4194240)&&(Ni=64),e}function ns(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wi(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qt(t),e[t]=n}function $1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Qt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function Sc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var se=0;function dh(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var fh,Cc,ph,mh,hh,pu=!1,ji=[],Mn=null,Fn=null,Nn=null,Uo=new Map,Ho=new Map,Rn=[],B1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function of(e,t){switch(e){case"focusin":case"focusout":Mn=null;break;case"dragenter":case"dragleave":Fn=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":Uo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ho.delete(t.pointerId)}}function fo(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=xi(t),t!==null&&Cc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function U1(e,t,n,r,o){switch(t){case"focusin":return Mn=fo(Mn,e,t,n,r,o),!0;case"dragenter":return Fn=fo(Fn,e,t,n,r,o),!0;case"mouseover":return Nn=fo(Nn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Uo.set(i,fo(Uo.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Ho.set(i,fo(Ho.get(i)||null,e,t,n,r,o)),!0}return!1}function gh(e){var t=rr(e.target);if(t!==null){var n=hr(t);if(n!==null){if(t=n.tag,t===13){if(t=oh(n),t!==null){e.blockedOn=t,hh(e.priority,function(){ph(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ul(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=mu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);su=r,n.target.dispatchEvent(r),su=null}else return t=xi(n),t!==null&&Cc(t),e.blockedOn=n,!1;t.shift()}return!0}function lf(e,t,n){ul(e)&&n.delete(t)}function H1(){pu=!1,Mn!==null&&ul(Mn)&&(Mn=null),Fn!==null&&ul(Fn)&&(Fn=null),Nn!==null&&ul(Nn)&&(Nn=null),Uo.forEach(lf),Ho.forEach(lf)}function po(e,t){e.blockedOn===t&&(e.blockedOn=null,pu||(pu=!0,Ct.unstable_scheduleCallback(Ct.unstable_NormalPriority,H1)))}function Vo(e){function t(o){return po(o,e)}if(0<ji.length){po(ji[0],e);for(var n=1;n<ji.length;n++){var r=ji[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Mn!==null&&po(Mn,e),Fn!==null&&po(Fn,e),Nn!==null&&po(Nn,e),Uo.forEach(t),Ho.forEach(t),n=0;n<Rn.length;n++)r=Rn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rn.length&&(n=Rn[0],n.blockedOn===null);)gh(n),n.blockedOn===null&&Rn.shift()}var jr=vn.ReactCurrentBatchConfig,Ol=!0;function V1(e,t,n,r){var o=se,i=jr.transition;jr.transition=null;try{se=1,Ec(e,t,n,r)}finally{se=o,jr.transition=i}}function W1(e,t,n,r){var o=se,i=jr.transition;jr.transition=null;try{se=4,Ec(e,t,n,r)}finally{se=o,jr.transition=i}}function Ec(e,t,n,r){if(Ol){var o=mu(e,t,n,r);if(o===null)fs(e,t,r,Al,n),of(e,r);else if(U1(o,e,t,n,r))r.stopPropagation();else if(of(e,r),t&4&&-1<B1.indexOf(e)){for(;o!==null;){var i=xi(o);if(i!==null&&fh(i),i=mu(e,t,n,r),i===null&&fs(e,t,r,Al,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else fs(e,t,r,null,n)}}var Al=null;function mu(e,t,n,r){if(Al=null,e=xc(r),e=rr(e),e!==null)if(t=hr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=oh(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Al=e,null}function yh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(A1()){case vc:return 1;case sh:return 4;case Rl:case L1:return 16;case uh:return 536870912;default:return 16}default:return 16}}var An=null,Tc=null,cl=null;function kh(){if(cl)return cl;var e,t=Tc,n=t.length,r,o="value"in An?An.value:An.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return cl=o.slice(e,1<r?1-r:void 0)}function dl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function $i(){return!0}function af(){return!1}function Tt(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?$i:af,this.isPropagationStopped=af,this}return Ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=$i)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=$i)},persist:function(){},isPersistent:$i}),t}var no={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pc=Tt(no),bi=Ee({},no,{view:0,detail:0}),K1=Tt(bi),rs,os,mo,ca=Ee({},bi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_c,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==mo&&(mo&&e.type==="mousemove"?(rs=e.screenX-mo.screenX,os=e.screenY-mo.screenY):os=rs=0,mo=e),rs)},movementY:function(e){return"movementY"in e?e.movementY:os}}),sf=Tt(ca),Q1=Ee({},ca,{dataTransfer:0}),q1=Tt(Q1),G1=Ee({},bi,{relatedTarget:0}),is=Tt(G1),Y1=Ee({},no,{animationName:0,elapsedTime:0,pseudoElement:0}),X1=Tt(Y1),J1=Ee({},no,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Z1=Tt(J1),ek=Ee({},no,{data:0}),uf=Tt(ek),tk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},nk={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ok(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rk[e])?!!t[e]:!1}function _c(){return ok}var ik=Ee({},bi,{key:function(e){if(e.key){var t=tk[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=dl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?nk[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_c,charCode:function(e){return e.type==="keypress"?dl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?dl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lk=Tt(ik),ak=Ee({},ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cf=Tt(ak),sk=Ee({},bi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_c}),uk=Tt(sk),ck=Ee({},no,{propertyName:0,elapsedTime:0,pseudoElement:0}),dk=Tt(ck),fk=Ee({},ca,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pk=Tt(fk),mk=[9,13,27,32],Rc=yn&&"CompositionEvent"in window,Po=null;yn&&"documentMode"in document&&(Po=document.documentMode);var hk=yn&&"TextEvent"in window&&!Po,wh=yn&&(!Rc||Po&&8<Po&&11>=Po),df=" ",ff=!1;function bh(e,t){switch(e){case"keyup":return mk.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Tr=!1;function gk(e,t){switch(e){case"compositionend":return xh(t);case"keypress":return t.which!==32?null:(ff=!0,df);case"textInput":return e=t.data,e===df&&ff?null:e;default:return null}}function yk(e,t){if(Tr)return e==="compositionend"||!Rc&&bh(e,t)?(e=kh(),cl=Tc=An=null,Tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return wh&&t.locale!=="ko"?null:t.data;default:return null}}var kk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kk[e.type]:t==="textarea"}function vh(e,t,n,r){Zm(r),t=Ll(t,"onChange"),0<t.length&&(n=new Pc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var _o=null,Wo=null;function wk(e){Lh(e,0)}function da(e){var t=Rr(e);if(Km(t))return e}function bk(e,t){if(e==="change")return t}var Sh=!1;if(yn){var ls;if(yn){var as="oninput"in document;if(!as){var mf=document.createElement("div");mf.setAttribute("oninput","return;"),as=typeof mf.oninput=="function"}ls=as}else ls=!1;Sh=ls&&(!document.documentMode||9<document.documentMode)}function hf(){_o&&(_o.detachEvent("onpropertychange",Ch),Wo=_o=null)}function Ch(e){if(e.propertyName==="value"&&da(Wo)){var t=[];vh(t,Wo,e,xc(e)),rh(wk,t)}}function xk(e,t,n){e==="focusin"?(hf(),_o=t,Wo=n,_o.attachEvent("onpropertychange",Ch)):e==="focusout"&&hf()}function vk(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return da(Wo)}function Sk(e,t){if(e==="click")return da(t)}function Ck(e,t){if(e==="input"||e==="change")return da(t)}function Ek(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Yt=typeof Object.is=="function"?Object.is:Ek;function Ko(e,t){if(Yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!Ys.call(t,o)||!Yt(e[o],t[o]))return!1}return!0}function gf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function yf(e,t){var n=gf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=gf(n)}}function Eh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Eh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Th(){for(var e=window,t=Tl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tl(e.document)}return t}function Ic(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Tk(e){var t=Th(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Eh(n.ownerDocument.documentElement,n)){if(r!==null&&Ic(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=yf(n,i);var l=yf(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Pk=yn&&"documentMode"in document&&11>=document.documentMode,Pr=null,hu=null,Ro=null,gu=!1;function kf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gu||Pr==null||Pr!==Tl(r)||(r=Pr,"selectionStart"in r&&Ic(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ro&&Ko(Ro,r)||(Ro=r,r=Ll(hu,"onSelect"),0<r.length&&(t=new Pc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Pr)))}function Bi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _r={animationend:Bi("Animation","AnimationEnd"),animationiteration:Bi("Animation","AnimationIteration"),animationstart:Bi("Animation","AnimationStart"),transitionend:Bi("Transition","TransitionEnd")},ss={},Ph={};yn&&(Ph=document.createElement("div").style,"AnimationEvent"in window||(delete _r.animationend.animation,delete _r.animationiteration.animation,delete _r.animationstart.animation),"TransitionEvent"in window||delete _r.transitionend.transition);function fa(e){if(ss[e])return ss[e];if(!_r[e])return e;var t=_r[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ph)return ss[e]=t[n];return e}var _h=fa("animationend"),Rh=fa("animationiteration"),Ih=fa("animationstart"),Oh=fa("transitionend"),Ah=new Map,wf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qn(e,t){Ah.set(e,t),mr(t,[e])}for(var us=0;us<wf.length;us++){var cs=wf[us],_k=cs.toLowerCase(),Rk=cs[0].toUpperCase()+cs.slice(1);Qn(_k,"on"+Rk)}Qn(_h,"onAnimationEnd");Qn(Rh,"onAnimationIteration");Qn(Ih,"onAnimationStart");Qn("dblclick","onDoubleClick");Qn("focusin","onFocus");Qn("focusout","onBlur");Qn(Oh,"onTransitionEnd");Wr("onMouseEnter",["mouseout","mouseover"]);Wr("onMouseLeave",["mouseout","mouseover"]);Wr("onPointerEnter",["pointerout","pointerover"]);Wr("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Co="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ik=new Set("cancel close invalid load scroll toggle".split(" ").concat(Co));function bf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,_1(r,t,void 0,e),e.currentTarget=null}function Lh(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],s=a.instance,u=a.currentTarget;if(a=a.listener,s!==i&&o.isPropagationStopped())break e;bf(o,a,u),i=s}else for(l=0;l<r.length;l++){if(a=r[l],s=a.instance,u=a.currentTarget,a=a.listener,s!==i&&o.isPropagationStopped())break e;bf(o,a,u),i=s}}}if(_l)throw e=du,_l=!1,du=null,e}function ge(e,t){var n=t[xu];n===void 0&&(n=t[xu]=new Set);var r=e+"__bubble";n.has(r)||(zh(t,e,2,!1),n.add(r))}function ds(e,t,n){var r=0;t&&(r|=4),zh(n,e,r,t)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function Qo(e){if(!e[Ui]){e[Ui]=!0,Bm.forEach(function(n){n!=="selectionchange"&&(Ik.has(n)||ds(n,!1,e),ds(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ui]||(t[Ui]=!0,ds("selectionchange",!1,t))}}function zh(e,t,n,r){switch(yh(t)){case 1:var o=V1;break;case 4:o=W1;break;default:o=Ec}n=o.bind(null,t,n,e),o=void 0,!cu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function fs(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;l=l.return}for(;a!==null;){if(l=rr(a),l===null)return;if(s=l.tag,s===5||s===6){r=i=l;continue e}a=a.parentNode}}r=r.return}rh(function(){var u=i,d=xc(n),c=[];e:{var f=Ah.get(e);if(f!==void 0){var p=Pc,m=e;switch(e){case"keypress":if(dl(n)===0)break e;case"keydown":case"keyup":p=lk;break;case"focusin":m="focus",p=is;break;case"focusout":m="blur",p=is;break;case"beforeblur":case"afterblur":p=is;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=sf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=q1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=uk;break;case _h:case Rh:case Ih:p=X1;break;case Oh:p=dk;break;case"scroll":p=K1;break;case"wheel":p=pk;break;case"copy":case"cut":case"paste":p=Z1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=cf}var y=(t&4)!==0,S=!y&&e==="scroll",g=y?f!==null?f+"Capture":null:f;y=[];for(var h=u,k;h!==null;){k=h;var C=k.stateNode;if(k.tag===5&&C!==null&&(k=C,g!==null&&(C=Bo(h,g),C!=null&&y.push(qo(h,C,k)))),S)break;h=h.return}0<y.length&&(f=new p(f,m,null,n,d),c.push({event:f,listeners:y}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==su&&(m=n.relatedTarget||n.fromElement)&&(rr(m)||m[kn]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=u,m=m?rr(m):null,m!==null&&(S=hr(m),m!==S||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=u),p!==m)){if(y=sf,C="onMouseLeave",g="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(y=cf,C="onPointerLeave",g="onPointerEnter",h="pointer"),S=p==null?f:Rr(p),k=m==null?f:Rr(m),f=new y(C,h+"leave",p,n,d),f.target=S,f.relatedTarget=k,C=null,rr(d)===u&&(y=new y(g,h+"enter",m,n,d),y.target=k,y.relatedTarget=S,C=y),S=C,p&&m)t:{for(y=p,g=m,h=0,k=y;k;k=xr(k))h++;for(k=0,C=g;C;C=xr(C))k++;for(;0<h-k;)y=xr(y),h--;for(;0<k-h;)g=xr(g),k--;for(;h--;){if(y===g||g!==null&&y===g.alternate)break t;y=xr(y),g=xr(g)}y=null}else y=null;p!==null&&xf(c,f,p,y,!1),m!==null&&S!==null&&xf(c,S,m,y,!0)}}e:{if(f=u?Rr(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=bk;else if(pf(f))if(Sh)T=Ck;else{T=vk;var v=xk}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(T=Sk);if(T&&(T=T(e,u))){vh(c,T,n,d);break e}v&&v(e,f,u),e==="focusout"&&(v=f._wrapperState)&&v.controlled&&f.type==="number"&&ru(f,"number",f.value)}switch(v=u?Rr(u):window,e){case"focusin":(pf(v)||v.contentEditable==="true")&&(Pr=v,hu=u,Ro=null);break;case"focusout":Ro=hu=Pr=null;break;case"mousedown":gu=!0;break;case"contextmenu":case"mouseup":case"dragend":gu=!1,kf(c,n,d);break;case"selectionchange":if(Pk)break;case"keydown":case"keyup":kf(c,n,d)}var E;if(Rc)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Tr?bh(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(wh&&n.locale!=="ko"&&(Tr||P!=="onCompositionStart"?P==="onCompositionEnd"&&Tr&&(E=kh()):(An=d,Tc="value"in An?An.value:An.textContent,Tr=!0)),v=Ll(u,P),0<v.length&&(P=new uf(P,e,null,n,d),c.push({event:P,listeners:v}),E?P.data=E:(E=xh(n),E!==null&&(P.data=E)))),(E=hk?gk(e,n):yk(e,n))&&(u=Ll(u,"onBeforeInput"),0<u.length&&(d=new uf("onBeforeInput","beforeinput",null,n,d),c.push({event:d,listeners:u}),d.data=E))}Lh(c,t)})}function qo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ll(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Bo(e,n),i!=null&&r.unshift(qo(e,i,o)),i=Bo(e,t),i!=null&&r.push(qo(e,i,o))),e=e.return}return r}function xr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function xf(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var a=n,s=a.alternate,u=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&u!==null&&(a=u,o?(s=Bo(n,i),s!=null&&l.unshift(qo(n,s,a))):o||(s=Bo(n,i),s!=null&&l.push(qo(n,s,a)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Ok=/\r\n?/g,Ak=/\u0000|\uFFFD/g;function vf(e){return(typeof e=="string"?e:""+e).replace(Ok,`
`).replace(Ak,"")}function Hi(e,t,n){if(t=vf(t),vf(e)!==t&&n)throw Error(F(425))}function zl(){}var yu=null,ku=null;function wu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bu=typeof setTimeout=="function"?setTimeout:void 0,Lk=typeof clearTimeout=="function"?clearTimeout:void 0,Sf=typeof Promise=="function"?Promise:void 0,zk=typeof queueMicrotask=="function"?queueMicrotask:typeof Sf<"u"?function(e){return Sf.resolve(null).then(e).catch(Mk)}:bu;function Mk(e){setTimeout(function(){throw e})}function ps(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Vo(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Vo(t)}function Dn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Cf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ro=Math.random().toString(36).slice(2),nn="__reactFiber$"+ro,Go="__reactProps$"+ro,kn="__reactContainer$"+ro,xu="__reactEvents$"+ro,Fk="__reactListeners$"+ro,Nk="__reactHandles$"+ro;function rr(e){var t=e[nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kn]||n[nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Cf(e);e!==null;){if(n=e[nn])return n;e=Cf(e)}return t}e=n,n=e.parentNode}return null}function xi(e){return e=e[nn]||e[kn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Rr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(F(33))}function pa(e){return e[Go]||null}var vu=[],Ir=-1;function qn(e){return{current:e}}function ye(e){0>Ir||(e.current=vu[Ir],vu[Ir]=null,Ir--)}function he(e,t){Ir++,vu[Ir]=e.current,e.current=t}var Wn={},Je=qn(Wn),ct=qn(!1),sr=Wn;function Kr(e,t){var n=e.type.contextTypes;if(!n)return Wn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function dt(e){return e=e.childContextTypes,e!=null}function Ml(){ye(ct),ye(Je)}function Ef(e,t,n){if(Je.current!==Wn)throw Error(F(168));he(Je,t),he(ct,n)}function Mh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(F(108,x1(e)||"Unknown",o));return Ee({},n,r)}function Fl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Wn,sr=Je.current,he(Je,e),he(ct,ct.current),!0}function Tf(e,t,n){var r=e.stateNode;if(!r)throw Error(F(169));n?(e=Mh(e,t,sr),r.__reactInternalMemoizedMergedChildContext=e,ye(ct),ye(Je),he(Je,e)):ye(ct),he(ct,n)}var dn=null,ma=!1,ms=!1;function Fh(e){dn===null?dn=[e]:dn.push(e)}function Dk(e){ma=!0,Fh(e)}function Gn(){if(!ms&&dn!==null){ms=!0;var e=0,t=se;try{var n=dn;for(se=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}dn=null,ma=!1}catch(o){throw dn!==null&&(dn=dn.slice(e+1)),ah(vc,Gn),o}finally{se=t,ms=!1}}return null}var Or=[],Ar=0,Nl=null,Dl=0,Rt=[],It=0,ur=null,pn=1,mn="";function Zn(e,t){Or[Ar++]=Dl,Or[Ar++]=Nl,Nl=e,Dl=t}function Nh(e,t,n){Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=ur,ur=e;var r=pn;e=mn;var o=32-Qt(r)-1;r&=~(1<<o),n+=1;var i=32-Qt(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,pn=1<<32-Qt(t)+o|n<<o|r,mn=i+e}else pn=1<<i|n<<o|r,mn=e}function Oc(e){e.return!==null&&(Zn(e,1),Nh(e,1,0))}function Ac(e){for(;e===Nl;)Nl=Or[--Ar],Or[Ar]=null,Dl=Or[--Ar],Or[Ar]=null;for(;e===ur;)ur=Rt[--It],Rt[It]=null,mn=Rt[--It],Rt[It]=null,pn=Rt[--It],Rt[It]=null}var xt=null,bt=null,xe=!1,Wt=null;function Dh(e,t){var n=zt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Pf(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xt=e,bt=Dn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xt=e,bt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=ur!==null?{id:pn,overflow:mn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=zt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,xt=e,bt=null,!0):!1;default:return!1}}function Su(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Cu(e){if(xe){var t=bt;if(t){var n=t;if(!Pf(e,t)){if(Su(e))throw Error(F(418));t=Dn(n.nextSibling);var r=xt;t&&Pf(e,t)?Dh(r,n):(e.flags=e.flags&-4097|2,xe=!1,xt=e)}}else{if(Su(e))throw Error(F(418));e.flags=e.flags&-4097|2,xe=!1,xt=e}}}function _f(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xt=e}function Vi(e){if(e!==xt)return!1;if(!xe)return _f(e),xe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wu(e.type,e.memoizedProps)),t&&(t=bt)){if(Su(e))throw jh(),Error(F(418));for(;t;)Dh(e,t),t=Dn(t.nextSibling)}if(_f(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(F(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){bt=Dn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}bt=null}}else bt=xt?Dn(e.stateNode.nextSibling):null;return!0}function jh(){for(var e=bt;e;)e=Dn(e.nextSibling)}function Qr(){bt=xt=null,xe=!1}function Lc(e){Wt===null?Wt=[e]:Wt.push(e)}var jk=vn.ReactCurrentBatchConfig;function Ht(e,t){if(e&&e.defaultProps){t=Ee({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var jl=qn(null),$l=null,Lr=null,zc=null;function Mc(){zc=Lr=$l=null}function Fc(e){var t=jl.current;ye(jl),e._currentValue=t}function Eu(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function $r(e,t){$l=e,zc=Lr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ut=!0),e.firstContext=null)}function Ft(e){var t=e._currentValue;if(zc!==e)if(e={context:e,memoizedValue:t,next:null},Lr===null){if($l===null)throw Error(F(308));Lr=e,$l.dependencies={lanes:0,firstContext:e}}else Lr=Lr.next=e;return t}var or=null;function Nc(e){or===null?or=[e]:or.push(e)}function $h(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Nc(t)):(n.next=o.next,o.next=n),t.interleaved=n,wn(e,r)}function wn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var _n=!1;function Dc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function jn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,oe&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,wn(e,n)}return o=r.interleaved,o===null?(t.next=t,Nc(r)):(t.next=o.next,o.next=t),r.interleaved=t,wn(e,n)}function fl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Sc(e,n)}}function Rf(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Bl(e,t,n,r){var o=e.updateQueue;_n=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var s=a,u=s.next;s.next=null,l===null?i=u:l.next=u,l=s;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==l&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=s))}if(i!==null){var c=o.baseState;l=0,d=u=s=null,a=i;do{var f=a.lane,p=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=e,y=a;switch(f=t,p=n,y.tag){case 1:if(m=y.payload,typeof m=="function"){c=m.call(p,c,f);break e}c=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=y.payload,f=typeof m=="function"?m.call(p,c,f):m,f==null)break e;c=Ee({},c,f);break e;case 2:_n=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=p,s=c):d=d.next=p,l|=f;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;f=a,a=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(d===null&&(s=c),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);dr|=l,e.lanes=l,e.memoizedState=c}}function If(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(F(191,o));o.call(r)}}}var Uh=new $m.Component().refs;function Tu(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ha={isMounted:function(e){return(e=e._reactInternals)?hr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),fl(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),fl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=nt(),r=Bn(e),o=gn(n,r);o.tag=2,t!=null&&(o.callback=t),t=jn(e,o,r),t!==null&&(qt(t,e,r,n),fl(t,e,r))}};function Of(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!Ko(n,r)||!Ko(o,i):!0}function Hh(e,t,n){var r=!1,o=Wn,i=t.contextType;return typeof i=="object"&&i!==null?i=Ft(i):(o=dt(t)?sr:Je.current,r=t.contextTypes,i=(r=r!=null)?Kr(e,o):Wn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ha,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Af(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ha.enqueueReplaceState(t,t.state,null)}function Pu(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=Uh,Dc(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Ft(i):(i=dt(t)?sr:Je.current,o.context=Kr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Tu(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&ha.enqueueReplaceState(o,o.state,null),Bl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function ho(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var a=o.refs;a===Uh&&(a=o.refs={}),l===null?delete a[i]:a[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,e))}return e}function Wi(e,t){throw e=Object.prototype.toString.call(t),Error(F(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Lf(e){var t=e._init;return t(e._payload)}function Vh(e){function t(g,h){if(e){var k=g.deletions;k===null?(g.deletions=[h],g.flags|=16):k.push(h)}}function n(g,h){if(!e)return null;for(;h!==null;)t(g,h),h=h.sibling;return null}function r(g,h){for(g=new Map;h!==null;)h.key!==null?g.set(h.key,h):g.set(h.index,h),h=h.sibling;return g}function o(g,h){return g=Un(g,h),g.index=0,g.sibling=null,g}function i(g,h,k){return g.index=k,e?(k=g.alternate,k!==null?(k=k.index,k<h?(g.flags|=2,h):k):(g.flags|=2,h)):(g.flags|=1048576,h)}function l(g){return e&&g.alternate===null&&(g.flags|=2),g}function a(g,h,k,C){return h===null||h.tag!==6?(h=xs(k,g.mode,C),h.return=g,h):(h=o(h,k),h.return=g,h)}function s(g,h,k,C){var T=k.type;return T===Er?d(g,h,k.props.children,C,k.key):h!==null&&(h.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Lf(T)===h.type)?(C=o(h,k.props),C.ref=ho(g,h,k),C.return=g,C):(C=kl(k.type,k.key,k.props,null,g.mode,C),C.ref=ho(g,h,k),C.return=g,C)}function u(g,h,k,C){return h===null||h.tag!==4||h.stateNode.containerInfo!==k.containerInfo||h.stateNode.implementation!==k.implementation?(h=vs(k,g.mode,C),h.return=g,h):(h=o(h,k.children||[]),h.return=g,h)}function d(g,h,k,C,T){return h===null||h.tag!==7?(h=ar(k,g.mode,C,T),h.return=g,h):(h=o(h,k),h.return=g,h)}function c(g,h,k){if(typeof h=="string"&&h!==""||typeof h=="number")return h=xs(""+h,g.mode,k),h.return=g,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case zi:return k=kl(h.type,h.key,h.props,null,g.mode,k),k.ref=ho(g,null,h),k.return=g,k;case Cr:return h=vs(h,g.mode,k),h.return=g,h;case Pn:var C=h._init;return c(g,C(h._payload),k)}if(vo(h)||uo(h))return h=ar(h,g.mode,k,null),h.return=g,h;Wi(g,h)}return null}function f(g,h,k,C){var T=h!==null?h.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return T!==null?null:a(g,h,""+k,C);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case zi:return k.key===T?s(g,h,k,C):null;case Cr:return k.key===T?u(g,h,k,C):null;case Pn:return T=k._init,f(g,h,T(k._payload),C)}if(vo(k)||uo(k))return T!==null?null:d(g,h,k,C,null);Wi(g,k)}return null}function p(g,h,k,C,T){if(typeof C=="string"&&C!==""||typeof C=="number")return g=g.get(k)||null,a(h,g,""+C,T);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case zi:return g=g.get(C.key===null?k:C.key)||null,s(h,g,C,T);case Cr:return g=g.get(C.key===null?k:C.key)||null,u(h,g,C,T);case Pn:var v=C._init;return p(g,h,k,v(C._payload),T)}if(vo(C)||uo(C))return g=g.get(k)||null,d(h,g,C,T,null);Wi(h,C)}return null}function m(g,h,k,C){for(var T=null,v=null,E=h,P=h=0,M=null;E!==null&&P<k.length;P++){E.index>P?(M=E,E=null):M=E.sibling;var w=f(g,E,k[P],C);if(w===null){E===null&&(E=M);break}e&&E&&w.alternate===null&&t(g,E),h=i(w,h,P),v===null?T=w:v.sibling=w,v=w,E=M}if(P===k.length)return n(g,E),xe&&Zn(g,P),T;if(E===null){for(;P<k.length;P++)E=c(g,k[P],C),E!==null&&(h=i(E,h,P),v===null?T=E:v.sibling=E,v=E);return xe&&Zn(g,P),T}for(E=r(g,E);P<k.length;P++)M=p(E,g,P,k[P],C),M!==null&&(e&&M.alternate!==null&&E.delete(M.key===null?P:M.key),h=i(M,h,P),v===null?T=M:v.sibling=M,v=M);return e&&E.forEach(function(I){return t(g,I)}),xe&&Zn(g,P),T}function y(g,h,k,C){var T=uo(k);if(typeof T!="function")throw Error(F(150));if(k=T.call(k),k==null)throw Error(F(151));for(var v=T=null,E=h,P=h=0,M=null,w=k.next();E!==null&&!w.done;P++,w=k.next()){E.index>P?(M=E,E=null):M=E.sibling;var I=f(g,E,w.value,C);if(I===null){E===null&&(E=M);break}e&&E&&I.alternate===null&&t(g,E),h=i(I,h,P),v===null?T=I:v.sibling=I,v=I,E=M}if(w.done)return n(g,E),xe&&Zn(g,P),T;if(E===null){for(;!w.done;P++,w=k.next())w=c(g,w.value,C),w!==null&&(h=i(w,h,P),v===null?T=w:v.sibling=w,v=w);return xe&&Zn(g,P),T}for(E=r(g,E);!w.done;P++,w=k.next())w=p(E,g,P,w.value,C),w!==null&&(e&&w.alternate!==null&&E.delete(w.key===null?P:w.key),h=i(w,h,P),v===null?T=w:v.sibling=w,v=w);return e&&E.forEach(function(L){return t(g,L)}),xe&&Zn(g,P),T}function S(g,h,k,C){if(typeof k=="object"&&k!==null&&k.type===Er&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case zi:e:{for(var T=k.key,v=h;v!==null;){if(v.key===T){if(T=k.type,T===Er){if(v.tag===7){n(g,v.sibling),h=o(v,k.props.children),h.return=g,g=h;break e}}else if(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Lf(T)===v.type){n(g,v.sibling),h=o(v,k.props),h.ref=ho(g,v,k),h.return=g,g=h;break e}n(g,v);break}else t(g,v);v=v.sibling}k.type===Er?(h=ar(k.props.children,g.mode,C,k.key),h.return=g,g=h):(C=kl(k.type,k.key,k.props,null,g.mode,C),C.ref=ho(g,h,k),C.return=g,g=C)}return l(g);case Cr:e:{for(v=k.key;h!==null;){if(h.key===v)if(h.tag===4&&h.stateNode.containerInfo===k.containerInfo&&h.stateNode.implementation===k.implementation){n(g,h.sibling),h=o(h,k.children||[]),h.return=g,g=h;break e}else{n(g,h);break}else t(g,h);h=h.sibling}h=vs(k,g.mode,C),h.return=g,g=h}return l(g);case Pn:return v=k._init,S(g,h,v(k._payload),C)}if(vo(k))return m(g,h,k,C);if(uo(k))return y(g,h,k,C);Wi(g,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,h!==null&&h.tag===6?(n(g,h.sibling),h=o(h,k),h.return=g,g=h):(n(g,h),h=xs(k,g.mode,C),h.return=g,g=h),l(g)):n(g,h)}return S}var qr=Vh(!0),Wh=Vh(!1),vi={},on=qn(vi),Yo=qn(vi),Xo=qn(vi);function ir(e){if(e===vi)throw Error(F(174));return e}function jc(e,t){switch(he(Xo,t),he(Yo,e),he(on,vi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:iu(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=iu(t,e)}ye(on),he(on,t)}function Gr(){ye(on),ye(Yo),ye(Xo)}function Kh(e){ir(Xo.current);var t=ir(on.current),n=iu(t,e.type);t!==n&&(he(Yo,e),he(on,n))}function $c(e){Yo.current===e&&(ye(on),ye(Yo))}var Se=qn(0);function Ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var hs=[];function Bc(){for(var e=0;e<hs.length;e++)hs[e]._workInProgressVersionPrimary=null;hs.length=0}var pl=vn.ReactCurrentDispatcher,gs=vn.ReactCurrentBatchConfig,cr=0,Ce=null,Fe=null,je=null,Hl=!1,Io=!1,Jo=0,$k=0;function Qe(){throw Error(F(321))}function Uc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yt(e[n],t[n]))return!1;return!0}function Hc(e,t,n,r,o,i){if(cr=i,Ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,pl.current=e===null||e.memoizedState===null?Vk:Wk,e=n(r,o),Io){i=0;do{if(Io=!1,Jo=0,25<=i)throw Error(F(301));i+=1,je=Fe=null,t.updateQueue=null,pl.current=Kk,e=n(r,o)}while(Io)}if(pl.current=Vl,t=Fe!==null&&Fe.next!==null,cr=0,je=Fe=Ce=null,Hl=!1,t)throw Error(F(300));return e}function Vc(){var e=Jo!==0;return Jo=0,e}function Jt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return je===null?Ce.memoizedState=je=e:je=je.next=e,je}function Nt(){if(Fe===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=Fe.next;var t=je===null?Ce.memoizedState:je.next;if(t!==null)je=t,Fe=e;else{if(e===null)throw Error(F(310));Fe=e,e={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},je===null?Ce.memoizedState=je=e:je=je.next=e}return je}function Zo(e,t){return typeof t=="function"?t(e):t}function ys(e){var t=Nt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=Fe,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var a=l=null,s=null,u=i;do{var d=u.lane;if((cr&d)===d)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(a=s=c,l=r):s=s.next=c,Ce.lanes|=d,dr|=d}u=u.next}while(u!==null&&u!==i);s===null?l=r:s.next=a,Yt(r,t.memoizedState)||(ut=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Ce.lanes|=i,dr|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ks(e){var t=Nt(),n=t.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);Yt(i,t.memoizedState)||(ut=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Qh(){}function qh(e,t){var n=Ce,r=Nt(),o=t(),i=!Yt(r.memoizedState,o);if(i&&(r.memoizedState=o,ut=!0),r=r.queue,Wc(Xh.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||je!==null&&je.memoizedState.tag&1){if(n.flags|=2048,ei(9,Yh.bind(null,n,r,o,t),void 0,null),$e===null)throw Error(F(349));cr&30||Gh(n,t,o)}return o}function Gh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Yh(e,t,n,r){t.value=n,t.getSnapshot=r,Jh(t)&&Zh(e)}function Xh(e,t,n){return n(function(){Jh(t)&&Zh(e)})}function Jh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yt(e,n)}catch{return!0}}function Zh(e){var t=wn(e,1);t!==null&&qt(t,e,1,-1)}function zf(e){var t=Jt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:e},t.queue=e,e=e.dispatch=Hk.bind(null,Ce,e),[t.memoizedState,e]}function ei(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function eg(){return Nt().memoizedState}function ml(e,t,n,r){var o=Jt();Ce.flags|=e,o.memoizedState=ei(1|t,n,void 0,r===void 0?null:r)}function ga(e,t,n,r){var o=Nt();r=r===void 0?null:r;var i=void 0;if(Fe!==null){var l=Fe.memoizedState;if(i=l.destroy,r!==null&&Uc(r,l.deps)){o.memoizedState=ei(t,n,i,r);return}}Ce.flags|=e,o.memoizedState=ei(1|t,n,i,r)}function Mf(e,t){return ml(8390656,8,e,t)}function Wc(e,t){return ga(2048,8,e,t)}function tg(e,t){return ga(4,2,e,t)}function ng(e,t){return ga(4,4,e,t)}function rg(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function og(e,t,n){return n=n!=null?n.concat([e]):null,ga(4,4,rg.bind(null,t,e),n)}function Kc(){}function ig(e,t){var n=Nt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Uc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function lg(e,t){var n=Nt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Uc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ag(e,t,n){return cr&21?(Yt(n,t)||(n=ch(),Ce.lanes|=n,dr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ut=!0),e.memoizedState=n)}function Bk(e,t){var n=se;se=n!==0&&4>n?n:4,e(!0);var r=gs.transition;gs.transition={};try{e(!1),t()}finally{se=n,gs.transition=r}}function sg(){return Nt().memoizedState}function Uk(e,t,n){var r=Bn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ug(e))cg(t,n);else if(n=$h(e,t,n,r),n!==null){var o=nt();qt(n,e,r,o),dg(n,t,r)}}function Hk(e,t,n){var r=Bn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ug(e))cg(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,a=i(l,n);if(o.hasEagerState=!0,o.eagerState=a,Yt(a,l)){var s=t.interleaved;s===null?(o.next=o,Nc(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=$h(e,t,o,r),n!==null&&(o=nt(),qt(n,e,r,o),dg(n,t,r))}}function ug(e){var t=e.alternate;return e===Ce||t!==null&&t===Ce}function cg(e,t){Io=Hl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dg(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Sc(e,n)}}var Vl={readContext:Ft,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},Vk={readContext:Ft,useCallback:function(e,t){return Jt().memoizedState=[e,t===void 0?null:t],e},useContext:Ft,useEffect:Mf,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ml(4194308,4,rg.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ml(4194308,4,e,t)},useInsertionEffect:function(e,t){return ml(4,2,e,t)},useMemo:function(e,t){var n=Jt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Jt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Uk.bind(null,Ce,e),[r.memoizedState,e]},useRef:function(e){var t=Jt();return e={current:e},t.memoizedState=e},useState:zf,useDebugValue:Kc,useDeferredValue:function(e){return Jt().memoizedState=e},useTransition:function(){var e=zf(!1),t=e[0];return e=Bk.bind(null,e[1]),Jt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ce,o=Jt();if(xe){if(n===void 0)throw Error(F(407));n=n()}else{if(n=t(),$e===null)throw Error(F(349));cr&30||Gh(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Mf(Xh.bind(null,r,i,e),[e]),r.flags|=2048,ei(9,Yh.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Jt(),t=$e.identifierPrefix;if(xe){var n=mn,r=pn;n=(r&~(1<<32-Qt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Jo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=$k++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Wk={readContext:Ft,useCallback:ig,useContext:Ft,useEffect:Wc,useImperativeHandle:og,useInsertionEffect:tg,useLayoutEffect:ng,useMemo:lg,useReducer:ys,useRef:eg,useState:function(){return ys(Zo)},useDebugValue:Kc,useDeferredValue:function(e){var t=Nt();return ag(t,Fe.memoizedState,e)},useTransition:function(){var e=ys(Zo)[0],t=Nt().memoizedState;return[e,t]},useMutableSource:Qh,useSyncExternalStore:qh,useId:sg,unstable_isNewReconciler:!1},Kk={readContext:Ft,useCallback:ig,useContext:Ft,useEffect:Wc,useImperativeHandle:og,useInsertionEffect:tg,useLayoutEffect:ng,useMemo:lg,useReducer:ks,useRef:eg,useState:function(){return ks(Zo)},useDebugValue:Kc,useDeferredValue:function(e){var t=Nt();return Fe===null?t.memoizedState=e:ag(t,Fe.memoizedState,e)},useTransition:function(){var e=ks(Zo)[0],t=Nt().memoizedState;return[e,t]},useMutableSource:Qh,useSyncExternalStore:qh,useId:sg,unstable_isNewReconciler:!1};function Yr(e,t){try{var n="",r=t;do n+=b1(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function ws(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function _u(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Qk=typeof WeakMap=="function"?WeakMap:Map;function fg(e,t,n){n=gn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Kl||(Kl=!0,Du=r),_u(e,t)},n}function pg(e,t,n){n=gn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){_u(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){_u(e,t),typeof r!="function"&&($n===null?$n=new Set([this]):$n.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Ff(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qk;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=aw.bind(null,e,t,n),t.then(e,e))}function Nf(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Df(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gn(-1,1),t.tag=2,jn(n,t,1))),n.lanes|=1),e)}var qk=vn.ReactCurrentOwner,ut=!1;function et(e,t,n,r){t.child=e===null?Wh(t,null,n,r):qr(t,e.child,n,r)}function jf(e,t,n,r,o){n=n.render;var i=t.ref;return $r(t,o),r=Hc(e,t,n,r,i,o),n=Vc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(xe&&n&&Oc(t),t.flags|=1,et(e,t,r,o),t.child)}function $f(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!ed(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,mg(e,t,i,r,o)):(e=kl(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ko,n(l,r)&&e.ref===t.ref)return bn(e,t,o)}return t.flags|=1,e=Un(i,r),e.ref=t.ref,e.return=t,t.child=e}function mg(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Ko(i,r)&&e.ref===t.ref)if(ut=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(ut=!0);else return t.lanes=e.lanes,bn(e,t,o)}return Ru(e,t,n,r,o)}function hg(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(Mr,kt),kt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,he(Mr,kt),kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,he(Mr,kt),kt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,he(Mr,kt),kt|=r;return et(e,t,o,n),t.child}function gg(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ru(e,t,n,r,o){var i=dt(n)?sr:Je.current;return i=Kr(t,i),$r(t,o),n=Hc(e,t,n,r,i,o),r=Vc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(xe&&r&&Oc(t),t.flags|=1,et(e,t,n,o),t.child)}function Bf(e,t,n,r,o){if(dt(n)){var i=!0;Fl(t)}else i=!1;if($r(t,o),t.stateNode===null)hl(e,t),Hh(t,n,r),Pu(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,a=t.memoizedProps;l.props=a;var s=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ft(u):(u=dt(n)?sr:Je.current,u=Kr(t,u));var d=n.getDerivedStateFromProps,c=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function";c||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==r||s!==u)&&Af(t,l,r,u),_n=!1;var f=t.memoizedState;l.state=f,Bl(t,r,l,o),s=t.memoizedState,a!==r||f!==s||ct.current||_n?(typeof d=="function"&&(Tu(t,n,d,r),s=t.memoizedState),(a=_n||Of(t,n,a,r,f,s,u))?(c||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=a):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Bh(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:Ht(t.type,a),l.props=u,c=t.pendingProps,f=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=Ft(s):(s=dt(n)?sr:Je.current,s=Kr(t,s));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==c||f!==s)&&Af(t,l,r,s),_n=!1,f=t.memoizedState,l.state=f,Bl(t,r,l,o);var m=t.memoizedState;a!==c||f!==m||ct.current||_n?(typeof p=="function"&&(Tu(t,n,p,r),m=t.memoizedState),(u=_n||Of(t,n,u,r,f,m,s)||!1)?(d||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,m,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,m,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),l.props=r,l.state=m,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Iu(e,t,n,r,i,o)}function Iu(e,t,n,r,o,i){gg(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&Tf(t,n,!1),bn(e,t,i);r=t.stateNode,qk.current=t;var a=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=qr(t,e.child,null,i),t.child=qr(t,null,a,i)):et(e,t,a,i),t.memoizedState=r.state,o&&Tf(t,n,!0),t.child}function yg(e){var t=e.stateNode;t.pendingContext?Ef(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ef(e,t.context,!1),jc(e,t.containerInfo)}function Uf(e,t,n,r,o){return Qr(),Lc(o),t.flags|=256,et(e,t,n,r),t.child}var Ou={dehydrated:null,treeContext:null,retryLane:0};function Au(e){return{baseLanes:e,cachePool:null,transitions:null}}function kg(e,t,n){var r=t.pendingProps,o=Se.current,i=!1,l=(t.flags&128)!==0,a;if((a=l)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),he(Se,o&1),e===null)return Cu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=wa(l,r,0,null),e=ar(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Au(n),t.memoizedState=Ou,e):Qc(t,l));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return Gk(e,t,l,r,a,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,a=o.sibling;var s={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Un(o,s),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?i=Un(a,i):(i=ar(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?Au(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Ou,r}return i=e.child,e=i.sibling,r=Un(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Qc(e,t){return t=wa({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ki(e,t,n,r){return r!==null&&Lc(r),qr(t,e.child,null,n),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Gk(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=ws(Error(F(422))),Ki(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=wa({mode:"visible",children:r.children},o,0,null),i=ar(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&qr(t,e.child,null,l),t.child.memoizedState=Au(l),t.memoizedState=Ou,i);if(!(t.mode&1))return Ki(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(F(419)),r=ws(i,r,void 0),Ki(e,t,l,r)}if(a=(l&e.childLanes)!==0,ut||a){if(r=$e,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,wn(e,o),qt(r,e,o,-1))}return Zc(),r=ws(Error(F(421))),Ki(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=sw.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,bt=Dn(o.nextSibling),xt=t,xe=!0,Wt=null,e!==null&&(Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=ur,pn=e.id,mn=e.overflow,ur=t),t=Qc(t,r.children),t.flags|=4096,t)}function Hf(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Eu(e.return,t,n)}function bs(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function wg(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(et(e,t,r.children,n),r=Se.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Hf(e,n,t);else if(e.tag===19)Hf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(he(Se,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Ul(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),bs(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Ul(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}bs(t,!0,n,null,i);break;case"together":bs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function hl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function bn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(F(153));if(t.child!==null){for(e=t.child,n=Un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Yk(e,t,n){switch(t.tag){case 3:yg(t),Qr();break;case 5:Kh(t);break;case 1:dt(t.type)&&Fl(t);break;case 4:jc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;he(jl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(he(Se,Se.current&1),t.flags|=128,null):n&t.child.childLanes?kg(e,t,n):(he(Se,Se.current&1),e=bn(e,t,n),e!==null?e.sibling:null);he(Se,Se.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return wg(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),he(Se,Se.current),r)break;return null;case 22:case 23:return t.lanes=0,hg(e,t,n)}return bn(e,t,n)}var bg,Lu,xg,vg;bg=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lu=function(){};xg=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,ir(on.current);var i=null;switch(n){case"input":o=tu(e,o),r=tu(e,r),i=[];break;case"select":o=Ee({},o,{value:void 0}),r=Ee({},r,{value:void 0}),i=[];break;case"textarea":o=ou(e,o),r=ou(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=zl)}lu(n,r);var l;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var a=o[u];for(l in a)a.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(jo.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var s=r[u];if(a=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==a&&(s!=null||a!=null))if(u==="style")if(a){for(l in a)!a.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&a[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(i||(i=[]),i.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(jo.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&ge("scroll",e),i||a===s||(i=[])):(i=i||[]).push(u,s))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};vg=function(e,t,n,r){n!==r&&(t.flags|=4)};function go(e,t){if(!xe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Xk(e,t,n){var r=t.pendingProps;switch(Ac(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(t),null;case 1:return dt(t.type)&&Ml(),qe(t),null;case 3:return r=t.stateNode,Gr(),ye(ct),ye(Je),Bc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Vi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Wt!==null&&(Bu(Wt),Wt=null))),Lu(e,t),qe(t),null;case 5:$c(t);var o=ir(Xo.current);if(n=t.type,e!==null&&t.stateNode!=null)xg(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(F(166));return qe(t),null}if(e=ir(on.current),Vi(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[nn]=t,r[Go]=i,e=(t.mode&1)!==0,n){case"dialog":ge("cancel",r),ge("close",r);break;case"iframe":case"object":case"embed":ge("load",r);break;case"video":case"audio":for(o=0;o<Co.length;o++)ge(Co[o],r);break;case"source":ge("error",r);break;case"img":case"image":case"link":ge("error",r),ge("load",r);break;case"details":ge("toggle",r);break;case"input":Xd(r,i),ge("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ge("invalid",r);break;case"textarea":Zd(r,i),ge("invalid",r)}lu(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var a=i[l];l==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Hi(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Hi(r.textContent,a,e),o=["children",""+a]):jo.hasOwnProperty(l)&&a!=null&&l==="onScroll"&&ge("scroll",r)}switch(n){case"input":Mi(r),Jd(r,i,!0);break;case"textarea":Mi(r),ef(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=zl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Gm(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[nn]=t,e[Go]=r,bg(e,t,!1,!1),t.stateNode=e;e:{switch(l=au(n,r),n){case"dialog":ge("cancel",e),ge("close",e),o=r;break;case"iframe":case"object":case"embed":ge("load",e),o=r;break;case"video":case"audio":for(o=0;o<Co.length;o++)ge(Co[o],e);o=r;break;case"source":ge("error",e),o=r;break;case"img":case"image":case"link":ge("error",e),ge("load",e),o=r;break;case"details":ge("toggle",e),o=r;break;case"input":Xd(e,r),o=tu(e,r),ge("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Ee({},r,{value:void 0}),ge("invalid",e);break;case"textarea":Zd(e,r),o=ou(e,r),ge("invalid",e);break;default:o=r}lu(n,o),a=o;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?Jm(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Ym(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&$o(e,s):typeof s=="number"&&$o(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(jo.hasOwnProperty(i)?s!=null&&i==="onScroll"&&ge("scroll",e):s!=null&&yc(e,i,s,l))}switch(n){case"input":Mi(e),Jd(e,r,!1);break;case"textarea":Mi(e),ef(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Fr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Fr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=zl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return qe(t),null;case 6:if(e&&t.stateNode!=null)vg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(F(166));if(n=ir(Xo.current),ir(on.current),Vi(t)){if(r=t.stateNode,n=t.memoizedProps,r[nn]=t,(i=r.nodeValue!==n)&&(e=xt,e!==null))switch(e.tag){case 3:Hi(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Hi(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nn]=t,t.stateNode=r}return qe(t),null;case 13:if(ye(Se),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(xe&&bt!==null&&t.mode&1&&!(t.flags&128))jh(),Qr(),t.flags|=98560,i=!1;else if(i=Vi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(F(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[nn]=t}else Qr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;qe(t),i=!1}else Wt!==null&&(Bu(Wt),Wt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Se.current&1?Ne===0&&(Ne=3):Zc())),t.updateQueue!==null&&(t.flags|=4),qe(t),null);case 4:return Gr(),Lu(e,t),e===null&&Qo(t.stateNode.containerInfo),qe(t),null;case 10:return Fc(t.type._context),qe(t),null;case 17:return dt(t.type)&&Ml(),qe(t),null;case 19:if(ye(Se),i=t.memoizedState,i===null)return qe(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)go(i,!1);else{if(Ne!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Ul(e),l!==null){for(t.flags|=128,go(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return he(Se,Se.current&1|2),t.child}e=e.sibling}i.tail!==null&&Re()>Xr&&(t.flags|=128,r=!0,go(i,!1),t.lanes=4194304)}else{if(!r)if(e=Ul(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),go(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!xe)return qe(t),null}else 2*Re()-i.renderingStartTime>Xr&&n!==1073741824&&(t.flags|=128,r=!0,go(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Re(),t.sibling=null,n=Se.current,he(Se,r?n&1|2:n&1),t):(qe(t),null);case 22:case 23:return Jc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?kt&1073741824&&(qe(t),t.subtreeFlags&6&&(t.flags|=8192)):qe(t),null;case 24:return null;case 25:return null}throw Error(F(156,t.tag))}function Jk(e,t){switch(Ac(t),t.tag){case 1:return dt(t.type)&&Ml(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gr(),ye(ct),ye(Je),Bc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return $c(t),null;case 13:if(ye(Se),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(F(340));Qr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ye(Se),null;case 4:return Gr(),null;case 10:return Fc(t.type._context),null;case 22:case 23:return Jc(),null;case 24:return null;default:return null}}var Qi=!1,Ye=!1,Zk=typeof WeakSet=="function"?WeakSet:Set,U=null;function zr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){_e(e,t,r)}else n.current=null}function zu(e,t,n){try{n()}catch(r){_e(e,t,r)}}var Vf=!1;function ew(e,t){if(yu=Ol,e=Th(),Ic(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,a=-1,s=-1,u=0,d=0,c=e,f=null;t:for(;;){for(var p;c!==n||o!==0&&c.nodeType!==3||(a=l+o),c!==i||r!==0&&c.nodeType!==3||(s=l+r),c.nodeType===3&&(l+=c.nodeValue.length),(p=c.firstChild)!==null;)f=c,c=p;for(;;){if(c===e)break t;if(f===n&&++u===o&&(a=l),f===i&&++d===r&&(s=l),(p=c.nextSibling)!==null)break;c=f,f=c.parentNode}c=p}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ku={focusedElem:e,selectionRange:n},Ol=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var y=m.memoizedProps,S=m.memoizedState,g=t.stateNode,h=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:Ht(t.type,y),S);g.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var k=t.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(C){_e(t,t.return,C)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return m=Vf,Vf=!1,m}function Oo(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&zu(t,n,i)}o=o.next}while(o!==r)}}function ya(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Mu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Sg(e){var t=e.alternate;t!==null&&(e.alternate=null,Sg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nn],delete t[Go],delete t[xu],delete t[Fk],delete t[Nk])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Cg(e){return e.tag===5||e.tag===3||e.tag===4}function Wf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=zl));else if(r!==4&&(e=e.child,e!==null))for(Fu(e,t,n),e=e.sibling;e!==null;)Fu(e,t,n),e=e.sibling}function Nu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Nu(e,t,n),e=e.sibling;e!==null;)Nu(e,t,n),e=e.sibling}var He=null,Vt=!1;function En(e,t,n){for(n=n.child;n!==null;)Eg(e,t,n),n=n.sibling}function Eg(e,t,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(ua,n)}catch{}switch(n.tag){case 5:Ye||zr(n,t);case 6:var r=He,o=Vt;He=null,En(e,t,n),He=r,Vt=o,He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):He.removeChild(n.stateNode));break;case 18:He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?ps(e.parentNode,n):e.nodeType===1&&ps(e,n),Vo(e)):ps(He,n.stateNode));break;case 4:r=He,o=Vt,He=n.stateNode.containerInfo,Vt=!0,En(e,t,n),He=r,Vt=o;break;case 0:case 11:case 14:case 15:if(!Ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&zu(n,t,l),o=o.next}while(o!==r)}En(e,t,n);break;case 1:if(!Ye&&(zr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){_e(n,t,a)}En(e,t,n);break;case 21:En(e,t,n);break;case 22:n.mode&1?(Ye=(r=Ye)||n.memoizedState!==null,En(e,t,n),Ye=r):En(e,t,n);break;default:En(e,t,n)}}function Kf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Zk),t.forEach(function(r){var o=uw.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ut(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,a=l;e:for(;a!==null;){switch(a.tag){case 5:He=a.stateNode,Vt=!1;break e;case 3:He=a.stateNode.containerInfo,Vt=!0;break e;case 4:He=a.stateNode.containerInfo,Vt=!0;break e}a=a.return}if(He===null)throw Error(F(160));Eg(i,l,o),He=null,Vt=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){_e(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Tg(t,e),t=t.sibling}function Tg(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ut(t,e),Xt(e),r&4){try{Oo(3,e,e.return),ya(3,e)}catch(y){_e(e,e.return,y)}try{Oo(5,e,e.return)}catch(y){_e(e,e.return,y)}}break;case 1:Ut(t,e),Xt(e),r&512&&n!==null&&zr(n,n.return);break;case 5:if(Ut(t,e),Xt(e),r&512&&n!==null&&zr(n,n.return),e.flags&32){var o=e.stateNode;try{$o(o,"")}catch(y){_e(e,e.return,y)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&Qm(o,i),au(a,l);var u=au(a,i);for(l=0;l<s.length;l+=2){var d=s[l],c=s[l+1];d==="style"?Jm(o,c):d==="dangerouslySetInnerHTML"?Ym(o,c):d==="children"?$o(o,c):yc(o,d,c,u)}switch(a){case"input":nu(o,i);break;case"textarea":qm(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var p=i.value;p!=null?Fr(o,!!i.multiple,p,!1):f!==!!i.multiple&&(i.defaultValue!=null?Fr(o,!!i.multiple,i.defaultValue,!0):Fr(o,!!i.multiple,i.multiple?[]:"",!1))}o[Go]=i}catch(y){_e(e,e.return,y)}}break;case 6:if(Ut(t,e),Xt(e),r&4){if(e.stateNode===null)throw Error(F(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(y){_e(e,e.return,y)}}break;case 3:if(Ut(t,e),Xt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vo(t.containerInfo)}catch(y){_e(e,e.return,y)}break;case 4:Ut(t,e),Xt(e);break;case 13:Ut(t,e),Xt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Yc=Re())),r&4&&Kf(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Ye=(u=Ye)||d,Ut(t,e),Ye=u):Ut(t,e),Xt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(U=e,d=e.child;d!==null;){for(c=U=d;U!==null;){switch(f=U,p=f.child,f.tag){case 0:case 11:case 14:case 15:Oo(4,f,f.return);break;case 1:zr(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(y){_e(r,n,y)}}break;case 5:zr(f,f.return);break;case 22:if(f.memoizedState!==null){qf(c);continue}}p!==null?(p.return=f,U=p):qf(c)}d=d.sibling}e:for(d=null,c=e;;){if(c.tag===5){if(d===null){d=c;try{o=c.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=c.stateNode,s=c.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=Xm("display",l))}catch(y){_e(e,e.return,y)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(y){_e(e,e.return,y)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===e)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break e;for(;c.sibling===null;){if(c.return===null||c.return===e)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:Ut(t,e),Xt(e),r&4&&Kf(e);break;case 21:break;default:Ut(t,e),Xt(e)}}function Xt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Cg(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&($o(o,""),r.flags&=-33);var i=Wf(e);Nu(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,a=Wf(e);Fu(e,a,l);break;default:throw Error(F(161))}}catch(s){_e(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function tw(e,t,n){U=e,Pg(e)}function Pg(e,t,n){for(var r=(e.mode&1)!==0;U!==null;){var o=U,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Qi;if(!l){var a=o.alternate,s=a!==null&&a.memoizedState!==null||Ye;a=Qi;var u=Ye;if(Qi=l,(Ye=s)&&!u)for(U=o;U!==null;)l=U,s=l.child,l.tag===22&&l.memoizedState!==null?Gf(o):s!==null?(s.return=l,U=s):Gf(o);for(;i!==null;)U=i,Pg(i),i=i.sibling;U=o,Qi=a,Ye=u}Qf(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,U=i):Qf(e)}}function Qf(e){for(;U!==null;){var t=U;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ye||ya(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ye)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Ht(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&If(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}If(t,l,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&Vo(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}Ye||t.flags&512&&Mu(t)}catch(f){_e(t,t.return,f)}}if(t===e){U=null;break}if(n=t.sibling,n!==null){n.return=t.return,U=n;break}U=t.return}}function qf(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var n=t.sibling;if(n!==null){n.return=t.return,U=n;break}U=t.return}}function Gf(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ya(4,t)}catch(s){_e(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){_e(t,o,s)}}var i=t.return;try{Mu(t)}catch(s){_e(t,i,s)}break;case 5:var l=t.return;try{Mu(t)}catch(s){_e(t,l,s)}}}catch(s){_e(t,t.return,s)}if(t===e){U=null;break}var a=t.sibling;if(a!==null){a.return=t.return,U=a;break}U=t.return}}var nw=Math.ceil,Wl=vn.ReactCurrentDispatcher,qc=vn.ReactCurrentOwner,Mt=vn.ReactCurrentBatchConfig,oe=0,$e=null,ze=null,We=0,kt=0,Mr=qn(0),Ne=0,ti=null,dr=0,ka=0,Gc=0,Ao=null,st=null,Yc=0,Xr=1/0,cn=null,Kl=!1,Du=null,$n=null,qi=!1,Ln=null,Ql=0,Lo=0,ju=null,gl=-1,yl=0;function nt(){return oe&6?Re():gl!==-1?gl:gl=Re()}function Bn(e){return e.mode&1?oe&2&&We!==0?We&-We:jk.transition!==null?(yl===0&&(yl=ch()),yl):(e=se,e!==0||(e=window.event,e=e===void 0?16:yh(e.type)),e):1}function qt(e,t,n,r){if(50<Lo)throw Lo=0,ju=null,Error(F(185));wi(e,n,r),(!(oe&2)||e!==$e)&&(e===$e&&(!(oe&2)&&(ka|=n),Ne===4&&In(e,We)),ft(e,r),n===1&&oe===0&&!(t.mode&1)&&(Xr=Re()+500,ma&&Gn()))}function ft(e,t){var n=e.callbackNode;j1(e,t);var r=Il(e,e===$e?We:0);if(r===0)n!==null&&rf(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&rf(n),t===1)e.tag===0?Dk(Yf.bind(null,e)):Fh(Yf.bind(null,e)),zk(function(){!(oe&6)&&Gn()}),n=null;else{switch(dh(r)){case 1:n=vc;break;case 4:n=sh;break;case 16:n=Rl;break;case 536870912:n=uh;break;default:n=Rl}n=Mg(n,_g.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function _g(e,t){if(gl=-1,yl=0,oe&6)throw Error(F(327));var n=e.callbackNode;if(Br()&&e.callbackNode!==n)return null;var r=Il(e,e===$e?We:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ql(e,r);else{t=r;var o=oe;oe|=2;var i=Ig();($e!==e||We!==t)&&(cn=null,Xr=Re()+500,lr(e,t));do try{iw();break}catch(a){Rg(e,a)}while(!0);Mc(),Wl.current=i,oe=o,ze!==null?t=0:($e=null,We=0,t=Ne)}if(t!==0){if(t===2&&(o=fu(e),o!==0&&(r=o,t=$u(e,o))),t===1)throw n=ti,lr(e,0),In(e,r),ft(e,Re()),n;if(t===6)In(e,r);else{if(o=e.current.alternate,!(r&30)&&!rw(o)&&(t=ql(e,r),t===2&&(i=fu(e),i!==0&&(r=i,t=$u(e,i))),t===1))throw n=ti,lr(e,0),In(e,r),ft(e,Re()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(F(345));case 2:er(e,st,cn);break;case 3:if(In(e,r),(r&130023424)===r&&(t=Yc+500-Re(),10<t)){if(Il(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){nt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=bu(er.bind(null,e,st,cn),t);break}er(e,st,cn);break;case 4:if(In(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Qt(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=Re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*nw(r/1960))-r,10<r){e.timeoutHandle=bu(er.bind(null,e,st,cn),r);break}er(e,st,cn);break;case 5:er(e,st,cn);break;default:throw Error(F(329))}}}return ft(e,Re()),e.callbackNode===n?_g.bind(null,e):null}function $u(e,t){var n=Ao;return e.current.memoizedState.isDehydrated&&(lr(e,t).flags|=256),e=ql(e,t),e!==2&&(t=st,st=n,t!==null&&Bu(t)),e}function Bu(e){st===null?st=e:st.push.apply(st,e)}function rw(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Yt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function In(e,t){for(t&=~Gc,t&=~ka,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qt(t),r=1<<n;e[n]=-1,t&=~r}}function Yf(e){if(oe&6)throw Error(F(327));Br();var t=Il(e,0);if(!(t&1))return ft(e,Re()),null;var n=ql(e,t);if(e.tag!==0&&n===2){var r=fu(e);r!==0&&(t=r,n=$u(e,r))}if(n===1)throw n=ti,lr(e,0),In(e,t),ft(e,Re()),n;if(n===6)throw Error(F(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,er(e,st,cn),ft(e,Re()),null}function Xc(e,t){var n=oe;oe|=1;try{return e(t)}finally{oe=n,oe===0&&(Xr=Re()+500,ma&&Gn())}}function fr(e){Ln!==null&&Ln.tag===0&&!(oe&6)&&Br();var t=oe;oe|=1;var n=Mt.transition,r=se;try{if(Mt.transition=null,se=1,e)return e()}finally{se=r,Mt.transition=n,oe=t,!(oe&6)&&Gn()}}function Jc(){kt=Mr.current,ye(Mr)}function lr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lk(n)),ze!==null)for(n=ze.return;n!==null;){var r=n;switch(Ac(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ml();break;case 3:Gr(),ye(ct),ye(Je),Bc();break;case 5:$c(r);break;case 4:Gr();break;case 13:ye(Se);break;case 19:ye(Se);break;case 10:Fc(r.type._context);break;case 22:case 23:Jc()}n=n.return}if($e=e,ze=e=Un(e.current,null),We=kt=t,Ne=0,ti=null,Gc=ka=dr=0,st=Ao=null,or!==null){for(t=0;t<or.length;t++)if(n=or[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}or=null}return e}function Rg(e,t){do{var n=ze;try{if(Mc(),pl.current=Vl,Hl){for(var r=Ce.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Hl=!1}if(cr=0,je=Fe=Ce=null,Io=!1,Jo=0,qc.current=null,n===null||n.return===null){Ne=1,ti=t,ze=null;break}e:{var i=e,l=n.return,a=n,s=t;if(t=We,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Nf(l);if(p!==null){p.flags&=-257,Df(p,l,a,i,t),p.mode&1&&Ff(i,u,t),t=p,s=u;var m=t.updateQueue;if(m===null){var y=new Set;y.add(s),t.updateQueue=y}else m.add(s);break e}else{if(!(t&1)){Ff(i,u,t),Zc();break e}s=Error(F(426))}}else if(xe&&a.mode&1){var S=Nf(l);if(S!==null){!(S.flags&65536)&&(S.flags|=256),Df(S,l,a,i,t),Lc(Yr(s,a));break e}}i=s=Yr(s,a),Ne!==4&&(Ne=2),Ao===null?Ao=[i]:Ao.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=fg(i,s,t);Rf(i,g);break e;case 1:a=s;var h=i.type,k=i.stateNode;if(!(i.flags&128)&&(typeof h.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&($n===null||!$n.has(k)))){i.flags|=65536,t&=-t,i.lanes|=t;var C=pg(i,a,t);Rf(i,C);break e}}i=i.return}while(i!==null)}Ag(n)}catch(T){t=T,ze===n&&n!==null&&(ze=n=n.return);continue}break}while(!0)}function Ig(){var e=Wl.current;return Wl.current=Vl,e===null?Vl:e}function Zc(){(Ne===0||Ne===3||Ne===2)&&(Ne=4),$e===null||!(dr&268435455)&&!(ka&268435455)||In($e,We)}function ql(e,t){var n=oe;oe|=2;var r=Ig();($e!==e||We!==t)&&(cn=null,lr(e,t));do try{ow();break}catch(o){Rg(e,o)}while(!0);if(Mc(),oe=n,Wl.current=r,ze!==null)throw Error(F(261));return $e=null,We=0,Ne}function ow(){for(;ze!==null;)Og(ze)}function iw(){for(;ze!==null&&!I1();)Og(ze)}function Og(e){var t=zg(e.alternate,e,kt);e.memoizedProps=e.pendingProps,t===null?Ag(e):ze=t,qc.current=null}function Ag(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Jk(n,t),n!==null){n.flags&=32767,ze=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ne=6,ze=null;return}}else if(n=Xk(n,t,kt),n!==null){ze=n;return}if(t=t.sibling,t!==null){ze=t;return}ze=t=e}while(t!==null);Ne===0&&(Ne=5)}function er(e,t,n){var r=se,o=Mt.transition;try{Mt.transition=null,se=1,lw(e,t,n,r)}finally{Mt.transition=o,se=r}return null}function lw(e,t,n,r){do Br();while(Ln!==null);if(oe&6)throw Error(F(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(F(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if($1(e,i),e===$e&&(ze=$e=null,We=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||qi||(qi=!0,Mg(Rl,function(){return Br(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Mt.transition,Mt.transition=null;var l=se;se=1;var a=oe;oe|=4,qc.current=null,ew(e,n),Tg(n,e),Tk(ku),Ol=!!yu,ku=yu=null,e.current=n,tw(n),O1(),oe=a,se=l,Mt.transition=i}else e.current=n;if(qi&&(qi=!1,Ln=e,Ql=o),i=e.pendingLanes,i===0&&($n=null),z1(n.stateNode),ft(e,Re()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Kl)throw Kl=!1,e=Du,Du=null,e;return Ql&1&&e.tag!==0&&Br(),i=e.pendingLanes,i&1?e===ju?Lo++:(Lo=0,ju=e):Lo=0,Gn(),null}function Br(){if(Ln!==null){var e=dh(Ql),t=Mt.transition,n=se;try{if(Mt.transition=null,se=16>e?16:e,Ln===null)var r=!1;else{if(e=Ln,Ln=null,Ql=0,oe&6)throw Error(F(331));var o=oe;for(oe|=4,U=e.current;U!==null;){var i=U,l=i.child;if(U.flags&16){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var u=a[s];for(U=u;U!==null;){var d=U;switch(d.tag){case 0:case 11:case 15:Oo(8,d,i)}var c=d.child;if(c!==null)c.return=d,U=c;else for(;U!==null;){d=U;var f=d.sibling,p=d.return;if(Sg(d),d===u){U=null;break}if(f!==null){f.return=p,U=f;break}U=p}}}var m=i.alternate;if(m!==null){var y=m.child;if(y!==null){m.child=null;do{var S=y.sibling;y.sibling=null,y=S}while(y!==null)}}U=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,U=l;else e:for(;U!==null;){if(i=U,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Oo(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,U=g;break e}U=i.return}}var h=e.current;for(U=h;U!==null;){l=U;var k=l.child;if(l.subtreeFlags&2064&&k!==null)k.return=l,U=k;else e:for(l=h;U!==null;){if(a=U,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ya(9,a)}}catch(T){_e(a,a.return,T)}if(a===l){U=null;break e}var C=a.sibling;if(C!==null){C.return=a.return,U=C;break e}U=a.return}}if(oe=o,Gn(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(ua,e)}catch{}r=!0}return r}finally{se=n,Mt.transition=t}}return!1}function Xf(e,t,n){t=Yr(n,t),t=fg(e,t,1),e=jn(e,t,1),t=nt(),e!==null&&(wi(e,1,t),ft(e,t))}function _e(e,t,n){if(e.tag===3)Xf(e,e,n);else for(;t!==null;){if(t.tag===3){Xf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&($n===null||!$n.has(r))){e=Yr(n,e),e=pg(t,e,1),t=jn(t,e,1),e=nt(),t!==null&&(wi(t,1,e),ft(t,e));break}}t=t.return}}function aw(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=nt(),e.pingedLanes|=e.suspendedLanes&n,$e===e&&(We&n)===n&&(Ne===4||Ne===3&&(We&130023424)===We&&500>Re()-Yc?lr(e,0):Gc|=n),ft(e,t)}function Lg(e,t){t===0&&(e.mode&1?(t=Di,Di<<=1,!(Di&130023424)&&(Di=4194304)):t=1);var n=nt();e=wn(e,t),e!==null&&(wi(e,t,n),ft(e,n))}function sw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Lg(e,n)}function uw(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(t),Lg(e,n)}var zg;zg=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ct.current)ut=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ut=!1,Yk(e,t,n);ut=!!(e.flags&131072)}else ut=!1,xe&&t.flags&1048576&&Nh(t,Dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;hl(e,t),e=t.pendingProps;var o=Kr(t,Je.current);$r(t,n),o=Hc(null,t,r,e,o,n);var i=Vc();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,dt(r)?(i=!0,Fl(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Dc(t),o.updater=ha,t.stateNode=o,o._reactInternals=t,Pu(t,r,e,n),t=Iu(null,t,r,!0,i,n)):(t.tag=0,xe&&i&&Oc(t),et(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(hl(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=dw(r),e=Ht(r,e),o){case 0:t=Ru(null,t,r,e,n);break e;case 1:t=Bf(null,t,r,e,n);break e;case 11:t=jf(null,t,r,e,n);break e;case 14:t=$f(null,t,r,Ht(r.type,e),n);break e}throw Error(F(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Ru(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Bf(e,t,r,o,n);case 3:e:{if(yg(t),e===null)throw Error(F(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Bh(e,t),Bl(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Yr(Error(F(423)),t),t=Uf(e,t,r,n,o);break e}else if(r!==o){o=Yr(Error(F(424)),t),t=Uf(e,t,r,n,o);break e}else for(bt=Dn(t.stateNode.containerInfo.firstChild),xt=t,xe=!0,Wt=null,n=Wh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Qr(),r===o){t=bn(e,t,n);break e}et(e,t,r,n)}t=t.child}return t;case 5:return Kh(t),e===null&&Cu(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,wu(r,o)?l=null:i!==null&&wu(r,i)&&(t.flags|=32),gg(e,t),et(e,t,l,n),t.child;case 6:return e===null&&Cu(t),null;case 13:return kg(e,t,n);case 4:return jc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=qr(t,null,r,n):et(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),jf(e,t,r,o,n);case 7:return et(e,t,t.pendingProps,n),t.child;case 8:return et(e,t,t.pendingProps.children,n),t.child;case 12:return et(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,he(jl,r._currentValue),r._currentValue=l,i!==null)if(Yt(i.value,l)){if(i.children===o.children&&!ct.current){t=bn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){l=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=gn(-1,n&-n),s.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?s.next=s:(s.next=d.next,d.next=s),u.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Eu(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(F(341));l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),Eu(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}et(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,$r(t,n),o=Ft(o),r=r(o),t.flags|=1,et(e,t,r,n),t.child;case 14:return r=t.type,o=Ht(r,t.pendingProps),o=Ht(r.type,o),$f(e,t,r,o,n);case 15:return mg(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),hl(e,t),t.tag=1,dt(r)?(e=!0,Fl(t)):e=!1,$r(t,n),Hh(t,r,o),Pu(t,r,o,n),Iu(null,t,r,!0,e,n);case 19:return wg(e,t,n);case 22:return hg(e,t,n)}throw Error(F(156,t.tag))};function Mg(e,t){return ah(e,t)}function cw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(e,t,n,r){return new cw(e,t,n,r)}function ed(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dw(e){if(typeof e=="function")return ed(e)?1:0;if(e!=null){if(e=e.$$typeof,e===wc)return 11;if(e===bc)return 14}return 2}function Un(e,t){var n=e.alternate;return n===null?(n=zt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function kl(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")ed(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Er:return ar(n.children,o,i,t);case kc:l=8,o|=8;break;case Xs:return e=zt(12,n,t,o|2),e.elementType=Xs,e.lanes=i,e;case Js:return e=zt(13,n,t,o),e.elementType=Js,e.lanes=i,e;case Zs:return e=zt(19,n,t,o),e.elementType=Zs,e.lanes=i,e;case Vm:return wa(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Um:l=10;break e;case Hm:l=9;break e;case wc:l=11;break e;case bc:l=14;break e;case Pn:l=16,r=null;break e}throw Error(F(130,e==null?e:typeof e,""))}return t=zt(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function ar(e,t,n,r){return e=zt(7,e,r,t),e.lanes=n,e}function wa(e,t,n,r){return e=zt(22,e,r,t),e.elementType=Vm,e.lanes=n,e.stateNode={isHidden:!1},e}function xs(e,t,n){return e=zt(6,e,null,t),e.lanes=n,e}function vs(e,t,n){return t=zt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function fw(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ns(0),this.expirationTimes=ns(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ns(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function td(e,t,n,r,o,i,l,a,s){return e=new fw(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=zt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dc(i),e}function pw(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Cr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Fg(e){if(!e)return Wn;e=e._reactInternals;e:{if(hr(e)!==e||e.tag!==1)throw Error(F(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(F(171))}if(e.tag===1){var n=e.type;if(dt(n))return Mh(e,n,t)}return t}function Ng(e,t,n,r,o,i,l,a,s){return e=td(n,r,!0,e,o,i,l,a,s),e.context=Fg(null),n=e.current,r=nt(),o=Bn(n),i=gn(r,o),i.callback=t??null,jn(n,i,o),e.current.lanes=o,wi(e,o,r),ft(e,r),e}function ba(e,t,n,r){var o=t.current,i=nt(),l=Bn(o);return n=Fg(n),t.context===null?t.context=n:t.pendingContext=n,t=gn(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=jn(o,t,l),e!==null&&(qt(e,o,l,i),fl(e,o,l)),l}function Gl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Jf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function nd(e,t){Jf(e,t),(e=e.alternate)&&Jf(e,t)}function mw(){return null}var Dg=typeof reportError=="function"?reportError:function(e){console.error(e)};function rd(e){this._internalRoot=e}xa.prototype.render=rd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(F(409));ba(e,t,null,null)};xa.prototype.unmount=rd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fr(function(){ba(null,e,null,null)}),t[kn]=null}};function xa(e){this._internalRoot=e}xa.prototype.unstable_scheduleHydration=function(e){if(e){var t=mh();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rn.length&&t!==0&&t<Rn[n].priority;n++);Rn.splice(n,0,e),n===0&&gh(e)}};function od(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Zf(){}function hw(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var u=Gl(l);i.call(u)}}var l=Ng(t,r,e,0,null,!1,!1,"",Zf);return e._reactRootContainer=l,e[kn]=l.current,Qo(e.nodeType===8?e.parentNode:e),fr(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var u=Gl(s);a.call(u)}}var s=td(e,0,!1,null,null,!1,!1,"",Zf);return e._reactRootContainer=s,e[kn]=s.current,Qo(e.nodeType===8?e.parentNode:e),fr(function(){ba(t,s,n,r)}),s}function Sa(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var a=o;o=function(){var s=Gl(l);a.call(s)}}ba(t,l,e,o)}else l=hw(n,t,e,o,r);return Gl(l)}fh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=So(t.pendingLanes);n!==0&&(Sc(t,n|1),ft(t,Re()),!(oe&6)&&(Xr=Re()+500,Gn()))}break;case 13:fr(function(){var r=wn(e,1);if(r!==null){var o=nt();qt(r,e,1,o)}}),nd(e,1)}};Cc=function(e){if(e.tag===13){var t=wn(e,134217728);if(t!==null){var n=nt();qt(t,e,134217728,n)}nd(e,134217728)}};ph=function(e){if(e.tag===13){var t=Bn(e),n=wn(e,t);if(n!==null){var r=nt();qt(n,e,t,r)}nd(e,t)}};mh=function(){return se};hh=function(e,t){var n=se;try{return se=e,t()}finally{se=n}};uu=function(e,t,n){switch(t){case"input":if(nu(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=pa(r);if(!o)throw Error(F(90));Km(r),nu(r,o)}}}break;case"textarea":qm(e,n);break;case"select":t=n.value,t!=null&&Fr(e,!!n.multiple,t,!1)}};th=Xc;nh=fr;var gw={usingClientEntryPoint:!1,Events:[xi,Rr,pa,Zm,eh,Xc]},yo={findFiberByHostInstance:rr,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},yw={bundleType:yo.bundleType,version:yo.version,rendererPackageName:yo.rendererPackageName,rendererConfig:yo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:vn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ih(e),e===null?null:e.stateNode},findFiberByHostInstance:yo.findFiberByHostInstance||mw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gi.isDisabled&&Gi.supportsFiber)try{ua=Gi.inject(yw),rn=Gi}catch{}}Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gw;Et.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!od(t))throw Error(F(200));return pw(e,t,null,n)};Et.createRoot=function(e,t){if(!od(e))throw Error(F(299));var n=!1,r="",o=Dg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=td(e,1,!1,null,null,n,!1,r,o),e[kn]=t.current,Qo(e.nodeType===8?e.parentNode:e),new rd(t)};Et.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(F(188)):(e=Object.keys(e).join(","),Error(F(268,e)));return e=ih(t),e=e===null?null:e.stateNode,e};Et.flushSync=function(e){return fr(e)};Et.hydrate=function(e,t,n){if(!va(t))throw Error(F(200));return Sa(null,e,t,!0,n)};Et.hydrateRoot=function(e,t,n){if(!od(e))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=Dg;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Ng(t,null,e,1,n??null,o,!1,i,l),e[kn]=t.current,Qo(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new xa(t)};Et.render=function(e,t,n){if(!va(t))throw Error(F(200));return Sa(null,e,t,!1,n)};Et.unmountComponentAtNode=function(e){if(!va(e))throw Error(F(40));return e._reactRootContainer?(fr(function(){Sa(null,null,e,!1,function(){e._reactRootContainer=null,e[kn]=null})}),!0):!1};Et.unstable_batchedUpdates=Xc;Et.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!va(n))throw Error(F(200));if(e==null||e._reactInternals===void 0)throw Error(F(38));return Sa(e,t,n,!1,r)};Et.version="18.2.0-next-9e3b772b8-20220608";function jg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jg)}catch(e){console.error(e)}}jg(),Nm.exports=Et;var $g=Nm.exports,ep=$g;Gs.createRoot=ep.createRoot,Gs.hydrateRoot=ep.hydrateRoot;function kw(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}function Q(){return Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Q.apply(this,arguments)}function Bg(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var ww=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,bw=Bg(function(e){return ww.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function xw(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function vw(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Sw=function(){function e(n){var r=this;this._insertTag=function(o){var i;r.tags.length===0?r.insertionPoint?i=r.insertionPoint.nextSibling:r.prepend?i=r.container.firstChild:i=r.before:i=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(o,i),r.tags.push(o)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(r){r.forEach(this._insertTag)},t.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(vw(this));var o=this.tags[this.tags.length-1];if(this.isSpeedy){var i=xw(o);try{i.insertRule(r,i.cssRules.length)}catch{}}else o.appendChild(document.createTextNode(r));this.ctr++},t.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},e}(),Ge="-ms-",Yl="-moz-",le="-webkit-",Ug="comm",id="rule",ld="decl",Cw="@import",Hg="@keyframes",Ew="@layer",Tw=Math.abs,Ca=String.fromCharCode,Pw=Object.assign;function _w(e,t){return Ve(e,0)^45?(((t<<2^Ve(e,0))<<2^Ve(e,1))<<2^Ve(e,2))<<2^Ve(e,3):0}function Vg(e){return e.trim()}function Rw(e,t){return(e=t.exec(e))?e[0]:e}function ae(e,t,n){return e.replace(t,n)}function Uu(e,t){return e.indexOf(t)}function Ve(e,t){return e.charCodeAt(t)|0}function ni(e,t,n){return e.slice(t,n)}function en(e){return e.length}function ad(e){return e.length}function Yi(e,t){return t.push(e),e}function Iw(e,t){return e.map(t).join("")}var Ea=1,Jr=1,Wg=0,pt=0,Le=0,oo="";function Ta(e,t,n,r,o,i,l){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:Ea,column:Jr,length:l,return:""}}function ko(e,t){return Pw(Ta("",null,null,"",null,null,0),e,{length:-e.length},t)}function Ow(){return Le}function Aw(){return Le=pt>0?Ve(oo,--pt):0,Jr--,Le===10&&(Jr=1,Ea--),Le}function vt(){return Le=pt<Wg?Ve(oo,pt++):0,Jr++,Le===10&&(Jr=1,Ea++),Le}function ln(){return Ve(oo,pt)}function wl(){return pt}function Si(e,t){return ni(oo,e,t)}function ri(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Kg(e){return Ea=Jr=1,Wg=en(oo=e),pt=0,[]}function Qg(e){return oo="",e}function bl(e){return Vg(Si(pt-1,Hu(e===91?e+2:e===40?e+1:e)))}function Lw(e){for(;(Le=ln())&&Le<33;)vt();return ri(e)>2||ri(Le)>3?"":" "}function zw(e,t){for(;--t&&vt()&&!(Le<48||Le>102||Le>57&&Le<65||Le>70&&Le<97););return Si(e,wl()+(t<6&&ln()==32&&vt()==32))}function Hu(e){for(;vt();)switch(Le){case e:return pt;case 34:case 39:e!==34&&e!==39&&Hu(Le);break;case 40:e===41&&Hu(e);break;case 92:vt();break}return pt}function Mw(e,t){for(;vt()&&e+Le!==57;)if(e+Le===84&&ln()===47)break;return"/*"+Si(t,pt-1)+"*"+Ca(e===47?e:vt())}function Fw(e){for(;!ri(ln());)vt();return Si(e,pt)}function Nw(e){return Qg(xl("",null,null,null,[""],e=Kg(e),0,[0],e))}function xl(e,t,n,r,o,i,l,a,s){for(var u=0,d=0,c=l,f=0,p=0,m=0,y=1,S=1,g=1,h=0,k="",C=o,T=i,v=r,E=k;S;)switch(m=h,h=vt()){case 40:if(m!=108&&Ve(E,c-1)==58){Uu(E+=ae(bl(h),"&","&\f"),"&\f")!=-1&&(g=-1);break}case 34:case 39:case 91:E+=bl(h);break;case 9:case 10:case 13:case 32:E+=Lw(m);break;case 92:E+=zw(wl()-1,7);continue;case 47:switch(ln()){case 42:case 47:Yi(Dw(Mw(vt(),wl()),t,n),s);break;default:E+="/"}break;case 123*y:a[u++]=en(E)*g;case 125*y:case 59:case 0:switch(h){case 0:case 125:S=0;case 59+d:g==-1&&(E=ae(E,/\f/g,"")),p>0&&en(E)-c&&Yi(p>32?np(E+";",r,n,c-1):np(ae(E," ","")+";",r,n,c-2),s);break;case 59:E+=";";default:if(Yi(v=tp(E,t,n,u,d,o,a,k,C=[],T=[],c),i),h===123)if(d===0)xl(E,t,v,v,C,i,c,a,T);else switch(f===99&&Ve(E,3)===110?100:f){case 100:case 108:case 109:case 115:xl(e,v,v,r&&Yi(tp(e,v,v,0,0,o,a,k,o,C=[],c),T),o,T,c,a,r?C:T);break;default:xl(E,v,v,v,[""],T,0,a,T)}}u=d=p=0,y=g=1,k=E="",c=l;break;case 58:c=1+en(E),p=m;default:if(y<1){if(h==123)--y;else if(h==125&&y++==0&&Aw()==125)continue}switch(E+=Ca(h),h*y){case 38:g=d>0?1:(E+="\f",-1);break;case 44:a[u++]=(en(E)-1)*g,g=1;break;case 64:ln()===45&&(E+=bl(vt())),f=ln(),d=c=en(k=E+=Fw(wl())),h++;break;case 45:m===45&&en(E)==2&&(y=0)}}return i}function tp(e,t,n,r,o,i,l,a,s,u,d){for(var c=o-1,f=o===0?i:[""],p=ad(f),m=0,y=0,S=0;m<r;++m)for(var g=0,h=ni(e,c+1,c=Tw(y=l[m])),k=e;g<p;++g)(k=Vg(y>0?f[g]+" "+h:ae(h,/&\f/g,f[g])))&&(s[S++]=k);return Ta(e,t,n,o===0?id:a,s,u,d)}function Dw(e,t,n){return Ta(e,t,n,Ug,Ca(Ow()),ni(e,2,-2),0)}function np(e,t,n,r){return Ta(e,t,n,ld,ni(e,0,r),ni(e,r+1,-1),r)}function Ur(e,t){for(var n="",r=ad(e),o=0;o<r;o++)n+=t(e[o],o,e,t)||"";return n}function jw(e,t,n,r){switch(e.type){case Ew:if(e.children.length)break;case Cw:case ld:return e.return=e.return||e.value;case Ug:return"";case Hg:return e.return=e.value+"{"+Ur(e.children,r)+"}";case id:e.value=e.props.join(",")}return en(n=Ur(e.children,r))?e.return=e.value+"{"+n+"}":""}function $w(e){var t=ad(e);return function(n,r,o,i){for(var l="",a=0;a<t;a++)l+=e[a](n,r,o,i)||"";return l}}function Bw(e){return function(t){t.root||(t=t.return)&&e(t)}}var Uw=function(t,n,r){for(var o=0,i=0;o=i,i=ln(),o===38&&i===12&&(n[r]=1),!ri(i);)vt();return Si(t,pt)},Hw=function(t,n){var r=-1,o=44;do switch(ri(o)){case 0:o===38&&ln()===12&&(n[r]=1),t[r]+=Uw(pt-1,n,r);break;case 2:t[r]+=bl(o);break;case 4:if(o===44){t[++r]=ln()===58?"&\f":"",n[r]=t[r].length;break}default:t[r]+=Ca(o)}while(o=vt());return t},Vw=function(t,n){return Qg(Hw(Kg(t),n))},rp=new WeakMap,Ww=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var n=t.value,r=t.parent,o=t.column===r.column&&t.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(t.props.length===1&&n.charCodeAt(0)!==58&&!rp.get(r))&&!o){rp.set(t,!0);for(var i=[],l=Vw(n,i),a=r.props,s=0,u=0;s<l.length;s++)for(var d=0;d<a.length;d++,u++)t.props[u]=i[s]?l[s].replace(/&\f/g,a[d]):a[d]+" "+l[s]}}},Kw=function(t){if(t.type==="decl"){var n=t.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(t.return="",t.value="")}};function qg(e,t){switch(_w(e,t)){case 5103:return le+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return le+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return le+e+Yl+e+Ge+e+e;case 6828:case 4268:return le+e+Ge+e+e;case 6165:return le+e+Ge+"flex-"+e+e;case 5187:return le+e+ae(e,/(\w+).+(:[^]+)/,le+"box-$1$2"+Ge+"flex-$1$2")+e;case 5443:return le+e+Ge+"flex-item-"+ae(e,/flex-|-self/,"")+e;case 4675:return le+e+Ge+"flex-line-pack"+ae(e,/align-content|flex-|-self/,"")+e;case 5548:return le+e+Ge+ae(e,"shrink","negative")+e;case 5292:return le+e+Ge+ae(e,"basis","preferred-size")+e;case 6060:return le+"box-"+ae(e,"-grow","")+le+e+Ge+ae(e,"grow","positive")+e;case 4554:return le+ae(e,/([^-])(transform)/g,"$1"+le+"$2")+e;case 6187:return ae(ae(ae(e,/(zoom-|grab)/,le+"$1"),/(image-set)/,le+"$1"),e,"")+e;case 5495:case 3959:return ae(e,/(image-set\([^]*)/,le+"$1$`$1");case 4968:return ae(ae(e,/(.+:)(flex-)?(.*)/,le+"box-pack:$3"+Ge+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+le+e+e;case 4095:case 3583:case 4068:case 2532:return ae(e,/(.+)-inline(.+)/,le+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(en(e)-1-t>6)switch(Ve(e,t+1)){case 109:if(Ve(e,t+4)!==45)break;case 102:return ae(e,/(.+:)(.+)-([^]+)/,"$1"+le+"$2-$3$1"+Yl+(Ve(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Uu(e,"stretch")?qg(ae(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(Ve(e,t+1)!==115)break;case 6444:switch(Ve(e,en(e)-3-(~Uu(e,"!important")&&10))){case 107:return ae(e,":",":"+le)+e;case 101:return ae(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+le+(Ve(e,14)===45?"inline-":"")+"box$3$1"+le+"$2$3$1"+Ge+"$2box$3")+e}break;case 5936:switch(Ve(e,t+11)){case 114:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return le+e+Ge+e+e}return e}var Qw=function(t,n,r,o){if(t.length>-1&&!t.return)switch(t.type){case ld:t.return=qg(t.value,t.length);break;case Hg:return Ur([ko(t,{value:ae(t.value,"@","@"+le)})],o);case id:if(t.length)return Iw(t.props,function(i){switch(Rw(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ur([ko(t,{props:[ae(i,/:(read-\w+)/,":"+Yl+"$1")]})],o);case"::placeholder":return Ur([ko(t,{props:[ae(i,/:(plac\w+)/,":"+le+"input-$1")]}),ko(t,{props:[ae(i,/:(plac\w+)/,":"+Yl+"$1")]}),ko(t,{props:[ae(i,/:(plac\w+)/,Ge+"input-$1")]})],o)}return""})}},qw=[Qw],Gw=function(t){var n=t.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(y){var S=y.getAttribute("data-emotion");S.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var o=t.stylisPlugins||qw,i={},l,a=[];l=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(y){for(var S=y.getAttribute("data-emotion").split(" "),g=1;g<S.length;g++)i[S[g]]=!0;a.push(y)});var s,u=[Ww,Kw];{var d,c=[jw,Bw(function(y){d.insert(y)})],f=$w(u.concat(o,c)),p=function(S){return Ur(Nw(S),f)};s=function(S,g,h,k){d=h,p(S?S+"{"+g.styles+"}":g.styles),k&&(m.inserted[g.name]=!0)}}var m={key:n,sheet:new Sw({key:n,container:l,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:i,registered:{},insert:s};return m.sheet.hydrate(a),m},Gg={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Be=typeof Symbol=="function"&&Symbol.for,sd=Be?Symbol.for("react.element"):60103,ud=Be?Symbol.for("react.portal"):60106,Pa=Be?Symbol.for("react.fragment"):60107,_a=Be?Symbol.for("react.strict_mode"):60108,Ra=Be?Symbol.for("react.profiler"):60114,Ia=Be?Symbol.for("react.provider"):60109,Oa=Be?Symbol.for("react.context"):60110,cd=Be?Symbol.for("react.async_mode"):60111,Aa=Be?Symbol.for("react.concurrent_mode"):60111,La=Be?Symbol.for("react.forward_ref"):60112,za=Be?Symbol.for("react.suspense"):60113,Yw=Be?Symbol.for("react.suspense_list"):60120,Ma=Be?Symbol.for("react.memo"):60115,Fa=Be?Symbol.for("react.lazy"):60116,Xw=Be?Symbol.for("react.block"):60121,Jw=Be?Symbol.for("react.fundamental"):60117,Zw=Be?Symbol.for("react.responder"):60118,eb=Be?Symbol.for("react.scope"):60119;function Pt(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case sd:switch(e=e.type,e){case cd:case Aa:case Pa:case Ra:case _a:case za:return e;default:switch(e=e&&e.$$typeof,e){case Oa:case La:case Fa:case Ma:case Ia:return e;default:return t}}case ud:return t}}}function Yg(e){return Pt(e)===Aa}ue.AsyncMode=cd;ue.ConcurrentMode=Aa;ue.ContextConsumer=Oa;ue.ContextProvider=Ia;ue.Element=sd;ue.ForwardRef=La;ue.Fragment=Pa;ue.Lazy=Fa;ue.Memo=Ma;ue.Portal=ud;ue.Profiler=Ra;ue.StrictMode=_a;ue.Suspense=za;ue.isAsyncMode=function(e){return Yg(e)||Pt(e)===cd};ue.isConcurrentMode=Yg;ue.isContextConsumer=function(e){return Pt(e)===Oa};ue.isContextProvider=function(e){return Pt(e)===Ia};ue.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===sd};ue.isForwardRef=function(e){return Pt(e)===La};ue.isFragment=function(e){return Pt(e)===Pa};ue.isLazy=function(e){return Pt(e)===Fa};ue.isMemo=function(e){return Pt(e)===Ma};ue.isPortal=function(e){return Pt(e)===ud};ue.isProfiler=function(e){return Pt(e)===Ra};ue.isStrictMode=function(e){return Pt(e)===_a};ue.isSuspense=function(e){return Pt(e)===za};ue.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===Pa||e===Aa||e===Ra||e===_a||e===za||e===Yw||typeof e=="object"&&e!==null&&(e.$$typeof===Fa||e.$$typeof===Ma||e.$$typeof===Ia||e.$$typeof===Oa||e.$$typeof===La||e.$$typeof===Jw||e.$$typeof===Zw||e.$$typeof===eb||e.$$typeof===Xw)};ue.typeOf=Pt;Gg.exports=ue;var tb=Gg.exports,Xg=tb,nb={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},rb={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Jg={};Jg[Xg.ForwardRef]=nb;Jg[Xg.Memo]=rb;var ob=!0;function ib(e,t,n){var r="";return n.split(" ").forEach(function(o){e[o]!==void 0?t.push(e[o]+";"):r+=o+" "}),r}var Zg=function(t,n,r){var o=t.key+"-"+n.name;(r===!1||ob===!1)&&t.registered[o]===void 0&&(t.registered[o]=n.styles)},lb=function(t,n,r){Zg(t,n,r);var o=t.key+"-"+n.name;if(t.inserted[n.name]===void 0){var i=n;do t.insert(n===i?"."+o:"",i,t.sheet,!0),i=i.next;while(i!==void 0)}};function ab(e){for(var t=0,n,r=0,o=e.length;o>=4;++r,o-=4)n=e.charCodeAt(r)&255|(e.charCodeAt(++r)&255)<<8|(e.charCodeAt(++r)&255)<<16|(e.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,t=(n&65535)*1540483477+((n>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(r+2)&255)<<16;case 2:t^=(e.charCodeAt(r+1)&255)<<8;case 1:t^=e.charCodeAt(r)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var sb={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ub=/[A-Z]|^ms/g,cb=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ey=function(t){return t.charCodeAt(1)===45},op=function(t){return t!=null&&typeof t!="boolean"},Ss=Bg(function(e){return ey(e)?e:e.replace(ub,"-$&").toLowerCase()}),ip=function(t,n){switch(t){case"animation":case"animationName":if(typeof n=="string")return n.replace(cb,function(r,o,i){return tn={name:o,styles:i,next:tn},o})}return sb[t]!==1&&!ey(t)&&typeof n=="number"&&n!==0?n+"px":n};function oi(e,t,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return tn={name:n.name,styles:n.styles,next:tn},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)tn={name:r.name,styles:r.styles,next:tn},r=r.next;var o=n.styles+";";return o}return db(e,t,n)}case"function":{if(e!==void 0){var i=tn,l=n(e);return tn=i,oi(e,t,l)}break}}if(t==null)return n;var a=t[n];return a!==void 0?a:n}function db(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=oi(e,t,n[o])+";";else for(var i in n){var l=n[i];if(typeof l!="object")t!=null&&t[l]!==void 0?r+=i+"{"+t[l]+"}":op(l)&&(r+=Ss(i)+":"+ip(i,l)+";");else if(Array.isArray(l)&&typeof l[0]=="string"&&(t==null||t[l[0]]===void 0))for(var a=0;a<l.length;a++)op(l[a])&&(r+=Ss(i)+":"+ip(i,l[a])+";");else{var s=oi(e,t,l);switch(i){case"animation":case"animationName":{r+=Ss(i)+":"+s+";";break}default:r+=i+"{"+s+"}"}}}return r}var lp=/label:\s*([^\s;\n{]+)\s*(;|$)/g,tn,ty=function(t,n,r){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var o=!0,i="";tn=void 0;var l=t[0];l==null||l.raw===void 0?(o=!1,i+=oi(r,n,l)):i+=l[0];for(var a=1;a<t.length;a++)i+=oi(r,n,t[a]),o&&(i+=l[a]);lp.lastIndex=0;for(var s="",u;(u=lp.exec(i))!==null;)s+="-"+u[1];var d=ab(i)+s;return{name:d,styles:i,next:tn}},fb=function(t){return t()},pb=Qd.useInsertionEffect?Qd.useInsertionEffect:!1,mb=pb||fb,ny=R.createContext(typeof HTMLElement<"u"?Gw({key:"css"}):null);ny.Provider;var hb=function(t){return R.forwardRef(function(n,r){var o=R.useContext(ny);return t(n,o,r)})},dd=R.createContext({});function ke(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return ty(t)}var gb=bw,yb=function(t){return t!=="theme"},ap=function(t){return typeof t=="string"&&t.charCodeAt(0)>96?gb:yb},sp=function(t,n,r){var o;if(n){var i=n.shouldForwardProp;o=t.__emotion_forwardProp&&i?function(l){return t.__emotion_forwardProp(l)&&i(l)}:i}return typeof o!="function"&&r&&(o=t.__emotion_forwardProp),o},kb=function(t){var n=t.cache,r=t.serialized,o=t.isStringTag;return Zg(n,r,o),mb(function(){return lb(n,r,o)}),null},wb=function e(t,n){var r=t.__emotion_real===t,o=r&&t.__emotion_base||t,i,l;n!==void 0&&(i=n.label,l=n.target);var a=sp(t,n,r),s=a||ap(o),u=!s("as");return function(){var d=arguments,c=r&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(i!==void 0&&c.push("label:"+i+";"),d[0]==null||d[0].raw===void 0)c.push.apply(c,d);else{c.push(d[0][0]);for(var f=d.length,p=1;p<f;p++)c.push(d[p],d[0][p])}var m=hb(function(y,S,g){var h=u&&y.as||o,k="",C=[],T=y;if(y.theme==null){T={};for(var v in y)T[v]=y[v];T.theme=R.useContext(dd)}typeof y.className=="string"?k=ib(S.registered,C,y.className):y.className!=null&&(k=y.className+" ");var E=ty(c.concat(C),S.registered,T);k+=S.key+"-"+E.name,l!==void 0&&(k+=" "+l);var P=u&&a===void 0?ap(h):s,M={};for(var w in y)u&&w==="as"||P(w)&&(M[w]=y[w]);return M.className=k,M.ref=g,R.createElement(R.Fragment,null,R.createElement(kb,{cache:S,serialized:E,isStringTag:typeof h=="string"}),R.createElement(h,M))});return m.displayName=i!==void 0?i:"Styled("+(typeof o=="string"?o:o.displayName||o.name||"Component")+")",m.defaultProps=t.defaultProps,m.__emotion_real=m,m.__emotion_base=o,m.__emotion_styles=c,m.__emotion_forwardProp=a,Object.defineProperty(m,"toString",{value:function(){return"."+l}}),m.withComponent=function(y,S){return e(y,Q({},n,S,{shouldForwardProp:sp(m,S,!0)})).apply(void 0,c)},m}},bb=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],Vu=wb.bind();bb.forEach(function(e){Vu[e]=Vu(e)});var ry={exports:{}},xb="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",vb=xb,Sb=vb;function oy(){}function iy(){}iy.resetWarningCache=oy;var Cb=function(){function e(r,o,i,l,a,s){if(s!==Sb){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:iy,resetWarningCache:oy};return n.PropTypes=n,n};ry.exports=Cb();var Eb=ry.exports;const up=aa(Eb);function Tb(e,t){return Vu(e,t)}const Pb=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))};function gr(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function On(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ly(e){if(!On(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ly(e[n])}),t}function Zr(e,t,n={clone:!0}){const r=n.clone?Q({},e):e;return On(e)&&On(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(On(t[o])&&o in e&&On(e[o])?r[o]=Zr(e[o],t[o],n):n.clone?r[o]=On(t[o])?ly(t[o]):t[o]:r[o]=t[o])}),r}function zo(e){if(typeof e!="string")throw new Error(kw(7));return e.charAt(0).toUpperCase()+e.slice(1)}function cp(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Hn(e){return e&&e.ownerDocument||document}function fd(e){return Hn(e).defaultView||window}function Wu(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Xl=typeof window<"u"?R.useLayoutEffect:R.useEffect;function dp(e){const t=R.useRef(e);return Xl(()=>{t.current=e}),R.useRef((...n)=>(0,t.current)(...n)).current}function Ci(...e){return R.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Wu(n,t)})},e)}class pd{constructor(){this.currentId=0,this.clear=()=>{this.currentId!==0&&(clearTimeout(this.currentId),this.currentId=0)},this.disposeEffect=()=>this.clear}static create(){return new pd}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=0,n()},t)}}let Na=!0,Ku=!1;const _b=new pd,Rb={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ib(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Rb[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ob(e){e.metaKey||e.altKey||e.ctrlKey||(Na=!0)}function Cs(){Na=!1}function Ab(){this.visibilityState==="hidden"&&Ku&&(Na=!0)}function Lb(e){e.addEventListener("keydown",Ob,!0),e.addEventListener("mousedown",Cs,!0),e.addEventListener("pointerdown",Cs,!0),e.addEventListener("touchstart",Cs,!0),e.addEventListener("visibilitychange",Ab,!0)}function zb(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Na||Ib(t)}function Mb(){const e=R.useCallback(o=>{o!=null&&Lb(o.ownerDocument)},[]),t=R.useRef(!1);function n(){return t.current?(Ku=!0,_b.start(100,()=>{Ku=!1}),t.current=!1,!0):!1}function r(o){return zb(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Fb(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ay(e,t){const n=Q({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=Q({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=Q({},i),Object.keys(o).forEach(l=>{n[r][l]=ay(o[l],i[l])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function sy(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,l)=>{if(l){const a=t(l);a!==""&&i.push(a),n&&n[l]&&i.push(n[l])}return i},[]).join(" ")}),r}const Nb={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"},Db=["values","unit","step"],jb=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>Q({},n,{[r.key]:r.val}),{})};function $b(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=gr(e,Db),i=jb(t),l=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function s(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,p){const m=l.indexOf(p);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(m!==-1&&typeof t[l[m]]=="number"?t[l[m]]:p)-r/100}${n})`}function d(f){return l.indexOf(f)+1<l.length?u(f,l[l.indexOf(f)+1]):a(f)}function c(f){const p=l.indexOf(f);return p===0?a(l[1]):p===l.length-1?s(l[p]):u(f,l[l.indexOf(f)+1]).replace("@media","@media not all and")}return Q({keys:l,values:i,up:a,down:s,between:u,only:d,not:c,unit:n},o)}const Bb={borderRadius:4},Ub=Bb;function Mo(e,t){return t?Zr(e,t,{clone:!1}):e}const md={xs:0,sm:600,md:900,lg:1200,xl:1536},fp={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${md[e]}px)`};function xn(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||fp;return t.reduce((l,a,s)=>(l[i.up(i.keys[s])]=n(t[s]),l),{})}if(typeof t=="object"){const i=r.breakpoints||fp;return Object.keys(t).reduce((l,a)=>{if(Object.keys(i.values||md).indexOf(a)!==-1){const s=i.up(a);l[s]=n(t[a],a)}else{const s=a;l[s]=t[s]}return l},{})}return n(t)}function Hb(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Vb(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Da(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Jl(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Da(e,n)||r,t&&(o=t(o,r,e)),o}function Ie(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=l=>{if(l[t]==null)return null;const a=l[t],s=l.theme,u=Da(s,r)||{};return xn(l,a,c=>{let f=Jl(u,o,c);return c===f&&typeof c=="string"&&(f=Jl(u,o,`${t}${c==="default"?"":zo(c)}`,c)),n===!1?f:{[n]:f}})};return i.propTypes={},i.filterProps=[t],i}function Wb(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Kb={m:"margin",p:"padding"},Qb={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},pp={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},qb=Wb(e=>{if(e.length>2)if(pp[e])e=pp[e];else return[e];const[t,n]=e.split(""),r=Kb[t],o=Qb[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),hd=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],gd=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];[...hd,...gd];function Ei(e,t,n,r){var o;const i=(o=Da(e,t,!1))!=null?o:n;return typeof i=="number"?l=>typeof l=="string"?l:i*l:Array.isArray(i)?l=>typeof l=="string"?l:i[l]:typeof i=="function"?i:()=>{}}function uy(e){return Ei(e,"spacing",8)}function Ti(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Gb(e,t){return n=>e.reduce((r,o)=>(r[o]=Ti(t,n),r),{})}function Yb(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=qb(n),i=Gb(o,r),l=e[n];return xn(e,l,i)}function cy(e,t){const n=uy(e.theme);return Object.keys(e).map(r=>Yb(e,t,r,n)).reduce(Mo,{})}function Te(e){return cy(e,hd)}Te.propTypes={};Te.filterProps=hd;function Pe(e){return cy(e,gd)}Pe.propTypes={};Pe.filterProps=gd;function Xb(e=8){if(e.mui)return e;const t=uy({spacing:e}),n=(...r)=>(r.length===0?[1]:r).map(i=>{const l=t(i);return typeof l=="number"?`${l}px`:l}).join(" ");return n.mui=!0,n}function ja(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?Mo(o,t[i](r)):o,{});return n.propTypes={},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ot(e){return typeof e!="number"?e:`${e}px solid`}function Dt(e,t){return Ie({prop:e,themeKey:"borders",transform:t})}const Jb=Dt("border",Ot),Zb=Dt("borderTop",Ot),ex=Dt("borderRight",Ot),tx=Dt("borderBottom",Ot),nx=Dt("borderLeft",Ot),rx=Dt("borderColor"),ox=Dt("borderTopColor"),ix=Dt("borderRightColor"),lx=Dt("borderBottomColor"),ax=Dt("borderLeftColor"),sx=Dt("outline",Ot),ux=Dt("outlineColor"),$a=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Ei(e.theme,"shape.borderRadius",4),n=r=>({borderRadius:Ti(t,r)});return xn(e,e.borderRadius,n)}return null};$a.propTypes={};$a.filterProps=["borderRadius"];ja(Jb,Zb,ex,tx,nx,rx,ox,ix,lx,ax,$a,sx,ux);const Ba=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({gap:Ti(t,r)});return xn(e,e.gap,n)}return null};Ba.propTypes={};Ba.filterProps=["gap"];const Ua=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({columnGap:Ti(t,r)});return xn(e,e.columnGap,n)}return null};Ua.propTypes={};Ua.filterProps=["columnGap"];const Ha=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({rowGap:Ti(t,r)});return xn(e,e.rowGap,n)}return null};Ha.propTypes={};Ha.filterProps=["rowGap"];const cx=Ie({prop:"gridColumn"}),dx=Ie({prop:"gridRow"}),fx=Ie({prop:"gridAutoFlow"}),px=Ie({prop:"gridAutoColumns"}),mx=Ie({prop:"gridAutoRows"}),hx=Ie({prop:"gridTemplateColumns"}),gx=Ie({prop:"gridTemplateRows"}),yx=Ie({prop:"gridTemplateAreas"}),kx=Ie({prop:"gridArea"});ja(Ba,Ua,Ha,cx,dx,fx,px,mx,hx,gx,yx,kx);function Hr(e,t){return t==="grey"?t:e}const wx=Ie({prop:"color",themeKey:"palette",transform:Hr}),bx=Ie({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Hr}),xx=Ie({prop:"backgroundColor",themeKey:"palette",transform:Hr});ja(wx,bx,xx);function wt(e){return e<=1&&e!==0?`${e*100}%`:e}const vx=Ie({prop:"width",transform:wt}),yd=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||md[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:wt(n)}};return xn(e,e.maxWidth,t)}return null};yd.filterProps=["maxWidth"];const Sx=Ie({prop:"minWidth",transform:wt}),Cx=Ie({prop:"height",transform:wt}),Ex=Ie({prop:"maxHeight",transform:wt}),Tx=Ie({prop:"minHeight",transform:wt});Ie({prop:"size",cssProperty:"width",transform:wt});Ie({prop:"size",cssProperty:"height",transform:wt});const Px=Ie({prop:"boxSizing"});ja(vx,yd,Sx,Cx,Ex,Tx,Px);const _x={border:{themeKey:"borders",transform:Ot},borderTop:{themeKey:"borders",transform:Ot},borderRight:{themeKey:"borders",transform:Ot},borderBottom:{themeKey:"borders",transform:Ot},borderLeft:{themeKey:"borders",transform:Ot},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ot},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:$a},color:{themeKey:"palette",transform:Hr},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Hr},backgroundColor:{themeKey:"palette",transform:Hr},p:{style:Pe},pt:{style:Pe},pr:{style:Pe},pb:{style:Pe},pl:{style:Pe},px:{style:Pe},py:{style:Pe},padding:{style:Pe},paddingTop:{style:Pe},paddingRight:{style:Pe},paddingBottom:{style:Pe},paddingLeft:{style:Pe},paddingX:{style:Pe},paddingY:{style:Pe},paddingInline:{style:Pe},paddingInlineStart:{style:Pe},paddingInlineEnd:{style:Pe},paddingBlock:{style:Pe},paddingBlockStart:{style:Pe},paddingBlockEnd:{style:Pe},m:{style:Te},mt:{style:Te},mr:{style:Te},mb:{style:Te},ml:{style:Te},mx:{style:Te},my:{style:Te},margin:{style:Te},marginTop:{style:Te},marginRight:{style:Te},marginBottom:{style:Te},marginLeft:{style:Te},marginX:{style:Te},marginY:{style:Te},marginInline:{style:Te},marginInlineStart:{style:Te},marginInlineEnd:{style:Te},marginBlock:{style:Te},marginBlockStart:{style:Te},marginBlockEnd:{style:Te},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ba},rowGap:{style:Ha},columnGap:{style:Ua},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:wt},maxWidth:{style:yd},minWidth:{transform:wt},height:{transform:wt},maxHeight:{transform:wt},minHeight:{transform:wt},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},dy=_x;function Rx(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Ix(e,t){return typeof e=="function"?e(t):e}function Ox(){function e(n,r,o,i){const l={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:s=n,themeKey:u,transform:d,style:c}=a;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=Da(o,u)||{};return c?c(l):xn(l,r,m=>{let y=Jl(f,d,m);return m===y&&typeof m=="string"&&(y=Jl(f,d,`${n}${m==="default"?"":zo(m)}`,m)),s===!1?y:{[s]:y}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const l=(r=i.unstable_sxConfig)!=null?r:dy;function a(s){let u=s;if(typeof s=="function")u=s(i);else if(typeof s!="object")return s;if(!u)return null;const d=Hb(i.breakpoints),c=Object.keys(d);let f=d;return Object.keys(u).forEach(p=>{const m=Ix(u[p],i);if(m!=null)if(typeof m=="object")if(l[p])f=Mo(f,e(p,m,i,l));else{const y=xn({theme:i},m,S=>({[p]:S}));Rx(y,m)?f[p]=t({sx:m,theme:i}):f=Mo(f,y)}else f=Mo(f,e(p,m,i,l))}),Vb(c,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const kd=Ox();kd.filterProps=["sx"];function Ax(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Lx=["breakpoints","palette","spacing","shape"];function wd(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,l=gr(e,Lx),a=$b(n),s=Xb(o);let u=Zr({breakpoints:a,direction:"ltr",components:{},palette:Q({mode:"light"},r),spacing:s,shape:Q({},Ub,i)},l);return u.applyStyles=Ax,u=t.reduce((d,c)=>Zr(d,c),u),u.unstable_sxConfig=Q({},dy,l==null?void 0:l.unstable_sxConfig),u.unstable_sx=function(c){return kd({sx:c,theme:this})},u}function zx(e){return Object.keys(e).length===0}function fy(e=null){const t=R.useContext(dd);return!t||zx(t)?e:t}function py(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=py(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Qu(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=py(e))&&(r&&(r+=" "),r+=t);return r}const Mx=["variant"];function mp(e){return e.length===0}function my(e){const{variant:t}=e,n=gr(e,Mx);let r=t||"";return Object.keys(n).sort().forEach(o=>{o==="color"?r+=mp(r)?e[o]:zo(e[o]):r+=`${mp(r)?o:zo(o)}${zo(e[o].toString())}`}),r}const Fx=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Nx(e){return Object.keys(e).length===0}function Dx(e){return typeof e=="string"&&e.charCodeAt(0)>96}const jx=(e,t)=>t.components&&t.components[e]&&t.components[e].styleOverrides?t.components[e].styleOverrides:null,Zl=e=>{let t=0;const n={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${t}`,t+=1):o=my(r.props),n[o]=r.style}),n},$x=(e,t)=>{let n=[];return t&&t.components&&t.components[e]&&t.components[e].variants&&(n=t.components[e].variants),Zl(n)},ea=(e,t,n)=>{const{ownerState:r={}}=e,o=[];let i=0;return n&&n.forEach(l=>{let a=!0;if(typeof l.props=="function"){const s=Q({},e,r);a=l.props(s)}else Object.keys(l.props).forEach(s=>{r[s]!==l.props[s]&&e[s]!==l.props[s]&&(a=!1)});a&&(typeof l.props=="function"?o.push(t[`callback${i}`]):o.push(t[my(l.props)])),typeof l.props=="function"&&(i+=1)}),o},Bx=(e,t,n,r)=>{var o;const i=n==null||(o=n.components)==null||(o=o[r])==null?void 0:o.variants;return ea(e,t,i)};function Es(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ux=wd(),Hx=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function vl({defaultTheme:e,theme:t,themeId:n}){return Nx(t)?e:t[n]||t}function Vx(e){return e?(t,n)=>n[e]:null}const hp=({styledArg:e,props:t,defaultTheme:n,themeId:r})=>{const o=e(Q({},t,{theme:vl(Q({},t,{defaultTheme:n,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const l=ea(t,Zl(i),i);return[o,...l]}return o};function Wx(e={}){const{themeId:t,defaultTheme:n=Ux,rootShouldForwardProp:r=Es,slotShouldForwardProp:o=Es}=e,i=l=>kd(Q({},l,{theme:vl(Q({},l,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(l,a={})=>{Pb(l,C=>C.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:s,slot:u,skipVariantsResolver:d,skipSx:c,overridesResolver:f=Vx(Hx(u))}=a,p=gr(a,Fx),m=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,y=c||!1;let S,g=Es;u==="Root"||u==="root"?g=r:u?g=o:Dx(l)&&(g=void 0);const h=Tb(l,Q({shouldForwardProp:g,label:S},p)),k=(C,...T)=>{const v=T?T.map(w=>{if(typeof w=="function"&&w.__emotion_real!==w)return I=>hp({styledArg:w,props:I,defaultTheme:n,themeId:t});if(On(w)){let I=w,L;return w&&w.variants&&(L=w.variants,delete I.variants,I=B=>{let V=w;return ea(B,Zl(L),L).forEach(A=>{V=Zr(V,A)}),V}),I}return w}):[];let E=C;if(On(C)){let w;C&&C.variants&&(w=C.variants,delete E.variants,E=I=>{let L=C;return ea(I,Zl(w),w).forEach(V=>{L=Zr(L,V)}),L})}else typeof C=="function"&&C.__emotion_real!==C&&(E=w=>hp({styledArg:C,props:w,defaultTheme:n,themeId:t}));s&&f&&v.push(w=>{const I=vl(Q({},w,{defaultTheme:n,themeId:t})),L=jx(s,I);if(L){const B={};return Object.entries(L).forEach(([V,D])=>{B[V]=typeof D=="function"?D(Q({},w,{theme:I})):D}),f(w,B)}return null}),s&&!m&&v.push(w=>{const I=vl(Q({},w,{defaultTheme:n,themeId:t}));return Bx(w,$x(s,I),I,s)}),y||v.push(i);const P=v.length-T.length;if(Array.isArray(C)&&P>0){const w=new Array(P).fill("");E=[...C,...w],E.raw=[...C.raw,...w]}const M=h(E,...v);return l.muiName&&(M.muiName=l.muiName),M};return h.withConfig&&(k.withConfig=h.withConfig),k}}const ve=Wx();function Kx(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:ay(t.components[n].defaultProps,r)}const Qx=R.createContext(null),hy=Qx;function gy(){return R.useContext(hy)}const qx=typeof Symbol=="function"&&Symbol.for,Gx=qx?Symbol.for("mui.nested"):"__THEME_NESTED__";function Yx(e,t){return typeof t=="function"?t(e):Q({},e,t)}function Xx(e){const{children:t,theme:n}=e,r=gy(),o=R.useMemo(()=>{const i=r===null?n:Yx(r,n);return i!=null&&(i[Gx]=r!==null),i},[n,r]);return z.jsx(hy.Provider,{value:o,children:t})}const gp={};function yp(e,t,n,r=!1){return R.useMemo(()=>{const o=e&&t[e]||t;if(typeof n=="function"){const i=n(o),l=e?Q({},t,{[e]:i}):i;return r?()=>l:l}return e?Q({},t,{[e]:n}):Q({},t,n)},[e,t,n,r])}function Jx(e){const{children:t,theme:n,themeId:r}=e,o=fy(gp),i=gy()||gp,l=yp(r,o,n),a=yp(r,i,n,!0);return z.jsx(Xx,{theme:a,children:z.jsx(dd.Provider,{value:l,children:t})})}function Zx(e,t,n,r,o){const[i,l]=R.useState(()=>o&&n?n(e).matches:r?r(e).matches:t);return Xl(()=>{let a=!0;if(!n)return;const s=n(e),u=()=>{a&&l(s.matches)};return u(),s.addListener(u),()=>{a=!1,s.removeListener(u)}},[e,n]),i}const yy=R.useSyncExternalStore;function ev(e,t,n,r,o){const i=R.useCallback(()=>t,[t]),l=R.useMemo(()=>{if(o&&n)return()=>n(e).matches;if(r!==null){const{matches:d}=r(e);return()=>d}return i},[i,e,r,o,n]),[a,s]=R.useMemo(()=>{if(n===null)return[i,()=>()=>{}];const d=n(e);return[()=>d.matches,c=>(d.addListener(c),()=>{d.removeListener(c)})]},[i,n,e]);return yy(s,a,l)}function tv(e,t={}){const n=fy(),r=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:o=!1,matchMedia:i=r?window.matchMedia:null,ssrMatchMedia:l=null,noSsr:a=!1}=Kx({name:"MuiUseMediaQuery",props:t,theme:n});let s=typeof e=="function"?e(n):e;return s=s.replace(/^@media( ?)/m,""),(yy!==void 0?ev:Zx)(s,o,i,l,a)}const ky="base";function nv(e){return`${ky}--${e}`}function rv(e,t){return`${ky}-${e}-${t}`}function bd(e,t){const n=Nb[t];return n?nv(n):rv(e,t)}function wy(e,t){const n={};return t.forEach(r=>{n[r]=bd(e,r)}),n}const by="Button";function ov(e){return bd(by,e)}wy(by,["root","active","disabled","focusVisible"]);function ta(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function iv(e={}){const{disabled:t=!1,focusableWhenDisabled:n,href:r,rootRef:o,tabIndex:i,to:l,type:a}=e,s=R.useRef(),[u,d]=R.useState(!1),{isFocusVisibleRef:c,onFocus:f,onBlur:p,ref:m}=Mb(),[y,S]=R.useState(!1);t&&!n&&y&&S(!1),R.useEffect(()=>{c.current=y},[y,c]);const[g,h]=R.useState(""),k=D=>A=>{var $;y&&A.preventDefault(),($=D.onMouseLeave)==null||$.call(D,A)},C=D=>A=>{var $;p(A),c.current===!1&&S(!1),($=D.onBlur)==null||$.call(D,A)},T=D=>A=>{var $;if(s.current||(s.current=A.currentTarget),f(A),c.current===!0){var O;S(!0),(O=D.onFocusVisible)==null||O.call(D,A)}($=D.onFocus)==null||$.call(D,A)},v=()=>{const D=s.current;return g==="BUTTON"||g==="INPUT"&&["button","submit","reset"].includes(D==null?void 0:D.type)||g==="A"&&(D==null?void 0:D.href)},E=D=>A=>{if(!t){var $;($=D.onClick)==null||$.call(D,A)}},P=D=>A=>{var $;t||(d(!0),document.addEventListener("mouseup",()=>{d(!1)},{once:!0})),($=D.onMouseDown)==null||$.call(D,A)},M=D=>A=>{var $;if(($=D.onKeyDown)==null||$.call(D,A),!A.defaultMuiPrevented&&(A.target===A.currentTarget&&!v()&&A.key===" "&&A.preventDefault(),A.target===A.currentTarget&&A.key===" "&&!t&&d(!0),A.target===A.currentTarget&&!v()&&A.key==="Enter"&&!t)){var O;(O=D.onClick)==null||O.call(D,A),A.preventDefault()}},w=D=>A=>{var $;if(A.target===A.currentTarget&&d(!1),($=D.onKeyUp)==null||$.call(D,A),A.target===A.currentTarget&&!v()&&!t&&A.key===" "&&!A.defaultMuiPrevented){var O;(O=D.onClick)==null||O.call(D,A)}},I=R.useCallback(D=>{var A;h((A=D==null?void 0:D.tagName)!=null?A:"")},[]),L=Ci(I,o,m,s),B={};return i!==void 0&&(B.tabIndex=i),g==="BUTTON"?(B.type=a??"button",n?B["aria-disabled"]=t:B.disabled=t):g!==""&&(!r&&!l&&(B.role="button",B.tabIndex=i??0),t&&(B["aria-disabled"]=t,B.tabIndex=n?i??0:-1)),{getRootProps:(D={})=>{const A=Q({},ta(e),ta(D)),$=Q({type:a},A,B,D,{onBlur:C(A),onClick:E(A),onFocus:T(A),onKeyDown:M(A),onKeyUp:w(A),onMouseDown:P(A),onMouseLeave:k(A),ref:L});return delete $.onFocusVisible,$},focusVisible:y,setFocusVisible:S,active:u,rootRef:L}}function lv(e){return typeof e=="string"}function av(e,t,n){return e===void 0||lv(e)?t:Q({},t,{ownerState:Q({},t.ownerState,n)})}const sv={disableDefaultClasses:!1},uv=R.createContext(sv);function xy(e){const{disableDefaultClasses:t}=R.useContext(uv);return n=>t?"":e(n)}function cv(e,t,n){return typeof e=="function"?e(t,n):e}function kp(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dv(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const p=Qu(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),m=Q({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),y=Q({},n,o,r);return p.length>0&&(y.className=p),Object.keys(m).length>0&&(y.style=m),{props:y,internalRef:void 0}}const l=ta(Q({},o,r)),a=kp(r),s=kp(o),u=t(l),d=Qu(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),c=Q({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=Q({},u,n,s,a);return d.length>0&&(f.className=d),Object.keys(c).length>0&&(f.style=c),{props:f,internalRef:u.ref}}const fv=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function qu(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,l=gr(e,fv),a=i?{}:cv(r,o),{props:s,internalRef:u}=dv(Q({},l,{externalSlotProps:a})),d=Ci(u,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return av(n,Q({},s,{ref:d}),o)}const pv=["action","children","disabled","focusableWhenDisabled","onFocusVisible","slotProps","slots"],mv=e=>{const{active:t,disabled:n,focusVisible:r}=e;return sy({root:["root",n&&"disabled",r&&"focusVisible",t&&"active"]},xy(ov))},hv=R.forwardRef(function(t,n){var r;const{action:o,children:i,focusableWhenDisabled:l=!1,slotProps:a={},slots:s={}}=t,u=gr(t,pv),d=R.useRef(),{active:c,focusVisible:f,setFocusVisible:p,getRootProps:m}=iv(Q({},t,{focusableWhenDisabled:l}));R.useImperativeHandle(o,()=>({focusVisible:()=>{p(!0),d.current.focus()}}),[p]);const y=Q({},t,{active:c,focusableWhenDisabled:l,focusVisible:f}),S=mv(y),g=u.href||u.to?"a":"button",h=(r=s.root)!=null?r:g,k=qu({elementType:h,getSlotProps:m,externalForwardedProps:u,externalSlotProps:a.root,additionalProps:{ref:n},ownerState:y,className:S.root});return z.jsx(h,Q({},k,{children:i}))}),gv=ve("button")(({theme:e})=>ke({display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,padding:"8px 16px",borderRadius:e.shape.borderRadius,transition:"all 150ms ease",cursor:"pointer",background:e.palette.background,border:`1px solid ${e.palette.border}`,color:e.palette.primary,boxShadow:"0 1px 2px 0 rgb(0 0 0 / 0.05)",position:"fixed",bottom:"24px",right:"24px","&:hover":{borderColor:e.palette.ring},"&:active":{borderColor:e.palette.ring}})),vy=ve(hv)(({theme:e})=>ke({display:"inline-flex",alignItems:"center",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring},"&.Mui-focusVisible":{outline:"none"},"&.Mui-disabled":{backgroundColor:e.palette.muted,color:"grey",cursor:"default",border:"0"}}));function yv(e){return typeof e=="function"?e():e}const kv=R.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[l,a]=R.useState(null),s=Ci(R.isValidElement(r)?r.ref:null,n);if(Xl(()=>{i||a(yv(o)||document.body)},[o,i]),Xl(()=>{if(l&&!i)return Wu(n,l),()=>{Wu(n,null)}},[n,l,i]),i){if(R.isValidElement(r)){const u={ref:s};return R.cloneElement(r,u)}return z.jsx(R.Fragment,{children:r})}return z.jsx(R.Fragment,{children:l&&$g.createPortal(r,l)})});function wv(e){const t=Hn(e);return t.body===e?fd(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Fo(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function wp(e){return parseInt(fd(e).getComputedStyle(e).paddingRight,10)||0}function bv(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function bp(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,l=>{const a=i.indexOf(l)===-1,s=!bv(l);a&&s&&Fo(l,o)})}function Ts(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function xv(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(wv(r)){const l=Fb(Hn(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${wp(r)+l}px`;const a=Hn(r).querySelectorAll(".mui-fixed");[].forEach.call(a,s=>{n.push({value:s.style.paddingRight,property:"padding-right",el:s}),s.style.paddingRight=`${wp(s)+l}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Hn(r).body;else{const l=r.parentElement,a=fd(r);i=(l==null?void 0:l.nodeName)==="HTML"&&a.getComputedStyle(l).overflowY==="scroll"?l:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:l,property:a})=>{i?l.style.setProperty(a,i):l.style.removeProperty(a)})}}function vv(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Sv{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Fo(t.modalRef,!1);const o=vv(n);bp(n,t.mount,t.modalRef,o,!0);const i=Ts(this.containers,l=>l.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Ts(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=xv(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Ts(this.containers,l=>l.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&Fo(t.modalRef,n),bp(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const l=i.modals[i.modals.length-1];l.modalRef&&Fo(l.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Cv(e){return typeof e=="function"?e():e}function Ev(e){return e?e.props.hasOwnProperty("in"):!1}const Tv=new Sv;function Pv(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Tv,closeAfterTransition:i=!1,onTransitionEnter:l,onTransitionExited:a,children:s,onClose:u,open:d,rootRef:c}=e,f=R.useRef({}),p=R.useRef(null),m=R.useRef(null),y=Ci(m,c),[S,g]=R.useState(!d),h=Ev(s);let k=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(k=!1);const C=()=>Hn(p.current),T=()=>(f.current.modalRef=m.current,f.current.mount=p.current,f.current),v=()=>{o.mount(T(),{disableScrollLock:r}),m.current&&(m.current.scrollTop=0)},E=dp(()=>{const A=Cv(t)||C().body;o.add(T(),A),m.current&&v()}),P=R.useCallback(()=>o.isTopModal(T()),[o]),M=dp(A=>{p.current=A,A&&(d&&P()?v():m.current&&Fo(m.current,k))}),w=R.useCallback(()=>{o.remove(T(),k)},[k,o]);R.useEffect(()=>()=>{w()},[w]),R.useEffect(()=>{d?E():(!h||!i)&&w()},[d,w,h,i,E]);const I=A=>$=>{var O;(O=A.onKeyDown)==null||O.call(A,$),!($.key!=="Escape"||$.which===229||!P())&&(n||($.stopPropagation(),u&&u($,"escapeKeyDown")))},L=A=>$=>{var O;(O=A.onClick)==null||O.call(A,$),$.target===$.currentTarget&&u&&u($,"backdropClick")};return{getRootProps:(A={})=>{const $=ta(e);delete $.onTransitionEnter,delete $.onTransitionExited;const O=Q({},$,A);return Q({role:"presentation"},O,{onKeyDown:I(O),ref:y})},getBackdropProps:(A={})=>{const $=A;return Q({"aria-hidden":!0},$,{onClick:L($),open:d})},getTransitionProps:()=>{const A=()=>{g(!1),l&&l()},$=()=>{g(!0),a&&a(),i&&w()};return{onEnter:cp(A,s==null?void 0:s.props.onEnter),onExited:cp($,s==null?void 0:s.props.onExited)}},rootRef:y,portalRef:M,isTopModal:P,exited:S,hasTransition:h}}const _v=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Rv(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Iv(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ov(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Iv(e))}function Av(e){const t=[],n=[];return Array.from(e.querySelectorAll(_v)).forEach((r,o)=>{const i=Rv(r);i===-1||!Ov(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Lv(){return!0}function zv(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Av,isEnabled:l=Lv,open:a}=e,s=R.useRef(!1),u=R.useRef(null),d=R.useRef(null),c=R.useRef(null),f=R.useRef(null),p=R.useRef(!1),m=R.useRef(null),y=Ci(t.ref,m),S=R.useRef(null);R.useEffect(()=>{!a||!m.current||(p.current=!n)},[n,a]),R.useEffect(()=>{if(!a||!m.current)return;const k=Hn(m.current);return m.current.contains(k.activeElement)||(m.current.hasAttribute("tabIndex")||m.current.setAttribute("tabIndex","-1"),p.current&&m.current.focus()),()=>{o||(c.current&&c.current.focus&&(s.current=!0,c.current.focus()),c.current=null)}},[a]),R.useEffect(()=>{if(!a||!m.current)return;const k=Hn(m.current),C=E=>{S.current=E,!(r||!l()||E.key!=="Tab")&&k.activeElement===m.current&&E.shiftKey&&(s.current=!0,d.current&&d.current.focus())},T=()=>{const E=m.current;if(E===null)return;if(!k.hasFocus()||!l()||s.current){s.current=!1;return}if(E.contains(k.activeElement)||r&&k.activeElement!==u.current&&k.activeElement!==d.current)return;if(k.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!p.current)return;let P=[];if((k.activeElement===u.current||k.activeElement===d.current)&&(P=i(m.current)),P.length>0){var M,w;const I=!!((M=S.current)!=null&&M.shiftKey&&((w=S.current)==null?void 0:w.key)==="Tab"),L=P[0],B=P[P.length-1];typeof L!="string"&&typeof B!="string"&&(I?B.focus():L.focus())}else E.focus()};k.addEventListener("focusin",T),k.addEventListener("keydown",C,!0);const v=setInterval(()=>{k.activeElement&&k.activeElement.tagName==="BODY"&&T()},50);return()=>{clearInterval(v),k.removeEventListener("focusin",T),k.removeEventListener("keydown",C,!0)}},[n,r,o,l,a,i]);const g=k=>{c.current===null&&(c.current=k.relatedTarget),p.current=!0,f.current=k.target;const C=t.props.onFocus;C&&C(k)},h=k=>{c.current===null&&(c.current=k.relatedTarget),p.current=!0};return z.jsxs(R.Fragment,{children:[z.jsx("div",{tabIndex:a?0:-1,onFocus:h,ref:u,"data-testid":"sentinelStart"}),R.cloneElement(t,{ref:y,onFocus:g}),z.jsx("div",{tabIndex:a?0:-1,onFocus:h,ref:d,"data-testid":"sentinelEnd"})]})}const Sy="Modal";function Mv(e){return bd(Sy,e)}wy(Sy,["root","hidden","backdrop"]);const Fv=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],Nv=e=>{const{open:t,exited:n}=e;return sy({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},xy(Mv))},Dv=R.forwardRef(function(t,n){var r;const{children:o,closeAfterTransition:i=!1,container:l,disableAutoFocus:a=!1,disableEnforceFocus:s=!1,disableEscapeKeyDown:u=!1,disablePortal:d=!1,disableRestoreFocus:c=!1,disableScrollLock:f=!1,hideBackdrop:p=!1,keepMounted:m=!1,onBackdropClick:y,open:S,slotProps:g={},slots:h={}}=t,k=gr(t,Fv),C=Q({},t,{closeAfterTransition:i,disableAutoFocus:a,disableEnforceFocus:s,disableEscapeKeyDown:u,disablePortal:d,disableRestoreFocus:c,disableScrollLock:f,hideBackdrop:p,keepMounted:m}),{getRootProps:T,getBackdropProps:v,getTransitionProps:E,portalRef:P,isTopModal:M,exited:w,hasTransition:I}=Pv(Q({},C,{rootRef:n})),L=Q({},C,{exited:w,hasTransition:I}),B=Nv(L),V={};if(o.props.tabIndex===void 0&&(V.tabIndex="-1"),I){const{onEnter:H,onExited:b}=E();V.onEnter=H,V.onExited=b}const D=(r=h.root)!=null?r:"div",A=qu({elementType:D,externalSlotProps:g.root,externalForwardedProps:k,getSlotProps:T,className:B.root,ownerState:L}),$=h.backdrop,O=qu({elementType:$,externalSlotProps:g.backdrop,getSlotProps:H=>v(Q({},H,{onClick:b=>{y&&y(b),H!=null&&H.onClick&&H.onClick(b)}})),className:B.backdrop,ownerState:L});return!m&&!S&&(!I||w)?null:z.jsx(kv,{ref:P,container:l,disablePortal:d,children:z.jsxs(D,Q({},A,{children:[!p&&$?z.jsx($,Q({},O)):null,z.jsx(zv,{disableEnforceFocus:s,disableAutoFocus:a,disableRestoreFocus:c,isEnabled:M,open:S,children:R.cloneElement(o,V)})]}))})}),Cy=R.forwardRef((e,t)=>{const{open:n,className:r,...o}=e;return z.jsx("div",{className:Qu({"base-Backdrop-open":n},r),ref:t,...o})});Cy.propTypes={className:up.string.isRequired,open:up.bool};const jv=ve(Dv)({position:"fixed",zIndex:1300,inset:0,display:"flex",alignItems:"center",justifyContent:"center"}),$v=ve(Cy)(({theme:e})=>ke({zIndex:-1,position:"fixed",inset:0,backgroundColor:e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)",WebkitTapHighlightColor:"transparent"})),Bv=ve("div")(({theme:e})=>ke({fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:500,textAlign:"start",position:"relative",display:"flex",flexDirection:"column",gap:"8px",overflow:"hidden",backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius,border:`1px solid ${e.palette.border}`,boxShadow:`0 4px 12px ${e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)"}`,padding:"24px",color:e.palette.primary})),Uv=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px","& .modal-title":{fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"},"& .modal-description":{margin:0,lineHeight:"1.5rem",fontWeight:400,color:e.palette.muted,marginBottom:"4px"}})),Hv=ve("h2")(()=>ke({display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"}));var Ey={exports:{}},Ty={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eo=R;function Vv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Wv=typeof Object.is=="function"?Object.is:Vv,Kv=eo.useState,Qv=eo.useEffect,qv=eo.useLayoutEffect,Gv=eo.useDebugValue;function Yv(e,t){var n=t(),r=Kv({inst:{value:n,getSnapshot:t}}),o=r[0].inst,i=r[1];return qv(function(){o.value=n,o.getSnapshot=t,Ps(o)&&i({inst:o})},[e,n,t]),Qv(function(){return Ps(o)&&i({inst:o}),e(function(){Ps(o)&&i({inst:o})})},[e]),Gv(n),n}function Ps(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Wv(e,n)}catch{return!0}}function Xv(e,t){return t()}var Jv=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Xv:Yv;Ty.useSyncExternalStore=eo.useSyncExternalStore!==void 0?eo.useSyncExternalStore:Jv;Ey.exports=Ty;var Zv=Ey.exports;const zn=()=>{},Lt=zn(),_s=Object,ie=e=>e===Lt,hn=e=>typeof e=="function",Kn=(e,t)=>({...e,...t}),eS=e=>hn(e.then),Xi=new WeakMap;let tS=0;const ii=e=>{const t=typeof e,n=e&&e.constructor,r=n==Date;let o,i;if(_s(e)===e&&!r&&n!=RegExp){if(o=Xi.get(e),o)return o;if(o=++tS+"~",Xi.set(e,o),n==Array){for(o="@",i=0;i<e.length;i++)o+=ii(e[i])+",";Xi.set(e,o)}if(n==_s){o="#";const l=_s.keys(e).sort();for(;!ie(i=l.pop());)ie(e[i])||(o+=i+":"+ii(e[i])+",");Xi.set(e,o)}}else o=r?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return o},fn=new WeakMap,Rs={},Ji={},xd="undefined",Va=typeof window!=xd,Gu=typeof document!=xd,nS=()=>Va&&typeof window.requestAnimationFrame!=xd,Py=(e,t)=>{const n=fn.get(e);return[()=>!ie(t)&&e.get(t)||Rs,r=>{if(!ie(t)){const o=e.get(t);t in Ji||(Ji[t]=o),n[5](t,Kn(o,r),o||Rs)}},n[6],()=>!ie(t)&&t in Ji?Ji[t]:!ie(t)&&e.get(t)||Rs]};let Yu=!0;const rS=()=>Yu,[Xu,Ju]=Va&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[zn,zn],oS=()=>{const e=Gu&&document.visibilityState;return ie(e)||e!=="hidden"},iS=e=>(Gu&&document.addEventListener("visibilitychange",e),Xu("focus",e),()=>{Gu&&document.removeEventListener("visibilitychange",e),Ju("focus",e)}),lS=e=>{const t=()=>{Yu=!0,e()},n=()=>{Yu=!1};return Xu("online",t),Xu("offline",n),()=>{Ju("online",t),Ju("offline",n)}},aS={isOnline:rS,isVisible:oS},sS={initFocus:iS,initReconnect:lS},xp=!ki.useId,li=!Va||"Deno"in window,uS=e=>nS()?window.requestAnimationFrame(e):setTimeout(e,1),Is=li?R.useEffect:R.useLayoutEffect,Os=typeof navigator<"u"&&navigator.connection,vp=!li&&Os&&(["slow-2g","2g"].includes(Os.effectiveType)||Os.saveData),vd=e=>{if(hn(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?ii(e):"",[e,t]};let cS=0;const Zu=()=>++cS,_y=0,Ry=1,Iy=2,dS=3;var wo={__proto__:null,ERROR_REVALIDATE_EVENT:dS,FOCUS_EVENT:_y,MUTATE_EVENT:Iy,RECONNECT_EVENT:Ry};async function Oy(...e){const[t,n,r,o]=e,i=Kn({populateCache:!0,throwOnError:!0},typeof o=="boolean"?{revalidate:o}:o||{});let l=i.populateCache;const a=i.rollbackOnError;let s=i.optimisticData;const u=i.revalidate!==!1,d=p=>typeof a=="function"?a(p):a!==!1,c=i.throwOnError;if(hn(n)){const p=n,m=[],y=t.keys();for(const S of y)!/^\$(inf|sub)\$/.test(S)&&p(t.get(S)._k)&&m.push(S);return Promise.all(m.map(f))}return f(n);async function f(p){const[m]=vd(p);if(!m)return;const[y,S]=Py(t,m),[g,h,k,C]=fn.get(t),T=g[m],v=()=>u&&(delete k[m],delete C[m],T&&T[0])?T[0](Iy).then(()=>y().data):y().data;if(e.length<3)return v();let E=r,P;const M=Zu();h[m]=[M,0];const w=!ie(s),I=y(),L=I.data,B=I._c,V=ie(B)?L:B;if(w&&(s=hn(s)?s(V,L):s,S({data:s,_c:V})),hn(E))try{E=E(V)}catch(A){P=A}if(E&&eS(E))if(E=await E.catch(A=>{P=A}),M!==h[m][0]){if(P)throw P;return E}else P&&w&&d(P)&&(l=!0,E=V,S({data:E,_c:Lt}));l&&(P||(hn(l)&&(E=l(E,V)),S({data:E,error:Lt,_c:Lt}))),h[m][1]=Zu();const D=await v();if(S({_c:Lt}),P){if(c)throw P;return}return l?D:E}}const Sp=(e,t)=>{for(const n in e)e[n][0]&&e[n][0](t)},fS=(e,t)=>{if(!fn.has(e)){const n=Kn(sS,t),r={},o=Oy.bind(Lt,e);let i=zn;const l={},a=(d,c)=>{const f=l[d]||[];return l[d]=f,f.push(c),()=>f.splice(f.indexOf(c),1)},s=(d,c,f)=>{e.set(d,c);const p=l[d];if(p)for(const m of p)m(c,f)},u=()=>{if(!fn.has(e)&&(fn.set(e,[r,{},{},{},o,s,a]),!li)){const d=n.initFocus(setTimeout.bind(Lt,Sp.bind(Lt,r,_y))),c=n.initReconnect(setTimeout.bind(Lt,Sp.bind(Lt,r,Ry)));i=()=>{d&&d(),c&&c(),fn.delete(e)}}};return u(),[e,o,u,i]}return[e,fn.get(e)[4]]},pS=(e,t,n,r,o)=>{const i=n.errorRetryCount,l=o.retryCount,a=~~((Math.random()+.5)*(1<<(l<8?l:8)))*n.errorRetryInterval;!ie(i)&&l>i||setTimeout(r,a,o)},mS=(e,t)=>ii(e)==ii(t),[Ay,hS]=fS(new Map),gS=Kn({onLoadingSlow:zn,onSuccess:zn,onError:zn,onErrorRetry:pS,onDiscarded:zn,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:vp?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:vp?5e3:3e3,compare:mS,isPaused:()=>!1,cache:Ay,mutate:hS,fallback:{}},aS),yS=(e,t)=>{const n=Kn(e,t);if(t){const{use:r,fallback:o}=e,{use:i,fallback:l}=t;r&&i&&(n.use=r.concat(i)),o&&l&&(n.fallback=Kn(o,l))}return n},kS=R.createContext({}),Ly=Va&&window.__SWR_DEVTOOLS_USE__,wS=Ly?window.__SWR_DEVTOOLS_USE__:[],bS=()=>{Ly&&(window.__SWR_DEVTOOLS_REACT__=ki)},xS=e=>hn(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}],vS=()=>Kn(gS,R.useContext(kS)),SS=e=>(t,n,r)=>e(t,n&&((...i)=>{const[l]=vd(t),[,,,a]=fn.get(Ay),s=a[l];return ie(s)?n(...i):(delete a[l],s)}),r),CS=wS.concat(SS),ES=e=>function(...n){const r=vS(),[o,i,l]=xS(n),a=yS(r,l);let s=e;const{use:u}=a,d=(u||[]).concat(CS);for(let c=d.length;c--;)s=d[c](s);return s(o,i||a.fetcher||null,a)},TS=(e,t,n)=>{const r=t[e]||(t[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o>=0&&(r[o]=r[r.length-1],r.pop())}};bS();const Cp=ki.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)}),As={dedupe:!0},PS=(e,t,n)=>{const{cache:r,compare:o,suspense:i,fallbackData:l,revalidateOnMount:a,revalidateIfStale:s,refreshInterval:u,refreshWhenHidden:d,refreshWhenOffline:c,keepPreviousData:f}=n,[p,m,y,S]=fn.get(r),[g,h]=vd(e),k=R.useRef(!1),C=R.useRef(!1),T=R.useRef(g),v=R.useRef(t),E=R.useRef(n),P=()=>E.current,M=()=>P().isVisible()&&P().isOnline(),[w,I,L,B]=Py(r,g),V=R.useRef({}).current,D=ie(l)?n.fallback[g]:l,A=(de,fe)=>{for(const Me in V){const be=Me;if(be==="data"){if(!o(de[be],fe[be])&&(!ie(de[be])||!o(we,fe[be])))return!1}else if(fe[be]!==de[be])return!1}return!0},$=R.useMemo(()=>{const de=!g||!t?!1:ie(a)?P().isPaused()||i?!1:ie(s)?!0:s:a,fe=De=>{const $t=Kn(De);return delete $t._k,de?{isValidating:!0,isLoading:!0,...$t}:$t},Me=w(),be=B(),ht=fe(Me),Cn=Me===be?ht:fe(be);let Oe=ht;return[()=>{const De=fe(w());return A(De,Oe)?(Oe.data=De.data,Oe.isLoading=De.isLoading,Oe.isValidating=De.isValidating,Oe.error=De.error,Oe):(Oe=De,De)},()=>Cn]},[r,g]),O=Zv.useSyncExternalStore(R.useCallback(de=>L(g,(fe,Me)=>{A(Me,fe)||de()}),[r,g]),$[0],$[1]),H=!k.current,b=p[g]&&p[g].length>0,Y=O.data,W=ie(Y)?D:Y,x=O.error,re=R.useRef(W),we=f?ie(Y)?re.current:Y:W,ee=b&&!ie(x)?!1:H&&!ie(a)?a:P().isPaused()?!1:i?ie(W)?!1:s:ie(W)||s,Ue=!!(g&&t&&H&&ee),it=ie(O.isValidating)?Ue:O.isValidating,_t=ie(O.isLoading)?Ue:O.isLoading,mt=R.useCallback(async de=>{const fe=v.current;if(!g||!fe||C.current||P().isPaused())return!1;let Me,be,ht=!0;const Cn=de||{},Oe=!y[g]||!Cn.dedupe,De=()=>xp?!C.current&&g===T.current&&k.current:g===T.current,$t={isValidating:!1,isLoading:!1},Ii=()=>{I($t)},Oi=()=>{const lt=y[g];lt&&lt[1]===be&&delete y[g]},Ai={isValidating:!0};ie(w().data)&&(Ai.isLoading=!0);try{if(Oe&&(I(Ai),n.loadingTimeout&&ie(w().data)&&setTimeout(()=>{ht&&De()&&P().onLoadingSlow(g,n)},n.loadingTimeout),y[g]=[fe(h),Zu()]),[Me,be]=y[g],Me=await Me,Oe&&setTimeout(Oi,n.dedupingInterval),!y[g]||y[g][1]!==be)return Oe&&De()&&P().onDiscarded(g),!1;$t.error=Lt;const lt=m[g];if(!ie(lt)&&(be<=lt[0]||be<=lt[1]||lt[1]===0))return Ii(),Oe&&De()&&P().onDiscarded(g),!1;const _=w().data;$t.data=o(_,Me)?_:Me,Oe&&De()&&P().onSuccess(Me,g,n)}catch(lt){Oi();const _=P(),{shouldRetryOnError:j}=_;_.isPaused()||($t.error=lt,Oe&&De()&&(_.onError(lt,g,_),(j===!0||hn(j)&&j(lt))&&M()&&_.onErrorRetry(lt,g,_,q=>{const X=p[g];X&&X[0]&&X[0](wo.ERROR_REVALIDATE_EVENT,q)},{retryCount:(Cn.retryCount||0)+1,dedupe:!0})))}return ht=!1,Ii(),!0},[g,r]),wr=R.useCallback((...de)=>Oy(r,T.current,...de),[]);if(Is(()=>{v.current=t,E.current=n,ie(Y)||(re.current=Y)}),Is(()=>{if(!g)return;const de=mt.bind(Lt,As);let fe=0;const be=TS(g,p,(ht,Cn={})=>{if(ht==wo.FOCUS_EVENT){const Oe=Date.now();P().revalidateOnFocus&&Oe>fe&&M()&&(fe=Oe+P().focusThrottleInterval,de())}else if(ht==wo.RECONNECT_EVENT)P().revalidateOnReconnect&&M()&&de();else{if(ht==wo.MUTATE_EVENT)return mt();if(ht==wo.ERROR_REVALIDATE_EVENT)return mt(Cn)}});return C.current=!1,T.current=g,k.current=!0,I({_k:h}),ee&&(ie(W)||li?de():uS(de)),()=>{C.current=!0,be()}},[g]),Is(()=>{let de;function fe(){const be=hn(u)?u(w().data):u;be&&de!==-1&&(de=setTimeout(Me,be))}function Me(){!w().error&&(d||P().isVisible())&&(c||P().isOnline())?mt(As).then(fe):fe()}return fe(),()=>{de&&(clearTimeout(de),de=-1)}},[u,d,c,g]),R.useDebugValue(we),i&&ie(W)&&g){if(!xp&&li)throw new Error("Fallback data is required when using suspense in SSR.");v.current=t,E.current=n,C.current=!1;const de=S[g];if(!ie(de)){const fe=wr(de);Cp(fe)}if(ie(x)){const fe=mt(As);ie(we)||(fe.status="fulfilled",fe.value=!0),Cp(fe)}else throw x}return{mutate:wr,get data(){return V.data=!0,we},get error(){return V.error=!0,x},get isValidating(){return V.isValidating=!0,it},get isLoading(){return V.isLoading=!0,_t}}},Zi=ES(PS);let _S=(e,t=21)=>(n=t)=>{let r="",o=n;for(;o--;)r+=e[Math.random()*e.length|0];return r};var ai={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},si={code:"1",name:"function_call",parse:e=>{if(e==null||typeof e!="object"||!("function_call"in e)||typeof e.function_call!="object"||e.function_call==null||!("name"in e.function_call)||!("arguments"in e.function_call)||typeof e.function_call.name!="string"||typeof e.function_call.arguments!="string")throw new Error('"function_call" parts expect an object with a "function_call" property.');return{type:"function_call",value:e}}},ui={code:"2",name:"data",parse:e=>{if(!Array.isArray(e))throw new Error('"data" parts expect an array value.');return{type:"data",value:e}}},ci={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},di={code:"4",name:"assistant_message",parse:e=>{if(e==null||typeof e!="object"||!("id"in e)||!("role"in e)||!("content"in e)||typeof e.id!="string"||typeof e.role!="string"||e.role!=="assistant"||!Array.isArray(e.content)||!e.content.every(t=>t!=null&&typeof t=="object"&&"type"in t&&t.type==="text"&&"text"in t&&t.text!=null&&typeof t.text=="object"&&"value"in t.text&&typeof t.text.value=="string"))throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');return{type:"assistant_message",value:e}}},fi={code:"5",name:"assistant_control_data",parse:e=>{if(e==null||typeof e!="object"||!("threadId"in e)||!("messageId"in e)||typeof e.threadId!="string"||typeof e.messageId!="string")throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');return{type:"assistant_control_data",value:{threadId:e.threadId,messageId:e.messageId}}}},pi={code:"6",name:"data_message",parse:e=>{if(e==null||typeof e!="object"||!("role"in e)||!("data"in e)||typeof e.role!="string"||e.role!=="data")throw new Error('"data_message" parts expect an object with a "role" and "data" property.');return{type:"data_message",value:e}}},mi={code:"7",name:"tool_calls",parse:e=>{if(e==null||typeof e!="object"||!("tool_calls"in e)||typeof e.tool_calls!="object"||e.tool_calls==null||!Array.isArray(e.tool_calls)||e.tool_calls.some(t=>t==null||typeof t!="object"||!("id"in t)||typeof t.id!="string"||!("type"in t)||typeof t.type!="string"||!("function"in t)||t.function==null||typeof t.function!="object"||!("arguments"in t.function)||typeof t.function.name!="string"||typeof t.function.arguments!="string"))throw new Error('"tool_calls" parts expect an object with a ToolCallPayload.');return{type:"tool_calls",value:e}}},hi={code:"8",name:"message_annotations",parse:e=>{if(!Array.isArray(e))throw new Error('"message_annotations" parts expect an array value.');return{type:"message_annotations",value:e}}},RS=[ai,si,ui,ci,di,fi,pi,mi,hi],IS={[ai.code]:ai,[si.code]:si,[ui.code]:ui,[ci.code]:ci,[di.code]:di,[fi.code]:fi,[pi.code]:pi,[mi.code]:mi,[hi.code]:hi};ai.name+"",ai.code,si.name+"",si.code,ui.name+"",ui.code,ci.name+"",ci.code,di.name+"",di.code,fi.name+"",fi.code,pi.name+"",pi.code,mi.name+"",mi.code,hi.name+"",hi.code;var OS=RS.map(e=>e.code),AS=e=>{const t=e.indexOf(":");if(t===-1)throw new Error("Failed to parse stream string. No separator found.");const n=e.slice(0,t);if(!OS.includes(n))throw new Error(`Failed to parse stream string. Invalid code ${n}.`);const r=n,o=e.slice(t+1),i=JSON.parse(o);return IS[r].parse(i)},LS=10;function zS(e,t){const n=new Uint8Array(t);let r=0;for(const o of e)n.set(o,r),r+=o.length;return e.length=0,n}async function*MS(e,{isAborted:t}={}){const n=new TextDecoder,r=[];let o=0;for(;;){const{value:i}=await e.read();if(i&&(r.push(i),o+=i.length,i[i.length-1]!==LS))continue;if(r.length===0)break;const l=zS(r,o);o=0;const a=n.decode(l,{stream:!0}).split(`
`).filter(s=>s!=="").map(AS);for(const s of a)yield s;if(t!=null&&t()){e.cancel();break}}}var zy=_S("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",7);function el(e,t){return!e||!t||!t.length?e:{...e,annotations:[...t]}}async function FS({reader:e,abortControllerRef:t,update:n,onFinish:r,generateId:o=zy,getCurrentDate:i=()=>new Date}){const l=i(),a={data:[]};let s;for await(const{type:u,value:d}of MS(e,{isAborted:()=>(t==null?void 0:t.current)===null})){u==="text"&&(a.text?a.text={...a.text,content:(a.text.content||"")+d}:a.text={id:o(),role:"assistant",content:d,createdAt:l});let c=null;u==="function_call"&&(a.function_call={id:o(),role:"assistant",content:"",function_call:d.function_call,name:d.function_call.name,createdAt:l},c=a.function_call);let f=null;u==="tool_calls"&&(a.tool_calls={id:o(),role:"assistant",content:"",tool_calls:d.tool_calls,createdAt:l},f=a.tool_calls),u==="data"&&a.data.push(...d);let p=a.text;u==="message_annotations"&&(s?s.push(...d):s=[...d],c=el(a.function_call,s),f=el(a.tool_calls,s),p=el(a.text,s)),s!=null&&s.length&&["text","function_call","tool_calls"].forEach(S=>{a[S]&&(a[S].annotations=[...s])});const m=[c,f,p].filter(Boolean).map(y=>({...el(y,s)}));n(m,[...a.data])}return r==null||r(a),{messages:[a.text,a.function_call,a.tool_calls].filter(Boolean),data:a.data}}async function NS({api:e,messages:t,body:n,credentials:r,headers:o,abortController:i,restoreMessagesOnFailure:l,onResponse:a,onUpdate:s,onFinish:u,generateId:d}){var c;const f=await fetch(e,{method:"POST",body:JSON.stringify({messages:t,...n}),headers:{"Content-Type":"application/json",...o},signal:(c=i==null?void 0:i())==null?void 0:c.signal,credentials:r}).catch(m=>{throw l(),m});if(a)try{await a(f)}catch(m){throw m}if(!f.ok)throw l(),new Error(await f.text()||"Failed to fetch the chat response.");if(!f.body)throw new Error("The response body is empty.");const p=f.body.getReader();return await FS({reader:p,abortControllerRef:i!=null?{current:i()}:void 0,update:s,onFinish(m){u&&m.text!=null&&u(m.text)},generateId:d})}async function DS({getStreamedResponse:e,experimental_onFunctionCall:t,experimental_onToolCall:n,updateChatRequest:r,getCurrentMessages:o}){for(;;){const i=await e();if("messages"in i){let l=!1;for(const a of i.messages)if(!((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))){if(l=!0,t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0){l=!1;break}r(u)}if(n){const s=a.tool_calls;if(!Array.isArray(s)||s.some(d=>typeof d!="object")){console.warn("experimental_onToolCall should not be defined when using tools");continue}const u=await n(o(),s);if(u===void 0){l=!1;break}r(u)}}if(!l)break}else{let l=function(s){for(const u of s.messages){if(u.tool_calls!==void 0)for(const d of u.tool_calls)typeof d=="object"&&d.function.arguments&&typeof d.function.arguments!="string"&&(d.function.arguments=JSON.stringify(d.function.arguments));u.function_call!==void 0&&typeof u.function_call=="object"&&u.function_call.arguments&&typeof u.function_call.arguments!="string"&&(u.function_call.arguments=JSON.stringify(u.function_call.arguments))}};const a=i;if((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))break;if(t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0)break;l(u),r(u)}if(n){const s=a.tool_calls;if(typeof s!="object"){console.warn("experimental_onToolCall should not be defined when using functions");continue}const u=await n(o(),s);if(u===void 0)break;l(u),r(u)}}}}var jS=async(e,t,n,r,o,i,l,a,s,u,d,c)=>{var f,p;const m=l.current;n(t.messages,!1);const y=c?t.messages:t.messages.map(({role:S,content:g,name:h,function_call:k,tool_calls:C,tool_call_id:T})=>({role:S,content:g,tool_call_id:T,...h!==void 0&&{name:h},...k!==void 0&&{function_call:k},...C!==void 0&&{tool_calls:C}}));if(typeof e!="string"){let h={id:s(),createdAt:new Date,content:"",role:"assistant"};async function k(C){const{content:T,ui:v,next:E}=await C;h.content=T,h.ui=await v,n([...t.messages,{...h}],!1),E&&await k(E)}try{const C=e({messages:y,data:t.data});await k(C)}catch(C){throw n(m,!1),C}return u&&u(h),h}return await NS({api:e,messages:y,body:{data:t.data,...i.current.body,...(f=t.options)==null?void 0:f.body,...t.functions!==void 0&&{functions:t.functions},...t.function_call!==void 0&&{function_call:t.function_call},...t.tools!==void 0&&{tools:t.tools},...t.tool_choice!==void 0&&{tool_choice:t.tool_choice}},credentials:i.current.credentials,headers:{...i.current.headers,...(p=t.options)==null?void 0:p.headers},abortController:()=>a.current,restoreMessagesOnFailure(){n(m,!1)},onResponse:d,onUpdate(S,g){n([...t.messages,...S],!1),r([...o||[],...g||[]],!1)},onFinish:u,generateId:s})};function $S({api:e="/api/chat",id:t,initialMessages:n,initialInput:r="",sendExtraMessageFields:o,experimental_onFunctionCall:i,experimental_onToolCall:l,onResponse:a,onFinish:s,onError:u,credentials:d,headers:c,body:f,generateId:p=zy}={}){const m=R.useId(),y=t??m,S=typeof e=="string"?[e,y]:y,[g]=R.useState([]),{data:h,mutate:k}=Zi([S,"messages"],null,{fallbackData:n??g}),{data:C=!1,mutate:T}=Zi([S,"loading"],null),{data:v,mutate:E}=Zi([S,"streamData"],null),{data:P=void 0,mutate:M}=Zi([S,"error"],null),w=R.useRef(h||[]);R.useEffect(()=>{w.current=h||[]},[h]);const I=R.useRef(null),L=R.useRef({credentials:d,headers:c,body:f});R.useEffect(()=>{L.current={credentials:d,headers:c,body:f}},[d,c,f]);const B=R.useCallback(async W=>{try{T(!0),M(void 0);const x=new AbortController;I.current=x,await DS({getStreamedResponse:()=>jS(e,W,k,E,v,L,w,I,p,s,a,o),experimental_onFunctionCall:i,experimental_onToolCall:l,updateChatRequest:re=>{W=re},getCurrentMessages:()=>w.current}),I.current=null}catch(x){if(x.name==="AbortError")return I.current=null,null;u&&x instanceof Error&&u(x),M(x)}finally{T(!1)}},[k,T,e,L,a,s,u,M,E,v,o,i,l,w,I,p]),V=R.useCallback(async(W,{options:x,functions:re,function_call:we,tools:ee,tool_choice:Ue,data:it}={})=>{W.id||(W.id=p());const _t={messages:w.current.concat(W),options:x,data:it,...re!==void 0&&{functions:re},...we!==void 0&&{function_call:we},...ee!==void 0&&{tools:ee},...Ue!==void 0&&{tool_choice:Ue}};return B(_t)},[B,p]),D=R.useCallback(async({options:W,functions:x,function_call:re,tools:we,tool_choice:ee}={})=>{if(w.current.length===0)return null;if(w.current[w.current.length-1].role==="assistant"){const _t={messages:w.current.slice(0,-1),options:W,...x!==void 0&&{functions:x},...re!==void 0&&{function_call:re},...we!==void 0&&{tools:we},...ee!==void 0&&{tool_choice:ee}};return B(_t)}const it={messages:w.current,options:W,...x!==void 0&&{functions:x},...re!==void 0&&{function_call:re},...we!==void 0&&{tools:we},...ee!==void 0&&{tool_choice:ee}};return B(it)},[B]),A=R.useCallback(()=>{I.current&&(I.current.abort(),I.current=null)},[]),$=R.useCallback(W=>{k(W,!1),w.current=W},[k]),[O,H]=R.useState(r),b=R.useCallback((W,x={},re)=>{re&&(L.current={...L.current,...re}),W.preventDefault(),O&&(V({content:O,role:"user",createdAt:new Date},x),H(""))},[O,V]);return{messages:h||[],error:P,append:V,reload:D,stop:A,setMessages:$,input:O,setInput:H,handleInputChange:W=>{H(W.target.value)},handleSubmit:b,isLoading:C,data:v}}const Wa=R.createContext({baseUrl:"",entryButtonLabel:"Ask"});async function ec(e){const t=await e;if(!t.ok&&t.type!=="opaqueredirect"){const n=t.clone().json().then(JSON.stringify).catch(()=>t.clone().text()).catch(()=>"Empty response body]");throw new BS(t.status,t.statusText,await n)}return t}class BS extends Error{constructor(t,n,r){super(`${t} ${n}: ${r}`),this.status=t,this.statusText=n,this.body=r}}const Ep="/api/auth/session",US="/api/auth/csrfToken",HS="/api/auth/callback/anonymous";async function VS(e){const t=o=>fetch(e+o,{credentials:"include",redirect:"follow"}).then(ec).then(i=>i.json()),n=(o,i)=>fetch(e+o,{method:"POST",credentials:"include",redirect:"manual",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(ec).then(()=>{}),r=await t(Ep);if(!r){const{csrfToken:o}=await t(US);await n(HS,{csrfToken:o});const i=await t(Ep);if(!(i!=null&&i.user))throw new Error("Authentication error");return i}return r}function WS(){const e=R.useContext(Wa),[t,n]=R.useState();return{session:t,create:async o=>{await VS(e.baseUrl),!t&&await fetch(e.baseUrl+"/api/v1/chats",{method:"POST",body:JSON.stringify({name:o})}).then(ec).then(i=>i.json()).then(i=>{n(i.url_key)})}}}function KS(e,t){const{action:n,siteKey:r}=e;return r?e.mode==="v3"?new Promise(o=>{grecaptcha.ready(async()=>{const i=await grecaptcha.execute(r,{action:n});o(t({action:n,siteKey:r,token:i}))})}):e.mode==="enterprise"?new Promise(o=>{grecaptcha.enterprise.ready(async()=>{const i=await grecaptcha.enterprise.execute(r,{action:n});o(t({action:n,siteKey:r,token:i}))})}):Promise.reject("Unknown grecaptcha mode"):t({action:n,siteKey:r,token:""})}const QS={background:"hsl(0 0% 100%)",foreground:"hsl(240 10% 3.9%)",card:"hsl(0 0% 100%)",cardForeground:"hsl(240 10% 3.9%)",popover:"hsl(0 0% 100%)",popoverForeground:"hsl(240 10% 3.9%)",primary:"hsl(240 5.9% 10%)",primaryForeground:"hsl(0 0% 98%)",secondary:"hsl(240 4.8% 95.9%)",secondaryForeground:"hsl(240 5.9% 10%)",muted:"hsl(240 4.8% 95.9%)",mutedForeground:"hsl(240 3.8% 46.1%)",accent:"hsl(240 4.8% 95.9%)",accentForeground:"hsl(240 5.9% 10%)",destructive:"hsl(0 84.2% 60.2%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 5.9% 90%)",input:"hsl(240 5.9% 90%)",ring:"hsl(240 5.9% 10%)"},qS={background:"hsl(240 10% 3.9%)",foreground:"hsl(0 0% 98%)",card:"hsl(240 10% 3.9%)",cardForeground:"hsl(0 0% 98%)",popover:"hsl(240 10% 3.9%)",popoverForeground:"hsl(0 0% 98%)",primary:"hsl(0 0% 98%)",primaryForeground:"hsl(240 5.9% 10%)",secondary:"hsl(240 3.7% 15.9%)",secondaryForeground:"hsl(0 0% 98%)",muted:"hsl(240 3.7% 15.9%)",mutedForeground:"hsl(240 5% 64.9%)",accent:"hsl(240 3.7% 15.9%)",accentForeground:"hsl(0 0% 98%)",destructive:"hsl(0 62.8% 30.6%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 3.7% 15.9%)",input:"hsl(240 3.7% 15.9%)",ring:"hsl(240 4.9% 83.9%)"},GS=wd({palette:{mode:"light",...QS}}),YS=wd({palette:{mode:"dark",...qS}}),Kt="tidb-ai-",XS=ke`
  .markdown-body {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    color: #1f2328;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .markdown-body .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  .markdown-body h1:hover .anchor .octicon-link:before,
  .markdown-body h2:hover .anchor .octicon-link:before,
  .markdown-body h3:hover .anchor .octicon-link:before,
  .markdown-body h4:hover .anchor .octicon-link:before,
  .markdown-body h5:hover .anchor .octicon-link:before,
  .markdown-body h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  .markdown-body details,
  .markdown-body figcaption,
  .markdown-body figure {
    display: block;
  }

  .markdown-body summary {
    display: list-item;
  }

  .markdown-body [hidden] {
    display: none !important;
  }

  .markdown-body a {
    background-color: transparent;
    color: #0969da;
    text-decoration: none;
  }

  .markdown-body abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  .markdown-body b,
  .markdown-body strong {
    font-weight: 600;
  }

  .markdown-body dfn {
    font-style: italic;
  }

  .markdown-body h1 {
    margin: 0.67em 0;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  }

  .markdown-body mark {
    background-color: #fff8c5;
    color: #1f2328;
  }

  .markdown-body small {
    font-size: 90%;
  }

  .markdown-body sub,
  .markdown-body sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  .markdown-body sub {
    bottom: -0.25em;
  }

  .markdown-body sup {
    top: -0.5em;
  }

  .markdown-body img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: #ffffff;
  }

  .markdown-body code,
  .markdown-body kbd,
  .markdown-body pre,
  .markdown-body samp {
    font-family: monospace;
    font-size: 1em;
  }

  .markdown-body figure {
    margin: 1em 40px;
  }

  .markdown-body hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #d0d7de;
    border: 0;
  }

  .markdown-body input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .markdown-body [type='button'],
  .markdown-body [type='reset'],
  .markdown-body [type='submit'] {
    -webkit-appearance: button;
    appearance: button;
  }

  .markdown-body [type='checkbox'],
  .markdown-body [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  .markdown-body [type='number']::-webkit-inner-spin-button,
  .markdown-body [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  .markdown-body [type='search']::-webkit-search-cancel-button,
  .markdown-body [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  .markdown-body ::-webkit-file-upload-button {
    -webkit-appearance: button;
    appearance: button;
    font: inherit;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body ::placeholder {
    color: #6e7781;
    opacity: 1;
  }

  .markdown-body hr::before {
    display: table;
    content: '';
  }

  .markdown-body hr::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  .markdown-body td,
  .markdown-body th {
    padding: 0;
  }

  .markdown-body details summary {
    cursor: pointer;
  }

  .markdown-body details:not([open]) > *:not(summary) {
    display: none !important;
  }

  .markdown-body a:focus,
  .markdown-body [role='button']:focus,
  .markdown-body input[type='radio']:focus,
  .markdown-body input[type='checkbox']:focus {
    outline: 2px solid #0969da;
    outline-offset: -2px;
    box-shadow: none;
  }

  .markdown-body a:focus:not(:focus-visible),
  .markdown-body [role='button']:focus:not(:focus-visible),
  .markdown-body input[type='radio']:focus:not(:focus-visible),
  .markdown-body input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  .markdown-body a:focus-visible,
  .markdown-body [role='button']:focus-visible,
  .markdown-body input[type='radio']:focus-visible,
  .markdown-body input[type='checkbox']:focus-visible {
    outline: 2px solid #0969da;
    outline-offset: -2px;
    box-shadow: none;
  }

  .markdown-body a:not([class]):focus,
  .markdown-body a:not([class]):focus-visible,
  .markdown-body input[type='radio']:focus,
  .markdown-body input[type='radio']:focus-visible,
  .markdown-body input[type='checkbox']:focus,
  .markdown-body input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font:
      11px ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    line-height: 10px;
    color: #1f2328;
    vertical-align: middle;
    background-color: #f6f8fa;
    border: solid 1px rgba(175, 184, 193, 0.2);
    border-bottom-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 rgba(175, 184, 193, 0.2);
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .markdown-body h2 {
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  }

  .markdown-body h3 {
    font-weight: 600;
    font-size: 1.25em;
  }

  .markdown-body h4 {
    font-weight: 600;
    font-size: 1em;
  }

  .markdown-body h5 {
    font-weight: 600;
    font-size: 0.875em;
  }

  .markdown-body h6 {
    font-weight: 600;
    font-size: 0.85em;
    color: #656d76;
  }

  .markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .markdown-body blockquote {
    margin: 0;
    padding: 0 1em;
    color: #656d76;
    border-left: 0.25em solid #d0d7de;
  }

  .markdown-body ul,
  .markdown-body ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  .markdown-body ol ol,
  .markdown-body ul ol {
    list-style-type: lower-roman;
  }

  .markdown-body ul ul ol,
  .markdown-body ul ol ol,
  .markdown-body ol ul ol,
  .markdown-body ol ol ol {
    list-style-type: lower-alpha;
  }

  .markdown-body dd {
    margin-left: 0;
  }

  .markdown-body tt,
  .markdown-body code,
  .markdown-body samp {
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
  }

  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .markdown-body .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  .markdown-body input::-webkit-outer-spin-button,
  .markdown-body input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body .mr-2 {
    margin-right: 8px !important;
  }

  .markdown-body::before {
    display: table;
    content: '';
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  .markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .markdown-body .absent {
    color: #d1242f;
  }

  .markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .markdown-body .anchor:focus {
    outline: none;
  }

  .markdown-body p,
  .markdown-body blockquote,
  .markdown-body ul,
  .markdown-body ol,
  .markdown-body dl,
  .markdown-body table,
  .markdown-body pre,
  .markdown-body details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-body h1 .octicon-link,
  .markdown-body h2 .octicon-link,
  .markdown-body h3 .octicon-link,
  .markdown-body h4 .octicon-link,
  .markdown-body h5 .octicon-link,
  .markdown-body h6 .octicon-link {
    color: #1f2328;
    vertical-align: middle;
    visibility: hidden;
  }

  .markdown-body h1:hover .anchor,
  .markdown-body h2:hover .anchor,
  .markdown-body h3:hover .anchor,
  .markdown-body h4:hover .anchor,
  .markdown-body h5:hover .anchor,
  .markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .markdown-body h1:hover .anchor .octicon-link,
  .markdown-body h2:hover .anchor .octicon-link,
  .markdown-body h3:hover .anchor .octicon-link,
  .markdown-body h4:hover .anchor .octicon-link,
  .markdown-body h5:hover .anchor .octicon-link,
  .markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  .markdown-body h1 tt,
  .markdown-body h1 code,
  .markdown-body h2 tt,
  .markdown-body h2 code,
  .markdown-body h3 tt,
  .markdown-body h3 code,
  .markdown-body h4 tt,
  .markdown-body h4 code,
  .markdown-body h5 tt,
  .markdown-body h5 code,
  .markdown-body h6 tt,
  .markdown-body h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  .markdown-body summary h1,
  .markdown-body summary h2,
  .markdown-body summary h3,
  .markdown-body summary h4,
  .markdown-body summary h5,
  .markdown-body summary h6 {
    display: inline-block;
  }

  .markdown-body summary h1 .anchor,
  .markdown-body summary h2 .anchor,
  .markdown-body summary h3 .anchor,
  .markdown-body summary h4 .anchor,
  .markdown-body summary h5 .anchor,
  .markdown-body summary h6 .anchor {
    margin-left: -40px;
  }

  .markdown-body summary h1,
  .markdown-body summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .markdown-body ul.no-list,
  .markdown-body ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  .markdown-body ol[type='a s'] {
    list-style-type: lower-alpha;
  }

  .markdown-body ol[type='A s'] {
    list-style-type: upper-alpha;
  }

  .markdown-body ol[type='i s'] {
    list-style-type: lower-roman;
  }

  .markdown-body ol[type='I s'] {
    list-style-type: upper-roman;
  }

  .markdown-body ol[type='1'] {
    list-style-type: decimal;
  }

  .markdown-body div > ol:not([type]) {
    list-style-type: decimal;
  }

  .markdown-body ul ul,
  .markdown-body ul ol,
  .markdown-body ol ol,
  .markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body li > p {
    margin-top: 16px;
  }

  .markdown-body li + li {
    margin-top: 0.25em;
  }

  .markdown-body dl {
    padding: 0;
  }

  .markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .markdown-body table th {
    font-weight: 600;
  }

  .markdown-body table th,
  .markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #d0d7de;
  }

  .markdown-body table td > :last-child {
    margin-bottom: 0;
  }

  .markdown-body table tr {
    background-color: #ffffff;
    border-top: 1px solid hsla(210, 18%, 87%, 1);
  }

  .markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .markdown-body table img {
    background-color: transparent;
  }

  .markdown-body img[align='right'] {
    padding-left: 20px;
  }

  .markdown-body img[align='left'] {
    padding-right: 20px;
  }

  .markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  .markdown-body span.frame {
    display: block;
    overflow: hidden;
  }

  .markdown-body span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #d0d7de;
  }

  .markdown-body span.frame span img {
    display: block;
    float: left;
  }

  .markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #1f2328;
  }

  .markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  .markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  .markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body span.align-right span img {
    margin: 0;
    text-align: right;
  }

  .markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-left span {
    margin: 13px 0 0;
  }

  .markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body code,
  .markdown-body tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
  }

  .markdown-body code br,
  .markdown-body tt br {
    display: none;
  }

  .markdown-body del code {
    text-decoration: inherit;
  }

  .markdown-body samp {
    font-size: 85%;
  }

  .markdown-body pre code {
    font-size: 100%;
  }

  .markdown-body pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .markdown-body .highlight {
    margin-bottom: 16px;
  }

  .markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    color: #1f2328;
    background-color: #f6f8fa;
    border-radius: 6px;
  }

  .markdown-body pre code,
  .markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .markdown-body .csv-data td,
  .markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .markdown-body .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #ffffff;
    border: 0;
  }

  .markdown-body .csv-data tr {
    border-top: 0;
  }

  .markdown-body .csv-data th {
    font-weight: 600;
    background: #f6f8fa;
    border-top: 0;
  }

  .markdown-body [data-footnote-ref]::before {
    content: '[';
  }

  .markdown-body [data-footnote-ref]::after {
    content: ']';
  }

  .markdown-body .footnotes {
    font-size: 12px;
    color: #656d76;
    border-top: 1px solid #d0d7de;
  }

  .markdown-body .footnotes ol {
    padding-left: 16px;
  }

  .markdown-body .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .markdown-body .footnotes li {
    position: relative;
  }

  .markdown-body .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid #0969da;
    border-radius: 6px;
  }

  .markdown-body .footnotes li:target {
    color: #1f2328;
  }

  .markdown-body .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .markdown-body .pl-c {
    color: #57606a;
  }

  .markdown-body .pl-c1,
  .markdown-body .pl-s .pl-v {
    color: #0550ae;
  }

  .markdown-body .pl-e,
  .markdown-body .pl-en {
    color: #6639ba;
  }

  .markdown-body .pl-smi,
  .markdown-body .pl-s .pl-s1 {
    color: #24292f;
  }

  .markdown-body .pl-ent {
    color: #116329;
  }

  .markdown-body .pl-k {
    color: #cf222e;
  }

  .markdown-body .pl-s,
  .markdown-body .pl-pds,
  .markdown-body .pl-s .pl-pse .pl-s1,
  .markdown-body .pl-sr,
  .markdown-body .pl-sr .pl-cce,
  .markdown-body .pl-sr .pl-sre,
  .markdown-body .pl-sr .pl-sra {
    color: #0a3069;
  }

  .markdown-body .pl-v,
  .markdown-body .pl-smw {
    color: #953800;
  }

  .markdown-body .pl-bu {
    color: #82071e;
  }

  .markdown-body .pl-ii {
    color: #f6f8fa;
    background-color: #82071e;
  }

  .markdown-body .pl-c2 {
    color: #f6f8fa;
    background-color: #cf222e;
  }

  .markdown-body .pl-sr .pl-cce {
    font-weight: bold;
    color: #116329;
  }

  .markdown-body .pl-ml {
    color: #3b2300;
  }

  .markdown-body .pl-mh,
  .markdown-body .pl-mh .pl-en,
  .markdown-body .pl-ms {
    font-weight: bold;
    color: #0550ae;
  }

  .markdown-body .pl-mi {
    font-style: italic;
    color: #24292f;
  }

  .markdown-body .pl-mb {
    font-weight: bold;
    color: #24292f;
  }

  .markdown-body .pl-md {
    color: #82071e;
    background-color: #ffebe9;
  }

  .markdown-body .pl-mi1 {
    color: #116329;
    background-color: #dafbe1;
  }

  .markdown-body .pl-mc {
    color: #953800;
    background-color: #ffd8b5;
  }

  .markdown-body .pl-mi2 {
    color: #eaeef2;
    background-color: #0550ae;
  }

  .markdown-body .pl-mdr {
    font-weight: bold;
    color: #8250df;
  }

  .markdown-body .pl-ba {
    color: #57606a;
  }

  .markdown-body .pl-sg {
    color: #8c959f;
  }

  .markdown-body .pl-corl {
    text-decoration: underline;
    color: #0a3069;
  }

  .markdown-body g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: 400;
    line-height: 1;
    vertical-align: -0.075em;
  }

  .markdown-body g-emoji img {
    width: 1em;
    height: 1em;
  }

  .markdown-body .task-list-item {
    list-style-type: none;
  }

  .markdown-body .task-list-item label {
    font-weight: 400;
  }

  .markdown-body .task-list-item.enabled label {
    cursor: pointer;
  }

  .markdown-body .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .markdown-body .task-list-item .handle {
    display: none;
  }

  .markdown-body .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .markdown-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .markdown-body .contains-task-list {
    position: relative;
  }

  .markdown-body .contains-task-list:hover .task-list-item-convert-container,
  .markdown-body
    .contains-task-list:focus-within
    .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  .markdown-body ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }

  .markdown-body .markdown-alert {
    padding: 8px 16px;
    margin-bottom: 16px;
    color: inherit;
    border-left: 0.25em solid #d0d7de;
  }

  .markdown-body .markdown-alert > :first-child {
    margin-top: 0;
  }

  .markdown-body .markdown-alert > :last-child {
    margin-bottom: 0;
  }

  .markdown-body .markdown-alert .markdown-alert-title {
    display: flex;
    font-weight: 500;
    align-items: center;
    line-height: 1;
  }

  .markdown-body .markdown-alert.markdown-alert-note {
    border-left-color: #0969da;
  }

  .markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title {
    color: #0969da;
  }

  .markdown-body .markdown-alert.markdown-alert-important {
    border-left-color: #8250df;
  }

  .markdown-body
    .markdown-alert.markdown-alert-important
    .markdown-alert-title {
    color: #8250df;
  }

  .markdown-body .markdown-alert.markdown-alert-warning {
    border-left-color: #9a6700;
  }

  .markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title {
    color: #9a6700;
  }

  .markdown-body .markdown-alert.markdown-alert-tip {
    border-left-color: #1f883d;
  }

  .markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title {
    color: #1a7f37;
  }

  .markdown-body .markdown-alert.markdown-alert-caution {
    border-left-color: #cf222e;
  }

  .markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title {
    color: #d1242f;
  }
`,JS=ke`
  .markdown-body {
    color-scheme: dark;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    color: #e6edf3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .markdown-body .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  .markdown-body h1:hover .anchor .octicon-link:before,
  .markdown-body h2:hover .anchor .octicon-link:before,
  .markdown-body h3:hover .anchor .octicon-link:before,
  .markdown-body h4:hover .anchor .octicon-link:before,
  .markdown-body h5:hover .anchor .octicon-link:before,
  .markdown-body h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  .markdown-body details,
  .markdown-body figcaption,
  .markdown-body figure {
    display: block;
  }

  .markdown-body summary {
    display: list-item;
  }

  .markdown-body [hidden] {
    display: none !important;
  }

  .markdown-body a {
    background-color: transparent;
    color: #2f81f7;
    text-decoration: none;
  }

  .markdown-body abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  .markdown-body b,
  .markdown-body strong {
    font-weight: 600;
  }

  .markdown-body dfn {
    font-style: italic;
  }

  .markdown-body h1 {
    margin: 0.67em 0;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #21262d;
  }

  .markdown-body mark {
    background-color: rgba(187, 128, 9, 0.15);
    color: #e6edf3;
  }

  .markdown-body small {
    font-size: 90%;
  }

  .markdown-body sub,
  .markdown-body sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  .markdown-body sub {
    bottom: -0.25em;
  }

  .markdown-body sup {
    top: -0.5em;
  }

  .markdown-body img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: #0d1117;
  }

  .markdown-body code,
  .markdown-body kbd,
  .markdown-body pre,
  .markdown-body samp {
    font-family: monospace;
    font-size: 1em;
  }

  .markdown-body figure {
    margin: 1em 40px;
  }

  .markdown-body hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid #21262d;
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #30363d;
    border: 0;
  }

  .markdown-body input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .markdown-body [type='button'],
  .markdown-body [type='reset'],
  .markdown-body [type='submit'] {
    -webkit-appearance: button;
    appearance: button;
  }

  .markdown-body [type='checkbox'],
  .markdown-body [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  .markdown-body [type='number']::-webkit-inner-spin-button,
  .markdown-body [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  .markdown-body [type='search']::-webkit-search-cancel-button,
  .markdown-body [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  .markdown-body ::-webkit-file-upload-button {
    -webkit-appearance: button;
    appearance: button;
    font: inherit;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body ::placeholder {
    color: #6e7681;
    opacity: 1;
  }

  .markdown-body hr::before {
    display: table;
    content: '';
  }

  .markdown-body hr::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  .markdown-body td,
  .markdown-body th {
    padding: 0;
  }

  .markdown-body details summary {
    cursor: pointer;
  }

  .markdown-body details:not([open]) > *:not(summary) {
    display: none !important;
  }

  .markdown-body a:focus,
  .markdown-body [role='button']:focus,
  .markdown-body input[type='radio']:focus,
  .markdown-body input[type='checkbox']:focus {
    outline: 2px solid #2f81f7;
    outline-offset: -2px;
    box-shadow: none;
  }

  .markdown-body a:focus:not(:focus-visible),
  .markdown-body [role='button']:focus:not(:focus-visible),
  .markdown-body input[type='radio']:focus:not(:focus-visible),
  .markdown-body input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  .markdown-body a:focus-visible,
  .markdown-body [role='button']:focus-visible,
  .markdown-body input[type='radio']:focus-visible,
  .markdown-body input[type='checkbox']:focus-visible {
    outline: 2px solid #2f81f7;
    outline-offset: -2px;
    box-shadow: none;
  }

  .markdown-body a:not([class]):focus,
  .markdown-body a:not([class]):focus-visible,
  .markdown-body input[type='radio']:focus,
  .markdown-body input[type='radio']:focus-visible,
  .markdown-body input[type='checkbox']:focus,
  .markdown-body input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  .markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font:
      11px ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    line-height: 10px;
    color: #e6edf3;
    vertical-align: middle;
    background-color: #161b22;
    border: solid 1px rgba(110, 118, 129, 0.4);
    border-bottom-color: rgba(110, 118, 129, 0.4);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 rgba(110, 118, 129, 0.4);
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .markdown-body h2 {
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #21262d;
  }

  .markdown-body h3 {
    font-weight: 600;
    font-size: 1.25em;
  }

  .markdown-body h4 {
    font-weight: 600;
    font-size: 1em;
  }

  .markdown-body h5 {
    font-weight: 600;
    font-size: 0.875em;
  }

  .markdown-body h6 {
    font-weight: 600;
    font-size: 0.85em;
    color: #848d97;
  }

  .markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .markdown-body blockquote {
    margin: 0;
    padding: 0 1em;
    color: #848d97;
    border-left: 0.25em solid #30363d;
  }

  .markdown-body ul,
  .markdown-body ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  .markdown-body ol ol,
  .markdown-body ul ol {
    list-style-type: lower-roman;
  }

  .markdown-body ul ul ol,
  .markdown-body ul ol ol,
  .markdown-body ol ul ol,
  .markdown-body ol ol ol {
    list-style-type: lower-alpha;
  }

  .markdown-body dd {
    margin-left: 0;
  }

  .markdown-body tt,
  .markdown-body code,
  .markdown-body samp {
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
  }

  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .markdown-body .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  .markdown-body input::-webkit-outer-spin-button,
  .markdown-body input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body .mr-2 {
    margin-right: 8px !important;
  }

  .markdown-body::before {
    display: table;
    content: '';
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  .markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .markdown-body .absent {
    color: #f85149;
  }

  .markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .markdown-body .anchor:focus {
    outline: none;
  }

  .markdown-body p,
  .markdown-body blockquote,
  .markdown-body ul,
  .markdown-body ol,
  .markdown-body dl,
  .markdown-body table,
  .markdown-body pre,
  .markdown-body details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-body h1 .octicon-link,
  .markdown-body h2 .octicon-link,
  .markdown-body h3 .octicon-link,
  .markdown-body h4 .octicon-link,
  .markdown-body h5 .octicon-link,
  .markdown-body h6 .octicon-link {
    color: #e6edf3;
    vertical-align: middle;
    visibility: hidden;
  }

  .markdown-body h1:hover .anchor,
  .markdown-body h2:hover .anchor,
  .markdown-body h3:hover .anchor,
  .markdown-body h4:hover .anchor,
  .markdown-body h5:hover .anchor,
  .markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .markdown-body h1:hover .anchor .octicon-link,
  .markdown-body h2:hover .anchor .octicon-link,
  .markdown-body h3:hover .anchor .octicon-link,
  .markdown-body h4:hover .anchor .octicon-link,
  .markdown-body h5:hover .anchor .octicon-link,
  .markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  .markdown-body h1 tt,
  .markdown-body h1 code,
  .markdown-body h2 tt,
  .markdown-body h2 code,
  .markdown-body h3 tt,
  .markdown-body h3 code,
  .markdown-body h4 tt,
  .markdown-body h4 code,
  .markdown-body h5 tt,
  .markdown-body h5 code,
  .markdown-body h6 tt,
  .markdown-body h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  .markdown-body summary h1,
  .markdown-body summary h2,
  .markdown-body summary h3,
  .markdown-body summary h4,
  .markdown-body summary h5,
  .markdown-body summary h6 {
    display: inline-block;
  }

  .markdown-body summary h1 .anchor,
  .markdown-body summary h2 .anchor,
  .markdown-body summary h3 .anchor,
  .markdown-body summary h4 .anchor,
  .markdown-body summary h5 .anchor,
  .markdown-body summary h6 .anchor {
    margin-left: -40px;
  }

  .markdown-body summary h1,
  .markdown-body summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .markdown-body ul.no-list,
  .markdown-body ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  .markdown-body ol[type='a s'] {
    list-style-type: lower-alpha;
  }

  .markdown-body ol[type='A s'] {
    list-style-type: upper-alpha;
  }

  .markdown-body ol[type='i s'] {
    list-style-type: lower-roman;
  }

  .markdown-body ol[type='I s'] {
    list-style-type: upper-roman;
  }

  .markdown-body ol[type='1'] {
    list-style-type: decimal;
  }

  .markdown-body div > ol:not([type]) {
    list-style-type: decimal;
  }

  .markdown-body ul ul,
  .markdown-body ul ol,
  .markdown-body ol ol,
  .markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .markdown-body li > p {
    margin-top: 16px;
  }

  .markdown-body li + li {
    margin-top: 0.25em;
  }

  .markdown-body dl {
    padding: 0;
  }

  .markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .markdown-body table th {
    font-weight: 600;
  }

  .markdown-body table th,
  .markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #30363d;
  }

  .markdown-body table td > :last-child {
    margin-bottom: 0;
  }

  .markdown-body table tr {
    background-color: #0d1117;
    border-top: 1px solid #21262d;
  }

  .markdown-body table tr:nth-child(2n) {
    background-color: #161b22;
  }

  .markdown-body table img {
    background-color: transparent;
  }

  .markdown-body img[align='right'] {
    padding-left: 20px;
  }

  .markdown-body img[align='left'] {
    padding-right: 20px;
  }

  .markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  .markdown-body span.frame {
    display: block;
    overflow: hidden;
  }

  .markdown-body span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #30363d;
  }

  .markdown-body span.frame span img {
    display: block;
    float: left;
  }

  .markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #e6edf3;
  }

  .markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  .markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  .markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .markdown-body span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body span.align-right span img {
    margin: 0;
    text-align: right;
  }

  .markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-left span {
    margin: 13px 0 0;
  }

  .markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  .markdown-body span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  .markdown-body code,
  .markdown-body tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(110, 118, 129, 0.4);
    border-radius: 6px;
  }

  .markdown-body code br,
  .markdown-body tt br {
    display: none;
  }

  .markdown-body del code {
    text-decoration: inherit;
  }

  .markdown-body samp {
    font-size: 85%;
  }

  .markdown-body pre code {
    font-size: 100%;
  }

  .markdown-body pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .markdown-body .highlight {
    margin-bottom: 16px;
  }

  .markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    color: #e6edf3;
    background-color: #161b22;
    border-radius: 6px;
  }

  .markdown-body pre code,
  .markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .markdown-body .csv-data td,
  .markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .markdown-body .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #0d1117;
    border: 0;
  }

  .markdown-body .csv-data tr {
    border-top: 0;
  }

  .markdown-body .csv-data th {
    font-weight: 600;
    background: #161b22;
    border-top: 0;
  }

  .markdown-body [data-footnote-ref]::before {
    content: '[';
  }

  .markdown-body [data-footnote-ref]::after {
    content: ']';
  }

  .markdown-body .footnotes {
    font-size: 12px;
    color: #848d97;
    border-top: 1px solid #30363d;
  }

  .markdown-body .footnotes ol {
    padding-left: 16px;
  }

  .markdown-body .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .markdown-body .footnotes li {
    position: relative;
  }

  .markdown-body .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid #1f6feb;
    border-radius: 6px;
  }

  .markdown-body .footnotes li:target {
    color: #e6edf3;
  }

  .markdown-body .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .markdown-body .pl-c {
    color: #8b949e;
  }

  .markdown-body .pl-c1,
  .markdown-body .pl-s .pl-v {
    color: #79c0ff;
  }

  .markdown-body .pl-e,
  .markdown-body .pl-en {
    color: #d2a8ff;
  }

  .markdown-body .pl-smi,
  .markdown-body .pl-s .pl-s1 {
    color: #c9d1d9;
  }

  .markdown-body .pl-ent {
    color: #7ee787;
  }

  .markdown-body .pl-k {
    color: #ff7b72;
  }

  .markdown-body .pl-s,
  .markdown-body .pl-pds,
  .markdown-body .pl-s .pl-pse .pl-s1,
  .markdown-body .pl-sr,
  .markdown-body .pl-sr .pl-cce,
  .markdown-body .pl-sr .pl-sre,
  .markdown-body .pl-sr .pl-sra {
    color: #a5d6ff;
  }

  .markdown-body .pl-v,
  .markdown-body .pl-smw {
    color: #ffa657;
  }

  .markdown-body .pl-bu {
    color: #f85149;
  }

  .markdown-body .pl-ii {
    color: #f0f6fc;
    background-color: #8e1519;
  }

  .markdown-body .pl-c2 {
    color: #f0f6fc;
    background-color: #b62324;
  }

  .markdown-body .pl-sr .pl-cce {
    font-weight: bold;
    color: #7ee787;
  }

  .markdown-body .pl-ml {
    color: #f2cc60;
  }

  .markdown-body .pl-mh,
  .markdown-body .pl-mh .pl-en,
  .markdown-body .pl-ms {
    font-weight: bold;
    color: #1f6feb;
  }

  .markdown-body .pl-mi {
    font-style: italic;
    color: #c9d1d9;
  }

  .markdown-body .pl-mb {
    font-weight: bold;
    color: #c9d1d9;
  }

  .markdown-body .pl-md {
    color: #ffdcd7;
    background-color: #67060c;
  }

  .markdown-body .pl-mi1 {
    color: #aff5b4;
    background-color: #033a16;
  }

  .markdown-body .pl-mc {
    color: #ffdfb6;
    background-color: #5a1e02;
  }

  .markdown-body .pl-mi2 {
    color: #c9d1d9;
    background-color: #1158c7;
  }

  .markdown-body .pl-mdr {
    font-weight: bold;
    color: #d2a8ff;
  }

  .markdown-body .pl-ba {
    color: #8b949e;
  }

  .markdown-body .pl-sg {
    color: #484f58;
  }

  .markdown-body .pl-corl {
    text-decoration: underline;
    color: #a5d6ff;
  }

  .markdown-body g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: 400;
    line-height: 1;
    vertical-align: -0.075em;
  }

  .markdown-body g-emoji img {
    width: 1em;
    height: 1em;
  }

  .markdown-body .task-list-item {
    list-style-type: none;
  }

  .markdown-body .task-list-item label {
    font-weight: 400;
  }

  .markdown-body .task-list-item.enabled label {
    cursor: pointer;
  }

  .markdown-body .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .markdown-body .task-list-item .handle {
    display: none;
  }

  .markdown-body .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .markdown-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .markdown-body .contains-task-list {
    position: relative;
  }

  .markdown-body .contains-task-list:hover .task-list-item-convert-container,
  .markdown-body
    .contains-task-list:focus-within
    .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  .markdown-body ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }

  .markdown-body .markdown-alert {
    padding: 8px 16px;
    margin-bottom: 16px;
    color: inherit;
    border-left: 0.25em solid #30363d;
  }

  .markdown-body .markdown-alert > :first-child {
    margin-top: 0;
  }

  .markdown-body .markdown-alert > :last-child {
    margin-bottom: 0;
  }

  .markdown-body .markdown-alert .markdown-alert-title {
    display: flex;
    font-weight: 500;
    align-items: center;
    line-height: 1;
  }

  .markdown-body .markdown-alert.markdown-alert-note {
    border-left-color: #1f6feb;
  }

  .markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title {
    color: #2f81f7;
  }

  .markdown-body .markdown-alert.markdown-alert-important {
    border-left-color: #8957e5;
  }

  .markdown-body
    .markdown-alert.markdown-alert-important
    .markdown-alert-title {
    color: #a371f7;
  }

  .markdown-body .markdown-alert.markdown-alert-warning {
    border-left-color: #9e6a03;
  }

  .markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title {
    color: #d29922;
  }

  .markdown-body .markdown-alert.markdown-alert-tip {
    border-left-color: #238636;
  }

  .markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title {
    color: #3fb950;
  }

  .markdown-body .markdown-alert.markdown-alert-caution {
    border-left-color: #da3633;
  }

  .markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title {
    color: #f85149;
  }
`;var ZS=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||n.forEach(function(o){e.addRange(o)}),t&&t.focus()}},e2=ZS,Tp={"text/plain":"Text","text/html":"Url",default:"Text"},t2="Copy to clipboard: #{key}, Enter";function n2(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function r2(e,t){var n,r,o,i,l,a,s=!1;t||(t={}),n=t.debug||!1;try{o=e2(),i=document.createRange(),l=document.getSelection(),a=document.createElement("span"),a.textContent=e,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(d){if(d.stopPropagation(),t.format)if(d.preventDefault(),typeof d.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var c=Tp[t.format]||Tp.default;window.clipboardData.setData(c,e)}else d.clipboardData.clearData(),d.clipboardData.setData(t.format,e);t.onCopy&&(d.preventDefault(),t.onCopy(d.clipboardData))}),document.body.appendChild(a),i.selectNodeContents(a),l.addRange(i);var u=document.execCommand("copy");if(!u)throw new Error("copy command was unsuccessful");s=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),s=!0}catch(c){n&&console.error("unable to copy using clipboardData: ",c),n&&console.error("falling back to prompt"),r=n2("message"in t?t.message:t2),window.prompt(r,e)}}finally{l&&(typeof l.removeRange=="function"?l.removeRange(i):l.removeAllRanges()),a&&document.body.removeChild(a),o()}return s}var o2=r2;const i2=aa(o2),yr=ve("svg")(()=>ke({})),l2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",...e,children:z.jsx("path",{fillRule:"evenodd",d:"M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z",clipRule:"evenodd"})}),a2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"})}),s2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"})}),u2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"})}),c2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"})}),d2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"})}),f2=e=>z.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})});function p2(e){const{handleStop:t,className:n}=e;return z.jsx(My,{className:n,children:z.jsxs(vy,{onClick:t,className:n+"-Stop",sx:{padding:"0.5rem",border:0},children:[z.jsx(l2,{className:n+"-Stop-Icon",sx:{width:"1rem",height:"1rem",marginRight:"0.25rem"}}),"Stop Generating"]})})}function m2(e){const{className:t,handleReload:n,content:r}=e,[o,i]=R.useState(!1);return R.useEffect(()=>{if(o){const l=setTimeout(()=>{i(!1)},2e3);return()=>{clearTimeout(l)}}},[o]),z.jsx(My,{className:t,children:z.jsxs("div",{className:t+"-Actions-Container Actions-Container",children:[z.jsxs("div",{className:t+"-Left-Actions Left-Actions Actions",children:[n&&z.jsx(tl,{onClick:n,Icon:f2,name:"Regenerate",className:t,children:"Regenerate"}),z.jsx(tl,{onClick:()=>{i2(r||""),i(!0)},Icon:o?c2:u2,name:"Copy",className:t,children:o?"Copied!":"Copy"})]}),z.jsxs("div",{className:t+"-Right-Actions Right-Actions Actions",children:[z.jsx(tl,{Icon:a2,name:"GoodAnswer",className:t,children:"Good Answer"}),z.jsx(tl,{Icon:s2,name:"BadAnswer",className:t,children:"Bad Answer"})]})]})})}function tl(e){const{name:t,className:n,onClick:r,children:o,Icon:i}=e;return z.jsxs(vy,{onClick:r,className:n+`-${t}`,sx:{padding:"0.25rem 0.5rem",border:0,fontWeight:"normal",fontSize:"0.75rem",color:"mutedForeground"},children:[z.jsx(i,{className:n+`-${t}-Icon`,sx:{width:"0.75rem",height:"0.75rem",mr:"0.25rem"}}),o]})}const My=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",margin:"0.5rem 0",borderRadius:e.shape.borderRadius,"& .Actions-Container":{width:"100%",display:"flex",gap:"0.5rem",justifyContent:"space-between"},"& .Actions":{display:"flex",gap:"0.5rem","& > div":{display:"flex",gap:"0.5rem"}}}));/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),y2=(e,t)=>{const n=R.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:l,className:a="",children:s,...u},d)=>R.createElement("svg",{ref:d,...h2,width:o,height:o,stroke:r,strokeWidth:l?Number(i)*24/Number(o):i,className:["lucide",`lucide-${g2(e)}`,a].join(" "),...u},[...t.map(([c,f])=>R.createElement(c,f)),...Array.isArray(s)?s:[s]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k2=y2("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]),w2=ke({"hljs-comment":{color:"#696969"},"hljs-quote":{color:"#696969"},"hljs-variable":{color:"#d91e18"},"hljs-template-variable":{color:"#d91e18"},"hljs-tag":{color:"#d91e18"},"hljs-name":{color:"#d91e18"},"hljs-selector-id":{color:"#d91e18"},"hljs-selector-class":{color:"#d91e18"},"hljs-regexp":{color:"#d91e18"},"hljs-deletion":{color:"#d91e18"},"hljs-number":{color:"#aa5d00"},"hljs-built_in":{color:"#aa5d00"},"hljs-builtin-name":{color:"#aa5d00"},"hljs-literal":{color:"#aa5d00"},"hljs-type":{color:"#aa5d00"},"hljs-params":{color:"#aa5d00"},"hljs-meta":{color:"#aa5d00"},"hljs-link":{color:"#aa5d00"},"hljs-attribute":{color:"#aa5d00"},"hljs-string":{color:"#008000"},"hljs-symbol":{color:"#008000"},"hljs-bullet":{color:"#008000"},"hljs-addition":{color:"#008000"},"hljs-title":{color:"#007faa"},"hljs-section":{color:"#007faa"},"hljs-keyword":{color:"#7928a1"},"hljs-selector-tag":{color:"#7928a1"},hljs:{display:"block",overflowX:"auto",background:"#fefefe",color:"#545454",padding:"0.5em"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"}}),b2=ke({"& .hljs-comment":{color:"#d4d0ab"},"& .hljs-quote":{color:"#d4d0ab"},"& .hljs-variable":{color:"#ffa07a"},"& .hljs-template-variable":{color:"#ffa07a"},"& .hljs-tag":{color:"#ffa07a"},"& .hljs-name":{color:"#ffa07a"},"& .hljs-selector-id":{color:"#ffa07a"},"& .hljs-selector-class":{color:"#ffa07a"},"& .hljs-regexp":{color:"#ffa07a"},"& .hljs-deletion":{color:"#ffa07a"},"& .hljs-number":{color:"#f5ab35"},"& .hljs-built_in":{color:"#f5ab35"},"& .hljs-builtin-name":{color:"#f5ab35"},"& .hljs-literal":{color:"#f5ab35"},"& .hljs-type":{color:"#f5ab35"},"& .hljs-params":{color:"#f5ab35"},"& .hljs-meta":{color:"#f5ab35"},"& .hljs-link":{color:"#f5ab35"},"& .hljs-attribute":{color:"#ffd700"},"& .hljs-string":{color:"#abe338"},"& .hljs-symbol":{color:"#abe338"},"& .hljs-bullet":{color:"#abe338"},"& .hljs-addition":{color:"#abe338"},"& .hljs-title":{color:"#00e0e0"},"& .hljs-section":{color:"#00e0e0"},"& .hljs-keyword":{color:"#dcc6e0"},"& .hljs-selector":{color:"#dcc6e0"},"& .hljs-selector-tag":{color:"#dcc6e0"},"& .hljs":{display:"block",overflowX:"auto",background:"#2b2b2b",color:"#f8f8f2",padding:"0.5em"},"& .hljs-emphasis":{fontStyle:"italic"},"& .hljs-strong":{fontWeight:"bold"}});function x2(e,t){const n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const v2=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,S2=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,C2={};function Pp(e,t){return((t||C2).jsx?S2:v2).test(e)}const E2=/[ \t\n\f\r]/g;function T2(e){return typeof e=="object"?e.type==="text"?_p(e.value):!1:_p(e)}function _p(e){return e.replace(E2,"")===""}class Pi{constructor(t,n,r){this.property=t,this.normal=n,r&&(this.space=r)}}Pi.prototype.property={};Pi.prototype.normal={};Pi.prototype.space=null;function Fy(e,t){const n={},r={};let o=-1;for(;++o<e.length;)Object.assign(n,e[o].property),Object.assign(r,e[o].normal);return new Pi(n,r,t)}function tc(e){return e.toLowerCase()}class jt{constructor(t,n){this.property=t,this.attribute=n}}jt.prototype.space=null;jt.prototype.boolean=!1;jt.prototype.booleanish=!1;jt.prototype.overloadedBoolean=!1;jt.prototype.number=!1;jt.prototype.commaSeparated=!1;jt.prototype.spaceSeparated=!1;jt.prototype.commaOrSpaceSeparated=!1;jt.prototype.mustUseProperty=!1;jt.prototype.defined=!1;let P2=0;const G=kr(),Ae=kr(),Ny=kr(),N=kr(),me=kr(),Vr=kr(),yt=kr();function kr(){return 2**++P2}const nc=Object.freeze(Object.defineProperty({__proto__:null,boolean:G,booleanish:Ae,commaOrSpaceSeparated:yt,commaSeparated:Vr,number:N,overloadedBoolean:Ny,spaceSeparated:me},Symbol.toStringTag,{value:"Module"})),Ls=Object.keys(nc);class Sd extends jt{constructor(t,n,r,o){let i=-1;if(super(t,n),Rp(this,"space",o),typeof r=="number")for(;++i<Ls.length;){const l=Ls[i];Rp(this,Ls[i],(r&nc[l])===nc[l])}}}Sd.prototype.defined=!0;function Rp(e,t,n){n&&(e[t]=n)}const _2={}.hasOwnProperty;function io(e){const t={},n={};let r;for(r in e.properties)if(_2.call(e.properties,r)){const o=e.properties[r],i=new Sd(r,e.transform(e.attributes||{},r),o,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(i.mustUseProperty=!0),t[r]=i,n[tc(r)]=r,n[tc(i.attribute)]=r}return new Pi(t,n,e.space)}const Dy=io({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),jy=io({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function $y(e,t){return t in e?e[t]:t}function By(e,t){return $y(e,t.toLowerCase())}const Uy=io({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:By,properties:{xmlns:null,xmlnsXLink:null}}),Hy=io({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:Ae,ariaAutoComplete:null,ariaBusy:Ae,ariaChecked:Ae,ariaColCount:N,ariaColIndex:N,ariaColSpan:N,ariaControls:me,ariaCurrent:null,ariaDescribedBy:me,ariaDetails:null,ariaDisabled:Ae,ariaDropEffect:me,ariaErrorMessage:null,ariaExpanded:Ae,ariaFlowTo:me,ariaGrabbed:Ae,ariaHasPopup:null,ariaHidden:Ae,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:me,ariaLevel:N,ariaLive:null,ariaModal:Ae,ariaMultiLine:Ae,ariaMultiSelectable:Ae,ariaOrientation:null,ariaOwns:me,ariaPlaceholder:null,ariaPosInSet:N,ariaPressed:Ae,ariaReadOnly:Ae,ariaRelevant:null,ariaRequired:Ae,ariaRoleDescription:me,ariaRowCount:N,ariaRowIndex:N,ariaRowSpan:N,ariaSelected:Ae,ariaSetSize:N,ariaSort:null,ariaValueMax:N,ariaValueMin:N,ariaValueNow:N,ariaValueText:null,role:null}}),R2=io({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:By,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Vr,acceptCharset:me,accessKey:me,action:null,allow:null,allowFullScreen:G,allowPaymentRequest:G,allowUserMedia:G,alt:null,as:null,async:G,autoCapitalize:null,autoComplete:me,autoFocus:G,autoPlay:G,blocking:me,capture:G,charSet:null,checked:G,cite:null,className:me,cols:N,colSpan:null,content:null,contentEditable:Ae,controls:G,controlsList:me,coords:N|Vr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:G,defer:G,dir:null,dirName:null,disabled:G,download:Ny,draggable:Ae,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:G,formTarget:null,headers:me,height:N,hidden:G,high:N,href:null,hrefLang:null,htmlFor:me,httpEquiv:me,id:null,imageSizes:null,imageSrcSet:null,inert:G,inputMode:null,integrity:null,is:null,isMap:G,itemId:null,itemProp:me,itemRef:me,itemScope:G,itemType:me,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:G,low:N,manifest:null,max:null,maxLength:N,media:null,method:null,min:null,minLength:N,multiple:G,muted:G,name:null,nonce:null,noModule:G,noValidate:G,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:G,optimum:N,pattern:null,ping:me,placeholder:null,playsInline:G,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:G,referrerPolicy:null,rel:me,required:G,reversed:G,rows:N,rowSpan:N,sandbox:me,scope:null,scoped:G,seamless:G,selected:G,shadowRootDelegatesFocus:G,shadowRootMode:null,shape:null,size:N,sizes:null,slot:null,span:N,spellCheck:Ae,src:null,srcDoc:null,srcLang:null,srcSet:null,start:N,step:null,style:null,tabIndex:N,target:null,title:null,translate:null,type:null,typeMustMatch:G,useMap:null,value:Ae,width:N,wrap:null,align:null,aLink:null,archive:me,axis:null,background:null,bgColor:null,border:N,borderColor:null,bottomMargin:N,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:G,declare:G,event:null,face:null,frame:null,frameBorder:null,hSpace:N,leftMargin:N,link:null,longDesc:null,lowSrc:null,marginHeight:N,marginWidth:N,noResize:G,noHref:G,noShade:G,noWrap:G,object:null,profile:null,prompt:null,rev:null,rightMargin:N,rules:null,scheme:null,scrolling:Ae,standby:null,summary:null,text:null,topMargin:N,valueType:null,version:null,vAlign:null,vLink:null,vSpace:N,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:G,disableRemotePlayback:G,prefix:null,property:null,results:N,security:null,unselectable:null}}),I2=io({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:$y,properties:{about:yt,accentHeight:N,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:N,amplitude:N,arabicForm:null,ascent:N,attributeName:null,attributeType:null,azimuth:N,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:N,by:null,calcMode:null,capHeight:N,className:me,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:N,diffuseConstant:N,direction:null,display:null,dur:null,divisor:N,dominantBaseline:null,download:G,dx:null,dy:null,edgeMode:null,editable:null,elevation:N,enableBackground:null,end:null,event:null,exponent:N,externalResourcesRequired:null,fill:null,fillOpacity:N,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Vr,g2:Vr,glyphName:Vr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:N,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:N,horizOriginX:N,horizOriginY:N,id:null,ideographic:N,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:N,k:N,k1:N,k2:N,k3:N,k4:N,kernelMatrix:yt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:N,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:N,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:N,overlineThickness:N,paintOrder:null,panose1:null,path:null,pathLength:N,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:me,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:N,pointsAtY:N,pointsAtZ:N,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:yt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:yt,rev:yt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:yt,requiredFeatures:yt,requiredFonts:yt,requiredFormats:yt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:N,specularExponent:N,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:N,strikethroughThickness:N,string:null,stroke:null,strokeDashArray:yt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:N,strokeOpacity:N,strokeWidth:null,style:null,surfaceScale:N,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:yt,tabIndex:N,tableValues:null,target:null,targetX:N,targetY:N,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:yt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:N,underlineThickness:N,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:N,values:null,vAlphabetic:N,vMathematical:N,vectorEffect:null,vHanging:N,vIdeographic:N,version:null,vertAdvY:N,vertOriginX:N,vertOriginY:N,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:N,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),O2=/^data[-\w.:]+$/i,Ip=/-[a-z]/g,A2=/[A-Z]/g;function L2(e,t){const n=tc(t);let r=t,o=jt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&O2.test(t)){if(t.charAt(4)==="-"){const i=t.slice(5).replace(Ip,M2);r="data"+i.charAt(0).toUpperCase()+i.slice(1)}else{const i=t.slice(4);if(!Ip.test(i)){let l=i.replace(A2,z2);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}o=Sd}return new o(r,t)}function z2(e){return"-"+e.toLowerCase()}function M2(e){return e.charAt(1).toUpperCase()}const F2={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},N2=Fy([jy,Dy,Uy,Hy,R2],"html"),Cd=Fy([jy,Dy,Uy,Hy,I2],"svg");function D2(e){return e.join(" ").trim()}var Vy={},Op=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,j2=/\n/g,$2=/^\s*/,B2=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,U2=/^:\s*/,H2=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,V2=/^[;\s]*/,W2=/^\s+|\s+$/g,K2=`
`,Ap="/",Lp="*",tr="",Q2="comment",q2="declaration",G2=function(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function o(m){var y=m.match(j2);y&&(n+=y.length);var S=m.lastIndexOf(K2);r=~S?m.length-S:r+m.length}function i(){var m={line:n,column:r};return function(y){return y.position=new l(m),u(),y}}function l(m){this.start=m,this.end={line:n,column:r},this.source=t.source}l.prototype.content=e;function a(m){var y=new Error(t.source+":"+n+":"+r+": "+m);if(y.reason=m,y.filename=t.source,y.line=n,y.column=r,y.source=e,!t.silent)throw y}function s(m){var y=m.exec(e);if(y){var S=y[0];return o(S),e=e.slice(S.length),y}}function u(){s($2)}function d(m){var y;for(m=m||[];y=c();)y!==!1&&m.push(y);return m}function c(){var m=i();if(!(Ap!=e.charAt(0)||Lp!=e.charAt(1))){for(var y=2;tr!=e.charAt(y)&&(Lp!=e.charAt(y)||Ap!=e.charAt(y+1));)++y;if(y+=2,tr===e.charAt(y-1))return a("End of comment missing");var S=e.slice(2,y-2);return r+=2,o(S),e=e.slice(y),r+=2,m({type:Q2,comment:S})}}function f(){var m=i(),y=s(B2);if(y){if(c(),!s(U2))return a("property missing ':'");var S=s(H2),g=m({type:q2,property:zp(y[0].replace(Op,tr)),value:S?zp(S[0].replace(Op,tr)):tr});return s(V2),g}}function p(){var m=[];d(m);for(var y;y=f();)y!==!1&&(m.push(y),d(m));return m}return u(),p()};function zp(e){return e?e.replace(W2,tr):tr}var Y2=Hd&&Hd.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Vy,"__esModule",{value:!0});var X2=Y2(G2);function J2(e,t){var n=null;if(!e||typeof e!="string")return n;var r=(0,X2.default)(e),o=typeof t=="function";return r.forEach(function(i){if(i.type==="declaration"){var l=i.property,a=i.value;o?t(l,a,i):a&&(n=n||{},n[l]=a)}}),n}var Mp=Vy.default=J2;const Z2=Mp.default||Mp,Wy=Ky("end"),Ed=Ky("start");function Ky(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function eC(e){const t=Ed(e),n=Wy(e);if(t&&n)return{start:t,end:n}}function No(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Fp(e.position):"start"in e||"end"in e?Fp(e):"line"in e||"column"in e?rc(e):""}function rc(e){return Np(e&&e.line)+":"+Np(e&&e.column)}function Fp(e){return rc(e&&e.start)+"-"+rc(e&&e.end)}function Np(e){return e&&typeof e=="number"?e:1}class Ze extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let o="",i={},l=!1;if(n&&("line"in n&&"column"in n?i={place:n}:"start"in n&&"end"in n?i={place:n}:"type"in n?i={ancestors:[n],place:n.position}:i={...n}),typeof t=="string"?o=t:!i.cause&&t&&(l=!0,o=t.message,i.cause=t),!i.ruleId&&!i.source&&typeof r=="string"){const s=r.indexOf(":");s===-1?i.ruleId=r:(i.source=r.slice(0,s),i.ruleId=r.slice(s+1))}if(!i.place&&i.ancestors&&i.ancestors){const s=i.ancestors[i.ancestors.length-1];s&&(i.place=s.position)}const a=i.place&&"start"in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file,this.message=o,this.line=a?a.line:void 0,this.name=No(i.place)||"1:1",this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=l&&i.cause&&typeof i.cause.stack=="string"?i.cause.stack:"",this.actual,this.expected,this.note,this.url}}Ze.prototype.file="";Ze.prototype.name="";Ze.prototype.reason="";Ze.prototype.message="";Ze.prototype.stack="";Ze.prototype.column=void 0;Ze.prototype.line=void 0;Ze.prototype.ancestors=void 0;Ze.prototype.cause=void 0;Ze.prototype.fatal=void 0;Ze.prototype.place=void 0;Ze.prototype.ruleId=void 0;Ze.prototype.source=void 0;const Td={}.hasOwnProperty,tC=new Map,nC=/[A-Z]/g,rC=/-([a-z])/g,oC=new Set(["table","tbody","thead","tfoot","tr"]),iC=new Set(["td","th"]),Qy="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function lC(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=mC(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=pC(n,t.jsx,t.jsxs)}const o={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?Cd:N2,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},i=qy(o,e,void 0);return i&&typeof i!="string"?i:o.create(e,o.Fragment,{children:i||void 0},void 0)}function qy(e,t,n){if(t.type==="element")return aC(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return sC(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return cC(e,t,n);if(t.type==="mdxjsEsm")return uC(e,t);if(t.type==="root")return dC(e,t,n);if(t.type==="text")return fC(e,t)}function aC(e,t,n){const r=e.schema;let o=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(o=Cd,e.schema=o),e.ancestors.push(t);const i=Yy(e,t.tagName,!1),l=hC(e,t);let a=_d(e,t);return oC.has(t.tagName)&&(a=a.filter(function(s){return typeof s=="string"?!T2(s):!0})),Gy(e,l,i,t),Pd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function sC(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}gi(e,t.position)}function uC(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);gi(e,t.position)}function cC(e,t,n){const r=e.schema;let o=r;t.name==="svg"&&r.space==="html"&&(o=Cd,e.schema=o),e.ancestors.push(t);const i=t.name===null?e.Fragment:Yy(e,t.name,!0),l=gC(e,t),a=_d(e,t);return Gy(e,l,i,t),Pd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function dC(e,t,n){const r={};return Pd(r,_d(e,t)),e.create(t,e.Fragment,r,n)}function fC(e,t){return t.value}function Gy(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Pd(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function pC(e,t,n){return r;function r(o,i,l,a){const u=Array.isArray(l.children)?n:t;return a?u(i,l,a):u(i,l)}}function mC(e,t){return n;function n(r,o,i,l){const a=Array.isArray(i.children),s=Ed(r);return t(o,i,l,a,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function hC(e,t){const n={};let r,o;for(o in t.properties)if(o!=="children"&&Td.call(t.properties,o)){const i=yC(e,o,t.properties[o]);if(i){const[l,a]=i;e.tableCellAlignToStyle&&l==="align"&&typeof a=="string"&&iC.has(t.tagName)?r=a:n[l]=a}}if(r){const i=n.style||(n.style={});i[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function gC(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const i=r.data.estree.body[0];i.type;const l=i.expression;l.type;const a=l.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else gi(e,t.position);else{const o=r.name;let i;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,i=e.evaluater.evaluateExpression(a.expression)}else gi(e,t.position);else i=r.value===null?!0:r.value;n[o]=i}return n}function _d(e,t){const n=[];let r=-1;const o=e.passKeys?new Map:tC;for(;++r<t.children.length;){const i=t.children[r];let l;if(e.passKeys){const s=i.type==="element"?i.tagName:i.type==="mdxJsxFlowElement"||i.type==="mdxJsxTextElement"?i.name:void 0;if(s){const u=o.get(s)||0;l=s+"-"+u,o.set(s,u+1)}}const a=qy(e,i,l);a!==void 0&&n.push(a)}return n}function yC(e,t,n){const r=L2(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?x2(n):D2(n)),r.property==="style"){let o=typeof n=="object"?n:kC(e,String(n));return e.stylePropertyNameCase==="css"&&(o=wC(o)),["style",o]}return[e.elementAttributeNameCase==="react"&&r.space?F2[r.property]||r.property:r.attribute,n]}}function kC(e,t){const n={};try{Z2(t,r)}catch(o){if(!e.ignoreInvalidStyle){const i=o,l=new Ze("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:i,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw l.file=e.filePath||void 0,l.url=Qy+"#cannot-parse-style-attribute",l}}return n;function r(o,i){let l=o;l.slice(0,2)!=="--"&&(l.slice(0,4)==="-ms-"&&(l="ms-"+l.slice(4)),l=l.replace(rC,xC)),n[l]=i}}function Yy(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const o=t.split(".");let i=-1,l;for(;++i<o.length;){const a=Pp(o[i])?{type:"Identifier",name:o[i]}:{type:"Literal",value:o[i]};l=l?{type:"MemberExpression",object:l,property:a,computed:!!(i&&a.type==="Literal"),optional:!1}:a}r=l}else r=Pp(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const o=r.value;return Td.call(e.components,o)?e.components[o]:o}if(e.evaluater)return e.evaluater.evaluateExpression(r);gi(e)}function gi(e,t){const n=new Ze("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Qy+"#cannot-handle-mdx-estrees-without-createevaluater",n}function wC(e){const t={};let n;for(n in e)Td.call(e,n)&&(t[bC(n)]=e[n]);return t}function bC(e){let t=e.replace(nC,vC);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function xC(e,t){return t.toUpperCase()}function vC(e){return"-"+e.toLowerCase()}const zs={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},SC={};function Rd(e,t){const n=t||SC,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,o=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Xy(e,r,o)}function Xy(e,t,n){if(CC(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Dp(e.children,t,n)}return Array.isArray(e)?Dp(e,t,n):""}function Dp(e,t,n){const r=[];let o=-1;for(;++o<e.length;)r[o]=Xy(e[o],t,n);return r.join("")}function CC(e){return!!(e&&typeof e=="object")}const jp=document.createElement("i");function Id(e){const t="&"+e+";";jp.innerHTML=t;const n=jp.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function St(e,t,n,r){const o=e.length;let i=0,l;if(t<0?t=-t>o?0:o+t:t=t>o?o:t,n=n>0?n:0,r.length<1e4)l=Array.from(r),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);i<r.length;)l=r.slice(i,i+1e4),l.unshift(t,0),e.splice(...l),i+=1e4,t+=1e4}function At(e,t){return e.length>0?(St(e,e.length,0,t),e):t}const $p={}.hasOwnProperty;function Jy(e){const t={};let n=-1;for(;++n<e.length;)EC(t,e[n]);return t}function EC(e,t){let n;for(n in t){const o=($p.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n];let l;if(i)for(l in i){$p.call(o,l)||(o[l]=[]);const a=i[l];TC(o[l],Array.isArray(a)?a:a?[a]:[])}}}function TC(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);St(e,0,0,r)}function Zy(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Gt(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const PC=Yn(new RegExp("\\p{P}","u")),tt=Yn(/[A-Za-z]/),Xe=Yn(/[\dA-Za-z]/),_C=Yn(/[#-'*+\--9=?A-Z^-~]/);function na(e){return e!==null&&(e<32||e===127)}const oc=Yn(/\d/),RC=Yn(/[\dA-Fa-f]/),e0=Yn(/[!-/:-@[-`{-~]/);function K(e){return e!==null&&e<-2}function pe(e){return e!==null&&(e<0||e===32)}function Z(e){return e===-2||e===-1||e===32}function Ka(e){return e0(e)||PC(e)}const pr=Yn(/\s/);function Yn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function lo(e){const t=[];let n=-1,r=0,o=0;for(;++n<e.length;){const i=e.charCodeAt(n);let l="";if(i===37&&Xe(e.charCodeAt(n+1))&&Xe(e.charCodeAt(n+2)))o=2;else if(i<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i))||(l=String.fromCharCode(i));else if(i>55295&&i<57344){const a=e.charCodeAt(n+1);i<56320&&a>56319&&a<57344?(l=String.fromCharCode(i,a),o=1):l="�"}else l=String.fromCharCode(i);l&&(t.push(e.slice(r,n),encodeURIComponent(l)),r=n+o+1,l=""),o&&(n+=o,o=0)}return t.join("")+e.slice(r)}function J(e,t,n,r){const o=r?r-1:Number.POSITIVE_INFINITY;let i=0;return l;function l(s){return Z(s)?(e.enter(n),a(s)):t(s)}function a(s){return Z(s)&&i++<o?(e.consume(s),a):(e.exit(n),t(s))}}const IC={tokenize:OC};function OC(e){const t=e.attempt(this.parser.constructs.contentInitial,r,o);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),J(e,t,"linePrefix")}function o(a){return e.enter("paragraph"),i(a)}function i(a){const s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,l(a)}function l(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return K(a)?(e.consume(a),e.exit("chunkText"),i):(e.consume(a),l)}}const AC={tokenize:LC},Bp={tokenize:zC};function LC(e){const t=this,n=[];let r=0,o,i,l;return a;function a(k){if(r<n.length){const C=n[r];return t.containerState=C[1],e.attempt(C[0].continuation,s,u)(k)}return u(k)}function s(k){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,o&&h();const C=t.events.length;let T=C,v;for(;T--;)if(t.events[T][0]==="exit"&&t.events[T][1].type==="chunkFlow"){v=t.events[T][1].end;break}g(r);let E=C;for(;E<t.events.length;)t.events[E][1].end=Object.assign({},v),E++;return St(t.events,T+1,0,t.events.slice(C)),t.events.length=E,u(k)}return a(k)}function u(k){if(r===n.length){if(!o)return f(k);if(o.currentConstruct&&o.currentConstruct.concrete)return m(k);t.interrupt=!!(o.currentConstruct&&!o._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Bp,d,c)(k)}function d(k){return o&&h(),g(r),f(k)}function c(k){return t.parser.lazy[t.now().line]=r!==n.length,l=t.now().offset,m(k)}function f(k){return t.containerState={},e.attempt(Bp,p,m)(k)}function p(k){return r++,n.push([t.currentConstruct,t.containerState]),f(k)}function m(k){if(k===null){o&&h(),g(0),e.consume(k);return}return o=o||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:i,_tokenizer:o}),y(k)}function y(k){if(k===null){S(e.exit("chunkFlow"),!0),g(0),e.consume(k);return}return K(k)?(e.consume(k),S(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(k),y)}function S(k,C){const T=t.sliceStream(k);if(C&&T.push(null),k.previous=i,i&&(i.next=k),i=k,o.defineSkip(k.start),o.write(T),t.parser.lazy[k.start.line]){let v=o.events.length;for(;v--;)if(o.events[v][1].start.offset<l&&(!o.events[v][1].end||o.events[v][1].end.offset>l))return;const E=t.events.length;let P=E,M,w;for(;P--;)if(t.events[P][0]==="exit"&&t.events[P][1].type==="chunkFlow"){if(M){w=t.events[P][1].end;break}M=!0}for(g(r),v=E;v<t.events.length;)t.events[v][1].end=Object.assign({},w),v++;St(t.events,P+1,0,t.events.slice(E)),t.events.length=v}}function g(k){let C=n.length;for(;C-- >k;){const T=n[C];t.containerState=T[1],T[0].exit.call(t,e)}n.length=k}function h(){o.write([null]),i=void 0,o=void 0,t.containerState._closeFlow=void 0}}function zC(e,t,n){return J(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function ra(e){if(e===null||pe(e)||pr(e))return 1;if(Ka(e))return 2}function Qa(e,t,n){const r=[];let o=-1;for(;++o<e.length;){const i=e[o].resolveAll;i&&!r.includes(i)&&(t=i(t,n),r.push(i))}return t}const ic={name:"attention",tokenize:FC,resolveAll:MC};function MC(e,t){let n=-1,r,o,i,l,a,s,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const c=Object.assign({},e[r][1].end),f=Object.assign({},e[n][1].start);Up(c,-s),Up(f,s),l={type:s>1?"strongSequence":"emphasisSequence",start:c,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:f},i={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o={type:s>1?"strong":"emphasis",start:Object.assign({},l.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},l.start),e[n][1].start=Object.assign({},a.end),u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=At(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=At(u,[["enter",o,t],["enter",l,t],["exit",l,t],["enter",i,t]]),u=At(u,Qa(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=At(u,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",o,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=At(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,St(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function FC(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,o=ra(r);let i;return l;function l(s){return i=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===i)return e.consume(s),a;const u=e.exit("attentionSequence"),d=ra(s),c=!d||d===2&&o||n.includes(s),f=!o||o===2&&d||n.includes(r);return u._open=!!(i===42?c:c&&(o||!f)),u._close=!!(i===42?f:f&&(d||!c)),t(s)}}function Up(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const NC={name:"autolink",tokenize:DC};function DC(e,t,n){let r=0;return o;function o(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i}function i(p){return tt(p)?(e.consume(p),l):u(p)}function l(p){return p===43||p===45||p===46||Xe(p)?(r=1,a(p)):u(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||Xe(p))&&r++<32?(e.consume(p),a):(r=0,u(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||na(p)?n(p):(e.consume(p),s)}function u(p){return p===64?(e.consume(p),d):_C(p)?(e.consume(p),u):n(p)}function d(p){return Xe(p)?c(p):n(p)}function c(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):f(p)}function f(p){if((p===45||Xe(p))&&r++<63){const m=p===45?f:c;return e.consume(p),m}return n(p)}}const _i={tokenize:jC,partial:!0};function jC(e,t,n){return r;function r(i){return Z(i)?J(e,o,"linePrefix")(i):o(i)}function o(i){return i===null||K(i)?t(i):n(i)}}const t0={name:"blockQuote",tokenize:$C,continuation:{tokenize:BC},exit:UC};function $C(e,t,n){const r=this;return o;function o(l){if(l===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(l),e.exit("blockQuoteMarker"),i}return n(l)}function i(l){return Z(l)?(e.enter("blockQuotePrefixWhitespace"),e.consume(l),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(l))}}function BC(e,t,n){const r=this;return o;function o(l){return Z(l)?J(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):i(l)}function i(l){return e.attempt(t0,t,n)(l)}}function UC(e){e.exit("blockQuote")}const n0={name:"characterEscape",tokenize:HC};function HC(e,t,n){return r;function r(i){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(i),e.exit("escapeMarker"),o}function o(i){return e0(i)?(e.enter("characterEscapeValue"),e.consume(i),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(i)}}const r0={name:"characterReference",tokenize:VC};function VC(e,t,n){const r=this;let o=0,i,l;return a;function a(c){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),s}function s(c){return c===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(c),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),i=31,l=Xe,d(c))}function u(c){return c===88||c===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(c),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),i=6,l=RC,d):(e.enter("characterReferenceValue"),i=7,l=oc,d(c))}function d(c){if(c===59&&o){const f=e.exit("characterReferenceValue");return l===Xe&&!Id(r.sliceSerialize(f))?n(c):(e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return l(c)&&o++<i?(e.consume(c),d):n(c)}}const Hp={tokenize:KC,partial:!0},Vp={name:"codeFenced",tokenize:WC,concrete:!0};function WC(e,t,n){const r=this,o={tokenize:T,partial:!0};let i=0,l=0,a;return s;function s(v){return u(v)}function u(v){const E=r.events[r.events.length-1];return i=E&&E[1].type==="linePrefix"?E[2].sliceSerialize(E[1],!0).length:0,a=v,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(v)}function d(v){return v===a?(l++,e.consume(v),d):l<3?n(v):(e.exit("codeFencedFenceSequence"),Z(v)?J(e,c,"whitespace")(v):c(v))}function c(v){return v===null||K(v)?(e.exit("codeFencedFence"),r.interrupt?t(v):e.check(Hp,y,C)(v)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(v))}function f(v){return v===null||K(v)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(v)):Z(v)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),J(e,p,"whitespace")(v)):v===96&&v===a?n(v):(e.consume(v),f)}function p(v){return v===null||K(v)?c(v):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),m(v))}function m(v){return v===null||K(v)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(v)):v===96&&v===a?n(v):(e.consume(v),m)}function y(v){return e.attempt(o,C,S)(v)}function S(v){return e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),g}function g(v){return i>0&&Z(v)?J(e,h,"linePrefix",i+1)(v):h(v)}function h(v){return v===null||K(v)?e.check(Hp,y,C)(v):(e.enter("codeFlowValue"),k(v))}function k(v){return v===null||K(v)?(e.exit("codeFlowValue"),h(v)):(e.consume(v),k)}function C(v){return e.exit("codeFenced"),t(v)}function T(v,E,P){let M=0;return w;function w(D){return v.enter("lineEnding"),v.consume(D),v.exit("lineEnding"),I}function I(D){return v.enter("codeFencedFence"),Z(D)?J(v,L,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(D):L(D)}function L(D){return D===a?(v.enter("codeFencedFenceSequence"),B(D)):P(D)}function B(D){return D===a?(M++,v.consume(D),B):M>=l?(v.exit("codeFencedFenceSequence"),Z(D)?J(v,V,"whitespace")(D):V(D)):P(D)}function V(D){return D===null||K(D)?(v.exit("codeFencedFence"),E(D)):P(D)}}}function KC(e,t,n){const r=this;return o;function o(l){return l===null?n(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}const Ms={name:"codeIndented",tokenize:qC},QC={tokenize:GC,partial:!0};function qC(e,t,n){const r=this;return o;function o(u){return e.enter("codeIndented"),J(e,i,"linePrefix",5)(u)}function i(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?l(u):n(u)}function l(u){return u===null?s(u):K(u)?e.attempt(QC,l,s)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||K(u)?(e.exit("codeFlowValue"),l(u)):(e.consume(u),a)}function s(u){return e.exit("codeIndented"),t(u)}}function GC(e,t,n){const r=this;return o;function o(l){return r.parser.lazy[r.now().line]?n(l):K(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),o):J(e,i,"linePrefix",5)(l)}function i(l){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):K(l)?o(l):n(l)}}const YC={name:"codeText",tokenize:ZC,resolve:XC,previous:JC};function XC(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="codeTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function JC(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function ZC(e,t,n){let r=0,o,i;return l;function l(c){return e.enter("codeText"),e.enter("codeTextSequence"),a(c)}function a(c){return c===96?(e.consume(c),r++,a):(e.exit("codeTextSequence"),s(c))}function s(c){return c===null?n(c):c===32?(e.enter("space"),e.consume(c),e.exit("space"),s):c===96?(i=e.enter("codeTextSequence"),o=0,d(c)):K(c)?(e.enter("lineEnding"),e.consume(c),e.exit("lineEnding"),s):(e.enter("codeTextData"),u(c))}function u(c){return c===null||c===32||c===96||K(c)?(e.exit("codeTextData"),s(c)):(e.consume(c),u)}function d(c){return c===96?(e.consume(c),o++,d):o===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(c)):(i.type="codeTextData",u(c))}}function o0(e){const t={};let n=-1,r,o,i,l,a,s,u;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,i=0,i<s.length&&s[i][1].type==="lineEndingBlank"&&(i+=2),i<s.length&&s[i][1].type==="content"))for(;++i<s.length&&s[i][1].type!=="content";)s[i][1].type==="chunkText"&&(s[i][1]._isInFirstContentOfListItem=!0,i++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,eE(e,n)),n=t[n],u=!0);else if(r[1]._container){for(i=n,o=void 0;i--&&(l=e[i],l[1].type==="lineEnding"||l[1].type==="lineEndingBlank");)l[0]==="enter"&&(o&&(e[o][1].type="lineEndingBlank"),l[1].type="lineEnding",o=i);o&&(r[1].end=Object.assign({},e[o][1].start),a=e.slice(o,n),a.unshift(r),St(e,o,n-o+1,a))}}return!u}function eE(e,t){const n=e[t][1],r=e[t][2];let o=t-1;const i=[],l=n._tokenizer||r.parser[n.contentType](n.start),a=l.events,s=[],u={};let d,c,f=-1,p=n,m=0,y=0;const S=[y];for(;p;){for(;e[++o][1]!==p;);i.push(o),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),c&&l.defineSkip(p.start),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(d),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),c=p,p=p.next}for(p=n;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(y=f+1,S.push(y),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(l.events=[],p?(p._tokenizer=void 0,p.previous=void 0):S.pop(),f=S.length;f--;){const g=a.slice(S[f],S[f+1]),h=i.pop();s.unshift([h,h+g.length-1]),St(e,h,2,g)}for(f=-1;++f<s.length;)u[m+s[f][0]]=m+s[f][1],m+=s[f][1]-s[f][0]-1;return u}const tE={tokenize:oE,resolve:rE},nE={tokenize:iE,partial:!0};function rE(e){return o0(e),e}function oE(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),o(a)}function o(a){return a===null?i(a):K(a)?e.check(nE,l,i)(a):(e.consume(a),o)}function i(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function l(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,o}}function iE(e,t,n){const r=this;return o;function o(l){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),J(e,i,"linePrefix")}function i(l){if(l===null||K(l))return n(l);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):e.interrupt(r.parser.constructs.flow,n,t)(l)}}function i0(e,t,n,r,o,i,l,a,s){const u=s||Number.POSITIVE_INFINITY;let d=0;return c;function c(g){return g===60?(e.enter(r),e.enter(o),e.enter(i),e.consume(g),e.exit(i),f):g===null||g===32||g===41||na(g)?n(g):(e.enter(r),e.enter(l),e.enter(a),e.enter("chunkString",{contentType:"string"}),y(g))}function f(g){return g===62?(e.enter(i),e.consume(g),e.exit(i),e.exit(o),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(g))}function p(g){return g===62?(e.exit("chunkString"),e.exit(a),f(g)):g===null||g===60||K(g)?n(g):(e.consume(g),g===92?m:p)}function m(g){return g===60||g===62||g===92?(e.consume(g),p):p(g)}function y(g){return!d&&(g===null||g===41||pe(g))?(e.exit("chunkString"),e.exit(a),e.exit(l),e.exit(r),t(g)):d<u&&g===40?(e.consume(g),d++,y):g===41?(e.consume(g),d--,y):g===null||g===32||g===40||na(g)?n(g):(e.consume(g),g===92?S:y)}function S(g){return g===40||g===41||g===92?(e.consume(g),y):y(g)}}function l0(e,t,n,r,o,i){const l=this;let a=0,s;return u;function u(p){return e.enter(r),e.enter(o),e.consume(p),e.exit(o),e.enter(i),d}function d(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in l.parser.constructs?n(p):p===93?(e.exit(i),e.enter(o),e.consume(p),e.exit(o),e.exit(r),t):K(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),c(p))}function c(p){return p===null||p===91||p===93||K(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),s||(s=!Z(p)),p===92?f:c)}function f(p){return p===91||p===92||p===93?(e.consume(p),a++,c):c(p)}}function a0(e,t,n,r,o,i){let l;return a;function a(f){return f===34||f===39||f===40?(e.enter(r),e.enter(o),e.consume(f),e.exit(o),l=f===40?41:f,s):n(f)}function s(f){return f===l?(e.enter(o),e.consume(f),e.exit(o),e.exit(r),t):(e.enter(i),u(f))}function u(f){return f===l?(e.exit(i),s(l)):f===null?n(f):K(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),J(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===l||f===null||K(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?c:d)}function c(f){return f===l||f===92?(e.consume(f),d):d(f)}}function Do(e,t){let n;return r;function r(o){return K(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),n=!0,r):Z(o)?J(e,r,n?"linePrefix":"lineSuffix")(o):t(o)}}const lE={name:"definition",tokenize:sE},aE={tokenize:uE,partial:!0};function sE(e,t,n){const r=this;let o;return i;function i(p){return e.enter("definition"),l(p)}function l(p){return l0.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return o=Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return pe(p)?Do(e,u)(p):u(p)}function u(p){return i0(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(aE,c,c)(p)}function c(p){return Z(p)?J(e,f,"whitespace")(p):f(p)}function f(p){return p===null||K(p)?(e.exit("definition"),r.parser.defined.push(o),t(p)):n(p)}}function uE(e,t,n){return r;function r(a){return pe(a)?Do(e,o)(a):n(a)}function o(a){return a0(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function i(a){return Z(a)?J(e,l,"whitespace")(a):l(a)}function l(a){return a===null||K(a)?t(a):n(a)}}const cE={name:"hardBreakEscape",tokenize:dE};function dE(e,t,n){return r;function r(i){return e.enter("hardBreakEscape"),e.consume(i),o}function o(i){return K(i)?(e.exit("hardBreakEscape"),t(i)):n(i)}}const fE={name:"headingAtx",tokenize:mE,resolve:pE};function pE(e,t){let n=e.length-2,r=3,o,i;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(o={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},i={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},St(e,r,n-r+1,[["enter",o,t],["enter",i,t],["exit",i,t],["exit",o,t]])),e}function mE(e,t,n){let r=0;return o;function o(d){return e.enter("atxHeading"),i(d)}function i(d){return e.enter("atxHeadingSequence"),l(d)}function l(d){return d===35&&r++<6?(e.consume(d),l):d===null||pe(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),s(d)):d===null||K(d)?(e.exit("atxHeading"),t(d)):Z(d)?J(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function s(d){return d===35?(e.consume(d),s):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||pe(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const hE=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Wp=["pre","script","style","textarea"],gE={name:"htmlFlow",tokenize:bE,resolveTo:wE,concrete:!0},yE={tokenize:vE,partial:!0},kE={tokenize:xE,partial:!0};function wE(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function bE(e,t,n){const r=this;let o,i,l,a,s;return u;function u(x){return d(x)}function d(x){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(x),c}function c(x){return x===33?(e.consume(x),f):x===47?(e.consume(x),i=!0,y):x===63?(e.consume(x),o=3,r.interrupt?t:b):tt(x)?(e.consume(x),l=String.fromCharCode(x),S):n(x)}function f(x){return x===45?(e.consume(x),o=2,p):x===91?(e.consume(x),o=5,a=0,m):tt(x)?(e.consume(x),o=4,r.interrupt?t:b):n(x)}function p(x){return x===45?(e.consume(x),r.interrupt?t:b):n(x)}function m(x){const re="CDATA[";return x===re.charCodeAt(a++)?(e.consume(x),a===re.length?r.interrupt?t:L:m):n(x)}function y(x){return tt(x)?(e.consume(x),l=String.fromCharCode(x),S):n(x)}function S(x){if(x===null||x===47||x===62||pe(x)){const re=x===47,we=l.toLowerCase();return!re&&!i&&Wp.includes(we)?(o=1,r.interrupt?t(x):L(x)):hE.includes(l.toLowerCase())?(o=6,re?(e.consume(x),g):r.interrupt?t(x):L(x)):(o=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(x):i?h(x):k(x))}return x===45||Xe(x)?(e.consume(x),l+=String.fromCharCode(x),S):n(x)}function g(x){return x===62?(e.consume(x),r.interrupt?t:L):n(x)}function h(x){return Z(x)?(e.consume(x),h):w(x)}function k(x){return x===47?(e.consume(x),w):x===58||x===95||tt(x)?(e.consume(x),C):Z(x)?(e.consume(x),k):w(x)}function C(x){return x===45||x===46||x===58||x===95||Xe(x)?(e.consume(x),C):T(x)}function T(x){return x===61?(e.consume(x),v):Z(x)?(e.consume(x),T):k(x)}function v(x){return x===null||x===60||x===61||x===62||x===96?n(x):x===34||x===39?(e.consume(x),s=x,E):Z(x)?(e.consume(x),v):P(x)}function E(x){return x===s?(e.consume(x),s=null,M):x===null||K(x)?n(x):(e.consume(x),E)}function P(x){return x===null||x===34||x===39||x===47||x===60||x===61||x===62||x===96||pe(x)?T(x):(e.consume(x),P)}function M(x){return x===47||x===62||Z(x)?k(x):n(x)}function w(x){return x===62?(e.consume(x),I):n(x)}function I(x){return x===null||K(x)?L(x):Z(x)?(e.consume(x),I):n(x)}function L(x){return x===45&&o===2?(e.consume(x),A):x===60&&o===1?(e.consume(x),$):x===62&&o===4?(e.consume(x),Y):x===63&&o===3?(e.consume(x),b):x===93&&o===5?(e.consume(x),H):K(x)&&(o===6||o===7)?(e.exit("htmlFlowData"),e.check(yE,W,B)(x)):x===null||K(x)?(e.exit("htmlFlowData"),B(x)):(e.consume(x),L)}function B(x){return e.check(kE,V,W)(x)}function V(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),D}function D(x){return x===null||K(x)?B(x):(e.enter("htmlFlowData"),L(x))}function A(x){return x===45?(e.consume(x),b):L(x)}function $(x){return x===47?(e.consume(x),l="",O):L(x)}function O(x){if(x===62){const re=l.toLowerCase();return Wp.includes(re)?(e.consume(x),Y):L(x)}return tt(x)&&l.length<8?(e.consume(x),l+=String.fromCharCode(x),O):L(x)}function H(x){return x===93?(e.consume(x),b):L(x)}function b(x){return x===62?(e.consume(x),Y):x===45&&o===2?(e.consume(x),b):L(x)}function Y(x){return x===null||K(x)?(e.exit("htmlFlowData"),W(x)):(e.consume(x),Y)}function W(x){return e.exit("htmlFlow"),t(x)}}function xE(e,t,n){const r=this;return o;function o(l){return K(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i):n(l)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function vE(e,t,n){return r;function r(o){return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),e.attempt(_i,t,n)}}const SE={name:"htmlText",tokenize:CE};function CE(e,t,n){const r=this;let o,i,l;return a;function a(b){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(b),s}function s(b){return b===33?(e.consume(b),u):b===47?(e.consume(b),T):b===63?(e.consume(b),k):tt(b)?(e.consume(b),P):n(b)}function u(b){return b===45?(e.consume(b),d):b===91?(e.consume(b),i=0,m):tt(b)?(e.consume(b),h):n(b)}function d(b){return b===45?(e.consume(b),p):n(b)}function c(b){return b===null?n(b):b===45?(e.consume(b),f):K(b)?(l=c,$(b)):(e.consume(b),c)}function f(b){return b===45?(e.consume(b),p):c(b)}function p(b){return b===62?A(b):b===45?f(b):c(b)}function m(b){const Y="CDATA[";return b===Y.charCodeAt(i++)?(e.consume(b),i===Y.length?y:m):n(b)}function y(b){return b===null?n(b):b===93?(e.consume(b),S):K(b)?(l=y,$(b)):(e.consume(b),y)}function S(b){return b===93?(e.consume(b),g):y(b)}function g(b){return b===62?A(b):b===93?(e.consume(b),g):y(b)}function h(b){return b===null||b===62?A(b):K(b)?(l=h,$(b)):(e.consume(b),h)}function k(b){return b===null?n(b):b===63?(e.consume(b),C):K(b)?(l=k,$(b)):(e.consume(b),k)}function C(b){return b===62?A(b):k(b)}function T(b){return tt(b)?(e.consume(b),v):n(b)}function v(b){return b===45||Xe(b)?(e.consume(b),v):E(b)}function E(b){return K(b)?(l=E,$(b)):Z(b)?(e.consume(b),E):A(b)}function P(b){return b===45||Xe(b)?(e.consume(b),P):b===47||b===62||pe(b)?M(b):n(b)}function M(b){return b===47?(e.consume(b),A):b===58||b===95||tt(b)?(e.consume(b),w):K(b)?(l=M,$(b)):Z(b)?(e.consume(b),M):A(b)}function w(b){return b===45||b===46||b===58||b===95||Xe(b)?(e.consume(b),w):I(b)}function I(b){return b===61?(e.consume(b),L):K(b)?(l=I,$(b)):Z(b)?(e.consume(b),I):M(b)}function L(b){return b===null||b===60||b===61||b===62||b===96?n(b):b===34||b===39?(e.consume(b),o=b,B):K(b)?(l=L,$(b)):Z(b)?(e.consume(b),L):(e.consume(b),V)}function B(b){return b===o?(e.consume(b),o=void 0,D):b===null?n(b):K(b)?(l=B,$(b)):(e.consume(b),B)}function V(b){return b===null||b===34||b===39||b===60||b===61||b===96?n(b):b===47||b===62||pe(b)?M(b):(e.consume(b),V)}function D(b){return b===47||b===62||pe(b)?M(b):n(b)}function A(b){return b===62?(e.consume(b),e.exit("htmlTextData"),e.exit("htmlText"),t):n(b)}function $(b){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),O}function O(b){return Z(b)?J(e,H,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(b):H(b)}function H(b){return e.enter("htmlTextData"),l(b)}}const Od={name:"labelEnd",tokenize:IE,resolveTo:RE,resolveAll:_E},EE={tokenize:OE},TE={tokenize:AE},PE={tokenize:LE};function _E(e){let t=-1;for(;++t<e.length;){const n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function RE(e,t){let n=e.length,r=0,o,i,l,a;for(;n--;)if(o=e[n][1],i){if(o.type==="link"||o.type==="labelLink"&&o._inactive)break;e[n][0]==="enter"&&o.type==="labelLink"&&(o._inactive=!0)}else if(l){if(e[n][0]==="enter"&&(o.type==="labelImage"||o.type==="labelLink")&&!o._balanced&&(i=n,o.type!=="labelLink")){r=2;break}}else o.type==="labelEnd"&&(l=n);const s={type:e[i][1].type==="labelLink"?"link":"image",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)},u={type:"label",start:Object.assign({},e[i][1].start),end:Object.assign({},e[l][1].end)},d={type:"labelText",start:Object.assign({},e[i+r+2][1].end),end:Object.assign({},e[l-2][1].start)};return a=[["enter",s,t],["enter",u,t]],a=At(a,e.slice(i+1,i+r+3)),a=At(a,[["enter",d,t]]),a=At(a,Qa(t.parser.constructs.insideSpan.null,e.slice(i+r+4,l-3),t)),a=At(a,[["exit",d,t],e[l-2],e[l-1],["exit",u,t]]),a=At(a,e.slice(l+1)),a=At(a,[["exit",s,t]]),St(e,i,e.length,a),e}function IE(e,t,n){const r=this;let o=r.events.length,i,l;for(;o--;)if((r.events[o][1].type==="labelImage"||r.events[o][1].type==="labelLink")&&!r.events[o][1]._balanced){i=r.events[o][1];break}return a;function a(f){return i?i._inactive?c(f):(l=r.parser.defined.includes(Gt(r.sliceSerialize({start:i.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),s):n(f)}function s(f){return f===40?e.attempt(EE,d,l?d:c)(f):f===91?e.attempt(TE,d,l?u:c)(f):l?d(f):c(f)}function u(f){return e.attempt(PE,d,c)(f)}function d(f){return t(f)}function c(f){return i._balanced=!0,n(f)}}function OE(e,t,n){return r;function r(c){return e.enter("resource"),e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),o}function o(c){return pe(c)?Do(e,i)(c):i(c)}function i(c){return c===41?d(c):i0(e,l,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function l(c){return pe(c)?Do(e,s)(c):d(c)}function a(c){return n(c)}function s(c){return c===34||c===39||c===40?a0(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):d(c)}function u(c){return pe(c)?Do(e,d)(c):d(c)}function d(c){return c===41?(e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),e.exit("resource"),t):n(c)}}function AE(e,t,n){const r=this;return o;function o(a){return l0.call(r,e,i,l,"reference","referenceMarker","referenceString")(a)}function i(a){return r.parser.defined.includes(Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function l(a){return n(a)}}function LE(e,t,n){return r;function r(i){return e.enter("reference"),e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),o}function o(i){return i===93?(e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),e.exit("reference"),t):n(i)}}const zE={name:"labelStartImage",tokenize:ME,resolveAll:Od.resolveAll};function ME(e,t,n){const r=this;return o;function o(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),i}function i(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),l):n(a)}function l(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const FE={name:"labelStartLink",tokenize:NE,resolveAll:Od.resolveAll};function NE(e,t,n){const r=this;return o;function o(l){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelLink"),i}function i(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const Fs={name:"lineEnding",tokenize:DE};function DE(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),J(e,t,"linePrefix")}}const Sl={name:"thematicBreak",tokenize:jE};function jE(e,t,n){let r=0,o;return i;function i(u){return e.enter("thematicBreak"),l(u)}function l(u){return o=u,a(u)}function a(u){return u===o?(e.enter("thematicBreakSequence"),s(u)):r>=3&&(u===null||K(u))?(e.exit("thematicBreak"),t(u)):n(u)}function s(u){return u===o?(e.consume(u),r++,s):(e.exit("thematicBreakSequence"),Z(u)?J(e,a,"whitespace")(u):a(u))}}const at={name:"list",tokenize:UE,continuation:{tokenize:HE},exit:WE},$E={tokenize:KE,partial:!0},BE={tokenize:VE,partial:!0};function UE(e,t,n){const r=this,o=r.events[r.events.length-1];let i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0,l=0;return a;function a(p){const m=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(m==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:oc(p)){if(r.containerState.type||(r.containerState.type=m,e.enter(m,{_container:!0})),m==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(Sl,n,u)(p):u(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return oc(p)&&++l<10?(e.consume(p),s):(!r.interrupt||l<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(_i,r.interrupt?n:d,e.attempt($E,f,c))}function d(p){return r.containerState.initialBlankLine=!0,i++,f(p)}function c(p){return Z(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return r.containerState.size=i+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function HE(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(_i,o,i);function o(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,J(e,t,"listItemIndent",r.containerState.size+1)(a)}function i(a){return r.containerState.furtherBlankLines||!Z(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,l(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(BE,t,l)(a))}function l(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,J(e,e.attempt(at,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function VE(e,t,n){const r=this;return J(e,o,"listItemIndent",r.containerState.size+1);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===r.containerState.size?t(i):n(i)}}function WE(e){e.exit(this.containerState.type)}function KE(e,t,n){const r=this;return J(e,o,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function o(i){const l=r.events[r.events.length-1];return!Z(i)&&l&&l[1].type==="listItemPrefixWhitespace"?t(i):n(i)}}const Kp={name:"setextUnderline",tokenize:qE,resolveTo:QE};function QE(e,t){let n=e.length,r,o,i;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(o=n)}else e[n][1].type==="content"&&e.splice(n,1),!i&&e[n][1].type==="definition"&&(i=n);const l={type:"setextHeading",start:Object.assign({},e[o][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[o][1].type="setextHeadingText",i?(e.splice(o,0,["enter",l,t]),e.splice(i+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[i][1].end)):e[r][1]=l,e.push(["exit",l,t]),e}function qE(e,t,n){const r=this;let o;return i;function i(u){let d=r.events.length,c;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){c=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(e.enter("setextHeadingLine"),o=u,l(u)):n(u)}function l(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===o?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),Z(u)?J(e,s,"lineSuffix")(u):s(u))}function s(u){return u===null||K(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const GE={tokenize:YE};function YE(e){const t=this,n=e.attempt(_i,r,e.attempt(this.parser.constructs.flowInitial,o,J(e,e.attempt(this.parser.constructs.flow,o,e.attempt(tE,o)),"linePrefix")));return n;function r(i){if(i===null){e.consume(i);return}return e.enter("lineEndingBlank"),e.consume(i),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function o(i){if(i===null){e.consume(i);return}return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const XE={resolveAll:u0()},JE=s0("string"),ZE=s0("text");function s0(e){return{tokenize:t,resolveAll:u0(e==="text"?e5:void 0)};function t(n){const r=this,o=this.parser.constructs[e],i=n.attempt(o,l,a);return l;function l(d){return u(d)?i(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),s}function s(d){return u(d)?(n.exit("data"),i(d)):(n.consume(d),s)}function u(d){if(d===null)return!0;const c=o[d];let f=-1;if(c)for(;++f<c.length;){const p=c[f];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function u0(e){return t;function t(n,r){let o=-1,i;for(;++o<=n.length;)i===void 0?n[o]&&n[o][1].type==="data"&&(i=o,o++):(!n[o]||n[o][1].type!=="data")&&(o!==i+2&&(n[i][1].end=n[o-1][1].end,n.splice(i+2,o-i-2),o=i+2),i=void 0);return e?e(n,r):n}}function e5(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],o=t.sliceStream(r);let i=o.length,l=-1,a=0,s;for(;i--;){const u=o[i];if(typeof u=="string"){for(l=u.length;u.charCodeAt(l-1)===32;)a++,l--;if(l)break;l=-1}else if(u===-2)s=!0,a++;else if(u!==-1){i++;break}}if(a){const u={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+i,_bufferIndex:i?l:r.start._bufferIndex+l},end:Object.assign({},r.end)};r.end=Object.assign({},u.start),r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}function t5(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1});const o={},i=[];let l=[],a=[];const s={consume:h,enter:k,exit:C,attempt:E(T),check:E(v),interrupt:E(v,{interrupt:!0})},u={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:f,now:m,defineSkip:y,write:c};let d=t.tokenize.call(u,s);return t.resolveAll&&i.push(t),u;function c(I){return l=At(l,I),S(),l[l.length-1]!==null?[]:(P(t,0),u.events=Qa(i,u.events,u),u.events)}function f(I,L){return r5(p(I),L)}function p(I){return n5(l,I)}function m(){const{line:I,column:L,offset:B,_index:V,_bufferIndex:D}=r;return{line:I,column:L,offset:B,_index:V,_bufferIndex:D}}function y(I){o[I.line]=I.column,w()}function S(){let I;for(;r._index<l.length;){const L=l[r._index];if(typeof L=="string")for(I=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===I&&r._bufferIndex<L.length;)g(L.charCodeAt(r._bufferIndex));else g(L)}}function g(I){d=d(I)}function h(I){K(I)?(r.line++,r.column=1,r.offset+=I===-3?2:1,w()):I!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===l[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=I}function k(I,L){const B=L||{};return B.type=I,B.start=m(),u.events.push(["enter",B,u]),a.push(B),B}function C(I){const L=a.pop();return L.end=m(),u.events.push(["exit",L,u]),L}function T(I,L){P(I,L.from)}function v(I,L){L.restore()}function E(I,L){return B;function B(V,D,A){let $,O,H,b;return Array.isArray(V)?W(V):"tokenize"in V?W([V]):Y(V);function Y(ee){return Ue;function Ue(it){const _t=it!==null&&ee[it],mt=it!==null&&ee.null,wr=[...Array.isArray(_t)?_t:_t?[_t]:[],...Array.isArray(mt)?mt:mt?[mt]:[]];return W(wr)(it)}}function W(ee){return $=ee,O=0,ee.length===0?A:x(ee[O])}function x(ee){return Ue;function Ue(it){return b=M(),H=ee,ee.partial||(u.currentConstruct=ee),ee.name&&u.parser.constructs.disable.null.includes(ee.name)?we():ee.tokenize.call(L?Object.assign(Object.create(u),L):u,s,re,we)(it)}}function re(ee){return I(H,b),D}function we(ee){return b.restore(),++O<$.length?x($[O]):A}}}function P(I,L){I.resolveAll&&!i.includes(I)&&i.push(I),I.resolve&&St(u.events,L,u.events.length-L,I.resolve(u.events.slice(L),u)),I.resolveTo&&(u.events=I.resolveTo(u.events,u))}function M(){const I=m(),L=u.previous,B=u.currentConstruct,V=u.events.length,D=Array.from(a);return{restore:A,from:V};function A(){r=I,u.previous=L,u.currentConstruct=B,u.events.length=V,a=D,w()}}function w(){r.line in o&&r.column<2&&(r.column=o[r.line],r.offset+=o[r.line]-1)}}function n5(e,t){const n=t.start._index,r=t.start._bufferIndex,o=t.end._index,i=t.end._bufferIndex;let l;if(n===o)l=[e[n].slice(r,i)];else{if(l=e.slice(n,o),r>-1){const a=l[0];typeof a=="string"?l[0]=a.slice(r):l.shift()}i>0&&l.push(e[o].slice(0,i))}return l}function r5(e,t){let n=-1;const r=[];let o;for(;++n<e.length;){const i=e[n];let l;if(typeof i=="string")l=i;else switch(i){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=t?" ":"	";break}case-1:{if(!t&&o)continue;l=" ";break}default:l=String.fromCharCode(i)}o=i===-2,r.push(l)}return r.join("")}const o5={42:at,43:at,45:at,48:at,49:at,50:at,51:at,52:at,53:at,54:at,55:at,56:at,57:at,62:t0},i5={91:lE},l5={[-2]:Ms,[-1]:Ms,32:Ms},a5={35:fE,42:Sl,45:[Kp,Sl],60:gE,61:Kp,95:Sl,96:Vp,126:Vp},s5={38:r0,92:n0},u5={[-5]:Fs,[-4]:Fs,[-3]:Fs,33:zE,38:r0,42:ic,60:[NC,SE],91:FE,92:[cE,n0],93:Od,95:ic,96:YC},c5={null:[ic,XE]},d5={null:[42,95]},f5={null:[]},p5=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:d5,contentInitial:i5,disable:f5,document:o5,flow:a5,flowInitial:l5,insideSpan:c5,string:s5,text:u5},Symbol.toStringTag,{value:"Module"}));function m5(e){const n=Jy([p5,...(e||{}).extensions||[]]),r={defined:[],lazy:{},constructs:n,content:o(IC),document:o(AC),flow:o(GE),string:o(JE),text:o(ZE)};return r;function o(i){return l;function l(a){return t5(r,i,a)}}}function h5(e){for(;!o0(e););return e}const Qp=/[\0\t\n\r]/g;function g5(){let e=1,t="",n=!0,r;return o;function o(i,l,a){const s=[];let u,d,c,f,p;for(i=t+(typeof i=="string"?i.toString():new TextDecoder(l||void 0).decode(i)),c=0,t="",n&&(i.charCodeAt(0)===65279&&c++,n=void 0);c<i.length;){if(Qp.lastIndex=c,u=Qp.exec(i),f=u&&u.index!==void 0?u.index:i.length,p=i.charCodeAt(f),!u){t=i.slice(c);break}if(p===10&&c===f&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),c<f&&(s.push(i.slice(c,f)),e+=f-c),p){case 0:{s.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,s.push(-2);e++<d;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}c=f+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}const y5=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function k5(e){return e.replace(y5,w5)}function w5(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const o=n.charCodeAt(1),i=o===120||o===88;return Zy(n.slice(i?2:1),i?16:10)}return Id(n)||e}const c0={}.hasOwnProperty;function b5(e,t,n){return typeof t!="string"&&(n=t,t=void 0),x5(n)(h5(m5(n).document().write(g5()(e,t,!0))))}function x5(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:i(Oe),autolinkProtocol:M,autolinkEmail:M,atxHeading:i(Me),blockQuote:i(_t),characterEscape:M,characterReference:M,codeFenced:i(mt),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:i(mt,l),codeText:i(wr,l),codeTextData:M,data:M,codeFlowValue:M,definition:i(de),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:i(fe),hardBreakEscape:i(be),hardBreakTrailing:i(be),htmlFlow:i(ht,l),htmlFlowData:M,htmlText:i(ht,l),htmlTextData:M,image:i(Cn),label:l,link:i(Oe),listItem:i($t),listItemValue:f,listOrdered:i(De,c),listUnordered:i(De),paragraph:i(Ii),reference:x,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:i(Me),strong:i(Oi),thematicBreak:i(lt)},exit:{atxHeading:s(),atxHeadingSequence:T,autolink:s(),autolinkEmail:it,autolinkProtocol:Ue,blockQuote:s(),characterEscapeValue:w,characterReferenceMarkerHexadecimal:we,characterReferenceMarkerNumeric:we,characterReferenceValue:ee,codeFenced:s(S),codeFencedFence:y,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:w,codeIndented:s(g),codeText:s(D),codeTextData:w,data:w,definition:s(),definitionDestinationString:C,definitionLabelString:h,definitionTitleString:k,emphasis:s(),hardBreakEscape:s(L),hardBreakTrailing:s(L),htmlFlow:s(B),htmlFlowData:w,htmlText:s(V),htmlTextData:w,image:s($),label:H,labelText:O,lineEnding:I,link:s(A),listItem:s(),listOrdered:s(),listUnordered:s(),paragraph:s(),referenceString:re,resourceDestinationString:b,resourceTitleString:Y,resource:W,setextHeading:s(P),setextHeadingLineSequence:E,setextHeadingText:v,strong:s(),thematicBreak:s()}};d0(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(_){let j={type:"root",children:[]};const q={stack:[j],tokenStack:[],config:t,enter:a,exit:u,buffer:l,resume:d,data:n},X=[];let ce=-1;for(;++ce<_.length;)if(_[ce][1].type==="listOrdered"||_[ce][1].type==="listUnordered")if(_[ce][0]==="enter")X.push(ce);else{const Bt=X.pop();ce=o(_,Bt,ce)}for(ce=-1;++ce<_.length;){const Bt=t[_[ce][0]];c0.call(Bt,_[ce][1].type)&&Bt[_[ce][1].type].call(Object.assign({sliceSerialize:_[ce][2].sliceSerialize},q),_[ce][1])}if(q.tokenStack.length>0){const Bt=q.tokenStack[q.tokenStack.length-1];(Bt[1]||qp).call(q,void 0,Bt[0])}for(j.position={start:Tn(_.length>0?_[0][1].start:{line:1,column:1,offset:0}),end:Tn(_.length>0?_[_.length-2][1].end:{line:1,column:1,offset:0})},ce=-1;++ce<t.transforms.length;)j=t.transforms[ce](j)||j;return j}function o(_,j,q){let X=j-1,ce=-1,Bt=!1,Xn,sn,ao,so;for(;++X<=q;){const gt=_[X];switch(gt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{gt[0]==="enter"?ce++:ce--,so=void 0;break}case"lineEndingBlank":{gt[0]==="enter"&&(Xn&&!so&&!ce&&!ao&&(ao=X),so=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:so=void 0}if(!ce&&gt[0]==="enter"&&gt[1].type==="listItemPrefix"||ce===-1&&gt[0]==="exit"&&(gt[1].type==="listUnordered"||gt[1].type==="listOrdered")){if(Xn){let br=X;for(sn=void 0;br--;){const un=_[br];if(un[1].type==="lineEnding"||un[1].type==="lineEndingBlank"){if(un[0]==="exit")continue;sn&&(_[sn][1].type="lineEndingBlank",Bt=!0),un[1].type="lineEnding",sn=br}else if(!(un[1].type==="linePrefix"||un[1].type==="blockQuotePrefix"||un[1].type==="blockQuotePrefixWhitespace"||un[1].type==="blockQuoteMarker"||un[1].type==="listItemIndent"))break}ao&&(!sn||ao<sn)&&(Xn._spread=!0),Xn.end=Object.assign({},sn?_[sn][1].start:gt[1].end),_.splice(sn||X,0,["exit",Xn,gt[2]]),X++,q++}if(gt[1].type==="listItemPrefix"){const br={type:"listItem",_spread:!1,start:Object.assign({},gt[1].start),end:void 0};Xn=br,_.splice(X,0,["enter",br,gt[2]]),X++,q++,ao=void 0,so=!0}}}return _[j][1]._spread=Bt,q}function i(_,j){return q;function q(X){a.call(this,_(X),X),j&&j.call(this,X)}}function l(){this.stack.push({type:"fragment",children:[]})}function a(_,j,q){this.stack[this.stack.length-1].children.push(_),this.stack.push(_),this.tokenStack.push([j,q]),_.position={start:Tn(j.start),end:void 0}}function s(_){return j;function j(q){_&&_.call(this,q),u.call(this,q)}}function u(_,j){const q=this.stack.pop(),X=this.tokenStack.pop();if(X)X[0].type!==_.type&&(j?j.call(this,_,X[0]):(X[1]||qp).call(this,_,X[0]));else throw new Error("Cannot close `"+_.type+"` ("+No({start:_.start,end:_.end})+"): it’s not open");q.position.end=Tn(_.end)}function d(){return Rd(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function f(_){if(this.data.expectingFirstListItemValue){const j=this.stack[this.stack.length-2];j.start=Number.parseInt(this.sliceSerialize(_),10),this.data.expectingFirstListItemValue=void 0}}function p(){const _=this.resume(),j=this.stack[this.stack.length-1];j.lang=_}function m(){const _=this.resume(),j=this.stack[this.stack.length-1];j.meta=_}function y(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function S(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_.replace(/(\r?\n|\r)$/g,"")}function h(_){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(_)).toLowerCase()}function k(){const _=this.resume(),j=this.stack[this.stack.length-1];j.title=_}function C(){const _=this.resume(),j=this.stack[this.stack.length-1];j.url=_}function T(_){const j=this.stack[this.stack.length-1];if(!j.depth){const q=this.sliceSerialize(_).length;j.depth=q}}function v(){this.data.setextHeadingSlurpLineEnding=!0}function E(_){const j=this.stack[this.stack.length-1];j.depth=this.sliceSerialize(_).codePointAt(0)===61?1:2}function P(){this.data.setextHeadingSlurpLineEnding=void 0}function M(_){const q=this.stack[this.stack.length-1].children;let X=q[q.length-1];(!X||X.type!=="text")&&(X=Ai(),X.position={start:Tn(_.start),end:void 0},q.push(X)),this.stack.push(X)}function w(_){const j=this.stack.pop();j.value+=this.sliceSerialize(_),j.position.end=Tn(_.end)}function I(_){const j=this.stack[this.stack.length-1];if(this.data.atHardBreak){const q=j.children[j.children.length-1];q.position.end=Tn(_.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(j.type)&&(M.call(this,_),w.call(this,_))}function L(){this.data.atHardBreak=!0}function B(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function V(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function D(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function A(){const _=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";_.type+="Reference",_.referenceType=j,delete _.url,delete _.title}else delete _.identifier,delete _.label;this.data.referenceType=void 0}function $(){const _=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";_.type+="Reference",_.referenceType=j,delete _.url,delete _.title}else delete _.identifier,delete _.label;this.data.referenceType=void 0}function O(_){const j=this.sliceSerialize(_),q=this.stack[this.stack.length-2];q.label=k5(j),q.identifier=Gt(j).toLowerCase()}function H(){const _=this.stack[this.stack.length-1],j=this.resume(),q=this.stack[this.stack.length-1];if(this.data.inReference=!0,q.type==="link"){const X=_.children;q.children=X}else q.alt=j}function b(){const _=this.resume(),j=this.stack[this.stack.length-1];j.url=_}function Y(){const _=this.resume(),j=this.stack[this.stack.length-1];j.title=_}function W(){this.data.inReference=void 0}function x(){this.data.referenceType="collapsed"}function re(_){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(_)).toLowerCase(),this.data.referenceType="full"}function we(_){this.data.characterReferenceType=_.type}function ee(_){const j=this.sliceSerialize(_),q=this.data.characterReferenceType;let X;q?(X=Zy(j,q==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):X=Id(j);const ce=this.stack.pop();ce.value+=X,ce.position.end=Tn(_.end)}function Ue(_){w.call(this,_);const j=this.stack[this.stack.length-1];j.url=this.sliceSerialize(_)}function it(_){w.call(this,_);const j=this.stack[this.stack.length-1];j.url="mailto:"+this.sliceSerialize(_)}function _t(){return{type:"blockquote",children:[]}}function mt(){return{type:"code",lang:null,meta:null,value:""}}function wr(){return{type:"inlineCode",value:""}}function de(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function fe(){return{type:"emphasis",children:[]}}function Me(){return{type:"heading",depth:0,children:[]}}function be(){return{type:"break"}}function ht(){return{type:"html",value:""}}function Cn(){return{type:"image",title:null,url:"",alt:null}}function Oe(){return{type:"link",title:null,url:"",children:[]}}function De(_){return{type:"list",ordered:_.type==="listOrdered",start:null,spread:_._spread,children:[]}}function $t(_){return{type:"listItem",spread:_._spread,checked:null,children:[]}}function Ii(){return{type:"paragraph",children:[]}}function Oi(){return{type:"strong",children:[]}}function Ai(){return{type:"text",value:""}}function lt(){return{type:"thematicBreak"}}}function Tn(e){return{line:e.line,column:e.column,offset:e.offset}}function d0(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?d0(e,r):v5(e,r)}}function v5(e,t){let n;for(n in t)if(c0.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function qp(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+No({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+No({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+No({start:t.start,end:t.end})+") is still open")}function S5(e){const t=this;t.parser=n;function n(r){return b5(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function C5(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function E5(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function T5(e,t){const n=t.value?t.value+`
`:"",r={};t.lang&&(r.className=["language-"+t.lang]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function P5(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function _5(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function R5(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),o=lo(r.toLowerCase()),i=e.footnoteOrder.indexOf(r);let l,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),l=e.footnoteOrder.length):l=i+1,a+=1,e.footnoteCounts.set(r,a);const s={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+o,id:n+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,s);const u={type:"element",tagName:"sup",properties:{},children:[s]};return e.patch(t,u),e.applyData(t,u)}function I5(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function O5(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function f0(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const o=e.all(t),i=o[0];i&&i.type==="text"?i.value="["+i.value:o.unshift({type:"text",value:"["});const l=o[o.length-1];return l&&l.type==="text"?l.value+=r:o.push({type:"text",value:r}),o}function A5(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return f0(e,t);const o={src:lo(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"img",properties:o,children:[]};return e.patch(t,i),e.applyData(t,i)}function L5(e,t){const n={src:lo(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function z5(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function M5(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return f0(e,t);const o={href:lo(r.url||"")};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"a",properties:o,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function F5(e,t){const n={href:lo(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function N5(e,t,n){const r=e.all(t),o=n?D5(n):p0(t),i={},l=[];if(typeof t.checked=="boolean"){const d=r[0];let c;d&&d.type==="element"&&d.tagName==="p"?c=d:(c={type:"element",tagName:"p",properties:{},children:[]},r.unshift(c)),c.children.length>0&&c.children.unshift({type:"text",value:" "}),c.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),i.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(o||a!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!o?l.push(...d.children):l.push(d)}const s=r[r.length-1];s&&(o||s.type!=="element"||s.tagName!=="p")&&l.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:i,children:l};return e.patch(t,u),e.applyData(t,u)}function D5(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=p0(n[r])}return t}function p0(e){const t=e.spread;return t??e.children.length>1}function j5(e,t){const n={},r=e.all(t);let o=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++o<r.length;){const l=r[o];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const i={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,i),e.applyData(t,i)}function $5(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function B5(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function U5(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function H5(e,t){const n=e.all(t),r=n.shift(),o=[];if(r){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],l),o.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Ed(t.children[1]),s=Wy(t.children[t.children.length-1]);a&&s&&(l.position={start:a,end:s}),o.push(l)}const i={type:"element",tagName:"table",properties:{},children:e.wrap(o,!0)};return e.patch(t,i),e.applyData(t,i)}function V5(e,t,n){const r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,a=l?l.length:t.children.length;let s=-1;const u=[];for(;++s<a;){const c=t.children[s],f={},p=l?l[s]:void 0;p&&(f.align=p);let m={type:"element",tagName:i,properties:f,children:[]};c&&(m.children=e.all(c),e.patch(c,m),m=e.applyData(c,m)),u.push(m)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function W5(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Gp=9,Yp=32;function K5(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),o=0;const i=[];for(;r;)i.push(Xp(t.slice(o,r.index),o>0,!0),r[0]),o=r.index+r[0].length,r=n.exec(t);return i.push(Xp(t.slice(o),o>0,!1)),i.join("")}function Xp(e,t,n){let r=0,o=e.length;if(t){let i=e.codePointAt(r);for(;i===Gp||i===Yp;)r++,i=e.codePointAt(r)}if(n){let i=e.codePointAt(o-1);for(;i===Gp||i===Yp;)o--,i=e.codePointAt(o-1)}return o>r?e.slice(r,o):""}function Q5(e,t){const n={type:"text",value:K5(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function q5(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const G5={blockquote:C5,break:E5,code:T5,delete:P5,emphasis:_5,footnoteReference:R5,heading:I5,html:O5,imageReference:A5,image:L5,inlineCode:z5,linkReference:M5,link:F5,listItem:N5,list:j5,paragraph:$5,root:B5,strong:U5,table:H5,tableCell:W5,tableRow:V5,text:Q5,thematicBreak:q5,toml:nl,yaml:nl,definition:nl,footnoteDefinition:nl};function nl(){}const m0=-1,qa=0,oa=1,ia=2,Ad=3,Ld=4,zd=5,Md=6,h0=7,g0=8,Jp=typeof self=="object"?self:globalThis,Y5=(e,t)=>{const n=(o,i)=>(e.set(i,o),o),r=o=>{if(e.has(o))return e.get(o);const[i,l]=t[o];switch(i){case qa:case m0:return n(l,o);case oa:{const a=n([],o);for(const s of l)a.push(r(s));return a}case ia:{const a=n({},o);for(const[s,u]of l)a[r(s)]=r(u);return a}case Ad:return n(new Date(l),o);case Ld:{const{source:a,flags:s}=l;return n(new RegExp(a,s),o)}case zd:{const a=n(new Map,o);for(const[s,u]of l)a.set(r(s),r(u));return a}case Md:{const a=n(new Set,o);for(const s of l)a.add(r(s));return a}case h0:{const{name:a,message:s}=l;return n(new Jp[a](s),o)}case g0:return n(BigInt(l),o);case"BigInt":return n(Object(BigInt(l)),o)}return n(new Jp[i](l),o)};return r},Zp=e=>Y5(new Map,e)(0),vr="",{toString:X5}={},{keys:J5}=Object,bo=e=>{const t=typeof e;if(t!=="object"||!e)return[qa,t];const n=X5.call(e).slice(8,-1);switch(n){case"Array":return[oa,vr];case"Object":return[ia,vr];case"Date":return[Ad,vr];case"RegExp":return[Ld,vr];case"Map":return[zd,vr];case"Set":return[Md,vr]}return n.includes("Array")?[oa,n]:n.includes("Error")?[h0,n]:[ia,n]},rl=([e,t])=>e===qa&&(t==="function"||t==="symbol"),Z5=(e,t,n,r)=>{const o=(l,a)=>{const s=r.push(l)-1;return n.set(a,s),s},i=l=>{if(n.has(l))return n.get(l);let[a,s]=bo(l);switch(a){case qa:{let d=l;switch(s){case"bigint":a=g0,d=l.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+s);d=null;break;case"undefined":return o([m0],l)}return o([a,d],l)}case oa:{if(s)return o([s,[...l]],l);const d=[],c=o([a,d],l);for(const f of l)d.push(i(f));return c}case ia:{if(s)switch(s){case"BigInt":return o([s,l.toString()],l);case"Boolean":case"Number":case"String":return o([s,l.valueOf()],l)}if(t&&"toJSON"in l)return i(l.toJSON());const d=[],c=o([a,d],l);for(const f of J5(l))(e||!rl(bo(l[f])))&&d.push([i(f),i(l[f])]);return c}case Ad:return o([a,l.toISOString()],l);case Ld:{const{source:d,flags:c}=l;return o([a,{source:d,flags:c}],l)}case zd:{const d=[],c=o([a,d],l);for(const[f,p]of l)(e||!(rl(bo(f))||rl(bo(p))))&&d.push([i(f),i(p)]);return c}case Md:{const d=[],c=o([a,d],l);for(const f of l)(e||!rl(bo(f)))&&d.push(i(f));return c}}const{message:u}=l;return o([a,{name:s,message:u}],l)};return i},em=(e,{json:t,lossy:n}={})=>{const r=[];return Z5(!(t||n),!!t,new Map,r)(e),r},la=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Zp(em(e,t)):structuredClone(e):(e,t)=>Zp(em(e,t));function e3(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function t3(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function n3(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||e3,r=e.options.footnoteBackLabel||t3,o=e.options.footnoteLabel||"Footnotes",i=e.options.footnoteLabelTagName||"h2",l=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let s=-1;for(;++s<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[s]);if(!u)continue;const d=e.all(u),c=String(u.identifier).toUpperCase(),f=lo(c.toLowerCase());let p=0;const m=[],y=e.footnoteCounts.get(c);for(;y!==void 0&&++p<=y;){m.length>0&&m.push({type:"text",value:" "});let h=typeof n=="string"?n:n(s,p);typeof h=="string"&&(h={type:"text",value:h}),m.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(s,p),className:["data-footnote-backref"]},children:Array.isArray(h)?h:[h]})}const S=d[d.length-1];if(S&&S.type==="element"&&S.tagName==="p"){const h=S.children[S.children.length-1];h&&h.type==="text"?h.value+=" ":S.children.push({type:"text",value:" "}),S.children.push(...m)}else d.push(...m);const g={type:"element",tagName:"li",properties:{id:t+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,g),a.push(g)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:i,properties:{...la(l),id:"footnote-label"},children:[{type:"text",value:o}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const Ga=function(e){if(e==null)return l3;if(typeof e=="function")return Ya(e);if(typeof e=="object")return Array.isArray(e)?r3(e):o3(e);if(typeof e=="string")return i3(e);throw new Error("Expected function, string, or object as test")};function r3(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Ga(e[n]);return Ya(r);function r(...o){let i=-1;for(;++i<t.length;)if(t[i].apply(this,o))return!0;return!1}}function o3(e){const t=e;return Ya(n);function n(r){const o=r;let i;for(i in e)if(o[i]!==t[i])return!1;return!0}}function i3(e){return Ya(t);function t(n){return n&&n.type===e}}function Ya(e){return t;function t(n,r,o){return!!(a3(n)&&e.call(this,n,typeof r=="number"?r:void 0,o||void 0))}}function l3(){return!0}function a3(e){return e!==null&&typeof e=="object"&&"type"in e}const y0=[],s3=!0,lc=!1,u3="skip";function k0(e,t,n,r){let o;typeof t=="function"&&typeof n!="function"?(r=n,n=t):o=t;const i=Ga(o),l=r?-1:1;a(e,void 0,[])();function a(s,u,d){const c=s&&typeof s=="object"?s:{};if(typeof c.type=="string"){const p=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(s.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=y0,m,y,S;if((!t||i(s,u,d[d.length-1]||void 0))&&(p=c3(n(s,d)),p[0]===lc))return p;if("children"in s&&s.children){const g=s;if(g.children&&p[0]!==u3)for(y=(r?g.children.length:-1)+l,S=d.concat(g);y>-1&&y<g.children.length;){const h=g.children[y];if(m=a(h,y,S)(),m[0]===lc)return m;y=typeof m[1]=="number"?m[1]:y+l}}return p}}}function c3(e){return Array.isArray(e)?e:typeof e=="number"?[s3,e]:e==null?y0:[e]}function Fd(e,t,n,r){let o,i,l;typeof t=="function"&&typeof n!="function"?(i=void 0,l=t,o=n):(i=t,l=n,o=r),k0(e,i,a,o);function a(s,u){const d=u[u.length-1],c=d?d.children.indexOf(s):void 0;return l(s,c,d)}}const ac={}.hasOwnProperty,d3={};function f3(e,t){const n=t||d3,r=new Map,o=new Map,i=new Map,l={...G5,...n.handlers},a={all:u,applyData:m3,definitionById:r,footnoteById:o,footnoteCounts:i,footnoteOrder:[],handlers:l,one:s,options:n,patch:p3,wrap:g3};return Fd(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const c=d.type==="definition"?r:o,f=String(d.identifier).toUpperCase();c.has(f)||c.set(f,d)}}),a;function s(d,c){const f=d.type,p=a.handlers[f];if(ac.call(a.handlers,f)&&p)return p(a,d,c);if(a.options.passThrough&&a.options.passThrough.includes(f)){if("children"in d){const{children:y,...S}=d,g=la(S);return g.children=a.all(d),g}return la(d)}return(a.options.unknownHandler||h3)(a,d,c)}function u(d){const c=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const m=a.one(f[p],d);if(m){if(p&&f[p-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=tm(m.value)),!Array.isArray(m)&&m.type==="element")){const y=m.children[0];y&&y.type==="text"&&(y.value=tm(y.value))}Array.isArray(m)?c.push(...m):c.push(m)}}}return c}}function p3(e,t){e.position&&(t.position=eC(e))}function m3(e,t){let n=t;if(e&&e.data){const r=e.data.hName,o=e.data.hChildren,i=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const l="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:l}}n.type==="element"&&i&&Object.assign(n.properties,la(i)),"children"in n&&n.children&&o!==null&&o!==void 0&&(n.children=o)}return n}function h3(e,t){const n=t.data||{},r="value"in t&&!(ac.call(n,"hProperties")||ac.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function g3(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function tm(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function nm(e,t){const n=f3(e,t),r=n.one(e,void 0),o=n3(n),i=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return o&&i.children.push({type:"text",value:`
`},o),i}function y3(e,t){return e&&"run"in e?async function(n,r){const o=nm(n,{file:r,...t});await e.run(o,r)}:function(n,r){return nm(n,{file:r,...t||e})}}function rm(e){if(e)throw e}var Cl=Object.prototype.hasOwnProperty,w0=Object.prototype.toString,om=Object.defineProperty,im=Object.getOwnPropertyDescriptor,lm=function(t){return typeof Array.isArray=="function"?Array.isArray(t):w0.call(t)==="[object Array]"},am=function(t){if(!t||w0.call(t)!=="[object Object]")return!1;var n=Cl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Cl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var o;for(o in t);return typeof o>"u"||Cl.call(t,o)},sm=function(t,n){om&&n.name==="__proto__"?om(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},um=function(t,n){if(n==="__proto__")if(Cl.call(t,n)){if(im)return im(t,n).value}else return;return t[n]},k3=function e(){var t,n,r,o,i,l,a=arguments[0],s=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},s=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});s<u;++s)if(t=arguments[s],t!=null)for(n in t)r=um(a,n),o=um(t,n),a!==o&&(d&&o&&(am(o)||(i=lm(o)))?(i?(i=!1,l=r&&lm(r)?r:[]):l=r&&am(r)?r:{},sm(a,{name:n,newValue:e(d,l,o)})):typeof o<"u"&&sm(a,{name:n,newValue:o}));return a};const Ns=aa(k3);function sc(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function w3(){const e=[],t={run:n,use:r};return t;function n(...o){let i=-1;const l=o.pop();if(typeof l!="function")throw new TypeError("Expected function as last argument, not "+l);a(null,...o);function a(s,...u){const d=e[++i];let c=-1;if(s){l(s);return}for(;++c<o.length;)(u[c]===null||u[c]===void 0)&&(u[c]=o[c]);o=u,d?b3(d,a)(...u):l(null,...u)}}function r(o){if(typeof o!="function")throw new TypeError("Expected `middelware` to be a function, not "+o);return e.push(o),t}}function b3(e,t){let n;return r;function r(...l){const a=e.length>l.length;let s;a&&l.push(o);try{s=e.apply(this,l)}catch(u){const d=u;if(a&&n)throw d;return o(d)}a||(s instanceof Promise?s.then(i,o):s instanceof Error?o(s):i(s))}function o(l,...a){n||(n=!0,t(l,...a))}function i(l){o(null,l)}}const Zt={basename:x3,dirname:v3,extname:S3,join:C3,sep:"/"};function x3(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ri(e);let n=0,r=-1,o=e.length,i;if(t===void 0||t.length===0||t.length>e.length){for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else r<0&&(i=!0,r=o+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let l=-1,a=t.length-1;for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else l<0&&(i=!0,l=o+1),a>-1&&(e.codePointAt(o)===t.codePointAt(a--)?a<0&&(r=o):(a=-1,r=l));return n===r?r=l:r<0&&(r=e.length),e.slice(n,r)}function v3(e){if(Ri(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function S3(e){Ri(e);let t=e.length,n=-1,r=0,o=-1,i=0,l;for(;t--;){const a=e.codePointAt(t);if(a===47){if(l){r=t+1;break}continue}n<0&&(l=!0,n=t+1),a===46?o<0?o=t:i!==1&&(i=1):o>-1&&(i=-1)}return o<0||n<0||i===0||i===1&&o===n-1&&o===r+1?"":e.slice(o,n)}function C3(...e){let t=-1,n;for(;++t<e.length;)Ri(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":E3(n)}function E3(e){Ri(e);const t=e.codePointAt(0)===47;let n=T3(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function T3(e,t){let n="",r=0,o=-1,i=0,l=-1,a,s;for(;++l<=e.length;){if(l<e.length)a=e.codePointAt(l);else{if(a===47)break;a=47}if(a===47){if(!(o===l-1||i===1))if(o!==l-1&&i===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),o=l,i=0;continue}}else if(n.length>0){n="",r=0,o=l,i=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(o+1,l):n=e.slice(o+1,l),r=l-o-1;o=l,i=0}else a===46&&i>-1?i++:i=-1}return n}function Ri(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const P3={cwd:_3};function _3(){return"/"}function uc(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function R3(e){if(typeof e=="string")e=new URL(e);else if(!uc(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return I3(e)}function I3(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const o=new TypeError("File URL path must not include encoded / characters");throw o.code="ERR_INVALID_FILE_URL_PATH",o}}return decodeURIComponent(t)}const Ds=["history","path","basename","stem","extname","dirname"];class b0{constructor(t){let n;t?uc(t)?n={path:t}:typeof t=="string"||O3(t)?n={value:t}:n=t:n={},this.cwd=P3.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<Ds.length;){const i=Ds[r];i in n&&n[i]!==void 0&&n[i]!==null&&(this[i]=i==="history"?[...n[i]]:n[i])}let o;for(o in n)Ds.includes(o)||(this[o]=n[o])}get basename(){return typeof this.path=="string"?Zt.basename(this.path):void 0}set basename(t){$s(t,"basename"),js(t,"basename"),this.path=Zt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Zt.dirname(this.path):void 0}set dirname(t){cm(this.basename,"dirname"),this.path=Zt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Zt.extname(this.path):void 0}set extname(t){if(js(t,"extname"),cm(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Zt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){uc(t)&&(t=R3(t)),$s(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Zt.basename(this.path,this.extname):void 0}set stem(t){$s(t,"stem"),js(t,"stem"),this.path=Zt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const o=this.message(t,n,r);throw o.fatal=!0,o}info(t,n,r){const o=this.message(t,n,r);return o.fatal=void 0,o}message(t,n,r){const o=new Ze(t,n,r);return this.path&&(o.name=this.path+":"+o.name,o.file=this.path),o.fatal=!1,this.messages.push(o),o}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function js(e,t){if(e&&e.includes(Zt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Zt.sep+"`")}function $s(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function cm(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function O3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const A3=function(e){const r=this.constructor.prototype,o=r[e],i=function(){return o.apply(i,arguments)};Object.setPrototypeOf(i,r);const l=Object.getOwnPropertyNames(o);for(const a of l){const s=Object.getOwnPropertyDescriptor(o,a);s&&Object.defineProperty(i,a,s)}return i},L3={}.hasOwnProperty;class Nd extends A3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=w3()}copy(){const t=new Nd;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(Ns(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(Hs("data",this.frozen),this.namespace[t]=n,this):L3.call(this.namespace,t)&&this.namespace[t]||void 0:t?(Hs("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const o=n.call(t,...r);typeof o=="function"&&this.transformers.use(o)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=ol(t),r=this.parser||this.Parser;return Bs("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),Bs("process",this.parser||this.Parser),Us("process",this.compiler||this.Compiler),n?o(void 0,n):new Promise(o);function o(i,l){const a=ol(t),s=r.parse(a);r.run(s,a,function(d,c,f){if(d||!c||!f)return u(d);const p=c,m=r.stringify(p,f);F3(m)?f.value=m:f.result=m,u(d,f)});function u(d,c){d||!c?l(d):i?i(c):n(void 0,c)}}}processSync(t){let n=!1,r;return this.freeze(),Bs("processSync",this.parser||this.Parser),Us("processSync",this.compiler||this.Compiler),this.process(t,o),fm("processSync","process",n),r;function o(i,l){n=!0,rm(i),r=l}}run(t,n,r){dm(t),this.freeze();const o=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?i(void 0,r):new Promise(i);function i(l,a){const s=ol(n);o.run(t,s,u);function u(d,c,f){const p=c||t;d?a(d):l?l(p):r(void 0,p,f)}}}runSync(t,n){let r=!1,o;return this.run(t,n,i),fm("runSync","run",r),o;function i(l,a){rm(l),o=a,r=!0}}stringify(t,n){this.freeze();const r=ol(n),o=this.compiler||this.Compiler;return Us("stringify",o),dm(t),o(t,r)}use(t,...n){const r=this.attachers,o=this.namespace;if(Hs("use",this.frozen),t!=null)if(typeof t=="function")s(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):l(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function i(u){if(typeof u=="function")s(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...c]=u;s(d,c)}else l(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function l(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(o.settings=Ns(!0,o.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const c=u[d];i(c)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function s(u,d){let c=-1,f=-1;for(;++c<r.length;)if(r[c][0]===u){f=c;break}if(f===-1)r.push([u,...d]);else if(d.length>0){let[p,...m]=d;const y=r[f][1];sc(y)&&sc(p)&&(p=Ns(!0,y,p)),r[f]=[u,p,...m]}}}}const z3=new Nd().freeze();function Bs(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Us(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Hs(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function dm(e){if(!sc(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function fm(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function ol(e){return M3(e)?e:new b0(e)}function M3(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function F3(e){return typeof e=="string"||N3(e)}function N3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const D3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",pm=[],mm={allowDangerousHtml:!0},j3=/^(https?|ircs?|mailto|xmpp)$/i,$3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function B3(e){const t=e.allowedElements,n=e.allowElement,r=e.children||"",o=e.className,i=e.components,l=e.disallowedElements,a=e.rehypePlugins||pm,s=e.remarkPlugins||pm,u=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...mm}:mm,d=e.skipHtml,c=e.unwrapDisallowed,f=e.urlTransform||U3,p=z3().use(S5).use(s).use(y3,u).use(a),m=new b0;typeof r=="string"&&(m.value=r);for(const h of $3)Object.hasOwn(e,h.from)&&(""+h.from+(h.to?"use `"+h.to+"` instead":"remove it")+D3+h.id,void 0);const y=p.parse(m);let S=p.runSync(y,m);return o&&(S={type:"element",tagName:"div",properties:{className:o},children:S.type==="root"?S.children:[S]}),Fd(S,g),lC(S,{Fragment:z.Fragment,components:i,ignoreInvalidStyle:!0,jsx:z.jsx,jsxs:z.jsxs,passKeys:!0,passNode:!0});function g(h,k,C){if(h.type==="raw"&&C&&typeof k=="number")return d?C.children.splice(k,1):C.children[k]={type:"text",value:h.value},k;if(h.type==="element"){let T;for(T in zs)if(Object.hasOwn(zs,T)&&Object.hasOwn(h.properties,T)){const v=h.properties[T],E=zs[T];(E===null||E.includes(h.tagName))&&(h.properties[T]=f(String(v||""),T,h))}}if(h.type==="element"){let T=t?!t.includes(h.tagName):l?l.includes(h.tagName):!1;if(!T&&n&&typeof k=="number"&&(T=!n(h,k,C)),T&&C&&typeof k=="number")return c&&h.children?C.children.splice(k,1,...h.children):C.children.splice(k,1),k}}}function U3(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),o=e.indexOf("/");return t<0||o>-1&&t>o||n>-1&&t>n||r>-1&&t>r||j3.test(e.slice(0,t))?e:""}function hm(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,o=n.indexOf(t);for(;o!==-1;)r++,o=n.indexOf(t,o+t.length);return r}function H3(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function V3(e,t,n){const o=Ga((n||{}).ignore||[]),i=W3(t);let l=-1;for(;++l<i.length;)k0(e,"text",a);function a(u,d){let c=-1,f;for(;++c<d.length;){const p=d[c],m=f?f.children:void 0;if(o(p,m?m.indexOf(p):void 0,f))return;f=p}if(f)return s(u,d)}function s(u,d){const c=d[d.length-1],f=i[l][0],p=i[l][1];let m=0;const S=c.children.indexOf(u);let g=!1,h=[];f.lastIndex=0;let k=f.exec(u.value);for(;k;){const C=k.index,T={index:k.index,input:k.input,stack:[...d,u]};let v=p(...k,T);if(typeof v=="string"&&(v=v.length>0?{type:"text",value:v}:void 0),v===!1?f.lastIndex=C+1:(m!==C&&h.push({type:"text",value:u.value.slice(m,C)}),Array.isArray(v)?h.push(...v):v&&h.push(v),m=C+k[0].length,g=!0),!f.global)break;k=f.exec(u.value)}return g?(m<u.value.length&&h.push({type:"text",value:u.value.slice(m)}),c.children.splice(S,1,...h)):h=[u],S+h.length}}function W3(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const o=n[r];t.push([K3(o[0]),Q3(o[1])])}return t}function K3(e){return typeof e=="string"?new RegExp(H3(e),"g"):e}function Q3(e){return typeof e=="function"?e:function(){return e}}const Vs="phrasing",Ws=["autolink","link","image","label"];function q3(){return{transforms:[t4],enter:{literalAutolink:Y3,literalAutolinkEmail:Ks,literalAutolinkHttp:Ks,literalAutolinkWww:Ks},exit:{literalAutolink:e4,literalAutolinkEmail:Z3,literalAutolinkHttp:X3,literalAutolinkWww:J3}}}function G3(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Vs,notInConstruct:Ws},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Vs,notInConstruct:Ws},{character:":",before:"[ps]",after:"\\/",inConstruct:Vs,notInConstruct:Ws}]}}function Y3(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Ks(e){this.config.enter.autolinkProtocol.call(this,e)}function X3(e){this.config.exit.autolinkProtocol.call(this,e)}function J3(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function Z3(e){this.config.exit.autolinkEmail.call(this,e)}function e4(e){this.exit(e)}function t4(e){V3(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,n4],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,r4]],{ignore:["link","linkReference"]})}function n4(e,t,n,r,o){let i="";if(!x0(o)||(/^w/i.test(t)&&(n=t+n,t="",i="http://"),!o4(n)))return!1;const l=i4(n+r);if(!l[0])return!1;const a={type:"link",title:null,url:i+t+l[0],children:[{type:"text",value:t+l[0]}]};return l[1]?[a,{type:"text",value:l[1]}]:a}function r4(e,t,n,r){return!x0(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function o4(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function i4(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const o=hm(e,"(");let i=hm(e,")");for(;r!==-1&&o>i;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),i++;return[e,n]}function x0(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||pr(n)||Ka(n))&&(!t||n!==47)}v0.peek=g4;function l4(){return{enter:{gfmFootnoteDefinition:s4,gfmFootnoteDefinitionLabelString:u4,gfmFootnoteCall:f4,gfmFootnoteCallString:p4},exit:{gfmFootnoteDefinition:d4,gfmFootnoteDefinitionLabelString:c4,gfmFootnoteCall:h4,gfmFootnoteCallString:m4}}}function a4(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:y4,footnoteReference:v0}}}function s4(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function u4(){this.buffer()}function c4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function d4(e){this.exit(e)}function f4(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function p4(){this.buffer()}function m4(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function h4(e){this.exit(e)}function v0(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteReference"),a=n.enter("reference");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),l(),i+=o.move("]"),i}function g4(){return"["}function y4(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteDefinition"),a=n.enter("label");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),i+=o.move("]:"+(e.children&&e.children.length>0?" ":"")),o.shift(4),i+=o.move(n.indentLines(n.containerFlow(e,o.current()),k4)),l(),i}function k4(e,t,n){return t===0?e:(n?"":"    ")+e}const w4=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];S0.peek=C4;function b4(){return{canContainEols:["delete"],enter:{strikethrough:v4},exit:{strikethrough:S4}}}function x4(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:w4}],handlers:{delete:S0}}}function v4(e){this.enter({type:"delete",children:[]},e)}function S4(e){this.exit(e)}function S0(e,t,n,r){const o=n.createTracker(r),i=n.enter("strikethrough");let l=o.move("~~");return l+=n.containerPhrasing(e,{...o.current(),before:l,after:"~"}),l+=o.move("~~"),i(),l}function C4(){return"~"}function E4(e,t={}){const n=(t.align||[]).concat(),r=t.stringLength||P4,o=[],i=[],l=[],a=[];let s=0,u=-1;for(;++u<e.length;){const m=[],y=[];let S=-1;for(e[u].length>s&&(s=e[u].length);++S<e[u].length;){const g=T4(e[u][S]);if(t.alignDelimiters!==!1){const h=r(g);y[S]=h,(a[S]===void 0||h>a[S])&&(a[S]=h)}m.push(g)}i[u]=m,l[u]=y}let d=-1;if(typeof n=="object"&&"length"in n)for(;++d<s;)o[d]=gm(n[d]);else{const m=gm(n);for(;++d<s;)o[d]=m}d=-1;const c=[],f=[];for(;++d<s;){const m=o[d];let y="",S="";m===99?(y=":",S=":"):m===108?y=":":m===114&&(S=":");let g=t.alignDelimiters===!1?1:Math.max(1,a[d]-y.length-S.length);const h=y+"-".repeat(g)+S;t.alignDelimiters!==!1&&(g=y.length+g+S.length,g>a[d]&&(a[d]=g),f[d]=g),c[d]=h}i.splice(1,0,c),l.splice(1,0,f),u=-1;const p=[];for(;++u<i.length;){const m=i[u],y=l[u];d=-1;const S=[];for(;++d<s;){const g=m[d]||"";let h="",k="";if(t.alignDelimiters!==!1){const C=a[d]-(y[d]||0),T=o[d];T===114?h=" ".repeat(C):T===99?C%2?(h=" ".repeat(C/2+.5),k=" ".repeat(C/2-.5)):(h=" ".repeat(C/2),k=h):k=" ".repeat(C)}t.delimiterStart!==!1&&!d&&S.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&g==="")&&(t.delimiterStart!==!1||d)&&S.push(" "),t.alignDelimiters!==!1&&S.push(h),S.push(g),t.alignDelimiters!==!1&&S.push(k),t.padding!==!1&&S.push(" "),(t.delimiterEnd!==!1||d!==s-1)&&S.push("|")}p.push(t.delimiterEnd===!1?S.join("").replace(/ +$/,""):S.join(""))}return p.join(`
`)}function T4(e){return e==null?"":String(e)}function P4(e){return e.length}function gm(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function _4(e,t,n,r){const o=n.enter("blockquote"),i=n.createTracker(r);i.move("> "),i.shift(2);const l=n.indentLines(n.containerFlow(e,i.current()),R4);return o(),l}function R4(e,t,n){return">"+(n?"":" ")+e}function I4(e,t){return ym(e,t.inConstruct,!0)&&!ym(e,t.notInConstruct,!1)}function ym(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function km(e,t,n,r){let o=-1;for(;++o<n.unsafe.length;)if(n.unsafe[o].character===`
`&&I4(n.stack,n.unsafe[o]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function C0(e,t){const n=String(e);let r=n.indexOf(t),o=r,i=0,l=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===o?++i>l&&(l=i):i=1,o=r+t.length,r=n.indexOf(t,o);return l}function O4(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function A4(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function L4(e,t,n,r){const o=A4(n),i=e.value||"",l=o==="`"?"GraveAccent":"Tilde";if(O4(e,n)){const c=n.enter("codeIndented"),f=n.indentLines(i,z4);return c(),f}const a=n.createTracker(r),s=o.repeat(Math.max(C0(i,o)+1,3)),u=n.enter("codeFenced");let d=a.move(s);if(e.lang){const c=n.enter(`codeFencedLang${l}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),c()}if(e.lang&&e.meta){const c=n.enter(`codeFencedMeta${l}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),c()}return d+=a.move(`
`),i&&(d+=a.move(i+`
`)),d+=a.move(s),u(),d}function z4(e,t,n){return(n?"":"    ")+e}function Dd(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function M4(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("definition");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("[");return u+=s.move(n.safe(n.associationId(e),{before:u,after:"]",...s.current()})),u+=s.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),l(),u}function F4(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}E0.peek=N4;function E0(e,t,n,r){const o=F4(n),i=n.enter("emphasis"),l=n.createTracker(r);let a=l.move(o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o),i(),a}function N4(e,t,n){return n.options.emphasis||"*"}function D4(e,t){let n=!1;return Fd(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,lc}),!!((!e.depth||e.depth<3)&&Rd(e)&&(t.options.setext||n))}function j4(e,t,n,r){const o=Math.max(Math.min(6,e.depth||1),1),i=n.createTracker(r);if(D4(e,n)){const d=n.enter("headingSetext"),c=n.enter("phrasing"),f=n.containerPhrasing(e,{...i.current(),before:`
`,after:`
`});return c(),d(),f+`
`+(o===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const l="#".repeat(o),a=n.enter("headingAtx"),s=n.enter("phrasing");i.move(l+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...i.current()});return/^[\t ]/.test(u)&&(u="&#x"+u.charCodeAt(0).toString(16).toUpperCase()+";"+u.slice(1)),u=u?l+" "+u:l,n.options.closeAtx&&(u+=" "+l),s(),a(),u}T0.peek=$4;function T0(e){return e.value||""}function $4(){return"<"}P0.peek=B4;function P0(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("image");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("![");return u+=s.move(n.safe(e.alt,{before:u,after:"]",...s.current()})),u+=s.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),u+=s.move(")"),l(),u}function B4(){return"!"}_0.peek=U4;function _0(e,t,n,r){const o=e.referenceType,i=n.enter("imageReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("![");const u=n.safe(e.alt,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function U4(){return"!"}R0.peek=H4;function R0(e,t,n){let r=e.value||"",o="`",i=-1;for(;new RegExp("(^|[^`])"+o+"([^`]|$)").test(r);)o+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++i<n.unsafe.length;){const l=n.unsafe[i],a=n.compilePattern(l);let s;if(l.atBreak)for(;s=a.exec(r);){let u=s.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(s.index+1)}}return o+r+o}function H4(){return"`"}function I0(e,t){const n=Rd(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}O0.peek=V4;function O0(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.createTracker(r);let a,s;if(I0(e,n)){const d=n.stack;n.stack=[],a=n.enter("autolink");let c=l.move("<");return c+=l.move(n.containerPhrasing(e,{before:c,after:">",...l.current()})),c+=l.move(">"),a(),n.stack=d,c}a=n.enter("link"),s=n.enter("label");let u=l.move("[");return u+=l.move(n.containerPhrasing(e,{before:u,after:"](",...l.current()})),u+=l.move("]("),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(s=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":")",...l.current()}))),s(),e.title&&(s=n.enter(`title${i}`),u+=l.move(" "+o),u+=l.move(n.safe(e.title,{before:u,after:o,...l.current()})),u+=l.move(o),s()),u+=l.move(")"),a(),u}function V4(e,t,n){return I0(e,n)?"<":"["}A0.peek=W4;function A0(e,t,n,r){const o=e.referenceType,i=n.enter("linkReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("[");const u=n.containerPhrasing(e,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function W4(){return"["}function jd(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function K4(e){const t=jd(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function Q4(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function L0(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function q4(e,t,n,r){const o=n.enter("list"),i=n.bulletCurrent;let l=e.ordered?Q4(n):jd(n);const a=e.ordered?l==="."?")":".":K4(n);let s=t&&n.bulletLastUsed?l===n.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((l==="*"||l==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(s=!0),L0(n)===l&&d){let c=-1;for(;++c<e.children.length;){const f=e.children[c];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){s=!0;break}}}}s&&(l=a),n.bulletCurrent=l;const u=n.containerFlow(e,r);return n.bulletLastUsed=l,n.bulletCurrent=i,o(),u}function G4(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function Y4(e,t,n,r){const o=G4(n);let i=n.bulletCurrent||jd(n);t&&t.type==="list"&&t.ordered&&(i=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+i);let l=i.length+1;(o==="tab"||o==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(l=Math.ceil(l/4)*4);const a=n.createTracker(r);a.move(i+" ".repeat(l-i.length)),a.shift(l);const s=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,a.current()),d);return s(),u;function d(c,f,p){return f?(p?"":" ".repeat(l))+c:(p?i:i+" ".repeat(l-i.length))+c}}function X4(e,t,n,r){const o=n.enter("paragraph"),i=n.enter("phrasing"),l=n.containerPhrasing(e,r);return i(),o(),l}const J4=Ga(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","link","linkReference","strong","text"]);function Z4(e,t,n,r){return(e.children.some(function(l){return J4(l)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function eT(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}z0.peek=tT;function z0(e,t,n,r){const o=eT(n),i=n.enter("strong"),l=n.createTracker(r);let a=l.move(o+o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o+o),i(),a}function tT(e,t,n){return n.options.strong||"*"}function nT(e,t,n,r){return n.safe(e.value,r)}function rT(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function oT(e,t,n){const r=(L0(n)+(n.options.ruleSpaces?" ":"")).repeat(rT(n));return n.options.ruleSpaces?r.slice(0,-1):r}const M0={blockquote:_4,break:km,code:L4,definition:M4,emphasis:E0,hardBreak:km,heading:j4,html:T0,image:P0,imageReference:_0,inlineCode:R0,link:O0,linkReference:A0,list:q4,listItem:Y4,paragraph:X4,root:Z4,strong:z0,text:nT,thematicBreak:oT};function iT(){return{enter:{table:lT,tableData:wm,tableHeader:wm,tableRow:sT},exit:{codeText:uT,table:aT,tableData:Qs,tableHeader:Qs,tableRow:Qs}}}function lT(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function aT(e){this.exit(e),this.data.inTable=void 0}function sT(e){this.enter({type:"tableRow",children:[]},e)}function Qs(e){this.exit(e)}function wm(e){this.enter({type:"tableCell",children:[]},e)}function uT(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,cT));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function cT(e,t){return t==="|"?t:e}function dT(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,o=t.stringLength,i=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:l,tableCell:s,tableRow:a}};function l(p,m,y,S){return u(d(p,y,S),p.align)}function a(p,m,y,S){const g=c(p,y,S),h=u([g]);return h.slice(0,h.indexOf(`
`))}function s(p,m,y,S){const g=y.enter("tableCell"),h=y.enter("phrasing"),k=y.containerPhrasing(p,{...S,before:i,after:i});return h(),g(),k}function u(p,m){return E4(p,{align:m,alignDelimiters:r,padding:n,stringLength:o})}function d(p,m,y){const S=p.children;let g=-1;const h=[],k=m.enter("table");for(;++g<S.length;)h[g]=c(S[g],m,y);return k(),h}function c(p,m,y){const S=p.children;let g=-1;const h=[],k=m.enter("tableRow");for(;++g<S.length;)h[g]=s(S[g],p,m,y);return k(),h}function f(p,m,y){let S=M0.inlineCode(p,m,y);return y.stack.includes("tableCell")&&(S=S.replace(/\|/g,"\\$&")),S}}function fT(){return{exit:{taskListCheckValueChecked:bm,taskListCheckValueUnchecked:bm,paragraph:mT}}}function pT(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:hT}}}function bm(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function mT(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const o=t.children;let i=-1,l;for(;++i<o.length;){const a=o[i];if(a.type==="paragraph"){l=a;break}}l===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function hT(e,t,n,r){const o=e.children[0],i=typeof e.checked=="boolean"&&o&&o.type==="paragraph",l="["+(e.checked?"x":" ")+"] ",a=n.createTracker(r);i&&a.move(l);let s=M0.listItem(e,t,n,{...r,...a.current()});return i&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),s;function u(d){return d+l}}function gT(){return[q3(),l4(),b4(),iT(),fT()]}function yT(e){return{extensions:[G3(),a4(),x4(),dT(e),pT()]}}const kT={tokenize:CT,partial:!0},F0={tokenize:ET,partial:!0},N0={tokenize:TT,partial:!0},D0={tokenize:PT,partial:!0},wT={tokenize:_T,partial:!0},j0={tokenize:vT,previous:B0},$0={tokenize:ST,previous:U0},Sn={tokenize:xT,previous:H0},an={};function bT(){return{text:an}}let Jn=48;for(;Jn<123;)an[Jn]=Sn,Jn++,Jn===58?Jn=65:Jn===91&&(Jn=97);an[43]=Sn;an[45]=Sn;an[46]=Sn;an[95]=Sn;an[72]=[Sn,$0];an[104]=[Sn,$0];an[87]=[Sn,j0];an[119]=[Sn,j0];function xT(e,t,n){const r=this;let o,i;return l;function l(c){return!cc(c)||!H0.call(r,r.previous)||$d(r.events)?n(c):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(c))}function a(c){return cc(c)?(e.consume(c),a):c===64?(e.consume(c),s):n(c)}function s(c){return c===46?e.check(wT,d,u)(c):c===45||c===95||Xe(c)?(i=!0,e.consume(c),s):d(c)}function u(c){return e.consume(c),o=!0,s}function d(c){return i&&o&&tt(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(c)):n(c)}}function vT(e,t,n){const r=this;return o;function o(l){return l!==87&&l!==119||!B0.call(r,r.previous)||$d(r.events)?n(l):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(kT,e.attempt(F0,e.attempt(N0,i),n),n)(l))}function i(l){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(l)}}function ST(e,t,n){const r=this;let o="",i=!1;return l;function l(c){return(c===72||c===104)&&U0.call(r,r.previous)&&!$d(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),o+=String.fromCodePoint(c),e.consume(c),a):n(c)}function a(c){if(tt(c)&&o.length<5)return o+=String.fromCodePoint(c),e.consume(c),a;if(c===58){const f=o.toLowerCase();if(f==="http"||f==="https")return e.consume(c),s}return n(c)}function s(c){return c===47?(e.consume(c),i?u:(i=!0,s)):n(c)}function u(c){return c===null||na(c)||pe(c)||pr(c)||Ka(c)?n(c):e.attempt(F0,e.attempt(N0,d),n)(c)}function d(c){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(c)}}function CT(e,t,n){let r=0;return o;function o(l){return(l===87||l===119)&&r<3?(r++,e.consume(l),o):l===46&&r===3?(e.consume(l),i):n(l)}function i(l){return l===null?n(l):t(l)}}function ET(e,t,n){let r,o,i;return l;function l(u){return u===46||u===95?e.check(D0,s,a)(u):u===null||pe(u)||pr(u)||u!==45&&Ka(u)?s(u):(i=!0,e.consume(u),l)}function a(u){return u===95?r=!0:(o=r,r=void 0),e.consume(u),l}function s(u){return o||r||!i?n(u):t(u)}}function TT(e,t){let n=0,r=0;return o;function o(l){return l===40?(n++,e.consume(l),o):l===41&&r<n?i(l):l===33||l===34||l===38||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===60||l===63||l===93||l===95||l===126?e.check(D0,t,i)(l):l===null||pe(l)||pr(l)?t(l):(e.consume(l),o)}function i(l){return l===41&&r++,e.consume(l),o}}function PT(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),i):a===93?(e.consume(a),o):a===60||a===null||pe(a)||pr(a)?t(a):n(a)}function o(a){return a===null||a===40||a===91||pe(a)||pr(a)?t(a):r(a)}function i(a){return tt(a)?l(a):n(a)}function l(a){return a===59?(e.consume(a),r):tt(a)?(e.consume(a),l):n(a)}}function _T(e,t,n){return r;function r(i){return e.consume(i),o}function o(i){return Xe(i)?n(i):t(i)}}function B0(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||pe(e)}function U0(e){return!tt(e)}function H0(e){return!(e===47||cc(e))}function cc(e){return e===43||e===45||e===46||e===95||Xe(e)}function $d(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const RT={tokenize:NT,partial:!0};function IT(){return{document:{91:{tokenize:zT,continuation:{tokenize:MT},exit:FT}},text:{91:{tokenize:LT},93:{add:"after",tokenize:OT,resolveTo:AT}}}}function OT(e,t,n){const r=this;let o=r.events.length;const i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let l;for(;o--;){const s=r.events[o][1];if(s.type==="labelImage"){l=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!l||!l._balanced)return n(s);const u=Gt(r.sliceSerialize({start:l.end,end:r.now()}));return u.codePointAt(0)!==94||!i.includes(u.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function AT(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},o={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};o.end.column++,o.end.offset++,o.end._bufferIndex++;const i={type:"gfmFootnoteCallString",start:Object.assign({},o.end),end:Object.assign({},e[e.length-1][1].start)},l={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",o,t],["exit",o,t],["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function LT(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i=0,l;return a;function a(c){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),s}function s(c){return c!==94?n(c):(e.enter("gfmFootnoteCallMarker"),e.consume(c),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(c){if(i>999||c===93&&!l||c===null||c===91||pe(c))return n(c);if(c===93){e.exit("chunkString");const f=e.exit("gfmFootnoteCallString");return o.includes(Gt(r.sliceSerialize(f)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(c)}return pe(c)||(l=!0),i++,e.consume(c),c===92?d:u}function d(c){return c===91||c===92||c===93?(e.consume(c),i++,u):u(c)}}function zT(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i,l=0,a;return s;function s(m){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(m){return m===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(m)}function d(m){if(l>999||m===93&&!a||m===null||m===91||pe(m))return n(m);if(m===93){e.exit("chunkString");const y=e.exit("gfmFootnoteDefinitionLabelString");return i=Gt(r.sliceSerialize(y)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),f}return pe(m)||(a=!0),l++,e.consume(m),m===92?c:d}function c(m){return m===91||m===92||m===93?(e.consume(m),l++,d):d(m)}function f(m){return m===58?(e.enter("definitionMarker"),e.consume(m),e.exit("definitionMarker"),o.includes(i)||o.push(i),J(e,p,"gfmFootnoteDefinitionWhitespace")):n(m)}function p(m){return t(m)}}function MT(e,t,n){return e.check(_i,t,e.attempt(RT,t,n))}function FT(e){e.exit("gfmFootnoteDefinition")}function NT(e,t,n){const r=this;return J(e,o,"gfmFootnoteDefinitionIndent",5);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="gfmFootnoteDefinitionIndent"&&l[2].sliceSerialize(l[1],!0).length===4?t(i):n(i)}}function DT(e){let n=(e||{}).singleTilde;const r={tokenize:i,resolveAll:o};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function o(l,a){let s=-1;for(;++s<l.length;)if(l[s][0]==="enter"&&l[s][1].type==="strikethroughSequenceTemporary"&&l[s][1]._close){let u=s;for(;u--;)if(l[u][0]==="exit"&&l[u][1].type==="strikethroughSequenceTemporary"&&l[u][1]._open&&l[s][1].end.offset-l[s][1].start.offset===l[u][1].end.offset-l[u][1].start.offset){l[s][1].type="strikethroughSequence",l[u][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},l[u][1].start),end:Object.assign({},l[s][1].end)},c={type:"strikethroughText",start:Object.assign({},l[u][1].end),end:Object.assign({},l[s][1].start)},f=[["enter",d,a],["enter",l[u][1],a],["exit",l[u][1],a],["enter",c,a]],p=a.parser.constructs.insideSpan.null;p&&St(f,f.length,0,Qa(p,l.slice(u+1,s),a)),St(f,f.length,0,[["exit",c,a],["enter",l[s][1],a],["exit",l[s][1],a],["exit",d,a]]),St(l,u-1,s-u+3,f),s=u+f.length-2;break}}for(s=-1;++s<l.length;)l[s][1].type==="strikethroughSequenceTemporary"&&(l[s][1].type="data");return l}function i(l,a,s){const u=this.previous,d=this.events;let c=0;return f;function f(m){return u===126&&d[d.length-1][1].type!=="characterEscape"?s(m):(l.enter("strikethroughSequenceTemporary"),p(m))}function p(m){const y=ra(u);if(m===126)return c>1?s(m):(l.consume(m),c++,p);if(c<2&&!n)return s(m);const S=l.exit("strikethroughSequenceTemporary"),g=ra(m);return S._open=!g||g===2&&!!y,S._close=!y||y===2&&!!g,a(m)}}}class jT{constructor(){this.map=[]}add(t,n,r){$T(this,t,n,r)}consume(t){if(this.map.sort(function(i,l){return i[0]-l[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push([...t]),t.length=0;let o=r.pop();for(;o;)t.push(...o),o=r.pop();this.map.length=0}}function $T(e,t,n,r){let o=0;if(!(n===0&&r.length===0)){for(;o<e.map.length;){if(e.map[o][0]===t){e.map[o][1]+=n,e.map[o][2].push(...r);return}o+=1}e.map.push([t,n,r])}}function BT(e,t){let n=!1;const r=[];for(;t<e.length;){const o=e[t];if(n){if(o[0]==="enter")o[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(o[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const i=r.length-1;r[i]=r[i]==="left"?"center":"right"}}else if(o[1].type==="tableDelimiterRow")break}else o[0]==="enter"&&o[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function UT(){return{flow:{null:{tokenize:HT,resolveAll:VT}}}}function HT(e,t,n){const r=this;let o=0,i=0,l;return a;function a(w){let I=r.events.length-1;for(;I>-1;){const V=r.events[I][1].type;if(V==="lineEnding"||V==="linePrefix")I--;else break}const L=I>-1?r.events[I][1].type:null,B=L==="tableHead"||L==="tableRow"?v:s;return B===v&&r.parser.lazy[r.now().line]?n(w):B(w)}function s(w){return e.enter("tableHead"),e.enter("tableRow"),u(w)}function u(w){return w===124||(l=!0,i+=1),d(w)}function d(w){return w===null?n(w):K(w)?i>1?(i=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),p):n(w):Z(w)?J(e,d,"whitespace")(w):(i+=1,l&&(l=!1,o+=1),w===124?(e.enter("tableCellDivider"),e.consume(w),e.exit("tableCellDivider"),l=!0,d):(e.enter("data"),c(w)))}function c(w){return w===null||w===124||pe(w)?(e.exit("data"),d(w)):(e.consume(w),w===92?f:c)}function f(w){return w===92||w===124?(e.consume(w),c):c(w)}function p(w){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(w):(e.enter("tableDelimiterRow"),l=!1,Z(w)?J(e,m,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):m(w))}function m(w){return w===45||w===58?S(w):w===124?(l=!0,e.enter("tableCellDivider"),e.consume(w),e.exit("tableCellDivider"),y):T(w)}function y(w){return Z(w)?J(e,S,"whitespace")(w):S(w)}function S(w){return w===58?(i+=1,l=!0,e.enter("tableDelimiterMarker"),e.consume(w),e.exit("tableDelimiterMarker"),g):w===45?(i+=1,g(w)):w===null||K(w)?C(w):T(w)}function g(w){return w===45?(e.enter("tableDelimiterFiller"),h(w)):T(w)}function h(w){return w===45?(e.consume(w),h):w===58?(l=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(w),e.exit("tableDelimiterMarker"),k):(e.exit("tableDelimiterFiller"),k(w))}function k(w){return Z(w)?J(e,C,"whitespace")(w):C(w)}function C(w){return w===124?m(w):w===null||K(w)?!l||o!==i?T(w):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(w)):T(w)}function T(w){return n(w)}function v(w){return e.enter("tableRow"),E(w)}function E(w){return w===124?(e.enter("tableCellDivider"),e.consume(w),e.exit("tableCellDivider"),E):w===null||K(w)?(e.exit("tableRow"),t(w)):Z(w)?J(e,E,"whitespace")(w):(e.enter("data"),P(w))}function P(w){return w===null||w===124||pe(w)?(e.exit("data"),E(w)):(e.consume(w),w===92?M:P)}function M(w){return w===92||w===124?(e.consume(w),P):P(w)}}function VT(e,t){let n=-1,r=!0,o=0,i=[0,0,0,0],l=[0,0,0,0],a=!1,s=0,u,d,c;const f=new jT;for(;++n<e.length;){const p=e[n],m=p[1];p[0]==="enter"?m.type==="tableHead"?(a=!1,s!==0&&(xm(f,t,s,u,d),d=void 0,s=0),u={type:"table",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",u,t]])):m.type==="tableRow"||m.type==="tableDelimiterRow"?(r=!0,c=void 0,i=[0,0,0,0],l=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[["enter",d,t]])),o=m.type==="tableDelimiterRow"?2:d?3:1):o&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")?(r=!1,l[2]===0&&(i[1]!==0&&(l[0]=l[1],c=il(f,t,i,o,void 0,c),i=[0,0,0,0]),l[2]=n)):m.type==="tableCellDivider"&&(r?r=!1:(i[1]!==0&&(l[0]=l[1],c=il(f,t,i,o,void 0,c)),i=l,l=[i[1],n,0,0])):m.type==="tableHead"?(a=!0,s=n):m.type==="tableRow"||m.type==="tableDelimiterRow"?(s=n,i[1]!==0?(l[0]=l[1],c=il(f,t,i,o,n,c)):l[1]!==0&&(c=il(f,t,l,o,n,c)),o=0):o&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")&&(l[3]=n)}for(s!==0&&xm(f,t,s,u,d),f.consume(t.events),n=-1;++n<t.events.length;){const p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=BT(t.events,n))}return e}function il(e,t,n,r,o,i){const l=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(i.end=Object.assign({},Sr(t.events,n[0])),e.add(n[0],0,[["exit",i,t]]));const s=Sr(t.events,n[1]);if(i={type:l,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",i,t]]),n[2]!==0){const u=Sr(t.events,n[2]),d=Sr(t.events,n[3]),c={type:a,start:Object.assign({},u),end:Object.assign({},d)};if(e.add(n[2],0,[["enter",c,t]]),r!==2){const f=t.events[n[2]],p=t.events[n[3]];if(f[1].end=Object.assign({},p[1].end),f[1].type="chunkText",f[1].contentType="text",n[3]>n[2]+1){const m=n[2]+1,y=n[3]-n[2]-1;e.add(m,y,[])}}e.add(n[3]+1,0,[["exit",c,t]])}return o!==void 0&&(i.end=Object.assign({},Sr(t.events,o)),e.add(o,0,[["exit",i,t]]),i=void 0),i}function xm(e,t,n,r,o){const i=[],l=Sr(t.events,n);o&&(o.end=Object.assign({},l),i.push(["exit",o,t])),r.end=Object.assign({},l),i.push(["exit",r,t]),e.add(n+1,0,i)}function Sr(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const WT={tokenize:QT};function KT(){return{text:{91:WT}}}function QT(e,t,n){const r=this;return o;function o(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),i)}function i(s){return pe(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),l):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),l):n(s)}function l(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return K(s)?t(s):Z(s)?e.check({tokenize:qT},t,n)(s):n(s)}}function qT(e,t,n){return J(e,r,"whitespace");function r(o){return o===null?n(o):t(o)}}function GT(e){return Jy([bT(),IT(),DT(e),UT(),KT()])}const YT={};function XT(e){const t=this,n=e||YT,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(GT(n)),i.push(gT()),l.push(yT(n))}function JT(){return{enter:{mathFlow:e,mathFlowFenceMeta:t,mathText:i},exit:{mathFlow:o,mathFlowFence:r,mathFlowFenceMeta:n,mathFlowValue:a,mathText:l,mathTextData:a}};function e(s){const u={type:"element",tagName:"code",properties:{className:["language-math","math-display"]},children:[]};this.enter({type:"math",meta:null,value:"",data:{hName:"pre",hChildren:[u]}},s)}function t(){this.buffer()}function n(){const s=this.resume(),u=this.stack[this.stack.length-1];u.type,u.meta=s}function r(){this.data.mathFlowInside||(this.buffer(),this.data.mathFlowInside=!0)}function o(s){const u=this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u;const c=d.data.hChildren[0];c.type,c.tagName,c.children.push({type:"text",value:u}),this.data.mathFlowInside=void 0}function i(s){this.enter({type:"inlineMath",value:"",data:{hName:"code",hProperties:{className:["language-math","math-inline"]},hChildren:[]}},s),this.buffer()}function l(s){const u=this.resume(),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u,d.data.hChildren.push({type:"text",value:u})}function a(s){this.config.enter.data.call(this,s),this.config.exit.data.call(this,s)}}function ZT(e){let t=(e||{}).singleDollarTextMath;return t==null&&(t=!0),r.peek=o,{unsafe:[{character:"\r",inConstruct:"mathFlowMeta"},{character:`
`,inConstruct:"mathFlowMeta"},{character:"$",after:t?void 0:"\\$",inConstruct:"phrasing"},{character:"$",inConstruct:"mathFlowMeta"},{atBreak:!0,character:"$",after:"\\$"}],handlers:{math:n,inlineMath:r}};function n(i,l,a,s){const u=i.value||"",d=a.createTracker(s),c="$".repeat(Math.max(C0(u,"$")+1,2)),f=a.enter("mathFlow");let p=d.move(c);if(i.meta){const m=a.enter("mathFlowMeta");p+=d.move(a.safe(i.meta,{after:`
`,before:p,encode:["$"],...d.current()})),m()}return p+=d.move(`
`),u&&(p+=d.move(u+`
`)),p+=d.move(c),f(),p}function r(i,l,a){let s=i.value||"",u=1;for(t||u++;new RegExp("(^|[^$])"+"\\$".repeat(u)+"([^$]|$)").test(s);)u++;const d="$".repeat(u);/[^ \r\n]/.test(s)&&(/^[ \r\n]/.test(s)&&/[ \r\n]$/.test(s)||/^\$|\$$/.test(s))&&(s=" "+s+" ");let c=-1;for(;++c<a.unsafe.length;){const f=a.unsafe[c];if(!f.atBreak)continue;const p=a.compilePattern(f);let m;for(;m=p.exec(s);){let y=m.index;s.codePointAt(y)===10&&s.codePointAt(y-1)===13&&y--,s=s.slice(0,y)+" "+s.slice(m.index+1)}}return d+s+d}function o(){return"$"}}function nr(e){return e!==null&&e<-2}const eP={tokenize:tP,concrete:!0},vm={tokenize:nP,partial:!0};function tP(e,t,n){const r=this,o=r.events[r.events.length-1],i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0;let l=0;return a;function a(h){return e.enter("mathFlow"),e.enter("mathFlowFence"),e.enter("mathFlowFenceSequence"),s(h)}function s(h){return h===36?(e.consume(h),l++,s):l<2?n(h):(e.exit("mathFlowFenceSequence"),J(e,u,"whitespace")(h))}function u(h){return h===null||nr(h)?c(h):(e.enter("mathFlowFenceMeta"),e.enter("chunkString",{contentType:"string"}),d(h))}function d(h){return h===null||nr(h)?(e.exit("chunkString"),e.exit("mathFlowFenceMeta"),c(h)):h===36?n(h):(e.consume(h),d)}function c(h){return e.exit("mathFlowFence"),r.interrupt?t(h):e.attempt(vm,f,S)(h)}function f(h){return e.attempt({tokenize:g,partial:!0},S,p)(h)}function p(h){return(i?J(e,m,"linePrefix",i+1):m)(h)}function m(h){return h===null?S(h):nr(h)?e.attempt(vm,f,S)(h):(e.enter("mathFlowValue"),y(h))}function y(h){return h===null||nr(h)?(e.exit("mathFlowValue"),m(h)):(e.consume(h),y)}function S(h){return e.exit("mathFlow"),t(h)}function g(h,k,C){let T=0;return J(h,v,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4);function v(M){return h.enter("mathFlowFence"),h.enter("mathFlowFenceSequence"),E(M)}function E(M){return M===36?(T++,h.consume(M),E):T<l?C(M):(h.exit("mathFlowFenceSequence"),J(h,P,"whitespace")(M))}function P(M){return M===null||nr(M)?(h.exit("mathFlowFence"),k(M)):C(M)}}}function nP(e,t,n){const r=this;return o;function o(l){return l===null?t(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function rP(e){let n=(e||{}).singleDollarTextMath;return n==null&&(n=!0),{tokenize:r,resolve:oP,previous:iP};function r(o,i,l){let a=0,s,u;return d;function d(y){return o.enter("mathText"),o.enter("mathTextSequence"),c(y)}function c(y){return y===36?(o.consume(y),a++,c):a<2&&!n?l(y):(o.exit("mathTextSequence"),f(y))}function f(y){return y===null?l(y):y===36?(u=o.enter("mathTextSequence"),s=0,m(y)):y===32?(o.enter("space"),o.consume(y),o.exit("space"),f):nr(y)?(o.enter("lineEnding"),o.consume(y),o.exit("lineEnding"),f):(o.enter("mathTextData"),p(y))}function p(y){return y===null||y===32||y===36||nr(y)?(o.exit("mathTextData"),f(y)):(o.consume(y),p)}function m(y){return y===36?(o.consume(y),s++,m):s===a?(o.exit("mathTextSequence"),o.exit("mathText"),i(y)):(u.type="mathTextData",p(y))}}}function oP(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="mathTextData"){e[t][1].type="mathTextPadding",e[n][1].type="mathTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="mathTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function iP(e){return e!==36||this.events[this.events.length-1][1].type==="characterEscape"}function lP(e){return{flow:{36:eP},text:{36:rP(e)}}}const aP={};function sP(e){const t=this,n=e||aP,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(lP(n)),i.push(JT()),l.push(ZT(n))}const uP=R.memo(B3,(e,t)=>e.children===t.children&&e.className===t.className),cP=e=>z.jsx(z.Fragment,{children:z.jsx(uP,{className:"markdown-body",remarkPlugins:[XT,sP],components:{a(t){return z.jsx("a",{...t,target:"_blank",rel:"noopener noreferrer",children:t.children})}},children:e.children})});function dP(e){const{role:t="user",children:n,className:r,Action:o}=e;return z.jsx(Bd,{role:t,className:r+"-Item",sx:e.wrapperSx,children:z.jsxs(Ud,{role:t,className:r+"-Item-Content",sx:{width:"fill-available",...e.contentSx},children:[z.jsx(cP,{children:n}),o]})})}function fP(e){try{return new URL(e).hostname}catch{return location.hostname}}function pP({annotation:e}){const{baseUrl:t}=R.useContext(Wa);let n;switch(e.state){case void 0:case"CONNECTING":n=`Connecting to ${fP(t)}...`;break;case"CREATING":n="Preparing to ask...";break;case"SEARCHING":n="Gathering resources...";break;case"RERANKING":n="Reranking resources...";break;case"GENERATING":n="Generating answer...";break;default:return null}return z.jsx(Bd,{role:"bot",sx:{borderBottom:"none"},children:z.jsx(Ud,{role:"bot",children:z.jsxs(hP,{children:[z.jsx(gP,{sx:{animation:"spin 2s linear infinite","@keyframes spin":{"0%":{transform:"rotate(360deg)"},"100%":{transform:"rotate(0deg)"}}}}),n]})})})}function Sm({error:e}){return z.jsx(Bd,{children:z.jsx(Ud,{role:"bot",sx:t=>({color:t.palette.destructive}),children:e})})}function mP(e){const{items:t,appendText:n}=e;return z.jsxs(kP,{children:[z.jsx("h3",{children:"Example Questions"}),t.map((r,o)=>z.jsx(yP,{onClick:()=>{n(r)},children:r},o))]})}const Bd=ve("div")(({theme:e,role:t})=>ke({display:"flex",alignItems:"flex-end",paddingBottom:"0.5rem",marginBottom:t==="bot"?"1rem":"0.5rem",borderBottom:t==="bot"?"1px solid":"none",borderBottomColor:e.palette.muted})),Ud=ve("div")(({theme:e,role:t})=>ke({display:"flex",flexDirection:"column",gapY:"0.5rem",lineHeight:"1.5rem",marginX:"0.5rem",fontSize:t==="bot"?"1rem":"1.25rem",fontWeight:t==="bot"?400:700,width:"100%","& *":{...e.palette.mode==="dark"?b2:w2},"&> p":{margin:0}})),hP=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",gap:"4px",fontSize:"12px",color:e.palette.mutedForeground,"& > a":{color:"inherit"}})),gP=ve(k2)`
  width: 1em;
  height: 1em;
`;ve("a")(({theme:e})=>ke({display:"block",padding:"0.5rem",borderRadius:e.shape.borderRadius,backgroundColor:e.palette.muted,color:e.palette.accentForeground,"&:hover":{backgroundColor:e.palette.muted,color:e.palette.accentForeground}}));ve("div")(()=>ke({display:"flex",gapX:"0.5rem",overflowX:"auto"}));const yP=ve("div")(({theme:e})=>ke({width:"100%",display:"inline-flex",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring}})),kP=ve("div")(()=>ke({width:"100%",display:"flex",gap:"0.5rem",flexWrap:"wrap","& h3":{width:"100%",fontSize:"1rem",lineHeight:"1.5rem",fontWeight:700,margin:0}}));function Cm(e){return(e??[]).reduce((t,n)=>Object.assign(t,n),{messageId:-1})}function wP(e){const{placeholder:t,className:n,isLoading:r,...o}=e;return z.jsxs(bP,{className:n+"-Wrapper",children:[z.jsx(xP,{placeholder:t||"Say something...",autoFocus:!0,...o}),z.jsx(vP,{type:"submit",className:n+"-Submit",disabled:r,children:z.jsx(d2,{className:n+"-Submit-Icon",sx:{width:"1rem",height:"1rem"}})})]})}const bP=ve("div")(()=>ke({display:"flex",position:"relative"})),xP=ve("input")(({theme:e})=>ke({fontSize:"1rem",lineHeight:"1.5rem",padding:"0.5rem 0.75rem",paddingRight:"2.5rem",borderRadius:e.shape.borderRadius,display:"inline-block",width:"100%",border:`2px solid ${e.palette.border}`,color:e.palette.primary,backgroundColor:e.palette.background,"&:focus":{outline:"none",borderColor:e.palette.ring}})),vP=ve("button")(({theme:e,disabled:t})=>ke({position:"absolute",right:"0.375rem",top:"0.375rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:e.shape.borderRadius,padding:"0.5rem",cursor:"pointer",border:"none",backgroundColor:e.palette.primary,color:e.palette.primaryForeground,"&:hover":{backgroundColor:e.palette.primary},...t&&{backgroundColor:e.palette.muted,color:e.palette.mutedForeground,cursor:"not-allowed","&:hover":{backgroundColor:e.palette.muted}}})),Em=ve("span")(({theme:e})=>ke({color:e.palette.mutedForeground,fontSize:"0.875rem",fontWeight:400,lineHeight:1}));function SP(e){var M;const{exampleQuestions:t,inputPlaceholder:n,siteKey:r="",securityMode:o}=e,{session:i,create:l}=WS(),a=R.useContext(Wa),[s,u]=R.useState(!1),d=$S({api:a.baseUrl+`/api/v1/chats/${i}/messages`,credentials:"include"}),{messages:c,input:f,handleInputChange:p,isLoading:m,stop:y,error:S}=d,g=R.useRef(d);R.useEffect(()=>{g.current=d});const h=(w,I)=>(g.current.setInput(""),l(w).then(()=>{setTimeout(()=>{g.current.append({role:"user",content:w,createdAt:new Date},I)},0)})),k=w=>{u(!0),h(w).finally(()=>{u(!1)})},C=async w=>{w.preventDefault(),u(!0);try{r?await KS({action:"submit",siteKey:r||"",mode:o},async({token:I,action:L})=>{await h(g.current.input,{options:{headers:{"X-Recaptcha-Token":I,"X-Recaptcha-Action":L}}})}):await h(g.current.input)}finally{u(!1)}},T=w=>{g.current.reload({options:{body:{regenerate:!0,messageId:Cm(w.annotations??[]).messageId}}}),g.current.setMessages(g.current.messages.slice(0,-1))},[v,E]=R.useState(),P=R.useMemo(()=>{var w;return Cm(((w=c[c.length-1])==null?void 0:w.annotations)??[])},[(M=c[c.length-1])==null?void 0:M.annotations]);return R.useEffect(()=>{P.state==="ERROR"&&E(P.stateMessage??"Unknown error")},[P.state,P.stateMessage]),z.jsx(z.Fragment,{children:z.jsxs(CP,{className:Kt+"Conversation-Container",children:[z.jsxs(EP,{sx:{flexDirection:"column-reverse"},className:"Conversation-Message-List",children:[!i&&!s&&t.length>0&&z.jsx(mP,{appendText:k,items:t}),(m||s)&&z.jsx(pP,{annotation:P}),v&&z.jsx(Sm,{error:v}),S&&z.jsx(Sm,{error:S.message}),[...c].reverse().map((w,I)=>{const L=I===0?!m:w.role!=="user";return z.jsx(dP,{role:w.role==="user"?"user":"bot",className:Kt+"Conversation-Message",Action:L?z.jsx(m2,{handleReload:I===0?()=>T(w):void 0,content:w.content,className:Kt+"Conversation-Message-Action"}):null,wrapperSx:{...I===0&&{border:"none",marginBottom:0}},children:w.content},w.id)})]}),z.jsxs("div",{children:[i&&m&&z.jsx(p2,{className:Kt+"Conversation-Action",handleStop:y}),z.jsx("form",{onSubmit:C,children:z.jsx(wP,{className:Kt+"Conversation-Input",value:f,onChange:p,isLoading:s||m,placeholder:n})}),z.jsxs(TP,{children:[z.jsxs(Em,{children:["Powered by ",z.jsx("a",{href:"https://tidb.ai",target:"_blank",rel:"noreferrer",children:"TiDB.ai"})]}),z.jsxs(Em,{sx:{marginLeft:"auto",marginRight:"0"},children:["protected by reCAPTCHA (",z.jsx("a",{href:"https://policies.google.com/privacy",target:"_blank",rel:"noreferrer",children:"Privacy"})," - ",z.jsx("a",{href:"https://policies.google.com/terms",target:"_blank",rel:"noreferrer",children:"Terms"}),")"]})]})]})]})})}const CP=ve("div")(({theme:e})=>ke({display:"flex",flex:"1 1 0%",justifyContent:"space-between",flexDirection:"column",height:"calc(100% - 40px)",backgroundColor:e.palette.background})),EP=ve("div")(({theme:e})=>ke({display:"flex",flexDirection:"column",padding:"0.75rem 0",overflowY:"auto",scrollbarWidth:"thin",scrollbarColor:`${e.palette.accent} ${e.palette.background}`,"&::-webkit-scrollbar":{width:"0.5rem"},"&::-webkit-scrollbar-track":{backgroundColor:e.palette.background},"&::-webkit-scrollbar-thumb":{backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius}},e.palette.mode==="dark"?JS:XS)),TP=ve("div")(({theme:e})=>({display:"flex",paddingTop:"1rem",fontSize:"12px",color:e.palette.mutedForeground,"& >* a":{color:"inherit"}}));/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var V0=_P,Tm=RP,PP=Object.prototype.toString,ll=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function _P(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},o=r.decode||IP,i=0;i<e.length;){var l=e.indexOf("=",i);if(l===-1)break;var a=e.indexOf(";",i);if(a===-1)a=e.length;else if(a<l){i=e.lastIndexOf(";",l-1)+1;continue}var s=e.slice(i,l).trim();if(n[s]===void 0){var u=e.slice(l+1,a).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[s]=LP(u,o)}i=a+1}return n}function RP(e,t,n){var r=n||{},o=r.encode||OP;if(typeof o!="function")throw new TypeError("option encode is invalid");if(!ll.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!ll.test(i))throw new TypeError("argument val is invalid");var l=e+"="+i;if(r.maxAge!=null){var a=r.maxAge-0;if(isNaN(a)||!isFinite(a))throw new TypeError("option maxAge is invalid");l+="; Max-Age="+Math.floor(a)}if(r.domain){if(!ll.test(r.domain))throw new TypeError("option domain is invalid");l+="; Domain="+r.domain}if(r.path){if(!ll.test(r.path))throw new TypeError("option path is invalid");l+="; Path="+r.path}if(r.expires){var s=r.expires;if(!AP(s)||isNaN(s.valueOf()))throw new TypeError("option expires is invalid");l+="; Expires="+s.toUTCString()}if(r.httpOnly&&(l+="; HttpOnly"),r.secure&&(l+="; Secure"),r.partitioned&&(l+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var d=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(d){case!0:l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"strict":l+="; SameSite=Strict";break;case"none":l+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return l}function IP(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function OP(e){return encodeURIComponent(e)}function AP(e){return PP.call(e)==="[object Date]"||e instanceof Date}function LP(e,t){try{return t(e)}catch{return e}}function zP(){const e=typeof global>"u"?void 0:global.TEST_HAS_DOCUMENT_COOKIE;return typeof e=="boolean"?e:typeof document=="object"&&typeof document.cookie=="string"}function MP(e){return typeof e=="string"?V0(e):typeof e=="object"&&e!==null?e:{}}function qs(e,t={}){const n=FP(e);if(!t.doNotParse)try{return JSON.parse(n)}catch{}return e}function FP(e){return e&&e[0]==="j"&&e[1]===":"?e.substr(2):e}class W0{constructor(t,n={}){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.update=()=>{if(!this.HAS_DOCUMENT_COOKIE)return;const o=this.cookies;this.cookies=V0(document.cookie),this._checkChanges(o)};const r=typeof document>"u"?"":document.cookie;this.cookies=MP(t||r),this.defaultSetOptions=n,this.HAS_DOCUMENT_COOKIE=zP()}_emitChange(t){for(let n=0;n<this.changeListeners.length;++n)this.changeListeners[n](t)}_checkChanges(t){new Set(Object.keys(t).concat(Object.keys(this.cookies))).forEach(r=>{t[r]!==this.cookies[r]&&this._emitChange({name:r,value:qs(this.cookies[r])})})}_startPolling(){this.pollingInterval=setInterval(this.update,300)}_stopPolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}get(t,n={}){return n.doNotUpdate||this.update(),qs(this.cookies[t],n)}getAll(t={}){t.doNotUpdate||this.update();const n={};for(let r in this.cookies)n[r]=qs(this.cookies[r],t);return n}set(t,n,r){r?r=Object.assign(Object.assign({},this.defaultSetOptions),r):r=this.defaultSetOptions;const o=typeof n=="string"?n:JSON.stringify(n);this.cookies=Object.assign(Object.assign({},this.cookies),{[t]:o}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=Tm(t,o,r)),this._emitChange({name:t,value:n,options:r})}remove(t,n){const r=n=Object.assign(Object.assign(Object.assign({},this.defaultSetOptions),n),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=Tm(t,"",r)),this._emitChange({name:t,value:void 0,options:n})}addChangeListener(t){this.changeListeners.push(t),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===1&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.addEventListener("change",this.update):this._startPolling())}removeChangeListener(t){const n=this.changeListeners.indexOf(t);n>=0&&this.changeListeners.splice(n,1),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===0&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.removeEventListener("change",this.update):this._stopPolling())}}const NP=R.createContext(new W0),{Provider:DP,Consumer:ZP}=NP;class jP extends R.Component{constructor(t){super(t),t.cookies?this.cookies=t.cookies:this.cookies=new W0(void 0,t.defaultSetOptions)}render(){return R.createElement(DP,{value:this.cookies},this.props.children)}}function $P(e){const{btnLabel:t,btnImgSrc:n,baseUrl:r="",exampleQuestions:o,logoSrc:i,title:l,inputPlaceholder:a,preferredMode:s="system",siteKey:u,securityMode:d}=e,[c,f]=R.useState(!1),p=()=>f(!0),m=()=>f(!1),y=["dark","light"].includes(s)?s:"system",S=tv("(prefers-color-scheme: dark)")?"dark":"light",g=y==="system"?S:y,h=R.useMemo(()=>g==="dark"?YS:GS,[g]),k=R.useMemo(()=>{if(d==="v3"||d==="enterprise")return d},[d]);return z.jsx(Wa.Provider,{value:{baseUrl:r,entryButtonLabel:t},children:z.jsx(jP,{defaultSetOptions:{path:"/"},children:z.jsxs(Jx,{theme:h,children:[z.jsxs(gv,{type:"button",onClick:p,className:Kt+"entry-btn",children:[n&&z.jsx("img",{src:n,alt:t,className:Kt+"entry-btn-img",width:16,height:16}),t]}),z.jsx(jv,{"aria-labelledby":"unstyled-modal-title","aria-describedby":"unstyled-modal-description",open:c,onClose:m,slots:{backdrop:$v},className:Kt+"Modal",children:z.jsxs(Bv,{sx:{width:"90vw",maxWidth:800,minHeight:400,height:"60vh"},className:Kt+"Modal-Content",children:[z.jsx(Uv,{className:Kt+"Modal-Header",children:z.jsxs(Hv,{className:Kt+"Modal-Title",children:[i&&z.jsx("img",{src:i,alt:"Widget Logo",width:32,height:32}),l]})}),z.jsx(SP,{exampleQuestions:o,inputPlaceholder:a,siteKey:u,securityMode:k})]})})]})})})}const te=document.querySelector('script[data-id][data-name="tidb-ai-widget"]'),BP=(te==null?void 0:te.getAttribute("data-id"))||"tidb-ai-widget",UP=(te==null?void 0:te.getAttribute("data-name"))||"tidb-ai-widget",HP=(te==null?void 0:te.getAttribute("data-btn-label"))||"Ask AI",VP=(te==null?void 0:te.getAttribute("data-btn-img-src"))||void 0,WP=(te==null?void 0:te.getAttribute("data-api-base-url"))||void 0,KP=JSON.parse((te==null?void 0:te.getAttribute("data-example-questions"))||"[]"),QP=(te==null?void 0:te.getAttribute("data-logo-src"))||void 0,qP=(te==null?void 0:te.getAttribute("data-title"))||"Conversation Search Box",GP=(te==null?void 0:te.getAttribute("data-input-placeholder"))||"Ask a question...",YP=(te==null?void 0:te.getAttribute("data-preferred-mode"))||"system",El=(te==null?void 0:te.getAttribute("data-site-key"))||"",K0=(te==null?void 0:te.getAttribute("data-security-mode"))||void 0,XP=document.getElementsByTagName("body")[0];XP.appendChild(document.createElement("div")).id="tidb-ai-root";const JP=document.getElementsByTagName("head")[0];if(El){const e=document.createElement("script"),t=K0==="enterprise"?`https://www.google.com/recaptcha/enterprise.js?render=${El}`:`https://www.google.com/recaptcha/api.js?render=${El}`;e.src=t,e.async=!0,e.defer=!0,JP.appendChild(e)}Gs.createRoot(document.getElementById("tidb-ai-root")).render(z.jsx(ki.StrictMode,{children:z.jsx($P,{id:BP,name:UP,btnLabel:HP,btnImgSrc:VP,baseUrl:WP,exampleQuestions:KP,logoSrc:QP,title:qP,inputPlaceholder:GP,preferredMode:YP,siteKey:El,securityMode:K0})}));
