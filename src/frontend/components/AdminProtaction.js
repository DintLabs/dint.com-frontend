
import Admin from './Admin';
import AdminerrorSvg  from '../material/adminerr.svg'
import {  useNavigate } from 'react-router-dom';


const AdminProtaction =(props) =>{
       
    var adminBtnCss ={
        padding:"10px",
        borderRadius:"15px",
        backgroundColor:"#6C63FF",
        border:'none',
        margin:"10px"
    }


    let navigate = useNavigate();

        // var isLoggedin = sessionStorage.getItem("logged");
        // var role = sessionStorage.getItem("role");
          

            var isLoggedin = props.loggedin;
            var isadmin = props.isAdmin;


        if(!isLoggedin)
        {
            return(
                <>
                <img src={AdminerrorSvg} alt="" height={'200px'} />
                <h1>You are not Admin</h1>
                <button style={adminBtnCss} onClick={()=>{navigate('/login/admin')}}>Login</button> <button style={adminBtnCss} onClick={()=>{navigate('/')}}>Go Back</button>
                </>
            )
        }
        else{

            if(isadmin)
            {
                return (
                    <>
                    <Admin/>        
                    </>
                )
            }
            else{
                return(
                    <>
                     <img src={AdminerrorSvg} alt="" height={'200px'} />
                    <h1>You are not Admin</h1>
                    <button style={adminBtnCss} onClick={()=>{navigate('/login/admin')}}>Login</button> <button style={adminBtnCss} onClick={()=>{navigate('/')}}>Go Back</button>
                    </>
                )
            }
        }
    
}


export default AdminProtaction