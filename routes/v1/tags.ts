import {OakRouter, OakContext} from "../../deps.ts";
import { Tag } from "../../helpers/twitchApi/Tag.ts";
import TwitchAuth from "../../helpers/TwitchAuth.ts";

const tagsRouter = new OakRouter({prefix: '/v1/tags'})

let appAccessToken: undefined | string = undefined

tagsRouter.get('/:id', async (ctx) => {

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

  const tag = new Tag(<string>Deno.env.get('TWITCH_CLIENT_ID'), <string>appAccessToken)
  const res = await tag.getInfoById(<string>ctx.params.id)
  ctx.response.body = {
    id: res.data[0]
  }
})

export default tagsRouter
