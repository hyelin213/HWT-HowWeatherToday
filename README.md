# :page_with_curl: How weather today? - HWT
<br/>
<div align="center">
<br/>
  <img src="https://user-images.githubusercontent.com/118185282/232696839-f76b479c-f9c9-4c18-ad24-9caf0086afb5.gif"/>
</div>
<br/>

## :mega:프로젝트 소개
사용자의 위치 정보를 기반으로 하는 날씨 정보 사이트입니다.<br />
시간 및 주간 별, 전국 날씨를 출력하고 기온에 따른 추천 옷차림을 확인할 수 있습니다.
<br/>

### :link:배포주소
> <https://hyelin213.github.io/HWT-HowWeatherToday/>

### :watch:개발기간
> 1인 제작<br/>
> 2023.03.01 ~ 2023.03.22

### :computer:개발환경
> `React(v18.2.0)`<br/>
> `Css3`<br/>
<br/>

## :pushpin:주요기능
#### 검색창
- onClick, onKeyDown 이벤트에 함수를 선언하여 value 값에 따라 해당 도시의 날씨 정보 업데이트
- 도시의 명칭이 정확하지 않은 경우, 결과 값이 존재하지 않아(null) 정보가 없다는 화면 출력

#### 현재날짜
- moment.js를 사용하여 현재 접속한 날짜, 시간, 요일 출력
- useEffect()내에서 setInterval로 지정된 시간마다 동작 실행

#### API
- openWeatherMap API 연동
- axios를 사용해 get방식으로 Json 데이터 호출

#### 현재 위치
- geolocation 객체를 통해 Geolocation API를 사용하고, getCurrentPosition 메서드를 호출하여 사용자 위치 정보를 구함

#### 화면 슬라이드
- Swiper.js 라이브러리로 현재 위치의 날씨와 전국 날씨의 화면을 슬라이드로 전환

#### 배경 색상 및 추천 옷차림
- Json 객체의 현재 날씨로 출력된 온도 값을 반영하여 If문을 통해 지정된 색상 코드와 문자 출력
