export default function listaReducer(lista, accion) {
    switch(accion.type){
        case 'initial':
            return accion.payload
        case 'agregar':
            return [
                ...lista,
                accion.payload
            ]
        case 'borrar':
            return lista.filter((item) => item._id !== accion.id);
        case 'check':
            return lista.map((tarea) => {
                if(tarea._id === accion.payload.id){
                    return accion.payload
                } else {
                    return tarea
                }
            } )
        default:
            return lista;
    }
}