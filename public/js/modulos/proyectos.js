import Swal from 'sweetalert2';
import axios from 'axios';

const btnEiminar = document.querySelector('#eliminar-proyecto');

if(btnEiminar){
    btnEiminar.addEventListener('click',e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas eliminar este proyecto?',
            text: "No podras recuperar este proyecto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText:'Cancelar'
        }).then((result) => {
            if (result.value) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta);

                        Swal.fire(
                            'Proyecto Eliminado!',
                            respuesta.data,
                            'success'
                        );
                        
                        //redireccionar al inicio
                        setTimeout(()=> {
                            window.location.href = "/"
                        },3000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                        })
                    })
            }
        })
    })
}
export default btnEiminar;