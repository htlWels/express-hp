(function(e){function t(t){for(var o,u,i=t[0],a=t[1],l=t[2],f=0,d=[];f<i.length;f++)u=i[f],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&d.push(r[u][0]),r[u]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);p&&p(t);while(d.length)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,i=1;i<n.length;i++){var a=n[i];0!==r[a]&&(o=!1)}o&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},c=[];function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var p=a;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"03d9":function(e,t,n){"use strict";n("3a6c")},"0a77":function(e,t,n){},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},"144c":function(e,t,n){"use strict";n("0a77")},2:function(e,t){},3:function(e,t){},"3a6c":function(e,t,n){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function r(e,t,n,r,c,u){const i=Object(o["h"])("Login");return Object(o["f"])(),Object(o["b"])(i)}var c=n("279c");const u={id:"app"},i={id:"login"},a=Object(o["d"])("div",{id:"description"},[Object(o["d"])("h1",null,"Login")],-1),l={id:"form"},p=["onSubmit"],f=Object(o["d"])("label",{for:"username"},"Username",-1),d=Object(o["d"])("label",{for:"password"},"Password",-1),s=["type"],b=Object(o["d"])("button",{type:"submit"},"Log in",-1);var O={__name:"Login",setup(e){const t=Object(o["g"])(""),n=c["bcrypt"].genSaltSync(10),r=Object(o["g"])(!0),O=Object(o["g"])(""),j=()=>{const e=c["bcrypt"].hashSync(O.value,n),o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.value,password:e})};fetch("/auth",o).then(e=>e.json()).then(e=>this.postId=e.id)};return(e,n)=>(Object(o["f"])(),Object(o["c"])("div",u,[Object(o["d"])("div",i,[a,Object(o["d"])("div",l,[Object(o["d"])("form",{onSubmit:Object(o["l"])(j,["prevent"])},[f,Object(o["k"])(Object(o["d"])("input",{type:"text",id:"username","onUpdate:modelValue":n[0]||(n[0]=e=>t.value=e),placeholder:"elon musk",autocomplete:"off"},null,512),[[o["j"],t.value]]),d,Object(o["e"])("  "),Object(o["d"])("i",{onClick:n[1]||(n[1]=e=>r.value=!r.value)}),Object(o["k"])(Object(o["d"])("input",{type:O.value,id:"password","onUpdate:modelValue":n[2]||(n[2]=e=>O.value=e),placeholder:"**********"},null,8,s),[[o["i"],O.value]]),b],40,p)])])]))}};n("144c");const j=O;var v=j,h={name:"App",components:{Login:v}},y=(n("03d9"),n("6b0d")),m=n.n(y);const g=m()(h,[["render",r]]);var w=g;Object(o["a"])(w).mount("#app")},6:function(e,t){},7:function(e,t){},8:function(e,t){},9:function(e,t){}});
//# sourceMappingURL=app.8bbd682a.js.map