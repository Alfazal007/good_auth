import nacl from 'tweetnacl';
import { encodeBase64, decodeBase64 } from 'tweetnacl-util';

export function signEmail(email: string, privateKeyBase64: string): string {
    const privateKeySeed = decodeBase64(privateKeyBase64);
    const keyPair = nacl.sign.keyPair.fromSeed(privateKeySeed);
    const message = new TextEncoder().encode(email);
    const signature = nacl.sign.detached(message, keyPair.secretKey);
    return encodeBase64(signature);
}

