const btnSwitch = document.querySelector("#switchb");

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