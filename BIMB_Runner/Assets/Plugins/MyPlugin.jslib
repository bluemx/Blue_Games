mergeInto(LibraryManager.library, {

  

  EnviarMsj: function (str) {

    
   window.parent.postMessage(JSON.stringify( {state: UTF8ToString( str )} ), '*')
  },


MyState: function (i)
{
    switch(UTF8ToString(i))
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



   DatosFinales: function(score, tool1, tool2, tool3, tool4, tool5, tool6, tool7, errors) {
        var requestMsg = {
            state: 'gameover',
            score: score,
            tool1: tool1,
            tool2: tool2,
            tool3: tool3,
            tool4: tool4,
            tool5: tool5,
            tool6: tool6,
            tool7: tool7,
            errors: errors,
        }
        
        window.parent.postMessage(JSON.stringify(requestMsg), '*')
    },


 

});