function formatDuration(duration) {
  const { hours, minutes, seconds } = duration;

  if (seconds !== 0) {
    return `${hours}h ${addZeroIfNeeded(minutes)}m ${addZeroIfNeeded(
      seconds
    )}s`;
  }

  return `${hours}h${addZeroIfNeeded(minutes)}`;
}

function addZeroIfNeeded(timeUnit) {
  return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
}

export { formatDuration };
