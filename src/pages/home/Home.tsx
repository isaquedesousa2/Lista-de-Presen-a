import "./style.css";

// Components
import { Card } from "../../components/card/Card";
import { useState } from "react";

interface User {
  username: string;
  time:string
}

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [name, setName] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });


    setData((actual) => [...actual,{
      username: name,
      time: time
    }]);

    setName("");
  };

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>By: Isaque de Sousa</strong>
          <img src="https://github.com/isaquedesousa2.png" alt="" />
        </div>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
        />
        <input type="submit" value="Adicionar" />
      </form>

      {data.map((user) => (
        <Card key={user.time} name={user.username} time={user.time} />
      ))}
    </div>
  );
}
