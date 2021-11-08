export async function playAudio(audioRef, setIsPlaying) {
  try {
    setIsPlaying(true);
    await audioRef.current.play();
    audioRef.current.play();
  } catch (err) {
    console.error("From util function" + err);
  }
}
