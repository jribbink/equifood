import { lstat, writeFile, readdir } from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
import { UsersResolver } from './app/users/users.resolver';
import { generateSchema } from './utils/generate-schema';

(async () => {
  const resolvers = await (async function recurse(p) {
    const files = await readdir(p);
    return (
      await Promise.all(
        files.map(async (filename) => {
          const filepath = path.resolve(p, filename);
          const stat = await lstat(filepath);
          if (stat.isFile()) {
            if (filepath.endsWith('.resolver.ts')) {
              const resolver = await import(filepath);
              //console.log(resolver);
              return null;
            }
          } else if (stat.isDirectory()) {
            return recurse(filepath);
          }
          return [];
        })
      )
    ).flat();
  })(cwd());

  const schema = await generateSchema([resolvers]);
  writeFile(path.join(cwd(), 'apps/equifood-api/schema.gql'), schema);
})();
