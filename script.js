// window.addEventListener('click', e => {
//     const target = e.target;
//     console.log(target);
// });

const dom = {
    selectBox: document.querySelector('.selectBox'),
    rooms: document.querySelector('.rooms'),
    eachRoom: document.querySelectorAll('.room'),
    selectboxItem: document.querySelectorAll('.selectbox__item'),
    mainElem: document.body,
    selectBoxList: document.querySelector('.selectBox__list'),
    screenContent: document.querySelector('.screen__content'),
};

const settingsElem = {
    settingsBlock: document.getElementById('settings'),
    settingsTabsBlock: document.getElementById('settings-tabs'),
    settingsPanelBlock: document.getElementById('settings-panel'),
    temperatureLine: document.getElementById('temperature-line'),
    temperatureCircle: document.getElementById('temperature-round'),
};

const roomsList = {
    all: 'Комнаты',
    livingroom: 'Зал',
    bedroom: 'Спальная',
    kitchen: 'Кухня',
    bathroom: 'Ванная',
    studio: 'Кабинет',
    washingroom: 'Уборная',
};

dom.selectBox.querySelector('.selectBox__selected').addEventListener('click', e => {
    const target = e.target;
    dom.selectBox.classList.toggle('open');
});

dom.mainElem.addEventListener('click', e => {
    const target = e.target;
    try {
        if (
            !target.matches('.selectBox') &&
            !target.parentElement.matches('.selectBox') &&
            !target.parentElement.parentElement.matches('.selectBox')
        ) {
            dom.selectBox.classList.remove('open');
        }
    } catch (error) {
        error.log;
    }
});

dom.selectBoxList.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.selectbox__item')) {
        const room = target.dataset.room;
        const activeItem = document.querySelector('.selected');
        try {
            activeItem.classList.remove('selected');
        } catch (error) {
            console.log(error.log);
        }
        target.classList.add('selected');
        dom.selectBox.classList.remove('open');
        selectOfRoom(room);
    }
});

function selectOfRoom(room) {
    const selectedRoom = dom.rooms.querySelector('.selected');
    const selectedItemOfSelectBoxList = dom.selectBox.querySelector('.selectbox__item.selected');
    if (selectedRoom) {
        selectedRoom.classList.remove('selected');
        try {
            selectedItemOfSelectBoxList.classList.remove('selected');
        } catch (error) {
            error.log;
        }
    }
    if (room !== 'all') {
        const newSelectedRoom = dom.rooms.querySelector(`[data-room=${room}]`);
        newSelectedRoom.classList.add('selected');
        renderScreeen(false);
    } else {
        renderScreeen(true);
    }

    const newSelectedListItem = dom.selectBox.querySelector(`[data-room=${room}]`);
    try {
        dom.selectBox.querySelector('.selected').classList.remove('selected');
    } catch (error) {
        error.log;
    }
    try {
        newSelectedListItem.classList.add('selected');
    } catch (error) {
        error.log;
    }
    // console.log(newSelectedListItem);

    const selectBoxSelectedText = dom.selectBox.querySelector('.selectBox__selected span');
    selectBoxSelectedText.innerText = roomsList[room];
}

//Клик по определенной комнате
dom.eachRoom.forEach(room => {
    room.addEventListener('click', e => {
        const value = room.dataset.room;
        selectOfRoom(value);
    });
});

//Отображение нужного экрана
function renderScreeen(isRooms) {
    setTimeout(() => {
        if (isRooms) {
            settingsElem.settingsBlock.style.display = 'none';
            settingsElem.settingsBlock.style.zIndex = '';
            dom.rooms.style.display = 'grid';
        } else {
            settingsElem.settingsBlock.style.display = 'block';
            settingsElem.settingsBlock.style.zIndex = '2';
            dom.rooms.style.display = 'none';
        }
    }, 300);
}

//панель настроек комнаты

const setData = {
    all: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    livingroom: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    bedroom: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    kitchen: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    bathroom: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    studio: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
    washingroom: {
        temperature: 0,
        lights: 0,
        humidity: 0,
    },
};

//установка температуры

function renderTemperature(temperature) {
    const min = 15;
    const max = 30;
    const range = max - min;
    const percent = range / 100;
    const lineMin = 60;
    const lineMax = 271;
    const lineRange = lineMax - lineMin;
    const linePercent = lineRange / 100;
    const circleMin = -237;
    const circleMax = 47;
    const circleRange = circleMax - circleMin;
    const circlePercent = circleRange / 100;

    // console.log(percent, linePercent, circlePercent);

    if (temperature >= min && temperature <= max) {
        let finishPercent = Math.round((temperature - min) / percent);
        let lineFinishpercent = lineMin + linePercent * finishPercent;
        let circleFinishpercent = circleMin + circlePercent * finishPercent;
        console.log(lineFinishpercent, circleFinishpercent);
        settingsElem.temperatureLine.style.strokeDasharray = `${lineFinishpercent} 300`;
        settingsElem.temperatureCircle.style.transform = `rotate(${circleFinishpercent}deg)`;
    }
    // console.log(temperature >= min);
    // console.log(temperature <= max);
}

renderTemperature(30);
