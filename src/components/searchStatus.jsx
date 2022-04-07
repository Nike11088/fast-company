import React from 'react'

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const personCount = number

    if (number > 99) {
      number = String(number)
      number = number.slice(number.length - 2)
      number = Number(number)
    }

    if (15 <= number && number <= 99) {
      number = String(number)
      number = number.slice(number.length - 1)
      number = Number(number)
    }

    let word = 'человек'
    if (2 <= number && number <= 4) {
      word = 'человека'
    } else if (number === 0 || number === 1 || (11 <= number && number <= 14)) {
      word = 'человек'
    }
    return personCount > 0 ? (
      <h1>
        <span className="h1 badge bg-primary ">
          {personCount} {word} тусанет с тобой сегодня
        </span>
      </h1>
    ) : (
      <h1>
        <span className="h1 badge bg-danger ">Никто с тобой не тусанет</span>
      </h1>
    )

    // const test = () => {
    //   for (let i = 0; i < 300; i++) {
    //     const phrase = renderPhrase(i)
    //     console.log(i + ' ' + phrase)
    //   }
    // }

    // const lastOne = Number(number.toString().slice(-1))
    // if ((number > 4) & (number < 15)) return 'Человек тусанет'
    // if ([2, 3, 4].indexOf(lastOne) >= 0) return 'Человека тусанут'
    // if (lastOne === 1) return 'Человек тусанет'
    // return 'Человек тусанет'
  }

  return renderPhrase(length)
}

export default SearchStatus
