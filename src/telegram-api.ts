import { User } from './tipos';
import Requisicao from './requisicao';

export default class TelegramAPI {
  constructor(private token: string) {
    if (!token) {
      throw new Error('É necessário informar o token do bot');
    }
  }

  getMe(): Promise<User> {
    return new Requisicao(this.token, 'getMe').get<User>();
  }
}
