
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
  let arg = text.replace(input[0],'').trim();
  if (command === 'quit' || command === 'exit') {
    quit();
  }
  else if(command === "hello"){
    if (input.length > 1){
      hello(arg);
    }
    else{
      hello('hello');
    }
  }
  else if(command === 'help'){
    help();
  }
  else if(command === 'list'){
    list();
  }
  else if(command == 'add'){
    if (input.length > 1){
      add(arg);
    }
    else{
      console.log("Error! Nothing to add.")
    }
  }
  else if(command == 'remove'){
    remove(arg)
  }
  else if(command == 'edit'){
    edit(arg);
  }
  else if(command === 'check'){
    check(arg);
  }
  else if(command === 'uncheck'){
    uncheck(arg);
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
  if (h === "hello"){
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
  console.log('All possible commands:\n\'hello\':Says hello!\n\'hello x\': Says hello x!\n\'help\':Lists all the possible commands.\n\'add x\': adds tasks\n\'list\': lists all tasks\n\'remove\': removes last added task\n\'remove n\': removes nth task\n\'check n\': adds a check before the done task number n\n\'uncheck n\': removes a check before the undone task number n\n\'quit\' or \'exit\':Exits the application.')
}


/**
 * lists all tasks 
 * 
 *
 * @returns {void}
 */
function list(){
  console.log("List of all tasks:   ")
  for(let i=0; i<data.tasks.length;i++){
    if (data.tasks[i].done){
      console.log(i+1+". [✓] "+data.tasks[i].text)
    }
    else {
      console.log(i+1+". [ ] "+data.tasks[i].text)
    }
  }
}


/**
 * adds tasks 
 * 
 *
 * @returns {data}
 */
function add(a){
  var newTask = {
    "text": a,
    "done": false
    }
  data.tasks.push(newTask);
  return data;  
}

/**
 * removes tasks 
 * 
 *
 * @returns {data}
 */
function remove(r){
  if(r>data.tasks.length){
    console.log('Task number '+r+' does not exist')
  }
  else if(r === ''){
    data.tasks.splice(data.tasks.length-1,1)
  }
  else{
    data.tasks.splice(r-1,1);
  }
  return data;  
}


/**
 * edits tasks 
 * 
 *
 * @returns {data}
 */
function edit(e){
  if (e === ''){
    console.log('No edit given')
  } 
  else{
    const argArray = e.split(' ');
    let number = argArray[0].trim();
    if(isNaN(number)){
      data.tasks[data.tasks.length-1].text = e;
    }
    else{
      if(number>data.tasks.length){
        console.log('Task number '+number+' does not exist')
      }
      else{
        let editArg = e.replace(argArray[0],'').trim();
        if (editArg === ''){
          console.log('No edit given')
        }
        else{
          data.tasks[number-1].text = editArg;
        }
      }
    }
  }
  return data
}


/**
 * checks tasks that are done 
 * 
 *
 * @returns {data}
 */
function check(ch){
  if(isNaN(ch) || ch === ''){
    console.log('Number of task not provided')
  }
  else{
    if (ch>data.tasks.length || ch<=0){
      console.log('Task number '+ch+' does not exist')
    }
    else{
      data.tasks[ch-1].done = true
    }
  } 
  return data 
}


/**
 * unchecks tasks that are not done 
 * 
 *
 * @returns {data}
 */
function uncheck(u){
  if(isNaN(u) || u === ''){
    console.log('Number of task not provided')
  }
  else{
    if (u>data.tasks.length || u<=0){
      console.log('Task number '+u+' does not exist')
    }
    else{
      data.tasks[u-1].done = false
    }
  } 
  return data 
}

// The following line starts the application
startApp("Elina Karout");
const data = require('./test.json');