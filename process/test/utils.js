import AoLoader from '@permaweb/ao-loader'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const kilobyte = 1024;
export const megabyte = kilobyte * 1024;
export const gigabyte = megabyte * 1024;
export const STUB_ADDRESS = ''.padEnd(43, '1');
/* ao READ-ONLY Env Variables */
export const AO_LOADER_HANDLER_ENV = {
  Process: {
    Id: ''.padEnd(43, '1'),
    Owner: STUB_ADDRESS,
    Tags: [{ name: 'Authority', value: 'XXXXXX' }],
  },
  Module: {
    Id: ''.padEnd(43, '1'),
    Tags: [{ name: 'Authority', value: 'YYYYYY' }],
  },
};

export const AO_LOADER_OPTIONS = {
  format: 'wasm32-unknown-emscripten',
  inputEncoding: 'JSON-1',
  outputEncoding: 'JSON-1',
  memoryLimit: gigabyte,
  computeLimit: (9e12).toString(),
  extensions: [],
};


export const WASM_BINARY = fs.readFileSync(
  path.join(
    __dirname,
    '../../hello_wasm.wasm',
  ),
);

export const DEFAULT_HANDLE_OPTIONS = {
  Id: ''.padEnd(43, '1'),
  ['Block-Height']: '1',
  // important to set the address so that that `Authority` check passes. Else the `isTrusted` with throw an error.
  Owner: STUB_ADDRESS,
  Module: 'ANT',
  Target: ''.padEnd(43, '1'),
  From: STUB_ADDRESS,
  Timestamp: Date.now(),
};

export async function createLoader() {
  const handle = await AoLoader(WASM_BINARY, AO_LOADER_OPTIONS);
  const evalRes = await handle(
    null,
    {
      ...DEFAULT_HANDLE_OPTIONS,
      Tags: [
        { name: 'Action', value: 'Eval' },
        { name: 'Module', value: ''.padEnd(43, '1') },
      ],
      Data: "boop",
    },
    AO_LOADER_HANDLER_ENV,
  );
  return {
    handle,
    memory: evalRes.Memory,
  };
}

