module.exports = {
  name: 'front-user',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/front/user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
