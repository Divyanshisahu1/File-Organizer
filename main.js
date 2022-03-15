//entry point of my command line
let inputArr=process.argv.slice(2);
let command=inputArr[0];
let path=inputArr[1];
let helpFunc=require("./commands/help");
let orgFunc=require("./commands/organize")
switch(command){
    case "tree":
        //call tree function
        console.log("tree function is executed successfully"+path);
        break;
    case "organize":
        // call organize function
        orgFunc.organize(path);
        console.log("organize function is executed successfully"+path);
        break;
    case "help":
        //call help function
        console.log("help function is executed successfully"+path);
        helpFunc.help();
        break;
    default:
        console.log("Command not recognized :/");
        
}
