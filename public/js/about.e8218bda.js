(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"1feb":function(e,t,c){"use strict";c.r(t);c("14d9");var a=c("7a23"),n=c("a18c");const s={id:"app"},o={id:"login"},b=Object(a["f"])("div",{id:"description"},[Object(a["f"])("h1",null,"Register")],-1),u={id:"form"},r=["onSubmit"],l=Object(a["f"])("label",{for:"username"},"Username",-1),i=Object(a["f"])("label",{for:"password"},"Password",-1),O=Object(a["f"])("button",{type:"submit"},"Register",-1),d={key:0},j=Object(a["f"])("h2",null,"ERROR",-1);var f={__name:"Register",setup(e){let t=Object(a["w"])("");const c=Object(a["w"])(!0);let f=Object(a["w"])(""),p=Object(a["w"])("");const v=()=>{p.value="";const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.value,password:f.value})};fetch("/register",e).then(e=>{200==e.status?n["a"].push("/home"):437==e.status?(p.value=`User ${t.value} already exists!`,t.value=""):p.value="Unexpected error on server side!"})};return(e,n)=>(Object(a["r"])(),Object(a["e"])("div",s,[Object(a["f"])("div",o,[b,Object(a["f"])("div",u,[Object(a["f"])("form",{onSubmit:Object(a["E"])(v,["prevent"])},[l,Object(a["D"])(Object(a["f"])("input",{type:"text",id:"username","onUpdate:modelValue":n[0]||(n[0]=e=>Object(a["m"])(t)?t.value=e:t=e),placeholder:"elon musk",autocomplete:"off"},null,512),[[a["B"],Object(a["A"])(t)]]),i,Object(a["g"])("  "),Object(a["f"])("i",{onClick:n[1]||(n[1]=e=>c.value=!c.value)}),Object(a["D"])(Object(a["f"])("input",{type:"password",id:"password","onUpdate:modelValue":n[2]||(n[2]=e=>Object(a["m"])(f)?f.value=e:f=e),placeholder:"**********"},null,512),[[a["B"],Object(a["A"])(f)]]),O],40,r),Object(a["A"])(p)?(Object(a["r"])(),Object(a["e"])("div",d,[j,Object(a["f"])("p",null,Object(a["z"])(Object(a["A"])(p)),1)])):Object(a["d"])("",!0)])])]))}};c("25a4");const p=f;t["default"]=p},"25a4":function(e,t,c){"use strict";c("c154")},c154:function(e,t,c){},f820:function(e,t,c){"use strict";c.r(t);var a=c("7a23");const n={class:"about"},s=Object(a["f"])("h1",null,"This is an about page",-1),o=[s];function b(e,t){return Object(a["r"])(),Object(a["e"])("div",n,o)}var u=c("6b0d"),r=c.n(u);const l={},i=r()(l,[["render",b]]);t["default"]=i}}]);
//# sourceMappingURL=about.e8218bda.js.map