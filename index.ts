import { OakApp } from "./deps.ts"
import v1Router from "./routes/v1/index.ts"
import streamsRouter from "./routes/v1/streams.ts";
import tagsRouter from "./routes/v1/tags.ts";

const app = new OakApp()

app.use(v1Router.routes())
app.use(v1Router.allowedMethods())
app.use(streamsRouter.routes())
app.use(streamsRouter.allowedMethods())
app.use(tagsRouter.routes())
app.use(tagsRouter.allowedMethods())

app.addEventListener('listen', () => {
  console.log(`App has started and is listening!`)
})

await app.listen({port: 8000})
