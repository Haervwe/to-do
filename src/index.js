import { ChoreLogicBundle } from "./logic";
//const container =  document.getElementById("mainContainer");


ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");
ChoreLogicBundle.addChore("test","0sec","1");

ChoreLogicBundle.removeChore(3);
ChoreLogicBundle.changeStatus(5);
ChoreLogicBundle.removeChore(10);
console.log(ChoreLogicBundle.choresArray);



