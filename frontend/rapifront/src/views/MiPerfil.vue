<template>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="../static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

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
                  <a href="" v-on:click.prevent="salir" class="btn btn-info btn-lg"> <span
                   class="glyphicon glyphicon-log-out"></span> Salir </a>
                </li>
            </ul>
        </div>
  
</nav>

<header>
         
        <div class="name " v-for="persona in personas" :key="persona.name">{{persona.name}},{{persona.lastName}}</div>
         
        <div class="ava">
            <img src="../assets/img_avatar.png" alt="Avatar" style=""/>
        </div>    

    </header>
    <div class="alert alert-warning" role="alert">
    <strong>Recuerda editar tu perfil con tus datos actualizados dandole click al botón Editar.</strong>
   </div>
    <div class="content">
        <aside class="info ">
            <div class="box">
                <p class="title">
                    <i class="fa fa-info-circle"></i>Contact
                </p>
                <p class="padd-top" v-for="persona in personas" :key="persona.name">
                    <i class="fa fa-birthday-cake"></i>
                    {{persona.age}} años
                </p>

                               

                <p v-for="persona in personas" :key="persona.country">
                    <i class="fa fa-home"></i>
                    {{persona.country}}
                   
                </p>
                <strong><p class="padd-top" id="mensajeMembresia"></p></strong>   
         
                <td><a href="" v-on:click.prevent="editarPerfil" class="btn btn-light">Editar</a></td>   
                <br>
                <a href="#" v-on:click.prevent="comprar" >Comprar subscripción</a>
            </div> 


        </aside>


        <section class="main">
            <div class="box">
                <p class="title">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    Servicios
                </p>
                <p class="padd-top" id="mensaje"></p>
               <div class="table responsive">
					<table class="table table-striped">
						<thead class="thead-dark">
							<tr>
								<th>Id</th>
								<th>Nombre</th>
								<th>Categoría</th>
								<th>Cost</th>
																
							</tr>
						</thead>
						<tbody>
							<tr v-for="servicio in servicios" :key="servicio.servicioId">
								<td >{{servicio.servicioId}}</td>
								<td >{{servicio.name}}</td>
								<td >{{servicio.categoryName}}</td>
								<td >{{servicio.cost}}</td>
								<td><a href="#" class="btn btn-success" v-on:click.prevent="modificar(servicio.servicioId)">Modificar</a></td>
                                <td><a href="#" class="btn btn-danger" v-on:click.prevent="eliminar(servicio.servicioId)">Eliminar</a></td>								
							</tr>
						</tbody>
					</table>
				</div>
            </div>  
            <div class="box">
                <p class="title">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    Reservas
                </p>
                <p class="padd-top" id="reservaMensaje"></p>
                
               <div class="table responsive">
					<table class="table table-striped">
						<thead class="thead-dark">
							<tr>
								<th>Id</th>
								<th>Proveedor</th>
                        <th>Solicitante</th>
								<th>Servicio</th>
								<th>Fecha</th>							
							</tr>
						</thead>
						<tbody>
							<tr v-for="reserva in reservas" :key="reserva.reservationId">
								<td >{{reserva.reservationId}}</td>
								<td >{{reserva.supplierName}},{{reserva.supplierLastName}}</td>
                        <td >{{reserva.usuarioName}}</td>
								<td >{{reserva.servicioName}}</td>
								<td >{{reserva.fecha}}</td>
     
                        <td><a href="#" class="btn btn-danger" v-on:click.prevent="deleteReservation(reserva.reservationId)">Cancelar</a></td>								
							</tr>
						</tbody>
					</table>
				</div>
            </div>  
        </section>

    </div>



</body>
</html>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            usuario:{
                rolId:0,
                num:1
            },
            personas:null,
            servicios:null,
            reservas:null
            

        }
    },
    mounted(){
        this.getUsuario();
        this.getReservas();
    },
    methods:{
        rapi:function(){
			window.location.href="/Principal/"+this.$route.params.id
        },
        buscarServicio:function(){
			window.location.href="/listarServicios/"+this.$route.params.id
        },
        comprar:function(){
			window.location.href="/subscripcion/"+this.$route.params.id
        },
        miperfil:function(){
			window.location.href="/miPerfil/"+this.$route.params.id
        },
        modificar:function(num){
			window.location.href="/modificarServicio/"+this.$route.params.id+"/"+num
        },
        eliminar:function(num){
			axios.
                delete('https://localhost:5001/api/rapiservices/'+num)
                    .then(response=>{
                       console.log(response.data);
                     
                    })
                    .catch(e=>console.log(e))
         window.location.href="/miPerfil/"+this.$route.params.id 
        },
        salir:function(){
         window.location.href="/Inicio"
        },
        editarPerfil:function(){
         window.location.href="/editarPerfil/"+this.$route.params.id
        },
        deleteReservation:function(num){
			axios.
                delete('https://localhost:5001/api/reservations/'+num)
                    .then(response=>{
                       console.log(response.data);
                        
                    })
                    .catch(e=>console.log(e))
         window.location.href="/miPerfil/"+this.$route.params.id           
        },
        publicarServicio:function(){
			window.location.href="/agregarServicio/"+this.$route.params.id
    },
    getReservas(){
            axios.
                get('https://localhost:5001/api/reservations/searchByUserId/'+this.$route.params.id)
                    .then(response=>{
                       console.log(response.data);
                        this.reservas=response.data
                    })
                    .catch(e=>console.log(e))
		},
     buscarPersonas:function(){
			window.location.href="/buscarPersonas/"+this.$route.params.id
        },
        getUsuario(){
            axios.
                get('https://localhost:5001/api/rapiusers/'+this.$route.params.id)
                    .then(response=>{
                        this.usuario.rolId=response.data.rolId;
                        if (this.usuario.rolId == 1) {
                             axios.
                             get("https://localhost:5001/api/customers/searchByUserId/"+this.$route.params.id)
                            .then(response=>{
                              this.personas=response.data;
                            
                            })
                            .catch(e=>console.log(e))
                            document.getElementById('mensaje').innerHTML = 'Usted es una cliente no tiene servicios';
                            document.getElementById('reservaMensaje').innerHTML = 'Reservas hechas:';
                            document.getElementById('mensajeMembresia').innerHTML = 'No posee una membresia';
                         }
                          if (this.usuario.rolId == 2) {
                              //Para obtener el supplier
                             axios.
                             get("https://localhost:5001/api/suppliers/searchByUserId/"+this.$route.params.id)
                            .then(response=>{
                                 this.personas=response.data;
                                 //Para los servicios
                                 axios.
                             get("https://localhost:5001/api/rapiservices/searchByUserId/"+this.$route.params.id)
                            .then(response=>{
                                console.log(response.data);
                              this.servicios=response.data;
                            
                            })
                            .catch(e=>console.log(e))
                                
                            })
                            .catch(e=>console.log(e))
                            
                            document.getElementById('mensaje').innerHTML = 'Los servicios que proveo:';
                            document.getElementById('reservaMensaje').innerHTML = 'Reservas hechas y solicitadas:';
                            document.getElementById('mensajeMembresia').innerHTML = 'Su membresia se vence en 6 meses';
                            
                         }
                    })
                    .catch(e=>console.log(e))
        }
        
    }
}
</script>

