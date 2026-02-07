import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'v1_7/index': 'src/v1_7/index.ts',
    'v1_7/objects/index': 'src/v1_7/objects/index.ts',
    'v1_7/events/index': 'src/v1_7/events/index.ts',
    'v1_7/enums/index': 'src/v1_7/enums/index.ts',
    'v1_6/index': 'src/v1_6/index.ts',
    'v1_6/objects/index': 'src/v1_6/objects/index.ts',
    'v1_6/events/index': 'src/v1_6/events/index.ts',
    'v1_6/enums/index': 'src/v1_6/enums/index.ts',
    'v1_5/index': 'src/v1_5/index.ts',
    'v1_5/objects/index': 'src/v1_5/objects/index.ts',
    'v1_5/events/index': 'src/v1_5/events/index.ts',
    'v1_5/enums/index': 'src/v1_5/enums/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
});
