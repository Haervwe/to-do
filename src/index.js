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
    addChoreBtn.innerText = "Add new To-Do";
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
    choreNameLabel.innerText = "To Do:"
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
    formSubmit.innerText = "Add";
    formSubmit.className = "formBtn";
    formSubmit.type = "button"
    formSubmit.addEventListener("click",()=>{
        addChore();
    });
    let formCancel = document.createElement("button");
    formCancel.innerText = "Cancel";
    formCancel.className = "formBtn";
    formCancel.type = "button";
    formCancel.addEventListener("click",()=>{
        form.remove();
        btnControl = true;
    })
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
        ChoreLogic.addChore(form.choreName.value,form.choreTime.value,form.chorePrio.value);
        console.log(ChoreLogic.choresArray);
        form.remove();
        renderList();
        btnControl = true;
    }
}

function showFormatError(){
    alert("Please fill all the Boxes");
}

function renderList (){
    //resets the list and redraws the entire list in the new order
    let list = document.getElementById("choresList");
    list.innerHTML = "";
    const pattern = date.compile('ddd, MMM DD YYYY HH:mm');
    for (let i = 0;i<ChoreLogic.choresArray.length;i++){
        //create a new div for every chore in the array
        let toDo = document.createElement("li");
        toDo.className = "toDo";
        let choreName = document.createElement("p");
        choreName.innerText=`To-Do: ${ChoreLogic.choresArray[i].action}`;
        choreName.className="choreName";
        let choreTime = document.createElement("p");
        choreTime.innerText=`Estimated time: ${Math.floor(ChoreLogic.choresArray[i].esTime)} minutes.`;
        choreTime.className="choreTime";
        let chorePrio = document.createElement("p");
        chorePrio.innerText=`Priority: ${ChoreLogic.choresArray[i].priority}`;
        chorePrio.className="chorePrio";
        let choreCreation = document.createElement("p");
        let creation = date.format(ChoreLogic.choresArray[i].creation,pattern)
        choreCreation.innerText=`To Do added: ${creation}.`;
        choreCreation.className="choreCreation";
        let choreStatus = document.createElement("p");
        choreStatus.innerText=`Status: ${ChoreLogic.choresArray[i].status}.`;
        choreStatus.className="choreStatus";
        let removeChore = document.createElement("button");
        removeChore.className = "removeChore";
        removeChore.innerText = "Delete To-Do."
        //add buttons to manage each chore
        removeChore.addEventListener("click",()=>{
            if (btnControl == true) {
                ChoreLogic.removeChore(ChoreLogic.choresArray[i].id);
                toDo.remove();
            }
        });
        let changeChore = document.createElement("button");
        changeChore.className = "changeChore";
        changeChore.innerText = "Mark Complete."
        changeChore.addEventListener("click",()=>{
            if (btnControl == true) {
                ChoreLogic.changeStatus(ChoreLogic.choresArray[i].id);
                let temp = document.createElement("li");
                temp.className = "toDo";
                chorePrio.innerText = `Priority: ${ChoreLogic.choresArray[i].priority}`;
                choreStatus.innerText = `Status: ${ChoreLogic.choresArray[i].priority}`;
                toDo.remove();
                temp.appendChild(choreName);
                temp.appendChild(choreTime);
                temp.appendChild(chorePrio);
                temp.appendChild(choreStatus);
                temp.appendChild(choreCreation);
                temp.appendChild(removeChore);
                list.appendChild(temp);
            }
        });
        toDo.appendChild(choreName);
        toDo.appendChild(choreTime);
        toDo.appendChild(chorePrio);
        toDo.appendChild(choreStatus);
        toDo.appendChild(choreCreation);
        toDo.appendChild(removeChore);
        if (ChoreLogic.choresArray[i].priority > 0){
            toDo.appendChild(changeChore);
        }
        list.appendChild(toDo);
    }
}

showChoresList();
renderList();

const listAn = document.getElementById('choresList')
  autoAnimate(listAn);

