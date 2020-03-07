const speak = message => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = message;
  msg.volume = 1;
  msg.voice = speechSynthesis
    .getVoices()
    .filter(voice => voice.name === "Thomas")[0];
  speechSynthesis.speak(msg);
};

const formatIntervalToSpeechText = interval => {
  const { hours, minutes, seconds } = interval.duration;

  if (hours > 0) {
    if (seconds !== 0) {
      return `${interval.description} pendant ${hours} heures ${minutes} minutes et ${seconds} secondes`;
    }
    return `${interval.description} pendant ${hours} heures et ${minutes} minutes`;
  }

  return `${interval.description} pendant ${minutes} minutes`;
};

export { speak, formatIntervalToSpeechText };
