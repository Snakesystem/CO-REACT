"use strict";(self.webpackChunkmyreactapp=self.webpackChunkmyreactapp||[]).push([[4],{7004:(e,a,t)=>{t.r(a),t.d(a,{default:()=>l});var r=t(5043),i=t(1953),n=(t(698),t(7784),t(579));var s=t(4858),o=t(8403),d=(t(8451),t(8426));function c(){const[e,a]=(0,r.useState)(!1);return console.log("frontCamera",e),(0,n.jsx)("div",{children:(0,n.jsx)(d.m6,{frontCamera:e})})}function l(){const{dataPendukungSchema:e}=(0,i.p)(),a=(0,s.mN)({defaultValues:{IDCardFile:"",SelfieFile:"",SignatureFile:""},resolver:(0,o.t)(e),mode:"all"}),{handleSubmit:t}=a;return(0,n.jsx)(s.Op,{...a,children:(0,n.jsx)("form",{noValidate:!0,onSubmit:t((e=>{console.log(e)})),children:(0,n.jsx)("div",{className:"row",children:(0,n.jsx)("div",{className:"col-12",children:(0,n.jsxs)("div",{className:"row",children:[(0,n.jsx)("div",{className:"col-md-4",children:(0,n.jsx)(c,{})}),(0,n.jsx)("div",{className:"col-md-4"}),(0,n.jsx)("div",{className:"col-md-4"})]})})})})})}},8451:(e,a,t)=>{t.d(a,{A:()=>n});var r=t(5043),i=t(579);const n=()=>{const e=(0,r.useRef)(null),a=(0,r.useRef)(null),t=(0,r.useRef)(null),[n,s]=(0,r.useState)(null),[o,d]=(0,r.useState)(!0),[c,l]=(0,r.useState)([]);(0,r.useEffect)((()=>(m(),()=>{u()})),[o]);const u=()=>{n&&n.getTracks().forEach((e=>{e.stop()}))},m=async()=>{u();const a={video:{facingMode:o?"user":"environment"}};try{const t=await navigator.mediaDevices.getUserMedia(a);s(t),e.current.srcObject=t}catch(t){alert("Could not access the camera")}},h=()=>"screenshot_".concat(Math.random().toString(36).substr(2,9),".png"),j=(e,a,t)=>{const{width:r,height:i}=e,n=(Math.min(a/r,t/i),document.createElement("canvas"));return n.width=a,n.height=t,n.getContext("2d").drawImage(e,0,0,r,i,0,0,a,t),n};return(0,i.jsxs)("div",{style:{position:"relative",width:"100%",height:"100%"},children:[(0,i.jsx)("video",{ref:e,style:{width:"100%",height:"100%",objectFit:"cover"},autoPlay:!0,muted:!0}),(0,i.jsxs)("div",{style:{position:"absolute",bottom:"10px",left:"50%",transform:"translateX(-50%)",zIndex:1},children:[(0,i.jsx)("button",{onClick:()=>{const t=a.current,r=e.current;t.width=r.videoWidth,t.height=r.videoHeight,t.getContext("2d").drawImage(r,0,0);const i=j(t,640,480).toDataURL("image/png"),n=h();localStorage.setItem(n,i),l([...c,n])},className:"btn btn-light",children:(0,i.jsx)("i",{className:"bi bi-camera-fill"})}),c.length>0&&(0,i.jsx)("button",{onClick:()=>(e=>{const a=localStorage.getItem(e),r=document.createElement("img");r.src=a,t.current.innerHTML="",t.current.appendChild(r)})(c[c.length-1]),className:"btn btn-light",children:(0,i.jsx)("i",{className:"bi bi-cloud-arrow-down-fill"})}),(0,i.jsx)("button",{onClick:()=>{d((e=>!e)),m()},className:"btn btn-light",children:(0,i.jsx)("i",{className:"bi bi-arrow-repeat"})})]}),(0,i.jsx)("canvas",{ref:a,style:{display:"none"}}),(0,i.jsx)("div",{ref:t})]})}},1953:(e,a,t)=>{t.d(a,{p:()=>s});var r=t(899),i=t(4117),n=t(2818);const s=()=>{const[e,a]=(0,i.Bd)("lang");return{registerSchema:r.Ik().shape({Email:r.Yj().email("This must be a email").required(e("GLOBAL.mandatory")),Fullname:r.Yj().required(e("GLOBAL.mandatory")).min(3,e("VALIDATE.minlength")),MobilePhone:r.Yj().required(e("GLOBAL.mandatory")).matches(n.Kh,e("VALIDATE.mobilephone")),BankAccountNumber:r.Yj().required(e("GLOBAL.mandatory")),BankAccountHolder:r.Yj().required(e("GLOBAL.mandatory")),QuestionRDN:r.ai().required(e("GLOBAL.mandatory")),Sales:r.ai(),BankName:r.Yj().required(e("GLOBAL.mandatory")),Password:r.Yj().required(e("GLOBAL.mandatory")).matches(n.a6,e("REGIS.strengthpass")),ConfirmPassword:r.Yj().required(e("GLOBAL.mandatory")).oneOf([r.KR("Password"),null],e("VALIDATE.ConfPassErr"))}).required(),loginSchema:r.Ik().shape({Email:r.Yj().email("This must be a email").required(e("GLOBAL.mandatory")),Password:r.Yj().required(e("GLOBAL.mandatory"))}).required(),bcaSchema:r.Ik().shape({District:r.ai().required(e("GLOBAL.mandatory"))}).required(),briSchema:r.Ik().shape({District:r.ai().required(e("GLOBAL.mandatory"))}).required(),permataSchema:r.Ik().shape({Occupation:r.Yj(),Position:r.Yj(),NatureOfBusiness:r.Yj()}).required(),dataPribadiSchema:r.Ik({fundsource:r.YO().required(e("GLOBAL.mandatory"))}).required(),dataPendukungSchema:r.Ik({IDCardFile:r.Yj(),SelfieFile:r.Yj(),SignatureFile:r.Yj()}).required()}}}}]);
//# sourceMappingURL=4.8b4f7412.chunk.js.map