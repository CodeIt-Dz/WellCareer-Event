// "use server"

// const secret = process.env.JWT_SECRET as string
// const key = crypto.subtle.importKey("raw", Buffer.from(secret, 'hex'), {
//     name: "aes-cbc"
// }, false,
// [ "encrypt", "decrypt" ])

// export async function jwtEncrypt(token: string) {
//     const encoded = new TextEncoder().encode(token);
//     const iv = crypto.getRandomValues(new Uint8Array(16));
//     const encrypted = await crypto.subtle.encrypt(
//         {
//             name: "aes-cbc",
//             iv: iv,            
//             length: 256,
//         },
//         await key,
//         encoded
//     )
//     const encoded_iv = Buffer.from(iv).toString('hex')
//     const final = Buffer.from(encrypted).toString('hex')
//     return `${encoded_iv}.${final}`
// }

// export async function jwtDecrypt(etoken: string) {
//     const [encoded_iv, encoded] = etoken.split('.')
//     const iv = Buffer.from(encoded_iv, 'hex')
//     const encrypted = Buffer.from(encoded, 'hex')
//     const original = await crypto.subtle.decrypt(
//         {
//             name: "aes-cbc",
//             iv: iv,            
//             length: 256,
//         },
//         await key,
//         encrypted
//     )
//     return new TextDecoder().decode(original)
// }