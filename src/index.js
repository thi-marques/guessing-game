const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const MIN = 1
const MAX = 100

const secretNumber = Math.floor(Math.random() * MAX) + MIN

const askNumber = () =>
  new Promise(resolve => readline.question('Guess a number (type "q" to quit ): ', resolve))

function validateNumber(typedValue) {
  const typedNumber = +typedValue
  if (isNaN(typedNumber))
    return ['q', 'quit', 'exit'].includes(typedValue)
      ? ['Bye', true]
      : ['Please, inform a number', false]

  if (typedNumber < 1 || typedNumber > 100)
    return [`Please, inform a number between ${MIN} and ${MAX}`, false]

  if (typedNumber === secretNumber) return ['You win', true]

  return [typedNumber < secretNumber ? 'Too small' : 'Too big', false]
}

async function startGame() {
  while (true) {
    try {
      const typedValue = await askNumber()
      const [validation, quit] = validateNumber(typedValue)

      console.log(validation)
      if (quit) {
        readline.close()
        break
      }
    } catch (error) {
      console.error(error)
    }
  }
}

startGame()
