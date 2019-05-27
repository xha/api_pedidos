function presiona(e, funcion) {
    var tecla = (document.all) ? event.keyCode : e.which;
    if (tecla==13) {
        funcion();
    }
}

function IsNumeric(sText) {
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}

function trae(idobjeto){
   var objeto = document.getElementById(idobjeto);
   return objeto;
}

function cambia(id,ruta) {
    var imagen = trae(id);
    imagen.src = ruta;
}

function textCounter(field, countfield, maxlimit) {
    var field = trae(field);
    var countfield = trae(countfield);
    if (field.value.length > maxlimit) {// if too long...trim it!
        field.value = field.value.substring(0, maxlimit);
    // otherwise, update 'characters left' counter
    } else { 
        countfield.value = maxlimit - field.value.length;
    };
};

function respuesta(response) {
    if (response>0) {
        response='A';
    }
    switch (response) {
        case "0":
            alert("No se encontro registro");
        break;
        case "-1":
            alert("Error en el SP");
        break;
    default:
        alert("Registro Actualizado");
    }
}

function solo_numeros(e) {
    var tipo = e.keyCode;
    if ((tipo == 8) || (tipo == 9) || (tipo == 116) || (tipo == 46)) return true; // BACKSPACE, TAB, F5, DELETE
    var regex = new RegExp("^[0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false
}

function solo_alfanumericos(e) {
    var tipo = e.keyCode;
    if ((tipo == 8) || (tipo == 9) || (tipo == 116) || (tipo == 46)) return true; // BACKSPACE, TAB, F5, DELETE
    var regex = new RegExp("^[a-zA-ZñÑ.0-9@\ \-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false
}

function soloNumeros(e){
    var key = window.event ? e.which : e.keyCode;
    
    if ((key == 110) || (key == 9) || (key == 116)) return false;
    if (key == 8) return true;
    if (key < 48 || key > 57) {
        if (key < 96 || key > 105) e.preventDefault();
    }
}

function soloEnteros(e){
    var key = window.event ? e.which : e.keyCode;

    if ((key == 8) || (key == 9) || (key == 116)) return false;
    if (key < 48 || key > 57) {
        if (key < 96 || key > 105) e.preventDefault();
    }
}

function soloLetras(letra){
    key = letra.keyCode || letra.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    
    if(letras.indexOf(tecla)==-1 && !tecla_especial && key != '32'){
        return false;
    }
}

function letrasNumeros(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    alfa = "áéíóúabcdefghijklmnñopqrstuvwxyz1234567890";
    especiales = "8-37-39-46-32";
    tecla_especial2 = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial2 = true;
            break;
            console.log(especiales[i])
        }
    }

    if(alfa.indexOf(tecla)==-1 && !tecla_especial2 && key != '32'){
        return false;
    }
}

function Solo_Cantidad(variable){
    var cantidad = trae(variable);
    var aux = 0;
    var i;
    
    for (i=0;i<cantidad.value.length;i++){
        if (cantidad.value.charAt(i)=='.'){
            aux++;
        }
    }
    
    if ((aux==1) && (cantidad.value.length==1)) cantidad.value = cantidad.value.slice(0,(cantidad.value.length-1));
    if (aux>1) cantidad.value = cantidad.value.slice(0,(cantidad.value.length-1));
}

function entero(e){
    var tipo=e.keyCode;
    if ((tipo == 8) || (tipo == 9))  
        return true; // 3 8,37,39,46
    var key = '';
    var strCheck = '0123456789.';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    //if (whichCode == 13) return true; // Enter
    key = String.fromCharCode(whichCode); // Get key value from key code
    if (strCheck.indexOf(key) == -1) 
        return false; // Not a valid key
}

function valida_cantidad(campo){
    var cantidad = trae(campo);
    var i;
    var aux=0;
    
    for (i=0;i<cantidad.value.length;i++){
        if (cantidad.value.charAt(i)=='.'){
            aux++;
        }
    }
    
    if (aux>1) {
        cantidad.value = Math.round((cantidad.value.slice(0,(cantidad.value.length-1))) * 100) / 100; 
    }
}

function validar_campo(id_campo,id_div_msj,msj){
    var retorno = false;
//    if ((document.getElementById(id_campo).value != '') && (document.getElementById(id_campo).value != '0')){ CAMBIADO POR MEJORAR
    if ((document.getElementById(id_campo).value != '')){
        document.getElementById(id_div_msj).innerHTML='';
        document.getElementById(id_div_msj).className="";
        retorno = true; 
    }
    else{ 
    document.getElementById(id_div_msj).className="alerta_msj";
    document.getElementById(id_div_msj).innerHTML=(retorno==false)?msj:'';
    }
    return retorno;
}

