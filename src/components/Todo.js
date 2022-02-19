import React, { useRef,useState,useEffect } from 'react'
import img from './assets/logo.png';
import img1 from './assets/complete.png';

import './Todo.css';
let count=1;
const getlocal=()=>{
    const list=localStorage.getItem("mytodolist");
    if(list)
    return JSON.parse(list);
    else
    return [];
}
function Todo() {
    const [input, setInput] = useState("");
    const [items, setitems] = useState(getlocal());
    const [isEdited, setisEdited] = useState("");
    const[toggle,settoggle] = useState(true);
    const[toggleimg,settoggleimg] = useState(false);

    const point = useRef();
    const additonlist = () => {
        if (!input)
            alert("Itemnot");
        else if(input && !toggle){
            settoggleimg(false);

            console.log(input);
            setitems(items.map((data)=>{
                if(data.id === isEdited)
                    return {...data, name:input};
                else
                    return data;
            }));
            settoggle(true);
            setInput("");
        }
        else {
            settoggleimg(false);
            const Itemobj={
                id:count,
                name:input
            };
            setitems([...items,Itemobj]);
            setInput("")
            count++;
            console.log(items);
        }
        point.current.focus();
    }
    const deletion=(data)=>{
        const updateddata=items.filter(
            (itemdata)=>{
                return itemdata.id !== data;
            }
        )
        setitems(updateddata);
    }
    const Changment=(data)=>{
        setisEdited(data.id);
        setInput(data.name);
        settoggle(false);
        
        // const updateddata=items.map(
        //     (dataItem)=>{
        //         // if(dataItem.id)
        //     }
        // )
    }

    const clicked=()=>{
        point.current.focus();
    }
    const Deleteall=()=>{
        setitems([]);
        settoggleimg(true);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items));
    }, [items])
    
    return (
        <>
            <div className='main-div'>
                {toggleimg?<img src={img1} />:<img src={img} />}
                <br></br>
                <input placeholder='Enter yourTask'
                    ref={point}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                {toggle?<button onClick={additonlist}><i class="fas fa-plus-circle"></i></button>:<button onClick={additonlist}><i class="fas fa-user-edit"></i></button>}
            </div>
            <div className='ItemAdded'>
                {items.map((e) => {
                    return(
                    <div className='EachItem' key={e.id}>
                        <div className="span">{e.name}</div>
                        <button className='edit' onClick={()=>Changment(e)}><i class="fas fa-user-edit"></i></button>
                        <button className='delete' onClick={() => deletion(e.id)}><i class="fas fa-trash-alt"></i></button>
                        {/* <i className="fas fa-plus" /> */}
                        {/* <FontAwesomeIcon icon="fa-solid fa-file-pen" /> */}
                        
                    </div>);
                })};
                <button className='Removeallbtn' onClick={Deleteall}>Remove all</button>
            </div>
        </>
    )
}

export default Todo