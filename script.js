async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = '';
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        var consultaCepConvertido = await consultaCep.json()
        if(consultaCepConvertido.erro) {
            throw Error('CEP não existente.')
        }
        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')

        cidade.value = consultaCepConvertido.localidade
        logradouro.value = consultaCepConvertido.logradouro
        estado.value = consultaCepConvertido.uf

        console.log(consultaCepConvertido)
        return consultaCepConvertido
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente</p>`
        console.log(erro)
    }
    
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))


/*
    Para várias requisições é preciso utilizar o Promise.all
let ceps = ['01001000', '01001001']
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
*/



/*
    // corpo da resposta de uma requisição vem em formato de bytes, então é preciso transformá-lo em um JSON    para manipulá-lo
    .then(resposta => resposta.json()) 
    .then(r => {
        if (r.erro) {
            throw Error('Este CEP não existe')
        } else {
            console.log(r)
        }
    })
    // o catch pega o erro
    .catch(erro => console.log(erro))
    // o finally será processado independentemente se houve erro ou não
    .finally(mensagem => console.log('Processamento concluído'))

*/
