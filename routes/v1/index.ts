import {OakRouter, OakContext} from "../../deps.ts";
import TwitchAuth from '../../helpers/TwitchAuth.ts'
import {StreamSearchParams} from "../../typings/StreamSearchParams.ts";

const v1Router = new OakRouter({prefix: '/v1'})
const gameId = 509670
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

  const resultGetStreams = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`, {
    headers: {
      'Client-Id': `${Deno.env.get('TWITCH_CLIENT_ID')}`,
      'Authorization': `Bearer ${appAccessToken}`
    }
  })

  if (resultGetStreams.status === 200) {
    ctx.response.body = await resultGetStreams.json()
  } else {
    ctx.response.status = 500
    ctx.response.body = {"error": "Something went wrong while fetching the streams"}
  }
})

export default v1Router
