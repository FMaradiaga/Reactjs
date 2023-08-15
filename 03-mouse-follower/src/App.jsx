import './App.css'
import { useEffect, useState } from 'react';

const FollowMoause = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })


  //pointer move
  useEffect(() => {
    console.log('efecto ', { enabled });

    const handleMove = (e) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //cleand up
    //-> cuendo el componente se desmonta
    // cuendo cambian las dependencias, antes de ejecutar
    //el efecto denuevo
    return () => { // cleanup method
      console.log('clean up');
      window.removeEventListener('pointermove', handleMove)
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])

  //change body pointer class
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor', enabled)
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.5)",
        border: '1px solid black',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: "20%",
        height: "20%",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}></div><button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar ' : 'Activar '}
        Seguir puntero
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMoause></FollowMoause>

    </main>
  )
}

export default App
