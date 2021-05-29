import {OakContext, OakRouter} from "../../deps.ts";
import {StreamSearchParams} from "../../typings/StreamSearchParams.ts";
import TwitchAuth from "../../helpers/TwitchAuth.ts";
import {Streams as StreamApi} from "../../helpers/twitchApi/Streams.ts";

const streamsRouter = new OakRouter({prefix: '/v1/streams'})
const gameId = "509670"
let appAccessToken: undefined | string = undefined

streamsRouter.get('/', async (ctx: OakContext) => {
  const queryParams: StreamSearchParams = {
    limit: <number|null>ctx.request.url.searchParams.get('limit'),
    cursor: <string|null>ctx.request.url.searchParams.get('cursor')
  }

  const limit = (queryParams.limit === null)? 20 : queryParams.limit
  const cursor = (queryParams.cursor === null)? "": queryParams.cursor

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
  await streamApi.getStreamsByGameId(gameId, limit, cursor)
    .then((res) => {
      ctx.response.body = res
    })
    .catch((error) => {
      ctx.response.status = 500
      ctx.response.body = {"error": error}
    })
})

export default streamsRouter
