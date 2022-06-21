import './styles.css'

export function Card(props: {name: string, time: string}) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <small>{props.time}</small>
    </div>
  )
}
