import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [perfil, setPerfil] = useState("candidato");

  const [novaVaga, setNovaVaga] = useState({
    cargo:"",
    empresa:"",
    nivel:"",
    modalidade:"",
    salario:"",
    tecnologias:""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/vagas")
      .then((res)=>res.json())
      .then((data)=>setVagas(data))
      .catch((erro)=>console.log("Erro:",erro));
  }, []);

  const vagasFiltradas = vagas.filter((vaga)=>{

    const bateBusca =
      vaga.cargo.toLowerCase().includes(
        busca.toLowerCase()
      ) ||

      vaga.empresa.toLowerCase().includes(
        busca.toLowerCase()
      );

    const bateFiltro =
      filtro==="Todos" ||

      vaga.cargo.toLowerCase().includes(
        filtro.toLowerCase()
      );

    return bateBusca && bateFiltro;
  });

  const criarVaga = async()=>{

    await fetch(
      "http://127.0.0.1:8000/vagas",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          ...novaVaga,

          tecnologias:
          novaVaga.tecnologias
          .split(",")

        })
      }
    );

    window.location.reload();

  };

  const deletarVaga = async(id)=>{

    await fetch(
      `http://127.0.0.1:8000/vagas/${id}`,
      {
        method:"DELETE"
      }
    );

    setVagas(
      vagas.filter(
        vaga=>vaga.id!==id
      )
    );

  };

  const editarVaga = async(vaga)=>{

    const cargoNovo=
      prompt(
        "Cargo:",
        vaga.cargo
      );

    const empresaNova=
      prompt(
        "Empresa:",
        vaga.empresa
      );

    const nivelNovo=
      prompt(
        "Nível:",
        vaga.nivel
      );

    const modalidadeNova=
      prompt(
        "Modalidade:",
        vaga.modalidade
      );

    const salarioNovo=
      prompt(
        "Salário:",
        vaga.salario
      );

    const tecnologiasNovas=
      prompt(
        "Tecnologias:",
        vaga.tecnologias.join(", ")
      );

    if(!cargoNovo) return;

    const vagaAtualizada={

      cargo:cargoNovo,
      empresa:empresaNova,
      nivel:nivelNovo,
      modalidade:modalidadeNova,
      salario:salarioNovo,

      tecnologias:
      tecnologiasNovas
      .split(",")
      .map(item=>item.trim())
    };

    await fetch(
      `http://127.0.0.1:8000/vagas/${vaga.id}`,
      {
        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(
          vagaAtualizada
        )
      }
    );

    setVagas(

      vagas.map((v)=>

        v.id===vaga.id

        ? {
          ...vagaAtualizada,
          id:vaga.id
        }

        : v

      )

    );

  };

  return (

    <div className="container">

      <h1>DevConnect</h1>

      <p className="subtitulo">
        Encontre oportunidades para iniciar na tecnologia
      </p>

      <div className="perfil-box">

        <select
          value={perfil}
          onChange={(e)=>
            setPerfil(
              e.target.value
            )
          }
        >

          <option value="candidato">
            Candidato
          </option>

          <option value="empresa">
            Empresa
          </option>

        </select>

      </div>


      {perfil==="empresa" && (

      <div className="formulario">

        <input
          placeholder="Cargo"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              cargo:e.target.value
            })
          }
        />

        <input
          placeholder="Empresa"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              empresa:e.target.value
            })
          }
        />

        <input
          placeholder="Nível"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              nivel:e.target.value
            })
          }
        />

        <input
          placeholder="Modalidade"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              modalidade:e.target.value
            })
          }
        />

        <input
          placeholder="Salário"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              salario:e.target.value
            })
          }
        />

        <input
          placeholder="Tecnologias"
          onChange={(e)=>
            setNovaVaga({
              ...novaVaga,
              tecnologias:e.target.value
            })
          }
        />

        <button onClick={criarVaga}>
          Adicionar vaga
        </button>

      </div>

      )}

      <div className="filtros">

        <input
          type="text"
          placeholder="Buscar vaga..."
          value={busca}
          onChange={(e)=>
            setBusca(e.target.value)
          }
        />

        <select
          value={filtro}
          onChange={(e)=>
            setFiltro(e.target.value)
          }
        >

          <option>
            Todos
          </option>

          <option>
            React
          </option>

          <option>
            Python
          </option>

        </select>

      </div>

      <div className="cards">

        {vagasFiltradas.map((vaga)=>(

        <div
          className="card"
          key={vaga.id}
        >

          <h2>
            {vaga.cargo}
          </h2>

          <p>
            <strong>Empresa:</strong>
            {" "}
            {vaga.empresa}
          </p>

          <p>
            <strong>Nível:</strong>
            {" "}
            {vaga.nivel}
          </p>

          <div className="botoes">

            <button
              onClick={()=>
                setVagaSelecionada(vaga)
              }
            >
              Ver detalhes
            </button>

            {perfil==="candidato" && (

            <button
              onClick={()=>
                alert(
                "Candidatura enviada 🚀"
                )
              }
            >
              Candidatar
            </button>

            )}

            {perfil==="empresa" && (

            <>

              <button
                onClick={()=>
                  editarVaga(vaga)
                }
              >
                Editar
              </button>

              <button
                onClick={()=>
                  deletarVaga(vaga.id)
                }
              >
                Excluir
              </button>

            </>

            )}

          </div>

        </div>

        ))}

      </div>


      {vagaSelecionada && (

      <div className="detalhes">

        <h2>
          {vagaSelecionada.cargo}
        </h2>

        <p>
          <strong>Empresa:</strong>
          {" "}
          {vagaSelecionada.empresa}
        </p>

        <p>
          <strong>Nível:</strong>
          {" "}
          {vagaSelecionada.nivel}
        </p>

        <p>
          <strong>Modalidade:</strong>
          {" "}
          {vagaSelecionada.modalidade}
        </p>

        <p>
          <strong>Salário:</strong>
          {" "}
          {vagaSelecionada.salario}
        </p>

        <p>
          <strong>Tecnologias:</strong>
          {" "}
          {vagaSelecionada.tecnologias.join(" • ")}
        </p>

        <button
          className="btn-fechar"
          onClick={()=>
            setVagaSelecionada(null)
          }
        >
          Fechar
        </button>

      </div>

      )}

    </div>

  );
}

export default App;