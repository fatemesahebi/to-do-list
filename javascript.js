//definition of elements
let listText= document.getElementsByClassName('list-item-contain')
let circle=document.getElementsByClassName('circle')
let close=document.getElementsByClassName('close')
let list=document.getElementById('list--items')
let moon=document.getElementById('moon')
let sun=document.getElementById('sun')
let main=document.getElementsByClassName('main')[0]
let theme=document.getElementsByClassName('theme')
let themeSvg=document.getElementsByClassName('theme-svg')[0]
let activeFilter=document.getElementsByClassName('active')
let completeFilter=document.getElementsByClassName('complete')
let all=document.getElementsByClassName('all')
let activeText=document.getElementById('acitveText')
let clear=document.getElementById('clear')
let filterOptions=document.getElementsByClassName('filter--options')
//Initialization of parameters
let filterNum=1
filterOptions[0].style.color='var(--blue)'
filterOptions[3].style.color='var(--blue)'
moon.style.display='inline-block'

let toDolist = [
{title:"Complete online JavaScript course",
complete:false},
    {title:"Jog around the park 3x",
        complete:false},
    {title:"10 minutes meditation",
        complete:false},
    {title:"Read for 1 hour",
        complete:false}
]
// set  data of local storage

let data = localStorage.getItem("TODO");
if (!localStorage.getItem('TODO')) {
    localStorage.setItem("TODO", JSON.stringify(toDolist));
}
toDolist = JSON.parse(data)

//add class to complete todo list
function addClass(arr){
    for (let i=0;i<arr.length;i++){
        if (arr[i]['complete']) {
            listText[i].classList.add('text')
            circle[i+1].classList.add('circle-select')
        }
        else{
            listText[i].classList.remove('text')
            circle[i+1].classList.remove('circle-select')
        }
    }
}

//function of define count of active todo list
function activeNum(){
    let activeNum=toDolist.filter(item=>item['complete']===false).length
    activeText.innerHTML=`${[activeNum]} items left`
}


// define function for creat html for to do list
function ToDoHtml(obj){
    return `
      <div class="list-item theme-position">
            <div class="theme-text list-item-contain">
            <div class="circle"></div>
            <p>${obj['title']}</p>
                </div>
            <svg class="close" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132
                 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path></svg>
        </div>
    `
}

// creat all htmls
function creatHtmls(arr) {
    return arr.map(card => {
        return ToDoHtml(card)
    }).join('')
}
list.innerHTML = creatHtmls(toDolist)
addClass(toDolist)
complete(toDolist)
closelist(toDolist)
activeNum()


//change active-complete situation
function complete(arr){
    for(let i=0;i<arr.length;i++){
       listText[i].onclick=function (){
            arr[i]['complete'] = !arr[i]['complete'];
            addClass(arr)
            activeNum()
           localStorage.setItem("TODO", JSON.stringify(toDolist));
           if(filterNum===1) onShow()
           if (filterNum===2) onActive()
           if (filterNum===3) onComplete()
        }
    }
}
//close todo list items
function closelist(arr){
    for (let i = 0; i < arr.length; i++) {
        close[i].onclick = function () {
            arr.splice(i,1)
            list.innerHTML = creatHtmls(arr)
            localStorage.setItem("TODO", JSON.stringify(toDolist));
            addClass(arr)
            complete(arr)
            closelist(arr)
            activeNum()
        }
    }
}

