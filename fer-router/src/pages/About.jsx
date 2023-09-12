import { Link } from '../Link.jsx'

export default function AboutPage() {
    return (
      <>
      <h1>About</h1>
      <div>
      <img src="https://scontent.fsap5-1.fna.fbcdn.net/v/t39.30808-6/366371949_295326129841449_3506713080496429763_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeHFrrZGJ8W503B00fMD_EOlmUaAzKqlVheZRoDMqqVWF6bra8nTS6a72dgj8XCQSDEc3uEUEPfCfcd299quBlCi&_nc_ohc=Wfz6slC13TQAX-3e8uR&_nc_ht=scontent.fsap5-1.fna&oh=00_AfB66dwLNulIL2HO7wtO1NXhgcKiZGAkn1F3r8UvOq0ysA&oe=6505674F" alt="Foto de cmaradiaga" />
        <p>Hola Me llamo Fernando y estoy creado un React Router</p>
      </div>
        <Link href='/'>Ir Home</Link>
      </>
    )
  }