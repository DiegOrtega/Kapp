document.getElementById("b_register").disabled = true;
var input = document.forms["form_register"];
var v0 = input.elements[0].value, v1 = input.elements[1].value, v2 = input.elements[2].value, v3 = input.elements[3].value, v4 = input.elements[4].value, v5 = input.elements[5].value, v6 = input.elements[6].value, v7 = input.elements[7].value;

//console.log("el valor de 0 es "+ v0);

function checkPasswordMatch() {
    var password = $("#contraseña").val(), confirmPassword = $("#confirmacion_contraseña").val();

    if (password !== confirmPassword) {
        $("#divCheckPasswordMatch").html("Las contraseñas no coinciden");
        if (password.length > 6) {
            $("#divCheckPasswordMatch2").html("");
            return true  
            //confirm_password.setCustomValidity("Las contraseñas no coinciden");
        } else {
            $("#divCheckPasswordMatch2").html("La contraseña es demasiado corta");
            return false
        }   
    }else{
        $("#divCheckPasswordMatch").html("");
        if (password.length > 6) {
            $("#divCheckPasswordMatch2").html("");
            return true;  
            //confirm_password.setCustomValidity("Las contraseñas no coinciden");
        } else {
            $("#divCheckPasswordMatch2").html("La contraseña es demasiado corta");
            return false
        } 
    }
}

    function email_check() {
        var input = document.forms["form_register"], val = validator.isEmail(input.elements[3].value);
          
        if (val === false) {    
            $("#emailCheck").html("El email no es válido");
            //$("#divCheckPasswordMatch").html("suck!");
            console.log("email " + val);
        } else {
         $("#emailCheck").html("");   
        }
    }

    function checkValues(){
        var input = document.forms["form_register"];
        var checkboxes= $("input[name='chk[]']:checked").length > 0;
        var val = validator.isEmail(input.elements[3].value);
        console.log("checkboxes = " + checkboxes);
    if(input.elements[0].value != v0 && input.elements[1].value != v1 && input.elements[2].value != v2 && input.elements[3].value != v3 && input.elements[4].value != v4 && input.elements[5].value != v5 && input.elements[6].value != v6 && input.elements[7].value != v7 && checkboxes === true && checkPasswordMatch() === true && val === true){
        document.getElementById("b_register").disabled=false;
        console.log("listones!")
    }else{
        document.getElementById("b_register").disabled=true;
        console.log("falta llenar valores");
    };
    
    /*for(i=0; i<input.length; i++){
        console.log(i + input.elements[i].value)
    }*/   
}

    $(document).ready(function () {
        $("#contraseña, #confirmacion_contraseña").focusout(checkPasswordMatch);
        $("#form_register").keyup(checkValues);
        $("#email").focusout(email_check);
    });