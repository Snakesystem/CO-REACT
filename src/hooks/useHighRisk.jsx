import { useState } from 'react'
import { useSweetAlert } from './useSweetAlert';
import axios from 'axios';

export default function useHighRisk(occupation, position, naturebusiness) {

    const [highRisk, setHighRisk] = useState(false);
    const { showAlert } = useSweetAlert();

    const postData = {
        Occupation: Number(occupation),
        Position: Number(position),
        NatureOfBusiness: Number(naturebusiness)
    }

    const postHightRisk = async () => {
        try {
            const response = await axios.post('http://202.158.44.116:8070/service/EFORMService.svc/HighRiskInquiry', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': true,
                    'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Credentials': true
                    
                  },
              })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    } 
    
    postHightRisk()

  return console.log("hadeh")
}
