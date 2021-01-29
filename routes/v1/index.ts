import {OakRouter} from "../../deps.ts";

const v1Router = new OakRouter({prefix: '/v1'})
const gameId: number = 509670
let appAccessToken: undefined|string = undefined

v1Router.get('/', (ctx) => {
  ctx.response.body = {
    'version': 1.0
  }
})

v1Router.get('/streams', async (ctx) => {
  if (appAccessToken === undefined) {
    const result = await fetch('https://id.twitch.tv/oauth2/token' +
      `?client_id=${Deno.env.get('TWITCH_CLIENT_ID')}` +
      `&client_secret=${Deno.env.get('TWITCH_CLIENT_SECRET')}` +
      '&grant_type=client_credentials', {
      method: 'POST'
    });
    
  }
})

export default v1Router
