import nacl from 'tweetnacl'
import { encodeBase64 } from 'tweetnacl-util'

export function generateEd25519KeyPair() {
    const keyPair = nacl.sign.keyPair()
    const privateKeySeed = keyPair.secretKey.slice(0, 32)
    const publicKey = keyPair.publicKey

    return {
        privateKey: encodeBase64(privateKeySeed),
        publicKey: encodeBase64(publicKey),
    }
}
