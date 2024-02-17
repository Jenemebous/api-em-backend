import express from 'express'

const app = express()

app.use(express.json())

// mock

const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Argentina', grupo: 'G'},
    {id: 3, selecao: 'Sérvia', grupo: 'G'},
    {id: 4, selecao: 'Camarões', grupo: 'G'},
]

// retornar o obj por id

function buscarSelecoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)

}

//  pegar o index do elemento no array por id

function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}

// criar rota padrão ou raiz

app.get('/', (req, res) => {
   res.send('Pipoca, odeio pweb')

})

app.get('/selecoes', (req, res) => {
   res.status(200).send(selecoes)
})

app.get('/selecoes/:id', (req, res) => {
   let index = req.params.id
   res.json(buscarSelecoPorId(req.params.id))
})

app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id  ${req.params.id}excluída com sucesso!`)
})

app.put('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})

export default app
