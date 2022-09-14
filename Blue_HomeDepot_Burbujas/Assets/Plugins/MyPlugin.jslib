mergeInto(LibraryManager.library, {

  

  EnviarMsj: function (str) {

    var a= MyState(str);
   window.parent.postMessage(JSON.stringify(a), '*')
  },


MyState: function (i)
{
    switch(i)
    {
        case "gameopen":
        state: 'gameopen';
        break;

        case "btn_gameclose":
        state: 'btn_gameclose';
        break;

        case "btn_siguiente1":
        state: 'btn_siguiente1';
        break;

        case "btn_back":
        state: 'btn_back';
        break;

        case "btn_comenzar":
        state: 'btn_comenzar';
        break;

        case "btn_siguiente2":
        state: 'btn_siguiente2';
        break;

        case "gamestart":
        state: 'gamestart';
        break;
    }
},



   DatosFinales: function(score, tool1, tool2, tool3, tool4, errors) {
        var requestMsg = {
            state: 'gameover',
            score: score,
            tool1: tool1,
            tool2: tool2,
            tool3: tool3,
            tool4: tool4,
            errors: errors,
        }
        
        window.parent.postMessage(JSON.stringify(requestMsg), '*')
    },


  PrintFloatArray: function (array, size) {
    for(var i = 0; i < size; i++)
    console.log(HEAPF32[(array >> 2) + i]);
  },

  AddNumbers: function (x, y) {
    return x + y;
  },

  StringReturnValueFunction: function () {
    var returnStr = "bla";
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },

  BindWebGLTexture: function (texture) {
    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[texture]);
  },

});