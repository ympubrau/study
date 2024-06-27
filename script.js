const loader = document.getElementsByClassName('loader')[0]
const mainBody = document.getElementsByClassName('main')[0]
const url = location.search.split('?')[1].split('=')[1]
console.log(location)
if ([1,2,3,4,5,6].includes(Number(url))) {
    loader.hidden = false
    mainBody.hidden = true
    getDataFromServer()
} else{
    alert('такое блюдо не найдено, посмотрите на тиффани')
}


function galleryFunction1(smallImg) {
    let fullImg = document.getElementById('imageBox1');
    fullImg.src = smallImg.src;
}

function getDataFromServer() {
    let path = `https://script.google.com/macros/s/AKfycbyqn4RMOn4K94DLqKHlgsfiM6ufOi8EiSgU3alDVEn92kseHDqrQ8KU5FPkfHumrB5jVQ/exec?id=${url}`
    fetch(path, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(result => completeLoading(result))
}

function changeUrl(id) {
    
}

function completeLoading(res) {
    if(res.data) {
        let data = res.data
        console.log(res)
        document.getElementById('mainName').innerText = data.name
        document.getElementById('imageBox1').src = data.url
        document.getElementById('mainDesc').innerText = data.description
        document.getElementById('cals').innerText = `Калории: ${data.cals}`
        document.getElementById('otherCals').innerText = `БЖУ: ${data.protein} / ${data.fat} / ${data.carb}`
        document.getElementById('price').innerText = `₽ ${data.price}`
        document.getElementById('Buy').innerText = `Купить`


        if(data.recommended.length > 0) {
            let items = document.getElementsByClassName('items')[0]
            items.innerHTML = ''
            document.getElementById('Rec').innerText = `Вам также может понравится`

            for (const iterator of data.recommended) {
                items.innerHTML += 
                `
                <div class="item" id='item_${iterator.id}'>
                    <img src=${iterator.url} width="250px" height="250px">
                    <div class="textItem">
                        <p class="recText">${iterator.name}</p>
                        <p>₽${iterator.price}</p>
                    </div>
                </div>
                `
            }

            for (const iterator of document.getElementsByClassName('item')) {
                iterator.addEventListener('click', () => {
                    console.log(iterator.id)
                    let tmp = document.location.href.split('=')[0];
                    window.location.replace(tmp + '=' + iterator.id.split('_')[1]);
                })
            }
        }
        
        console.log(data.cals)


    }
    loader.hidden = true
    mainBody.hidden = false
    }