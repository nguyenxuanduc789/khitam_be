const permissionAccess = (level,controller,action)=>{
    const permissions = {
        Administrator:"all",
        Campus:{
            user:["view","create"],
            test:["view"]
        },

    }
    
    // case
    if(permissions[level][controller].include(action)  || permissions[level]==="all" || permissions[controller]==="all" ){
        return true;
    }
    return false;
}
module.exports={permissionAccess};
