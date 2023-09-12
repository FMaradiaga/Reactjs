import { Link } from '../Link.jsx'
export default function HomePage() {
    return (
      <>
      <h1>Home Page</h1>
        <p>Pagina de ejemplo para crar un React Router desde cero</p>
        <Link to='/about'>Ir a Sobre Nosotros</Link>
      </>
    )
  }
  