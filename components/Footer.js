import { useState } from "react";
import TermsAndCondition from "./TermsAndCondition";

export default function Footer() {
    const [terms, setterms] = useState(null)

    function close() {
        setterms(null)
    }

    return (
       <>
       <div className="terms">
       <TermsAndCondition close={close}/>
       </div>
        <footer>
            <h3>Rent_A_Car</h3>
            <h4 onClick={()=>setterms(1)}> Términos y condiciones </h4>
        </footer>
        <style jsx>{`
        footer {
            height: 100px;
            background-color: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
        }
        h4,h3{
            margin:10px 20px;
        }
        h4{
            cursor:pointer
        }
        h4:hover {
            text-decoration: underline;
        }
        .terms{
            display:${!terms ? "none" : "block"};

        }
        `}</style>
       </>
    );
}