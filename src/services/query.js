import moment from 'moment'

/**
 * Use to build top request
 * @return {string}
 */
function getWeekTopRequest(locale = 'fr', minRange = 0, maxRange = 9) {
    const now = moment().toISOString()
    const lastWeek = moment().subtract(1, 'week').toISOString()

    return '?sort=score,desc&range='+ minRange + '-' + maxRange + '&where=' + JSON.stringify(
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
                                            dateString: lastWeek
                                        }
                                    }
                                ]
                            },
                            {
                                $lte: [
                                    "$createdAt",
                                    {
                                        $dateFromString: {
                                            dateString: now
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

function getWordUser(userId, locale = 'fr') {
    return '?where=' + JSON.stringify({
        $expr: {
            $eq: ['userId', userId]
        }
    })
}
function getDayTopRequest(locale = 'fr', minRange = 0, maxRange = 9) {
    const today = moment().hour(0).second(0).toISOString()
    console.log('today', today)

    return '?sort=score,desc&'+ minRange + '-' + maxRange + '&where=' + JSON.stringify({
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

function getTopRequest(locale = 'fr', minRange = 0, maxRange = 9) {

    return '?sort=score,desc&range='+ minRange + '-' + maxRange + '&where=' + JSON.stringify({
        locale
    })
}

function requestBuilder(url, locale = 'fr') {
    return url + '?where=' + JSON.stringify(
        {
            locale
        }
    )
}

export {getWeekTopRequest, getDayTopRequest, getTopRequest, getWordUser, requestBuilder}
