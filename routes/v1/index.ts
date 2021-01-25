import {OakRouter} from "../../deps.ts";

const v1Router = new OakRouter({prefix: '/v1'})

v1Router.get('/', (ctx) => {
  ctx.response.body = {
    'version': 1.0
  }
})

v1Router.get('')

export default v1Router
