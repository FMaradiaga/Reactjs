import { useEffect, useState } from 'react'
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return
    const threeFirtWord = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirtWord}?size=:size&color=:color&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl }
}
