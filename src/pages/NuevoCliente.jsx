import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action({request}) {
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
  await agregarCliente(datos)
  return redirect('/')
}

function NuevoCliente() {

  const errores = useActionData()
  const navigate = useNavigate()
  console.log(errores)

  return (
    <>
      <h1 className="font-black text-4xl text-teal-900">New Client</h1>
      <p className="mt-3">Register a new client</p>
      <div className="flex justify-end">
        <button className="bg-teal-800 text-white rounded-md px-3 py-1 font-bold uppercase" onClick={()=>navigate('/')}>
          back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario/>
        <input type="submit" className="mt-5 w-full bg-teal-800 p-3 rounded-md uppercase font-bold text-white text-lg" value='Register' />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente