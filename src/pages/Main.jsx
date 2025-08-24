import { useState } from "react";
import "../pages/Main.css";
import { FaBook } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

function Main()  {
    const [idCounter, setIdCounter] = useState(1);
    const [inputText, setInputText] = useState("");
    const [liste, setListe] = useState([]);
    const [filter, setFilter] = useState("all"); // all, done, todo


    const handleToDoList = () => {
        if (inputText.trim() === "") return;

        const NewInputs = {
            id: idCounter,
            text: inputText
        };

        setListe([...liste, NewInputs]);
        setIdCounter(idCounter + 1);
        setInputText("");

    };

    const handleChecked = (id) => {
        setListe(liste.map(todo => 
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
    };

    const removeTask = (id) => {
        setListe(liste.filter((a) => a.id !== id)); // Aşağıda id alıyoruz, burada da yeni bir liste oluşturuyoruz ama o id li olmasın diyoruz. 
    };

    const removeDoneTasks = () => {
        setListe(liste.filter((a) => !a.checked)); // burada da checked olmayan elemanlardan yeni liste yapıyoruz. 
    };

    const removeAllTasks = (id) => {
        setListe([]);
    };
    
    return(
        <div className="main_div">

            <h2>TodoInput</h2>

            <div className="up">
                <div className="up_u">
                    <div className="up_icon"><FaBook  size={20}/></div>
                    <input className="up_inut" type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="New input" />
                </div>
                <button className="up_button" onClick={handleToDoList}>Add new task</button>
            </div>

            <h2>ToDoList</h2>

            <div className="middle_buttons">
                <button className="m_b" onClick={() => setFilter("all")}>All</button>
                <button className="m_b" onClick={() => setFilter("done")}>Done</button>
                <button className="m_b" onClick={() => setFilter("todo")}>ToDo</button>
            </div>

            <ul className="list">
                {liste.filter(todo => {
                    if (filter === "all") {
                        return true;
                    } else if (filter === "done") {
                        return todo.checked;
                    } else {
                        return !todo.checked;
                    }
                    })
                    .map((todo) => (
                        <li key={todo.id} className="l_element">
                            <span className="l_e_span" style={{ textDecoration: todo.checked ? "line-through" : "none" }}>
                            {todo.text}
                            </span>
                            <div className="l_e_div">
                                <input className="l_e_cb" type="checkbox" checked={todo.checked} onChange={() => handleChecked(todo.id)} />
                                <button className="l_e_but" onClick={() => removeTask(todo.id)}><ImBin2 size={17}/></button>  
                            </div>
                        </li>
                    ))
                }
            </ul>
            
            <div className="down_buttons">
                <button className="d_b" onClick={removeDoneTasks}>Delete done tasks</button>
                <button className="d_b" onClick={removeAllTasks}>Delete all tasks</button>
            </div> 

        </div>
    );
}

export default Main;