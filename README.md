### 🔷 Slack Clone FE 🔷
슬랙의 틀을 클론하며 최소 기능과 실시간 채팅(Web Soket)을 구현합니다.
22.6.23 = 프로젝트를 마무리하며 로그인,회원가입,채널,채팅을 구현하고 웹소켓을 적용하지 못했습니다.

![image](https://user-images.githubusercontent.com/103887348/175287698-1bb7a4ee-dd3e-49fc-bb8a-d445c8b8f314.png)
![image](https://user-images.githubusercontent.com/103887348/175287677-e75e5648-6fec-48ff-b0ec-3736e6883f69.png)
![image](https://user-images.githubusercontent.com/103887348/175287224-25091fe4-4313-4f3f-83ea-71b3de8d129d.png)
![image](https://user-images.githubusercontent.com/103887348/175287613-1d78fb1a-3905-4833-9270-31a3be963ba6.png)


### ✔ 팀원
Back : 나호준, 인기천, 서다빈<br/>
Front : 이동복, 문희린

### ✔ 개발기간
2022.06.17 ~ 2022.06.23

### ✔ 역할 분담
![image](https://user-images.githubusercontent.com/103887348/174427710-f020bf92-3ecb-4964-abe5-d23f4abd9900.png)

### ✔ 기존 Slack 사이트와 다른점

- 회원가입
    - 기존 slack과는 다르게 메일인증 요청으로 가입하지 않고, email, 이름, 비밀번호를 DB에 별도로 저장합니다.
- 메인기능
    - 기존 슬랙에서 회사별로 업무별로 대화 할 수 있는 환경보다 채팅 본연의 기능 구현을 1차 포커스로 맞췄습니다.

### ✔ Flowchart

- 회원가입
    - 기존 slack과는 다르게 메일인증 요청으로 가입하지 않고, email, 이름, 비밀번호를 DB에 별도로 저장합니다.
- 메인기능
    - 첫 사용자가 회사에 현재 존재하는 인원인지 승인하는 과정을 생략하였습니다.
    - 기존 슬랙에서 회사별로 / 업무별로 지정한 사람들끼리 대화 할 수 있는 환경보다 채팅 본연의 기능 구현을 1차 포커스로 맞췄습니다.

### ‼ Truoble Shooting ‼
로컬스토리지 사용하여 자동 로그인 하는 이유 - 로그아웃시 쿠키를 삭제하기 때문에<br/>
map 함수 오류, array를 사용하지 않았던 점 :


### ✔ 와이어 프레임
![image](https://user-images.githubusercontent.com/103887348/174427639-2164f6eb-4570-40c6-9ce0-a12acdd95e7e.png)

### ✔ 패키지 설치
![image](https://user-images.githubusercontent.com/103887348/174427688-58748daf-37fd-424a-b4df-72c02adf4994.png)
