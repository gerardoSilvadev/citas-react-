
import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {
    
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => { 
    if(Object.keys(paciente).length > 0){ //Object.keys es una forma de comprobar si un objeto tiene algo.
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    } 
  }, [paciente])


  const generarId = () => { 
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha; 
  }
  

  const handleSubmit = (e) => {
      e.preventDefault();

      //Validacion de Formulario
      if([nombre, propietario, email, fecha, sintomas].includes('')) {
          console.log('Hay al menos un campo vacio')

          setError(true)
          return;
      } 
      
        setError(false)

        //Objeto de paciente
        const objectPacientes = {
          nombre, 
          propietario, 
          email, 
          fecha, 
          sintomas, 
        
        }

        if(paciente.id) {
          // Editando el registro
          objectPacientes.id = paciente.id

          const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objectPacientes : pacienteState );

          setPacientes(pacientesActualizados);
          setPaciente({});

        } else { 
          //Nuevo registro
          objectPacientes.id = generarId();
          setPacientes([...pacientes, objectPacientes]);
        }

        

        //Reiniciar El Formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
  }

  
  return (
      <div className="md:w-1/2 lg:w-2/5 ">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-5">
          Añade Pacientes y {''}
          <span className="text-pink-700 font-bold">Administralos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
          {error && <Error>
            <img src="https://thumbs.gfycat.com/EveryEnragedDogwoodtwigborer-size_restricted.gif" alt="" />
            <p>Todos los campos son obligatorios</p></Error>}
            <div className="mb-5">
              <label htmlFor="mascota" className="block font-bold text-gray-700 uppercase">
                Nombre Mascota
              </label>

              <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded "
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="propietario" className="block font-bold text-gray-700 uppercase">
                Nombre Propietario
              </label>

              <input 
              id="propietario"
              type="text"
              placeholder="Nombre del Propietario" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded "
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="email" className="block font-bold text-gray-700 uppercase">
                  Email
              </label>
              <input 
              id="email"
              type="email"
              placeholder="Email Contacto Propietario" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="alta" className="block font-bold text-gray-700 uppercase">
                  Alta
              </label>
              <input 
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded "
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              />
            </div>
           
            <div className="mb-5">
              <label htmlFor="sintomas" className="block font-bold text-gray-700 uppercase">
                  Sintomas
              </label>
              <textarea 
                id="sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
                placeholder="Describe los Sintomas"
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                />
            </div>

            <input 
            type="submit"
            className="bg-pink-600 w-full p-3 text-white uppercase font-bold hover:bg-pink-700 cursor-pointer transition-all"
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
            />
        </form>
      </div>

    
  )
}

export default Formulario