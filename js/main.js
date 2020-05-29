function minesweeper() {
    let input = document.createElement('input');
    input.innerHTML = '';
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'howfields');
    input.setAttribute('placeholder', 'How many fields 6-20');
    document.body.append(input);
    let button = document.createElement('button');
    button.innerHTML = "Go";
    button.setAttribute('id', 'go');
    document.body.append(button);
    go.addEventListener('click', start);
    let gameOver = false;
    function start() {
        if (howfields.value < 6 || howfields.value > 20) {
            console.log('You are wrong');
        } else {
            let color = [];
            let flags = 0;
            let clicks = 0;
            let restartt = false;
            let fields = howfields.value;
            howfields.remove();
            go.remove();
            let table = document.createElement('table');
            table.innerHTML = '';
            document.body.append(table);
            let tr = [];
            let td = [];
            let whayForTr = document.body.querySelector('table');
            for (let i = 0; i < fields; i++) {
                tr[i] = document.createElement('tr');
                tr[i].innerHTML = '';
                whayForTr.append(tr[i]);
                tr[i].setAttribute('id', i);
                let whayForTd = whayForTr.querySelector('table > tr:last-child')
                for (let y = 0; y < fields; y++) {
                    color[i * y + y] = false;
                    td[y] = document.createElement('td');
                    whayForTd.append(td[y]);
                    td[y].classList.add(`${y}td`);
                }
            }
            let tds = [...document.body.querySelectorAll('table > tr > td')];
            let min = Math.round(tds.length / 6);
            let minns = new Set()
            for (let j = 0; j < min; j++) {
                let number = Math.round(Math.random() * (tds.length - 1));
                tds[number].classList.add('mina');
                minns.add(tds[number])
            }
            let howMany = document.createElement('p');
            howMany.innerHTML = 'mins: ' + minns.size;
            document.body.prepend(howMany);
            let whay = document.body.querySelector('p')
            let howManyFlags = document.createElement('p');
            howManyFlags.innerHTML = 'flags: ' + '0';
            whay.after(howManyFlags);
            howMany.style.display = 'inline-block';
            howManyFlags.style.display = 'inline-block';
            howManyFlags.style.marginLeft = '15px';
            whay = document.body.querySelector('p:last-child')
            table.addEventListener('click', (event) => {
                let right = [];
                let target = event.target;
                if (target.tagName !== 'TD') return;
                clicks++;
                if (clicks > 0 && restartt === false) {
                    restartt = true;
                    let restartButton = document.createElement('button');
                    restartButton.innerHTML = 'restart';
                    table.before(restartButton);
                    restartButton.style.marginLeft = '20px';
                    restartButton.addEventListener('click', restart);
                    function restart() {
                        table.remove();
                        howMany.remove();
                        howManyFlags.remove();
                        restartButton.remove();
                        minesweeper();
                    }
                }
                if (target.classList.contains('mina')) {
                    alert('Ви програли');
                    gameOver = true;
                }
                for (let r = 0; r < tds.length; r++) {
                    debugger
                    if (tds[r].classList.contains('mina') || tds[r].classList.contains('cheked')) {
                        right.push(1);
                    }
                }
                if (right.length == tds.length - 1) {
                    alert('Ви виграли!!!');
                    gameOver = true;
                }
                if (gameOver == true) {
                    for (let l = 0; l < tds.length; l++) {
                        if (tds[l].classList.contains('mina')) {
                            tds[l].classList.add('minna');
                        }
                    }
                    setTimeout(() => {
                    howMany.remove()
                    table.remove()
                    howManyFlags.remove();
                    let restartButton = document.body.querySelector('button');
                    restartButton.remove();
                    }, 3000);
                }
                numberTd(target);
                right = []
            });
            function numberTd(target) {
                if (target.innerHTML !== '' || target.classList.contains('mina')) {
                    return
                } else {
                    target.classList.add('cheked')
                    let number = 0;
                    let nomer = 0;
                    let nommer = 0;
                    let nommmer = 0;
                    for (let g = 0; g < tds.length; g++) {
                        if (tds[g] == target) {
                            nomer = g;
                            nommer = Math.floor(nomer / fields);
                            nommmer = nomer - nommer * fields;
                            break;
                        }
                    }
                    let nom = []
                    if (nommer < fields - 1) {
                        let nomm1 = [...tr[nommer + 1].querySelectorAll('td')]
                        nom[1] = nomm1[nommmer]
                        nom[4] = nomm1[nommmer + 1]
                        nom[5] = nomm1[nommmer - 1]
                    }
                    let nomm2 = [...tr[nommer].querySelectorAll('td')]
                    nom[2] = nomm2[nommmer + 1]
                    let nomm3 = [...tr[nommer].querySelectorAll('td')]
                    nom[3] = nomm3[nommmer - 1]
                    if (nomer >= fields) {
                        let nomm0 = [...tr[nommer - 1].querySelectorAll('td')];
                        nom[0] = nomm0[nommmer]
                        let nomm6 = [...tr[nommer - 1].querySelectorAll('td')]
                        nom[6] = nomm6[nommmer + 1]
                        nom[7] = nomm6[nommmer - 1]
                        if (nom[0].classList.contains('mina')) {
                            number++;
                        }
                    }
                    if (nom[1] !== undefined && nom[1].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[2] !== undefined && nom[2].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[3] !== undefined && nom[3].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[4] !== undefined && nom[4].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[5] !== undefined && nomer < tds.length - +fields + 1 && nom[5].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[6] !== undefined && nom[6].classList.contains('mina')) {
                        number++;
                    }
                    if (nom[7] !== undefined && nomer > fields && nom[7].classList.contains('mina')) {
                        number++;
                    }
                    if (number == 0) {
                        number = ' '
                    }
                    target.innerHTML = number;
                    if (target.innerHTML == 0) {
                        for (let p = 0; p < 4; p++) {
                            if (nom[p] !== undefined) {
                                numberTd(nom[p]);
                            }
                        }
                    }
                }
            }
            table.oncontextmenu = (event) => {event.preventDefault()}
            window.addEventListener('contextmenu', (event) => {
                let targeet = event.target;
                if (targeet.tagName !== 'TD') return;
                let nomer = 0;
                for (let g = 0; g < tds.length; g++) {
                    if (tds[g] == targeet) {
                        nomer = g;
                        break;
                    }
                }
                if (color[nomer] == false) {
                    color[nomer] = true;
                    targeet.classList.add('right');
                    flags++
                    howManyFlags.innerHTML = 'flags ' + flags;
                } else {
                    color[nomer] = false;
                    targeet.classList.remove('right');
                    flags--
                    howManyFlags.innerHTML = 'flags ' + flags;
                }
            })
        }
    }
}
minesweeper();