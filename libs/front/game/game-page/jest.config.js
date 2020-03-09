module.exports = {
  name: 'front-game-game-page',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/front/game/game-page',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
