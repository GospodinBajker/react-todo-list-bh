import { useEffect, useState } from "react"

export default function App() {

  const [noviZadatak, setNoviZadatak] = useState("");
  const [zadaci, setZadaci] = useState(() => {
    const localValue = localStorage.getItem("ZADACI")
    if(localValue == null) return []

    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ZADACI", JSON.stringify(zadaci))
  }, [zadaci])

  function rijesiSubmit(e) {
    e.preventDefault();

    setZadaci(trenutniZadaci => {
      return [...trenutniZadaci, {id: Math.random(), title: noviZadatak, rijeseno: false}]
    })

    setNoviZadatak("")
  }
  
  function izbrisiZadatak(id) {

    setZadaci(trenutniZadaci => {
      return trenutniZadaci.filter(zadatak => zadatak.id !== id)
    })
  }

  function toggleZadatak(id, rijeseno) {
    setZadaci(trenutniZadaci => {
      return trenutniZadaci.map(zadatak => {
        if(zadatak.id === id) {
          return {...zadatak, rijeseno}
        }
        return zadatak
      })
    })
  }

  return (
  
  <>
    <form onSubmit={rijesiSubmit} className="novi-zadatak-forma">
      <div className="forma-row">
        <label htmlFor="zadatak">Novi zadatak</label>
        <input value={noviZadatak} onChange={e => setNoviZadatak(e.target.value)} type="text" placeholder="Unesi novi zadatak" />
      </div>
      <button type="submit" className="btn">Dodaj</button>
    </form>

    { zadaci.length === 0 ? <h1 className="header">Nema zadataka</h1> : <h1 className="header">Lista zadataka</h1> }

    <ul className="lista">
      {zadaci.map(zadatak => {
        return (
          <li key={zadatak.id}>
        <label>
          <input onChange={e => toggleZadatak(zadatak.id, e.target.checked)} type="checkbox" checked={zadatak.rijeseno}></input>
          {zadatak.title}
          <button onClick={() => izbrisiZadatak(zadatak.id)} className="btn btn-danger">Izbrisi</button>
        </label>
      </li>
        )
      })}
    </ul>
  </>  
  )
}