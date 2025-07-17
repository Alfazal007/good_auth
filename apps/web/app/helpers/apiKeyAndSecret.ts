import { createHash } from 'crypto'

export function generateTimeHash() {
    const currentTime = Date.now().toString() + process.env.HASHSECRET
    const hash = createHash('md5').update(currentTime).digest('hex')
    return hash
}
