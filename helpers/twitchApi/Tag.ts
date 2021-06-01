export class Tag {
  private readonly clientId: string
  private readonly appAccessToken: string

  constructor(clientId: string, appAccessToken: string) {
    this.clientId = clientId
    this.appAccessToken = appAccessToken
  }

  getInfoById(id: string): Promise<any> {
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
            result.json().then((response) => {
              resolve(response)
            })
          } else {
            reject('Something went wrong while fetching the tag')
          }
        })
        .catch((error) => {
          reject('Something went wrong while fetching the tag')
        })
    })
  }
}
