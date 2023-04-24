import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ReactComponent as Smile} from './emoticon-expression-sad-smile-smiley-svgrepo-com.svg'

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <div className="smile">
<Smile width="350" height="200"/>
            </div>
            <div>
            Страница не найдена
            </div>
             <button className='HomeBtn' onClick={()=>navigate ('/')}>На главную</button>
        </div>
    );
};