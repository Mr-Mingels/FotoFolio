"use strict";(self.webpackChunkfoto_folio=self.webpackChunkfoto_folio||[]).push([[523],{190:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var r=t(165),a=t(683),s=t(861),o=t(433),c=t(439),i=t.p+"static/media/heroImg.0101a93ca2e22b7a610f.jpg",l=t(159),m=t(201),u=t(791),h=t(689),d=(t(713),t(184)),p=function(e){var n=e.getLikedImages,t=(0,u.useState)(""),p=(0,c.Z)(t,2),g=p[0],f=p[1],x=(0,u.useState)(!0),j=(0,c.Z)(x,2),v=j[0],I=j[1],N=(0,u.useState)(!1),b=(0,c.Z)(N,2),k=b[0],y=b[1],w=(0,u.useState)(0),L=(0,c.Z)(w,2),B=L[0],C=L[1],S=(0,u.useState)([[],[],[]]),O=(0,c.Z)(S,2),Z=O[0],R=O[1],W=(0,u.useState)(!1),T=(0,c.Z)(W,2),E=T[0],P=T[1],U=(0,u.useState)([]),D=(0,c.Z)(U,2),M=D[0],F=D[1],A=(0,u.useState)((function(){var e=localStorage.getItem("likedImages");return e?JSON.parse(e):[]})),H=(0,c.Z)(A,2),J=H[0],_=H[1],z=(0,h.s0)(),X=(0,h.TH)(),q=function(e){z("/photos/".concat(e))};(0,u.useEffect)((function(){n(J)}),[J]);var G=function(e){e.target.closest(".homeImageBoxWrapper").style.setProperty("--toggle-opacity","1")},K=function(e){e.target.closest(".homeImageBoxWrapper").style.setProperty("--toggle-opacity","0")},Q=(0,u.useRef)(null);(0,u.useEffect)((function(){"/"===X.pathname&&f("")}),[X]);var V=function(e){F((function(n){return[].concat((0,o.Z)(n),[e])})),I(!1)},Y=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var t,s,c,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n&&!(n>=18)){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,fetch("http://localhost:3001/api/search?page=".concat(n));case 5:return t=e.sent,e.next=8,t.json();case 8:s=e.sent,c=s.hits.reduce((function(e,n,t){var r=n.imageHeight/n.imageWidth*100;return e[t%3].push((0,a.Z)((0,a.Z)({},n),{},{aspectRatio:r})),e}),[[],[],[]]),i=function(e,n){return[].concat((0,o.Z)(e),(0,o.Z)(n)).filter((function(e,n,t){return n===t.findIndex((function(n){return n.id===e.id}))}))},R((function(e){return[i(e[0],c[0]),i(e[1],c[1]),i(e[2],c[2])]})),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),console.error("Error fetching popular images:",e.t0),I(!1);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(n){return e.apply(this,arguments)}}();(0,u.useEffect)((function(){k||(y(!0),Y(B))}),[B]),(0,u.useEffect)((function(){if(!(B>=18)){var e=new IntersectionObserver((function(e){e[0].isIntersecting&&!k&&C((function(e){return e+1}))}),{threshold:1});return Q.current&&e.observe(Q.current),function(){Q.current&&e.unobserve(Q.current)}}}),[Q]),(0,u.useEffect)((function(){if(k){var e=setTimeout((function(){y(!1),Y(B+1)}),2e3);return function(){clearTimeout(e)}}}),[k]);var $=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var t,a,s,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!E){e.next=2;break}return e.abrupt("return");case 2:return P(!0),setTimeout((function(){return P(!1)}),3e3),e.prev=4,e.next=7,fetch(n);case 7:return t=e.sent,e.next=10,t.blob();case 10:a=e.sent,s=n.split("/").pop().split(".")[0]+".jpg",(o=document.createElement("a")).download=s,o.href=URL.createObjectURL(a),o.click(),URL.revokeObjectURL(o.href),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(4),console.error("Error downloading image:",e.t0);case 22:case"end":return e.stop()}}),e,null,[[4,19]])})));return function(n){return e.apply(this,arguments)}}(),ee=function(e){var n=[].concat((0,o.Z)(J),[e]);_(n),localStorage.setItem("likedImages",JSON.stringify(n))},ne=function(e){var n=J.filter((function(n){return n.id!==e.id}));_(n),localStorage.setItem("likedImages",JSON.stringify(n))},te=(0,u.useCallback)((function(e){return J.some((function(n){return n.id===e.id}))}),[J]);return(0,d.jsxs)("section",{className:"homeWrapper",children:[v&&(0,d.jsx)("div",{className:"loader-wrapper",children:(0,d.jsx)("span",{className:"loader",children:(0,d.jsx)("span",{className:"loader-inner"})})}),(0,d.jsxs)("div",{className:"heroImgWrapper",children:[(0,d.jsx)("img",{className:"heroImg",alt:"home hero image",src:i,onLoad:function(){I(!1)}}),(0,d.jsxs)("div",{className:"heroImgTxtContentWrapper",children:[(0,d.jsx)("h1",{className:"heroImgAppTitle",children:"Foto-Folio"}),(0,d.jsxs)("div",{className:"smallDescriptionWrapper",children:[(0,d.jsx)("span",{children:"Unleash your creativity with Foto-Folio"}),(0,d.jsx)("span",{children:"Experience your memories in a whole new way"})]}),(0,d.jsxs)("form",{className:"heroImgSearchFormWrapper",onSubmit:function(e){return function(e){e.preventDefault(),z("/search/".concat(g))}(e)},children:[(0,d.jsx)("div",{className:"heroImgSearchIconWrapper",children:(0,d.jsxs)("svg",{className:"heroImgSearchIcon",viewBox:"0 0 24 24",version:"1.1","aria-hidden":"false",children:[(0,d.jsx)("desc",{lang:"en-US",children:"A magnifying glass"}),(0,d.jsx)("path",{d:"M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 \r 3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 \r 5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"})]})}),(0,d.jsx)("input",{placeholder:"Search high-resolution images",className:"heroImgSearchInput",value:g,onChange:function(e){return f(e.target.value)}}),(0,d.jsx)("div",{className:"heroImgResetSearchInputBtnWrapper",children:g&&(0,d.jsx)("button",{type:"button",className:"heroImgResetSearchInputBtn",onClick:function(){f("")},children:(0,d.jsxs)("svg",{className:"heroImgClearBtn",viewBox:"0 0 24 24",version:"1.1","aria-hidden":"false",children:[(0,d.jsx)("desc",{lang:"en-US",children:"An X shape"}),(0,d.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 \r 13.41 12 19 6.41Z"})]})})})]})]}),(0,d.jsx)("div",{className:"endOfHeroImgWrapper",children:(0,d.jsxs)("span",{children:["Photo by ",(0,d.jsx)("a",{className:"heroImgLink",target:"_blank",rel:"noopener noreferrer",href:"https://unsplash.com/@pinewatt",children:"Pine Watt"})]})})]}),(0,d.jsxs)("div",{className:"homeImagesResultsWrapper",children:[(0,d.jsxs)("div",{className:"homeImagesResultsContent",children:[(0,d.jsx)("div",{className:"homeImagesResultsColumnContent",children:Z[0].map((function(e,n){return(0,d.jsxs)("div",{className:"homeImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"homeImageContainer",style:{paddingBottom:M.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return q(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"homeImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"homeDownLoadBtn",disabled:E,onClick:function(){return $(e.webformatURL)},children:(0,d.jsx)("img",{className:"homeDownLoadImg",src:m})}),te(e)?(0,d.jsx)("button",{className:"homeLikeImgBtn liked",onClick:function(){return ne(e)},children:(0,d.jsx)("img",{className:"homeLikeImg liked",src:l})}):(0,d.jsx)("button",{className:"homeLikeImgBtn",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"homeLikeImg",src:l})})]}),(0,d.jsx)("div",{className:"homeImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"homeImgTagsTxt",children:e.tags})})]},n)}))}),(0,d.jsx)("div",{className:"homeImagesResultsColumnContent",children:Z[1].map((function(e,n){return(0,d.jsxs)("div",{className:"homeImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"homeImageContainer",style:{paddingBottom:M.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return q(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"homeImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"homeDownLoadBtn",disabled:E,onClick:function(){return $(e.webformatURL)},children:(0,d.jsx)("img",{className:"homeDownLoadImg",src:m})}),te(e)?(0,d.jsx)("button",{className:"homeLikeImgBtn liked",onClick:function(){return ne(e)},children:(0,d.jsx)("img",{className:"homeLikeImg liked",src:l})}):(0,d.jsx)("button",{className:"homeLikeImgBtn",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"homeLikeImg",src:l})})]}),(0,d.jsx)("div",{className:"homeImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"homeImgTagsTxt",children:e.tags})})]},n)}))}),(0,d.jsx)("div",{className:"homeImagesResultsColumnContent",children:Z[2].map((function(e,n){return(0,d.jsxs)("div",{className:"homeImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"homeImageContainer",style:{paddingBottom:M.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return q(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"homeImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"homeDownLoadBtn",disabled:E,onClick:function(){return $(e.webformatURL)},children:(0,d.jsx)("img",{className:"homeDownLoadImg",src:m})}),te(e)?(0,d.jsx)("button",{className:"homeLikeImgBtn liked",onClick:function(){return ne(e)},children:(0,d.jsx)("img",{className:"homeLikeImg liked",src:l})}):(0,d.jsx)("button",{className:"homeLikeImgBtn",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"homeLikeImg",src:l})})]}),(0,d.jsx)("div",{className:"homeImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"homeImgTagsTxt",children:e.tags})})]},n)}))}),(0,d.jsx)("div",{ref:Q,style:{height:"1px",marginTop:"-1px"}})]}),k&&(0,d.jsx)("div",{className:"bottom-loader-wrapper",children:(0,d.jsx)("div",{className:"bottom-loader"})})]})]})}},713:function(){},683:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(142);function a(e,n,t){return(n=(0,r.Z)(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}}}]);
//# sourceMappingURL=523.7d90db15.chunk.js.map