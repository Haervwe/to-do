import { ChoreLogic } from "./logic";

const container =  document.getElementById("mainContainer");


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
    addChoreBtn.addEventListener("click",showNewChore);
    content.appendChild(addChoreBtn);
    content.appendChild(list);
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
    let btnContainer = document.createElement("div");
    btnContainer.id = "btnContainer";
    let formSubmit = document.createElement("button");
    formSubmit.innerText = "Add";
    formSubmit.className = "formBtn";
    formSubmit.type = "button"
    formSubmit.addEventListener("click",addChore);
    let formCancel = document.createElement("button");
    formCancel.innerText = "Cancel";
    formCancel.className = "formBtn";
    formCancel.type = "button";
    formCancel.addEventListener("click",()=>{
        form.remove();
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
    }
}

function showFormatError(){

}

function renderList (){
    let list = document.getElementById("choresList");
    list.innerHTML = "";
    for (let i = 0;i<ChoreLogic.choresArray.length;i++){
        let toDo = document.createElement("div");
        toDo.className = "toDo";
        let choreName = document.createElement("p");
        choreName.innerText=`${ChoreLogic.choresArray[i].action}`;
        choreName.className="choreName";
        let choreTime = document.createElement("p");
        choreTime.innerText=`Estimated time: ${ChoreLogic.choresArray[i].esTime} minutes.`;
        choreTime.className="choreTime";
        let chorePrio = document.createElement("p");
        chorePrio.innerText=`Priority: ${ChoreLogic.choresArray[i].priority}`;
        chorePrio.className="chorePrio";
        let choreCreation = document.createElement("p");
        choreCreation.innerText=`To Do added: ${ChoreLogic.choresArray[i].creation}.`;
        choreCreation.className="choreCreation";
        let choreStatus = document.createElement("p");
        choreStatus.innerText=`Status: ${ChoreLogic.choresArray[i].status}.`;
        choreStatus.className="choreStatus";
        let removeChore = document.createElement("button");
        removeChore.class = "removeChore";
        removeChore.innerText = "Delete To-Do."
        removeChore.addEventListener("click",()=>{
            ChoreLogic.removeChore(ChoreLogic.choresArray[i].id);
            renderList();
        });
        let changeChore = document.createElement("button");
        changeChore.class = "changeChore";
        changeChore.innerText = "Mark Complete."
        changeChore.addEventListener("click",()=>{
            ChoreLogic.changeStatus(ChoreLogic.choresArray[i].id);
            renderList();
        });
        toDo.appendChild(choreName);
        toDo.appendChild(choreTime);
        toDo.appendChild(chorePrio);
        toDo.appendChild(choreStatus);
        toDo.appendChild(choreCreation);
        toDo.appendChild(removeChore);
        toDo.appendChild(changeChore);
        list.appendChild(toDo);
    }
}
showChoresList();

/*
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.addChore("test","0sec","1");
ChoreLogic.removeChore(3);
ChoreLogic.changeStatus(5);
ChoreLogic.removeChore(10);
console.log(ChoreLogic.choresArray);
*/



