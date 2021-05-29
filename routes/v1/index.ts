import {OakRouter, OakContext} from "../../deps.ts";

const v1Router = new OakRouter({prefix: '/v1'})

v1Router.get('/', (ctx: OakContext) => {
  ctx.response.body = {
    'version': 1.0
  }
})

export default v1Router
