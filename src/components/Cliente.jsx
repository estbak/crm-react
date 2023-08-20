import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

export async function action({params}) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}

function Cliente({cliente}) {

    const navigate = useNavigate()
    const {nombre,empresa,email,telefono,id} = cliente

  return (
    <tr className="border-b">
        <td className="p-6 space-y-2">
            <p className="text-2xl text-gray-800">{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className="p-6">
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Phone: </span>{telefono}</p>
        </td>
        <td className="p-6 flex gap-3">
            <button type="button" className="text-teal-600 hover:text-teal-700 uppercase font-bold text-xs" 
                    onClick={()=>navigate(`/clientes/${id}/editar`)}>
                Edit
            </button>
            <Form 
                method="post" 
                action={`/clientes/${id}/eliminar`} 
                onSubmit={(e) => {
                    if (!confirm('Do you want to delete this client?')) {
                     e.preventDefault()   
                    }
                }} 
            >
                <button type="submit" className="text-red-700 hover:text-red-800 uppercase font-bold text-xs">
                    Delete
                </button>
            </Form>
            
        </td>
    </tr>
  )
}

export default Cliente