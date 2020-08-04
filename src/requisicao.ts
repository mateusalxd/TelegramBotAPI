import { Agent, request, RequestOptions } from 'https';
import { IncomingMessage } from 'http';
import { URL } from 'url';
import { APIResponse } from './tipos-internos';

export default class Requisicao {
  private static agente = new Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
  });
  private static cabecalhos = {
    'Content-Type': 'application/json; charset=utf-8',
    'User-Agent': 'Telegram Bot API (https://github.com/mateusalxd/TelegramBotAPI)',
  };
  private url: URL;

  constructor(private token: string, recurso?: string) {
    if (!token) {
      throw new Error('É necessário informar o token do bot');
    }

    this.url = new URL(`https://api.telegram.org/bot${token}/${recurso}`);
  }

  get<T>(corpoRequisicao?: any): Promise<T> {
    const opcoes: RequestOptions = {
      agent: Requisicao.agente,
      headers: Requisicao.cabecalhos,
      method: 'GET',
    };

    return this.criarRequisicao(corpoRequisicao, opcoes);
  }

  post<T>(corpoRequisicao?: any): Promise<T> {
    const opcoes: RequestOptions = {
      agent: Requisicao.agente,
      method: 'POST',
      headers: Requisicao.cabecalhos,
    };

    return this.criarRequisicao(corpoRequisicao, opcoes);
  }

  private criarRequisicao<T>(corpoRequisicao?: any, opcoes?: RequestOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const requisicao = request(this.url, opcoes || {}, (resposta: IncomingMessage) => {
        const corpoResposta: any[] = [];

        resposta.on('data', (chunk) => {
          corpoResposta.push(chunk);
        });

        resposta.on('end', () => {
          try {
            const respostaAPI = JSON.parse(Buffer.concat(corpoResposta).toString()) as APIResponse;
            if (respostaAPI.ok) {
              resolve(respostaAPI?.result as T);
            } else {
              reject({ error_code: respostaAPI.error_code, description: respostaAPI.description });
            }
          } catch (erro) {
            reject(erro);
          }
        });

        resposta.on('error', (erro) => reject(erro));
      });

      requisicao.on('error', (erro) => reject(erro));

      if (corpoRequisicao) {
        requisicao.write(Buffer.from(JSON.stringify(corpoRequisicao)));
      }

      requisicao.end();
    });
  }
}
