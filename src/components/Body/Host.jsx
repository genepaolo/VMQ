import {useState} from "react";

function Host(props){

    const [user, setUser] = useState({
        id: 1234
    });

    return (
    <div>
        <form>

            Hello {props.name} : {user.id}
            <br></br>
            <button>Host</button>
        </form>
    </div>
    )
}

export default Host;