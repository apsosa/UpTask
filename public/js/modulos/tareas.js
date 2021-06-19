import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            
            //request hacias /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            //aca se cambiae el estado de una tarea
            axios.patch(url,{idTarea})
                .then(function(respuesta){
                    if (respuesta.status == 200) {
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                  idTarea = tareaHTML.dataset.tarea;
            console.log(tareaHTML);
            console.log(idTarea);
            Swal.fire({
                title: 'Deseas eliminar esta tarea?',
                text: "No podras recuperar esta tarea!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText:'Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`;
                    //enviar delete por medio de axios
                    axios.delete(url, {params: {idTarea}})
                        .then(function(respuesta){
                            // console.log(respuesta);
                            //Eliminar el Nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            //Opcional una alerta
                            Swal.fire(
                                'Tarea Eliminada!',
                                respuesta.data,
                                'success'
                            );
                            actualizarAvance();
                            //redireccionar al inicio
                            // setTimeout(()=> {
                            //     window.location.href = `${location.origin}/`
                            // },3000);
                        })
                        .catch(()=>{
                            Swal.fire({
                                type:'error',
                                title: 'Hubo un error',
                                text: 'No se pudo eliminar la tarea'
                            })
                        }) 
                }
            })
        }
    });
}

export default tareas;