export default function ClothesRecomm({temp}) {
    let message = '';

    if(temp <= -10) {
        message = '패딩, 두꺼운 코트, 목도리, 기모제품, 기타 겨울 의류';
    } else if(temp <= 0) {
        message = '두꺼운 코트, 히트텍, 기모제품, 기타 겨울 의류';
    } else if(temp <= 9) {
        message = '히트텍, 가죽자켓, 트렌치코트, 기모제품, 기타 겨울 의류';
    } else if(temp <= 19) {
        message = '가디건, 자켓, 야상, 맨투맨, 가벼운 니트';
    } else if(temp <= 25) {
        message = '얇은 가디건, 긴팔티, 면바지, 반바지, 청바지';
    } else {
        message = '반팔티, 반바지, 원피스, 린넨 소재 의류';
    }

    return (
        <div className='clothes-recomm'>
            <h4>Clothes recommendation.</h4>
            <p>: {message}</p>
        </div>
    )
}