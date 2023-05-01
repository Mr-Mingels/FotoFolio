"use strict";(self.webpackChunkfoto_folio=self.webpackChunkfoto_folio||[]).push([[533],{533:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=n(165),s=n(683),a=n(861),c=n(433),i=n(439),o=n(159),u=n(201),l=n(689),m=n(791),d=(n(713),n(184)),h=function(e){var t=e.getLikedImages,n=(0,m.useState)(!0),h=(0,i.Z)(n,2),f=h[0],g=h[1],p=(0,m.useState)(!1),x=(0,i.Z)(p,2),j=x[0],v=x[1],N=(0,m.useState)(0),b=(0,i.Z)(N,2),I=b[0],k=b[1],y=(0,m.useState)([[],[],[]]),L=(0,i.Z)(y,2),w=L[0],B=L[1],C=(0,m.useState)(!1),O=(0,i.Z)(C,2),R=O[0],Z=O[1],S=(0,m.useState)(!1),T=(0,i.Z)(S,2),W=T[0],E=T[1],P=(0,m.useState)([]),D=(0,i.Z)(P,2),U=D[0],M=D[1],J=(0,m.useState)((function(){var e=localStorage.getItem("likedImages");return e?JSON.parse(e):[]})),H=(0,i.Z)(J,2),_=H[0],q=H[1],z=(0,l.s0)(),A=function(e){z("/photos/".concat(e))},F=function(e){var t=e.pathname.match(/\/search\/(.+)/);return t?t[1]:""}((0,l.TH)());(0,m.useEffect)((function(){t(_)}),[_]);var G=function(e){e.target.closest(".searchImageBoxWrapper").style.setProperty("--toggle-opacity","1")},K=function(e){e.target.closest(".searchImageBoxWrapper").style.setProperty("--toggle-opacity","0")},Q=(0,m.useRef)(null),V=function(e){M((function(t){return[].concat((0,c.Z)(t),[e])})),setTimeout((function(){g(!1)}),1e3)},X=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a,i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&!(t>=18)){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,fetch("http://localhost:3001/api/search?page=".concat(t,"&q=").concat(F));case 5:return n=e.sent,e.next=8,n.json();case 8:a=e.sent,i=a.hits.reduce((function(e,t,n){var r=t.imageHeight/t.imageWidth*100;return e[n%3].push((0,s.Z)((0,s.Z)({},t),{},{aspectRatio:r})),e}),[[],[],[]]),o=function(e,t){return[].concat((0,c.Z)(e),(0,c.Z)(t)).filter((function(e,t,n){return t===n.findIndex((function(t){return t.id===e.id}))}))},0===a.hits.length?(g(!1),E(!0)):E(!1),B((function(e){return[o(e[0],i[0]),o(e[1],i[1]),o(e[2],i[2])]})),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(2),console.error("Error fetching popular images:",e.t0),g(!1);case 19:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(t){return e.apply(this,arguments)}}();(0,m.useEffect)((function(){B([[],[],[]]),k(0)}),[F]),(0,m.useEffect)((function(){j||(v(!0),X(I))}),[I]),(0,m.useEffect)((function(){if(!(I>=18||W)){var e=new IntersectionObserver((function(e){e[0].isIntersecting&&!j&&k((function(e){return e+1}))}),{threshold:1});return Q.current&&e.observe(Q.current),function(){Q.current&&e.unobserve(Q.current)}}}),[Q]),(0,m.useEffect)((function(){if(j){var e=setTimeout((function(){v(!1),X(I+1)}),2500);return function(){clearTimeout(e)}}}),[j]);var Y=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,s,a,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!R){e.next=2;break}return e.abrupt("return");case 2:return Z(!0),setTimeout((function(){return Z(!1)}),3e3),e.prev=4,e.next=7,fetch(t);case 7:return n=e.sent,e.next=10,n.blob();case 10:s=e.sent,a=t.split("/").pop().split(".")[0]+".jpg",(c=document.createElement("a")).download=a,c.href=URL.createObjectURL(s),c.click(),URL.revokeObjectURL(c.href),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(4),console.error("Error downloading image:",e.t0);case 22:case"end":return e.stop()}}),e,null,[[4,19]])})));return function(t){return e.apply(this,arguments)}}(),$=function(e){var t=[].concat((0,c.Z)(_),[e]);q(t),localStorage.setItem("likedImages",JSON.stringify(t))},ee=function(e){var t=_.filter((function(t){return t.id!==e.id}));q(t),localStorage.setItem("likedImages",JSON.stringify(t))},te=(0,m.useCallback)((function(e){return _.some((function(t){return t.id===e.id}))}),[_]);return(0,d.jsxs)("section",{className:"SearchWrapper",children:[f&&(0,d.jsx)("div",{className:"loader-wrapper",children:(0,d.jsx)("span",{className:"loader",children:(0,d.jsx)("span",{className:"loader-inner"})})}),(0,d.jsxs)("div",{className:"searchImagesResultsWrapper",children:[(0,d.jsxs)("div",{className:"searchImagesResultsContent",children:[(0,d.jsx)("div",{className:"searchImagesResultsColumnContent",children:w[0].map((function(e,t){return(0,d.jsxs)("div",{className:"searchImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"searchImageContainer",style:{paddingBottom:U.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return A(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"searchImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"searchDownLoadBtn",disabled:R,onClick:function(){return Y(e.webformatURL)},children:(0,d.jsx)("img",{className:"searchDownLoadImg",src:u})}),te(e)?(0,d.jsx)("button",{className:"searchLikeImgBtn liked",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"searchLikeImg liked",src:o})}):(0,d.jsx)("button",{className:"searchLikeImgBtn",onClick:function(){return $(e)},children:(0,d.jsx)("img",{className:"searchLikeImg",src:o})})]}),(0,d.jsx)("div",{className:"searchImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"searchImgTagsTxt",children:e.tags})})]},t)}))}),(0,d.jsx)("div",{className:"searchImagesResultsColumnContent",children:w[1].map((function(e,t){return(0,d.jsxs)("div",{className:"searchImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"searchImageContainer",style:{paddingBottom:U.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return A(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"searchImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"searchDownLoadBtn",disabled:R,onClick:function(){return Y(e.webformatURL)},children:(0,d.jsx)("img",{className:"searchDownLoadImg",src:u})}),te(e)?(0,d.jsx)("button",{className:"searchLikeImgBtn liked",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"searchLikeImg liked",src:o})}):(0,d.jsx)("button",{className:"searchLikeImgBtn",onClick:function(){return $(e)},children:(0,d.jsx)("img",{className:"searchLikeImg",src:o})})]}),(0,d.jsx)("div",{className:"searchImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"searchImgTagsTxt",children:e.tags})})]},t)}))}),(0,d.jsx)("div",{className:"searchImagesResultsColumnContent",children:w[2].map((function(e,t){return(0,d.jsxs)("div",{className:"searchImageBoxWrapper",onMouseEnter:function(e){return G(e)},onMouseLeave:function(e){return K(e)},children:[(0,d.jsx)("div",{className:"searchImageContainer",style:{paddingBottom:U.includes(e.id)?"0":"".concat(e.aspectRatio,"%")},children:(0,d.jsx)("img",{className:"homeImage",src:e.webformatURL,onClick:function(){return A(e.id)},width:"100%",height:"100%",onLoad:function(){return V(e.id)}})}),(0,d.jsxs)("div",{className:"searchImageBoxBtnWrapper",style:{opacity:"var(--toggle-opacity)"},children:[(0,d.jsx)("button",{className:"searchDownLoadBtn",disabled:R,onClick:function(){return Y(e.webformatURL)},children:(0,d.jsx)("img",{className:"searchDownLoadImg",src:u})}),te(e)?(0,d.jsx)("button",{className:"searchLikeImgBtn liked",onClick:function(){return ee(e)},children:(0,d.jsx)("img",{className:"searchLikeImg liked",src:o})}):(0,d.jsx)("button",{className:"searchLikeImgBtn",onClick:function(){return $(e)},children:(0,d.jsx)("img",{className:"searchLikeImg",src:o})})]}),(0,d.jsx)("div",{className:"searchImgBoxTagsWrapper",style:{opacity:"var(--toggle-opacity)"},children:(0,d.jsx)("span",{className:"searchImgTagsTxt",children:e.tags})})]},t)}))}),(0,d.jsx)("div",{ref:Q,style:{height:"1px",marginTop:"-1px"}})]}),j&&(0,d.jsx)("div",{className:"bottom-loader-wrapper",children:(0,d.jsx)("div",{className:"bottom-loader"})}),W&&(0,d.jsxs)("div",{className:"searchNoResultsWrapper",children:[(0,d.jsx)("span",{className:"searchNoResultsTxt-1",children:"Sorry, we couldn't find any matches."}),(0,d.jsx)("span",{className:"searchNoResultsTxt-2",children:"Try a different search input and try again!"})]})]})]})}},713:function(){},683:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(142);function s(e,t,n){return(t=(0,r.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=533.f3c79f2f.chunk.js.map