module.exports = {
  name: 'front-lobby-lobby-page',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/front/lobby/lobby-page',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
