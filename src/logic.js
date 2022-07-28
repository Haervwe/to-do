import date from "date-and-time";

const ChoreLogicBundle = (()=>{
    let choresArray = [];
    let id;
    //if (localStorage.getItem("data") == null) {
      //  localStorage.setItem("data",JSON.stringify([]));
        //choresArray = JSON.parse(localStorage.getItem("data"));
        id = 0;
   // } else {
     //   choresArray = JSON.parse(localStorage.getItem("data"));
       // id = choresArray[-1].id;
    //}

    const ToDoFactory = (action, esTime, priority)=>{
        id++;
        let creation = new Date();
        var status = "incomplete"
        //const pattern = date.compile('ddd, MMM DD YYYY HH:mm');
        function changeStatusInternal (){
            let now = new Date();//date.format(new Date(),pattern); 
            console.log(now);
            console.log(this.creation);
            let time = date.subtract(now, this.creation).toMilliseconds();           
            this.status = `complete in ${time} minutes`;
            this.priority = 0;
        }
        return {
            id: id,
            action: action,
            esTime: esTime,
            priority: priority,
            creation: creation,
            status: status,
            changeStatusInternal,
        }
    };

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

export {ChoreLogicBundle};