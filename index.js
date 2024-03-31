const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs');

const to_do_list = []

app.get('/', (req, res) => {
  res.render('index', {to_do_list: to_do_list})
})

app.post('/new_task', (req, res) => {
  const new_task = req.body.task;

  to_do_list.push(new_task)
  res.redirect('/')
})

app.post('/update_task/:index', (req, res) => {
  const task = req.body.task;
  const index = req.params.index

  to_do_list.splice(index, 1, task)
  res.redirect('/')
})

app.post('/delete_task/:index', (req, res) => {
  const index = req.params.index;

  to_do_list.splice(index, 1)
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})