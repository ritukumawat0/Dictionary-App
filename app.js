let url="https://api.dictionaryapi.dev/api/v2/entries/en/";

let inp=document.querySelector('input');
let box=document.querySelector('.box-container2')
let btn=document.querySelector('button');
let h3=document.querySelector('.word');
let defi=document.querySelector('#definition');
let exam=document.querySelector('#example');
let sound=document.querySelector('audio')

btn.addEventListener('click',async function(){
    let word=inp.value;
    let dataArr=await getWords(word);
    try{
    box.innerHTML=`<div class="word-box">
            <span onclick="playSound()"><i class="fa-solid fa-volume-high"></i></span>
            <h3 class="word">${dataArr[0].word}</h3>
        </div>

        <div class="empty"></div>

        <div class="dict">
            <h3>Dictionary</h3>
            <p>Definitions from <u>Oxford Languages</u>.</p>
        </div>

        <div class="empty"></div>
        
        <div class="meaning-box">
        
            <div class="word-box">
                <span onclick="playSound()"><i class="fa-solid fa-volume-high"></i></span>
                <h3 class="word">${dataArr[0].word}</h3>
            </div>

            <div class="word-box2">
                <p>${dataArr[0].meanings[0].partOfSpeech}</p>
                <ol>
                    <li>
                        <p id="definition">${dataArr[0].meanings[0].definitions[0].definition}</p>
                        <div class="box">
                            <p id="example">${dataArr[0].meanings[0].definitions[0].example}</p>
                        </div>
                    </li>
                </ol>
           </div>

        </div>`  
         sound.setAttribute('src',`${dataArr[0].phonetics[1].audio}`)
        }
        catch{
            box.innerHTML=`<h4 style="font-size:2rem;"> Couldn't Find The Word </h4>`
        }
})

function playSound(){
    sound.play();
}

async function getWords(word){
    let res=await fetch(`${url} ${word}`);
    let json=await res.json();
    return json;   
}