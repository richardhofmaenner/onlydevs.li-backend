import { TagDetailResponse } from "../../typings/TagDetailResponse.ts";

export class Tag {
  private readonly clientId: string
  private readonly appAccessToken: string

  constructor(clientId: string, appAccessToken: string) {
    this.clientId = clientId
    this.appAccessToken = appAccessToken
  }

  getInfoById(id: string): Promise<TagDetailResponse> {
    return new Promise((resolve, reject) => {
      const requestUrl = `https://api.twitch.tv/helix/tags/streams?tag_id=${id}`

      fetch(requestUrl, {
        headers: {
          'Client-Id': this.clientId,
          'Authorization': `Bearer ${this.appAccessToken}`
        }
      })
        .then((result) => {
          if (result.status === 200 && result.body !== null) {
            result.json()
              .then((response: TagDetailResponse) => {
                resolve(response)
            })
          } else {
            reject('Something went wrong while fetching the tag')
          }
        })
        .catch(() => {
          reject('Something went wrong while fetching the tag')
        })
    })
  }
}
