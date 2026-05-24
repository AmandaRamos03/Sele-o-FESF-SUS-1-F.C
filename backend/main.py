from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vagas = [
    {
        "id":1,
        "cargo":"React Developer Jr",
        "empresa":"TechStart",
        "nivel":"Júnior",
        "modalidade":"Remoto",
        "salario":"R$ 2.500",
        "tecnologias":["React","JavaScript","Git"]
    },

    {
        "id":2,
        "cargo":"Backend Python Jr",
        "empresa":"CodeHub",
        "nivel":"Júnior",
        "modalidade":"Híbrido",
        "salario":"R$ 3.000",
        "tecnologias":["Python","FastAPI","SQL"]
    }
]

class Vaga(BaseModel):
    cargo: str
    empresa: str
    nivel: str
    modalidade: str
    salario: str
    tecnologias: list[str]


@app.post("/vagas")
def criar_vaga(vaga: Vaga):
    nova_vaga = {
        "id": len(vagas)+1,
        **vaga.dict()
    }

    vagas.append(nova_vaga)

    return {
        "mensagem":"Vaga criada com sucesso",
        "vaga":nova_vaga
    }

@app.delete("/vagas/{id}")
def deletar_vaga(id: int):

    for vaga in vagas:
        if vaga["id"] == id:
            vagas.remove(vaga)

            return {
                "mensagem":"Vaga removida com sucesso"
            }

    return {
        "erro":"Vaga não encontrada"
    }

@app.put("/vagas/{id}")
def atualizar_vaga(id: int, vagaAtualizada: Vaga):

    for vaga in vagas:

        if vaga["id"] == id:

            vaga["cargo"] = vagaAtualizada.cargo
            vaga["empresa"] = vagaAtualizada.empresa
            vaga["nivel"] = vagaAtualizada.nivel
            vaga["modalidade"] = vagaAtualizada.modalidade
            vaga["salario"] = vagaAtualizada.salario
            vaga["tecnologias"] = vagaAtualizada.tecnologias

            return {
                "mensagem":"Vaga atualizada com sucesso",
                "vaga":vaga
            }

    return {
        "erro":"Vaga não encontrada"
    }

@app.get("/")
def inicio():
    return {"mensagem":"API DevConnect funcionando 🚀"}

@app.get("/vagas")
def listar_vagas():
    return vagas