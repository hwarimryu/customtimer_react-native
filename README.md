# customtimer_react-native

다양하게 시간과 반복 횟수를 설정해 한번에 연속적으로 실행시킬 수 있는 커스텀 타이머 앱

### screenshot
- 타이머 생성, 삭제<br>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 00.59.32.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.03.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.11.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-17 at 17.55.10.png" width="25%"></img>
<br>

- 시간 추가<br>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.39.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.57.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.01.07.png" width="25%"></img>
<br>

- 반복 설정<br>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-17 at 17.50.25.png" width="25%"></img>


### 모듈 사용시 확인할 거 
- AsyncStorage(@react-native-community/async-storage 로 바뀜)<br>
 : String만 저장 가능하기 때문에 JSON Object로 String으로 변환해서 저장해야한다 -> primary key 겹치지 않게 해줘야함.

- react-native-sound-player<br>
 : 재생할 음원 파일 main위치에 따로 넣어줘야함!!
  
- react-native-backgroud-timer<br>
 : BackroundTimer.setInteval(..) 로 해야 여러 개 하나를 중간에 끄고 다시 키고 할 수 있음!<br>
   BackroundTimer.runBackroundTimer(..)는 x
  
- react-native-vector-icons/MaterialCommunityIcons<br>
 : MaterialCommunityIcons랑 아이콘 패키지 이름들 Info.plist에 입력해야함.

### 공부
- initial 타이머 Reset할 때 <br>
 : 처음 화면 불러올 때 AsyncStorage에서 get한 결과물을 파싱해서 obj로 저장해둬서 reset할 때 내용 복사가 제대로 안되서 오류남.<br>
   ->  data 스트링 그래로 저장해두고 reset할 때 Json.parse(..)로 하면 쉬움.
