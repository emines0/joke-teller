const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled; //setting buttn disabled to oposit as it is
}

// Passing Joke to VoiceRSS API
  function tellMe(joke) {
    VoiceRSS.speech({
        key: '9d21cde2545e4d3694feae339164c090',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {

      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if(data.setup){
        joke = `${data.setup} ... ${data.delivery}`;
      }else {
        joke = data.joke;
      }

    // Text-to-spech
    tellMe(joke);
    
    // DisableButton
    toggleButton();

    } catch (err) {

      console.log('fetch failed', err);

    }
  }

//  EventListeners
  button.addEventListener('click', () => getJokes());
  audio.addEventListener('ended', toggleButton); //when audo playing finished then runn toogleButton function
