


//SETUP 
    const follower = createFollower()
    let active=false
    let message=""
    let lastMetaPressTime = 0;
    const doublePressThreshold = 300
    let timeout
    createAnimatedLink()


function moveFollower(event) {
    //setTimeout(()=>{
    //},100)
    //if(active){
        follower.style.left = event.pageX + 'px';
        follower.style.top = event.pageY + 'px';
    //}
  }

document.addEventListener('mousemove', moveFollower);


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse)=> {
      if (request.action === "active") {
        follower.innerHTML=request.value.length>12?capitalizeFirstLetter(request.value).substring(0,12) + "...<b style='margin-left:8px'>copied!</b>":capitalizeFirstLetter(request.value)+"...<b style='margin-left:8px'>copied!</b>"
        showFollower()

      }
      return true; // Retorno necesario si la respuesta es asíncrona
    }
  );

function createAnimatedLink(){
    var a = chrome.runtime.getURL("css/style.css");
    var link = document.createElement('link');

    // Establecer los atributos del elemento link
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = a; // 'a' es la variable que contiene la URL de tu hoja de estilos

    // Agregar el elemento link al elemento head del documento
    document.head.appendChild(link);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createFollower(){
        // Crear un nuevo elemento div
        var mouseFollower = document.createElement('div');

        // Asignar ID y clase al nuevo elemento
        mouseFollower.id = 'cn-mouse-follower';
        mouseFollower.className = 'cn-mouse-follower';

        // Prepend the new element to the body
        // El método prepend no es soportado en IE
        if(document.body.prepend) {
            document.body.prepend(mouseFollower);
        } else {
            // Para IE y navegadores más antiguos que no soportan prepend
            document.body.insertBefore(mouseFollower, document.body.firstChild);
        }
        return mouseFollower;
}

function showFollower(){
    active=true

    follower.classList.remove("animate__animated")
    follower.classList.remove("animate__zoomOutRight")
    follower.style.display="flex";
    follower.classList.add("animate__animated")
    follower.classList.add("animate__zoomInRight")
    follower.classList.add("animate__fast")
    clearTimeout(timeout)
    timeout=setTimeout(()=>{
        hideFollower()
    },5000)
}
function hideFollower(){
    active=false
    follower.classList.remove("animate__zoomInRight")
    follower.classList.add("animate__zoomOutRight")

    timeout=setTimeout(()=>{
        follower.style.display="none";
        follower.innerHTML=""
    },400)
    

}


document.addEventListener('keydown', function(event) {
    // Verifica si la tecla meta (Command/Windows) fue presionada
    if (event.metaKey) {
      const currentTime = new Date().getTime();
  
      // Comprueba si la diferencia entre la última pulsación y la actual es menor que el umbral definido
      if (currentTime - lastMetaPressTime < doublePressThreshold) {
        console.log('Doble metaKey detectado!');
        // Coloca aquí la función o código que quieres ejecutar en la doble pulsación
            navigator.clipboard.writeText(window.getSelection().toString()).then(()=> {
                follower.innerHTML=capitalizeFirstLetter(window.getSelection().toString().substring(0,18)+"...   <b style='margin-left:8px'>copied!</b>")
                showFollower()
            });
        // Restablece el tiempo de la última pulsación
        lastMetaPressTime = 0;
      } else {
        // Si no es una doble pulsación, actualiza el tiempo de la última pulsación
        lastMetaPressTime = currentTime;
      }
    }
  });
