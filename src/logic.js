import date from "date-and-time";

const ChoreLogic = (()=>{
    
    const ToDoFactory = (action, esTime, priority, creation, previusid, previousStatus)=>{
        let internalId;
        let status;
        if (creation == null || creation == undefined){
            creation = new Date();
        }else {
            creation = new Date(creation);
        }
        if(previusid == null || previusid == undefined){
            id++;
            internalId = id;
        } else {
            internalId = previusid;
        }
        if(previousStatus == null || previousStatus == undefined){
            status = "incomplete"
        } else {
            status = previousStatus;
        }
        //const pattern = date.compile('ddd, MMM DD YYYY HH:mm');
        function changeStatusInternal(){
            if (this.status != "incomplete"){
                return;
            }
            let now = new Date();//date.format(new Date(),pattern); 
            let time = date.subtract(now, this.creation).toMinutes();        
            this.status = `completed in ${time} minutes`;
            this.priority = 0;
        }
        return {
            id: internalId,
            action: action,
            esTime: esTime,
            priority: priority,
            creation: creation,
            status: status,
            changeStatusInternal,
        }
    };

    let choresArrayDumb = [];
    let choresArray = [];
    let id = 0;
    if (localStorage.getItem("to-do-data") == null) {
        localStorage.setItem("to-do-data",JSON.stringify([]));
        choresArrayDumb = JSON.parse(localStorage.getItem("to-do-data"));
        
    } else {
        choresArrayDumb = JSON.parse(localStorage.getItem("to-do-data"));
        if (choresArrayDumb.length == 0){
            id = 0;
        }else {
            for (let i = 0; i < choresArrayDumb.length;i++ ){
                if (choresArrayDumb[i].id>id){
                    id = choresArrayDumb[i].id;
                }
                choresArray.push(ToDoFactory(choresArrayDumb[i].action, choresArrayDumb[i].esTime, choresArrayDumb[i].priority, choresArrayDumb[i].creation, choresArrayDumb[i].id, choresArrayDumb[i].status))
            }
        } 
    }

   

    function addChore (action,esTime,priority){
        let chore = ToDoFactory(action,esTime,priority);
        choresArray.push(chore);
        orderByPriority()
    }

    function orderByPriority(){
        choresArray = choresArray.sort((a,b)=>{
            if (a.priority < b.priority) {
                return 1;
            }
            if (a.priority > b.priority){
                return -1;
            }
            return 0;
        });
        localStorage.setItem("to-do-data",JSON.stringify(choresArray));
    }

    function changeStatus (id){
        for(let i = 0;i<choresArray.length;i++){
            if (id == choresArray[i].id){
                choresArray[i].changeStatusInternal();
                orderByPriority()
                return;
            }
        }
    }

    function removeChore (id){
        for (let i = 0; i<choresArray.length;i++){
            if (id == choresArray[i].id){
                choresArray.splice(i,1);
                orderByPriority()
                return;
            }
        }
    }
    
    return {
        choresArray,
        addChore,
        removeChore,
        changeStatus,
    }
})();

export {ChoreLogic};