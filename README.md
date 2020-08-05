# TelegramBotAPI

Biblioteca com funcionalidades básicas da API de Bot do Telegram

## Como utilizar

Instale a biblioteca direto do repositório.

```bash
npm instal https://github.com/mateusalxd/TelegramBotAPI.git
```

Em seguida você poderá usar a biblioteca conforme exemplo abaixo.

```typescript
import TelegramAPI from 'telegram-bot-api';
const telegram = new TelegramAPI('<bot_token>');

telegram
  .getMe()
  .then((retorno) => console.log(retorno))
  .catch((erro) => console.log(erro));
```

## Script utilizado no montagem

Os arquivos `telegram-types` e `telegram-api` foram gerados praticamente com o script a seguir, por esse motivo podem existir bugs.

**Importante**

- a documentação oficial da api do Telegram [está aqui](https://core.telegram.org/bots/api)
- os emojis foram substituídos por texto na documentação
- o último tipo ou método da API não é recuperado pelo script, por esse motivo deve ser inserido manualmente
- o tipo `InputFile` e qualquer outro que dependa dele deve ser bem avaliado antes do uso

```javascript
let _elementos = document.getElementById('dev_page_content');
let _iniciar = false;
let _ehLista = false;
let _tipoGeracaoAnterior = '';
let _tipoGeracao = '';
let _tipoAnterior = '';
let _tipo = '';
let _propriedades = '';
let _documentacao = '';
let _resultado = '';
let _resultadoMetodos = '';

function ehInicioDoMapeamento(elemento) {
  return _iniciar === false && elemento.localName === 'h3' && elemento.textContent.indexOf('Getting updates') !== -1;
}

function ehTagPermitida(elemento) {
  return ['h4', 'table', 'p', 'blockquote', 'ul'].indexOf(elemento.localName) !== -1;
}

function determinarTipoGeracao(elemento) {
  if (
    elemento.localName === 'h4' &&
    elemento.textContent.charAt(0) === elemento.textContent.charAt(0).toUpperCase() &&
    elemento.textContent.indexOf(' ') === -1
  ) {
    return 'tipos';
  } else if (
    elemento.localName === 'h4' &&
    elemento.textContent.charAt(0) === elemento.textContent.charAt(0).toLowerCase() &&
    elemento.textContent.indexOf(' ') === -1
  ) {
    return 'metodos';
  }
}

function ehNomeDoTipo(elemento) {
  return elemento.localName === 'h4' && elemento.textContent.indexOf(' ') === -1;
}

function ehDocumentacao(elemento) {
  return _tipo && !_propriedades && ['table', 'ul'].indexOf(elemento.localName) === -1;
}

function ehTabelaDePropriedades(elemento) {
  return _tipo && elemento.localName === 'table';
}

function ehListaDePropriedades(elemento) {
  return _tipo && elemento.localName === 'ul';
}

function traduzirTipoTelegram(tipoTelegram) {
  if (['Integer', 'Float', 'Float number'].indexOf(tipoTelegram) !== -1) {
    return 'number';
  } else if (['String', 'Boolean', 'True'].indexOf(tipoTelegram) !== -1) {
    return tipoTelegram.toLowerCase();
  } else if (tipoTelegram.indexOf('Array of') !== -1 && tipoTelegram.indexOf(' and ') !== -1) {
    let tipos = tipoTelegram.replace('Array of', '').trim().split(' and ');
    let tiposTraduzidos = tipos.map((t) => traduzirTipoTelegram(`Array of ${t}`));
    return tiposTraduzidos.reduce((anterior, atual) => (anterior ? `${anterior} | ${atual}` : atual), '');
  } else if (tipoTelegram.indexOf('Array of Array of') !== -1) {
    return `${traduzirTipoTelegram(tipoTelegram.replace('Array of Array of', '').trim())}[][]`;
  } else if (tipoTelegram.indexOf('Array of') !== -1) {
    return `${traduzirTipoTelegram(tipoTelegram.replace('Array of', '').trim())}[]`;
  } else if (tipoTelegram.indexOf(' or ') !== -1) {
    let tipos = tipoTelegram.split(' or ');
    let tiposTraduzidos = tipos.map((t) => traduzirTipoTelegram(t));
    return tiposTraduzidos.reduce((anterior, atual) => (anterior ? `${anterior} | ${atual}` : atual), '');
  } else {
    return tipoTelegram;
  }
}

function formatarTextoDocumentacao(texto) {
  return texto
    .replace(/. More info .+ »\.?/g, '')
    .replace(/. More about .+ »\.?/g, '')
    .replace(/[“”]/g, '"')
    .replace(/—–/g, '-')
    .replace(/…/g, '...')
    .replace(/»/g, '')
    .trim();
}

function formatarDocumentacao(documentacao) {
  return `${documentacao ? `/*\n* ${formatarTextoDocumentacao(documentacao).replace('\n', '\n* ')}\n*/` : ''}`;
}

function formatarNomeTipoMetodo(nome) {
  return `${nome.charAt(0).toUpperCase()}${nome.substr(1)}Params`;
}

function criarTipo(tipo, propriedades, documentacao, exportar, lista) {
  if (propriedades) {
    return `${_tipoGeracaoAnterior === 'tipos' ? formatarDocumentacao(documentacao) : ''}
        ${exportar ? 'export ' : ''}type ${tipo} = 
            ${
              lista
                ? propriedades
                : `
            {
                ${propriedades}
            }`
            }
        ;`;
  } else {
    if (_tipoGeracaoAnterior === 'tipos') {
      return `${_tipoGeracaoAnterior === 'tipos' ? formatarDocumentacao(documentacao) : ''}
            ${exportar ? 'export ' : ''}type ${tipo} = any;`;
    }

    return '';
  }
}

function criarMetodo(tipo, propriedades, documentacao) {
  if (_tipoGeracaoAnterior === 'metodos') {
    let nomeMetodo;
    if (tipo.endsWith('Params')) {
      nomeMetodo = `${tipo.charAt(0).toLowerCase()}${tipo.substring(1, tipo.length - 6)}`;
    } else {
      nomeMetodo = tipo;
    }

    let tipoRetorno;
    if (
      documentacao.indexOf('Returns True on success.') !== -1 ||
      documentacao.indexOf('On success, True is returned.') !== -1
    ) {
      tipoRetorno = 'boolean';
    } else if (documentacao.indexOf('Returns Int on success.') !== -1) {
      tipoRetorno = 'number';
    } else if (documentacao.indexOf('On success, the sent Message is returned.') !== -1) {
      tipoRetorno = 'TP.Message';
    } else if (documentacao.indexOf('Returns a ChatMember object on success.') !== -1) {
      tipoRetorno = 'TP.ChatMember';
    } else if (documentacao.indexOf('On success, the stopped Poll with the final results is returned.') !== -1) {
      tipoRetorno = 'TP.Poll';
    } else if (documentacao.indexOf('Returns Array of BotCommand on success.') !== -1) {
      tipoRetorno = 'TP.BotCommand[]';
    } else if (
      documentacao.indexOf(
        'On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.',
      ) !== -1 ||
      documentacao.indexOf(
        'On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.',
      ) !== -1 ||
      documentacao.indexOf(
        'On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.',
      ) !== -1 ||
      documentacao.indexOf(
        'On success, if the message was sent by the bot, returns the edited Message, otherwise returns True.',
      ) !== -1
    ) {
      tipoRetorno = 'TP.Message | boolean';
    } else if (documentacao.indexOf('On success, a File object is returned.') !== -1) {
      tipoRetorno = 'TP.File';
    } else if (
      documentacao.indexOf(
        'On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots.',
      ) !== -1
    ) {
      tipoRetorno = 'TP.ChatMember[]';
    } else if (documentacao.indexOf('On success, a StickerSet object is returned.') !== -1) {
      tipoRetorno = 'TP.StickerSet';
    } else if (documentacao.indexOf('Returns the uploaded File on success.') !== -1) {
      tipoRetorno = 'TP.File';
    } else if (documentacao.indexOf('On success, returns a WebhookInfo object.') !== -1) {
      tipoRetorno = 'TP.WebhookInfo';
    } else if (documentacao.indexOf('On success, returns an Array of GameHighScore objects.') !== -1) {
      tipoRetorno = 'TP.GameHighScore[]';
    } else if (documentacao.indexOf('On success, an array of the sent Messages is returned.') !== -1) {
      tipoRetorno = 'TP.Message[]';
    } else if (documentacao.indexOf('Returns basic information about the bot in form of a User object.') !== -1) {
      tipoRetorno = 'TP.User';
    } else if (documentacao.indexOf('Returns a UserProfilePhotos object.') !== -1) {
      tipoRetorno = 'TP.UserProfilePhotos';
    } else if (documentacao.indexOf('Returns the new invite link as String on success.') !== -1) {
      tipoRetorno = 'string';
    } else if (documentacao.indexOf('Returns a Chat object on success.') !== -1) {
      tipoRetorno = 'TP.Chat';
    } else {
      tipoRetorno = 'any';
    }

    if (propriedades) {
      return `${formatarDocumentacao(documentacao)}
            ${nomeMetodo}(parametros: TP.${tipo}):Promise<${tipoRetorno}>{
                return new Requisicao(this.token, '${nomeMetodo}').post(parametros);
            }`;
    } else {
      return `${formatarDocumentacao(documentacao)}
            ${nomeMetodo}():Promise<${tipoRetorno}>{
                return new Requisicao(this.token, '${nomeMetodo}').get();
            }`;
    }
  } else {
    return '';
  }
}

function criarPropriedade(nome, opcional, tipo, documentacao) {
  return `${formatarDocumentacao(documentacao)}
  ${nome}${opcional ? '?' : ''}: ${tipo};\n`;
}

function extrairPropriedadesDaTabela(elemento) {
  let linhas = elemento.querySelectorAll('tbody tr');
  let colunaDescricaoCampo = _tipoGeracao === 'tipos' ? 2 : 3;
  let opcional;

  for (let x = 0; x < linhas.length; x++) {
    let celulas = linhas[x].querySelectorAll('td');
    let campo = celulas[0].textContent.trim();
    let tipoCampo = celulas[1].textContent.trim();
    let descricaoCampo = celulas[colunaDescricaoCampo].textContent.trim();
    if (_tipoGeracao === 'tipos') {
      opcional = descricaoCampo.toString().indexOf('Optional.') !== -1 ? true : false;
    } else {
      opcional = celulas[2].textContent.trim().toLowerCase() !== 'yes' ? true : false;
    }

    let tipoTraduzido = traduzirTipoTelegram(tipoCampo);
    let propriedade = criarPropriedade(campo, opcional, tipoTraduzido, descricaoCampo);
    _propriedades += propriedade;
  }
}

function extrairPropriedadesDaLista(elemento) {
  let linhas = Array.prototype.slice.call(elemento.querySelectorAll('li'));
  if (!_propriedades) {
    _propriedades = linhas.reduce(
      (anterior, atual) => (anterior ? `${anterior} | ${atual.textContent.trim()}` : atual.textContent.trim()),
      '',
    );
    _ehLista = true;
  }
}

for (let i = 0; i < _elementos.childElementCount; i++) {
  let elemento = _elementos.children[i];

  if (ehInicioDoMapeamento(elemento)) {
    _iniciar = true;
  }

  if (_iniciar) {
    if (ehTagPermitida(elemento)) {
      if (ehNomeDoTipo(elemento)) {
        _tipoGeracao = determinarTipoGeracao(elemento);
        if (!_tipoGeracaoAnterior) {
          _tipoGeracaoAnterior = _tipoGeracao;
        }

        if (_tipoGeracao === 'tipos') {
          _tipo = elemento.textContent.trim();
        } else {
          _tipo = formatarNomeTipoMetodo(elemento.textContent.trim());
        }

        if (!_tipoAnterior) {
          _tipoAnterior = _tipo;
        }

        if (_tipoAnterior !== _tipo) {
          _resultado += '\n\n' + criarTipo(_tipoAnterior, _propriedades, _documentacao, true, _ehLista);
          _resultadoMetodos += '\n\n' + criarMetodo(_tipoAnterior, _propriedades, _documentacao);
          _tipoAnterior = _tipo;
          _tipoGeracaoAnterior = _tipoGeracao;
          _propriedades = '';
          _documentacao = '';
          _ehLista = false;
        }
      } else if (ehDocumentacao(elemento)) {
        if (!_documentacao) {
          _documentacao += formatarTextoDocumentacao(elemento.textContent);
        } else {
          _documentacao += '\n' + formatarTextoDocumentacao(elemento.textContent);
        }
      } else if (ehTabelaDePropriedades(elemento)) {
        extrairPropriedadesDaTabela(elemento);
      } else if (ehListaDePropriedades(elemento)) {
        extrairPropriedadesDaLista(elemento);
      }
    }
  }
}
```
