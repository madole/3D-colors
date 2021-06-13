import{r as e,H as t,V as n,u as a,b as r,I as s,S as l,M as o,a as c,C as i,E as m,Q as u,d as g,R as d,c as f,O as p,e as E,G as h,f as b,g as w}from"./vendor.b94eee94.js";const x=()=>e.exports.createElement(t,{center:!0},e.exports.createElement("div",{className:"loading"},"Loading...")),v=async(e="https://images.unsplash.com/photo-1623408861528-27ff44f27da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80")=>{const t=new Image;t.src=e,t.setAttribute("crossOrigin",""),await new Promise((e=>{t.onload=()=>e()}));const{naturalHeight:a,naturalWidth:r}=t,s=document.createElement("canvas");s.width=a,s.height=r;const l=s.getContext("2d");l.drawImage(t,0,0);const o=[];for(let c=0;c<r;c++)for(let e=0;e<a;e++)if(e%500==0||c%500==0){const{data:t}=l.getImageData(e,c,1,1),a={r:t[0],g:t[1],b:t[2],a:t[3]};o.push(new n(a.r,a.g,a.b))}return(e=>{const t=e.reduce(((e,t)=>{const n=JSON.stringify(t);return t.x<10&&t.y<10&&t.z<10?e[n]={vector:t,count:1}:e[n]?e[n].count++:e[n]={vector:t,count:1},e}),{});return Object.values(t)})(o)},y=({imageSrc:t})=>{const{scene:g}=a(),d=r(v,[t]),f=e.exports.useMemo((()=>new s(new l(1,32,32),new o({shininess:100}),d.length)),[d]);return e.exports.useEffect((()=>{d.forEach(((e,t)=>{const a=new c,r=new m,s=new u,l=Math.min(25,e.count),o=new n(l,l,l);s.setFromEuler(r),a.compose(e.vector,s,o),f.setMatrixAt(t,a);const g=e.vector.normalize(),d=new i(g.x,g.y,g.z);f.setColorAt(t,d)})),null==g||g.add(f)}),[d]),null},M=({setImage:t})=>{const n=e.exports.useRef();return e.exports.useEffect((()=>{g.registerDialog(n.current)}),[]),d.createElement("dialog",{ref:n,open:!0},d.createElement("form",{onSubmit:e=>{e.preventDefault();const n=new FormData(e.currentTarget).get("image-src");t(n),e.currentTarget.reset()}},d.createElement("label",null,d.createElement("div",null,"Paste an image URL to start"),d.createElement("input",{name:"image-src",type:"url",inputMode:"url",autoFocus:!0})),d.createElement("a",{className:"link",href:"https://unsplash.com",target:"_blank",rel:"noreferrer"},"Try Unsplash - The internet’s source of freely-usable images."),d.createElement("button",{type:"submit"},"Submit")))};function S(){const[t,n]=e.exports.useState(null),a=e.exports.useRef();return d.createElement(d.Fragment,null,d.createElement(f,{style:{height:"85vh",width:"100vw",border:"1px solid black"},key:t},d.createElement(p,{makeDefault:!0,autoRotate:!0,position:[-10,-10,-5],rotation:[3,-1,2.5533897942197092],zoom:3},d.createElement("ambientLight",null),d.createElement("pointLight",{position:[10,10,10]}),t&&d.createElement(e.exports.Suspense,{fallback:d.createElement(x,null)},d.createElement(y,{imageSrc:t})),d.createElement(E,{ref:a}),window.location.search.split("debug=")[1]&&d.createElement(h,{alignment:"bottom-right",margin:[80,80],onTarget:()=>{var e;return null==(e=null==a?void 0:a.current)?void 0:e.target},onUpdate:()=>{var e;return null==(e=a.current)?void 0:e.update()}},d.createElement(b,{axisColors:["red","green","blue"],labelColor:"white"})))),t?d.createElement("div",{className:"flex-center"},d.createElement("button",{onClick:()=>n(null)},"New image"),d.createElement("img",{className:"thumbnail",src:t,alt:"thumbnail"})):d.createElement(M,{setImage:n}))}w.render(d.createElement(d.StrictMode,null,d.createElement(S,null)),document.getElementById("root"));