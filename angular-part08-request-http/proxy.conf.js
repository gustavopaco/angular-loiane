//Note: Dica para como manter o Cors ativo Backend e mesmo assim conseguir enviar os requests, utilizando o Proxy
const PROXY_CONFIG = [
  {
    //Note: qualquer Endpoint que comece com "/api" o proprio angular ira fazer um redirecionamento para localhost:8000
    context: ['/api'],
    target: 'http://localhost:8000',
    // Note: Se estiver utilizando um Endpoint no backend que seja https, devemos setar para "True"
    secure: false,
    logLevel: 'debug',
    // Note: serve para Aplicacoes legadas onde nao foi criado um padrao de chamadas ao backend /api, dai ele reescreve o caminho antes de chamar o "target"
    pathRewrite: { '^/api': ''}
  }
];

module.exports = PROXY_CONFIG;
