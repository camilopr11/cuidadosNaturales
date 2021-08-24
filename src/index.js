import '@babel/polyfill'

import app from './app'


async function main() {
    try {
        await app.listen(app.get('port'));
        console.log('Server listening on: http://localhost:3000')
    } catch (e) {
        console.error(e)
    }

}

main();