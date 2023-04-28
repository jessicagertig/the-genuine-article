import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'utils', 'src'],
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */
  ]
};

export default config;