//  setting of dark theme
themeSvg.onclick = function (){
    if(moon.style.display==='inline-block'){
        moon.style.display='none'
        sun.style.display='inline-block'
        main.style.backgroundColor='#161722'
        theme[0].style.backgroundColor='#252736'
        theme[1].style.backgroundColor='#252736'
        theme[2].style.backgroundColor='#252736'
        document.getElementsByClassName('list')[0].style.boxShadow='2px 16px 25px #1F242AFF'
        document.getElementsByClassName('list')[1].style.boxShadow='2px 16px 25px #1F242AFF'
        main.style.backgroundImage='url("image/bg-desktop-dark.73e47dbb.jpg")'
        document.documentElement.style.setProperty('--filter-hover-color','#dcd9d9')
    }
    else{
        moon.style.display='inline-block'
        sun.style.display='none'
        main.style.backgroundColor='white'
        theme[0].style.backgroundColor='white'
        theme[1].style.backgroundColor='white'
        theme[2].style.backgroundColor='white'
        document.getElementsByClassName('list')[0].style.boxShadow='2px 16px 25px lightgray'
        document.getElementsByClassName('list')[1].style.boxShadow='2px 16px 25px lightgray'
        main.style.backgroundImage='url("image/bg-desktop-light.3508d620.jpg")'
        document.documentElement.style.setProperty('--filter-hover-color','#3d3d3d')

    }
}
//setting of input
document.getElementById('input').addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        toDolist.push({title:event.target.value,complete:false})
        document.getElementById('input').value='';
        event.preventDefault();
        list.innerHTML = creatHtmls(toDolist)
        localStorage.setItem("TODO", JSON.stringify(toDolist));
        addClass(toDolist)
        complete(toDolist)
        closelist(toDolist)
        activeNum()


    }
})
// filters setting
function onComplete(){
    filterNum=3
    completeFilter[0].style.color='var(--blue)'
    completeFilter[1].style.color='var(--blue)'
    activeFilter[0].style.color='inherit'
    activeFilter[1].style.color='inherit'
    all[0].style.color='inherit'
    all[1].style.color='inherit'
    let completeList= toDolist.filter(item=>item['complete']===true)
    list.innerHTML = creatHtmls(completeList)
    addClass(completeList)
    complete(completeList)
    closelist(completeList)
    activeNum()

}
completeFilter[0].addEventListener("click", onComplete)
completeFilter[1].addEventListener("click", onComplete)

activeFilter[0].onclick=onActive
activeFilter[1].onclick=onActive
    function onActive(){
    filterNum=2
    activeFilter[0].style.color='var(--blue)'
    activeFilter[1].style.color='var(--blue)'
    all[0].style.color='inherit'
    all[1].style.color='inherit'
    completeFilter[0].style.color='inherit'
    completeFilter[1].style.color='inherit'
    let activeList= toDolist.filter(item=>item['complete']===false)
    list.innerHTML = creatHtmls(activeList)
    addClass(activeList)
    complete(activeList)
    activeNum()
    closelist(activeList)
}

all[0].onclick=onShow
all[1].onclick=onShow
    function onShow(){
    filterNum=1
    all[0].style.color='var(--blue)'
    all[1].style.color='var(--blue)'
    activeFilter[0].style.color='inherit'
    activeFilter[1].style.color='inherit'
    completeFilter[0].style.color='inherit'
    completeFilter[1].style.color='inherit'

    list.innerHTML = creatHtmls(toDolist)
    addClass(toDolist)
    complete(toDolist)
    closelist(toDolist)
    activeNum()
}

//clear complete todolist items
clear.onclick=function () {
    toDolist = toDolist.filter(item => item['complete'] === false)
    list.innerHTML = creatHtmls(toDolist)
    addClass(toDolist)
    complete(toDolist)
    closelist(toDolist)
    activeNum()
    localStorage.setItem("TODO", JSON.stringify(toDolist));
    if (filterNum === 1) onShow()
    if (filterNum === 2) onActive()
    if (filterNum === 3) onComplete()
}

// hover setting
for (let i=0;i<filterOptions.length;i++){
    filterOptions[i].onmouseenter=function (){

        if(filterOptions[i].style.color!=='var(--blue)') filterOptions[i].style.color='var(--filter-hover-color)'
    }
    filterOptions[i].onmouseout=function (){
        for(let j=0;j<filterOptions.length;j++){
            if(filterOptions[j].style.color!=='var(--blue)')
                filterOptions[j].style.color="var(--font-color)"
        }
    }
}
