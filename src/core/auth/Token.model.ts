export interface TokenData {
  token: string;
  newUser: boolean;
}

class Token implements TokenData {
  token: string;
  newUser: boolean;

  constructor(data: TokenData) {
    this.token = data.token;
    this.newUser = data.newUser;
  }

  static buildTokenDataFromResponse(response: any): TokenData {
    return {
      token: response.token,
      newUser: response.new_user
    };
  }
}

export default Token;
