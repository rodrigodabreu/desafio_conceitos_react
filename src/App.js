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
    //TODO:
    /**
     *
     *Remover um repositório da sua API: Para cada item da sua lista,
     * deve possuir um botão com o texto Remover que, ao clicar, irá chamar uma
     * função para remover esse item da lista do seu frontend e da sua API.
     */
    // Chama o endpoint DELETE
    await api.delete(`repositories/${id}`);

    // Cria um novo array de repositories excluindo o repository que possue valor
    // id igual ao informado
    // O método filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.
    const newListOfRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newListOfRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
