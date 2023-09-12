import { EVENTS } from './consts'
export function navigate (href){
    window.history.pushState({}, '', href)
    // crear un evento personalizado 
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
  }
  
  export function Link ({ target, to, ... props}){
    const handleClick = (event) => {

        const isMainEvent = event.button === 0 // prymary click
        const isModifierEvent = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'
        if (isMainEvent && isManageableEvent  && !isModifierEvent){
            event.preventDefault()
            navigate(to) // Navegacion con SPA
        }
    }
    return <a onClick={handleClick} href={to} target={target} {... props} />
  }