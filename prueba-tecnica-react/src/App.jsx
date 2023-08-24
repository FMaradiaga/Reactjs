import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
const CAT_PREFIX_IMAGE = 'https://cataas.com/'

export function App () {
  const { fact, refresRandoFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  // Recuperar la cita al cargar la pagina

  const handleClick = async () => {
    refresRandoFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get Neww Fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img
          src={`${CAT_PREFIX_IMAGE}${imageUrl}`}
          alt={`image extrated using the three first Word for ${fact}`}
                     />}
      </section>

    </main>
  )
}
