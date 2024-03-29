module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.mjs$': 'ts-jest',  
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      "^(\\.\\.?\\/.+)\\.js$": "$1"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  