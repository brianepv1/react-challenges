import { useFormContext } from "../context/FormContext"
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default function StepContainer(){
    const { currentStep } = useFormContext();
    console.log(currentStep)

    switch(currentStep){
        case 1: {
            return <Step1></Step1>
        }
        case 2: {
            return <Step2></Step2>
        }
        case 3: {
            return <Step3></Step3>
        }
        case 4: {
            return <Step4></Step4>
        }
        default:
            <p>Unexpected step</p>
    }

}