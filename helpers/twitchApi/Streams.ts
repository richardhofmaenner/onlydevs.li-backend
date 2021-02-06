import {Stream} from "../../typings/Stream.ts";

export class Streams {
  private readonly clientId: string
  private readonly appAccessToken: string

  constructor(clientId: string, appAccessToken: string) {
    this.clientId = clientId
    this.appAccessToken = appAccessToken
  }

  getStreamsByGameId(gameId: string, limit = 20, cursor = ""): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (limit > 100) {
          limit = 20
        }

        let requestUrl = `https://api.twitch.tv/helix/streams?first=${limit}&game_id=${gameId}`
        if (cursor !== "") {
          requestUrl += `&after=${cursor}`
        }
        fetch(requestUrl, {
          headers: {
            'Client-Id': this.clientId,
            'Authorization': `Bearer ${this.appAccessToken}`
          }
        })
            .then((result) => {
              if (result.status === 200 && result.body !== null) {
                result.json().then((response) => {
                  resolve(response)
                })
              } else {
                result.json().then((response) => {
                })
                reject('Something went wrong while fetching the streams')
              }
            })
      } catch (e) {
        console.log(e)
      }
    })
  }
}
