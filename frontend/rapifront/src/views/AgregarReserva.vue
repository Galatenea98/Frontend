<template>
 <html lang="en">
<head>
    <!-- Custom fonts for this template -->
<link href="../static/vendor/fontawesome-free/css/all.min.css" rel="stylesheet"
	type="text/css">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
	rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Kaushan+Script'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700'
	rel='stylesheet' type='text/css'>

<!-- Custom styles for this template -->
<link href="../static/css/agency.min.css" rel="stylesheet">
</head>
<body>

 <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <a class="navbar-brand" id="logo" href="#" v-on:click.prevent="rapi">RapiSolver</a>
     <div id="navbarNavDropdown" class="navbar-collapse collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                   <a class="nav-link" href="" v-on:click.prevent="miperfil">Mi perfil</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#"  v-on:click.prevent="publicarServicio">Publicar Servicio</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="" v-on:click.prevent="buscarServicio">Buscar Servicio</a>
                </li>
               <li class="nav-item">
                  <a class="nav-link" href="" v-on:click.prevent="buscarPersonas">Buscar Proveedor</a>
               </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                  <a href="" v-on:click.prevent="salir" class="btn btn-info btn-lg" style="background-color:#6c757d; border-color:#6c757d" > <span class="glyphicon glyphicon-log-out"></span> Salir </a>
                </li>
            </ul>
        </div>
  
</nav>

<div id="mensaje2" class="alert alert-success " style="display: none">
            <strong> <p class="padd-top" id="mensaje"></p></strong>
</div>

<br>
<div id="labelCrearUsuario"><h2>Registrar Reserva</h2></div><br>
<form id="formulario" >
		<div class="form-group" >
			<label >Descripcion:</label> <br><textarea  class="form-control col-lg-3 col-md-3 col-xs-12" name="comentarios" rows="10" cols="40" v-model="reserva.note">Escribe aquí tus comentarios</textarea>   
		</div>
        <div class="form-group" >
			<label >Fecha:</label><br>
           <input class="form-control col-lg-3 col-md-3 col-xs-12" type="date" name="fecha" v-model="reserva.fecha">
		</div>
         <button v-on:click.prevent="post" class="btn btn-primary">Agregar</button>
	</form>


</body>
</html>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
             reserva:{
                 servicioId:"",
                 usuarioId:"",
                 supplierId:"",
                 fecha:"",
                 note:""
             },
             detalles:null

        }
    },
  mounted(){
        this.getDetalles();
  },  
  methods:{
        rapi:function(){
			window.location.href="/Principal/"+this.$route.params.id2
        },
        buscarServicio:function(){
			window.location.href="/listarServicios/"+this.$route.params.id2
        },
        publicarServicio:function(){
			window.location.href="/agregarServicio/"+this.$route.params.id2
         },
        buscarPersonas:function(){
			window.location.href="/buscarPersonas/"+this.$route.params.id2
        },
        miperfil:function(){
			window.location.href="/miPerfil/"+this.$route.params.id2
        },
        getDetalles(){
            axios.
                get("https://localhost:5001/api/servicedetails/searchByID/"+this.$route.params.id)
                    .then(response=>{
                        this.detalles=response.data;                        
                    })
                    .catch(e=>console.log(e))
        },
        post:function(){
            
            this.$http.post('https://localhost:5001/api/reservations',{
                servicioId: parseInt(this.detalles.servicioId),
                usuarioId: parseInt(this.$route.params.id2),
                note: this.reserva.note,
                supplierId: parseInt(this.detalles.supplierId),
                fecha: this.reserva.fecha

            }).then(function(data){
                document.getElementById('mensaje2').style.display ='block'
                document.getElementById('mensaje').innerHTML = 'Se agregó la reserva con exito.';
                document.getElementById("formulario").reset();
                console.log(data);
            });
        },
        salir:function(){
         window.location.href="/Inicio"
        }
    }
}
</script>

<style>
#formulario {
	position: relative !important;
	left: 30% !important;
}
#labelCrearUsuario{
	position: relative !important;
	left: 30% !important;
}
#logo {
    color: #fed136;
    font-family: 'Kaushan Script',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}
#logo {
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.btn-primary {
    color: #fff;
    background-color: #fed136;
    border-color: #fed136;
}
</style>