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
                reject('Something went wrong while fetching the streams')
              }
            })
      } catch (e) {
      reject(e.message)
      }
    })
  }

  getAllStreamsByGameId(gameId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let cursor = ""
        let requestUrl = `https://api.twitch.tv/helix/streams?first=100&game_id=${gameId}${cursor !== ""? "&after=" + cursor : ""}`
        let streams: Stream[] = []

        do {
          const result = await fetch(requestUrl, {
            headers: {
              'Client-Id': this.clientId,
              'Authorization': `Bearer ${this.appAccessToken}`
            }
          })
          if (result.status === 200 && result.body !== null) {
            const res = await result.json()
            if (res.data.length === 100) {
              cursor = res.pagination.cursor
            } else {
              cursor = ""
            }
            res.data.forEach((el: Stream) => {
              streams.push(el)
            })
          }
        } while(cursor !== "")
        resolve(streams)
      } catch (e) {
        reject(e)
      }
    })
  }
}
