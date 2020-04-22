import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repositório - ${Date.now()}`,
      url: "https://github.com/Rocketseat/umbriel",
      techs: ["Node", "Express", "TypeScript"],
      likes: 0,
    });

    const responseRepositories = response.data;
    console.log(responseRepositories);
    setRepositories([...repositories, responseRepositories]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.get("repositories").then((response) => {
      const { repositories } = response.data;
      console.log(response.data);
      console.log(repositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>{repository.title}</li>
        ))}
        <li>
          Repositório 1
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
