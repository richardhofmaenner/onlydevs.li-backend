import {OakApp} from "./deps.ts"
import v1Router from "./routes/v1/index.ts"

const app = new OakApp()

app.use(v1Router.routes())
app.use(v1Router.allowedMethods())

app.addEventListener('listen', () => {
  console.log(`App has started and is listening!`)
})

await app.listen({port: 8000})
