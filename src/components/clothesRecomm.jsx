export default function ClothesRecomm({temp}) {
    let message = '';

    if(temp >= 28) {
        message = '민소매, 반팔, 크롭, 반바지, 치마, 맨다리';
    } else if(temp >= 24 && temp <= 27) {
        message = '반팔, 얇은셔츠, 얇은 긴팔, 반바지, 맨다리';
    } else if(temp >= 20 && temp <= 23) {
        message = '얇은 니트, 가디건, 긴팔티, 후드티, 면바지, 슬랙스, 스키니';
    } else if(temp >= 17 && temp <= 19) {
        message = '니트, 가디건, 후드티, 맨투맨, 청바지, 면바지, 슬랙스, 원피스';
    } else if(temp >= 11 && temp <= 16) {
        message = '자켓, 셔츠, 가디건, 간절기 야상';
    } else if(temp >= 6 && temp <= 10) {
        message = '트렌치코트, 간절기 야상, 레이어드';
    } else if(temp >= 0 && temp <= 5) {
        message = '코트, 가죽자켓, 패딩, 니트, 레깅스';
    } else {
        message = '두꺼운 코트, 패딩, 목도리, 기모제품';
    }

    return (
        <div className='clothes-recomm'>
            <h4>Clothes recommendation.</h4>
            <p>: {message}</p>
        </div>
    )
}