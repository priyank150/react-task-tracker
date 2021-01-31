import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ onAdd, showAddTask }) => {
    const location = useLocation()
    return (
        <header className='header'>
          <h1>Task Tracker</h1>  
          {location.pathname === '/' && <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Hide' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Header
