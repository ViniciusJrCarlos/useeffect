import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [countB, setCountB] = useState(10);
  const [user, setUser] = useState();


  //1  - useEffect utilização

  useEffect(() => {

    console.log("Roda a cada renderização");

  });

  //2 - arrray de dependencias para controlar o estado da mudança
  useEffect(() => {

    console.log("Roda ao incrementar o valor!");

  }, [count]);

  // 3 -array de dependencia vazio só roda quando a pagina é executada, rodando uma vez quando a api é chamada por exemplo

  useEffect (() => {

    console.log("Só roda uma vez!");

  }, []);

  //4 - clean up function para limpeza de memoria, evita gargalho do front 

  useEffect(() => {

    const timer = setTimeout(() => {

      console.log(`o incrementador foi alterado ${count} vezes.`);

    }, 2000);

    return () => {

      clearTimeout(timer);

    };

  }, [count]);

  // 5 - fetch api com useEffect se não deixar dentro do use effect acontece um loooping infinito travando o front

  useEffect(() => {

    fetch("https://api.github.com/users/viniciusjrcarlos")
    .then((res) => res.json())
    .then((json) => setUser(json));

  }, []);

  return (
    <>
      <div className="App"> 

      <h1>Usando o Hook useEffect </h1> <br/>

          <div>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
              Renderizar
            </button> 
            <p>{count}</p>
          </div>

          <div>
            <button onClick={() => setCountB(prevCount => prevCount + 1)}>
              Renderizar B
            </button> 
            <p>{countB}</p>
          </div>

          { user && (


              <div>
              <p>Dados do Perfil do GitHub: </p>
              <h1>Nome: {user.name} </h1>

              <p>
                Site: <a href={user.blog} >{user.blog}</a>
              </p>

              <img src={user.avatar_url} />
              </div>


          )};

       </div>
    </>
  );
}

export default App;
