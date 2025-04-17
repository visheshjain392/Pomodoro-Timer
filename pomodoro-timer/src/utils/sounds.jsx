// Placeholder for sound management
// You'll need to add actual sound files in your public/sounds directory
export const playAlarm = () => {
    const sound = new Howl({
      src: ['/sounds/alarm.mp3'],
      volume: 0.5
    });
    sound.play();
  };