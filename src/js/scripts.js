// API: https://docs.github.com/en/rest/reference/users#check-if-a-user-follows-another-user

async function handleCheck() {
	let resultText = document.querySelector('#resu')
	let userOne = document.querySelector('.input-one')
	let userTwo = document.querySelector('.input-two')

	let userOneValue = userOne.value.toLowerCase()
	let userTwoValue = userTwo.value.toLowerCase()

	setTimeout(() => {
		userOne.value = ''
		userTwo.value = ''
	}, 5000)

	resultText.innerHTML = 'Loading...'

	const userOneExists = await fetch(`https://api.github.com/users/${userOneValue}`)
	const userTwoExists = await fetch(`https://api.github.com/users/${userTwoValue}`)

	if (userOneExists.status !== 200 && userTwoExists.status !== 200) {
		resultText.innerHTML = `They are not Developers!`
		return
	}
	else if (userOneExists.status !== 200) {
		resultText.innerHTML = `${userOneValue} is not a Developer!`
		return
	}
	else if (userTwoExists.status !== 200) {
		resultText.innerHTML = `${userTwoValue} is not a Developer!`
		return
	}

	const OneResponse = await fetch(`https://api.github.com/users/${userOneValue}/following/${userTwoValue}`)
	const TwoResponse = await fetch(`https://api.github.com/users/${userTwoValue}/following/${userOneValue}`)

	if (OneResponse.status === 204 && TwoResponse.status === 204)
		resultText.innerHTML = 'They follow each other!'
	else if (OneResponse.status === 204 && TwoResponse.status === 404)
		resultText.innerHTML = `Only ${userOneValue} follows ${userTwoValue}!`
	else if (OneResponse.status === 404 && TwoResponse.status === 204)
		resultText.innerHTML = `Only ${userTwoValue} follows ${userOneValue}!`
	else
		resultText.innerHTML = 'They do not follow each other!'
}

let userOne = document.querySelector('.input-one')
userOne.addEventListener('keyup', event => {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector('.checkButton').click()
	}
})

let userTwo = document.querySelector('.input-two')
userTwo.addEventListener('keyup', event => {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector('.checkButton').click()
	}
})