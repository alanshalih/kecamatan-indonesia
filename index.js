// Require the framework and instantiate it
const fastify = require('fastify')({ logger: false })

const fs = require('fs')

let province = [];

let cities = {};

let subdistrict = {};

fs.readFile('province.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  province = JSON.parse(data);
})

fs.readFile('city.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const city = JSON.parse(data);

    city.forEach(item=>{
        if(cities[item.province_id])
        {
            cities[item.province_id].push(item);
        }else{ 
            cities[item.province_id] = [item];
        }
        
    })
  })

  fs.readFile('subdistrict.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const district = JSON.parse(data);

    district.forEach(item=>{
        if(subdistrict[item.city_id])
        {
            subdistrict[item.city_id].push(item);
        }else{ 
            subdistrict[item.city_id] = [item];
        }
        
    })
  })

// Declare a route
fastify.get('/province', async (request, reply) => {
  return province;
})

fastify.get('/city/:province_id', async (request, reply) => {
    return cities[request.params.province_id];
  })

  
fastify.get('/district/:city_id', async (request, reply) => {
    return subdistrict[request.params.city_id];
  })

  
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()