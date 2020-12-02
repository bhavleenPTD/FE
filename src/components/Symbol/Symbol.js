import React, { useState } from 'react';
import { useStore } from '../../zustandstore';


export default () => {
    const { symbol, setSymbol } = useStore();
    const [symbols, setsymbols] = useState(
        [
            "3683 - Marker I", "3684 - Marker II",
            "3685 - Marker III", "3686 - Destination on Map", "3687 - Distance", "3688 - Document Location",
            "3689 - Explore", "3690 - Find Direction", "3692 - Find", "3691 - Find Location",
            "3693 - Flag I", "3694 - Flag II", "3695 - Flag III", "3696 - Globe I", "3697 - Globe II", "3698 - GPS I",
            "3699 - GPS II", "3700 - Left Arrow", "3701 - Right Arrow", "3702 - Left Turn", "3703 - Right Turn", "3704 - Left Turn Ahead",
            "3705 - Linked Road", "3706 - Locate on Earth", "3707 - Locate on Mobile", "3708 - Location Found", "3709 - Locations Marked on Eart",
            "3710 - Maps I", "3711 - Maps II", "3712 - Marked Destination", "3713 - Marked Location", "3715 - Marked", "3714 - Marked on Map",
            "3716 - Compass", "3717 - Compass Pointing East", "3718 - Compass Pointing West", "3718 - Compass Pointing West", "3720 - Pointer II",
            "3721 - Road", "3722 - Route I", "3723 - Route II", "3724 - Route on Map", "3725 - Street Signs I", "3726 - Street Signs II",
            "3727 - Street Signs III", "3728 - Target Location I", "3729 - Target Location II", "3730 - Two Way Road", "3731 - World Location",
            "3732 - World","4"
        ]


    )

return (
    <div style={{width:"420px", padding:"3px 3px 5px 3px",backgroundColor:"grey",borderRadius:"5px"}}>
        <div className="d-flex flex-wrap" >
            {symbols.map((sym,key)=>(
                <div   key={key} style={{width:"20px",height:"20px",margin:"0px 2px 2px 2px",cursor:"pointer",
                boxShadow:symbol==sym?"0px 0px 5px black":"none"
                }}
                onClick={()=>{setSymbol(sym)}}
                >
                <img style={{width:"100%",height:"100%"}} src={`assets/images/icons/${sym}.jpg`} />
                </div>
            ))}
        </div>
    </div>
)

}