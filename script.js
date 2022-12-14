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
        // renderScreeen(false);
    } else {
        // renderScreeen(true);
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
            dom.rooms.style.display = 'grid';
        } else {
            dom.rooms.style.display = 'none';
        }
    }, 300);
}
