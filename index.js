const funds = [
    {   name: 'voo',
        quantity: 0,
        totalPrice: 0,
        issuer: 'Vanguard',
        price: 374.52,
        composition: [
            {name: 'Apple', '%OfFunds': 7.05, country: 'USA', sector: 'it'},
            {name: 'Microsoft', '%OfFunds': 5.27, country: 'USA', sector: 'it'},
            {name: 'Alphabet', '%OfFunds': 3.26, country: 'USA', sector: 'it'},
            {name: 'Amazon', '%OfFunds': 2.76, country: 'USA', sector: 'ceil'},
            {name: 'Tesla', '%OfFunds': 1.84, country: 'USA', sector: 'cars'},
            {name: 'Tesla', '%OfFunds': 1.84, country: 'USA', sector: 'cars'},
        ]
    },
    {   name: 'spdw',
        quantity: 0,
        totalPrice: 0,
        issuer: 'SPDR',
        price: 30.22,
        composition: [
            {name: 'Nestle', '%OfFunds': 1.54, country: 'Russia', sector: 'financials'},
            {name: 'ASML Holding', '%OfFunds': 1.16, country: 'Russia', sector: 'industrial'},
            {name: 'Samsung', '%OfFunds': 1.15, country: 'Russia', sector: 'industrial'},
            {name: 'Roche', '%OfFunds': 1.13, country: 'Russia', sector: 'it'},
            {name: 'Shell', '%OfFunds': 1.09, country: 'Russia', sector: 'financials'},
        ]
    },
    {   name: 'iemg',
        quantity: 0,
        totalPrice: 0,
        issuer: 'IShares',
        price: 48.68,
        composition: [
            {name: 'TSM', '%OfFunds': 5.22, country: 'China', sector: 'it'},
            {name: 'Tencent', '%OfFunds': 3.07, country: 'China', sector: 'Communication'},
            {name: 'Samsung', '%OfFunds': 2.03, country: 'South Korea', sector: 'ceil'},
            {name: 'Alibaba', '%OfFunds': 3.01, country: 'China', sector: 'Consumer Discretionary'},
            {name: 'Reliance Industries', '%OfFunds': 1.36, country: 'India', sector: 'Energy'},
        ]
    },
]

const validation = (form) => {
    const createError = (input, text) => {
        const parent = input.parentNode
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    }
    const removeError = () => {
        const parent = input.parentNode
        if(parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }
    let result = true
    const input = form.querySelector('input')
    removeError(input)
    if(input.value.toLowerCase().trim() === '') {
        createError(input, 'Поле не должно быть пустым')
        result = false
    }
    const arrFundNames = []
    newFunds.forEach((fund) => {
        const values = Object.values(fund.name).join('')
        arrFundNames.push(values)
    })
    if(!arrFundNames.includes(input.value.toLowerCase().trim()) && input.value.toLowerCase().trim() !== '') {
        createError(input, 'Данного фонда не существует')
        result = false
    }
    return result
}

const newFunds = JSON.parse(JSON.stringify(funds))
const portfolioComposition = []
const companyList = []
const table = document.querySelector('table')
const tbody = document.createElement('tbody')
table.append(tbody)


const portfolio = document.querySelector('.portfolio')

const input = document.querySelector('input')


const portfolioValue = document.createElement('div')
portfolio.append(portfolioValue)
portfolioValue.className = 'portfolio__value'

const fundName = document.createElement('div')
const fundQuantity = document.createElement('div')
const fundTotalPrice = document.createElement('div')

const formSubmit = document.querySelector('.formSubmit')

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    validation(formSubmit)
    if(validation(formSubmit) === true) {
        const addFund = newFunds.filter(fund => fund.name === input.value)
        const addedFund = addFund[0]
        const isFund = portfolioComposition.some(fund => fund.name === addedFund.name)

        if(!isFund) {
            addedFund.quantity += 1
            addedFund.totalPrice = addedFund.quantity * addedFund.price
            portfolioComposition.push(addedFund)
        } else {
            addedFund.quantity += 1
            addedFund.totalPrice = addedFund.quantity * addedFund.price
            
            fundName.textContent = addedFund.name
            fundQuantity.textContent = addedFund.quantity
            fundTotalPrice.textContent = addedFund.totalPrice
        }
        const totalPortfolioValue = newFunds.reduce((acc, fund) => {
            return acc + fund.totalPrice
        }, 0)
        portfolioComposition.forEach((fund) => {
            fund.composition.forEach((company) => {
                company.sumInFund = Number((fund.price * fund.quantity / 100 * company['%OfFunds']).toFixed(2))
                company['%InPortfolio'] = company.sumInFund / (totalPortfolioValue / 100)
                company.sumInPortfolio = totalPortfolioValue / 100 * company['%InPortfolio']
                companyList.push(company)
            })
        })

        console.log(totalPortfolioValue)
        console.log(newFunds)
        console.log(portfolioComposition)   
        console.log(companyList)
    }
})