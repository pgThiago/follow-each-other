async function handleCheck(){

    let oneFollowTwo = false;
    let twoFollowOne = false;

    let resultText = document.querySelector('#resu');
    let userOne = document.querySelector('.input-one');
    let userTwo = document.querySelector('.input-two'); 

    let userOneValue = userOne.value.toLowerCase();
    let userTwoValue = userTwo.value.toLowerCase();

    setTimeout(() => {
        userOne.value = '';
        userTwo.value = '';
    }, 5000);

    resultText.innerHTML = '';

    const OneResponse = await fetch(`https://api.github.com/users/${userOneValue}/following`);
    const OneResponseJson = await OneResponse.json();

    const TwoResponse = await fetch(`https://api.github.com/users/${userTwoValue}/following`);
    const TwoResponseJson = await TwoResponse.json();
    
    if(OneResponse.status === 200 && TwoResponse.status === 200){
        for (followedByUserOne of OneResponseJson){
            if(followedByUserOne.login.toLowerCase() === userTwoValue)
                oneFollowTwo = true;
        }
        
        for (followedByUserTwo of TwoResponseJson){
            if(followedByUserTwo.login.toLowerCase() === userOneValue)
                twoFollowOne = true;
        }

    
        if(oneFollowTwo && twoFollowOne)
            resultText.innerHTML = 'They follow each other!';
        
        else if(!oneFollowTwo && twoFollowOne)
            resultText.innerHTML = `Only ${userTwoValue} follows ${userOneValue}!`;
       
        else if(oneFollowTwo && !twoFollowOne)
            resultText.innerHTML = `Only ${userOneValue} follows ${userTwoValue}!`;
        
        else
            resultText.innerHTML = 'They do not follow each other!';  
            
    }

    else if(OneResponse.status !== 200 && TwoResponse.status === 200)
        resultText.innerHTML = `${userOneValue} is not a Developer!`;
    
    else if(OneResponse.status === 200 && TwoResponse.status !== 200)
        resultText.innerHTML = `${userTwoValue} is not a Developer!`;
    
    else
        resultText.innerHTML = `Sorry, try again!`;

}
