import app from './app'

app.listen(app.get('port'), () => {
  console.log('port on server', app.get('port'))
})
