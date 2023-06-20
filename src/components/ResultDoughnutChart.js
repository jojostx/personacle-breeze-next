import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut, Pie } from 'react-chartjs-2'
import { average, formatRgb } from 'culori'


ChartJS.register(ArcElement, Tooltip)

const result = {
    temperaments: [
        {
            title: 'melancholy',
            score: 0.5,
        },
        {
            title: 'phelgmatic',
            score: 0.3,
        },
        {
            title: 'choleric',
            score: 0.45,
        },
        {
            title: 'sanguine',
            score: 0.45,
        },
    ],
    personality_traits: [
        {
            title: 'openness to experience',
            score: 0.375,
        },
        {
            title: 'conscentiousnes',
            score: 0.525,
        },
        {
            title: 'extraversion',
            score: 0.45,
        },
        {
            title: 'agreeableness',
            score: 0.425,
        },
        {
            title: 'neuroticism',
            score: 0.65,
        },
    ],
}

const colors = {
    red: 'rgba(255, 0, 0, 1)',
    green: 'rgba(8, 198, 49, 1)',
    blue: 'rgba(0, 80, 255, 1)',
    yellow: 'rgba(244, 237, 0, 1)',
}

const temperamentColors = {
    sanguine: 'yellow',
    melancholy: 'blue',
    phelgmatic: 'green',
    choleric: 'red',
}

const personalityTraitSymbols = {
    'openness to experience': '💡',
    conscentiousnes: '⚙️',
    extraversion: '💬',
    agreeableness: '🤝',
    neuroticism: '⛈️',
}

Object.values(personalityTraitSymbols)

const getSecondaryTemperamentColors = () => {
    return result.temperaments
        .filter(el => el.title != getPrimaryTemperament().title)
        .map(el => formatRgb(colors[temperamentColors[el.title]]))
}

const getPersonalityTraitScores = () => {
    return result.personality_traits
        .sort((a, b) => a.score - b.score)
        .map(el => el.score * 100)
}

const getSecondaryTemperamentScores = () => {
    return result.temperaments
        .filter(el => el.title != getPrimaryTemperament().title)
        .sort((a, b) => a.score - b.score)
        .map(el => el.score * 100)
}

const getPrimaryTemperament = () => {
    let max_score = 0
    let primary = {}

    result.temperaments.forEach(el => {
        if (el.score > max_score) {
            primary = el
            max_score = el.score
        }
    })

    return primary
}

const getSecondaryTemperament = () => {
    let max_score = 0
    let secondary = {}

    result.temperaments
        .filter(el => el.title != getPrimaryTemperament().title)
        .forEach(el => {
            if (el.score > max_score) {
                secondary = el
                max_score = el.score
            }
        })

    return secondary
}

const primaryTemperamentColor =
    colors[temperamentColors[getPrimaryTemperament().title]]
const secondaryTemperamentColor =
    colors[temperamentColors[getSecondaryTemperament().title]]

const outerData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
        {
            label: '# of Votes',
            data: getPersonalityTraitScores(),
            backgroundColor: [
                formatRgb(
                    average([
                        secondaryTemperamentColor,
                        primaryTemperamentColor,
                    ]),
                ),
                formatRgb(
                    average([
                        secondaryTemperamentColor,
                        primaryTemperamentColor,
                    ]),
                ),
                formatRgb(
                    average([
                        secondaryTemperamentColor,
                        primaryTemperamentColor,
                    ]),
                ),
                formatRgb(
                    average([
                        secondaryTemperamentColor,
                        primaryTemperamentColor,
                    ]),
                ),
                formatRgb(
                    average([
                        secondaryTemperamentColor,
                        primaryTemperamentColor,
                    ]),
                ),
            ],
            borderWidth: 1,
            radius: '100%',
            datalabels: {
                anchor: 'center',
                clamp: true,
                borderWidth: 0,
            },
        },
    ],
}

const innerData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
        {
            label: '# of Votes',
            data: getSecondaryTemperamentScores(),
            backgroundColor: getSecondaryTemperamentColors(),
            borderWidth: 1,
            radius: '60%',
        },
    ],
}

const innermostData = {
    labels: ['Red'],
    datasets: [
        {
            label: 'primary',
            data: [100],
            backgroundColor: [formatRgb(primaryTemperamentColor)],
            borderWidth: 1,
            radius: '40%',
        },
    ],
}

const sliceThickeness = {
    id: 'sliceThickeness',
    beforeDraw: function (chart) {
        const datasetMeta = chart.getDatasetMeta(0)
        const innerRadius = datasetMeta.controller.innerRadius
        const outerRadius = datasetMeta.controller.outerRadius
        const heightOfItem = outerRadius - innerRadius
        const countOfData = chart.getDatasetMeta(0).data.length
        const additionalRadius = Math.floor(heightOfItem / countOfData)

        const weightsMap = datasetMeta.data
            .map(v => v.circumference)
            .sort((a, b) => a - b)
            .reduce((a, c, ci) => {
                a.set(c, ci + 1)
                return a
            }, new Map())

        datasetMeta.data.forEach(dataItem => {
            const weight = weightsMap.get(dataItem.circumference)
            dataItem.outerRadius = innerRadius + additionalRadius * weight
        })
    },
}

export default function ResultDoughnutChart() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-xl space-y-4">
            <h2>Personality Result</h2>
            <div className="relative w-full h-full">
                <div className="absolute inset-0">
                    <Doughnut options={{ cutout: '60%' }} data={innerData} />
                </div>
                <div className="absolute inset-0">
                    <Pie data={innermostData} />
                </div>
                <div className="relative">
                    <Doughnut
                        options={{
                            cutout: '60%',
                            plugins: {
                                // Change options for ALL labels of THIS CHART
                                datalabels: {
                                    backgroundColor: 'white',
                                    borderRadius: 25,
                                    color: 'black',
                                    font: { weight: 'bold' },
                                    padding: 6,
                                    formatter: function (value, context) {
                                        let i = context.dataIndex

                                        // return Math.round(value)
                                        return (
                                            Object.values(
                                                personalityTraitSymbols,
                                            )[i] +
                                            ' ' +
                                            Math.round(value)
                                        )
                                    },
                                },
                            },
                        }}
                        plugins={[sliceThickeness, ChartDataLabels]}
                        data={outerData}
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-1 text-sm font-medium capitalize bg-white rounded-md md:p-2 md:text-base md:font-semibold">
                        <p>{getPrimaryTemperament().title}</p>
                        <p>{getPrimaryTemperament().score * 100}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
