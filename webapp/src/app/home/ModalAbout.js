import { useState, useEffect, useContext } from "react";
import Modal from "../layout/Modal"

const ModalAbout = () => {
    const [isShow, setIsShow] = useState(false);

    
	return (
		<Modal
            show={isShow}
            handleShow={setIsShow}
			activator={({ handleShow }) => (
                <button 
                    className="block bg-darkmode uppercase font-bold text-lg py-3 w-full"
                    onClick={() => handleShow(true)}
                >
                    About HONEYDOT
                </button>
            )}
		>
			<div className="bg-darkmode pt-4 pb-8 px-8 rounded-md text-white">
				<h4 className=" text-lg mb-6 font-semibold">About HONEYDOT</h4>
                <div className="text-sm">
<h5 className="font-semibold mt-5">What is HONEYDOT?</h5>
<p>HONEYDOT is a platform that allows brands to create engaging loyalty programs</p>


<h5 className="font-semibold mt-5">Who are we?</h5>
<p>We're a small and dynamic team who likes to make cool things for Web2 and Web3. Miss Brightside is the Marketing Strategist, she uses the power of the lightning to put together awesome investigations and content. Her cat thinks she's a God. 
Mr. Robot is the Software Developer, he codes stunning and usable webapps. He trades to make life changing money but has to code to survive his trading. Together they bring projects to life</p>

                                   
                </div>
			</div>
		</Modal>
	)
}

export default ModalAbout