const {helpReact} = require("./interractions");
module.exports.TrueType = v => {
  switch (typeof v) {
    case "object":
      if (v == null) return "null";
      if (v.length != undefined) return "array";
      return "object"
      break;
    case "number":
      if (isNaN(v)) return "nan";
      return "number";
      break;
    case "function":
      return "function"
      try {
        let k = new v();
        return v.name;
      } catch (err) {
        return "function"
      }
      break;
    default:
      return typeof v;
  }
}
class PermissionResponse{
  constructor(succeeded = false, error = ""){
    this.hasPerm = succeeded;
    this.message = error;
  }
}
module.exports.checkPermissions = (helpObj, message, bot) => {
  if(helpObj.owner && message.author.id != bot.owner.id)return false;
  if(helpObj.server && message.channel.type != "text"){
    return false;
  }else if(!helpObj.server){
    return true;
  }

  if (message.author.id == bot.owner.id){
    return true;
  }

  if (!helpObj.owner){
    if(message.member.hasPermission(helpObj.perms || []))
    return true;
  }
  return false;
}

module.exports.Cleanup = function Cleanup(callback) {

    // attach user callback to the process event emitter
    // if no callback, it will still exit gracefully on Ctrl-C
    callback = callback || noOp;
    process.on('cleanup', callback);

    // do app specific cleaning before exiting
    process.on('exit', function () {
      process.emit('cleanup');
    });

    // catch ctrl+c event and exit normally
    process.on('SIGINT', function () {
      console.log('Ctrl-C...');
      process.exit(2);
    });

    //catch uncaught exceptions, trace, then exit normally
    process.on('uncaughtException', function (e) {
          console.log('Uncaught Exception...');
          console.log(e.stack);
          process.exit(99);
    });
};

module.exports.clearLogs = () => {
  console.log(Array(40).join("\n"));
}