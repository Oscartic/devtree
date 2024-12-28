import { Link } from 'react-router-dom';

export default function LoginView() {
  return (
    <>
      <div className='text-4xl text-white font-bold'>Iniciar Sesión</div>
      <nav className='mt-10'>
        <Link 
          to="/auth/register"
          className='text-center text-white text-lg block'
        >
          ¿No tienes cuenta? Registrate aquí 
        </Link>
      </nav>
    </>
  )
}
