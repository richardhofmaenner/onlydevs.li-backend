import {Stream} from "../../typings/Stream.ts";

export class Streams {
  static getStreamsByGameId(gameId: string, appAccessToken: string, limit: number = 20, offset: number = 0): Promise<any> {
    let streams: Array<Stream> = []
    let cursor: string|null = null
    return new Promise( async (resolve, reject) => {
      do {
        let requestUrl = `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100`
        if (cursor !== null) {
          requestUrl = `${requestUrl}&after=${cursor}`
        }
        const result = await fetch(requestUrl, {
          headers: {
            'Client-Id': `${Deno.env.get('TWITCH_CLIENT_ID')}`,
            'Authorization': `Bearer ${appAccessToken}`
          }
        })
        if (result.status === 200 && result.body !== null) {
          const response = await result.json()
          streams.push.apply(response.data)
          cursor = response.pagination.cursor
        } else {
          reject('Something went wrong while fetching the streams.')
          break;
        }
      } while (streams.length % 100 === 0)
    })
  }
}
