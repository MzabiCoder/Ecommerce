





let final = []
let temp = []
const func2 = (tab) => {



    for (let i = 0; i < tab.length; i++) {
        if (tab[i + 1] - tab[i] != 1) {
            temp.push(tab[i])
            tab.slice(0 - i)
        } else {
            // console.log(tab.slice(i))
            final.push(...temp)
            func2(tab.slice(i - 1))

        }

    }
    console.log(final)
}

func2([1, 2, 4, 5])


//console.log([1, 2, 3, 4, 6, 7].slice(3))