import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader() {
  const clientes = obtenerClientes()
  return clientes
}

function index() {
  const clientes = useLoaderData()

  return (
    <>
        <h1 className="font-black text-4xl text-teal-900">Clients</h1>
        <p className="mt-3">Manage Clients</p>
        {clientes.length ? (
            <table className="w-full bg-white  shadow mt-5 table-auto">
                <thead className="bg-teal-800 text-white">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente=>(
                        <Cliente cliente={cliente} key={cliente.id} />
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-center mt-10">No customers yet</p>
        )}
    </>
  )
}

export default index