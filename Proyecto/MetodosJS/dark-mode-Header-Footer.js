window.addEventListener("resize", anchoPagina);
window.addEventListener("load", anchoPagina);
const btnSwitch = document.querySelector("#switchb");

function anchoPagina() {
    if(window.innerWidth <= 991){
        document.querySelector('.dropdownUsuario').innerHTML = `<img src="imagenesUsuarios/Grimaldo.jpg" width="45px" height="45px" class="d-inline-block align-top rounded-circle" id="imagenPerfil" alt="">`;
    }
    else{
        document.querySelector('.dropdownUsuario').innerHTML = `<img src="imagenesUsuarios/Grimaldo.jpg" width="35px" height="35px" class="d-inline-block align-top rounded-circle" id="imagenPerfil" alt="">Usuario`;
    }
}

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');


    if(document.body.classList.contains('dark')){
        document.cookie = "dark=true";
    }else{
        document.cookie = "dark=false"
    }
});

if(document.cookie.includes("dark=true")){
    document.body.classList.add('dark');
    btnSwitch.classList.toggle('active');
    
}else{
    document.body.classList.remove('dark');
}