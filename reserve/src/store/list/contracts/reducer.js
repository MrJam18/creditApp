const initState = {
    1: {
        number: 156,
        sumIssue: 10000,
        signDate: '2020-07-30',
        dueDate: '2020-08-30',
        percent: 300,
        penaltyPercent: 20,
        payments: [
                {date: '2021-01-05',
                sum: 5000,
                main: 3000,
                percents: 1000,
                penalties: 1000
                },

                {date: '2022-01-05',
                sum: 4000,
                main: 2000,
                percents: 1000,
                penalties: 1000
                }
        ]

    },
    2: {
        number: 432,
        sumIssue: 10000,
        signDate: '2020-07-30',
        dueDate: '2020-08-30',
        percent: 300,
        penaltyPercent: 20,
        payments: [
                {date: '2021-01-05',
                sum: 5000,
                main: 3000,
                percents: 1000,
                penalties: 1000
                },

                {date: '2022-01-05',
                sum: 4000,
                main: 2000,
                percents: 1000,
                penalties: 1000
                }
        ]

    },
    3: {
        number: 321,
        sumIssue: 10000,
        signDate: '2020-07-30',
        dueDate: '2020-08-30',
        percent: 300,
        penaltyPercent: 20,
        payments: [
                {date: '2021-01-05',
                sum: 5000,
                main: 3000,
                percents: 1000,
                penalties: 1000
                },

                {date: '2022-01-05',
                sum: 4000,
                main: 2000,
                percents: 1000,
                penalties: 1000
                }
        ]

    }
}

export const contractsReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CONTRACTS::CHANGE':
            return action.payload
        default:
            return state
    }
}