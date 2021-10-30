async function upload_data(data, client){
    try{
        client.query("TRUNCATE entities;");
    
        data.map(async(d) => {
            await client.query(`INSERT INTO entities VALUES (${d.name}, ${d.pin}, ${d.district}, 'POINT(${d.lng} ${d.lat})');`)
        })
    }
    catch(err){
        console.log(err);
        return -1;
    }
}
async function find_avg(client){
    try{
        const res = client.query("SELECT AVG(d.covid_case) FROM entities AS e, districts AS d ON e.district = d.district;")
        return res;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}
async function find_tot_avg(client){
    try{
        const res = client.query("SELECT AVG(covid_case) FROM districts;")
        return res;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}
async function find_avg_dist(cur_loc, client){
    try{
        const res = client.query(`SELECT AVG(ST_Distance(geom, ST_GeomFromText('POINT(${cur_loc.lng} ${cur_loc.lat})', 26918))) FROM entities;`);
        return res;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}
async function find_cases(cur_loc, client){
    try{
        const res = client.query(`SELECT covid_case FROM districts WHERE ST_Contains(geom, ST_GeomFromText('POINT(${cur_loc.lng} ${cur_loc.lat})', 26918));`)
        return res;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}

module.exports = {
    upload_data,
    find_avg,
    find_tot_avg,
    find_avg_dist,
    find_cases
}