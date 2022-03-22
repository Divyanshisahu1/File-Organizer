const fs=require("fs");//fs module
const path=require("path");//path module
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}
function organize(srcPath){
    //1)to check if srcPath is present
    if(srcPath==undefined){
        //The process.cmd() method returns the current working directory of the Node.js
        //console.log(srcPath);//undefined
        srcPath=process.cwd();
        //console.log("Source path is",srcPath);
    }
    //2)To create a directory==>organized_files
    let organizedFiles=path.join(srcPath,"organized_files");
    //let organizedFiles=srcPath+"/"+"organized_files"
    console.log("organized file folder is",organizedFiles);
    if(fs.existsSync(organizedFiles)==false){
        //if organizedfiles folder doesnot exist then make a folder otherwise dont do

        fs.mkdirSync(organizedFiles);
    }
    else{
        console.log("file already exists");
    }
    ////3.scan the entire srcPath (downloads folder in this case)
    let allFiles=fs.readdirSync(srcPath);
    console.log("the files are",allFiles);

    //4.traverse over all the files and classify them on the basis of their extension(.pdf,.mp3)
    for(let i=0;i<allFiles.length;i++){
    let fullPathOfFile=path.join(srcPath,allFiles[i]);
        console.log(fullPathOfFile);
        //1.)check if it is a file or folder
        //lstatsync gives the information regarding the link provied
        let isThisAFile=fs.lstatSync(fullPathOfFile).isFile();//true if file hai otherwise false(folder hai)
        console.log(allFiles[i]+" is "+ isThisAFile);
        if(isThisAFile){
            //1.1 get ext name
         //let ext=allFiles[i].split(".")[1];
        //extname returns the extension of the file
        let ext=path.extname(allFiles[i]).split(".")[1];
        //console.log(ext);
        //1.2)get folder name from extention
        let folderName=getFolderName(ext.toLowerCase());//archives
        console.log(folderName);
        //1.3)copy from src folder (srcPath) and paste in dest folder(folder_name e.g. document,media etc)
                       //copy  //what to  copy //destination
        copyFileToDest(srcPath,fullPathOfFile,folderName);
            
        }
    
    }

}
function getFolderName(ext){
//magic
for(let key in types){
    //console.log(key);
    for(let i=0;i<types[key].length;i++){
        if(types[key][i]==ext){
            return key;
        }
    }
}
return "miscallaneous";
}
function copyFileToDest(srcPath,fullPathOfFile,folderName){
    //magic
    //1. tell the path of folderName
    let destFolderPath=path.join(srcPath,"organized_files",folderName);//...../document/organized_files/archives
    //console.log(des);
    //2. check folder if exists,if it does not ,then make folder
    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }
    //3. copy file from src folder to dest folder
    //Returns the last porstion of a path
    let fileName=path.basename(fullPathOfFile);//abc.zip
    let desFileName=path.join(destFolderPath,fileName);

                    //src          //dest
    fs.copyFileSync(fullPathOfFile,desFileName);
    //magic
}

let srcPath="C:\\Users\\Dell\\Desktop\\FJP-NADOS\\learning\\Node\\fileOrganizer\\downloads"; 
organize(srcPath);
module.exports={
    organize:organize
}