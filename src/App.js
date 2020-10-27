import React, { useState, useEffect } from "react";
import api from './services/api'
import { v4 as uuidv4 } from 'uuid';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories',  {
      id: uuidv4(),
      title: `React`,
      likes: 0
    })
    setRepositories([...repositories, response])
    return repositories

  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [repositories])

  async function handleRemoveRepository(id) {
    const repId = repositories.filter((repo) => repo.id !== id)
    await api.delete(`/repositories/${id}`)
    setRepositories([...repositories])
    return repositories
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
