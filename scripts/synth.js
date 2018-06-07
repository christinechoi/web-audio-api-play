var keyboard = new QwertyHancock({
     id: 'keyboard',
     width: 600,
     height: 150,
     octaves: 2
});


let context = new AudioContext();
let masterVolume = context.createGain();

masterVolume.gain.value = 0.2;
masterVolume.connect(context.destination);



let oscillators = {};

keyboard.keyDown = function(note, freq) {
  let osc = context.createOscillator(),
      osc2 = context.createOscillator();

  osc.frequency.value = freq;
  osc.type = 'triangle';

  osc2.frequency.value = freq;
  osc2.type = 'sine';
  
  osc.detune.value = -10;
  osc2.detune.value = 10;

  osc.connect(masterVolume);
  osc2.connect(masterVolume);

  masterVolume.connect(context.destination);

  oscillators[freq] = [osc, osc2];

  osc.start(context.currentTime);
  osc2.start(context.currentTime);
  
};

keyboard.keyUp = function(note, freq) {
  oscillators[freq].forEach(function (oscillator) {
        oscillator.stop(context.currentTime);
    });
};

