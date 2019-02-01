export const playSound = (context, {
  freq = 400,
  type = 'sine',
  release = 1,
} = {}) => {

  console.log(typeof(release))

  // oscillator
  let o = context.createOscillator()
  o.type = type
  o.frequency.value = freq

  // gain
  var g = context.createGain()
  o.connect(g)
  g.connect(context.destination)

  // start the sound at time 0
  o.start(0)

  // ramp down the sound over some amount of time
  g.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + release
  )
}