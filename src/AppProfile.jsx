import logo from './logo.svg';
import './App.css';
import WeatherProfile from './components/weatherProfile';
import SwiperCont from './components/swiperCont';

function AppProfile() {
    // const [Weather, setWeather] = useState([]);
    // **useState = 함수형 컴포넌트에서 상태값을 관리하는 것

    // const [city, setCity] = useState('');
    // const [weather, setWeather] = useState('');

    return (
        <>
            <header>
                {/* ios처럼 꾸미자 로고, 날짜+시간, 메뉴버튼 */}
            </header>

            <div className='container'>
                <SwiperCont />
            </div>
            
            {/* 
                사용하는 곳(AppProfile)에서 컴퍼넌트에 속성으로 키 명시
                WeatherProfile은 틀만 제공하는 것으로 이해하자
                (if)_isNew가 필요한 컴퍼넌트에만 속성과 값을 넣는다.
                ex) isNew={true}
            */}
        </>
    );
}

export default AppProfile;
