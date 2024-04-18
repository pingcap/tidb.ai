function Q0(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var Bd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function aa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Cm={exports:{}},sa={},Em={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi=Symbol.for("react.element"),q0=Symbol.for("react.portal"),G0=Symbol.for("react.fragment"),Y0=Symbol.for("react.strict_mode"),X0=Symbol.for("react.profiler"),Z0=Symbol.for("react.provider"),J0=Symbol.for("react.context"),e1=Symbol.for("react.forward_ref"),t1=Symbol.for("react.suspense"),n1=Symbol.for("react.memo"),r1=Symbol.for("react.lazy"),Ud=Symbol.iterator;function o1(e){return e===null||typeof e!="object"?null:(e=Ud&&e[Ud]||e["@@iterator"],typeof e=="function"?e:null)}var Tm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Pm=Object.assign,_m={};function to(e,t,n){this.props=e,this.context=t,this.refs=_m,this.updater=n||Tm}to.prototype.isReactComponent={};to.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};to.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Rm(){}Rm.prototype=to.prototype;function cc(e,t,n){this.props=e,this.context=t,this.refs=_m,this.updater=n||Tm}var dc=cc.prototype=new Rm;dc.constructor=cc;Pm(dc,to.prototype);dc.isPureReactComponent=!0;var Hd=Array.isArray,Im=Object.prototype.hasOwnProperty,fc={current:null},Am={key:!0,ref:!0,__self:!0,__source:!0};function Om(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)Im.call(t,r)&&!Am.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:yi,type:e,key:i,ref:l,props:o,_owner:fc.current}}function i1(e,t){return{$$typeof:yi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function pc(e){return typeof e=="object"&&e!==null&&e.$$typeof===yi}function l1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Vd=/\/+/g;function Ya(e,t){return typeof e=="object"&&e!==null&&e.key!=null?l1(""+e.key):t.toString(36)}function al(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case yi:case q0:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Ya(l,0):r,Hd(o)?(n="",e!=null&&(n=e.replace(Vd,"$&/")+"/"),al(o,t,n,"",function(u){return u})):o!=null&&(pc(o)&&(o=i1(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Vd,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Hd(e))for(var a=0;a<e.length;a++){i=e[a];var s=r+Ya(i,a);l+=al(i,t,n,s,o)}else if(s=o1(e),typeof s=="function")for(e=s.call(e),a=0;!(i=e.next()).done;)i=i.value,s=r+Ya(i,a++),l+=al(i,t,n,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Li(e,t,n){if(e==null)return e;var r=[],o=0;return al(e,r,"","",function(i){return t.call(n,i,o++)}),r}function a1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var rt={current:null},sl={transition:null},s1={ReactCurrentDispatcher:rt,ReactCurrentBatchConfig:sl,ReactCurrentOwner:fc};ne.Children={map:Li,forEach:function(e,t,n){Li(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Li(e,function(){t++}),t},toArray:function(e){return Li(e,function(t){return t})||[]},only:function(e){if(!pc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ne.Component=to;ne.Fragment=G0;ne.Profiler=X0;ne.PureComponent=cc;ne.StrictMode=Y0;ne.Suspense=t1;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=s1;ne.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Pm({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=fc.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Im.call(t,s)&&!Am.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var u=0;u<s;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:yi,type:e.type,key:o,ref:i,props:r,_owner:l}};ne.createContext=function(e){return e={$$typeof:J0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Z0,_context:e},e.Consumer=e};ne.createElement=Om;ne.createFactory=function(e){var t=Om.bind(null,e);return t.type=e,t};ne.createRef=function(){return{current:null}};ne.forwardRef=function(e){return{$$typeof:e1,render:e}};ne.isValidElement=pc;ne.lazy=function(e){return{$$typeof:r1,_payload:{_status:-1,_result:e},_init:a1}};ne.memo=function(e,t){return{$$typeof:n1,type:e,compare:t===void 0?null:t}};ne.startTransition=function(e){var t=sl.transition;sl.transition={};try{e()}finally{sl.transition=t}};ne.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};ne.useCallback=function(e,t){return rt.current.useCallback(e,t)};ne.useContext=function(e){return rt.current.useContext(e)};ne.useDebugValue=function(){};ne.useDeferredValue=function(e){return rt.current.useDeferredValue(e)};ne.useEffect=function(e,t){return rt.current.useEffect(e,t)};ne.useId=function(){return rt.current.useId()};ne.useImperativeHandle=function(e,t,n){return rt.current.useImperativeHandle(e,t,n)};ne.useInsertionEffect=function(e,t){return rt.current.useInsertionEffect(e,t)};ne.useLayoutEffect=function(e,t){return rt.current.useLayoutEffect(e,t)};ne.useMemo=function(e,t){return rt.current.useMemo(e,t)};ne.useReducer=function(e,t,n){return rt.current.useReducer(e,t,n)};ne.useRef=function(e){return rt.current.useRef(e)};ne.useState=function(e){return rt.current.useState(e)};ne.useSyncExternalStore=function(e,t,n){return rt.current.useSyncExternalStore(e,t,n)};ne.useTransition=function(){return rt.current.useTransition()};ne.version="18.2.0";Em.exports=ne;var P=Em.exports;const ki=aa(P),Wd=Q0({__proto__:null,default:ki},[P]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u1=P,c1=Symbol.for("react.element"),d1=Symbol.for("react.fragment"),f1=Object.prototype.hasOwnProperty,p1=u1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m1={key:!0,ref:!0,__self:!0,__source:!0};function Lm(e,t,n){var r,o={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)f1.call(t,r)&&!m1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:c1,type:e,key:i,ref:l,props:o,_owner:p1.current}}sa.Fragment=d1;sa.jsx=Lm;sa.jsxs=Lm;Cm.exports=sa;var z=Cm.exports,Gs={},zm={exports:{}},Et={},Mm={exports:{}},Nm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,H){var w=I.length;I.push(H);e:for(;0<w;){var Y=w-1>>>1,W=I[Y];if(0<o(W,H))I[Y]=H,I[w]=W,w=Y;else break e}}function n(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var H=I[0],w=I.pop();if(w!==H){I[0]=w;e:for(var Y=0,W=I.length,x=W>>>1;Y<x;){var re=2*(Y+1)-1,we=I[re],ee=re+1,Ue=I[ee];if(0>o(we,w))ee<W&&0>o(Ue,we)?(I[Y]=Ue,I[ee]=w,Y=ee):(I[Y]=we,I[re]=w,Y=re);else if(ee<W&&0>o(Ue,w))I[Y]=Ue,I[ee]=w,Y=ee;else break e}}return H}function o(I,H){var w=I.sortIndex-H.sortIndex;return w!==0?w:I.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,a=l.now();e.unstable_now=function(){return l.now()-a}}var s=[],u=[],d=1,c=null,f=3,p=!1,h=!1,k=!1,C=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(I){for(var H=n(u);H!==null;){if(H.callback===null)r(u);else if(H.startTime<=I)r(u),H.sortIndex=H.expirationTime,t(s,H);else break;H=n(u)}}function S(I){if(k=!1,y(I),!h)if(n(s)!==null)h=!0,O(T);else{var H=n(u);H!==null&&$(S,H.startTime-I)}}function T(I,H){h=!1,k&&(k=!1,g(_),_=-1),p=!0;var w=f;try{for(y(H),c=n(s);c!==null&&(!(c.expirationTime>H)||I&&!A());){var Y=c.callback;if(typeof Y=="function"){c.callback=null,f=c.priorityLevel;var W=Y(c.expirationTime<=H);H=e.unstable_now(),typeof W=="function"?c.callback=W:c===n(s)&&r(s),y(H)}else r(s);c=n(s)}if(c!==null)var x=!0;else{var re=n(u);re!==null&&$(S,re.startTime-H),x=!1}return x}finally{c=null,f=w,p=!1}}var v=!1,E=null,_=-1,N=5,b=-1;function A(){return!(e.unstable_now()-b<N)}function L(){if(E!==null){var I=e.unstable_now();b=I;var H=!0;try{H=E(!0,I)}finally{H?B():(v=!1,E=null)}}else v=!1}var B;if(typeof m=="function")B=function(){m(L)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,D=V.port2;V.port1.onmessage=L,B=function(){D.postMessage(null)}}else B=function(){C(L,0)};function O(I){E=I,v||(v=!0,B())}function $(I,H){_=C(function(){I(e.unstable_now())},H)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){h||p||(h=!0,O(T))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(I){switch(f){case 1:case 2:case 3:var H=3;break;default:H=f}var w=f;f=H;try{return I()}finally{f=w}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,H){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var w=f;f=I;try{return H()}finally{f=w}},e.unstable_scheduleCallback=function(I,H,w){var Y=e.unstable_now();switch(typeof w=="object"&&w!==null?(w=w.delay,w=typeof w=="number"&&0<w?Y+w:Y):w=Y,I){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=w+W,I={id:d++,callback:H,priorityLevel:I,startTime:w,expirationTime:W,sortIndex:-1},w>Y?(I.sortIndex=w,t(u,I),n(s)===null&&I===n(u)&&(k?(g(_),_=-1):k=!0,$(S,w-Y))):(I.sortIndex=W,t(s,I),h||p||(h=!0,O(T))),I},e.unstable_shouldYield=A,e.unstable_wrapCallback=function(I){var H=f;return function(){var w=f;f=H;try{return I.apply(this,arguments)}finally{f=w}}}})(Nm);Mm.exports=Nm;var h1=Mm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fm=P,Ct=h1;function M(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Dm=new Set,jo={};function mr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(jo[e]=t,e=0;e<t.length;e++)Dm.add(t[e])}var yn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ys=Object.prototype.hasOwnProperty,g1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Kd={},Qd={};function y1(e){return Ys.call(Qd,e)?!0:Ys.call(Kd,e)?!1:g1.test(e)?Qd[e]=!0:(Kd[e]=!0,!1)}function k1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function w1(e,t,n,r){if(t===null||typeof t>"u"||k1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ot(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Ke={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ke[e]=new ot(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ke[t]=new ot(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ke[e]=new ot(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ke[e]=new ot(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ke[e]=new ot(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ke[e]=new ot(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ke[e]=new ot(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ke[e]=new ot(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ke[e]=new ot(e,5,!1,e.toLowerCase(),null,!1,!1)});var mc=/[\-:]([a-z])/g;function hc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(mc,hc);Ke[t]=new ot(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(mc,hc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(mc,hc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!1,!1)});Ke.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!0,!0)});function gc(e,t,n,r){var o=Ke.hasOwnProperty(t)?Ke[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(w1(t,n,o,r)&&(n=null),r||o===null?y1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var vn=Fm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zi=Symbol.for("react.element"),Cr=Symbol.for("react.portal"),Er=Symbol.for("react.fragment"),yc=Symbol.for("react.strict_mode"),Xs=Symbol.for("react.profiler"),jm=Symbol.for("react.provider"),$m=Symbol.for("react.context"),kc=Symbol.for("react.forward_ref"),Zs=Symbol.for("react.suspense"),Js=Symbol.for("react.suspense_list"),wc=Symbol.for("react.memo"),Pn=Symbol.for("react.lazy"),Bm=Symbol.for("react.offscreen"),qd=Symbol.iterator;function uo(e){return e===null||typeof e!="object"?null:(e=qd&&e[qd]||e["@@iterator"],typeof e=="function"?e:null)}var Ee=Object.assign,Xa;function xo(e){if(Xa===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Xa=t&&t[1]||""}return`
`+Xa+e}var Za=!1;function Ja(e,t){if(!e||Za)return"";Za=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),i=r.stack.split(`
`),l=o.length-1,a=i.length-1;1<=l&&0<=a&&o[l]!==i[a];)a--;for(;1<=l&&0<=a;l--,a--)if(o[l]!==i[a]){if(l!==1||a!==1)do if(l--,a--,0>a||o[l]!==i[a]){var s=`
`+o[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=a);break}}}finally{Za=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?xo(e):""}function b1(e){switch(e.tag){case 5:return xo(e.type);case 16:return xo("Lazy");case 13:return xo("Suspense");case 19:return xo("SuspenseList");case 0:case 2:case 15:return e=Ja(e.type,!1),e;case 11:return e=Ja(e.type.render,!1),e;case 1:return e=Ja(e.type,!0),e;default:return""}}function eu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Er:return"Fragment";case Cr:return"Portal";case Xs:return"Profiler";case yc:return"StrictMode";case Zs:return"Suspense";case Js:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $m:return(e.displayName||"Context")+".Consumer";case jm:return(e._context.displayName||"Context")+".Provider";case kc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case wc:return t=e.displayName||null,t!==null?t:eu(e.type)||"Memo";case Pn:t=e._payload,e=e._init;try{return eu(e(t))}catch{}}return null}function x1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return eu(t);case 8:return t===yc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Um(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function v1(e){var t=Um(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mi(e){e._valueTracker||(e._valueTracker=v1(e))}function Hm(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Um(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Tl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function tu(e,t){var n=t.checked;return Ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Gd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Vm(e,t){t=t.checked,t!=null&&gc(e,"checked",t,!1)}function nu(e,t){Vm(e,t);var n=Vn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ru(e,t.type,n):t.hasOwnProperty("defaultValue")&&ru(e,t.type,Vn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Yd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ru(e,t,n){(t!=="number"||Tl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vo=Array.isArray;function Nr(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function ou(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(M(91));return Ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(M(92));if(vo(n)){if(1<n.length)throw Error(M(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vn(n)}}function Wm(e,t){var n=Vn(t.value),r=Vn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Zd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Km(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function iu(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Km(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ni,Qm=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ni=Ni||document.createElement("div"),Ni.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ni.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function $o(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Eo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},S1=["Webkit","ms","Moz","O"];Object.keys(Eo).forEach(function(e){S1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Eo[t]=Eo[e]})});function qm(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Eo.hasOwnProperty(e)&&Eo[e]?(""+t).trim():t+"px"}function Gm(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=qm(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var C1=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function lu(e,t){if(t){if(C1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(M(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(M(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(M(61))}if(t.style!=null&&typeof t.style!="object")throw Error(M(62))}}function au(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var su=null;function bc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var uu=null,Fr=null,Dr=null;function Jd(e){if(e=xi(e)){if(typeof uu!="function")throw Error(M(280));var t=e.stateNode;t&&(t=pa(t),uu(e.stateNode,e.type,t))}}function Ym(e){Fr?Dr?Dr.push(e):Dr=[e]:Fr=e}function Xm(){if(Fr){var e=Fr,t=Dr;if(Dr=Fr=null,Jd(e),t)for(e=0;e<t.length;e++)Jd(t[e])}}function Zm(e,t){return e(t)}function Jm(){}var es=!1;function eh(e,t,n){if(es)return e(t,n);es=!0;try{return Zm(e,t,n)}finally{es=!1,(Fr!==null||Dr!==null)&&(Jm(),Xm())}}function Bo(e,t){var n=e.stateNode;if(n===null)return null;var r=pa(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(M(231,t,typeof n));return n}var cu=!1;if(yn)try{var co={};Object.defineProperty(co,"passive",{get:function(){cu=!0}}),window.addEventListener("test",co,co),window.removeEventListener("test",co,co)}catch{cu=!1}function E1(e,t,n,r,o,i,l,a,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var To=!1,Pl=null,_l=!1,du=null,T1={onError:function(e){To=!0,Pl=e}};function P1(e,t,n,r,o,i,l,a,s){To=!1,Pl=null,E1.apply(T1,arguments)}function _1(e,t,n,r,o,i,l,a,s){if(P1.apply(this,arguments),To){if(To){var u=Pl;To=!1,Pl=null}else throw Error(M(198));_l||(_l=!0,du=u)}}function hr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function th(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ef(e){if(hr(e)!==e)throw Error(M(188))}function R1(e){var t=e.alternate;if(!t){if(t=hr(e),t===null)throw Error(M(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return ef(o),e;if(i===r)return ef(o),t;i=i.sibling}throw Error(M(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,a=o.child;a;){if(a===n){l=!0,n=o,r=i;break}if(a===r){l=!0,r=o,n=i;break}a=a.sibling}if(!l){for(a=i.child;a;){if(a===n){l=!0,n=i,r=o;break}if(a===r){l=!0,r=i,n=o;break}a=a.sibling}if(!l)throw Error(M(189))}}if(n.alternate!==r)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?e:t}function nh(e){return e=R1(e),e!==null?rh(e):null}function rh(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=rh(e);if(t!==null)return t;e=e.sibling}return null}var oh=Ct.unstable_scheduleCallback,tf=Ct.unstable_cancelCallback,I1=Ct.unstable_shouldYield,A1=Ct.unstable_requestPaint,Re=Ct.unstable_now,O1=Ct.unstable_getCurrentPriorityLevel,xc=Ct.unstable_ImmediatePriority,ih=Ct.unstable_UserBlockingPriority,Rl=Ct.unstable_NormalPriority,L1=Ct.unstable_LowPriority,lh=Ct.unstable_IdlePriority,ua=null,rn=null;function z1(e){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(ua,e,void 0,(e.current.flags&128)===128)}catch{}}var Qt=Math.clz32?Math.clz32:F1,M1=Math.log,N1=Math.LN2;function F1(e){return e>>>=0,e===0?32:31-(M1(e)/N1|0)|0}var Fi=64,Di=4194304;function So(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Il(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var a=l&~o;a!==0?r=So(a):(i&=l,i!==0&&(r=So(i)))}else l=n&~o,l!==0?r=So(l):i!==0&&(r=So(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qt(t),o=1<<n,r|=e[n],t&=~o;return r}function D1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function j1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-Qt(i),a=1<<l,s=o[l];s===-1?(!(a&n)||a&r)&&(o[l]=D1(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function fu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ah(){var e=Fi;return Fi<<=1,!(Fi&4194240)&&(Fi=64),e}function ts(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wi(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qt(t),e[t]=n}function $1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Qt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function vc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var se=0;function sh(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var uh,Sc,ch,dh,fh,pu=!1,ji=[],Mn=null,Nn=null,Fn=null,Uo=new Map,Ho=new Map,Rn=[],B1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function nf(e,t){switch(e){case"focusin":case"focusout":Mn=null;break;case"dragenter":case"dragleave":Nn=null;break;case"mouseover":case"mouseout":Fn=null;break;case"pointerover":case"pointerout":Uo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ho.delete(t.pointerId)}}function fo(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=xi(t),t!==null&&Sc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function U1(e,t,n,r,o){switch(t){case"focusin":return Mn=fo(Mn,e,t,n,r,o),!0;case"dragenter":return Nn=fo(Nn,e,t,n,r,o),!0;case"mouseover":return Fn=fo(Fn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Uo.set(i,fo(Uo.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Ho.set(i,fo(Ho.get(i)||null,e,t,n,r,o)),!0}return!1}function ph(e){var t=rr(e.target);if(t!==null){var n=hr(t);if(n!==null){if(t=n.tag,t===13){if(t=th(n),t!==null){e.blockedOn=t,fh(e.priority,function(){ch(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ul(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=mu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);su=r,n.target.dispatchEvent(r),su=null}else return t=xi(n),t!==null&&Sc(t),e.blockedOn=n,!1;t.shift()}return!0}function rf(e,t,n){ul(e)&&n.delete(t)}function H1(){pu=!1,Mn!==null&&ul(Mn)&&(Mn=null),Nn!==null&&ul(Nn)&&(Nn=null),Fn!==null&&ul(Fn)&&(Fn=null),Uo.forEach(rf),Ho.forEach(rf)}function po(e,t){e.blockedOn===t&&(e.blockedOn=null,pu||(pu=!0,Ct.unstable_scheduleCallback(Ct.unstable_NormalPriority,H1)))}function Vo(e){function t(o){return po(o,e)}if(0<ji.length){po(ji[0],e);for(var n=1;n<ji.length;n++){var r=ji[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Mn!==null&&po(Mn,e),Nn!==null&&po(Nn,e),Fn!==null&&po(Fn,e),Uo.forEach(t),Ho.forEach(t),n=0;n<Rn.length;n++)r=Rn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rn.length&&(n=Rn[0],n.blockedOn===null);)ph(n),n.blockedOn===null&&Rn.shift()}var jr=vn.ReactCurrentBatchConfig,Al=!0;function V1(e,t,n,r){var o=se,i=jr.transition;jr.transition=null;try{se=1,Cc(e,t,n,r)}finally{se=o,jr.transition=i}}function W1(e,t,n,r){var o=se,i=jr.transition;jr.transition=null;try{se=4,Cc(e,t,n,r)}finally{se=o,jr.transition=i}}function Cc(e,t,n,r){if(Al){var o=mu(e,t,n,r);if(o===null)ds(e,t,r,Ol,n),nf(e,r);else if(U1(o,e,t,n,r))r.stopPropagation();else if(nf(e,r),t&4&&-1<B1.indexOf(e)){for(;o!==null;){var i=xi(o);if(i!==null&&uh(i),i=mu(e,t,n,r),i===null&&ds(e,t,r,Ol,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else ds(e,t,r,null,n)}}var Ol=null;function mu(e,t,n,r){if(Ol=null,e=bc(r),e=rr(e),e!==null)if(t=hr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=th(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ol=e,null}function mh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O1()){case xc:return 1;case ih:return 4;case Rl:case L1:return 16;case lh:return 536870912;default:return 16}default:return 16}}var On=null,Ec=null,cl=null;function hh(){if(cl)return cl;var e,t=Ec,n=t.length,r,o="value"in On?On.value:On.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return cl=o.slice(e,1<r?1-r:void 0)}function dl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function $i(){return!0}function of(){return!1}function Tt(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?$i:of,this.isPropagationStopped=of,this}return Ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=$i)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=$i)},persist:function(){},isPersistent:$i}),t}var no={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tc=Tt(no),bi=Ee({},no,{view:0,detail:0}),K1=Tt(bi),ns,rs,mo,ca=Ee({},bi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==mo&&(mo&&e.type==="mousemove"?(ns=e.screenX-mo.screenX,rs=e.screenY-mo.screenY):rs=ns=0,mo=e),ns)},movementY:function(e){return"movementY"in e?e.movementY:rs}}),lf=Tt(ca),Q1=Ee({},ca,{dataTransfer:0}),q1=Tt(Q1),G1=Ee({},bi,{relatedTarget:0}),os=Tt(G1),Y1=Ee({},no,{animationName:0,elapsedTime:0,pseudoElement:0}),X1=Tt(Y1),Z1=Ee({},no,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),J1=Tt(Z1),ek=Ee({},no,{data:0}),af=Tt(ek),tk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},nk={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ok(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rk[e])?!!t[e]:!1}function Pc(){return ok}var ik=Ee({},bi,{key:function(e){if(e.key){var t=tk[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=dl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?nk[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pc,charCode:function(e){return e.type==="keypress"?dl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?dl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lk=Tt(ik),ak=Ee({},ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sf=Tt(ak),sk=Ee({},bi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pc}),uk=Tt(sk),ck=Ee({},no,{propertyName:0,elapsedTime:0,pseudoElement:0}),dk=Tt(ck),fk=Ee({},ca,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pk=Tt(fk),mk=[9,13,27,32],_c=yn&&"CompositionEvent"in window,Po=null;yn&&"documentMode"in document&&(Po=document.documentMode);var hk=yn&&"TextEvent"in window&&!Po,gh=yn&&(!_c||Po&&8<Po&&11>=Po),uf=" ",cf=!1;function yh(e,t){switch(e){case"keyup":return mk.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Tr=!1;function gk(e,t){switch(e){case"compositionend":return kh(t);case"keypress":return t.which!==32?null:(cf=!0,uf);case"textInput":return e=t.data,e===uf&&cf?null:e;default:return null}}function yk(e,t){if(Tr)return e==="compositionend"||!_c&&yh(e,t)?(e=hh(),cl=Ec=On=null,Tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return gh&&t.locale!=="ko"?null:t.data;default:return null}}var kk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function df(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kk[e.type]:t==="textarea"}function wh(e,t,n,r){Ym(r),t=Ll(t,"onChange"),0<t.length&&(n=new Tc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var _o=null,Wo=null;function wk(e){Ih(e,0)}function da(e){var t=Rr(e);if(Hm(t))return e}function bk(e,t){if(e==="change")return t}var bh=!1;if(yn){var is;if(yn){var ls="oninput"in document;if(!ls){var ff=document.createElement("div");ff.setAttribute("oninput","return;"),ls=typeof ff.oninput=="function"}is=ls}else is=!1;bh=is&&(!document.documentMode||9<document.documentMode)}function pf(){_o&&(_o.detachEvent("onpropertychange",xh),Wo=_o=null)}function xh(e){if(e.propertyName==="value"&&da(Wo)){var t=[];wh(t,Wo,e,bc(e)),eh(wk,t)}}function xk(e,t,n){e==="focusin"?(pf(),_o=t,Wo=n,_o.attachEvent("onpropertychange",xh)):e==="focusout"&&pf()}function vk(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return da(Wo)}function Sk(e,t){if(e==="click")return da(t)}function Ck(e,t){if(e==="input"||e==="change")return da(t)}function Ek(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Yt=typeof Object.is=="function"?Object.is:Ek;function Ko(e,t){if(Yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!Ys.call(t,o)||!Yt(e[o],t[o]))return!1}return!0}function mf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hf(e,t){var n=mf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=mf(n)}}function vh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?vh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sh(){for(var e=window,t=Tl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tl(e.document)}return t}function Rc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Tk(e){var t=Sh(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&vh(n.ownerDocument.documentElement,n)){if(r!==null&&Rc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=hf(n,i);var l=hf(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Pk=yn&&"documentMode"in document&&11>=document.documentMode,Pr=null,hu=null,Ro=null,gu=!1;function gf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gu||Pr==null||Pr!==Tl(r)||(r=Pr,"selectionStart"in r&&Rc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ro&&Ko(Ro,r)||(Ro=r,r=Ll(hu,"onSelect"),0<r.length&&(t=new Tc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Pr)))}function Bi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var _r={animationend:Bi("Animation","AnimationEnd"),animationiteration:Bi("Animation","AnimationIteration"),animationstart:Bi("Animation","AnimationStart"),transitionend:Bi("Transition","TransitionEnd")},as={},Ch={};yn&&(Ch=document.createElement("div").style,"AnimationEvent"in window||(delete _r.animationend.animation,delete _r.animationiteration.animation,delete _r.animationstart.animation),"TransitionEvent"in window||delete _r.transitionend.transition);function fa(e){if(as[e])return as[e];if(!_r[e])return e;var t=_r[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ch)return as[e]=t[n];return e}var Eh=fa("animationend"),Th=fa("animationiteration"),Ph=fa("animationstart"),_h=fa("transitionend"),Rh=new Map,yf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qn(e,t){Rh.set(e,t),mr(t,[e])}for(var ss=0;ss<yf.length;ss++){var us=yf[ss],_k=us.toLowerCase(),Rk=us[0].toUpperCase()+us.slice(1);Qn(_k,"on"+Rk)}Qn(Eh,"onAnimationEnd");Qn(Th,"onAnimationIteration");Qn(Ph,"onAnimationStart");Qn("dblclick","onDoubleClick");Qn("focusin","onFocus");Qn("focusout","onBlur");Qn(_h,"onTransitionEnd");Wr("onMouseEnter",["mouseout","mouseover"]);Wr("onMouseLeave",["mouseout","mouseover"]);Wr("onPointerEnter",["pointerout","pointerover"]);Wr("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Co="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ik=new Set("cancel close invalid load scroll toggle".split(" ").concat(Co));function kf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,_1(r,t,void 0,e),e.currentTarget=null}function Ih(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],s=a.instance,u=a.currentTarget;if(a=a.listener,s!==i&&o.isPropagationStopped())break e;kf(o,a,u),i=s}else for(l=0;l<r.length;l++){if(a=r[l],s=a.instance,u=a.currentTarget,a=a.listener,s!==i&&o.isPropagationStopped())break e;kf(o,a,u),i=s}}}if(_l)throw e=du,_l=!1,du=null,e}function ge(e,t){var n=t[xu];n===void 0&&(n=t[xu]=new Set);var r=e+"__bubble";n.has(r)||(Ah(t,e,2,!1),n.add(r))}function cs(e,t,n){var r=0;t&&(r|=4),Ah(n,e,r,t)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function Qo(e){if(!e[Ui]){e[Ui]=!0,Dm.forEach(function(n){n!=="selectionchange"&&(Ik.has(n)||cs(n,!1,e),cs(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ui]||(t[Ui]=!0,cs("selectionchange",!1,t))}}function Ah(e,t,n,r){switch(mh(t)){case 1:var o=V1;break;case 4:o=W1;break;default:o=Cc}n=o.bind(null,t,n,e),o=void 0,!cu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function ds(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;l=l.return}for(;a!==null;){if(l=rr(a),l===null)return;if(s=l.tag,s===5||s===6){r=i=l;continue e}a=a.parentNode}}r=r.return}eh(function(){var u=i,d=bc(n),c=[];e:{var f=Rh.get(e);if(f!==void 0){var p=Tc,h=e;switch(e){case"keypress":if(dl(n)===0)break e;case"keydown":case"keyup":p=lk;break;case"focusin":h="focus",p=os;break;case"focusout":h="blur",p=os;break;case"beforeblur":case"afterblur":p=os;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=lf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=q1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=uk;break;case Eh:case Th:case Ph:p=X1;break;case _h:p=dk;break;case"scroll":p=K1;break;case"wheel":p=pk;break;case"copy":case"cut":case"paste":p=J1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=sf}var k=(t&4)!==0,C=!k&&e==="scroll",g=k?f!==null?f+"Capture":null:f;k=[];for(var m=u,y;m!==null;){y=m;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,g!==null&&(S=Bo(m,g),S!=null&&k.push(qo(m,S,y)))),C)break;m=m.return}0<k.length&&(f=new p(f,h,null,n,d),c.push({event:f,listeners:k}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==su&&(h=n.relatedTarget||n.fromElement)&&(rr(h)||h[kn]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(h=n.relatedTarget||n.toElement,p=u,h=h?rr(h):null,h!==null&&(C=hr(h),h!==C||h.tag!==5&&h.tag!==6)&&(h=null)):(p=null,h=u),p!==h)){if(k=lf,S="onMouseLeave",g="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(k=sf,S="onPointerLeave",g="onPointerEnter",m="pointer"),C=p==null?f:Rr(p),y=h==null?f:Rr(h),f=new k(S,m+"leave",p,n,d),f.target=C,f.relatedTarget=y,S=null,rr(d)===u&&(k=new k(g,m+"enter",h,n,d),k.target=y,k.relatedTarget=C,S=k),C=S,p&&h)t:{for(k=p,g=h,m=0,y=k;y;y=xr(y))m++;for(y=0,S=g;S;S=xr(S))y++;for(;0<m-y;)k=xr(k),m--;for(;0<y-m;)g=xr(g),y--;for(;m--;){if(k===g||g!==null&&k===g.alternate)break t;k=xr(k),g=xr(g)}k=null}else k=null;p!==null&&wf(c,f,p,k,!1),h!==null&&C!==null&&wf(c,C,h,k,!0)}}e:{if(f=u?Rr(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=bk;else if(df(f))if(bh)T=Ck;else{T=vk;var v=xk}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(T=Sk);if(T&&(T=T(e,u))){wh(c,T,n,d);break e}v&&v(e,f,u),e==="focusout"&&(v=f._wrapperState)&&v.controlled&&f.type==="number"&&ru(f,"number",f.value)}switch(v=u?Rr(u):window,e){case"focusin":(df(v)||v.contentEditable==="true")&&(Pr=v,hu=u,Ro=null);break;case"focusout":Ro=hu=Pr=null;break;case"mousedown":gu=!0;break;case"contextmenu":case"mouseup":case"dragend":gu=!1,gf(c,n,d);break;case"selectionchange":if(Pk)break;case"keydown":case"keyup":gf(c,n,d)}var E;if(_c)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else Tr?yh(e,n)&&(_="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(gh&&n.locale!=="ko"&&(Tr||_!=="onCompositionStart"?_==="onCompositionEnd"&&Tr&&(E=hh()):(On=d,Ec="value"in On?On.value:On.textContent,Tr=!0)),v=Ll(u,_),0<v.length&&(_=new af(_,e,null,n,d),c.push({event:_,listeners:v}),E?_.data=E:(E=kh(n),E!==null&&(_.data=E)))),(E=hk?gk(e,n):yk(e,n))&&(u=Ll(u,"onBeforeInput"),0<u.length&&(d=new af("onBeforeInput","beforeinput",null,n,d),c.push({event:d,listeners:u}),d.data=E))}Ih(c,t)})}function qo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ll(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Bo(e,n),i!=null&&r.unshift(qo(e,i,o)),i=Bo(e,t),i!=null&&r.push(qo(e,i,o))),e=e.return}return r}function xr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wf(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var a=n,s=a.alternate,u=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&u!==null&&(a=u,o?(s=Bo(n,i),s!=null&&l.unshift(qo(n,s,a))):o||(s=Bo(n,i),s!=null&&l.push(qo(n,s,a)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Ak=/\r\n?/g,Ok=/\u0000|\uFFFD/g;function bf(e){return(typeof e=="string"?e:""+e).replace(Ak,`
`).replace(Ok,"")}function Hi(e,t,n){if(t=bf(t),bf(e)!==t&&n)throw Error(M(425))}function zl(){}var yu=null,ku=null;function wu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bu=typeof setTimeout=="function"?setTimeout:void 0,Lk=typeof clearTimeout=="function"?clearTimeout:void 0,xf=typeof Promise=="function"?Promise:void 0,zk=typeof queueMicrotask=="function"?queueMicrotask:typeof xf<"u"?function(e){return xf.resolve(null).then(e).catch(Mk)}:bu;function Mk(e){setTimeout(function(){throw e})}function fs(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Vo(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Vo(t)}function Dn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function vf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ro=Math.random().toString(36).slice(2),nn="__reactFiber$"+ro,Go="__reactProps$"+ro,kn="__reactContainer$"+ro,xu="__reactEvents$"+ro,Nk="__reactListeners$"+ro,Fk="__reactHandles$"+ro;function rr(e){var t=e[nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kn]||n[nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=vf(e);e!==null;){if(n=e[nn])return n;e=vf(e)}return t}e=n,n=e.parentNode}return null}function xi(e){return e=e[nn]||e[kn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Rr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(M(33))}function pa(e){return e[Go]||null}var vu=[],Ir=-1;function qn(e){return{current:e}}function ye(e){0>Ir||(e.current=vu[Ir],vu[Ir]=null,Ir--)}function he(e,t){Ir++,vu[Ir]=e.current,e.current=t}var Wn={},Ze=qn(Wn),ct=qn(!1),sr=Wn;function Kr(e,t){var n=e.type.contextTypes;if(!n)return Wn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function dt(e){return e=e.childContextTypes,e!=null}function Ml(){ye(ct),ye(Ze)}function Sf(e,t,n){if(Ze.current!==Wn)throw Error(M(168));he(Ze,t),he(ct,n)}function Oh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(M(108,x1(e)||"Unknown",o));return Ee({},n,r)}function Nl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Wn,sr=Ze.current,he(Ze,e),he(ct,ct.current),!0}function Cf(e,t,n){var r=e.stateNode;if(!r)throw Error(M(169));n?(e=Oh(e,t,sr),r.__reactInternalMemoizedMergedChildContext=e,ye(ct),ye(Ze),he(Ze,e)):ye(ct),he(ct,n)}var dn=null,ma=!1,ps=!1;function Lh(e){dn===null?dn=[e]:dn.push(e)}function Dk(e){ma=!0,Lh(e)}function Gn(){if(!ps&&dn!==null){ps=!0;var e=0,t=se;try{var n=dn;for(se=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}dn=null,ma=!1}catch(o){throw dn!==null&&(dn=dn.slice(e+1)),oh(xc,Gn),o}finally{se=t,ps=!1}}return null}var Ar=[],Or=0,Fl=null,Dl=0,Rt=[],It=0,ur=null,pn=1,mn="";function Jn(e,t){Ar[Or++]=Dl,Ar[Or++]=Fl,Fl=e,Dl=t}function zh(e,t,n){Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=ur,ur=e;var r=pn;e=mn;var o=32-Qt(r)-1;r&=~(1<<o),n+=1;var i=32-Qt(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,pn=1<<32-Qt(t)+o|n<<o|r,mn=i+e}else pn=1<<i|n<<o|r,mn=e}function Ic(e){e.return!==null&&(Jn(e,1),zh(e,1,0))}function Ac(e){for(;e===Fl;)Fl=Ar[--Or],Ar[Or]=null,Dl=Ar[--Or],Ar[Or]=null;for(;e===ur;)ur=Rt[--It],Rt[It]=null,mn=Rt[--It],Rt[It]=null,pn=Rt[--It],Rt[It]=null}var xt=null,bt=null,xe=!1,Wt=null;function Mh(e,t){var n=zt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ef(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xt=e,bt=Dn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xt=e,bt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=ur!==null?{id:pn,overflow:mn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=zt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,xt=e,bt=null,!0):!1;default:return!1}}function Su(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Cu(e){if(xe){var t=bt;if(t){var n=t;if(!Ef(e,t)){if(Su(e))throw Error(M(418));t=Dn(n.nextSibling);var r=xt;t&&Ef(e,t)?Mh(r,n):(e.flags=e.flags&-4097|2,xe=!1,xt=e)}}else{if(Su(e))throw Error(M(418));e.flags=e.flags&-4097|2,xe=!1,xt=e}}}function Tf(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xt=e}function Vi(e){if(e!==xt)return!1;if(!xe)return Tf(e),xe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wu(e.type,e.memoizedProps)),t&&(t=bt)){if(Su(e))throw Nh(),Error(M(418));for(;t;)Mh(e,t),t=Dn(t.nextSibling)}if(Tf(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){bt=Dn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}bt=null}}else bt=xt?Dn(e.stateNode.nextSibling):null;return!0}function Nh(){for(var e=bt;e;)e=Dn(e.nextSibling)}function Qr(){bt=xt=null,xe=!1}function Oc(e){Wt===null?Wt=[e]:Wt.push(e)}var jk=vn.ReactCurrentBatchConfig;function Ht(e,t){if(e&&e.defaultProps){t=Ee({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var jl=qn(null),$l=null,Lr=null,Lc=null;function zc(){Lc=Lr=$l=null}function Mc(e){var t=jl.current;ye(jl),e._currentValue=t}function Eu(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function $r(e,t){$l=e,Lc=Lr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ut=!0),e.firstContext=null)}function Nt(e){var t=e._currentValue;if(Lc!==e)if(e={context:e,memoizedValue:t,next:null},Lr===null){if($l===null)throw Error(M(308));Lr=e,$l.dependencies={lanes:0,firstContext:e}}else Lr=Lr.next=e;return t}var or=null;function Nc(e){or===null?or=[e]:or.push(e)}function Fh(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Nc(t)):(n.next=o.next,o.next=n),t.interleaved=n,wn(e,r)}function wn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var _n=!1;function Fc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function jn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,oe&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,wn(e,n)}return o=r.interleaved,o===null?(t.next=t,Nc(r)):(t.next=o.next,o.next=t),r.interleaved=t,wn(e,n)}function fl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vc(e,n)}}function Pf(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Bl(e,t,n,r){var o=e.updateQueue;_n=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var s=a,u=s.next;s.next=null,l===null?i=u:l.next=u,l=s;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==l&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=s))}if(i!==null){var c=o.baseState;l=0,d=u=s=null,a=i;do{var f=a.lane,p=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var h=e,k=a;switch(f=t,p=n,k.tag){case 1:if(h=k.payload,typeof h=="function"){c=h.call(p,c,f);break e}c=h;break e;case 3:h.flags=h.flags&-65537|128;case 0:if(h=k.payload,f=typeof h=="function"?h.call(p,c,f):h,f==null)break e;c=Ee({},c,f);break e;case 2:_n=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=p,s=c):d=d.next=p,l|=f;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;f=a,a=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(d===null&&(s=c),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);dr|=l,e.lanes=l,e.memoizedState=c}}function _f(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(M(191,o));o.call(r)}}}var jh=new Fm.Component().refs;function Tu(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ha={isMounted:function(e){return(e=e._reactInternals)?hr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),fl(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),fl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=nt(),r=Bn(e),o=gn(n,r);o.tag=2,t!=null&&(o.callback=t),t=jn(e,o,r),t!==null&&(qt(t,e,r,n),fl(t,e,r))}};function Rf(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!Ko(n,r)||!Ko(o,i):!0}function $h(e,t,n){var r=!1,o=Wn,i=t.contextType;return typeof i=="object"&&i!==null?i=Nt(i):(o=dt(t)?sr:Ze.current,r=t.contextTypes,i=(r=r!=null)?Kr(e,o):Wn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ha,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function If(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ha.enqueueReplaceState(t,t.state,null)}function Pu(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=jh,Fc(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Nt(i):(i=dt(t)?sr:Ze.current,o.context=Kr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Tu(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&ha.enqueueReplaceState(o,o.state,null),Bl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function ho(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(M(309));var r=n.stateNode}if(!r)throw Error(M(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var a=o.refs;a===jh&&(a=o.refs={}),l===null?delete a[i]:a[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(M(284));if(!n._owner)throw Error(M(290,e))}return e}function Wi(e,t){throw e=Object.prototype.toString.call(t),Error(M(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Af(e){var t=e._init;return t(e._payload)}function Bh(e){function t(g,m){if(e){var y=g.deletions;y===null?(g.deletions=[m],g.flags|=16):y.push(m)}}function n(g,m){if(!e)return null;for(;m!==null;)t(g,m),m=m.sibling;return null}function r(g,m){for(g=new Map;m!==null;)m.key!==null?g.set(m.key,m):g.set(m.index,m),m=m.sibling;return g}function o(g,m){return g=Un(g,m),g.index=0,g.sibling=null,g}function i(g,m,y){return g.index=y,e?(y=g.alternate,y!==null?(y=y.index,y<m?(g.flags|=2,m):y):(g.flags|=2,m)):(g.flags|=1048576,m)}function l(g){return e&&g.alternate===null&&(g.flags|=2),g}function a(g,m,y,S){return m===null||m.tag!==6?(m=bs(y,g.mode,S),m.return=g,m):(m=o(m,y),m.return=g,m)}function s(g,m,y,S){var T=y.type;return T===Er?d(g,m,y.props.children,S,y.key):m!==null&&(m.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Af(T)===m.type)?(S=o(m,y.props),S.ref=ho(g,m,y),S.return=g,S):(S=kl(y.type,y.key,y.props,null,g.mode,S),S.ref=ho(g,m,y),S.return=g,S)}function u(g,m,y,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==y.containerInfo||m.stateNode.implementation!==y.implementation?(m=xs(y,g.mode,S),m.return=g,m):(m=o(m,y.children||[]),m.return=g,m)}function d(g,m,y,S,T){return m===null||m.tag!==7?(m=ar(y,g.mode,S,T),m.return=g,m):(m=o(m,y),m.return=g,m)}function c(g,m,y){if(typeof m=="string"&&m!==""||typeof m=="number")return m=bs(""+m,g.mode,y),m.return=g,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case zi:return y=kl(m.type,m.key,m.props,null,g.mode,y),y.ref=ho(g,null,m),y.return=g,y;case Cr:return m=xs(m,g.mode,y),m.return=g,m;case Pn:var S=m._init;return c(g,S(m._payload),y)}if(vo(m)||uo(m))return m=ar(m,g.mode,y,null),m.return=g,m;Wi(g,m)}return null}function f(g,m,y,S){var T=m!==null?m.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return T!==null?null:a(g,m,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case zi:return y.key===T?s(g,m,y,S):null;case Cr:return y.key===T?u(g,m,y,S):null;case Pn:return T=y._init,f(g,m,T(y._payload),S)}if(vo(y)||uo(y))return T!==null?null:d(g,m,y,S,null);Wi(g,y)}return null}function p(g,m,y,S,T){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(y)||null,a(m,g,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case zi:return g=g.get(S.key===null?y:S.key)||null,s(m,g,S,T);case Cr:return g=g.get(S.key===null?y:S.key)||null,u(m,g,S,T);case Pn:var v=S._init;return p(g,m,y,v(S._payload),T)}if(vo(S)||uo(S))return g=g.get(y)||null,d(m,g,S,T,null);Wi(m,S)}return null}function h(g,m,y,S){for(var T=null,v=null,E=m,_=m=0,N=null;E!==null&&_<y.length;_++){E.index>_?(N=E,E=null):N=E.sibling;var b=f(g,E,y[_],S);if(b===null){E===null&&(E=N);break}e&&E&&b.alternate===null&&t(g,E),m=i(b,m,_),v===null?T=b:v.sibling=b,v=b,E=N}if(_===y.length)return n(g,E),xe&&Jn(g,_),T;if(E===null){for(;_<y.length;_++)E=c(g,y[_],S),E!==null&&(m=i(E,m,_),v===null?T=E:v.sibling=E,v=E);return xe&&Jn(g,_),T}for(E=r(g,E);_<y.length;_++)N=p(E,g,_,y[_],S),N!==null&&(e&&N.alternate!==null&&E.delete(N.key===null?_:N.key),m=i(N,m,_),v===null?T=N:v.sibling=N,v=N);return e&&E.forEach(function(A){return t(g,A)}),xe&&Jn(g,_),T}function k(g,m,y,S){var T=uo(y);if(typeof T!="function")throw Error(M(150));if(y=T.call(y),y==null)throw Error(M(151));for(var v=T=null,E=m,_=m=0,N=null,b=y.next();E!==null&&!b.done;_++,b=y.next()){E.index>_?(N=E,E=null):N=E.sibling;var A=f(g,E,b.value,S);if(A===null){E===null&&(E=N);break}e&&E&&A.alternate===null&&t(g,E),m=i(A,m,_),v===null?T=A:v.sibling=A,v=A,E=N}if(b.done)return n(g,E),xe&&Jn(g,_),T;if(E===null){for(;!b.done;_++,b=y.next())b=c(g,b.value,S),b!==null&&(m=i(b,m,_),v===null?T=b:v.sibling=b,v=b);return xe&&Jn(g,_),T}for(E=r(g,E);!b.done;_++,b=y.next())b=p(E,g,_,b.value,S),b!==null&&(e&&b.alternate!==null&&E.delete(b.key===null?_:b.key),m=i(b,m,_),v===null?T=b:v.sibling=b,v=b);return e&&E.forEach(function(L){return t(g,L)}),xe&&Jn(g,_),T}function C(g,m,y,S){if(typeof y=="object"&&y!==null&&y.type===Er&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case zi:e:{for(var T=y.key,v=m;v!==null;){if(v.key===T){if(T=y.type,T===Er){if(v.tag===7){n(g,v.sibling),m=o(v,y.props.children),m.return=g,g=m;break e}}else if(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Af(T)===v.type){n(g,v.sibling),m=o(v,y.props),m.ref=ho(g,v,y),m.return=g,g=m;break e}n(g,v);break}else t(g,v);v=v.sibling}y.type===Er?(m=ar(y.props.children,g.mode,S,y.key),m.return=g,g=m):(S=kl(y.type,y.key,y.props,null,g.mode,S),S.ref=ho(g,m,y),S.return=g,g=S)}return l(g);case Cr:e:{for(v=y.key;m!==null;){if(m.key===v)if(m.tag===4&&m.stateNode.containerInfo===y.containerInfo&&m.stateNode.implementation===y.implementation){n(g,m.sibling),m=o(m,y.children||[]),m.return=g,g=m;break e}else{n(g,m);break}else t(g,m);m=m.sibling}m=xs(y,g.mode,S),m.return=g,g=m}return l(g);case Pn:return v=y._init,C(g,m,v(y._payload),S)}if(vo(y))return h(g,m,y,S);if(uo(y))return k(g,m,y,S);Wi(g,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,m!==null&&m.tag===6?(n(g,m.sibling),m=o(m,y),m.return=g,g=m):(n(g,m),m=bs(y,g.mode,S),m.return=g,g=m),l(g)):n(g,m)}return C}var qr=Bh(!0),Uh=Bh(!1),vi={},on=qn(vi),Yo=qn(vi),Xo=qn(vi);function ir(e){if(e===vi)throw Error(M(174));return e}function Dc(e,t){switch(he(Xo,t),he(Yo,e),he(on,vi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:iu(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=iu(t,e)}ye(on),he(on,t)}function Gr(){ye(on),ye(Yo),ye(Xo)}function Hh(e){ir(Xo.current);var t=ir(on.current),n=iu(t,e.type);t!==n&&(he(Yo,e),he(on,n))}function jc(e){Yo.current===e&&(ye(on),ye(Yo))}var Se=qn(0);function Ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ms=[];function $c(){for(var e=0;e<ms.length;e++)ms[e]._workInProgressVersionPrimary=null;ms.length=0}var pl=vn.ReactCurrentDispatcher,hs=vn.ReactCurrentBatchConfig,cr=0,Ce=null,Ne=null,je=null,Hl=!1,Io=!1,Zo=0,$k=0;function Qe(){throw Error(M(321))}function Bc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yt(e[n],t[n]))return!1;return!0}function Uc(e,t,n,r,o,i){if(cr=i,Ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,pl.current=e===null||e.memoizedState===null?Vk:Wk,e=n(r,o),Io){i=0;do{if(Io=!1,Zo=0,25<=i)throw Error(M(301));i+=1,je=Ne=null,t.updateQueue=null,pl.current=Kk,e=n(r,o)}while(Io)}if(pl.current=Vl,t=Ne!==null&&Ne.next!==null,cr=0,je=Ne=Ce=null,Hl=!1,t)throw Error(M(300));return e}function Hc(){var e=Zo!==0;return Zo=0,e}function Zt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return je===null?Ce.memoizedState=je=e:je=je.next=e,je}function Ft(){if(Ne===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=Ne.next;var t=je===null?Ce.memoizedState:je.next;if(t!==null)je=t,Ne=e;else{if(e===null)throw Error(M(310));Ne=e,e={memoizedState:Ne.memoizedState,baseState:Ne.baseState,baseQueue:Ne.baseQueue,queue:Ne.queue,next:null},je===null?Ce.memoizedState=je=e:je=je.next=e}return je}function Jo(e,t){return typeof t=="function"?t(e):t}function gs(e){var t=Ft(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=Ne,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var a=l=null,s=null,u=i;do{var d=u.lane;if((cr&d)===d)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(a=s=c,l=r):s=s.next=c,Ce.lanes|=d,dr|=d}u=u.next}while(u!==null&&u!==i);s===null?l=r:s.next=a,Yt(r,t.memoizedState)||(ut=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Ce.lanes|=i,dr|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ys(e){var t=Ft(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);Yt(i,t.memoizedState)||(ut=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Vh(){}function Wh(e,t){var n=Ce,r=Ft(),o=t(),i=!Yt(r.memoizedState,o);if(i&&(r.memoizedState=o,ut=!0),r=r.queue,Vc(qh.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||je!==null&&je.memoizedState.tag&1){if(n.flags|=2048,ei(9,Qh.bind(null,n,r,o,t),void 0,null),$e===null)throw Error(M(349));cr&30||Kh(n,t,o)}return o}function Kh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Qh(e,t,n,r){t.value=n,t.getSnapshot=r,Gh(t)&&Yh(e)}function qh(e,t,n){return n(function(){Gh(t)&&Yh(e)})}function Gh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yt(e,n)}catch{return!0}}function Yh(e){var t=wn(e,1);t!==null&&qt(t,e,1,-1)}function Of(e){var t=Zt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:e},t.queue=e,e=e.dispatch=Hk.bind(null,Ce,e),[t.memoizedState,e]}function ei(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Xh(){return Ft().memoizedState}function ml(e,t,n,r){var o=Zt();Ce.flags|=e,o.memoizedState=ei(1|t,n,void 0,r===void 0?null:r)}function ga(e,t,n,r){var o=Ft();r=r===void 0?null:r;var i=void 0;if(Ne!==null){var l=Ne.memoizedState;if(i=l.destroy,r!==null&&Bc(r,l.deps)){o.memoizedState=ei(t,n,i,r);return}}Ce.flags|=e,o.memoizedState=ei(1|t,n,i,r)}function Lf(e,t){return ml(8390656,8,e,t)}function Vc(e,t){return ga(2048,8,e,t)}function Zh(e,t){return ga(4,2,e,t)}function Jh(e,t){return ga(4,4,e,t)}function eg(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function tg(e,t,n){return n=n!=null?n.concat([e]):null,ga(4,4,eg.bind(null,t,e),n)}function Wc(){}function ng(e,t){var n=Ft();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function rg(e,t){var n=Ft();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function og(e,t,n){return cr&21?(Yt(n,t)||(n=ah(),Ce.lanes|=n,dr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ut=!0),e.memoizedState=n)}function Bk(e,t){var n=se;se=n!==0&&4>n?n:4,e(!0);var r=hs.transition;hs.transition={};try{e(!1),t()}finally{se=n,hs.transition=r}}function ig(){return Ft().memoizedState}function Uk(e,t,n){var r=Bn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},lg(e))ag(t,n);else if(n=Fh(e,t,n,r),n!==null){var o=nt();qt(n,e,r,o),sg(n,t,r)}}function Hk(e,t,n){var r=Bn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(lg(e))ag(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,a=i(l,n);if(o.hasEagerState=!0,o.eagerState=a,Yt(a,l)){var s=t.interleaved;s===null?(o.next=o,Nc(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=Fh(e,t,o,r),n!==null&&(o=nt(),qt(n,e,r,o),sg(n,t,r))}}function lg(e){var t=e.alternate;return e===Ce||t!==null&&t===Ce}function ag(e,t){Io=Hl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function sg(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vc(e,n)}}var Vl={readContext:Nt,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},Vk={readContext:Nt,useCallback:function(e,t){return Zt().memoizedState=[e,t===void 0?null:t],e},useContext:Nt,useEffect:Lf,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ml(4194308,4,eg.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ml(4194308,4,e,t)},useInsertionEffect:function(e,t){return ml(4,2,e,t)},useMemo:function(e,t){var n=Zt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Zt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Uk.bind(null,Ce,e),[r.memoizedState,e]},useRef:function(e){var t=Zt();return e={current:e},t.memoizedState=e},useState:Of,useDebugValue:Wc,useDeferredValue:function(e){return Zt().memoizedState=e},useTransition:function(){var e=Of(!1),t=e[0];return e=Bk.bind(null,e[1]),Zt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ce,o=Zt();if(xe){if(n===void 0)throw Error(M(407));n=n()}else{if(n=t(),$e===null)throw Error(M(349));cr&30||Kh(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Lf(qh.bind(null,r,i,e),[e]),r.flags|=2048,ei(9,Qh.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Zt(),t=$e.identifierPrefix;if(xe){var n=mn,r=pn;n=(r&~(1<<32-Qt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=$k++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Wk={readContext:Nt,useCallback:ng,useContext:Nt,useEffect:Vc,useImperativeHandle:tg,useInsertionEffect:Zh,useLayoutEffect:Jh,useMemo:rg,useReducer:gs,useRef:Xh,useState:function(){return gs(Jo)},useDebugValue:Wc,useDeferredValue:function(e){var t=Ft();return og(t,Ne.memoizedState,e)},useTransition:function(){var e=gs(Jo)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:Vh,useSyncExternalStore:Wh,useId:ig,unstable_isNewReconciler:!1},Kk={readContext:Nt,useCallback:ng,useContext:Nt,useEffect:Vc,useImperativeHandle:tg,useInsertionEffect:Zh,useLayoutEffect:Jh,useMemo:rg,useReducer:ys,useRef:Xh,useState:function(){return ys(Jo)},useDebugValue:Wc,useDeferredValue:function(e){var t=Ft();return Ne===null?t.memoizedState=e:og(t,Ne.memoizedState,e)},useTransition:function(){var e=ys(Jo)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:Vh,useSyncExternalStore:Wh,useId:ig,unstable_isNewReconciler:!1};function Yr(e,t){try{var n="",r=t;do n+=b1(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function ks(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function _u(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Qk=typeof WeakMap=="function"?WeakMap:Map;function ug(e,t,n){n=gn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Kl||(Kl=!0,Du=r),_u(e,t)},n}function cg(e,t,n){n=gn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){_u(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){_u(e,t),typeof r!="function"&&($n===null?$n=new Set([this]):$n.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function zf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qk;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=aw.bind(null,e,t,n),t.then(e,e))}function Mf(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Nf(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gn(-1,1),t.tag=2,jn(n,t,1))),n.lanes|=1),e)}var qk=vn.ReactCurrentOwner,ut=!1;function et(e,t,n,r){t.child=e===null?Uh(t,null,n,r):qr(t,e.child,n,r)}function Ff(e,t,n,r,o){n=n.render;var i=t.ref;return $r(t,o),r=Uc(e,t,n,r,i,o),n=Hc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(xe&&n&&Ic(t),t.flags|=1,et(e,t,r,o),t.child)}function Df(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Jc(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,dg(e,t,i,r,o)):(e=kl(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ko,n(l,r)&&e.ref===t.ref)return bn(e,t,o)}return t.flags|=1,e=Un(i,r),e.ref=t.ref,e.return=t,t.child=e}function dg(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Ko(i,r)&&e.ref===t.ref)if(ut=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(ut=!0);else return t.lanes=e.lanes,bn(e,t,o)}return Ru(e,t,n,r,o)}function fg(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(Mr,kt),kt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,he(Mr,kt),kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,he(Mr,kt),kt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,he(Mr,kt),kt|=r;return et(e,t,o,n),t.child}function pg(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ru(e,t,n,r,o){var i=dt(n)?sr:Ze.current;return i=Kr(t,i),$r(t,o),n=Uc(e,t,n,r,i,o),r=Hc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(xe&&r&&Ic(t),t.flags|=1,et(e,t,n,o),t.child)}function jf(e,t,n,r,o){if(dt(n)){var i=!0;Nl(t)}else i=!1;if($r(t,o),t.stateNode===null)hl(e,t),$h(t,n,r),Pu(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,a=t.memoizedProps;l.props=a;var s=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=Nt(u):(u=dt(n)?sr:Ze.current,u=Kr(t,u));var d=n.getDerivedStateFromProps,c=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function";c||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==r||s!==u)&&If(t,l,r,u),_n=!1;var f=t.memoizedState;l.state=f,Bl(t,r,l,o),s=t.memoizedState,a!==r||f!==s||ct.current||_n?(typeof d=="function"&&(Tu(t,n,d,r),s=t.memoizedState),(a=_n||Rf(t,n,a,r,f,s,u))?(c||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=a):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Dh(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:Ht(t.type,a),l.props=u,c=t.pendingProps,f=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=Nt(s):(s=dt(n)?sr:Ze.current,s=Kr(t,s));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==c||f!==s)&&If(t,l,r,s),_n=!1,f=t.memoizedState,l.state=f,Bl(t,r,l,o);var h=t.memoizedState;a!==c||f!==h||ct.current||_n?(typeof p=="function"&&(Tu(t,n,p,r),h=t.memoizedState),(u=_n||Rf(t,n,u,r,f,h,s)||!1)?(d||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,h,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,h,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),l.props=r,l.state=h,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Iu(e,t,n,r,i,o)}function Iu(e,t,n,r,o,i){pg(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&Cf(t,n,!1),bn(e,t,i);r=t.stateNode,qk.current=t;var a=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=qr(t,e.child,null,i),t.child=qr(t,null,a,i)):et(e,t,a,i),t.memoizedState=r.state,o&&Cf(t,n,!0),t.child}function mg(e){var t=e.stateNode;t.pendingContext?Sf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Sf(e,t.context,!1),Dc(e,t.containerInfo)}function $f(e,t,n,r,o){return Qr(),Oc(o),t.flags|=256,et(e,t,n,r),t.child}var Au={dehydrated:null,treeContext:null,retryLane:0};function Ou(e){return{baseLanes:e,cachePool:null,transitions:null}}function hg(e,t,n){var r=t.pendingProps,o=Se.current,i=!1,l=(t.flags&128)!==0,a;if((a=l)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),he(Se,o&1),e===null)return Cu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=wa(l,r,0,null),e=ar(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ou(n),t.memoizedState=Au,e):Kc(t,l));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return Gk(e,t,l,r,a,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,a=o.sibling;var s={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Un(o,s),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?i=Un(a,i):(i=ar(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?Ou(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Au,r}return i=e.child,e=i.sibling,r=Un(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Kc(e,t){return t=wa({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ki(e,t,n,r){return r!==null&&Oc(r),qr(t,e.child,null,n),e=Kc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Gk(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=ks(Error(M(422))),Ki(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=wa({mode:"visible",children:r.children},o,0,null),i=ar(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&qr(t,e.child,null,l),t.child.memoizedState=Ou(l),t.memoizedState=Au,i);if(!(t.mode&1))return Ki(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(M(419)),r=ks(i,r,void 0),Ki(e,t,l,r)}if(a=(l&e.childLanes)!==0,ut||a){if(r=$e,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,wn(e,o),qt(r,e,o,-1))}return Zc(),r=ks(Error(M(421))),Ki(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=sw.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,bt=Dn(o.nextSibling),xt=t,xe=!0,Wt=null,e!==null&&(Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=ur,pn=e.id,mn=e.overflow,ur=t),t=Kc(t,r.children),t.flags|=4096,t)}function Bf(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Eu(e.return,t,n)}function ws(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function gg(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(et(e,t,r.children,n),r=Se.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Bf(e,n,t);else if(e.tag===19)Bf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(he(Se,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Ul(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),ws(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Ul(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}ws(t,!0,n,null,i);break;case"together":ws(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function hl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function bn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(M(153));if(t.child!==null){for(e=t.child,n=Un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Yk(e,t,n){switch(t.tag){case 3:mg(t),Qr();break;case 5:Hh(t);break;case 1:dt(t.type)&&Nl(t);break;case 4:Dc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;he(jl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(he(Se,Se.current&1),t.flags|=128,null):n&t.child.childLanes?hg(e,t,n):(he(Se,Se.current&1),e=bn(e,t,n),e!==null?e.sibling:null);he(Se,Se.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return gg(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),he(Se,Se.current),r)break;return null;case 22:case 23:return t.lanes=0,fg(e,t,n)}return bn(e,t,n)}var yg,Lu,kg,wg;yg=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lu=function(){};kg=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,ir(on.current);var i=null;switch(n){case"input":o=tu(e,o),r=tu(e,r),i=[];break;case"select":o=Ee({},o,{value:void 0}),r=Ee({},r,{value:void 0}),i=[];break;case"textarea":o=ou(e,o),r=ou(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=zl)}lu(n,r);var l;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var a=o[u];for(l in a)a.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(jo.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var s=r[u];if(a=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==a&&(s!=null||a!=null))if(u==="style")if(a){for(l in a)!a.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&a[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(i||(i=[]),i.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(jo.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&ge("scroll",e),i||a===s||(i=[])):(i=i||[]).push(u,s))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};wg=function(e,t,n,r){n!==r&&(t.flags|=4)};function go(e,t){if(!xe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Xk(e,t,n){var r=t.pendingProps;switch(Ac(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(t),null;case 1:return dt(t.type)&&Ml(),qe(t),null;case 3:return r=t.stateNode,Gr(),ye(ct),ye(Ze),$c(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Vi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Wt!==null&&(Bu(Wt),Wt=null))),Lu(e,t),qe(t),null;case 5:jc(t);var o=ir(Xo.current);if(n=t.type,e!==null&&t.stateNode!=null)kg(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(M(166));return qe(t),null}if(e=ir(on.current),Vi(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[nn]=t,r[Go]=i,e=(t.mode&1)!==0,n){case"dialog":ge("cancel",r),ge("close",r);break;case"iframe":case"object":case"embed":ge("load",r);break;case"video":case"audio":for(o=0;o<Co.length;o++)ge(Co[o],r);break;case"source":ge("error",r);break;case"img":case"image":case"link":ge("error",r),ge("load",r);break;case"details":ge("toggle",r);break;case"input":Gd(r,i),ge("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ge("invalid",r);break;case"textarea":Xd(r,i),ge("invalid",r)}lu(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var a=i[l];l==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Hi(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Hi(r.textContent,a,e),o=["children",""+a]):jo.hasOwnProperty(l)&&a!=null&&l==="onScroll"&&ge("scroll",r)}switch(n){case"input":Mi(r),Yd(r,i,!0);break;case"textarea":Mi(r),Zd(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=zl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Km(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[nn]=t,e[Go]=r,yg(e,t,!1,!1),t.stateNode=e;e:{switch(l=au(n,r),n){case"dialog":ge("cancel",e),ge("close",e),o=r;break;case"iframe":case"object":case"embed":ge("load",e),o=r;break;case"video":case"audio":for(o=0;o<Co.length;o++)ge(Co[o],e);o=r;break;case"source":ge("error",e),o=r;break;case"img":case"image":case"link":ge("error",e),ge("load",e),o=r;break;case"details":ge("toggle",e),o=r;break;case"input":Gd(e,r),o=tu(e,r),ge("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Ee({},r,{value:void 0}),ge("invalid",e);break;case"textarea":Xd(e,r),o=ou(e,r),ge("invalid",e);break;default:o=r}lu(n,o),a=o;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?Gm(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Qm(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&$o(e,s):typeof s=="number"&&$o(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(jo.hasOwnProperty(i)?s!=null&&i==="onScroll"&&ge("scroll",e):s!=null&&gc(e,i,s,l))}switch(n){case"input":Mi(e),Yd(e,r,!1);break;case"textarea":Mi(e),Zd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Nr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Nr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=zl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return qe(t),null;case 6:if(e&&t.stateNode!=null)wg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(M(166));if(n=ir(Xo.current),ir(on.current),Vi(t)){if(r=t.stateNode,n=t.memoizedProps,r[nn]=t,(i=r.nodeValue!==n)&&(e=xt,e!==null))switch(e.tag){case 3:Hi(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Hi(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nn]=t,t.stateNode=r}return qe(t),null;case 13:if(ye(Se),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(xe&&bt!==null&&t.mode&1&&!(t.flags&128))Nh(),Qr(),t.flags|=98560,i=!1;else if(i=Vi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(M(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(M(317));i[nn]=t}else Qr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;qe(t),i=!1}else Wt!==null&&(Bu(Wt),Wt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Se.current&1?Fe===0&&(Fe=3):Zc())),t.updateQueue!==null&&(t.flags|=4),qe(t),null);case 4:return Gr(),Lu(e,t),e===null&&Qo(t.stateNode.containerInfo),qe(t),null;case 10:return Mc(t.type._context),qe(t),null;case 17:return dt(t.type)&&Ml(),qe(t),null;case 19:if(ye(Se),i=t.memoizedState,i===null)return qe(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)go(i,!1);else{if(Fe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Ul(e),l!==null){for(t.flags|=128,go(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return he(Se,Se.current&1|2),t.child}e=e.sibling}i.tail!==null&&Re()>Xr&&(t.flags|=128,r=!0,go(i,!1),t.lanes=4194304)}else{if(!r)if(e=Ul(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),go(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!xe)return qe(t),null}else 2*Re()-i.renderingStartTime>Xr&&n!==1073741824&&(t.flags|=128,r=!0,go(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Re(),t.sibling=null,n=Se.current,he(Se,r?n&1|2:n&1),t):(qe(t),null);case 22:case 23:return Xc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?kt&1073741824&&(qe(t),t.subtreeFlags&6&&(t.flags|=8192)):qe(t),null;case 24:return null;case 25:return null}throw Error(M(156,t.tag))}function Zk(e,t){switch(Ac(t),t.tag){case 1:return dt(t.type)&&Ml(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gr(),ye(ct),ye(Ze),$c(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return jc(t),null;case 13:if(ye(Se),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(M(340));Qr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ye(Se),null;case 4:return Gr(),null;case 10:return Mc(t.type._context),null;case 22:case 23:return Xc(),null;case 24:return null;default:return null}}var Qi=!1,Ye=!1,Jk=typeof WeakSet=="function"?WeakSet:Set,U=null;function zr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){_e(e,t,r)}else n.current=null}function zu(e,t,n){try{n()}catch(r){_e(e,t,r)}}var Uf=!1;function ew(e,t){if(yu=Al,e=Sh(),Rc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,a=-1,s=-1,u=0,d=0,c=e,f=null;t:for(;;){for(var p;c!==n||o!==0&&c.nodeType!==3||(a=l+o),c!==i||r!==0&&c.nodeType!==3||(s=l+r),c.nodeType===3&&(l+=c.nodeValue.length),(p=c.firstChild)!==null;)f=c,c=p;for(;;){if(c===e)break t;if(f===n&&++u===o&&(a=l),f===i&&++d===r&&(s=l),(p=c.nextSibling)!==null)break;c=f,f=c.parentNode}c=p}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ku={focusedElem:e,selectionRange:n},Al=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var k=h.memoizedProps,C=h.memoizedState,g=t.stateNode,m=g.getSnapshotBeforeUpdate(t.elementType===t.type?k:Ht(t.type,k),C);g.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(M(163))}}catch(S){_e(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return h=Uf,Uf=!1,h}function Ao(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&zu(t,n,i)}o=o.next}while(o!==r)}}function ya(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Mu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function bg(e){var t=e.alternate;t!==null&&(e.alternate=null,bg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nn],delete t[Go],delete t[xu],delete t[Nk],delete t[Fk])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function xg(e){return e.tag===5||e.tag===3||e.tag===4}function Hf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||xg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=zl));else if(r!==4&&(e=e.child,e!==null))for(Nu(e,t,n),e=e.sibling;e!==null;)Nu(e,t,n),e=e.sibling}function Fu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Fu(e,t,n),e=e.sibling;e!==null;)Fu(e,t,n),e=e.sibling}var He=null,Vt=!1;function En(e,t,n){for(n=n.child;n!==null;)vg(e,t,n),n=n.sibling}function vg(e,t,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(ua,n)}catch{}switch(n.tag){case 5:Ye||zr(n,t);case 6:var r=He,o=Vt;He=null,En(e,t,n),He=r,Vt=o,He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):He.removeChild(n.stateNode));break;case 18:He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?fs(e.parentNode,n):e.nodeType===1&&fs(e,n),Vo(e)):fs(He,n.stateNode));break;case 4:r=He,o=Vt,He=n.stateNode.containerInfo,Vt=!0,En(e,t,n),He=r,Vt=o;break;case 0:case 11:case 14:case 15:if(!Ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&zu(n,t,l),o=o.next}while(o!==r)}En(e,t,n);break;case 1:if(!Ye&&(zr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){_e(n,t,a)}En(e,t,n);break;case 21:En(e,t,n);break;case 22:n.mode&1?(Ye=(r=Ye)||n.memoizedState!==null,En(e,t,n),Ye=r):En(e,t,n);break;default:En(e,t,n)}}function Vf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Jk),t.forEach(function(r){var o=uw.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ut(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,a=l;e:for(;a!==null;){switch(a.tag){case 5:He=a.stateNode,Vt=!1;break e;case 3:He=a.stateNode.containerInfo,Vt=!0;break e;case 4:He=a.stateNode.containerInfo,Vt=!0;break e}a=a.return}if(He===null)throw Error(M(160));vg(i,l,o),He=null,Vt=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){_e(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Sg(t,e),t=t.sibling}function Sg(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ut(t,e),Xt(e),r&4){try{Ao(3,e,e.return),ya(3,e)}catch(k){_e(e,e.return,k)}try{Ao(5,e,e.return)}catch(k){_e(e,e.return,k)}}break;case 1:Ut(t,e),Xt(e),r&512&&n!==null&&zr(n,n.return);break;case 5:if(Ut(t,e),Xt(e),r&512&&n!==null&&zr(n,n.return),e.flags&32){var o=e.stateNode;try{$o(o,"")}catch(k){_e(e,e.return,k)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&Vm(o,i),au(a,l);var u=au(a,i);for(l=0;l<s.length;l+=2){var d=s[l],c=s[l+1];d==="style"?Gm(o,c):d==="dangerouslySetInnerHTML"?Qm(o,c):d==="children"?$o(o,c):gc(o,d,c,u)}switch(a){case"input":nu(o,i);break;case"textarea":Wm(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var p=i.value;p!=null?Nr(o,!!i.multiple,p,!1):f!==!!i.multiple&&(i.defaultValue!=null?Nr(o,!!i.multiple,i.defaultValue,!0):Nr(o,!!i.multiple,i.multiple?[]:"",!1))}o[Go]=i}catch(k){_e(e,e.return,k)}}break;case 6:if(Ut(t,e),Xt(e),r&4){if(e.stateNode===null)throw Error(M(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(k){_e(e,e.return,k)}}break;case 3:if(Ut(t,e),Xt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vo(t.containerInfo)}catch(k){_e(e,e.return,k)}break;case 4:Ut(t,e),Xt(e);break;case 13:Ut(t,e),Xt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Gc=Re())),r&4&&Vf(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Ye=(u=Ye)||d,Ut(t,e),Ye=u):Ut(t,e),Xt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(U=e,d=e.child;d!==null;){for(c=U=d;U!==null;){switch(f=U,p=f.child,f.tag){case 0:case 11:case 14:case 15:Ao(4,f,f.return);break;case 1:zr(f,f.return);var h=f.stateNode;if(typeof h.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(k){_e(r,n,k)}}break;case 5:zr(f,f.return);break;case 22:if(f.memoizedState!==null){Kf(c);continue}}p!==null?(p.return=f,U=p):Kf(c)}d=d.sibling}e:for(d=null,c=e;;){if(c.tag===5){if(d===null){d=c;try{o=c.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=c.stateNode,s=c.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=qm("display",l))}catch(k){_e(e,e.return,k)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(k){_e(e,e.return,k)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===e)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break e;for(;c.sibling===null;){if(c.return===null||c.return===e)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:Ut(t,e),Xt(e),r&4&&Vf(e);break;case 21:break;default:Ut(t,e),Xt(e)}}function Xt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(xg(n)){var r=n;break e}n=n.return}throw Error(M(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&($o(o,""),r.flags&=-33);var i=Hf(e);Fu(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,a=Hf(e);Nu(e,a,l);break;default:throw Error(M(161))}}catch(s){_e(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function tw(e,t,n){U=e,Cg(e)}function Cg(e,t,n){for(var r=(e.mode&1)!==0;U!==null;){var o=U,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Qi;if(!l){var a=o.alternate,s=a!==null&&a.memoizedState!==null||Ye;a=Qi;var u=Ye;if(Qi=l,(Ye=s)&&!u)for(U=o;U!==null;)l=U,s=l.child,l.tag===22&&l.memoizedState!==null?Qf(o):s!==null?(s.return=l,U=s):Qf(o);for(;i!==null;)U=i,Cg(i),i=i.sibling;U=o,Qi=a,Ye=u}Wf(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,U=i):Wf(e)}}function Wf(e){for(;U!==null;){var t=U;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ye||ya(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ye)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Ht(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&_f(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}_f(t,l,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&Vo(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(M(163))}Ye||t.flags&512&&Mu(t)}catch(f){_e(t,t.return,f)}}if(t===e){U=null;break}if(n=t.sibling,n!==null){n.return=t.return,U=n;break}U=t.return}}function Kf(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var n=t.sibling;if(n!==null){n.return=t.return,U=n;break}U=t.return}}function Qf(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ya(4,t)}catch(s){_e(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){_e(t,o,s)}}var i=t.return;try{Mu(t)}catch(s){_e(t,i,s)}break;case 5:var l=t.return;try{Mu(t)}catch(s){_e(t,l,s)}}}catch(s){_e(t,t.return,s)}if(t===e){U=null;break}var a=t.sibling;if(a!==null){a.return=t.return,U=a;break}U=t.return}}var nw=Math.ceil,Wl=vn.ReactCurrentDispatcher,Qc=vn.ReactCurrentOwner,Mt=vn.ReactCurrentBatchConfig,oe=0,$e=null,ze=null,We=0,kt=0,Mr=qn(0),Fe=0,ti=null,dr=0,ka=0,qc=0,Oo=null,st=null,Gc=0,Xr=1/0,cn=null,Kl=!1,Du=null,$n=null,qi=!1,Ln=null,Ql=0,Lo=0,ju=null,gl=-1,yl=0;function nt(){return oe&6?Re():gl!==-1?gl:gl=Re()}function Bn(e){return e.mode&1?oe&2&&We!==0?We&-We:jk.transition!==null?(yl===0&&(yl=ah()),yl):(e=se,e!==0||(e=window.event,e=e===void 0?16:mh(e.type)),e):1}function qt(e,t,n,r){if(50<Lo)throw Lo=0,ju=null,Error(M(185));wi(e,n,r),(!(oe&2)||e!==$e)&&(e===$e&&(!(oe&2)&&(ka|=n),Fe===4&&In(e,We)),ft(e,r),n===1&&oe===0&&!(t.mode&1)&&(Xr=Re()+500,ma&&Gn()))}function ft(e,t){var n=e.callbackNode;j1(e,t);var r=Il(e,e===$e?We:0);if(r===0)n!==null&&tf(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&tf(n),t===1)e.tag===0?Dk(qf.bind(null,e)):Lh(qf.bind(null,e)),zk(function(){!(oe&6)&&Gn()}),n=null;else{switch(sh(r)){case 1:n=xc;break;case 4:n=ih;break;case 16:n=Rl;break;case 536870912:n=lh;break;default:n=Rl}n=Og(n,Eg.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Eg(e,t){if(gl=-1,yl=0,oe&6)throw Error(M(327));var n=e.callbackNode;if(Br()&&e.callbackNode!==n)return null;var r=Il(e,e===$e?We:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ql(e,r);else{t=r;var o=oe;oe|=2;var i=Pg();($e!==e||We!==t)&&(cn=null,Xr=Re()+500,lr(e,t));do try{iw();break}catch(a){Tg(e,a)}while(!0);zc(),Wl.current=i,oe=o,ze!==null?t=0:($e=null,We=0,t=Fe)}if(t!==0){if(t===2&&(o=fu(e),o!==0&&(r=o,t=$u(e,o))),t===1)throw n=ti,lr(e,0),In(e,r),ft(e,Re()),n;if(t===6)In(e,r);else{if(o=e.current.alternate,!(r&30)&&!rw(o)&&(t=ql(e,r),t===2&&(i=fu(e),i!==0&&(r=i,t=$u(e,i))),t===1))throw n=ti,lr(e,0),In(e,r),ft(e,Re()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(M(345));case 2:er(e,st,cn);break;case 3:if(In(e,r),(r&130023424)===r&&(t=Gc+500-Re(),10<t)){if(Il(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){nt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=bu(er.bind(null,e,st,cn),t);break}er(e,st,cn);break;case 4:if(In(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Qt(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=Re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*nw(r/1960))-r,10<r){e.timeoutHandle=bu(er.bind(null,e,st,cn),r);break}er(e,st,cn);break;case 5:er(e,st,cn);break;default:throw Error(M(329))}}}return ft(e,Re()),e.callbackNode===n?Eg.bind(null,e):null}function $u(e,t){var n=Oo;return e.current.memoizedState.isDehydrated&&(lr(e,t).flags|=256),e=ql(e,t),e!==2&&(t=st,st=n,t!==null&&Bu(t)),e}function Bu(e){st===null?st=e:st.push.apply(st,e)}function rw(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Yt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function In(e,t){for(t&=~qc,t&=~ka,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qt(t),r=1<<n;e[n]=-1,t&=~r}}function qf(e){if(oe&6)throw Error(M(327));Br();var t=Il(e,0);if(!(t&1))return ft(e,Re()),null;var n=ql(e,t);if(e.tag!==0&&n===2){var r=fu(e);r!==0&&(t=r,n=$u(e,r))}if(n===1)throw n=ti,lr(e,0),In(e,t),ft(e,Re()),n;if(n===6)throw Error(M(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,er(e,st,cn),ft(e,Re()),null}function Yc(e,t){var n=oe;oe|=1;try{return e(t)}finally{oe=n,oe===0&&(Xr=Re()+500,ma&&Gn())}}function fr(e){Ln!==null&&Ln.tag===0&&!(oe&6)&&Br();var t=oe;oe|=1;var n=Mt.transition,r=se;try{if(Mt.transition=null,se=1,e)return e()}finally{se=r,Mt.transition=n,oe=t,!(oe&6)&&Gn()}}function Xc(){kt=Mr.current,ye(Mr)}function lr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lk(n)),ze!==null)for(n=ze.return;n!==null;){var r=n;switch(Ac(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ml();break;case 3:Gr(),ye(ct),ye(Ze),$c();break;case 5:jc(r);break;case 4:Gr();break;case 13:ye(Se);break;case 19:ye(Se);break;case 10:Mc(r.type._context);break;case 22:case 23:Xc()}n=n.return}if($e=e,ze=e=Un(e.current,null),We=kt=t,Fe=0,ti=null,qc=ka=dr=0,st=Oo=null,or!==null){for(t=0;t<or.length;t++)if(n=or[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}or=null}return e}function Tg(e,t){do{var n=ze;try{if(zc(),pl.current=Vl,Hl){for(var r=Ce.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Hl=!1}if(cr=0,je=Ne=Ce=null,Io=!1,Zo=0,Qc.current=null,n===null||n.return===null){Fe=1,ti=t,ze=null;break}e:{var i=e,l=n.return,a=n,s=t;if(t=We,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Mf(l);if(p!==null){p.flags&=-257,Nf(p,l,a,i,t),p.mode&1&&zf(i,u,t),t=p,s=u;var h=t.updateQueue;if(h===null){var k=new Set;k.add(s),t.updateQueue=k}else h.add(s);break e}else{if(!(t&1)){zf(i,u,t),Zc();break e}s=Error(M(426))}}else if(xe&&a.mode&1){var C=Mf(l);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Nf(C,l,a,i,t),Oc(Yr(s,a));break e}}i=s=Yr(s,a),Fe!==4&&(Fe=2),Oo===null?Oo=[i]:Oo.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=ug(i,s,t);Pf(i,g);break e;case 1:a=s;var m=i.type,y=i.stateNode;if(!(i.flags&128)&&(typeof m.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&($n===null||!$n.has(y)))){i.flags|=65536,t&=-t,i.lanes|=t;var S=cg(i,a,t);Pf(i,S);break e}}i=i.return}while(i!==null)}Rg(n)}catch(T){t=T,ze===n&&n!==null&&(ze=n=n.return);continue}break}while(!0)}function Pg(){var e=Wl.current;return Wl.current=Vl,e===null?Vl:e}function Zc(){(Fe===0||Fe===3||Fe===2)&&(Fe=4),$e===null||!(dr&268435455)&&!(ka&268435455)||In($e,We)}function ql(e,t){var n=oe;oe|=2;var r=Pg();($e!==e||We!==t)&&(cn=null,lr(e,t));do try{ow();break}catch(o){Tg(e,o)}while(!0);if(zc(),oe=n,Wl.current=r,ze!==null)throw Error(M(261));return $e=null,We=0,Fe}function ow(){for(;ze!==null;)_g(ze)}function iw(){for(;ze!==null&&!I1();)_g(ze)}function _g(e){var t=Ag(e.alternate,e,kt);e.memoizedProps=e.pendingProps,t===null?Rg(e):ze=t,Qc.current=null}function Rg(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Zk(n,t),n!==null){n.flags&=32767,ze=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Fe=6,ze=null;return}}else if(n=Xk(n,t,kt),n!==null){ze=n;return}if(t=t.sibling,t!==null){ze=t;return}ze=t=e}while(t!==null);Fe===0&&(Fe=5)}function er(e,t,n){var r=se,o=Mt.transition;try{Mt.transition=null,se=1,lw(e,t,n,r)}finally{Mt.transition=o,se=r}return null}function lw(e,t,n,r){do Br();while(Ln!==null);if(oe&6)throw Error(M(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(M(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if($1(e,i),e===$e&&(ze=$e=null,We=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||qi||(qi=!0,Og(Rl,function(){return Br(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Mt.transition,Mt.transition=null;var l=se;se=1;var a=oe;oe|=4,Qc.current=null,ew(e,n),Sg(n,e),Tk(ku),Al=!!yu,ku=yu=null,e.current=n,tw(n),A1(),oe=a,se=l,Mt.transition=i}else e.current=n;if(qi&&(qi=!1,Ln=e,Ql=o),i=e.pendingLanes,i===0&&($n=null),z1(n.stateNode),ft(e,Re()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Kl)throw Kl=!1,e=Du,Du=null,e;return Ql&1&&e.tag!==0&&Br(),i=e.pendingLanes,i&1?e===ju?Lo++:(Lo=0,ju=e):Lo=0,Gn(),null}function Br(){if(Ln!==null){var e=sh(Ql),t=Mt.transition,n=se;try{if(Mt.transition=null,se=16>e?16:e,Ln===null)var r=!1;else{if(e=Ln,Ln=null,Ql=0,oe&6)throw Error(M(331));var o=oe;for(oe|=4,U=e.current;U!==null;){var i=U,l=i.child;if(U.flags&16){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var u=a[s];for(U=u;U!==null;){var d=U;switch(d.tag){case 0:case 11:case 15:Ao(8,d,i)}var c=d.child;if(c!==null)c.return=d,U=c;else for(;U!==null;){d=U;var f=d.sibling,p=d.return;if(bg(d),d===u){U=null;break}if(f!==null){f.return=p,U=f;break}U=p}}}var h=i.alternate;if(h!==null){var k=h.child;if(k!==null){h.child=null;do{var C=k.sibling;k.sibling=null,k=C}while(k!==null)}}U=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,U=l;else e:for(;U!==null;){if(i=U,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Ao(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,U=g;break e}U=i.return}}var m=e.current;for(U=m;U!==null;){l=U;var y=l.child;if(l.subtreeFlags&2064&&y!==null)y.return=l,U=y;else e:for(l=m;U!==null;){if(a=U,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ya(9,a)}}catch(T){_e(a,a.return,T)}if(a===l){U=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,U=S;break e}U=a.return}}if(oe=o,Gn(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(ua,e)}catch{}r=!0}return r}finally{se=n,Mt.transition=t}}return!1}function Gf(e,t,n){t=Yr(n,t),t=ug(e,t,1),e=jn(e,t,1),t=nt(),e!==null&&(wi(e,1,t),ft(e,t))}function _e(e,t,n){if(e.tag===3)Gf(e,e,n);else for(;t!==null;){if(t.tag===3){Gf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&($n===null||!$n.has(r))){e=Yr(n,e),e=cg(t,e,1),t=jn(t,e,1),e=nt(),t!==null&&(wi(t,1,e),ft(t,e));break}}t=t.return}}function aw(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=nt(),e.pingedLanes|=e.suspendedLanes&n,$e===e&&(We&n)===n&&(Fe===4||Fe===3&&(We&130023424)===We&&500>Re()-Gc?lr(e,0):qc|=n),ft(e,t)}function Ig(e,t){t===0&&(e.mode&1?(t=Di,Di<<=1,!(Di&130023424)&&(Di=4194304)):t=1);var n=nt();e=wn(e,t),e!==null&&(wi(e,t,n),ft(e,n))}function sw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ig(e,n)}function uw(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(M(314))}r!==null&&r.delete(t),Ig(e,n)}var Ag;Ag=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ct.current)ut=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ut=!1,Yk(e,t,n);ut=!!(e.flags&131072)}else ut=!1,xe&&t.flags&1048576&&zh(t,Dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;hl(e,t),e=t.pendingProps;var o=Kr(t,Ze.current);$r(t,n),o=Uc(null,t,r,e,o,n);var i=Hc();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,dt(r)?(i=!0,Nl(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Fc(t),o.updater=ha,t.stateNode=o,o._reactInternals=t,Pu(t,r,e,n),t=Iu(null,t,r,!0,i,n)):(t.tag=0,xe&&i&&Ic(t),et(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(hl(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=dw(r),e=Ht(r,e),o){case 0:t=Ru(null,t,r,e,n);break e;case 1:t=jf(null,t,r,e,n);break e;case 11:t=Ff(null,t,r,e,n);break e;case 14:t=Df(null,t,r,Ht(r.type,e),n);break e}throw Error(M(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Ru(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),jf(e,t,r,o,n);case 3:e:{if(mg(t),e===null)throw Error(M(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Dh(e,t),Bl(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Yr(Error(M(423)),t),t=$f(e,t,r,n,o);break e}else if(r!==o){o=Yr(Error(M(424)),t),t=$f(e,t,r,n,o);break e}else for(bt=Dn(t.stateNode.containerInfo.firstChild),xt=t,xe=!0,Wt=null,n=Uh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Qr(),r===o){t=bn(e,t,n);break e}et(e,t,r,n)}t=t.child}return t;case 5:return Hh(t),e===null&&Cu(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,wu(r,o)?l=null:i!==null&&wu(r,i)&&(t.flags|=32),pg(e,t),et(e,t,l,n),t.child;case 6:return e===null&&Cu(t),null;case 13:return hg(e,t,n);case 4:return Dc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=qr(t,null,r,n):et(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Ff(e,t,r,o,n);case 7:return et(e,t,t.pendingProps,n),t.child;case 8:return et(e,t,t.pendingProps.children,n),t.child;case 12:return et(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,he(jl,r._currentValue),r._currentValue=l,i!==null)if(Yt(i.value,l)){if(i.children===o.children&&!ct.current){t=bn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){l=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=gn(-1,n&-n),s.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?s.next=s:(s.next=d.next,d.next=s),u.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Eu(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(M(341));l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),Eu(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}et(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,$r(t,n),o=Nt(o),r=r(o),t.flags|=1,et(e,t,r,n),t.child;case 14:return r=t.type,o=Ht(r,t.pendingProps),o=Ht(r.type,o),Df(e,t,r,o,n);case 15:return dg(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),hl(e,t),t.tag=1,dt(r)?(e=!0,Nl(t)):e=!1,$r(t,n),$h(t,r,o),Pu(t,r,o,n),Iu(null,t,r,!0,e,n);case 19:return gg(e,t,n);case 22:return fg(e,t,n)}throw Error(M(156,t.tag))};function Og(e,t){return oh(e,t)}function cw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(e,t,n,r){return new cw(e,t,n,r)}function Jc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dw(e){if(typeof e=="function")return Jc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===kc)return 11;if(e===wc)return 14}return 2}function Un(e,t){var n=e.alternate;return n===null?(n=zt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function kl(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")Jc(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Er:return ar(n.children,o,i,t);case yc:l=8,o|=8;break;case Xs:return e=zt(12,n,t,o|2),e.elementType=Xs,e.lanes=i,e;case Zs:return e=zt(13,n,t,o),e.elementType=Zs,e.lanes=i,e;case Js:return e=zt(19,n,t,o),e.elementType=Js,e.lanes=i,e;case Bm:return wa(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case jm:l=10;break e;case $m:l=9;break e;case kc:l=11;break e;case wc:l=14;break e;case Pn:l=16,r=null;break e}throw Error(M(130,e==null?e:typeof e,""))}return t=zt(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function ar(e,t,n,r){return e=zt(7,e,r,t),e.lanes=n,e}function wa(e,t,n,r){return e=zt(22,e,r,t),e.elementType=Bm,e.lanes=n,e.stateNode={isHidden:!1},e}function bs(e,t,n){return e=zt(6,e,null,t),e.lanes=n,e}function xs(e,t,n){return t=zt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function fw(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ts(0),this.expirationTimes=ts(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ts(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function ed(e,t,n,r,o,i,l,a,s){return e=new fw(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=zt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fc(i),e}function pw(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Cr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Lg(e){if(!e)return Wn;e=e._reactInternals;e:{if(hr(e)!==e||e.tag!==1)throw Error(M(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(M(171))}if(e.tag===1){var n=e.type;if(dt(n))return Oh(e,n,t)}return t}function zg(e,t,n,r,o,i,l,a,s){return e=ed(n,r,!0,e,o,i,l,a,s),e.context=Lg(null),n=e.current,r=nt(),o=Bn(n),i=gn(r,o),i.callback=t??null,jn(n,i,o),e.current.lanes=o,wi(e,o,r),ft(e,r),e}function ba(e,t,n,r){var o=t.current,i=nt(),l=Bn(o);return n=Lg(n),t.context===null?t.context=n:t.pendingContext=n,t=gn(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=jn(o,t,l),e!==null&&(qt(e,o,l,i),fl(e,o,l)),l}function Gl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Yf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function td(e,t){Yf(e,t),(e=e.alternate)&&Yf(e,t)}function mw(){return null}var Mg=typeof reportError=="function"?reportError:function(e){console.error(e)};function nd(e){this._internalRoot=e}xa.prototype.render=nd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(M(409));ba(e,t,null,null)};xa.prototype.unmount=nd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fr(function(){ba(null,e,null,null)}),t[kn]=null}};function xa(e){this._internalRoot=e}xa.prototype.unstable_scheduleHydration=function(e){if(e){var t=dh();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rn.length&&t!==0&&t<Rn[n].priority;n++);Rn.splice(n,0,e),n===0&&ph(e)}};function rd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xf(){}function hw(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var u=Gl(l);i.call(u)}}var l=zg(t,r,e,0,null,!1,!1,"",Xf);return e._reactRootContainer=l,e[kn]=l.current,Qo(e.nodeType===8?e.parentNode:e),fr(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var u=Gl(s);a.call(u)}}var s=ed(e,0,!1,null,null,!1,!1,"",Xf);return e._reactRootContainer=s,e[kn]=s.current,Qo(e.nodeType===8?e.parentNode:e),fr(function(){ba(t,s,n,r)}),s}function Sa(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var a=o;o=function(){var s=Gl(l);a.call(s)}}ba(t,l,e,o)}else l=hw(n,t,e,o,r);return Gl(l)}uh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=So(t.pendingLanes);n!==0&&(vc(t,n|1),ft(t,Re()),!(oe&6)&&(Xr=Re()+500,Gn()))}break;case 13:fr(function(){var r=wn(e,1);if(r!==null){var o=nt();qt(r,e,1,o)}}),td(e,1)}};Sc=function(e){if(e.tag===13){var t=wn(e,134217728);if(t!==null){var n=nt();qt(t,e,134217728,n)}td(e,134217728)}};ch=function(e){if(e.tag===13){var t=Bn(e),n=wn(e,t);if(n!==null){var r=nt();qt(n,e,t,r)}td(e,t)}};dh=function(){return se};fh=function(e,t){var n=se;try{return se=e,t()}finally{se=n}};uu=function(e,t,n){switch(t){case"input":if(nu(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=pa(r);if(!o)throw Error(M(90));Hm(r),nu(r,o)}}}break;case"textarea":Wm(e,n);break;case"select":t=n.value,t!=null&&Nr(e,!!n.multiple,t,!1)}};Zm=Yc;Jm=fr;var gw={usingClientEntryPoint:!1,Events:[xi,Rr,pa,Ym,Xm,Yc]},yo={findFiberByHostInstance:rr,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},yw={bundleType:yo.bundleType,version:yo.version,rendererPackageName:yo.rendererPackageName,rendererConfig:yo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:vn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=nh(e),e===null?null:e.stateNode},findFiberByHostInstance:yo.findFiberByHostInstance||mw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gi.isDisabled&&Gi.supportsFiber)try{ua=Gi.inject(yw),rn=Gi}catch{}}Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gw;Et.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!rd(t))throw Error(M(200));return pw(e,t,null,n)};Et.createRoot=function(e,t){if(!rd(e))throw Error(M(299));var n=!1,r="",o=Mg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ed(e,1,!1,null,null,n,!1,r,o),e[kn]=t.current,Qo(e.nodeType===8?e.parentNode:e),new nd(t)};Et.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(M(188)):(e=Object.keys(e).join(","),Error(M(268,e)));return e=nh(t),e=e===null?null:e.stateNode,e};Et.flushSync=function(e){return fr(e)};Et.hydrate=function(e,t,n){if(!va(t))throw Error(M(200));return Sa(null,e,t,!0,n)};Et.hydrateRoot=function(e,t,n){if(!rd(e))throw Error(M(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=Mg;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=zg(t,null,e,1,n??null,o,!1,i,l),e[kn]=t.current,Qo(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new xa(t)};Et.render=function(e,t,n){if(!va(t))throw Error(M(200));return Sa(null,e,t,!1,n)};Et.unmountComponentAtNode=function(e){if(!va(e))throw Error(M(40));return e._reactRootContainer?(fr(function(){Sa(null,null,e,!1,function(){e._reactRootContainer=null,e[kn]=null})}),!0):!1};Et.unstable_batchedUpdates=Yc;Et.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!va(n))throw Error(M(200));if(e==null||e._reactInternals===void 0)throw Error(M(38));return Sa(e,t,n,!1,r)};Et.version="18.2.0-next-9e3b772b8-20220608";function Ng(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ng)}catch(e){console.error(e)}}Ng(),zm.exports=Et;var Fg=zm.exports,Zf=Fg;Gs.createRoot=Zf.createRoot,Gs.hydrateRoot=Zf.hydrateRoot;function kw(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}function Q(){return Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Q.apply(this,arguments)}function Dg(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var ww=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,bw=Dg(function(e){return ww.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function xw(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function vw(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Sw=function(){function e(n){var r=this;this._insertTag=function(o){var i;r.tags.length===0?r.insertionPoint?i=r.insertionPoint.nextSibling:r.prepend?i=r.container.firstChild:i=r.before:i=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(o,i),r.tags.push(o)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(r){r.forEach(this._insertTag)},t.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(vw(this));var o=this.tags[this.tags.length-1];if(this.isSpeedy){var i=xw(o);try{i.insertRule(r,i.cssRules.length)}catch{}}else o.appendChild(document.createTextNode(r));this.ctr++},t.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},e}(),Ge="-ms-",Yl="-moz-",le="-webkit-",jg="comm",od="rule",id="decl",Cw="@import",$g="@keyframes",Ew="@layer",Tw=Math.abs,Ca=String.fromCharCode,Pw=Object.assign;function _w(e,t){return Ve(e,0)^45?(((t<<2^Ve(e,0))<<2^Ve(e,1))<<2^Ve(e,2))<<2^Ve(e,3):0}function Bg(e){return e.trim()}function Rw(e,t){return(e=t.exec(e))?e[0]:e}function ae(e,t,n){return e.replace(t,n)}function Uu(e,t){return e.indexOf(t)}function Ve(e,t){return e.charCodeAt(t)|0}function ni(e,t,n){return e.slice(t,n)}function en(e){return e.length}function ld(e){return e.length}function Yi(e,t){return t.push(e),e}function Iw(e,t){return e.map(t).join("")}var Ea=1,Zr=1,Ug=0,pt=0,Le=0,oo="";function Ta(e,t,n,r,o,i,l){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:Ea,column:Zr,length:l,return:""}}function ko(e,t){return Pw(Ta("",null,null,"",null,null,0),e,{length:-e.length},t)}function Aw(){return Le}function Ow(){return Le=pt>0?Ve(oo,--pt):0,Zr--,Le===10&&(Zr=1,Ea--),Le}function vt(){return Le=pt<Ug?Ve(oo,pt++):0,Zr++,Le===10&&(Zr=1,Ea++),Le}function ln(){return Ve(oo,pt)}function wl(){return pt}function Si(e,t){return ni(oo,e,t)}function ri(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Hg(e){return Ea=Zr=1,Ug=en(oo=e),pt=0,[]}function Vg(e){return oo="",e}function bl(e){return Bg(Si(pt-1,Hu(e===91?e+2:e===40?e+1:e)))}function Lw(e){for(;(Le=ln())&&Le<33;)vt();return ri(e)>2||ri(Le)>3?"":" "}function zw(e,t){for(;--t&&vt()&&!(Le<48||Le>102||Le>57&&Le<65||Le>70&&Le<97););return Si(e,wl()+(t<6&&ln()==32&&vt()==32))}function Hu(e){for(;vt();)switch(Le){case e:return pt;case 34:case 39:e!==34&&e!==39&&Hu(Le);break;case 40:e===41&&Hu(e);break;case 92:vt();break}return pt}function Mw(e,t){for(;vt()&&e+Le!==57;)if(e+Le===84&&ln()===47)break;return"/*"+Si(t,pt-1)+"*"+Ca(e===47?e:vt())}function Nw(e){for(;!ri(ln());)vt();return Si(e,pt)}function Fw(e){return Vg(xl("",null,null,null,[""],e=Hg(e),0,[0],e))}function xl(e,t,n,r,o,i,l,a,s){for(var u=0,d=0,c=l,f=0,p=0,h=0,k=1,C=1,g=1,m=0,y="",S=o,T=i,v=r,E=y;C;)switch(h=m,m=vt()){case 40:if(h!=108&&Ve(E,c-1)==58){Uu(E+=ae(bl(m),"&","&\f"),"&\f")!=-1&&(g=-1);break}case 34:case 39:case 91:E+=bl(m);break;case 9:case 10:case 13:case 32:E+=Lw(h);break;case 92:E+=zw(wl()-1,7);continue;case 47:switch(ln()){case 42:case 47:Yi(Dw(Mw(vt(),wl()),t,n),s);break;default:E+="/"}break;case 123*k:a[u++]=en(E)*g;case 125*k:case 59:case 0:switch(m){case 0:case 125:C=0;case 59+d:g==-1&&(E=ae(E,/\f/g,"")),p>0&&en(E)-c&&Yi(p>32?ep(E+";",r,n,c-1):ep(ae(E," ","")+";",r,n,c-2),s);break;case 59:E+=";";default:if(Yi(v=Jf(E,t,n,u,d,o,a,y,S=[],T=[],c),i),m===123)if(d===0)xl(E,t,v,v,S,i,c,a,T);else switch(f===99&&Ve(E,3)===110?100:f){case 100:case 108:case 109:case 115:xl(e,v,v,r&&Yi(Jf(e,v,v,0,0,o,a,y,o,S=[],c),T),o,T,c,a,r?S:T);break;default:xl(E,v,v,v,[""],T,0,a,T)}}u=d=p=0,k=g=1,y=E="",c=l;break;case 58:c=1+en(E),p=h;default:if(k<1){if(m==123)--k;else if(m==125&&k++==0&&Ow()==125)continue}switch(E+=Ca(m),m*k){case 38:g=d>0?1:(E+="\f",-1);break;case 44:a[u++]=(en(E)-1)*g,g=1;break;case 64:ln()===45&&(E+=bl(vt())),f=ln(),d=c=en(y=E+=Nw(wl())),m++;break;case 45:h===45&&en(E)==2&&(k=0)}}return i}function Jf(e,t,n,r,o,i,l,a,s,u,d){for(var c=o-1,f=o===0?i:[""],p=ld(f),h=0,k=0,C=0;h<r;++h)for(var g=0,m=ni(e,c+1,c=Tw(k=l[h])),y=e;g<p;++g)(y=Bg(k>0?f[g]+" "+m:ae(m,/&\f/g,f[g])))&&(s[C++]=y);return Ta(e,t,n,o===0?od:a,s,u,d)}function Dw(e,t,n){return Ta(e,t,n,jg,Ca(Aw()),ni(e,2,-2),0)}function ep(e,t,n,r){return Ta(e,t,n,id,ni(e,0,r),ni(e,r+1,-1),r)}function Ur(e,t){for(var n="",r=ld(e),o=0;o<r;o++)n+=t(e[o],o,e,t)||"";return n}function jw(e,t,n,r){switch(e.type){case Ew:if(e.children.length)break;case Cw:case id:return e.return=e.return||e.value;case jg:return"";case $g:return e.return=e.value+"{"+Ur(e.children,r)+"}";case od:e.value=e.props.join(",")}return en(n=Ur(e.children,r))?e.return=e.value+"{"+n+"}":""}function $w(e){var t=ld(e);return function(n,r,o,i){for(var l="",a=0;a<t;a++)l+=e[a](n,r,o,i)||"";return l}}function Bw(e){return function(t){t.root||(t=t.return)&&e(t)}}var Uw=function(t,n,r){for(var o=0,i=0;o=i,i=ln(),o===38&&i===12&&(n[r]=1),!ri(i);)vt();return Si(t,pt)},Hw=function(t,n){var r=-1,o=44;do switch(ri(o)){case 0:o===38&&ln()===12&&(n[r]=1),t[r]+=Uw(pt-1,n,r);break;case 2:t[r]+=bl(o);break;case 4:if(o===44){t[++r]=ln()===58?"&\f":"",n[r]=t[r].length;break}default:t[r]+=Ca(o)}while(o=vt());return t},Vw=function(t,n){return Vg(Hw(Hg(t),n))},tp=new WeakMap,Ww=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var n=t.value,r=t.parent,o=t.column===r.column&&t.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(t.props.length===1&&n.charCodeAt(0)!==58&&!tp.get(r))&&!o){tp.set(t,!0);for(var i=[],l=Vw(n,i),a=r.props,s=0,u=0;s<l.length;s++)for(var d=0;d<a.length;d++,u++)t.props[u]=i[s]?l[s].replace(/&\f/g,a[d]):a[d]+" "+l[s]}}},Kw=function(t){if(t.type==="decl"){var n=t.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(t.return="",t.value="")}};function Wg(e,t){switch(_w(e,t)){case 5103:return le+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return le+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return le+e+Yl+e+Ge+e+e;case 6828:case 4268:return le+e+Ge+e+e;case 6165:return le+e+Ge+"flex-"+e+e;case 5187:return le+e+ae(e,/(\w+).+(:[^]+)/,le+"box-$1$2"+Ge+"flex-$1$2")+e;case 5443:return le+e+Ge+"flex-item-"+ae(e,/flex-|-self/,"")+e;case 4675:return le+e+Ge+"flex-line-pack"+ae(e,/align-content|flex-|-self/,"")+e;case 5548:return le+e+Ge+ae(e,"shrink","negative")+e;case 5292:return le+e+Ge+ae(e,"basis","preferred-size")+e;case 6060:return le+"box-"+ae(e,"-grow","")+le+e+Ge+ae(e,"grow","positive")+e;case 4554:return le+ae(e,/([^-])(transform)/g,"$1"+le+"$2")+e;case 6187:return ae(ae(ae(e,/(zoom-|grab)/,le+"$1"),/(image-set)/,le+"$1"),e,"")+e;case 5495:case 3959:return ae(e,/(image-set\([^]*)/,le+"$1$`$1");case 4968:return ae(ae(e,/(.+:)(flex-)?(.*)/,le+"box-pack:$3"+Ge+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+le+e+e;case 4095:case 3583:case 4068:case 2532:return ae(e,/(.+)-inline(.+)/,le+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(en(e)-1-t>6)switch(Ve(e,t+1)){case 109:if(Ve(e,t+4)!==45)break;case 102:return ae(e,/(.+:)(.+)-([^]+)/,"$1"+le+"$2-$3$1"+Yl+(Ve(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Uu(e,"stretch")?Wg(ae(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(Ve(e,t+1)!==115)break;case 6444:switch(Ve(e,en(e)-3-(~Uu(e,"!important")&&10))){case 107:return ae(e,":",":"+le)+e;case 101:return ae(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+le+(Ve(e,14)===45?"inline-":"")+"box$3$1"+le+"$2$3$1"+Ge+"$2box$3")+e}break;case 5936:switch(Ve(e,t+11)){case 114:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return le+e+Ge+ae(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return le+e+Ge+e+e}return e}var Qw=function(t,n,r,o){if(t.length>-1&&!t.return)switch(t.type){case id:t.return=Wg(t.value,t.length);break;case $g:return Ur([ko(t,{value:ae(t.value,"@","@"+le)})],o);case od:if(t.length)return Iw(t.props,function(i){switch(Rw(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ur([ko(t,{props:[ae(i,/:(read-\w+)/,":"+Yl+"$1")]})],o);case"::placeholder":return Ur([ko(t,{props:[ae(i,/:(plac\w+)/,":"+le+"input-$1")]}),ko(t,{props:[ae(i,/:(plac\w+)/,":"+Yl+"$1")]}),ko(t,{props:[ae(i,/:(plac\w+)/,Ge+"input-$1")]})],o)}return""})}},qw=[Qw],Gw=function(t){var n=t.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(k){var C=k.getAttribute("data-emotion");C.indexOf(" ")!==-1&&(document.head.appendChild(k),k.setAttribute("data-s",""))})}var o=t.stylisPlugins||qw,i={},l,a=[];l=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(k){for(var C=k.getAttribute("data-emotion").split(" "),g=1;g<C.length;g++)i[C[g]]=!0;a.push(k)});var s,u=[Ww,Kw];{var d,c=[jw,Bw(function(k){d.insert(k)})],f=$w(u.concat(o,c)),p=function(C){return Ur(Fw(C),f)};s=function(C,g,m,y){d=m,p(C?C+"{"+g.styles+"}":g.styles),y&&(h.inserted[g.name]=!0)}}var h={key:n,sheet:new Sw({key:n,container:l,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:i,registered:{},insert:s};return h.sheet.hydrate(a),h},Kg={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Be=typeof Symbol=="function"&&Symbol.for,ad=Be?Symbol.for("react.element"):60103,sd=Be?Symbol.for("react.portal"):60106,Pa=Be?Symbol.for("react.fragment"):60107,_a=Be?Symbol.for("react.strict_mode"):60108,Ra=Be?Symbol.for("react.profiler"):60114,Ia=Be?Symbol.for("react.provider"):60109,Aa=Be?Symbol.for("react.context"):60110,ud=Be?Symbol.for("react.async_mode"):60111,Oa=Be?Symbol.for("react.concurrent_mode"):60111,La=Be?Symbol.for("react.forward_ref"):60112,za=Be?Symbol.for("react.suspense"):60113,Yw=Be?Symbol.for("react.suspense_list"):60120,Ma=Be?Symbol.for("react.memo"):60115,Na=Be?Symbol.for("react.lazy"):60116,Xw=Be?Symbol.for("react.block"):60121,Zw=Be?Symbol.for("react.fundamental"):60117,Jw=Be?Symbol.for("react.responder"):60118,eb=Be?Symbol.for("react.scope"):60119;function Pt(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case ad:switch(e=e.type,e){case ud:case Oa:case Pa:case Ra:case _a:case za:return e;default:switch(e=e&&e.$$typeof,e){case Aa:case La:case Na:case Ma:case Ia:return e;default:return t}}case sd:return t}}}function Qg(e){return Pt(e)===Oa}ue.AsyncMode=ud;ue.ConcurrentMode=Oa;ue.ContextConsumer=Aa;ue.ContextProvider=Ia;ue.Element=ad;ue.ForwardRef=La;ue.Fragment=Pa;ue.Lazy=Na;ue.Memo=Ma;ue.Portal=sd;ue.Profiler=Ra;ue.StrictMode=_a;ue.Suspense=za;ue.isAsyncMode=function(e){return Qg(e)||Pt(e)===ud};ue.isConcurrentMode=Qg;ue.isContextConsumer=function(e){return Pt(e)===Aa};ue.isContextProvider=function(e){return Pt(e)===Ia};ue.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ad};ue.isForwardRef=function(e){return Pt(e)===La};ue.isFragment=function(e){return Pt(e)===Pa};ue.isLazy=function(e){return Pt(e)===Na};ue.isMemo=function(e){return Pt(e)===Ma};ue.isPortal=function(e){return Pt(e)===sd};ue.isProfiler=function(e){return Pt(e)===Ra};ue.isStrictMode=function(e){return Pt(e)===_a};ue.isSuspense=function(e){return Pt(e)===za};ue.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===Pa||e===Oa||e===Ra||e===_a||e===za||e===Yw||typeof e=="object"&&e!==null&&(e.$$typeof===Na||e.$$typeof===Ma||e.$$typeof===Ia||e.$$typeof===Aa||e.$$typeof===La||e.$$typeof===Zw||e.$$typeof===Jw||e.$$typeof===eb||e.$$typeof===Xw)};ue.typeOf=Pt;Kg.exports=ue;var tb=Kg.exports,qg=tb,nb={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},rb={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Gg={};Gg[qg.ForwardRef]=nb;Gg[qg.Memo]=rb;var ob=!0;function ib(e,t,n){var r="";return n.split(" ").forEach(function(o){e[o]!==void 0?t.push(e[o]+";"):r+=o+" "}),r}var Yg=function(t,n,r){var o=t.key+"-"+n.name;(r===!1||ob===!1)&&t.registered[o]===void 0&&(t.registered[o]=n.styles)},lb=function(t,n,r){Yg(t,n,r);var o=t.key+"-"+n.name;if(t.inserted[n.name]===void 0){var i=n;do t.insert(n===i?"."+o:"",i,t.sheet,!0),i=i.next;while(i!==void 0)}};function ab(e){for(var t=0,n,r=0,o=e.length;o>=4;++r,o-=4)n=e.charCodeAt(r)&255|(e.charCodeAt(++r)&255)<<8|(e.charCodeAt(++r)&255)<<16|(e.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,t=(n&65535)*1540483477+((n>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(r+2)&255)<<16;case 2:t^=(e.charCodeAt(r+1)&255)<<8;case 1:t^=e.charCodeAt(r)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var sb={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ub=/[A-Z]|^ms/g,cb=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Xg=function(t){return t.charCodeAt(1)===45},np=function(t){return t!=null&&typeof t!="boolean"},vs=Dg(function(e){return Xg(e)?e:e.replace(ub,"-$&").toLowerCase()}),rp=function(t,n){switch(t){case"animation":case"animationName":if(typeof n=="string")return n.replace(cb,function(r,o,i){return tn={name:o,styles:i,next:tn},o})}return sb[t]!==1&&!Xg(t)&&typeof n=="number"&&n!==0?n+"px":n};function oi(e,t,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return tn={name:n.name,styles:n.styles,next:tn},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)tn={name:r.name,styles:r.styles,next:tn},r=r.next;var o=n.styles+";";return o}return db(e,t,n)}case"function":{if(e!==void 0){var i=tn,l=n(e);return tn=i,oi(e,t,l)}break}}if(t==null)return n;var a=t[n];return a!==void 0?a:n}function db(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=oi(e,t,n[o])+";";else for(var i in n){var l=n[i];if(typeof l!="object")t!=null&&t[l]!==void 0?r+=i+"{"+t[l]+"}":np(l)&&(r+=vs(i)+":"+rp(i,l)+";");else if(Array.isArray(l)&&typeof l[0]=="string"&&(t==null||t[l[0]]===void 0))for(var a=0;a<l.length;a++)np(l[a])&&(r+=vs(i)+":"+rp(i,l[a])+";");else{var s=oi(e,t,l);switch(i){case"animation":case"animationName":{r+=vs(i)+":"+s+";";break}default:r+=i+"{"+s+"}"}}}return r}var op=/label:\s*([^\s;\n{]+)\s*(;|$)/g,tn,Zg=function(t,n,r){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var o=!0,i="";tn=void 0;var l=t[0];l==null||l.raw===void 0?(o=!1,i+=oi(r,n,l)):i+=l[0];for(var a=1;a<t.length;a++)i+=oi(r,n,t[a]),o&&(i+=l[a]);op.lastIndex=0;for(var s="",u;(u=op.exec(i))!==null;)s+="-"+u[1];var d=ab(i)+s;return{name:d,styles:i,next:tn}},fb=function(t){return t()},pb=Wd.useInsertionEffect?Wd.useInsertionEffect:!1,mb=pb||fb,Jg=P.createContext(typeof HTMLElement<"u"?Gw({key:"css"}):null);Jg.Provider;var hb=function(t){return P.forwardRef(function(n,r){var o=P.useContext(Jg);return t(n,o,r)})},cd=P.createContext({});function ke(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Zg(t)}var gb=bw,yb=function(t){return t!=="theme"},ip=function(t){return typeof t=="string"&&t.charCodeAt(0)>96?gb:yb},lp=function(t,n,r){var o;if(n){var i=n.shouldForwardProp;o=t.__emotion_forwardProp&&i?function(l){return t.__emotion_forwardProp(l)&&i(l)}:i}return typeof o!="function"&&r&&(o=t.__emotion_forwardProp),o},kb=function(t){var n=t.cache,r=t.serialized,o=t.isStringTag;return Yg(n,r,o),mb(function(){return lb(n,r,o)}),null},wb=function e(t,n){var r=t.__emotion_real===t,o=r&&t.__emotion_base||t,i,l;n!==void 0&&(i=n.label,l=n.target);var a=lp(t,n,r),s=a||ip(o),u=!s("as");return function(){var d=arguments,c=r&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(i!==void 0&&c.push("label:"+i+";"),d[0]==null||d[0].raw===void 0)c.push.apply(c,d);else{c.push(d[0][0]);for(var f=d.length,p=1;p<f;p++)c.push(d[p],d[0][p])}var h=hb(function(k,C,g){var m=u&&k.as||o,y="",S=[],T=k;if(k.theme==null){T={};for(var v in k)T[v]=k[v];T.theme=P.useContext(cd)}typeof k.className=="string"?y=ib(C.registered,S,k.className):k.className!=null&&(y=k.className+" ");var E=Zg(c.concat(S),C.registered,T);y+=C.key+"-"+E.name,l!==void 0&&(y+=" "+l);var _=u&&a===void 0?ip(m):s,N={};for(var b in k)u&&b==="as"||_(b)&&(N[b]=k[b]);return N.className=y,N.ref=g,P.createElement(P.Fragment,null,P.createElement(kb,{cache:C,serialized:E,isStringTag:typeof m=="string"}),P.createElement(m,N))});return h.displayName=i!==void 0?i:"Styled("+(typeof o=="string"?o:o.displayName||o.name||"Component")+")",h.defaultProps=t.defaultProps,h.__emotion_real=h,h.__emotion_base=o,h.__emotion_styles=c,h.__emotion_forwardProp=a,Object.defineProperty(h,"toString",{value:function(){return"."+l}}),h.withComponent=function(k,C){return e(k,Q({},n,C,{shouldForwardProp:lp(h,C,!0)})).apply(void 0,c)},h}},bb=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],Vu=wb.bind();bb.forEach(function(e){Vu[e]=Vu(e)});var ey={exports:{}},xb="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",vb=xb,Sb=vb;function ty(){}function ny(){}ny.resetWarningCache=ty;var Cb=function(){function e(r,o,i,l,a,s){if(s!==Sb){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:ny,resetWarningCache:ty};return n.PropTypes=n,n};ey.exports=Cb();var Eb=ey.exports;const ap=aa(Eb);function Tb(e,t){return Vu(e,t)}const Pb=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))};function gr(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function An(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ry(e){if(!An(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ry(e[n])}),t}function Jr(e,t,n={clone:!0}){const r=n.clone?Q({},e):e;return An(e)&&An(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(An(t[o])&&o in e&&An(e[o])?r[o]=Jr(e[o],t[o],n):n.clone?r[o]=An(t[o])?ry(t[o]):t[o]:r[o]=t[o])}),r}function zo(e){if(typeof e!="string")throw new Error(kw(7));return e.charAt(0).toUpperCase()+e.slice(1)}function sp(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Hn(e){return e&&e.ownerDocument||document}function dd(e){return Hn(e).defaultView||window}function Wu(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Xl=typeof window<"u"?P.useLayoutEffect:P.useEffect;function up(e){const t=P.useRef(e);return Xl(()=>{t.current=e}),P.useRef((...n)=>(0,t.current)(...n)).current}function Ci(...e){return P.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Wu(n,t)})},e)}class fd{constructor(){this.currentId=0,this.clear=()=>{this.currentId!==0&&(clearTimeout(this.currentId),this.currentId=0)},this.disposeEffect=()=>this.clear}static create(){return new fd}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=0,n()},t)}}let Fa=!0,Ku=!1;const _b=new fd,Rb={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ib(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Rb[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ab(e){e.metaKey||e.altKey||e.ctrlKey||(Fa=!0)}function Ss(){Fa=!1}function Ob(){this.visibilityState==="hidden"&&Ku&&(Fa=!0)}function Lb(e){e.addEventListener("keydown",Ab,!0),e.addEventListener("mousedown",Ss,!0),e.addEventListener("pointerdown",Ss,!0),e.addEventListener("touchstart",Ss,!0),e.addEventListener("visibilitychange",Ob,!0)}function zb(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Fa||Ib(t)}function Mb(){const e=P.useCallback(o=>{o!=null&&Lb(o.ownerDocument)},[]),t=P.useRef(!1);function n(){return t.current?(Ku=!0,_b.start(100,()=>{Ku=!1}),t.current=!1,!0):!1}function r(o){return zb(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Nb(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function oy(e,t){const n=Q({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=Q({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=Q({},i),Object.keys(o).forEach(l=>{n[r][l]=oy(o[l],i[l])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function iy(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,l)=>{if(l){const a=t(l);a!==""&&i.push(a),n&&n[l]&&i.push(n[l])}return i},[]).join(" ")}),r}const Fb={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"},Db=["values","unit","step"],jb=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>Q({},n,{[r.key]:r.val}),{})};function $b(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=gr(e,Db),i=jb(t),l=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function s(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,p){const h=l.indexOf(p);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(h!==-1&&typeof t[l[h]]=="number"?t[l[h]]:p)-r/100}${n})`}function d(f){return l.indexOf(f)+1<l.length?u(f,l[l.indexOf(f)+1]):a(f)}function c(f){const p=l.indexOf(f);return p===0?a(l[1]):p===l.length-1?s(l[p]):u(f,l[l.indexOf(f)+1]).replace("@media","@media not all and")}return Q({keys:l,values:i,up:a,down:s,between:u,only:d,not:c,unit:n},o)}const Bb={borderRadius:4},Ub=Bb;function Mo(e,t){return t?Jr(e,t,{clone:!1}):e}const pd={xs:0,sm:600,md:900,lg:1200,xl:1536},cp={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${pd[e]}px)`};function xn(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||cp;return t.reduce((l,a,s)=>(l[i.up(i.keys[s])]=n(t[s]),l),{})}if(typeof t=="object"){const i=r.breakpoints||cp;return Object.keys(t).reduce((l,a)=>{if(Object.keys(i.values||pd).indexOf(a)!==-1){const s=i.up(a);l[s]=n(t[a],a)}else{const s=a;l[s]=t[s]}return l},{})}return n(t)}function Hb(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Vb(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Da(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Zl(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Da(e,n)||r,t&&(o=t(o,r,e)),o}function Ie(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=l=>{if(l[t]==null)return null;const a=l[t],s=l.theme,u=Da(s,r)||{};return xn(l,a,c=>{let f=Zl(u,o,c);return c===f&&typeof c=="string"&&(f=Zl(u,o,`${t}${c==="default"?"":zo(c)}`,c)),n===!1?f:{[n]:f}})};return i.propTypes={},i.filterProps=[t],i}function Wb(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Kb={m:"margin",p:"padding"},Qb={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},dp={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},qb=Wb(e=>{if(e.length>2)if(dp[e])e=dp[e];else return[e];const[t,n]=e.split(""),r=Kb[t],o=Qb[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),md=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hd=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];[...md,...hd];function Ei(e,t,n,r){var o;const i=(o=Da(e,t,!1))!=null?o:n;return typeof i=="number"?l=>typeof l=="string"?l:i*l:Array.isArray(i)?l=>typeof l=="string"?l:i[l]:typeof i=="function"?i:()=>{}}function ly(e){return Ei(e,"spacing",8)}function Ti(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Gb(e,t){return n=>e.reduce((r,o)=>(r[o]=Ti(t,n),r),{})}function Yb(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=qb(n),i=Gb(o,r),l=e[n];return xn(e,l,i)}function ay(e,t){const n=ly(e.theme);return Object.keys(e).map(r=>Yb(e,t,r,n)).reduce(Mo,{})}function Te(e){return ay(e,md)}Te.propTypes={};Te.filterProps=md;function Pe(e){return ay(e,hd)}Pe.propTypes={};Pe.filterProps=hd;function Xb(e=8){if(e.mui)return e;const t=ly({spacing:e}),n=(...r)=>(r.length===0?[1]:r).map(i=>{const l=t(i);return typeof l=="number"?`${l}px`:l}).join(" ");return n.mui=!0,n}function ja(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?Mo(o,t[i](r)):o,{});return n.propTypes={},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function At(e){return typeof e!="number"?e:`${e}px solid`}function Dt(e,t){return Ie({prop:e,themeKey:"borders",transform:t})}const Zb=Dt("border",At),Jb=Dt("borderTop",At),ex=Dt("borderRight",At),tx=Dt("borderBottom",At),nx=Dt("borderLeft",At),rx=Dt("borderColor"),ox=Dt("borderTopColor"),ix=Dt("borderRightColor"),lx=Dt("borderBottomColor"),ax=Dt("borderLeftColor"),sx=Dt("outline",At),ux=Dt("outlineColor"),$a=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Ei(e.theme,"shape.borderRadius",4),n=r=>({borderRadius:Ti(t,r)});return xn(e,e.borderRadius,n)}return null};$a.propTypes={};$a.filterProps=["borderRadius"];ja(Zb,Jb,ex,tx,nx,rx,ox,ix,lx,ax,$a,sx,ux);const Ba=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({gap:Ti(t,r)});return xn(e,e.gap,n)}return null};Ba.propTypes={};Ba.filterProps=["gap"];const Ua=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({columnGap:Ti(t,r)});return xn(e,e.columnGap,n)}return null};Ua.propTypes={};Ua.filterProps=["columnGap"];const Ha=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Ei(e.theme,"spacing",8),n=r=>({rowGap:Ti(t,r)});return xn(e,e.rowGap,n)}return null};Ha.propTypes={};Ha.filterProps=["rowGap"];const cx=Ie({prop:"gridColumn"}),dx=Ie({prop:"gridRow"}),fx=Ie({prop:"gridAutoFlow"}),px=Ie({prop:"gridAutoColumns"}),mx=Ie({prop:"gridAutoRows"}),hx=Ie({prop:"gridTemplateColumns"}),gx=Ie({prop:"gridTemplateRows"}),yx=Ie({prop:"gridTemplateAreas"}),kx=Ie({prop:"gridArea"});ja(Ba,Ua,Ha,cx,dx,fx,px,mx,hx,gx,yx,kx);function Hr(e,t){return t==="grey"?t:e}const wx=Ie({prop:"color",themeKey:"palette",transform:Hr}),bx=Ie({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Hr}),xx=Ie({prop:"backgroundColor",themeKey:"palette",transform:Hr});ja(wx,bx,xx);function wt(e){return e<=1&&e!==0?`${e*100}%`:e}const vx=Ie({prop:"width",transform:wt}),gd=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||pd[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:wt(n)}};return xn(e,e.maxWidth,t)}return null};gd.filterProps=["maxWidth"];const Sx=Ie({prop:"minWidth",transform:wt}),Cx=Ie({prop:"height",transform:wt}),Ex=Ie({prop:"maxHeight",transform:wt}),Tx=Ie({prop:"minHeight",transform:wt});Ie({prop:"size",cssProperty:"width",transform:wt});Ie({prop:"size",cssProperty:"height",transform:wt});const Px=Ie({prop:"boxSizing"});ja(vx,gd,Sx,Cx,Ex,Tx,Px);const _x={border:{themeKey:"borders",transform:At},borderTop:{themeKey:"borders",transform:At},borderRight:{themeKey:"borders",transform:At},borderBottom:{themeKey:"borders",transform:At},borderLeft:{themeKey:"borders",transform:At},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:At},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:$a},color:{themeKey:"palette",transform:Hr},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Hr},backgroundColor:{themeKey:"palette",transform:Hr},p:{style:Pe},pt:{style:Pe},pr:{style:Pe},pb:{style:Pe},pl:{style:Pe},px:{style:Pe},py:{style:Pe},padding:{style:Pe},paddingTop:{style:Pe},paddingRight:{style:Pe},paddingBottom:{style:Pe},paddingLeft:{style:Pe},paddingX:{style:Pe},paddingY:{style:Pe},paddingInline:{style:Pe},paddingInlineStart:{style:Pe},paddingInlineEnd:{style:Pe},paddingBlock:{style:Pe},paddingBlockStart:{style:Pe},paddingBlockEnd:{style:Pe},m:{style:Te},mt:{style:Te},mr:{style:Te},mb:{style:Te},ml:{style:Te},mx:{style:Te},my:{style:Te},margin:{style:Te},marginTop:{style:Te},marginRight:{style:Te},marginBottom:{style:Te},marginLeft:{style:Te},marginX:{style:Te},marginY:{style:Te},marginInline:{style:Te},marginInlineStart:{style:Te},marginInlineEnd:{style:Te},marginBlock:{style:Te},marginBlockStart:{style:Te},marginBlockEnd:{style:Te},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ba},rowGap:{style:Ha},columnGap:{style:Ua},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:wt},maxWidth:{style:gd},minWidth:{transform:wt},height:{transform:wt},maxHeight:{transform:wt},minHeight:{transform:wt},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},sy=_x;function Rx(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Ix(e,t){return typeof e=="function"?e(t):e}function Ax(){function e(n,r,o,i){const l={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:s=n,themeKey:u,transform:d,style:c}=a;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=Da(o,u)||{};return c?c(l):xn(l,r,h=>{let k=Zl(f,d,h);return h===k&&typeof h=="string"&&(k=Zl(f,d,`${n}${h==="default"?"":zo(h)}`,h)),s===!1?k:{[s]:k}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const l=(r=i.unstable_sxConfig)!=null?r:sy;function a(s){let u=s;if(typeof s=="function")u=s(i);else if(typeof s!="object")return s;if(!u)return null;const d=Hb(i.breakpoints),c=Object.keys(d);let f=d;return Object.keys(u).forEach(p=>{const h=Ix(u[p],i);if(h!=null)if(typeof h=="object")if(l[p])f=Mo(f,e(p,h,i,l));else{const k=xn({theme:i},h,C=>({[p]:C}));Rx(k,h)?f[p]=t({sx:h,theme:i}):f=Mo(f,k)}else f=Mo(f,e(p,h,i,l))}),Vb(c,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const yd=Ax();yd.filterProps=["sx"];function Ox(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Lx=["breakpoints","palette","spacing","shape"];function kd(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,l=gr(e,Lx),a=$b(n),s=Xb(o);let u=Jr({breakpoints:a,direction:"ltr",components:{},palette:Q({mode:"light"},r),spacing:s,shape:Q({},Ub,i)},l);return u.applyStyles=Ox,u=t.reduce((d,c)=>Jr(d,c),u),u.unstable_sxConfig=Q({},sy,l==null?void 0:l.unstable_sxConfig),u.unstable_sx=function(c){return yd({sx:c,theme:this})},u}function zx(e){return Object.keys(e).length===0}function uy(e=null){const t=P.useContext(cd);return!t||zx(t)?e:t}function cy(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=cy(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Qu(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=cy(e))&&(r&&(r+=" "),r+=t);return r}const Mx=["variant"];function fp(e){return e.length===0}function dy(e){const{variant:t}=e,n=gr(e,Mx);let r=t||"";return Object.keys(n).sort().forEach(o=>{o==="color"?r+=fp(r)?e[o]:zo(e[o]):r+=`${fp(r)?o:zo(o)}${zo(e[o].toString())}`}),r}const Nx=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Fx(e){return Object.keys(e).length===0}function Dx(e){return typeof e=="string"&&e.charCodeAt(0)>96}const jx=(e,t)=>t.components&&t.components[e]&&t.components[e].styleOverrides?t.components[e].styleOverrides:null,Jl=e=>{let t=0;const n={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${t}`,t+=1):o=dy(r.props),n[o]=r.style}),n},$x=(e,t)=>{let n=[];return t&&t.components&&t.components[e]&&t.components[e].variants&&(n=t.components[e].variants),Jl(n)},ea=(e,t,n)=>{const{ownerState:r={}}=e,o=[];let i=0;return n&&n.forEach(l=>{let a=!0;if(typeof l.props=="function"){const s=Q({},e,r);a=l.props(s)}else Object.keys(l.props).forEach(s=>{r[s]!==l.props[s]&&e[s]!==l.props[s]&&(a=!1)});a&&(typeof l.props=="function"?o.push(t[`callback${i}`]):o.push(t[dy(l.props)])),typeof l.props=="function"&&(i+=1)}),o},Bx=(e,t,n,r)=>{var o;const i=n==null||(o=n.components)==null||(o=o[r])==null?void 0:o.variants;return ea(e,t,i)};function Cs(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ux=kd(),Hx=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function vl({defaultTheme:e,theme:t,themeId:n}){return Fx(t)?e:t[n]||t}function Vx(e){return e?(t,n)=>n[e]:null}const pp=({styledArg:e,props:t,defaultTheme:n,themeId:r})=>{const o=e(Q({},t,{theme:vl(Q({},t,{defaultTheme:n,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const l=ea(t,Jl(i),i);return[o,...l]}return o};function Wx(e={}){const{themeId:t,defaultTheme:n=Ux,rootShouldForwardProp:r=Cs,slotShouldForwardProp:o=Cs}=e,i=l=>yd(Q({},l,{theme:vl(Q({},l,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(l,a={})=>{Pb(l,S=>S.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:s,slot:u,skipVariantsResolver:d,skipSx:c,overridesResolver:f=Vx(Hx(u))}=a,p=gr(a,Nx),h=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,k=c||!1;let C,g=Cs;u==="Root"||u==="root"?g=r:u?g=o:Dx(l)&&(g=void 0);const m=Tb(l,Q({shouldForwardProp:g,label:C},p)),y=(S,...T)=>{const v=T?T.map(b=>{if(typeof b=="function"&&b.__emotion_real!==b)return A=>pp({styledArg:b,props:A,defaultTheme:n,themeId:t});if(An(b)){let A=b,L;return b&&b.variants&&(L=b.variants,delete A.variants,A=B=>{let V=b;return ea(B,Jl(L),L).forEach(O=>{V=Jr(V,O)}),V}),A}return b}):[];let E=S;if(An(S)){let b;S&&S.variants&&(b=S.variants,delete E.variants,E=A=>{let L=S;return ea(A,Jl(b),b).forEach(V=>{L=Jr(L,V)}),L})}else typeof S=="function"&&S.__emotion_real!==S&&(E=b=>pp({styledArg:S,props:b,defaultTheme:n,themeId:t}));s&&f&&v.push(b=>{const A=vl(Q({},b,{defaultTheme:n,themeId:t})),L=jx(s,A);if(L){const B={};return Object.entries(L).forEach(([V,D])=>{B[V]=typeof D=="function"?D(Q({},b,{theme:A})):D}),f(b,B)}return null}),s&&!h&&v.push(b=>{const A=vl(Q({},b,{defaultTheme:n,themeId:t}));return Bx(b,$x(s,A),A,s)}),k||v.push(i);const _=v.length-T.length;if(Array.isArray(S)&&_>0){const b=new Array(_).fill("");E=[...S,...b],E.raw=[...S.raw,...b]}const N=m(E,...v);return l.muiName&&(N.muiName=l.muiName),N};return m.withConfig&&(y.withConfig=m.withConfig),y}}const ve=Wx();function Kx(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:oy(t.components[n].defaultProps,r)}const Qx=P.createContext(null),fy=Qx;function py(){return P.useContext(fy)}const qx=typeof Symbol=="function"&&Symbol.for,Gx=qx?Symbol.for("mui.nested"):"__THEME_NESTED__";function Yx(e,t){return typeof t=="function"?t(e):Q({},e,t)}function Xx(e){const{children:t,theme:n}=e,r=py(),o=P.useMemo(()=>{const i=r===null?n:Yx(r,n);return i!=null&&(i[Gx]=r!==null),i},[n,r]);return z.jsx(fy.Provider,{value:o,children:t})}const mp={};function hp(e,t,n,r=!1){return P.useMemo(()=>{const o=e&&t[e]||t;if(typeof n=="function"){const i=n(o),l=e?Q({},t,{[e]:i}):i;return r?()=>l:l}return e?Q({},t,{[e]:n}):Q({},t,n)},[e,t,n,r])}function Zx(e){const{children:t,theme:n,themeId:r}=e,o=uy(mp),i=py()||mp,l=hp(r,o,n),a=hp(r,i,n,!0);return z.jsx(Xx,{theme:a,children:z.jsx(cd.Provider,{value:l,children:t})})}function Jx(e,t,n,r,o){const[i,l]=P.useState(()=>o&&n?n(e).matches:r?r(e).matches:t);return Xl(()=>{let a=!0;if(!n)return;const s=n(e),u=()=>{a&&l(s.matches)};return u(),s.addListener(u),()=>{a=!1,s.removeListener(u)}},[e,n]),i}const my=P.useSyncExternalStore;function ev(e,t,n,r,o){const i=P.useCallback(()=>t,[t]),l=P.useMemo(()=>{if(o&&n)return()=>n(e).matches;if(r!==null){const{matches:d}=r(e);return()=>d}return i},[i,e,r,o,n]),[a,s]=P.useMemo(()=>{if(n===null)return[i,()=>()=>{}];const d=n(e);return[()=>d.matches,c=>(d.addListener(c),()=>{d.removeListener(c)})]},[i,n,e]);return my(s,a,l)}function tv(e,t={}){const n=uy(),r=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:o=!1,matchMedia:i=r?window.matchMedia:null,ssrMatchMedia:l=null,noSsr:a=!1}=Kx({name:"MuiUseMediaQuery",props:t,theme:n});let s=typeof e=="function"?e(n):e;return s=s.replace(/^@media( ?)/m,""),(my!==void 0?ev:Jx)(s,o,i,l,a)}const hy="base";function nv(e){return`${hy}--${e}`}function rv(e,t){return`${hy}-${e}-${t}`}function wd(e,t){const n=Fb[t];return n?nv(n):rv(e,t)}function gy(e,t){const n={};return t.forEach(r=>{n[r]=wd(e,r)}),n}const yy="Button";function ov(e){return wd(yy,e)}gy(yy,["root","active","disabled","focusVisible"]);function ta(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function iv(e={}){const{disabled:t=!1,focusableWhenDisabled:n,href:r,rootRef:o,tabIndex:i,to:l,type:a}=e,s=P.useRef(),[u,d]=P.useState(!1),{isFocusVisibleRef:c,onFocus:f,onBlur:p,ref:h}=Mb(),[k,C]=P.useState(!1);t&&!n&&k&&C(!1),P.useEffect(()=>{c.current=k},[k,c]);const[g,m]=P.useState(""),y=D=>O=>{var $;k&&O.preventDefault(),($=D.onMouseLeave)==null||$.call(D,O)},S=D=>O=>{var $;p(O),c.current===!1&&C(!1),($=D.onBlur)==null||$.call(D,O)},T=D=>O=>{var $;if(s.current||(s.current=O.currentTarget),f(O),c.current===!0){var I;C(!0),(I=D.onFocusVisible)==null||I.call(D,O)}($=D.onFocus)==null||$.call(D,O)},v=()=>{const D=s.current;return g==="BUTTON"||g==="INPUT"&&["button","submit","reset"].includes(D==null?void 0:D.type)||g==="A"&&(D==null?void 0:D.href)},E=D=>O=>{if(!t){var $;($=D.onClick)==null||$.call(D,O)}},_=D=>O=>{var $;t||(d(!0),document.addEventListener("mouseup",()=>{d(!1)},{once:!0})),($=D.onMouseDown)==null||$.call(D,O)},N=D=>O=>{var $;if(($=D.onKeyDown)==null||$.call(D,O),!O.defaultMuiPrevented&&(O.target===O.currentTarget&&!v()&&O.key===" "&&O.preventDefault(),O.target===O.currentTarget&&O.key===" "&&!t&&d(!0),O.target===O.currentTarget&&!v()&&O.key==="Enter"&&!t)){var I;(I=D.onClick)==null||I.call(D,O),O.preventDefault()}},b=D=>O=>{var $;if(O.target===O.currentTarget&&d(!1),($=D.onKeyUp)==null||$.call(D,O),O.target===O.currentTarget&&!v()&&!t&&O.key===" "&&!O.defaultMuiPrevented){var I;(I=D.onClick)==null||I.call(D,O)}},A=P.useCallback(D=>{var O;m((O=D==null?void 0:D.tagName)!=null?O:"")},[]),L=Ci(A,o,h,s),B={};return i!==void 0&&(B.tabIndex=i),g==="BUTTON"?(B.type=a??"button",n?B["aria-disabled"]=t:B.disabled=t):g!==""&&(!r&&!l&&(B.role="button",B.tabIndex=i??0),t&&(B["aria-disabled"]=t,B.tabIndex=n?i??0:-1)),{getRootProps:(D={})=>{const O=Q({},ta(e),ta(D)),$=Q({type:a},O,B,D,{onBlur:S(O),onClick:E(O),onFocus:T(O),onKeyDown:N(O),onKeyUp:b(O),onMouseDown:_(O),onMouseLeave:y(O),ref:L});return delete $.onFocusVisible,$},focusVisible:k,setFocusVisible:C,active:u,rootRef:L}}function lv(e){return typeof e=="string"}function av(e,t,n){return e===void 0||lv(e)?t:Q({},t,{ownerState:Q({},t.ownerState,n)})}const sv={disableDefaultClasses:!1},uv=P.createContext(sv);function ky(e){const{disableDefaultClasses:t}=P.useContext(uv);return n=>t?"":e(n)}function cv(e,t,n){return typeof e=="function"?e(t,n):e}function gp(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dv(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const p=Qu(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=Q({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),k=Q({},n,o,r);return p.length>0&&(k.className=p),Object.keys(h).length>0&&(k.style=h),{props:k,internalRef:void 0}}const l=ta(Q({},o,r)),a=gp(r),s=gp(o),u=t(l),d=Qu(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),c=Q({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=Q({},u,n,s,a);return d.length>0&&(f.className=d),Object.keys(c).length>0&&(f.style=c),{props:f,internalRef:u.ref}}const fv=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function qu(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,l=gr(e,fv),a=i?{}:cv(r,o),{props:s,internalRef:u}=dv(Q({},l,{externalSlotProps:a})),d=Ci(u,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return av(n,Q({},s,{ref:d}),o)}const pv=["action","children","disabled","focusableWhenDisabled","onFocusVisible","slotProps","slots"],mv=e=>{const{active:t,disabled:n,focusVisible:r}=e;return iy({root:["root",n&&"disabled",r&&"focusVisible",t&&"active"]},ky(ov))},hv=P.forwardRef(function(t,n){var r;const{action:o,children:i,focusableWhenDisabled:l=!1,slotProps:a={},slots:s={}}=t,u=gr(t,pv),d=P.useRef(),{active:c,focusVisible:f,setFocusVisible:p,getRootProps:h}=iv(Q({},t,{focusableWhenDisabled:l}));P.useImperativeHandle(o,()=>({focusVisible:()=>{p(!0),d.current.focus()}}),[p]);const k=Q({},t,{active:c,focusableWhenDisabled:l,focusVisible:f}),C=mv(k),g=u.href||u.to?"a":"button",m=(r=s.root)!=null?r:g,y=qu({elementType:m,getSlotProps:h,externalForwardedProps:u,externalSlotProps:a.root,additionalProps:{ref:n},ownerState:k,className:C.root});return z.jsx(m,Q({},y,{children:i}))}),gv=ve("button")(({theme:e})=>ke({display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,padding:"8px 16px",borderRadius:e.shape.borderRadius,transition:"all 150ms ease",cursor:"pointer",background:e.palette.background,border:`1px solid ${e.palette.border}`,color:e.palette.primary,boxShadow:"0 1px 2px 0 rgb(0 0 0 / 0.05)",position:"fixed",bottom:"24px",right:"24px","&:hover":{borderColor:e.palette.ring},"&:active":{borderColor:e.palette.ring}})),wy=ve(hv)(({theme:e})=>ke({display:"inline-flex",alignItems:"center",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring},"&.Mui-focusVisible":{outline:"none"},"&.Mui-disabled":{backgroundColor:e.palette.muted,color:"grey",cursor:"default",border:"0"}}));function yv(e){return typeof e=="function"?e():e}const kv=P.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[l,a]=P.useState(null),s=Ci(P.isValidElement(r)?r.ref:null,n);if(Xl(()=>{i||a(yv(o)||document.body)},[o,i]),Xl(()=>{if(l&&!i)return Wu(n,l),()=>{Wu(n,null)}},[n,l,i]),i){if(P.isValidElement(r)){const u={ref:s};return P.cloneElement(r,u)}return z.jsx(P.Fragment,{children:r})}return z.jsx(P.Fragment,{children:l&&Fg.createPortal(r,l)})});function wv(e){const t=Hn(e);return t.body===e?dd(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function No(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function yp(e){return parseInt(dd(e).getComputedStyle(e).paddingRight,10)||0}function bv(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function kp(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,l=>{const a=i.indexOf(l)===-1,s=!bv(l);a&&s&&No(l,o)})}function Es(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function xv(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(wv(r)){const l=Nb(Hn(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${yp(r)+l}px`;const a=Hn(r).querySelectorAll(".mui-fixed");[].forEach.call(a,s=>{n.push({value:s.style.paddingRight,property:"padding-right",el:s}),s.style.paddingRight=`${yp(s)+l}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Hn(r).body;else{const l=r.parentElement,a=dd(r);i=(l==null?void 0:l.nodeName)==="HTML"&&a.getComputedStyle(l).overflowY==="scroll"?l:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:l,property:a})=>{i?l.style.setProperty(a,i):l.style.removeProperty(a)})}}function vv(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Sv{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&No(t.modalRef,!1);const o=vv(n);kp(n,t.mount,t.modalRef,o,!0);const i=Es(this.containers,l=>l.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Es(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=xv(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Es(this.containers,l=>l.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&No(t.modalRef,n),kp(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const l=i.modals[i.modals.length-1];l.modalRef&&No(l.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Cv(e){return typeof e=="function"?e():e}function Ev(e){return e?e.props.hasOwnProperty("in"):!1}const Tv=new Sv;function Pv(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Tv,closeAfterTransition:i=!1,onTransitionEnter:l,onTransitionExited:a,children:s,onClose:u,open:d,rootRef:c}=e,f=P.useRef({}),p=P.useRef(null),h=P.useRef(null),k=Ci(h,c),[C,g]=P.useState(!d),m=Ev(s);let y=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(y=!1);const S=()=>Hn(p.current),T=()=>(f.current.modalRef=h.current,f.current.mount=p.current,f.current),v=()=>{o.mount(T(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},E=up(()=>{const O=Cv(t)||S().body;o.add(T(),O),h.current&&v()}),_=P.useCallback(()=>o.isTopModal(T()),[o]),N=up(O=>{p.current=O,O&&(d&&_()?v():h.current&&No(h.current,y))}),b=P.useCallback(()=>{o.remove(T(),y)},[y,o]);P.useEffect(()=>()=>{b()},[b]),P.useEffect(()=>{d?E():(!m||!i)&&b()},[d,b,m,i,E]);const A=O=>$=>{var I;(I=O.onKeyDown)==null||I.call(O,$),!($.key!=="Escape"||$.which===229||!_())&&(n||($.stopPropagation(),u&&u($,"escapeKeyDown")))},L=O=>$=>{var I;(I=O.onClick)==null||I.call(O,$),$.target===$.currentTarget&&u&&u($,"backdropClick")};return{getRootProps:(O={})=>{const $=ta(e);delete $.onTransitionEnter,delete $.onTransitionExited;const I=Q({},$,O);return Q({role:"presentation"},I,{onKeyDown:A(I),ref:k})},getBackdropProps:(O={})=>{const $=O;return Q({"aria-hidden":!0},$,{onClick:L($),open:d})},getTransitionProps:()=>{const O=()=>{g(!1),l&&l()},$=()=>{g(!0),a&&a(),i&&b()};return{onEnter:sp(O,s==null?void 0:s.props.onEnter),onExited:sp($,s==null?void 0:s.props.onExited)}},rootRef:k,portalRef:N,isTopModal:_,exited:C,hasTransition:m}}const _v=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Rv(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Iv(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Av(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Iv(e))}function Ov(e){const t=[],n=[];return Array.from(e.querySelectorAll(_v)).forEach((r,o)=>{const i=Rv(r);i===-1||!Av(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Lv(){return!0}function zv(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Ov,isEnabled:l=Lv,open:a}=e,s=P.useRef(!1),u=P.useRef(null),d=P.useRef(null),c=P.useRef(null),f=P.useRef(null),p=P.useRef(!1),h=P.useRef(null),k=Ci(t.ref,h),C=P.useRef(null);P.useEffect(()=>{!a||!h.current||(p.current=!n)},[n,a]),P.useEffect(()=>{if(!a||!h.current)return;const y=Hn(h.current);return h.current.contains(y.activeElement)||(h.current.hasAttribute("tabIndex")||h.current.setAttribute("tabIndex","-1"),p.current&&h.current.focus()),()=>{o||(c.current&&c.current.focus&&(s.current=!0,c.current.focus()),c.current=null)}},[a]),P.useEffect(()=>{if(!a||!h.current)return;const y=Hn(h.current),S=E=>{C.current=E,!(r||!l()||E.key!=="Tab")&&y.activeElement===h.current&&E.shiftKey&&(s.current=!0,d.current&&d.current.focus())},T=()=>{const E=h.current;if(E===null)return;if(!y.hasFocus()||!l()||s.current){s.current=!1;return}if(E.contains(y.activeElement)||r&&y.activeElement!==u.current&&y.activeElement!==d.current)return;if(y.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!p.current)return;let _=[];if((y.activeElement===u.current||y.activeElement===d.current)&&(_=i(h.current)),_.length>0){var N,b;const A=!!((N=C.current)!=null&&N.shiftKey&&((b=C.current)==null?void 0:b.key)==="Tab"),L=_[0],B=_[_.length-1];typeof L!="string"&&typeof B!="string"&&(A?B.focus():L.focus())}else E.focus()};y.addEventListener("focusin",T),y.addEventListener("keydown",S,!0);const v=setInterval(()=>{y.activeElement&&y.activeElement.tagName==="BODY"&&T()},50);return()=>{clearInterval(v),y.removeEventListener("focusin",T),y.removeEventListener("keydown",S,!0)}},[n,r,o,l,a,i]);const g=y=>{c.current===null&&(c.current=y.relatedTarget),p.current=!0,f.current=y.target;const S=t.props.onFocus;S&&S(y)},m=y=>{c.current===null&&(c.current=y.relatedTarget),p.current=!0};return z.jsxs(P.Fragment,{children:[z.jsx("div",{tabIndex:a?0:-1,onFocus:m,ref:u,"data-testid":"sentinelStart"}),P.cloneElement(t,{ref:k,onFocus:g}),z.jsx("div",{tabIndex:a?0:-1,onFocus:m,ref:d,"data-testid":"sentinelEnd"})]})}const by="Modal";function Mv(e){return wd(by,e)}gy(by,["root","hidden","backdrop"]);const Nv=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],Fv=e=>{const{open:t,exited:n}=e;return iy({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},ky(Mv))},Dv=P.forwardRef(function(t,n){var r;const{children:o,closeAfterTransition:i=!1,container:l,disableAutoFocus:a=!1,disableEnforceFocus:s=!1,disableEscapeKeyDown:u=!1,disablePortal:d=!1,disableRestoreFocus:c=!1,disableScrollLock:f=!1,hideBackdrop:p=!1,keepMounted:h=!1,onBackdropClick:k,open:C,slotProps:g={},slots:m={}}=t,y=gr(t,Nv),S=Q({},t,{closeAfterTransition:i,disableAutoFocus:a,disableEnforceFocus:s,disableEscapeKeyDown:u,disablePortal:d,disableRestoreFocus:c,disableScrollLock:f,hideBackdrop:p,keepMounted:h}),{getRootProps:T,getBackdropProps:v,getTransitionProps:E,portalRef:_,isTopModal:N,exited:b,hasTransition:A}=Pv(Q({},S,{rootRef:n})),L=Q({},S,{exited:b,hasTransition:A}),B=Fv(L),V={};if(o.props.tabIndex===void 0&&(V.tabIndex="-1"),A){const{onEnter:H,onExited:w}=E();V.onEnter=H,V.onExited=w}const D=(r=m.root)!=null?r:"div",O=qu({elementType:D,externalSlotProps:g.root,externalForwardedProps:y,getSlotProps:T,className:B.root,ownerState:L}),$=m.backdrop,I=qu({elementType:$,externalSlotProps:g.backdrop,getSlotProps:H=>v(Q({},H,{onClick:w=>{k&&k(w),H!=null&&H.onClick&&H.onClick(w)}})),className:B.backdrop,ownerState:L});return!h&&!C&&(!A||b)?null:z.jsx(kv,{ref:_,container:l,disablePortal:d,children:z.jsxs(D,Q({},O,{children:[!p&&$?z.jsx($,Q({},I)):null,z.jsx(zv,{disableEnforceFocus:s,disableAutoFocus:a,disableRestoreFocus:c,isEnabled:N,open:C,children:P.cloneElement(o,V)})]}))})}),xy=P.forwardRef((e,t)=>{const{open:n,className:r,...o}=e;return z.jsx("div",{className:Qu({"base-Backdrop-open":n},r),ref:t,...o})});xy.propTypes={className:ap.string.isRequired,open:ap.bool};const jv=ve(Dv)({position:"fixed",zIndex:1300,inset:0,display:"flex",alignItems:"center",justifyContent:"center"}),$v=ve(xy)(({theme:e})=>ke({zIndex:-1,position:"fixed",inset:0,backgroundColor:e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)",WebkitTapHighlightColor:"transparent"})),Bv=ve("div")(({theme:e})=>ke({fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:500,textAlign:"start",position:"relative",display:"flex",flexDirection:"column",gap:"8px",overflow:"hidden",backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius,border:`1px solid ${e.palette.border}`,boxShadow:`0 4px 12px ${e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)"}`,padding:"24px",color:e.palette.primary})),Uv=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px","& .modal-title":{fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"},"& .modal-description":{margin:0,lineHeight:"1.5rem",fontWeight:400,color:e.palette.muted,marginBottom:"4px"}})),Hv=ve("h2")(()=>ke({display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"}));var vy={exports:{}},Sy={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eo=P;function Vv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Wv=typeof Object.is=="function"?Object.is:Vv,Kv=eo.useState,Qv=eo.useEffect,qv=eo.useLayoutEffect,Gv=eo.useDebugValue;function Yv(e,t){var n=t(),r=Kv({inst:{value:n,getSnapshot:t}}),o=r[0].inst,i=r[1];return qv(function(){o.value=n,o.getSnapshot=t,Ts(o)&&i({inst:o})},[e,n,t]),Qv(function(){return Ts(o)&&i({inst:o}),e(function(){Ts(o)&&i({inst:o})})},[e]),Gv(n),n}function Ts(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Wv(e,n)}catch{return!0}}function Xv(e,t){return t()}var Zv=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Xv:Yv;Sy.useSyncExternalStore=eo.useSyncExternalStore!==void 0?eo.useSyncExternalStore:Zv;vy.exports=Sy;var Jv=vy.exports;const zn=()=>{},Lt=zn(),Ps=Object,ie=e=>e===Lt,hn=e=>typeof e=="function",Kn=(e,t)=>({...e,...t}),eS=e=>hn(e.then),Xi=new WeakMap;let tS=0;const ii=e=>{const t=typeof e,n=e&&e.constructor,r=n==Date;let o,i;if(Ps(e)===e&&!r&&n!=RegExp){if(o=Xi.get(e),o)return o;if(o=++tS+"~",Xi.set(e,o),n==Array){for(o="@",i=0;i<e.length;i++)o+=ii(e[i])+",";Xi.set(e,o)}if(n==Ps){o="#";const l=Ps.keys(e).sort();for(;!ie(i=l.pop());)ie(e[i])||(o+=i+":"+ii(e[i])+",");Xi.set(e,o)}}else o=r?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return o},fn=new WeakMap,_s={},Zi={},bd="undefined",Va=typeof window!=bd,Gu=typeof document!=bd,nS=()=>Va&&typeof window.requestAnimationFrame!=bd,Cy=(e,t)=>{const n=fn.get(e);return[()=>!ie(t)&&e.get(t)||_s,r=>{if(!ie(t)){const o=e.get(t);t in Zi||(Zi[t]=o),n[5](t,Kn(o,r),o||_s)}},n[6],()=>!ie(t)&&t in Zi?Zi[t]:!ie(t)&&e.get(t)||_s]};let Yu=!0;const rS=()=>Yu,[Xu,Zu]=Va&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[zn,zn],oS=()=>{const e=Gu&&document.visibilityState;return ie(e)||e!=="hidden"},iS=e=>(Gu&&document.addEventListener("visibilitychange",e),Xu("focus",e),()=>{Gu&&document.removeEventListener("visibilitychange",e),Zu("focus",e)}),lS=e=>{const t=()=>{Yu=!0,e()},n=()=>{Yu=!1};return Xu("online",t),Xu("offline",n),()=>{Zu("online",t),Zu("offline",n)}},aS={isOnline:rS,isVisible:oS},sS={initFocus:iS,initReconnect:lS},wp=!ki.useId,li=!Va||"Deno"in window,uS=e=>nS()?window.requestAnimationFrame(e):setTimeout(e,1),Rs=li?P.useEffect:P.useLayoutEffect,Is=typeof navigator<"u"&&navigator.connection,bp=!li&&Is&&(["slow-2g","2g"].includes(Is.effectiveType)||Is.saveData),xd=e=>{if(hn(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?ii(e):"",[e,t]};let cS=0;const Ju=()=>++cS,Ey=0,Ty=1,Py=2,dS=3;var wo={__proto__:null,ERROR_REVALIDATE_EVENT:dS,FOCUS_EVENT:Ey,MUTATE_EVENT:Py,RECONNECT_EVENT:Ty};async function _y(...e){const[t,n,r,o]=e,i=Kn({populateCache:!0,throwOnError:!0},typeof o=="boolean"?{revalidate:o}:o||{});let l=i.populateCache;const a=i.rollbackOnError;let s=i.optimisticData;const u=i.revalidate!==!1,d=p=>typeof a=="function"?a(p):a!==!1,c=i.throwOnError;if(hn(n)){const p=n,h=[],k=t.keys();for(const C of k)!/^\$(inf|sub)\$/.test(C)&&p(t.get(C)._k)&&h.push(C);return Promise.all(h.map(f))}return f(n);async function f(p){const[h]=xd(p);if(!h)return;const[k,C]=Cy(t,h),[g,m,y,S]=fn.get(t),T=g[h],v=()=>u&&(delete y[h],delete S[h],T&&T[0])?T[0](Py).then(()=>k().data):k().data;if(e.length<3)return v();let E=r,_;const N=Ju();m[h]=[N,0];const b=!ie(s),A=k(),L=A.data,B=A._c,V=ie(B)?L:B;if(b&&(s=hn(s)?s(V,L):s,C({data:s,_c:V})),hn(E))try{E=E(V)}catch(O){_=O}if(E&&eS(E))if(E=await E.catch(O=>{_=O}),N!==m[h][0]){if(_)throw _;return E}else _&&b&&d(_)&&(l=!0,E=V,C({data:E,_c:Lt}));l&&(_||(hn(l)&&(E=l(E,V)),C({data:E,error:Lt,_c:Lt}))),m[h][1]=Ju();const D=await v();if(C({_c:Lt}),_){if(c)throw _;return}return l?D:E}}const xp=(e,t)=>{for(const n in e)e[n][0]&&e[n][0](t)},fS=(e,t)=>{if(!fn.has(e)){const n=Kn(sS,t),r={},o=_y.bind(Lt,e);let i=zn;const l={},a=(d,c)=>{const f=l[d]||[];return l[d]=f,f.push(c),()=>f.splice(f.indexOf(c),1)},s=(d,c,f)=>{e.set(d,c);const p=l[d];if(p)for(const h of p)h(c,f)},u=()=>{if(!fn.has(e)&&(fn.set(e,[r,{},{},{},o,s,a]),!li)){const d=n.initFocus(setTimeout.bind(Lt,xp.bind(Lt,r,Ey))),c=n.initReconnect(setTimeout.bind(Lt,xp.bind(Lt,r,Ty)));i=()=>{d&&d(),c&&c(),fn.delete(e)}}};return u(),[e,o,u,i]}return[e,fn.get(e)[4]]},pS=(e,t,n,r,o)=>{const i=n.errorRetryCount,l=o.retryCount,a=~~((Math.random()+.5)*(1<<(l<8?l:8)))*n.errorRetryInterval;!ie(i)&&l>i||setTimeout(r,a,o)},mS=(e,t)=>ii(e)==ii(t),[Ry,hS]=fS(new Map),gS=Kn({onLoadingSlow:zn,onSuccess:zn,onError:zn,onErrorRetry:pS,onDiscarded:zn,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:bp?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:bp?5e3:3e3,compare:mS,isPaused:()=>!1,cache:Ry,mutate:hS,fallback:{}},aS),yS=(e,t)=>{const n=Kn(e,t);if(t){const{use:r,fallback:o}=e,{use:i,fallback:l}=t;r&&i&&(n.use=r.concat(i)),o&&l&&(n.fallback=Kn(o,l))}return n},kS=P.createContext({}),Iy=Va&&window.__SWR_DEVTOOLS_USE__,wS=Iy?window.__SWR_DEVTOOLS_USE__:[],bS=()=>{Iy&&(window.__SWR_DEVTOOLS_REACT__=ki)},xS=e=>hn(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}],vS=()=>Kn(gS,P.useContext(kS)),SS=e=>(t,n,r)=>e(t,n&&((...i)=>{const[l]=xd(t),[,,,a]=fn.get(Ry),s=a[l];return ie(s)?n(...i):(delete a[l],s)}),r),CS=wS.concat(SS),ES=e=>function(...n){const r=vS(),[o,i,l]=xS(n),a=yS(r,l);let s=e;const{use:u}=a,d=(u||[]).concat(CS);for(let c=d.length;c--;)s=d[c](s);return s(o,i||a.fetcher||null,a)},TS=(e,t,n)=>{const r=t[e]||(t[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o>=0&&(r[o]=r[r.length-1],r.pop())}};bS();const vp=ki.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)}),As={dedupe:!0},PS=(e,t,n)=>{const{cache:r,compare:o,suspense:i,fallbackData:l,revalidateOnMount:a,revalidateIfStale:s,refreshInterval:u,refreshWhenHidden:d,refreshWhenOffline:c,keepPreviousData:f}=n,[p,h,k,C]=fn.get(r),[g,m]=xd(e),y=P.useRef(!1),S=P.useRef(!1),T=P.useRef(g),v=P.useRef(t),E=P.useRef(n),_=()=>E.current,N=()=>_().isVisible()&&_().isOnline(),[b,A,L,B]=Cy(r,g),V=P.useRef({}).current,D=ie(l)?n.fallback[g]:l,O=(de,fe)=>{for(const Me in V){const be=Me;if(be==="data"){if(!o(de[be],fe[be])&&(!ie(de[be])||!o(we,fe[be])))return!1}else if(fe[be]!==de[be])return!1}return!0},$=P.useMemo(()=>{const de=!g||!t?!1:ie(a)?_().isPaused()||i?!1:ie(s)?!0:s:a,fe=De=>{const $t=Kn(De);return delete $t._k,de?{isValidating:!0,isLoading:!0,...$t}:$t},Me=b(),be=B(),ht=fe(Me),Cn=Me===be?ht:fe(be);let Ae=ht;return[()=>{const De=fe(b());return O(De,Ae)?(Ae.data=De.data,Ae.isLoading=De.isLoading,Ae.isValidating=De.isValidating,Ae.error=De.error,Ae):(Ae=De,De)},()=>Cn]},[r,g]),I=Jv.useSyncExternalStore(P.useCallback(de=>L(g,(fe,Me)=>{O(Me,fe)||de()}),[r,g]),$[0],$[1]),H=!y.current,w=p[g]&&p[g].length>0,Y=I.data,W=ie(Y)?D:Y,x=I.error,re=P.useRef(W),we=f?ie(Y)?re.current:Y:W,ee=w&&!ie(x)?!1:H&&!ie(a)?a:_().isPaused()?!1:i?ie(W)?!1:s:ie(W)||s,Ue=!!(g&&t&&H&&ee),it=ie(I.isValidating)?Ue:I.isValidating,_t=ie(I.isLoading)?Ue:I.isLoading,mt=P.useCallback(async de=>{const fe=v.current;if(!g||!fe||S.current||_().isPaused())return!1;let Me,be,ht=!0;const Cn=de||{},Ae=!k[g]||!Cn.dedupe,De=()=>wp?!S.current&&g===T.current&&y.current:g===T.current,$t={isValidating:!1,isLoading:!1},Ii=()=>{A($t)},Ai=()=>{const lt=k[g];lt&&lt[1]===be&&delete k[g]},Oi={isValidating:!0};ie(b().data)&&(Oi.isLoading=!0);try{if(Ae&&(A(Oi),n.loadingTimeout&&ie(b().data)&&setTimeout(()=>{ht&&De()&&_().onLoadingSlow(g,n)},n.loadingTimeout),k[g]=[fe(m),Ju()]),[Me,be]=k[g],Me=await Me,Ae&&setTimeout(Ai,n.dedupingInterval),!k[g]||k[g][1]!==be)return Ae&&De()&&_().onDiscarded(g),!1;$t.error=Lt;const lt=h[g];if(!ie(lt)&&(be<=lt[0]||be<=lt[1]||lt[1]===0))return Ii(),Ae&&De()&&_().onDiscarded(g),!1;const R=b().data;$t.data=o(R,Me)?R:Me,Ae&&De()&&_().onSuccess(Me,g,n)}catch(lt){Ai();const R=_(),{shouldRetryOnError:j}=R;R.isPaused()||($t.error=lt,Ae&&De()&&(R.onError(lt,g,R),(j===!0||hn(j)&&j(lt))&&N()&&R.onErrorRetry(lt,g,R,q=>{const X=p[g];X&&X[0]&&X[0](wo.ERROR_REVALIDATE_EVENT,q)},{retryCount:(Cn.retryCount||0)+1,dedupe:!0})))}return ht=!1,Ii(),!0},[g,r]),wr=P.useCallback((...de)=>_y(r,T.current,...de),[]);if(Rs(()=>{v.current=t,E.current=n,ie(Y)||(re.current=Y)}),Rs(()=>{if(!g)return;const de=mt.bind(Lt,As);let fe=0;const be=TS(g,p,(ht,Cn={})=>{if(ht==wo.FOCUS_EVENT){const Ae=Date.now();_().revalidateOnFocus&&Ae>fe&&N()&&(fe=Ae+_().focusThrottleInterval,de())}else if(ht==wo.RECONNECT_EVENT)_().revalidateOnReconnect&&N()&&de();else{if(ht==wo.MUTATE_EVENT)return mt();if(ht==wo.ERROR_REVALIDATE_EVENT)return mt(Cn)}});return S.current=!1,T.current=g,y.current=!0,A({_k:m}),ee&&(ie(W)||li?de():uS(de)),()=>{S.current=!0,be()}},[g]),Rs(()=>{let de;function fe(){const be=hn(u)?u(b().data):u;be&&de!==-1&&(de=setTimeout(Me,be))}function Me(){!b().error&&(d||_().isVisible())&&(c||_().isOnline())?mt(As).then(fe):fe()}return fe(),()=>{de&&(clearTimeout(de),de=-1)}},[u,d,c,g]),P.useDebugValue(we),i&&ie(W)&&g){if(!wp&&li)throw new Error("Fallback data is required when using suspense in SSR.");v.current=t,E.current=n,S.current=!1;const de=C[g];if(!ie(de)){const fe=wr(de);vp(fe)}if(ie(x)){const fe=mt(As);ie(we)||(fe.status="fulfilled",fe.value=!0),vp(fe)}else throw x}return{mutate:wr,get data(){return V.data=!0,we},get error(){return V.error=!0,x},get isValidating(){return V.isValidating=!0,it},get isLoading(){return V.isLoading=!0,_t}}},Ji=ES(PS);let _S=(e,t=21)=>(n=t)=>{let r="",o=n;for(;o--;)r+=e[Math.random()*e.length|0];return r};var ai={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},si={code:"1",name:"function_call",parse:e=>{if(e==null||typeof e!="object"||!("function_call"in e)||typeof e.function_call!="object"||e.function_call==null||!("name"in e.function_call)||!("arguments"in e.function_call)||typeof e.function_call.name!="string"||typeof e.function_call.arguments!="string")throw new Error('"function_call" parts expect an object with a "function_call" property.');return{type:"function_call",value:e}}},ui={code:"2",name:"data",parse:e=>{if(!Array.isArray(e))throw new Error('"data" parts expect an array value.');return{type:"data",value:e}}},ci={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},di={code:"4",name:"assistant_message",parse:e=>{if(e==null||typeof e!="object"||!("id"in e)||!("role"in e)||!("content"in e)||typeof e.id!="string"||typeof e.role!="string"||e.role!=="assistant"||!Array.isArray(e.content)||!e.content.every(t=>t!=null&&typeof t=="object"&&"type"in t&&t.type==="text"&&"text"in t&&t.text!=null&&typeof t.text=="object"&&"value"in t.text&&typeof t.text.value=="string"))throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');return{type:"assistant_message",value:e}}},fi={code:"5",name:"assistant_control_data",parse:e=>{if(e==null||typeof e!="object"||!("threadId"in e)||!("messageId"in e)||typeof e.threadId!="string"||typeof e.messageId!="string")throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');return{type:"assistant_control_data",value:{threadId:e.threadId,messageId:e.messageId}}}},pi={code:"6",name:"data_message",parse:e=>{if(e==null||typeof e!="object"||!("role"in e)||!("data"in e)||typeof e.role!="string"||e.role!=="data")throw new Error('"data_message" parts expect an object with a "role" and "data" property.');return{type:"data_message",value:e}}},mi={code:"7",name:"tool_calls",parse:e=>{if(e==null||typeof e!="object"||!("tool_calls"in e)||typeof e.tool_calls!="object"||e.tool_calls==null||!Array.isArray(e.tool_calls)||e.tool_calls.some(t=>t==null||typeof t!="object"||!("id"in t)||typeof t.id!="string"||!("type"in t)||typeof t.type!="string"||!("function"in t)||t.function==null||typeof t.function!="object"||!("arguments"in t.function)||typeof t.function.name!="string"||typeof t.function.arguments!="string"))throw new Error('"tool_calls" parts expect an object with a ToolCallPayload.');return{type:"tool_calls",value:e}}},hi={code:"8",name:"message_annotations",parse:e=>{if(!Array.isArray(e))throw new Error('"message_annotations" parts expect an array value.');return{type:"message_annotations",value:e}}},RS=[ai,si,ui,ci,di,fi,pi,mi,hi],IS={[ai.code]:ai,[si.code]:si,[ui.code]:ui,[ci.code]:ci,[di.code]:di,[fi.code]:fi,[pi.code]:pi,[mi.code]:mi,[hi.code]:hi};ai.name+"",ai.code,si.name+"",si.code,ui.name+"",ui.code,ci.name+"",ci.code,di.name+"",di.code,fi.name+"",fi.code,pi.name+"",pi.code,mi.name+"",mi.code,hi.name+"",hi.code;var AS=RS.map(e=>e.code),OS=e=>{const t=e.indexOf(":");if(t===-1)throw new Error("Failed to parse stream string. No separator found.");const n=e.slice(0,t);if(!AS.includes(n))throw new Error(`Failed to parse stream string. Invalid code ${n}.`);const r=n,o=e.slice(t+1),i=JSON.parse(o);return IS[r].parse(i)},LS=10;function zS(e,t){const n=new Uint8Array(t);let r=0;for(const o of e)n.set(o,r),r+=o.length;return e.length=0,n}async function*MS(e,{isAborted:t}={}){const n=new TextDecoder,r=[];let o=0;for(;;){const{value:i}=await e.read();if(i&&(r.push(i),o+=i.length,i[i.length-1]!==LS))continue;if(r.length===0)break;const l=zS(r,o);o=0;const a=n.decode(l,{stream:!0}).split(`
`).filter(s=>s!=="").map(OS);for(const s of a)yield s;if(t!=null&&t()){e.cancel();break}}}var Ay=_S("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",7);function el(e,t){return!e||!t||!t.length?e:{...e,annotations:[...t]}}async function NS({reader:e,abortControllerRef:t,update:n,onFinish:r,generateId:o=Ay,getCurrentDate:i=()=>new Date}){const l=i(),a={data:[]};let s;for await(const{type:u,value:d}of MS(e,{isAborted:()=>(t==null?void 0:t.current)===null})){u==="text"&&(a.text?a.text={...a.text,content:(a.text.content||"")+d}:a.text={id:o(),role:"assistant",content:d,createdAt:l});let c=null;u==="function_call"&&(a.function_call={id:o(),role:"assistant",content:"",function_call:d.function_call,name:d.function_call.name,createdAt:l},c=a.function_call);let f=null;u==="tool_calls"&&(a.tool_calls={id:o(),role:"assistant",content:"",tool_calls:d.tool_calls,createdAt:l},f=a.tool_calls),u==="data"&&a.data.push(...d);let p=a.text;u==="message_annotations"&&(s?s.push(...d):s=[...d],c=el(a.function_call,s),f=el(a.tool_calls,s),p=el(a.text,s)),s!=null&&s.length&&["text","function_call","tool_calls"].forEach(C=>{a[C]&&(a[C].annotations=[...s])});const h=[c,f,p].filter(Boolean).map(k=>({...el(k,s)}));n(h,[...a.data])}return r==null||r(a),{messages:[a.text,a.function_call,a.tool_calls].filter(Boolean),data:a.data}}async function FS({api:e,messages:t,body:n,credentials:r,headers:o,abortController:i,restoreMessagesOnFailure:l,onResponse:a,onUpdate:s,onFinish:u,generateId:d}){var c;const f=await fetch(e,{method:"POST",body:JSON.stringify({messages:t,...n}),headers:{"Content-Type":"application/json",...o},signal:(c=i==null?void 0:i())==null?void 0:c.signal,credentials:r}).catch(h=>{throw l(),h});if(a)try{await a(f)}catch(h){throw h}if(!f.ok)throw l(),new Error(await f.text()||"Failed to fetch the chat response.");if(!f.body)throw new Error("The response body is empty.");const p=f.body.getReader();return await NS({reader:p,abortControllerRef:i!=null?{current:i()}:void 0,update:s,onFinish(h){u&&h.text!=null&&u(h.text)},generateId:d})}async function DS({getStreamedResponse:e,experimental_onFunctionCall:t,experimental_onToolCall:n,updateChatRequest:r,getCurrentMessages:o}){for(;;){const i=await e();if("messages"in i){let l=!1;for(const a of i.messages)if(!((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))){if(l=!0,t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0){l=!1;break}r(u)}if(n){const s=a.tool_calls;if(!Array.isArray(s)||s.some(d=>typeof d!="object")){console.warn("experimental_onToolCall should not be defined when using tools");continue}const u=await n(o(),s);if(u===void 0){l=!1;break}r(u)}}if(!l)break}else{let l=function(s){for(const u of s.messages){if(u.tool_calls!==void 0)for(const d of u.tool_calls)typeof d=="object"&&d.function.arguments&&typeof d.function.arguments!="string"&&(d.function.arguments=JSON.stringify(d.function.arguments));u.function_call!==void 0&&typeof u.function_call=="object"&&u.function_call.arguments&&typeof u.function_call.arguments!="string"&&(u.function_call.arguments=JSON.stringify(u.function_call.arguments))}};const a=i;if((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))break;if(t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0)break;l(u),r(u)}if(n){const s=a.tool_calls;if(typeof s!="object"){console.warn("experimental_onToolCall should not be defined when using functions");continue}const u=await n(o(),s);if(u===void 0)break;l(u),r(u)}}}}var jS=async(e,t,n,r,o,i,l,a,s,u,d,c)=>{var f,p;const h=l.current;n(t.messages,!1);const k=c?t.messages:t.messages.map(({role:C,content:g,name:m,function_call:y,tool_calls:S,tool_call_id:T})=>({role:C,content:g,tool_call_id:T,...m!==void 0&&{name:m},...y!==void 0&&{function_call:y},...S!==void 0&&{tool_calls:S}}));if(typeof e!="string"){let m={id:s(),createdAt:new Date,content:"",role:"assistant"};async function y(S){const{content:T,ui:v,next:E}=await S;m.content=T,m.ui=await v,n([...t.messages,{...m}],!1),E&&await y(E)}try{const S=e({messages:k,data:t.data});await y(S)}catch(S){throw n(h,!1),S}return u&&u(m),m}return await FS({api:e,messages:k,body:{data:t.data,...i.current.body,...(f=t.options)==null?void 0:f.body,...t.functions!==void 0&&{functions:t.functions},...t.function_call!==void 0&&{function_call:t.function_call},...t.tools!==void 0&&{tools:t.tools},...t.tool_choice!==void 0&&{tool_choice:t.tool_choice}},credentials:i.current.credentials,headers:{...i.current.headers,...(p=t.options)==null?void 0:p.headers},abortController:()=>a.current,restoreMessagesOnFailure(){n(h,!1)},onResponse:d,onUpdate(C,g){n([...t.messages,...C],!1),r([...o||[],...g||[]],!1)},onFinish:u,generateId:s})};function $S({api:e="/api/chat",id:t,initialMessages:n,initialInput:r="",sendExtraMessageFields:o,experimental_onFunctionCall:i,experimental_onToolCall:l,onResponse:a,onFinish:s,onError:u,credentials:d,headers:c,body:f,generateId:p=Ay}={}){const h=P.useId(),k=t??h,C=typeof e=="string"?[e,k]:k,[g]=P.useState([]),{data:m,mutate:y}=Ji([C,"messages"],null,{fallbackData:n??g}),{data:S=!1,mutate:T}=Ji([C,"loading"],null),{data:v,mutate:E}=Ji([C,"streamData"],null),{data:_=void 0,mutate:N}=Ji([C,"error"],null),b=P.useRef(m||[]);P.useEffect(()=>{b.current=m||[]},[m]);const A=P.useRef(null),L=P.useRef({credentials:d,headers:c,body:f});P.useEffect(()=>{L.current={credentials:d,headers:c,body:f}},[d,c,f]);const B=P.useCallback(async W=>{try{T(!0),N(void 0);const x=new AbortController;A.current=x,await DS({getStreamedResponse:()=>jS(e,W,y,E,v,L,b,A,p,s,a,o),experimental_onFunctionCall:i,experimental_onToolCall:l,updateChatRequest:re=>{W=re},getCurrentMessages:()=>b.current}),A.current=null}catch(x){if(x.name==="AbortError")return A.current=null,null;u&&x instanceof Error&&u(x),N(x)}finally{T(!1)}},[y,T,e,L,a,s,u,N,E,v,o,i,l,b,A,p]),V=P.useCallback(async(W,{options:x,functions:re,function_call:we,tools:ee,tool_choice:Ue,data:it}={})=>{W.id||(W.id=p());const _t={messages:b.current.concat(W),options:x,data:it,...re!==void 0&&{functions:re},...we!==void 0&&{function_call:we},...ee!==void 0&&{tools:ee},...Ue!==void 0&&{tool_choice:Ue}};return B(_t)},[B,p]),D=P.useCallback(async({options:W,functions:x,function_call:re,tools:we,tool_choice:ee}={})=>{if(b.current.length===0)return null;if(b.current[b.current.length-1].role==="assistant"){const _t={messages:b.current.slice(0,-1),options:W,...x!==void 0&&{functions:x},...re!==void 0&&{function_call:re},...we!==void 0&&{tools:we},...ee!==void 0&&{tool_choice:ee}};return B(_t)}const it={messages:b.current,options:W,...x!==void 0&&{functions:x},...re!==void 0&&{function_call:re},...we!==void 0&&{tools:we},...ee!==void 0&&{tool_choice:ee}};return B(it)},[B]),O=P.useCallback(()=>{A.current&&(A.current.abort(),A.current=null)},[]),$=P.useCallback(W=>{y(W,!1),b.current=W},[y]),[I,H]=P.useState(r),w=P.useCallback((W,x={},re)=>{re&&(L.current={...L.current,...re}),W.preventDefault(),I&&(V({content:I,role:"user",createdAt:new Date},x),H(""))},[I,V]);return{messages:m||[],error:_,append:V,reload:D,stop:O,setMessages:$,input:I,setInput:H,handleInputChange:W=>{H(W.target.value)},handleSubmit:w,isLoading:S,data:v}}async function BS(e,t){const{action:n,siteKey:r}=e;if(!r)return t({action:n,siteKey:r,token:""});e.mode==="v3"?grecaptcha.ready(async()=>{const o=await grecaptcha.execute(r,{action:n});t({action:n,siteKey:r,token:o})}):e.mode==="enterprise"&&grecaptcha.enterprise.ready(async()=>{const o=await grecaptcha.enterprise.execute(r,{action:n});t({action:n,siteKey:r,token:o})})}/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var US={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HS=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),VS=(e,t)=>{const n=P.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:l,className:a="",children:s,...u},d)=>P.createElement("svg",{ref:d,...US,width:o,height:o,stroke:r,strokeWidth:l?Number(i)*24/Number(o):i,className:["lucide",`lucide-${HS(e)}`,a].join(" "),...u},[...t.map(([c,f])=>P.createElement(c,f)),...Array.isArray(s)?s:[s]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WS=VS("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]),vd=P.createContext({baseUrl:"",entryButtonLabel:"Ask"});function KS(e,t){const n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const QS=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,qS=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,GS={};function Sp(e,t){return((t||GS).jsx?qS:QS).test(e)}const YS=/[ \t\n\f\r]/g;function XS(e){return typeof e=="object"?e.type==="text"?Cp(e.value):!1:Cp(e)}function Cp(e){return e.replace(YS,"")===""}class Pi{constructor(t,n,r){this.property=t,this.normal=n,r&&(this.space=r)}}Pi.prototype.property={};Pi.prototype.normal={};Pi.prototype.space=null;function Oy(e,t){const n={},r={};let o=-1;for(;++o<e.length;)Object.assign(n,e[o].property),Object.assign(r,e[o].normal);return new Pi(n,r,t)}function ec(e){return e.toLowerCase()}class jt{constructor(t,n){this.property=t,this.attribute=n}}jt.prototype.space=null;jt.prototype.boolean=!1;jt.prototype.booleanish=!1;jt.prototype.overloadedBoolean=!1;jt.prototype.number=!1;jt.prototype.commaSeparated=!1;jt.prototype.spaceSeparated=!1;jt.prototype.commaOrSpaceSeparated=!1;jt.prototype.mustUseProperty=!1;jt.prototype.defined=!1;let ZS=0;const G=yr(),Oe=yr(),Ly=yr(),F=yr(),me=yr(),Vr=yr(),yt=yr();function yr(){return 2**++ZS}const tc=Object.freeze(Object.defineProperty({__proto__:null,boolean:G,booleanish:Oe,commaOrSpaceSeparated:yt,commaSeparated:Vr,number:F,overloadedBoolean:Ly,spaceSeparated:me},Symbol.toStringTag,{value:"Module"})),Os=Object.keys(tc);class Sd extends jt{constructor(t,n,r,o){let i=-1;if(super(t,n),Ep(this,"space",o),typeof r=="number")for(;++i<Os.length;){const l=Os[i];Ep(this,Os[i],(r&tc[l])===tc[l])}}}Sd.prototype.defined=!0;function Ep(e,t,n){n&&(e[t]=n)}const JS={}.hasOwnProperty;function io(e){const t={},n={};let r;for(r in e.properties)if(JS.call(e.properties,r)){const o=e.properties[r],i=new Sd(r,e.transform(e.attributes||{},r),o,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(i.mustUseProperty=!0),t[r]=i,n[ec(r)]=r,n[ec(i.attribute)]=r}return new Pi(t,n,e.space)}const zy=io({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),My=io({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function Ny(e,t){return t in e?e[t]:t}function Fy(e,t){return Ny(e,t.toLowerCase())}const Dy=io({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:Fy,properties:{xmlns:null,xmlnsXLink:null}}),jy=io({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:Oe,ariaAutoComplete:null,ariaBusy:Oe,ariaChecked:Oe,ariaColCount:F,ariaColIndex:F,ariaColSpan:F,ariaControls:me,ariaCurrent:null,ariaDescribedBy:me,ariaDetails:null,ariaDisabled:Oe,ariaDropEffect:me,ariaErrorMessage:null,ariaExpanded:Oe,ariaFlowTo:me,ariaGrabbed:Oe,ariaHasPopup:null,ariaHidden:Oe,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:me,ariaLevel:F,ariaLive:null,ariaModal:Oe,ariaMultiLine:Oe,ariaMultiSelectable:Oe,ariaOrientation:null,ariaOwns:me,ariaPlaceholder:null,ariaPosInSet:F,ariaPressed:Oe,ariaReadOnly:Oe,ariaRelevant:null,ariaRequired:Oe,ariaRoleDescription:me,ariaRowCount:F,ariaRowIndex:F,ariaRowSpan:F,ariaSelected:Oe,ariaSetSize:F,ariaSort:null,ariaValueMax:F,ariaValueMin:F,ariaValueNow:F,ariaValueText:null,role:null}}),e2=io({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:Fy,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Vr,acceptCharset:me,accessKey:me,action:null,allow:null,allowFullScreen:G,allowPaymentRequest:G,allowUserMedia:G,alt:null,as:null,async:G,autoCapitalize:null,autoComplete:me,autoFocus:G,autoPlay:G,blocking:me,capture:G,charSet:null,checked:G,cite:null,className:me,cols:F,colSpan:null,content:null,contentEditable:Oe,controls:G,controlsList:me,coords:F|Vr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:G,defer:G,dir:null,dirName:null,disabled:G,download:Ly,draggable:Oe,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:G,formTarget:null,headers:me,height:F,hidden:G,high:F,href:null,hrefLang:null,htmlFor:me,httpEquiv:me,id:null,imageSizes:null,imageSrcSet:null,inert:G,inputMode:null,integrity:null,is:null,isMap:G,itemId:null,itemProp:me,itemRef:me,itemScope:G,itemType:me,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:G,low:F,manifest:null,max:null,maxLength:F,media:null,method:null,min:null,minLength:F,multiple:G,muted:G,name:null,nonce:null,noModule:G,noValidate:G,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:G,optimum:F,pattern:null,ping:me,placeholder:null,playsInline:G,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:G,referrerPolicy:null,rel:me,required:G,reversed:G,rows:F,rowSpan:F,sandbox:me,scope:null,scoped:G,seamless:G,selected:G,shadowRootDelegatesFocus:G,shadowRootMode:null,shape:null,size:F,sizes:null,slot:null,span:F,spellCheck:Oe,src:null,srcDoc:null,srcLang:null,srcSet:null,start:F,step:null,style:null,tabIndex:F,target:null,title:null,translate:null,type:null,typeMustMatch:G,useMap:null,value:Oe,width:F,wrap:null,align:null,aLink:null,archive:me,axis:null,background:null,bgColor:null,border:F,borderColor:null,bottomMargin:F,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:G,declare:G,event:null,face:null,frame:null,frameBorder:null,hSpace:F,leftMargin:F,link:null,longDesc:null,lowSrc:null,marginHeight:F,marginWidth:F,noResize:G,noHref:G,noShade:G,noWrap:G,object:null,profile:null,prompt:null,rev:null,rightMargin:F,rules:null,scheme:null,scrolling:Oe,standby:null,summary:null,text:null,topMargin:F,valueType:null,version:null,vAlign:null,vLink:null,vSpace:F,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:G,disableRemotePlayback:G,prefix:null,property:null,results:F,security:null,unselectable:null}}),t2=io({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:Ny,properties:{about:yt,accentHeight:F,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:F,amplitude:F,arabicForm:null,ascent:F,attributeName:null,attributeType:null,azimuth:F,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:F,by:null,calcMode:null,capHeight:F,className:me,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:F,diffuseConstant:F,direction:null,display:null,dur:null,divisor:F,dominantBaseline:null,download:G,dx:null,dy:null,edgeMode:null,editable:null,elevation:F,enableBackground:null,end:null,event:null,exponent:F,externalResourcesRequired:null,fill:null,fillOpacity:F,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Vr,g2:Vr,glyphName:Vr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:F,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:F,horizOriginX:F,horizOriginY:F,id:null,ideographic:F,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:F,k:F,k1:F,k2:F,k3:F,k4:F,kernelMatrix:yt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:F,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:F,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:F,overlineThickness:F,paintOrder:null,panose1:null,path:null,pathLength:F,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:me,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:F,pointsAtY:F,pointsAtZ:F,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:yt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:yt,rev:yt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:yt,requiredFeatures:yt,requiredFonts:yt,requiredFormats:yt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:F,specularExponent:F,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:F,strikethroughThickness:F,string:null,stroke:null,strokeDashArray:yt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:F,strokeOpacity:F,strokeWidth:null,style:null,surfaceScale:F,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:yt,tabIndex:F,tableValues:null,target:null,targetX:F,targetY:F,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:yt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:F,underlineThickness:F,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:F,values:null,vAlphabetic:F,vMathematical:F,vectorEffect:null,vHanging:F,vIdeographic:F,version:null,vertAdvY:F,vertOriginX:F,vertOriginY:F,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:F,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),n2=/^data[-\w.:]+$/i,Tp=/-[a-z]/g,r2=/[A-Z]/g;function o2(e,t){const n=ec(t);let r=t,o=jt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&n2.test(t)){if(t.charAt(4)==="-"){const i=t.slice(5).replace(Tp,l2);r="data"+i.charAt(0).toUpperCase()+i.slice(1)}else{const i=t.slice(4);if(!Tp.test(i)){let l=i.replace(r2,i2);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}o=Sd}return new o(r,t)}function i2(e){return"-"+e.toLowerCase()}function l2(e){return e.charAt(1).toUpperCase()}const a2={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},s2=Oy([My,zy,Dy,jy,e2],"html"),Cd=Oy([My,zy,Dy,jy,t2],"svg");function u2(e){return e.join(" ").trim()}var $y={},Pp=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,c2=/\n/g,d2=/^\s*/,f2=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,p2=/^:\s*/,m2=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,h2=/^[;\s]*/,g2=/^\s+|\s+$/g,y2=`
`,_p="/",Rp="*",tr="",k2="comment",w2="declaration",b2=function(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function o(h){var k=h.match(c2);k&&(n+=k.length);var C=h.lastIndexOf(y2);r=~C?h.length-C:r+h.length}function i(){var h={line:n,column:r};return function(k){return k.position=new l(h),u(),k}}function l(h){this.start=h,this.end={line:n,column:r},this.source=t.source}l.prototype.content=e;function a(h){var k=new Error(t.source+":"+n+":"+r+": "+h);if(k.reason=h,k.filename=t.source,k.line=n,k.column=r,k.source=e,!t.silent)throw k}function s(h){var k=h.exec(e);if(k){var C=k[0];return o(C),e=e.slice(C.length),k}}function u(){s(d2)}function d(h){var k;for(h=h||[];k=c();)k!==!1&&h.push(k);return h}function c(){var h=i();if(!(_p!=e.charAt(0)||Rp!=e.charAt(1))){for(var k=2;tr!=e.charAt(k)&&(Rp!=e.charAt(k)||_p!=e.charAt(k+1));)++k;if(k+=2,tr===e.charAt(k-1))return a("End of comment missing");var C=e.slice(2,k-2);return r+=2,o(C),e=e.slice(k),r+=2,h({type:k2,comment:C})}}function f(){var h=i(),k=s(f2);if(k){if(c(),!s(p2))return a("property missing ':'");var C=s(m2),g=h({type:w2,property:Ip(k[0].replace(Pp,tr)),value:C?Ip(C[0].replace(Pp,tr)):tr});return s(h2),g}}function p(){var h=[];d(h);for(var k;k=f();)k!==!1&&(h.push(k),d(h));return h}return u(),p()};function Ip(e){return e?e.replace(g2,tr):tr}var x2=Bd&&Bd.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty($y,"__esModule",{value:!0});var v2=x2(b2);function S2(e,t){var n=null;if(!e||typeof e!="string")return n;var r=(0,v2.default)(e),o=typeof t=="function";return r.forEach(function(i){if(i.type==="declaration"){var l=i.property,a=i.value;o?t(l,a,i):a&&(n=n||{},n[l]=a)}}),n}var Ap=$y.default=S2;const C2=Ap.default||Ap,By=Uy("end"),Ed=Uy("start");function Uy(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function E2(e){const t=Ed(e),n=By(e);if(t&&n)return{start:t,end:n}}function Fo(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Op(e.position):"start"in e||"end"in e?Op(e):"line"in e||"column"in e?nc(e):""}function nc(e){return Lp(e&&e.line)+":"+Lp(e&&e.column)}function Op(e){return nc(e&&e.start)+"-"+nc(e&&e.end)}function Lp(e){return e&&typeof e=="number"?e:1}class Je extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let o="",i={},l=!1;if(n&&("line"in n&&"column"in n?i={place:n}:"start"in n&&"end"in n?i={place:n}:"type"in n?i={ancestors:[n],place:n.position}:i={...n}),typeof t=="string"?o=t:!i.cause&&t&&(l=!0,o=t.message,i.cause=t),!i.ruleId&&!i.source&&typeof r=="string"){const s=r.indexOf(":");s===-1?i.ruleId=r:(i.source=r.slice(0,s),i.ruleId=r.slice(s+1))}if(!i.place&&i.ancestors&&i.ancestors){const s=i.ancestors[i.ancestors.length-1];s&&(i.place=s.position)}const a=i.place&&"start"in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file,this.message=o,this.line=a?a.line:void 0,this.name=Fo(i.place)||"1:1",this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=l&&i.cause&&typeof i.cause.stack=="string"?i.cause.stack:"",this.actual,this.expected,this.note,this.url}}Je.prototype.file="";Je.prototype.name="";Je.prototype.reason="";Je.prototype.message="";Je.prototype.stack="";Je.prototype.column=void 0;Je.prototype.line=void 0;Je.prototype.ancestors=void 0;Je.prototype.cause=void 0;Je.prototype.fatal=void 0;Je.prototype.place=void 0;Je.prototype.ruleId=void 0;Je.prototype.source=void 0;const Td={}.hasOwnProperty,T2=new Map,P2=/[A-Z]/g,_2=/-([a-z])/g,R2=new Set(["table","tbody","thead","tfoot","tr"]),I2=new Set(["td","th"]),Hy="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function A2(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=j2(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=D2(n,t.jsx,t.jsxs)}const o={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?Cd:s2,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},i=Vy(o,e,void 0);return i&&typeof i!="string"?i:o.create(e,o.Fragment,{children:i||void 0},void 0)}function Vy(e,t,n){if(t.type==="element")return O2(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return L2(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return M2(e,t,n);if(t.type==="mdxjsEsm")return z2(e,t);if(t.type==="root")return N2(e,t,n);if(t.type==="text")return F2(e,t)}function O2(e,t,n){const r=e.schema;let o=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(o=Cd,e.schema=o),e.ancestors.push(t);const i=Ky(e,t.tagName,!1),l=$2(e,t);let a=_d(e,t);return R2.has(t.tagName)&&(a=a.filter(function(s){return typeof s=="string"?!XS(s):!0})),Wy(e,l,i,t),Pd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function L2(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}gi(e,t.position)}function z2(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);gi(e,t.position)}function M2(e,t,n){const r=e.schema;let o=r;t.name==="svg"&&r.space==="html"&&(o=Cd,e.schema=o),e.ancestors.push(t);const i=t.name===null?e.Fragment:Ky(e,t.name,!0),l=B2(e,t),a=_d(e,t);return Wy(e,l,i,t),Pd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function N2(e,t,n){const r={};return Pd(r,_d(e,t)),e.create(t,e.Fragment,r,n)}function F2(e,t){return t.value}function Wy(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Pd(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function D2(e,t,n){return r;function r(o,i,l,a){const u=Array.isArray(l.children)?n:t;return a?u(i,l,a):u(i,l)}}function j2(e,t){return n;function n(r,o,i,l){const a=Array.isArray(i.children),s=Ed(r);return t(o,i,l,a,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function $2(e,t){const n={};let r,o;for(o in t.properties)if(o!=="children"&&Td.call(t.properties,o)){const i=U2(e,o,t.properties[o]);if(i){const[l,a]=i;e.tableCellAlignToStyle&&l==="align"&&typeof a=="string"&&I2.has(t.tagName)?r=a:n[l]=a}}if(r){const i=n.style||(n.style={});i[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function B2(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const i=r.data.estree.body[0];i.type;const l=i.expression;l.type;const a=l.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else gi(e,t.position);else{const o=r.name;let i;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,i=e.evaluater.evaluateExpression(a.expression)}else gi(e,t.position);else i=r.value===null?!0:r.value;n[o]=i}return n}function _d(e,t){const n=[];let r=-1;const o=e.passKeys?new Map:T2;for(;++r<t.children.length;){const i=t.children[r];let l;if(e.passKeys){const s=i.type==="element"?i.tagName:i.type==="mdxJsxFlowElement"||i.type==="mdxJsxTextElement"?i.name:void 0;if(s){const u=o.get(s)||0;l=s+"-"+u,o.set(s,u+1)}}const a=Vy(e,i,l);a!==void 0&&n.push(a)}return n}function U2(e,t,n){const r=o2(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?KS(n):u2(n)),r.property==="style"){let o=typeof n=="object"?n:H2(e,String(n));return e.stylePropertyNameCase==="css"&&(o=V2(o)),["style",o]}return[e.elementAttributeNameCase==="react"&&r.space?a2[r.property]||r.property:r.attribute,n]}}function H2(e,t){const n={};try{C2(t,r)}catch(o){if(!e.ignoreInvalidStyle){const i=o,l=new Je("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:i,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw l.file=e.filePath||void 0,l.url=Hy+"#cannot-parse-style-attribute",l}}return n;function r(o,i){let l=o;l.slice(0,2)!=="--"&&(l.slice(0,4)==="-ms-"&&(l="ms-"+l.slice(4)),l=l.replace(_2,K2)),n[l]=i}}function Ky(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const o=t.split(".");let i=-1,l;for(;++i<o.length;){const a=Sp(o[i])?{type:"Identifier",name:o[i]}:{type:"Literal",value:o[i]};l=l?{type:"MemberExpression",object:l,property:a,computed:!!(i&&a.type==="Literal"),optional:!1}:a}r=l}else r=Sp(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const o=r.value;return Td.call(e.components,o)?e.components[o]:o}if(e.evaluater)return e.evaluater.evaluateExpression(r);gi(e)}function gi(e,t){const n=new Je("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Hy+"#cannot-handle-mdx-estrees-without-createevaluater",n}function V2(e){const t={};let n;for(n in e)Td.call(e,n)&&(t[W2(n)]=e[n]);return t}function W2(e){let t=e.replace(P2,Q2);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function K2(e,t){return t.toUpperCase()}function Q2(e){return"-"+e.toLowerCase()}const Ls={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},q2={};function Rd(e,t){const n=t||q2,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,o=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Qy(e,r,o)}function Qy(e,t,n){if(G2(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return zp(e.children,t,n)}return Array.isArray(e)?zp(e,t,n):""}function zp(e,t,n){const r=[];let o=-1;for(;++o<e.length;)r[o]=Qy(e[o],t,n);return r.join("")}function G2(e){return!!(e&&typeof e=="object")}const Mp=document.createElement("i");function Id(e){const t="&"+e+";";Mp.innerHTML=t;const n=Mp.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function St(e,t,n,r){const o=e.length;let i=0,l;if(t<0?t=-t>o?0:o+t:t=t>o?o:t,n=n>0?n:0,r.length<1e4)l=Array.from(r),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);i<r.length;)l=r.slice(i,i+1e4),l.unshift(t,0),e.splice(...l),i+=1e4,t+=1e4}function Ot(e,t){return e.length>0?(St(e,e.length,0,t),e):t}const Np={}.hasOwnProperty;function qy(e){const t={};let n=-1;for(;++n<e.length;)Y2(t,e[n]);return t}function Y2(e,t){let n;for(n in t){const o=(Np.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n];let l;if(i)for(l in i){Np.call(o,l)||(o[l]=[]);const a=i[l];X2(o[l],Array.isArray(a)?a:a?[a]:[])}}}function X2(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);St(e,0,0,r)}function Gy(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Gt(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Z2=Yn(new RegExp("\\p{P}","u")),tt=Yn(/[A-Za-z]/),Xe=Yn(/[\dA-Za-z]/),J2=Yn(/[#-'*+\--9=?A-Z^-~]/);function na(e){return e!==null&&(e<32||e===127)}const rc=Yn(/\d/),eC=Yn(/[\dA-Fa-f]/),Yy=Yn(/[!-/:-@[-`{-~]/);function K(e){return e!==null&&e<-2}function pe(e){return e!==null&&(e<0||e===32)}function J(e){return e===-2||e===-1||e===32}function Wa(e){return Yy(e)||Z2(e)}const pr=Yn(/\s/);function Yn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function lo(e){const t=[];let n=-1,r=0,o=0;for(;++n<e.length;){const i=e.charCodeAt(n);let l="";if(i===37&&Xe(e.charCodeAt(n+1))&&Xe(e.charCodeAt(n+2)))o=2;else if(i<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i))||(l=String.fromCharCode(i));else if(i>55295&&i<57344){const a=e.charCodeAt(n+1);i<56320&&a>56319&&a<57344?(l=String.fromCharCode(i,a),o=1):l="�"}else l=String.fromCharCode(i);l&&(t.push(e.slice(r,n),encodeURIComponent(l)),r=n+o+1,l=""),o&&(n+=o,o=0)}return t.join("")+e.slice(r)}function Z(e,t,n,r){const o=r?r-1:Number.POSITIVE_INFINITY;let i=0;return l;function l(s){return J(s)?(e.enter(n),a(s)):t(s)}function a(s){return J(s)&&i++<o?(e.consume(s),a):(e.exit(n),t(s))}}const tC={tokenize:nC};function nC(e){const t=e.attempt(this.parser.constructs.contentInitial,r,o);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),Z(e,t,"linePrefix")}function o(a){return e.enter("paragraph"),i(a)}function i(a){const s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,l(a)}function l(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return K(a)?(e.consume(a),e.exit("chunkText"),i):(e.consume(a),l)}}const rC={tokenize:oC},Fp={tokenize:iC};function oC(e){const t=this,n=[];let r=0,o,i,l;return a;function a(y){if(r<n.length){const S=n[r];return t.containerState=S[1],e.attempt(S[0].continuation,s,u)(y)}return u(y)}function s(y){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,o&&m();const S=t.events.length;let T=S,v;for(;T--;)if(t.events[T][0]==="exit"&&t.events[T][1].type==="chunkFlow"){v=t.events[T][1].end;break}g(r);let E=S;for(;E<t.events.length;)t.events[E][1].end=Object.assign({},v),E++;return St(t.events,T+1,0,t.events.slice(S)),t.events.length=E,u(y)}return a(y)}function u(y){if(r===n.length){if(!o)return f(y);if(o.currentConstruct&&o.currentConstruct.concrete)return h(y);t.interrupt=!!(o.currentConstruct&&!o._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Fp,d,c)(y)}function d(y){return o&&m(),g(r),f(y)}function c(y){return t.parser.lazy[t.now().line]=r!==n.length,l=t.now().offset,h(y)}function f(y){return t.containerState={},e.attempt(Fp,p,h)(y)}function p(y){return r++,n.push([t.currentConstruct,t.containerState]),f(y)}function h(y){if(y===null){o&&m(),g(0),e.consume(y);return}return o=o||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:i,_tokenizer:o}),k(y)}function k(y){if(y===null){C(e.exit("chunkFlow"),!0),g(0),e.consume(y);return}return K(y)?(e.consume(y),C(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(y),k)}function C(y,S){const T=t.sliceStream(y);if(S&&T.push(null),y.previous=i,i&&(i.next=y),i=y,o.defineSkip(y.start),o.write(T),t.parser.lazy[y.start.line]){let v=o.events.length;for(;v--;)if(o.events[v][1].start.offset<l&&(!o.events[v][1].end||o.events[v][1].end.offset>l))return;const E=t.events.length;let _=E,N,b;for(;_--;)if(t.events[_][0]==="exit"&&t.events[_][1].type==="chunkFlow"){if(N){b=t.events[_][1].end;break}N=!0}for(g(r),v=E;v<t.events.length;)t.events[v][1].end=Object.assign({},b),v++;St(t.events,_+1,0,t.events.slice(E)),t.events.length=v}}function g(y){let S=n.length;for(;S-- >y;){const T=n[S];t.containerState=T[1],T[0].exit.call(t,e)}n.length=y}function m(){o.write([null]),i=void 0,o=void 0,t.containerState._closeFlow=void 0}}function iC(e,t,n){return Z(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function ra(e){if(e===null||pe(e)||pr(e))return 1;if(Wa(e))return 2}function Ka(e,t,n){const r=[];let o=-1;for(;++o<e.length;){const i=e[o].resolveAll;i&&!r.includes(i)&&(t=i(t,n),r.push(i))}return t}const oc={name:"attention",tokenize:aC,resolveAll:lC};function lC(e,t){let n=-1,r,o,i,l,a,s,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const c=Object.assign({},e[r][1].end),f=Object.assign({},e[n][1].start);Dp(c,-s),Dp(f,s),l={type:s>1?"strongSequence":"emphasisSequence",start:c,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:f},i={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o={type:s>1?"strong":"emphasis",start:Object.assign({},l.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},l.start),e[n][1].start=Object.assign({},a.end),u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=Ot(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=Ot(u,[["enter",o,t],["enter",l,t],["exit",l,t],["enter",i,t]]),u=Ot(u,Ka(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=Ot(u,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",o,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=Ot(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,St(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function aC(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,o=ra(r);let i;return l;function l(s){return i=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===i)return e.consume(s),a;const u=e.exit("attentionSequence"),d=ra(s),c=!d||d===2&&o||n.includes(s),f=!o||o===2&&d||n.includes(r);return u._open=!!(i===42?c:c&&(o||!f)),u._close=!!(i===42?f:f&&(d||!c)),t(s)}}function Dp(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const sC={name:"autolink",tokenize:uC};function uC(e,t,n){let r=0;return o;function o(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i}function i(p){return tt(p)?(e.consume(p),l):u(p)}function l(p){return p===43||p===45||p===46||Xe(p)?(r=1,a(p)):u(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||Xe(p))&&r++<32?(e.consume(p),a):(r=0,u(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||na(p)?n(p):(e.consume(p),s)}function u(p){return p===64?(e.consume(p),d):J2(p)?(e.consume(p),u):n(p)}function d(p){return Xe(p)?c(p):n(p)}function c(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):f(p)}function f(p){if((p===45||Xe(p))&&r++<63){const h=p===45?f:c;return e.consume(p),h}return n(p)}}const _i={tokenize:cC,partial:!0};function cC(e,t,n){return r;function r(i){return J(i)?Z(e,o,"linePrefix")(i):o(i)}function o(i){return i===null||K(i)?t(i):n(i)}}const Xy={name:"blockQuote",tokenize:dC,continuation:{tokenize:fC},exit:pC};function dC(e,t,n){const r=this;return o;function o(l){if(l===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(l),e.exit("blockQuoteMarker"),i}return n(l)}function i(l){return J(l)?(e.enter("blockQuotePrefixWhitespace"),e.consume(l),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(l))}}function fC(e,t,n){const r=this;return o;function o(l){return J(l)?Z(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):i(l)}function i(l){return e.attempt(Xy,t,n)(l)}}function pC(e){e.exit("blockQuote")}const Zy={name:"characterEscape",tokenize:mC};function mC(e,t,n){return r;function r(i){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(i),e.exit("escapeMarker"),o}function o(i){return Yy(i)?(e.enter("characterEscapeValue"),e.consume(i),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(i)}}const Jy={name:"characterReference",tokenize:hC};function hC(e,t,n){const r=this;let o=0,i,l;return a;function a(c){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),s}function s(c){return c===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(c),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),i=31,l=Xe,d(c))}function u(c){return c===88||c===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(c),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),i=6,l=eC,d):(e.enter("characterReferenceValue"),i=7,l=rc,d(c))}function d(c){if(c===59&&o){const f=e.exit("characterReferenceValue");return l===Xe&&!Id(r.sliceSerialize(f))?n(c):(e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return l(c)&&o++<i?(e.consume(c),d):n(c)}}const jp={tokenize:yC,partial:!0},$p={name:"codeFenced",tokenize:gC,concrete:!0};function gC(e,t,n){const r=this,o={tokenize:T,partial:!0};let i=0,l=0,a;return s;function s(v){return u(v)}function u(v){const E=r.events[r.events.length-1];return i=E&&E[1].type==="linePrefix"?E[2].sliceSerialize(E[1],!0).length:0,a=v,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(v)}function d(v){return v===a?(l++,e.consume(v),d):l<3?n(v):(e.exit("codeFencedFenceSequence"),J(v)?Z(e,c,"whitespace")(v):c(v))}function c(v){return v===null||K(v)?(e.exit("codeFencedFence"),r.interrupt?t(v):e.check(jp,k,S)(v)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(v))}function f(v){return v===null||K(v)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(v)):J(v)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),Z(e,p,"whitespace")(v)):v===96&&v===a?n(v):(e.consume(v),f)}function p(v){return v===null||K(v)?c(v):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),h(v))}function h(v){return v===null||K(v)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(v)):v===96&&v===a?n(v):(e.consume(v),h)}function k(v){return e.attempt(o,S,C)(v)}function C(v){return e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),g}function g(v){return i>0&&J(v)?Z(e,m,"linePrefix",i+1)(v):m(v)}function m(v){return v===null||K(v)?e.check(jp,k,S)(v):(e.enter("codeFlowValue"),y(v))}function y(v){return v===null||K(v)?(e.exit("codeFlowValue"),m(v)):(e.consume(v),y)}function S(v){return e.exit("codeFenced"),t(v)}function T(v,E,_){let N=0;return b;function b(D){return v.enter("lineEnding"),v.consume(D),v.exit("lineEnding"),A}function A(D){return v.enter("codeFencedFence"),J(D)?Z(v,L,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(D):L(D)}function L(D){return D===a?(v.enter("codeFencedFenceSequence"),B(D)):_(D)}function B(D){return D===a?(N++,v.consume(D),B):N>=l?(v.exit("codeFencedFenceSequence"),J(D)?Z(v,V,"whitespace")(D):V(D)):_(D)}function V(D){return D===null||K(D)?(v.exit("codeFencedFence"),E(D)):_(D)}}}function yC(e,t,n){const r=this;return o;function o(l){return l===null?n(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}const zs={name:"codeIndented",tokenize:wC},kC={tokenize:bC,partial:!0};function wC(e,t,n){const r=this;return o;function o(u){return e.enter("codeIndented"),Z(e,i,"linePrefix",5)(u)}function i(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?l(u):n(u)}function l(u){return u===null?s(u):K(u)?e.attempt(kC,l,s)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||K(u)?(e.exit("codeFlowValue"),l(u)):(e.consume(u),a)}function s(u){return e.exit("codeIndented"),t(u)}}function bC(e,t,n){const r=this;return o;function o(l){return r.parser.lazy[r.now().line]?n(l):K(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),o):Z(e,i,"linePrefix",5)(l)}function i(l){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):K(l)?o(l):n(l)}}const xC={name:"codeText",tokenize:CC,resolve:vC,previous:SC};function vC(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="codeTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function SC(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function CC(e,t,n){let r=0,o,i;return l;function l(c){return e.enter("codeText"),e.enter("codeTextSequence"),a(c)}function a(c){return c===96?(e.consume(c),r++,a):(e.exit("codeTextSequence"),s(c))}function s(c){return c===null?n(c):c===32?(e.enter("space"),e.consume(c),e.exit("space"),s):c===96?(i=e.enter("codeTextSequence"),o=0,d(c)):K(c)?(e.enter("lineEnding"),e.consume(c),e.exit("lineEnding"),s):(e.enter("codeTextData"),u(c))}function u(c){return c===null||c===32||c===96||K(c)?(e.exit("codeTextData"),s(c)):(e.consume(c),u)}function d(c){return c===96?(e.consume(c),o++,d):o===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(c)):(i.type="codeTextData",u(c))}}function e0(e){const t={};let n=-1,r,o,i,l,a,s,u;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,i=0,i<s.length&&s[i][1].type==="lineEndingBlank"&&(i+=2),i<s.length&&s[i][1].type==="content"))for(;++i<s.length&&s[i][1].type!=="content";)s[i][1].type==="chunkText"&&(s[i][1]._isInFirstContentOfListItem=!0,i++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,EC(e,n)),n=t[n],u=!0);else if(r[1]._container){for(i=n,o=void 0;i--&&(l=e[i],l[1].type==="lineEnding"||l[1].type==="lineEndingBlank");)l[0]==="enter"&&(o&&(e[o][1].type="lineEndingBlank"),l[1].type="lineEnding",o=i);o&&(r[1].end=Object.assign({},e[o][1].start),a=e.slice(o,n),a.unshift(r),St(e,o,n-o+1,a))}}return!u}function EC(e,t){const n=e[t][1],r=e[t][2];let o=t-1;const i=[],l=n._tokenizer||r.parser[n.contentType](n.start),a=l.events,s=[],u={};let d,c,f=-1,p=n,h=0,k=0;const C=[k];for(;p;){for(;e[++o][1]!==p;);i.push(o),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),c&&l.defineSkip(p.start),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(d),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),c=p,p=p.next}for(p=n;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(k=f+1,C.push(k),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(l.events=[],p?(p._tokenizer=void 0,p.previous=void 0):C.pop(),f=C.length;f--;){const g=a.slice(C[f],C[f+1]),m=i.pop();s.unshift([m,m+g.length-1]),St(e,m,2,g)}for(f=-1;++f<s.length;)u[h+s[f][0]]=h+s[f][1],h+=s[f][1]-s[f][0]-1;return u}const TC={tokenize:RC,resolve:_C},PC={tokenize:IC,partial:!0};function _C(e){return e0(e),e}function RC(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),o(a)}function o(a){return a===null?i(a):K(a)?e.check(PC,l,i)(a):(e.consume(a),o)}function i(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function l(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,o}}function IC(e,t,n){const r=this;return o;function o(l){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),Z(e,i,"linePrefix")}function i(l){if(l===null||K(l))return n(l);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):e.interrupt(r.parser.constructs.flow,n,t)(l)}}function t0(e,t,n,r,o,i,l,a,s){const u=s||Number.POSITIVE_INFINITY;let d=0;return c;function c(g){return g===60?(e.enter(r),e.enter(o),e.enter(i),e.consume(g),e.exit(i),f):g===null||g===32||g===41||na(g)?n(g):(e.enter(r),e.enter(l),e.enter(a),e.enter("chunkString",{contentType:"string"}),k(g))}function f(g){return g===62?(e.enter(i),e.consume(g),e.exit(i),e.exit(o),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(g))}function p(g){return g===62?(e.exit("chunkString"),e.exit(a),f(g)):g===null||g===60||K(g)?n(g):(e.consume(g),g===92?h:p)}function h(g){return g===60||g===62||g===92?(e.consume(g),p):p(g)}function k(g){return!d&&(g===null||g===41||pe(g))?(e.exit("chunkString"),e.exit(a),e.exit(l),e.exit(r),t(g)):d<u&&g===40?(e.consume(g),d++,k):g===41?(e.consume(g),d--,k):g===null||g===32||g===40||na(g)?n(g):(e.consume(g),g===92?C:k)}function C(g){return g===40||g===41||g===92?(e.consume(g),k):k(g)}}function n0(e,t,n,r,o,i){const l=this;let a=0,s;return u;function u(p){return e.enter(r),e.enter(o),e.consume(p),e.exit(o),e.enter(i),d}function d(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in l.parser.constructs?n(p):p===93?(e.exit(i),e.enter(o),e.consume(p),e.exit(o),e.exit(r),t):K(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),c(p))}function c(p){return p===null||p===91||p===93||K(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),s||(s=!J(p)),p===92?f:c)}function f(p){return p===91||p===92||p===93?(e.consume(p),a++,c):c(p)}}function r0(e,t,n,r,o,i){let l;return a;function a(f){return f===34||f===39||f===40?(e.enter(r),e.enter(o),e.consume(f),e.exit(o),l=f===40?41:f,s):n(f)}function s(f){return f===l?(e.enter(o),e.consume(f),e.exit(o),e.exit(r),t):(e.enter(i),u(f))}function u(f){return f===l?(e.exit(i),s(l)):f===null?n(f):K(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),Z(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===l||f===null||K(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?c:d)}function c(f){return f===l||f===92?(e.consume(f),d):d(f)}}function Do(e,t){let n;return r;function r(o){return K(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),n=!0,r):J(o)?Z(e,r,n?"linePrefix":"lineSuffix")(o):t(o)}}const AC={name:"definition",tokenize:LC},OC={tokenize:zC,partial:!0};function LC(e,t,n){const r=this;let o;return i;function i(p){return e.enter("definition"),l(p)}function l(p){return n0.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return o=Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return pe(p)?Do(e,u)(p):u(p)}function u(p){return t0(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(OC,c,c)(p)}function c(p){return J(p)?Z(e,f,"whitespace")(p):f(p)}function f(p){return p===null||K(p)?(e.exit("definition"),r.parser.defined.push(o),t(p)):n(p)}}function zC(e,t,n){return r;function r(a){return pe(a)?Do(e,o)(a):n(a)}function o(a){return r0(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function i(a){return J(a)?Z(e,l,"whitespace")(a):l(a)}function l(a){return a===null||K(a)?t(a):n(a)}}const MC={name:"hardBreakEscape",tokenize:NC};function NC(e,t,n){return r;function r(i){return e.enter("hardBreakEscape"),e.consume(i),o}function o(i){return K(i)?(e.exit("hardBreakEscape"),t(i)):n(i)}}const FC={name:"headingAtx",tokenize:jC,resolve:DC};function DC(e,t){let n=e.length-2,r=3,o,i;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(o={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},i={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},St(e,r,n-r+1,[["enter",o,t],["enter",i,t],["exit",i,t],["exit",o,t]])),e}function jC(e,t,n){let r=0;return o;function o(d){return e.enter("atxHeading"),i(d)}function i(d){return e.enter("atxHeadingSequence"),l(d)}function l(d){return d===35&&r++<6?(e.consume(d),l):d===null||pe(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),s(d)):d===null||K(d)?(e.exit("atxHeading"),t(d)):J(d)?Z(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function s(d){return d===35?(e.consume(d),s):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||pe(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const $C=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Bp=["pre","script","style","textarea"],BC={name:"htmlFlow",tokenize:WC,resolveTo:VC,concrete:!0},UC={tokenize:QC,partial:!0},HC={tokenize:KC,partial:!0};function VC(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function WC(e,t,n){const r=this;let o,i,l,a,s;return u;function u(x){return d(x)}function d(x){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(x),c}function c(x){return x===33?(e.consume(x),f):x===47?(e.consume(x),i=!0,k):x===63?(e.consume(x),o=3,r.interrupt?t:w):tt(x)?(e.consume(x),l=String.fromCharCode(x),C):n(x)}function f(x){return x===45?(e.consume(x),o=2,p):x===91?(e.consume(x),o=5,a=0,h):tt(x)?(e.consume(x),o=4,r.interrupt?t:w):n(x)}function p(x){return x===45?(e.consume(x),r.interrupt?t:w):n(x)}function h(x){const re="CDATA[";return x===re.charCodeAt(a++)?(e.consume(x),a===re.length?r.interrupt?t:L:h):n(x)}function k(x){return tt(x)?(e.consume(x),l=String.fromCharCode(x),C):n(x)}function C(x){if(x===null||x===47||x===62||pe(x)){const re=x===47,we=l.toLowerCase();return!re&&!i&&Bp.includes(we)?(o=1,r.interrupt?t(x):L(x)):$C.includes(l.toLowerCase())?(o=6,re?(e.consume(x),g):r.interrupt?t(x):L(x)):(o=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(x):i?m(x):y(x))}return x===45||Xe(x)?(e.consume(x),l+=String.fromCharCode(x),C):n(x)}function g(x){return x===62?(e.consume(x),r.interrupt?t:L):n(x)}function m(x){return J(x)?(e.consume(x),m):b(x)}function y(x){return x===47?(e.consume(x),b):x===58||x===95||tt(x)?(e.consume(x),S):J(x)?(e.consume(x),y):b(x)}function S(x){return x===45||x===46||x===58||x===95||Xe(x)?(e.consume(x),S):T(x)}function T(x){return x===61?(e.consume(x),v):J(x)?(e.consume(x),T):y(x)}function v(x){return x===null||x===60||x===61||x===62||x===96?n(x):x===34||x===39?(e.consume(x),s=x,E):J(x)?(e.consume(x),v):_(x)}function E(x){return x===s?(e.consume(x),s=null,N):x===null||K(x)?n(x):(e.consume(x),E)}function _(x){return x===null||x===34||x===39||x===47||x===60||x===61||x===62||x===96||pe(x)?T(x):(e.consume(x),_)}function N(x){return x===47||x===62||J(x)?y(x):n(x)}function b(x){return x===62?(e.consume(x),A):n(x)}function A(x){return x===null||K(x)?L(x):J(x)?(e.consume(x),A):n(x)}function L(x){return x===45&&o===2?(e.consume(x),O):x===60&&o===1?(e.consume(x),$):x===62&&o===4?(e.consume(x),Y):x===63&&o===3?(e.consume(x),w):x===93&&o===5?(e.consume(x),H):K(x)&&(o===6||o===7)?(e.exit("htmlFlowData"),e.check(UC,W,B)(x)):x===null||K(x)?(e.exit("htmlFlowData"),B(x)):(e.consume(x),L)}function B(x){return e.check(HC,V,W)(x)}function V(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),D}function D(x){return x===null||K(x)?B(x):(e.enter("htmlFlowData"),L(x))}function O(x){return x===45?(e.consume(x),w):L(x)}function $(x){return x===47?(e.consume(x),l="",I):L(x)}function I(x){if(x===62){const re=l.toLowerCase();return Bp.includes(re)?(e.consume(x),Y):L(x)}return tt(x)&&l.length<8?(e.consume(x),l+=String.fromCharCode(x),I):L(x)}function H(x){return x===93?(e.consume(x),w):L(x)}function w(x){return x===62?(e.consume(x),Y):x===45&&o===2?(e.consume(x),w):L(x)}function Y(x){return x===null||K(x)?(e.exit("htmlFlowData"),W(x)):(e.consume(x),Y)}function W(x){return e.exit("htmlFlow"),t(x)}}function KC(e,t,n){const r=this;return o;function o(l){return K(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i):n(l)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function QC(e,t,n){return r;function r(o){return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),e.attempt(_i,t,n)}}const qC={name:"htmlText",tokenize:GC};function GC(e,t,n){const r=this;let o,i,l;return a;function a(w){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(w),s}function s(w){return w===33?(e.consume(w),u):w===47?(e.consume(w),T):w===63?(e.consume(w),y):tt(w)?(e.consume(w),_):n(w)}function u(w){return w===45?(e.consume(w),d):w===91?(e.consume(w),i=0,h):tt(w)?(e.consume(w),m):n(w)}function d(w){return w===45?(e.consume(w),p):n(w)}function c(w){return w===null?n(w):w===45?(e.consume(w),f):K(w)?(l=c,$(w)):(e.consume(w),c)}function f(w){return w===45?(e.consume(w),p):c(w)}function p(w){return w===62?O(w):w===45?f(w):c(w)}function h(w){const Y="CDATA[";return w===Y.charCodeAt(i++)?(e.consume(w),i===Y.length?k:h):n(w)}function k(w){return w===null?n(w):w===93?(e.consume(w),C):K(w)?(l=k,$(w)):(e.consume(w),k)}function C(w){return w===93?(e.consume(w),g):k(w)}function g(w){return w===62?O(w):w===93?(e.consume(w),g):k(w)}function m(w){return w===null||w===62?O(w):K(w)?(l=m,$(w)):(e.consume(w),m)}function y(w){return w===null?n(w):w===63?(e.consume(w),S):K(w)?(l=y,$(w)):(e.consume(w),y)}function S(w){return w===62?O(w):y(w)}function T(w){return tt(w)?(e.consume(w),v):n(w)}function v(w){return w===45||Xe(w)?(e.consume(w),v):E(w)}function E(w){return K(w)?(l=E,$(w)):J(w)?(e.consume(w),E):O(w)}function _(w){return w===45||Xe(w)?(e.consume(w),_):w===47||w===62||pe(w)?N(w):n(w)}function N(w){return w===47?(e.consume(w),O):w===58||w===95||tt(w)?(e.consume(w),b):K(w)?(l=N,$(w)):J(w)?(e.consume(w),N):O(w)}function b(w){return w===45||w===46||w===58||w===95||Xe(w)?(e.consume(w),b):A(w)}function A(w){return w===61?(e.consume(w),L):K(w)?(l=A,$(w)):J(w)?(e.consume(w),A):N(w)}function L(w){return w===null||w===60||w===61||w===62||w===96?n(w):w===34||w===39?(e.consume(w),o=w,B):K(w)?(l=L,$(w)):J(w)?(e.consume(w),L):(e.consume(w),V)}function B(w){return w===o?(e.consume(w),o=void 0,D):w===null?n(w):K(w)?(l=B,$(w)):(e.consume(w),B)}function V(w){return w===null||w===34||w===39||w===60||w===61||w===96?n(w):w===47||w===62||pe(w)?N(w):(e.consume(w),V)}function D(w){return w===47||w===62||pe(w)?N(w):n(w)}function O(w){return w===62?(e.consume(w),e.exit("htmlTextData"),e.exit("htmlText"),t):n(w)}function $(w){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),I}function I(w){return J(w)?Z(e,H,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):H(w)}function H(w){return e.enter("htmlTextData"),l(w)}}const Ad={name:"labelEnd",tokenize:tE,resolveTo:eE,resolveAll:JC},YC={tokenize:nE},XC={tokenize:rE},ZC={tokenize:oE};function JC(e){let t=-1;for(;++t<e.length;){const n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function eE(e,t){let n=e.length,r=0,o,i,l,a;for(;n--;)if(o=e[n][1],i){if(o.type==="link"||o.type==="labelLink"&&o._inactive)break;e[n][0]==="enter"&&o.type==="labelLink"&&(o._inactive=!0)}else if(l){if(e[n][0]==="enter"&&(o.type==="labelImage"||o.type==="labelLink")&&!o._balanced&&(i=n,o.type!=="labelLink")){r=2;break}}else o.type==="labelEnd"&&(l=n);const s={type:e[i][1].type==="labelLink"?"link":"image",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)},u={type:"label",start:Object.assign({},e[i][1].start),end:Object.assign({},e[l][1].end)},d={type:"labelText",start:Object.assign({},e[i+r+2][1].end),end:Object.assign({},e[l-2][1].start)};return a=[["enter",s,t],["enter",u,t]],a=Ot(a,e.slice(i+1,i+r+3)),a=Ot(a,[["enter",d,t]]),a=Ot(a,Ka(t.parser.constructs.insideSpan.null,e.slice(i+r+4,l-3),t)),a=Ot(a,[["exit",d,t],e[l-2],e[l-1],["exit",u,t]]),a=Ot(a,e.slice(l+1)),a=Ot(a,[["exit",s,t]]),St(e,i,e.length,a),e}function tE(e,t,n){const r=this;let o=r.events.length,i,l;for(;o--;)if((r.events[o][1].type==="labelImage"||r.events[o][1].type==="labelLink")&&!r.events[o][1]._balanced){i=r.events[o][1];break}return a;function a(f){return i?i._inactive?c(f):(l=r.parser.defined.includes(Gt(r.sliceSerialize({start:i.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),s):n(f)}function s(f){return f===40?e.attempt(YC,d,l?d:c)(f):f===91?e.attempt(XC,d,l?u:c)(f):l?d(f):c(f)}function u(f){return e.attempt(ZC,d,c)(f)}function d(f){return t(f)}function c(f){return i._balanced=!0,n(f)}}function nE(e,t,n){return r;function r(c){return e.enter("resource"),e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),o}function o(c){return pe(c)?Do(e,i)(c):i(c)}function i(c){return c===41?d(c):t0(e,l,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function l(c){return pe(c)?Do(e,s)(c):d(c)}function a(c){return n(c)}function s(c){return c===34||c===39||c===40?r0(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):d(c)}function u(c){return pe(c)?Do(e,d)(c):d(c)}function d(c){return c===41?(e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),e.exit("resource"),t):n(c)}}function rE(e,t,n){const r=this;return o;function o(a){return n0.call(r,e,i,l,"reference","referenceMarker","referenceString")(a)}function i(a){return r.parser.defined.includes(Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function l(a){return n(a)}}function oE(e,t,n){return r;function r(i){return e.enter("reference"),e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),o}function o(i){return i===93?(e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),e.exit("reference"),t):n(i)}}const iE={name:"labelStartImage",tokenize:lE,resolveAll:Ad.resolveAll};function lE(e,t,n){const r=this;return o;function o(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),i}function i(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),l):n(a)}function l(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const aE={name:"labelStartLink",tokenize:sE,resolveAll:Ad.resolveAll};function sE(e,t,n){const r=this;return o;function o(l){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelLink"),i}function i(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const Ms={name:"lineEnding",tokenize:uE};function uE(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),Z(e,t,"linePrefix")}}const Sl={name:"thematicBreak",tokenize:cE};function cE(e,t,n){let r=0,o;return i;function i(u){return e.enter("thematicBreak"),l(u)}function l(u){return o=u,a(u)}function a(u){return u===o?(e.enter("thematicBreakSequence"),s(u)):r>=3&&(u===null||K(u))?(e.exit("thematicBreak"),t(u)):n(u)}function s(u){return u===o?(e.consume(u),r++,s):(e.exit("thematicBreakSequence"),J(u)?Z(e,a,"whitespace")(u):a(u))}}const at={name:"list",tokenize:pE,continuation:{tokenize:mE},exit:gE},dE={tokenize:yE,partial:!0},fE={tokenize:hE,partial:!0};function pE(e,t,n){const r=this,o=r.events[r.events.length-1];let i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0,l=0;return a;function a(p){const h=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(h==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:rc(p)){if(r.containerState.type||(r.containerState.type=h,e.enter(h,{_container:!0})),h==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(Sl,n,u)(p):u(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return rc(p)&&++l<10?(e.consume(p),s):(!r.interrupt||l<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(_i,r.interrupt?n:d,e.attempt(dE,f,c))}function d(p){return r.containerState.initialBlankLine=!0,i++,f(p)}function c(p){return J(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return r.containerState.size=i+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function mE(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(_i,o,i);function o(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,Z(e,t,"listItemIndent",r.containerState.size+1)(a)}function i(a){return r.containerState.furtherBlankLines||!J(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,l(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(fE,t,l)(a))}function l(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,Z(e,e.attempt(at,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function hE(e,t,n){const r=this;return Z(e,o,"listItemIndent",r.containerState.size+1);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===r.containerState.size?t(i):n(i)}}function gE(e){e.exit(this.containerState.type)}function yE(e,t,n){const r=this;return Z(e,o,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function o(i){const l=r.events[r.events.length-1];return!J(i)&&l&&l[1].type==="listItemPrefixWhitespace"?t(i):n(i)}}const Up={name:"setextUnderline",tokenize:wE,resolveTo:kE};function kE(e,t){let n=e.length,r,o,i;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(o=n)}else e[n][1].type==="content"&&e.splice(n,1),!i&&e[n][1].type==="definition"&&(i=n);const l={type:"setextHeading",start:Object.assign({},e[o][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[o][1].type="setextHeadingText",i?(e.splice(o,0,["enter",l,t]),e.splice(i+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[i][1].end)):e[r][1]=l,e.push(["exit",l,t]),e}function wE(e,t,n){const r=this;let o;return i;function i(u){let d=r.events.length,c;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){c=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(e.enter("setextHeadingLine"),o=u,l(u)):n(u)}function l(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===o?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),J(u)?Z(e,s,"lineSuffix")(u):s(u))}function s(u){return u===null||K(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const bE={tokenize:xE};function xE(e){const t=this,n=e.attempt(_i,r,e.attempt(this.parser.constructs.flowInitial,o,Z(e,e.attempt(this.parser.constructs.flow,o,e.attempt(TC,o)),"linePrefix")));return n;function r(i){if(i===null){e.consume(i);return}return e.enter("lineEndingBlank"),e.consume(i),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function o(i){if(i===null){e.consume(i);return}return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const vE={resolveAll:i0()},SE=o0("string"),CE=o0("text");function o0(e){return{tokenize:t,resolveAll:i0(e==="text"?EE:void 0)};function t(n){const r=this,o=this.parser.constructs[e],i=n.attempt(o,l,a);return l;function l(d){return u(d)?i(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),s}function s(d){return u(d)?(n.exit("data"),i(d)):(n.consume(d),s)}function u(d){if(d===null)return!0;const c=o[d];let f=-1;if(c)for(;++f<c.length;){const p=c[f];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function i0(e){return t;function t(n,r){let o=-1,i;for(;++o<=n.length;)i===void 0?n[o]&&n[o][1].type==="data"&&(i=o,o++):(!n[o]||n[o][1].type!=="data")&&(o!==i+2&&(n[i][1].end=n[o-1][1].end,n.splice(i+2,o-i-2),o=i+2),i=void 0);return e?e(n,r):n}}function EE(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],o=t.sliceStream(r);let i=o.length,l=-1,a=0,s;for(;i--;){const u=o[i];if(typeof u=="string"){for(l=u.length;u.charCodeAt(l-1)===32;)a++,l--;if(l)break;l=-1}else if(u===-2)s=!0,a++;else if(u!==-1){i++;break}}if(a){const u={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+i,_bufferIndex:i?l:r.start._bufferIndex+l},end:Object.assign({},r.end)};r.end=Object.assign({},u.start),r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}function TE(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1});const o={},i=[];let l=[],a=[];const s={consume:m,enter:y,exit:S,attempt:E(T),check:E(v),interrupt:E(v,{interrupt:!0})},u={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:f,now:h,defineSkip:k,write:c};let d=t.tokenize.call(u,s);return t.resolveAll&&i.push(t),u;function c(A){return l=Ot(l,A),C(),l[l.length-1]!==null?[]:(_(t,0),u.events=Ka(i,u.events,u),u.events)}function f(A,L){return _E(p(A),L)}function p(A){return PE(l,A)}function h(){const{line:A,column:L,offset:B,_index:V,_bufferIndex:D}=r;return{line:A,column:L,offset:B,_index:V,_bufferIndex:D}}function k(A){o[A.line]=A.column,b()}function C(){let A;for(;r._index<l.length;){const L=l[r._index];if(typeof L=="string")for(A=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===A&&r._bufferIndex<L.length;)g(L.charCodeAt(r._bufferIndex));else g(L)}}function g(A){d=d(A)}function m(A){K(A)?(r.line++,r.column=1,r.offset+=A===-3?2:1,b()):A!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===l[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=A}function y(A,L){const B=L||{};return B.type=A,B.start=h(),u.events.push(["enter",B,u]),a.push(B),B}function S(A){const L=a.pop();return L.end=h(),u.events.push(["exit",L,u]),L}function T(A,L){_(A,L.from)}function v(A,L){L.restore()}function E(A,L){return B;function B(V,D,O){let $,I,H,w;return Array.isArray(V)?W(V):"tokenize"in V?W([V]):Y(V);function Y(ee){return Ue;function Ue(it){const _t=it!==null&&ee[it],mt=it!==null&&ee.null,wr=[...Array.isArray(_t)?_t:_t?[_t]:[],...Array.isArray(mt)?mt:mt?[mt]:[]];return W(wr)(it)}}function W(ee){return $=ee,I=0,ee.length===0?O:x(ee[I])}function x(ee){return Ue;function Ue(it){return w=N(),H=ee,ee.partial||(u.currentConstruct=ee),ee.name&&u.parser.constructs.disable.null.includes(ee.name)?we():ee.tokenize.call(L?Object.assign(Object.create(u),L):u,s,re,we)(it)}}function re(ee){return A(H,w),D}function we(ee){return w.restore(),++I<$.length?x($[I]):O}}}function _(A,L){A.resolveAll&&!i.includes(A)&&i.push(A),A.resolve&&St(u.events,L,u.events.length-L,A.resolve(u.events.slice(L),u)),A.resolveTo&&(u.events=A.resolveTo(u.events,u))}function N(){const A=h(),L=u.previous,B=u.currentConstruct,V=u.events.length,D=Array.from(a);return{restore:O,from:V};function O(){r=A,u.previous=L,u.currentConstruct=B,u.events.length=V,a=D,b()}}function b(){r.line in o&&r.column<2&&(r.column=o[r.line],r.offset+=o[r.line]-1)}}function PE(e,t){const n=t.start._index,r=t.start._bufferIndex,o=t.end._index,i=t.end._bufferIndex;let l;if(n===o)l=[e[n].slice(r,i)];else{if(l=e.slice(n,o),r>-1){const a=l[0];typeof a=="string"?l[0]=a.slice(r):l.shift()}i>0&&l.push(e[o].slice(0,i))}return l}function _E(e,t){let n=-1;const r=[];let o;for(;++n<e.length;){const i=e[n];let l;if(typeof i=="string")l=i;else switch(i){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=t?" ":"	";break}case-1:{if(!t&&o)continue;l=" ";break}default:l=String.fromCharCode(i)}o=i===-2,r.push(l)}return r.join("")}const RE={42:at,43:at,45:at,48:at,49:at,50:at,51:at,52:at,53:at,54:at,55:at,56:at,57:at,62:Xy},IE={91:AC},AE={[-2]:zs,[-1]:zs,32:zs},OE={35:FC,42:Sl,45:[Up,Sl],60:BC,61:Up,95:Sl,96:$p,126:$p},LE={38:Jy,92:Zy},zE={[-5]:Ms,[-4]:Ms,[-3]:Ms,33:iE,38:Jy,42:oc,60:[sC,qC],91:aE,92:[MC,Zy],93:Ad,95:oc,96:xC},ME={null:[oc,vE]},NE={null:[42,95]},FE={null:[]},DE=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:NE,contentInitial:IE,disable:FE,document:RE,flow:OE,flowInitial:AE,insideSpan:ME,string:LE,text:zE},Symbol.toStringTag,{value:"Module"}));function jE(e){const n=qy([DE,...(e||{}).extensions||[]]),r={defined:[],lazy:{},constructs:n,content:o(tC),document:o(rC),flow:o(bE),string:o(SE),text:o(CE)};return r;function o(i){return l;function l(a){return TE(r,i,a)}}}function $E(e){for(;!e0(e););return e}const Hp=/[\0\t\n\r]/g;function BE(){let e=1,t="",n=!0,r;return o;function o(i,l,a){const s=[];let u,d,c,f,p;for(i=t+(typeof i=="string"?i.toString():new TextDecoder(l||void 0).decode(i)),c=0,t="",n&&(i.charCodeAt(0)===65279&&c++,n=void 0);c<i.length;){if(Hp.lastIndex=c,u=Hp.exec(i),f=u&&u.index!==void 0?u.index:i.length,p=i.charCodeAt(f),!u){t=i.slice(c);break}if(p===10&&c===f&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),c<f&&(s.push(i.slice(c,f)),e+=f-c),p){case 0:{s.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,s.push(-2);e++<d;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}c=f+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}const UE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function HE(e){return e.replace(UE,VE)}function VE(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const o=n.charCodeAt(1),i=o===120||o===88;return Gy(n.slice(i?2:1),i?16:10)}return Id(n)||e}const l0={}.hasOwnProperty;function WE(e,t,n){return typeof t!="string"&&(n=t,t=void 0),KE(n)($E(jE(n).document().write(BE()(e,t,!0))))}function KE(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:i(Ae),autolinkProtocol:N,autolinkEmail:N,atxHeading:i(Me),blockQuote:i(_t),characterEscape:N,characterReference:N,codeFenced:i(mt),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:i(mt,l),codeText:i(wr,l),codeTextData:N,data:N,codeFlowValue:N,definition:i(de),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:i(fe),hardBreakEscape:i(be),hardBreakTrailing:i(be),htmlFlow:i(ht,l),htmlFlowData:N,htmlText:i(ht,l),htmlTextData:N,image:i(Cn),label:l,link:i(Ae),listItem:i($t),listItemValue:f,listOrdered:i(De,c),listUnordered:i(De),paragraph:i(Ii),reference:x,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:i(Me),strong:i(Ai),thematicBreak:i(lt)},exit:{atxHeading:s(),atxHeadingSequence:T,autolink:s(),autolinkEmail:it,autolinkProtocol:Ue,blockQuote:s(),characterEscapeValue:b,characterReferenceMarkerHexadecimal:we,characterReferenceMarkerNumeric:we,characterReferenceValue:ee,codeFenced:s(C),codeFencedFence:k,codeFencedFenceInfo:p,codeFencedFenceMeta:h,codeFlowValue:b,codeIndented:s(g),codeText:s(D),codeTextData:b,data:b,definition:s(),definitionDestinationString:S,definitionLabelString:m,definitionTitleString:y,emphasis:s(),hardBreakEscape:s(L),hardBreakTrailing:s(L),htmlFlow:s(B),htmlFlowData:b,htmlText:s(V),htmlTextData:b,image:s($),label:H,labelText:I,lineEnding:A,link:s(O),listItem:s(),listOrdered:s(),listUnordered:s(),paragraph:s(),referenceString:re,resourceDestinationString:w,resourceTitleString:Y,resource:W,setextHeading:s(_),setextHeadingLineSequence:E,setextHeadingText:v,strong:s(),thematicBreak:s()}};a0(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(R){let j={type:"root",children:[]};const q={stack:[j],tokenStack:[],config:t,enter:a,exit:u,buffer:l,resume:d,data:n},X=[];let ce=-1;for(;++ce<R.length;)if(R[ce][1].type==="listOrdered"||R[ce][1].type==="listUnordered")if(R[ce][0]==="enter")X.push(ce);else{const Bt=X.pop();ce=o(R,Bt,ce)}for(ce=-1;++ce<R.length;){const Bt=t[R[ce][0]];l0.call(Bt,R[ce][1].type)&&Bt[R[ce][1].type].call(Object.assign({sliceSerialize:R[ce][2].sliceSerialize},q),R[ce][1])}if(q.tokenStack.length>0){const Bt=q.tokenStack[q.tokenStack.length-1];(Bt[1]||Vp).call(q,void 0,Bt[0])}for(j.position={start:Tn(R.length>0?R[0][1].start:{line:1,column:1,offset:0}),end:Tn(R.length>0?R[R.length-2][1].end:{line:1,column:1,offset:0})},ce=-1;++ce<t.transforms.length;)j=t.transforms[ce](j)||j;return j}function o(R,j,q){let X=j-1,ce=-1,Bt=!1,Xn,sn,ao,so;for(;++X<=q;){const gt=R[X];switch(gt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{gt[0]==="enter"?ce++:ce--,so=void 0;break}case"lineEndingBlank":{gt[0]==="enter"&&(Xn&&!so&&!ce&&!ao&&(ao=X),so=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:so=void 0}if(!ce&&gt[0]==="enter"&&gt[1].type==="listItemPrefix"||ce===-1&&gt[0]==="exit"&&(gt[1].type==="listUnordered"||gt[1].type==="listOrdered")){if(Xn){let br=X;for(sn=void 0;br--;){const un=R[br];if(un[1].type==="lineEnding"||un[1].type==="lineEndingBlank"){if(un[0]==="exit")continue;sn&&(R[sn][1].type="lineEndingBlank",Bt=!0),un[1].type="lineEnding",sn=br}else if(!(un[1].type==="linePrefix"||un[1].type==="blockQuotePrefix"||un[1].type==="blockQuotePrefixWhitespace"||un[1].type==="blockQuoteMarker"||un[1].type==="listItemIndent"))break}ao&&(!sn||ao<sn)&&(Xn._spread=!0),Xn.end=Object.assign({},sn?R[sn][1].start:gt[1].end),R.splice(sn||X,0,["exit",Xn,gt[2]]),X++,q++}if(gt[1].type==="listItemPrefix"){const br={type:"listItem",_spread:!1,start:Object.assign({},gt[1].start),end:void 0};Xn=br,R.splice(X,0,["enter",br,gt[2]]),X++,q++,ao=void 0,so=!0}}}return R[j][1]._spread=Bt,q}function i(R,j){return q;function q(X){a.call(this,R(X),X),j&&j.call(this,X)}}function l(){this.stack.push({type:"fragment",children:[]})}function a(R,j,q){this.stack[this.stack.length-1].children.push(R),this.stack.push(R),this.tokenStack.push([j,q]),R.position={start:Tn(j.start),end:void 0}}function s(R){return j;function j(q){R&&R.call(this,q),u.call(this,q)}}function u(R,j){const q=this.stack.pop(),X=this.tokenStack.pop();if(X)X[0].type!==R.type&&(j?j.call(this,R,X[0]):(X[1]||Vp).call(this,R,X[0]));else throw new Error("Cannot close `"+R.type+"` ("+Fo({start:R.start,end:R.end})+"): it’s not open");q.position.end=Tn(R.end)}function d(){return Rd(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function f(R){if(this.data.expectingFirstListItemValue){const j=this.stack[this.stack.length-2];j.start=Number.parseInt(this.sliceSerialize(R),10),this.data.expectingFirstListItemValue=void 0}}function p(){const R=this.resume(),j=this.stack[this.stack.length-1];j.lang=R}function h(){const R=this.resume(),j=this.stack[this.stack.length-1];j.meta=R}function k(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function C(){const R=this.resume(),j=this.stack[this.stack.length-1];j.value=R.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const R=this.resume(),j=this.stack[this.stack.length-1];j.value=R.replace(/(\r?\n|\r)$/g,"")}function m(R){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(R)).toLowerCase()}function y(){const R=this.resume(),j=this.stack[this.stack.length-1];j.title=R}function S(){const R=this.resume(),j=this.stack[this.stack.length-1];j.url=R}function T(R){const j=this.stack[this.stack.length-1];if(!j.depth){const q=this.sliceSerialize(R).length;j.depth=q}}function v(){this.data.setextHeadingSlurpLineEnding=!0}function E(R){const j=this.stack[this.stack.length-1];j.depth=this.sliceSerialize(R).codePointAt(0)===61?1:2}function _(){this.data.setextHeadingSlurpLineEnding=void 0}function N(R){const q=this.stack[this.stack.length-1].children;let X=q[q.length-1];(!X||X.type!=="text")&&(X=Oi(),X.position={start:Tn(R.start),end:void 0},q.push(X)),this.stack.push(X)}function b(R){const j=this.stack.pop();j.value+=this.sliceSerialize(R),j.position.end=Tn(R.end)}function A(R){const j=this.stack[this.stack.length-1];if(this.data.atHardBreak){const q=j.children[j.children.length-1];q.position.end=Tn(R.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(j.type)&&(N.call(this,R),b.call(this,R))}function L(){this.data.atHardBreak=!0}function B(){const R=this.resume(),j=this.stack[this.stack.length-1];j.value=R}function V(){const R=this.resume(),j=this.stack[this.stack.length-1];j.value=R}function D(){const R=this.resume(),j=this.stack[this.stack.length-1];j.value=R}function O(){const R=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";R.type+="Reference",R.referenceType=j,delete R.url,delete R.title}else delete R.identifier,delete R.label;this.data.referenceType=void 0}function $(){const R=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";R.type+="Reference",R.referenceType=j,delete R.url,delete R.title}else delete R.identifier,delete R.label;this.data.referenceType=void 0}function I(R){const j=this.sliceSerialize(R),q=this.stack[this.stack.length-2];q.label=HE(j),q.identifier=Gt(j).toLowerCase()}function H(){const R=this.stack[this.stack.length-1],j=this.resume(),q=this.stack[this.stack.length-1];if(this.data.inReference=!0,q.type==="link"){const X=R.children;q.children=X}else q.alt=j}function w(){const R=this.resume(),j=this.stack[this.stack.length-1];j.url=R}function Y(){const R=this.resume(),j=this.stack[this.stack.length-1];j.title=R}function W(){this.data.inReference=void 0}function x(){this.data.referenceType="collapsed"}function re(R){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(R)).toLowerCase(),this.data.referenceType="full"}function we(R){this.data.characterReferenceType=R.type}function ee(R){const j=this.sliceSerialize(R),q=this.data.characterReferenceType;let X;q?(X=Gy(j,q==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):X=Id(j);const ce=this.stack.pop();ce.value+=X,ce.position.end=Tn(R.end)}function Ue(R){b.call(this,R);const j=this.stack[this.stack.length-1];j.url=this.sliceSerialize(R)}function it(R){b.call(this,R);const j=this.stack[this.stack.length-1];j.url="mailto:"+this.sliceSerialize(R)}function _t(){return{type:"blockquote",children:[]}}function mt(){return{type:"code",lang:null,meta:null,value:""}}function wr(){return{type:"inlineCode",value:""}}function de(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function fe(){return{type:"emphasis",children:[]}}function Me(){return{type:"heading",depth:0,children:[]}}function be(){return{type:"break"}}function ht(){return{type:"html",value:""}}function Cn(){return{type:"image",title:null,url:"",alt:null}}function Ae(){return{type:"link",title:null,url:"",children:[]}}function De(R){return{type:"list",ordered:R.type==="listOrdered",start:null,spread:R._spread,children:[]}}function $t(R){return{type:"listItem",spread:R._spread,checked:null,children:[]}}function Ii(){return{type:"paragraph",children:[]}}function Ai(){return{type:"strong",children:[]}}function Oi(){return{type:"text",value:""}}function lt(){return{type:"thematicBreak"}}}function Tn(e){return{line:e.line,column:e.column,offset:e.offset}}function a0(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?a0(e,r):QE(e,r)}}function QE(e,t){let n;for(n in t)if(l0.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Vp(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Fo({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Fo({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Fo({start:t.start,end:t.end})+") is still open")}function qE(e){const t=this;t.parser=n;function n(r){return WE(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function GE(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function YE(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function XE(e,t){const n=t.value?t.value+`
`:"",r={};t.lang&&(r.className=["language-"+t.lang]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function ZE(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function JE(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function e5(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),o=lo(r.toLowerCase()),i=e.footnoteOrder.indexOf(r);let l,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),l=e.footnoteOrder.length):l=i+1,a+=1,e.footnoteCounts.set(r,a);const s={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+o,id:n+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,s);const u={type:"element",tagName:"sup",properties:{},children:[s]};return e.patch(t,u),e.applyData(t,u)}function t5(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function n5(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function s0(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const o=e.all(t),i=o[0];i&&i.type==="text"?i.value="["+i.value:o.unshift({type:"text",value:"["});const l=o[o.length-1];return l&&l.type==="text"?l.value+=r:o.push({type:"text",value:r}),o}function r5(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return s0(e,t);const o={src:lo(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"img",properties:o,children:[]};return e.patch(t,i),e.applyData(t,i)}function o5(e,t){const n={src:lo(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function i5(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function l5(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return s0(e,t);const o={href:lo(r.url||"")};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"a",properties:o,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function a5(e,t){const n={href:lo(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function s5(e,t,n){const r=e.all(t),o=n?u5(n):u0(t),i={},l=[];if(typeof t.checked=="boolean"){const d=r[0];let c;d&&d.type==="element"&&d.tagName==="p"?c=d:(c={type:"element",tagName:"p",properties:{},children:[]},r.unshift(c)),c.children.length>0&&c.children.unshift({type:"text",value:" "}),c.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),i.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(o||a!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!o?l.push(...d.children):l.push(d)}const s=r[r.length-1];s&&(o||s.type!=="element"||s.tagName!=="p")&&l.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:i,children:l};return e.patch(t,u),e.applyData(t,u)}function u5(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=u0(n[r])}return t}function u0(e){const t=e.spread;return t??e.children.length>1}function c5(e,t){const n={},r=e.all(t);let o=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++o<r.length;){const l=r[o];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const i={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,i),e.applyData(t,i)}function d5(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function f5(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function p5(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function m5(e,t){const n=e.all(t),r=n.shift(),o=[];if(r){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],l),o.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Ed(t.children[1]),s=By(t.children[t.children.length-1]);a&&s&&(l.position={start:a,end:s}),o.push(l)}const i={type:"element",tagName:"table",properties:{},children:e.wrap(o,!0)};return e.patch(t,i),e.applyData(t,i)}function h5(e,t,n){const r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,a=l?l.length:t.children.length;let s=-1;const u=[];for(;++s<a;){const c=t.children[s],f={},p=l?l[s]:void 0;p&&(f.align=p);let h={type:"element",tagName:i,properties:f,children:[]};c&&(h.children=e.all(c),e.patch(c,h),h=e.applyData(c,h)),u.push(h)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function g5(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Wp=9,Kp=32;function y5(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),o=0;const i=[];for(;r;)i.push(Qp(t.slice(o,r.index),o>0,!0),r[0]),o=r.index+r[0].length,r=n.exec(t);return i.push(Qp(t.slice(o),o>0,!1)),i.join("")}function Qp(e,t,n){let r=0,o=e.length;if(t){let i=e.codePointAt(r);for(;i===Wp||i===Kp;)r++,i=e.codePointAt(r)}if(n){let i=e.codePointAt(o-1);for(;i===Wp||i===Kp;)o--,i=e.codePointAt(o-1)}return o>r?e.slice(r,o):""}function k5(e,t){const n={type:"text",value:y5(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function w5(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const b5={blockquote:GE,break:YE,code:XE,delete:ZE,emphasis:JE,footnoteReference:e5,heading:t5,html:n5,imageReference:r5,image:o5,inlineCode:i5,linkReference:l5,link:a5,listItem:s5,list:c5,paragraph:d5,root:f5,strong:p5,table:m5,tableCell:g5,tableRow:h5,text:k5,thematicBreak:w5,toml:tl,yaml:tl,definition:tl,footnoteDefinition:tl};function tl(){}const c0=-1,Qa=0,oa=1,ia=2,Od=3,Ld=4,zd=5,Md=6,d0=7,f0=8,qp=typeof self=="object"?self:globalThis,x5=(e,t)=>{const n=(o,i)=>(e.set(i,o),o),r=o=>{if(e.has(o))return e.get(o);const[i,l]=t[o];switch(i){case Qa:case c0:return n(l,o);case oa:{const a=n([],o);for(const s of l)a.push(r(s));return a}case ia:{const a=n({},o);for(const[s,u]of l)a[r(s)]=r(u);return a}case Od:return n(new Date(l),o);case Ld:{const{source:a,flags:s}=l;return n(new RegExp(a,s),o)}case zd:{const a=n(new Map,o);for(const[s,u]of l)a.set(r(s),r(u));return a}case Md:{const a=n(new Set,o);for(const s of l)a.add(r(s));return a}case d0:{const{name:a,message:s}=l;return n(new qp[a](s),o)}case f0:return n(BigInt(l),o);case"BigInt":return n(Object(BigInt(l)),o)}return n(new qp[i](l),o)};return r},Gp=e=>x5(new Map,e)(0),vr="",{toString:v5}={},{keys:S5}=Object,bo=e=>{const t=typeof e;if(t!=="object"||!e)return[Qa,t];const n=v5.call(e).slice(8,-1);switch(n){case"Array":return[oa,vr];case"Object":return[ia,vr];case"Date":return[Od,vr];case"RegExp":return[Ld,vr];case"Map":return[zd,vr];case"Set":return[Md,vr]}return n.includes("Array")?[oa,n]:n.includes("Error")?[d0,n]:[ia,n]},nl=([e,t])=>e===Qa&&(t==="function"||t==="symbol"),C5=(e,t,n,r)=>{const o=(l,a)=>{const s=r.push(l)-1;return n.set(a,s),s},i=l=>{if(n.has(l))return n.get(l);let[a,s]=bo(l);switch(a){case Qa:{let d=l;switch(s){case"bigint":a=f0,d=l.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+s);d=null;break;case"undefined":return o([c0],l)}return o([a,d],l)}case oa:{if(s)return o([s,[...l]],l);const d=[],c=o([a,d],l);for(const f of l)d.push(i(f));return c}case ia:{if(s)switch(s){case"BigInt":return o([s,l.toString()],l);case"Boolean":case"Number":case"String":return o([s,l.valueOf()],l)}if(t&&"toJSON"in l)return i(l.toJSON());const d=[],c=o([a,d],l);for(const f of S5(l))(e||!nl(bo(l[f])))&&d.push([i(f),i(l[f])]);return c}case Od:return o([a,l.toISOString()],l);case Ld:{const{source:d,flags:c}=l;return o([a,{source:d,flags:c}],l)}case zd:{const d=[],c=o([a,d],l);for(const[f,p]of l)(e||!(nl(bo(f))||nl(bo(p))))&&d.push([i(f),i(p)]);return c}case Md:{const d=[],c=o([a,d],l);for(const f of l)(e||!nl(bo(f)))&&d.push(i(f));return c}}const{message:u}=l;return o([a,{name:s,message:u}],l)};return i},Yp=(e,{json:t,lossy:n}={})=>{const r=[];return C5(!(t||n),!!t,new Map,r)(e),r},la=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Gp(Yp(e,t)):structuredClone(e):(e,t)=>Gp(Yp(e,t));function E5(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function T5(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function P5(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||E5,r=e.options.footnoteBackLabel||T5,o=e.options.footnoteLabel||"Footnotes",i=e.options.footnoteLabelTagName||"h2",l=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let s=-1;for(;++s<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[s]);if(!u)continue;const d=e.all(u),c=String(u.identifier).toUpperCase(),f=lo(c.toLowerCase());let p=0;const h=[],k=e.footnoteCounts.get(c);for(;k!==void 0&&++p<=k;){h.length>0&&h.push({type:"text",value:" "});let m=typeof n=="string"?n:n(s,p);typeof m=="string"&&(m={type:"text",value:m}),h.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(s,p),className:["data-footnote-backref"]},children:Array.isArray(m)?m:[m]})}const C=d[d.length-1];if(C&&C.type==="element"&&C.tagName==="p"){const m=C.children[C.children.length-1];m&&m.type==="text"?m.value+=" ":C.children.push({type:"text",value:" "}),C.children.push(...h)}else d.push(...h);const g={type:"element",tagName:"li",properties:{id:t+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,g),a.push(g)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:i,properties:{...la(l),id:"footnote-label"},children:[{type:"text",value:o}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const qa=function(e){if(e==null)return A5;if(typeof e=="function")return Ga(e);if(typeof e=="object")return Array.isArray(e)?_5(e):R5(e);if(typeof e=="string")return I5(e);throw new Error("Expected function, string, or object as test")};function _5(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=qa(e[n]);return Ga(r);function r(...o){let i=-1;for(;++i<t.length;)if(t[i].apply(this,o))return!0;return!1}}function R5(e){const t=e;return Ga(n);function n(r){const o=r;let i;for(i in e)if(o[i]!==t[i])return!1;return!0}}function I5(e){return Ga(t);function t(n){return n&&n.type===e}}function Ga(e){return t;function t(n,r,o){return!!(O5(n)&&e.call(this,n,typeof r=="number"?r:void 0,o||void 0))}}function A5(){return!0}function O5(e){return e!==null&&typeof e=="object"&&"type"in e}const p0=[],L5=!0,ic=!1,z5="skip";function m0(e,t,n,r){let o;typeof t=="function"&&typeof n!="function"?(r=n,n=t):o=t;const i=qa(o),l=r?-1:1;a(e,void 0,[])();function a(s,u,d){const c=s&&typeof s=="object"?s:{};if(typeof c.type=="string"){const p=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(s.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=p0,h,k,C;if((!t||i(s,u,d[d.length-1]||void 0))&&(p=M5(n(s,d)),p[0]===ic))return p;if("children"in s&&s.children){const g=s;if(g.children&&p[0]!==z5)for(k=(r?g.children.length:-1)+l,C=d.concat(g);k>-1&&k<g.children.length;){const m=g.children[k];if(h=a(m,k,C)(),h[0]===ic)return h;k=typeof h[1]=="number"?h[1]:k+l}}return p}}}function M5(e){return Array.isArray(e)?e:typeof e=="number"?[L5,e]:e==null?p0:[e]}function Nd(e,t,n,r){let o,i,l;typeof t=="function"&&typeof n!="function"?(i=void 0,l=t,o=n):(i=t,l=n,o=r),m0(e,i,a,o);function a(s,u){const d=u[u.length-1],c=d?d.children.indexOf(s):void 0;return l(s,c,d)}}const lc={}.hasOwnProperty,N5={};function F5(e,t){const n=t||N5,r=new Map,o=new Map,i=new Map,l={...b5,...n.handlers},a={all:u,applyData:j5,definitionById:r,footnoteById:o,footnoteCounts:i,footnoteOrder:[],handlers:l,one:s,options:n,patch:D5,wrap:B5};return Nd(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const c=d.type==="definition"?r:o,f=String(d.identifier).toUpperCase();c.has(f)||c.set(f,d)}}),a;function s(d,c){const f=d.type,p=a.handlers[f];if(lc.call(a.handlers,f)&&p)return p(a,d,c);if(a.options.passThrough&&a.options.passThrough.includes(f)){if("children"in d){const{children:k,...C}=d,g=la(C);return g.children=a.all(d),g}return la(d)}return(a.options.unknownHandler||$5)(a,d,c)}function u(d){const c=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const h=a.one(f[p],d);if(h){if(p&&f[p-1].type==="break"&&(!Array.isArray(h)&&h.type==="text"&&(h.value=Xp(h.value)),!Array.isArray(h)&&h.type==="element")){const k=h.children[0];k&&k.type==="text"&&(k.value=Xp(k.value))}Array.isArray(h)?c.push(...h):c.push(h)}}}return c}}function D5(e,t){e.position&&(t.position=E2(e))}function j5(e,t){let n=t;if(e&&e.data){const r=e.data.hName,o=e.data.hChildren,i=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const l="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:l}}n.type==="element"&&i&&Object.assign(n.properties,la(i)),"children"in n&&n.children&&o!==null&&o!==void 0&&(n.children=o)}return n}function $5(e,t){const n=t.data||{},r="value"in t&&!(lc.call(n,"hProperties")||lc.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function B5(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function Xp(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Zp(e,t){const n=F5(e,t),r=n.one(e,void 0),o=P5(n),i=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return o&&i.children.push({type:"text",value:`
`},o),i}function U5(e,t){return e&&"run"in e?async function(n,r){const o=Zp(n,{file:r,...t});await e.run(o,r)}:function(n,r){return Zp(n,{file:r,...t||e})}}function Jp(e){if(e)throw e}var Cl=Object.prototype.hasOwnProperty,h0=Object.prototype.toString,em=Object.defineProperty,tm=Object.getOwnPropertyDescriptor,nm=function(t){return typeof Array.isArray=="function"?Array.isArray(t):h0.call(t)==="[object Array]"},rm=function(t){if(!t||h0.call(t)!=="[object Object]")return!1;var n=Cl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Cl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var o;for(o in t);return typeof o>"u"||Cl.call(t,o)},om=function(t,n){em&&n.name==="__proto__"?em(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},im=function(t,n){if(n==="__proto__")if(Cl.call(t,n)){if(tm)return tm(t,n).value}else return;return t[n]},H5=function e(){var t,n,r,o,i,l,a=arguments[0],s=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},s=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});s<u;++s)if(t=arguments[s],t!=null)for(n in t)r=im(a,n),o=im(t,n),a!==o&&(d&&o&&(rm(o)||(i=nm(o)))?(i?(i=!1,l=r&&nm(r)?r:[]):l=r&&rm(r)?r:{},om(a,{name:n,newValue:e(d,l,o)})):typeof o<"u"&&om(a,{name:n,newValue:o}));return a};const Ns=aa(H5);function ac(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function V5(){const e=[],t={run:n,use:r};return t;function n(...o){let i=-1;const l=o.pop();if(typeof l!="function")throw new TypeError("Expected function as last argument, not "+l);a(null,...o);function a(s,...u){const d=e[++i];let c=-1;if(s){l(s);return}for(;++c<o.length;)(u[c]===null||u[c]===void 0)&&(u[c]=o[c]);o=u,d?W5(d,a)(...u):l(null,...u)}}function r(o){if(typeof o!="function")throw new TypeError("Expected `middelware` to be a function, not "+o);return e.push(o),t}}function W5(e,t){let n;return r;function r(...l){const a=e.length>l.length;let s;a&&l.push(o);try{s=e.apply(this,l)}catch(u){const d=u;if(a&&n)throw d;return o(d)}a||(s instanceof Promise?s.then(i,o):s instanceof Error?o(s):i(s))}function o(l,...a){n||(n=!0,t(l,...a))}function i(l){o(null,l)}}const Jt={basename:K5,dirname:Q5,extname:q5,join:G5,sep:"/"};function K5(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ri(e);let n=0,r=-1,o=e.length,i;if(t===void 0||t.length===0||t.length>e.length){for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else r<0&&(i=!0,r=o+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let l=-1,a=t.length-1;for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else l<0&&(i=!0,l=o+1),a>-1&&(e.codePointAt(o)===t.codePointAt(a--)?a<0&&(r=o):(a=-1,r=l));return n===r?r=l:r<0&&(r=e.length),e.slice(n,r)}function Q5(e){if(Ri(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function q5(e){Ri(e);let t=e.length,n=-1,r=0,o=-1,i=0,l;for(;t--;){const a=e.codePointAt(t);if(a===47){if(l){r=t+1;break}continue}n<0&&(l=!0,n=t+1),a===46?o<0?o=t:i!==1&&(i=1):o>-1&&(i=-1)}return o<0||n<0||i===0||i===1&&o===n-1&&o===r+1?"":e.slice(o,n)}function G5(...e){let t=-1,n;for(;++t<e.length;)Ri(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":Y5(n)}function Y5(e){Ri(e);const t=e.codePointAt(0)===47;let n=X5(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function X5(e,t){let n="",r=0,o=-1,i=0,l=-1,a,s;for(;++l<=e.length;){if(l<e.length)a=e.codePointAt(l);else{if(a===47)break;a=47}if(a===47){if(!(o===l-1||i===1))if(o!==l-1&&i===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),o=l,i=0;continue}}else if(n.length>0){n="",r=0,o=l,i=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(o+1,l):n=e.slice(o+1,l),r=l-o-1;o=l,i=0}else a===46&&i>-1?i++:i=-1}return n}function Ri(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const Z5={cwd:J5};function J5(){return"/"}function sc(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function e3(e){if(typeof e=="string")e=new URL(e);else if(!sc(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return t3(e)}function t3(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const o=new TypeError("File URL path must not include encoded / characters");throw o.code="ERR_INVALID_FILE_URL_PATH",o}}return decodeURIComponent(t)}const Fs=["history","path","basename","stem","extname","dirname"];class g0{constructor(t){let n;t?sc(t)?n={path:t}:typeof t=="string"||n3(t)?n={value:t}:n=t:n={},this.cwd=Z5.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<Fs.length;){const i=Fs[r];i in n&&n[i]!==void 0&&n[i]!==null&&(this[i]=i==="history"?[...n[i]]:n[i])}let o;for(o in n)Fs.includes(o)||(this[o]=n[o])}get basename(){return typeof this.path=="string"?Jt.basename(this.path):void 0}set basename(t){js(t,"basename"),Ds(t,"basename"),this.path=Jt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Jt.dirname(this.path):void 0}set dirname(t){lm(this.basename,"dirname"),this.path=Jt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Jt.extname(this.path):void 0}set extname(t){if(Ds(t,"extname"),lm(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Jt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){sc(t)&&(t=e3(t)),js(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Jt.basename(this.path,this.extname):void 0}set stem(t){js(t,"stem"),Ds(t,"stem"),this.path=Jt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const o=this.message(t,n,r);throw o.fatal=!0,o}info(t,n,r){const o=this.message(t,n,r);return o.fatal=void 0,o}message(t,n,r){const o=new Je(t,n,r);return this.path&&(o.name=this.path+":"+o.name,o.file=this.path),o.fatal=!1,this.messages.push(o),o}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function Ds(e,t){if(e&&e.includes(Jt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Jt.sep+"`")}function js(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function lm(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function n3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const r3=function(e){const r=this.constructor.prototype,o=r[e],i=function(){return o.apply(i,arguments)};Object.setPrototypeOf(i,r);const l=Object.getOwnPropertyNames(o);for(const a of l){const s=Object.getOwnPropertyDescriptor(o,a);s&&Object.defineProperty(i,a,s)}return i},o3={}.hasOwnProperty;class Fd extends r3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=V5()}copy(){const t=new Fd;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(Ns(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(Us("data",this.frozen),this.namespace[t]=n,this):o3.call(this.namespace,t)&&this.namespace[t]||void 0:t?(Us("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const o=n.call(t,...r);typeof o=="function"&&this.transformers.use(o)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=rl(t),r=this.parser||this.Parser;return $s("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),$s("process",this.parser||this.Parser),Bs("process",this.compiler||this.Compiler),n?o(void 0,n):new Promise(o);function o(i,l){const a=rl(t),s=r.parse(a);r.run(s,a,function(d,c,f){if(d||!c||!f)return u(d);const p=c,h=r.stringify(p,f);a3(h)?f.value=h:f.result=h,u(d,f)});function u(d,c){d||!c?l(d):i?i(c):n(void 0,c)}}}processSync(t){let n=!1,r;return this.freeze(),$s("processSync",this.parser||this.Parser),Bs("processSync",this.compiler||this.Compiler),this.process(t,o),sm("processSync","process",n),r;function o(i,l){n=!0,Jp(i),r=l}}run(t,n,r){am(t),this.freeze();const o=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?i(void 0,r):new Promise(i);function i(l,a){const s=rl(n);o.run(t,s,u);function u(d,c,f){const p=c||t;d?a(d):l?l(p):r(void 0,p,f)}}}runSync(t,n){let r=!1,o;return this.run(t,n,i),sm("runSync","run",r),o;function i(l,a){Jp(l),o=a,r=!0}}stringify(t,n){this.freeze();const r=rl(n),o=this.compiler||this.Compiler;return Bs("stringify",o),am(t),o(t,r)}use(t,...n){const r=this.attachers,o=this.namespace;if(Us("use",this.frozen),t!=null)if(typeof t=="function")s(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):l(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function i(u){if(typeof u=="function")s(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...c]=u;s(d,c)}else l(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function l(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(o.settings=Ns(!0,o.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const c=u[d];i(c)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function s(u,d){let c=-1,f=-1;for(;++c<r.length;)if(r[c][0]===u){f=c;break}if(f===-1)r.push([u,...d]);else if(d.length>0){let[p,...h]=d;const k=r[f][1];ac(k)&&ac(p)&&(p=Ns(!0,k,p)),r[f]=[u,p,...h]}}}}const i3=new Fd().freeze();function $s(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Bs(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Us(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function am(e){if(!ac(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function sm(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function rl(e){return l3(e)?e:new g0(e)}function l3(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function a3(e){return typeof e=="string"||s3(e)}function s3(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const u3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",um=[],cm={allowDangerousHtml:!0},c3=/^(https?|ircs?|mailto|xmpp)$/i,d3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function f3(e){const t=e.allowedElements,n=e.allowElement,r=e.children||"",o=e.className,i=e.components,l=e.disallowedElements,a=e.rehypePlugins||um,s=e.remarkPlugins||um,u=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...cm}:cm,d=e.skipHtml,c=e.unwrapDisallowed,f=e.urlTransform||p3,p=i3().use(qE).use(s).use(U5,u).use(a),h=new g0;typeof r=="string"&&(h.value=r);for(const m of d3)Object.hasOwn(e,m.from)&&(""+m.from+(m.to?"use `"+m.to+"` instead":"remove it")+u3+m.id,void 0);const k=p.parse(h);let C=p.runSync(k,h);return o&&(C={type:"element",tagName:"div",properties:{className:o},children:C.type==="root"?C.children:[C]}),Nd(C,g),A2(C,{Fragment:z.Fragment,components:i,ignoreInvalidStyle:!0,jsx:z.jsx,jsxs:z.jsxs,passKeys:!0,passNode:!0});function g(m,y,S){if(m.type==="raw"&&S&&typeof y=="number")return d?S.children.splice(y,1):S.children[y]={type:"text",value:m.value},y;if(m.type==="element"){let T;for(T in Ls)if(Object.hasOwn(Ls,T)&&Object.hasOwn(m.properties,T)){const v=m.properties[T],E=Ls[T];(E===null||E.includes(m.tagName))&&(m.properties[T]=f(String(v||""),T,m))}}if(m.type==="element"){let T=t?!t.includes(m.tagName):l?l.includes(m.tagName):!1;if(!T&&n&&typeof y=="number"&&(T=!n(m,y,S)),T&&S&&typeof y=="number")return c&&m.children?S.children.splice(y,1,...m.children):S.children.splice(y,1),y}}}function p3(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),o=e.indexOf("/");return t<0||o>-1&&t>o||n>-1&&t>n||r>-1&&t>r||c3.test(e.slice(0,t))?e:""}function dm(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,o=n.indexOf(t);for(;o!==-1;)r++,o=n.indexOf(t,o+t.length);return r}function m3(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function h3(e,t,n){const o=qa((n||{}).ignore||[]),i=g3(t);let l=-1;for(;++l<i.length;)m0(e,"text",a);function a(u,d){let c=-1,f;for(;++c<d.length;){const p=d[c],h=f?f.children:void 0;if(o(p,h?h.indexOf(p):void 0,f))return;f=p}if(f)return s(u,d)}function s(u,d){const c=d[d.length-1],f=i[l][0],p=i[l][1];let h=0;const C=c.children.indexOf(u);let g=!1,m=[];f.lastIndex=0;let y=f.exec(u.value);for(;y;){const S=y.index,T={index:y.index,input:y.input,stack:[...d,u]};let v=p(...y,T);if(typeof v=="string"&&(v=v.length>0?{type:"text",value:v}:void 0),v===!1?f.lastIndex=S+1:(h!==S&&m.push({type:"text",value:u.value.slice(h,S)}),Array.isArray(v)?m.push(...v):v&&m.push(v),h=S+y[0].length,g=!0),!f.global)break;y=f.exec(u.value)}return g?(h<u.value.length&&m.push({type:"text",value:u.value.slice(h)}),c.children.splice(C,1,...m)):m=[u],C+m.length}}function g3(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const o=n[r];t.push([y3(o[0]),k3(o[1])])}return t}function y3(e){return typeof e=="string"?new RegExp(m3(e),"g"):e}function k3(e){return typeof e=="function"?e:function(){return e}}const Hs="phrasing",Vs=["autolink","link","image","label"];function w3(){return{transforms:[T3],enter:{literalAutolink:x3,literalAutolinkEmail:Ws,literalAutolinkHttp:Ws,literalAutolinkWww:Ws},exit:{literalAutolink:E3,literalAutolinkEmail:C3,literalAutolinkHttp:v3,literalAutolinkWww:S3}}}function b3(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Hs,notInConstruct:Vs},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Hs,notInConstruct:Vs},{character:":",before:"[ps]",after:"\\/",inConstruct:Hs,notInConstruct:Vs}]}}function x3(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Ws(e){this.config.enter.autolinkProtocol.call(this,e)}function v3(e){this.config.exit.autolinkProtocol.call(this,e)}function S3(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function C3(e){this.config.exit.autolinkEmail.call(this,e)}function E3(e){this.exit(e)}function T3(e){h3(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,P3],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,_3]],{ignore:["link","linkReference"]})}function P3(e,t,n,r,o){let i="";if(!y0(o)||(/^w/i.test(t)&&(n=t+n,t="",i="http://"),!R3(n)))return!1;const l=I3(n+r);if(!l[0])return!1;const a={type:"link",title:null,url:i+t+l[0],children:[{type:"text",value:t+l[0]}]};return l[1]?[a,{type:"text",value:l[1]}]:a}function _3(e,t,n,r){return!y0(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function R3(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function I3(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const o=dm(e,"(");let i=dm(e,")");for(;r!==-1&&o>i;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),i++;return[e,n]}function y0(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||pr(n)||Wa(n))&&(!t||n!==47)}k0.peek=B3;function A3(){return{enter:{gfmFootnoteDefinition:L3,gfmFootnoteDefinitionLabelString:z3,gfmFootnoteCall:F3,gfmFootnoteCallString:D3},exit:{gfmFootnoteDefinition:N3,gfmFootnoteDefinitionLabelString:M3,gfmFootnoteCall:$3,gfmFootnoteCallString:j3}}}function O3(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:U3,footnoteReference:k0}}}function L3(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function z3(){this.buffer()}function M3(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function N3(e){this.exit(e)}function F3(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function D3(){this.buffer()}function j3(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function $3(e){this.exit(e)}function k0(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteReference"),a=n.enter("reference");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),l(),i+=o.move("]"),i}function B3(){return"["}function U3(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteDefinition"),a=n.enter("label");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),i+=o.move("]:"+(e.children&&e.children.length>0?" ":"")),o.shift(4),i+=o.move(n.indentLines(n.containerFlow(e,o.current()),H3)),l(),i}function H3(e,t,n){return t===0?e:(n?"":"    ")+e}const V3=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];w0.peek=G3;function W3(){return{canContainEols:["delete"],enter:{strikethrough:Q3},exit:{strikethrough:q3}}}function K3(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:V3}],handlers:{delete:w0}}}function Q3(e){this.enter({type:"delete",children:[]},e)}function q3(e){this.exit(e)}function w0(e,t,n,r){const o=n.createTracker(r),i=n.enter("strikethrough");let l=o.move("~~");return l+=n.containerPhrasing(e,{...o.current(),before:l,after:"~"}),l+=o.move("~~"),i(),l}function G3(){return"~"}function Y3(e,t={}){const n=(t.align||[]).concat(),r=t.stringLength||Z3,o=[],i=[],l=[],a=[];let s=0,u=-1;for(;++u<e.length;){const h=[],k=[];let C=-1;for(e[u].length>s&&(s=e[u].length);++C<e[u].length;){const g=X3(e[u][C]);if(t.alignDelimiters!==!1){const m=r(g);k[C]=m,(a[C]===void 0||m>a[C])&&(a[C]=m)}h.push(g)}i[u]=h,l[u]=k}let d=-1;if(typeof n=="object"&&"length"in n)for(;++d<s;)o[d]=fm(n[d]);else{const h=fm(n);for(;++d<s;)o[d]=h}d=-1;const c=[],f=[];for(;++d<s;){const h=o[d];let k="",C="";h===99?(k=":",C=":"):h===108?k=":":h===114&&(C=":");let g=t.alignDelimiters===!1?1:Math.max(1,a[d]-k.length-C.length);const m=k+"-".repeat(g)+C;t.alignDelimiters!==!1&&(g=k.length+g+C.length,g>a[d]&&(a[d]=g),f[d]=g),c[d]=m}i.splice(1,0,c),l.splice(1,0,f),u=-1;const p=[];for(;++u<i.length;){const h=i[u],k=l[u];d=-1;const C=[];for(;++d<s;){const g=h[d]||"";let m="",y="";if(t.alignDelimiters!==!1){const S=a[d]-(k[d]||0),T=o[d];T===114?m=" ".repeat(S):T===99?S%2?(m=" ".repeat(S/2+.5),y=" ".repeat(S/2-.5)):(m=" ".repeat(S/2),y=m):y=" ".repeat(S)}t.delimiterStart!==!1&&!d&&C.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&g==="")&&(t.delimiterStart!==!1||d)&&C.push(" "),t.alignDelimiters!==!1&&C.push(m),C.push(g),t.alignDelimiters!==!1&&C.push(y),t.padding!==!1&&C.push(" "),(t.delimiterEnd!==!1||d!==s-1)&&C.push("|")}p.push(t.delimiterEnd===!1?C.join("").replace(/ +$/,""):C.join(""))}return p.join(`
`)}function X3(e){return e==null?"":String(e)}function Z3(e){return e.length}function fm(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function J3(e,t,n,r){const o=n.enter("blockquote"),i=n.createTracker(r);i.move("> "),i.shift(2);const l=n.indentLines(n.containerFlow(e,i.current()),e4);return o(),l}function e4(e,t,n){return">"+(n?"":" ")+e}function t4(e,t){return pm(e,t.inConstruct,!0)&&!pm(e,t.notInConstruct,!1)}function pm(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function mm(e,t,n,r){let o=-1;for(;++o<n.unsafe.length;)if(n.unsafe[o].character===`
`&&t4(n.stack,n.unsafe[o]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function b0(e,t){const n=String(e);let r=n.indexOf(t),o=r,i=0,l=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===o?++i>l&&(l=i):i=1,o=r+t.length,r=n.indexOf(t,o);return l}function n4(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function r4(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function o4(e,t,n,r){const o=r4(n),i=e.value||"",l=o==="`"?"GraveAccent":"Tilde";if(n4(e,n)){const c=n.enter("codeIndented"),f=n.indentLines(i,i4);return c(),f}const a=n.createTracker(r),s=o.repeat(Math.max(b0(i,o)+1,3)),u=n.enter("codeFenced");let d=a.move(s);if(e.lang){const c=n.enter(`codeFencedLang${l}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),c()}if(e.lang&&e.meta){const c=n.enter(`codeFencedMeta${l}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),c()}return d+=a.move(`
`),i&&(d+=a.move(i+`
`)),d+=a.move(s),u(),d}function i4(e,t,n){return(n?"":"    ")+e}function Dd(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function l4(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("definition");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("[");return u+=s.move(n.safe(n.associationId(e),{before:u,after:"]",...s.current()})),u+=s.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),l(),u}function a4(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}x0.peek=s4;function x0(e,t,n,r){const o=a4(n),i=n.enter("emphasis"),l=n.createTracker(r);let a=l.move(o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o),i(),a}function s4(e,t,n){return n.options.emphasis||"*"}function u4(e,t){let n=!1;return Nd(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,ic}),!!((!e.depth||e.depth<3)&&Rd(e)&&(t.options.setext||n))}function c4(e,t,n,r){const o=Math.max(Math.min(6,e.depth||1),1),i=n.createTracker(r);if(u4(e,n)){const d=n.enter("headingSetext"),c=n.enter("phrasing"),f=n.containerPhrasing(e,{...i.current(),before:`
`,after:`
`});return c(),d(),f+`
`+(o===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const l="#".repeat(o),a=n.enter("headingAtx"),s=n.enter("phrasing");i.move(l+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...i.current()});return/^[\t ]/.test(u)&&(u="&#x"+u.charCodeAt(0).toString(16).toUpperCase()+";"+u.slice(1)),u=u?l+" "+u:l,n.options.closeAtx&&(u+=" "+l),s(),a(),u}v0.peek=d4;function v0(e){return e.value||""}function d4(){return"<"}S0.peek=f4;function S0(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("image");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("![");return u+=s.move(n.safe(e.alt,{before:u,after:"]",...s.current()})),u+=s.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),u+=s.move(")"),l(),u}function f4(){return"!"}C0.peek=p4;function C0(e,t,n,r){const o=e.referenceType,i=n.enter("imageReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("![");const u=n.safe(e.alt,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function p4(){return"!"}E0.peek=m4;function E0(e,t,n){let r=e.value||"",o="`",i=-1;for(;new RegExp("(^|[^`])"+o+"([^`]|$)").test(r);)o+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++i<n.unsafe.length;){const l=n.unsafe[i],a=n.compilePattern(l);let s;if(l.atBreak)for(;s=a.exec(r);){let u=s.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(s.index+1)}}return o+r+o}function m4(){return"`"}function T0(e,t){const n=Rd(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}P0.peek=h4;function P0(e,t,n,r){const o=Dd(n),i=o==='"'?"Quote":"Apostrophe",l=n.createTracker(r);let a,s;if(T0(e,n)){const d=n.stack;n.stack=[],a=n.enter("autolink");let c=l.move("<");return c+=l.move(n.containerPhrasing(e,{before:c,after:">",...l.current()})),c+=l.move(">"),a(),n.stack=d,c}a=n.enter("link"),s=n.enter("label");let u=l.move("[");return u+=l.move(n.containerPhrasing(e,{before:u,after:"](",...l.current()})),u+=l.move("]("),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(s=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":")",...l.current()}))),s(),e.title&&(s=n.enter(`title${i}`),u+=l.move(" "+o),u+=l.move(n.safe(e.title,{before:u,after:o,...l.current()})),u+=l.move(o),s()),u+=l.move(")"),a(),u}function h4(e,t,n){return T0(e,n)?"<":"["}_0.peek=g4;function _0(e,t,n,r){const o=e.referenceType,i=n.enter("linkReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("[");const u=n.containerPhrasing(e,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function g4(){return"["}function jd(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function y4(e){const t=jd(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function k4(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function R0(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function w4(e,t,n,r){const o=n.enter("list"),i=n.bulletCurrent;let l=e.ordered?k4(n):jd(n);const a=e.ordered?l==="."?")":".":y4(n);let s=t&&n.bulletLastUsed?l===n.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((l==="*"||l==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(s=!0),R0(n)===l&&d){let c=-1;for(;++c<e.children.length;){const f=e.children[c];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){s=!0;break}}}}s&&(l=a),n.bulletCurrent=l;const u=n.containerFlow(e,r);return n.bulletLastUsed=l,n.bulletCurrent=i,o(),u}function b4(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function x4(e,t,n,r){const o=b4(n);let i=n.bulletCurrent||jd(n);t&&t.type==="list"&&t.ordered&&(i=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+i);let l=i.length+1;(o==="tab"||o==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(l=Math.ceil(l/4)*4);const a=n.createTracker(r);a.move(i+" ".repeat(l-i.length)),a.shift(l);const s=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,a.current()),d);return s(),u;function d(c,f,p){return f?(p?"":" ".repeat(l))+c:(p?i:i+" ".repeat(l-i.length))+c}}function v4(e,t,n,r){const o=n.enter("paragraph"),i=n.enter("phrasing"),l=n.containerPhrasing(e,r);return i(),o(),l}const S4=qa(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","link","linkReference","strong","text"]);function C4(e,t,n,r){return(e.children.some(function(l){return S4(l)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function E4(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}I0.peek=T4;function I0(e,t,n,r){const o=E4(n),i=n.enter("strong"),l=n.createTracker(r);let a=l.move(o+o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o+o),i(),a}function T4(e,t,n){return n.options.strong||"*"}function P4(e,t,n,r){return n.safe(e.value,r)}function _4(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function R4(e,t,n){const r=(R0(n)+(n.options.ruleSpaces?" ":"")).repeat(_4(n));return n.options.ruleSpaces?r.slice(0,-1):r}const A0={blockquote:J3,break:mm,code:o4,definition:l4,emphasis:x0,hardBreak:mm,heading:c4,html:v0,image:S0,imageReference:C0,inlineCode:E0,link:P0,linkReference:_0,list:w4,listItem:x4,paragraph:v4,root:C4,strong:I0,text:P4,thematicBreak:R4};function I4(){return{enter:{table:A4,tableData:hm,tableHeader:hm,tableRow:L4},exit:{codeText:z4,table:O4,tableData:Ks,tableHeader:Ks,tableRow:Ks}}}function A4(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function O4(e){this.exit(e),this.data.inTable=void 0}function L4(e){this.enter({type:"tableRow",children:[]},e)}function Ks(e){this.exit(e)}function hm(e){this.enter({type:"tableCell",children:[]},e)}function z4(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,M4));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function M4(e,t){return t==="|"?t:e}function N4(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,o=t.stringLength,i=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:l,tableCell:s,tableRow:a}};function l(p,h,k,C){return u(d(p,k,C),p.align)}function a(p,h,k,C){const g=c(p,k,C),m=u([g]);return m.slice(0,m.indexOf(`
`))}function s(p,h,k,C){const g=k.enter("tableCell"),m=k.enter("phrasing"),y=k.containerPhrasing(p,{...C,before:i,after:i});return m(),g(),y}function u(p,h){return Y3(p,{align:h,alignDelimiters:r,padding:n,stringLength:o})}function d(p,h,k){const C=p.children;let g=-1;const m=[],y=h.enter("table");for(;++g<C.length;)m[g]=c(C[g],h,k);return y(),m}function c(p,h,k){const C=p.children;let g=-1;const m=[],y=h.enter("tableRow");for(;++g<C.length;)m[g]=s(C[g],p,h,k);return y(),m}function f(p,h,k){let C=A0.inlineCode(p,h,k);return k.stack.includes("tableCell")&&(C=C.replace(/\|/g,"\\$&")),C}}function F4(){return{exit:{taskListCheckValueChecked:gm,taskListCheckValueUnchecked:gm,paragraph:j4}}}function D4(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:$4}}}function gm(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function j4(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const o=t.children;let i=-1,l;for(;++i<o.length;){const a=o[i];if(a.type==="paragraph"){l=a;break}}l===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function $4(e,t,n,r){const o=e.children[0],i=typeof e.checked=="boolean"&&o&&o.type==="paragraph",l="["+(e.checked?"x":" ")+"] ",a=n.createTracker(r);i&&a.move(l);let s=A0.listItem(e,t,n,{...r,...a.current()});return i&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),s;function u(d){return d+l}}function B4(){return[w3(),A3(),W3(),I4(),F4()]}function U4(e){return{extensions:[b3(),O3(),K3(),N4(e),D4()]}}const H4={tokenize:G4,partial:!0},O0={tokenize:Y4,partial:!0},L0={tokenize:X4,partial:!0},z0={tokenize:Z4,partial:!0},V4={tokenize:J4,partial:!0},M0={tokenize:Q4,previous:F0},N0={tokenize:q4,previous:D0},Sn={tokenize:K4,previous:j0},an={};function W4(){return{text:an}}let Zn=48;for(;Zn<123;)an[Zn]=Sn,Zn++,Zn===58?Zn=65:Zn===91&&(Zn=97);an[43]=Sn;an[45]=Sn;an[46]=Sn;an[95]=Sn;an[72]=[Sn,N0];an[104]=[Sn,N0];an[87]=[Sn,M0];an[119]=[Sn,M0];function K4(e,t,n){const r=this;let o,i;return l;function l(c){return!uc(c)||!j0.call(r,r.previous)||$d(r.events)?n(c):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(c))}function a(c){return uc(c)?(e.consume(c),a):c===64?(e.consume(c),s):n(c)}function s(c){return c===46?e.check(V4,d,u)(c):c===45||c===95||Xe(c)?(i=!0,e.consume(c),s):d(c)}function u(c){return e.consume(c),o=!0,s}function d(c){return i&&o&&tt(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(c)):n(c)}}function Q4(e,t,n){const r=this;return o;function o(l){return l!==87&&l!==119||!F0.call(r,r.previous)||$d(r.events)?n(l):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(H4,e.attempt(O0,e.attempt(L0,i),n),n)(l))}function i(l){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(l)}}function q4(e,t,n){const r=this;let o="",i=!1;return l;function l(c){return(c===72||c===104)&&D0.call(r,r.previous)&&!$d(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),o+=String.fromCodePoint(c),e.consume(c),a):n(c)}function a(c){if(tt(c)&&o.length<5)return o+=String.fromCodePoint(c),e.consume(c),a;if(c===58){const f=o.toLowerCase();if(f==="http"||f==="https")return e.consume(c),s}return n(c)}function s(c){return c===47?(e.consume(c),i?u:(i=!0,s)):n(c)}function u(c){return c===null||na(c)||pe(c)||pr(c)||Wa(c)?n(c):e.attempt(O0,e.attempt(L0,d),n)(c)}function d(c){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(c)}}function G4(e,t,n){let r=0;return o;function o(l){return(l===87||l===119)&&r<3?(r++,e.consume(l),o):l===46&&r===3?(e.consume(l),i):n(l)}function i(l){return l===null?n(l):t(l)}}function Y4(e,t,n){let r,o,i;return l;function l(u){return u===46||u===95?e.check(z0,s,a)(u):u===null||pe(u)||pr(u)||u!==45&&Wa(u)?s(u):(i=!0,e.consume(u),l)}function a(u){return u===95?r=!0:(o=r,r=void 0),e.consume(u),l}function s(u){return o||r||!i?n(u):t(u)}}function X4(e,t){let n=0,r=0;return o;function o(l){return l===40?(n++,e.consume(l),o):l===41&&r<n?i(l):l===33||l===34||l===38||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===60||l===63||l===93||l===95||l===126?e.check(z0,t,i)(l):l===null||pe(l)||pr(l)?t(l):(e.consume(l),o)}function i(l){return l===41&&r++,e.consume(l),o}}function Z4(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),i):a===93?(e.consume(a),o):a===60||a===null||pe(a)||pr(a)?t(a):n(a)}function o(a){return a===null||a===40||a===91||pe(a)||pr(a)?t(a):r(a)}function i(a){return tt(a)?l(a):n(a)}function l(a){return a===59?(e.consume(a),r):tt(a)?(e.consume(a),l):n(a)}}function J4(e,t,n){return r;function r(i){return e.consume(i),o}function o(i){return Xe(i)?n(i):t(i)}}function F0(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||pe(e)}function D0(e){return!tt(e)}function j0(e){return!(e===47||uc(e))}function uc(e){return e===43||e===45||e===46||e===95||Xe(e)}function $d(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const eT={tokenize:sT,partial:!0};function tT(){return{document:{91:{tokenize:iT,continuation:{tokenize:lT},exit:aT}},text:{91:{tokenize:oT},93:{add:"after",tokenize:nT,resolveTo:rT}}}}function nT(e,t,n){const r=this;let o=r.events.length;const i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let l;for(;o--;){const s=r.events[o][1];if(s.type==="labelImage"){l=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!l||!l._balanced)return n(s);const u=Gt(r.sliceSerialize({start:l.end,end:r.now()}));return u.codePointAt(0)!==94||!i.includes(u.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function rT(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},o={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};o.end.column++,o.end.offset++,o.end._bufferIndex++;const i={type:"gfmFootnoteCallString",start:Object.assign({},o.end),end:Object.assign({},e[e.length-1][1].start)},l={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",o,t],["exit",o,t],["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function oT(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i=0,l;return a;function a(c){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),s}function s(c){return c!==94?n(c):(e.enter("gfmFootnoteCallMarker"),e.consume(c),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(c){if(i>999||c===93&&!l||c===null||c===91||pe(c))return n(c);if(c===93){e.exit("chunkString");const f=e.exit("gfmFootnoteCallString");return o.includes(Gt(r.sliceSerialize(f)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(c)}return pe(c)||(l=!0),i++,e.consume(c),c===92?d:u}function d(c){return c===91||c===92||c===93?(e.consume(c),i++,u):u(c)}}function iT(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i,l=0,a;return s;function s(h){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(h){return h===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(h)}function d(h){if(l>999||h===93&&!a||h===null||h===91||pe(h))return n(h);if(h===93){e.exit("chunkString");const k=e.exit("gfmFootnoteDefinitionLabelString");return i=Gt(r.sliceSerialize(k)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),f}return pe(h)||(a=!0),l++,e.consume(h),h===92?c:d}function c(h){return h===91||h===92||h===93?(e.consume(h),l++,d):d(h)}function f(h){return h===58?(e.enter("definitionMarker"),e.consume(h),e.exit("definitionMarker"),o.includes(i)||o.push(i),Z(e,p,"gfmFootnoteDefinitionWhitespace")):n(h)}function p(h){return t(h)}}function lT(e,t,n){return e.check(_i,t,e.attempt(eT,t,n))}function aT(e){e.exit("gfmFootnoteDefinition")}function sT(e,t,n){const r=this;return Z(e,o,"gfmFootnoteDefinitionIndent",5);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="gfmFootnoteDefinitionIndent"&&l[2].sliceSerialize(l[1],!0).length===4?t(i):n(i)}}function uT(e){let n=(e||{}).singleTilde;const r={tokenize:i,resolveAll:o};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function o(l,a){let s=-1;for(;++s<l.length;)if(l[s][0]==="enter"&&l[s][1].type==="strikethroughSequenceTemporary"&&l[s][1]._close){let u=s;for(;u--;)if(l[u][0]==="exit"&&l[u][1].type==="strikethroughSequenceTemporary"&&l[u][1]._open&&l[s][1].end.offset-l[s][1].start.offset===l[u][1].end.offset-l[u][1].start.offset){l[s][1].type="strikethroughSequence",l[u][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},l[u][1].start),end:Object.assign({},l[s][1].end)},c={type:"strikethroughText",start:Object.assign({},l[u][1].end),end:Object.assign({},l[s][1].start)},f=[["enter",d,a],["enter",l[u][1],a],["exit",l[u][1],a],["enter",c,a]],p=a.parser.constructs.insideSpan.null;p&&St(f,f.length,0,Ka(p,l.slice(u+1,s),a)),St(f,f.length,0,[["exit",c,a],["enter",l[s][1],a],["exit",l[s][1],a],["exit",d,a]]),St(l,u-1,s-u+3,f),s=u+f.length-2;break}}for(s=-1;++s<l.length;)l[s][1].type==="strikethroughSequenceTemporary"&&(l[s][1].type="data");return l}function i(l,a,s){const u=this.previous,d=this.events;let c=0;return f;function f(h){return u===126&&d[d.length-1][1].type!=="characterEscape"?s(h):(l.enter("strikethroughSequenceTemporary"),p(h))}function p(h){const k=ra(u);if(h===126)return c>1?s(h):(l.consume(h),c++,p);if(c<2&&!n)return s(h);const C=l.exit("strikethroughSequenceTemporary"),g=ra(h);return C._open=!g||g===2&&!!k,C._close=!k||k===2&&!!g,a(h)}}}class cT{constructor(){this.map=[]}add(t,n,r){dT(this,t,n,r)}consume(t){if(this.map.sort(function(i,l){return i[0]-l[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push([...t]),t.length=0;let o=r.pop();for(;o;)t.push(...o),o=r.pop();this.map.length=0}}function dT(e,t,n,r){let o=0;if(!(n===0&&r.length===0)){for(;o<e.map.length;){if(e.map[o][0]===t){e.map[o][1]+=n,e.map[o][2].push(...r);return}o+=1}e.map.push([t,n,r])}}function fT(e,t){let n=!1;const r=[];for(;t<e.length;){const o=e[t];if(n){if(o[0]==="enter")o[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(o[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const i=r.length-1;r[i]=r[i]==="left"?"center":"right"}}else if(o[1].type==="tableDelimiterRow")break}else o[0]==="enter"&&o[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function pT(){return{flow:{null:{tokenize:mT,resolveAll:hT}}}}function mT(e,t,n){const r=this;let o=0,i=0,l;return a;function a(b){let A=r.events.length-1;for(;A>-1;){const V=r.events[A][1].type;if(V==="lineEnding"||V==="linePrefix")A--;else break}const L=A>-1?r.events[A][1].type:null,B=L==="tableHead"||L==="tableRow"?v:s;return B===v&&r.parser.lazy[r.now().line]?n(b):B(b)}function s(b){return e.enter("tableHead"),e.enter("tableRow"),u(b)}function u(b){return b===124||(l=!0,i+=1),d(b)}function d(b){return b===null?n(b):K(b)?i>1?(i=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),p):n(b):J(b)?Z(e,d,"whitespace")(b):(i+=1,l&&(l=!1,o+=1),b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),l=!0,d):(e.enter("data"),c(b)))}function c(b){return b===null||b===124||pe(b)?(e.exit("data"),d(b)):(e.consume(b),b===92?f:c)}function f(b){return b===92||b===124?(e.consume(b),c):c(b)}function p(b){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(b):(e.enter("tableDelimiterRow"),l=!1,J(b)?Z(e,h,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(b):h(b))}function h(b){return b===45||b===58?C(b):b===124?(l=!0,e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),k):T(b)}function k(b){return J(b)?Z(e,C,"whitespace")(b):C(b)}function C(b){return b===58?(i+=1,l=!0,e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),g):b===45?(i+=1,g(b)):b===null||K(b)?S(b):T(b)}function g(b){return b===45?(e.enter("tableDelimiterFiller"),m(b)):T(b)}function m(b){return b===45?(e.consume(b),m):b===58?(l=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),y):(e.exit("tableDelimiterFiller"),y(b))}function y(b){return J(b)?Z(e,S,"whitespace")(b):S(b)}function S(b){return b===124?h(b):b===null||K(b)?!l||o!==i?T(b):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(b)):T(b)}function T(b){return n(b)}function v(b){return e.enter("tableRow"),E(b)}function E(b){return b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),E):b===null||K(b)?(e.exit("tableRow"),t(b)):J(b)?Z(e,E,"whitespace")(b):(e.enter("data"),_(b))}function _(b){return b===null||b===124||pe(b)?(e.exit("data"),E(b)):(e.consume(b),b===92?N:_)}function N(b){return b===92||b===124?(e.consume(b),_):_(b)}}function hT(e,t){let n=-1,r=!0,o=0,i=[0,0,0,0],l=[0,0,0,0],a=!1,s=0,u,d,c;const f=new cT;for(;++n<e.length;){const p=e[n],h=p[1];p[0]==="enter"?h.type==="tableHead"?(a=!1,s!==0&&(ym(f,t,s,u,d),d=void 0,s=0),u={type:"table",start:Object.assign({},h.start),end:Object.assign({},h.end)},f.add(n,0,[["enter",u,t]])):h.type==="tableRow"||h.type==="tableDelimiterRow"?(r=!0,c=void 0,i=[0,0,0,0],l=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},h.start),end:Object.assign({},h.end)},f.add(n,0,[["enter",d,t]])),o=h.type==="tableDelimiterRow"?2:d?3:1):o&&(h.type==="data"||h.type==="tableDelimiterMarker"||h.type==="tableDelimiterFiller")?(r=!1,l[2]===0&&(i[1]!==0&&(l[0]=l[1],c=ol(f,t,i,o,void 0,c),i=[0,0,0,0]),l[2]=n)):h.type==="tableCellDivider"&&(r?r=!1:(i[1]!==0&&(l[0]=l[1],c=ol(f,t,i,o,void 0,c)),i=l,l=[i[1],n,0,0])):h.type==="tableHead"?(a=!0,s=n):h.type==="tableRow"||h.type==="tableDelimiterRow"?(s=n,i[1]!==0?(l[0]=l[1],c=ol(f,t,i,o,n,c)):l[1]!==0&&(c=ol(f,t,l,o,n,c)),o=0):o&&(h.type==="data"||h.type==="tableDelimiterMarker"||h.type==="tableDelimiterFiller")&&(l[3]=n)}for(s!==0&&ym(f,t,s,u,d),f.consume(t.events),n=-1;++n<t.events.length;){const p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=fT(t.events,n))}return e}function ol(e,t,n,r,o,i){const l=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(i.end=Object.assign({},Sr(t.events,n[0])),e.add(n[0],0,[["exit",i,t]]));const s=Sr(t.events,n[1]);if(i={type:l,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",i,t]]),n[2]!==0){const u=Sr(t.events,n[2]),d=Sr(t.events,n[3]),c={type:a,start:Object.assign({},u),end:Object.assign({},d)};if(e.add(n[2],0,[["enter",c,t]]),r!==2){const f=t.events[n[2]],p=t.events[n[3]];if(f[1].end=Object.assign({},p[1].end),f[1].type="chunkText",f[1].contentType="text",n[3]>n[2]+1){const h=n[2]+1,k=n[3]-n[2]-1;e.add(h,k,[])}}e.add(n[3]+1,0,[["exit",c,t]])}return o!==void 0&&(i.end=Object.assign({},Sr(t.events,o)),e.add(o,0,[["exit",i,t]]),i=void 0),i}function ym(e,t,n,r,o){const i=[],l=Sr(t.events,n);o&&(o.end=Object.assign({},l),i.push(["exit",o,t])),r.end=Object.assign({},l),i.push(["exit",r,t]),e.add(n+1,0,i)}function Sr(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const gT={tokenize:kT};function yT(){return{text:{91:gT}}}function kT(e,t,n){const r=this;return o;function o(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),i)}function i(s){return pe(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),l):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),l):n(s)}function l(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return K(s)?t(s):J(s)?e.check({tokenize:wT},t,n)(s):n(s)}}function wT(e,t,n){return Z(e,r,"whitespace");function r(o){return o===null?n(o):t(o)}}function bT(e){return qy([W4(),tT(),uT(e),pT(),yT()])}const xT={};function vT(e){const t=this,n=e||xT,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(bT(n)),i.push(B4()),l.push(U4(n))}function ST(){return{enter:{mathFlow:e,mathFlowFenceMeta:t,mathText:i},exit:{mathFlow:o,mathFlowFence:r,mathFlowFenceMeta:n,mathFlowValue:a,mathText:l,mathTextData:a}};function e(s){const u={type:"element",tagName:"code",properties:{className:["language-math","math-display"]},children:[]};this.enter({type:"math",meta:null,value:"",data:{hName:"pre",hChildren:[u]}},s)}function t(){this.buffer()}function n(){const s=this.resume(),u=this.stack[this.stack.length-1];u.type,u.meta=s}function r(){this.data.mathFlowInside||(this.buffer(),this.data.mathFlowInside=!0)}function o(s){const u=this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u;const c=d.data.hChildren[0];c.type,c.tagName,c.children.push({type:"text",value:u}),this.data.mathFlowInside=void 0}function i(s){this.enter({type:"inlineMath",value:"",data:{hName:"code",hProperties:{className:["language-math","math-inline"]},hChildren:[]}},s),this.buffer()}function l(s){const u=this.resume(),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u,d.data.hChildren.push({type:"text",value:u})}function a(s){this.config.enter.data.call(this,s),this.config.exit.data.call(this,s)}}function CT(e){let t=(e||{}).singleDollarTextMath;return t==null&&(t=!0),r.peek=o,{unsafe:[{character:"\r",inConstruct:"mathFlowMeta"},{character:`
`,inConstruct:"mathFlowMeta"},{character:"$",after:t?void 0:"\\$",inConstruct:"phrasing"},{character:"$",inConstruct:"mathFlowMeta"},{atBreak:!0,character:"$",after:"\\$"}],handlers:{math:n,inlineMath:r}};function n(i,l,a,s){const u=i.value||"",d=a.createTracker(s),c="$".repeat(Math.max(b0(u,"$")+1,2)),f=a.enter("mathFlow");let p=d.move(c);if(i.meta){const h=a.enter("mathFlowMeta");p+=d.move(a.safe(i.meta,{after:`
`,before:p,encode:["$"],...d.current()})),h()}return p+=d.move(`
`),u&&(p+=d.move(u+`
`)),p+=d.move(c),f(),p}function r(i,l,a){let s=i.value||"",u=1;for(t||u++;new RegExp("(^|[^$])"+"\\$".repeat(u)+"([^$]|$)").test(s);)u++;const d="$".repeat(u);/[^ \r\n]/.test(s)&&(/^[ \r\n]/.test(s)&&/[ \r\n]$/.test(s)||/^\$|\$$/.test(s))&&(s=" "+s+" ");let c=-1;for(;++c<a.unsafe.length;){const f=a.unsafe[c];if(!f.atBreak)continue;const p=a.compilePattern(f);let h;for(;h=p.exec(s);){let k=h.index;s.codePointAt(k)===10&&s.codePointAt(k-1)===13&&k--,s=s.slice(0,k)+" "+s.slice(h.index+1)}}return d+s+d}function o(){return"$"}}function nr(e){return e!==null&&e<-2}const ET={tokenize:TT,concrete:!0},km={tokenize:PT,partial:!0};function TT(e,t,n){const r=this,o=r.events[r.events.length-1],i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0;let l=0;return a;function a(m){return e.enter("mathFlow"),e.enter("mathFlowFence"),e.enter("mathFlowFenceSequence"),s(m)}function s(m){return m===36?(e.consume(m),l++,s):l<2?n(m):(e.exit("mathFlowFenceSequence"),Z(e,u,"whitespace")(m))}function u(m){return m===null||nr(m)?c(m):(e.enter("mathFlowFenceMeta"),e.enter("chunkString",{contentType:"string"}),d(m))}function d(m){return m===null||nr(m)?(e.exit("chunkString"),e.exit("mathFlowFenceMeta"),c(m)):m===36?n(m):(e.consume(m),d)}function c(m){return e.exit("mathFlowFence"),r.interrupt?t(m):e.attempt(km,f,C)(m)}function f(m){return e.attempt({tokenize:g,partial:!0},C,p)(m)}function p(m){return(i?Z(e,h,"linePrefix",i+1):h)(m)}function h(m){return m===null?C(m):nr(m)?e.attempt(km,f,C)(m):(e.enter("mathFlowValue"),k(m))}function k(m){return m===null||nr(m)?(e.exit("mathFlowValue"),h(m)):(e.consume(m),k)}function C(m){return e.exit("mathFlow"),t(m)}function g(m,y,S){let T=0;return Z(m,v,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4);function v(N){return m.enter("mathFlowFence"),m.enter("mathFlowFenceSequence"),E(N)}function E(N){return N===36?(T++,m.consume(N),E):T<l?S(N):(m.exit("mathFlowFenceSequence"),Z(m,_,"whitespace")(N))}function _(N){return N===null||nr(N)?(m.exit("mathFlowFence"),y(N)):S(N)}}}function PT(e,t,n){const r=this;return o;function o(l){return l===null?t(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function _T(e){let n=(e||{}).singleDollarTextMath;return n==null&&(n=!0),{tokenize:r,resolve:RT,previous:IT};function r(o,i,l){let a=0,s,u;return d;function d(k){return o.enter("mathText"),o.enter("mathTextSequence"),c(k)}function c(k){return k===36?(o.consume(k),a++,c):a<2&&!n?l(k):(o.exit("mathTextSequence"),f(k))}function f(k){return k===null?l(k):k===36?(u=o.enter("mathTextSequence"),s=0,h(k)):k===32?(o.enter("space"),o.consume(k),o.exit("space"),f):nr(k)?(o.enter("lineEnding"),o.consume(k),o.exit("lineEnding"),f):(o.enter("mathTextData"),p(k))}function p(k){return k===null||k===32||k===36||nr(k)?(o.exit("mathTextData"),f(k)):(o.consume(k),p)}function h(k){return k===36?(o.consume(k),s++,h):s===a?(o.exit("mathTextSequence"),o.exit("mathText"),i(k)):(u.type="mathTextData",p(k))}}}function RT(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="mathTextData"){e[t][1].type="mathTextPadding",e[n][1].type="mathTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="mathTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function IT(e){return e!==36||this.events[this.events.length-1][1].type==="characterEscape"}function AT(e){return{flow:{36:ET},text:{36:_T(e)}}}const OT={};function LT(e){const t=this,n=e||OT,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(AT(n)),i.push(ST()),l.push(CT(n))}const zT=P.memo(f3,(e,t)=>e.children===t.children&&e.className===t.className),MT=e=>z.jsx(z.Fragment,{children:z.jsx(zT,{className:"markdown-body",remarkPlugins:[vT,LT],components:{a(t){return z.jsx("a",{...t,target:"_blank",rel:"noopener noreferrer",children:t.children})}},children:e.children})}),NT=ke({"hljs-comment":{color:"#696969"},"hljs-quote":{color:"#696969"},"hljs-variable":{color:"#d91e18"},"hljs-template-variable":{color:"#d91e18"},"hljs-tag":{color:"#d91e18"},"hljs-name":{color:"#d91e18"},"hljs-selector-id":{color:"#d91e18"},"hljs-selector-class":{color:"#d91e18"},"hljs-regexp":{color:"#d91e18"},"hljs-deletion":{color:"#d91e18"},"hljs-number":{color:"#aa5d00"},"hljs-built_in":{color:"#aa5d00"},"hljs-builtin-name":{color:"#aa5d00"},"hljs-literal":{color:"#aa5d00"},"hljs-type":{color:"#aa5d00"},"hljs-params":{color:"#aa5d00"},"hljs-meta":{color:"#aa5d00"},"hljs-link":{color:"#aa5d00"},"hljs-attribute":{color:"#aa5d00"},"hljs-string":{color:"#008000"},"hljs-symbol":{color:"#008000"},"hljs-bullet":{color:"#008000"},"hljs-addition":{color:"#008000"},"hljs-title":{color:"#007faa"},"hljs-section":{color:"#007faa"},"hljs-keyword":{color:"#7928a1"},"hljs-selector-tag":{color:"#7928a1"},hljs:{display:"block",overflowX:"auto",background:"#fefefe",color:"#545454",padding:"0.5em"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"}}),FT=ke({"& .hljs-comment":{color:"#d4d0ab"},"& .hljs-quote":{color:"#d4d0ab"},"& .hljs-variable":{color:"#ffa07a"},"& .hljs-template-variable":{color:"#ffa07a"},"& .hljs-tag":{color:"#ffa07a"},"& .hljs-name":{color:"#ffa07a"},"& .hljs-selector-id":{color:"#ffa07a"},"& .hljs-selector-class":{color:"#ffa07a"},"& .hljs-regexp":{color:"#ffa07a"},"& .hljs-deletion":{color:"#ffa07a"},"& .hljs-number":{color:"#f5ab35"},"& .hljs-built_in":{color:"#f5ab35"},"& .hljs-builtin-name":{color:"#f5ab35"},"& .hljs-literal":{color:"#f5ab35"},"& .hljs-type":{color:"#f5ab35"},"& .hljs-params":{color:"#f5ab35"},"& .hljs-meta":{color:"#f5ab35"},"& .hljs-link":{color:"#f5ab35"},"& .hljs-attribute":{color:"#ffd700"},"& .hljs-string":{color:"#abe338"},"& .hljs-symbol":{color:"#abe338"},"& .hljs-bullet":{color:"#abe338"},"& .hljs-addition":{color:"#abe338"},"& .hljs-title":{color:"#00e0e0"},"& .hljs-section":{color:"#00e0e0"},"& .hljs-keyword":{color:"#dcc6e0"},"& .hljs-selector":{color:"#dcc6e0"},"& .hljs-selector-tag":{color:"#dcc6e0"},"& .hljs":{display:"block",overflowX:"auto",background:"#2b2b2b",color:"#f8f8f2",padding:"0.5em"},"& .hljs-emphasis":{fontStyle:"italic"},"& .hljs-strong":{fontWeight:"bold"}});function DT(e){const{role:t="user",children:n,className:r,Action:o}=e;return z.jsx($0,{role:t,className:r+"-Item",sx:e.wrapperSx,children:z.jsxs(B0,{role:t,className:r+"-Item-Content",sx:{width:"fill-available",...e.contentSx},children:[z.jsx(MT,{children:n}),o]})})}function jT(e){try{return new URL(e).hostname}catch{return location.hostname}}function $T({annotations:e}){const t=P.useMemo(()=>KT(e),[e]),{baseUrl:n}=P.useContext(vd);let r;switch(t.state){case void 0:case"CONNECTING":r=`Connecting to ${jT(n)}...`;break;case"CREATING":r="Preparing to ask...";break;case"SEARCHING":r="Gathering resources...";break;case"RERANKING":r="Reranking resources...";break;case"GENERATING":r="Generating answer...";break;default:return null}return z.jsx($0,{role:"bot",sx:{borderBottom:"none"},children:z.jsx(B0,{role:"bot",children:z.jsxs(UT,{children:[z.jsx(HT,{sx:{animation:"spin 2s linear infinite","@keyframes spin":{"0%":{transform:"rotate(360deg)"},"100%":{transform:"rotate(0deg)"}}}}),r]})})})}function BT(e){const{items:t,appendText:n}=e;return z.jsxs(WT,{children:[z.jsx("h3",{children:"Example Questions"}),t.map((r,o)=>z.jsx(VT,{onClick:()=>{n(r)},children:r},o))]})}const $0=ve("div")(({theme:e,role:t})=>ke({display:"flex",alignItems:"flex-end",paddingBottom:"0.5rem",marginBottom:t==="bot"?"1rem":"0.5rem",borderBottom:t==="bot"?"1px solid":"none",borderBottomColor:e.palette.muted})),B0=ve("div")(({theme:e,role:t})=>ke({display:"flex",flexDirection:"column",gapY:"0.5rem",lineHeight:"1.5rem",marginX:"0.5rem",fontSize:t==="bot"?"1rem":"1.25rem",fontWeight:t==="bot"?400:700,width:"100%","& *":{...e.palette.mode==="dark"?FT:NT},"&> p":{margin:0}})),UT=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",gap:"4px",fontSize:"12px",color:e.palette.mutedForeground,"& > a":{color:"inherit"}})),HT=ve(WS)`
  width: 1em;
  height: 1em;
`;ve("a")(({theme:e})=>ke({display:"block",padding:"0.5rem",borderRadius:e.shape.borderRadius,backgroundColor:e.palette.muted,color:e.palette.accentForeground,"&:hover":{backgroundColor:e.palette.muted,color:e.palette.accentForeground}}));ve("div")(()=>ke({display:"flex",gapX:"0.5rem",overflowX:"auto"}));const VT=ve("div")(({theme:e})=>ke({width:"100%",display:"inline-flex",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring}})),WT=ve("div")(()=>ke({width:"100%",display:"flex",gap:"0.5rem",flexWrap:"wrap","& h3":{width:"100%",fontSize:"1rem",lineHeight:"1.5rem",fontWeight:700,margin:0}}));function KT(e){return(e??[]).reduce((t,n)=>Object.assign(t,n),{})}var QT=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||n.forEach(function(o){e.addRange(o)}),t&&t.focus()}},qT=QT,wm={"text/plain":"Text","text/html":"Url",default:"Text"},GT="Copy to clipboard: #{key}, Enter";function YT(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function XT(e,t){var n,r,o,i,l,a,s=!1;t||(t={}),n=t.debug||!1;try{o=qT(),i=document.createRange(),l=document.getSelection(),a=document.createElement("span"),a.textContent=e,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(d){if(d.stopPropagation(),t.format)if(d.preventDefault(),typeof d.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var c=wm[t.format]||wm.default;window.clipboardData.setData(c,e)}else d.clipboardData.clearData(),d.clipboardData.setData(t.format,e);t.onCopy&&(d.preventDefault(),t.onCopy(d.clipboardData))}),document.body.appendChild(a),i.selectNodeContents(a),l.addRange(i);var u=document.execCommand("copy");if(!u)throw new Error("copy command was unsuccessful");s=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),s=!0}catch(c){n&&console.error("unable to copy using clipboardData: ",c),n&&console.error("falling back to prompt"),r=YT("message"in t?t.message:GT),window.prompt(r,e)}}finally{l&&(typeof l.removeRange=="function"?l.removeRange(i):l.removeAllRanges()),a&&document.body.removeChild(a),o()}return s}var ZT=XT;const JT=aa(ZT),kr=ve("svg")(()=>ke({})),eP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",...e,children:z.jsx("path",{fillRule:"evenodd",d:"M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z",clipRule:"evenodd"})}),tP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"})}),nP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"})}),rP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"})}),oP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"})}),iP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"})}),lP=e=>z.jsx(kr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:z.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})});function aP(e){const{handleStop:t,className:n}=e;return z.jsx(U0,{className:n,children:z.jsxs(wy,{onClick:t,className:n+"-Stop",sx:{padding:"0.5rem",border:0},children:[z.jsx(eP,{className:n+"-Stop-Icon",sx:{width:"1rem",height:"1rem",marginRight:"0.25rem"}}),"Stop Generating"]})})}function sP(e){const{className:t,handleReload:n,content:r}=e,[o,i]=P.useState(!1);return P.useEffect(()=>{if(o){const l=setTimeout(()=>{i(!1)},2e3);return()=>{clearTimeout(l)}}},[o]),z.jsx(U0,{className:t,children:z.jsxs("div",{className:t+"-Actions-Container Actions-Container",children:[z.jsxs("div",{className:t+"-Left-Actions Left-Actions Actions",children:[n&&z.jsx(il,{onClick:n,Icon:lP,name:"Regenerate",className:t,children:"Regenerate"}),z.jsx(il,{onClick:()=>{JT(r||""),i(!0)},Icon:o?oP:rP,name:"Copy",className:t,children:o?"Copied!":"Copy"})]}),z.jsxs("div",{className:t+"-Right-Actions Right-Actions Actions",children:[z.jsx(il,{Icon:tP,name:"GoodAnswer",className:t,children:"Good Answer"}),z.jsx(il,{Icon:nP,name:"BadAnswer",className:t,children:"Bad Answer"})]})]})})}function il(e){const{name:t,className:n,onClick:r,children:o,Icon:i}=e;return z.jsxs(wy,{onClick:r,className:n+`-${t}`,sx:{padding:"0.25rem 0.5rem",border:0,fontWeight:"normal",fontSize:"0.75rem",color:"mutedForeground"},children:[z.jsx(i,{className:n+`-${t}-Icon`,sx:{width:"0.75rem",height:"0.75rem",mr:"0.25rem"}}),o]})}const U0=ve("div")(({theme:e})=>ke({display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",margin:"0.5rem 0",borderRadius:e.shape.borderRadius,"& .Actions-Container":{width:"100%",display:"flex",gap:"0.5rem",justifyContent:"space-between"},"& .Actions":{display:"flex",gap:"0.5rem","& > div":{display:"flex",gap:"0.5rem"}}}));function uP(e){const{placeholder:t,className:n,isLoading:r,...o}=e;return z.jsxs(cP,{className:n+"-Wrapper",children:[z.jsx(dP,{placeholder:t||"Say something...",autoFocus:!0,...o}),z.jsx(fP,{type:"submit",className:n+"-Submit",disabled:r,children:z.jsx(iP,{className:n+"-Submit-Icon",sx:{width:"1rem",height:"1rem"}})})]})}const cP=ve("div")(()=>ke({display:"flex",position:"relative"})),dP=ve("input")(({theme:e})=>ke({fontSize:"1rem",lineHeight:"1.5rem",padding:"0.5rem 0.75rem",paddingRight:"2.5rem",borderRadius:e.shape.borderRadius,display:"inline-block",width:"100%",border:`2px solid ${e.palette.border}`,color:e.palette.primary,backgroundColor:e.palette.background,"&:focus":{outline:"none",borderColor:e.palette.ring}})),fP=ve("button")(({theme:e,disabled:t})=>ke({position:"absolute",right:"0.375rem",top:"0.375rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:e.shape.borderRadius,padding:"0.5rem",cursor:"pointer",border:"none",backgroundColor:e.palette.primary,color:e.palette.primaryForeground,"&:hover":{backgroundColor:e.palette.primary},...t&&{backgroundColor:e.palette.muted,color:e.palette.mutedForeground,cursor:"not-allowed","&:hover":{backgroundColor:e.palette.muted}}})),bm=ve("span")(({theme:e})=>ke({color:e.palette.mutedForeground,fontSize:"0.875rem",fontWeight:400,lineHeight:1}));/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var H0=mP,xm=hP,pP=Object.prototype.toString,ll=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function mP(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},o=r.decode||gP,i=0;i<e.length;){var l=e.indexOf("=",i);if(l===-1)break;var a=e.indexOf(";",i);if(a===-1)a=e.length;else if(a<l){i=e.lastIndexOf(";",l-1)+1;continue}var s=e.slice(i,l).trim();if(n[s]===void 0){var u=e.slice(l+1,a).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[s]=wP(u,o)}i=a+1}return n}function hP(e,t,n){var r=n||{},o=r.encode||yP;if(typeof o!="function")throw new TypeError("option encode is invalid");if(!ll.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!ll.test(i))throw new TypeError("argument val is invalid");var l=e+"="+i;if(r.maxAge!=null){var a=r.maxAge-0;if(isNaN(a)||!isFinite(a))throw new TypeError("option maxAge is invalid");l+="; Max-Age="+Math.floor(a)}if(r.domain){if(!ll.test(r.domain))throw new TypeError("option domain is invalid");l+="; Domain="+r.domain}if(r.path){if(!ll.test(r.path))throw new TypeError("option path is invalid");l+="; Path="+r.path}if(r.expires){var s=r.expires;if(!kP(s)||isNaN(s.valueOf()))throw new TypeError("option expires is invalid");l+="; Expires="+s.toUTCString()}if(r.httpOnly&&(l+="; HttpOnly"),r.secure&&(l+="; Secure"),r.partitioned&&(l+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var d=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(d){case!0:l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"strict":l+="; SameSite=Strict";break;case"none":l+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return l}function gP(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function yP(e){return encodeURIComponent(e)}function kP(e){return pP.call(e)==="[object Date]"||e instanceof Date}function wP(e,t){try{return t(e)}catch{return e}}function bP(){const e=typeof global>"u"?void 0:global.TEST_HAS_DOCUMENT_COOKIE;return typeof e=="boolean"?e:typeof document=="object"&&typeof document.cookie=="string"}function xP(e){return typeof e=="string"?H0(e):typeof e=="object"&&e!==null?e:{}}function Qs(e,t={}){const n=vP(e);if(!t.doNotParse)try{return JSON.parse(n)}catch{}return e}function vP(e){return e&&e[0]==="j"&&e[1]===":"?e.substr(2):e}class V0{constructor(t,n={}){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.update=()=>{if(!this.HAS_DOCUMENT_COOKIE)return;const o=this.cookies;this.cookies=H0(document.cookie),this._checkChanges(o)};const r=typeof document>"u"?"":document.cookie;this.cookies=xP(t||r),this.defaultSetOptions=n,this.HAS_DOCUMENT_COOKIE=bP()}_emitChange(t){for(let n=0;n<this.changeListeners.length;++n)this.changeListeners[n](t)}_checkChanges(t){new Set(Object.keys(t).concat(Object.keys(this.cookies))).forEach(r=>{t[r]!==this.cookies[r]&&this._emitChange({name:r,value:Qs(this.cookies[r])})})}_startPolling(){this.pollingInterval=setInterval(this.update,300)}_stopPolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}get(t,n={}){return n.doNotUpdate||this.update(),Qs(this.cookies[t],n)}getAll(t={}){t.doNotUpdate||this.update();const n={};for(let r in this.cookies)n[r]=Qs(this.cookies[r],t);return n}set(t,n,r){r?r=Object.assign(Object.assign({},this.defaultSetOptions),r):r=this.defaultSetOptions;const o=typeof n=="string"?n:JSON.stringify(n);this.cookies=Object.assign(Object.assign({},this.cookies),{[t]:o}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=xm(t,o,r)),this._emitChange({name:t,value:n,options:r})}remove(t,n){const r=n=Object.assign(Object.assign(Object.assign({},this.defaultSetOptions),n),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=xm(t,"",r)),this._emitChange({name:t,value:void 0,options:n})}addChangeListener(t){this.changeListeners.push(t),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===1&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.addEventListener("change",this.update):this._startPolling())}removeChangeListener(t){const n=this.changeListeners.indexOf(t);n>=0&&this.changeListeners.splice(n,1),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===0&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.removeEventListener("change",this.update):this._stopPolling())}}const W0=P.createContext(new V0),{Provider:SP,Consumer:r_}=W0;class CP extends P.Component{constructor(t){super(t),t.cookies?this.cookies=t.cookies:this.cookies=new V0(void 0,t.defaultSetOptions)}render(){return P.createElement(SP,{value:this.cookies},this.props.children)}}function EP(){return typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"}function TP(e){const t=P.useContext(W0);if(!t)throw new Error("Missing <CookiesProvider>");const[n,r]=P.useState(()=>t.getAll());EP()&&P.useLayoutEffect(()=>{function a(){const s=t.getAll({doNotUpdate:!0});PP(e||null,s,n)&&r(s)}return t.addChangeListener(a),()=>{t.removeChangeListener(a)}},[t,n]);const o=P.useMemo(()=>t.set.bind(t),[t]),i=P.useMemo(()=>t.remove.bind(t),[t]),l=P.useMemo(()=>t.update.bind(t),[t]);return[n,o,i,l]}function PP(e,t,n){if(!e)return!0;for(let r of e)if(t[r]!==n[r])return!0;return!1}const vm="/api/auth/session",_P="/api/auth/csrfToken",RP="/api/auth/callback/anonymous";async function IP(e){const t=o=>fetch(e+o,{credentials:"include",redirect:"follow"}).then(Sm).then(i=>i.json()),n=(o,i)=>fetch(e+o,{method:"POST",credentials:"include",redirect:"manual",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(Sm).then(()=>{}),r=await t(vm);if(!r){const{csrfToken:o}=await t(_P);await n(RP,{csrfToken:o});const i=await t(vm);if(!(i!=null&&i.user))throw new Error("Authentication error");return i}return r}async function Sm(e){const t=await e;if(!t.ok&&t.type!=="opaqueredirect"){const n=t.clone().json().then(JSON.stringify).catch(()=>t.clone().text()).catch(()=>"Empty response body]");throw new AP(t.status,t.statusText,await n)}return t}class AP extends Error{constructor(t,n,r){super(`${t} ${n}: ${r}`),this.status=t,this.statusText=n,this.body=r}}const qs="test1-CreateRag-Session";function OP(){const[e,t]=P.useState(null),[n,r]=TP([qs]),o=P.useMemo(()=>(n==null?void 0:n[qs])||null,[n]),i=P.useCallback(l=>{l&&(r(qs,l,{path:"/"}),t(l))},[r]);return{session:e||o,setSession:i}}const LP=async e=>{const[t,n]=P.useState(null),[r,o]=P.useState(!1);return P.useEffect(()=>{const i=async()=>{console.log("authenticate"),n(await IP((e==null?void 0:e.baseUrl)||""))};o(!0),i().finally(()=>{o(!1)})},[]),t},zP=ke`
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
`,MP=ke`
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
`,NP={background:"hsl(0 0% 100%)",foreground:"hsl(240 10% 3.9%)",card:"hsl(0 0% 100%)",cardForeground:"hsl(240 10% 3.9%)",popover:"hsl(0 0% 100%)",popoverForeground:"hsl(240 10% 3.9%)",primary:"hsl(240 5.9% 10%)",primaryForeground:"hsl(0 0% 98%)",secondary:"hsl(240 4.8% 95.9%)",secondaryForeground:"hsl(240 5.9% 10%)",muted:"hsl(240 4.8% 95.9%)",mutedForeground:"hsl(240 3.8% 46.1%)",accent:"hsl(240 4.8% 95.9%)",accentForeground:"hsl(240 5.9% 10%)",destructive:"hsl(0 84.2% 60.2%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 5.9% 90%)",input:"hsl(240 5.9% 90%)",ring:"hsl(240 5.9% 10%)"},FP={background:"hsl(240 10% 3.9%)",foreground:"hsl(0 0% 98%)",card:"hsl(240 10% 3.9%)",cardForeground:"hsl(0 0% 98%)",popover:"hsl(240 10% 3.9%)",popoverForeground:"hsl(0 0% 98%)",primary:"hsl(0 0% 98%)",primaryForeground:"hsl(240 5.9% 10%)",secondary:"hsl(240 3.7% 15.9%)",secondaryForeground:"hsl(0 0% 98%)",muted:"hsl(240 3.7% 15.9%)",mutedForeground:"hsl(240 5% 64.9%)",accent:"hsl(240 3.7% 15.9%)",accentForeground:"hsl(0 0% 98%)",destructive:"hsl(0 62.8% 30.6%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 3.7% 15.9%)",input:"hsl(240 3.7% 15.9%)",ring:"hsl(240 4.9% 83.9%)"},DP=kd({palette:{mode:"light",...NP}}),jP=kd({palette:{mode:"dark",...FP}}),Kt="tidb-ai-";function $P(e){var m;const{exampleQuestions:t,inputPlaceholder:n,siteKey:r="",securityMode:o}=e,{session:i,setSession:l}=OP(),a=P.useContext(vd);LP(a);const{messages:s,input:u,handleInputChange:d,handleSubmit:c,isLoading:f,stop:p,reload:h,append:k}=$S({api:a.baseUrl+"/api/v1/chats",credentials:"include",body:{...i&&{sessionID:i}},onResponse:y=>{i!==y.headers.get("X-CreateRag-Session")&&l(y.headers.get("X-CreateRag-Session")??void 0)}}),C=y=>{k({role:"user",content:y,createdAt:new Date})},g=y=>{if(y.preventDefault(),!r)return c(y);BS({action:"submit",siteKey:r||"",mode:o},({token:S,action:T})=>{c(y,{options:{headers:{"X-Recaptcha-Token":S,"X-Recaptcha-Action":T}}})})};return z.jsx(z.Fragment,{children:z.jsxs(BP,{className:Kt+"Conversation-Container",children:[z.jsxs(UP,{sx:{flexDirection:"column-reverse"},className:"Conversation-Message-List",children:[s.length===0&&t.length>0&&z.jsx(BT,{appendText:C,items:t}),f&&z.jsx($T,{annotations:((m=s[s.length-1])==null?void 0:m.annotations)??[]}),s.sort((y,S)=>{const T=new Date(y.createdAt||0).getTime();return new Date(S.createdAt||0).getTime()-T}).map((y,S)=>{const T=S===0?!f:y.role!=="user";return z.jsx(DT,{role:y.role==="user"?"user":"bot",className:Kt+"Conversation-Message",Action:T?z.jsx(sP,{handleReload:S===0?h:void 0,content:y.content,className:Kt+"Conversation-Message-Action"}):null,wrapperSx:{...S===0&&{border:"none",marginBottom:0}},children:y.content},y.id)})]}),z.jsxs("div",{children:[(s==null?void 0:s.length)>0&&f&&z.jsx(aP,{className:Kt+"Conversation-Action",handleStop:p}),z.jsx("form",{onSubmit:g,children:z.jsx(uP,{className:Kt+"Conversation-Input",value:u,onChange:d,isLoading:f,placeholder:n})}),z.jsxs(HP,{children:[z.jsxs(bm,{children:["Powered by ",z.jsx("a",{href:"https://tidb.ai",target:"_blank",rel:"noreferrer",children:"TiDB.ai"})]}),z.jsxs(bm,{sx:{marginLeft:"auto",marginRight:"0"},children:["protected by reCAPTCHA (",z.jsx("a",{href:"https://policies.google.com/privacy",target:"_blank",rel:"noreferrer",children:"Privacy"})," - ",z.jsx("a",{href:"https://policies.google.com/terms",target:"_blank",rel:"noreferrer",children:"Terms"}),")"]})]})]})]})})}const BP=ve("div")(({theme:e})=>ke({display:"flex",flex:"1 1 0%",justifyContent:"space-between",flexDirection:"column",height:"calc(100% - 40px)",backgroundColor:e.palette.background})),UP=ve("div")(({theme:e})=>ke({display:"flex",flexDirection:"column",padding:"0.75rem 0",overflowY:"auto",scrollbarWidth:"thin",scrollbarColor:`${e.palette.accent} ${e.palette.background}`,"&::-webkit-scrollbar":{width:"0.5rem"},"&::-webkit-scrollbar-track":{backgroundColor:e.palette.background},"&::-webkit-scrollbar-thumb":{backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius}},e.palette.mode==="dark"?MP:zP)),HP=ve("div")(({theme:e})=>({display:"flex",paddingTop:"1rem",fontSize:"12px",color:e.palette.mutedForeground,"& >* a":{color:"inherit"}}));function VP(e){const{btnLabel:t,btnImgSrc:n,baseUrl:r="",exampleQuestions:o,logoSrc:i,title:l,inputPlaceholder:a,preferredMode:s="system",siteKey:u,securityMode:d}=e,[c,f]=P.useState(!1),p=()=>f(!0),h=()=>f(!1),k=["dark","light"].includes(s)?s:"system",C=tv("(prefers-color-scheme: dark)")?"dark":"light",g=k==="system"?C:k,m=P.useMemo(()=>g==="dark"?jP:DP,[g]),y=P.useMemo(()=>{if(d==="v3"||d==="enterprise")return d},[d]);return z.jsx(vd.Provider,{value:{baseUrl:r,entryButtonLabel:t},children:z.jsx(CP,{defaultSetOptions:{path:"/"},children:z.jsxs(Zx,{theme:m,children:[z.jsxs(gv,{type:"button",onClick:p,className:Kt+"entry-btn",children:[n&&z.jsx("img",{src:n,alt:t,className:Kt+"entry-btn-img",width:16,height:16}),t]}),z.jsx(jv,{"aria-labelledby":"unstyled-modal-title","aria-describedby":"unstyled-modal-description",open:c,onClose:h,slots:{backdrop:$v},className:Kt+"Modal",children:z.jsxs(Bv,{sx:{width:"90vw",maxWidth:800,minHeight:400,height:"60vh"},className:Kt+"Modal-Content",children:[z.jsx(Uv,{className:Kt+"Modal-Header",children:z.jsxs(Hv,{className:Kt+"Modal-Title",children:[i&&z.jsx("img",{src:i,alt:"Widget Logo",width:32,height:32}),l]})}),z.jsx($P,{exampleQuestions:o,inputPlaceholder:a,siteKey:u,securityMode:y})]})})]})})})}const te=document.querySelector('script[data-id][data-name="tidb-ai-widget"]'),WP=(te==null?void 0:te.getAttribute("data-id"))||"tidb-ai-widget",KP=(te==null?void 0:te.getAttribute("data-name"))||"tidb-ai-widget",QP=(te==null?void 0:te.getAttribute("data-btn-label"))||"Ask AI",qP=(te==null?void 0:te.getAttribute("data-btn-img-src"))||void 0,GP=(te==null?void 0:te.getAttribute("data-api-base-url"))||void 0,YP=JSON.parse((te==null?void 0:te.getAttribute("data-example-questions"))||"[]"),XP=(te==null?void 0:te.getAttribute("data-logo-src"))||void 0,ZP=(te==null?void 0:te.getAttribute("data-title"))||"Conversation Search Box",JP=(te==null?void 0:te.getAttribute("data-input-placeholder"))||"Ask a question...",e_=(te==null?void 0:te.getAttribute("data-preferred-mode"))||"system",El=(te==null?void 0:te.getAttribute("data-site-key"))||"",K0=(te==null?void 0:te.getAttribute("data-security-mode"))||void 0,t_=document.getElementsByTagName("body")[0];t_.appendChild(document.createElement("div")).id="tidb-ai-root";const n_=document.getElementsByTagName("head")[0];if(El){const e=document.createElement("script"),t=K0==="enterprise"?`https://www.google.com/recaptcha/enterprise.js?render=${El}`:`https://www.google.com/recaptcha/api.js?render=${El}`;e.src=t,e.async=!0,e.defer=!0,n_.appendChild(e)}Gs.createRoot(document.getElementById("tidb-ai-root")).render(z.jsx(ki.StrictMode,{children:z.jsx(VP,{id:WP,name:KP,btnLabel:QP,btnImgSrc:qP,baseUrl:GP,exampleQuestions:YP,logoSrc:XP,title:ZP,inputPlaceholder:JP,preferredMode:e_,siteKey:El,securityMode:K0})}));
