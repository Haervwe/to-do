import { ChoreLogic } from "./logic";
import date from "date-and-time";
import "./style.scss";
import autoAnimate from '@formkit/auto-animate'


const container =  document.getElementById("mainContainer");
let btnControl = true;
function showChoresList () {
    //header html injector.
    let header = document.createElement("div");
    let headerText = document.createElement("h1");
    header.id = "header"
    headerText.innerText = "To-Do List";
    headerText.class = "title";
    header.appendChild(headerText);
    container.appendChild(header);
    //Ul injector
    let content = document.createElement("div");
    let list = document.createElement("ul");
    let addChoreBtn = document.createElement("button");
    list.id = "choresList";
    content.id = "choreListContainer";
    addChoreBtn.id = "newChoreBtn";
    addChoreBtn.addEventListener("click",()=>{
        if (btnControl == true) {
            btnControl = false;
            showNewChore()
        } 
    });
    content.appendChild(list);
    content.appendChild(addChoreBtn);
    container.appendChild(content);
    //Footer injector
    let footer = document.createElement("div");
    let footerTitle = document.createElement("h5");
    footer.id = "footer";
    footerTitle.id = "footerText";
    footerTitle.innerText = "Crafted by Haervwe";
    footer.appendChild(footerTitle);
    container.appendChild(footer);
}

function showNewChore (){
    //show form to input the new chore
    let form = document.createElement("form");
    form.id = "newChore";
    form.method = "get";
    form.action = "";
    let formTitle = document.createElement("h3");
    formTitle.innerText = "New To-Do:"
    form.appendChild(formTitle);
    let choreNameContainer = document.createElement("div");
    choreNameContainer.id = "choreNameContainer";
    let choreNameLabel = document.createElement("label");
    choreNameLabel.for = "choreName";
    choreNameLabel.innerText = "To Do:";
    let choreName = document.createElement("input");
    choreName.id = "choreName";
    choreName.type = "text";
    choreName.placeholder = "Study Algorithms";
    choreName.name = "choreName";
    choreNameContainer.appendChild(choreNameLabel);
    choreNameContainer.appendChild(choreName);
    let choreTimeContainer = document.createElement("div");
    choreTimeContainer.id = "choreTimeContainer";
    let choreTimeLabel = document.createElement("label");
    choreTimeLabel.for = "choreTime";
    choreTimeLabel.innerText = "Estimated time (in minutes):"
    let choreTime = document.createElement("input");
    choreTime.id = "choreTime";
    choreTime.type = "number";
    choreTime.placeholder = "60";
    choreTime.name = "choreTime";
    choreTimeContainer.appendChild(choreTimeLabel);
    choreTimeContainer.appendChild(choreTime);
    let chorePrioContainer = document.createElement("div");
    chorePrioContainer.id = "chorePrioContainer";
    let chorePrioLabel = document.createElement("label");
    chorePrioLabel.for = "chorePrio";
    chorePrioLabel.innerText = "Priority in number:"
    let chorePrio = document.createElement("input");
    chorePrio.id = "chorePrio";
    chorePrio.type = "number";
    chorePrio.placeholder = "5";
    chorePrio.name = "chorePrio";
    chorePrioContainer.appendChild(chorePrioLabel);
    chorePrioContainer.appendChild(chorePrio);
    //add buttons to the chore form
    let btnContainer = document.createElement("div");
    btnContainer.id = "btnContainer";
    let formSubmit = document.createElement("button");
    formSubmit.className = "formBtn submit";
    formSubmit.type = "button";
    formSubmit.addEventListener("click",()=>{
        addChore();
    });
    let formCancel = document.createElement("button");
    formCancel.className = "formBtn cancel";
    formCancel.type = "button";
    formCancel.addEventListener("click",()=>{
        form.remove();
        btnControl = true;
    });
    btnContainer.appendChild(formSubmit);
    btnContainer.appendChild(formCancel);
    form.appendChild(choreNameContainer);
    form.appendChild(choreTimeContainer);
    form.appendChild(chorePrioContainer);
    form.appendChild(btnContainer);
    container.appendChild(form);
}

