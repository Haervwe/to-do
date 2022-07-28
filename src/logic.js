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
        let now = new Date();
        let status = "incomplete"
        date.format(now, 'YYYY/MM/DD HH:mm:ss');
        const pattern = date.compile('ddd, MMM DD YYYY');
        console.log(action, esTime, priority);
        return {
            id: id,
            action: action,
            esTime: esTime,
            priority: priority,
            creation: date.format(now, pattern),
            status: status
        }
    };

    function addChore (action,esTime,priority){
        let chore = ToDoFactory(action,esTime,priority);
        choresArray.push(chore);
    }

    function removeChore (id){
        for (let i = 0; i<choresArray.length;i++){
            if (id == choresArray[i].id){
                choresArray.splice(i,1);
            }
        }
    }
    
    return {
        choresArray,
        addChore,
        removeChore,
    }
})();

export {ChoreLogicBundle};