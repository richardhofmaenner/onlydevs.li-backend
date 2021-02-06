import {OakRouter, OakContext} from "../../deps.ts";
import TwitchAuth from '../../helpers/TwitchAuth.ts'
import {StreamSearchParams} from "../../typings/StreamSearchParams.ts";
import {Streams as StreamApi} from "../../helpers/twitchApi/Streams.ts";

const v1Router = new OakRouter({prefix: '/v1'})
const gameId = "509670"
let appAccessToken: undefined|string = undefined

v1Router.get('/', (ctx: OakContext) => {
  ctx.response.body = {
    'version': 1.0
  }
})

v1Router.get('/streams/', async (ctx: OakContext) => {

  const queryParams: StreamSearchParams = <StreamSearchParams>ctx.request.url.searchParams

  if (appAccessToken === undefined) {
    await TwitchAuth.getAccessToken()
      .then((access_token: string) => {
        appAccessToken = access_token
      })
      .catch((err: string) => {
        ctx.response.status = 500
        ctx.response.body = {"error": err}
      })
  }

  const streamApi = new StreamApi(<string>Deno.env.get('TWITCH_CLIENT_ID'), <string>appAccessToken)
  await streamApi.getStreamsByGameId(gameId)
      .then((res) => {
        ctx.response.body = res
      })
      .catch((error) => {
        ctx.response.status = 500
        ctx.response.body = {"error": error}
      })
})

export default v1Router
