module.exports = {
  mutator: {
    name: 'javascript',
    excludedMutations: ['StringLiteral']
  },
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'off',
  mutate: [
    'src/**/*.js',
    '!src/**/*spec.js'
  ],
  thresholds: {
    high: 95,
    low: 80,
    break: 90
  }
};
