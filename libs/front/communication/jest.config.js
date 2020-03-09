module.exports = {
  name: 'front-communication',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/front/communication',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
