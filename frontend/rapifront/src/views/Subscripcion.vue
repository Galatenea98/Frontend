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

<div id="mensaje2" class="alert alert-success" role="alert" style="display: none">
   <strong> <p class="padd-top" id="mensaje"></p></strong>
</div>
<div id="mensaje4" class="alert alert-danger" role="alert" style="display: none">
   <strong> <p class="padd-top" id="mensaje3"></p></strong>
</div>
<br>
<br>
<br>
<h2 style="text-align:center">Paquete de membresía</h2>
<p style="text-align:center">Escoge tu paquete ideal para publicar tus servicios</p>

<div class="columns">
  <ul class="price">
    <li class="header">Basic</li>
    <li class="grey">30 S/ por 1 mes</li>
    <li>Poder publicar servicios ilimitados durante 1 mes</li>
    <li>No existe descuento</li>
 
    <li class="grey"><a href="#" class="button" v-on:click.prevent="comprar">Comprar</a></li>
  </ul>
</div>

<div class="columns">
  <ul class="price">
    <li class="header" style="background-color:#fed136">Pro</li>
    <li class="grey">160 S/ por 6 meses</li>
    <li>Poder publicar servicios ilimitados durante 6 mes</li>
    <li>Existe un descuento de 20 soles</li>
 
    <li class="grey"><a href="#" class="button" v-on:click.prevent="comprar">Comprar</a></li>
  </ul>
</div>

<div class="columns">
  <ul class="price">
    <li class="header">Premium</li>
    <li class="grey">320 S/ por 1 año</li>
    <li>Poder publicar servicios ilimitados durante 1 año</li>
    <li>Existe un descuento de 40 soles</li>
 
    <li class="grey"><a href="#" class="button" v-on:click.prevent="comprar">Comprar</a></li>
  </ul>
</div>


</body>
</html>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      persona:null
    }
       
	},
	mounted(){
	
  },
  methods:{
    
        miperfil:function(){
			window.location.href="/miPerfil/"+this.$route.params.id
        },
        rapi:function(){
			window.location.href="/Principal/"+this.$route.params.id
        },
        buscarServicio:function(){
			window.location.href="/listarServicios/"+this.$route.params.id
        },
        publicarServicio:function(){
			window.location.href="/agregarServicio/"+this.$route.params.id
       },
       buscarPersonas:function(){
			window.location.href="/buscarPersonas/"+this.$route.params.id
        },
        salir:function(){
         window.location.href="/Inicio"
        },
        comprar:function(){
           axios.
                get('https://localhost:5001/api/rapiusers/'+this.$route.params.id)
                    .then(response=>{
                        this.persona=response.data;
                        if (this.persona.rolId==1) {
                           axios.
                           get('https://localhost:5001/api/customers/'+this.$route.params.id+'/addSubscription')
                          .then(response=>{
                            console.log(response.data);
                            document.getElementById('mensaje2').style.display ='block'
                             document.getElementById('mensaje').innerHTML = 'Se adquirió el paquete de membresia exitosamente.';
                          })
                          .catch(e=>console.log(e))
                         }
                         if (this.persona.rolId==2) {
                           document.getElementById('mensaje4').style.display ='block'
                           document.getElementById('mensaje3').innerHTML = 'El paquete de membresia ya esta en uso.';
                         }
                        })
                       .catch(e=>console.log(e))
                         }
        }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.columns {
  float: left;
  width: 33.3%;
  padding: 8px;
}

.price {
  list-style-type: none;
  border: 1px solid #eee;
  margin: 0;
  padding: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.price:hover {
  box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
}

.price .header {
  background-color: #111;
  color: white;
  font-size: 25px;
}

.price li {
  border-bottom: 1px solid #eee;
  padding: 20px;
  text-align: center;
}

.price .grey {
  background-color: #eee;
  font-size: 20px;
}

.button {
  background-color: #fed136;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
}

@media only screen and (max-width: 600px) {
  .columns {
    width: 100%;
  }
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
</style>