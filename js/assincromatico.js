// API -> Ela fornece dados
// PROMISSE ->  Ela vai devolver alguma coisa, promessa que vai ter uma resposta,
// pode ser de erro, de sucesso, que falhou ou ficar esperando até receber uma resposta da API
// FETCH -> Funções do método HTTP
// ASYNC -> Significa que a função ela é assincronas, quando o botao 1
// for acionado ele vai demorar para pegar dados, mas ele vai continuar
// apertando os outros e mandando resposta mesmo que o botao 1 ainda esteja carregando
// a resposta, quando ele enviar não vai mudar nada.

// COMO UMA API FUNCIONA??

// const minhaPromise = new Promise((resolve, reject) => {
//   let sucesso = false;

//   setTimeout(() => {
//     if (sucesso) {
//       resolve("A PROMISSE FOI UM SUCESSO!");
//     } else {
//       reject("A PROMISSE NAO FOI UM SUCESSO!");
//     }
//   }, 2000);
// });

// minhaPromise
//   .then((resultado) => console.log(resultado))
//   .catch((erro) => console.log(erro));

/* ----------------------------------------------------------------------- */

// UMA MANEIRA DE RODAR API

// function buscarEndereco(cep) {
//   return new Promise((resolve, reject) => {
//     console.log("Buscando endereço...");

//     fetch(`https://viacep.com.br/ws/${cep}/json/`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro na resposta da API");
//         }
//         return response.jason();
//       })
//       .then((data) => {
//         if (data.erro) {
//           reject("CEP não foi encontrado!");
//         } else {
//           resolve(data);
//         }
//       })
//       .catch((error) => {
//         reject("Erro na requisição: " + error)
//       });
//   });
// }

// buscarEndereco("01001000")
//   .then((endereco) => {
//     console.log("Endereço encontrado: ", endereco);
//   })
//   .catch((error) => console.log(error));

// ASYNC/AWAIT - SEGUNDA MANEIRA DE MANDAR API

// async function buscarEndereco(cep) {
//   try {
//     console.log("Buscando endereço...");
//     const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//     const dados = await resposta.json();
//     console.log(dados);
//   } catch (error) {
//     console.log(error);
//   }
// }

// buscarEndereco("01001000");
// console.log("Requisição Enviada");

class Endereco {
  constructor(
    cep = "",
    rua = "",
    bairro = "",
    cidade = "",
    uf = "",
    complemento = ""
  ) {
    this.cep = cep;
    this.rua = rua;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.complemento = complemento;
  }

  async buscarEndereco(cep) {
    try {
      let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      let dados = await response.json();

      console.log(dados);

      this.cep = dados.cep;
      this.rua = dados.rua;
      this.bairro = dados.bairro;
      this.cidade = dados.cidade;
      this.uf = dados.uf;
      this.complemento = dados.complemento || "";

      return this;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

class TipoEndereco extends Endereco {
  constructor(cep, rua, bairro, cidade, uf, complemento, tipo) {
    super(cep, rua, bairro, cidade, uf, complemento);
    this.tipo = tipo;
  }

  exibirEndereco() {
    return {
      tipo: this.tipo,
      cep: this.cep,
      rua: this.rua,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf,
      complemento: this.complemento,
    };
  }
}

document
  .getElementById("cep")
  .addEventListener("input", async function (event) {
    const cep = event.target.value;

    // if (cep.length === 8) {
    //   console.log("CEP VÁLIDO!");
    // }

    if (cep.length === 8) {
      const endereco = new Endereco();
      const results = await endereco.buscarEndereco(cep);

      console.log(results);

      if (results) {
        document.getElementById("rua").value = results.rua;
        document.getElementById("bairro").value = results.bairro;
        document.getElementById("cidade").value = results.cidade;
        document.getElementById("uf").value = results.uf;
        document.getElementById("complemento").value = results.complemento;
      } else {
        alert("CEP INVÁLIDO");
      }
    }
  });
