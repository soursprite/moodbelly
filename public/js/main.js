let output
let meatTotal, vegTotal, starchTotal, waterTotal, waterData

async function dataCall() { // get data
    await fetch('/feed/getDayData', {
        method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            output =  data;
            if (output.length > 7) {
                output = output.slice(0,7)
            }
            console.log("data get!")
        });

}


async function prepData() {
    await dataCall()

    const meatData = output.map(x => x["meat"])
    const vegData = output.map(x => x["veg"])
    const starchData = output.map(x => x["starch"])
    waterData = output.map((x,i) => [(i+1).toString(),x["water"]])

    //7 day averages
    meatTotal = meatData.reduce((a, c) => a + c,0)/7
    vegTotal = vegData.reduce((a, c) => a + c,0)/7
    starchTotal =starchData.reduce((a, c) => a + c,0)/7

    waterTotal = waterData.reduce((a, c) => a + c,0)  
    console.log(meatTotal, vegTotal, starchTotal, waterTotal)
    
}

async function chart7Day() {
    await prepData();
    const ctx = document.getElementById('sevenDay')
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Meat', 'Starch', 'Veg'],
            datasets: [{
                data: [meatTotal, starchTotal,  vegTotal],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',

                ],
                borderWidth: 3
            }]
        }
        
    });
}

async function chartWater() {
    await prepData();
    console.log(waterData)
    const ctx = document.getElementById('waterChart')
    const myChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
        },
        data: {
            datasets: [{
                label: 'Water Consumed',
                data: waterData.reverse(),
                fill: true,
                borderColor: 'rgb(75, 130, 192)',
                tension: 0.1
            }]
        }
    });
}

chart7Day()
chartWater()

/*
if (output.length <= 7) {
    data = output
}
else {
    data = output.slice(0,6)
}

const meatData = data.map(x => x["meat"])

const meatTotal = meatData.reduce((a, c) => a + c,0) 
console.log(meatTotal)

document.getElementById("here").innerText = " HELLO";
*/