import { Buffer } from 'buffer';

export function parseJwt(jwt: string) {
  //console.log(jwt);
  const [header, payload] = jwt
    .split('.')
    .slice(0, 2)
    .map((section) =>
      JSON.parse(Buffer.from(section, 'base64').toString('utf-8'))
    );

  return { header, payload };
}
