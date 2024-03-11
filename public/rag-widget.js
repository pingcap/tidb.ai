function N0(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var Fd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function oa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var km={exports:{}},ia={},wm={exports:{}},te={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gi=Symbol.for("react.element"),j0=Symbol.for("react.portal"),$0=Symbol.for("react.fragment"),B0=Symbol.for("react.strict_mode"),U0=Symbol.for("react.profiler"),H0=Symbol.for("react.provider"),V0=Symbol.for("react.context"),W0=Symbol.for("react.forward_ref"),K0=Symbol.for("react.suspense"),Q0=Symbol.for("react.memo"),q0=Symbol.for("react.lazy"),Nd=Symbol.iterator;function G0(e){return e===null||typeof e!="object"?null:(e=Nd&&e[Nd]||e["@@iterator"],typeof e=="function"?e:null)}var bm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},vm=Object.assign,xm={};function eo(e,t,n){this.props=e,this.context=t,this.refs=xm,this.updater=n||bm}eo.prototype.isReactComponent={};eo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};eo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Sm(){}Sm.prototype=eo.prototype;function uc(e,t,n){this.props=e,this.context=t,this.refs=xm,this.updater=n||bm}var cc=uc.prototype=new Sm;cc.constructor=uc;vm(cc,eo.prototype);cc.isPureReactComponent=!0;var jd=Array.isArray,Cm=Object.prototype.hasOwnProperty,dc={current:null},Em={key:!0,ref:!0,__self:!0,__source:!0};function Tm(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)Cm.call(t,r)&&!Em.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:gi,type:e,key:i,ref:l,props:o,_owner:dc.current}}function Y0(e,t){return{$$typeof:gi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function fc(e){return typeof e=="object"&&e!==null&&e.$$typeof===gi}function X0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var $d=/\/+/g;function qa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?X0(""+e.key):t.toString(36)}function ll(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case gi:case j0:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+qa(l,0):r,jd(o)?(n="",e!=null&&(n=e.replace($d,"$&/")+"/"),ll(o,t,n,"",function(u){return u})):o!=null&&(fc(o)&&(o=Y0(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace($d,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",jd(e))for(var a=0;a<e.length;a++){i=e[a];var s=r+qa(i,a);l+=ll(i,t,n,s,o)}else if(s=G0(e),typeof s=="function")for(e=s.call(e),a=0;!(i=e.next()).done;)i=i.value,s=r+qa(i,a++),l+=ll(i,t,n,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Ai(e,t,n){if(e==null)return e;var r=[],o=0;return ll(e,r,"","",function(i){return t.call(n,i,o++)}),r}function J0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var rt={current:null},al={transition:null},Z0={ReactCurrentDispatcher:rt,ReactCurrentBatchConfig:al,ReactCurrentOwner:dc};te.Children={map:Ai,forEach:function(e,t,n){Ai(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ai(e,function(){t++}),t},toArray:function(e){return Ai(e,function(t){return t})||[]},only:function(e){if(!fc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};te.Component=eo;te.Fragment=$0;te.Profiler=U0;te.PureComponent=uc;te.StrictMode=B0;te.Suspense=K0;te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z0;te.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=vm({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=dc.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Cm.call(t,s)&&!Em.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var u=0;u<s;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:gi,type:e.type,key:o,ref:i,props:r,_owner:l}};te.createContext=function(e){return e={$$typeof:V0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:H0,_context:e},e.Consumer=e};te.createElement=Tm;te.createFactory=function(e){var t=Tm.bind(null,e);return t.type=e,t};te.createRef=function(){return{current:null}};te.forwardRef=function(e){return{$$typeof:W0,render:e}};te.isValidElement=fc;te.lazy=function(e){return{$$typeof:q0,_payload:{_status:-1,_result:e},_init:J0}};te.memo=function(e,t){return{$$typeof:Q0,type:e,compare:t===void 0?null:t}};te.startTransition=function(e){var t=al.transition;al.transition={};try{e()}finally{al.transition=t}};te.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};te.useCallback=function(e,t){return rt.current.useCallback(e,t)};te.useContext=function(e){return rt.current.useContext(e)};te.useDebugValue=function(){};te.useDeferredValue=function(e){return rt.current.useDeferredValue(e)};te.useEffect=function(e,t){return rt.current.useEffect(e,t)};te.useId=function(){return rt.current.useId()};te.useImperativeHandle=function(e,t,n){return rt.current.useImperativeHandle(e,t,n)};te.useInsertionEffect=function(e,t){return rt.current.useInsertionEffect(e,t)};te.useLayoutEffect=function(e,t){return rt.current.useLayoutEffect(e,t)};te.useMemo=function(e,t){return rt.current.useMemo(e,t)};te.useReducer=function(e,t,n){return rt.current.useReducer(e,t,n)};te.useRef=function(e){return rt.current.useRef(e)};te.useState=function(e){return rt.current.useState(e)};te.useSyncExternalStore=function(e,t,n){return rt.current.useSyncExternalStore(e,t,n)};te.useTransition=function(){return rt.current.useTransition()};te.version="18.2.0";wm.exports=te;var R=wm.exports;const yi=oa(R),Bd=N0({__proto__:null,default:yi},[R]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e1=R,t1=Symbol.for("react.element"),n1=Symbol.for("react.fragment"),r1=Object.prototype.hasOwnProperty,o1=e1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i1={key:!0,ref:!0,__self:!0,__source:!0};function Pm(e,t,n){var r,o={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)r1.call(t,r)&&!i1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:t1,type:e,key:i,ref:l,props:o,_owner:o1.current}}ia.Fragment=n1;ia.jsx=Pm;ia.jsxs=Pm;km.exports=ia;var N=km.exports,Qs={},_m={exports:{}},Et={},Rm={exports:{}},Im={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,H){var w=I.length;I.push(H);e:for(;0<w;){var G=w-1>>>1,K=I[G];if(0<o(K,H))I[G]=H,I[w]=K,w=G;else break e}}function n(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var H=I[0],w=I.pop();if(w!==H){I[0]=w;e:for(var G=0,K=I.length,x=K>>>1;G<x;){var ne=2*(G+1)-1,ke=I[ne],ee=ne+1,Ue=I[ee];if(0>o(ke,w))ee<K&&0>o(Ue,ke)?(I[G]=Ue,I[ee]=w,G=ee):(I[G]=ke,I[ne]=w,G=ne);else if(ee<K&&0>o(Ue,w))I[G]=Ue,I[ee]=w,G=ee;else break e}}return H}function o(I,H){var w=I.sortIndex-H.sortIndex;return w!==0?w:I.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,a=l.now();e.unstable_now=function(){return l.now()-a}}var s=[],u=[],d=1,c=null,f=3,p=!1,h=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k(I){for(var H=n(u);H!==null;){if(H.callback===null)r(u);else if(H.startTime<=I)r(u),H.sortIndex=H.expirationTime,t(s,H);else break;H=n(u)}}function C(I){if(y=!1,k(I),!h)if(n(s)!==null)h=!0,A(T);else{var H=n(u);H!==null&&$(C,H.startTime-I)}}function T(I,H){h=!1,y&&(y=!1,g(P),P=-1),p=!0;var w=f;try{for(k(H),c=n(s);c!==null&&(!(c.expirationTime>H)||I&&!O());){var G=c.callback;if(typeof G=="function"){c.callback=null,f=c.priorityLevel;var K=G(c.expirationTime<=H);H=e.unstable_now(),typeof K=="function"?c.callback=K:c===n(s)&&r(s),k(H)}else r(s);c=n(s)}if(c!==null)var x=!0;else{var ne=n(u);ne!==null&&$(C,ne.startTime-H),x=!1}return x}finally{c=null,f=w,p=!1}}var S=!1,E=null,P=-1,M=5,b=-1;function O(){return!(e.unstable_now()-b<M)}function L(){if(E!==null){var I=e.unstable_now();b=I;var H=!0;try{H=E(!0,I)}finally{H?B():(S=!1,E=null)}}else S=!1}var B;if(typeof m=="function")B=function(){m(L)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,F=W.port2;W.port1.onmessage=L,B=function(){F.postMessage(null)}}else B=function(){v(L,0)};function A(I){E=I,S||(S=!0,B())}function $(I,H){P=v(function(){I(e.unstable_now())},H)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){h||p||(h=!0,A(T))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(I){switch(f){case 1:case 2:case 3:var H=3;break;default:H=f}var w=f;f=H;try{return I()}finally{f=w}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,H){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var w=f;f=I;try{return H()}finally{f=w}},e.unstable_scheduleCallback=function(I,H,w){var G=e.unstable_now();switch(typeof w=="object"&&w!==null?(w=w.delay,w=typeof w=="number"&&0<w?G+w:G):w=G,I){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=w+K,I={id:d++,callback:H,priorityLevel:I,startTime:w,expirationTime:K,sortIndex:-1},w>G?(I.sortIndex=w,t(u,I),n(s)===null&&I===n(u)&&(y?(g(P),P=-1):y=!0,$(C,w-G))):(I.sortIndex=K,t(s,I),h||p||(h=!0,A(T))),I},e.unstable_shouldYield=O,e.unstable_wrapCallback=function(I){var H=f;return function(){var w=f;f=H;try{return I.apply(this,arguments)}finally{f=w}}}})(Im);Rm.exports=Im;var l1=Rm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Om=R,Ct=l1;function z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Am=new Set,No={};function pr(e,t){Vr(e,t),Vr(e+"Capture",t)}function Vr(e,t){for(No[e]=t,e=0;e<t.length;e++)Am.add(t[e])}var yn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qs=Object.prototype.hasOwnProperty,a1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ud={},Hd={};function s1(e){return qs.call(Hd,e)?!0:qs.call(Ud,e)?!1:a1.test(e)?Hd[e]=!0:(Ud[e]=!0,!1)}function u1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function c1(e,t,n,r){if(t===null||typeof t>"u"||u1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ot(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Ke={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ke[e]=new ot(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ke[t]=new ot(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ke[e]=new ot(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ke[e]=new ot(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ke[e]=new ot(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ke[e]=new ot(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ke[e]=new ot(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ke[e]=new ot(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ke[e]=new ot(e,5,!1,e.toLowerCase(),null,!1,!1)});var pc=/[\-:]([a-z])/g;function mc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(pc,mc);Ke[t]=new ot(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(pc,mc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(pc,mc);Ke[t]=new ot(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!1,!1)});Ke.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ke[e]=new ot(e,1,!1,e.toLowerCase(),null,!0,!0)});function hc(e,t,n,r){var o=Ke.hasOwnProperty(t)?Ke[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(c1(t,n,o,r)&&(n=null),r||o===null?s1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var xn=Om.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Li=Symbol.for("react.element"),Sr=Symbol.for("react.portal"),Cr=Symbol.for("react.fragment"),gc=Symbol.for("react.strict_mode"),Gs=Symbol.for("react.profiler"),Lm=Symbol.for("react.provider"),zm=Symbol.for("react.context"),yc=Symbol.for("react.forward_ref"),Ys=Symbol.for("react.suspense"),Xs=Symbol.for("react.suspense_list"),kc=Symbol.for("react.memo"),Pn=Symbol.for("react.lazy"),Mm=Symbol.for("react.offscreen"),Vd=Symbol.iterator;function so(e){return e===null||typeof e!="object"?null:(e=Vd&&e[Vd]||e["@@iterator"],typeof e=="function"?e:null)}var Ce=Object.assign,Ga;function bo(e){if(Ga===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ga=t&&t[1]||""}return`
`+Ga+e}var Ya=!1;function Xa(e,t){if(!e||Ya)return"";Ya=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),i=r.stack.split(`
`),l=o.length-1,a=i.length-1;1<=l&&0<=a&&o[l]!==i[a];)a--;for(;1<=l&&0<=a;l--,a--)if(o[l]!==i[a]){if(l!==1||a!==1)do if(l--,a--,0>a||o[l]!==i[a]){var s=`
`+o[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=a);break}}}finally{Ya=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?bo(e):""}function d1(e){switch(e.tag){case 5:return bo(e.type);case 16:return bo("Lazy");case 13:return bo("Suspense");case 19:return bo("SuspenseList");case 0:case 2:case 15:return e=Xa(e.type,!1),e;case 11:return e=Xa(e.type.render,!1),e;case 1:return e=Xa(e.type,!0),e;default:return""}}function Js(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Cr:return"Fragment";case Sr:return"Portal";case Gs:return"Profiler";case gc:return"StrictMode";case Ys:return"Suspense";case Xs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case zm:return(e.displayName||"Context")+".Consumer";case Lm:return(e._context.displayName||"Context")+".Provider";case yc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case kc:return t=e.displayName||null,t!==null?t:Js(e.type)||"Memo";case Pn:t=e._payload,e=e._init;try{return Js(e(t))}catch{}}return null}function f1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Js(t);case 8:return t===gc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Dm(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function p1(e){var t=Dm(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function zi(e){e._valueTracker||(e._valueTracker=p1(e))}function Fm(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Dm(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Cl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Zs(e,t){var n=t.checked;return Ce({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Wd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Nm(e,t){t=t.checked,t!=null&&hc(e,"checked",t,!1)}function eu(e,t){Nm(e,t);var n=Vn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?tu(e,t.type,n):t.hasOwnProperty("defaultValue")&&tu(e,t.type,Vn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Kd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function tu(e,t,n){(t!=="number"||Cl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vo=Array.isArray;function Mr(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function nu(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(z(91));return Ce({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Qd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(z(92));if(vo(n)){if(1<n.length)throw Error(z(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vn(n)}}function jm(e,t){var n=Vn(t.value),r=Vn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function qd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function $m(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ru(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?$m(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mi,Bm=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Mi=Mi||document.createElement("div"),Mi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Mi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function jo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Co={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},m1=["Webkit","ms","Moz","O"];Object.keys(Co).forEach(function(e){m1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Co[t]=Co[e]})});function Um(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Co.hasOwnProperty(e)&&Co[e]?(""+t).trim():t+"px"}function Hm(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Um(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var h1=Ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ou(e,t){if(t){if(h1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(z(62))}}function iu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lu=null;function wc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var au=null,Dr=null,Fr=null;function Gd(e){if(e=bi(e)){if(typeof au!="function")throw Error(z(280));var t=e.stateNode;t&&(t=ca(t),au(e.stateNode,e.type,t))}}function Vm(e){Dr?Fr?Fr.push(e):Fr=[e]:Dr=e}function Wm(){if(Dr){var e=Dr,t=Fr;if(Fr=Dr=null,Gd(e),t)for(e=0;e<t.length;e++)Gd(t[e])}}function Km(e,t){return e(t)}function Qm(){}var Ja=!1;function qm(e,t,n){if(Ja)return e(t,n);Ja=!0;try{return Km(e,t,n)}finally{Ja=!1,(Dr!==null||Fr!==null)&&(Qm(),Wm())}}function $o(e,t){var n=e.stateNode;if(n===null)return null;var r=ca(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(z(231,t,typeof n));return n}var su=!1;if(yn)try{var uo={};Object.defineProperty(uo,"passive",{get:function(){su=!0}}),window.addEventListener("test",uo,uo),window.removeEventListener("test",uo,uo)}catch{su=!1}function g1(e,t,n,r,o,i,l,a,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Eo=!1,El=null,Tl=!1,uu=null,y1={onError:function(e){Eo=!0,El=e}};function k1(e,t,n,r,o,i,l,a,s){Eo=!1,El=null,g1.apply(y1,arguments)}function w1(e,t,n,r,o,i,l,a,s){if(k1.apply(this,arguments),Eo){if(Eo){var u=El;Eo=!1,El=null}else throw Error(z(198));Tl||(Tl=!0,uu=u)}}function mr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Gm(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Yd(e){if(mr(e)!==e)throw Error(z(188))}function b1(e){var t=e.alternate;if(!t){if(t=mr(e),t===null)throw Error(z(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return Yd(o),e;if(i===r)return Yd(o),t;i=i.sibling}throw Error(z(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,a=o.child;a;){if(a===n){l=!0,n=o,r=i;break}if(a===r){l=!0,r=o,n=i;break}a=a.sibling}if(!l){for(a=i.child;a;){if(a===n){l=!0,n=i,r=o;break}if(a===r){l=!0,r=i,n=o;break}a=a.sibling}if(!l)throw Error(z(189))}}if(n.alternate!==r)throw Error(z(190))}if(n.tag!==3)throw Error(z(188));return n.stateNode.current===n?e:t}function Ym(e){return e=b1(e),e!==null?Xm(e):null}function Xm(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Xm(e);if(t!==null)return t;e=e.sibling}return null}var Jm=Ct.unstable_scheduleCallback,Xd=Ct.unstable_cancelCallback,v1=Ct.unstable_shouldYield,x1=Ct.unstable_requestPaint,_e=Ct.unstable_now,S1=Ct.unstable_getCurrentPriorityLevel,bc=Ct.unstable_ImmediatePriority,Zm=Ct.unstable_UserBlockingPriority,Pl=Ct.unstable_NormalPriority,C1=Ct.unstable_LowPriority,eh=Ct.unstable_IdlePriority,la=null,rn=null;function E1(e){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(la,e,void 0,(e.current.flags&128)===128)}catch{}}var Qt=Math.clz32?Math.clz32:_1,T1=Math.log,P1=Math.LN2;function _1(e){return e>>>=0,e===0?32:31-(T1(e)/P1|0)|0}var Di=64,Fi=4194304;function xo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function _l(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var a=l&~o;a!==0?r=xo(a):(i&=l,i!==0&&(r=xo(i)))}else l=n&~o,l!==0?r=xo(l):i!==0&&(r=xo(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qt(t),o=1<<n,r|=e[n],t&=~o;return r}function R1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function I1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-Qt(i),a=1<<l,s=o[l];s===-1?(!(a&n)||a&r)&&(o[l]=R1(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function cu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function th(){var e=Di;return Di<<=1,!(Di&4194240)&&(Di=64),e}function Za(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ki(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qt(t),e[t]=n}function O1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Qt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function vc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var se=0;function nh(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var rh,xc,oh,ih,lh,du=!1,Ni=[],Mn=null,Dn=null,Fn=null,Bo=new Map,Uo=new Map,Rn=[],A1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jd(e,t){switch(e){case"focusin":case"focusout":Mn=null;break;case"dragenter":case"dragleave":Dn=null;break;case"mouseover":case"mouseout":Fn=null;break;case"pointerover":case"pointerout":Bo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Uo.delete(t.pointerId)}}function co(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=bi(t),t!==null&&xc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function L1(e,t,n,r,o){switch(t){case"focusin":return Mn=co(Mn,e,t,n,r,o),!0;case"dragenter":return Dn=co(Dn,e,t,n,r,o),!0;case"mouseover":return Fn=co(Fn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Bo.set(i,co(Bo.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Uo.set(i,co(Uo.get(i)||null,e,t,n,r,o)),!0}return!1}function ah(e){var t=nr(e.target);if(t!==null){var n=mr(t);if(n!==null){if(t=n.tag,t===13){if(t=Gm(n),t!==null){e.blockedOn=t,lh(e.priority,function(){oh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function sl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);lu=r,n.target.dispatchEvent(r),lu=null}else return t=bi(n),t!==null&&xc(t),e.blockedOn=n,!1;t.shift()}return!0}function Zd(e,t,n){sl(e)&&n.delete(t)}function z1(){du=!1,Mn!==null&&sl(Mn)&&(Mn=null),Dn!==null&&sl(Dn)&&(Dn=null),Fn!==null&&sl(Fn)&&(Fn=null),Bo.forEach(Zd),Uo.forEach(Zd)}function fo(e,t){e.blockedOn===t&&(e.blockedOn=null,du||(du=!0,Ct.unstable_scheduleCallback(Ct.unstable_NormalPriority,z1)))}function Ho(e){function t(o){return fo(o,e)}if(0<Ni.length){fo(Ni[0],e);for(var n=1;n<Ni.length;n++){var r=Ni[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Mn!==null&&fo(Mn,e),Dn!==null&&fo(Dn,e),Fn!==null&&fo(Fn,e),Bo.forEach(t),Uo.forEach(t),n=0;n<Rn.length;n++)r=Rn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rn.length&&(n=Rn[0],n.blockedOn===null);)ah(n),n.blockedOn===null&&Rn.shift()}var Nr=xn.ReactCurrentBatchConfig,Rl=!0;function M1(e,t,n,r){var o=se,i=Nr.transition;Nr.transition=null;try{se=1,Sc(e,t,n,r)}finally{se=o,Nr.transition=i}}function D1(e,t,n,r){var o=se,i=Nr.transition;Nr.transition=null;try{se=4,Sc(e,t,n,r)}finally{se=o,Nr.transition=i}}function Sc(e,t,n,r){if(Rl){var o=fu(e,t,n,r);if(o===null)us(e,t,r,Il,n),Jd(e,r);else if(L1(o,e,t,n,r))r.stopPropagation();else if(Jd(e,r),t&4&&-1<A1.indexOf(e)){for(;o!==null;){var i=bi(o);if(i!==null&&rh(i),i=fu(e,t,n,r),i===null&&us(e,t,r,Il,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else us(e,t,r,null,n)}}var Il=null;function fu(e,t,n,r){if(Il=null,e=wc(r),e=nr(e),e!==null)if(t=mr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Gm(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Il=e,null}function sh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(S1()){case bc:return 1;case Zm:return 4;case Pl:case C1:return 16;case eh:return 536870912;default:return 16}default:return 16}}var An=null,Cc=null,ul=null;function uh(){if(ul)return ul;var e,t=Cc,n=t.length,r,o="value"in An?An.value:An.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return ul=o.slice(e,1<r?1-r:void 0)}function cl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ji(){return!0}function ef(){return!1}function Tt(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ji:ef,this.isPropagationStopped=ef,this}return Ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ji)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ji)},persist:function(){},isPersistent:ji}),t}var to={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ec=Tt(to),wi=Ce({},to,{view:0,detail:0}),F1=Tt(wi),es,ts,po,aa=Ce({},wi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==po&&(po&&e.type==="mousemove"?(es=e.screenX-po.screenX,ts=e.screenY-po.screenY):ts=es=0,po=e),es)},movementY:function(e){return"movementY"in e?e.movementY:ts}}),tf=Tt(aa),N1=Ce({},aa,{dataTransfer:0}),j1=Tt(N1),$1=Ce({},wi,{relatedTarget:0}),ns=Tt($1),B1=Ce({},to,{animationName:0,elapsedTime:0,pseudoElement:0}),U1=Tt(B1),H1=Ce({},to,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),V1=Tt(H1),W1=Ce({},to,{data:0}),nf=Tt(W1),K1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Q1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},q1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function G1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=q1[e])?!!t[e]:!1}function Tc(){return G1}var Y1=Ce({},wi,{key:function(e){if(e.key){var t=K1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Q1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tc,charCode:function(e){return e.type==="keypress"?cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),X1=Tt(Y1),J1=Ce({},aa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rf=Tt(J1),Z1=Ce({},wi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tc}),ek=Tt(Z1),tk=Ce({},to,{propertyName:0,elapsedTime:0,pseudoElement:0}),nk=Tt(tk),rk=Ce({},aa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ok=Tt(rk),ik=[9,13,27,32],Pc=yn&&"CompositionEvent"in window,To=null;yn&&"documentMode"in document&&(To=document.documentMode);var lk=yn&&"TextEvent"in window&&!To,ch=yn&&(!Pc||To&&8<To&&11>=To),of=" ",lf=!1;function dh(e,t){switch(e){case"keyup":return ik.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Er=!1;function ak(e,t){switch(e){case"compositionend":return fh(t);case"keypress":return t.which!==32?null:(lf=!0,of);case"textInput":return e=t.data,e===of&&lf?null:e;default:return null}}function sk(e,t){if(Er)return e==="compositionend"||!Pc&&dh(e,t)?(e=uh(),ul=Cc=An=null,Er=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ch&&t.locale!=="ko"?null:t.data;default:return null}}var uk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function af(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!uk[e.type]:t==="textarea"}function ph(e,t,n,r){Vm(r),t=Ol(t,"onChange"),0<t.length&&(n=new Ec("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Po=null,Vo=null;function ck(e){Ch(e,0)}function sa(e){var t=_r(e);if(Fm(t))return e}function dk(e,t){if(e==="change")return t}var mh=!1;if(yn){var rs;if(yn){var os="oninput"in document;if(!os){var sf=document.createElement("div");sf.setAttribute("oninput","return;"),os=typeof sf.oninput=="function"}rs=os}else rs=!1;mh=rs&&(!document.documentMode||9<document.documentMode)}function uf(){Po&&(Po.detachEvent("onpropertychange",hh),Vo=Po=null)}function hh(e){if(e.propertyName==="value"&&sa(Vo)){var t=[];ph(t,Vo,e,wc(e)),qm(ck,t)}}function fk(e,t,n){e==="focusin"?(uf(),Po=t,Vo=n,Po.attachEvent("onpropertychange",hh)):e==="focusout"&&uf()}function pk(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return sa(Vo)}function mk(e,t){if(e==="click")return sa(t)}function hk(e,t){if(e==="input"||e==="change")return sa(t)}function gk(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Yt=typeof Object.is=="function"?Object.is:gk;function Wo(e,t){if(Yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!qs.call(t,o)||!Yt(e[o],t[o]))return!1}return!0}function cf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function df(e,t){var n=cf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=cf(n)}}function gh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function yh(){for(var e=window,t=Cl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Cl(e.document)}return t}function _c(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function yk(e){var t=yh(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&gh(n.ownerDocument.documentElement,n)){if(r!==null&&_c(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=df(n,i);var l=df(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var kk=yn&&"documentMode"in document&&11>=document.documentMode,Tr=null,pu=null,_o=null,mu=!1;function ff(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;mu||Tr==null||Tr!==Cl(r)||(r=Tr,"selectionStart"in r&&_c(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),_o&&Wo(_o,r)||(_o=r,r=Ol(pu,"onSelect"),0<r.length&&(t=new Ec("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Tr)))}function $i(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Pr={animationend:$i("Animation","AnimationEnd"),animationiteration:$i("Animation","AnimationIteration"),animationstart:$i("Animation","AnimationStart"),transitionend:$i("Transition","TransitionEnd")},is={},kh={};yn&&(kh=document.createElement("div").style,"AnimationEvent"in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),"TransitionEvent"in window||delete Pr.transitionend.transition);function ua(e){if(is[e])return is[e];if(!Pr[e])return e;var t=Pr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in kh)return is[e]=t[n];return e}var wh=ua("animationend"),bh=ua("animationiteration"),vh=ua("animationstart"),xh=ua("transitionend"),Sh=new Map,pf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qn(e,t){Sh.set(e,t),pr(t,[e])}for(var ls=0;ls<pf.length;ls++){var as=pf[ls],wk=as.toLowerCase(),bk=as[0].toUpperCase()+as.slice(1);Qn(wk,"on"+bk)}Qn(wh,"onAnimationEnd");Qn(bh,"onAnimationIteration");Qn(vh,"onAnimationStart");Qn("dblclick","onDoubleClick");Qn("focusin","onFocus");Qn("focusout","onBlur");Qn(xh,"onTransitionEnd");Vr("onMouseEnter",["mouseout","mouseover"]);Vr("onMouseLeave",["mouseout","mouseover"]);Vr("onPointerEnter",["pointerout","pointerover"]);Vr("onPointerLeave",["pointerout","pointerover"]);pr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));pr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));pr("onBeforeInput",["compositionend","keypress","textInput","paste"]);pr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));pr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));pr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var So="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vk=new Set("cancel close invalid load scroll toggle".split(" ").concat(So));function mf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,w1(r,t,void 0,e),e.currentTarget=null}function Ch(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],s=a.instance,u=a.currentTarget;if(a=a.listener,s!==i&&o.isPropagationStopped())break e;mf(o,a,u),i=s}else for(l=0;l<r.length;l++){if(a=r[l],s=a.instance,u=a.currentTarget,a=a.listener,s!==i&&o.isPropagationStopped())break e;mf(o,a,u),i=s}}}if(Tl)throw e=uu,Tl=!1,uu=null,e}function ge(e,t){var n=t[wu];n===void 0&&(n=t[wu]=new Set);var r=e+"__bubble";n.has(r)||(Eh(t,e,2,!1),n.add(r))}function ss(e,t,n){var r=0;t&&(r|=4),Eh(n,e,r,t)}var Bi="_reactListening"+Math.random().toString(36).slice(2);function Ko(e){if(!e[Bi]){e[Bi]=!0,Am.forEach(function(n){n!=="selectionchange"&&(vk.has(n)||ss(n,!1,e),ss(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bi]||(t[Bi]=!0,ss("selectionchange",!1,t))}}function Eh(e,t,n,r){switch(sh(t)){case 1:var o=M1;break;case 4:o=D1;break;default:o=Sc}n=o.bind(null,t,n,e),o=void 0,!su||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function us(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;l=l.return}for(;a!==null;){if(l=nr(a),l===null)return;if(s=l.tag,s===5||s===6){r=i=l;continue e}a=a.parentNode}}r=r.return}qm(function(){var u=i,d=wc(n),c=[];e:{var f=Sh.get(e);if(f!==void 0){var p=Ec,h=e;switch(e){case"keypress":if(cl(n)===0)break e;case"keydown":case"keyup":p=X1;break;case"focusin":h="focus",p=ns;break;case"focusout":h="blur",p=ns;break;case"beforeblur":case"afterblur":p=ns;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=tf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=j1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=ek;break;case wh:case bh:case vh:p=U1;break;case xh:p=nk;break;case"scroll":p=F1;break;case"wheel":p=ok;break;case"copy":case"cut":case"paste":p=V1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=rf}var y=(t&4)!==0,v=!y&&e==="scroll",g=y?f!==null?f+"Capture":null:f;y=[];for(var m=u,k;m!==null;){k=m;var C=k.stateNode;if(k.tag===5&&C!==null&&(k=C,g!==null&&(C=$o(m,g),C!=null&&y.push(Qo(m,C,k)))),v)break;m=m.return}0<y.length&&(f=new p(f,h,null,n,d),c.push({event:f,listeners:y}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==lu&&(h=n.relatedTarget||n.fromElement)&&(nr(h)||h[kn]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(h=n.relatedTarget||n.toElement,p=u,h=h?nr(h):null,h!==null&&(v=mr(h),h!==v||h.tag!==5&&h.tag!==6)&&(h=null)):(p=null,h=u),p!==h)){if(y=tf,C="onMouseLeave",g="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(y=rf,C="onPointerLeave",g="onPointerEnter",m="pointer"),v=p==null?f:_r(p),k=h==null?f:_r(h),f=new y(C,m+"leave",p,n,d),f.target=v,f.relatedTarget=k,C=null,nr(d)===u&&(y=new y(g,m+"enter",h,n,d),y.target=k,y.relatedTarget=v,C=y),v=C,p&&h)t:{for(y=p,g=h,m=0,k=y;k;k=br(k))m++;for(k=0,C=g;C;C=br(C))k++;for(;0<m-k;)y=br(y),m--;for(;0<k-m;)g=br(g),k--;for(;m--;){if(y===g||g!==null&&y===g.alternate)break t;y=br(y),g=br(g)}y=null}else y=null;p!==null&&hf(c,f,p,y,!1),h!==null&&v!==null&&hf(c,v,h,y,!0)}}e:{if(f=u?_r(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=dk;else if(af(f))if(mh)T=hk;else{T=pk;var S=fk}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(T=mk);if(T&&(T=T(e,u))){ph(c,T,n,d);break e}S&&S(e,f,u),e==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&tu(f,"number",f.value)}switch(S=u?_r(u):window,e){case"focusin":(af(S)||S.contentEditable==="true")&&(Tr=S,pu=u,_o=null);break;case"focusout":_o=pu=Tr=null;break;case"mousedown":mu=!0;break;case"contextmenu":case"mouseup":case"dragend":mu=!1,ff(c,n,d);break;case"selectionchange":if(kk)break;case"keydown":case"keyup":ff(c,n,d)}var E;if(Pc)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Er?dh(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(ch&&n.locale!=="ko"&&(Er||P!=="onCompositionStart"?P==="onCompositionEnd"&&Er&&(E=uh()):(An=d,Cc="value"in An?An.value:An.textContent,Er=!0)),S=Ol(u,P),0<S.length&&(P=new nf(P,e,null,n,d),c.push({event:P,listeners:S}),E?P.data=E:(E=fh(n),E!==null&&(P.data=E)))),(E=lk?ak(e,n):sk(e,n))&&(u=Ol(u,"onBeforeInput"),0<u.length&&(d=new nf("onBeforeInput","beforeinput",null,n,d),c.push({event:d,listeners:u}),d.data=E))}Ch(c,t)})}function Qo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ol(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=$o(e,n),i!=null&&r.unshift(Qo(e,i,o)),i=$o(e,t),i!=null&&r.push(Qo(e,i,o))),e=e.return}return r}function br(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function hf(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var a=n,s=a.alternate,u=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&u!==null&&(a=u,o?(s=$o(n,i),s!=null&&l.unshift(Qo(n,s,a))):o||(s=$o(n,i),s!=null&&l.push(Qo(n,s,a)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var xk=/\r\n?/g,Sk=/\u0000|\uFFFD/g;function gf(e){return(typeof e=="string"?e:""+e).replace(xk,`
`).replace(Sk,"")}function Ui(e,t,n){if(t=gf(t),gf(e)!==t&&n)throw Error(z(425))}function Al(){}var hu=null,gu=null;function yu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ku=typeof setTimeout=="function"?setTimeout:void 0,Ck=typeof clearTimeout=="function"?clearTimeout:void 0,yf=typeof Promise=="function"?Promise:void 0,Ek=typeof queueMicrotask=="function"?queueMicrotask:typeof yf<"u"?function(e){return yf.resolve(null).then(e).catch(Tk)}:ku;function Tk(e){setTimeout(function(){throw e})}function cs(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Ho(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Ho(t)}function Nn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function kf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var no=Math.random().toString(36).slice(2),nn="__reactFiber$"+no,qo="__reactProps$"+no,kn="__reactContainer$"+no,wu="__reactEvents$"+no,Pk="__reactListeners$"+no,_k="__reactHandles$"+no;function nr(e){var t=e[nn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kn]||n[nn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=kf(e);e!==null;){if(n=e[nn])return n;e=kf(e)}return t}e=n,n=e.parentNode}return null}function bi(e){return e=e[nn]||e[kn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function _r(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(z(33))}function ca(e){return e[qo]||null}var bu=[],Rr=-1;function qn(e){return{current:e}}function ye(e){0>Rr||(e.current=bu[Rr],bu[Rr]=null,Rr--)}function he(e,t){Rr++,bu[Rr]=e.current,e.current=t}var Wn={},Je=qn(Wn),ct=qn(!1),ar=Wn;function Wr(e,t){var n=e.type.contextTypes;if(!n)return Wn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function dt(e){return e=e.childContextTypes,e!=null}function Ll(){ye(ct),ye(Je)}function wf(e,t,n){if(Je.current!==Wn)throw Error(z(168));he(Je,t),he(ct,n)}function Th(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(z(108,f1(e)||"Unknown",o));return Ce({},n,r)}function zl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Wn,ar=Je.current,he(Je,e),he(ct,ct.current),!0}function bf(e,t,n){var r=e.stateNode;if(!r)throw Error(z(169));n?(e=Th(e,t,ar),r.__reactInternalMemoizedMergedChildContext=e,ye(ct),ye(Je),he(Je,e)):ye(ct),he(ct,n)}var dn=null,da=!1,ds=!1;function Ph(e){dn===null?dn=[e]:dn.push(e)}function Rk(e){da=!0,Ph(e)}function Gn(){if(!ds&&dn!==null){ds=!0;var e=0,t=se;try{var n=dn;for(se=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}dn=null,da=!1}catch(o){throw dn!==null&&(dn=dn.slice(e+1)),Jm(bc,Gn),o}finally{se=t,ds=!1}}return null}var Ir=[],Or=0,Ml=null,Dl=0,Rt=[],It=0,sr=null,pn=1,mn="";function Zn(e,t){Ir[Or++]=Dl,Ir[Or++]=Ml,Ml=e,Dl=t}function _h(e,t,n){Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=sr,sr=e;var r=pn;e=mn;var o=32-Qt(r)-1;r&=~(1<<o),n+=1;var i=32-Qt(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,pn=1<<32-Qt(t)+o|n<<o|r,mn=i+e}else pn=1<<i|n<<o|r,mn=e}function Rc(e){e.return!==null&&(Zn(e,1),_h(e,1,0))}function Ic(e){for(;e===Ml;)Ml=Ir[--Or],Ir[Or]=null,Dl=Ir[--Or],Ir[Or]=null;for(;e===sr;)sr=Rt[--It],Rt[It]=null,mn=Rt[--It],Rt[It]=null,pn=Rt[--It],Rt[It]=null}var vt=null,bt=null,be=!1,Wt=null;function Rh(e,t){var n=zt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function vf(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,vt=e,bt=Nn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,vt=e,bt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=sr!==null?{id:pn,overflow:mn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=zt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,vt=e,bt=null,!0):!1;default:return!1}}function vu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function xu(e){if(be){var t=bt;if(t){var n=t;if(!vf(e,t)){if(vu(e))throw Error(z(418));t=Nn(n.nextSibling);var r=vt;t&&vf(e,t)?Rh(r,n):(e.flags=e.flags&-4097|2,be=!1,vt=e)}}else{if(vu(e))throw Error(z(418));e.flags=e.flags&-4097|2,be=!1,vt=e}}}function xf(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;vt=e}function Hi(e){if(e!==vt)return!1;if(!be)return xf(e),be=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!yu(e.type,e.memoizedProps)),t&&(t=bt)){if(vu(e))throw Ih(),Error(z(418));for(;t;)Rh(e,t),t=Nn(t.nextSibling)}if(xf(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){bt=Nn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}bt=null}}else bt=vt?Nn(e.stateNode.nextSibling):null;return!0}function Ih(){for(var e=bt;e;)e=Nn(e.nextSibling)}function Kr(){bt=vt=null,be=!1}function Oc(e){Wt===null?Wt=[e]:Wt.push(e)}var Ik=xn.ReactCurrentBatchConfig;function Ht(e,t){if(e&&e.defaultProps){t=Ce({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var Fl=qn(null),Nl=null,Ar=null,Ac=null;function Lc(){Ac=Ar=Nl=null}function zc(e){var t=Fl.current;ye(Fl),e._currentValue=t}function Su(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function jr(e,t){Nl=e,Ac=Ar=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ut=!0),e.firstContext=null)}function Dt(e){var t=e._currentValue;if(Ac!==e)if(e={context:e,memoizedValue:t,next:null},Ar===null){if(Nl===null)throw Error(z(308));Ar=e,Nl.dependencies={lanes:0,firstContext:e}}else Ar=Ar.next=e;return t}var rr=null;function Mc(e){rr===null?rr=[e]:rr.push(e)}function Oh(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Mc(t)):(n.next=o.next,o.next=n),t.interleaved=n,wn(e,r)}function wn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var _n=!1;function Dc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ah(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function jn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,re&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,wn(e,n)}return o=r.interleaved,o===null?(t.next=t,Mc(r)):(t.next=o.next,o.next=t),r.interleaved=t,wn(e,n)}function dl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vc(e,n)}}function Sf(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function jl(e,t,n,r){var o=e.updateQueue;_n=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var s=a,u=s.next;s.next=null,l===null?i=u:l.next=u,l=s;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==l&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=s))}if(i!==null){var c=o.baseState;l=0,d=u=s=null,a=i;do{var f=a.lane,p=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var h=e,y=a;switch(f=t,p=n,y.tag){case 1:if(h=y.payload,typeof h=="function"){c=h.call(p,c,f);break e}c=h;break e;case 3:h.flags=h.flags&-65537|128;case 0:if(h=y.payload,f=typeof h=="function"?h.call(p,c,f):h,f==null)break e;c=Ce({},c,f);break e;case 2:_n=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=p,s=c):d=d.next=p,l|=f;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;f=a,a=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(d===null&&(s=c),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);cr|=l,e.lanes=l,e.memoizedState=c}}function Cf(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(z(191,o));o.call(r)}}}var Lh=new Om.Component().refs;function Cu(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ce({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fa={isMounted:function(e){return(e=e._reactInternals)?mr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),dl(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=nt(),o=Bn(e),i=gn(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=jn(e,i,o),t!==null&&(qt(t,e,o,r),dl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=nt(),r=Bn(e),o=gn(n,r);o.tag=2,t!=null&&(o.callback=t),t=jn(e,o,r),t!==null&&(qt(t,e,r,n),dl(t,e,r))}};function Ef(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!Wo(n,r)||!Wo(o,i):!0}function zh(e,t,n){var r=!1,o=Wn,i=t.contextType;return typeof i=="object"&&i!==null?i=Dt(i):(o=dt(t)?ar:Je.current,r=t.contextTypes,i=(r=r!=null)?Wr(e,o):Wn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Tf(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fa.enqueueReplaceState(t,t.state,null)}function Eu(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=Lh,Dc(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Dt(i):(i=dt(t)?ar:Je.current,o.context=Wr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Cu(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&fa.enqueueReplaceState(o,o.state,null),jl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function mo(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(z(309));var r=n.stateNode}if(!r)throw Error(z(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var a=o.refs;a===Lh&&(a=o.refs={}),l===null?delete a[i]:a[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(z(284));if(!n._owner)throw Error(z(290,e))}return e}function Vi(e,t){throw e=Object.prototype.toString.call(t),Error(z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Pf(e){var t=e._init;return t(e._payload)}function Mh(e){function t(g,m){if(e){var k=g.deletions;k===null?(g.deletions=[m],g.flags|=16):k.push(m)}}function n(g,m){if(!e)return null;for(;m!==null;)t(g,m),m=m.sibling;return null}function r(g,m){for(g=new Map;m!==null;)m.key!==null?g.set(m.key,m):g.set(m.index,m),m=m.sibling;return g}function o(g,m){return g=Un(g,m),g.index=0,g.sibling=null,g}function i(g,m,k){return g.index=k,e?(k=g.alternate,k!==null?(k=k.index,k<m?(g.flags|=2,m):k):(g.flags|=2,m)):(g.flags|=1048576,m)}function l(g){return e&&g.alternate===null&&(g.flags|=2),g}function a(g,m,k,C){return m===null||m.tag!==6?(m=ks(k,g.mode,C),m.return=g,m):(m=o(m,k),m.return=g,m)}function s(g,m,k,C){var T=k.type;return T===Cr?d(g,m,k.props.children,C,k.key):m!==null&&(m.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Pf(T)===m.type)?(C=o(m,k.props),C.ref=mo(g,m,k),C.return=g,C):(C=yl(k.type,k.key,k.props,null,g.mode,C),C.ref=mo(g,m,k),C.return=g,C)}function u(g,m,k,C){return m===null||m.tag!==4||m.stateNode.containerInfo!==k.containerInfo||m.stateNode.implementation!==k.implementation?(m=ws(k,g.mode,C),m.return=g,m):(m=o(m,k.children||[]),m.return=g,m)}function d(g,m,k,C,T){return m===null||m.tag!==7?(m=lr(k,g.mode,C,T),m.return=g,m):(m=o(m,k),m.return=g,m)}function c(g,m,k){if(typeof m=="string"&&m!==""||typeof m=="number")return m=ks(""+m,g.mode,k),m.return=g,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Li:return k=yl(m.type,m.key,m.props,null,g.mode,k),k.ref=mo(g,null,m),k.return=g,k;case Sr:return m=ws(m,g.mode,k),m.return=g,m;case Pn:var C=m._init;return c(g,C(m._payload),k)}if(vo(m)||so(m))return m=lr(m,g.mode,k,null),m.return=g,m;Vi(g,m)}return null}function f(g,m,k,C){var T=m!==null?m.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return T!==null?null:a(g,m,""+k,C);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Li:return k.key===T?s(g,m,k,C):null;case Sr:return k.key===T?u(g,m,k,C):null;case Pn:return T=k._init,f(g,m,T(k._payload),C)}if(vo(k)||so(k))return T!==null?null:d(g,m,k,C,null);Vi(g,k)}return null}function p(g,m,k,C,T){if(typeof C=="string"&&C!==""||typeof C=="number")return g=g.get(k)||null,a(m,g,""+C,T);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case Li:return g=g.get(C.key===null?k:C.key)||null,s(m,g,C,T);case Sr:return g=g.get(C.key===null?k:C.key)||null,u(m,g,C,T);case Pn:var S=C._init;return p(g,m,k,S(C._payload),T)}if(vo(C)||so(C))return g=g.get(k)||null,d(m,g,C,T,null);Vi(m,C)}return null}function h(g,m,k,C){for(var T=null,S=null,E=m,P=m=0,M=null;E!==null&&P<k.length;P++){E.index>P?(M=E,E=null):M=E.sibling;var b=f(g,E,k[P],C);if(b===null){E===null&&(E=M);break}e&&E&&b.alternate===null&&t(g,E),m=i(b,m,P),S===null?T=b:S.sibling=b,S=b,E=M}if(P===k.length)return n(g,E),be&&Zn(g,P),T;if(E===null){for(;P<k.length;P++)E=c(g,k[P],C),E!==null&&(m=i(E,m,P),S===null?T=E:S.sibling=E,S=E);return be&&Zn(g,P),T}for(E=r(g,E);P<k.length;P++)M=p(E,g,P,k[P],C),M!==null&&(e&&M.alternate!==null&&E.delete(M.key===null?P:M.key),m=i(M,m,P),S===null?T=M:S.sibling=M,S=M);return e&&E.forEach(function(O){return t(g,O)}),be&&Zn(g,P),T}function y(g,m,k,C){var T=so(k);if(typeof T!="function")throw Error(z(150));if(k=T.call(k),k==null)throw Error(z(151));for(var S=T=null,E=m,P=m=0,M=null,b=k.next();E!==null&&!b.done;P++,b=k.next()){E.index>P?(M=E,E=null):M=E.sibling;var O=f(g,E,b.value,C);if(O===null){E===null&&(E=M);break}e&&E&&O.alternate===null&&t(g,E),m=i(O,m,P),S===null?T=O:S.sibling=O,S=O,E=M}if(b.done)return n(g,E),be&&Zn(g,P),T;if(E===null){for(;!b.done;P++,b=k.next())b=c(g,b.value,C),b!==null&&(m=i(b,m,P),S===null?T=b:S.sibling=b,S=b);return be&&Zn(g,P),T}for(E=r(g,E);!b.done;P++,b=k.next())b=p(E,g,P,b.value,C),b!==null&&(e&&b.alternate!==null&&E.delete(b.key===null?P:b.key),m=i(b,m,P),S===null?T=b:S.sibling=b,S=b);return e&&E.forEach(function(L){return t(g,L)}),be&&Zn(g,P),T}function v(g,m,k,C){if(typeof k=="object"&&k!==null&&k.type===Cr&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case Li:e:{for(var T=k.key,S=m;S!==null;){if(S.key===T){if(T=k.type,T===Cr){if(S.tag===7){n(g,S.sibling),m=o(S,k.props.children),m.return=g,g=m;break e}}else if(S.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Pn&&Pf(T)===S.type){n(g,S.sibling),m=o(S,k.props),m.ref=mo(g,S,k),m.return=g,g=m;break e}n(g,S);break}else t(g,S);S=S.sibling}k.type===Cr?(m=lr(k.props.children,g.mode,C,k.key),m.return=g,g=m):(C=yl(k.type,k.key,k.props,null,g.mode,C),C.ref=mo(g,m,k),C.return=g,g=C)}return l(g);case Sr:e:{for(S=k.key;m!==null;){if(m.key===S)if(m.tag===4&&m.stateNode.containerInfo===k.containerInfo&&m.stateNode.implementation===k.implementation){n(g,m.sibling),m=o(m,k.children||[]),m.return=g,g=m;break e}else{n(g,m);break}else t(g,m);m=m.sibling}m=ws(k,g.mode,C),m.return=g,g=m}return l(g);case Pn:return S=k._init,v(g,m,S(k._payload),C)}if(vo(k))return h(g,m,k,C);if(so(k))return y(g,m,k,C);Vi(g,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,m!==null&&m.tag===6?(n(g,m.sibling),m=o(m,k),m.return=g,g=m):(n(g,m),m=ks(k,g.mode,C),m.return=g,g=m),l(g)):n(g,m)}return v}var Qr=Mh(!0),Dh=Mh(!1),vi={},on=qn(vi),Go=qn(vi),Yo=qn(vi);function or(e){if(e===vi)throw Error(z(174));return e}function Fc(e,t){switch(he(Yo,t),he(Go,e),he(on,vi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ru(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ru(t,e)}ye(on),he(on,t)}function qr(){ye(on),ye(Go),ye(Yo)}function Fh(e){or(Yo.current);var t=or(on.current),n=ru(t,e.type);t!==n&&(he(Go,e),he(on,n))}function Nc(e){Go.current===e&&(ye(on),ye(Go))}var xe=qn(0);function $l(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var fs=[];function jc(){for(var e=0;e<fs.length;e++)fs[e]._workInProgressVersionPrimary=null;fs.length=0}var fl=xn.ReactCurrentDispatcher,ps=xn.ReactCurrentBatchConfig,ur=0,Se=null,De=null,je=null,Bl=!1,Ro=!1,Xo=0,Ok=0;function Qe(){throw Error(z(321))}function $c(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yt(e[n],t[n]))return!1;return!0}function Bc(e,t,n,r,o,i){if(ur=i,Se=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fl.current=e===null||e.memoizedState===null?Mk:Dk,e=n(r,o),Ro){i=0;do{if(Ro=!1,Xo=0,25<=i)throw Error(z(301));i+=1,je=De=null,t.updateQueue=null,fl.current=Fk,e=n(r,o)}while(Ro)}if(fl.current=Ul,t=De!==null&&De.next!==null,ur=0,je=De=Se=null,Bl=!1,t)throw Error(z(300));return e}function Uc(){var e=Xo!==0;return Xo=0,e}function Jt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return je===null?Se.memoizedState=je=e:je=je.next=e,je}function Ft(){if(De===null){var e=Se.alternate;e=e!==null?e.memoizedState:null}else e=De.next;var t=je===null?Se.memoizedState:je.next;if(t!==null)je=t,De=e;else{if(e===null)throw Error(z(310));De=e,e={memoizedState:De.memoizedState,baseState:De.baseState,baseQueue:De.baseQueue,queue:De.queue,next:null},je===null?Se.memoizedState=je=e:je=je.next=e}return je}function Jo(e,t){return typeof t=="function"?t(e):t}function ms(e){var t=Ft(),n=t.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=e;var r=De,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var a=l=null,s=null,u=i;do{var d=u.lane;if((ur&d)===d)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(a=s=c,l=r):s=s.next=c,Se.lanes|=d,cr|=d}u=u.next}while(u!==null&&u!==i);s===null?l=r:s.next=a,Yt(r,t.memoizedState)||(ut=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Se.lanes|=i,cr|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function hs(e){var t=Ft(),n=t.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);Yt(i,t.memoizedState)||(ut=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Nh(){}function jh(e,t){var n=Se,r=Ft(),o=t(),i=!Yt(r.memoizedState,o);if(i&&(r.memoizedState=o,ut=!0),r=r.queue,Hc(Uh.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||je!==null&&je.memoizedState.tag&1){if(n.flags|=2048,Zo(9,Bh.bind(null,n,r,o,t),void 0,null),$e===null)throw Error(z(349));ur&30||$h(n,t,o)}return o}function $h(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bh(e,t,n,r){t.value=n,t.getSnapshot=r,Hh(t)&&Vh(e)}function Uh(e,t,n){return n(function(){Hh(t)&&Vh(e)})}function Hh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yt(e,n)}catch{return!0}}function Vh(e){var t=wn(e,1);t!==null&&qt(t,e,1,-1)}function _f(e){var t=Jt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:e},t.queue=e,e=e.dispatch=zk.bind(null,Se,e),[t.memoizedState,e]}function Zo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Wh(){return Ft().memoizedState}function pl(e,t,n,r){var o=Jt();Se.flags|=e,o.memoizedState=Zo(1|t,n,void 0,r===void 0?null:r)}function pa(e,t,n,r){var o=Ft();r=r===void 0?null:r;var i=void 0;if(De!==null){var l=De.memoizedState;if(i=l.destroy,r!==null&&$c(r,l.deps)){o.memoizedState=Zo(t,n,i,r);return}}Se.flags|=e,o.memoizedState=Zo(1|t,n,i,r)}function Rf(e,t){return pl(8390656,8,e,t)}function Hc(e,t){return pa(2048,8,e,t)}function Kh(e,t){return pa(4,2,e,t)}function Qh(e,t){return pa(4,4,e,t)}function qh(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gh(e,t,n){return n=n!=null?n.concat([e]):null,pa(4,4,qh.bind(null,t,e),n)}function Vc(){}function Yh(e,t){var n=Ft();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&$c(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Xh(e,t){var n=Ft();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&$c(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Jh(e,t,n){return ur&21?(Yt(n,t)||(n=th(),Se.lanes|=n,cr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ut=!0),e.memoizedState=n)}function Ak(e,t){var n=se;se=n!==0&&4>n?n:4,e(!0);var r=ps.transition;ps.transition={};try{e(!1),t()}finally{se=n,ps.transition=r}}function Zh(){return Ft().memoizedState}function Lk(e,t,n){var r=Bn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},eg(e))tg(t,n);else if(n=Oh(e,t,n,r),n!==null){var o=nt();qt(n,e,r,o),ng(n,t,r)}}function zk(e,t,n){var r=Bn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(eg(e))tg(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,a=i(l,n);if(o.hasEagerState=!0,o.eagerState=a,Yt(a,l)){var s=t.interleaved;s===null?(o.next=o,Mc(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=Oh(e,t,o,r),n!==null&&(o=nt(),qt(n,e,r,o),ng(n,t,r))}}function eg(e){var t=e.alternate;return e===Se||t!==null&&t===Se}function tg(e,t){Ro=Bl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ng(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vc(e,n)}}var Ul={readContext:Dt,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useInsertionEffect:Qe,useLayoutEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useMutableSource:Qe,useSyncExternalStore:Qe,useId:Qe,unstable_isNewReconciler:!1},Mk={readContext:Dt,useCallback:function(e,t){return Jt().memoizedState=[e,t===void 0?null:t],e},useContext:Dt,useEffect:Rf,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,pl(4194308,4,qh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return pl(4194308,4,e,t)},useInsertionEffect:function(e,t){return pl(4,2,e,t)},useMemo:function(e,t){var n=Jt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Jt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Lk.bind(null,Se,e),[r.memoizedState,e]},useRef:function(e){var t=Jt();return e={current:e},t.memoizedState=e},useState:_f,useDebugValue:Vc,useDeferredValue:function(e){return Jt().memoizedState=e},useTransition:function(){var e=_f(!1),t=e[0];return e=Ak.bind(null,e[1]),Jt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Se,o=Jt();if(be){if(n===void 0)throw Error(z(407));n=n()}else{if(n=t(),$e===null)throw Error(z(349));ur&30||$h(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Rf(Uh.bind(null,r,i,e),[e]),r.flags|=2048,Zo(9,Bh.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Jt(),t=$e.identifierPrefix;if(be){var n=mn,r=pn;n=(r&~(1<<32-Qt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Ok++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Dk={readContext:Dt,useCallback:Yh,useContext:Dt,useEffect:Hc,useImperativeHandle:Gh,useInsertionEffect:Kh,useLayoutEffect:Qh,useMemo:Xh,useReducer:ms,useRef:Wh,useState:function(){return ms(Jo)},useDebugValue:Vc,useDeferredValue:function(e){var t=Ft();return Jh(t,De.memoizedState,e)},useTransition:function(){var e=ms(Jo)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:Nh,useSyncExternalStore:jh,useId:Zh,unstable_isNewReconciler:!1},Fk={readContext:Dt,useCallback:Yh,useContext:Dt,useEffect:Hc,useImperativeHandle:Gh,useInsertionEffect:Kh,useLayoutEffect:Qh,useMemo:Xh,useReducer:hs,useRef:Wh,useState:function(){return hs(Jo)},useDebugValue:Vc,useDeferredValue:function(e){var t=Ft();return De===null?t.memoizedState=e:Jh(t,De.memoizedState,e)},useTransition:function(){var e=hs(Jo)[0],t=Ft().memoizedState;return[e,t]},useMutableSource:Nh,useSyncExternalStore:jh,useId:Zh,unstable_isNewReconciler:!1};function Gr(e,t){try{var n="",r=t;do n+=d1(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function gs(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Tu(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Nk=typeof WeakMap=="function"?WeakMap:Map;function rg(e,t,n){n=gn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Vl||(Vl=!0,Du=r),Tu(e,t)},n}function og(e,t,n){n=gn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Tu(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Tu(e,t),typeof r!="function"&&($n===null?$n=new Set([this]):$n.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function If(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Nk;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Jk.bind(null,e,t,n),t.then(e,e))}function Of(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Af(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gn(-1,1),t.tag=2,jn(n,t,1))),n.lanes|=1),e)}var jk=xn.ReactCurrentOwner,ut=!1;function et(e,t,n,r){t.child=e===null?Dh(t,null,n,r):Qr(t,e.child,n,r)}function Lf(e,t,n,r,o){n=n.render;var i=t.ref;return jr(t,o),r=Bc(e,t,n,r,i,o),n=Uc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(be&&n&&Rc(t),t.flags|=1,et(e,t,r,o),t.child)}function zf(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Jc(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,ig(e,t,i,r,o)):(e=yl(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wo,n(l,r)&&e.ref===t.ref)return bn(e,t,o)}return t.flags|=1,e=Un(i,r),e.ref=t.ref,e.return=t,t.child=e}function ig(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Wo(i,r)&&e.ref===t.ref)if(ut=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(ut=!0);else return t.lanes=e.lanes,bn(e,t,o)}return Pu(e,t,n,r,o)}function lg(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(zr,kt),kt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,he(zr,kt),kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,he(zr,kt),kt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,he(zr,kt),kt|=r;return et(e,t,o,n),t.child}function ag(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Pu(e,t,n,r,o){var i=dt(n)?ar:Je.current;return i=Wr(t,i),jr(t,o),n=Bc(e,t,n,r,i,o),r=Uc(),e!==null&&!ut?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,bn(e,t,o)):(be&&r&&Rc(t),t.flags|=1,et(e,t,n,o),t.child)}function Mf(e,t,n,r,o){if(dt(n)){var i=!0;zl(t)}else i=!1;if(jr(t,o),t.stateNode===null)ml(e,t),zh(t,n,r),Eu(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,a=t.memoizedProps;l.props=a;var s=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=Dt(u):(u=dt(n)?ar:Je.current,u=Wr(t,u));var d=n.getDerivedStateFromProps,c=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function";c||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==r||s!==u)&&Tf(t,l,r,u),_n=!1;var f=t.memoizedState;l.state=f,jl(t,r,l,o),s=t.memoizedState,a!==r||f!==s||ct.current||_n?(typeof d=="function"&&(Cu(t,n,d,r),s=t.memoizedState),(a=_n||Ef(t,n,a,r,f,s,u))?(c||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=a):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Ah(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:Ht(t.type,a),l.props=u,c=t.pendingProps,f=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=Dt(s):(s=dt(n)?ar:Je.current,s=Wr(t,s));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==c||f!==s)&&Tf(t,l,r,s),_n=!1,f=t.memoizedState,l.state=f,jl(t,r,l,o);var h=t.memoizedState;a!==c||f!==h||ct.current||_n?(typeof p=="function"&&(Cu(t,n,p,r),h=t.memoizedState),(u=_n||Ef(t,n,u,r,f,h,s)||!1)?(d||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,h,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,h,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),l.props=r,l.state=h,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return _u(e,t,n,r,i,o)}function _u(e,t,n,r,o,i){ag(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&bf(t,n,!1),bn(e,t,i);r=t.stateNode,jk.current=t;var a=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Qr(t,e.child,null,i),t.child=Qr(t,null,a,i)):et(e,t,a,i),t.memoizedState=r.state,o&&bf(t,n,!0),t.child}function sg(e){var t=e.stateNode;t.pendingContext?wf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&wf(e,t.context,!1),Fc(e,t.containerInfo)}function Df(e,t,n,r,o){return Kr(),Oc(o),t.flags|=256,et(e,t,n,r),t.child}var Ru={dehydrated:null,treeContext:null,retryLane:0};function Iu(e){return{baseLanes:e,cachePool:null,transitions:null}}function ug(e,t,n){var r=t.pendingProps,o=xe.current,i=!1,l=(t.flags&128)!==0,a;if((a=l)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),he(xe,o&1),e===null)return xu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=ga(l,r,0,null),e=lr(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Iu(n),t.memoizedState=Ru,e):Wc(t,l));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return $k(e,t,l,r,a,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,a=o.sibling;var s={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Un(o,s),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?i=Un(a,i):(i=lr(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?Iu(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Ru,r}return i=e.child,e=i.sibling,r=Un(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Wc(e,t){return t=ga({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Wi(e,t,n,r){return r!==null&&Oc(r),Qr(t,e.child,null,n),e=Wc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function $k(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=gs(Error(z(422))),Wi(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=ga({mode:"visible",children:r.children},o,0,null),i=lr(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&Qr(t,e.child,null,l),t.child.memoizedState=Iu(l),t.memoizedState=Ru,i);if(!(t.mode&1))return Wi(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(z(419)),r=gs(i,r,void 0),Wi(e,t,l,r)}if(a=(l&e.childLanes)!==0,ut||a){if(r=$e,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,wn(e,o),qt(r,e,o,-1))}return Xc(),r=gs(Error(z(421))),Wi(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Zk.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,bt=Nn(o.nextSibling),vt=t,be=!0,Wt=null,e!==null&&(Rt[It++]=pn,Rt[It++]=mn,Rt[It++]=sr,pn=e.id,mn=e.overflow,sr=t),t=Wc(t,r.children),t.flags|=4096,t)}function Ff(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Su(e.return,t,n)}function ys(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function cg(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(et(e,t,r.children,n),r=xe.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ff(e,n,t);else if(e.tag===19)Ff(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(he(xe,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&$l(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),ys(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&$l(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}ys(t,!0,n,null,i);break;case"together":ys(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ml(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function bn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),cr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(z(153));if(t.child!==null){for(e=t.child,n=Un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Bk(e,t,n){switch(t.tag){case 3:sg(t),Kr();break;case 5:Fh(t);break;case 1:dt(t.type)&&zl(t);break;case 4:Fc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;he(Fl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(he(xe,xe.current&1),t.flags|=128,null):n&t.child.childLanes?ug(e,t,n):(he(xe,xe.current&1),e=bn(e,t,n),e!==null?e.sibling:null);he(xe,xe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return cg(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),he(xe,xe.current),r)break;return null;case 22:case 23:return t.lanes=0,lg(e,t,n)}return bn(e,t,n)}var dg,Ou,fg,pg;dg=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ou=function(){};fg=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,or(on.current);var i=null;switch(n){case"input":o=Zs(e,o),r=Zs(e,r),i=[];break;case"select":o=Ce({},o,{value:void 0}),r=Ce({},r,{value:void 0}),i=[];break;case"textarea":o=nu(e,o),r=nu(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Al)}ou(n,r);var l;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var a=o[u];for(l in a)a.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(No.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var s=r[u];if(a=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==a&&(s!=null||a!=null))if(u==="style")if(a){for(l in a)!a.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&a[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(i||(i=[]),i.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(No.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&ge("scroll",e),i||a===s||(i=[])):(i=i||[]).push(u,s))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};pg=function(e,t,n,r){n!==r&&(t.flags|=4)};function ho(e,t){if(!be)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Uk(e,t,n){var r=t.pendingProps;switch(Ic(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(t),null;case 1:return dt(t.type)&&Ll(),qe(t),null;case 3:return r=t.stateNode,qr(),ye(ct),ye(Je),jc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Hi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Wt!==null&&(ju(Wt),Wt=null))),Ou(e,t),qe(t),null;case 5:Nc(t);var o=or(Yo.current);if(n=t.type,e!==null&&t.stateNode!=null)fg(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(z(166));return qe(t),null}if(e=or(on.current),Hi(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[nn]=t,r[qo]=i,e=(t.mode&1)!==0,n){case"dialog":ge("cancel",r),ge("close",r);break;case"iframe":case"object":case"embed":ge("load",r);break;case"video":case"audio":for(o=0;o<So.length;o++)ge(So[o],r);break;case"source":ge("error",r);break;case"img":case"image":case"link":ge("error",r),ge("load",r);break;case"details":ge("toggle",r);break;case"input":Wd(r,i),ge("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ge("invalid",r);break;case"textarea":Qd(r,i),ge("invalid",r)}ou(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var a=i[l];l==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Ui(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Ui(r.textContent,a,e),o=["children",""+a]):No.hasOwnProperty(l)&&a!=null&&l==="onScroll"&&ge("scroll",r)}switch(n){case"input":zi(r),Kd(r,i,!0);break;case"textarea":zi(r),qd(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Al)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=$m(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[nn]=t,e[qo]=r,dg(e,t,!1,!1),t.stateNode=e;e:{switch(l=iu(n,r),n){case"dialog":ge("cancel",e),ge("close",e),o=r;break;case"iframe":case"object":case"embed":ge("load",e),o=r;break;case"video":case"audio":for(o=0;o<So.length;o++)ge(So[o],e);o=r;break;case"source":ge("error",e),o=r;break;case"img":case"image":case"link":ge("error",e),ge("load",e),o=r;break;case"details":ge("toggle",e),o=r;break;case"input":Wd(e,r),o=Zs(e,r),ge("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Ce({},r,{value:void 0}),ge("invalid",e);break;case"textarea":Qd(e,r),o=nu(e,r),ge("invalid",e);break;default:o=r}ou(n,o),a=o;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?Hm(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Bm(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&jo(e,s):typeof s=="number"&&jo(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(No.hasOwnProperty(i)?s!=null&&i==="onScroll"&&ge("scroll",e):s!=null&&hc(e,i,s,l))}switch(n){case"input":zi(e),Kd(e,r,!1);break;case"textarea":zi(e),qd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Mr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Mr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Al)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return qe(t),null;case 6:if(e&&t.stateNode!=null)pg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(z(166));if(n=or(Yo.current),or(on.current),Hi(t)){if(r=t.stateNode,n=t.memoizedProps,r[nn]=t,(i=r.nodeValue!==n)&&(e=vt,e!==null))switch(e.tag){case 3:Ui(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ui(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nn]=t,t.stateNode=r}return qe(t),null;case 13:if(ye(xe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(be&&bt!==null&&t.mode&1&&!(t.flags&128))Ih(),Kr(),t.flags|=98560,i=!1;else if(i=Hi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(z(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(z(317));i[nn]=t}else Kr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;qe(t),i=!1}else Wt!==null&&(ju(Wt),Wt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||xe.current&1?Fe===0&&(Fe=3):Xc())),t.updateQueue!==null&&(t.flags|=4),qe(t),null);case 4:return qr(),Ou(e,t),e===null&&Ko(t.stateNode.containerInfo),qe(t),null;case 10:return zc(t.type._context),qe(t),null;case 17:return dt(t.type)&&Ll(),qe(t),null;case 19:if(ye(xe),i=t.memoizedState,i===null)return qe(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)ho(i,!1);else{if(Fe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=$l(e),l!==null){for(t.flags|=128,ho(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return he(xe,xe.current&1|2),t.child}e=e.sibling}i.tail!==null&&_e()>Yr&&(t.flags|=128,r=!0,ho(i,!1),t.lanes=4194304)}else{if(!r)if(e=$l(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ho(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!be)return qe(t),null}else 2*_e()-i.renderingStartTime>Yr&&n!==1073741824&&(t.flags|=128,r=!0,ho(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=_e(),t.sibling=null,n=xe.current,he(xe,r?n&1|2:n&1),t):(qe(t),null);case 22:case 23:return Yc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?kt&1073741824&&(qe(t),t.subtreeFlags&6&&(t.flags|=8192)):qe(t),null;case 24:return null;case 25:return null}throw Error(z(156,t.tag))}function Hk(e,t){switch(Ic(t),t.tag){case 1:return dt(t.type)&&Ll(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qr(),ye(ct),ye(Je),jc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Nc(t),null;case 13:if(ye(xe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(z(340));Kr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ye(xe),null;case 4:return qr(),null;case 10:return zc(t.type._context),null;case 22:case 23:return Yc(),null;case 24:return null;default:return null}}var Ki=!1,Ye=!1,Vk=typeof WeakSet=="function"?WeakSet:Set,U=null;function Lr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(e,t,r)}else n.current=null}function Au(e,t,n){try{n()}catch(r){Pe(e,t,r)}}var Nf=!1;function Wk(e,t){if(hu=Rl,e=yh(),_c(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,a=-1,s=-1,u=0,d=0,c=e,f=null;t:for(;;){for(var p;c!==n||o!==0&&c.nodeType!==3||(a=l+o),c!==i||r!==0&&c.nodeType!==3||(s=l+r),c.nodeType===3&&(l+=c.nodeValue.length),(p=c.firstChild)!==null;)f=c,c=p;for(;;){if(c===e)break t;if(f===n&&++u===o&&(a=l),f===i&&++d===r&&(s=l),(p=c.nextSibling)!==null)break;c=f,f=c.parentNode}c=p}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(gu={focusedElem:e,selectionRange:n},Rl=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var y=h.memoizedProps,v=h.memoizedState,g=t.stateNode,m=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:Ht(t.type,y),v);g.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var k=t.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(C){Pe(t,t.return,C)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return h=Nf,Nf=!1,h}function Io(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Au(t,n,i)}o=o.next}while(o!==r)}}function ma(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Lu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function mg(e){var t=e.alternate;t!==null&&(e.alternate=null,mg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nn],delete t[qo],delete t[wu],delete t[Pk],delete t[_k])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function hg(e){return e.tag===5||e.tag===3||e.tag===4}function jf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||hg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Al));else if(r!==4&&(e=e.child,e!==null))for(zu(e,t,n),e=e.sibling;e!==null;)zu(e,t,n),e=e.sibling}function Mu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Mu(e,t,n),e=e.sibling;e!==null;)Mu(e,t,n),e=e.sibling}var He=null,Vt=!1;function En(e,t,n){for(n=n.child;n!==null;)gg(e,t,n),n=n.sibling}function gg(e,t,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(la,n)}catch{}switch(n.tag){case 5:Ye||Lr(n,t);case 6:var r=He,o=Vt;He=null,En(e,t,n),He=r,Vt=o,He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):He.removeChild(n.stateNode));break;case 18:He!==null&&(Vt?(e=He,n=n.stateNode,e.nodeType===8?cs(e.parentNode,n):e.nodeType===1&&cs(e,n),Ho(e)):cs(He,n.stateNode));break;case 4:r=He,o=Vt,He=n.stateNode.containerInfo,Vt=!0,En(e,t,n),He=r,Vt=o;break;case 0:case 11:case 14:case 15:if(!Ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&Au(n,t,l),o=o.next}while(o!==r)}En(e,t,n);break;case 1:if(!Ye&&(Lr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Pe(n,t,a)}En(e,t,n);break;case 21:En(e,t,n);break;case 22:n.mode&1?(Ye=(r=Ye)||n.memoizedState!==null,En(e,t,n),Ye=r):En(e,t,n);break;default:En(e,t,n)}}function $f(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Vk),t.forEach(function(r){var o=ew.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ut(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,a=l;e:for(;a!==null;){switch(a.tag){case 5:He=a.stateNode,Vt=!1;break e;case 3:He=a.stateNode.containerInfo,Vt=!0;break e;case 4:He=a.stateNode.containerInfo,Vt=!0;break e}a=a.return}if(He===null)throw Error(z(160));gg(i,l,o),He=null,Vt=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){Pe(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)yg(t,e),t=t.sibling}function yg(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ut(t,e),Xt(e),r&4){try{Io(3,e,e.return),ma(3,e)}catch(y){Pe(e,e.return,y)}try{Io(5,e,e.return)}catch(y){Pe(e,e.return,y)}}break;case 1:Ut(t,e),Xt(e),r&512&&n!==null&&Lr(n,n.return);break;case 5:if(Ut(t,e),Xt(e),r&512&&n!==null&&Lr(n,n.return),e.flags&32){var o=e.stateNode;try{jo(o,"")}catch(y){Pe(e,e.return,y)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&Nm(o,i),iu(a,l);var u=iu(a,i);for(l=0;l<s.length;l+=2){var d=s[l],c=s[l+1];d==="style"?Hm(o,c):d==="dangerouslySetInnerHTML"?Bm(o,c):d==="children"?jo(o,c):hc(o,d,c,u)}switch(a){case"input":eu(o,i);break;case"textarea":jm(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var p=i.value;p!=null?Mr(o,!!i.multiple,p,!1):f!==!!i.multiple&&(i.defaultValue!=null?Mr(o,!!i.multiple,i.defaultValue,!0):Mr(o,!!i.multiple,i.multiple?[]:"",!1))}o[qo]=i}catch(y){Pe(e,e.return,y)}}break;case 6:if(Ut(t,e),Xt(e),r&4){if(e.stateNode===null)throw Error(z(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(y){Pe(e,e.return,y)}}break;case 3:if(Ut(t,e),Xt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ho(t.containerInfo)}catch(y){Pe(e,e.return,y)}break;case 4:Ut(t,e),Xt(e);break;case 13:Ut(t,e),Xt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(qc=_e())),r&4&&$f(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Ye=(u=Ye)||d,Ut(t,e),Ye=u):Ut(t,e),Xt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(U=e,d=e.child;d!==null;){for(c=U=d;U!==null;){switch(f=U,p=f.child,f.tag){case 0:case 11:case 14:case 15:Io(4,f,f.return);break;case 1:Lr(f,f.return);var h=f.stateNode;if(typeof h.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(y){Pe(r,n,y)}}break;case 5:Lr(f,f.return);break;case 22:if(f.memoizedState!==null){Uf(c);continue}}p!==null?(p.return=f,U=p):Uf(c)}d=d.sibling}e:for(d=null,c=e;;){if(c.tag===5){if(d===null){d=c;try{o=c.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=c.stateNode,s=c.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=Um("display",l))}catch(y){Pe(e,e.return,y)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(y){Pe(e,e.return,y)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===e)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===e)break e;for(;c.sibling===null;){if(c.return===null||c.return===e)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:Ut(t,e),Xt(e),r&4&&$f(e);break;case 21:break;default:Ut(t,e),Xt(e)}}function Xt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(hg(n)){var r=n;break e}n=n.return}throw Error(z(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(jo(o,""),r.flags&=-33);var i=jf(e);Mu(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,a=jf(e);zu(e,a,l);break;default:throw Error(z(161))}}catch(s){Pe(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kk(e,t,n){U=e,kg(e)}function kg(e,t,n){for(var r=(e.mode&1)!==0;U!==null;){var o=U,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Ki;if(!l){var a=o.alternate,s=a!==null&&a.memoizedState!==null||Ye;a=Ki;var u=Ye;if(Ki=l,(Ye=s)&&!u)for(U=o;U!==null;)l=U,s=l.child,l.tag===22&&l.memoizedState!==null?Hf(o):s!==null?(s.return=l,U=s):Hf(o);for(;i!==null;)U=i,kg(i),i=i.sibling;U=o,Ki=a,Ye=u}Bf(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,U=i):Bf(e)}}function Bf(e){for(;U!==null;){var t=U;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ye||ma(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ye)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Ht(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Cf(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Cf(t,l,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&Ho(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}Ye||t.flags&512&&Lu(t)}catch(f){Pe(t,t.return,f)}}if(t===e){U=null;break}if(n=t.sibling,n!==null){n.return=t.return,U=n;break}U=t.return}}function Uf(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var n=t.sibling;if(n!==null){n.return=t.return,U=n;break}U=t.return}}function Hf(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ma(4,t)}catch(s){Pe(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){Pe(t,o,s)}}var i=t.return;try{Lu(t)}catch(s){Pe(t,i,s)}break;case 5:var l=t.return;try{Lu(t)}catch(s){Pe(t,l,s)}}}catch(s){Pe(t,t.return,s)}if(t===e){U=null;break}var a=t.sibling;if(a!==null){a.return=t.return,U=a;break}U=t.return}}var Qk=Math.ceil,Hl=xn.ReactCurrentDispatcher,Kc=xn.ReactCurrentOwner,Mt=xn.ReactCurrentBatchConfig,re=0,$e=null,ze=null,We=0,kt=0,zr=qn(0),Fe=0,ei=null,cr=0,ha=0,Qc=0,Oo=null,st=null,qc=0,Yr=1/0,cn=null,Vl=!1,Du=null,$n=null,Qi=!1,Ln=null,Wl=0,Ao=0,Fu=null,hl=-1,gl=0;function nt(){return re&6?_e():hl!==-1?hl:hl=_e()}function Bn(e){return e.mode&1?re&2&&We!==0?We&-We:Ik.transition!==null?(gl===0&&(gl=th()),gl):(e=se,e!==0||(e=window.event,e=e===void 0?16:sh(e.type)),e):1}function qt(e,t,n,r){if(50<Ao)throw Ao=0,Fu=null,Error(z(185));ki(e,n,r),(!(re&2)||e!==$e)&&(e===$e&&(!(re&2)&&(ha|=n),Fe===4&&In(e,We)),ft(e,r),n===1&&re===0&&!(t.mode&1)&&(Yr=_e()+500,da&&Gn()))}function ft(e,t){var n=e.callbackNode;I1(e,t);var r=_l(e,e===$e?We:0);if(r===0)n!==null&&Xd(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Xd(n),t===1)e.tag===0?Rk(Vf.bind(null,e)):Ph(Vf.bind(null,e)),Ek(function(){!(re&6)&&Gn()}),n=null;else{switch(nh(r)){case 1:n=bc;break;case 4:n=Zm;break;case 16:n=Pl;break;case 536870912:n=eh;break;default:n=Pl}n=Tg(n,wg.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function wg(e,t){if(hl=-1,gl=0,re&6)throw Error(z(327));var n=e.callbackNode;if($r()&&e.callbackNode!==n)return null;var r=_l(e,e===$e?We:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Kl(e,r);else{t=r;var o=re;re|=2;var i=vg();($e!==e||We!==t)&&(cn=null,Yr=_e()+500,ir(e,t));do try{Yk();break}catch(a){bg(e,a)}while(!0);Lc(),Hl.current=i,re=o,ze!==null?t=0:($e=null,We=0,t=Fe)}if(t!==0){if(t===2&&(o=cu(e),o!==0&&(r=o,t=Nu(e,o))),t===1)throw n=ei,ir(e,0),In(e,r),ft(e,_e()),n;if(t===6)In(e,r);else{if(o=e.current.alternate,!(r&30)&&!qk(o)&&(t=Kl(e,r),t===2&&(i=cu(e),i!==0&&(r=i,t=Nu(e,i))),t===1))throw n=ei,ir(e,0),In(e,r),ft(e,_e()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(z(345));case 2:er(e,st,cn);break;case 3:if(In(e,r),(r&130023424)===r&&(t=qc+500-_e(),10<t)){if(_l(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){nt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ku(er.bind(null,e,st,cn),t);break}er(e,st,cn);break;case 4:if(In(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Qt(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=_e()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Qk(r/1960))-r,10<r){e.timeoutHandle=ku(er.bind(null,e,st,cn),r);break}er(e,st,cn);break;case 5:er(e,st,cn);break;default:throw Error(z(329))}}}return ft(e,_e()),e.callbackNode===n?wg.bind(null,e):null}function Nu(e,t){var n=Oo;return e.current.memoizedState.isDehydrated&&(ir(e,t).flags|=256),e=Kl(e,t),e!==2&&(t=st,st=n,t!==null&&ju(t)),e}function ju(e){st===null?st=e:st.push.apply(st,e)}function qk(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Yt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function In(e,t){for(t&=~Qc,t&=~ha,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qt(t),r=1<<n;e[n]=-1,t&=~r}}function Vf(e){if(re&6)throw Error(z(327));$r();var t=_l(e,0);if(!(t&1))return ft(e,_e()),null;var n=Kl(e,t);if(e.tag!==0&&n===2){var r=cu(e);r!==0&&(t=r,n=Nu(e,r))}if(n===1)throw n=ei,ir(e,0),In(e,t),ft(e,_e()),n;if(n===6)throw Error(z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,er(e,st,cn),ft(e,_e()),null}function Gc(e,t){var n=re;re|=1;try{return e(t)}finally{re=n,re===0&&(Yr=_e()+500,da&&Gn())}}function dr(e){Ln!==null&&Ln.tag===0&&!(re&6)&&$r();var t=re;re|=1;var n=Mt.transition,r=se;try{if(Mt.transition=null,se=1,e)return e()}finally{se=r,Mt.transition=n,re=t,!(re&6)&&Gn()}}function Yc(){kt=zr.current,ye(zr)}function ir(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ck(n)),ze!==null)for(n=ze.return;n!==null;){var r=n;switch(Ic(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ll();break;case 3:qr(),ye(ct),ye(Je),jc();break;case 5:Nc(r);break;case 4:qr();break;case 13:ye(xe);break;case 19:ye(xe);break;case 10:zc(r.type._context);break;case 22:case 23:Yc()}n=n.return}if($e=e,ze=e=Un(e.current,null),We=kt=t,Fe=0,ei=null,Qc=ha=cr=0,st=Oo=null,rr!==null){for(t=0;t<rr.length;t++)if(n=rr[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}rr=null}return e}function bg(e,t){do{var n=ze;try{if(Lc(),fl.current=Ul,Bl){for(var r=Se.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Bl=!1}if(ur=0,je=De=Se=null,Ro=!1,Xo=0,Kc.current=null,n===null||n.return===null){Fe=1,ei=t,ze=null;break}e:{var i=e,l=n.return,a=n,s=t;if(t=We,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Of(l);if(p!==null){p.flags&=-257,Af(p,l,a,i,t),p.mode&1&&If(i,u,t),t=p,s=u;var h=t.updateQueue;if(h===null){var y=new Set;y.add(s),t.updateQueue=y}else h.add(s);break e}else{if(!(t&1)){If(i,u,t),Xc();break e}s=Error(z(426))}}else if(be&&a.mode&1){var v=Of(l);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Af(v,l,a,i,t),Oc(Gr(s,a));break e}}i=s=Gr(s,a),Fe!==4&&(Fe=2),Oo===null?Oo=[i]:Oo.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=rg(i,s,t);Sf(i,g);break e;case 1:a=s;var m=i.type,k=i.stateNode;if(!(i.flags&128)&&(typeof m.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&($n===null||!$n.has(k)))){i.flags|=65536,t&=-t,i.lanes|=t;var C=og(i,a,t);Sf(i,C);break e}}i=i.return}while(i!==null)}Sg(n)}catch(T){t=T,ze===n&&n!==null&&(ze=n=n.return);continue}break}while(!0)}function vg(){var e=Hl.current;return Hl.current=Ul,e===null?Ul:e}function Xc(){(Fe===0||Fe===3||Fe===2)&&(Fe=4),$e===null||!(cr&268435455)&&!(ha&268435455)||In($e,We)}function Kl(e,t){var n=re;re|=2;var r=vg();($e!==e||We!==t)&&(cn=null,ir(e,t));do try{Gk();break}catch(o){bg(e,o)}while(!0);if(Lc(),re=n,Hl.current=r,ze!==null)throw Error(z(261));return $e=null,We=0,Fe}function Gk(){for(;ze!==null;)xg(ze)}function Yk(){for(;ze!==null&&!v1();)xg(ze)}function xg(e){var t=Eg(e.alternate,e,kt);e.memoizedProps=e.pendingProps,t===null?Sg(e):ze=t,Kc.current=null}function Sg(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Hk(n,t),n!==null){n.flags&=32767,ze=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Fe=6,ze=null;return}}else if(n=Uk(n,t,kt),n!==null){ze=n;return}if(t=t.sibling,t!==null){ze=t;return}ze=t=e}while(t!==null);Fe===0&&(Fe=5)}function er(e,t,n){var r=se,o=Mt.transition;try{Mt.transition=null,se=1,Xk(e,t,n,r)}finally{Mt.transition=o,se=r}return null}function Xk(e,t,n,r){do $r();while(Ln!==null);if(re&6)throw Error(z(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(z(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(O1(e,i),e===$e&&(ze=$e=null,We=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Qi||(Qi=!0,Tg(Pl,function(){return $r(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Mt.transition,Mt.transition=null;var l=se;se=1;var a=re;re|=4,Kc.current=null,Wk(e,n),yg(n,e),yk(gu),Rl=!!hu,gu=hu=null,e.current=n,Kk(n),x1(),re=a,se=l,Mt.transition=i}else e.current=n;if(Qi&&(Qi=!1,Ln=e,Wl=o),i=e.pendingLanes,i===0&&($n=null),E1(n.stateNode),ft(e,_e()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Vl)throw Vl=!1,e=Du,Du=null,e;return Wl&1&&e.tag!==0&&$r(),i=e.pendingLanes,i&1?e===Fu?Ao++:(Ao=0,Fu=e):Ao=0,Gn(),null}function $r(){if(Ln!==null){var e=nh(Wl),t=Mt.transition,n=se;try{if(Mt.transition=null,se=16>e?16:e,Ln===null)var r=!1;else{if(e=Ln,Ln=null,Wl=0,re&6)throw Error(z(331));var o=re;for(re|=4,U=e.current;U!==null;){var i=U,l=i.child;if(U.flags&16){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var u=a[s];for(U=u;U!==null;){var d=U;switch(d.tag){case 0:case 11:case 15:Io(8,d,i)}var c=d.child;if(c!==null)c.return=d,U=c;else for(;U!==null;){d=U;var f=d.sibling,p=d.return;if(mg(d),d===u){U=null;break}if(f!==null){f.return=p,U=f;break}U=p}}}var h=i.alternate;if(h!==null){var y=h.child;if(y!==null){h.child=null;do{var v=y.sibling;y.sibling=null,y=v}while(y!==null)}}U=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,U=l;else e:for(;U!==null;){if(i=U,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Io(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,U=g;break e}U=i.return}}var m=e.current;for(U=m;U!==null;){l=U;var k=l.child;if(l.subtreeFlags&2064&&k!==null)k.return=l,U=k;else e:for(l=m;U!==null;){if(a=U,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ma(9,a)}}catch(T){Pe(a,a.return,T)}if(a===l){U=null;break e}var C=a.sibling;if(C!==null){C.return=a.return,U=C;break e}U=a.return}}if(re=o,Gn(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(la,e)}catch{}r=!0}return r}finally{se=n,Mt.transition=t}}return!1}function Wf(e,t,n){t=Gr(n,t),t=rg(e,t,1),e=jn(e,t,1),t=nt(),e!==null&&(ki(e,1,t),ft(e,t))}function Pe(e,t,n){if(e.tag===3)Wf(e,e,n);else for(;t!==null;){if(t.tag===3){Wf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&($n===null||!$n.has(r))){e=Gr(n,e),e=og(t,e,1),t=jn(t,e,1),e=nt(),t!==null&&(ki(t,1,e),ft(t,e));break}}t=t.return}}function Jk(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=nt(),e.pingedLanes|=e.suspendedLanes&n,$e===e&&(We&n)===n&&(Fe===4||Fe===3&&(We&130023424)===We&&500>_e()-qc?ir(e,0):Qc|=n),ft(e,t)}function Cg(e,t){t===0&&(e.mode&1?(t=Fi,Fi<<=1,!(Fi&130023424)&&(Fi=4194304)):t=1);var n=nt();e=wn(e,t),e!==null&&(ki(e,t,n),ft(e,n))}function Zk(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Cg(e,n)}function ew(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(z(314))}r!==null&&r.delete(t),Cg(e,n)}var Eg;Eg=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ct.current)ut=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ut=!1,Bk(e,t,n);ut=!!(e.flags&131072)}else ut=!1,be&&t.flags&1048576&&_h(t,Dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ml(e,t),e=t.pendingProps;var o=Wr(t,Je.current);jr(t,n),o=Bc(null,t,r,e,o,n);var i=Uc();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,dt(r)?(i=!0,zl(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Dc(t),o.updater=fa,t.stateNode=o,o._reactInternals=t,Eu(t,r,e,n),t=_u(null,t,r,!0,i,n)):(t.tag=0,be&&i&&Rc(t),et(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ml(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=nw(r),e=Ht(r,e),o){case 0:t=Pu(null,t,r,e,n);break e;case 1:t=Mf(null,t,r,e,n);break e;case 11:t=Lf(null,t,r,e,n);break e;case 14:t=zf(null,t,r,Ht(r.type,e),n);break e}throw Error(z(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Pu(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Mf(e,t,r,o,n);case 3:e:{if(sg(t),e===null)throw Error(z(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Ah(e,t),jl(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Gr(Error(z(423)),t),t=Df(e,t,r,n,o);break e}else if(r!==o){o=Gr(Error(z(424)),t),t=Df(e,t,r,n,o);break e}else for(bt=Nn(t.stateNode.containerInfo.firstChild),vt=t,be=!0,Wt=null,n=Dh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Kr(),r===o){t=bn(e,t,n);break e}et(e,t,r,n)}t=t.child}return t;case 5:return Fh(t),e===null&&xu(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,yu(r,o)?l=null:i!==null&&yu(r,i)&&(t.flags|=32),ag(e,t),et(e,t,l,n),t.child;case 6:return e===null&&xu(t),null;case 13:return ug(e,t,n);case 4:return Fc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Qr(t,null,r,n):et(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),Lf(e,t,r,o,n);case 7:return et(e,t,t.pendingProps,n),t.child;case 8:return et(e,t,t.pendingProps.children,n),t.child;case 12:return et(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,he(Fl,r._currentValue),r._currentValue=l,i!==null)if(Yt(i.value,l)){if(i.children===o.children&&!ct.current){t=bn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){l=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=gn(-1,n&-n),s.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?s.next=s:(s.next=d.next,d.next=s),u.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Su(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(z(341));l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),Su(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}et(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,jr(t,n),o=Dt(o),r=r(o),t.flags|=1,et(e,t,r,n),t.child;case 14:return r=t.type,o=Ht(r,t.pendingProps),o=Ht(r.type,o),zf(e,t,r,o,n);case 15:return ig(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ht(r,o),ml(e,t),t.tag=1,dt(r)?(e=!0,zl(t)):e=!1,jr(t,n),zh(t,r,o),Eu(t,r,o,n),_u(null,t,r,!0,e,n);case 19:return cg(e,t,n);case 22:return lg(e,t,n)}throw Error(z(156,t.tag))};function Tg(e,t){return Jm(e,t)}function tw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(e,t,n,r){return new tw(e,t,n,r)}function Jc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function nw(e){if(typeof e=="function")return Jc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===yc)return 11;if(e===kc)return 14}return 2}function Un(e,t){var n=e.alternate;return n===null?(n=zt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function yl(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")Jc(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Cr:return lr(n.children,o,i,t);case gc:l=8,o|=8;break;case Gs:return e=zt(12,n,t,o|2),e.elementType=Gs,e.lanes=i,e;case Ys:return e=zt(13,n,t,o),e.elementType=Ys,e.lanes=i,e;case Xs:return e=zt(19,n,t,o),e.elementType=Xs,e.lanes=i,e;case Mm:return ga(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Lm:l=10;break e;case zm:l=9;break e;case yc:l=11;break e;case kc:l=14;break e;case Pn:l=16,r=null;break e}throw Error(z(130,e==null?e:typeof e,""))}return t=zt(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function lr(e,t,n,r){return e=zt(7,e,r,t),e.lanes=n,e}function ga(e,t,n,r){return e=zt(22,e,r,t),e.elementType=Mm,e.lanes=n,e.stateNode={isHidden:!1},e}function ks(e,t,n){return e=zt(6,e,null,t),e.lanes=n,e}function ws(e,t,n){return t=zt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function rw(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Za(0),this.expirationTimes=Za(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Za(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Zc(e,t,n,r,o,i,l,a,s){return e=new rw(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=zt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dc(i),e}function ow(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Sr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Pg(e){if(!e)return Wn;e=e._reactInternals;e:{if(mr(e)!==e||e.tag!==1)throw Error(z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(z(171))}if(e.tag===1){var n=e.type;if(dt(n))return Th(e,n,t)}return t}function _g(e,t,n,r,o,i,l,a,s){return e=Zc(n,r,!0,e,o,i,l,a,s),e.context=Pg(null),n=e.current,r=nt(),o=Bn(n),i=gn(r,o),i.callback=t??null,jn(n,i,o),e.current.lanes=o,ki(e,o,r),ft(e,r),e}function ya(e,t,n,r){var o=t.current,i=nt(),l=Bn(o);return n=Pg(n),t.context===null?t.context=n:t.pendingContext=n,t=gn(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=jn(o,t,l),e!==null&&(qt(e,o,l,i),dl(e,o,l)),l}function Ql(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Kf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ed(e,t){Kf(e,t),(e=e.alternate)&&Kf(e,t)}function iw(){return null}var Rg=typeof reportError=="function"?reportError:function(e){console.error(e)};function td(e){this._internalRoot=e}ka.prototype.render=td.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(z(409));ya(e,t,null,null)};ka.prototype.unmount=td.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dr(function(){ya(null,e,null,null)}),t[kn]=null}};function ka(e){this._internalRoot=e}ka.prototype.unstable_scheduleHydration=function(e){if(e){var t=ih();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rn.length&&t!==0&&t<Rn[n].priority;n++);Rn.splice(n,0,e),n===0&&ah(e)}};function nd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Qf(){}function lw(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var u=Ql(l);i.call(u)}}var l=_g(t,r,e,0,null,!1,!1,"",Qf);return e._reactRootContainer=l,e[kn]=l.current,Ko(e.nodeType===8?e.parentNode:e),dr(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var u=Ql(s);a.call(u)}}var s=Zc(e,0,!1,null,null,!1,!1,"",Qf);return e._reactRootContainer=s,e[kn]=s.current,Ko(e.nodeType===8?e.parentNode:e),dr(function(){ya(t,s,n,r)}),s}function ba(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var a=o;o=function(){var s=Ql(l);a.call(s)}}ya(t,l,e,o)}else l=lw(n,t,e,o,r);return Ql(l)}rh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=xo(t.pendingLanes);n!==0&&(vc(t,n|1),ft(t,_e()),!(re&6)&&(Yr=_e()+500,Gn()))}break;case 13:dr(function(){var r=wn(e,1);if(r!==null){var o=nt();qt(r,e,1,o)}}),ed(e,1)}};xc=function(e){if(e.tag===13){var t=wn(e,134217728);if(t!==null){var n=nt();qt(t,e,134217728,n)}ed(e,134217728)}};oh=function(e){if(e.tag===13){var t=Bn(e),n=wn(e,t);if(n!==null){var r=nt();qt(n,e,t,r)}ed(e,t)}};ih=function(){return se};lh=function(e,t){var n=se;try{return se=e,t()}finally{se=n}};au=function(e,t,n){switch(t){case"input":if(eu(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=ca(r);if(!o)throw Error(z(90));Fm(r),eu(r,o)}}}break;case"textarea":jm(e,n);break;case"select":t=n.value,t!=null&&Mr(e,!!n.multiple,t,!1)}};Km=Gc;Qm=dr;var aw={usingClientEntryPoint:!1,Events:[bi,_r,ca,Vm,Wm,Gc]},go={findFiberByHostInstance:nr,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},sw={bundleType:go.bundleType,version:go.version,rendererPackageName:go.rendererPackageName,rendererConfig:go.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ym(e),e===null?null:e.stateNode},findFiberByHostInstance:go.findFiberByHostInstance||iw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qi.isDisabled&&qi.supportsFiber)try{la=qi.inject(sw),rn=qi}catch{}}Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=aw;Et.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!nd(t))throw Error(z(200));return ow(e,t,null,n)};Et.createRoot=function(e,t){if(!nd(e))throw Error(z(299));var n=!1,r="",o=Rg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Zc(e,1,!1,null,null,n,!1,r,o),e[kn]=t.current,Ko(e.nodeType===8?e.parentNode:e),new td(t)};Et.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(z(188)):(e=Object.keys(e).join(","),Error(z(268,e)));return e=Ym(t),e=e===null?null:e.stateNode,e};Et.flushSync=function(e){return dr(e)};Et.hydrate=function(e,t,n){if(!wa(t))throw Error(z(200));return ba(null,e,t,!0,n)};Et.hydrateRoot=function(e,t,n){if(!nd(e))throw Error(z(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=Rg;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=_g(t,null,e,1,n??null,o,!1,i,l),e[kn]=t.current,Ko(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new ka(t)};Et.render=function(e,t,n){if(!wa(t))throw Error(z(200));return ba(null,e,t,!1,n)};Et.unmountComponentAtNode=function(e){if(!wa(e))throw Error(z(40));return e._reactRootContainer?(dr(function(){ba(null,null,e,!1,function(){e._reactRootContainer=null,e[kn]=null})}),!0):!1};Et.unstable_batchedUpdates=Gc;Et.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!wa(n))throw Error(z(200));if(e==null||e._reactInternals===void 0)throw Error(z(38));return ba(e,t,n,!1,r)};Et.version="18.2.0-next-9e3b772b8-20220608";function Ig(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ig)}catch(e){console.error(e)}}Ig(),_m.exports=Et;var Og=_m.exports,qf=Og;Qs.createRoot=qf.createRoot,Qs.hydrateRoot=qf.hydrateRoot;function Q(){return Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Q.apply(this,arguments)}function Ag(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var uw=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,cw=Ag(function(e){return uw.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function dw(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function fw(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var pw=function(){function e(n){var r=this;this._insertTag=function(o){var i;r.tags.length===0?r.insertionPoint?i=r.insertionPoint.nextSibling:r.prepend?i=r.container.firstChild:i=r.before:i=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(o,i),r.tags.push(o)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(r){r.forEach(this._insertTag)},t.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(fw(this));var o=this.tags[this.tags.length-1];if(this.isSpeedy){var i=dw(o);try{i.insertRule(r,i.cssRules.length)}catch{}}else o.appendChild(document.createTextNode(r));this.ctr++},t.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},e}(),Ge="-ms-",ql="-moz-",ie="-webkit-",Lg="comm",rd="rule",od="decl",mw="@import",zg="@keyframes",hw="@layer",gw=Math.abs,va=String.fromCharCode,yw=Object.assign;function kw(e,t){return Ve(e,0)^45?(((t<<2^Ve(e,0))<<2^Ve(e,1))<<2^Ve(e,2))<<2^Ve(e,3):0}function Mg(e){return e.trim()}function ww(e,t){return(e=t.exec(e))?e[0]:e}function le(e,t,n){return e.replace(t,n)}function $u(e,t){return e.indexOf(t)}function Ve(e,t){return e.charCodeAt(t)|0}function ti(e,t,n){return e.slice(t,n)}function en(e){return e.length}function id(e){return e.length}function Gi(e,t){return t.push(e),e}function bw(e,t){return e.map(t).join("")}var xa=1,Xr=1,Dg=0,pt=0,Le=0,ro="";function Sa(e,t,n,r,o,i,l){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:xa,column:Xr,length:l,return:""}}function yo(e,t){return yw(Sa("",null,null,"",null,null,0),e,{length:-e.length},t)}function vw(){return Le}function xw(){return Le=pt>0?Ve(ro,--pt):0,Xr--,Le===10&&(Xr=1,xa--),Le}function xt(){return Le=pt<Dg?Ve(ro,pt++):0,Xr++,Le===10&&(Xr=1,xa++),Le}function ln(){return Ve(ro,pt)}function kl(){return pt}function xi(e,t){return ti(ro,e,t)}function ni(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Fg(e){return xa=Xr=1,Dg=en(ro=e),pt=0,[]}function Ng(e){return ro="",e}function wl(e){return Mg(xi(pt-1,Bu(e===91?e+2:e===40?e+1:e)))}function Sw(e){for(;(Le=ln())&&Le<33;)xt();return ni(e)>2||ni(Le)>3?"":" "}function Cw(e,t){for(;--t&&xt()&&!(Le<48||Le>102||Le>57&&Le<65||Le>70&&Le<97););return xi(e,kl()+(t<6&&ln()==32&&xt()==32))}function Bu(e){for(;xt();)switch(Le){case e:return pt;case 34:case 39:e!==34&&e!==39&&Bu(Le);break;case 40:e===41&&Bu(e);break;case 92:xt();break}return pt}function Ew(e,t){for(;xt()&&e+Le!==57;)if(e+Le===84&&ln()===47)break;return"/*"+xi(t,pt-1)+"*"+va(e===47?e:xt())}function Tw(e){for(;!ni(ln());)xt();return xi(e,pt)}function Pw(e){return Ng(bl("",null,null,null,[""],e=Fg(e),0,[0],e))}function bl(e,t,n,r,o,i,l,a,s){for(var u=0,d=0,c=l,f=0,p=0,h=0,y=1,v=1,g=1,m=0,k="",C=o,T=i,S=r,E=k;v;)switch(h=m,m=xt()){case 40:if(h!=108&&Ve(E,c-1)==58){$u(E+=le(wl(m),"&","&\f"),"&\f")!=-1&&(g=-1);break}case 34:case 39:case 91:E+=wl(m);break;case 9:case 10:case 13:case 32:E+=Sw(h);break;case 92:E+=Cw(kl()-1,7);continue;case 47:switch(ln()){case 42:case 47:Gi(_w(Ew(xt(),kl()),t,n),s);break;default:E+="/"}break;case 123*y:a[u++]=en(E)*g;case 125*y:case 59:case 0:switch(m){case 0:case 125:v=0;case 59+d:g==-1&&(E=le(E,/\f/g,"")),p>0&&en(E)-c&&Gi(p>32?Yf(E+";",r,n,c-1):Yf(le(E," ","")+";",r,n,c-2),s);break;case 59:E+=";";default:if(Gi(S=Gf(E,t,n,u,d,o,a,k,C=[],T=[],c),i),m===123)if(d===0)bl(E,t,S,S,C,i,c,a,T);else switch(f===99&&Ve(E,3)===110?100:f){case 100:case 108:case 109:case 115:bl(e,S,S,r&&Gi(Gf(e,S,S,0,0,o,a,k,o,C=[],c),T),o,T,c,a,r?C:T);break;default:bl(E,S,S,S,[""],T,0,a,T)}}u=d=p=0,y=g=1,k=E="",c=l;break;case 58:c=1+en(E),p=h;default:if(y<1){if(m==123)--y;else if(m==125&&y++==0&&xw()==125)continue}switch(E+=va(m),m*y){case 38:g=d>0?1:(E+="\f",-1);break;case 44:a[u++]=(en(E)-1)*g,g=1;break;case 64:ln()===45&&(E+=wl(xt())),f=ln(),d=c=en(k=E+=Tw(kl())),m++;break;case 45:h===45&&en(E)==2&&(y=0)}}return i}function Gf(e,t,n,r,o,i,l,a,s,u,d){for(var c=o-1,f=o===0?i:[""],p=id(f),h=0,y=0,v=0;h<r;++h)for(var g=0,m=ti(e,c+1,c=gw(y=l[h])),k=e;g<p;++g)(k=Mg(y>0?f[g]+" "+m:le(m,/&\f/g,f[g])))&&(s[v++]=k);return Sa(e,t,n,o===0?rd:a,s,u,d)}function _w(e,t,n){return Sa(e,t,n,Lg,va(vw()),ti(e,2,-2),0)}function Yf(e,t,n,r){return Sa(e,t,n,od,ti(e,0,r),ti(e,r+1,-1),r)}function Br(e,t){for(var n="",r=id(e),o=0;o<r;o++)n+=t(e[o],o,e,t)||"";return n}function Rw(e,t,n,r){switch(e.type){case hw:if(e.children.length)break;case mw:case od:return e.return=e.return||e.value;case Lg:return"";case zg:return e.return=e.value+"{"+Br(e.children,r)+"}";case rd:e.value=e.props.join(",")}return en(n=Br(e.children,r))?e.return=e.value+"{"+n+"}":""}function Iw(e){var t=id(e);return function(n,r,o,i){for(var l="",a=0;a<t;a++)l+=e[a](n,r,o,i)||"";return l}}function Ow(e){return function(t){t.root||(t=t.return)&&e(t)}}var Aw=function(t,n,r){for(var o=0,i=0;o=i,i=ln(),o===38&&i===12&&(n[r]=1),!ni(i);)xt();return xi(t,pt)},Lw=function(t,n){var r=-1,o=44;do switch(ni(o)){case 0:o===38&&ln()===12&&(n[r]=1),t[r]+=Aw(pt-1,n,r);break;case 2:t[r]+=wl(o);break;case 4:if(o===44){t[++r]=ln()===58?"&\f":"",n[r]=t[r].length;break}default:t[r]+=va(o)}while(o=xt());return t},zw=function(t,n){return Ng(Lw(Fg(t),n))},Xf=new WeakMap,Mw=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var n=t.value,r=t.parent,o=t.column===r.column&&t.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(t.props.length===1&&n.charCodeAt(0)!==58&&!Xf.get(r))&&!o){Xf.set(t,!0);for(var i=[],l=zw(n,i),a=r.props,s=0,u=0;s<l.length;s++)for(var d=0;d<a.length;d++,u++)t.props[u]=i[s]?l[s].replace(/&\f/g,a[d]):a[d]+" "+l[s]}}},Dw=function(t){if(t.type==="decl"){var n=t.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(t.return="",t.value="")}};function jg(e,t){switch(kw(e,t)){case 5103:return ie+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return ie+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return ie+e+ql+e+Ge+e+e;case 6828:case 4268:return ie+e+Ge+e+e;case 6165:return ie+e+Ge+"flex-"+e+e;case 5187:return ie+e+le(e,/(\w+).+(:[^]+)/,ie+"box-$1$2"+Ge+"flex-$1$2")+e;case 5443:return ie+e+Ge+"flex-item-"+le(e,/flex-|-self/,"")+e;case 4675:return ie+e+Ge+"flex-line-pack"+le(e,/align-content|flex-|-self/,"")+e;case 5548:return ie+e+Ge+le(e,"shrink","negative")+e;case 5292:return ie+e+Ge+le(e,"basis","preferred-size")+e;case 6060:return ie+"box-"+le(e,"-grow","")+ie+e+Ge+le(e,"grow","positive")+e;case 4554:return ie+le(e,/([^-])(transform)/g,"$1"+ie+"$2")+e;case 6187:return le(le(le(e,/(zoom-|grab)/,ie+"$1"),/(image-set)/,ie+"$1"),e,"")+e;case 5495:case 3959:return le(e,/(image-set\([^]*)/,ie+"$1$`$1");case 4968:return le(le(e,/(.+:)(flex-)?(.*)/,ie+"box-pack:$3"+Ge+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+ie+e+e;case 4095:case 3583:case 4068:case 2532:return le(e,/(.+)-inline(.+)/,ie+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(en(e)-1-t>6)switch(Ve(e,t+1)){case 109:if(Ve(e,t+4)!==45)break;case 102:return le(e,/(.+:)(.+)-([^]+)/,"$1"+ie+"$2-$3$1"+ql+(Ve(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~$u(e,"stretch")?jg(le(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(Ve(e,t+1)!==115)break;case 6444:switch(Ve(e,en(e)-3-(~$u(e,"!important")&&10))){case 107:return le(e,":",":"+ie)+e;case 101:return le(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+ie+(Ve(e,14)===45?"inline-":"")+"box$3$1"+ie+"$2$3$1"+Ge+"$2box$3")+e}break;case 5936:switch(Ve(e,t+11)){case 114:return ie+e+Ge+le(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return ie+e+Ge+le(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return ie+e+Ge+le(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return ie+e+Ge+e+e}return e}var Fw=function(t,n,r,o){if(t.length>-1&&!t.return)switch(t.type){case od:t.return=jg(t.value,t.length);break;case zg:return Br([yo(t,{value:le(t.value,"@","@"+ie)})],o);case rd:if(t.length)return bw(t.props,function(i){switch(ww(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Br([yo(t,{props:[le(i,/:(read-\w+)/,":"+ql+"$1")]})],o);case"::placeholder":return Br([yo(t,{props:[le(i,/:(plac\w+)/,":"+ie+"input-$1")]}),yo(t,{props:[le(i,/:(plac\w+)/,":"+ql+"$1")]}),yo(t,{props:[le(i,/:(plac\w+)/,Ge+"input-$1")]})],o)}return""})}},Nw=[Fw],jw=function(t){var n=t.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(y){var v=y.getAttribute("data-emotion");v.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var o=t.stylisPlugins||Nw,i={},l,a=[];l=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(y){for(var v=y.getAttribute("data-emotion").split(" "),g=1;g<v.length;g++)i[v[g]]=!0;a.push(y)});var s,u=[Mw,Dw];{var d,c=[Rw,Ow(function(y){d.insert(y)})],f=Iw(u.concat(o,c)),p=function(v){return Br(Pw(v),f)};s=function(v,g,m,k){d=m,p(v?v+"{"+g.styles+"}":g.styles),k&&(h.inserted[g.name]=!0)}}var h={key:n,sheet:new pw({key:n,container:l,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:i,registered:{},insert:s};return h.sheet.hydrate(a),h},$g={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Be=typeof Symbol=="function"&&Symbol.for,ld=Be?Symbol.for("react.element"):60103,ad=Be?Symbol.for("react.portal"):60106,Ca=Be?Symbol.for("react.fragment"):60107,Ea=Be?Symbol.for("react.strict_mode"):60108,Ta=Be?Symbol.for("react.profiler"):60114,Pa=Be?Symbol.for("react.provider"):60109,_a=Be?Symbol.for("react.context"):60110,sd=Be?Symbol.for("react.async_mode"):60111,Ra=Be?Symbol.for("react.concurrent_mode"):60111,Ia=Be?Symbol.for("react.forward_ref"):60112,Oa=Be?Symbol.for("react.suspense"):60113,$w=Be?Symbol.for("react.suspense_list"):60120,Aa=Be?Symbol.for("react.memo"):60115,La=Be?Symbol.for("react.lazy"):60116,Bw=Be?Symbol.for("react.block"):60121,Uw=Be?Symbol.for("react.fundamental"):60117,Hw=Be?Symbol.for("react.responder"):60118,Vw=Be?Symbol.for("react.scope"):60119;function Pt(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case ld:switch(e=e.type,e){case sd:case Ra:case Ca:case Ta:case Ea:case Oa:return e;default:switch(e=e&&e.$$typeof,e){case _a:case Ia:case La:case Aa:case Pa:return e;default:return t}}case ad:return t}}}function Bg(e){return Pt(e)===Ra}ue.AsyncMode=sd;ue.ConcurrentMode=Ra;ue.ContextConsumer=_a;ue.ContextProvider=Pa;ue.Element=ld;ue.ForwardRef=Ia;ue.Fragment=Ca;ue.Lazy=La;ue.Memo=Aa;ue.Portal=ad;ue.Profiler=Ta;ue.StrictMode=Ea;ue.Suspense=Oa;ue.isAsyncMode=function(e){return Bg(e)||Pt(e)===sd};ue.isConcurrentMode=Bg;ue.isContextConsumer=function(e){return Pt(e)===_a};ue.isContextProvider=function(e){return Pt(e)===Pa};ue.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ld};ue.isForwardRef=function(e){return Pt(e)===Ia};ue.isFragment=function(e){return Pt(e)===Ca};ue.isLazy=function(e){return Pt(e)===La};ue.isMemo=function(e){return Pt(e)===Aa};ue.isPortal=function(e){return Pt(e)===ad};ue.isProfiler=function(e){return Pt(e)===Ta};ue.isStrictMode=function(e){return Pt(e)===Ea};ue.isSuspense=function(e){return Pt(e)===Oa};ue.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===Ca||e===Ra||e===Ta||e===Ea||e===Oa||e===$w||typeof e=="object"&&e!==null&&(e.$$typeof===La||e.$$typeof===Aa||e.$$typeof===Pa||e.$$typeof===_a||e.$$typeof===Ia||e.$$typeof===Uw||e.$$typeof===Hw||e.$$typeof===Vw||e.$$typeof===Bw)};ue.typeOf=Pt;$g.exports=ue;var Ww=$g.exports,Ug=Ww,Kw={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Qw={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Hg={};Hg[Ug.ForwardRef]=Kw;Hg[Ug.Memo]=Qw;var qw=!0;function Gw(e,t,n){var r="";return n.split(" ").forEach(function(o){e[o]!==void 0?t.push(e[o]+";"):r+=o+" "}),r}var Vg=function(t,n,r){var o=t.key+"-"+n.name;(r===!1||qw===!1)&&t.registered[o]===void 0&&(t.registered[o]=n.styles)},Yw=function(t,n,r){Vg(t,n,r);var o=t.key+"-"+n.name;if(t.inserted[n.name]===void 0){var i=n;do t.insert(n===i?"."+o:"",i,t.sheet,!0),i=i.next;while(i!==void 0)}};function Xw(e){for(var t=0,n,r=0,o=e.length;o>=4;++r,o-=4)n=e.charCodeAt(r)&255|(e.charCodeAt(++r)&255)<<8|(e.charCodeAt(++r)&255)<<16|(e.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,t=(n&65535)*1540483477+((n>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(r+2)&255)<<16;case 2:t^=(e.charCodeAt(r+1)&255)<<8;case 1:t^=e.charCodeAt(r)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Jw={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Zw=/[A-Z]|^ms/g,eb=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Wg=function(t){return t.charCodeAt(1)===45},Jf=function(t){return t!=null&&typeof t!="boolean"},bs=Ag(function(e){return Wg(e)?e:e.replace(Zw,"-$&").toLowerCase()}),Zf=function(t,n){switch(t){case"animation":case"animationName":if(typeof n=="string")return n.replace(eb,function(r,o,i){return tn={name:o,styles:i,next:tn},o})}return Jw[t]!==1&&!Wg(t)&&typeof n=="number"&&n!==0?n+"px":n};function ri(e,t,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return tn={name:n.name,styles:n.styles,next:tn},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)tn={name:r.name,styles:r.styles,next:tn},r=r.next;var o=n.styles+";";return o}return tb(e,t,n)}case"function":{if(e!==void 0){var i=tn,l=n(e);return tn=i,ri(e,t,l)}break}}if(t==null)return n;var a=t[n];return a!==void 0?a:n}function tb(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=ri(e,t,n[o])+";";else for(var i in n){var l=n[i];if(typeof l!="object")t!=null&&t[l]!==void 0?r+=i+"{"+t[l]+"}":Jf(l)&&(r+=bs(i)+":"+Zf(i,l)+";");else if(Array.isArray(l)&&typeof l[0]=="string"&&(t==null||t[l[0]]===void 0))for(var a=0;a<l.length;a++)Jf(l[a])&&(r+=bs(i)+":"+Zf(i,l[a])+";");else{var s=ri(e,t,l);switch(i){case"animation":case"animationName":{r+=bs(i)+":"+s+";";break}default:r+=i+"{"+s+"}"}}}return r}var ep=/label:\s*([^\s;\n{]+)\s*(;|$)/g,tn,Kg=function(t,n,r){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var o=!0,i="";tn=void 0;var l=t[0];l==null||l.raw===void 0?(o=!1,i+=ri(r,n,l)):i+=l[0];for(var a=1;a<t.length;a++)i+=ri(r,n,t[a]),o&&(i+=l[a]);ep.lastIndex=0;for(var s="",u;(u=ep.exec(i))!==null;)s+="-"+u[1];var d=Xw(i)+s;return{name:d,styles:i,next:tn}},nb=function(t){return t()},rb=Bd.useInsertionEffect?Bd.useInsertionEffect:!1,ob=rb||nb,Qg=R.createContext(typeof HTMLElement<"u"?jw({key:"css"}):null);Qg.Provider;var ib=function(t){return R.forwardRef(function(n,r){var o=R.useContext(Qg);return t(n,o,r)})},za=R.createContext({});function ve(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Kg(t)}var lb=cw,ab=function(t){return t!=="theme"},tp=function(t){return typeof t=="string"&&t.charCodeAt(0)>96?lb:ab},np=function(t,n,r){var o;if(n){var i=n.shouldForwardProp;o=t.__emotion_forwardProp&&i?function(l){return t.__emotion_forwardProp(l)&&i(l)}:i}return typeof o!="function"&&r&&(o=t.__emotion_forwardProp),o},sb=function(t){var n=t.cache,r=t.serialized,o=t.isStringTag;return Vg(n,r,o),ob(function(){return Yw(n,r,o)}),null},ub=function e(t,n){var r=t.__emotion_real===t,o=r&&t.__emotion_base||t,i,l;n!==void 0&&(i=n.label,l=n.target);var a=np(t,n,r),s=a||tp(o),u=!s("as");return function(){var d=arguments,c=r&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(i!==void 0&&c.push("label:"+i+";"),d[0]==null||d[0].raw===void 0)c.push.apply(c,d);else{c.push(d[0][0]);for(var f=d.length,p=1;p<f;p++)c.push(d[p],d[0][p])}var h=ib(function(y,v,g){var m=u&&y.as||o,k="",C=[],T=y;if(y.theme==null){T={};for(var S in y)T[S]=y[S];T.theme=R.useContext(za)}typeof y.className=="string"?k=Gw(v.registered,C,y.className):y.className!=null&&(k=y.className+" ");var E=Kg(c.concat(C),v.registered,T);k+=v.key+"-"+E.name,l!==void 0&&(k+=" "+l);var P=u&&a===void 0?tp(m):s,M={};for(var b in y)u&&b==="as"||P(b)&&(M[b]=y[b]);return M.className=k,M.ref=g,R.createElement(R.Fragment,null,R.createElement(sb,{cache:v,serialized:E,isStringTag:typeof m=="string"}),R.createElement(m,M))});return h.displayName=i!==void 0?i:"Styled("+(typeof o=="string"?o:o.displayName||o.name||"Component")+")",h.defaultProps=t.defaultProps,h.__emotion_real=h,h.__emotion_base=o,h.__emotion_styles=c,h.__emotion_forwardProp=a,Object.defineProperty(h,"toString",{value:function(){return"."+l}}),h.withComponent=function(y,v){return e(y,Q({},n,v,{shouldForwardProp:np(h,v,!0)})).apply(void 0,c)},h}},cb=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],Uu=ub.bind();cb.forEach(function(e){Uu[e]=Uu(e)});var qg={exports:{}},db="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",fb=db,pb=fb;function Gg(){}function Yg(){}Yg.resetWarningCache=Gg;var mb=function(){function e(r,o,i,l,a,s){if(s!==pb){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Yg,resetWarningCache:Gg};return n.PropTypes=n,n};qg.exports=mb();var hb=qg.exports;const rp=oa(hb);function hr(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const gb=typeof window<"u"?R.useLayoutEffect:R.useEffect;function Xg(e,t){const n=Q({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=Q({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=Q({},i),Object.keys(o).forEach(l=>{n[r][l]=Xg(o[l],i[l])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function yb(e){return Object.keys(e).length===0}function kb(e=null){const t=R.useContext(za);return!t||yb(t)?e:t}function Jg(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=Jg(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Hu(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=Jg(e))&&(r&&(r+=" "),r+=t);return r}function wb(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Xg(t.components[n].defaultProps,r)}function bb(e,t,n,r,o){const[i,l]=R.useState(()=>o&&n?n(e).matches:r?r(e).matches:t);return gb(()=>{let a=!0;if(!n)return;const s=n(e),u=()=>{a&&l(s.matches)};return u(),s.addListener(u),()=>{a=!1,s.removeListener(u)}},[e,n]),i}const Zg=R.useSyncExternalStore;function vb(e,t,n,r,o){const i=R.useCallback(()=>t,[t]),l=R.useMemo(()=>{if(o&&n)return()=>n(e).matches;if(r!==null){const{matches:d}=r(e);return()=>d}return i},[i,e,r,o,n]),[a,s]=R.useMemo(()=>{if(n===null)return[i,()=>()=>{}];const d=n(e);return[()=>d.matches,c=>(d.addListener(c),()=>{d.removeListener(c)})]},[i,n,e]);return Zg(s,a,l)}function xb(e,t={}){const n=kb(),r=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:o=!1,matchMedia:i=r?window.matchMedia:null,ssrMatchMedia:l=null,noSsr:a=!1}=wb({name:"MuiUseMediaQuery",props:t,theme:n});let s=typeof e=="function"?e(n):e;return s=s.replace(/^@media( ?)/m,""),(Zg!==void 0?vb:bb)(s,o,i,l,a)}function Sb(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}function Cb(e,t){return Uu(e,t)}const Eb=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))};function On(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ey(e){if(!On(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ey(e[n])}),t}function Jr(e,t,n={clone:!0}){const r=n.clone?Q({},e):e;return On(e)&&On(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(On(t[o])&&o in e&&On(e[o])?r[o]=Jr(e[o],t[o],n):n.clone?r[o]=On(t[o])?ey(t[o]):t[o]:r[o]=t[o])}),r}function Lo(e){if(typeof e!="string")throw new Error(Sb(7));return e.charAt(0).toUpperCase()+e.slice(1)}const Tb=["values","unit","step"],Pb=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>Q({},n,{[r.key]:r.val}),{})};function _b(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=hr(e,Tb),i=Pb(t),l=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function s(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,p){const h=l.indexOf(p);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(h!==-1&&typeof t[l[h]]=="number"?t[l[h]]:p)-r/100}${n})`}function d(f){return l.indexOf(f)+1<l.length?u(f,l[l.indexOf(f)+1]):a(f)}function c(f){const p=l.indexOf(f);return p===0?a(l[1]):p===l.length-1?s(l[p]):u(f,l[l.indexOf(f)+1]).replace("@media","@media not all and")}return Q({keys:l,values:i,up:a,down:s,between:u,only:d,not:c,unit:n},o)}const Rb={borderRadius:4},Ib=Rb;function zo(e,t){return t?Jr(e,t,{clone:!1}):e}const ud={xs:0,sm:600,md:900,lg:1200,xl:1536},op={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ud[e]}px)`};function vn(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||op;return t.reduce((l,a,s)=>(l[i.up(i.keys[s])]=n(t[s]),l),{})}if(typeof t=="object"){const i=r.breakpoints||op;return Object.keys(t).reduce((l,a)=>{if(Object.keys(i.values||ud).indexOf(a)!==-1){const s=i.up(a);l[s]=n(t[a],a)}else{const s=a;l[s]=t[s]}return l},{})}return n(t)}function Ob(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Ab(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Ma(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Gl(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Ma(e,n)||r,t&&(o=t(o,r,e)),o}function Re(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=l=>{if(l[t]==null)return null;const a=l[t],s=l.theme,u=Ma(s,r)||{};return vn(l,a,c=>{let f=Gl(u,o,c);return c===f&&typeof c=="string"&&(f=Gl(u,o,`${t}${c==="default"?"":Lo(c)}`,c)),n===!1?f:{[n]:f}})};return i.propTypes={},i.filterProps=[t],i}function Lb(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const zb={m:"margin",p:"padding"},Mb={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ip={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Db=Lb(e=>{if(e.length>2)if(ip[e])e=ip[e];else return[e];const[t,n]=e.split(""),r=zb[t],o=Mb[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),cd=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],dd=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];[...cd,...dd];function Si(e,t,n,r){var o;const i=(o=Ma(e,t,!1))!=null?o:n;return typeof i=="number"?l=>typeof l=="string"?l:i*l:Array.isArray(i)?l=>typeof l=="string"?l:i[l]:typeof i=="function"?i:()=>{}}function ty(e){return Si(e,"spacing",8)}function Ci(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Fb(e,t){return n=>e.reduce((r,o)=>(r[o]=Ci(t,n),r),{})}function Nb(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Db(n),i=Fb(o,r),l=e[n];return vn(e,l,i)}function ny(e,t){const n=ty(e.theme);return Object.keys(e).map(r=>Nb(e,t,r,n)).reduce(zo,{})}function Ee(e){return ny(e,cd)}Ee.propTypes={};Ee.filterProps=cd;function Te(e){return ny(e,dd)}Te.propTypes={};Te.filterProps=dd;function jb(e=8){if(e.mui)return e;const t=ty({spacing:e}),n=(...r)=>(r.length===0?[1]:r).map(i=>{const l=t(i);return typeof l=="number"?`${l}px`:l}).join(" ");return n.mui=!0,n}function Da(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?zo(o,t[i](r)):o,{});return n.propTypes={},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ot(e){return typeof e!="number"?e:`${e}px solid`}function Nt(e,t){return Re({prop:e,themeKey:"borders",transform:t})}const $b=Nt("border",Ot),Bb=Nt("borderTop",Ot),Ub=Nt("borderRight",Ot),Hb=Nt("borderBottom",Ot),Vb=Nt("borderLeft",Ot),Wb=Nt("borderColor"),Kb=Nt("borderTopColor"),Qb=Nt("borderRightColor"),qb=Nt("borderBottomColor"),Gb=Nt("borderLeftColor"),Yb=Nt("outline",Ot),Xb=Nt("outlineColor"),Fa=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Si(e.theme,"shape.borderRadius",4),n=r=>({borderRadius:Ci(t,r)});return vn(e,e.borderRadius,n)}return null};Fa.propTypes={};Fa.filterProps=["borderRadius"];Da($b,Bb,Ub,Hb,Vb,Wb,Kb,Qb,qb,Gb,Fa,Yb,Xb);const Na=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Si(e.theme,"spacing",8),n=r=>({gap:Ci(t,r)});return vn(e,e.gap,n)}return null};Na.propTypes={};Na.filterProps=["gap"];const ja=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Si(e.theme,"spacing",8),n=r=>({columnGap:Ci(t,r)});return vn(e,e.columnGap,n)}return null};ja.propTypes={};ja.filterProps=["columnGap"];const $a=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Si(e.theme,"spacing",8),n=r=>({rowGap:Ci(t,r)});return vn(e,e.rowGap,n)}return null};$a.propTypes={};$a.filterProps=["rowGap"];const Jb=Re({prop:"gridColumn"}),Zb=Re({prop:"gridRow"}),ev=Re({prop:"gridAutoFlow"}),tv=Re({prop:"gridAutoColumns"}),nv=Re({prop:"gridAutoRows"}),rv=Re({prop:"gridTemplateColumns"}),ov=Re({prop:"gridTemplateRows"}),iv=Re({prop:"gridTemplateAreas"}),lv=Re({prop:"gridArea"});Da(Na,ja,$a,Jb,Zb,ev,tv,nv,rv,ov,iv,lv);function Ur(e,t){return t==="grey"?t:e}const av=Re({prop:"color",themeKey:"palette",transform:Ur}),sv=Re({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Ur}),uv=Re({prop:"backgroundColor",themeKey:"palette",transform:Ur});Da(av,sv,uv);function wt(e){return e<=1&&e!==0?`${e*100}%`:e}const cv=Re({prop:"width",transform:wt}),fd=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||ud[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:wt(n)}};return vn(e,e.maxWidth,t)}return null};fd.filterProps=["maxWidth"];const dv=Re({prop:"minWidth",transform:wt}),fv=Re({prop:"height",transform:wt}),pv=Re({prop:"maxHeight",transform:wt}),mv=Re({prop:"minHeight",transform:wt});Re({prop:"size",cssProperty:"width",transform:wt});Re({prop:"size",cssProperty:"height",transform:wt});const hv=Re({prop:"boxSizing"});Da(cv,fd,dv,fv,pv,mv,hv);const gv={border:{themeKey:"borders",transform:Ot},borderTop:{themeKey:"borders",transform:Ot},borderRight:{themeKey:"borders",transform:Ot},borderBottom:{themeKey:"borders",transform:Ot},borderLeft:{themeKey:"borders",transform:Ot},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ot},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Fa},color:{themeKey:"palette",transform:Ur},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Ur},backgroundColor:{themeKey:"palette",transform:Ur},p:{style:Te},pt:{style:Te},pr:{style:Te},pb:{style:Te},pl:{style:Te},px:{style:Te},py:{style:Te},padding:{style:Te},paddingTop:{style:Te},paddingRight:{style:Te},paddingBottom:{style:Te},paddingLeft:{style:Te},paddingX:{style:Te},paddingY:{style:Te},paddingInline:{style:Te},paddingInlineStart:{style:Te},paddingInlineEnd:{style:Te},paddingBlock:{style:Te},paddingBlockStart:{style:Te},paddingBlockEnd:{style:Te},m:{style:Ee},mt:{style:Ee},mr:{style:Ee},mb:{style:Ee},ml:{style:Ee},mx:{style:Ee},my:{style:Ee},margin:{style:Ee},marginTop:{style:Ee},marginRight:{style:Ee},marginBottom:{style:Ee},marginLeft:{style:Ee},marginX:{style:Ee},marginY:{style:Ee},marginInline:{style:Ee},marginInlineStart:{style:Ee},marginInlineEnd:{style:Ee},marginBlock:{style:Ee},marginBlockStart:{style:Ee},marginBlockEnd:{style:Ee},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Na},rowGap:{style:$a},columnGap:{style:ja},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:wt},maxWidth:{style:fd},minWidth:{transform:wt},height:{transform:wt},maxHeight:{transform:wt},minHeight:{transform:wt},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},ry=gv;function yv(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function kv(e,t){return typeof e=="function"?e(t):e}function wv(){function e(n,r,o,i){const l={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:s=n,themeKey:u,transform:d,style:c}=a;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=Ma(o,u)||{};return c?c(l):vn(l,r,h=>{let y=Gl(f,d,h);return h===y&&typeof h=="string"&&(y=Gl(f,d,`${n}${h==="default"?"":Lo(h)}`,h)),s===!1?y:{[s]:y}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const l=(r=i.unstable_sxConfig)!=null?r:ry;function a(s){let u=s;if(typeof s=="function")u=s(i);else if(typeof s!="object")return s;if(!u)return null;const d=Ob(i.breakpoints),c=Object.keys(d);let f=d;return Object.keys(u).forEach(p=>{const h=kv(u[p],i);if(h!=null)if(typeof h=="object")if(l[p])f=zo(f,e(p,h,i,l));else{const y=vn({theme:i},h,v=>({[p]:v}));yv(y,h)?f[p]=t({sx:h,theme:i}):f=zo(f,y)}else f=zo(f,e(p,h,i,l))}),Ab(c,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const pd=wv();pd.filterProps=["sx"];const bv=["breakpoints","palette","spacing","shape"];function md(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,l=hr(e,bv),a=_b(n),s=jb(o);let u=Jr({breakpoints:a,direction:"ltr",components:{},palette:Q({mode:"light"},r),spacing:s,shape:Q({},Ib,i)},l);return u=t.reduce((d,c)=>Jr(d,c),u),u.unstable_sxConfig=Q({},ry,l==null?void 0:l.unstable_sxConfig),u.unstable_sx=function(c){return pd({sx:c,theme:this})},u}function vv(e){return Object.keys(e).length===0}function xv(e=null){const t=R.useContext(za);return!t||vv(t)?e:t}const Sv=["variant"];function lp(e){return e.length===0}function oy(e){const{variant:t}=e,n=hr(e,Sv);let r=t||"";return Object.keys(n).sort().forEach(o=>{o==="color"?r+=lp(r)?e[o]:Lo(e[o]):r+=`${lp(r)?o:Lo(o)}${Lo(e[o].toString())}`}),r}const Cv=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ev(e){return Object.keys(e).length===0}function Tv(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Pv=(e,t)=>t.components&&t.components[e]&&t.components[e].styleOverrides?t.components[e].styleOverrides:null,Yl=e=>{let t=0;const n={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${t}`,t+=1):o=oy(r.props),n[o]=r.style}),n},_v=(e,t)=>{let n=[];return t&&t.components&&t.components[e]&&t.components[e].variants&&(n=t.components[e].variants),Yl(n)},Xl=(e,t,n)=>{const{ownerState:r={}}=e,o=[];let i=0;return n&&n.forEach(l=>{let a=!0;if(typeof l.props=="function"){const s=Q({},e,r);a=l.props(s)}else Object.keys(l.props).forEach(s=>{r[s]!==l.props[s]&&e[s]!==l.props[s]&&(a=!1)});a&&(typeof l.props=="function"?o.push(t[`callback${i}`]):o.push(t[oy(l.props)])),typeof l.props=="function"&&(i+=1)}),o},Rv=(e,t,n,r)=>{var o;const i=n==null||(o=n.components)==null||(o=o[r])==null?void 0:o.variants;return Xl(e,t,i)};function vs(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Iv=md(),Ov=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function vl({defaultTheme:e,theme:t,themeId:n}){return Ev(t)?e:t[n]||t}function Av(e){return e?(t,n)=>n[e]:null}const ap=({styledArg:e,props:t,defaultTheme:n,themeId:r})=>{const o=e(Q({},t,{theme:vl(Q({},t,{defaultTheme:n,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const l=Xl(t,Yl(i),i);return[o,...l]}return o};function Lv(e={}){const{themeId:t,defaultTheme:n=Iv,rootShouldForwardProp:r=vs,slotShouldForwardProp:o=vs}=e,i=l=>pd(Q({},l,{theme:vl(Q({},l,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(l,a={})=>{Eb(l,C=>C.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:s,slot:u,skipVariantsResolver:d,skipSx:c,overridesResolver:f=Av(Ov(u))}=a,p=hr(a,Cv),h=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,y=c||!1;let v,g=vs;u==="Root"||u==="root"?g=r:u?g=o:Tv(l)&&(g=void 0);const m=Cb(l,Q({shouldForwardProp:g,label:v},p)),k=(C,...T)=>{const S=T?T.map(b=>{if(typeof b=="function"&&b.__emotion_real!==b)return O=>ap({styledArg:b,props:O,defaultTheme:n,themeId:t});if(On(b)){let O=b,L;return b&&b.variants&&(L=b.variants,delete O.variants,O=B=>{let W=b;return Xl(B,Yl(L),L).forEach(A=>{W=Jr(W,A)}),W}),O}return b}):[];let E=C;if(On(C)){let b;C&&C.variants&&(b=C.variants,delete E.variants,E=O=>{let L=C;return Xl(O,Yl(b),b).forEach(W=>{L=Jr(L,W)}),L})}else typeof C=="function"&&C.__emotion_real!==C&&(E=b=>ap({styledArg:C,props:b,defaultTheme:n,themeId:t}));s&&f&&S.push(b=>{const O=vl(Q({},b,{defaultTheme:n,themeId:t})),L=Pv(s,O);if(L){const B={};return Object.entries(L).forEach(([W,F])=>{B[W]=typeof F=="function"?F(Q({},b,{theme:O})):F}),f(b,B)}return null}),s&&!h&&S.push(b=>{const O=vl(Q({},b,{defaultTheme:n,themeId:t}));return Rv(b,_v(s,O),O,s)}),y||S.push(i);const P=S.length-T.length;if(Array.isArray(C)&&P>0){const b=new Array(P).fill("");E=[...C,...b],E.raw=[...C.raw,...b]}const M=m(E,...S);return l.muiName&&(M.muiName=l.muiName),M};return m.withConfig&&(k.withConfig=m.withConfig),k}}const Ie=Lv(),zv=R.createContext(null),iy=zv;function ly(){return R.useContext(iy)}const Mv=typeof Symbol=="function"&&Symbol.for,Dv=Mv?Symbol.for("mui.nested"):"__THEME_NESTED__";function Fv(e,t){return typeof t=="function"?t(e):Q({},e,t)}function Nv(e){const{children:t,theme:n}=e,r=ly(),o=R.useMemo(()=>{const i=r===null?n:Fv(r,n);return i!=null&&(i[Dv]=r!==null),i},[n,r]);return N.jsx(iy.Provider,{value:o,children:t})}const sp={};function up(e,t,n,r=!1){return R.useMemo(()=>{const o=e&&t[e]||t;if(typeof n=="function"){const i=n(o),l=e?Q({},t,{[e]:i}):i;return r?()=>l:l}return e?Q({},t,{[e]:n}):Q({},t,n)},[e,t,n,r])}function jv(e){const{children:t,theme:n,themeId:r}=e,o=xv(sp),i=ly()||sp,l=up(r,o,n),a=up(r,i,n,!0);return N.jsx(Nv,{theme:a,children:N.jsx(za.Provider,{value:l,children:t})})}function cp(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Hn(e){return e&&e.ownerDocument||document}function hd(e){return Hn(e).defaultView||window}function Vu(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Wu=typeof window<"u"?R.useLayoutEffect:R.useEffect;function dp(e){const t=R.useRef(e);return Wu(()=>{t.current=e}),R.useRef((...n)=>(0,t.current)(...n)).current}function Ei(...e){return R.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Vu(n,t)})},e)}let Ba=!0,Ku=!1,fp;const $v={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Bv(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&$v[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Uv(e){e.metaKey||e.altKey||e.ctrlKey||(Ba=!0)}function xs(){Ba=!1}function Hv(){this.visibilityState==="hidden"&&Ku&&(Ba=!0)}function Vv(e){e.addEventListener("keydown",Uv,!0),e.addEventListener("mousedown",xs,!0),e.addEventListener("pointerdown",xs,!0),e.addEventListener("touchstart",xs,!0),e.addEventListener("visibilitychange",Hv,!0)}function Wv(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Ba||Bv(t)}function Kv(){const e=R.useCallback(o=>{o!=null&&Vv(o.ownerDocument)},[]),t=R.useRef(!1);function n(){return t.current?(Ku=!0,window.clearTimeout(fp),fp=window.setTimeout(()=>{Ku=!1},100),t.current=!1,!0):!1}function r(o){return Wv(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Qv(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ay(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,l)=>{if(l){const a=t(l);a!==""&&i.push(a),n&&n[l]&&i.push(n[l])}return i},[]).join(" ")}),r}const qv={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"},sy="base";function Gv(e){return`${sy}--${e}`}function Yv(e,t){return`${sy}-${e}-${t}`}function gd(e,t){const n=qv[t];return n?Gv(n):Yv(e,t)}function uy(e,t){const n={};return t.forEach(r=>{n[r]=gd(e,r)}),n}const cy="Button";function Xv(e){return gd(cy,e)}uy(cy,["root","active","disabled","focusVisible"]);function Jl(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Jv(e={}){const{disabled:t=!1,focusableWhenDisabled:n,href:r,rootRef:o,tabIndex:i,to:l,type:a}=e,s=R.useRef(),[u,d]=R.useState(!1),{isFocusVisibleRef:c,onFocus:f,onBlur:p,ref:h}=Kv(),[y,v]=R.useState(!1);t&&!n&&y&&v(!1),R.useEffect(()=>{c.current=y},[y,c]);const[g,m]=R.useState(""),k=F=>A=>{var $;y&&A.preventDefault(),($=F.onMouseLeave)==null||$.call(F,A)},C=F=>A=>{var $;p(A),c.current===!1&&v(!1),($=F.onBlur)==null||$.call(F,A)},T=F=>A=>{var $;if(s.current||(s.current=A.currentTarget),f(A),c.current===!0){var I;v(!0),(I=F.onFocusVisible)==null||I.call(F,A)}($=F.onFocus)==null||$.call(F,A)},S=()=>{const F=s.current;return g==="BUTTON"||g==="INPUT"&&["button","submit","reset"].includes(F==null?void 0:F.type)||g==="A"&&(F==null?void 0:F.href)},E=F=>A=>{if(!t){var $;($=F.onClick)==null||$.call(F,A)}},P=F=>A=>{var $;t||(d(!0),document.addEventListener("mouseup",()=>{d(!1)},{once:!0})),($=F.onMouseDown)==null||$.call(F,A)},M=F=>A=>{var $;if(($=F.onKeyDown)==null||$.call(F,A),!A.defaultMuiPrevented&&(A.target===A.currentTarget&&!S()&&A.key===" "&&A.preventDefault(),A.target===A.currentTarget&&A.key===" "&&!t&&d(!0),A.target===A.currentTarget&&!S()&&A.key==="Enter"&&!t)){var I;(I=F.onClick)==null||I.call(F,A),A.preventDefault()}},b=F=>A=>{var $;if(A.target===A.currentTarget&&d(!1),($=F.onKeyUp)==null||$.call(F,A),A.target===A.currentTarget&&!S()&&!t&&A.key===" "&&!A.defaultMuiPrevented){var I;(I=F.onClick)==null||I.call(F,A)}},O=R.useCallback(F=>{var A;m((A=F==null?void 0:F.tagName)!=null?A:"")},[]),L=Ei(O,o,h,s),B={};return i!==void 0&&(B.tabIndex=i),g==="BUTTON"?(B.type=a??"button",n?B["aria-disabled"]=t:B.disabled=t):g!==""&&(!r&&!l&&(B.role="button",B.tabIndex=i??0),t&&(B["aria-disabled"]=t,B.tabIndex=n?i??0:-1)),{getRootProps:(F={})=>{const A=Q({},Jl(e),Jl(F)),$=Q({type:a},A,B,F,{onBlur:C(A),onClick:E(A),onFocus:T(A),onKeyDown:M(A),onKeyUp:b(A),onMouseDown:P(A),onMouseLeave:k(A),ref:L});return delete $.onFocusVisible,$},focusVisible:y,setFocusVisible:v,active:u,rootRef:L}}function Zv(e){return typeof e=="string"}function ex(e,t,n){return e===void 0||Zv(e)?t:Q({},t,{ownerState:Q({},t.ownerState,n)})}const tx={disableDefaultClasses:!1},nx=R.createContext(tx);function dy(e){const{disableDefaultClasses:t}=R.useContext(nx);return n=>t?"":e(n)}function rx(e,t,n){return typeof e=="function"?e(t,n):e}function pp(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ox(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const p=Hu(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=Q({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),y=Q({},n,o,r);return p.length>0&&(y.className=p),Object.keys(h).length>0&&(y.style=h),{props:y,internalRef:void 0}}const l=Jl(Q({},o,r)),a=pp(r),s=pp(o),u=t(l),d=Hu(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),c=Q({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=Q({},u,n,s,a);return d.length>0&&(f.className=d),Object.keys(c).length>0&&(f.style=c),{props:f,internalRef:u.ref}}const ix=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Qu(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,l=hr(e,ix),a=i?{}:rx(r,o),{props:s,internalRef:u}=ox(Q({},l,{externalSlotProps:a})),d=Ei(u,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return ex(n,Q({},s,{ref:d}),o)}const lx=["action","children","disabled","focusableWhenDisabled","onFocusVisible","slotProps","slots"],ax=e=>{const{active:t,disabled:n,focusVisible:r}=e;return ay({root:["root",n&&"disabled",r&&"focusVisible",t&&"active"]},dy(Xv))},sx=R.forwardRef(function(t,n){var r;const{action:o,children:i,focusableWhenDisabled:l=!1,slotProps:a={},slots:s={}}=t,u=hr(t,lx),d=R.useRef(),{active:c,focusVisible:f,setFocusVisible:p,getRootProps:h}=Jv(Q({},t,{focusableWhenDisabled:l}));R.useImperativeHandle(o,()=>({focusVisible:()=>{p(!0),d.current.focus()}}),[p]);const y=Q({},t,{active:c,focusableWhenDisabled:l,focusVisible:f}),v=ax(y),g=u.href||u.to?"a":"button",m=(r=s.root)!=null?r:g,k=Qu({elementType:m,getSlotProps:h,externalForwardedProps:u,externalSlotProps:a.root,additionalProps:{ref:n},ownerState:y,className:v.root});return N.jsx(m,Q({},k,{children:i}))}),ux=Ie("button")(({theme:e})=>ve({display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,padding:"8px 16px",borderRadius:e.shape.borderRadius,transition:"all 150ms ease",cursor:"pointer",background:e.palette.background,border:`1px solid ${e.palette.border}`,color:e.palette.primary,boxShadow:"0 1px 2px 0 rgb(0 0 0 / 0.05)",position:"fixed",bottom:"24px",right:"24px","&:hover":{borderColor:e.palette.ring},"&:active":{borderColor:e.palette.ring}})),fy=Ie(sx)(({theme:e})=>ve({display:"inline-flex",alignItems:"center",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring},"&.Mui-focusVisible":{outline:"none"},"&.Mui-disabled":{backgroundColor:e.palette.muted,color:"grey",cursor:"default",border:"0"}}));function cx(e){return typeof e=="function"?e():e}const dx=R.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[l,a]=R.useState(null),s=Ei(R.isValidElement(r)?r.ref:null,n);if(Wu(()=>{i||a(cx(o)||document.body)},[o,i]),Wu(()=>{if(l&&!i)return Vu(n,l),()=>{Vu(n,null)}},[n,l,i]),i){if(R.isValidElement(r)){const u={ref:s};return R.cloneElement(r,u)}return N.jsx(R.Fragment,{children:r})}return N.jsx(R.Fragment,{children:l&&Og.createPortal(r,l)})});function fx(e){const t=Hn(e);return t.body===e?hd(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Mo(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function mp(e){return parseInt(hd(e).getComputedStyle(e).paddingRight,10)||0}function px(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function hp(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,l=>{const a=i.indexOf(l)===-1,s=!px(l);a&&s&&Mo(l,o)})}function Ss(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function mx(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(fx(r)){const l=Qv(Hn(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${mp(r)+l}px`;const a=Hn(r).querySelectorAll(".mui-fixed");[].forEach.call(a,s=>{n.push({value:s.style.paddingRight,property:"padding-right",el:s}),s.style.paddingRight=`${mp(s)+l}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Hn(r).body;else{const l=r.parentElement,a=hd(r);i=(l==null?void 0:l.nodeName)==="HTML"&&a.getComputedStyle(l).overflowY==="scroll"?l:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:l,property:a})=>{i?l.style.setProperty(a,i):l.style.removeProperty(a)})}}function hx(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class gx{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Mo(t.modalRef,!1);const o=hx(n);hp(n,t.mount,t.modalRef,o,!0);const i=Ss(this.containers,l=>l.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Ss(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=mx(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Ss(this.containers,l=>l.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&Mo(t.modalRef,n),hp(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const l=i.modals[i.modals.length-1];l.modalRef&&Mo(l.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function yx(e){return typeof e=="function"?e():e}function kx(e){return e?e.props.hasOwnProperty("in"):!1}const wx=new gx;function bx(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=wx,closeAfterTransition:i=!1,onTransitionEnter:l,onTransitionExited:a,children:s,onClose:u,open:d,rootRef:c}=e,f=R.useRef({}),p=R.useRef(null),h=R.useRef(null),y=Ei(h,c),[v,g]=R.useState(!d),m=kx(s);let k=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(k=!1);const C=()=>Hn(p.current),T=()=>(f.current.modalRef=h.current,f.current.mount=p.current,f.current),S=()=>{o.mount(T(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},E=dp(()=>{const A=yx(t)||C().body;o.add(T(),A),h.current&&S()}),P=R.useCallback(()=>o.isTopModal(T()),[o]),M=dp(A=>{p.current=A,A&&(d&&P()?S():h.current&&Mo(h.current,k))}),b=R.useCallback(()=>{o.remove(T(),k)},[k,o]);R.useEffect(()=>()=>{b()},[b]),R.useEffect(()=>{d?E():(!m||!i)&&b()},[d,b,m,i,E]);const O=A=>$=>{var I;(I=A.onKeyDown)==null||I.call(A,$),!($.key!=="Escape"||$.which===229||!P())&&(n||($.stopPropagation(),u&&u($,"escapeKeyDown")))},L=A=>$=>{var I;(I=A.onClick)==null||I.call(A,$),$.target===$.currentTarget&&u&&u($,"backdropClick")};return{getRootProps:(A={})=>{const $=Jl(e);delete $.onTransitionEnter,delete $.onTransitionExited;const I=Q({},$,A);return Q({role:"presentation"},I,{onKeyDown:O(I),ref:y})},getBackdropProps:(A={})=>{const $=A;return Q({"aria-hidden":!0},$,{onClick:L($),open:d})},getTransitionProps:()=>{const A=()=>{g(!1),l&&l()},$=()=>{g(!0),a&&a(),i&&b()};return{onEnter:cp(A,s==null?void 0:s.props.onEnter),onExited:cp($,s==null?void 0:s.props.onExited)}},rootRef:y,portalRef:M,isTopModal:P,exited:v,hasTransition:m}}const vx=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function xx(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Sx(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Cx(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Sx(e))}function Ex(e){const t=[],n=[];return Array.from(e.querySelectorAll(vx)).forEach((r,o)=>{const i=xx(r);i===-1||!Cx(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Tx(){return!0}function Px(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Ex,isEnabled:l=Tx,open:a}=e,s=R.useRef(!1),u=R.useRef(null),d=R.useRef(null),c=R.useRef(null),f=R.useRef(null),p=R.useRef(!1),h=R.useRef(null),y=Ei(t.ref,h),v=R.useRef(null);R.useEffect(()=>{!a||!h.current||(p.current=!n)},[n,a]),R.useEffect(()=>{if(!a||!h.current)return;const k=Hn(h.current);return h.current.contains(k.activeElement)||(h.current.hasAttribute("tabIndex")||h.current.setAttribute("tabIndex","-1"),p.current&&h.current.focus()),()=>{o||(c.current&&c.current.focus&&(s.current=!0,c.current.focus()),c.current=null)}},[a]),R.useEffect(()=>{if(!a||!h.current)return;const k=Hn(h.current),C=E=>{v.current=E,!(r||!l()||E.key!=="Tab")&&k.activeElement===h.current&&E.shiftKey&&(s.current=!0,d.current&&d.current.focus())},T=()=>{const E=h.current;if(E===null)return;if(!k.hasFocus()||!l()||s.current){s.current=!1;return}if(E.contains(k.activeElement)||r&&k.activeElement!==u.current&&k.activeElement!==d.current)return;if(k.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!p.current)return;let P=[];if((k.activeElement===u.current||k.activeElement===d.current)&&(P=i(h.current)),P.length>0){var M,b;const O=!!((M=v.current)!=null&&M.shiftKey&&((b=v.current)==null?void 0:b.key)==="Tab"),L=P[0],B=P[P.length-1];typeof L!="string"&&typeof B!="string"&&(O?B.focus():L.focus())}else E.focus()};k.addEventListener("focusin",T),k.addEventListener("keydown",C,!0);const S=setInterval(()=>{k.activeElement&&k.activeElement.tagName==="BODY"&&T()},50);return()=>{clearInterval(S),k.removeEventListener("focusin",T),k.removeEventListener("keydown",C,!0)}},[n,r,o,l,a,i]);const g=k=>{c.current===null&&(c.current=k.relatedTarget),p.current=!0,f.current=k.target;const C=t.props.onFocus;C&&C(k)},m=k=>{c.current===null&&(c.current=k.relatedTarget),p.current=!0};return N.jsxs(R.Fragment,{children:[N.jsx("div",{tabIndex:a?0:-1,onFocus:m,ref:u,"data-testid":"sentinelStart"}),R.cloneElement(t,{ref:y,onFocus:g}),N.jsx("div",{tabIndex:a?0:-1,onFocus:m,ref:d,"data-testid":"sentinelEnd"})]})}const py="Modal";function _x(e){return gd(py,e)}uy(py,["root","hidden","backdrop"]);const Rx=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],Ix=e=>{const{open:t,exited:n}=e;return ay({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},dy(_x))},Ox=R.forwardRef(function(t,n){var r;const{children:o,closeAfterTransition:i=!1,container:l,disableAutoFocus:a=!1,disableEnforceFocus:s=!1,disableEscapeKeyDown:u=!1,disablePortal:d=!1,disableRestoreFocus:c=!1,disableScrollLock:f=!1,hideBackdrop:p=!1,keepMounted:h=!1,onBackdropClick:y,open:v,slotProps:g={},slots:m={}}=t,k=hr(t,Rx),C=Q({},t,{closeAfterTransition:i,disableAutoFocus:a,disableEnforceFocus:s,disableEscapeKeyDown:u,disablePortal:d,disableRestoreFocus:c,disableScrollLock:f,hideBackdrop:p,keepMounted:h}),{getRootProps:T,getBackdropProps:S,getTransitionProps:E,portalRef:P,isTopModal:M,exited:b,hasTransition:O}=bx(Q({},C,{rootRef:n})),L=Q({},C,{exited:b,hasTransition:O}),B=Ix(L),W={};if(o.props.tabIndex===void 0&&(W.tabIndex="-1"),O){const{onEnter:H,onExited:w}=E();W.onEnter=H,W.onExited=w}const F=(r=m.root)!=null?r:"div",A=Qu({elementType:F,externalSlotProps:g.root,externalForwardedProps:k,getSlotProps:T,className:B.root,ownerState:L}),$=m.backdrop,I=Qu({elementType:$,externalSlotProps:g.backdrop,getSlotProps:H=>S(Q({},H,{onClick:w=>{y&&y(w),H!=null&&H.onClick&&H.onClick(w)}})),className:B.backdrop,ownerState:L});return!h&&!v&&(!O||b)?null:N.jsx(dx,{ref:P,container:l,disablePortal:d,children:N.jsxs(F,Q({},A,{children:[!p&&$?N.jsx($,Q({},I)):null,N.jsx(Px,{disableEnforceFocus:s,disableAutoFocus:a,disableRestoreFocus:c,isEnabled:M,open:v,children:R.cloneElement(o,W)})]}))})}),my=R.forwardRef((e,t)=>{const{open:n,className:r,...o}=e;return N.jsx("div",{className:Hu({"base-Backdrop-open":n},r),ref:t,...o})});my.propTypes={className:rp.string.isRequired,open:rp.bool};const Ax=Ie(Ox)({position:"fixed",zIndex:1300,inset:0,display:"flex",alignItems:"center",justifyContent:"center"}),Lx=Ie(my)(({theme:e})=>ve({zIndex:-1,position:"fixed",inset:0,backgroundColor:e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)",WebkitTapHighlightColor:"transparent"})),zx=Ie("div")(({theme:e})=>ve({fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:500,textAlign:"start",position:"relative",display:"flex",flexDirection:"column",gap:"8px",overflow:"hidden",backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius,border:`1px solid ${e.palette.border}`,boxShadow:`0 4px 12px ${e.palette.mode==="dark"?"rgb(0 0 0 / 0.5)":"rgb(0 0 0 / 0.2)"}`,padding:"24px",color:e.palette.primary})),Mx=Ie("div")(({theme:e})=>ve({display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px","& .modal-title":{fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"},"& .modal-description":{margin:0,lineHeight:"1.5rem",fontWeight:400,color:e.palette.muted,marginBottom:"4px"}})),Dx=Ie("h2")(()=>ve({display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"1.25rem",fontWeight:600,fontFamily:"'IBM Plex Sans', sans-serif",margin:0,lineHeight:"1.5rem",marginBottom:"8px"}));var hy={exports:{}},gy={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zr=R;function Fx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Nx=typeof Object.is=="function"?Object.is:Fx,jx=Zr.useState,$x=Zr.useEffect,Bx=Zr.useLayoutEffect,Ux=Zr.useDebugValue;function Hx(e,t){var n=t(),r=jx({inst:{value:n,getSnapshot:t}}),o=r[0].inst,i=r[1];return Bx(function(){o.value=n,o.getSnapshot=t,Cs(o)&&i({inst:o})},[e,n,t]),$x(function(){return Cs(o)&&i({inst:o}),e(function(){Cs(o)&&i({inst:o})})},[e]),Ux(n),n}function Cs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Nx(e,n)}catch{return!0}}function Vx(e,t){return t()}var Wx=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Vx:Hx;gy.useSyncExternalStore=Zr.useSyncExternalStore!==void 0?Zr.useSyncExternalStore:Wx;hy.exports=gy;var Kx=hy.exports;const zn=()=>{},Lt=zn(),Es=Object,oe=e=>e===Lt,hn=e=>typeof e=="function",Kn=(e,t)=>({...e,...t}),Qx=e=>hn(e.then),Yi=new WeakMap;let qx=0;const oi=e=>{const t=typeof e,n=e&&e.constructor,r=n==Date;let o,i;if(Es(e)===e&&!r&&n!=RegExp){if(o=Yi.get(e),o)return o;if(o=++qx+"~",Yi.set(e,o),n==Array){for(o="@",i=0;i<e.length;i++)o+=oi(e[i])+",";Yi.set(e,o)}if(n==Es){o="#";const l=Es.keys(e).sort();for(;!oe(i=l.pop());)oe(e[i])||(o+=i+":"+oi(e[i])+",");Yi.set(e,o)}}else o=r?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return o},fn=new WeakMap,Ts={},Xi={},yd="undefined",Ua=typeof window!=yd,qu=typeof document!=yd,Gx=()=>Ua&&typeof window.requestAnimationFrame!=yd,yy=(e,t)=>{const n=fn.get(e);return[()=>!oe(t)&&e.get(t)||Ts,r=>{if(!oe(t)){const o=e.get(t);t in Xi||(Xi[t]=o),n[5](t,Kn(o,r),o||Ts)}},n[6],()=>!oe(t)&&t in Xi?Xi[t]:!oe(t)&&e.get(t)||Ts]};let Gu=!0;const Yx=()=>Gu,[Yu,Xu]=Ua&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[zn,zn],Xx=()=>{const e=qu&&document.visibilityState;return oe(e)||e!=="hidden"},Jx=e=>(qu&&document.addEventListener("visibilitychange",e),Yu("focus",e),()=>{qu&&document.removeEventListener("visibilitychange",e),Xu("focus",e)}),Zx=e=>{const t=()=>{Gu=!0,e()},n=()=>{Gu=!1};return Yu("online",t),Yu("offline",n),()=>{Xu("online",t),Xu("offline",n)}},eS={isOnline:Yx,isVisible:Xx},tS={initFocus:Jx,initReconnect:Zx},gp=!yi.useId,ii=!Ua||"Deno"in window,nS=e=>Gx()?window.requestAnimationFrame(e):setTimeout(e,1),Ps=ii?R.useEffect:R.useLayoutEffect,_s=typeof navigator<"u"&&navigator.connection,yp=!ii&&_s&&(["slow-2g","2g"].includes(_s.effectiveType)||_s.saveData),kd=e=>{if(hn(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?oi(e):"",[e,t]};let rS=0;const Ju=()=>++rS,ky=0,wy=1,by=2,oS=3;var ko={__proto__:null,ERROR_REVALIDATE_EVENT:oS,FOCUS_EVENT:ky,MUTATE_EVENT:by,RECONNECT_EVENT:wy};async function vy(...e){const[t,n,r,o]=e,i=Kn({populateCache:!0,throwOnError:!0},typeof o=="boolean"?{revalidate:o}:o||{});let l=i.populateCache;const a=i.rollbackOnError;let s=i.optimisticData;const u=i.revalidate!==!1,d=p=>typeof a=="function"?a(p):a!==!1,c=i.throwOnError;if(hn(n)){const p=n,h=[],y=t.keys();for(const v of y)!/^\$(inf|sub)\$/.test(v)&&p(t.get(v)._k)&&h.push(v);return Promise.all(h.map(f))}return f(n);async function f(p){const[h]=kd(p);if(!h)return;const[y,v]=yy(t,h),[g,m,k,C]=fn.get(t),T=g[h],S=()=>u&&(delete k[h],delete C[h],T&&T[0])?T[0](by).then(()=>y().data):y().data;if(e.length<3)return S();let E=r,P;const M=Ju();m[h]=[M,0];const b=!oe(s),O=y(),L=O.data,B=O._c,W=oe(B)?L:B;if(b&&(s=hn(s)?s(W,L):s,v({data:s,_c:W})),hn(E))try{E=E(W)}catch(A){P=A}if(E&&Qx(E))if(E=await E.catch(A=>{P=A}),M!==m[h][0]){if(P)throw P;return E}else P&&b&&d(P)&&(l=!0,E=W,v({data:E,_c:Lt}));l&&(P||(hn(l)&&(E=l(E,W)),v({data:E,error:Lt,_c:Lt}))),m[h][1]=Ju();const F=await S();if(v({_c:Lt}),P){if(c)throw P;return}return l?F:E}}const kp=(e,t)=>{for(const n in e)e[n][0]&&e[n][0](t)},iS=(e,t)=>{if(!fn.has(e)){const n=Kn(tS,t),r={},o=vy.bind(Lt,e);let i=zn;const l={},a=(d,c)=>{const f=l[d]||[];return l[d]=f,f.push(c),()=>f.splice(f.indexOf(c),1)},s=(d,c,f)=>{e.set(d,c);const p=l[d];if(p)for(const h of p)h(c,f)},u=()=>{if(!fn.has(e)&&(fn.set(e,[r,{},{},{},o,s,a]),!ii)){const d=n.initFocus(setTimeout.bind(Lt,kp.bind(Lt,r,ky))),c=n.initReconnect(setTimeout.bind(Lt,kp.bind(Lt,r,wy)));i=()=>{d&&d(),c&&c(),fn.delete(e)}}};return u(),[e,o,u,i]}return[e,fn.get(e)[4]]},lS=(e,t,n,r,o)=>{const i=n.errorRetryCount,l=o.retryCount,a=~~((Math.random()+.5)*(1<<(l<8?l:8)))*n.errorRetryInterval;!oe(i)&&l>i||setTimeout(r,a,o)},aS=(e,t)=>oi(e)==oi(t),[xy,sS]=iS(new Map),uS=Kn({onLoadingSlow:zn,onSuccess:zn,onError:zn,onErrorRetry:lS,onDiscarded:zn,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:yp?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:yp?5e3:3e3,compare:aS,isPaused:()=>!1,cache:xy,mutate:sS,fallback:{}},eS),cS=(e,t)=>{const n=Kn(e,t);if(t){const{use:r,fallback:o}=e,{use:i,fallback:l}=t;r&&i&&(n.use=r.concat(i)),o&&l&&(n.fallback=Kn(o,l))}return n},dS=R.createContext({}),Sy=Ua&&window.__SWR_DEVTOOLS_USE__,fS=Sy?window.__SWR_DEVTOOLS_USE__:[],pS=()=>{Sy&&(window.__SWR_DEVTOOLS_REACT__=yi)},mS=e=>hn(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}],hS=()=>Kn(uS,R.useContext(dS)),gS=e=>(t,n,r)=>e(t,n&&((...i)=>{const[l]=kd(t),[,,,a]=fn.get(xy),s=a[l];return oe(s)?n(...i):(delete a[l],s)}),r),yS=fS.concat(gS),kS=e=>function(...n){const r=hS(),[o,i,l]=mS(n),a=cS(r,l);let s=e;const{use:u}=a,d=(u||[]).concat(yS);for(let c=d.length;c--;)s=d[c](s);return s(o,i||a.fetcher||null,a)},wS=(e,t,n)=>{const r=t[e]||(t[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o>=0&&(r[o]=r[r.length-1],r.pop())}};pS();const wp=yi.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)}),Rs={dedupe:!0},bS=(e,t,n)=>{const{cache:r,compare:o,suspense:i,fallbackData:l,revalidateOnMount:a,revalidateIfStale:s,refreshInterval:u,refreshWhenHidden:d,refreshWhenOffline:c,keepPreviousData:f}=n,[p,h,y,v]=fn.get(r),[g,m]=kd(e),k=R.useRef(!1),C=R.useRef(!1),T=R.useRef(g),S=R.useRef(t),E=R.useRef(n),P=()=>E.current,M=()=>P().isVisible()&&P().isOnline(),[b,O,L,B]=yy(r,g),W=R.useRef({}).current,F=oe(l)?n.fallback[g]:l,A=(de,fe)=>{for(const Me in W){const we=Me;if(we==="data"){if(!o(de[we],fe[we])&&(!oe(de[we])||!o(ke,fe[we])))return!1}else if(fe[we]!==de[we])return!1}return!0},$=R.useMemo(()=>{const de=!g||!t?!1:oe(a)?P().isPaused()||i?!1:oe(s)?!0:s:a,fe=Ne=>{const $t=Kn(Ne);return delete $t._k,de?{isValidating:!0,isLoading:!0,...$t}:$t},Me=b(),we=B(),ht=fe(Me),Cn=Me===we?ht:fe(we);let Oe=ht;return[()=>{const Ne=fe(b());return A(Ne,Oe)?(Oe.data=Ne.data,Oe.isLoading=Ne.isLoading,Oe.isValidating=Ne.isValidating,Oe.error=Ne.error,Oe):(Oe=Ne,Ne)},()=>Cn]},[r,g]),I=Kx.useSyncExternalStore(R.useCallback(de=>L(g,(fe,Me)=>{A(Me,fe)||de()}),[r,g]),$[0],$[1]),H=!k.current,w=p[g]&&p[g].length>0,G=I.data,K=oe(G)?F:G,x=I.error,ne=R.useRef(K),ke=f?oe(G)?ne.current:G:K,ee=w&&!oe(x)?!1:H&&!oe(a)?a:P().isPaused()?!1:i?oe(K)?!1:s:oe(K)||s,Ue=!!(g&&t&&H&&ee),it=oe(I.isValidating)?Ue:I.isValidating,_t=oe(I.isLoading)?Ue:I.isLoading,mt=R.useCallback(async de=>{const fe=S.current;if(!g||!fe||C.current||P().isPaused())return!1;let Me,we,ht=!0;const Cn=de||{},Oe=!y[g]||!Cn.dedupe,Ne=()=>gp?!C.current&&g===T.current&&k.current:g===T.current,$t={isValidating:!1,isLoading:!1},Ri=()=>{O($t)},Ii=()=>{const lt=y[g];lt&&lt[1]===we&&delete y[g]},Oi={isValidating:!0};oe(b().data)&&(Oi.isLoading=!0);try{if(Oe&&(O(Oi),n.loadingTimeout&&oe(b().data)&&setTimeout(()=>{ht&&Ne()&&P().onLoadingSlow(g,n)},n.loadingTimeout),y[g]=[fe(m),Ju()]),[Me,we]=y[g],Me=await Me,Oe&&setTimeout(Ii,n.dedupingInterval),!y[g]||y[g][1]!==we)return Oe&&Ne()&&P().onDiscarded(g),!1;$t.error=Lt;const lt=h[g];if(!oe(lt)&&(we<=lt[0]||we<=lt[1]||lt[1]===0))return Ri(),Oe&&Ne()&&P().onDiscarded(g),!1;const _=b().data;$t.data=o(_,Me)?_:Me,Oe&&Ne()&&P().onSuccess(Me,g,n)}catch(lt){Ii();const _=P(),{shouldRetryOnError:j}=_;_.isPaused()||($t.error=lt,Oe&&Ne()&&(_.onError(lt,g,_),(j===!0||hn(j)&&j(lt))&&M()&&_.onErrorRetry(lt,g,_,q=>{const X=p[g];X&&X[0]&&X[0](ko.ERROR_REVALIDATE_EVENT,q)},{retryCount:(Cn.retryCount||0)+1,dedupe:!0})))}return ht=!1,Ri(),!0},[g,r]),kr=R.useCallback((...de)=>vy(r,T.current,...de),[]);if(Ps(()=>{S.current=t,E.current=n,oe(G)||(ne.current=G)}),Ps(()=>{if(!g)return;const de=mt.bind(Lt,Rs);let fe=0;const we=wS(g,p,(ht,Cn={})=>{if(ht==ko.FOCUS_EVENT){const Oe=Date.now();P().revalidateOnFocus&&Oe>fe&&M()&&(fe=Oe+P().focusThrottleInterval,de())}else if(ht==ko.RECONNECT_EVENT)P().revalidateOnReconnect&&M()&&de();else{if(ht==ko.MUTATE_EVENT)return mt();if(ht==ko.ERROR_REVALIDATE_EVENT)return mt(Cn)}});return C.current=!1,T.current=g,k.current=!0,O({_k:m}),ee&&(oe(K)||ii?de():nS(de)),()=>{C.current=!0,we()}},[g]),Ps(()=>{let de;function fe(){const we=hn(u)?u(b().data):u;we&&de!==-1&&(de=setTimeout(Me,we))}function Me(){!b().error&&(d||P().isVisible())&&(c||P().isOnline())?mt(Rs).then(fe):fe()}return fe(),()=>{de&&(clearTimeout(de),de=-1)}},[u,d,c,g]),R.useDebugValue(ke),i&&oe(K)&&g){if(!gp&&ii)throw new Error("Fallback data is required when using suspense in SSR.");S.current=t,E.current=n,C.current=!1;const de=v[g];if(!oe(de)){const fe=kr(de);wp(fe)}if(oe(x)){const fe=mt(Rs);oe(ke)||(fe.status="fulfilled",fe.value=!0),wp(fe)}else throw x}return{mutate:kr,get data(){return W.data=!0,ke},get error(){return W.error=!0,x},get isValidating(){return W.isValidating=!0,it},get isLoading(){return W.isLoading=!0,_t}}},Ji=kS(bS);let vS=(e,t=21)=>(n=t)=>{let r="",o=n;for(;o--;)r+=e[Math.random()*e.length|0];return r};var li={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},ai={code:"1",name:"function_call",parse:e=>{if(e==null||typeof e!="object"||!("function_call"in e)||typeof e.function_call!="object"||e.function_call==null||!("name"in e.function_call)||!("arguments"in e.function_call)||typeof e.function_call.name!="string"||typeof e.function_call.arguments!="string")throw new Error('"function_call" parts expect an object with a "function_call" property.');return{type:"function_call",value:e}}},si={code:"2",name:"data",parse:e=>{if(!Array.isArray(e))throw new Error('"data" parts expect an array value.');return{type:"data",value:e}}},ui={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},ci={code:"4",name:"assistant_message",parse:e=>{if(e==null||typeof e!="object"||!("id"in e)||!("role"in e)||!("content"in e)||typeof e.id!="string"||typeof e.role!="string"||e.role!=="assistant"||!Array.isArray(e.content)||!e.content.every(t=>t!=null&&typeof t=="object"&&"type"in t&&t.type==="text"&&"text"in t&&t.text!=null&&typeof t.text=="object"&&"value"in t.text&&typeof t.text.value=="string"))throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');return{type:"assistant_message",value:e}}},di={code:"5",name:"assistant_control_data",parse:e=>{if(e==null||typeof e!="object"||!("threadId"in e)||!("messageId"in e)||typeof e.threadId!="string"||typeof e.messageId!="string")throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');return{type:"assistant_control_data",value:{threadId:e.threadId,messageId:e.messageId}}}},fi={code:"6",name:"data_message",parse:e=>{if(e==null||typeof e!="object"||!("role"in e)||!("data"in e)||typeof e.role!="string"||e.role!=="data")throw new Error('"data_message" parts expect an object with a "role" and "data" property.');return{type:"data_message",value:e}}},pi={code:"7",name:"tool_calls",parse:e=>{if(e==null||typeof e!="object"||!("tool_calls"in e)||typeof e.tool_calls!="object"||e.tool_calls==null||!Array.isArray(e.tool_calls)||e.tool_calls.some(t=>{t==null||typeof t!="object"||!("id"in t)||typeof t.id!="string"||!("type"in t)||typeof t.type!="string"||!("function"in t)||t.function==null||typeof t.function!="object"||!("arguments"in t.function)||typeof t.function.name!="string"||t.function.arguments}))throw new Error('"tool_calls" parts expect an object with a ToolCallPayload.');return{type:"tool_calls",value:e}}},mi={code:"8",name:"message_annotations",parse:e=>{if(!Array.isArray(e))throw new Error('"message_annotations" parts expect an array value.');return{type:"message_annotations",value:e}}},xS=[li,ai,si,ui,ci,di,fi,pi,mi],SS={[li.code]:li,[ai.code]:ai,[si.code]:si,[ui.code]:ui,[ci.code]:ci,[di.code]:di,[fi.code]:fi,[pi.code]:pi,[mi.code]:mi};li.name+"",li.code,ai.name+"",ai.code,si.name+"",si.code,ui.name+"",ui.code,ci.name+"",ci.code,di.name+"",di.code,fi.name+"",fi.code,pi.name+"",pi.code,mi.name+"",mi.code;var CS=xS.map(e=>e.code),Cy=e=>{const t=e.indexOf(":");if(t===-1)throw new Error("Failed to parse stream string. No separator found.");const n=e.slice(0,t);if(!CS.includes(n))throw new Error(`Failed to parse stream string. Invalid code ${n}.`);const r=n,o=e.slice(t+1),i=JSON.parse(o);return SS[r].parse(i)},ES=10;function TS(e,t){const n=new Uint8Array(t);let r=0;for(const o of e)n.set(o,r),r+=o.length;return e.length=0,n}async function*PS(e,{isAborted:t}={}){const n=new TextDecoder,r=[];let o=0;for(;;){const{value:i}=await e.read();if(i&&(r.push(i),o+=i.length,i[i.length-1]!==ES))continue;if(r.length===0)break;const l=TS(r,o);o=0;const a=n.decode(l,{stream:!0}).split(`
`).filter(s=>s!=="").map(Cy);for(const s of a)yield s;if(t!=null&&t()){e.cancel();break}}}var Ey=vS("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",7);function _S(e){const t=new TextDecoder;return e?function(n){return t.decode(n,{stream:!0}).split(`
`).filter(o=>o!=="").map(Cy).filter(Boolean)}:function(n){return n?t.decode(n,{stream:!0}):""}}var RS="X-Experimental-Stream-Data";function Zi(e,t){return!e||!t||!t.length?e:{...e,annotations:[...t]}}async function IS({reader:e,abortControllerRef:t,update:n,onFinish:r,generateId:o=Ey,getCurrentDate:i=()=>new Date}){const l=i(),a={data:[]};let s;for await(const{type:u,value:d}of PS(e,{isAborted:()=>(t==null?void 0:t.current)===null})){u==="text"&&(a.text?a.text={...a.text,content:(a.text.content||"")+d}:a.text={id:o(),role:"assistant",content:d,createdAt:l});let c=null;u==="function_call"&&(a.function_call={id:o(),role:"assistant",content:"",function_call:d.function_call,name:d.function_call.name,createdAt:l},c=a.function_call);let f=null;u==="tool_calls"&&(a.tool_calls={id:o(),role:"assistant",content:"",tool_calls:d.tool_calls,createdAt:l},f=a.tool_calls),u==="data"&&a.data.push(...d);let p=a.text;u==="message_annotations"&&(s?s.push(...d):s=[...d],c=Zi(a.function_call,s),f=Zi(a.tool_calls,s),p=Zi(a.text,s)),s!=null&&s.length&&["text","function_call","tool_calls"].forEach(v=>{a[v]&&(a[v].annotations=[...s])});const h=[c,f,p].filter(Boolean).map(y=>({...Zi(y,s)}));n(h,[...a.data])}return r==null||r(a),{messages:[a.text,a.function_call,a.tool_calls].filter(Boolean),data:a.data}}async function OS({api:e,messages:t,body:n,credentials:r,headers:o,abortController:i,appendMessage:l,restoreMessagesOnFailure:a,onResponse:s,onUpdate:u,onFinish:d,generateId:c}){var f;const p=await fetch(e,{method:"POST",body:JSON.stringify({messages:t,...n}),headers:{"Content-Type":"application/json",...o},signal:(f=i==null?void 0:i())==null?void 0:f.signal,credentials:r}).catch(v=>{throw a(),v});if(s)try{await s(p)}catch(v){throw v}if(!p.ok)throw a(),new Error(await p.text()||"Failed to fetch the chat response.");if(!p.body)throw new Error("The response body is empty.");const h=p.body.getReader();if(p.headers.get(RS)==="true")return await IS({reader:h,abortControllerRef:i!=null?{current:i()}:void 0,update:u,onFinish(v){d&&v.text!=null&&d(v.text)},generateId:c});{const v=new Date,g=_S(!1);let m="",C={id:c(),createdAt:v,content:"",role:"assistant"};for(;;){const{done:T,value:S}=await h.read();if(T)break;if(m+=g(S),m.startsWith('{"function_call":')?C.function_call=m:m.startsWith('{"tool_calls":')?C.tool_calls=m:C.content=m,l({...C}),(i==null?void 0:i())===null){h.cancel();break}}if(m.startsWith('{"function_call":')){const T=JSON.parse(m).function_call;C.function_call=T,l({...C})}if(m.startsWith('{"tool_calls":')){const T=JSON.parse(m).tool_calls;C.tool_calls=T,l({...C})}return d&&d(C),C}}async function AS({getStreamedResponse:e,experimental_onFunctionCall:t,experimental_onToolCall:n,updateChatRequest:r,getCurrentMessages:o}){for(;;){const i=await e();if("messages"in i){let l=!1;for(const a of i.messages)if(!((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))){if(l=!0,t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0){l=!1;break}r(u)}if(n){const s=a.tool_calls;if(!Array.isArray(s)||s.some(d=>typeof d!="object")){console.warn("experimental_onToolCall should not be defined when using tools");continue}const u=await n(o(),s);if(u===void 0){l=!1;break}r(u)}}if(!l)break}else{let l=function(s){for(const u of s.messages){if(u.tool_calls!==void 0)for(const d of u.tool_calls)typeof d=="object"&&d.function.arguments&&typeof d.function.arguments!="string"&&(d.function.arguments=JSON.stringify(d.function.arguments));u.function_call!==void 0&&typeof u.function_call=="object"&&u.function_call.arguments&&typeof u.function_call.arguments!="string"&&(u.function_call.arguments=JSON.stringify(u.function_call.arguments))}};const a=i;if((a.function_call===void 0||typeof a.function_call=="string")&&(a.tool_calls===void 0||typeof a.tool_calls=="string"))break;if(t){const s=a.function_call;if(typeof s!="object"){console.warn("experimental_onFunctionCall should not be defined when using tools");continue}const u=await t(o(),s);if(u===void 0)break;l(u),r(u)}if(n){const s=a.tool_calls;if(typeof s!="object"){console.warn("experimental_onToolCall should not be defined when using functions");continue}const u=await n(o(),s);if(u===void 0)break;l(u),r(u)}}}}var LS=async(e,t,n,r,o,i,l,a,s,u,d,c)=>{var f,p;const h=l.current;n(t.messages,!1);const y=c?t.messages:t.messages.map(({role:v,content:g,name:m,function_call:k,tool_calls:C,tool_call_id:T})=>({role:v,content:g,tool_call_id:T,...m!==void 0&&{name:m},...k!==void 0&&{function_call:k},...C!==void 0&&{tool_calls:C}}));if(typeof e!="string"){let m={id:s(),createdAt:new Date,content:"",role:"assistant"};async function k(C){const{content:T,ui:S,next:E}=await C;m.content=T,m.ui=await S,n([...t.messages,{...m}],!1),E&&await k(E)}try{const C=e({messages:y,data:t.data});await k(C)}catch(C){throw n(h,!1),C}return u&&u(m),m}return await OS({api:e,messages:y,body:{data:t.data,...i.current.body,...(f=t.options)==null?void 0:f.body,...t.functions!==void 0&&{functions:t.functions},...t.function_call!==void 0&&{function_call:t.function_call},...t.tools!==void 0&&{tools:t.tools},...t.tool_choice!==void 0&&{tool_choice:t.tool_choice}},credentials:i.current.credentials,headers:{...i.current.headers,...(p=t.options)==null?void 0:p.headers},abortController:()=>a.current,appendMessage(v){n([...t.messages,v],!1)},restoreMessagesOnFailure(){n(h,!1)},onResponse:d,onUpdate(v,g){n([...t.messages,...v],!1),r([...o||[],...g||[]],!1)},onFinish:u,generateId:s})};function zS({api:e="/api/chat",id:t,initialMessages:n,initialInput:r="",sendExtraMessageFields:o,experimental_onFunctionCall:i,experimental_onToolCall:l,onResponse:a,onFinish:s,onError:u,credentials:d,headers:c,body:f,generateId:p=Ey}={}){const h=R.useId(),y=t??h,v=typeof e=="string"?[e,y]:y,[g]=R.useState([]),{data:m,mutate:k}=Ji([v,"messages"],null,{fallbackData:n??g}),{data:C=!1,mutate:T}=Ji([v,"loading"],null),{data:S,mutate:E}=Ji([v,"streamData"],null),{data:P=void 0,mutate:M}=Ji([v,"error"],null),b=R.useRef(m||[]);R.useEffect(()=>{b.current=m||[]},[m]);const O=R.useRef(null),L=R.useRef({credentials:d,headers:c,body:f});R.useEffect(()=>{L.current={credentials:d,headers:c,body:f}},[d,c,f]);const B=R.useCallback(async K=>{try{T(!0),M(void 0);const x=new AbortController;O.current=x,await AS({getStreamedResponse:()=>LS(e,K,k,E,S,L,b,O,p,s,a,o),experimental_onFunctionCall:i,experimental_onToolCall:l,updateChatRequest:ne=>{K=ne},getCurrentMessages:()=>b.current}),O.current=null}catch(x){if(x.name==="AbortError")return O.current=null,null;u&&x instanceof Error&&u(x),M(x)}finally{T(!1)}},[k,T,e,L,a,s,u,M,E,S,o,i,l,b,O,p]),W=R.useCallback(async(K,{options:x,functions:ne,function_call:ke,tools:ee,tool_choice:Ue,data:it}={})=>{K.id||(K.id=p());const _t={messages:b.current.concat(K),options:x,data:it,...ne!==void 0&&{functions:ne},...ke!==void 0&&{function_call:ke},...ee!==void 0&&{tools:ee},...Ue!==void 0&&{tool_choice:Ue}};return B(_t)},[B,p]),F=R.useCallback(async({options:K,functions:x,function_call:ne,tools:ke,tool_choice:ee}={})=>{if(b.current.length===0)return null;if(b.current[b.current.length-1].role==="assistant"){const _t={messages:b.current.slice(0,-1),options:K,...x!==void 0&&{functions:x},...ne!==void 0&&{function_call:ne},...ke!==void 0&&{tools:ke},...ee!==void 0&&{tool_choice:ee}};return B(_t)}const it={messages:b.current,options:K,...x!==void 0&&{functions:x},...ne!==void 0&&{function_call:ne},...ke!==void 0&&{tools:ke},...ee!==void 0&&{tool_choice:ee}};return B(it)},[B]),A=R.useCallback(()=>{O.current&&(O.current.abort(),O.current=null)},[]),$=R.useCallback(K=>{k(K,!1),b.current=K},[k]),[I,H]=R.useState(r),w=R.useCallback((K,x={},ne)=>{ne&&(L.current={...L.current,...ne}),K.preventDefault(),I&&(W({content:I,role:"user",createdAt:new Date},x),H(""))},[I,W]);return{messages:m||[],error:P,append:W,reload:F,stop:A,setMessages:$,input:I,setInput:H,handleInputChange:K=>{H(K.target.value)},handleSubmit:w,isLoading:C,data:S}}function MS(e,t){const n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const DS=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,FS=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,NS={};function bp(e,t){return((t||NS).jsx?FS:DS).test(e)}const jS=/[ \t\n\f\r]/g;function $S(e){return typeof e=="object"?e.type==="text"?vp(e.value):!1:vp(e)}function vp(e){return e.replace(jS,"")===""}class Ti{constructor(t,n,r){this.property=t,this.normal=n,r&&(this.space=r)}}Ti.prototype.property={};Ti.prototype.normal={};Ti.prototype.space=null;function Ty(e,t){const n={},r={};let o=-1;for(;++o<e.length;)Object.assign(n,e[o].property),Object.assign(r,e[o].normal);return new Ti(n,r,t)}function Zu(e){return e.toLowerCase()}class jt{constructor(t,n){this.property=t,this.attribute=n}}jt.prototype.space=null;jt.prototype.boolean=!1;jt.prototype.booleanish=!1;jt.prototype.overloadedBoolean=!1;jt.prototype.number=!1;jt.prototype.commaSeparated=!1;jt.prototype.spaceSeparated=!1;jt.prototype.commaOrSpaceSeparated=!1;jt.prototype.mustUseProperty=!1;jt.prototype.defined=!1;let BS=0;const Y=gr(),Ae=gr(),Py=gr(),D=gr(),me=gr(),Hr=gr(),yt=gr();function gr(){return 2**++BS}const ec=Object.freeze(Object.defineProperty({__proto__:null,boolean:Y,booleanish:Ae,commaOrSpaceSeparated:yt,commaSeparated:Hr,number:D,overloadedBoolean:Py,spaceSeparated:me},Symbol.toStringTag,{value:"Module"})),Is=Object.keys(ec);class wd extends jt{constructor(t,n,r,o){let i=-1;if(super(t,n),xp(this,"space",o),typeof r=="number")for(;++i<Is.length;){const l=Is[i];xp(this,Is[i],(r&ec[l])===ec[l])}}}wd.prototype.defined=!0;function xp(e,t,n){n&&(e[t]=n)}const US={}.hasOwnProperty;function oo(e){const t={},n={};let r;for(r in e.properties)if(US.call(e.properties,r)){const o=e.properties[r],i=new wd(r,e.transform(e.attributes||{},r),o,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(i.mustUseProperty=!0),t[r]=i,n[Zu(r)]=r,n[Zu(i.attribute)]=r}return new Ti(t,n,e.space)}const _y=oo({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),Ry=oo({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function Iy(e,t){return t in e?e[t]:t}function Oy(e,t){return Iy(e,t.toLowerCase())}const Ay=oo({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:Oy,properties:{xmlns:null,xmlnsXLink:null}}),Ly=oo({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:Ae,ariaAutoComplete:null,ariaBusy:Ae,ariaChecked:Ae,ariaColCount:D,ariaColIndex:D,ariaColSpan:D,ariaControls:me,ariaCurrent:null,ariaDescribedBy:me,ariaDetails:null,ariaDisabled:Ae,ariaDropEffect:me,ariaErrorMessage:null,ariaExpanded:Ae,ariaFlowTo:me,ariaGrabbed:Ae,ariaHasPopup:null,ariaHidden:Ae,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:me,ariaLevel:D,ariaLive:null,ariaModal:Ae,ariaMultiLine:Ae,ariaMultiSelectable:Ae,ariaOrientation:null,ariaOwns:me,ariaPlaceholder:null,ariaPosInSet:D,ariaPressed:Ae,ariaReadOnly:Ae,ariaRelevant:null,ariaRequired:Ae,ariaRoleDescription:me,ariaRowCount:D,ariaRowIndex:D,ariaRowSpan:D,ariaSelected:Ae,ariaSetSize:D,ariaSort:null,ariaValueMax:D,ariaValueMin:D,ariaValueNow:D,ariaValueText:null,role:null}}),HS=oo({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:Oy,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Hr,acceptCharset:me,accessKey:me,action:null,allow:null,allowFullScreen:Y,allowPaymentRequest:Y,allowUserMedia:Y,alt:null,as:null,async:Y,autoCapitalize:null,autoComplete:me,autoFocus:Y,autoPlay:Y,blocking:me,capture:null,charSet:null,checked:Y,cite:null,className:me,cols:D,colSpan:null,content:null,contentEditable:Ae,controls:Y,controlsList:me,coords:D|Hr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Y,defer:Y,dir:null,dirName:null,disabled:Y,download:Py,draggable:Ae,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Y,formTarget:null,headers:me,height:D,hidden:Y,high:D,href:null,hrefLang:null,htmlFor:me,httpEquiv:me,id:null,imageSizes:null,imageSrcSet:null,inert:Y,inputMode:null,integrity:null,is:null,isMap:Y,itemId:null,itemProp:me,itemRef:me,itemScope:Y,itemType:me,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Y,low:D,manifest:null,max:null,maxLength:D,media:null,method:null,min:null,minLength:D,multiple:Y,muted:Y,name:null,nonce:null,noModule:Y,noValidate:Y,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Y,optimum:D,pattern:null,ping:me,placeholder:null,playsInline:Y,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Y,referrerPolicy:null,rel:me,required:Y,reversed:Y,rows:D,rowSpan:D,sandbox:me,scope:null,scoped:Y,seamless:Y,selected:Y,shadowRootDelegatesFocus:Y,shadowRootMode:null,shape:null,size:D,sizes:null,slot:null,span:D,spellCheck:Ae,src:null,srcDoc:null,srcLang:null,srcSet:null,start:D,step:null,style:null,tabIndex:D,target:null,title:null,translate:null,type:null,typeMustMatch:Y,useMap:null,value:Ae,width:D,wrap:null,align:null,aLink:null,archive:me,axis:null,background:null,bgColor:null,border:D,borderColor:null,bottomMargin:D,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Y,declare:Y,event:null,face:null,frame:null,frameBorder:null,hSpace:D,leftMargin:D,link:null,longDesc:null,lowSrc:null,marginHeight:D,marginWidth:D,noResize:Y,noHref:Y,noShade:Y,noWrap:Y,object:null,profile:null,prompt:null,rev:null,rightMargin:D,rules:null,scheme:null,scrolling:Ae,standby:null,summary:null,text:null,topMargin:D,valueType:null,version:null,vAlign:null,vLink:null,vSpace:D,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Y,disableRemotePlayback:Y,prefix:null,property:null,results:D,security:null,unselectable:null}}),VS=oo({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:Iy,properties:{about:yt,accentHeight:D,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:D,amplitude:D,arabicForm:null,ascent:D,attributeName:null,attributeType:null,azimuth:D,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:D,by:null,calcMode:null,capHeight:D,className:me,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:D,diffuseConstant:D,direction:null,display:null,dur:null,divisor:D,dominantBaseline:null,download:Y,dx:null,dy:null,edgeMode:null,editable:null,elevation:D,enableBackground:null,end:null,event:null,exponent:D,externalResourcesRequired:null,fill:null,fillOpacity:D,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Hr,g2:Hr,glyphName:Hr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:D,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:D,horizOriginX:D,horizOriginY:D,id:null,ideographic:D,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:D,k:D,k1:D,k2:D,k3:D,k4:D,kernelMatrix:yt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:D,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:D,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:D,overlineThickness:D,paintOrder:null,panose1:null,path:null,pathLength:D,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:me,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:D,pointsAtY:D,pointsAtZ:D,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:yt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:yt,rev:yt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:yt,requiredFeatures:yt,requiredFonts:yt,requiredFormats:yt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:D,specularExponent:D,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:D,strikethroughThickness:D,string:null,stroke:null,strokeDashArray:yt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:D,strokeOpacity:D,strokeWidth:null,style:null,surfaceScale:D,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:yt,tabIndex:D,tableValues:null,target:null,targetX:D,targetY:D,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:yt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:D,underlineThickness:D,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:D,values:null,vAlphabetic:D,vMathematical:D,vectorEffect:null,vHanging:D,vIdeographic:D,version:null,vertAdvY:D,vertOriginX:D,vertOriginY:D,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:D,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),WS=/^data[-\w.:]+$/i,Sp=/-[a-z]/g,KS=/[A-Z]/g;function QS(e,t){const n=Zu(t);let r=t,o=jt;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&WS.test(t)){if(t.charAt(4)==="-"){const i=t.slice(5).replace(Sp,GS);r="data"+i.charAt(0).toUpperCase()+i.slice(1)}else{const i=t.slice(4);if(!Sp.test(i)){let l=i.replace(KS,qS);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}o=wd}return new o(r,t)}function qS(e){return"-"+e.toLowerCase()}function GS(e){return e.charAt(1).toUpperCase()}const YS={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},XS=Ty([Ry,_y,Ay,Ly,HS],"html"),bd=Ty([Ry,_y,Ay,Ly,VS],"svg");function JS(e){return e.join(" ").trim()}var zy={},Cp=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,ZS=/\n/g,e2=/^\s*/,t2=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,n2=/^:\s*/,r2=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,o2=/^[;\s]*/,i2=/^\s+|\s+$/g,l2=`
`,Ep="/",Tp="*",tr="",a2="comment",s2="declaration",u2=function(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function o(h){var y=h.match(ZS);y&&(n+=y.length);var v=h.lastIndexOf(l2);r=~v?h.length-v:r+h.length}function i(){var h={line:n,column:r};return function(y){return y.position=new l(h),u(),y}}function l(h){this.start=h,this.end={line:n,column:r},this.source=t.source}l.prototype.content=e;function a(h){var y=new Error(t.source+":"+n+":"+r+": "+h);if(y.reason=h,y.filename=t.source,y.line=n,y.column=r,y.source=e,!t.silent)throw y}function s(h){var y=h.exec(e);if(y){var v=y[0];return o(v),e=e.slice(v.length),y}}function u(){s(e2)}function d(h){var y;for(h=h||[];y=c();)y!==!1&&h.push(y);return h}function c(){var h=i();if(!(Ep!=e.charAt(0)||Tp!=e.charAt(1))){for(var y=2;tr!=e.charAt(y)&&(Tp!=e.charAt(y)||Ep!=e.charAt(y+1));)++y;if(y+=2,tr===e.charAt(y-1))return a("End of comment missing");var v=e.slice(2,y-2);return r+=2,o(v),e=e.slice(y),r+=2,h({type:a2,comment:v})}}function f(){var h=i(),y=s(t2);if(y){if(c(),!s(n2))return a("property missing ':'");var v=s(r2),g=h({type:s2,property:Pp(y[0].replace(Cp,tr)),value:v?Pp(v[0].replace(Cp,tr)):tr});return s(o2),g}}function p(){var h=[];d(h);for(var y;y=f();)y!==!1&&(h.push(y),d(h));return h}return u(),p()};function Pp(e){return e?e.replace(i2,tr):tr}var c2=Fd&&Fd.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(zy,"__esModule",{value:!0});var d2=c2(u2);function f2(e,t){var n=null;if(!e||typeof e!="string")return n;var r=(0,d2.default)(e),o=typeof t=="function";return r.forEach(function(i){if(i.type==="declaration"){var l=i.property,a=i.value;o?t(l,a,i):a&&(n=n||{},n[l]=a)}}),n}var _p=zy.default=f2;const p2=_p.default||_p,My=Dy("end"),vd=Dy("start");function Dy(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function m2(e){const t=vd(e),n=My(e);if(t&&n)return{start:t,end:n}}function Do(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Rp(e.position):"start"in e||"end"in e?Rp(e):"line"in e||"column"in e?tc(e):""}function tc(e){return Ip(e&&e.line)+":"+Ip(e&&e.column)}function Rp(e){return tc(e&&e.start)+"-"+tc(e&&e.end)}function Ip(e){return e&&typeof e=="number"?e:1}class Ze extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let o="",i={},l=!1;if(n&&("line"in n&&"column"in n?i={place:n}:"start"in n&&"end"in n?i={place:n}:"type"in n?i={ancestors:[n],place:n.position}:i={...n}),typeof t=="string"?o=t:!i.cause&&t&&(l=!0,o=t.message,i.cause=t),!i.ruleId&&!i.source&&typeof r=="string"){const s=r.indexOf(":");s===-1?i.ruleId=r:(i.source=r.slice(0,s),i.ruleId=r.slice(s+1))}if(!i.place&&i.ancestors&&i.ancestors){const s=i.ancestors[i.ancestors.length-1];s&&(i.place=s.position)}const a=i.place&&"start"in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file,this.message=o,this.line=a?a.line:void 0,this.name=Do(i.place)||"1:1",this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=l&&i.cause&&typeof i.cause.stack=="string"?i.cause.stack:"",this.actual,this.expected,this.note,this.url}}Ze.prototype.file="";Ze.prototype.name="";Ze.prototype.reason="";Ze.prototype.message="";Ze.prototype.stack="";Ze.prototype.column=void 0;Ze.prototype.line=void 0;Ze.prototype.ancestors=void 0;Ze.prototype.cause=void 0;Ze.prototype.fatal=void 0;Ze.prototype.place=void 0;Ze.prototype.ruleId=void 0;Ze.prototype.source=void 0;const xd={}.hasOwnProperty,h2=new Map,g2=/[A-Z]/g,y2=/-([a-z])/g,k2=new Set(["table","tbody","thead","tfoot","tr"]),w2=new Set(["td","th"]),Fy="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function b2(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=_2(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=P2(n,t.jsx,t.jsxs)}const o={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?bd:XS,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},i=Ny(o,e,void 0);return i&&typeof i!="string"?i:o.create(e,o.Fragment,{children:i||void 0},void 0)}function Ny(e,t,n){if(t.type==="element")return v2(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return x2(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return C2(e,t,n);if(t.type==="mdxjsEsm")return S2(e,t);if(t.type==="root")return E2(e,t,n);if(t.type==="text")return T2(e,t)}function v2(e,t,n){const r=e.schema;let o=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(o=bd,e.schema=o),e.ancestors.push(t);const i=$y(e,t.tagName,!1),l=R2(e,t);let a=Cd(e,t);return k2.has(t.tagName)&&(a=a.filter(function(s){return typeof s=="string"?!$S(s):!0})),jy(e,l,i,t),Sd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function x2(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}hi(e,t.position)}function S2(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);hi(e,t.position)}function C2(e,t,n){const r=e.schema;let o=r;t.name==="svg"&&r.space==="html"&&(o=bd,e.schema=o),e.ancestors.push(t);const i=t.name===null?e.Fragment:$y(e,t.name,!0),l=I2(e,t),a=Cd(e,t);return jy(e,l,i,t),Sd(l,a),e.ancestors.pop(),e.schema=r,e.create(t,i,l,n)}function E2(e,t,n){const r={};return Sd(r,Cd(e,t)),e.create(t,e.Fragment,r,n)}function T2(e,t){return t.value}function jy(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Sd(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function P2(e,t,n){return r;function r(o,i,l,a){const u=Array.isArray(l.children)?n:t;return a?u(i,l,a):u(i,l)}}function _2(e,t){return n;function n(r,o,i,l){const a=Array.isArray(i.children),s=vd(r);return t(o,i,l,a,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function R2(e,t){const n={};let r,o;for(o in t.properties)if(o!=="children"&&xd.call(t.properties,o)){const i=O2(e,o,t.properties[o]);if(i){const[l,a]=i;e.tableCellAlignToStyle&&l==="align"&&typeof a=="string"&&w2.has(t.tagName)?r=a:n[l]=a}}if(r){const i=n.style||(n.style={});i[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function I2(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const i=r.data.estree.body[0];i.type;const l=i.expression;l.type;const a=l.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else hi(e,t.position);else{const o=r.name;let i;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const a=r.value.data.estree.body[0];a.type,i=e.evaluater.evaluateExpression(a.expression)}else hi(e,t.position);else i=r.value===null?!0:r.value;n[o]=i}return n}function Cd(e,t){const n=[];let r=-1;const o=e.passKeys?new Map:h2;for(;++r<t.children.length;){const i=t.children[r];let l;if(e.passKeys){const s=i.type==="element"?i.tagName:i.type==="mdxJsxFlowElement"||i.type==="mdxJsxTextElement"?i.name:void 0;if(s){const u=o.get(s)||0;l=s+"-"+u,o.set(s,u+1)}}const a=Ny(e,i,l);a!==void 0&&n.push(a)}return n}function O2(e,t,n){const r=QS(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?MS(n):JS(n)),r.property==="style"){let o=typeof n=="object"?n:A2(e,String(n));return e.stylePropertyNameCase==="css"&&(o=L2(o)),["style",o]}return[e.elementAttributeNameCase==="react"&&r.space?YS[r.property]||r.property:r.attribute,n]}}function A2(e,t){const n={};try{p2(t,r)}catch(o){if(!e.ignoreInvalidStyle){const i=o,l=new Ze("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:i,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw l.file=e.filePath||void 0,l.url=Fy+"#cannot-parse-style-attribute",l}}return n;function r(o,i){let l=o;l.slice(0,2)!=="--"&&(l.slice(0,4)==="-ms-"&&(l="ms-"+l.slice(4)),l=l.replace(y2,M2)),n[l]=i}}function $y(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const o=t.split(".");let i=-1,l;for(;++i<o.length;){const a=bp(o[i])?{type:"Identifier",name:o[i]}:{type:"Literal",value:o[i]};l=l?{type:"MemberExpression",object:l,property:a,computed:!!(i&&a.type==="Literal"),optional:!1}:a}r=l}else r=bp(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const o=r.value;return xd.call(e.components,o)?e.components[o]:o}if(e.evaluater)return e.evaluater.evaluateExpression(r);hi(e)}function hi(e,t){const n=new Ze("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Fy+"#cannot-handle-mdx-estrees-without-createevaluater",n}function L2(e){const t={};let n;for(n in e)xd.call(e,n)&&(t[z2(n)]=e[n]);return t}function z2(e){let t=e.replace(g2,D2);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function M2(e,t){return t.toUpperCase()}function D2(e){return"-"+e.toLowerCase()}const Os={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},F2={};function Ed(e,t){const n=t||F2,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,o=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return By(e,r,o)}function By(e,t,n){if(N2(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Op(e.children,t,n)}return Array.isArray(e)?Op(e,t,n):""}function Op(e,t,n){const r=[];let o=-1;for(;++o<e.length;)r[o]=By(e[o],t,n);return r.join("")}function N2(e){return!!(e&&typeof e=="object")}const Ap=document.createElement("i");function Td(e){const t="&"+e+";";Ap.innerHTML=t;const n=Ap.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function St(e,t,n,r){const o=e.length;let i=0,l;if(t<0?t=-t>o?0:o+t:t=t>o?o:t,n=n>0?n:0,r.length<1e4)l=Array.from(r),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);i<r.length;)l=r.slice(i,i+1e4),l.unshift(t,0),e.splice(...l),i+=1e4,t+=1e4}function At(e,t){return e.length>0?(St(e,e.length,0,t),e):t}const Lp={}.hasOwnProperty;function Uy(e){const t={};let n=-1;for(;++n<e.length;)j2(t,e[n]);return t}function j2(e,t){let n;for(n in t){const o=(Lp.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n];let l;if(i)for(l in i){Lp.call(o,l)||(o[l]=[]);const a=i[l];$2(o[l],Array.isArray(a)?a:a?[a]:[])}}}function $2(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);St(e,0,0,r)}function Hy(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Gt(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const tt=Yn(/[A-Za-z]/),Xe=Yn(/[\dA-Za-z]/),B2=Yn(/[#-'*+\--9=?A-Z^-~]/);function Zl(e){return e!==null&&(e<32||e===127)}const nc=Yn(/\d/),U2=Yn(/[\dA-Fa-f]/),H2=Yn(/[!-/:-@[-`{-~]/);function V(e){return e!==null&&e<-2}function pe(e){return e!==null&&(e<0||e===32)}function Z(e){return e===-2||e===-1||e===32}const Ha=Yn(new RegExp("\\p{P}|\\p{S}","u")),fr=Yn(/\s/);function Yn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function io(e){const t=[];let n=-1,r=0,o=0;for(;++n<e.length;){const i=e.charCodeAt(n);let l="";if(i===37&&Xe(e.charCodeAt(n+1))&&Xe(e.charCodeAt(n+2)))o=2;else if(i<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i))||(l=String.fromCharCode(i));else if(i>55295&&i<57344){const a=e.charCodeAt(n+1);i<56320&&a>56319&&a<57344?(l=String.fromCharCode(i,a),o=1):l="�"}else l=String.fromCharCode(i);l&&(t.push(e.slice(r,n),encodeURIComponent(l)),r=n+o+1,l=""),o&&(n+=o,o=0)}return t.join("")+e.slice(r)}function J(e,t,n,r){const o=r?r-1:Number.POSITIVE_INFINITY;let i=0;return l;function l(s){return Z(s)?(e.enter(n),a(s)):t(s)}function a(s){return Z(s)&&i++<o?(e.consume(s),a):(e.exit(n),t(s))}}const V2={tokenize:W2};function W2(e){const t=e.attempt(this.parser.constructs.contentInitial,r,o);let n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),J(e,t,"linePrefix")}function o(a){return e.enter("paragraph"),i(a)}function i(a){const s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,l(a)}function l(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return V(a)?(e.consume(a),e.exit("chunkText"),i):(e.consume(a),l)}}const K2={tokenize:Q2},zp={tokenize:q2};function Q2(e){const t=this,n=[];let r=0,o,i,l;return a;function a(k){if(r<n.length){const C=n[r];return t.containerState=C[1],e.attempt(C[0].continuation,s,u)(k)}return u(k)}function s(k){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,o&&m();const C=t.events.length;let T=C,S;for(;T--;)if(t.events[T][0]==="exit"&&t.events[T][1].type==="chunkFlow"){S=t.events[T][1].end;break}g(r);let E=C;for(;E<t.events.length;)t.events[E][1].end=Object.assign({},S),E++;return St(t.events,T+1,0,t.events.slice(C)),t.events.length=E,u(k)}return a(k)}function u(k){if(r===n.length){if(!o)return f(k);if(o.currentConstruct&&o.currentConstruct.concrete)return h(k);t.interrupt=!!(o.currentConstruct&&!o._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(zp,d,c)(k)}function d(k){return o&&m(),g(r),f(k)}function c(k){return t.parser.lazy[t.now().line]=r!==n.length,l=t.now().offset,h(k)}function f(k){return t.containerState={},e.attempt(zp,p,h)(k)}function p(k){return r++,n.push([t.currentConstruct,t.containerState]),f(k)}function h(k){if(k===null){o&&m(),g(0),e.consume(k);return}return o=o||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:i,_tokenizer:o}),y(k)}function y(k){if(k===null){v(e.exit("chunkFlow"),!0),g(0),e.consume(k);return}return V(k)?(e.consume(k),v(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(k),y)}function v(k,C){const T=t.sliceStream(k);if(C&&T.push(null),k.previous=i,i&&(i.next=k),i=k,o.defineSkip(k.start),o.write(T),t.parser.lazy[k.start.line]){let S=o.events.length;for(;S--;)if(o.events[S][1].start.offset<l&&(!o.events[S][1].end||o.events[S][1].end.offset>l))return;const E=t.events.length;let P=E,M,b;for(;P--;)if(t.events[P][0]==="exit"&&t.events[P][1].type==="chunkFlow"){if(M){b=t.events[P][1].end;break}M=!0}for(g(r),S=E;S<t.events.length;)t.events[S][1].end=Object.assign({},b),S++;St(t.events,P+1,0,t.events.slice(E)),t.events.length=S}}function g(k){let C=n.length;for(;C-- >k;){const T=n[C];t.containerState=T[1],T[0].exit.call(t,e)}n.length=k}function m(){o.write([null]),i=void 0,o=void 0,t.containerState._closeFlow=void 0}}function q2(e,t,n){return J(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function ea(e){if(e===null||pe(e)||fr(e))return 1;if(Ha(e))return 2}function Va(e,t,n){const r=[];let o=-1;for(;++o<e.length;){const i=e[o].resolveAll;i&&!r.includes(i)&&(t=i(t,n),r.push(i))}return t}const rc={name:"attention",tokenize:Y2,resolveAll:G2};function G2(e,t){let n=-1,r,o,i,l,a,s,u,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const c=Object.assign({},e[r][1].end),f=Object.assign({},e[n][1].start);Mp(c,-s),Mp(f,s),l={type:s>1?"strongSequence":"emphasisSequence",start:c,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:f},i={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o={type:s>1?"strong":"emphasis",start:Object.assign({},l.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},l.start),e[n][1].start=Object.assign({},a.end),u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=At(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=At(u,[["enter",o,t],["enter",l,t],["exit",l,t],["enter",i,t]]),u=At(u,Va(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=At(u,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",o,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,u=At(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,St(e,r-1,n-r+3,u),n=r+u.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Y2(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,o=ea(r);let i;return l;function l(s){return i=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===i)return e.consume(s),a;const u=e.exit("attentionSequence"),d=ea(s),c=!d||d===2&&o||n.includes(s),f=!o||o===2&&d||n.includes(r);return u._open=!!(i===42?c:c&&(o||!f)),u._close=!!(i===42?f:f&&(d||!c)),t(s)}}function Mp(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const X2={name:"autolink",tokenize:J2};function J2(e,t,n){let r=0;return o;function o(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i}function i(p){return tt(p)?(e.consume(p),l):u(p)}function l(p){return p===43||p===45||p===46||Xe(p)?(r=1,a(p)):u(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||Xe(p))&&r++<32?(e.consume(p),a):(r=0,u(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||Zl(p)?n(p):(e.consume(p),s)}function u(p){return p===64?(e.consume(p),d):B2(p)?(e.consume(p),u):n(p)}function d(p){return Xe(p)?c(p):n(p)}function c(p){return p===46?(e.consume(p),r=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):f(p)}function f(p){if((p===45||Xe(p))&&r++<63){const h=p===45?f:c;return e.consume(p),h}return n(p)}}const Pi={tokenize:Z2,partial:!0};function Z2(e,t,n){return r;function r(i){return Z(i)?J(e,o,"linePrefix")(i):o(i)}function o(i){return i===null||V(i)?t(i):n(i)}}const Vy={name:"blockQuote",tokenize:eC,continuation:{tokenize:tC},exit:nC};function eC(e,t,n){const r=this;return o;function o(l){if(l===62){const a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(l),e.exit("blockQuoteMarker"),i}return n(l)}function i(l){return Z(l)?(e.enter("blockQuotePrefixWhitespace"),e.consume(l),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(l))}}function tC(e,t,n){const r=this;return o;function o(l){return Z(l)?J(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):i(l)}function i(l){return e.attempt(Vy,t,n)(l)}}function nC(e){e.exit("blockQuote")}const Wy={name:"characterEscape",tokenize:rC};function rC(e,t,n){return r;function r(i){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(i),e.exit("escapeMarker"),o}function o(i){return H2(i)?(e.enter("characterEscapeValue"),e.consume(i),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(i)}}const Ky={name:"characterReference",tokenize:oC};function oC(e,t,n){const r=this;let o=0,i,l;return a;function a(c){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),s}function s(c){return c===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(c),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),i=31,l=Xe,d(c))}function u(c){return c===88||c===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(c),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),i=6,l=U2,d):(e.enter("characterReferenceValue"),i=7,l=nc,d(c))}function d(c){if(c===59&&o){const f=e.exit("characterReferenceValue");return l===Xe&&!Td(r.sliceSerialize(f))?n(c):(e.enter("characterReferenceMarker"),e.consume(c),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return l(c)&&o++<i?(e.consume(c),d):n(c)}}const Dp={tokenize:lC,partial:!0},Fp={name:"codeFenced",tokenize:iC,concrete:!0};function iC(e,t,n){const r=this,o={tokenize:T,partial:!0};let i=0,l=0,a;return s;function s(S){return u(S)}function u(S){const E=r.events[r.events.length-1];return i=E&&E[1].type==="linePrefix"?E[2].sliceSerialize(E[1],!0).length:0,a=S,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(S)}function d(S){return S===a?(l++,e.consume(S),d):l<3?n(S):(e.exit("codeFencedFenceSequence"),Z(S)?J(e,c,"whitespace")(S):c(S))}function c(S){return S===null||V(S)?(e.exit("codeFencedFence"),r.interrupt?t(S):e.check(Dp,y,C)(S)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),f(S))}function f(S){return S===null||V(S)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(S)):Z(S)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),J(e,p,"whitespace")(S)):S===96&&S===a?n(S):(e.consume(S),f)}function p(S){return S===null||V(S)?c(S):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),h(S))}function h(S){return S===null||V(S)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(S)):S===96&&S===a?n(S):(e.consume(S),h)}function y(S){return e.attempt(o,C,v)(S)}function v(S){return e.enter("lineEnding"),e.consume(S),e.exit("lineEnding"),g}function g(S){return i>0&&Z(S)?J(e,m,"linePrefix",i+1)(S):m(S)}function m(S){return S===null||V(S)?e.check(Dp,y,C)(S):(e.enter("codeFlowValue"),k(S))}function k(S){return S===null||V(S)?(e.exit("codeFlowValue"),m(S)):(e.consume(S),k)}function C(S){return e.exit("codeFenced"),t(S)}function T(S,E,P){let M=0;return b;function b(F){return S.enter("lineEnding"),S.consume(F),S.exit("lineEnding"),O}function O(F){return S.enter("codeFencedFence"),Z(F)?J(S,L,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(F):L(F)}function L(F){return F===a?(S.enter("codeFencedFenceSequence"),B(F)):P(F)}function B(F){return F===a?(M++,S.consume(F),B):M>=l?(S.exit("codeFencedFenceSequence"),Z(F)?J(S,W,"whitespace")(F):W(F)):P(F)}function W(F){return F===null||V(F)?(S.exit("codeFencedFence"),E(F)):P(F)}}}function lC(e,t,n){const r=this;return o;function o(l){return l===null?n(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}const As={name:"codeIndented",tokenize:sC},aC={tokenize:uC,partial:!0};function sC(e,t,n){const r=this;return o;function o(u){return e.enter("codeIndented"),J(e,i,"linePrefix",5)(u)}function i(u){const d=r.events[r.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?l(u):n(u)}function l(u){return u===null?s(u):V(u)?e.attempt(aC,l,s)(u):(e.enter("codeFlowValue"),a(u))}function a(u){return u===null||V(u)?(e.exit("codeFlowValue"),l(u)):(e.consume(u),a)}function s(u){return e.exit("codeIndented"),t(u)}}function uC(e,t,n){const r=this;return o;function o(l){return r.parser.lazy[r.now().line]?n(l):V(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),o):J(e,i,"linePrefix",5)(l)}function i(l){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):V(l)?o(l):n(l)}}const cC={name:"codeText",tokenize:pC,resolve:dC,previous:fC};function dC(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="codeTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function fC(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function pC(e,t,n){let r=0,o,i;return l;function l(c){return e.enter("codeText"),e.enter("codeTextSequence"),a(c)}function a(c){return c===96?(e.consume(c),r++,a):(e.exit("codeTextSequence"),s(c))}function s(c){return c===null?n(c):c===32?(e.enter("space"),e.consume(c),e.exit("space"),s):c===96?(i=e.enter("codeTextSequence"),o=0,d(c)):V(c)?(e.enter("lineEnding"),e.consume(c),e.exit("lineEnding"),s):(e.enter("codeTextData"),u(c))}function u(c){return c===null||c===32||c===96||V(c)?(e.exit("codeTextData"),s(c)):(e.consume(c),u)}function d(c){return c===96?(e.consume(c),o++,d):o===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(c)):(i.type="codeTextData",u(c))}}function Qy(e){const t={};let n=-1,r,o,i,l,a,s,u;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,i=0,i<s.length&&s[i][1].type==="lineEndingBlank"&&(i+=2),i<s.length&&s[i][1].type==="content"))for(;++i<s.length&&s[i][1].type!=="content";)s[i][1].type==="chunkText"&&(s[i][1]._isInFirstContentOfListItem=!0,i++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,mC(e,n)),n=t[n],u=!0);else if(r[1]._container){for(i=n,o=void 0;i--&&(l=e[i],l[1].type==="lineEnding"||l[1].type==="lineEndingBlank");)l[0]==="enter"&&(o&&(e[o][1].type="lineEndingBlank"),l[1].type="lineEnding",o=i);o&&(r[1].end=Object.assign({},e[o][1].start),a=e.slice(o,n),a.unshift(r),St(e,o,n-o+1,a))}}return!u}function mC(e,t){const n=e[t][1],r=e[t][2];let o=t-1;const i=[],l=n._tokenizer||r.parser[n.contentType](n.start),a=l.events,s=[],u={};let d,c,f=-1,p=n,h=0,y=0;const v=[y];for(;p;){for(;e[++o][1]!==p;);i.push(o),p._tokenizer||(d=r.sliceStream(p),p.next||d.push(null),c&&l.defineSkip(p.start),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(d),p._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),c=p,p=p.next}for(p=n;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(y=f+1,v.push(y),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(l.events=[],p?(p._tokenizer=void 0,p.previous=void 0):v.pop(),f=v.length;f--;){const g=a.slice(v[f],v[f+1]),m=i.pop();s.unshift([m,m+g.length-1]),St(e,m,2,g)}for(f=-1;++f<s.length;)u[h+s[f][0]]=h+s[f][1],h+=s[f][1]-s[f][0]-1;return u}const hC={tokenize:kC,resolve:yC},gC={tokenize:wC,partial:!0};function yC(e){return Qy(e),e}function kC(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),o(a)}function o(a){return a===null?i(a):V(a)?e.check(gC,l,i)(a):(e.consume(a),o)}function i(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function l(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,o}}function wC(e,t,n){const r=this;return o;function o(l){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),J(e,i,"linePrefix")}function i(l){if(l===null||V(l))return n(l);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):e.interrupt(r.parser.constructs.flow,n,t)(l)}}function qy(e,t,n,r,o,i,l,a,s){const u=s||Number.POSITIVE_INFINITY;let d=0;return c;function c(g){return g===60?(e.enter(r),e.enter(o),e.enter(i),e.consume(g),e.exit(i),f):g===null||g===32||g===41||Zl(g)?n(g):(e.enter(r),e.enter(l),e.enter(a),e.enter("chunkString",{contentType:"string"}),y(g))}function f(g){return g===62?(e.enter(i),e.consume(g),e.exit(i),e.exit(o),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(g))}function p(g){return g===62?(e.exit("chunkString"),e.exit(a),f(g)):g===null||g===60||V(g)?n(g):(e.consume(g),g===92?h:p)}function h(g){return g===60||g===62||g===92?(e.consume(g),p):p(g)}function y(g){return!d&&(g===null||g===41||pe(g))?(e.exit("chunkString"),e.exit(a),e.exit(l),e.exit(r),t(g)):d<u&&g===40?(e.consume(g),d++,y):g===41?(e.consume(g),d--,y):g===null||g===32||g===40||Zl(g)?n(g):(e.consume(g),g===92?v:y)}function v(g){return g===40||g===41||g===92?(e.consume(g),y):y(g)}}function Gy(e,t,n,r,o,i){const l=this;let a=0,s;return u;function u(p){return e.enter(r),e.enter(o),e.consume(p),e.exit(o),e.enter(i),d}function d(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in l.parser.constructs?n(p):p===93?(e.exit(i),e.enter(o),e.consume(p),e.exit(o),e.exit(r),t):V(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),c(p))}function c(p){return p===null||p===91||p===93||V(p)||a++>999?(e.exit("chunkString"),d(p)):(e.consume(p),s||(s=!Z(p)),p===92?f:c)}function f(p){return p===91||p===92||p===93?(e.consume(p),a++,c):c(p)}}function Yy(e,t,n,r,o,i){let l;return a;function a(f){return f===34||f===39||f===40?(e.enter(r),e.enter(o),e.consume(f),e.exit(o),l=f===40?41:f,s):n(f)}function s(f){return f===l?(e.enter(o),e.consume(f),e.exit(o),e.exit(r),t):(e.enter(i),u(f))}function u(f){return f===l?(e.exit(i),s(l)):f===null?n(f):V(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),J(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===l||f===null||V(f)?(e.exit("chunkString"),u(f)):(e.consume(f),f===92?c:d)}function c(f){return f===l||f===92?(e.consume(f),d):d(f)}}function Fo(e,t){let n;return r;function r(o){return V(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),n=!0,r):Z(o)?J(e,r,n?"linePrefix":"lineSuffix")(o):t(o)}}const bC={name:"definition",tokenize:xC},vC={tokenize:SC,partial:!0};function xC(e,t,n){const r=this;let o;return i;function i(p){return e.enter("definition"),l(p)}function l(p){return Gy.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return o=Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return pe(p)?Fo(e,u)(p):u(p)}function u(p){return qy(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(vC,c,c)(p)}function c(p){return Z(p)?J(e,f,"whitespace")(p):f(p)}function f(p){return p===null||V(p)?(e.exit("definition"),r.parser.defined.push(o),t(p)):n(p)}}function SC(e,t,n){return r;function r(a){return pe(a)?Fo(e,o)(a):n(a)}function o(a){return Yy(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function i(a){return Z(a)?J(e,l,"whitespace")(a):l(a)}function l(a){return a===null||V(a)?t(a):n(a)}}const CC={name:"hardBreakEscape",tokenize:EC};function EC(e,t,n){return r;function r(i){return e.enter("hardBreakEscape"),e.consume(i),o}function o(i){return V(i)?(e.exit("hardBreakEscape"),t(i)):n(i)}}const TC={name:"headingAtx",tokenize:_C,resolve:PC};function PC(e,t){let n=e.length-2,r=3,o,i;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(o={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},i={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},St(e,r,n-r+1,[["enter",o,t],["enter",i,t],["exit",i,t],["exit",o,t]])),e}function _C(e,t,n){let r=0;return o;function o(d){return e.enter("atxHeading"),i(d)}function i(d){return e.enter("atxHeadingSequence"),l(d)}function l(d){return d===35&&r++<6?(e.consume(d),l):d===null||pe(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),s(d)):d===null||V(d)?(e.exit("atxHeading"),t(d)):Z(d)?J(e,a,"whitespace")(d):(e.enter("atxHeadingText"),u(d))}function s(d){return d===35?(e.consume(d),s):(e.exit("atxHeadingSequence"),a(d))}function u(d){return d===null||d===35||pe(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),u)}}const RC=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Np=["pre","script","style","textarea"],IC={name:"htmlFlow",tokenize:zC,resolveTo:LC,concrete:!0},OC={tokenize:DC,partial:!0},AC={tokenize:MC,partial:!0};function LC(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function zC(e,t,n){const r=this;let o,i,l,a,s;return u;function u(x){return d(x)}function d(x){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(x),c}function c(x){return x===33?(e.consume(x),f):x===47?(e.consume(x),i=!0,y):x===63?(e.consume(x),o=3,r.interrupt?t:w):tt(x)?(e.consume(x),l=String.fromCharCode(x),v):n(x)}function f(x){return x===45?(e.consume(x),o=2,p):x===91?(e.consume(x),o=5,a=0,h):tt(x)?(e.consume(x),o=4,r.interrupt?t:w):n(x)}function p(x){return x===45?(e.consume(x),r.interrupt?t:w):n(x)}function h(x){const ne="CDATA[";return x===ne.charCodeAt(a++)?(e.consume(x),a===ne.length?r.interrupt?t:L:h):n(x)}function y(x){return tt(x)?(e.consume(x),l=String.fromCharCode(x),v):n(x)}function v(x){if(x===null||x===47||x===62||pe(x)){const ne=x===47,ke=l.toLowerCase();return!ne&&!i&&Np.includes(ke)?(o=1,r.interrupt?t(x):L(x)):RC.includes(l.toLowerCase())?(o=6,ne?(e.consume(x),g):r.interrupt?t(x):L(x)):(o=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(x):i?m(x):k(x))}return x===45||Xe(x)?(e.consume(x),l+=String.fromCharCode(x),v):n(x)}function g(x){return x===62?(e.consume(x),r.interrupt?t:L):n(x)}function m(x){return Z(x)?(e.consume(x),m):b(x)}function k(x){return x===47?(e.consume(x),b):x===58||x===95||tt(x)?(e.consume(x),C):Z(x)?(e.consume(x),k):b(x)}function C(x){return x===45||x===46||x===58||x===95||Xe(x)?(e.consume(x),C):T(x)}function T(x){return x===61?(e.consume(x),S):Z(x)?(e.consume(x),T):k(x)}function S(x){return x===null||x===60||x===61||x===62||x===96?n(x):x===34||x===39?(e.consume(x),s=x,E):Z(x)?(e.consume(x),S):P(x)}function E(x){return x===s?(e.consume(x),s=null,M):x===null||V(x)?n(x):(e.consume(x),E)}function P(x){return x===null||x===34||x===39||x===47||x===60||x===61||x===62||x===96||pe(x)?T(x):(e.consume(x),P)}function M(x){return x===47||x===62||Z(x)?k(x):n(x)}function b(x){return x===62?(e.consume(x),O):n(x)}function O(x){return x===null||V(x)?L(x):Z(x)?(e.consume(x),O):n(x)}function L(x){return x===45&&o===2?(e.consume(x),A):x===60&&o===1?(e.consume(x),$):x===62&&o===4?(e.consume(x),G):x===63&&o===3?(e.consume(x),w):x===93&&o===5?(e.consume(x),H):V(x)&&(o===6||o===7)?(e.exit("htmlFlowData"),e.check(OC,K,B)(x)):x===null||V(x)?(e.exit("htmlFlowData"),B(x)):(e.consume(x),L)}function B(x){return e.check(AC,W,K)(x)}function W(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),F}function F(x){return x===null||V(x)?B(x):(e.enter("htmlFlowData"),L(x))}function A(x){return x===45?(e.consume(x),w):L(x)}function $(x){return x===47?(e.consume(x),l="",I):L(x)}function I(x){if(x===62){const ne=l.toLowerCase();return Np.includes(ne)?(e.consume(x),G):L(x)}return tt(x)&&l.length<8?(e.consume(x),l+=String.fromCharCode(x),I):L(x)}function H(x){return x===93?(e.consume(x),w):L(x)}function w(x){return x===62?(e.consume(x),G):x===45&&o===2?(e.consume(x),w):L(x)}function G(x){return x===null||V(x)?(e.exit("htmlFlowData"),K(x)):(e.consume(x),G)}function K(x){return e.exit("htmlFlow"),t(x)}}function MC(e,t,n){const r=this;return o;function o(l){return V(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i):n(l)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function DC(e,t,n){return r;function r(o){return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),e.attempt(Pi,t,n)}}const FC={name:"htmlText",tokenize:NC};function NC(e,t,n){const r=this;let o,i,l;return a;function a(w){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(w),s}function s(w){return w===33?(e.consume(w),u):w===47?(e.consume(w),T):w===63?(e.consume(w),k):tt(w)?(e.consume(w),P):n(w)}function u(w){return w===45?(e.consume(w),d):w===91?(e.consume(w),i=0,h):tt(w)?(e.consume(w),m):n(w)}function d(w){return w===45?(e.consume(w),p):n(w)}function c(w){return w===null?n(w):w===45?(e.consume(w),f):V(w)?(l=c,$(w)):(e.consume(w),c)}function f(w){return w===45?(e.consume(w),p):c(w)}function p(w){return w===62?A(w):w===45?f(w):c(w)}function h(w){const G="CDATA[";return w===G.charCodeAt(i++)?(e.consume(w),i===G.length?y:h):n(w)}function y(w){return w===null?n(w):w===93?(e.consume(w),v):V(w)?(l=y,$(w)):(e.consume(w),y)}function v(w){return w===93?(e.consume(w),g):y(w)}function g(w){return w===62?A(w):w===93?(e.consume(w),g):y(w)}function m(w){return w===null||w===62?A(w):V(w)?(l=m,$(w)):(e.consume(w),m)}function k(w){return w===null?n(w):w===63?(e.consume(w),C):V(w)?(l=k,$(w)):(e.consume(w),k)}function C(w){return w===62?A(w):k(w)}function T(w){return tt(w)?(e.consume(w),S):n(w)}function S(w){return w===45||Xe(w)?(e.consume(w),S):E(w)}function E(w){return V(w)?(l=E,$(w)):Z(w)?(e.consume(w),E):A(w)}function P(w){return w===45||Xe(w)?(e.consume(w),P):w===47||w===62||pe(w)?M(w):n(w)}function M(w){return w===47?(e.consume(w),A):w===58||w===95||tt(w)?(e.consume(w),b):V(w)?(l=M,$(w)):Z(w)?(e.consume(w),M):A(w)}function b(w){return w===45||w===46||w===58||w===95||Xe(w)?(e.consume(w),b):O(w)}function O(w){return w===61?(e.consume(w),L):V(w)?(l=O,$(w)):Z(w)?(e.consume(w),O):M(w)}function L(w){return w===null||w===60||w===61||w===62||w===96?n(w):w===34||w===39?(e.consume(w),o=w,B):V(w)?(l=L,$(w)):Z(w)?(e.consume(w),L):(e.consume(w),W)}function B(w){return w===o?(e.consume(w),o=void 0,F):w===null?n(w):V(w)?(l=B,$(w)):(e.consume(w),B)}function W(w){return w===null||w===34||w===39||w===60||w===61||w===96?n(w):w===47||w===62||pe(w)?M(w):(e.consume(w),W)}function F(w){return w===47||w===62||pe(w)?M(w):n(w)}function A(w){return w===62?(e.consume(w),e.exit("htmlTextData"),e.exit("htmlText"),t):n(w)}function $(w){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),I}function I(w){return Z(w)?J(e,H,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):H(w)}function H(w){return e.enter("htmlTextData"),l(w)}}const Pd={name:"labelEnd",tokenize:VC,resolveTo:HC,resolveAll:UC},jC={tokenize:WC},$C={tokenize:KC},BC={tokenize:QC};function UC(e){let t=-1;for(;++t<e.length;){const n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function HC(e,t){let n=e.length,r=0,o,i,l,a;for(;n--;)if(o=e[n][1],i){if(o.type==="link"||o.type==="labelLink"&&o._inactive)break;e[n][0]==="enter"&&o.type==="labelLink"&&(o._inactive=!0)}else if(l){if(e[n][0]==="enter"&&(o.type==="labelImage"||o.type==="labelLink")&&!o._balanced&&(i=n,o.type!=="labelLink")){r=2;break}}else o.type==="labelEnd"&&(l=n);const s={type:e[i][1].type==="labelLink"?"link":"image",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)},u={type:"label",start:Object.assign({},e[i][1].start),end:Object.assign({},e[l][1].end)},d={type:"labelText",start:Object.assign({},e[i+r+2][1].end),end:Object.assign({},e[l-2][1].start)};return a=[["enter",s,t],["enter",u,t]],a=At(a,e.slice(i+1,i+r+3)),a=At(a,[["enter",d,t]]),a=At(a,Va(t.parser.constructs.insideSpan.null,e.slice(i+r+4,l-3),t)),a=At(a,[["exit",d,t],e[l-2],e[l-1],["exit",u,t]]),a=At(a,e.slice(l+1)),a=At(a,[["exit",s,t]]),St(e,i,e.length,a),e}function VC(e,t,n){const r=this;let o=r.events.length,i,l;for(;o--;)if((r.events[o][1].type==="labelImage"||r.events[o][1].type==="labelLink")&&!r.events[o][1]._balanced){i=r.events[o][1];break}return a;function a(f){return i?i._inactive?c(f):(l=r.parser.defined.includes(Gt(r.sliceSerialize({start:i.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(f),e.exit("labelMarker"),e.exit("labelEnd"),s):n(f)}function s(f){return f===40?e.attempt(jC,d,l?d:c)(f):f===91?e.attempt($C,d,l?u:c)(f):l?d(f):c(f)}function u(f){return e.attempt(BC,d,c)(f)}function d(f){return t(f)}function c(f){return i._balanced=!0,n(f)}}function WC(e,t,n){return r;function r(c){return e.enter("resource"),e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),o}function o(c){return pe(c)?Fo(e,i)(c):i(c)}function i(c){return c===41?d(c):qy(e,l,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function l(c){return pe(c)?Fo(e,s)(c):d(c)}function a(c){return n(c)}function s(c){return c===34||c===39||c===40?Yy(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):d(c)}function u(c){return pe(c)?Fo(e,d)(c):d(c)}function d(c){return c===41?(e.enter("resourceMarker"),e.consume(c),e.exit("resourceMarker"),e.exit("resource"),t):n(c)}}function KC(e,t,n){const r=this;return o;function o(a){return Gy.call(r,e,i,l,"reference","referenceMarker","referenceString")(a)}function i(a){return r.parser.defined.includes(Gt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function l(a){return n(a)}}function QC(e,t,n){return r;function r(i){return e.enter("reference"),e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),o}function o(i){return i===93?(e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),e.exit("reference"),t):n(i)}}const qC={name:"labelStartImage",tokenize:GC,resolveAll:Pd.resolveAll};function GC(e,t,n){const r=this;return o;function o(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),i}function i(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),l):n(a)}function l(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}const YC={name:"labelStartLink",tokenize:XC,resolveAll:Pd.resolveAll};function XC(e,t,n){const r=this;return o;function o(l){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelLink"),i}function i(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const Ls={name:"lineEnding",tokenize:JC};function JC(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),J(e,t,"linePrefix")}}const xl={name:"thematicBreak",tokenize:ZC};function ZC(e,t,n){let r=0,o;return i;function i(u){return e.enter("thematicBreak"),l(u)}function l(u){return o=u,a(u)}function a(u){return u===o?(e.enter("thematicBreakSequence"),s(u)):r>=3&&(u===null||V(u))?(e.exit("thematicBreak"),t(u)):n(u)}function s(u){return u===o?(e.consume(u),r++,s):(e.exit("thematicBreakSequence"),Z(u)?J(e,a,"whitespace")(u):a(u))}}const at={name:"list",tokenize:nE,continuation:{tokenize:rE},exit:iE},eE={tokenize:lE,partial:!0},tE={tokenize:oE,partial:!0};function nE(e,t,n){const r=this,o=r.events[r.events.length-1];let i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0,l=0;return a;function a(p){const h=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(h==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:nc(p)){if(r.containerState.type||(r.containerState.type=h,e.enter(h,{_container:!0})),h==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(xl,n,u)(p):u(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return nc(p)&&++l<10?(e.consume(p),s):(!r.interrupt||l<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),u(p)):n(p)}function u(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(Pi,r.interrupt?n:d,e.attempt(eE,f,c))}function d(p){return r.containerState.initialBlankLine=!0,i++,f(p)}function c(p){return Z(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),f):n(p)}function f(p){return r.containerState.size=i+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function rE(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(Pi,o,i);function o(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,J(e,t,"listItemIndent",r.containerState.size+1)(a)}function i(a){return r.containerState.furtherBlankLines||!Z(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,l(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(tE,t,l)(a))}function l(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,J(e,e.attempt(at,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function oE(e,t,n){const r=this;return J(e,o,"listItemIndent",r.containerState.size+1);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===r.containerState.size?t(i):n(i)}}function iE(e){e.exit(this.containerState.type)}function lE(e,t,n){const r=this;return J(e,o,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function o(i){const l=r.events[r.events.length-1];return!Z(i)&&l&&l[1].type==="listItemPrefixWhitespace"?t(i):n(i)}}const jp={name:"setextUnderline",tokenize:sE,resolveTo:aE};function aE(e,t){let n=e.length,r,o,i;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(o=n)}else e[n][1].type==="content"&&e.splice(n,1),!i&&e[n][1].type==="definition"&&(i=n);const l={type:"setextHeading",start:Object.assign({},e[o][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[o][1].type="setextHeadingText",i?(e.splice(o,0,["enter",l,t]),e.splice(i+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[i][1].end)):e[r][1]=l,e.push(["exit",l,t]),e}function sE(e,t,n){const r=this;let o;return i;function i(u){let d=r.events.length,c;for(;d--;)if(r.events[d][1].type!=="lineEnding"&&r.events[d][1].type!=="linePrefix"&&r.events[d][1].type!=="content"){c=r.events[d][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(e.enter("setextHeadingLine"),o=u,l(u)):n(u)}function l(u){return e.enter("setextHeadingLineSequence"),a(u)}function a(u){return u===o?(e.consume(u),a):(e.exit("setextHeadingLineSequence"),Z(u)?J(e,s,"lineSuffix")(u):s(u))}function s(u){return u===null||V(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const uE={tokenize:cE};function cE(e){const t=this,n=e.attempt(Pi,r,e.attempt(this.parser.constructs.flowInitial,o,J(e,e.attempt(this.parser.constructs.flow,o,e.attempt(hC,o)),"linePrefix")));return n;function r(i){if(i===null){e.consume(i);return}return e.enter("lineEndingBlank"),e.consume(i),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function o(i){if(i===null){e.consume(i);return}return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const dE={resolveAll:Jy()},fE=Xy("string"),pE=Xy("text");function Xy(e){return{tokenize:t,resolveAll:Jy(e==="text"?mE:void 0)};function t(n){const r=this,o=this.parser.constructs[e],i=n.attempt(o,l,a);return l;function l(d){return u(d)?i(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),s}function s(d){return u(d)?(n.exit("data"),i(d)):(n.consume(d),s)}function u(d){if(d===null)return!0;const c=o[d];let f=-1;if(c)for(;++f<c.length;){const p=c[f];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function Jy(e){return t;function t(n,r){let o=-1,i;for(;++o<=n.length;)i===void 0?n[o]&&n[o][1].type==="data"&&(i=o,o++):(!n[o]||n[o][1].type!=="data")&&(o!==i+2&&(n[i][1].end=n[o-1][1].end,n.splice(i+2,o-i-2),o=i+2),i=void 0);return e?e(n,r):n}}function mE(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],o=t.sliceStream(r);let i=o.length,l=-1,a=0,s;for(;i--;){const u=o[i];if(typeof u=="string"){for(l=u.length;u.charCodeAt(l-1)===32;)a++,l--;if(l)break;l=-1}else if(u===-2)s=!0,a++;else if(u!==-1){i++;break}}if(a){const u={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+i,_bufferIndex:i?l:r.start._bufferIndex+l},end:Object.assign({},r.end)};r.end=Object.assign({},u.start),r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}function hE(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1});const o={},i=[];let l=[],a=[];const s={consume:m,enter:k,exit:C,attempt:E(T),check:E(S),interrupt:E(S,{interrupt:!0})},u={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:f,now:h,defineSkip:y,write:c};let d=t.tokenize.call(u,s);return t.resolveAll&&i.push(t),u;function c(O){return l=At(l,O),v(),l[l.length-1]!==null?[]:(P(t,0),u.events=Va(i,u.events,u),u.events)}function f(O,L){return yE(p(O),L)}function p(O){return gE(l,O)}function h(){const{line:O,column:L,offset:B,_index:W,_bufferIndex:F}=r;return{line:O,column:L,offset:B,_index:W,_bufferIndex:F}}function y(O){o[O.line]=O.column,b()}function v(){let O;for(;r._index<l.length;){const L=l[r._index];if(typeof L=="string")for(O=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===O&&r._bufferIndex<L.length;)g(L.charCodeAt(r._bufferIndex));else g(L)}}function g(O){d=d(O)}function m(O){V(O)?(r.line++,r.column=1,r.offset+=O===-3?2:1,b()):O!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===l[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=O}function k(O,L){const B=L||{};return B.type=O,B.start=h(),u.events.push(["enter",B,u]),a.push(B),B}function C(O){const L=a.pop();return L.end=h(),u.events.push(["exit",L,u]),L}function T(O,L){P(O,L.from)}function S(O,L){L.restore()}function E(O,L){return B;function B(W,F,A){let $,I,H,w;return Array.isArray(W)?K(W):"tokenize"in W?K([W]):G(W);function G(ee){return Ue;function Ue(it){const _t=it!==null&&ee[it],mt=it!==null&&ee.null,kr=[...Array.isArray(_t)?_t:_t?[_t]:[],...Array.isArray(mt)?mt:mt?[mt]:[]];return K(kr)(it)}}function K(ee){return $=ee,I=0,ee.length===0?A:x(ee[I])}function x(ee){return Ue;function Ue(it){return w=M(),H=ee,ee.partial||(u.currentConstruct=ee),ee.name&&u.parser.constructs.disable.null.includes(ee.name)?ke():ee.tokenize.call(L?Object.assign(Object.create(u),L):u,s,ne,ke)(it)}}function ne(ee){return O(H,w),F}function ke(ee){return w.restore(),++I<$.length?x($[I]):A}}}function P(O,L){O.resolveAll&&!i.includes(O)&&i.push(O),O.resolve&&St(u.events,L,u.events.length-L,O.resolve(u.events.slice(L),u)),O.resolveTo&&(u.events=O.resolveTo(u.events,u))}function M(){const O=h(),L=u.previous,B=u.currentConstruct,W=u.events.length,F=Array.from(a);return{restore:A,from:W};function A(){r=O,u.previous=L,u.currentConstruct=B,u.events.length=W,a=F,b()}}function b(){r.line in o&&r.column<2&&(r.column=o[r.line],r.offset+=o[r.line]-1)}}function gE(e,t){const n=t.start._index,r=t.start._bufferIndex,o=t.end._index,i=t.end._bufferIndex;let l;if(n===o)l=[e[n].slice(r,i)];else{if(l=e.slice(n,o),r>-1){const a=l[0];typeof a=="string"?l[0]=a.slice(r):l.shift()}i>0&&l.push(e[o].slice(0,i))}return l}function yE(e,t){let n=-1;const r=[];let o;for(;++n<e.length;){const i=e[n];let l;if(typeof i=="string")l=i;else switch(i){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=t?" ":"	";break}case-1:{if(!t&&o)continue;l=" ";break}default:l=String.fromCharCode(i)}o=i===-2,r.push(l)}return r.join("")}const kE={42:at,43:at,45:at,48:at,49:at,50:at,51:at,52:at,53:at,54:at,55:at,56:at,57:at,62:Vy},wE={91:bC},bE={[-2]:As,[-1]:As,32:As},vE={35:TC,42:xl,45:[jp,xl],60:IC,61:jp,95:xl,96:Fp,126:Fp},xE={38:Ky,92:Wy},SE={[-5]:Ls,[-4]:Ls,[-3]:Ls,33:qC,38:Ky,42:rc,60:[X2,FC],91:YC,92:[CC,Wy],93:Pd,95:rc,96:cC},CE={null:[rc,dE]},EE={null:[42,95]},TE={null:[]},PE=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:EE,contentInitial:wE,disable:TE,document:kE,flow:vE,flowInitial:bE,insideSpan:CE,string:xE,text:SE},Symbol.toStringTag,{value:"Module"}));function _E(e){const n=Uy([PE,...(e||{}).extensions||[]]),r={defined:[],lazy:{},constructs:n,content:o(V2),document:o(K2),flow:o(uE),string:o(fE),text:o(pE)};return r;function o(i){return l;function l(a){return hE(r,i,a)}}}function RE(e){for(;!Qy(e););return e}const $p=/[\0\t\n\r]/g;function IE(){let e=1,t="",n=!0,r;return o;function o(i,l,a){const s=[];let u,d,c,f,p;for(i=t+(typeof i=="string"?i.toString():new TextDecoder(l||void 0).decode(i)),c=0,t="",n&&(i.charCodeAt(0)===65279&&c++,n=void 0);c<i.length;){if($p.lastIndex=c,u=$p.exec(i),f=u&&u.index!==void 0?u.index:i.length,p=i.charCodeAt(f),!u){t=i.slice(c);break}if(p===10&&c===f&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),c<f&&(s.push(i.slice(c,f)),e+=f-c),p){case 0:{s.push(65533),e++;break}case 9:{for(d=Math.ceil(e/4)*4,s.push(-2);e++<d;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}c=f+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}const OE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function AE(e){return e.replace(OE,LE)}function LE(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const o=n.charCodeAt(1),i=o===120||o===88;return Hy(n.slice(i?2:1),i?16:10)}return Td(n)||e}const Zy={}.hasOwnProperty;function zE(e,t,n){return typeof t!="string"&&(n=t,t=void 0),ME(n)(RE(_E(n).document().write(IE()(e,t,!0))))}function ME(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:i(Oe),autolinkProtocol:M,autolinkEmail:M,atxHeading:i(Me),blockQuote:i(_t),characterEscape:M,characterReference:M,codeFenced:i(mt),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:i(mt,l),codeText:i(kr,l),codeTextData:M,data:M,codeFlowValue:M,definition:i(de),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:i(fe),hardBreakEscape:i(we),hardBreakTrailing:i(we),htmlFlow:i(ht,l),htmlFlowData:M,htmlText:i(ht,l),htmlTextData:M,image:i(Cn),label:l,link:i(Oe),listItem:i($t),listItemValue:f,listOrdered:i(Ne,c),listUnordered:i(Ne),paragraph:i(Ri),reference:x,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:i(Me),strong:i(Ii),thematicBreak:i(lt)},exit:{atxHeading:s(),atxHeadingSequence:T,autolink:s(),autolinkEmail:it,autolinkProtocol:Ue,blockQuote:s(),characterEscapeValue:b,characterReferenceMarkerHexadecimal:ke,characterReferenceMarkerNumeric:ke,characterReferenceValue:ee,codeFenced:s(v),codeFencedFence:y,codeFencedFenceInfo:p,codeFencedFenceMeta:h,codeFlowValue:b,codeIndented:s(g),codeText:s(F),codeTextData:b,data:b,definition:s(),definitionDestinationString:C,definitionLabelString:m,definitionTitleString:k,emphasis:s(),hardBreakEscape:s(L),hardBreakTrailing:s(L),htmlFlow:s(B),htmlFlowData:b,htmlText:s(W),htmlTextData:b,image:s($),label:H,labelText:I,lineEnding:O,link:s(A),listItem:s(),listOrdered:s(),listUnordered:s(),paragraph:s(),referenceString:ne,resourceDestinationString:w,resourceTitleString:G,resource:K,setextHeading:s(P),setextHeadingLineSequence:E,setextHeadingText:S,strong:s(),thematicBreak:s()}};e0(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(_){let j={type:"root",children:[]};const q={stack:[j],tokenStack:[],config:t,enter:a,exit:u,buffer:l,resume:d,data:n},X=[];let ce=-1;for(;++ce<_.length;)if(_[ce][1].type==="listOrdered"||_[ce][1].type==="listUnordered")if(_[ce][0]==="enter")X.push(ce);else{const Bt=X.pop();ce=o(_,Bt,ce)}for(ce=-1;++ce<_.length;){const Bt=t[_[ce][0]];Zy.call(Bt,_[ce][1].type)&&Bt[_[ce][1].type].call(Object.assign({sliceSerialize:_[ce][2].sliceSerialize},q),_[ce][1])}if(q.tokenStack.length>0){const Bt=q.tokenStack[q.tokenStack.length-1];(Bt[1]||Bp).call(q,void 0,Bt[0])}for(j.position={start:Tn(_.length>0?_[0][1].start:{line:1,column:1,offset:0}),end:Tn(_.length>0?_[_.length-2][1].end:{line:1,column:1,offset:0})},ce=-1;++ce<t.transforms.length;)j=t.transforms[ce](j)||j;return j}function o(_,j,q){let X=j-1,ce=-1,Bt=!1,Xn,sn,lo,ao;for(;++X<=q;){const gt=_[X];switch(gt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{gt[0]==="enter"?ce++:ce--,ao=void 0;break}case"lineEndingBlank":{gt[0]==="enter"&&(Xn&&!ao&&!ce&&!lo&&(lo=X),ao=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:ao=void 0}if(!ce&&gt[0]==="enter"&&gt[1].type==="listItemPrefix"||ce===-1&&gt[0]==="exit"&&(gt[1].type==="listUnordered"||gt[1].type==="listOrdered")){if(Xn){let wr=X;for(sn=void 0;wr--;){const un=_[wr];if(un[1].type==="lineEnding"||un[1].type==="lineEndingBlank"){if(un[0]==="exit")continue;sn&&(_[sn][1].type="lineEndingBlank",Bt=!0),un[1].type="lineEnding",sn=wr}else if(!(un[1].type==="linePrefix"||un[1].type==="blockQuotePrefix"||un[1].type==="blockQuotePrefixWhitespace"||un[1].type==="blockQuoteMarker"||un[1].type==="listItemIndent"))break}lo&&(!sn||lo<sn)&&(Xn._spread=!0),Xn.end=Object.assign({},sn?_[sn][1].start:gt[1].end),_.splice(sn||X,0,["exit",Xn,gt[2]]),X++,q++}if(gt[1].type==="listItemPrefix"){const wr={type:"listItem",_spread:!1,start:Object.assign({},gt[1].start),end:void 0};Xn=wr,_.splice(X,0,["enter",wr,gt[2]]),X++,q++,lo=void 0,ao=!0}}}return _[j][1]._spread=Bt,q}function i(_,j){return q;function q(X){a.call(this,_(X),X),j&&j.call(this,X)}}function l(){this.stack.push({type:"fragment",children:[]})}function a(_,j,q){this.stack[this.stack.length-1].children.push(_),this.stack.push(_),this.tokenStack.push([j,q]),_.position={start:Tn(j.start),end:void 0}}function s(_){return j;function j(q){_&&_.call(this,q),u.call(this,q)}}function u(_,j){const q=this.stack.pop(),X=this.tokenStack.pop();if(X)X[0].type!==_.type&&(j?j.call(this,_,X[0]):(X[1]||Bp).call(this,_,X[0]));else throw new Error("Cannot close `"+_.type+"` ("+Do({start:_.start,end:_.end})+"): it’s not open");q.position.end=Tn(_.end)}function d(){return Ed(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function f(_){if(this.data.expectingFirstListItemValue){const j=this.stack[this.stack.length-2];j.start=Number.parseInt(this.sliceSerialize(_),10),this.data.expectingFirstListItemValue=void 0}}function p(){const _=this.resume(),j=this.stack[this.stack.length-1];j.lang=_}function h(){const _=this.resume(),j=this.stack[this.stack.length-1];j.meta=_}function y(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function v(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_.replace(/(\r?\n|\r)$/g,"")}function m(_){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(_)).toLowerCase()}function k(){const _=this.resume(),j=this.stack[this.stack.length-1];j.title=_}function C(){const _=this.resume(),j=this.stack[this.stack.length-1];j.url=_}function T(_){const j=this.stack[this.stack.length-1];if(!j.depth){const q=this.sliceSerialize(_).length;j.depth=q}}function S(){this.data.setextHeadingSlurpLineEnding=!0}function E(_){const j=this.stack[this.stack.length-1];j.depth=this.sliceSerialize(_).codePointAt(0)===61?1:2}function P(){this.data.setextHeadingSlurpLineEnding=void 0}function M(_){const q=this.stack[this.stack.length-1].children;let X=q[q.length-1];(!X||X.type!=="text")&&(X=Oi(),X.position={start:Tn(_.start),end:void 0},q.push(X)),this.stack.push(X)}function b(_){const j=this.stack.pop();j.value+=this.sliceSerialize(_),j.position.end=Tn(_.end)}function O(_){const j=this.stack[this.stack.length-1];if(this.data.atHardBreak){const q=j.children[j.children.length-1];q.position.end=Tn(_.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(j.type)&&(M.call(this,_),b.call(this,_))}function L(){this.data.atHardBreak=!0}function B(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function W(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function F(){const _=this.resume(),j=this.stack[this.stack.length-1];j.value=_}function A(){const _=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";_.type+="Reference",_.referenceType=j,delete _.url,delete _.title}else delete _.identifier,delete _.label;this.data.referenceType=void 0}function $(){const _=this.stack[this.stack.length-1];if(this.data.inReference){const j=this.data.referenceType||"shortcut";_.type+="Reference",_.referenceType=j,delete _.url,delete _.title}else delete _.identifier,delete _.label;this.data.referenceType=void 0}function I(_){const j=this.sliceSerialize(_),q=this.stack[this.stack.length-2];q.label=AE(j),q.identifier=Gt(j).toLowerCase()}function H(){const _=this.stack[this.stack.length-1],j=this.resume(),q=this.stack[this.stack.length-1];if(this.data.inReference=!0,q.type==="link"){const X=_.children;q.children=X}else q.alt=j}function w(){const _=this.resume(),j=this.stack[this.stack.length-1];j.url=_}function G(){const _=this.resume(),j=this.stack[this.stack.length-1];j.title=_}function K(){this.data.inReference=void 0}function x(){this.data.referenceType="collapsed"}function ne(_){const j=this.resume(),q=this.stack[this.stack.length-1];q.label=j,q.identifier=Gt(this.sliceSerialize(_)).toLowerCase(),this.data.referenceType="full"}function ke(_){this.data.characterReferenceType=_.type}function ee(_){const j=this.sliceSerialize(_),q=this.data.characterReferenceType;let X;q?(X=Hy(j,q==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):X=Td(j);const ce=this.stack.pop();ce.value+=X,ce.position.end=Tn(_.end)}function Ue(_){b.call(this,_);const j=this.stack[this.stack.length-1];j.url=this.sliceSerialize(_)}function it(_){b.call(this,_);const j=this.stack[this.stack.length-1];j.url="mailto:"+this.sliceSerialize(_)}function _t(){return{type:"blockquote",children:[]}}function mt(){return{type:"code",lang:null,meta:null,value:""}}function kr(){return{type:"inlineCode",value:""}}function de(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function fe(){return{type:"emphasis",children:[]}}function Me(){return{type:"heading",depth:0,children:[]}}function we(){return{type:"break"}}function ht(){return{type:"html",value:""}}function Cn(){return{type:"image",title:null,url:"",alt:null}}function Oe(){return{type:"link",title:null,url:"",children:[]}}function Ne(_){return{type:"list",ordered:_.type==="listOrdered",start:null,spread:_._spread,children:[]}}function $t(_){return{type:"listItem",spread:_._spread,checked:null,children:[]}}function Ri(){return{type:"paragraph",children:[]}}function Ii(){return{type:"strong",children:[]}}function Oi(){return{type:"text",value:""}}function lt(){return{type:"thematicBreak"}}}function Tn(e){return{line:e.line,column:e.column,offset:e.offset}}function e0(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?e0(e,r):DE(e,r)}}function DE(e,t){let n;for(n in t)if(Zy.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function Bp(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Do({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Do({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Do({start:t.start,end:t.end})+") is still open")}function FE(e){const t=this;t.parser=n;function n(r){return zE(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function NE(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function jE(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function $E(e,t){const n=t.value?t.value+`
`:"",r={};t.lang&&(r.className=["language-"+t.lang]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function BE(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function UE(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function HE(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),o=io(r.toLowerCase()),i=e.footnoteOrder.indexOf(r);let l,a=e.footnoteCounts.get(r);a===void 0?(a=0,e.footnoteOrder.push(r),l=e.footnoteOrder.length):l=i+1,a+=1,e.footnoteCounts.set(r,a);const s={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+o,id:n+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,s);const u={type:"element",tagName:"sup",properties:{},children:[s]};return e.patch(t,u),e.applyData(t,u)}function VE(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function WE(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function t0(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const o=e.all(t),i=o[0];i&&i.type==="text"?i.value="["+i.value:o.unshift({type:"text",value:"["});const l=o[o.length-1];return l&&l.type==="text"?l.value+=r:o.push({type:"text",value:r}),o}function KE(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return t0(e,t);const o={src:io(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"img",properties:o,children:[]};return e.patch(t,i),e.applyData(t,i)}function QE(e,t){const n={src:io(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function qE(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function GE(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return t0(e,t);const o={href:io(r.url||"")};r.title!==null&&r.title!==void 0&&(o.title=r.title);const i={type:"element",tagName:"a",properties:o,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function YE(e,t){const n={href:io(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function XE(e,t,n){const r=e.all(t),o=n?JE(n):n0(t),i={},l=[];if(typeof t.checked=="boolean"){const d=r[0];let c;d&&d.type==="element"&&d.tagName==="p"?c=d:(c={type:"element",tagName:"p",properties:{},children:[]},r.unshift(c)),c.children.length>0&&c.children.unshift({type:"text",value:" "}),c.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),i.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const d=r[a];(o||a!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!o?l.push(...d.children):l.push(d)}const s=r[r.length-1];s&&(o||s.type!=="element"||s.tagName!=="p")&&l.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:i,children:l};return e.patch(t,u),e.applyData(t,u)}function JE(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=n0(n[r])}return t}function n0(e){const t=e.spread;return t??e.children.length>1}function ZE(e,t){const n={},r=e.all(t);let o=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++o<r.length;){const l=r[o];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const i={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,i),e.applyData(t,i)}function e5(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function t5(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function n5(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function r5(e,t){const n=e.all(t),r=n.shift(),o=[];if(r){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],l),o.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=vd(t.children[1]),s=My(t.children[t.children.length-1]);a&&s&&(l.position={start:a,end:s}),o.push(l)}const i={type:"element",tagName:"table",properties:{},children:e.wrap(o,!0)};return e.patch(t,i),e.applyData(t,i)}function o5(e,t,n){const r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,a=l?l.length:t.children.length;let s=-1;const u=[];for(;++s<a;){const c=t.children[s],f={},p=l?l[s]:void 0;p&&(f.align=p);let h={type:"element",tagName:i,properties:f,children:[]};c&&(h.children=e.all(c),e.patch(c,h),h=e.applyData(c,h)),u.push(h)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,d),e.applyData(t,d)}function i5(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const Up=9,Hp=32;function l5(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),o=0;const i=[];for(;r;)i.push(Vp(t.slice(o,r.index),o>0,!0),r[0]),o=r.index+r[0].length,r=n.exec(t);return i.push(Vp(t.slice(o),o>0,!1)),i.join("")}function Vp(e,t,n){let r=0,o=e.length;if(t){let i=e.codePointAt(r);for(;i===Up||i===Hp;)r++,i=e.codePointAt(r)}if(n){let i=e.codePointAt(o-1);for(;i===Up||i===Hp;)o--,i=e.codePointAt(o-1)}return o>r?e.slice(r,o):""}function a5(e,t){const n={type:"text",value:l5(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function s5(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const u5={blockquote:NE,break:jE,code:$E,delete:BE,emphasis:UE,footnoteReference:HE,heading:VE,html:WE,imageReference:KE,image:QE,inlineCode:qE,linkReference:GE,link:YE,listItem:XE,list:ZE,paragraph:e5,root:t5,strong:n5,table:r5,tableCell:i5,tableRow:o5,text:a5,thematicBreak:s5,toml:el,yaml:el,definition:el,footnoteDefinition:el};function el(){}const r0=-1,Wa=0,ta=1,na=2,_d=3,Rd=4,Id=5,Od=6,o0=7,i0=8,Wp=typeof self=="object"?self:globalThis,c5=(e,t)=>{const n=(o,i)=>(e.set(i,o),o),r=o=>{if(e.has(o))return e.get(o);const[i,l]=t[o];switch(i){case Wa:case r0:return n(l,o);case ta:{const a=n([],o);for(const s of l)a.push(r(s));return a}case na:{const a=n({},o);for(const[s,u]of l)a[r(s)]=r(u);return a}case _d:return n(new Date(l),o);case Rd:{const{source:a,flags:s}=l;return n(new RegExp(a,s),o)}case Id:{const a=n(new Map,o);for(const[s,u]of l)a.set(r(s),r(u));return a}case Od:{const a=n(new Set,o);for(const s of l)a.add(r(s));return a}case o0:{const{name:a,message:s}=l;return n(new Wp[a](s),o)}case i0:return n(BigInt(l),o);case"BigInt":return n(Object(BigInt(l)),o)}return n(new Wp[i](l),o)};return r},Kp=e=>c5(new Map,e)(0),vr="",{toString:d5}={},{keys:f5}=Object,wo=e=>{const t=typeof e;if(t!=="object"||!e)return[Wa,t];const n=d5.call(e).slice(8,-1);switch(n){case"Array":return[ta,vr];case"Object":return[na,vr];case"Date":return[_d,vr];case"RegExp":return[Rd,vr];case"Map":return[Id,vr];case"Set":return[Od,vr]}return n.includes("Array")?[ta,n]:n.includes("Error")?[o0,n]:[na,n]},tl=([e,t])=>e===Wa&&(t==="function"||t==="symbol"),p5=(e,t,n,r)=>{const o=(l,a)=>{const s=r.push(l)-1;return n.set(a,s),s},i=l=>{if(n.has(l))return n.get(l);let[a,s]=wo(l);switch(a){case Wa:{let d=l;switch(s){case"bigint":a=i0,d=l.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+s);d=null;break;case"undefined":return o([r0],l)}return o([a,d],l)}case ta:{if(s)return o([s,[...l]],l);const d=[],c=o([a,d],l);for(const f of l)d.push(i(f));return c}case na:{if(s)switch(s){case"BigInt":return o([s,l.toString()],l);case"Boolean":case"Number":case"String":return o([s,l.valueOf()],l)}if(t&&"toJSON"in l)return i(l.toJSON());const d=[],c=o([a,d],l);for(const f of f5(l))(e||!tl(wo(l[f])))&&d.push([i(f),i(l[f])]);return c}case _d:return o([a,l.toISOString()],l);case Rd:{const{source:d,flags:c}=l;return o([a,{source:d,flags:c}],l)}case Id:{const d=[],c=o([a,d],l);for(const[f,p]of l)(e||!(tl(wo(f))||tl(wo(p))))&&d.push([i(f),i(p)]);return c}case Od:{const d=[],c=o([a,d],l);for(const f of l)(e||!tl(wo(f)))&&d.push(i(f));return c}}const{message:u}=l;return o([a,{name:s,message:u}],l)};return i},Qp=(e,{json:t,lossy:n}={})=>{const r=[];return p5(!(t||n),!!t,new Map,r)(e),r},ra=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Kp(Qp(e,t)):structuredClone(e):(e,t)=>Kp(Qp(e,t));function m5(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function h5(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function g5(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||m5,r=e.options.footnoteBackLabel||h5,o=e.options.footnoteLabel||"Footnotes",i=e.options.footnoteLabelTagName||"h2",l=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[];let s=-1;for(;++s<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[s]);if(!u)continue;const d=e.all(u),c=String(u.identifier).toUpperCase(),f=io(c.toLowerCase());let p=0;const h=[],y=e.footnoteCounts.get(c);for(;y!==void 0&&++p<=y;){h.length>0&&h.push({type:"text",value:" "});let m=typeof n=="string"?n:n(s,p);typeof m=="string"&&(m={type:"text",value:m}),h.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+f+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(s,p),className:["data-footnote-backref"]},children:Array.isArray(m)?m:[m]})}const v=d[d.length-1];if(v&&v.type==="element"&&v.tagName==="p"){const m=v.children[v.children.length-1];m&&m.type==="text"?m.value+=" ":v.children.push({type:"text",value:" "}),v.children.push(...h)}else d.push(...h);const g={type:"element",tagName:"li",properties:{id:t+"fn-"+f},children:e.wrap(d,!0)};e.patch(u,g),a.push(g)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:i,properties:{...ra(l),id:"footnote-label"},children:[{type:"text",value:o}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const Ka=function(e){if(e==null)return b5;if(typeof e=="function")return Qa(e);if(typeof e=="object")return Array.isArray(e)?y5(e):k5(e);if(typeof e=="string")return w5(e);throw new Error("Expected function, string, or object as test")};function y5(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Ka(e[n]);return Qa(r);function r(...o){let i=-1;for(;++i<t.length;)if(t[i].apply(this,o))return!0;return!1}}function k5(e){const t=e;return Qa(n);function n(r){const o=r;let i;for(i in e)if(o[i]!==t[i])return!1;return!0}}function w5(e){return Qa(t);function t(n){return n&&n.type===e}}function Qa(e){return t;function t(n,r,o){return!!(v5(n)&&e.call(this,n,typeof r=="number"?r:void 0,o||void 0))}}function b5(){return!0}function v5(e){return e!==null&&typeof e=="object"&&"type"in e}const l0=[],x5=!0,oc=!1,S5="skip";function a0(e,t,n,r){let o;typeof t=="function"&&typeof n!="function"?(r=n,n=t):o=t;const i=Ka(o),l=r?-1:1;a(e,void 0,[])();function a(s,u,d){const c=s&&typeof s=="object"?s:{};if(typeof c.type=="string"){const p=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(s.type+(p?"<"+p+">":""))+")"})}return f;function f(){let p=l0,h,y,v;if((!t||i(s,u,d[d.length-1]||void 0))&&(p=C5(n(s,d)),p[0]===oc))return p;if("children"in s&&s.children){const g=s;if(g.children&&p[0]!==S5)for(y=(r?g.children.length:-1)+l,v=d.concat(g);y>-1&&y<g.children.length;){const m=g.children[y];if(h=a(m,y,v)(),h[0]===oc)return h;y=typeof h[1]=="number"?h[1]:y+l}}return p}}}function C5(e){return Array.isArray(e)?e:typeof e=="number"?[x5,e]:e==null?l0:[e]}function Ad(e,t,n,r){let o,i,l;typeof t=="function"&&typeof n!="function"?(i=void 0,l=t,o=n):(i=t,l=n,o=r),a0(e,i,a,o);function a(s,u){const d=u[u.length-1],c=d?d.children.indexOf(s):void 0;return l(s,c,d)}}const ic={}.hasOwnProperty,E5={};function T5(e,t){const n=t||E5,r=new Map,o=new Map,i=new Map,l={...u5,...n.handlers},a={all:u,applyData:_5,definitionById:r,footnoteById:o,footnoteCounts:i,footnoteOrder:[],handlers:l,one:s,options:n,patch:P5,wrap:I5};return Ad(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const c=d.type==="definition"?r:o,f=String(d.identifier).toUpperCase();c.has(f)||c.set(f,d)}}),a;function s(d,c){const f=d.type,p=a.handlers[f];if(ic.call(a.handlers,f)&&p)return p(a,d,c);if(a.options.passThrough&&a.options.passThrough.includes(f)){if("children"in d){const{children:y,...v}=d,g=ra(v);return g.children=a.all(d),g}return ra(d)}return(a.options.unknownHandler||R5)(a,d,c)}function u(d){const c=[];if("children"in d){const f=d.children;let p=-1;for(;++p<f.length;){const h=a.one(f[p],d);if(h){if(p&&f[p-1].type==="break"&&(!Array.isArray(h)&&h.type==="text"&&(h.value=qp(h.value)),!Array.isArray(h)&&h.type==="element")){const y=h.children[0];y&&y.type==="text"&&(y.value=qp(y.value))}Array.isArray(h)?c.push(...h):c.push(h)}}}return c}}function P5(e,t){e.position&&(t.position=m2(e))}function _5(e,t){let n=t;if(e&&e.data){const r=e.data.hName,o=e.data.hChildren,i=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const l="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:l}}n.type==="element"&&i&&Object.assign(n.properties,ra(i)),"children"in n&&n.children&&o!==null&&o!==void 0&&(n.children=o)}return n}function R5(e,t){const n=t.data||{},r="value"in t&&!(ic.call(n,"hProperties")||ic.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function I5(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function qp(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Gp(e,t){const n=T5(e,t),r=n.one(e,void 0),o=g5(n),i=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return o&&i.children.push({type:"text",value:`
`},o),i}function O5(e,t){return e&&"run"in e?async function(n,r){const o=Gp(n,{file:r,...t});await e.run(o,r)}:function(n,r){return Gp(n,{file:r,...t||e})}}function Yp(e){if(e)throw e}var Sl=Object.prototype.hasOwnProperty,s0=Object.prototype.toString,Xp=Object.defineProperty,Jp=Object.getOwnPropertyDescriptor,Zp=function(t){return typeof Array.isArray=="function"?Array.isArray(t):s0.call(t)==="[object Array]"},em=function(t){if(!t||s0.call(t)!=="[object Object]")return!1;var n=Sl.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Sl.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var o;for(o in t);return typeof o>"u"||Sl.call(t,o)},tm=function(t,n){Xp&&n.name==="__proto__"?Xp(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},nm=function(t,n){if(n==="__proto__")if(Sl.call(t,n)){if(Jp)return Jp(t,n).value}else return;return t[n]},A5=function e(){var t,n,r,o,i,l,a=arguments[0],s=1,u=arguments.length,d=!1;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},s=2),(a==null||typeof a!="object"&&typeof a!="function")&&(a={});s<u;++s)if(t=arguments[s],t!=null)for(n in t)r=nm(a,n),o=nm(t,n),a!==o&&(d&&o&&(em(o)||(i=Zp(o)))?(i?(i=!1,l=r&&Zp(r)?r:[]):l=r&&em(r)?r:{},tm(a,{name:n,newValue:e(d,l,o)})):typeof o<"u"&&tm(a,{name:n,newValue:o}));return a};const zs=oa(A5);function lc(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function L5(){const e=[],t={run:n,use:r};return t;function n(...o){let i=-1;const l=o.pop();if(typeof l!="function")throw new TypeError("Expected function as last argument, not "+l);a(null,...o);function a(s,...u){const d=e[++i];let c=-1;if(s){l(s);return}for(;++c<o.length;)(u[c]===null||u[c]===void 0)&&(u[c]=o[c]);o=u,d?z5(d,a)(...u):l(null,...u)}}function r(o){if(typeof o!="function")throw new TypeError("Expected `middelware` to be a function, not "+o);return e.push(o),t}}function z5(e,t){let n;return r;function r(...l){const a=e.length>l.length;let s;a&&l.push(o);try{s=e.apply(this,l)}catch(u){const d=u;if(a&&n)throw d;return o(d)}a||(s instanceof Promise?s.then(i,o):s instanceof Error?o(s):i(s))}function o(l,...a){n||(n=!0,t(l,...a))}function i(l){o(null,l)}}const Zt={basename:M5,dirname:D5,extname:F5,join:N5,sep:"/"};function M5(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');_i(e);let n=0,r=-1,o=e.length,i;if(t===void 0||t.length===0||t.length>e.length){for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else r<0&&(i=!0,r=o+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let l=-1,a=t.length-1;for(;o--;)if(e.codePointAt(o)===47){if(i){n=o+1;break}}else l<0&&(i=!0,l=o+1),a>-1&&(e.codePointAt(o)===t.codePointAt(a--)?a<0&&(r=o):(a=-1,r=l));return n===r?r=l:r<0&&(r=e.length),e.slice(n,r)}function D5(e){if(_i(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function F5(e){_i(e);let t=e.length,n=-1,r=0,o=-1,i=0,l;for(;t--;){const a=e.codePointAt(t);if(a===47){if(l){r=t+1;break}continue}n<0&&(l=!0,n=t+1),a===46?o<0?o=t:i!==1&&(i=1):o>-1&&(i=-1)}return o<0||n<0||i===0||i===1&&o===n-1&&o===r+1?"":e.slice(o,n)}function N5(...e){let t=-1,n;for(;++t<e.length;)_i(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":j5(n)}function j5(e){_i(e);const t=e.codePointAt(0)===47;let n=$5(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function $5(e,t){let n="",r=0,o=-1,i=0,l=-1,a,s;for(;++l<=e.length;){if(l<e.length)a=e.codePointAt(l);else{if(a===47)break;a=47}if(a===47){if(!(o===l-1||i===1))if(o!==l-1&&i===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),o=l,i=0;continue}}else if(n.length>0){n="",r=0,o=l,i=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(o+1,l):n=e.slice(o+1,l),r=l-o-1;o=l,i=0}else a===46&&i>-1?i++:i=-1}return n}function _i(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const B5={cwd:U5};function U5(){return"/"}function ac(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function H5(e){if(typeof e=="string")e=new URL(e);else if(!ac(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return V5(e)}function V5(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const o=new TypeError("File URL path must not include encoded / characters");throw o.code="ERR_INVALID_FILE_URL_PATH",o}}return decodeURIComponent(t)}const Ms=["history","path","basename","stem","extname","dirname"];class u0{constructor(t){let n;t?ac(t)?n={path:t}:typeof t=="string"||W5(t)?n={value:t}:n=t:n={},this.cwd=B5.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<Ms.length;){const i=Ms[r];i in n&&n[i]!==void 0&&n[i]!==null&&(this[i]=i==="history"?[...n[i]]:n[i])}let o;for(o in n)Ms.includes(o)||(this[o]=n[o])}get basename(){return typeof this.path=="string"?Zt.basename(this.path):void 0}set basename(t){Fs(t,"basename"),Ds(t,"basename"),this.path=Zt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Zt.dirname(this.path):void 0}set dirname(t){rm(this.basename,"dirname"),this.path=Zt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Zt.extname(this.path):void 0}set extname(t){if(Ds(t,"extname"),rm(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Zt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){ac(t)&&(t=H5(t)),Fs(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Zt.basename(this.path,this.extname):void 0}set stem(t){Fs(t,"stem"),Ds(t,"stem"),this.path=Zt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const o=this.message(t,n,r);throw o.fatal=!0,o}info(t,n,r){const o=this.message(t,n,r);return o.fatal=void 0,o}message(t,n,r){const o=new Ze(t,n,r);return this.path&&(o.name=this.path+":"+o.name,o.file=this.path),o.fatal=!1,this.messages.push(o),o}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function Ds(e,t){if(e&&e.includes(Zt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Zt.sep+"`")}function Fs(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function rm(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function W5(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const K5=function(e){const r=this.constructor.prototype,o=r[e],i=function(){return o.apply(i,arguments)};Object.setPrototypeOf(i,r);const l=Object.getOwnPropertyNames(o);for(const a of l){const s=Object.getOwnPropertyDescriptor(o,a);s&&Object.defineProperty(i,a,s)}return i},Q5={}.hasOwnProperty;class Ld extends K5{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=L5()}copy(){const t=new Ld;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(zs(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?($s("data",this.frozen),this.namespace[t]=n,this):Q5.call(this.namespace,t)&&this.namespace[t]||void 0:t?($s("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const o=n.call(t,...r);typeof o=="function"&&this.transformers.use(o)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=nl(t),r=this.parser||this.Parser;return Ns("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),Ns("process",this.parser||this.Parser),js("process",this.compiler||this.Compiler),n?o(void 0,n):new Promise(o);function o(i,l){const a=nl(t),s=r.parse(a);r.run(s,a,function(d,c,f){if(d||!c||!f)return u(d);const p=c,h=r.stringify(p,f);Y5(h)?f.value=h:f.result=h,u(d,f)});function u(d,c){d||!c?l(d):i?i(c):n(void 0,c)}}}processSync(t){let n=!1,r;return this.freeze(),Ns("processSync",this.parser||this.Parser),js("processSync",this.compiler||this.Compiler),this.process(t,o),im("processSync","process",n),r;function o(i,l){n=!0,Yp(i),r=l}}run(t,n,r){om(t),this.freeze();const o=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?i(void 0,r):new Promise(i);function i(l,a){const s=nl(n);o.run(t,s,u);function u(d,c,f){const p=c||t;d?a(d):l?l(p):r(void 0,p,f)}}}runSync(t,n){let r=!1,o;return this.run(t,n,i),im("runSync","run",r),o;function i(l,a){Yp(l),o=a,r=!0}}stringify(t,n){this.freeze();const r=nl(n),o=this.compiler||this.Compiler;return js("stringify",o),om(t),o(t,r)}use(t,...n){const r=this.attachers,o=this.namespace;if($s("use",this.frozen),t!=null)if(typeof t=="function")s(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):l(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function i(u){if(typeof u=="function")s(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[d,...c]=u;s(d,c)}else l(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function l(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(u.plugins),u.settings&&(o.settings=zs(!0,o.settings,u.settings))}function a(u){let d=-1;if(u!=null)if(Array.isArray(u))for(;++d<u.length;){const c=u[d];i(c)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function s(u,d){let c=-1,f=-1;for(;++c<r.length;)if(r[c][0]===u){f=c;break}if(f===-1)r.push([u,...d]);else if(d.length>0){let[p,...h]=d;const y=r[f][1];lc(y)&&lc(p)&&(p=zs(!0,y,p)),r[f]=[u,p,...h]}}}}const q5=new Ld().freeze();function Ns(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function js(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function $s(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function om(e){if(!lc(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function im(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function nl(e){return G5(e)?e:new u0(e)}function G5(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function Y5(e){return typeof e=="string"||X5(e)}function X5(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const J5="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",lm=[],am={allowDangerousHtml:!0},Z5=/^(https?|ircs?|mailto|xmpp)$/i,e3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function t3(e){const t=e.allowedElements,n=e.allowElement,r=e.children||"",o=e.className,i=e.components,l=e.disallowedElements,a=e.rehypePlugins||lm,s=e.remarkPlugins||lm,u=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...am}:am,d=e.skipHtml,c=e.unwrapDisallowed,f=e.urlTransform||n3,p=q5().use(FE).use(s).use(O5,u).use(a),h=new u0;typeof r=="string"&&(h.value=r);for(const m of e3)Object.hasOwn(e,m.from)&&(""+m.from+(m.to?"use `"+m.to+"` instead":"remove it")+J5+m.id,void 0);const y=p.parse(h);let v=p.runSync(y,h);return o&&(v={type:"element",tagName:"div",properties:{className:o},children:v.type==="root"?v.children:[v]}),Ad(v,g),b2(v,{Fragment:N.Fragment,components:i,ignoreInvalidStyle:!0,jsx:N.jsx,jsxs:N.jsxs,passKeys:!0,passNode:!0});function g(m,k,C){if(m.type==="raw"&&C&&typeof k=="number")return d?C.children.splice(k,1):C.children[k]={type:"text",value:m.value},k;if(m.type==="element"){let T;for(T in Os)if(Object.hasOwn(Os,T)&&Object.hasOwn(m.properties,T)){const S=m.properties[T],E=Os[T];(E===null||E.includes(m.tagName))&&(m.properties[T]=f(String(S||""),T,m))}}if(m.type==="element"){let T=t?!t.includes(m.tagName):l?l.includes(m.tagName):!1;if(!T&&n&&typeof k=="number"&&(T=!n(m,k,C)),T&&C&&typeof k=="number")return c&&m.children?C.children.splice(k,1,...m.children):C.children.splice(k,1),k}}}function n3(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),o=e.indexOf("/");return t<0||o>-1&&t>o||n>-1&&t>n||r>-1&&t>r||Z5.test(e.slice(0,t))?e:""}function sm(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,o=n.indexOf(t);for(;o!==-1;)r++,o=n.indexOf(t,o+t.length);return r}function r3(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function o3(e,t,n){const o=Ka((n||{}).ignore||[]),i=i3(t);let l=-1;for(;++l<i.length;)a0(e,"text",a);function a(u,d){let c=-1,f;for(;++c<d.length;){const p=d[c],h=f?f.children:void 0;if(o(p,h?h.indexOf(p):void 0,f))return;f=p}if(f)return s(u,d)}function s(u,d){const c=d[d.length-1],f=i[l][0],p=i[l][1];let h=0;const v=c.children.indexOf(u);let g=!1,m=[];f.lastIndex=0;let k=f.exec(u.value);for(;k;){const C=k.index,T={index:k.index,input:k.input,stack:[...d,u]};let S=p(...k,T);if(typeof S=="string"&&(S=S.length>0?{type:"text",value:S}:void 0),S===!1?f.lastIndex=C+1:(h!==C&&m.push({type:"text",value:u.value.slice(h,C)}),Array.isArray(S)?m.push(...S):S&&m.push(S),h=C+k[0].length,g=!0),!f.global)break;k=f.exec(u.value)}return g?(h<u.value.length&&m.push({type:"text",value:u.value.slice(h)}),c.children.splice(v,1,...m)):m=[u],v+m.length}}function i3(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const o=n[r];t.push([l3(o[0]),a3(o[1])])}return t}function l3(e){return typeof e=="string"?new RegExp(r3(e),"g"):e}function a3(e){return typeof e=="function"?e:function(){return e}}const Bs="phrasing",Us=["autolink","link","image","label"];function s3(){return{transforms:[h3],enter:{literalAutolink:c3,literalAutolinkEmail:Hs,literalAutolinkHttp:Hs,literalAutolinkWww:Hs},exit:{literalAutolink:m3,literalAutolinkEmail:p3,literalAutolinkHttp:d3,literalAutolinkWww:f3}}}function u3(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Bs,notInConstruct:Us},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Bs,notInConstruct:Us},{character:":",before:"[ps]",after:"\\/",inConstruct:Bs,notInConstruct:Us}]}}function c3(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Hs(e){this.config.enter.autolinkProtocol.call(this,e)}function d3(e){this.config.exit.autolinkProtocol.call(this,e)}function f3(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function p3(e){this.config.exit.autolinkEmail.call(this,e)}function m3(e){this.exit(e)}function h3(e){o3(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,g3],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,y3]],{ignore:["link","linkReference"]})}function g3(e,t,n,r,o){let i="";if(!c0(o)||(/^w/i.test(t)&&(n=t+n,t="",i="http://"),!k3(n)))return!1;const l=w3(n+r);if(!l[0])return!1;const a={type:"link",title:null,url:i+t+l[0],children:[{type:"text",value:t+l[0]}]};return l[1]?[a,{type:"text",value:l[1]}]:a}function y3(e,t,n,r){return!c0(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function k3(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function w3(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const o=sm(e,"(");let i=sm(e,")");for(;r!==-1&&o>i;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),i++;return[e,n]}function c0(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||fr(n)||Ha(n))&&(!t||n!==47)}d0.peek=I3;function b3(){return{enter:{gfmFootnoteDefinition:x3,gfmFootnoteDefinitionLabelString:S3,gfmFootnoteCall:T3,gfmFootnoteCallString:P3},exit:{gfmFootnoteDefinition:E3,gfmFootnoteDefinitionLabelString:C3,gfmFootnoteCall:R3,gfmFootnoteCallString:_3}}}function v3(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:O3,footnoteReference:d0}}}function x3(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function S3(){this.buffer()}function C3(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function E3(e){this.exit(e)}function T3(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function P3(){this.buffer()}function _3(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.label=t,n.identifier=Gt(this.sliceSerialize(e)).toLowerCase()}function R3(e){this.exit(e)}function d0(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteReference"),a=n.enter("reference");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),l(),i+=o.move("]"),i}function I3(){return"["}function O3(e,t,n,r){const o=n.createTracker(r);let i=o.move("[^");const l=n.enter("footnoteDefinition"),a=n.enter("label");return i+=o.move(n.safe(n.associationId(e),{...o.current(),before:i,after:"]"})),a(),i+=o.move("]:"+(e.children&&e.children.length>0?" ":"")),o.shift(4),i+=o.move(n.indentLines(n.containerFlow(e,o.current()),A3)),l(),i}function A3(e,t,n){return t===0?e:(n?"":"    ")+e}const L3=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];f0.peek=N3;function z3(){return{canContainEols:["delete"],enter:{strikethrough:D3},exit:{strikethrough:F3}}}function M3(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:L3}],handlers:{delete:f0}}}function D3(e){this.enter({type:"delete",children:[]},e)}function F3(e){this.exit(e)}function f0(e,t,n,r){const o=n.createTracker(r),i=n.enter("strikethrough");let l=o.move("~~");return l+=n.containerPhrasing(e,{...o.current(),before:l,after:"~"}),l+=o.move("~~"),i(),l}function N3(){return"~"}function j3(e,t={}){const n=(t.align||[]).concat(),r=t.stringLength||B3,o=[],i=[],l=[],a=[];let s=0,u=-1;for(;++u<e.length;){const h=[],y=[];let v=-1;for(e[u].length>s&&(s=e[u].length);++v<e[u].length;){const g=$3(e[u][v]);if(t.alignDelimiters!==!1){const m=r(g);y[v]=m,(a[v]===void 0||m>a[v])&&(a[v]=m)}h.push(g)}i[u]=h,l[u]=y}let d=-1;if(typeof n=="object"&&"length"in n)for(;++d<s;)o[d]=um(n[d]);else{const h=um(n);for(;++d<s;)o[d]=h}d=-1;const c=[],f=[];for(;++d<s;){const h=o[d];let y="",v="";h===99?(y=":",v=":"):h===108?y=":":h===114&&(v=":");let g=t.alignDelimiters===!1?1:Math.max(1,a[d]-y.length-v.length);const m=y+"-".repeat(g)+v;t.alignDelimiters!==!1&&(g=y.length+g+v.length,g>a[d]&&(a[d]=g),f[d]=g),c[d]=m}i.splice(1,0,c),l.splice(1,0,f),u=-1;const p=[];for(;++u<i.length;){const h=i[u],y=l[u];d=-1;const v=[];for(;++d<s;){const g=h[d]||"";let m="",k="";if(t.alignDelimiters!==!1){const C=a[d]-(y[d]||0),T=o[d];T===114?m=" ".repeat(C):T===99?C%2?(m=" ".repeat(C/2+.5),k=" ".repeat(C/2-.5)):(m=" ".repeat(C/2),k=m):k=" ".repeat(C)}t.delimiterStart!==!1&&!d&&v.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&g==="")&&(t.delimiterStart!==!1||d)&&v.push(" "),t.alignDelimiters!==!1&&v.push(m),v.push(g),t.alignDelimiters!==!1&&v.push(k),t.padding!==!1&&v.push(" "),(t.delimiterEnd!==!1||d!==s-1)&&v.push("|")}p.push(t.delimiterEnd===!1?v.join("").replace(/ +$/,""):v.join(""))}return p.join(`
`)}function $3(e){return e==null?"":String(e)}function B3(e){return e.length}function um(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function U3(e,t,n,r){const o=n.enter("blockquote"),i=n.createTracker(r);i.move("> "),i.shift(2);const l=n.indentLines(n.containerFlow(e,i.current()),H3);return o(),l}function H3(e,t,n){return">"+(n?"":" ")+e}function V3(e,t){return cm(e,t.inConstruct,!0)&&!cm(e,t.notInConstruct,!1)}function cm(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function dm(e,t,n,r){let o=-1;for(;++o<n.unsafe.length;)if(n.unsafe[o].character===`
`&&V3(n.stack,n.unsafe[o]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function p0(e,t){const n=String(e);let r=n.indexOf(t),o=r,i=0,l=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===o?++i>l&&(l=i):i=1,o=r+t.length,r=n.indexOf(t,o);return l}function W3(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function K3(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Q3(e,t,n,r){const o=K3(n),i=e.value||"",l=o==="`"?"GraveAccent":"Tilde";if(W3(e,n)){const c=n.enter("codeIndented"),f=n.indentLines(i,q3);return c(),f}const a=n.createTracker(r),s=o.repeat(Math.max(p0(i,o)+1,3)),u=n.enter("codeFenced");let d=a.move(s);if(e.lang){const c=n.enter(`codeFencedLang${l}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),c()}if(e.lang&&e.meta){const c=n.enter(`codeFencedMeta${l}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),c()}return d+=a.move(`
`),i&&(d+=a.move(i+`
`)),d+=a.move(s),u(),d}function q3(e,t,n){return(n?"":"    ")+e}function zd(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function G3(e,t,n,r){const o=zd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("definition");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("[");return u+=s.move(n.safe(n.associationId(e),{before:u,after:"]",...s.current()})),u+=s.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),l(),u}function Y3(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}m0.peek=X3;function m0(e,t,n,r){const o=Y3(n),i=n.enter("emphasis"),l=n.createTracker(r);let a=l.move(o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o),i(),a}function X3(e,t,n){return n.options.emphasis||"*"}function J3(e,t){let n=!1;return Ad(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,oc}),!!((!e.depth||e.depth<3)&&Ed(e)&&(t.options.setext||n))}function Z3(e,t,n,r){const o=Math.max(Math.min(6,e.depth||1),1),i=n.createTracker(r);if(J3(e,n)){const d=n.enter("headingSetext"),c=n.enter("phrasing"),f=n.containerPhrasing(e,{...i.current(),before:`
`,after:`
`});return c(),d(),f+`
`+(o===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const l="#".repeat(o),a=n.enter("headingAtx"),s=n.enter("phrasing");i.move(l+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...i.current()});return/^[\t ]/.test(u)&&(u="&#x"+u.charCodeAt(0).toString(16).toUpperCase()+";"+u.slice(1)),u=u?l+" "+u:l,n.options.closeAtx&&(u+=" "+l),s(),a(),u}h0.peek=e4;function h0(e){return e.value||""}function e4(){return"<"}g0.peek=t4;function g0(e,t,n,r){const o=zd(n),i=o==='"'?"Quote":"Apostrophe",l=n.enter("image");let a=n.enter("label");const s=n.createTracker(r);let u=s.move("![");return u+=s.move(n.safe(e.alt,{before:u,after:"]",...s.current()})),u+=s.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),a(),e.title&&(a=n.enter(`title${i}`),u+=s.move(" "+o),u+=s.move(n.safe(e.title,{before:u,after:o,...s.current()})),u+=s.move(o),a()),u+=s.move(")"),l(),u}function t4(){return"!"}y0.peek=n4;function y0(e,t,n,r){const o=e.referenceType,i=n.enter("imageReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("![");const u=n.safe(e.alt,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function n4(){return"!"}k0.peek=r4;function k0(e,t,n){let r=e.value||"",o="`",i=-1;for(;new RegExp("(^|[^`])"+o+"([^`]|$)").test(r);)o+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++i<n.unsafe.length;){const l=n.unsafe[i],a=n.compilePattern(l);let s;if(l.atBreak)for(;s=a.exec(r);){let u=s.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(s.index+1)}}return o+r+o}function r4(){return"`"}function w0(e,t){const n=Ed(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}b0.peek=o4;function b0(e,t,n,r){const o=zd(n),i=o==='"'?"Quote":"Apostrophe",l=n.createTracker(r);let a,s;if(w0(e,n)){const d=n.stack;n.stack=[],a=n.enter("autolink");let c=l.move("<");return c+=l.move(n.containerPhrasing(e,{before:c,after:">",...l.current()})),c+=l.move(">"),a(),n.stack=d,c}a=n.enter("link"),s=n.enter("label");let u=l.move("[");return u+=l.move(n.containerPhrasing(e,{before:u,after:"](",...l.current()})),u+=l.move("]("),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(n.safe(e.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(s=n.enter("destinationRaw"),u+=l.move(n.safe(e.url,{before:u,after:e.title?" ":")",...l.current()}))),s(),e.title&&(s=n.enter(`title${i}`),u+=l.move(" "+o),u+=l.move(n.safe(e.title,{before:u,after:o,...l.current()})),u+=l.move(o),s()),u+=l.move(")"),a(),u}function o4(e,t,n){return w0(e,n)?"<":"["}v0.peek=i4;function v0(e,t,n,r){const o=e.referenceType,i=n.enter("linkReference");let l=n.enter("label");const a=n.createTracker(r);let s=a.move("[");const u=n.containerPhrasing(e,{before:s,after:"]",...a.current()});s+=a.move(u+"]["),l();const d=n.stack;n.stack=[],l=n.enter("reference");const c=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,i(),o==="full"||!u||u!==c?s+=a.move(c+"]"):o==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function i4(){return"["}function Md(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function l4(e){const t=Md(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function a4(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function x0(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function s4(e,t,n,r){const o=n.enter("list"),i=n.bulletCurrent;let l=e.ordered?a4(n):Md(n);const a=e.ordered?l==="."?")":".":l4(n);let s=t&&n.bulletLastUsed?l===n.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((l==="*"||l==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(s=!0),x0(n)===l&&d){let c=-1;for(;++c<e.children.length;){const f=e.children[c];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){s=!0;break}}}}s&&(l=a),n.bulletCurrent=l;const u=n.containerFlow(e,r);return n.bulletLastUsed=l,n.bulletCurrent=i,o(),u}function u4(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function c4(e,t,n,r){const o=u4(n);let i=n.bulletCurrent||Md(n);t&&t.type==="list"&&t.ordered&&(i=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+i);let l=i.length+1;(o==="tab"||o==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(l=Math.ceil(l/4)*4);const a=n.createTracker(r);a.move(i+" ".repeat(l-i.length)),a.shift(l);const s=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,a.current()),d);return s(),u;function d(c,f,p){return f?(p?"":" ".repeat(l))+c:(p?i:i+" ".repeat(l-i.length))+c}}function d4(e,t,n,r){const o=n.enter("paragraph"),i=n.enter("phrasing"),l=n.containerPhrasing(e,r);return i(),o(),l}const f4=Ka(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","link","linkReference","strong","text"]);function p4(e,t,n,r){return(e.children.some(function(l){return f4(l)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function m4(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}S0.peek=h4;function S0(e,t,n,r){const o=m4(n),i=n.enter("strong"),l=n.createTracker(r);let a=l.move(o+o);return a+=l.move(n.containerPhrasing(e,{before:a,after:o,...l.current()})),a+=l.move(o+o),i(),a}function h4(e,t,n){return n.options.strong||"*"}function g4(e,t,n,r){return n.safe(e.value,r)}function y4(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function k4(e,t,n){const r=(x0(n)+(n.options.ruleSpaces?" ":"")).repeat(y4(n));return n.options.ruleSpaces?r.slice(0,-1):r}const C0={blockquote:U3,break:dm,code:Q3,definition:G3,emphasis:m0,hardBreak:dm,heading:Z3,html:h0,image:g0,imageReference:y0,inlineCode:k0,link:b0,linkReference:v0,list:s4,listItem:c4,paragraph:d4,root:p4,strong:S0,text:g4,thematicBreak:k4};function w4(){return{enter:{table:b4,tableData:fm,tableHeader:fm,tableRow:x4},exit:{codeText:S4,table:v4,tableData:Vs,tableHeader:Vs,tableRow:Vs}}}function b4(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function v4(e){this.exit(e),this.data.inTable=void 0}function x4(e){this.enter({type:"tableRow",children:[]},e)}function Vs(e){this.exit(e)}function fm(e){this.enter({type:"tableCell",children:[]},e)}function S4(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,C4));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function C4(e,t){return t==="|"?t:e}function E4(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,o=t.stringLength,i=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:l,tableCell:s,tableRow:a}};function l(p,h,y,v){return u(d(p,y,v),p.align)}function a(p,h,y,v){const g=c(p,y,v),m=u([g]);return m.slice(0,m.indexOf(`
`))}function s(p,h,y,v){const g=y.enter("tableCell"),m=y.enter("phrasing"),k=y.containerPhrasing(p,{...v,before:i,after:i});return m(),g(),k}function u(p,h){return j3(p,{align:h,alignDelimiters:r,padding:n,stringLength:o})}function d(p,h,y){const v=p.children;let g=-1;const m=[],k=h.enter("table");for(;++g<v.length;)m[g]=c(v[g],h,y);return k(),m}function c(p,h,y){const v=p.children;let g=-1;const m=[],k=h.enter("tableRow");for(;++g<v.length;)m[g]=s(v[g],p,h,y);return k(),m}function f(p,h,y){let v=C0.inlineCode(p,h,y);return y.stack.includes("tableCell")&&(v=v.replace(/\|/g,"\\$&")),v}}function T4(){return{exit:{taskListCheckValueChecked:pm,taskListCheckValueUnchecked:pm,paragraph:_4}}}function P4(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:R4}}}function pm(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function _4(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const o=t.children;let i=-1,l;for(;++i<o.length;){const a=o[i];if(a.type==="paragraph"){l=a;break}}l===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function R4(e,t,n,r){const o=e.children[0],i=typeof e.checked=="boolean"&&o&&o.type==="paragraph",l="["+(e.checked?"x":" ")+"] ",a=n.createTracker(r);i&&a.move(l);let s=C0.listItem(e,t,n,{...r,...a.current()});return i&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),s;function u(d){return d+l}}function I4(){return[s3(),b3(),z3(),w4(),T4()]}function O4(e){return{extensions:[u3(),v3(),M3(),E4(e),P4()]}}const A4={tokenize:N4,partial:!0},E0={tokenize:j4,partial:!0},T0={tokenize:$4,partial:!0},P0={tokenize:B4,partial:!0},L4={tokenize:U4,partial:!0},_0={tokenize:D4,previous:I0},R0={tokenize:F4,previous:O0},Sn={tokenize:M4,previous:A0},an={};function z4(){return{text:an}}let Jn=48;for(;Jn<123;)an[Jn]=Sn,Jn++,Jn===58?Jn=65:Jn===91&&(Jn=97);an[43]=Sn;an[45]=Sn;an[46]=Sn;an[95]=Sn;an[72]=[Sn,R0];an[104]=[Sn,R0];an[87]=[Sn,_0];an[119]=[Sn,_0];function M4(e,t,n){const r=this;let o,i;return l;function l(c){return!sc(c)||!A0.call(r,r.previous)||Dd(r.events)?n(c):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(c))}function a(c){return sc(c)?(e.consume(c),a):c===64?(e.consume(c),s):n(c)}function s(c){return c===46?e.check(L4,d,u)(c):c===45||c===95||Xe(c)?(i=!0,e.consume(c),s):d(c)}function u(c){return e.consume(c),o=!0,s}function d(c){return i&&o&&tt(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(c)):n(c)}}function D4(e,t,n){const r=this;return o;function o(l){return l!==87&&l!==119||!I0.call(r,r.previous)||Dd(r.events)?n(l):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(A4,e.attempt(E0,e.attempt(T0,i),n),n)(l))}function i(l){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(l)}}function F4(e,t,n){const r=this;let o="",i=!1;return l;function l(c){return(c===72||c===104)&&O0.call(r,r.previous)&&!Dd(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),o+=String.fromCodePoint(c),e.consume(c),a):n(c)}function a(c){if(tt(c)&&o.length<5)return o+=String.fromCodePoint(c),e.consume(c),a;if(c===58){const f=o.toLowerCase();if(f==="http"||f==="https")return e.consume(c),s}return n(c)}function s(c){return c===47?(e.consume(c),i?u:(i=!0,s)):n(c)}function u(c){return c===null||Zl(c)||pe(c)||fr(c)||Ha(c)?n(c):e.attempt(E0,e.attempt(T0,d),n)(c)}function d(c){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(c)}}function N4(e,t,n){let r=0;return o;function o(l){return(l===87||l===119)&&r<3?(r++,e.consume(l),o):l===46&&r===3?(e.consume(l),i):n(l)}function i(l){return l===null?n(l):t(l)}}function j4(e,t,n){let r,o,i;return l;function l(u){return u===46||u===95?e.check(P0,s,a)(u):u===null||pe(u)||fr(u)||u!==45&&Ha(u)?s(u):(i=!0,e.consume(u),l)}function a(u){return u===95?r=!0:(o=r,r=void 0),e.consume(u),l}function s(u){return o||r||!i?n(u):t(u)}}function $4(e,t){let n=0,r=0;return o;function o(l){return l===40?(n++,e.consume(l),o):l===41&&r<n?i(l):l===33||l===34||l===38||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===60||l===63||l===93||l===95||l===126?e.check(P0,t,i)(l):l===null||pe(l)||fr(l)?t(l):(e.consume(l),o)}function i(l){return l===41&&r++,e.consume(l),o}}function B4(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),i):a===93?(e.consume(a),o):a===60||a===null||pe(a)||fr(a)?t(a):n(a)}function o(a){return a===null||a===40||a===91||pe(a)||fr(a)?t(a):r(a)}function i(a){return tt(a)?l(a):n(a)}function l(a){return a===59?(e.consume(a),r):tt(a)?(e.consume(a),l):n(a)}}function U4(e,t,n){return r;function r(i){return e.consume(i),o}function o(i){return Xe(i)?n(i):t(i)}}function I0(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||pe(e)}function O0(e){return!tt(e)}function A0(e){return!(e===47||sc(e))}function sc(e){return e===43||e===45||e===46||e===95||Xe(e)}function Dd(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const H4={tokenize:X4,partial:!0};function V4(){return{document:{91:{tokenize:q4,continuation:{tokenize:G4},exit:Y4}},text:{91:{tokenize:Q4},93:{add:"after",tokenize:W4,resolveTo:K4}}}}function W4(e,t,n){const r=this;let o=r.events.length;const i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let l;for(;o--;){const s=r.events[o][1];if(s.type==="labelImage"){l=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!l||!l._balanced)return n(s);const u=Gt(r.sliceSerialize({start:l.end,end:r.now()}));return u.codePointAt(0)!==94||!i.includes(u.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function K4(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},o={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};o.end.column++,o.end.offset++,o.end._bufferIndex++;const i={type:"gfmFootnoteCallString",start:Object.assign({},o.end),end:Object.assign({},e[e.length-1][1].start)},l={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",o,t],["exit",o,t],["enter",i,t],["enter",l,t],["exit",l,t],["exit",i,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function Q4(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i=0,l;return a;function a(c){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),s}function s(c){return c!==94?n(c):(e.enter("gfmFootnoteCallMarker"),e.consume(c),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(c){if(i>999||c===93&&!l||c===null||c===91||pe(c))return n(c);if(c===93){e.exit("chunkString");const f=e.exit("gfmFootnoteCallString");return o.includes(Gt(r.sliceSerialize(f)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(c)}return pe(c)||(l=!0),i++,e.consume(c),c===92?d:u}function d(c){return c===91||c===92||c===93?(e.consume(c),i++,u):u(c)}}function q4(e,t,n){const r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let i,l=0,a;return s;function s(h){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(h){return h===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(h)}function d(h){if(l>999||h===93&&!a||h===null||h===91||pe(h))return n(h);if(h===93){e.exit("chunkString");const y=e.exit("gfmFootnoteDefinitionLabelString");return i=Gt(r.sliceSerialize(y)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(h),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),f}return pe(h)||(a=!0),l++,e.consume(h),h===92?c:d}function c(h){return h===91||h===92||h===93?(e.consume(h),l++,d):d(h)}function f(h){return h===58?(e.enter("definitionMarker"),e.consume(h),e.exit("definitionMarker"),o.includes(i)||o.push(i),J(e,p,"gfmFootnoteDefinitionWhitespace")):n(h)}function p(h){return t(h)}}function G4(e,t,n){return e.check(Pi,t,e.attempt(H4,t,n))}function Y4(e){e.exit("gfmFootnoteDefinition")}function X4(e,t,n){const r=this;return J(e,o,"gfmFootnoteDefinitionIndent",5);function o(i){const l=r.events[r.events.length-1];return l&&l[1].type==="gfmFootnoteDefinitionIndent"&&l[2].sliceSerialize(l[1],!0).length===4?t(i):n(i)}}function J4(e){let n=(e||{}).singleTilde;const r={tokenize:i,resolveAll:o};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function o(l,a){let s=-1;for(;++s<l.length;)if(l[s][0]==="enter"&&l[s][1].type==="strikethroughSequenceTemporary"&&l[s][1]._close){let u=s;for(;u--;)if(l[u][0]==="exit"&&l[u][1].type==="strikethroughSequenceTemporary"&&l[u][1]._open&&l[s][1].end.offset-l[s][1].start.offset===l[u][1].end.offset-l[u][1].start.offset){l[s][1].type="strikethroughSequence",l[u][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},l[u][1].start),end:Object.assign({},l[s][1].end)},c={type:"strikethroughText",start:Object.assign({},l[u][1].end),end:Object.assign({},l[s][1].start)},f=[["enter",d,a],["enter",l[u][1],a],["exit",l[u][1],a],["enter",c,a]],p=a.parser.constructs.insideSpan.null;p&&St(f,f.length,0,Va(p,l.slice(u+1,s),a)),St(f,f.length,0,[["exit",c,a],["enter",l[s][1],a],["exit",l[s][1],a],["exit",d,a]]),St(l,u-1,s-u+3,f),s=u+f.length-2;break}}for(s=-1;++s<l.length;)l[s][1].type==="strikethroughSequenceTemporary"&&(l[s][1].type="data");return l}function i(l,a,s){const u=this.previous,d=this.events;let c=0;return f;function f(h){return u===126&&d[d.length-1][1].type!=="characterEscape"?s(h):(l.enter("strikethroughSequenceTemporary"),p(h))}function p(h){const y=ea(u);if(h===126)return c>1?s(h):(l.consume(h),c++,p);if(c<2&&!n)return s(h);const v=l.exit("strikethroughSequenceTemporary"),g=ea(h);return v._open=!g||g===2&&!!y,v._close=!y||y===2&&!!g,a(h)}}}class Z4{constructor(){this.map=[]}add(t,n,r){eT(this,t,n,r)}consume(t){if(this.map.sort(function(i,l){return i[0]-l[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push([...t]),t.length=0;let o=r.pop();for(;o;)t.push(...o),o=r.pop();this.map.length=0}}function eT(e,t,n,r){let o=0;if(!(n===0&&r.length===0)){for(;o<e.map.length;){if(e.map[o][0]===t){e.map[o][1]+=n,e.map[o][2].push(...r);return}o+=1}e.map.push([t,n,r])}}function tT(e,t){let n=!1;const r=[];for(;t<e.length;){const o=e[t];if(n){if(o[0]==="enter")o[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(o[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const i=r.length-1;r[i]=r[i]==="left"?"center":"right"}}else if(o[1].type==="tableDelimiterRow")break}else o[0]==="enter"&&o[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function nT(){return{flow:{null:{tokenize:rT,resolveAll:oT}}}}function rT(e,t,n){const r=this;let o=0,i=0,l;return a;function a(b){let O=r.events.length-1;for(;O>-1;){const W=r.events[O][1].type;if(W==="lineEnding"||W==="linePrefix")O--;else break}const L=O>-1?r.events[O][1].type:null,B=L==="tableHead"||L==="tableRow"?S:s;return B===S&&r.parser.lazy[r.now().line]?n(b):B(b)}function s(b){return e.enter("tableHead"),e.enter("tableRow"),u(b)}function u(b){return b===124||(l=!0,i+=1),d(b)}function d(b){return b===null?n(b):V(b)?i>1?(i=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),p):n(b):Z(b)?J(e,d,"whitespace")(b):(i+=1,l&&(l=!1,o+=1),b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),l=!0,d):(e.enter("data"),c(b)))}function c(b){return b===null||b===124||pe(b)?(e.exit("data"),d(b)):(e.consume(b),b===92?f:c)}function f(b){return b===92||b===124?(e.consume(b),c):c(b)}function p(b){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(b):(e.enter("tableDelimiterRow"),l=!1,Z(b)?J(e,h,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(b):h(b))}function h(b){return b===45||b===58?v(b):b===124?(l=!0,e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),y):T(b)}function y(b){return Z(b)?J(e,v,"whitespace")(b):v(b)}function v(b){return b===58?(i+=1,l=!0,e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),g):b===45?(i+=1,g(b)):b===null||V(b)?C(b):T(b)}function g(b){return b===45?(e.enter("tableDelimiterFiller"),m(b)):T(b)}function m(b){return b===45?(e.consume(b),m):b===58?(l=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),k):(e.exit("tableDelimiterFiller"),k(b))}function k(b){return Z(b)?J(e,C,"whitespace")(b):C(b)}function C(b){return b===124?h(b):b===null||V(b)?!l||o!==i?T(b):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(b)):T(b)}function T(b){return n(b)}function S(b){return e.enter("tableRow"),E(b)}function E(b){return b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),E):b===null||V(b)?(e.exit("tableRow"),t(b)):Z(b)?J(e,E,"whitespace")(b):(e.enter("data"),P(b))}function P(b){return b===null||b===124||pe(b)?(e.exit("data"),E(b)):(e.consume(b),b===92?M:P)}function M(b){return b===92||b===124?(e.consume(b),P):P(b)}}function oT(e,t){let n=-1,r=!0,o=0,i=[0,0,0,0],l=[0,0,0,0],a=!1,s=0,u,d,c;const f=new Z4;for(;++n<e.length;){const p=e[n],h=p[1];p[0]==="enter"?h.type==="tableHead"?(a=!1,s!==0&&(mm(f,t,s,u,d),d=void 0,s=0),u={type:"table",start:Object.assign({},h.start),end:Object.assign({},h.end)},f.add(n,0,[["enter",u,t]])):h.type==="tableRow"||h.type==="tableDelimiterRow"?(r=!0,c=void 0,i=[0,0,0,0],l=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},h.start),end:Object.assign({},h.end)},f.add(n,0,[["enter",d,t]])),o=h.type==="tableDelimiterRow"?2:d?3:1):o&&(h.type==="data"||h.type==="tableDelimiterMarker"||h.type==="tableDelimiterFiller")?(r=!1,l[2]===0&&(i[1]!==0&&(l[0]=l[1],c=rl(f,t,i,o,void 0,c),i=[0,0,0,0]),l[2]=n)):h.type==="tableCellDivider"&&(r?r=!1:(i[1]!==0&&(l[0]=l[1],c=rl(f,t,i,o,void 0,c)),i=l,l=[i[1],n,0,0])):h.type==="tableHead"?(a=!0,s=n):h.type==="tableRow"||h.type==="tableDelimiterRow"?(s=n,i[1]!==0?(l[0]=l[1],c=rl(f,t,i,o,n,c)):l[1]!==0&&(c=rl(f,t,l,o,n,c)),o=0):o&&(h.type==="data"||h.type==="tableDelimiterMarker"||h.type==="tableDelimiterFiller")&&(l[3]=n)}for(s!==0&&mm(f,t,s,u,d),f.consume(t.events),n=-1;++n<t.events.length;){const p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=tT(t.events,n))}return e}function rl(e,t,n,r,o,i){const l=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(i.end=Object.assign({},xr(t.events,n[0])),e.add(n[0],0,[["exit",i,t]]));const s=xr(t.events,n[1]);if(i={type:l,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",i,t]]),n[2]!==0){const u=xr(t.events,n[2]),d=xr(t.events,n[3]),c={type:a,start:Object.assign({},u),end:Object.assign({},d)};if(e.add(n[2],0,[["enter",c,t]]),r!==2){const f=t.events[n[2]],p=t.events[n[3]];if(f[1].end=Object.assign({},p[1].end),f[1].type="chunkText",f[1].contentType="text",n[3]>n[2]+1){const h=n[2]+1,y=n[3]-n[2]-1;e.add(h,y,[])}}e.add(n[3]+1,0,[["exit",c,t]])}return o!==void 0&&(i.end=Object.assign({},xr(t.events,o)),e.add(o,0,[["exit",i,t]]),i=void 0),i}function mm(e,t,n,r,o){const i=[],l=xr(t.events,n);o&&(o.end=Object.assign({},l),i.push(["exit",o,t])),r.end=Object.assign({},l),i.push(["exit",r,t]),e.add(n+1,0,i)}function xr(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const iT={tokenize:aT};function lT(){return{text:{91:iT}}}function aT(e,t,n){const r=this;return o;function o(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),i)}function i(s){return pe(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),l):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),l):n(s)}function l(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return V(s)?t(s):Z(s)?e.check({tokenize:sT},t,n)(s):n(s)}}function sT(e,t,n){return J(e,r,"whitespace");function r(o){return o===null?n(o):t(o)}}function uT(e){return Uy([z4(),V4(),J4(e),nT(),lT()])}const cT={};function dT(e){const t=this,n=e||cT,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(uT(n)),i.push(I4()),l.push(O4(n))}function fT(){return{enter:{mathFlow:e,mathFlowFenceMeta:t,mathText:i},exit:{mathFlow:o,mathFlowFence:r,mathFlowFenceMeta:n,mathFlowValue:a,mathText:l,mathTextData:a}};function e(s){const u={type:"element",tagName:"code",properties:{className:["language-math","math-display"]},children:[]};this.enter({type:"math",meta:null,value:"",data:{hName:"pre",hChildren:[u]}},s)}function t(){this.buffer()}function n(){const s=this.resume(),u=this.stack[this.stack.length-1];u.type,u.meta=s}function r(){this.data.mathFlowInside||(this.buffer(),this.data.mathFlowInside=!0)}function o(s){const u=this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u;const c=d.data.hChildren[0];c.type,c.tagName,c.children.push({type:"text",value:u}),this.data.mathFlowInside=void 0}function i(s){this.enter({type:"inlineMath",value:"",data:{hName:"code",hProperties:{className:["language-math","math-inline"]},hChildren:[]}},s),this.buffer()}function l(s){const u=this.resume(),d=this.stack[this.stack.length-1];d.type,this.exit(s),d.value=u,d.data.hChildren.push({type:"text",value:u})}function a(s){this.config.enter.data.call(this,s),this.config.exit.data.call(this,s)}}function pT(e){let t=(e||{}).singleDollarTextMath;return t==null&&(t=!0),r.peek=o,{unsafe:[{character:"\r",inConstruct:"mathFlowMeta"},{character:`
`,inConstruct:"mathFlowMeta"},{character:"$",after:t?void 0:"\\$",inConstruct:"phrasing"},{character:"$",inConstruct:"mathFlowMeta"},{atBreak:!0,character:"$",after:"\\$"}],handlers:{math:n,inlineMath:r}};function n(i,l,a,s){const u=i.value||"",d=a.createTracker(s),c="$".repeat(Math.max(p0(u,"$")+1,2)),f=a.enter("mathFlow");let p=d.move(c);if(i.meta){const h=a.enter("mathFlowMeta");p+=d.move(a.safe(i.meta,{after:`
`,before:p,encode:["$"],...d.current()})),h()}return p+=d.move(`
`),u&&(p+=d.move(u+`
`)),p+=d.move(c),f(),p}function r(i,l,a){let s=i.value||"",u=1;for(t||u++;new RegExp("(^|[^$])"+"\\$".repeat(u)+"([^$]|$)").test(s);)u++;const d="$".repeat(u);/[^ \r\n]/.test(s)&&(/^[ \r\n]/.test(s)&&/[ \r\n]$/.test(s)||/^\$|\$$/.test(s))&&(s=" "+s+" ");let c=-1;for(;++c<a.unsafe.length;){const f=a.unsafe[c];if(!f.atBreak)continue;const p=a.compilePattern(f);let h;for(;h=p.exec(s);){let y=h.index;s.codePointAt(y)===10&&s.codePointAt(y-1)===13&&y--,s=s.slice(0,y)+" "+s.slice(h.index+1)}}return d+s+d}function o(){return"$"}}const mT={tokenize:hT,concrete:!0},hm={tokenize:gT,partial:!0};function hT(e,t,n){const r=this,o=r.events[r.events.length-1],i=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0;let l=0;return a;function a(m){return e.enter("mathFlow"),e.enter("mathFlowFence"),e.enter("mathFlowFenceSequence"),s(m)}function s(m){return m===36?(e.consume(m),l++,s):l<2?n(m):(e.exit("mathFlowFenceSequence"),J(e,u,"whitespace")(m))}function u(m){return m===null||V(m)?c(m):(e.enter("mathFlowFenceMeta"),e.enter("chunkString",{contentType:"string"}),d(m))}function d(m){return m===null||V(m)?(e.exit("chunkString"),e.exit("mathFlowFenceMeta"),c(m)):m===36?n(m):(e.consume(m),d)}function c(m){return e.exit("mathFlowFence"),r.interrupt?t(m):e.attempt(hm,f,v)(m)}function f(m){return e.attempt({tokenize:g,partial:!0},v,p)(m)}function p(m){return(i?J(e,h,"linePrefix",i+1):h)(m)}function h(m){return m===null?v(m):V(m)?e.attempt(hm,f,v)(m):(e.enter("mathFlowValue"),y(m))}function y(m){return m===null||V(m)?(e.exit("mathFlowValue"),h(m)):(e.consume(m),y)}function v(m){return e.exit("mathFlow"),t(m)}function g(m,k,C){let T=0;return J(m,S,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4);function S(M){return m.enter("mathFlowFence"),m.enter("mathFlowFenceSequence"),E(M)}function E(M){return M===36?(T++,m.consume(M),E):T<l?C(M):(m.exit("mathFlowFenceSequence"),J(m,P,"whitespace")(M))}function P(M){return M===null||V(M)?(m.exit("mathFlowFence"),k(M)):C(M)}}}function gT(e,t,n){const r=this;return o;function o(l){return l===null?t(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),i)}function i(l){return r.parser.lazy[r.now().line]?n(l):t(l)}}function yT(e){let n=(e||{}).singleDollarTextMath;return n==null&&(n=!0),{tokenize:r,resolve:kT,previous:wT};function r(o,i,l){let a=0,s,u;return d;function d(y){return o.enter("mathText"),o.enter("mathTextSequence"),c(y)}function c(y){return y===36?(o.consume(y),a++,c):a<2&&!n?l(y):(o.exit("mathTextSequence"),f(y))}function f(y){return y===null?l(y):y===36?(u=o.enter("mathTextSequence"),s=0,h(y)):y===32?(o.enter("space"),o.consume(y),o.exit("space"),f):V(y)?(o.enter("lineEnding"),o.consume(y),o.exit("lineEnding"),f):(o.enter("mathTextData"),p(y))}function p(y){return y===null||y===32||y===36||V(y)?(o.exit("mathTextData"),f(y)):(o.consume(y),p)}function h(y){return y===36?(o.consume(y),s++,h):s===a?(o.exit("mathTextSequence"),o.exit("mathText"),i(y)):(u.type="mathTextData",p(y))}}}function kT(e){let t=e.length-4,n=3,r,o;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="mathTextData"){e[t][1].type="mathTextPadding",e[n][1].type="mathTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)o===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(o=r):(r===t||e[r][1].type==="lineEnding")&&(e[o][1].type="mathTextData",r!==o+2&&(e[o][1].end=e[r-1][1].end,e.splice(o+2,r-o-2),t-=r-o-2,r=o+2),o=void 0);return e}function wT(e){return e!==36||this.events[this.events.length-1][1].type==="characterEscape"}function bT(e){return{flow:{36:mT},text:{36:yT(e)}}}const vT={};function xT(e){const t=this,n=e||vT,r=t.data(),o=r.micromarkExtensions||(r.micromarkExtensions=[]),i=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),l=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);o.push(bT(n)),i.push(fT()),l.push(pT(n))}const ST=R.memo(t3,(e,t)=>e.children===t.children&&e.className===t.className),CT=e=>N.jsx(N.Fragment,{children:N.jsx(ST,{className:"markdown-body",remarkPlugins:[dT,xT],components:{a(t){return N.jsx("a",{...t,target:"_blank",rel:"noopener noreferrer",children:t.children})}},children:e.children})}),ET=ve({"hljs-comment":{color:"#696969"},"hljs-quote":{color:"#696969"},"hljs-variable":{color:"#d91e18"},"hljs-template-variable":{color:"#d91e18"},"hljs-tag":{color:"#d91e18"},"hljs-name":{color:"#d91e18"},"hljs-selector-id":{color:"#d91e18"},"hljs-selector-class":{color:"#d91e18"},"hljs-regexp":{color:"#d91e18"},"hljs-deletion":{color:"#d91e18"},"hljs-number":{color:"#aa5d00"},"hljs-built_in":{color:"#aa5d00"},"hljs-builtin-name":{color:"#aa5d00"},"hljs-literal":{color:"#aa5d00"},"hljs-type":{color:"#aa5d00"},"hljs-params":{color:"#aa5d00"},"hljs-meta":{color:"#aa5d00"},"hljs-link":{color:"#aa5d00"},"hljs-attribute":{color:"#aa5d00"},"hljs-string":{color:"#008000"},"hljs-symbol":{color:"#008000"},"hljs-bullet":{color:"#008000"},"hljs-addition":{color:"#008000"},"hljs-title":{color:"#007faa"},"hljs-section":{color:"#007faa"},"hljs-keyword":{color:"#7928a1"},"hljs-selector-tag":{color:"#7928a1"},hljs:{display:"block",overflowX:"auto",background:"#fefefe",color:"#545454",padding:"0.5em"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"}}),TT=ve({"& .hljs-comment":{color:"#d4d0ab"},"& .hljs-quote":{color:"#d4d0ab"},"& .hljs-variable":{color:"#ffa07a"},"& .hljs-template-variable":{color:"#ffa07a"},"& .hljs-tag":{color:"#ffa07a"},"& .hljs-name":{color:"#ffa07a"},"& .hljs-selector-id":{color:"#ffa07a"},"& .hljs-selector-class":{color:"#ffa07a"},"& .hljs-regexp":{color:"#ffa07a"},"& .hljs-deletion":{color:"#ffa07a"},"& .hljs-number":{color:"#f5ab35"},"& .hljs-built_in":{color:"#f5ab35"},"& .hljs-builtin-name":{color:"#f5ab35"},"& .hljs-literal":{color:"#f5ab35"},"& .hljs-type":{color:"#f5ab35"},"& .hljs-params":{color:"#f5ab35"},"& .hljs-meta":{color:"#f5ab35"},"& .hljs-link":{color:"#f5ab35"},"& .hljs-attribute":{color:"#ffd700"},"& .hljs-string":{color:"#abe338"},"& .hljs-symbol":{color:"#abe338"},"& .hljs-bullet":{color:"#abe338"},"& .hljs-addition":{color:"#abe338"},"& .hljs-title":{color:"#00e0e0"},"& .hljs-section":{color:"#00e0e0"},"& .hljs-keyword":{color:"#dcc6e0"},"& .hljs-selector":{color:"#dcc6e0"},"& .hljs-selector-tag":{color:"#dcc6e0"},"& .hljs":{display:"block",overflowX:"auto",background:"#2b2b2b",color:"#f8f8f2",padding:"0.5em"},"& .hljs-emphasis":{fontStyle:"italic"},"& .hljs-strong":{fontWeight:"bold"}});function PT(e){const{role:t="user",children:n,className:r,Action:o}=e;return N.jsx(L0,{role:t,className:r+"-Item",sx:e.wrapperSx,children:N.jsxs(z0,{role:t,className:r+"-Item-Content",sx:{width:"fill-available",...e.contentSx},children:[N.jsx(CT,{children:n}),o]})})}function _T(){return N.jsx(L0,{role:"bot",sx:{borderBottom:"none"},children:N.jsxs(z0,{role:"bot",children:[N.jsx(IT,{children:"Gathering Resources..."}),N.jsx(OT,{})]})})}function RT(e){const{items:t,appendText:n}=e;return N.jsxs(LT,{children:[N.jsx("h3",{children:"Example Questions"}),t.map((r,o)=>N.jsx(AT,{onClick:()=>{n(r)},children:r},o))]})}const L0=Ie("div")(({theme:e,role:t})=>ve({display:"flex",alignItems:"flex-end",paddingBottom:"0.5rem",marginBottom:t==="bot"?"1rem":"0.5rem",borderBottom:t==="bot"?"1px solid":"none",borderBottomColor:e.palette.muted})),z0=Ie("div")(({theme:e,role:t})=>ve({display:"flex",flexDirection:"column",gapY:"0.5rem",lineHeight:"1.5rem",marginX:"0.5rem",fontSize:t==="bot"?"1rem":"1.25rem",fontWeight:t==="bot"?400:700,width:"100%","& *":{...e.palette.mode==="dark"?TT:ET},"&> p":{margin:0}})),IT=Ie("div")(({theme:e})=>ve({display:"block",fontSize:"12px",color:e.palette.mutedForeground,"& > a":{color:"inherit"}})),OT=Ie("div")(({theme:e})=>ve({backgroundColor:e.palette.muted,color:e.palette.primary,borderRadius:e.shape.borderRadius,padding:"0.5rem 0.75rem",display:"inline-block",animation:"animation-breath 1.5s infinite","@keyframes animation-breath":{"0%":{opacity:1},"50%":{opacity:.4},"100%":{opacity:1}}})),AT=Ie("div")(({theme:e})=>ve({width:"100%",display:"inline-flex",fontFamily:"'IBM Plex Sans', sans-serif",fontWeight:600,fontSize:"0.875rem",lineHeight:1.5,backgroundColor:e.palette.muted,padding:"8px 16px",borderRadius:"8px",color:e.palette.primary,transition:"all 150ms ease",cursor:"pointer",border:`2px solid ${e.shape.borderRadius}`,"&:hover":{borderColor:e.palette.ring}})),LT=Ie("div")(()=>ve({width:"100%",display:"flex",gap:"0.5rem",flexWrap:"wrap","& h3":{width:"100%",fontSize:"1rem",lineHeight:"1.5rem",fontWeight:700,margin:0}}));var zT=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||n.forEach(function(o){e.addRange(o)}),t&&t.focus()}},MT=zT,gm={"text/plain":"Text","text/html":"Url",default:"Text"},DT="Copy to clipboard: #{key}, Enter";function FT(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function NT(e,t){var n,r,o,i,l,a,s=!1;t||(t={}),n=t.debug||!1;try{o=MT(),i=document.createRange(),l=document.getSelection(),a=document.createElement("span"),a.textContent=e,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(d){if(d.stopPropagation(),t.format)if(d.preventDefault(),typeof d.clipboardData>"u"){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var c=gm[t.format]||gm.default;window.clipboardData.setData(c,e)}else d.clipboardData.clearData(),d.clipboardData.setData(t.format,e);t.onCopy&&(d.preventDefault(),t.onCopy(d.clipboardData))}),document.body.appendChild(a),i.selectNodeContents(a),l.addRange(i);var u=document.execCommand("copy");if(!u)throw new Error("copy command was unsuccessful");s=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),s=!0}catch(c){n&&console.error("unable to copy using clipboardData: ",c),n&&console.error("falling back to prompt"),r=FT("message"in t?t.message:DT),window.prompt(r,e)}}finally{l&&(typeof l.removeRange=="function"?l.removeRange(i):l.removeAllRanges()),a&&document.body.removeChild(a),o()}return s}var jT=NT;const $T=oa(jT),yr=Ie("svg")(()=>ve({})),BT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",...e,children:N.jsx("path",{fillRule:"evenodd",d:"M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z",clipRule:"evenodd"})}),UT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"})}),HT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"})}),VT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"})}),WT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"})}),KT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"})}),QT=e=>N.jsx(yr,{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",...e,children:N.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})});function qT(e){const{handleStop:t,className:n}=e;return N.jsx(M0,{className:n,children:N.jsxs(fy,{onClick:t,className:n+"-Stop",sx:{padding:"0.5rem",border:0},children:[N.jsx(BT,{className:n+"-Stop-Icon",sx:{width:"1rem",height:"1rem",marginRight:"0.25rem"}}),"Stop Generating"]})})}function GT(e){const{className:t,handleReload:n,content:r}=e,[o,i]=R.useState(!1);return R.useEffect(()=>{if(o){const l=setTimeout(()=>{i(!1)},2e3);return()=>{clearTimeout(l)}}},[o]),N.jsx(M0,{className:t,children:N.jsxs("div",{className:t+"-Actions-Container Actions-Container",children:[N.jsxs("div",{className:t+"-Left-Actions Left-Actions Actions",children:[n&&N.jsx(ol,{onClick:n,Icon:QT,name:"Regenerate",className:t,children:"Regenerate"}),N.jsx(ol,{onClick:()=>{$T(r||""),i(!0)},Icon:o?WT:VT,name:"Copy",className:t,children:o?"Copied!":"Copy"})]}),N.jsxs("div",{className:t+"-Right-Actions Right-Actions Actions",children:[N.jsx(ol,{Icon:UT,name:"GoodAnswer",className:t,children:"Good Answer"}),N.jsx(ol,{Icon:HT,name:"BadAnswer",className:t,children:"Bad Answer"})]})]})})}function ol(e){const{name:t,className:n,onClick:r,children:o,Icon:i}=e;return N.jsxs(fy,{onClick:r,className:n+`-${t}`,sx:{padding:"0.25rem 0.5rem",border:0,fontWeight:"normal",fontSize:"0.75rem",color:"mutedForeground"},children:[N.jsx(i,{className:n+`-${t}-Icon`,sx:{width:"0.75rem",height:"0.75rem",mr:"0.25rem"}}),o]})}const M0=Ie("div")(({theme:e})=>ve({display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",margin:"0.5rem 0",borderRadius:e.shape.borderRadius,"& .Actions-Container":{width:"100%",display:"flex",gap:"0.5rem",justifyContent:"space-between"},"& .Actions":{display:"flex",gap:"0.5rem","& > div":{display:"flex",gap:"0.5rem"}}}));function YT(e){const{placeholder:t,className:n,isLoading:r,...o}=e;return N.jsxs(XT,{className:n+"-Wrapper",children:[N.jsx(JT,{placeholder:t||"Say something...",autoFocus:!0,...o}),N.jsx(ZT,{type:"submit",className:n+"-Submit",disabled:r,children:N.jsx(KT,{className:n+"-Submit-Icon",sx:{width:"1rem",height:"1rem"}})})]})}const XT=Ie("div")(()=>ve({display:"flex",position:"relative"})),JT=Ie("input")(({theme:e})=>ve({fontSize:"1rem",lineHeight:"1.5rem",padding:"0.5rem 0.75rem",paddingRight:"2.5rem",borderRadius:e.shape.borderRadius,display:"inline-block",width:"100%",border:`2px solid ${e.palette.border}`,color:e.palette.primary,backgroundColor:e.palette.background,"&:focus":{outline:"none",borderColor:e.palette.ring}})),ZT=Ie("button")(({theme:e,disabled:t})=>ve({position:"absolute",right:"0.375rem",top:"0.375rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:e.shape.borderRadius,padding:"0.5rem",cursor:"pointer",border:"none",backgroundColor:e.palette.primary,color:e.palette.primaryForeground,"&:hover":{backgroundColor:e.palette.primary},...t&&{backgroundColor:e.palette.muted,color:e.palette.mutedForeground,cursor:"not-allowed","&:hover":{backgroundColor:e.palette.muted}}})),eP=Ie("span")(({theme:e})=>ve({color:e.palette.mutedForeground,fontSize:"0.875rem",fontWeight:400,lineHeight:1}));/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var D0=nP,ym=rP,tP=Object.prototype.toString,il=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function nP(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},o=r.decode||oP,i=0;i<e.length;){var l=e.indexOf("=",i);if(l===-1)break;var a=e.indexOf(";",i);if(a===-1)a=e.length;else if(a<l){i=e.lastIndexOf(";",l-1)+1;continue}var s=e.slice(i,l).trim();if(n[s]===void 0){var u=e.slice(l+1,a).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[s]=aP(u,o)}i=a+1}return n}function rP(e,t,n){var r=n||{},o=r.encode||iP;if(typeof o!="function")throw new TypeError("option encode is invalid");if(!il.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!il.test(i))throw new TypeError("argument val is invalid");var l=e+"="+i;if(r.maxAge!=null){var a=r.maxAge-0;if(isNaN(a)||!isFinite(a))throw new TypeError("option maxAge is invalid");l+="; Max-Age="+Math.floor(a)}if(r.domain){if(!il.test(r.domain))throw new TypeError("option domain is invalid");l+="; Domain="+r.domain}if(r.path){if(!il.test(r.path))throw new TypeError("option path is invalid");l+="; Path="+r.path}if(r.expires){var s=r.expires;if(!lP(s)||isNaN(s.valueOf()))throw new TypeError("option expires is invalid");l+="; Expires="+s.toUTCString()}if(r.httpOnly&&(l+="; HttpOnly"),r.secure&&(l+="; Secure"),r.partitioned&&(l+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var d=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(d){case!0:l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"strict":l+="; SameSite=Strict";break;case"none":l+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return l}function oP(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function iP(e){return encodeURIComponent(e)}function lP(e){return tP.call(e)==="[object Date]"||e instanceof Date}function aP(e,t){try{return t(e)}catch{return e}}function sP(){const e=typeof global>"u"?void 0:global.TEST_HAS_DOCUMENT_COOKIE;return typeof e=="boolean"?e:typeof document=="object"&&typeof document.cookie=="string"}function uP(e){return typeof e=="string"?D0(e):typeof e=="object"&&e!==null?e:{}}function Ws(e,t={}){const n=cP(e);if(!t.doNotParse)try{return JSON.parse(n)}catch{}return e}function cP(e){return e&&e[0]==="j"&&e[1]===":"?e.substr(2):e}class dP{constructor(t,n={}){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.update=()=>{if(!this.HAS_DOCUMENT_COOKIE)return;const o=this.cookies;this.cookies=D0(document.cookie),this._checkChanges(o)};const r=typeof document>"u"?"":document.cookie;this.cookies=uP(t||r),this.defaultSetOptions=n,this.HAS_DOCUMENT_COOKIE=sP()}_emitChange(t){for(let n=0;n<this.changeListeners.length;++n)this.changeListeners[n](t)}_checkChanges(t){new Set(Object.keys(t).concat(Object.keys(this.cookies))).forEach(r=>{t[r]!==this.cookies[r]&&this._emitChange({name:r,value:Ws(this.cookies[r])})})}_startPolling(){this.pollingInterval=setInterval(this.update,300)}_stopPolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}get(t,n={}){return n.doNotUpdate||this.update(),Ws(this.cookies[t],n)}getAll(t={}){t.doNotUpdate||this.update();const n={};for(let r in this.cookies)n[r]=Ws(this.cookies[r],t);return n}set(t,n,r){r?r=Object.assign(Object.assign({},this.defaultSetOptions),r):r=this.defaultSetOptions;const o=typeof n=="string"?n:JSON.stringify(n);this.cookies=Object.assign(Object.assign({},this.cookies),{[t]:o}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=ym(t,o,r)),this._emitChange({name:t,value:n,options:r})}remove(t,n){const r=n=Object.assign(Object.assign(Object.assign({},this.defaultSetOptions),n),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=ym(t,"",r)),this._emitChange({name:t,value:void 0,options:n})}addChangeListener(t){this.changeListeners.push(t),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===1&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.addEventListener("change",this.update):this._startPolling())}removeChangeListener(t){const n=this.changeListeners.indexOf(t);n>=0&&this.changeListeners.splice(n,1),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===0&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.removeEventListener("change",this.update):this._stopPolling())}}const fP=R.createContext(new dP);function pP(){return typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"}function mP(e){const t=R.useContext(fP);if(!t)throw new Error("Missing <CookiesProvider>");const[n,r]=R.useState(()=>t.getAll());pP()&&R.useLayoutEffect(()=>{function a(){const s=t.getAll({doNotUpdate:!0});hP(e||null,s,n)&&r(s)}return t.addChangeListener(a),()=>{t.removeChangeListener(a)}},[t,n]);const o=R.useMemo(()=>t.set.bind(t),[t]),i=R.useMemo(()=>t.remove.bind(t),[t]),l=R.useMemo(()=>t.update.bind(t),[t]);return[n,o,i,l]}function hP(e,t,n){if(!e)return!0;for(let r of e)if(t[r]!==n[r])return!0;return!1}const Ks="test1-CreateRag-Session";function gP(){const[e,t]=R.useState(null),[n,r]=mP([Ks]),o=R.useMemo(()=>(n==null?void 0:n[Ks])||null,[n]),i=R.useCallback(l=>{l&&(r(Ks,l,{path:"/"}),t(l))},[r]);return{session:e||o,setSession:i}}const yP=async()=>{const e="/api/auth/session",[t,n]=R.useState(null);return R.useEffect(()=>{(async()=>{const i=await(await fetch(e,{method:"GET",credentials:"include"})).json();n(i)})()},[]),t},kP=ve`
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
`,wP=ve`
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
`,bP={background:"hsl(0 0% 100%)",foreground:"hsl(240 10% 3.9%)",card:"hsl(0 0% 100%)",cardForeground:"hsl(240 10% 3.9%)",popover:"hsl(0 0% 100%)",popoverForeground:"hsl(240 10% 3.9%)",primary:"hsl(240 5.9% 10%)",primaryForeground:"hsl(0 0% 98%)",secondary:"hsl(240 4.8% 95.9%)",secondaryForeground:"hsl(240 5.9% 10%)",muted:"hsl(240 4.8% 95.9%)",mutedForeground:"hsl(240 3.8% 46.1%)",accent:"hsl(240 4.8% 95.9%)",accentForeground:"hsl(240 5.9% 10%)",destructive:"hsl(0 84.2% 60.2%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 5.9% 90%)",input:"hsl(240 5.9% 90%)",ring:"hsl(240 5.9% 10%)"},vP={background:"hsl(240 10% 3.9%)",foreground:"hsl(0 0% 98%)",card:"hsl(240 10% 3.9%)",cardForeground:"hsl(0 0% 98%)",popover:"hsl(240 10% 3.9%)",popoverForeground:"hsl(0 0% 98%)",primary:"hsl(0 0% 98%)",primaryForeground:"hsl(240 5.9% 10%)",secondary:"hsl(240 3.7% 15.9%)",secondaryForeground:"hsl(0 0% 98%)",muted:"hsl(240 3.7% 15.9%)",mutedForeground:"hsl(240 5% 64.9%)",accent:"hsl(240 3.7% 15.9%)",accentForeground:"hsl(0 0% 98%)",destructive:"hsl(0 62.8% 30.6%)",destructiveForeground:"hsl(0 0% 98%)",border:"hsl(240 3.7% 15.9%)",input:"hsl(240 3.7% 15.9%)",ring:"hsl(240 4.9% 83.9%)"},xP=md({palette:{mode:"light",...bP}}),SP=md({palette:{mode:"dark",...vP}}),Kt="tidb-ai-",F0=R.createContext({baseUrl:"",entryButtonLabel:"Ask"});function CP(e){var y;const{exampleQuestions:t,inputPlaceholder:n}=e,{session:r,setSession:o}=gP(),i=R.useContext(F0);yP();const{messages:l,input:a,handleInputChange:s,handleSubmit:u,isLoading:d,stop:c,reload:f,append:p}=zS({api:i.baseUrl+"/api/v1/chats",body:{...r&&{sessionID:r}},onResponse:v=>{r!==v.headers.get("X-CreateRag-Session")&&o(v.headers.get("X-CreateRag-Session")??void 0)}}),h=v=>{p({role:"user",content:v,createdAt:new Date})};return N.jsx(N.Fragment,{children:N.jsxs(EP,{className:Kt+"Conversation-Container",children:[N.jsxs(TP,{sx:{flexDirection:"column-reverse"},className:"Conversation-Message-List",children:[l.length===0&&t.length>0&&N.jsx(RT,{appendText:h,items:t}),d&&((y=l[l.length-1])==null?void 0:y.role)!=="assistant"&&N.jsx(_T,{}),l.sort((v,g)=>{const m=new Date(v.createdAt||0).getTime();return new Date(g.createdAt||0).getTime()-m}).map((v,g)=>{const m=g===0?!d:v.role!=="user";return N.jsx(PT,{role:v.role==="user"?"user":"bot",className:Kt+"Conversation-Message",Action:m?N.jsx(GT,{handleReload:g===0?f:void 0,content:v.content,className:Kt+"Conversation-Message-Action"}):null,wrapperSx:{...g===0&&{border:"none",marginBottom:0}},children:v.content},v.id)})]}),N.jsxs("div",{children:[(l==null?void 0:l.length)>0&&d&&N.jsx(qT,{className:Kt+"Conversation-Action",handleStop:c}),N.jsx("form",{onSubmit:u,children:N.jsx(YT,{className:Kt+"Conversation-Input",value:a,onChange:s,isLoading:d,placeholder:n})}),N.jsxs(eP,{sx:{display:"block",paddingTop:"1rem",fontSize:"12px",color:v=>v.palette.mutedForeground,"& > a":{color:"inherit"}},children:["Powered by ",N.jsx("a",{href:"https://tidb.ai",target:"_blank",rel:"noreferrer",children:"TiDB.ai"})]})]})]})})}const EP=Ie("div")(({theme:e})=>ve({display:"flex",flex:"1 1 0%",justifyContent:"space-between",flexDirection:"column",height:"calc(100% - 40px)",backgroundColor:e.palette.background})),TP=Ie("div")(({theme:e})=>ve({display:"flex",flexDirection:"column",padding:"0.75rem 0",overflowY:"auto",scrollbarWidth:"thin",scrollbarColor:`${e.palette.accent} ${e.palette.background}`,"&::-webkit-scrollbar":{width:"0.5rem"},"&::-webkit-scrollbar-track":{backgroundColor:e.palette.background},"&::-webkit-scrollbar-thumb":{backgroundColor:e.palette.background,borderRadius:e.shape.borderRadius}},e.palette.mode==="dark"?wP:kP));function PP(e){const{btnLabel:t,btnImgSrc:n,baseUrl:r="",exampleQuestions:o,logoSrc:i,title:l,inputPlaceholder:a,preferredMode:s="system"}=e,[u,d]=R.useState(!1),c=()=>d(!0),f=()=>d(!1),p=["dark","light"].includes(s)?s:"system",h=xb("(prefers-color-scheme: dark)")?"dark":"light",y=p==="system"?h:p,v=R.useMemo(()=>y==="dark"?SP:xP,[y]);return N.jsx(F0.Provider,{value:{baseUrl:r,entryButtonLabel:t},children:N.jsxs(jv,{theme:v,children:[N.jsxs(ux,{type:"button",onClick:c,className:Kt+"entry-btn",children:[n&&N.jsx("img",{src:n,alt:t,className:Kt+"entry-btn-img",width:16,height:16}),t]}),N.jsx(Ax,{"aria-labelledby":"unstyled-modal-title","aria-describedby":"unstyled-modal-description",open:u,onClose:f,slots:{backdrop:Lx},className:Kt+"Modal",children:N.jsxs(zx,{sx:{width:"90vw",maxWidth:800,minHeight:400,height:"60vh"},className:Kt+"Modal-Content",children:[N.jsx(Mx,{className:Kt+"Modal-Header",children:N.jsxs(Dx,{className:Kt+"Modal-Title",children:[i&&N.jsx("img",{src:i,alt:"Widget Logo",width:32,height:32}),l]})}),N.jsx(CP,{exampleQuestions:o,inputPlaceholder:a})]})})]})})}const ae=document.querySelector('script[data-id][data-name="tidb-ai-widget"]'),_P=(ae==null?void 0:ae.getAttribute("data-id"))||"tidb-ai-widget",RP=(ae==null?void 0:ae.getAttribute("data-name"))||"tidb-ai-widget",IP=(ae==null?void 0:ae.getAttribute("data-btn-label"))||"Ask AI",OP=(ae==null?void 0:ae.getAttribute("data-btn-img-src"))||void 0,AP=(ae==null?void 0:ae.getAttribute("data-api-base-url"))||void 0,LP=JSON.parse((ae==null?void 0:ae.getAttribute("data-example-questions"))||"[]"),zP=(ae==null?void 0:ae.getAttribute("data-logo-src"))||void 0,MP=(ae==null?void 0:ae.getAttribute("data-title"))||"Conversation Search Box",DP=(ae==null?void 0:ae.getAttribute("data-input-placeholder"))||"Ask a question...",FP=(ae==null?void 0:ae.getAttribute("data-preferred-mode"))||"system",NP=document.getElementsByTagName("body")[0];NP.appendChild(document.createElement("div")).id="tidb-ai-root";Qs.createRoot(document.getElementById("tidb-ai-root")).render(N.jsx(yi.StrictMode,{children:N.jsx(PP,{id:_P,name:RP,btnLabel:IP,btnImgSrc:OP,baseUrl:AP,exampleQuestions:LP,logoSrc:zP,title:MP,inputPlaceholder:DP,preferredMode:FP})}));
