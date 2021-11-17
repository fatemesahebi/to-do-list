// let input=document.getElementById('input')
let listText= document.getElementsByClassName('theme-text')
let circle=document.getElementsByClassName('circle')
let close=document.getElementsByClassName('close')
let list=document.getElementById('list--items')
let moon=document.getElementById('moon')
let sun=document.getElementById('sun')
let main=document.getElementsByClassName('main')
let theme=document.getElementsByClassName('theme')
let themeSvg=document.getElementsByClassName('theme-svg')
let activeFilter=document.getElementById('active')
let completeFilter=document.getElementById('complete')
let all=document.getElementById('all')

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

let acivenum=toDolist.filter(item=>item['complete']===false).length

// define function for creat html for to do list
function ToDoHtml(obj){
    return `
      <div class="list-item theme-position">
            <div class="theme-text">
            <div class="circle"></div>
            <p>${obj['title']}</p>
                </div>
            <svg class="close" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132
                 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path></svg>
        </div>
    `
}
function addClass(arr){
    for (let i=0;i<arr.length;i++){
        if (arr[i]['complete']) {
            listText[i].classList.add('text')
            circle[i].classList.add('circle-select')
        }
        else{
            listText[i].classList.remove('text')
            circle[i].classList.remove('circle-select')
        }
    }
}
// creat all htmls
function creatHtmls(arr) {
    return arr.map(card => {
        return ToDoHtml(card)
    }).join('')
}

function complete(arr){
    for(let i=1;i<=arr.length;i++){
        listText[i].onclick=function (){
            arr[i]['complete'] = !arr[i]['complete'];
            addClass(toDolist)
        }
    }
}
function closelist(arr){
    for (let i = 0; i < arr.length; i++) {
        close[i].onclick = function () {
            arr.splice(i,1)
            list.innerHTML = creatHtmls(arr)
            addClass(arr)
            complete(arr)
            closelist(arr)
        }
    }
}

list.innerHTML = creatHtmls(toDolist)
addClass(toDolist)
complete(toDolist)
closelist(toDolist)


//********************



themeSvg.onclick = function (){
    if(moon.style.display==='inline-block'){
        moon.style.display='none'
        sun.style.display='inline-block'
        main.style.backgroundColor='black'
        theme.style.backgroundColor='#4d5066;'
        console.log('**')
    }
    else{
        moon.style.display='inline-block'
        sun.style.display='none'
        main.style.backgroundColor='white'
        theme.style.backgroundColor='white;'
        console.log('&&')
    }
}

document.getElementById('input').addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        toDolist.push({title:event.target.value,complete:false})
        document.getElementById('input').value='';
        event.preventDefault();
        list.innerHTML = creatHtmls(toDolist)
        addClass(toDolist)
        complete(toDolist)
        closelist(toDolist)

    }
})
completeFilter.onclick=function (){
    completeFilter.style.color='blue'
    activeFilter.style.color='inherit'
    all.style.color='inherit'
  let completeList= toDolist.filter(item=>item['complete']===true)
    console.log(completeList)
    list.innerHTML = creatHtmls(completeList)
    addClass(completeList)
    complete(completeList)
    closelist(completeList)
}

activeFilter.onclick=function (){
    activeFilter.style.color='blue'
    all.style.color='inherit'
    completeFilter.style.color='inherit'
    let activeList= toDolist.filter(item=>item['complete']===false)
    list.innerHTML = creatHtmls(activeList)
    addClass(activeList)
    complete(activeList)
    closelist(activeList)
}
all.onclick=function (){
    all.style.color='blue'
    activeFilter.style.color='inherit'
    completeFilter.style.color='inherit'

    list.innerHTML = creatHtmls(toDolist)
    addClass(toDolist)
    complete(toDolist)
    closelist(toDolist)
}
