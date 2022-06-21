import "./style.css";

// Components
import { Card } from "../../components/card/Card";

//Hooks
import { useFetch, ApiResponse } from "../../hooks/useFetch";
import { useState } from "react";

const url = "http://localhost:3000/list";

export default function Home() {
  const { data: users, httpConfig } = useFetch(url);
  const [name, setName] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const user = {
      name: name,
      time: time,
    };

    httpConfig(user as ApiResponse, "POST");

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
          required
        />
        <input type="submit" value="Adicionar" />
      </form>

      {users.map((user) => (
        <Card key={user.id} name={user.name} time={user.time} />
      ))}
    </div>
  );
}
