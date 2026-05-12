// Import Modules
import { useState } from "react";
import {
    HandCoins,
} from 'lucide-react'

// Import Hooks

// Import Components

// Import Assets

const Summa = () => {

    // Why the state
    const [value, setValue] = useState(0);

    // Named Hooks
    const {  } = useState();

    const is = true;



    return (
        <div>


            {

                is === false

                ?

                    (

                        <div>
                            <p>
                                Hello
                            </p>
                        </div>

                    )

                :

                    (

                        <div>
                            <p>
                                Empty
                            </p>
                        </div>

                    )

            }

        </div>
    );
};

export default Summa;