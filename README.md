# customtimer_react-native

다양하게 시간과 반복 횟수를 설정해 한번에 연속적으로 실행시킬 수 있는 커스텀 타이머 앱

### screenshot

<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 00.59.32.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.03.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.11.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.39.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.00.57.png" width="25%"></img>
<img src="/screenshots/Simulator Screen Shot - iPhone 11 - 2020-07-16 at 01.01.07.png" width="25%"></img>


### 모듈 사용시 확인할 거 
- AsyncStorage
 String만 저장 가능하기 때문에 JSON Object로 String으로 변환해서 저장해야한다
 -> primary key 겹치지 않게 해줘야함.
 
- react-native-sound-player
  재생할 음원 파일 main위치에 따로 넣어줘야함!!
  
- react-native-backgroud-timer
  BackroundTimer.setInteval(..) 로 해야 여러 개 하나를 중간에 끄고 다시 키고 할 수 있음!
  BackroundTimer.runBackroundTimer(..)는 x
  
- react-native-vector-icons/MaterialCommunityIcons 
  MaterialCommunityIcons랑 아이콘 패키지 이름들 Info.plist에 입력해야함.

 
