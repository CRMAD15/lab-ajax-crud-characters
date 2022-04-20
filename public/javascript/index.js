const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(({ data }) => {
        let eachMiniom = ''
        data.forEach(element => {
          eachMiniom += `
          <div class="character-info">
          <div class="name"> ID:  ${element.name}</div>
        <div class="occupation">Name:   ${element.name}</div>
        <div class="cartoon">Is a Cartoon:  ${element.cartoon}</div>
        <div class="weapon">Weapon:   ${element.weapon}</div> </div>`
        });

        document.querySelector('.characters-container').innerHTML = eachMiniom
      })
      .catch(err => console.log(err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    let id = document.querySelector("input[name='character-id']").value
    charactersAPI
      .getOneRegister(id)
      .then(({ data }) => {
        let oneMiniom = ''
        oneMiniom += `
          <div class="character-info">
          <div class="name"> ID:  ${data.name}</div>
        <div class="occupation">Name:   ${data.name}</div>
        <div class="cartoon">Is a Cartoon:  ${data.cartoon}</div>
        <div class="weapon">Weapon:   ${data.weapon}</div> </div>`
        document.querySelector('.characters-container').innerHTML = oneMiniom
      })
      .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    let id = document.querySelector("input[name='character-id-delete']").value
    charactersAPI
      .deleteOneRegister(id)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    let editMiniom = document.querySelectorAll('#edit-character-form input')
    const id = editMiniom[0].value
    const characterValue = {
      name: editMiniom[1].value,
      occupation: editMiniom[2].value,
      weapon: editMiniom[3].value,
      cartoon: editMiniom[4].checked
    }
    charactersAPI
      .updateOneRegister(id, characterValue)
      .then(editMinion => {
        const goodResult = document.querySelectorAll('#send-data')
        goodResult[1].classList.toggle('green')

      })
      .catch(err => {
        const badResult = document.querySelectorAll('#send-data')
        badResult[1].classList.toggle('red')
      })
  });
});

document.getElementById('new-character-form').addEventListener('submit', function (event) {

  event.preventDefault()

  let newMiniom = document.querySelectorAll('#new-character-form input')
  const characterValue = {
    name: newMiniom[0].value,
    occupation: newMiniom[1].value,
    weapon: newMiniom[2].value,
    cartoon: newMiniom[3].checked
  }
  if (characterValue.name.length === 0 || characterValue.occupation.length === 0 || characterValue.weapon.length === 0) {
    const badResult = document.querySelectorAll('#send-data')
    badResult[0].classList.toggle('red')
    return
  }
  charactersAPI
    .createOneRegister(characterValue)
    .then(newMinion => {

      const goodResult = document.querySelectorAll('#send-data')
      goodResult[0].classList.toggle('green')

    })
    .catch(err => console.log(err))
});
