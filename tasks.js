
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const input = text.split(" ");
  let command = input[0].trim();
  if (command === 'quit' || command === 'exit') {
    quit();
  }
  else if(command === "hello"){
    if (input.length > 1){
      var arg = input[1].trim();
    }
    else{
      arg = ""
    }
    hello(arg);
  }
  else if(command === 'help'){
    help();
  }
  else if(command === 'list'){
    list();
  }
  else if(command == 'add'){
    if (input.length > 1){
      var arg = input[1].trim();
      add(arg);
    }
    else{
      console.log("Error! Nothing to add.")
    }
  }
  else if(command == 'remove'){
    if(input.length>1){
      remove(input[1]);
    }
    else{
      remove(task.length)
    }
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(h){
  if (h === ""){
    console.log("hello!")
  }
  else {
    console.log('hello '+h.trim()+"!")
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help(){
  console.log('All possible commands:\n\'hello\':Says hello!\n\'hello\' + any argument: Says hello argument!\n\'quit\' or \'exit\':Exits the application.\n\'help\':Lists all the possible commands.')
}


/**
 * lists all tasks 
 *
 *
 * @returns {void}
 */
function list(){
  console.log("List of all tasks:   ")
  for(let i=0; i<task.length;i++){
    console.log(i+1+". "+task[i])
  }
}


/**
 * adds tasks 
 *
 *
 * @returns {void}
 */
function add(a){
  task.push(a);
  return task;  
}

/**
 * removes tasks 
 *
 *
 * @returns {void}
 */
function remove(r){
  task.splice(r-1,1);
  return task;  
}


// The following line starts the application
startApp("Elina Karout");
const task =["Wake up"];