function add_filas(row, clase, funcion, falso, limite, identi) {
    //EL FALSO ES EL CAMPO PARA CAMBIAR LA FILA DE COLOR, DEPENDIENDO DE TRUE O FALSE
    if (!funcion) {
        funcion = "";
    }
    if (!falso) {
        falso = "";
    }
    if (!limite) {
        limite = "";
    }
    if (typeof identi == "undefined"){
        identi = 0;
    }
    var otro = "";
    var funciones = funcion.split("#");
    var tr = document.createElement('tr');
    tr.id = "add_filas_"+row[identi];
    tr.className = '';
    tr.align = 'center';
    var td = new Array();
    var node = new Array();
    var texto;
    
    if ((limite=='') || (limite==0)) {
        limite = row.length;
    }

    for (var i = 0; i < row.length; i++) {
        if (clase=='td') {
            otro = otro + row[i]+ "#";
        }
        
        td[i] = document.createElement(clase);
        /*if (clase=='td') {
            td[i].align = 'left';
        }*/
        
        if (falso!="") {
            if (row[parseInt(falso)]=='0') {
                td[i].style.backgroundColor = '#FFE1E1';
            } else {
                td[i].style.backgroundColor = '#FFF';
            } 
        }
        
        if ((row[i]=='0') && (i==falso)) {
            texto = "Inactivo";
        } else if ((row[i]=='1') && (i==falso) && (falso!="")) {
            texto = "Activo";
        } else {
            texto = row[i];
        }
        
        if (i <= limite) {
            node[i] = document.createTextNode(texto);
            td[i].style.maxWidth="400px";
            td[i].appendChild(node[i]);
            tr.appendChild(td[i]);
        }
    }
    
    if (funcion!="") {
        if (clase=='td')  {
            td = document.createElement(clase);
            td.align='center';
            td.style.cursor = "pointer";
            td.style.verticalAlign = "middle";
            for (i=0; i < funciones.length;i++) {
                var imagen = document.createElement('img');
                if (funciones[i]!="") {
                    imagen.width = "28";
                    imagen.style.padding = "3px";
                    imagen.tittle = otro;
                    imagen.title = funciones[i];
                    imagen.id = "add_fila_i_"+row[identi];
                    switch(i) {
                        case 0:
                            imagen.src = "img/edit.png";
                        break;
                        case 1:
                            imagen.src = "img/imprimir.png";
                        break;
                        case 2:
                            imagen.src = "img/buscar.png";
                        break;
                        case 3:
                            imagen.src = "img/devolver.png";
                        break;
                        case 4:
                            imagen.src = "img/delete.png";
                        break;
                        case 5:
                            imagen.src = "img/pie.png";
                        break;
                        case 6:
                            imagen.src = "img/bar.png";
                        break;
                        default:
                            imagen.src = "img/delete.png";
                    }
                    eval("imagen.onclick = function(){"+funciones[i]+"(this.tittle);}");
                    td.appendChild(imagen);
                }
            }
            tr.appendChild(td);
        }
    }    
    
    return tr;
}

function splitLast( val ) {
    return val.split( /;\s*/ );
}

function extractLast( term ) {
    return splitLast( term ).pop();
}

function paginador(pag,total,data,tabla,extra) {
    if (typeof extra == "undefined"){
        var ext = 'title_tabla';
        var ext2 = 'llenar_tabla';
    } else {
        var ext = 'title_tabla_'+extra;
        var ext2 = 'llenar_tabla_'+extra;
    }
    var div = trae('paginado');
    var paginas,i,clase;
    div.innerHTML = "";
    pagina = pag;
    paginas = Math.ceil(total/ptotal_fin);
    var ul = document.createElement('ul');
    ul.className="pagination";
    for (i=1;i<=paginas;i++) {
        clase="";
        var li = document.createElement('li');
        var a = document.createElement('a');
        if (i==pag) clase="active";
        
        li.className = clase;
        a.href="";
        eval('a.onclick= function(){paginador("'+i+'","'+total+'","'+data+'","'+tabla+'","'+extra+'")}');
        a.innerHTML = i;
        li.appendChild(a);        
        ul.appendChild(li);        
    }
    div.appendChild(ul);

    var fnparams = [tabla];
    var fn = window[ext];
    if (typeof fn === "function") fn.apply(null, fnparams);

    var fnparams2 = [tabla,data];
    var fn2 = window[ext2];
    if (typeof fn2 === "function") fn2.apply(null, fnparams2);
}

function oculta_mensaje(elemento,texto,tipo) {
    var element = trae(elemento);
    var color = "";
    if (typeof tipo == "undefined"){
        color = texto;
    } else {
        color = parseInt(tipo);
    }
    
    switch (true) {
        case (color==0):
            clase = "callout callout-warning";
        break;
        case (color > 0):
            clase = "callout callout-success";
        break;
        default:
            clase = "callout callout-danger";
    }
    
    element.className = clase;
    element.innerHTML = texto;
    $(element).show();
    $(element).delay(8000).hide(600);
}

function deshabilita_opcion(btn,img,opt) {
    if (typeof opt == "undefined"){
        opt = 0;
    }
    var boton = trae(btn);
    var img = trae(img);

    if (opt==0) {
        img.style.visibility = "visible";
        boton.disabled = true;
    } else {
        img.style.visibility = "hidden";
        boton.disabled = false;
    }
}

    function convertDateFormat(string) {
        var info2 = string.split(' ');
        var info = info2[0].split('-');
        return info[2] + '/' + info[1] + '/' + info[0];
    }

    function number_format(amount, decimals) {

        amount += ''; // por si pasan un numero en vez de un string
        amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

        decimals = decimals || 0; // por si la variable no fue fue pasada

        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(amount) || amount === 0) 
            return parseFloat(0).toFixed(decimals);

        // si es mayor o menor que cero retorno el valor formateado como numero
        amount = '' + amount.toFixed(decimals);

        var amount_parts = amount.split('.'),
            regexp = /(\d+)(\d{3})/;

        while (regexp.test(amount_parts[0]))
            amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

        return amount_parts.join('.');
    }