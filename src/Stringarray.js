import react from 'react'

class Stringarray extends react.Component
{
   
    state={
        stnames:["aaa","bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"]
    }
    ascOrder()
    {
        this.setState(this.state.stnames.sort(function(a){
            return a.localeCompare();
        }))
    }
    descOrder()
    {
        this.setState(this.state.stnames.sort(function(a,b){
            return b.localeCompare(a);
        }))
    }
    render()
    {
       
        return (
            <>
            <div>
                <center>
                <h3>This is second link </h3>
                <hr/>
                {/* <button onClick={()=>this.ascOrder()}>A-Z</button>&nbsp;&nbsp;<button onClick={()=>this.descOrder()}>Z-A</button>
                <p>{this.state.stnames.join(", ")}</p><br/><br/>
                
                <button>A</button><button>B</button><button>C</button>
                <div className='box'>
                    <p>Kind: AA</p>
                </div> */}
                </center>
            </div>
            </>
            
        )
    }
}
export default Stringarray