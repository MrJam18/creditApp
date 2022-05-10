const initState = [
    {
        name: 'Сергей',
        surname: 'Михайлов',
        patronymic: 'Михайлович',
        gender: 'Мужской',
        birthDate: '1994-12-05',
        birthPlace: 'Ижевск',
        passportSeries: '94 14',
        passportNumber: '412126',
        passportIssuedBy: 'Устиновским РОВД г. Ижевска',
        passportIssuedDate: '2015-04-24',
        govUnitCode: '644-005',
        adress: 'Удмуртская республика, г. Ижевск, ул. Связного, д. 123',
        id: 1
    },
   {
        name: 'Сергей',
        surname: 'Николаев',
        patronymic: 'Петрович',
        gender: 'Мужской',
        birthDate: '1994-12-05',
        birthPlace: 'Ижевск',
        passportSeries: '94 14',
        passportNumber: '412126',
        passportIssuedBy: 'Устиновским РОВД г. Ижевска',
        passportIssuedDate: '2015-04-24',
        govUnitCode: '644-005',
        adress: 'Удмуртская республика, г. Ижевск, ул. Связного, д. 123',
        id: 2
    },
   {
        name: 'Сергей',
        surname: 'Иванов',
        patronymic: 'Михайлович',
        gender: 'Мужской',
        birthDate: '1994-12-05',
        birthPlace: 'Ижевск',
        passportSeries: '94 14',
        passportNumber: '412126',
        passportIssuedBy: 'Устиновским РОВД г. Ижевска',
        passportIssuedDate: '2015-04-24',
        govUnitCode: '644-005',
        adress: 'Удмуртская республика, г. Ижевск, ул. Связного, д. 123',
        id: 3
    }
]



export const debtorsReducer = (state = initState, action) => {
    switch(action.type) {
        case 'PEOPLES::CHANGE':
            return action.payload;
        default:
            return state;
    }
}