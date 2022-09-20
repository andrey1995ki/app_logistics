export const applications = [
    {
        id: 1,
        applicationsDate: '2022-09-20',
        title: 'Заявка 1',
        description: 'отвезти что-то там куда-то там',
        routing: [
            {
                point: [55.7198, 37.6762],
                address: "Тестовый аддрес Начало",
                description: "Тестовый аддрес начальная точка",
            },
            {
                point: [55.7198, 38.6762],
                address: "Тестовый аддрес ",
                description: "Тестовый аддрес Промежуточная точка",
            },
            {
                point: [55.7198, 38.5762],
                address: "Тестовый аддрес Конец",
                description: "Тестовый аддрес Конечная точка",
            },
        ]
    },
    {
        id: 2,
        applicationsDate: '2022-09-19',
        title: 'Заявка 2',
        description: 'отвезти опять туда что и завтра',
        routing: [
            {
                point: [55.7198, 36.6762],
                address: "Тестовый аддрес Начало",
                description: "Тестовый аддрес начальная точка",
            },
            {
                point: [55.7198, 37.8862],
                address: "Тестовый аддрес ",
                description: "Тестовый аддрес Промежуточная точка",
            },
            {
                point: [55.7198, 37.5762],
                address: "Тестовый аддрес Конец",
                description: "Тестовый аддрес Конечная точка",
            },
        ]
    }
]
export const currentApplication = {
    currentId: 1,
    currentRouting: [
        {
            point: [55.7198, 37.6762],
            address: "Тестовый аддрес Начало",
            description: "Тестовый аддрес начальная точка",
        },
        {
            point: [55.7198, 38.6762],
            address: "Тестовый аддрес ",
            description: "Тестовый аддрес Промежуточная точка",
        },
        {
            point: [55.7198, 38.5762],
            address: "Тестовый аддрес Конец",
            description: "Тестовый аддрес Конечная точка",
        },
    ]
}