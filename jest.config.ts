import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */
  ]
};

export default config;