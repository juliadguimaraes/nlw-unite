let participantes = [
  {
  nome: "Mayk Brito",
  email: "maykbrito@gmail.com",
  dataInscricao: new Date(2024, 2, 22, 19, 20),
  dataCheckIn: new Date(2024, 2, 25, 22, 00)
  }, {
    nome: "Daniel Ferreira",
    email: "danioferreira@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "anasilva@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 10, 15),
    dataCheckIn: null
  },
  {
    nome: "Pedro Alves",
    email: "pedroalves@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 14, 45),
    dataCheckIn: new Date(2024, 3, 8, 18, 20)
  },
  {
    nome: "Maria Oliveira",
    email: "mariaoliveira@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 9, 30),
    dataCheckIn: new Date(2024, 3, 15, 11, 0)
  },
  {
    nome: "João Santos",
    email: "joaosantos@gmail.com",
    dataInscricao: new Date(2024, 3, 12, 13, 45),
    dataCheckIn: new Date(2024, 3, 16, 16, 30)
  },
  {
    nome: "Carla Pereira",
    email: "carlapereira@gmail.com",
    dataInscricao: new Date(2024, 3, 15, 10, 0),
    dataCheckIn: new Date(2024, 3, 19, 12, 45)
  },
  {
    nome: "Rafaela Santos",
    email: "rafaelasantos@gmail.com",
    dataInscricao: new Date(2024, 3, 18, 16, 20),
    dataCheckIn: new Date(2024, 3, 22, 19, 0)
  },
  {
    nome: "Gustavo Silva",
    email: "gustavosilva@gmail.com",
    dataInscricao: new Date(2024, 3, 20, 11, 30),
    dataCheckIn: new Date(2024, 3, 24, 14, 15)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucasoliveira@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 14, 50),
    dataCheckIn: new Date(2024, 3, 27, 17, 30)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)">
        Confirmar Check-In
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong> 
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document .querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()
  
  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email 
    }
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {

 const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false){
    return 
  } 

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
    })
    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}