function addChore () {
    let form = document.getElementById("newChore");
    if (form.choreName.value == "" || form.chorePrio.value == "" ||form.choreTime.value == ""){
        showFormatError();
    }
    else {
        let id = ChoreLogic.addChore(form.choreName.value,form.choreTime.value,form.chorePrio.value);
        console.log(id);
        renderToDo(id);
        form.remove();
        btnControl = true;
    }
}

function showFormatError(){
    alert("Please fill all the Boxes");
}

function renderToDo (id){
    console.log(ChoreLogic.choresArray[getIndex(id)]);
    const pattern = date.compile('ddd, MMM DD YYYY HH:mm');
    let list = document.getElementById("choresList");
    //create a new div and elements for the to do
    let toDo = document.createElement("li");
    toDo.className = "toDo";
    let choreName = document.createElement("p");
    choreName.innerText=`To-Do: ${ChoreLogic.choresArray[getIndex(id)].action}`;
    choreName.className="choreName";
    let choreTime = document.createElement("p");
    choreTime.innerText=`Estimated time: ${Math.floor(ChoreLogic.choresArray[getIndex(id)].esTime)} minutes.`;
    choreTime.className="choreTime";
    let chorePrio = document.createElement("p");
    chorePrio.innerText=`Priority: ${ChoreLogic.choresArray[getIndex(id)].priority}.`;
    chorePrio.className="chorePrio";
    let choreCreation = document.createElement("p");
    let creation = date.format(ChoreLogic.choresArray[getIndex(id)].creation,pattern)
    choreCreation.innerText=`To Do added: ${creation}.`;
    choreCreation.className="choreCreation";
    let choreStatus = document.createElement("p");
    choreStatus.innerText=`Status: ${ChoreLogic.choresArray[getIndex(id)].status}.`;
    choreStatus.className="choreStatus";
    let removeChore = document.createElement("button");
    removeChore.className = "removeChore";
    //add buttons to manage the to do
    removeChore.addEventListener("click",()=>{
        if (btnControl == true) {
            ChoreLogic.removeChore(id);
            toDo.remove();
        }
    })
    let changeChore = document.createElement("button");
    changeChore.className = "changeChore";
    changeChore.addEventListener("click",()=>{
        if (btnControl == true) {
            ChoreLogic.changeStatus(id)
            let temp = document.createElement("li");
            temp.className = "toDo";
            chorePrio.innerText = `Priority: ${ChoreLogic.choresArray[getIndex(id)].priority}.`;
            choreStatus.innerText = `Status: ${ChoreLogic.choresArray[getIndex(id)].status}`;
            removeChore.addEventListener("click",()=>{
                if (btnControl == true) {
                    console.log(ChoreLogic.choresArray[getIndex(id)].id);
                    ChoreLogic.removeChore(ChoreLogic.choresArray[getIndex(id)].id);
                    temp.remove();
                }
            })
            toDo.remove();
            temp.appendChild(choreName);
            temp.appendChild(choreTime);
            temp.appendChild(chorePrio);
            temp.appendChild(choreStatus);
            temp.appendChild(choreCreation);
            temp.appendChild(removeChore);
            let nextInt = document.querySelector(`#choresList li:nth-child(${getIndex(id)+1})`);
            list.insertBefore(temp, nextInt);
        }
    });
    toDo.appendChild(choreName);
    toDo.appendChild(choreTime);
    toDo.appendChild(chorePrio);
    toDo.appendChild(choreStatus);
    toDo.appendChild(choreCreation);
    toDo.appendChild(removeChore);
    if (ChoreLogic.choresArray[getIndex(id)].priority > 0){
        toDo.appendChild(changeChore);
    }
    let next = document.querySelector(`#choresList li:nth-child(${getIndex(id)+1})`);
    list.insertBefore(toDo, next);
    
}

function getIndex(id){
    for (let i = 0; i < ChoreLogic.choresArray.length ; i++){
        if (id == ChoreLogic.choresArray[i].id ){
            return i;
        }
    }
}

function renderList (){
    //resets the list and redraws the entire list in the new order
    let list = document.getElementById("choresList");
    list.innerHTML = "";
    for (let i = 0;i<ChoreLogic.choresArray.length;i++){
        renderToDo(ChoreLogic.choresArray[i].id);
    }
}

showChoresList();
renderList();

const listAn = document.getElementById('choresList');
autoAnimate(listAn);