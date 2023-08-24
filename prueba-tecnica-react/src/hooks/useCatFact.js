import { useEffect, useState } from 'react'
import { getRandomFacts } from '../services/facts'
export function useCatFact () {
  const [fact, setFact] = useState()
  const refresRandoFact = () => {
    getRandomFacts().then(newFact => setFact(newFact))
  }
  useEffect(refresRandoFact, [])
  return { fact, refresRandoFact }
}
