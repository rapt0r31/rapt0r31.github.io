var hamburgerBtn=document.querySelector(".hamburger-btn"),pageHeaderNav=document.querySelector(".page-header__nav");pageHeaderNav.classList.remove("page-header__nav--show"),hamburgerBtn.addEventListener("click",function(){pageHeaderNav.classList.toggle("page-header__nav--show"),hamburgerBtn.classList.toggle("hamburger-btn--close")});var diffRange=document.querySelector(".result__diff-range-label--before"),resultLineWidth=document.querySelector(".result__diff-range-line"),resultImgBefore=document.querySelector(".result__diff-img--before"),resultImgAfter=document.querySelector(".result__diff-img--after"),btnBefore=document.querySelector(".result__diff-range-btn--before"),btnAfter=document.querySelector(".result__diff-range-btn--after"),lineGreen=document.querySelector(".line-green"),resultImgWrapBefore=document.querySelector(".result__diff-img-wrap--before"),resultImgWrapAfter=document.querySelector(".result__diff-img-wrap--after");diffRange.addEventListener("mousedown",function(e){e.preventDefault();var a=resultLineWidth.clientWidth,n={x:e.clientX},t=function(e){e.preventDefault();var t=n.x-e.clientX;n={x:e.clientX};var r=diffRange.offsetLeft-t;(a<r||r<0)&&(r=diffRange.offsetLeft);var l=r+150+"px",f=r+132+"px";resultImgBefore.style="clip: rect(0px, "+l+", 518px, 0px)",resultImgAfter.style="clip: rect(0px, 572px, 518px, "+f+")",diffRange.style.left=r+"px"},r=function(e){e.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)}),btnBefore.addEventListener("click",function(e){e.preventDefault(),diffRange.style.left="0px",resultImgBefore.style="clip: rect(0px, 578px, 518px, 0px)",resultImgAfter.style="clip: rect(0px, 572px, 518px, 560px)",lineGreen.style="left: 7%","result__diff-img-wrap--active"!==resultImgWrapAfter.className&&(resultImgWrapBefore.classList.add("result__diff-img-wrap--active"),resultImgWrapAfter.classList.remove("result__diff-img-wrap--active"))}),btnAfter.addEventListener("click",function(e){e.preventDefault(),diffRange.style.left="420px",resultImgBefore.style="clip: rect(0px, 150px, 518px, 0px)",resultImgAfter.style="clip: rect(0px, 572px, 518px, 132px)",lineGreen.style="left: 47%","result__diff-img-wrap--active"!==resultImgWrapBefore.className&&(resultImgWrapBefore.classList.remove("result__diff-img-wrap--active"),resultImgWrapAfter.classList.add("result__diff-img-wrap--active"))});