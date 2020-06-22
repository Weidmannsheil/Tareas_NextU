var Usuario = require('./modelUsuarios.js')

module.exports.crearUsuarioDemo = function(callback){
  var arr = [{ email: 'julioandresaguilar@gmail.com', user: "jaguilar", password: "juliopass1987"}, { email: 'pamela@southlander.org', user: "pame1996", password: "pamelita2020"}];
  Usuario.insertMany(arr, function(error, docs) {
    if (error){
      if (error.code == 11000){
        callback("Utilice los siguientes datos: </br>usuario: jaguilar | password:juliopass1987 </br>usuario: pame1996 | password:pame1996")
      }else{
        callback(error.message)
      }
    }else{
      callback(null, "El usuario 'jaguilar' y 'pame1996' se han registrado correctamente. </br>usuario: jaguilar | password:juliopass1987 </br >usuario: pame1996 | password:pamelita2020")
    }
  });
}
