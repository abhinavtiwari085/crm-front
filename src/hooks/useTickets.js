
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets,getAllTicketsforTheUser, resetTicketList } from "../Redux/Slices/TicketSlice";
//hook is created so that home page and dashboard both have the access to the ticket state
function useTickets() {
     //useselector used to access the state
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const [searchParams] = useSearchParams();


    const dispatch = useDispatch();


    async function loadTickets() {
        if(ticketState.downloadedTickets.length == 0) {
            await dispatch(getAllTicketsforTheUser());
        }
        if(searchParams.get("status")) {
            // dispatch a filter action
            dispatch(filterTickets({status: searchParams.get("status")}));
        } else {
            dispatch(resetTicketList());
        }
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token, searchParams.get("status")]);

    return [ticketState];
}

export default useTickets;