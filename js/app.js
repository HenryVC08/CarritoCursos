//variables 

const carrito = document.querySelector('#carrito')
const contenedorCarrito =  document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito= []

cargarEventListeners()
function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso)


    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCursos)

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []
        limpiarHTML()
    })
}


//Funcion
function  agregarCurso(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        // console.log(e.target.parentElement.parentElement)
        console.log('Agregando al carrito....')

        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Elimina un curso del carrito
function eliminarCursos(e){

    console.log(e.target.classList)

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo de articulosCArrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML() //Iterar sobre el carruto y mostrar su HTML
    }

    // console.log('Desde eliminar curso')
}

//lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso)

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    console.log(existe)
    if(existe){
        //actualizamos la cantidad

        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso //Retorna el objeto actualizado
            }else{
                return curso //Retorna los objetos que nos los duplicados 
            }
        })

        articulosCarrito = [...cursos]

    }else{
        //agregamos al carrito
            //agrega elementos al arreglo del carrito

    articulosCarrito = [...articulosCarrito,infoCurso]
    }




    console.log(articulosCarrito)

    carritoHTML();
}


//Muestra el carrito de compras en el HTML

function carritoHTML(){
    //limpiar el HTML


    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso)=>{

        const {imagen, titulo,precio,cantidad,id} = curso

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>

            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

        `

        //agrega el HTML del carrito en el tbody

        contenedorCarrito.appendChild(row)
    })
}


//Elimina los cursos del body

function limpiarHTML(){
    //forma lenta
    contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstElementChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

