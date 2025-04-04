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

async function buscarEndereco(cep) {
  try {
    console.log("Buscando endereço...");
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    console.log(dados);
  } catch (error) {
    console.log(error);
  }
}

buscarEndereco("01001000");
console.log("Requisição Enviada");
