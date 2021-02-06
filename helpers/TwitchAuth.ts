export default class TwitchAuth {
  static getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        fetch('https://id.twitch.tv/oauth2/token' +
            `?client_id=${Deno.env.get('TWITCH_CLIENT_ID')}` +
            `&client_secret=${Deno.env.get('TWITCH_CLIENT_SECRET')}` +
            '&grant_type=client_credentials', {
          method: 'POST'
        }).then((result: Response) => {
          if (result.status === 200 && result.body !== null) {
            result.json().then((response) => {
              resolve(<string>response.access_token)
            })
          } else {
            reject('Error while fetching Access Token at Twitch.')
          }
        });
      } catch (e) {
        reject(e)
      }
    })
  }
}
