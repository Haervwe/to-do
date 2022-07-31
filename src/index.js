import { ChoreLogic } from "./logic";

const container =  document.getElementById("mainContainer");

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



