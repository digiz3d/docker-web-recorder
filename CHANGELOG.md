# Changelog

## [1.4.0](https://github.com/digiz3d/docker-web-recorder/compare/v1.3.0...v1.4.0) (2025-02-25)


### Features

* support changing the x264 encoder tune ([#114](https://github.com/digiz3d/docker-web-recorder/issues/114)) ([5ca8c32](https://github.com/digiz3d/docker-web-recorder/commit/5ca8c32ae0941fb8ecedce5a971bff6fad202433))


### Bug Fixes

* cleanup X server locks during boot ([#115](https://github.com/digiz3d/docker-web-recorder/issues/115)) ([231c23b](https://github.com/digiz3d/docker-web-recorder/commit/231c23bc7e74b4c38188749c4a8b3e9ad1e3d94c))
* gracefully shutdown FFmpeg on signals ([#112](https://github.com/digiz3d/docker-web-recorder/issues/112)) ([50f6ea0](https://github.com/digiz3d/docker-web-recorder/commit/50f6ea0cc90479f48a691a5ccb1c4954c2a750c2))

## [1.3.0](https://github.com/digiz3d/docker-web-recorder/compare/v1.2.3...v1.3.0) (2025-02-16)


### Features

* flag to disable audio recording ([#104](https://github.com/digiz3d/docker-web-recorder/issues/104)) ([8b78c22](https://github.com/digiz3d/docker-web-recorder/commit/8b78c22183ff00beffa698d36de57cadcfad70aa))

## [1.2.3](https://github.com/digiz3d/docker-web-recorder/compare/v1.2.2...v1.2.3) (2024-09-15)


### Bug Fixes

* **deps:** bump all dependencies ([#79](https://github.com/digiz3d/docker-web-recorder/issues/79)) ([d809757](https://github.com/digiz3d/docker-web-recorder/commit/d80975735e7b8a090ba31db67d66fbaa17fb37f6))
* **deps:** update dependency uuid to v9.0.1 ([#51](https://github.com/digiz3d/docker-web-recorder/issues/51)) ([5aeee7f](https://github.com/digiz3d/docker-web-recorder/commit/5aeee7f3ba383d8e73cd5a094a74d2ef61560df5))

## [1.2.2](https://github.com/digiz3d/docker-web-recorder/compare/v1.2.1...v1.2.2) (2023-06-18)


### Bug Fixes

* **deps:** update dependency @google-cloud/storage to v6.11.0 ([#29](https://github.com/digiz3d/docker-web-recorder/issues/29)) ([be38663](https://github.com/digiz3d/docker-web-recorder/commit/be386638710b156a00d2f06c38d780a9c423ec0e))
* revert to a working base image ([5b7c82d](https://github.com/digiz3d/docker-web-recorder/commit/5b7c82dc131da87ff088e3ee3d6fbf6628f72ad6))

## [1.2.1](https://github.com/digiz3d/docker-web-recorder/compare/v1.2.0...v1.2.1) (2023-05-22)


### Bug Fixes

* **deps:** update dependency puppeteer-core to v20.3.0 ([#21](https://github.com/digiz3d/docker-web-recorder/issues/21)) ([0e4b4f3](https://github.com/digiz3d/docker-web-recorder/commit/0e4b4f31b70571ace403d585fdca0d5c33d6998e))

## [1.2.0](https://github.com/digiz3d/docker-web-recorder/compare/v1.1.1...v1.2.0) (2023-05-18)


### Features

* add support for Google Cloud Storage ([#17](https://github.com/digiz3d/docker-web-recorder/issues/17)) ([b5e3147](https://github.com/digiz3d/docker-web-recorder/commit/b5e3147ac6886386aba68ac687c2322b7733f299))

## [1.1.1](https://github.com/digiz3d/docker-web-recorder/compare/v1.1.0...v1.1.1) (2023-05-18)


### Bug Fixes

* correctly copy entrypoint ([609e64a](https://github.com/digiz3d/docker-web-recorder/commit/609e64a9a9fa437944e9d1ef422a0dee5c08db30))
* use correct entrypoint to work on windows ([4f422c3](https://github.com/digiz3d/docker-web-recorder/commit/4f422c3a80e3986a6bcf1148e10796d54b592334))

## [1.1.0](https://github.com/digiz3d/docker-web-recorder/compare/v1.0.0...v1.1.0) (2023-05-17)


### Features

* add custom resolution support ([#7](https://github.com/digiz3d/docker-web-recorder/issues/7)) ([2edf05e](https://github.com/digiz3d/docker-web-recorder/commit/2edf05e476178b4ba863caf9c94ea4b9b3734d22))

## 1.0.0 (2023-05-17)


### Features

* add rtmp output support ([#3](https://github.com/digiz3d/docker-web-recorder/issues/3)) ([5750f2e](https://github.com/digiz3d/docker-web-recorder/commit/5750f2e57d88b751283171ed8fc0e08aa6995334))
* add support for emojis ([33081a7](https://github.com/digiz3d/docker-web-recorder/commit/33081a7e114f158f326f181e50bc4e8433aa3630))
* ARM support & replace google chrome by chromium ([#1](https://github.com/digiz3d/docker-web-recorder/issues/1)) ([ca5d33a](https://github.com/digiz3d/docker-web-recorder/commit/ca5d33ac3d2cf7643488ed91c4fe8efb2e5f245a))


### Bug Fixes

* duration infinite by default ([85dcb54](https://github.com/digiz3d/docker-web-recorder/commit/85dcb54cb29a11919577dc8fe2d09fc687a83ca8))
