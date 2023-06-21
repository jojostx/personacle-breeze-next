import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut, Pie } from 'react-chartjs-2'
import { average, formatRgb } from 'culori'
import { useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip)

export default function ResultDoughnutChart({ result }) {
    const [priTemperament, setPriTemperament] = useState()
    const [secTemperament, setSecTemperament] = useState()
    const [priTemperamentColor, setPriTemperamentColor] = useState()
    const [secTemperamentColor, setSecTemperamentColor] = useState()
    const [secTemperamentColors, setSecTemperamentColors] = useState()
    const [personalityTraitScores, setPersonalityTraitScores] = useState()
    const [secTemperamentScores, setSecTemperamentScores] = useState()
    const [personalityTraitData, setPersonalityTraitData] = useState()
    const [secTemperamentData, setSecTemperamentTraitData] = useState()
    const [priTemperamentData, setPriTemperamentTraitData] = useState()

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

    useEffect(() => {
        const getPriTemperament = () => {
            let max_score = 0
            let pri = {}

            result.temperaments.forEach(el => {
                if (el.score > max_score) {
                    pri = el
                    max_score = el.score
                }
            })

            return pri
        }

        const getSecTemperament = priTemperament => {
            let max_score = 0
            let sec = {}

            result.temperaments
                .filter(el => el.title != priTemperament.title)
                .forEach(el => {
                    if (el.score > max_score) {
                        sec = el
                        max_score = el.score
                    }
                })

            return sec
        }

        const getSecTemperamentColors = priTemperament => {
            return result.temperaments
                .filter(el => el.title != priTemperament.title)
                .map(el => formatRgb(colors[temperamentColors[el.title]]))
        }

        const getSecTemperamentScores = priTemperament => {
            return result.temperaments
                .filter(el => el.title != priTemperament.title)
                .sort((a, b) => a.score - b.score)
                .map(el => el.score * 100)
        }

        const getPersonalityTraitScores = () => {
            return result.personality_traits
                .sort((a, b) => a.score - b.score)
                .map(el => el.score * 100)
        }

        const getPriTemperamentColor = priTemperament => {
            return colors[temperamentColors[priTemperament.title]]
        }

        const getSecTemperamentColor = secTemperament => {
            return colors[temperamentColors[secTemperament.title]]
        }

        const getPriTemperamentData = priTemperamentColor => {
            return {
                labels: ['Red'],
                datasets: [
                    {
                        label: 'primary temperament',
                        data: [100],
                        backgroundColor: [formatRgb(priTemperamentColor)],
                        borderWidth: 1,
                        radius: '40%',
                    },
                ],
            }
        }

        const getSecTemperamentData = (
            secTemperamentScores,
            secTemperamentColors,
        ) => {
            return {
                labels: ['Red', 'Blue', 'Yellow', 'Green'],
                datasets: [
                    {
                        label: 'secondary temperaments',
                        data: secTemperamentScores,
                        backgroundColor: secTemperamentColors,
                        borderWidth: 1,
                        radius: '60%',
                        datalabels: {
                            anchor: 'center',
                            clamp: true,
                            borderWidth: 0,
                        },
                    },
                ],
            }
        }

        const getPersonalityTraitData = (
            personalityTraitScores,
            priTemperamentColor,
            secTemperamentColor,
        ) => {
            return {
                labels: ['Red', 'Blue', 'Yellow', 'Green'],
                datasets: [
                    {
                        label: 'personality_traits',
                        data: personalityTraitScores,
                        backgroundColor: [
                            formatRgb(
                                average([
                                    priTemperamentColor,
                                    secTemperamentColor,
                                ]),
                            ),
                            formatRgb(
                                average([
                                    priTemperamentColor,
                                    secTemperamentColor,
                                ]),
                            ),
                            formatRgb(
                                average([
                                    priTemperamentColor,
                                    secTemperamentColor,
                                ]),
                            ),
                            formatRgb(
                                average([
                                    priTemperamentColor,
                                    secTemperamentColor,
                                ]),
                            ),
                            formatRgb(
                                average([
                                    priTemperamentColor,
                                    secTemperamentColor,
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
        }

        if (result) {
            const priTemp = getPriTemperament()

            const secTemp = getSecTemperament(priTemp)

            const persTraitScores = getPersonalityTraitScores()

            const priTempColor = getPriTemperamentColor(priTemp)

            const secTempColor = getSecTemperamentColor(secTemp)

            const secTempScores = getSecTemperamentScores(priTemp)

            const secTempColors = getSecTemperamentColors(priTemp)

            const personalityTraitData = getPersonalityTraitData(
                persTraitScores,
                priTempColor,
                secTempColor,
            )

            const priTempData = getPriTemperamentData(priTempColor)

            const secTempData = getSecTemperamentData(
                secTempScores,
                secTempColors,
            )

            setPriTemperament(priTemp)

            setSecTemperament(secTemp)

            setPersonalityTraitScores(persTraitScores)

            setPriTemperamentColor(priTempColor)

            setSecTemperamentColor(secTempColor)

            setSecTemperamentColors(secTempColors)

            setSecTemperamentScores(secTempScores)

            setPersonalityTraitData(personalityTraitData)

            setPriTemperamentTraitData(priTempData)

            setSecTemperamentTraitData(secTempData)
        }
    }, [result])

    return (
        <>
            {result && (
                <>
                    <div className="flex flex-col items-center justify-center w-full max-w-xl">
                        <h2 className="text-xl font-semibold">
                            Personality Result
                        </h2>
                        <div className="relative w-full h-full mt-6">
                            <div className="absolute inset-0">
                                {secTemperamentData && (
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
                                                    formatter: function (
                                                        value,
                                                        context,
                                                    ) {
                                                        return Math.round(value)
                                                    },
                                                },
                                            },
                                        }}
                                        plugins={[ChartDataLabels]}
                                        data={secTemperamentData}
                                    />
                                )}
                            </div>
                            <div className="absolute inset-0">
                                {priTemperamentData && (
                                    <Pie data={priTemperamentData} />
                                )}
                            </div>
                            <div className="relative">
                                {personalityTraitData && (
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
                                                    formatter: function (
                                                        value,
                                                        context,
                                                    ) {
                                                        let i =
                                                            context.dataIndex

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
                                        plugins={[
                                            sliceThickeness,
                                            ChartDataLabels,
                                        ]}
                                        data={personalityTraitData}
                                    />
                                )}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex flex-col items-center justify-center p-1 text-sm font-medium capitalize bg-white rounded-md md:p-2 md:text-base md:font-semibold">
                                    {priTemperament && (
                                        <>
                                            <p>{priTemperament.title}</p>
                                            <p>{priTemperament.score * 100}%</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 pb-6 mt-6 lg:items-center lg:justify-center">
                            <div className="flex flex-col gap-4 lg:flex-row justify-evenly">
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span
                                        style={{ backgroundColor: colors.blue }}
                                        className="flex w-3 h-3 rounded-full mr-1.5 flex-shrink-0"
                                    />
                                    Melancholy
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span
                                        style={{ backgroundColor: colors.red }}
                                        className="flex w-3 h-3 rounded-full mr-1.5 flex-shrink-0"
                                    />
                                    Choleric
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span
                                        style={{
                                            backgroundColor: colors.yellow,
                                        }}
                                        className="flex w-3 h-3 rounded-full mr-1.5 flex-shrink-0"
                                    />
                                    Sanguine
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span
                                        style={{
                                            backgroundColor: colors.green,
                                        }}
                                        className="flex w-3 h-3 rounded-full mr-1.5 flex-shrink-0"
                                    />
                                    Phelgmatic
                                </span>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row justify-evenly">
                                <span className="flex items-center flex-shrink-0 font-medium text-gray-900 dark:text-white">
                                    <span className="flex rounded-full mr-1.5 flex-shrink-0">
                                        💡
                                    </span>
                                    Openness to experience
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span className="flex rounded-full mr-1.5 flex-shrink-0">
                                        ⚙️
                                    </span>
                                    Conscentiousnes
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span className="flex rounded-full mr-1.5 flex-shrink-0">
                                        💬
                                    </span>
                                    Extraversion
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span className="flex rounded-full mr-1.5 flex-shrink-0">
                                        🤝
                                    </span>
                                    Agreeableness
                                </span>
                                <span className="flex items-center font-medium text-gray-900 dark:text-white">
                                    <span className="flex rounded-full mr-1.5 flex-shrink-0">
                                        ⛈️
                                    </span>
                                    Neuroticism
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
