import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


function TripShowPage (){
    const dispatch = useDispatch();
    const { tripId } = useParams();

    useEffect( () => {
        dispatch()
    })
    
}

export default TripShowPage;