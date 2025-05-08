import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const {mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'ngnm-auth',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({inline: true}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'auth',
        filename: 'auth.container.js.bundle',
        dts: false,
        exposes: {
          './AuthScreen': './src/AuthScreen'
        },
        shared: {
          'react':  {
            singleton: true,
            eager: true,
            version: '19.0.0',
            requiredVersion: '19.0.0',
          },
          'react-native':  {
            singleton: true,
            eager: true,
            version: '0.78.2',
            requiredVersion: '0.78.2',
          },
          'react-native-webview': {
            singleton: true,
            eager: true,
            version: '13.13.5',
            requiredVersion: '13.13.5',
          }
        }
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
