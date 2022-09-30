import { httpPort, httpsPort } from './serverConfig/appExpress'
import { httpsServer } from './serverConfig/https';
import { httpServer } from './serverConfig/http';

httpServer.listen(httpPort)
httpsServer.listen(httpsPort)

console.log('Servidor http rodando na porta : ', httpPort)
console.log('Servidor https rodando na porta : ', httpsPort)
