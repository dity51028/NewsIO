let url='https://api.worldnewsapi.com/search-news?text="sport"&api-key=a69ebcfa77c4429289599a21b96fecb9';


function scrapData(response){
    return new Promise((resolve,reject)=>{
        if(!response.ok){
            reject(new Error('Network problem'));
        }else{
            response.json().then(data=>{
                resolve(scrapJSON(data));
            }).then(error=>{
                reject(new Error('Invalid JSON format'));
            });
        }
    });
}
function scrapJSON(data){
    const dataArray=data.news;
    const length=dataArray.length;
    const responseArray=[];
    for(let i=0;i<length;i++){
        const news=dataArray[i];
        const obj={
            'title':news.title,
            'text':news.text,
            'image':news.image,
            'date':news.publish_date
        };
        responseArray.push(obj);
    }
    return responseArray;
}

function showData(data){
    const length=data.length;
    const container=document.getElementById('container');
    for(let i=0;i<length;i++){
        const title=data[i].title;
        //const text=data[i].text;
        const image=data[i].image;
        const date=data[i].date;
        const card=document.createElement('div');
        card.classList.add('card');
        const h2=document.createElement('h2');
        //const h3=document.createElement('h3');
        const p=document.createElement('p');
        const img=document.createElement('img');

        img.src=data[i].image;
        img.alt="Image";
        h2.textContent=title;
        //h3.textContent=text;
        p.textContent=date;
        card.appendChild(img);
        card.appendChild(h2);
        //card.appendChild(h3);
        card.appendChild(p);
        container.appendChild(card);
    }
}

fetch(url).
    then(response=>{
        return scrapData(response);
    }).then(data=>{
        showData(data);
    }).then(error=>{

    });

