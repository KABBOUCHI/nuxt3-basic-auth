import type { IncomingMessage, ServerResponse } from 'http'
import auth from 'basic-auth'
import compare from 'tsscmp'

// Basic function to validate credentials for example
function check(name, pass) {
    var valid = true

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, 'john') && valid
    valid = compare(pass, 'secret') && valid

    return valid
}

export default async (req: IncomingMessage, res: ServerResponse) => {
    const credentials = auth(req)

    if (!credentials || !check(credentials.name, credentials.pass)) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="nuxt-3-basic-auth-example"')
        res.end('Access denied')
    }
}