export interface UserData {
  /** @type {Generics.UUID} */
  id: string;
  username: string;
  email: string;
  picture?: string | null;
}

class User implements UserData {
  id: string;
  username: string;
  email: string;
  picture?: string | null;

  constructor(data: UserData) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.picture = data.picture;
  }

  static buildUserDataFromResponse(response: any): UserData {
    return {
      id: response.id,
      username: response.username,
      email: response.email,
      picture: response.picture
    };
  }
}

export default User;
