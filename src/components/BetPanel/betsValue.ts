import fiveCents from '../../assets/images/fiveCents.png'
import fiftyCents from '../../assets/images/fiftyCents.png'
import fiftyPound from '../../assets/images/fiftyTip.png'
import onePound from '../../assets/images/oneTip.png'
import tenPound from '../../assets/images/tenTip.png'
import fivePound from '../../assets/images/fiveTip.png'
import hundred from '../../assets/images/hundred.png'
import fiveHundred from '../../assets/images/fiveHundred.png'
import thousand from '../../assets/images/thousand.png'

export const betValues = [
    {
        id: 1,
        value: 0.05,
        label: '0.05',
        img: fiveCents
    },
    {
        id: 2,
        value: 0.50,
        label: '0.50',
        img: fiftyCents
    },
    {
        id: 3,
        value: 1,
        label: '1.00',
        img: onePound

    },
    {
        id: 4,
        value: 5,
        label: '5.00',
        img: fivePound
    },
    {
        id: 5,
        value: 10,
        label: '10.00',
        img: tenPound
    },
    {
        id: 6,
        value: 50,
        label: '50.00',
        img: fiftyPound
    },   
    {
        id: 7,
        value: 100,
        label: '100.00',
        img: hundred
    },  
    {
        id: 8,
        value: 500,
        label: '500.00',
        img: fiveHundred
    }, 
    {
        id: 9,
        value: 1000,
        label: '1000.00',
        img: thousand
    }, 
]