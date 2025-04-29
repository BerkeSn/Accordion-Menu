// function toggleDetails(event){
//     const details = event.currentTarget;
//     const summary = details.querySelector("summary");
//     const expandIcon = summary.querySelector(".expand-icon");
//     const detailsContent = details.querySelector(".faq-content");

//     if(details.open){
//         expandIcon.src = "img/plus.png";
//         detailsContent.style.maxHeight = "0";
//     }else{
//         expandIcon.src = "img/minus.png";
//         detailsContent.style.maxHeight = detailsContent.scrollHeight + "px";
//     }
// }

// const detailsElements = document.querySelectorAll("details");
// detailsElements.forEach((details) =>{
//     details.addEventListener("click",toggleDetails);
// }); 

function toggleDetails(event){
    const details = event.currentTarget;
    const summary = details.querySelector("summary");
    const expandIcon = summary.querySelector(".expand-icon");

    if(details.open){
        expandIcon.src = "img/plus.png";
    }else{
        expandIcon.src = "img/minus.png";
    }
}

const detailsElements = document.querySelectorAll("details");

detailsElements.forEach((detail) =>{
    detail.addEventListener("click",toggleDetails);
});

function onClick(e, el, animation){
    e.preventDefault();
    el.style.overflow = "hidden";

    if(el.isClosing || !el.open){
        open(el, animation);
    }else if(el.isExpanding || el.open){
        shrink(el, animation);
    }
}

function shrink(el, animation){
    el.isClosing = true;

    const startHeight = `${el.offsetHeight}px`; 
    const endHeight = `${el.querySelector("summary").offsetHeight}px`;

    if(animation){
        animation.cancel();
    }

    animation = el.animate(
        {
            height:[startHeight, endHeight],
        },
        {
            duration: 400,
            easing: "ease-out",
        }
    );
    
    animation.onfinish = ()=>{
        el.querySelector(".expand-icon").setAttribute("src", "img/plus.png");
        return onAnimationFinish(el, false ,animation);
    };

    animation.oncancel = ()=>{
        el.querySelector(".expand-icon").setAttribute("src", "img/minus.png");
        return (el.isClosing = false);
    }
}

function open(el, animation){
    el.style.height = `${el.offsetHeight}px`;
    el.open = true;

    window.requestAnimationFrame(()=>expand(el,animation));
}

function expand(el, animation){
    el.isExpanding = true;

    const startHeight = `${el.offsetHeight}px`;
    const endHeight = `${el.querySelector("summary").offsetHeight + el.querySelector(".faq-content").offsetHeight}px`;

    if(animation){
        animation.cancel();
    }

    animation = el.animate(
        {
            height: [startHeight, endHeight],
        },
        {
            duration: 350,
            easing: "ease-out",
        }
    );

    animation.onfinish = ()=>{
        el.querySelector(".expand-icon").setAttribute("src","img/minus.png");
        return onAnimationFinish(el,true, animation);
    };

    animation.oncancel = ()=>{
        el.querySelector(".expand-icon").setAttribute("src","img/minus.png");
        return (el.isExpanding = false);
    }
}

function onAnimationFinish(el,open,animation){
    el.open = open;
    animation = null;
    el.isClosing = false;
    el.isExpanding = false;
    el.style.height = el.style.overflow = "";
}

document.querySelectorAll("details").forEach((el)=>{
    let animation = null;
    el.isClosing = false;
    el.isExpanding = false;
    el.addEventListener("click",(e)=>onClick(e,el,animation))
}
)
