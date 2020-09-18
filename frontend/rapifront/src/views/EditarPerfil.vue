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
                  <a href="" v-on:click.prevent="salir" class="btn btn-info btn-lg"> <span class="glyphicon glyphicon-log-out"></span> Salir </a>
                </li>
            </ul>
        </div>
  
</nav>
<div id="mensaje2" class="alert alert-success " style="display: none">
            <strong> <p class="padd-top" id="mensaje"></p></strong>
    </div>

  <div id="labelCrearUsuario"><h2>Editar perfil</h2></div><br>
	<form id="formulario" v-on:submit.prevent="guardarCambios">
		<div class="form-group" >
			<label >Nombre:</label> <input type="text" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese Nombres" v-model="usuario.name" minlength="5" maxlength="40" required pattern="[A-Za-z]+"> 
		</div>
		<div class="form-group" >
			<label >Apellido:</label> <input type="text" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese Apellidos" v-model="usuario.lastName" minlength="5" maxlength="40" required pattern="[A-Za-z]+">  
		</div>
		<div class="form-group" >
			<label >Email:</label> <input type="email" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese un email" v-model="usuario.email" required> 
		</div>
        <div class="form-group" >
			<label >Contraseña:</label> <input type="password" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese una contraseña" v-model="usuario.contraseña" minlength="5" maxlength="40"  required> 
		</div>
		<div class="form-group" >
			<label >Teléfono:</label> <input type="tel" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese un teléfono" v-model="usuario.phone" minlength="7" maxlength="9" pattern="[0-9]{9}"> 
		</div>
        <div class="form-group" >
			<label >Edad:</label> <input type="text" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese su edad" v-model="usuario.age" > 
		</div>
       <div class="form-group" >
			<label >Sexo:</label><br>
           <select class="browser-default custom-select form-control col-lg-3 col-md-3 col-xs-12" v-model="usuario.genger">
                <option selected>Selección el sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Ambos">Ambos</option>
            </select>
		</div>
        <div class="form-group" >
			<label >País:</label><br>
           <select class="browser-default custom-select form-control col-lg-3 col-md-3 col-xs-12" v-model="usuario.country">
                <option selected>Selección el País</option>
                <option value="Perú">Perú</option>
            </select>
		</div>
           <div class="form-group" >
			<label >Departamento:</label><br>
           <select class="browser-default custom-select form-control col-lg-3 col-md-3 col-xs-12" v-model="usuario.state">
                <option selected>Selección el Departamento</option>
                <option value="Lima">Lima</option>
            </select>
		</div>
        <div class="form-group" >
			<label >Distrito:</label><br>
           <select class="browser-default custom-select form-control col-lg-3 col-md-3 col-xs-12" v-model="usuario.city">
                <option selected>Selección el Distrito</option>
                <option value="Lima">Lima</option>
            </select>
		</div>
         <div class="form-group" >
			<label >Dirección:</label> <input type="text" class="form-control col-lg-3 col-md-3 col-xs-12" placeholder="Ingrese su dirección" v-model="usuario.address"> 
		</div>

        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        
     
	</form>
    <br>

</body>
</html>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            usuario:{
                 name: "",
                 lastName: "",
                 email: "",
                 phone: "",
                 age: "",
                 genger: "",
                 country: "",
                 state: "",
                 city: "",
                 address: "",
                 contraseña:""
            },
            usuario2:null,
            personas:null
        }
    },
    mounted(){
    
    },
    methods:{
        rapi:function(){
			window.location.href="/Principal/"+this.$route.params.id
        },
        buscarServicio:function(){
			window.location.href="/listarServicios/"+this.$route.params.id
        },
        publicarServicio:function(){
			window.location.href="/agregarServicio/"+this.$route.params.id
        },
        miperfil:function(){
			window.location.href="/miPerfil/"+this.$route.params.id
        },
        salir:function(){
         window.location.href="/Inicio"
        },
        buscarPersonas:function(){
			window.location.href="/buscarPersonas/"+this.$route.params.id
        },
        guardarCambios:function(){
            
            axios.
                get("https://localhost:5001/api/rapiusers/"+this.$route.params.id)
                    .then(response=>{
                        
                        this.usuario2=response.data;
                        if(this.usuario2.rolId==1){
                            
                            axios.
                             get("https://localhost:5001/api/customers/searchByUserId/"+this.$route.params.id)
                            .then(response=>{
                              this.personas=response.data;
                              
                              this.$http.put('https://localhost:5001/api/customers',{
                                     customerId:this.personas[0].customerId,
                                     name: this.usuario.name,
                                     lastName: this.usuario.lastName,
                                     email: this.usuario.email,
                                     phone: this.usuario.phone,
                                     age: this.usuario.age,
                                     genger: this.usuario.genger,
                                     country: this.usuario.country,
                                     state: this.usuario.state,
                                     city: this.usuario.city,
                                     address: this.usuario.address,
                                     contraseña:this.usuario.contraseña

                                 }).then(function(data){
                                     document.getElementById('mensaje2').style.display ='block'
                                     document.getElementById('mensaje').innerHTML = 'Se actualizo su perfil de usuario con exito.';
                                     document.getElementById("formulario").reset();
                                     console.log(data)
                                     
                                 });
                            
                            })
                            .catch(e=>console.log(e))
                           
                        }

                        if(this.usuario2.rolId==2){
                            
                            axios.
                             get("https://localhost:5001/api/suppliers/searchByUserId/"+this.$route.params.id)
                            .then(response=>{
                              this.personas=response.data;
                              
                              this.$http.put('https://localhost:5001/api/suppliers',{
                                     supplierId:this.personas[0].supplierId,
                                     name: this.usuario.name,
                                     lastName: this.usuario.lastName,
                                     email: this.usuario.email,
                                     phone: this.usuario.phone,
                                     age: this.usuario.age,
                                     genger: this.usuario.genger,
                                     country: this.usuario.country,
                                     state: this.usuario.state,
                                     city: this.usuario.city,
                                     address: this.usuario.address,
                                     contraseña:this.usuario.contraseña

                                 }).then(function(data){
                                     document.getElementById('mensaje2').style.display ='block'
                                     document.getElementById('mensaje').innerHTML = 'Se actualizo su perfil de usuario con exito.';
                                     document.getElementById("formulario").reset();
                                     console.log(data)
                                     
                                 });
                            
                            })
                            .catch(e=>console.log(e))
                           
                        }
                        
                    })
                    .catch(e=>console.log(e))
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

.btn-info {
    color: #fff;
    background-color: #fed136;
    border-color: #fed136;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #f1e784, #faf8ee);
}

</style>