

const client = require('./client');

(async  ()=>{
    
    //add members to a sorted set
    await client.zAdd('myzset', [{value :   'one' ,score :  2 },{ value: 'two', score : 3}]);
    console.log('added members to myzset');

    //get the number of elements in the sorted set
    const zCard = await client.zCard("myzset");
    console.log("ZCARD : " , zCard);

    //count members with scores within a range
    // const zcount = await client.zCount('myzset' , 1, 3);
    // console.log('ZCOUNT (1 to 2):' , zcount);

    //get members in a range with scores
    const zrange = await client.zRangeWithScores("myzset" , 0 , -1 );
    console.log('ZRANGe (0 to -1):' , zrange);
    
    //get members in reverse order - not working
    // const zrevrange = await client.zRange("myzset" , 0 , 3 , 'REV' );
    // const zrevrange = await client.zRange("myzset" , 0 , 3 , 'REV' , 'BYSCORE');
    // const zrevrange = await client.zRevrange('myzset' , 0 , -1 , 'WITHSCORES');
    // console.log("ZREVRANGE (0 to -1) : ",zrevrange);

    //get the score of a member
    // const zscore = await client.zScore("myzset" , 'two');
    // console.log('ZSCORE (two): ' , zscore);

    //remove a member
    // await client.zRem('myzset' , 'one');
    // const zrangeAfterZrem = await client.zRange('myzset' , 0,-1);
    // console.log("ZREM : removed 'one' , new set : " , zrangeAfterZrem);

    //increment score of a member
    // await client.zIncrBy("myzset" , 5 , 'two');
    // const newScore = await client.zScore("myzset" , 'two');
    // console.log("ZINCRBY : incremented 'two', new score : " , newScore);


    //intersect multiple sorted sets - not working
    // await client.zAdd('myzset2' , [{value : 'two' , score: 8 , value : 'three' ,score : 4}]);
    // await client.zInterStore('myzset_inter' , 2 , 'myzset' , 'myzset2');
    // const zinterstore = await client.zRangeWithScores('myzset_inter' , 0 , -1)


    //union multiple sorted sets - not working
    // await client.zUnionStore('myzset_union' , 2, 'myzset' , 'myzset2');
    // const zunionstore = await client.zRange('myzset_union' , 0 , -1);
    // console.log('ZUNIONSTORE: ' , zunionstore);

    //get scores of multiple members
    const zmscore = await client.zmScore('myzset' ,['one', 'two' ]);
    console.log('ZMSCORE(one, two): ' , zmscore);

    //remove and return the member with the highest score
    // const zpopmax = await client.zPopMax('myzset');
    // console.log('ZPOPMAX : ' , zpopmax);

    //incrementally iterate over a sorted set
    const zscan = await client.zScan("myzset" , 0);
    console.log("ZSCAN(myzset): " , zscan);

    //remove and return
    client.quit();

})();