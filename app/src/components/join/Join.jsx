import { Link } from 'react-router-dom'
import "./Join.css"

const createUser = ()=> {}

function Join() {
    return (
        <div>
            <form>
                <label for="displayname">Enter Display Name:</label>
                <input type = "text" id = "displayname" placeholder='johnnyapplesmith'></input>

                <label for="group">Enter Group Id:</label>
                <input type = "text" id = "group" placeholder='Should be a long string of letters and numbers'></input>
            
                <button type = "submit" onClick = {createUser}> Join </button>
            </form>
        </div>
    )
}

export default Join