# SkyEngine Pixi Back
[SkyEngine](http://skyengine.uppercase.io/) 드로잉 성능 향상을 위해 [PixiJS](http://www.pixijs.com/)를 적용합니다.

## 주의사항 및 한계
* `draw` 및 `drawArea` 함수를 사용하지 않습니다.
* `SkyEngine.CreateGradient`는 `SkyEngine.Rect` 및 `SkyEngine.Circle`에서만 사용할 수 있습니다.
* `border` 설정에서 스타일이 적용되지 않습니다. (점선 등 사용 불가, 직선만 사용 가능)
* `red`, `green`, `blue` 등 색상 이름을 사용할 수 없습니다. `#123456`와 같은 색상 코드값을 입력해야 합니다.
* `scale`이 변경되는 경우 자식 노드의 스케일이 [SkyEngine](http://skyengine.uppercase.io/)과는 다르게 동작합니다.
* `SkyEngine.Background`에서 `leftMargin`, `rightMargin`, `topMargin`, `bottomMargin` 설정을 사용할 수 없습니다.
* 디버그 모드일 때, `SkyEngine.Silhouette`의 영역이 드로우 되지 않습니다.
* `SkyEngine.ParticleSystem`는 일부 설정이 작동하지 않습니다.
* 현재 `filter` 설정으로 `grayscale`과 `saturate`만 지원됩니다. 추가로 필터가 필요한 경우 [Issues](https://github.com/Hanul/SkyEnginePixiBack/issues)에 남겨주시기 바랍니다.

## 설치하기
프로젝트의 `DEPENDENCY` 파일에 `Hanul/SkyEnginePixiBack`을 추가합니다.

## 소스코드
https://github.com/Hanul/SkyEnginePixiBack

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)