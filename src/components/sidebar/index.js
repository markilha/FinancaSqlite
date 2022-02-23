
import React,{useState} from 'react'
import { Section } from './styles'
import { BsCircleFill } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";


export default function Sidebar() {
    const [currentLink, setCurrentLink] = useState(1);

    return (
        <Section>
            <div className="top">
                <div className='brand'>
                    <BsCircleFill className="color1" />
                    <BsCircleFill className="color2" />
                    <BsCircleFill className="color3" />
                </div>
                <div className="links">
                    <li
                        className={currentLink === 1 ? "active" : "none"}
                        onClick={() => setCurrentLink(1)}
                    >
                        <a href="/">
                            Home
                        </a>
                    </li>
                    <li
                            className={currentLink === 2 ? "active" : "none"}
                            onClick={() => setCurrentLink(2)}
                            >
                                <a href="/entradas">                                     
                                    Entradas                                 
                                </a>
                            </li>

                </div>

            </div>

        </Section>
    )

}