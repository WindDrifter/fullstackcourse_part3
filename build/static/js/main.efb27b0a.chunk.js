(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(13),u=t.n(c),r=(t(20),t(14)),i=t(2),l=function(e){var n=e.name,t=e.phone,a=e.id,c=e.removeFunction;return o.a.createElement("div",{id:a},n," ",t," ",o.a.createElement("button",{onClick:c,value:a},"Delete"))},m=function(e){var n=e.updateFunction,t=Object(a.useState)(""),c=Object(i.a)(t,2),u=c[0],r=c[1],l=Object(a.useState)(""),m=Object(i.a)(l,2),f=m[0],d=m[1];return o.a.createElement("form",null,o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:u,onChange:function(e){r(e.target.value)}})),o.a.createElement("div",null,"Phone: ",o.a.createElement("input",{value:f,onChange:function(e){d(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit",onClick:function(e){e.preventDefault(),n(u,f),r(""),d("")}},"add")))},f=(t(21),t(3)),d=t.n(f),s="/api/persons",h=function(){return d.a.get(s).then(function(e){return e.data})},v=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(i.a)(u,2),v=f[0],p=f[1];Object(a.useEffect)(function(){h().then(function(e){c(e)})},[]);var b=function(e){var n;e.preventDefault(),(n=e.target.value,d.a.delete("".concat(s,"/").concat(n)).then(function(e){return e.data})).then(function(){h().then(function(e){c(e)})})};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),v&&o.a.createElement("div",{className:"notification"},v),o.a.createElement(m,{updateFunction:function(e,n){var a,o,u,i=(a=e,t.find(function(e){return e.name===a})),l={name:e,number:n};if(i){window.confirm("Do you want to replace an existing number?")&&(o=i.id,u=l,d.a.put("".concat(s,"/").concat(o),u).then(function(e){return e.data})).then(function(){h().then(function(e){return c(e)})})}else{var m=Object(r.a)(t);(function(e){return d.a.post(s,e).then(function(e){return e.data})})(l).then(function(e){m.push(e),c(m)}).then(function(){p("Added ".concat(e," to contacts")),setTimeout(function(){p("")},5e3)})}}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement("div",null,t.map(function(e){return o.a.createElement(l,{id:e.id,key:e.id,name:e.name,removeFunction:b,phone:e.number})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,1,2]]]);
//# sourceMappingURL=main.efb27b0a.chunk.js.map