export const mongoFindWithSort = async(col,selectCondition,projectCondition,sortCondition,limit) =>{
    return new Promise(async(resolve,reject) => { 
    	try{
    		if(!projectCondition) {
    		    projectCondition = {};
    		}
    		if(!sortCondition) {
    		    sortCondition = {
    		        "_id":1
    		    };            
    		}
    		var limitValue = 0;
    		if(limit) {
    		    limitValue = limit;
    		}
    		col.find(selectCondition).select(projectCondition).sort(sortCondition).limit(limitValue).lean().exec(function(err,res){
    		    if(err){                    
                    reject(new Error(err));
                }
                else{
                    resolve(res);    
                }
    		})
    	}catch(err) {
    		reject(new Error(err));;
    	}
    })
}

export const mongoFind = async(col,selectCondition,projectCondition,limit) =>{
    return new Promise(async(resolve,reject) => { 
        try{
            if(!projectCondition) {
                projectCondition = {};
            }
            
            var limitValue = 0;
            if(limit) {
                limitValue = limit;
            }
            col.find(selectCondition).select(projectCondition).limit(limitValue).lean().exec(function(err,res){                
                if(err){                    
                    reject(new Error(err));
                }
                else{
                    resolve(res);    
                }        
            })
        }catch(err) {
            reject(new Error(err));;
        }
    })
}

export const mongoFindCursor = async(col,selectCondition,projectCondition,sortCondition,limit) =>{
    return new Promise(async(resolve,reject) => { 
    	try{
    		if(!projectCondition) {
    		    projectCondition = {};
    		}
    		if(!sortCondition) {
    		    sortCondition = {
    		        "_id":1
    		    };            
    		}
    		var limitValue = 0;
    		if(limit) {
    		    limitValue = limit;
    		}
    		var cursor = col.find(selectCondition).select(projectCondition).sort(sortCondition).limit(limitValue).lean().cursor();
    		resolve(cursor);
    	}catch(err) {
    		reject(new Error(err));
    	}
    })
}

export const mongoFindOne = async(col,selectCondition,projectCondition) => {
    return new Promise(async(resolve,reject) => {
    	try {
            if(!projectCondition) {
                projectCondition = {};
            }
			col.findOne(selectCondition).select(projectCondition).lean().exec(function(err,res){
                if(err){                    
                    reject(new Error(err));
                }
                else{
                    resolve(res);    
                }
			})    		
    	} catch(err) {
    		reject(new Error(err));;
    	}
    })
}

export const mongoCount = async(col,selectCondition) => {
    return new Promise(async(resolve,reject) => {
    	try {
    		col.count(selectCondition,function(err,res){
    		    if(err){                    
                    reject(new Error(err));
                }
                else{
                    resolve(res);    
                }        
    		})
    	}catch(err){
    		reject(new Error(err));;
    	}
    })
}

export const mongoUpdateOne = async(col,selectCondition,updateCondition) =>{
	return new Promise(async(resolve,reject) => {
		try {
            col.update(selectCondition,updateCondition,function(err,res){
			    if(err){
			        reject(new Error(err));
			    } else {
			        resolve();
			    }
			})
		}catch(err) {
			//throw err;
			reject(new Error(err));;
		}
	})
}

export const mongoUpsertOne = async(col,selectCondition,updateCondition) =>{
    return new Promise(async(resolve,reject) => {
        try {
            col.update(selectCondition,updateCondition,{upsert:true},function(err,res){
                if(err){
                    reject(new Error(err));
                } else {
                    resolve();
                }
            })
        }catch(err) {
            //throw err;
            reject(new Error(err));;
        }
    })
}


export const mongoUpdate = async(col,selectCondition,updateCondition) =>{
    return new Promise(async(resolve,reject) => {
        try {
            col.update(selectCondition,updateCondition,{multi:true},function(err,res){
                if(err){
                    reject(new Error(err));
                } else {
                    resolve();
                }
            })
        }catch(err) {
            reject(new Error(err));;
        }
    })
}

export const mongoAggregate = async(col,aggregateCondition) => {
	return new Promise(async(resolve,reject) => {
		try {
			col.aggregate(aggregateCondition,function(err,res){
                if(err){
                    reject(new Error(err));
                } else {
			        resolve(res)
			    }
			})
		}catch(err) {
			reject(new Error(err));;
		}
	})
}

export const mongoDelete = async(col,selectCondition) => {
	return new Promise(async(resolve,reject) => {
		try {
			col.remove(selectCondition,function(err,res){
			    if(err){
			        reject(new Error(err));
			    } else {
			        resolve();
			    }
			})			
		}catch(err) {
			reject(new Error(err));;
		}
	})	
}

export const mongoInsert = async(col,doc) =>{
    return new Promise(async(resolve,reject) =>{
    	try {
    		var moongooseModel = col(doc);
    		moongooseModel.save(function(err, res){
    		    if(err){
    		        console.log('insertDoc Error', err); 
    		        reject(new Error(err));
    		    } else {
    		        console.log('mongo insert succ');
    		        resolve();
    		    }
    		})          
    	} catch(err) {
    		reject(new Error(err));;
    	}
    })
}

export const mongoDistinct = async(col,string,selectCondition) => {
	return new Promise(async(resolve,reject) =>{
		try {
			if(!selectCondition) {
				selectCondition = {};
			}
			col.distinct(string,selectCondition,function(err,res){
				if(err) {
					reject(new Error(err));;
				} else {
					resolve(res);
				}
			})
		}catch(err) {
			reject(new Error(err));;
		}
	})
}

export const mongoFindOneAndUpdate = async(col,selectCondition,updateCondition,returnCondition) =>{
	return new Promise(async(resolve,reject) => {
		try {
			col.findOneAndUpdate(selectCondition,updateCondition,returnCondition,function(err,res){
			    if(err){
			        reject(new Error(err));;
			    } else {

			        resolve(res);
			    }
			})
		}catch(err) {
			reject(new Error(err));;
		}
	})
}



export const mongoFindOneAndRemove = async(col,selectCondition) =>{
    return new Promise(async(resolve,reject) => {
        try {
            col.findOneAndRemove(selectCondition,function(err,res){
                if(err){
                    reject(new Error(err));;
                } else {

                    resolve(res);
                }
            })
        }catch(err) {
            reject(new Error(err));;
        }
    })
}

