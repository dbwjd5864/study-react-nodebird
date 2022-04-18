import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';


const configureStore = () => {
    const store = createStore(reducer);
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

// redux: 코드량은 많으나 에러 발생률이 mobx에 비해서 적음
// mobx: 코드량이 줄어드나 에러가 발생했을 때 디버깅이 용이하지않음

// context API vs Redux, mobx: 비동기를 지원하기 쉽냐 어렵냐의 차이
// 서버에서 데이터를 받아오는것은 항상 비동기
// 비동기를 다룰때는 실패에 대비해줘야함 => 요청, 성공, 실패
// context API 에서는 이러한 요청, 성공, 실패를 직접 다 구현해줘야 함