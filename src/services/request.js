import moment from 'moment'

/**
 * Use to build top request
 * @return {string}
 */
function getWeekTopRequest(locale = 'fr') {
    const now = moment().toISOString()
    const lastWeek = moment().subtract(1, 'week').toISOString()

    return requestBuilder(lastWeek, now, locale)
}

function getDayTopRequest(locale = 'fr') {
    const today = moment().hour(0).second(0).toISOString()
    console.log('today', today)

    return '?sort=score,desc&where=' + JSON.stringify({
        $and: [
            {
                $expr: {
                    $gte: [
                        "$updatedAt",
                        {
                            $dateFromString: {
                                dateString: today
                            }
                        }
                    ]
                }
            },
            {
                locale
            }
        ]
    })
}

function getTopRequest(locale = 'fr') {

    return '?sort=score,desc&where=' + JSON.stringify({
        locale
    })
}

function requestBuilder(upperDate, lowerDate, locale = 'fr') {

    return '?sort=score,desc&where=' + JSON.stringify(
        {
            $and: [
                {
                    $expr: {
                        $and: [
                            {
                                $gte: [
                                    "$createdAt",
                                    {
                                        $dateFromString: {
                                            dateString: upperDate
                                        }
                                    }
                                ]
                            },
                            {
                                $lte: [
                                    "$createdAt",
                                    {
                                        $dateFromString: {
                                            dateString: lowerDate || upperDate
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    locale
                }
            ]
        }
    )
}

export {getWeekTopRequest, getDayTopRequest, getTopRequest}