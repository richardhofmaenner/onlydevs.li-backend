import {OakRouter, OakContext} from "../../deps.ts";

const v1Router = new OakRouter({prefix: '/v1'})
const gameId = 509670
let appAccessToken: undefined|string = undefined

v1Router.get('/', (ctx: OakContext) => {
  ctx.response.body = {
    'version': 1.0
  }
})

v1Router.get('/streams/', async (ctx: OakContext) => {
  try {
  if (appAccessToken === undefined) {
    const result = await fetch('https://id.twitch.tv/oauth2/token' +
      `?client_id=${Deno.env.get('TWITCH_CLIENT_ID')}` +
      `&client_secret=${Deno.env.get('TWITCH_CLIENT_SECRET')}` +
      '&grant_type=client_credentials', {
      method: 'POST'
    });

    if (result.status === 200 && result.body !== null) {
      const response = await result.json()
      appAccessToken = response.access_token
    } else {
      ctx.response.status = 500
      ctx.response.body = {"error": "Something went wrong with getting the App Access Token"}
    }
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
  } catch (e) {
    console.log(e)
    ctx.response.body = {"error": "error"}
  }
})

export default v1Router
