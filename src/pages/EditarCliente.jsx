import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'The client does not exist'
        })
    }
    return cliente
}

export async function action({request, params}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')
    //validacion
    const errores = []
    if (Object.values(datos).includes('')) {
      errores.push('All fields are required')
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
      errores.push('Invalid email')
    }
    //retornar datos si hay errores
    if (Object.keys(errores).length) {
      return errores
    }
    //actualizar cliente
    await actualizarCliente(params.clienteId, datos)
    return redirect('/')
}

function EditarCliente() {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-teal-900">Edit Client</h1>
      <p className="mt-3">Edit client's info</p>
      <div className="flex justify-end">
        <button className="bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 font-bold rounded-md uppercase" onClick={()=>navigate('/')}>
          back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
        <input type="submit" className="mt-5 w-full bg-teal-800 hover:bg-teal-700 p-3 uppercase rounded-md font-bold text-white text-lg" value='save changes' />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente