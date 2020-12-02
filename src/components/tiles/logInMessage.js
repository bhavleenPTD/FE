import React from 'react';

export default(({user})=>{


return (
    <div style={{textAlign:"right", marginBottom:"2rem"}}>
 <h3>Welcome {user.name} &nbsp; {user.lastname}</h3>
         
    </div>
)

})