<style>

/*style.css*/
*{
   position:relative ; 
   box-sizing:border-box;
 
   font-family: 'roboto',sans-serif;
}
.content {
   max-width: 1110px;
   padding: 8px;
   margin: auto;
}
a {
   text-decoration: none;
}
header{
   width:100%; 
   height: 200px;
   box-shadow: 0 2px 10px 0 rgba(25,25,25,0.5), 0 4px 13px 0 rgba(25,25,25,0.2);
   background:#fed136;
   display: table;

}
header .name{
   display: table-cell;
   vertical-align: middle;
   font-size: 25px;
   color: white;
   text-align:center;
}
.ava{
   overflow: auto;
   display: table-cell;
   vertical-align: middle;
   width:50%;
}
.ava img{
   position: relative;
   float: right;
   right: 0.5em;
   border: 2px solid white;
   width:180px;   
   height: auto;
   border-radius: 100px; 
}

aside{
   float: left;
   width:30%; 
   margin-top: 10px;

}
aside .name{
   width:30%;
   display:inline-block;
}
aside .vl{
   width:68%;
   display:inline-block;
}

aside .skill{
   width: 85%;
   height: 10px;
   margin-bottom: 20px;
   background: lightgray;
   border-radius: 5px;
}
p{
   display: block;
   clear:both;
   word-wrap: break-word;
   margin-top: 0px; 
}


aside .skill-right {
   position: absolute;
   width: 80%;
   height: 10px;
   background: teal;
   border-radius: 5px;
   margin: 0;
   padding: 0;  
   left: 0;
}
div.r1{
   width:90%;
}
div.r2{
   width:75%;
}
div.r3{
   width:40%;
}
div.r4{
   width:90%;
}
div.r5{
   width:70%;
}
div.r6{
   width:65%;
}
div.r7{
   width:80%;
}

section{
   float: left;
   width:69%; 
   margin-top:10px ;
   margin-left:8px;
}
.box{
   display:block; 
   padding:14px;
   margin: 8px 0;
   background:white;
   width:100%;
   box-shadow:0 0 5px rgba(25,25,25,0.3), 0 0 8px rgba(25,25,25,0.1) ;
}

.title{
   position: absolute;
   width: 100%;
   top: 0px;
   left: 0;
   background: #d1d1d1;
   padding: 5px;
   font-size: 20px;
   color: teal;
}
.title >i{
   font-size:26px!important;
}
i{
   font-size:18px!important;
   color: teal;
   margin-right: 10px;

}
ul{
   padding-left: 16px;
}
.padd-top {
   padding-top: 35px;
}
.padd-left{
   padding-left: 25px;
   word-wrap: break-word;
}

@media only screen and (max-width:1000px){
   aside, section {
      width:100%;
      margin-left: 0;
   }

}
@media only screen and (max-width:500px){
   .ava{
      width:100%;
      position: relative;
      top:50px;
      clear: both;
      overflow: auto;
      display: block;
   }
   .ava img{
      float: none;
      right: 0;
      border: 6px solid white;
      margin:auto;
      width:180px;   
      height: auto;
      border-radius: 100px; 
      position: relative;
      left: 50%;
      transform: translateX(-50%);
   }
   header .name{
      text-shadow: 0 0 3px white;
      color: teal;
      width: 100%;
      position: absolute;
      bottom: -70px;
      text-align: center;
      font-weight: bolder;

   }
   header{
      width:100%; 
      height: 200px;
      box-shadow: 0 2px 10px 0 rgba(25,25,25,0.5), 0 4px 13px 0 rgba(25,25,25,0.2);
      background-size: 100% auto;

   }
   .content {
      margin-top: 60px;
   }

}

footer{
   width: 100%;
   height: 60px;
   clear: both;
   background: teal;
   box-shadow: 0 -2px 10px gray;
   text-align: center;
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
.btn-light {
    color: #fff;
    background-color: #fed136;
    border-color: #fed136;
}
body {
  background: #007bff;
  background: linear-gradient(to right, #f1e784, #faf8ee);
}
.btn-info {
    color: #fff;
    background-color: #fed136;
    border-color: #fed136;
}



</style>